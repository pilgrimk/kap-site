# Open Items — KAP Website Redesign

Gaps, pending decisions and production blockers. Provenance for every delivered image is
recorded here (CLAUDE.md §2.1).

## Imagery provenance

### `public/images/hero/approachable-office-dusk.webp`

| Field | Value |
| --- | --- |
| Class | Representative imagery (CLAUDE.md §2.2). Never evidence of KAP's premises, staff or work. |
| Source | AI-generated with the local image-generation engine, 2026-10-29 |
| Provenance record | Sidecar `public/images/hero/approachable-office-dusk.webp.json` (provider, model, timestamp, size, quality, bytes, prompt; no credential) |
| Geometry | 1536x1024, WebP, high quality |
| Generated for | Concept 3, Approachable Automation (concept-stage generation 1 of max 2) |
| Concept status | **Concept 3 has not been selected.** The owner's preferred direction is Concept 1, Automation in Action. |
| Commercial-use approval | **Pending.** The provider's commercial-use terms have not been confirmed. |
| Production status | **Not cleared for production.** Development asset only. |
| Location | Kept in place by owner instruction (2026-10-29). Not deleted, moved or regenerated. The concept record's plan to move it to `design/superseded-assets/` is deferred until the owner decides whether it serves as a supporting image (e.g. behind the final CTA). |

## Homepage implementation (2026-10-29, uncommitted, awaiting owner review)

Full record: `design/homepage.md`.

- **Process wording** ("How we work together") is proposed; confirm it matches how KAP works.
- **Recommendations:** check the three excerpts against the LinkedIn originals (brief B4).
- **Hero and full page are CORRECT, below the STRONG target** (see `design/homepage.md`).
- **Service pages** (brief A3) are not built; the homepage does not link to them yet.
- **Outside the homepage, unchanged:** the About page still shows the unsourced "3.5M+" and
  "200+" stats (B5) and a "Book a Discovery Call" button (A6) via `WhyKap` and `FinalCTA`.
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
- **Social image:** the page uses the site-wide Open Graph image; a service-specific one is optional.

## AI-Powered Customer Engagement page (approved by the owner 2026-10-29)

Record: `design/services.md` (Phase 2B).

- **Proposed wording:** everything except the hero headline and supporting copy (the owner's).
- **Brief B3:** confirm which channels KAP has delivered or will offer: website chat, messaging, email, AI voice agents. The page frames them as possibilities, not delivered work.
- **Scheduling:** confirm KAP builds appointment and callback request flows for clients.
- **Chandra Wrightsell's quote:** the first sentence of the published recommendation; to be checked against the LinkedIn original (B4).
- **Example conversations** are illustrative, with invented customers and businesses; confirm the owner is comfortable with the HVAC and catering examples.
- **Social image:** site-wide Open Graph image; a service-specific one is optional.
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
- **Social image:** site-wide Open Graph image; a service-specific one is optional.
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
- **Pre-existing `/payment` overflow:** 6px at 320px with a 20px browser font (form and aside cards). Not changed here, because it sits next to the protected Stripe flow.

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
- **Supporting image** — whether the generated image is used anywhere on the page, which requires
  commercial-use clearance first.
