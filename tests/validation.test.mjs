// Run with `npm test` (Node's built-in test runner; Node strips the TypeScript types).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  CONTACT_ERRORS,
  PAYMENT_ERRORS,
  cleanMultiline,
  cleanSingleLine,
  contactFieldErrors,
  isCrossSiteRequest,
  parseAmountToCents,
  paymentOutcome,
  readJsonBody,
  readStripeReturn,
  stripeConfigurationProblem,
  stripeKeyMode,
  validateContactSubmission,
  validatePaymentRequest,
} from "../lib/validation.ts";

const cents = (value) => {
  const result = parseAmountToCents(value);
  assert.equal(result.ok, true, `expected ${JSON.stringify(value)} to be valid`);
  return result.cents;
};
const amountError = (value) => {
  const result = parseAmountToCents(value);
  assert.equal(result.ok, false, `expected ${JSON.stringify(value)} to be rejected`);
  return result.error;
};

describe("parseAmountToCents", () => {
  it("accepts whole and two-decimal amounts as strings", () => {
    assert.equal(cents("1"), 100);
    assert.equal(cents("1.00"), 100);
    assert.equal(cents("1.5"), 150);
    assert.equal(cents("250.00"), 25000);
    assert.equal(cents(" 25.00 "), 2500);
    assert.equal(cents("0001.00"), 100);
  });

  it("accepts the number the payment form sends today", () => {
    assert.equal(cents(250), 25000);
    assert.equal(cents(10.1), 1010);
    assert.equal(cents(100000), 10_000_000);
  });

  it("converts without floating-point rounding errors", () => {
    // 4.35 * 100 === 434.99999999999994 and 19.99 * 100 === 1998.9999999999998
    assert.equal(cents("4.35"), 435);
    assert.equal(cents("19.99"), 1999);
    assert.equal(cents(4.35), 435);
    assert.equal(cents("1.10"), 110);
  });

  it("keeps the existing $1.00 to $100,000.00 range", () => {
    assert.equal(cents("1.00"), 100);
    assert.equal(cents("100000.00"), 10_000_000);
    assert.equal(amountError("0.99"), PAYMENT_ERRORS.amountTooLow);
    assert.equal(amountError("0"), PAYMENT_ERRORS.amountTooLow);
    assert.equal(amountError("100000.01"), PAYMENT_ERRORS.amountTooHigh);
    assert.equal(amountError("1000000"), PAYMENT_ERRORS.amountTooHigh);
    assert.equal(amountError("99999999999999999999"), PAYMENT_ERRORS.amountTooHigh);
  });

  it("rejects more than two decimal places", () => {
    assert.equal(amountError("100.999"), PAYMENT_ERRORS.amountPrecision);
    assert.equal(amountError("1.005"), PAYMENT_ERRORS.amountPrecision);
    assert.equal(amountError(1.005), PAYMENT_ERRORS.amountPrecision);
  });

  it("rejects malformed, signed, exponent and non-numeric input", () => {
    for (const value of [
      "12abc", "1e3", "1E3", "-5", "+5", "1,000", "1.", ".5", "", "  ",
      "$10", "10 USD", "0x10", "Infinity", "NaN",
      -5, 1e21, NaN, Infinity, null, undefined, true, {}, [],
    ]) {
      assert.equal(amountError(value), PAYMENT_ERRORS.amountInvalid, String(value));
    }
  });
});

