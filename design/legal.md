# Privacy Policy and Terms & Conditions (2026-10-30, revised 2026-11-02)

`/privacy` and `/terms`. **Approved by the owner on 2026-11-02 and technically ready for publication
with the coordinated release.** They are not attorney-reviewed or legally certified. The first version
is in local checkpoint `f21f5af`; the later revisions are uncommitted.

**Current content is described in "Final revision (2026-11-02)" and "Owner approval (2026-11-02)"
below.** The dated sections after this one are the drafting history, and their open questions and
draft safeguards are superseded by them.

## Starting point: there was nothing to audit

The instruction asked for a review of the existing pages, but neither page exists:
- no `/privacy` or `/terms` route in this repository, nor in its history on any branch;
- the live site returns 404 for `/privacy`, `/privacy-policy`, `/terms`, `/terms-and-conditions`,
  `/terms-of-service` and `/legal`;
- the footer had no legal links.

The brief lists both pages (A3) but says not to publish legal text without review, and not to create
placeholder legal text that could reach production (A9). Who drafts and reviews it is an open
decision (B6). **The owner chose (2026-10-30) to have both drafted from verified site behaviour,
marked as drafts.** No provisions existed, so none were "preserved"; nothing is copied from a
template.

### Safeguards against a draft reaching production

- A visible "Draft for review" notice on both pages, stating they must not be published in this
  form.
- Every unconfirmed point was a visible "To confirm" callout (6 in the Privacy Policy, 3 in the Terms).
  The 2026-11-02 revision resolved or reworded all of them, so none remain.
- `robots: noindex, nofollow`; both pages are left out of `sitemap.ts`.
- **Launch blocker** in `design/open-items.md`: merging this branch would publish the drafts (the
  footer now links to them site-wide).

## Verified facts the drafts rely on

Checked in code and in the rendered local production build on 2026-10-30.

| Fact | Evidence |
| --- | --- |
| Contact form fields: name, email, company (optional), goal (optional), message | `ContactForm.tsx`, `/api/contact` |
| Contact messages are emailed to KAP through Resend, with the sender as `reply_to`. No database. | `app/api/contact/route.ts` |
| Payment form: amount, reference (optional), name, email. Card data entered in Stripe's Payment Element. | `PaymentForm.tsx` |
| Stripe receives amount (USD), name, email, reference (metadata), `receipt_email`, description | `create-payment-intent/route.ts` |
| Payment limits $1.00–$100,000.00 USD | `lib/validation.ts`, brief A10 |
| Server logs carry no form content: only error names, statuses and Stripe error identifiers | both API routes |
| GA4 (`@next/third-parties`) loads only after the visitor accepts and with no Global Privacy Control signal. (Changed 2026-11-02; before that it loaded on every page with no consent step.) | `components/shared/AnalyticsConsent.tsx`; browser test with hits intercepted |
| Content pages contact no other third party. Fonts are self-hosted (`next/font`). | Network log of `/`, `/about`, `/contact` |
| The homepage video loads nothing from YouTube until play is pressed, then `youtube-nocookie.com` | `YoutubeFacade.tsx`, `YoutubeEmbed.tsx` |
| Stripe.js loads only on `/payment` (js.stripe.com, m.stripe.network, m.stripe.com, r.stripe.com) | Network log |
| Stripe cookies: `__stripe_mid` (365 days), `__stripe_sid` (30 minutes), `m` on m.stripe.com (400 days) | Browser cookie jar after loading `/payment` |
| `sessionStorage` payment-return record: holds the client secret until Stripe answers. Succeeded or canceled: the secret is deleted and only reference, amount, currency, status and time stay, so a reload shows the result. Failed, processing or unconfirmed: the secret stays for the retry or re-check. All of it goes on a new payment or retry, after 1 hour, or when the tab closes. (Corrected 2026-11-01, finding L-02.) | `stripe-return-script.ts`, `PaymentForm.tsx`, `lib/validation.ts` |
| `localStorage` holds one site value: `kap.analytics-consent.v1`, either "accepted" or "declined" | `lib/analytics-consent.ts` |
| Hosting on Vercel; HTTPS (the live site redirects to `https://www.`) | Brief, `curl` |
| Typeform survey: **not linked anywhere** on the site today, so not disclosed | `SOLUTIONS_SURVEY_COPY` is unused |

**Not observed (documented, not measured):**
- GA cookie names and lifetimes: GA requests were blocked in testing, to avoid sending test hits to
  the real property. The policy names `_ga` and `_ga_…` and links to Google's documentation instead
  of stating lifetimes.
