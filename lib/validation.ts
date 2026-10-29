// Validation shared by the API routes and the forms that call them.
// Kept free of imports so `node --test` can load it directly (see tests/).

// ---------------------------------------------------------------------------
// Text normalization
// ---------------------------------------------------------------------------

// C0/C1 control characters, plus bidirectional overrides that can disguise
// text when it is shown in an email client or the Stripe Dashboard.
const UNSAFE_CHARACTERS = /[\u0000-\u001f\u007f-\u009f‪-‮⁦-⁩]/g;

// Same set minus tab and newline, for multi-line fields.
const UNSAFE_MULTILINE_CHARACTERS =
  /[\u0000-\u0008\u000b-\u001f\u007f-\u009f‪-‮⁦-⁩]/g;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MAX_EMAIL_LENGTH = 254;

/** Single-line text: unsafe characters become spaces, runs of whitespace collapse. */
export function cleanSingleLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(UNSAFE_CHARACTERS, " ").replace(/\s+/g, " ").trim();
}

/** Multi-line text: line endings are normalized and kept, other unsafe characters removed. */
export function cleanMultiline(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/\r\n?/g, "\n")
    .replace(UNSAFE_MULTILINE_CHARACTERS, "")
    .trim();
}

/** The trimmed address, or null when it is not a plausible email address. */
export function cleanEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim();
  if (!email || email.length > MAX_EMAIL_LENGTH) return null;
  if (/[\u0000-\u001f\u007f-\u009f‪-‮⁦-⁩]/.test(email)) {
    return null;
  }
  return EMAIL_PATTERN.test(email) ? email : null;
}

// ---------------------------------------------------------------------------
// Payment requests
// ---------------------------------------------------------------------------

export const MIN_PAYMENT_CENTS = 100; // $1.00
export const MAX_PAYMENT_CENTS = 10_000_000; // $100,000.00
export const MAX_PAYER_NAME_LENGTH = 120;
export const MAX_INVOICE_REFERENCE_LENGTH = 100;

export const PAYMENT_ERRORS = {
  amountInvalid: "Enter a valid amount, for example 250.00.",
  amountPrecision: "Amounts can have at most two decimal places.",
  amountTooLow: "Amount must be at least $1.00.",
  amountTooHigh:
    "Amount cannot exceed $100,000. Contact us for larger payments.",
  nameRequired: "Name is required.",
  nameTooLong: "Name is too long.",
  emailInvalid: "A valid email address is required.",
  referenceTooLong: "Invoice reference is too long.",
  invalidRequest: "Invalid request body.",
} as const;

export type AmountResult =
  | { ok: true; cents: number }
  | { ok: false; error: string };

/**
 * Parses a dollar amount into integer cents using string arithmetic, so no
 * floating-point rounding is involved. Accepts the number the payment form
 * sends today, or a numeric string. Rejects exponents, signs, separators and
 * more than two decimal places.
 */
export function parseAmountToCents(value: unknown): AmountResult {
  let text: string;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return { ok: false, error: PAYMENT_ERRORS.amountInvalid };
    }
    text = String(value);
  } else if (typeof value === "string") {
    text = value.trim();
  } else {
    return { ok: false, error: PAYMENT_ERRORS.amountInvalid };
  }

  const match = /^(\d+)(?:\.(\d+))?$/.exec(text);
  if (!match) return { ok: false, error: PAYMENT_ERRORS.amountInvalid };

  const [, whole, fraction = ""] = match;
  if (fraction.length > 2) {
    return { ok: false, error: PAYMENT_ERRORS.amountPrecision };
  }
  // Anything with more than seven whole digits is far above the maximum;
  // checking length first keeps Number() well inside the safe-integer range.
  if (whole.replace(/^0+/, "").length > 7) {
    return { ok: false, error: PAYMENT_ERRORS.amountTooHigh };
  }

  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  if (cents < MIN_PAYMENT_CENTS) {
    return { ok: false, error: PAYMENT_ERRORS.amountTooLow };
  }
  if (cents > MAX_PAYMENT_CENTS) {
    return { ok: false, error: PAYMENT_ERRORS.amountTooHigh };
  }
  return { ok: true, cents };
}