describe("validatePaymentRequest", () => {
  const valid = { amount: 250, name: "Jordan Lee", email: "jordan@example.com" };

  it("keeps the invoice reference optional", () => {
    const result = validatePaymentRequest(valid);
    assert.equal(result.ok, true);
    assert.deepEqual(result.value, {
      amountCents: 25000,
      name: "Jordan Lee",
      email: "jordan@example.com",
      reference: "",
    });
  });

  it("accepts and cleans an invoice reference", () => {
    const result = validatePaymentRequest({ ...valid, reference: "  INV-2026-014 " });
    assert.equal(result.value.reference, "INV-2026-014");
  });

  it("strips control and bidirectional-override characters", () => {
    const result = validatePaymentRequest({
      ...valid,
      name: "Jordan\u0000\nLee",
      reference: "INV‮-41\u0007",
    });
    assert.equal(result.value.name, "Jordan Lee");
    assert.equal(result.value.reference, "INV -41");
  });

  it("enforces field lengths", () => {
    assert.equal(validatePaymentRequest({ ...valid, name: "a".repeat(120) }).ok, true);
    assert.equal(
      validatePaymentRequest({ ...valid, name: "a".repeat(121) }).error,
      PAYMENT_ERRORS.nameTooLong,
    );
    assert.equal(validatePaymentRequest({ ...valid, reference: "r".repeat(100) }).ok, true);
    assert.equal(
      validatePaymentRequest({ ...valid, reference: "r".repeat(101) }).error,
      PAYMENT_ERRORS.referenceTooLong,
    );
    const longEmail = `${"a".repeat(250)}@x.co`;
    assert.equal(
      validatePaymentRequest({ ...valid, email: longEmail }).error,
      PAYMENT_ERRORS.emailInvalid,
    );
  });

  it("requires a name and a valid email", () => {
    assert.equal(validatePaymentRequest({ ...valid, name: "  " }).error, PAYMENT_ERRORS.nameRequired);
    assert.equal(validatePaymentRequest({ ...valid, name: 42 }).error, PAYMENT_ERRORS.nameRequired);
    for (const email of ["", "jordan", "jordan@example", "jo rdan@example.com", "jordan@exa\u0000mple.com", null]) {
      assert.equal(validatePaymentRequest({ ...valid, email }).error, PAYMENT_ERRORS.emailInvalid);
    }
  });

  it("checks the amount first, as before", () => {
    assert.equal(
      validatePaymentRequest({ amount: "abc", name: "", email: "" }).error,
      PAYMENT_ERRORS.amountInvalid,
    );
  });
});

describe("Stripe key configuration", () => {
  it("reads only the key mode", () => {
    assert.equal(stripeKeyMode("pk_live_abc"), "live");
    assert.equal(stripeKeyMode("sk_test_abc"), "test");
    assert.equal(stripeKeyMode("rk_live_abc"), "live");
    assert.equal(stripeKeyMode("whsec_abc"), null);
    assert.equal(stripeKeyMode(undefined), null);
  });

  const live = { publishableKey: "pk_live_x", secretKey: "sk_live_x" };
  const test = { publishableKey: "pk_test_x", secretKey: "sk_test_x" };

  it("never blocks a production deployment with matching keys", () => {
    assert.equal(stripeConfigurationProblem({ ...live, vercelEnv: "production", nodeEnv: "production" }), null);
    // Self-hosted production (no VERCEL_ENV).
    assert.equal(stripeConfigurationProblem({ ...live, vercelEnv: undefined, nodeEnv: "production" }), null);
    // Restricted keys.
    assert.equal(
      stripeConfigurationProblem({ publishableKey: "pk_live_x", secretKey: "rk_live_x", vercelEnv: "production", nodeEnv: "production" }),
      null,
    );
  });

  it("allows test keys everywhere", () => {
    for (const vercelEnv of ["production", "preview", "development", undefined]) {
      for (const nodeEnv of ["production", "development"]) {
        assert.equal(stripeConfigurationProblem({ ...test, vercelEnv, nodeEnv }), null);
      }
    }
  });

  it("refuses mismatched modes", () => {
    assert.match(
      stripeConfigurationProblem({ publishableKey: "pk_live_x", secretKey: "sk_test_x", vercelEnv: "production", nodeEnv: "production" }),
      /different modes/,
    );
  });

  it("refuses live keys in previews and local development", () => {
    assert.match(stripeConfigurationProblem({ ...live, vercelEnv: "preview", nodeEnv: "production" }), /outside production/);
    assert.match(stripeConfigurationProblem({ ...live, vercelEnv: "development", nodeEnv: "development" }), /outside production/);
    assert.match(stripeConfigurationProblem({ ...live, vercelEnv: undefined, nodeEnv: "development" }), /outside production/);
  });

  it("does not block keys in an unrecognized format", () => {
    assert.equal(
      stripeConfigurationProblem({ publishableKey: "custom", secretKey: "custom", vercelEnv: "preview", nodeEnv: "development" }),
      null,
    );
  });
});

