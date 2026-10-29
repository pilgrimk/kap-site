"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { loadStripe, type Stripe as StripeJs } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  MAX_EMAIL_LENGTH,
  MAX_INVOICE_REFERENCE_LENGTH,
  MAX_PAYER_NAME_LENGTH,
  STRIPE_RETURN_MAX_AGE_MS,
  STRIPE_RETURN_STORAGE_KEY,
  paymentOutcome,
  readStripeReturn,
  validatePaymentRequest,
  type PaymentOutcome,
} from "@/lib/validation";

declare global {
  interface Window {
    // Set by the payment page's inline return script (lib/stripe-return-script.ts).
    __kapStripeReturn?: string;
  }
}

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise: Promise<StripeJs | null> = publishableKey
  ? loadStripe(publishableKey)
  : Promise.resolve(null);

const inputClasses =
  "block w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors placeholder:text-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:opacity-60";

const stripeAppearance = {
  theme: "flat" as const,
  variables: {
    colorPrimary: "#b1296e",
    colorBackground: "#ffffff",
    colorText: "#1a1a1a",
    colorDanger: "#dc2626",
    colorTextSecondary: "#5c5c5c",
    fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    fontSizeBase: "14px",
    borderRadius: "8px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid #e8e2c9",
      padding: "12px 16px",
      backgroundColor: "#ffffff",
    },
    ".Input:focus": {
      border: "1px solid #b1296e",
      boxShadow: "0 0 0 3px rgba(177, 41, 110, 0.25)",
    },
    ".Label": {
      fontWeight: "500",
      color: "#1a1a1a",
      fontSize: "14px",
      marginBottom: "8px",
    },
  },
};

function formatAmount(cents: number, currency = "usd") {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  });
}

// ---------------------------------------------------------------------------
// Stripe return handling
// ---------------------------------------------------------------------------

/**
 * The client secret Stripe returned with the customer, if any. The inline
 * script normally captures it before hydration; sessionStorage keeps it across
 * a reload; reading the URL directly is a fallback for when the script did
 * not run.
 */
function loadPendingReturn(): string | null {
  let raw = window.__kapStripeReturn ?? null;
  if (!raw) {
    try {
      raw = window.sessionStorage.getItem(STRIPE_RETURN_STORAGE_KEY);
    } catch {
      raw = null;
    }
  }
  if (!raw) {
    const params = new URLSearchParams(window.location.search);
    const secret = params.get("payment_intent_client_secret");
    if (secret || params.has("redirect_status")) {
      window.history.replaceState(window.history.state, "", "/payment");
    }
    return readStripeReturn({
      clientSecret: secret,
      paymentIntentId: params.get("payment_intent"),
    });
  }

  try {
    const record = JSON.parse(raw) as {
      clientSecret?: string;
      paymentIntentId?: string | null;
      savedAt?: number;
    };
    if (
      typeof record.savedAt !== "number" ||
      Date.now() - record.savedAt > STRIPE_RETURN_MAX_AGE_MS
    ) {
      clearPendingReturn();
      return null;
    }
    return readStripeReturn({
      clientSecret: record.clientSecret,
      paymentIntentId: record.paymentIntentId,
    });
  } catch {
    clearPendingReturn();
    return null;
  }
}

function clearPendingReturn() {
  window.__kapStripeReturn = undefined;
  try {
    window.sessionStorage.removeItem(STRIPE_RETURN_STORAGE_KEY);
  } catch {
    // Storage unavailable: nothing was stored.
  }
}

type PaymentResult = {
  outcome: PaymentOutcome;
  clientSecret: string;
  paymentIntentId: string | null;
  amountCents: number | null;
  currency: string;
};

async function checkPaymentStatus(clientSecret: string): Promise<PaymentResult> {
  const unknown: PaymentResult = {
    outcome: "unknown",
    clientSecret,
    paymentIntentId: null,
    amountCents: null,
    currency: "usd",
  };
  try {
    const stripe = await stripePromise;
    if (!stripe) return unknown;
    const { paymentIntent, error } =
      await stripe.retrievePaymentIntent(clientSecret);
    if (error || !paymentIntent) return unknown;
    return {
      outcome: paymentOutcome(paymentIntent.status),
      clientSecret,
      paymentIntentId: paymentIntent.id,
      amountCents: paymentIntent.amount,
      currency: paymentIntent.currency,
    };
  } catch {
    return unknown;
  }
}

// ---------------------------------------------------------------------------
// Form pieces
// ---------------------------------------------------------------------------