- YouTube storage after playback.

Provider policy links were checked to resolve (HTTP 200). Vercel's URL is now
`/legal/privacy-notice`.

## Privacy Policy: what it says

Sections:
1. Who we are
2. Information you give us
3. Information collected automatically
4. How we use information
5. Service providers (table)
6. Cookies (table)
7. Retention
8. Your choices and requests
9. Security
10. Children
11. Links to other websites
12. Changes
13. Contact

Within those sections:
- **Service providers** names Resend, Stripe, Google Analytics, YouTube and Vercel. The policy does
  not claim that no third parties receive information.
- **Cookies** lists only what the site actually uses.
- **Retention** states the verified fact (no website database: email and Stripe) and leaves periods
  to the owner.
- **Children** states the audience fact; the under-13 statement is a question.
- **Contact** (sections 1 and 13): the LLC, email and mailing address from `lib/constants.ts`.

**Owner wording added (2026-10-30):**
- A section 5, "How we handle contact inquiries", in the owner's words, verbatim.
- What it answers:
  - inquiries are used to review and respond;
  - they may be retained if the person is interested in working with KAP;
  - otherwise they are discarded when no longer needed;
  - inquiries are not automatically added to a marketing mailing list.
- The CRM question is narrowed to payment details, and the retention question to payment records and
  the GA setting.
- Later sections were renumbered (14 in total).

**Owner decisions applied (2026-10-30, second round):**
- **Payments and CRM:** a new section, "How we handle payment information":
  - Stripe processes card details, and KAP stores no card numbers;
  - KAP adds payment names and email addresses to its CRM, *separately from the website*;
  - records are kept as long as tax, accounting and legal obligations require;
  - Stripe keeps its own records independently.
- **No sale:** a new section, "Selling and sharing information": "We do not sell your personal
  information to third parties". Sharing with service providers is described separately, and Google
  Analytics is noted. Counsel is flagged on statutory "sale/sharing" definitions, opt-outs and GPC.
- **Google Workspace (Gmail):** added to the providers table. Resend is now described as *sending*
  messages and Workspace as *receiving and storing* them. Retention now notes that deleted emails may
  persist in provider backups.
- **Payment retention:** "for as long as required to meet applicable tax, accounting and legal
  obligations". No fixed period.
- **Children's privacy:**
  - not intended for children under 13;
  - KAP does not knowingly collect their information;
  - contact KAP so it can review and delete such information.
- The privacy policy now has 16 sections.

**Payment-to-CRM finding:** the website has **no CRM integration**:
- only two server routes, `/api/contact` and `/api/stripe/create-payment-intent`;
- no webhook, no CRM SDK, and no CRM environment variable (names checked in `.env.example`; no
  values read);
- payment data goes only to Stripe (amount, `receipt_email`, a description, and metadata
  `customer_name`, `customer_email` and `invoice_reference`).

The owner's practice therefore happens outside the website, either by hand or through a Stripe–CRM
connection configured elsewhere, which this repository cannot see. The policy says the website
does not do it automatically.

**Third round (2026-10-30): KAP CRM clarified. This supersedes the "payments are added to the CRM"
wording above.**
- KAP's own CRM is "KAP CRM". The website does not feed it.
- **Contact form paragraph:** messages are delivered to KAP's business inbox by email and are not
  sent to any customer database. If the person expresses interest, relevant information from the
  correspondence *may* be recorded in KAP CRM. No automation is claimed: the owner says capture
  happens through KAP's email functionality, which the site cannot verify.
- **Payment section, rewritten to verified facts only:**
  - the website sends payment information to Stripe for processing;
  - KAP may keep transaction-related information for accounting, tax, customer service and legal
    purposes, for as long as those obligations require;
  - Stripe keeps its own records;
  - **"Making a payment does not subscribe you to promotional or marketing emails"** (owner
    confirmed). This matches the approved inquiry statement and says nothing about KAP's marketing
    in general.
- **Removed:** "KAP adds the name and email address you give when paying to its CRM". **Not
  replaced** by a claim that payments never reach the CRM. The Stripe-to-KAP-CRM path is left as an
  *unconfirmed* note.
- The approved "How we handle contact inquiries" section is unchanged (all four paragraphs checked
  verbatim).

**To confirm (owner):**
- whether, and how, payment information reaches KAP CRM;
- whether KAP CRM is hosted or run by a third-party provider (if so, add it to the providers
  table);
