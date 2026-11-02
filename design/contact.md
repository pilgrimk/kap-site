# Contact page redesign (2026-10-30)

`/contact`, redesigned to Modern Optimism under the owner's instruction of 2026-10-30. Visual,
content and usability redesign. **The submission flow is unchanged.** Uncommitted (owner rule: no
commits until the whole redesign is approved); awaiting owner review.

## The existing flow (unchanged)

1. **Form (`ContactForm`):**
   - **Fields and names:** `name`, `email`, `company` (optional), `goal` (optional select; its
     value is the option label from `GOAL_OPTIONS`), `message`, and the honeypot `hp`.
   - **Client-side validation:** `contactFieldErrors`, the same rules and messages the server uses:
     name required, ≤100 characters; valid email; company ≤120; message required, ≤5,000.
2. **`POST /api/contact`:**
   - cross-site requests are refused (403), and the body is read with a 32 KB cap;
   - a filled honeypot is silently accepted, so nothing is sent;
   - `validateContactSubmission` runs, and a failure returns 400 with `{ error, field }`;
   - `goal` must match the allow-list, or it is dropped;
   - Resend emails KAP (`RESEND_TO`, falling back to the contact address), with the sender as
     `reply_to`;
   - errors: 503 if the key is missing, 502 if Resend fails, 500 on an exception.
3. **No rate limiter in this repository.** The form shows a message for a 429 if the platform returns
   one.

Not changed: the route, validation, messages, limits, field names, option values, honeypot, request
body, environment variable names, and the URL.

## What changed

- **Hero:**
  - Compact, left-aligned: "Let's talk about your *business.*" (owner's headline).
  - The supporting line names the four areas: automation, customer engagement, websites and
    integrations.
  - The same atmosphere fade as the payment page.
- **Form panel:**
  - The payment page's paper card, with the logo-gradient edge, "Send us a message", and a one-line
    intro.
  - 48px fields, 16px text (no mobile zoom), and a coral primary button.
  - Company and "What can we help with?" sit side by side and are marked "Optional". The required
    asterisks are gone; the intro says fields are required unless marked optional.
  - **Help text:** "We'll reply to this address" under Email, and what to include under Message.
    These replace the placeholders, which included the owner's own name.
- **Validation:**
  - every invalid field is marked at once, with an icon, `aria-invalid`, and `aria-describedby`
    pointing to its error and help text;
  - focus moves to the first invalid field;
  - an error clears as soon as its field is edited.
- **Server errors:**
  - they appear in an alert, unchanged;
  - focus now returns to the submit button (it fell to the page because the button is disabled
    while sending);
  - a dropped connection says "We couldn't reach the server…" instead of "Failed to fetch".
- **Success:**
  - focus moves to "Message received.", as before;
  - the text no longer promises a response time;
  - "Send another message" restores an empty form.
- **Beside the form:**
  - "What happens next", in three steps;
  - a charcoal "Prefer email?" block with the email address and mailing address.
- **"How KAP can help":**
  - a deep-cream band below the form, with four areas in a 2×2 grid;
  - three link to their service pages; Integrations has no page, so it has no link;
  - the wording reuses the homepage and Services menu descriptions.

## Wording decisions

- **"Within one business day" removed** from the hero, the form footer, the success message and the
  info panel. Whether to keep it is an open owner decision (brief B2), and the instruction asked for
  no unverified response time.
- **"What happens next" describes the real flow.** The form emails the message to KAP (Resend), and
  replies go to the sender's address (`reply_to`). Step 3 ("we'll recommend a practical first step.
  If we're not the right fit, we'll say so") is a process claim to confirm.
- **"Not sure yet"** is referenced in the services band because it is an existing option.

## Verification (2026-10-30)

All browser tests intercepted `POST /api/contact`. **No request reached the real route, and no email
was sent.**

- **Checks:** tests 35/35; lint, TypeScript and the production build pass.
- **Responsive:**
  - widths: 320, 390, either side of 640, 768, 1024 and 1280, plus 1100, 1150, 1440 and 1920 (18);
  - text modes: default, 20px root, and 20px browser font;
  - states: the empty form, validation errors, and success;
  - **result:** 162 checks with no document overflow, element outside the viewport, or clipped text;
  - the header nav stays on one line at every desktop width and text mode (36 checks);
  - at 320px with a 20px browser font, `scrollWidth` 305 equals `clientWidth` 305.
- **Simulated submissions:**

| Scenario | Result |
| --- | --- |
| Empty submit | Three field errors, focus on Name, no request |
| Invalid email only | Email error, focus on Email |
| Typing in an invalid field | Its error clears |
| Valid submit (200) | Body `{name, email, company, goal: "Website Development", message, hp: ""}`, unchanged; "Message received." focused; form reset |
| 429 | Rate-limit message in the alert |
| 503 and 502 | Server's message in the alert |
| Network failure | "We couldn't reach the server…" |
| 400 with `field: "email"` | Inline error on Email, focused |
| Double click plus Enter while sending | 1 request; button shows "Sending…" |
| Focus after a server error | Returns to "Send message" |

- **Keyboard:** Name, Email, Company, "What can we help with?", Message, Send message, the email
  link, then the three service links. Visible focus on each.
- **Contrast:** minimum 4.72:1 (error text).
- **Reduced motion:** the only animation is the sending spinner, which stops.
- **Not run:** a real Resend delivery. Sending a real email was excluded by the instruction. Verify
  end-to-end with the owner's authorization, ideally on a preview deployment with the production
  `RESEND_*` settings.

## Screenshots

`design/screenshots/final/`:
- `contact-{1440,768,390}.png` and `-full.png`;
- `contact-390-error.png`;
- `contact-1440-success-mock.png` (simulated 200);
- `contact-320-text20.png`.
