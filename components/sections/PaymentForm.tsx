"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
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

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise: Promise<StripeJs | null> = publishableKey
  ? loadStripe(publishableKey)
  : Promise.resolve(null);

const inputClasses =
  "block w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:opacity-60";

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
    // On success, Stripe redirects to return_url with redirect_status param.
  }

  const amountDisplay = (amountCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="rounded-lg bg-muted px-5 py-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/55">
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

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-2xl bg-card p-10 ring-1 ring-foreground/8">
      <div className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
        <span aria-hidden className="text-lg">
          ✓
        </span>
      </div>
      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
        Payment received.
      </h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Thank you. Stripe will email you a receipt shortly. If you don't see
        it, check your spam folder or reach us at{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-foreground underline"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-xs font-medium text-primary underline-offset-4 hover:underline"
      >
        Make another payment
      </button>
    </div>
  );
}

type Stage = "details" | "card" | "success";

export function PaymentForm() {
  const [stage, setStage] = useState<Stage>("details");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amountCents, setAmountCents] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("redirect_status") === "succeeded") {
      setStage("success");
      window.history.replaceState({}, "", "/payment");
    }
  }, []);

  async function onDetailsSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    const amountInput = String(data.get("amount") ?? "");
    const amount = parseFloat(amountInput);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const reference = String(data.get("reference") ?? "").trim();

    if (!Number.isFinite(amount) || amount < 1) {
      setError("Enter an amount of at least $1.00.");
      setSubmitting(false);
      return;
    }
    if (amount > 100000) {
      setError(
        "Amount cannot exceed $100,000. For larger payments, please contact us.",
      );
      setSubmitting(false);
      return;
    }
    if (!name) {
      setError("Enter your name.");
      setSubmitting(false);
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, name, email, reference }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body?.error ?? "Something went wrong.");
      }
      if (!body.clientSecret) {
        throw new Error("Server did not return a payment session.");
      }
      setClientSecret(body.clientSecret);
      setAmountCents(Math.round(amount * 100));
      setStage("card");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStage("details");
    setClientSecret(null);
    setAmountCents(0);
    setError(null);
  }

  if (!publishableKey) {
    return (
      <div className="rounded-2xl bg-card p-8 ring-1 ring-foreground/8">
        <h2 className="text-lg font-semibold text-foreground">
          Payment system not configured
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The Stripe publishable key is missing. Please email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-foreground underline"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          and we'll send a payment link directly.
        </p>
      </div>
    );
  }

  if (stage === "success") {
    return <SuccessState onReset={reset} />;
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
              autoComplete="email"
              disabled={submitting}
              className={inputClasses}
              placeholder="you@company.com"
            />
          </Field>
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