describe("Stripe return parameters", () => {
  const secret = "pi_3QabcDEF123_secret_Zyx987abc";

  it("accepts a well-formed client secret", () => {
    assert.equal(readStripeReturn({ clientSecret: secret }), secret);
    assert.equal(readStripeReturn({ clientSecret: secret, paymentIntentId: "pi_3QabcDEF123" }), secret);
  });

  it("ignores redirect_status entirely: a URL alone is never proof of payment", () => {
    // ?redirect_status=succeeded with no client secret yields nothing to check.
    assert.equal(readStripeReturn({ clientSecret: null, paymentIntentId: null }), null);
    assert.equal(readStripeReturn({ clientSecret: undefined }), null);
  });

  it("rejects manipulated or mismatched parameters", () => {
    for (const clientSecret of [
      "", "pi_123", "succeeded", "pi_123_secret_", "pi_123_secret_abc&x=1",
      "<script>alert(1)</script>", "seti_123_secret_abc", `${secret} `,
    ]) {
      assert.equal(readStripeReturn({ clientSecret }), null, clientSecret);
    }
    assert.equal(readStripeReturn({ clientSecret: secret, paymentIntentId: "pi_other" }), null);
  });
});

describe("paymentOutcome", () => {
  it("maps every PaymentIntent status to one page state", () => {
    assert.equal(paymentOutcome("succeeded"), "succeeded");
    assert.equal(paymentOutcome("processing"), "processing");
    assert.equal(paymentOutcome("requires_payment_method"), "failed");
    assert.equal(paymentOutcome("requires_confirmation"), "failed");
    assert.equal(paymentOutcome("requires_action"), "failed");
    assert.equal(paymentOutcome("canceled"), "canceled");
    assert.equal(paymentOutcome("requires_capture"), "unknown");
  });

  it("only a reported 'succeeded' status shows success", () => {
    for (const status of ["Succeeded", "success", "paid", "", null, undefined, "succeeded "]) {
      assert.notEqual(paymentOutcome(status), "succeeded", String(status));
      assert.equal(paymentOutcome(status), "unknown");
    }
  });
});

