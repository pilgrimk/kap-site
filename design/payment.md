# Payment page redesign (2026-10-30)

`/payment`, redesigned to Modern Optimism under the owner's instruction of 2026-10-30. This is a
visual and usability redesign. **Payment processing is unchanged.** Uncommitted; awaiting owner
review.

## The existing payment flow (documented before any change)

This is **not Stripe Checkout**. Nothing redirects to a Stripe-hosted checkout page, and no checkout
session exists. The integration is a PaymentIntent with Stripe's embedded Payment Element.

1. **Details (on this page, `PaymentForm`):**
   - **Fields:** amount, invoice/reference (optional), name, email, and the honeypot `hp`.
   - **Client-side validation:** the same `validatePaymentRequest` the server uses:
     - amount $1.00–$100,000.00, at most 2 decimals;
     - name required, ≤120 characters;
     - valid email, ≤254 characters;
     - reference ≤100 characters.
2. **`POST /api/stripe/create-payment-intent`** (server boundary), in this order:
   - a cross-site request is refused (403);
   - the body must be a JSON object, `application/json`, ≤4 KB (415, 413 or 400);
   - a filled honeypot is refused (400);
   - the fields are validated again (400 with the message);
   - the secret key is checked: if it is missing, or the key modes mismatch, or a live key is used
     outside production, the route returns 503;
   - **creates the PaymentIntent:** USD, automatic payment methods, `receipt_email`, a description
     and metadata (name, email, reference);
   - **returns:** `{ clientSecret }`, or 502 with a generic message, logging only Stripe error
     identifiers.
3. **Payment method (on this page):**
   - `Elements` and `PaymentElement` render Stripe's own iframe; payment details go straight to
     Stripe.
   - "Pay $X" calls `stripe.confirmPayment` with `return_url` `/payment`. Stripe returns the
     customer to that URL.
4. **Return:**
   - **Before hydration and analytics:** the inline `STRIPE_RETURN_SCRIPT` moves the return
     parameters, including the client secret, into `sessionStorage` (1 hour) and strips them from
     the address bar.
   - **Status check:** `PaymentForm` retrieves the PaymentIntent's real status from Stripe and
     shows succeeded, processing, failed, canceled or unknown (`redirect_status` is ignored).
   - **After the check (corrected 2026-11-01, finding L-02):** succeeded and canceled are final, so
     the client secret is deleted from storage and memory. A secret-free record (reference, amount,
     currency, status, time) replaces it, so a reload shows the result instead of an empty form
     that invites a second payment. Failed, processing and unknown keep the secret, because a retry
     or the next reload's re-check needs it. Everything is cleared by a new payment, a retry, the
     1-hour expiry or closing the tab. Corrupted or expired records are removed.
   - **Retry:** "Try again" reuses the same PaymentIntent.
5. **Not in this repository:**
   - no rate limiter (the form only handles a 429 if the platform returns one);
   - no webhook;
   - no reconciliation (brief A10: manual).

## What changed

- **Visual:**
  - **Hero:** compact Modern Optimism hero ("Simple, secure *payments.*"), with an atmosphere that
    fades out.
  - **Form panel:** paper, with the logo-gradient edge, a "Step 1 of 2 / Step 2 of 2" heading, and
    larger, clearer fields at 16px (no mobile zoom).
  - **Amount field:** the most prominent field, with the permitted range stated under it.
  - **Primary button:** coral.
  - **Side column:** "What happens next" (three steps), a charcoal "Processed by Stripe" note, and
    help (email and `/contact`).
  - **Result states:** they keep their wording, with icons instead of text glyphs.
  - **Stripe Payment Element:** its appearance now matches the fields (border, radius, 16px).
- **Usability:**
  - **Validation errors:** the first error appears under its field, with `aria-invalid` and
    `aria-describedby`, and focus moves there. Server errors keep the alert box.
  - **Focus:** it moves to the step heading when the payment step opens (it was lost to the page
    before).
  - **"Change details":** replaces "Back to amount" and keeps what was typed. Submitting again
    creates a new PaymentIntent, as "Back to amount" always did.
  - **Network failure:** it now says "We couldn't reach the payment service…" instead of the
    browser's "Failed to fetch".
  - **Spinners:** they stop under reduced motion.
- **Removed:** the card-brand list ("Visa, Mastercard, Amex, Discover…"). Payment methods come from
  Stripe's settings (automatic payment methods, brief A10 D20), so the page cannot promise them.
- **Unchanged:** the API route, validation, limits, field names, honeypot, request body, return
  script, status handling, retry, environment variable names, `noindex`, and the route.

## Wording corrected from the instruction

- **"You'll be directed to Stripe to complete your transaction":** inaccurate. The payment form is
  Stripe's, embedded on this page. Used instead: "You'll enter your payment details in Stripe's
  secure payment form, and Stripe processes the transaction."