- the GA retention period. It can't be verified from the site without GA admin access. Viewing
  Admin › Data collection and modification › Data retention is read-only, and no live events were
  generated.

**For counsel:**
- GA4 without consent and without a cookie banner (EU, UK and US state laws);
- whether GA counts as "sharing";
- which privacy laws apply, and the rights, response times and verification steps to state.

## Terms & Conditions: what they say

Sections:
1. About these terms
2. Website terms and client agreements
3. Using the website
4. Information on this website
5. Intellectual property
6. Payments
7. Third-party services and links
8. Availability
9. Disclaimers and limitation of liability
10. Governing law
11. Changes
12. Contact

- **Client agreements:** the website terms are kept distinct from client service agreements, and a
  client agreement prevails where the two conflict.
- **Information on this website:** says the service-page examples are illustrative. This matches
  the invented "Fernway Landscaping" and the example conversations.
- **Payments:** only verified facts (USD, the limits, Stripe, no card data held, completion is
  shown by the page), plus "email us" for refunds and disputes. **No refund policy has been
  invented.**
- **Not drafted, left as questions for counsel:**
  - disclaimers of warranties and a limitation of liability;
  - governing law and venue (the Arizona mailing address is noted, not assumed);
  - indemnification (not included).

**Owner decisions applied (2026-10-30, second round):**
- **Client engagements:** KAP uses written agreements, proposals and invoices, depending on the
  project. The website terms don't replace them, and a signed agreement with different terms
  governs that engagement.
- **Refunds and disputes:** they are reviewed individually under the applicable client agreement,
  and raised by email. "Nothing in these terms limits" statutory rights or card-issuer and
  payment-provider dispute procedures. No automatic or guaranteed refund and no refund period are
  stated.

**Still open (for counsel):**
- whether Stripe or consumer-protection rules need a more explicit public refund policy;
- disclaimers, limitation of liability and indemnification;
- governing law and venue.

## Final revision (2026-11-02)

Applies the owner's final decisions. The owner asked for practical, accurate documents to the best of
our ability, without waiting for counsel. **This is not legal advice, and no attorney has reviewed it.**
Design unchanged. Now 16 Privacy sections and 13 Terms sections, with no callouts.

**Owner decisions applied:**
- **Inquiries:** kept while needed for legitimate business purposes. Those that lead to no business
  relationship are deleted when no longer needed. No fixed schedule, no period and no automatic deletion.
- **CRM:** inquiries go to the business inbox. KAP may record relevant details in its internal CRM manually
  or selectively. The website does not send submissions to the CRM.
- **Marketing:** form submissions are not used to enroll visitors in marketing campaigns. Nothing is said
  about KAP's marketing generally.
- **Selling:** "We do not sell customer contact lists, and we do not intentionally sell the inquiry
  details you submit", stated separately from processing by service providers and Google Analytics.
- **Refunds:** mistaken and duplicate payments are investigated, with appropriate refunds or corrections
  by circumstances and law; others are evaluated individually. No signed agreement is needed to report a
  payment error. No automatic refund, timeframe or nonrefundable statement. A signed agreement's
  provisions govern where one exists, subject to law.
- **Payment status:** the processor's records decide, in the owner's wording, replacing "complete only
  when the payment page confirms it".
- **Terms:** website-use terms are separated from project obligations. New warranty disclaimer and
  limitation of liability cover the public website only, and preserve legally required liability, non-waivable
  rights, payment-error handling and client agreements. No liability cap or indemnification was added.
- **Governing law and venue:** Arizona, and state or federal courts in Maricopa County, subject to mandatory
  law and consumer protections. "State or federal" is a drafting choice for the owner to confirm.
- **Acceptance:** "By using it, you agree" and "continuing to use means you accept" were replaced with
  terms that apply when you submit a form or make a payment, and updated terms that apply to later use.

**Disclosures corrected against the code:**
- **Stripe:** receives amount, name, email and reference; KAP does not directly collect or store full card
  details; receipts depend on account settings.
- **Payment session record:** stops being used after one hour and is removed the next time the page opens
  after that, on a new payment or retry, or when the tab's session ends. The code sets no guaranteed
  deletion time.
- **Cookies:** added Stripe's `m`. Stripe's Privacy Center names it as a fraud-prevention cookie, in the
  regional version found. The about-400-day lifetime comes from this project's browser check on
  2026-10-30, not from Stripe's documentation.
