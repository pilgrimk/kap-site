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

---

# Phase 2B: AI-Powered Customer Engagement

`/services/customer-engagement` (route from brief A3). Design and implementation approved by the owner (2026-10-29).

## Page structure

| # | Section | Component | Treatment |
|---|---|---|---|
| A | Hero | `ConversationHero` (new) | Owner headline and copy beside an example website chat that plays once: question, typing, AI reply, details captured, confirmation. It ends with a charcoal "Sent to your team" card that breaks out of the chat panel, showing a person taking over. Replay button. |
| B | Where conversations slip away | `DayTimeline` (new) | Four moments on an ordinary day (missed call, slow reply, repeated questions, after hours) as a timetable on a deep-cream band; times labelled illustrative |
| C | What AI customer engagement can handle | `CapabilityList` (reused) + channels row | Six capabilities, then "Where it can work" (website chat, messaging, email, phone with an AI voice agent) with a note that channels are decided per business |
| D | A conversation, start to handoff (`#conversation`) | `AnnotatedConversation` (new) | Charcoal band, the page's one committed visual moment: an after-hours catering inquiry with margin notes on what the assistant does, beside an equally sized handoff note (contact, request, what needs a person) |
| E | People stay in charge | `BoundarySplit` (new) | "The assistant handles" / "Your team handles" cards joined by a "Hands over" marker, on a deep-cream band |
| F | How we set it up | `ApproachSteps` (reused) | Discovery, configuration, integration, testing, handoff; no support promise |
| G | Engineered, not improvised | `ToolsAndProof` (reused) | Tools as text, founder credential, Chandra Wrightsell's recommendation (engagement-specific sentence) |
| H | Closing CTA | `ClosingCTA` (shared) | Service-specific copy |

Tonal rhythm: cream hero, deep-cream band, cream, **charcoal band**, deep-cream band, cream, cream, charcoal close.

## Distinct from Workflow Automation (brief A5)

The page shares the hero text column (`ServiceHeroCopy`, extracted from `ServiceHero`), the capability, approach and tools sections, and the closing CTA. Its hero visual, problem section, example section and boundary section are its own. The Workflow page uses a task board and an outcomes strip; this page uses a conversation with a human handoff, and has no outcomes strip.

## Motion

- The hero conversation plays **once**, rather than looping like the workflow diagrams. It is a reading surface beside the headline, so a loop would compete with the copy.
- 14 CSS animations, opacity and transform only, run from 0.4s to 5.5s. Typing dots run a finite number of times, so nothing animates after the sequence ends.
- `WorkflowMotion` (shared; `layoutQuery={null}`) holds the sequence while the page is hidden or the panel is off screen, so phone visitors see it play.
- `ReplayButton` restarts the sequence. It is rendered `hidden` and revealed after hydration, so it never shows without JavaScript, and it is hidden under reduced motion.
- Fails open: the un-animated state is the finished conversation. Reduced motion shows it complete, with the typing dots hidden.
- Section D is static.

## Integrity decisions

- **Brief B3:** AI voice agents and AI customer support agents are not yet classified as delivered services. The page presents them as what can be set up ("Where it can work", "Which channels and integrations fit depends on your business"), never as completed projects.
- **Brief A6:** "Appointment and callback requests" describes a capability for the customer's business ("the request reaches your team or your scheduling tool"). KAP's own site still has no booking link or scheduling integration.
- Both conversations are illustrative, with invented customers (Dana, Jordan), invented businesses (HVAC, catering) and `example.com` addresses, and both are captioned as such. The assistant's lines model honest behaviour: pricing is left to a person and expectations are stated.
- **Recommendation:** the first sentence, unedited, of Chandra Wrightsell's recommendation published on the current site. It concerns "client engagement strategies"; it is attributed as a client (A7) and not framed as an AI chat project. Still to be checked against the LinkedIn original (B4).
- **Transparency:** the boundary intro says the business decides "how it introduces itself to customers". It does not promise any specific disclosure behaviour.

