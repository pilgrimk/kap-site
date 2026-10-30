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
- **Nav label "Solutions" vs "Services":** recommended change once a services overview exists.
- **Social image:** the page uses the site-wide Open Graph image; a service-specific one is optional.

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
