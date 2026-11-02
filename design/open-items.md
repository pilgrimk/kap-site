# Open Items — KAP Website Redesign

Gaps, pending decisions and production blockers. Provenance for every delivered image is
recorded here (CLAUDE.md §2.1).

## Imagery provenance

### Removed: `approachable-office-dusk.webp` and `.webp.json`

Deleted from `public/images/hero/` by owner decision on 2026-11-01 (finding T-02). It was an
AI-generated concept image (Concept 3, not selected), never displayed, with commercial-use terms
unconfirmed, and never cleared for production. No active page referenced it, and the built output
contains no reference. Three things remain, all left alone deliberately:

- The files stay in this branch's Git history until the owner decides otherwise. They were never on
  `main`.
- `design/concepts/approachable-automation/index.html` shows a broken image: it is a historical
  concept, not part of the site.
- Brief item B5 still asks whether the image may be used. The question is closed.

## Homepage implementation (2026-10-29, uncommitted, awaiting owner review)

Full record: `design/homepage.md`.

- **Process wording** ("How we work together") is proposed; confirm it matches how KAP works.
- **Recommendations:** check the three excerpts against the LinkedIn originals (brief B4).
- **Hero and full page are CORRECT, below the STRONG target** (see `design/homepage.md`).
- **Service pages** (brief A3) are not built; the homepage does not link to them yet.
- **Outside the homepage:** the About page's unsourced "3.5M+" and "200+" stats (B5) and its "Book a
  Discovery Call" button (A6) were removed in the About redesign (2026-10-30).
- **Nav label** kept as "Solutions" (existing URL); the concepts used "Services".
- **YouTube video `bjfNFUCjJLU` ("KAP Enterprises - Automations")**: approved by the owner
  (2026-10-29), who confirmed it still represents KAP's current services. Implemented between
  "What we automate" and "How we work together", starting at 0:00. Still open:
  - **Captions / transcript (accessibility):** availability could not be verified (YouTube's
    caption listings returned nothing to an automated request, which is inconclusive). Check in
    YouTube Studio; add captions if missing. No transcript was written, because the content could
    not be reviewed.
  - The video's content was not reviewed by the build (YouTube blocks automated viewing).
  - The HeyGen watermark is visible in the video itself (owner decision whether to re-render).
  - The privacy policy must cover YouTube (brief B6).

## AI Workflow Automation page (approved by the owner 2026-10-29)

Record: `design/services.md`.