## Shared changes made for this page

- `ServiceHeroCopy` extracted from `ServiceHero`; the Workflow hero renders unchanged. Its emphasis line is now balanced.
- `WorkflowMotion` accepts `layoutQuery={null}`.
- `CapabilityList` gains optional `channels` and `className` props.
- `ClosingCTA` heading: the minimum size is lowered from 2.25rem to 2rem, and long words may break as a last resort. "conversations" overflowed at 320px with a 20px browser font.
- Homepage `CredibilitySection`: the trait rows may wrap (icon above word). This fixes a pre-existing clip at 320px with a 20px root, where "Engineered" could not fit beside its icon. Found by this phase's stricter element-level sweep.
- Homepage `ServicesSection`: list services carry an optional link; Customer Engagement links to its page.

## Impact gates (§7.2, §7.4)

- **First critique** (fresh context, screenshots only): hero **CORRECT** ("close to STRONG on desktop"). Weakness: the demo's payoff, the handoff, is the smallest and lowest element, and on a phone it sits below the first viewport. Full page **CORRECT**. Weakness: the middle sections share one register, and the second conversation largely repeats the hero.
- **Focused hero attempt:** the handoff card gained weight, with a display-size title and the request details as chips.
- **Page refinement:** section D moved onto a charcoal band, with the handoff note as a large light card at equal width to the transcript. The phone limitation is structural: the first viewport holds the headline, copy and CTA, and the conversation starts beneath them.
- **Second critique** (fresh context, same brief): hero **CORRECT**, "close to STRONG" on desktop. Page **CORRECT, at the upper end**: the tonal rhythm and the charcoal conversation band are now its strongest parts. Remaining weaknesses:
  - **Hero:** a chat mock beside a headline is a familiar AI-product pattern, and the handoff payoff is below the first viewport on phones. Its "cut off at 768" refers to the screenshot's fold, not to clipping.
  - **Page:** between the hero and section D the page reads as a document, with the day timetable, the capability grid and the later approach list all small-text vertical patterns.
- **Escalation ended** (CLAUDE.md §7.2, §7.4): no third critique. The page ships to owner review as the strongest rendered version, below the STRONG target. The recurring criticism across both critiques is the phone hero, where the handoff, the hero's one distinctive moment, sits below the first viewport.
- **Ready-to-run owner exploration** (the owner runs it; the build does not):
  `/prototype The Customer Engagement hero at /services/customer-engagement: two genuinely different compositions in which the human handoff is visible in the first viewport on a 390px phone as well as on desktop, without losing the headline and primary CTA`
- **Candidate page refinement for a later pass** (not made; the bound is spent): fold the six capabilities into the annotated conversation as labels at the points where each happens, replacing the icon grid.

## Verification (2026-10-29)

- `npm test` 35/35, lint, `tsc --noEmit`, `npm run build`: pass.
- **Sweep:** this page, the Workflow page and the homepage, at 17 widths × default, 20px CSS root and 20px browser font. Checks: element-level clipping and overflow, nav on one line, and the handoff card never covering a message. No failures. This page was re-swept after the refinement.
- **Contrast:** minimum 4.8:1, including the charcoal band.
- **Motion:** 14 animations, delays 400–5500ms, all finish (none infinite). Replay restarts all 14. Paused while the tab is hidden. Reduced motion: 0 animations, the conversation complete, Replay hidden. Server HTML renders Replay `hidden`.
- **Metadata and links:** title, description, canonical, `og:url` and `Service` JSON-LD are correct; one `h1`, no skipped heading levels. `#conversation` exists. Internal links return 200, with no links to the unbuilt service pages. The homepage links both built services; the sitemap lists both. `/contact` field names are unchanged.
- **Keyboard:** visible focus through the header, hero CTAs and Replay.
- **Screenshots:** `design/screenshots/final/service-engagement-{1440,768,390}[-full].png`, `service-engagement-1440-typing.png` (mid-sequence) and `service-engagement-1440-conversation.png` (section D).
