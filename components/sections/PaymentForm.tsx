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
import {
  ArrowLeft,
  CircleAlert,
  CircleCheck,
  CircleHelp,
  CircleX,
  Clock,
  Loader2,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/constants";
import { PAYMENT_PAGE } from "@/lib/content";
import { cn } from "@/lib/utils";
import o from "@/components/shared/optimism.module.css";
import {
  MAX_EMAIL_LENGTH,
  MAX_INVOICE_REFERENCE_LENGTH,
  MAX_PAYER_NAME_LENGTH,
  PAYMENT_ERRORS,
  STRIPE_RETURN_STORAGE_KEY,
  needsClientSecret,
  parseStoredPaymentReturn,
  paymentOutcome,
  readStripeReturn,
  validatePaymentRequest,
  type PaymentOutcome,
  type StoredPaymentReturn,
} from "@/lib/validation";

declare global {
  interface Window {
    // Set by the payment page's inline return script (lib/stripe-return-script.ts).
    __kapStripeReturn?: string;
  }
}

const copy = PAYMENT_PAGE.form;

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise: Promise<StripeJs | null> = publishableKey
  ? loadStripe(publishableKey)
  : Promise.resolve(null);

// 16px text keeps mobile browsers from zooming into the field on focus.
const inputClasses =
  "block h-12 w-full min-w-0 rounded-[10px] border border-rule bg-white px-4 text-base text-foreground transition-[border-color,box-shadow] duration-150 placeholder:text-ink-soft/70 focus:border-brand-magenta focus:outline-none focus:ring-3 focus:ring-brand-magenta/20 disabled:opacity-60 aria-invalid:border-destructive aria-invalid:focus:ring-destructive/20";

// Stripe's Payment Element renders in its own frame, so it is themed here to match the fields.
const stripeAppearance = {
  theme: "flat" as const,
  variables: {
    colorPrimary: "#b1296e",
    colorBackground: "#ffffff",
    colorText: "#1a1a1a",
    colorDanger: "#dc2626",
    colorTextSecondary: "#5c5c5c",
    fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    fontSizeBase: "16px",
    borderRadius: "10px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid #e3dcc2",
      padding: "12px 16px",
      backgroundColor: "#ffffff",
    },
    ".Input:focus": {
      border: "1px solid #b1296e",
      boxShadow: "0 0 0 3px rgba(177, 41, 110, 0.2)",
    },
    ".Label": {
      fontWeight: "600",
      color: "#1a1a1a",
      fontSize: "15px",
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
 * The payment return to show, if any. The inline script normally captures the
 * client secret before hydration; sessionStorage keeps the record across a
 * reload; reading the URL directly is a fallback for when the script did not
 * run.
 */
function loadStoredReturn(): StoredPaymentReturn | null {
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
    const clientSecret = readStripeReturn({
      clientSecret: secret,
      paymentIntentId: params.get("payment_intent"),
    });
    return clientSecret ? { kind: "pending", clientSecret } : null;
  }

  const stored = parseStoredPaymentReturn(raw, Date.now());
  if (!stored) clearStoredReturn();
  return stored;
}

function clearStoredReturn() {
  window.__kapStripeReturn = undefined;
  try {
    window.sessionStorage.removeItem(STRIPE_RETURN_STORAGE_KEY);
  } catch {
    // Storage unavailable: nothing was stored.
  }
}

type PaymentResult = {
  outcome: PaymentOutcome;
  /** Kept only while the outcome still needs it: see needsClientSecret. */
  clientSecret: string | null;
  paymentIntentId: string | null;
  amountCents: number | null;
  currency: string;
};

/**
 * Stripe has answered, so a final outcome no longer needs the client secret:
 * drop it from memory and storage. A reload then shows the same result from a
 * secret-free record, rather than an empty form that invites a second payment.
 */
function settleReturn(result: PaymentResult): PaymentResult {
  if (needsClientSecret(result.outcome)) return result;
  clearStoredReturn();
  try {
    window.sessionStorage.setItem(
      STRIPE_RETURN_STORAGE_KEY,
      JSON.stringify({
        outcome: result.outcome,
        paymentIntentId: result.paymentIntentId,
        amountCents: result.amountCents,
        currency: result.currency,
        savedAt: Date.now(),
      }),
    );
  } catch {
    // Storage unavailable: a reload shows the form again.
  }
  return { ...result, clientSecret: null };
}

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

type DetailsField = "amount" | "reference" | "name" | "email";
type Details = Record<DetailsField, string>;

const emptyDetails: Details = { amount: "", reference: "", name: "", email: "" };

// The shared validator returns one message; this places it under its field.
const errorField: Record<string, DetailsField> = {
  [PAYMENT_ERRORS.amountInvalid]: "amount",
  [PAYMENT_ERRORS.amountPrecision]: "amount",
  [PAYMENT_ERRORS.amountTooLow]: "amount",
  [PAYMENT_ERRORS.amountTooHigh]: "amount",
  [PAYMENT_ERRORS.nameRequired]: "name",
  [PAYMENT_ERRORS.nameTooLong]: "name",
  [PAYMENT_ERRORS.emailInvalid]: "email",
  [PAYMENT_ERRORS.referenceTooLong]: "reference",
};

type FieldError = { field: DetailsField; message: string };

/** Accessible props for a field: its help and error text, and its invalid state. */
function describe(field: DetailsField, fieldError: FieldError | null, hasHelp = false) {
  const invalid = fieldError?.field === field;
  const ids = [hasHelp ? `${field}-help` : null, invalid ? `${field}-error` : null].filter(Boolean);
  return {
    "aria-invalid": invalid || undefined,
    "aria-describedby": ids.length ? ids.join(" ") : undefined,
  };
}

function Field({
  label,
  htmlFor,
  optional,
  help,
  error,
  children,
}: {
  label: string;
  htmlFor: DetailsField;
  optional?: string;
  help?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={htmlFor}
        className="flex flex-wrap items-baseline justify-between gap-x-3 text-[0.9375rem] font-semibold text-foreground"
      >
        {label}
        {optional ? <span className="text-sm font-normal text-ink-soft">{optional}</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {help ? (
        <p id={`${htmlFor}-help`} className="mt-2 text-sm text-ink-soft">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-destructive">
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function StepHeading({ step, headingRef }: { step: 0 | 1; headingRef?: React.Ref<HTMLHeadingElement> }) {
  return (
    <div>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-coral-ink">
        Step {step + 1} {copy.stepOf} {copy.steps.length}
      </p>
      <h2
        ref={headingRef}
        tabIndex={headingRef ? -1 : undefined}
        className="mt-2 scroll-mt-32 font-display text-[1.6rem] font-bold leading-tight tracking-[-0.015em] focus:outline-none"
      >
        {copy.steps[step]}
      </h2>
    </div>
  );
}

/** The white card every stage of the payment sits in, with the logo-gradient edge. */
function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative min-w-0 overflow-hidden rounded-[20px] border border-rule bg-paper p-5 shadow-[0_24px_48px_-32px_rgb(26_26_26/0.35)] sm:p-8 md:p-10",
        o.accentEdge,
        className,
      )}
    >
      {children}
    </div>
  );
}

function ErrorAlert({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-[10px] border border-destructive/35 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive"
    >
      <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
      <p className="min-w-0 wrap-anywhere">{children}</p>
    </div>
  );
}

function Spinner() {
  return <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden />;
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
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Keyboard and screen-reader users land on the new step rather than on a removed button.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

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
    <form onSubmit={onSubmit} className="grid gap-7">
      <StepHeading step={1} headingRef={headingRef} />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-[14px] bg-deep-cream px-5 py-4">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft">
          {copy.amountDue}
        </span>
        <span className="font-display text-[1.75rem] font-bold tracking-[-0.02em]">{amountDisplay}</span>
      </div>

      <PaymentElement />

      {error ? <ErrorAlert>{error}</ErrorAlert> : null}

      <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="inline-flex items-center gap-2 self-start rounded-sm py-1 text-[0.9375rem] font-semibold text-ink-soft transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground disabled:opacity-50 sm:self-center"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {copy.back}
        </button>
        <Button
          type="submit"
          variant="coral"
          disabled={!stripe || submitting}
          className="h-auto min-h-13.5 rounded-[10px] px-6.5 py-3 text-base whitespace-normal"
        >
          {submitting ? (
            <>
              <Spinner />
              <span>{copy.processing}</span>
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
    <Panel>
      <div role="status" className="flex items-center gap-3 text-ink-soft">
        <Spinner />
        <span>Checking your payment status…</span>
      </div>
    </Panel>
  );
}

function ContactLink() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="rounded-sm font-semibold wrap-anywhere text-foreground underline decoration-foreground/40 underline-offset-4 hover:decoration-coral-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      {CONTACT_EMAIL}
    </a>
  );
}

const linkButtonClasses =
  "rounded-sm border-b border-foreground/40 pb-0.5 text-[0.9375rem] font-semibold transition-colors duration-150 hover:border-coral-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

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
    <p className="mt-5 rounded-[10px] bg-deep-cream px-4 py-3 text-sm text-ink-soft">
      Payment reference:{" "}
      <span className="font-mono wrap-anywhere text-foreground">{result.paymentIntentId}</span>
    </p>
  ) : null;

  const content: Record<
    PaymentOutcome,
    { icon: LucideIcon; tone: string; title: string; body: ReactNode; actions: ReactNode }
  > = {
    succeeded: {
      icon: CircleCheck,
      tone: "bg-brand-magenta text-brand-cream",
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
      icon: Clock,
      tone: "bg-brand-amber/25 text-foreground",
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
      icon: CircleAlert,
      tone: "bg-destructive/10 text-destructive",
      title: "Payment not completed.",
      body: (
        <>
          Your payment{amount ? ` of ${amount}` : ""} could not be completed,
          and this attempt was not charged. You can try again with the same or
          a different payment method.
        </>
      ),
      actions: (
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Button
            type="button"
            variant="coral"
            onClick={onRetry}
            className="h-auto min-h-13.5 rounded-[10px] px-6.5 py-3 text-base"
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
      icon: CircleX,
      tone: "bg-deep-cream text-foreground",
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
      icon: CircleHelp,
      tone: "bg-deep-cream text-foreground",
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

  const { icon: Icon, tone, title, body, actions } = content[result.outcome];

  return (
    <Panel>
      <div className={cn("flex size-12 items-center justify-center rounded-full", tone)}>
        <Icon aria-hidden className="size-6" />
      </div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 scroll-mt-32 font-display text-[1.75rem] font-bold leading-tight tracking-[-0.015em] focus:outline-none"
      >
        {title}
      </h2>
      <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-soft">{body}</p>
      {result.outcome === "unknown" ? null : reference}
      <div className="mt-8">{actions}</div>
    </Panel>
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
  const [fieldError, setFieldError] = useState<FieldError | null>(null);
  // What the customer typed, so "Change details" brings it back.
  const [details, setDetails] = useState<Details>(emptyDetails);
  const formRef = useRef<HTMLFormElement>(null);

  // A Stripe redirect lands here; ask Stripe what actually happened.
  useEffect(() => {
    const stored = loadStoredReturn();
    if (!stored) return;
    let cancelled = false;
    // Deferred out of the effect body (react-hooks/set-state-in-effect); it
    // still renders before the status request can resolve.
    queueMicrotask(() => {
      if (cancelled) return;
      if (stored.kind === "settled") {
        setResult({ ...stored.payment, clientSecret: null });
        setStage("result");
      } else {
        setStage("checking");
      }
    });
    if (stored.kind === "pending") {
      checkPaymentStatus(stored.clientSecret).then((checked) => {
        if (cancelled) return;
        setResult(settleReturn(checked));
        setStage("result");
      });
    }
    return () => {
      cancelled = true;
    };
  }, []);

  async function onDetailsSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    setFieldError(null);

    const data = new FormData(e.currentTarget);
    const entered: Details = {
      amount: String(data.get("amount") ?? ""),
      reference: String(data.get("reference") ?? ""),
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
    };
    const validation = validatePaymentRequest({
      amount: entered.amount,
      name: data.get("name"),
      email: data.get("email"),
      reference: data.get("reference"),
    });
    if (!validation.ok) {
      const field = errorField[validation.error];
      if (field) {
        setFieldError({ field, message: validation.error });
        formRef.current?.querySelector<HTMLInputElement>(`#${field}`)?.focus();
      } else {
        setError(validation.error);
      }
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
      setDetails(entered);
      setClientSecret(body.clientSecret);
      setAmountCents(cents);
      setStage("card");
    } catch (err) {
      // fetch rejects with a TypeError when the request never reaches the server.
      setError(
        err instanceof TypeError
          ? `We couldn't reach the payment service. Check your connection and try again, or email ${CONTACT_EMAIL}.`
          : err instanceof Error
            ? err.message
            : "Something went wrong.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    clearStoredReturn();
    setStage("details");
    setClientSecret(null);
    setAmountCents(0);
    setResult(null);
    setError(null);
    setFieldError(null);
    setDetails(emptyDetails);
  }

  // Back to the details with what was typed; submitting them again starts a
  // new payment, exactly as before.
  function backToDetails() {
    setStage("details");
    setClientSecret(null);
    setAmountCents(0);
    setError(null);
  }

  // Retry on the same PaymentIntent, so a failed attempt never leaves a
  // second open payment behind.
  function retry() {
    if (!result?.clientSecret || result.amountCents === null) return reset();
    clearStoredReturn();
    setClientSecret(result.clientSecret);
    setAmountCents(result.amountCents);
    setResult(null);
    setStage("card");
  }

  if (!publishableKey) {
    return (
      <Panel>
        <h2 className="font-display text-[1.5rem] font-bold leading-tight">
          Payment system not configured
        </h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          The Stripe publishable key is missing. Please email{" "}
          <ContactLink /> and we&apos;ll send a payment link directly.
        </p>
      </Panel>
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
      <Panel>
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: stripeAppearance }}
        >
          <CardStep amountCents={amountCents} onBack={backToDetails} />
        </Elements>
      </Panel>
    );
  }

  const fieldMessage = (field: DetailsField) =>
    fieldError?.field === field ? fieldError.message : undefined;

  return (
    <Panel>
      <form ref={formRef} onSubmit={onDetailsSubmit} noValidate className="grid gap-7">
        <StepHeading step={0} />

        <Field label={copy.amount.label} htmlFor="amount" help={copy.amount.help} error={fieldMessage("amount")}>
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-xl font-semibold text-ink-soft"
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
              aria-required
              defaultValue={details.amount}
              disabled={submitting}
              className={cn(inputClasses, "h-14 pl-9 text-xl font-semibold")}
              placeholder="0.00"
              {...describe("amount", fieldError, true)}
            />
          </div>
        </Field>

        <Field
          label={copy.reference.label}
          htmlFor="reference"
          optional={copy.reference.optional}
          help={copy.reference.help}
          error={fieldMessage("reference")}
        >
          <input
            id="reference"
            name="reference"
            type="text"
            maxLength={MAX_INVOICE_REFERENCE_LENGTH}
            defaultValue={details.reference}
            disabled={submitting}
            className={inputClasses}
            placeholder="INV-2026-014"
            {...describe("reference", fieldError, true)}
          />
        </Field>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-5">
          <Field label={copy.name.label} htmlFor="name" error={fieldMessage("name")}>
            <input
              id="name"
              name="name"
              type="text"
              required
              aria-required
              maxLength={MAX_PAYER_NAME_LENGTH}
              autoComplete="name"
              defaultValue={details.name}
              disabled={submitting}
              className={inputClasses}
              {...describe("name", fieldError)}
            />
          </Field>
          <Field label={copy.email.label} htmlFor="email" error={fieldMessage("email")}>
            <input
              id="email"
              name="email"
              type="email"
              required
              aria-required
              maxLength={MAX_EMAIL_LENGTH}
              autoComplete="email"
              defaultValue={details.email}
              disabled={submitting}
              className={inputClasses}
              {...describe("email", fieldError)}
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

        {error ? <ErrorAlert>{error}</ErrorAlert> : null}

        <div className="grid gap-4 border-t border-rule pt-7 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <p className="flex max-w-[34ch] items-start gap-2 text-sm leading-snug text-ink-soft">
            <Lock aria-hidden className="mt-0.5 size-4 shrink-0 text-coral-ink" />
            {copy.secureNote}
          </p>
          <Button
            type="submit"
            variant="coral"
            disabled={submitting}
            className="h-auto min-h-13.5 w-full shrink-0 rounded-[10px] px-6.5 py-3 text-base whitespace-normal sm:w-auto"
          >
            {submitting ? (
              <>
                <Spinner />
                <span>{copy.submitting}</span>
              </>
            ) : (
              <span>{copy.submit}</span>
            )}
          </Button>
        </div>
      </form>
    </Panel>
  );
}
