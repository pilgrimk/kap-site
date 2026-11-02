# Privacy Policy and Terms & Conditions (2026-10-30)

`/privacy` and `/terms`. **DRAFTS**, not reviewed by the owner or legal counsel. Uncommitted (owner
rule: no commits until the whole redesign is approved).

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
- Every unconfirmed point is a visible "To confirm" callout, not settled text.
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
| GA4 loads on every page whenever `NEXT_PUBLIC_GA_ID` is set (`@next/third-parties`). No consent banner. | `app/layout.tsx`; the rendered pages request `googletagmanager.com` |
| Content pages contact no other third party. Fonts are self-hosted (`next/font`). | Network log of `/`, `/about`, `/contact` |
| The homepage video loads nothing from YouTube until play is pressed, then `youtube-nocookie.com` | `YoutubeFacade.tsx`, `YoutubeEmbed.tsx` |
| Stripe.js loads only on `/payment` (js.stripe.com, m.stripe.network, m.stripe.com, r.stripe.com) | Network log |
| Stripe cookies: `__stripe_mid` (365 days), `__stripe_sid` (30 minutes), `m` on m.stripe.com (400 days) | Browser cookie jar after loading `/payment` |
| `sessionStorage` payment-return record: holds the client secret until Stripe answers. Succeeded or canceled: the secret is deleted and only reference, amount, currency, status and time stay, so a reload shows the result. Failed, processing or unconfirmed: the secret stays for the retry or re-check. All of it goes on a new payment or retry, after 1 hour, or when the tab closes. (Corrected 2026-11-01, finding L-02.) | `stripe-return-script.ts`, `PaymentForm.tsx`, `lib/validation.ts` |
| No `localStorage` use by the site | Code search and browser check |
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
  - **contrast:** page content passes. The lowest value is the **pre-existing footer column
    headings ("Navigate", "Contact") at 4.49:1**, just under 4.5:1. They are shared by every page
    and left for final site-wide verification.

## Screenshots

`design/screenshots/final/`:
- `privacy-{1440,768,390}.png` and `-full.png`;
- `terms-{1440,768,390}.png` and `-full.png`;
- `privacy-320-text20.png`.