- **Consent:** the policy says plainly that the site has no cookie-consent banner and does not respond to
  signals such as Global Privacy Control. Both are true of the code. Nothing was added or changed in tracking.
- **Analytics retention:** general language only, because the setting has not been confirmed.

**Not stated on the public pages:** that the contact form is verified only locally. That is tracked as a
launch task in `design/open-items.md`.

## Owner approval (2026-11-02)

The owner approved both documents with three wording corrections, and confirmed the public mailing
address: KAP Enterprises, LLC, PO Box 3573, Scottsdale, AZ 85271.

**Corrections applied, superseding "Final revision" where they differ:**
- **Privacy, section 9:** the statement that the site has no cookie-consent banner and does not respond
  to signals such as Global Privacy Control was replaced with the owner's wording on cookies, browser
  settings and Google's opt-out add-on. This is a wording change only; no consent or opt-out function was
  added. See the analytics item in `design/open-items.md`, which stays open.
- **Privacy, cookie table:** Stripe's `m` cookie now reads "Fraud prevention and payment security.
  Duration is determined by Stripe." The `__stripe_mid` and `__stripe_sid` lifetimes were kept, as they
  match the browser check and Stripe's cookie settings page.
- **Terms, section 6:** "The payment page currently supports amounts from $1.00 to $100,000.00 USD,
  subject to payment processing restrictions."

**Publication changes applied:**
- Draft notices and the "To confirm" callout code removed.
- Date labels now read "Last updated: November 2, 2026".
- `noindex` removed from both pages, which keep their canonicals.
- `/privacy` and `/terms` added to the sitemap.

## Analytics consent revision (2026-11-02)

The owner approved consent controls for Google Analytics, so the approved policy text was updated to match the
new behaviour. Unrelated sections, the address, the date and the Terms are unchanged. The owner should read
these passages; they were written after the approval above.

- **Section 3, Analytics:** optional, does not load unless accepted, and declining does not affect normal access.
- **Section 7, providers table:** Google Analytics "only if you accept".
- **Section 8:** "If you accept analytics…", pointing to the next section for choices.
- **Section 9, cookies:** `_ga` applies only if accepted; new row for `kap.analytics-consent.v1`; new paragraphs
  on the choice, withdrawal and Global Privacy Control. Withdrawal does not erase data Google already has.
- **Section 11:** points to "Cookie Preferences".

## Presentation

- **Shared `LegalDocument` component:** the payment-style compact hero, with the draft date as the
  eyebrow.
- **Draft notice:** an amber callout.
- **Numbered contents:** two columns from `sm`; anchors land below the sticky header
  (`scroll-mt-28`).
- **Reading column:** a single 48rem column, 17px body text at line height 1.7, numbered section
  headings.
- **Tables:** real tables (`th scope`) from `md`; stacked cards on phones, so nothing scrolls
  sideways.
- **External links:** open in a new tab, with `noopener noreferrer`, an arrow icon and screen-reader
  text "(opens in a new tab)".
- **Motion:** none.
- **Footer:** a "Privacy Policy" and "Terms & Conditions" row in the bottom bar (`LEGAL_LINKS` in
  `lib/constants.ts`). This is the only change to shared layout.

## Verification (2026-10-30)

- **Checks:** tests 35/35; lint, TypeScript and the production build pass.
- **Responsive:**
  - 2 pages × 18 widths (320–1920, either side of each breakpoint, plus 1100 and 1150) × 3 text
    modes;
  - **result:** 108 checks with no overflow, out-of-viewport element, clipped text or wrapped nav
    item;
  - at 320px with a 20px browser font, `scrollWidth` 305 equals `clientWidth` 305.
- **Links:**
  - every internal link on both pages returns 200;
  - all 25 contents anchors resolve;
  - the footer legal links appear site-wide.
- **Metadata:** titles "Privacy Policy — KAP Enterprises" and "Terms & Conditions — KAP Enterprises",
  descriptions, canonicals, noindex/nofollow; not in the sitemap.
- **Accessibility:**
  - one `h1` per page, with no skipped heading levels;
  - tables use header cells;
  - **contrast:** page content passes. The footer column headings measured 4.49:1 here and were later
    corrected to 5.35:1 (`design/final-sitewide-qa.md`, T-07).

## Screenshots

`design/screenshots/final/`:
- `privacy-{1440,768,390}.png` and `-full.png`;
- `terms-{1440,768,390}.png` and `-full.png`;
- `privacy-320-text20.png`.