function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="flex items-center justify-between text-sm font-medium text-foreground"
      >
        <span>
          {label}
          {required ? (
            <span className="ml-1 text-primary" aria-hidden>
              *
            </span>
          ) : null}
        </span>
        {hint ? (
          <span className="text-xs font-normal text-muted-foreground">
            {hint}
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}

function CardStep({
  amountCents,
  onBack,
}: {
  amountCents: number;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment`,
      },
    });

    if (stripeError) {
      setError(stripeError.message ?? "Payment could not be completed.");
      setSubmitting(false);
    }
    // Otherwise Stripe redirects to return_url, where the real PaymentIntent
    // status is retrieved before anything is shown.
  }

  const amountDisplay = formatAmount(amountCents);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="rounded-lg bg-muted px-5 py-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/70">
            Amount due
          </span>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {amountDisplay}
          </span>
        </div>
      </div>

      <PaymentElement />

      {error ? (
        <div
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </div>
      ) : null}

      <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="inline-flex items-center gap-2 self-start text-xs font-medium text-foreground/70 transition-colors hover:text-foreground disabled:opacity-50"
        >
          <ArrowLeft className="size-3.5" />
          Back to amount
        </button>
        <Button
          type="submit"
          disabled={!stripe || submitting}
          className="h-11 px-6 text-sm font-semibold"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              <span>Processing…</span>
            </>
          ) : (
            <span>Pay {amountDisplay}</span>
          )}
        </Button>
      </div>
    </form>
  );
}

function CheckingState() {
  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-2xl bg-card p-10 text-sm text-muted-foreground ring-1 ring-foreground/8"
    >
      <Loader2 className="size-4 animate-spin" aria-hidden />
      <span>Checking your payment status…</span>
    </div>
  );
}

function ContactLink() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline">
      {CONTACT_EMAIL}
    </a>
  );
}

const linkButtonClasses =
  "text-xs font-medium text-primary underline-offset-4 hover:underline";

function ResultState({
  result,
  onRetry,
  onReset,
}: {
  result: PaymentResult;
  onRetry: () => void;
  onReset: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the outcome so screen readers announce it after the redirect.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const amount =
    result.amountCents !== null
      ? formatAmount(result.amountCents, result.currency)
      : null;
  const reference = result.paymentIntentId ? (
    <p className="mt-4 text-sm text-muted-foreground">
      Payment reference:{" "}
      <span className="font-mono text-foreground">{result.paymentIntentId}</span>
    </p>
  ) : null;

  const content: Record<
    PaymentOutcome,
    { icon: string; title: string; body: ReactNode; actions: ReactNode }
  > = {
    succeeded: {
      icon: "✓",
      title: "Payment received.",
      body: (
        <>
          Stripe reports that your payment{amount ? ` of ${amount}` : ""}{" "}
          succeeded. Please keep the payment reference below for your
          records. Questions about this payment? Email <ContactLink />.
        </>
      ),
      actions: (
        <button type="button" onClick={onReset} className={linkButtonClasses}>
          Make another payment
        </button>
      ),
    },
    processing: {
      icon: "…",
      title: "Payment processing.",
      body: (
        <>
          Your payment{amount ? ` of ${amount}` : ""} has been submitted but is
          not complete yet. Some payment methods take a few business days to
          confirm. Please don&apos;t submit another payment for the same
          invoice. Questions? Email <ContactLink />.
        </>
      ),
      actions: (
        <button type="button" onClick={onReset} className={linkButtonClasses}>
          Pay a different invoice
        </button>
      ),
    },
    failed: {
      icon: "!",
      title: "Payment not completed.",
      body: (
        <>
          Your payment{amount ? ` of ${amount}` : ""} could not be completed,
          and this attempt was not charged. You can try again with the same or
          a different payment method.
        </>
      ),
      actions: (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button
            type="button"
            onClick={onRetry}
            className="h-11 px-6 text-sm font-semibold"
          >
            Try again
          </Button>
          <button type="button" onClick={onReset} className={linkButtonClasses}>
            Change amount or details
          </button>
        </div>
      ),
    },
    canceled: {
      icon: "×",
      title: "Payment canceled.",
      body: (
        <>
          This payment was canceled and was not charged. You can start a new
          payment whenever you&apos;re ready.
        </>
      ),
      actions: (
        <button type="button" onClick={onReset} className={linkButtonClasses}>
          Start a new payment
        </button>
      ),
    },
    unknown: {
      icon: "?",
      title: "We couldn't confirm your payment.",
      body: (
        <>
          We weren&apos;t able to confirm the status of this payment. Before
          trying again, please check your email and card or bank statement for
          a charge from KAP Enterprises, or email <ContactLink /> and we&apos;ll
          check for you.
        </>
      ),
      actions: (
        <button type="button" onClick={onReset} className={linkButtonClasses}>
          Start a new payment
        </button>
      ),
    },
  };

  const { icon, title, body, actions } = content[result.outcome];

  return (
    <div className="rounded-2xl bg-card p-10 ring-1 ring-foreground/8">
      <div className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
        <span aria-hidden className="text-lg">
          {icon}
        </span>
      </div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 scroll-mt-32 text-2xl font-semibold tracking-tight text-foreground focus:outline-none"
      >
        {title}
      </h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">{body}</p>
      {result.outcome === "unknown" ? null : reference}
      <div className="mt-6">{actions}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Payment form
// ---------------------------------------------------------------------------

type Stage = "details" | "card" | "checking" | "result";

export function PaymentForm() {
  const [stage, setStage] = useState<Stage>("details");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amountCents, setAmountCents] = useState(0);
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // A Stripe redirect lands here; ask Stripe what actually happened.
  useEffect(() => {
    const pending = loadPendingReturn();
    if (!pending) return;
    let cancelled = false;
    // Deferred out of the effect body (react-hooks/set-state-in-effect); it
    // still renders before the status request can resolve.
    queueMicrotask(() => {
      if (!cancelled) setStage("checking");
    });
    checkPaymentStatus(pending).then((checked) => {
      if (cancelled) return;
      setResult(checked);
      setStage("result");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  async function onDetailsSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    const validation = validatePaymentRequest({
      amount: String(data.get("amount") ?? ""),
      name: data.get("name"),
      email: data.get("email"),
      reference: data.get("reference"),
    });
    if (!validation.ok) {
      setError(validation.error);
      setSubmitting(false);
      return;
    }
    const { amountCents: cents, name, email, reference } = validation.value;

    try {
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The API takes the amount in dollars, as it always has.
        body: JSON.stringify({
          amount: cents / 100,
          name,
          email,
          reference,
          hp: data.get("hp"),
        }),
      });
      if (res.status === 429) {
        throw new Error(
          "Too many attempts from your connection. Please wait a minute and try again.",
        );
      }
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body?.error ?? "Something went wrong.");
      }
      if (!body.clientSecret) {
        throw new Error("Server did not return a payment session.");
      }
      setClientSecret(body.clientSecret);
      setAmountCents(cents);
      setStage("card");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    clearPendingReturn();
    setStage("details");
    setClientSecret(null);
    setAmountCents(0);
    setResult(null);
    setError(null);
  }

  // Retry on the same PaymentIntent, so a failed attempt never leaves a
  // second open payment behind.
  function retry() {
    if (!result || result.amountCents === null) return reset();
    clearPendingReturn();
    setClientSecret(result.clientSecret);
    setAmountCents(result.amountCents);
    setResult(null);
    setStage("card");
  }

  if (!publishableKey) {
    return (
      <div className="rounded-2xl bg-card p-8 ring-1 ring-foreground/8">
        <h2 className="text-lg font-semibold text-foreground">
          Payment system not configured
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The Stripe publishable key is missing. Please email{" "}
          <ContactLink /> and we&apos;ll send a payment link directly.
        </p>
      </div>
    );
  }

  if (stage === "checking") {
    return <CheckingState />;
  }

  if (stage === "result" && result) {
    return <ResultState result={result} onRetry={retry} onReset={reset} />;
  }

  if (stage === "card" && clientSecret) {
    return (
      <div className="rounded-2xl bg-card p-8 ring-1 ring-foreground/8">
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: stripeAppearance }}
        >
          <CardStep amountCents={amountCents} onBack={reset} />
        </Elements>
      </div>
    );
  }

  return (
    <form
      onSubmit={onDetailsSubmit}
      noValidate
      className="rounded-2xl bg-card p-8 ring-1 ring-foreground/8"
    >
      <div className="space-y-5">
        <Field label="Amount due (USD)" htmlFor="amount" required>
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
            >
              $
            </span>
            <input
              id="amount"
              name="amount"
              type="number"
              inputMode="decimal"
              min="1"
              max="100000"
              step="0.01"
              required
              disabled={submitting}
              className={cn(inputClasses, "pl-7")}
              placeholder="0.00"
            />
          </div>
        </Field>

        <Field label="Invoice / reference" htmlFor="reference" hint="Optional">
          <input
            id="reference"
            name="reference"
            type="text"
            maxLength={MAX_INVOICE_REFERENCE_LENGTH}
            disabled={submitting}
            className={inputClasses}
            placeholder="INV-2026-014"
          />
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Name" htmlFor="name" required>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={MAX_PAYER_NAME_LENGTH}
              autoComplete="name"
              disabled={submitting}
              className={inputClasses}
              placeholder="Your name"
            />
          </Field>
          <Field label="Email" htmlFor="email" required>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={MAX_EMAIL_LENGTH}
              autoComplete="email"
              disabled={submitting}
              className={inputClasses}
              placeholder="you@company.com"
            />
          </Field>
        </div>

        {/* Honeypot — bots fill anything, humans never see this */}
        <div className="hidden" aria-hidden>
          <label htmlFor="payment-hp">Leave this field blank</label>
          <input
            id="payment-hp"
            name="hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {error ? (
          <div
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </div>
        ) : null}

        <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Secured by Stripe. Card details never reach our servers.
          </p>
          <Button
            type="submit"
            disabled={submitting}
            className="h-11 px-6 text-sm font-semibold"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                <span>Preparing…</span>
              </>
            ) : (
              <span>Continue to card</span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
