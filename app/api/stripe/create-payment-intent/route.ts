import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CONTACT_EMAIL } from "@/lib/constants";

type PaymentPayload = {
  amount?: unknown;
  name?: unknown;
  email?: unknown;
  reference?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: PaymentPayload;
  try {
    body = (await request.json()) as PaymentPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const amountRaw = body.amount;
  const amount =
    typeof amountRaw === "number"
      ? amountRaw
      : typeof amountRaw === "string"
        ? parseFloat(amountRaw)
        : NaN;
  const name = asString(body.name);
  const email = asString(body.email);
  const reference = asString(body.reference);

  if (!Number.isFinite(amount) || amount < 1) {
    return NextResponse.json(
      { error: "Amount must be at least $1.00." },
      { status: 400 },
    );
  }
  if (amount > 100000) {
    return NextResponse.json(
      { error: "Amount cannot exceed $100,000. Contact us for larger payments." },
      { status: 400 },
    );
  }
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 },
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY is not set");
    return NextResponse.json(
      {
        error: `Payment system is not configured. Please email ${CONTACT_EMAIL}.`,
      },
      { status: 503 },
    );
  }

  const stripe = new Stripe(secretKey);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      description: reference
        ? `Payment from ${name} — ${reference}`
        : `Payment from ${name}`,
      metadata: {
        customer_name: name,
        customer_email: email,
        invoice_reference: reference || "",
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe payment intent error:", err);
    return NextResponse.json(
      {
        error: `We couldn't start the payment. Please try again or email ${CONTACT_EMAIL}.`,
      },
      { status: 502 },
    );
  }
}