- **"Continue to Stripe's secure checkout":** inaccurate for the same reason. Used instead: "Stripe's
  secure payment form opens on this page."
- **"Receive the existing confirmation experience":** described as what exists: this page checks the
  status with Stripe and shows the result with a payment reference. Stripe's email receipt is not
  promised: `receipt_email` is set, but delivery depends on Dashboard settings that haven't been
  verified.

## The 320px enlarged-text overflow

- **Cause:** the form and info grid had no explicit columns, so its implicit `auto` track sized to
  the form's min-content width. That was the inputs' built-in default width plus 2rem of fixed card
  padding on each side: 281px inside a 245px container at 320px with a 20px browser font. The form
  and aside ran 6px past the viewport.
- **Fix, with no overflow clipping:**
  - explicit `grid-cols-1` / `minmax(0, …)` tracks;
  - `min-w-0` on the inputs, panel and aside;
  - responsive card padding (1.25rem on phones);
  - long email addresses can break (`wrap-anywhere`).
- **Result:** at 320px with a 20px browser font, `scrollWidth` equals `clientWidth`.

## Verification (2026-10-30)

All browser tests intercepted `POST /api/stripe/create-payment-intent` with mocked responses, and
Stripe's API (`api.stripe.com`) with mocked or blocked responses. **No valid request reached the real
endpoint, no PaymentIntent was created, and no Stripe key was read or printed.**

- **Checks:** tests 35/35; lint, TypeScript and the production build pass.
- **Responsive:**
  - 19 widths (320–1920, either side of 640, 768, 1024 and 1280, plus 1100 and 1150) × 3 text modes
    (default, 20px root, 20px browser font) × 3 states (details, validation error, payment step):
    171 checks, 0 failures;
  - header nav on one line throughout.
- **Keyboard:** amount, reference, name, email, then Continue, then the help links. Visible focus
  everywhere. Enter submits. Focus moves to the payment step's heading, then Tab reaches "Change
  details".
- **Contrast:** minimum 4.72:1 (the error text).
- **Reduced motion:** no animation; spinners are static.

### Stripe validation coverage

| Scenario | How verified | Result |
| --- | --- | --- |
| Invalid amount (below $1, above $100,000, 3 decimals, non-numeric, negative) | Client: browser form. Server: the real local route, requests that fail validation before any Stripe call | Field error and focus; 400 with the exact message |
| Invalid reference (>100 characters) | Client and real route | Field error; 400 |
| Missing name, invalid email | Client and real route | Field errors; 400 |
| Honeypot, cross-site, wrong content type, body >4 KB, malformed JSON, JSON array, GET | Real route | 400, 403, 415, 413, 400, 400, 405 |
| Valid payment initiation (request shape) | Mocked API | Body is `{amount: dollars, name, email, reference, hp}`, unchanged; payment step shown |
| Server failures (400, 502, 503, 429, missing `clientSecret`, network) | Mocked API | Correct message in the alert each time |
| Duplicate submissions | Mocked slow API, double click plus Enter | Exactly 1 request |
| Return: succeeded, processing, failed, canceled | Real return script; Stripe's status lookup mocked | Correct outcome, reference, focus; address bar cleaned before scripts |
| Return: status lookup fails | Lookup mocked to 500 | "We couldn't confirm your payment." |
| Retry after failure | Mocked failed status | Reuses the same PaymentIntent; no new request |
| **Checkout-session creation** | Not applicable | The integration creates a PaymentIntent, not a Checkout Session |

### Still needs an authorized Stripe test-mode session

These were not run: the brief (A10) requires separate authorization, and the configured key mode
was not inspected.

1. **A real PaymentIntent:** create one through the route with test keys; check its amount,
   currency, `receipt_email`, description and metadata in the Dashboard.
2. **The real Payment Element:** confirm it renders, and which payment methods it offers (Dashboard
   settings).
3. **Successful payment:** with test card `4242…`, confirm the redirect back and "Payment
   received."
4. **3-D Secure:** test cards `4000 0025 0000 3155` (pass) and fail; confirm processing and failed
   handling.
5. **Declined card:** `4000 0000 0000 0002`; confirm the inline error, and that Try again stays on
   the same PaymentIntent.
6. **Canceled or abandoned payment:** an abandoned card step leaves an incomplete PaymentIntent (no
   charge); confirm that is acceptable.
7. **Receipt email delivery:** live-mode Dashboard setting.
8. **Production:** keys are live in production only (`stripeConfigurationProblem` refuses live keys
   on previews), and the deployed CSP or headers allow `js.stripe.com`.

## Screenshots

`design/screenshots/final/`:
- `payment-{1440,768,390}.png` and `-full.png`;
- `payment-390-error.png`;
- `payment-320-text20.png` (the fixed overflow case);
- `payment-1440-card-mock.png` (payment step; Stripe's form is empty because the client secret is
  mocked);
- `payment-1440-result-mock.png` (succeeded, mocked status).