- **Proposed wording to confirm:** approach step descriptions, scenario outcomes, capability
  descriptions and the closing copy (step names and the hero are the owner's).
- **"Appointments and scheduling"** is listed as an example the owner named; confirm KAP builds
  scheduling workflows (no scheduling integration is used on the site itself, brief A6).
- **Hunter O'Brien's quote** is the first sentence of his published recommendation; still to be
  checked against the LinkedIn original (B4).
- **Nav label "Solutions" vs "Services":** resolved by the Services menu (Phase 2D).
- **Social image:** none; see the Open Graph item under "Remediation".

## AI-Powered Customer Engagement page (approved by the owner 2026-10-29)

Record: `design/services.md` (Phase 2B).

- **Proposed wording:** everything except the hero headline and supporting copy (the owner's).
- **Brief B3:** confirm which channels KAP has delivered or will offer: website chat, messaging, email, AI voice agents. The page frames them as possibilities, not delivered work.
- **Scheduling:** confirm KAP builds appointment and callback request flows for clients.
- **Chandra Wrightsell's quote:** the first sentence of the published recommendation; to be checked against the LinkedIn original (B4).
- **Example conversations** are illustrative, with invented customers and businesses; confirm the owner is comfortable with the HVAC and catering examples.
- **Social image:** none; see the Open Graph item under "Remediation".
- **Nav label:** resolved by the Services menu (Phase 2D).

## Website Design & Development page (approved by the owner 2026-10-30)

Record: `design/services.md` (Phase 2C).

- **Proposed wording:** everything except the hero headline and supporting copy (the owner's). The problems, qualities, process stages and automation examples follow the owner's lists; their descriptions are proposed.
- **Brief B3:** commercial website development engagements are still unclassified. The page shows no client sites; once delivered client work is confirmed (with the client's permission), a real example could join the self-referential one.
- **"You're looking at one" claims** to confirm:
  - the site was "designed and built in-house";
  - "Checked at 17 screen widths ... and with enlarged text", which is true of the redesigned pages in this branch's QA;
  - "Built on Next.js, with a working contact form and online payments through Stripe".
- **Process claims** to confirm: KAP designs key pages before building and collects feedback. Before launch it sets page titles and descriptions and tests the contact form.
- **Appointment requests** (section F): confirm KAP builds these for clients. KAP's own site still has no scheduling (brief A6).
- **Illustrative "Fernway Landscaping"** business and its dated "before" site are invented; confirm the owner is comfortable with them.
- **Contact form:** resolved; "Website Development" was added with owner approval (Phase 2D).
- **Social image:** none; see the Open Graph item under "Remediation".
- **Phone captures go stale** when the homepage or service-page heroes change. Re-capture `public/images/websites/kap-{home,workflow,engagement}-phone.png` then.

### Imagery provenance: `public/images/websites/kap-*-phone.png`

| Field | Value |
| --- | --- |
| Class | Authentic: screenshots of KAP's own website (this repository) |
| Source | Captured with Playwright from the local production build, 2026-10-30: 390x844 at 2x, reduced motion, analytics blocked |
| Licensing | KAP's own work; no third-party imagery appears in the captured viewports |
| Production status | Cleared (the owner's own site), subject to the staleness note above |

## Services navigation (2026-10-30)

Record: `design/services.md` (Phase 2D).

- **Proposed wording:** the menu's one-line descriptions, "See all services", and the form label "What can we help with?".
- **Header "Contact" link removed:** the "Let's Talk" CTA reaches `/contact`; the footer still lists Contact.
  **Superseded 2026-10-30 (owner):** the header now reads Home | Services | About | Contact Us |
  Let's Talk, on desktop and mobile; both Contact Us and Let's Talk go to `/contact`.
  - To fit four links at 768px with enlarged text, the header shows the short "KAP" wordmark between
    768 and 1023px (as on phones), with "KAP Enterprises" from 1024px. Link spacing below 1024px is
    `gap-5` (it was `gap-8`), and nav links cannot wrap.
  - The footer's Navigate column is Services, About, Contact and Make Payment. Privacy Policy and
    Terms & Conditions appear only in the bottom bar. They were briefly added to Navigate as well,
    then removed at the owner's request on 2026-10-30.
- **Pre-existing `/payment` overflow:** fixed in the payment redesign (see `design/payment.md`).

## About page (approved by the owner 2026-10-30)

Record: `design/about.md`.

- **Founder photograph (brief B5):** none is approved, so none was used or generated. The founder
  section uses a typographic "30+" panel; a professional photograph would strengthen it most.
- **Proposed wording:** everything except the owner's hero headline, including the mission
  statement, the problem descriptions, the founder narrative and the five working habits.
- **Process claims to confirm:** KAP starts by understanding the business, recommends what fits,
  builds in steps, tests with realistic examples before launch and explains what was built.
- **"Founder" title:** from the owner's instruction; the brief itself says "led by". Confirm.
- **Recommendations:** three excerpts, whole sentences, unedited, from the recommendations
  published on the previous site, different from the homepage's. Still to be checked against the
  LinkedIn originals (B4).
- **Removed, pending sourcing:** "3.5M+ transactions per month" and "200+ enterprise client systems
  integrated" (B5).
- **Not used, pending confirmation:**
  - the applied-mathematics background, and the tools and protocols list (n8n, Make, Airtable,
    REST, SOAP, HL7, SQL), from the previous About copy;
  - "healthcare, finance, property management, and manufacturing" as Kevin's industries (the page
    names healthcare, payments and manufacturing from A2).
- **Other capabilities line:** "KAP also builds sales and marketing automations and custom software
  integrations" (brief A1). Confirm this is current.

## Privacy Policy and Terms (2026-10-30, DRAFTS, uncommitted)

Record: `design/legal.md`.

- **LAUNCH BLOCKER:** both pages are drafts with a visible "Draft for review" notice and "To
  confirm" callouts, and the footer links to them on every page. Merging this branch as it stands
  would publish them. Owner and legal review are required, then the notice and callouts are removed
  and both pages are added to the sitemap with noindex removed.
- **Answered by the owner (2026-10-30), now in the drafts:**
  - contact-inquiry handling;
  - payments are added to the CRM;
  - no sale of personal information;
  - Google Workspace hosts the inbox;
  - payment-record retention;
  - children under 13;
  - client-engagement documents;
  - refunds and disputes reviewed individually.
- **Revised (third round):** KAP CRM is not fed by the website. The "payments are added to the CRM"
  statement was removed, and "Making a payment does not subscribe you to promotional or marketing
  emails" was added (owner confirmed).
- **Still open (owner):**
  - whether, and how, payment information reaches KAP CRM (unconfirmed; the website has no CRM
    integration);
  - whether KAP CRM is hosted by a third-party provider that should be listed;
  - the Google Analytics data-retention period: not yet verified by the owner; read it from GA
    Admin.
- **For legal counsel:**
  - GA4 loads without consent or a cookie banner;
  - whether the "do not sell" statement needs qualifying given GA, and any opt-out or GPC
    requirement;
  - which privacy laws apply, and the rights and response steps to state;
  - whether a more explicit public refund policy is needed (Stripe or consumer protection);
  - disclaimers, limitation of liability and indemnification (not drafted);
  - governing law and venue (not assumed).
- **Typeform:** not linked on the site today, so not disclosed. Disclose it if the fit-check survey
  is reintroduced (B2).
- The brief's YouTube privacy item (Homepage section above) is covered by the draft.

## Contact page (2026-10-30, uncommitted, awaiting owner review)

Record: `design/contact.md`.

- **"Within one business day" removed** everywhere on the page (brief B2 is still open). Restore it
  only if the owner confirms the promise.
- **Proposed wording:** everything except the owner's headline. Includes the hero line, the form
  intro and help text, "What happens next", the success message and the "How KAP can help" intro.
- **Process claim to confirm:** "If we can help, we'll recommend a practical first step. If we're not
  the right fit, we'll say so."
- **Real delivery not tested:** no email was sent. An authorized end-to-end Resend test is still
  needed (production `RESEND_FROM` and `RESEND_TO`, and the sender domain's verification).
- **No rate limiter in this repository** (same as the payment form): consider platform-level
  protection.
- **`PageHero` and `SectionContainer`** are no longer used by any page; remove them in final
  verification if nothing else needs them.

## Payment page (approved by the owner 2026-10-30, uncommitted)

Record: `design/payment.md`.

- **Wording corrected from the instruction:** the integration is Stripe's embedded payment form on
  this page, not a redirect to Stripe Checkout. The hero and "What happens next" say so; confirm
  the replacement wording.
- **Card brands removed:** "Visa, Mastercard, Amex, Discover" was not verifiable, because payment
  methods come from the Stripe Dashboard (brief A10, D20). Confirm, or name the methods to show.
- **Receipt email:** `receipt_email` is set, but delivery depends on a Dashboard setting. The page
  does not promise a receipt.
- **Stripe end-to-end testing (brief A10):** still requires an authorized test-mode session; the
  checklist is in `design/payment.md`.
- **No rate limiter in this repository:** the form handles a 429, but nothing here returns one.
  Consider platform-level protection (for example the Vercel firewall). Not changed (protected
  integration).
- **Pre-existing `/payment` overflow:** fixed (see `design/payment.md`).

## Remediation (2026-11-01, uncommitted)

Record and evidence: `design/final-sitewide-qa.md`, section 10. Resolved there: T-01, T-02, T-06,
T-07 and L-02's code and draft wording, plus the homepage part of T-08 and the code part of T-04.

Still open from that work:

- **Apex redirect (owner, Vercel):** the bare domain still answers with a temporary 307 to `www`.
  Make it permanent in Vercel's domain settings. Not changed: production configuration.
- **Open Graph images (T-05):** workflow, engagement, websites and About have no `og:image` or
  `twitter:image`. No artwork was made, by instruction.
- **Workflow page animation (T-08):** `/services/workflow-automation` still loops with no pause
  control. Enabling the same control is a small change and needs owner approval.
- **Rate limiting (T-03):** recommendation is in section 11 of the QA record. Nothing is enabled.
- **Production Next.js (T-01):** `main` is still on 16.2.6. A separate minimal patch is recommended.
- **`shadcn` as a production dependency (T-10):** the source of the remaining critical audit item.
- **`@next/third-parties` 16.2.7** is left as it is: compatible with next 16.4.1, and not flagged.
- **Workflow label spacing (T-20):** the two labels nearly touch at 320px with enlarged text.

## Pending owner decisions

- **Hero copy** — the proposed headline is not approved (brief, Part B).
- **Hero concept** — Concept 1 is the preferred direction; the refined concept
  (`design/concepts/automation-in-action-refined/`) awaits owner review before homepage
  implementation. Hero impact is **CORRECT, below the STRONG target**, after the bounded
  escalation (two independent critiques, one refinement). A ready-to-run `/prototype` command is
  in `design/concepts/CONCEPT-RECORD.md`; running it is the owner's choice.
- **Authentic workflow capture** (brief B5) — the input most likely to lift the hero to STRONG.
- **Header CTA label** — "Let's Talk" (header) vs "Let's Talk About Your Business" (primary);
  same intent, two labels.