export type PaymentRequest = {
  amountCents: number;
  name: string;
  email: string;
  reference: string;
};

export type PaymentValidation =
  | { ok: true; value: PaymentRequest }
  | { ok: false; error: string };

export function validatePaymentRequest(
  body: Record<string, unknown>,
): PaymentValidation {
  const amount = parseAmountToCents(body.amount);
  if (!amount.ok) return amount;

  const name = cleanSingleLine(body.name);
  if (!name) return { ok: false, error: PAYMENT_ERRORS.nameRequired };
  if (name.length > MAX_PAYER_NAME_LENGTH) {
    return { ok: false, error: PAYMENT_ERRORS.nameTooLong };
  }

  const email = cleanEmail(body.email);
  if (!email) return { ok: false, error: PAYMENT_ERRORS.emailInvalid };

  // The invoice reference stays optional.
  const reference = cleanSingleLine(body.reference);
  if (reference.length > MAX_INVOICE_REFERENCE_LENGTH) {
    return { ok: false, error: PAYMENT_ERRORS.referenceTooLong };
  }

  return {
    ok: true,
    value: { amountCents: amount.cents, name, email, reference },
  };
}

// ---------------------------------------------------------------------------
// Stripe key configuration
// ---------------------------------------------------------------------------

export type StripeKeyMode = "live" | "test";

/** Reads only the mode prefix of a key (pk_/sk_/rk_ + live/test). */
export function stripeKeyMode(key: string | undefined): StripeKeyMode | null {
  const match = /^(?:pk|sk|rk)_(live|test)_/.exec(key ?? "");
  return match ? (match[1] as StripeKeyMode) : null;
}

/**
 * Returns a description of an unsafe key setup, or null when payments may
 * proceed. It never blocks a production deployment: a mismatched pair cannot
 * take payments anyway, and live keys are refused only where the runtime says
 * it is a Vercel preview, a Vercel development environment, or `next dev`.
 * Keys in an unrecognized format are not blocked.
 */
export function stripeConfigurationProblem(env: {
  publishableKey: string | undefined;
  secretKey: string | undefined;
  vercelEnv: string | undefined;
  nodeEnv: string | undefined;
}): string | null {
  const publishable = stripeKeyMode(env.publishableKey);
  const secret = stripeKeyMode(env.secretKey);
  if (publishable && secret && publishable !== secret) {
    return "Stripe publishable and secret keys are for different modes";
  }
  const nonProduction =
    env.vercelEnv === "preview" ||
    env.vercelEnv === "development" ||
    env.nodeEnv === "development";
  if (secret === "live" && nonProduction) {
    return "Live Stripe key used outside production";
  }
  return null;
}

// ---------------------------------------------------------------------------
// Payment return handling
// ---------------------------------------------------------------------------

/** sessionStorage key written by the payment page's inline return script. */
export const STRIPE_RETURN_STORAGE_KEY = "kap:stripe-return";
/** How long a stored return stays usable, so an old tab does not resurface it. */
export const STRIPE_RETURN_MAX_AGE_MS = 60 * 60 * 1000;

const CLIENT_SECRET_PATTERN = /^(pi_[A-Za-z0-9]+)_secret_[A-Za-z0-9]+$/;

/**
 * Extracts a well-formed PaymentIntent client secret from Stripe's return
 * parameters. `redirect_status` is deliberately ignored: it is a hint in a
 * user-controllable URL, never proof of payment. When a `payment_intent` id
 * is present it must match the secret.
 */
export function readStripeReturn(params: {
  clientSecret: string | null | undefined;
  paymentIntentId?: string | null;
}): string | null {
  const match = CLIENT_SECRET_PATTERN.exec(params.clientSecret ?? "");
  if (!match) return null;
  if (params.paymentIntentId && params.paymentIntentId !== match[1]) {
    return null;
  }
  return match[0];
}

export type PaymentOutcome =
  | "succeeded"
  | "processing"
  | "failed"
  | "canceled"
  | "unknown";