describe("contact validation", () => {
  const goals = ["General AI automation", "Not sure yet"];
  const valid = {
    name: "Jordan Lee",
    email: "jordan@example.com",
    company: "",
    goal: "Not sure yet",
    message: "Our invoices are entered by hand.",
  };

  it("reports every missing required field at once", () => {
    assert.deepEqual(contactFieldErrors({}), {
      name: CONTACT_ERRORS.nameRequired,
      email: CONTACT_ERRORS.emailInvalid,
      message: CONTACT_ERRORS.messageRequired,
    });
  });

  it("accepts a valid submission and keeps an allowed goal", () => {
    const result = validateContactSubmission(valid, goals);
    assert.equal(result.ok, true);
    assert.equal(result.value.goal, "Not sure yet");
  });

  it("drops a goal that is not one of the form's options", () => {
    const result = validateContactSubmission({ ...valid, goal: "<b>spam</b>" }, goals);
    assert.equal(result.ok, true);
    assert.equal(result.value.goal, "");
  });

  it("enforces field lengths", () => {
    assert.equal(validateContactSubmission({ ...valid, name: "a".repeat(100) }, goals).ok, true);
    assert.deepEqual(validateContactSubmission({ ...valid, name: "a".repeat(101) }, goals), {
      ok: false, field: "name", error: CONTACT_ERRORS.nameTooLong,
    });
    assert.equal(validateContactSubmission({ ...valid, company: "c".repeat(121) }, goals).field, "company");
    assert.equal(validateContactSubmission({ ...valid, message: "m".repeat(5000) }, goals).ok, true);
    assert.deepEqual(validateContactSubmission({ ...valid, message: "m".repeat(5001) }, goals), {
      ok: false, field: "message", error: CONTACT_ERRORS.messageTooLong,
    });
  });

  it("returns the first invalid field in form order", () => {
    const result = validateContactSubmission({ ...valid, email: "bad", message: "" }, goals);
    assert.equal(result.field, "email");
  });

  it("keeps subject-line fields on one line", () => {
    const result = validateContactSubmission(
      { ...valid, name: "Jordan\r\nBcc: someone@example.com", company: "Acme\nInc" },
      goals,
    );
    assert.equal(result.value.name, "Jordan Bcc: someone@example.com");
    assert.equal(result.value.company, "Acme Inc");
    assert.doesNotMatch(`${result.value.name}${result.value.company}`, /[\r\n]/);
  });

  it("normalizes message line endings and strips control characters", () => {
    assert.equal(cleanMultiline("Line 1\r\nLine 2\rLine 3\u0000\u0007"), "Line 1\nLine 2\nLine 3");
    assert.equal(cleanMultiline("Tabs\tstay"), "Tabs\tstay");
    assert.equal(cleanSingleLine("  a \t b\n c  "), "a b c");
    assert.equal(cleanSingleLine(undefined), "");
  });
});

describe("readJsonBody", () => {
  const post = (body, headers = { "content-type": "application/json" }) =>
    new Request("https://example.test/api", { method: "POST", headers, body });

  it("accepts a JSON object", async () => {
    const result = await readJsonBody(post('{"name":"Jordan"}'), 1024);
    assert.deepEqual(result, { ok: true, body: { name: "Jordan" } });
    const withCharset = await readJsonBody(
      post("{}", { "content-type": "application/json; charset=utf-8" }),
      1024,
    );
    assert.equal(withCharset.ok, true);
  });

  it("rejects other content types with 415", async () => {
    for (const headers of [
      { "content-type": "text/plain" },
      { "content-type": "application/x-www-form-urlencoded" },
      { "content-type": "application/jsonp" },
      {},
    ]) {
      assert.deepEqual(await readJsonBody(post("{}", headers), 1024), { ok: false, status: 415 });
    }
  });

  it("rejects oversized bodies with 413", async () => {
    const big = JSON.stringify({ message: "x".repeat(2000) });
    assert.deepEqual(await readJsonBody(post(big), 1024), { ok: false, status: 413 });
    // Multi-byte characters count by bytes, not characters.
    const wide = JSON.stringify({ message: "é".repeat(600) });
    assert.deepEqual(await readJsonBody(post(wide), 1024), { ok: false, status: 413 });
  });

  it("rejects malformed JSON and non-object values with 400", async () => {
    for (const body of ["{", "not json", "null", "[]", "[1,2]", "5", '"text"', "true", ""]) {
      assert.deepEqual(await readJsonBody(post(body), 1024), { ok: false, status: 400 }, body);
    }
  });
});

describe("isCrossSiteRequest", () => {
  const withSite = (value) =>
    new Request("https://example.test/api", {
      method: "POST",
      headers: value ? { "sec-fetch-site": value } : {},
    });

  it("refuses only explicit cross-site requests", () => {
    assert.equal(isCrossSiteRequest(withSite("cross-site")), true);
    assert.equal(isCrossSiteRequest(withSite("same-origin")), false);
    assert.equal(isCrossSiteRequest(withSite("same-site")), false);
    assert.equal(isCrossSiteRequest(withSite("none")), false);
    assert.equal(isCrossSiteRequest(withSite(null)), false);
  });
});
