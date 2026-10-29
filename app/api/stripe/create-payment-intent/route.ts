import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CONTACT_EMAIL } from "@/lib/constants";
import {
  PAYMENT_ERRORS,
  isCrossSiteRequest,
  readJsonBody,
  stripeConfigurationProblem,
  validatePaymentRequest,
} from "@/lib/validation";

// The payment form sends a handful of short fields; 4 KB leaves ample room.
const MAX_BODY_BYTES = 4 * 1024;

function invalidRequest(status = 400) {
  return NextResponse.json({ error: PAYMENT_ERRORS.invalidRequest }, { status });
}

function notConfigured() {
  return NextResponse.json(
    {
      error: `Payment system is not configured. Please email ${CONTACT_EMAIL}.`,
    },
    { status: 503 },
  );
}

export async function POST(request: Request) {
  if (isCrossSiteRequest(request)) return invalidRequest(403);

  const parsed = await readJsonBody(request, MAX_BODY_BYTES);
  if (!parsed.ok) return invalidRequest(parsed.status);
  const body = parsed.body;

  // Honeypot: the field is hidden from people, so a value means automation.
  if (typeof body.hp === "string" && body.hp.trim()) return invalidRequest();

  const result = validatePaymentRequest(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const { amountCents, name, email, reference } = result.value;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY is not set");
    return notConfigured();
  }

  const configurationProblem = stripeConfigurationProblem({
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey,
    vercelEnv: process.env.VERCEL_ENV,
    nodeEnv: process.env.NODE_ENV,
  });
  if (configurationProblem) {
    console.error(`Stripe configuration refused: ${configurationProblem}`);
    return notConfigured();
  }

  const stripe = new Stripe(secretKey);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      description: reference
        ? `Payment from ${name} — ${reference}`
        : `Payment from ${name}`,
      metadata: {
        customer_name: name,
        customer_email: email,
        invoice_reference: reference,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    // Log identifiers only: Stripe error messages can echo request values.
    if (err instanceof Stripe.errors.StripeError) {
      console.error("Stripe payment intent error:", {
        type: err.type,
        code: err.code,
        statusCode: err.statusCode,
        requestId: err.requestId,
      });
    } else {
      console.error("Stripe payment intent error:", (err as Error)?.name);
    }
    return NextResponse.json(
      {
        error: `We couldn't start the payment. Please try again or email ${CONTACT_EMAIL}.`,
      },
      { status: 502 },
    );
  }
}