/** Maps a PaymentIntent status reported by Stripe to what the page shows. */
export function paymentOutcome(status: string | null | undefined): PaymentOutcome {
  switch (status) {
    case "succeeded":
      return "succeeded";
    case "processing":
      return "processing";
    // Not completed: the customer can retry on the same PaymentIntent.
    case "requires_payment_method":
    case "requires_confirmation":
    case "requires_action":
      return "failed";
    case "canceled":
      return "canceled";
    // Includes requires_capture, which this integration never requests.
    default:
      return "unknown";
  }
}

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------

export const CONTACT_LIMITS = {
  name: 100,
  company: 120,
  message: 5000,
} as const;

export const CONTACT_ERRORS = {
  nameRequired: "Name is required.",
  nameTooLong: "Name is too long.",
  emailInvalid: "A valid email address is required.",
  companyTooLong: "Company name is too long.",
  messageRequired: "Message is required.",
  messageTooLong: "Message is too long.",
} as const;

export type ContactField = "name" | "email" | "company" | "message";

export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  goal: string;
  message: string;
};

/** Every field problem at once, in form order, so the form can mark them all. */
export function contactFieldErrors(
  input: Record<string, unknown>,
): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {};

  const name = cleanSingleLine(input.name);
  if (!name) errors.name = CONTACT_ERRORS.nameRequired;
  else if (name.length > CONTACT_LIMITS.name) {
    errors.name = CONTACT_ERRORS.nameTooLong;
  }

  if (!cleanEmail(input.email)) errors.email = CONTACT_ERRORS.emailInvalid;

  if (cleanSingleLine(input.company).length > CONTACT_LIMITS.company) {
    errors.company = CONTACT_ERRORS.companyTooLong;
  }

  const message = cleanMultiline(input.message);
  if (!message) errors.message = CONTACT_ERRORS.messageRequired;
  else if (message.length > CONTACT_LIMITS.message) {
    errors.message = CONTACT_ERRORS.messageTooLong;
  }

  return errors;
}

export type ContactValidation =
  | { ok: true; value: ContactSubmission }
  | { ok: false; field: ContactField; error: string };

const CONTACT_FIELD_ORDER: ContactField[] = ["name", "email", "company", "message"];

/**
 * Validates and normalizes a submission. `goal` must be one of the form's own
 * option labels; anything else is dropped rather than rejected.
 */
export function validateContactSubmission(
  input: Record<string, unknown>,
  allowedGoals: readonly string[],
): ContactValidation {
  const errors = contactFieldErrors(input);
  for (const field of CONTACT_FIELD_ORDER) {
    const error = errors[field];
    if (error) return { ok: false, field, error };
  }

  const goal = cleanSingleLine(input.goal);
  return {
    ok: true,
    value: {
      name: cleanSingleLine(input.name),
      email: cleanEmail(input.email) as string,
      company: cleanSingleLine(input.company),
      goal: allowedGoals.includes(goal) ? goal : "",
      message: cleanMultiline(input.message),
    },
  };
}

// ---------------------------------------------------------------------------
// Request guards for the API routes
// ---------------------------------------------------------------------------

export type JsonBodyResult =
  | { ok: true; body: Record<string, unknown> }
  | { ok: false; status: number };

/**
 * Reads a JSON object body, enforcing the content type and a size limit.
 * Anything that is not a JSON object (null, arrays, primitives) is rejected.
 */
export async function readJsonBody(
  request: Request,
  maxBytes: number,
): Promise<JsonBodyResult> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!/^application\/json(?:\s*;|$)/i.test(contentType.trim())) {
    return { ok: false, status: 415 };
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return { ok: false, status: 413 };
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).length > maxBytes) {
    return { ok: false, status: 413 };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, status: 400 };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, status: 400 };
  }
  return { ok: true, body: parsed as Record<string, unknown> };
}

/**
 * Fetch Metadata check. Browsers send `Sec-Fetch-Site: same-origin` for the
 * site's own forms, so only an explicit `cross-site` value is refused. A
 * missing header (older browsers, server-side clients) is allowed: this is a
 * supplementary filter, not authentication.
 */
export function isCrossSiteRequest(request: Request): boolean {
  return request.headers.get("sec-fetch-site") === "cross-site";
}
