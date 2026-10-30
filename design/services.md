# Service pages — design record

Phase 2A: **AI Workflow Automation** at `/services/workflow-automation` (route from brief A3).
Design and implementation approved by the owner (2026-10-29).

## Page structure (Modern Optimism, brief A12)

| # | Section | Component | Treatment |
|---|---|---|---|
| A | Hero | `ServiceHero` | Outcome headline (owner copy) + CTA beside an "Everyday tasks" board whose tasks flip from "By hand" to "Automated" once on load; "What changes" outcomes strip on the hero baseline |
| B | Sound familiar? | `ScenarioGrid` | Four before/after cards: muted "Today", coral connector, paper "With automation" card with the amber result tile |
| C | What we can automate | `CapabilityList` | Six examples as a ruled list (not packaged products) |
| D | How an automation works (`#example`) | `LinearWorkflow` | Five steps (inquiry → processed → CRM → follow-up → team) on the homepage's 7s loop and colour code; deep-cream band; labelled illustrative |
| E | How we work with you | `ApproachSteps` | Owner's four steps as a vertical timeline beside the heading |
| F | Proven tools, built properly | `ToolsAndProof` | Tool names as text chips (no logos), founder credential, Hunter O'Brien's n8n recommendation |
| G | Closing CTA | `ClosingCTA` (shared) | The homepage's charcoal band, with service-specific copy |

## Reusable foundation for the remaining four pages

- **Content-driven components** in `components/sections/services/`: every section takes its content
  as a prop from `lib/content.ts` (`SERVICE_*` objects; icons by name via `icons.ts`). A new page is
  a content object plus a route file like `app/services/workflow-automation/page.tsx`.
- **Shared pieces** promoted to `components/shared/`: `ClosingCTA` (homepage now uses it too),
  `WorkflowMotion` (pause/resync; optional `layoutQuery`), `optimism.module.css` (atmosphere,
  gradient edge, video poster), and `YoutubeFacade` from the video work.
- **Keep the pages from looking identical** (brief A5): reuse the structure, but give each page
  its own hero visual (the task board belongs to workflow automation), choose which sections apply,
  and vary the example diagram's subject. Customer Engagement and Sales & Marketing could reuse
  `LinearWorkflow` with their own steps; Custom Software and Websites likely need a different
  section D.
- **Metadata pattern:** title, description, canonical, Open Graph and a `Service` JSON-LD built only
  from facts the site states; add each route to `app/sitemap.ts`.

## Decisions

- **Route** `/services/workflow-automation` per brief A3 (not the proposed
  `/services/ai-workflow-automation`).
- **Homepage link:** the featured AI Workflow Automation card links here ("Explore AI Workflow
  Automation"); the other four have no links until their pages exist.
- **Navigation label:** kept "Solutions" → `/#solutions`. Recommended change to "Services" once a
  `/services` overview (or a services menu) exists, so the label matches the `/services/*` URLs
  without pointing at a page that does not exist.
- **Copy sources:** hero, outcomes, situations, categories and approach step names from the owner's
  Phase 2A brief; tools and "the way enterprise software is built" from the About page; credential
  from brief A2; Hunter O'Brien's sentence verbatim from his published recommendation (relationship
  per A7). Step descriptions and the closing copy are proposed wording.
- **Motion:** the task board animates once (calm); the example workflow loops on the homepage's
  cycle and pauses when hidden or off screen. Reduced motion shows the finished state of both.
- **CSS Modules are unlayered and override Tailwind utilities**: keep spacing and layout utilities
  out of conflict with module rules (found and fixed in QA).

## Verification (2026-10-29)

- `npm test` 35/35, lint, `tsc --noEmit`, `npm run build`: pass.
- Playwright, production build, analytics blocked: service page and homepage at 17 widths
  (320-1920, breakpoints ±1) × default, 20px CSS root and 20px browser font: no overflow, clipping or
  nav wrapping. Minimum text contrast 4.8:1.
- Motion: example workflow 7000ms × infinite, paused off screen and while hidden, resumes from the
  same point; reduced motion: no animations, board shows "Automated".
- Metadata, canonical, Open Graph and JSON-LD present and valid; one `h1`, ordered `h2`s; header and
  hero focus visible; `/contact` form field names unchanged; sitemap lists the route.
- Fixed in QA: the example label's spacing (module margin overriding Tailwind); the hero task
  board overflowing at 320px and with enlarged text up to 390px (status pills were being clipped).
- Screenshots: `design/screenshots/final/service-workflow-{1440,768,390}[-full].png`,
  `service-workflow-320-board.png`.
