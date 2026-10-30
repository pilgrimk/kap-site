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
- **Navigation label:** kept "Solutions" → `/#solutions` at the time; superseded by the Services
  menu (Phase 2D).
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

---

# Phase 2C: Website Design & Development

`/services/websites` (route from brief A3; the instruction's fallback `/services/website-development` was not needed). Approved by the owner (2026-10-30).

## Page structure

| # | Section | Component | Treatment |
|---|---|---|---|
| A | Hero | `WebsiteHero` (new) | Headline across the full width; then the subhead, CTA and a numbered legend ("What the design is doing") beside an annotated stage: an illustrative site ("Fernway Landscaping") on a browser and a phone, drawn in HTML/CSS, with pins 1–3 matched to the legend. Plays once. |
| B | Your website is often your first impression (`#compare`) | `BeforeAfter` + `CompareSlider` (new) | Deep-cream band. The same fictional business's site after (left) and before (right) behind a draggable, keyboard-operable slider, then five "what changed" pairs (problem struck through, fix beside it) |
| C | What goes into a KAP website | `QualityBento` (new) | Six qualities as a bento: a tall design tile with a type-and-palette specimen ("Your brand, not ours"), device outlines, a text-size demonstration and a wide build tile |
| D | Built around your business | `ApproachSteps` (reused) + `DesignEvolution` (new aside) | The owner's five stages as the timeline; beside it the example site as a wireframe layered under the finished design, then a mid-page primary CTA |
| E | You're looking at one (`#our-site`) | `SiteShowcase` (new) | Charcoal band: KAP's own site as the example, three checkable facts about it, and real phone captures of the homepage and the two other service pages, each a link |
| F | A website that connects to the rest of your business | `ConnectedSite` (new) | Deep-cream band: an illustrated contact form branching to five possible outcomes, linking to both automation pages |
| G | Closing CTA | `ClosingCTA` (shared) | Service-specific copy |

Tonal rhythm: cream hero, deep-cream band, cream, cream, **charcoal band**, deep-cream band, charcoal close.

## Distinct from the other service pages (brief A5)

- **Hero composition:** headline across the full width, with a column of copy and legend beside an annotated stage. The other two heroes are text-left/visual-right splits; the homepage is a headline above a bleeding workflow panel.
- **Hero visual:** a device stage, not a task board or a chat.
- **Shared sections:** only the process timeline and the closing CTA.
- **Unique sections:** the before/after slider, the bento, the self-referential showcase and the form fan-out.
- **The example site:** the illustrative Fernway site recurs through hero, slider and process, so the page tells one story. It uses its own palette (forest green, sage, terracotta) to show that a client site reflects the client, not KAP.

## Motion

- **Hero:** plays once, about 1.8s, with eight CSS animations, opacity and transform only, ease-out:
  - browser rises at 100ms;
  - phone slides in at 480ms;
  - pins pop and legend items fade at 1.0, 1.2 and 1.4s.
- **Pausing:** `WorkflowMotion` holds the stage while it is off screen or the tab is hidden.
- **Fails open:** the un-animated state is the finished picture. Reduced motion means no animations.
- **Slider:** direct manipulation with no animation, since it is used often. A native range input covers the picture, and the position is written to a CSS variable, not React state. Without JavaScript it rests at 50%.
- **Showcase links:** a 200ms lift on hover (pointer devices only; none under reduced motion).
- **Everything else** is static.

## Integrity decisions

- **Brief B3:** commercial website engagements are not yet classified, so the page shows no client sites or results. Its example is KAP's own site, stated plainly ("It isn't a client project").
- **Section E's three points** are checkable facts about this site:
  - the 17-width and enlarged-text checks run in this branch's QA;
  - one primary action;
  - Next.js, with the working contact form and Stripe payments.
- **Fernway Landscaping:** invented, on an `.example` domain, and captioned as illustrative wherever it appears. Its imagery is drawn shapes, not photographs, so nothing implies real work.
- **No promises** about search rankings, leads, revenue, turnaround or revision counts.
- **Section F** presents integrations as examples that depend on the business and its tools.
- **Brief A6:** "Appointment requests" describes a client capability. KAP's own site still has no scheduling.
- **No recommendation used:** none of the published recommendations is about website work. Chandra Wrightsell's "digital presence" sentence is already used on the Customer Engagement page and was not stretched to fit.
- **Positioning (brief A1):** section F ties website work back to automation. The homepage keeps AI Workflow Automation as the featured service.

## Shared changes made for this page

- **`ServiceHeroCopy`** is split into `ServiceHeroHeadline` and `ServiceHeroActions`; `ServiceHeroCopy` composes them. The Workflow and Engagement heroes are pixel-identical before and after (diffed at 1440 and 390).
- **`ApproachSteps`** gains an optional `aside` prop. With an aside, the heading column is not sticky: at 1280×720, and with enlarged browser text, it was taller than the viewport.
- **`icons.ts` and `ServiceIcon`:** nine icons added (lucide).
- **Homepage:** the Website Design & Development entry links here ("Explore Website Development").

## Impact gates (§7.2, §7.4)

- **First critique** (fresh context, screenshots only):
  - **Hero: CORRECT** ("desktop near STRONG"). Weakness: the annotated mock was cut by the fold on desktop with a dead gap above it; on narrow screens the pins appeared without their legend.
  - **Page: CORRECT** ("approaching STRONG"). Weakness: the bento and process stretch is generic and text-led, with no visual carrier and no CTA for about five screens. It recommended a visual process sequence with an inline CTA.
- **Focused hero attempt:** the headline was moved to the full width (two lines instead of three), and the copy, CTA and legend into a column beside the stage. At 1440 the whole mock and two of the three notes are now in the first viewport. On phones the order is copy, CTA, stage, notes.
- **Page refinement:** `DesignEvolution` beside the process (wireframe to finished design) plus a mid-page primary CTA. The "before" site gained a services list, because the critic found it close to a blank strawman.
- **Second critique** (fresh context, same brief):
  - **Hero: CORRECT.** The annotated-mockup idea is sound, but the mock is "undersized and arrives late"; on a phone only a corner shows.
  - **Page: CORRECT, upper end.** The slider, the self-referential showcase and the form fan-out keep it from sagging, and CTA rhythm is now judged good. Remaining weaknesses: the middle reads as well-made modules, and the repeated small Fernway mock lacks one large, committed moment.
  - It recommended giving the slider or hero mock a near full-width treatment and dropping the process illustration.
- **Rendering flag from the second critique:** blank mocks in a Playwright full-page capture. Investigated: layout and font metrics are identical at a 7000px-tall viewport, and viewport and element captures render correctly. It was a paint artifact of Chromium's oversized capture surface. The retained full-page screenshots were rebuilt by stitching viewport captures.
- **Escalation ended:** no third critique; this is the strongest rendered version, below the STRONG target.
- **The recurring weakness** across both critiques is the scale and placement of the hero's mock: it is the page's idea, but it does not own the first viewport, least of all on a phone.
- **Ready-to-run owner exploration** (the owner runs it; the build does not):
  `/prototype The Website Design & Development hero at /services/websites: two genuinely different compositions in which the annotated device mock owns the first viewport at 1440 and is meaningfully visible on a 390px phone, without losing the headline and primary CTA`
- **Candidate refinement** for a later pass (not made; the bound is spent): give the before/after slider a near full-width, full-viewport treatment and remove the process illustration so the main Fernway moment carries more weight.

## Verification (2026-10-30)

- `npm test` 35/35, lint, `tsc --noEmit`, `npm run build`: pass.
- **Sweep:**
  - **Coverage:** this page, the homepage and both other service pages, at 17 widths (320–1920, every breakpoint ±1, plus 1024/1100/1150) × three text modes (default, 20px CSS root, 20px browser default font): 204 checks, 0 failures.
  - **Checks:** document overflow, element clipping by overflow ancestors, off-screen elements, and nav items wrapping.
  - **Checker validated:** it detects a planted overflow, and the browser-font mode was confirmed at 20px.
- **Contrast:** minimum 4.8:1. Translucent `oklab` text was computed by hand: cream/75 on charcoal is about 9.8:1, charcoal/60 on cream about 4.8:1.
- **Motion:** eight one-shot animations (delays 100–1400ms); none running after 2s; paused off screen; reduced motion shows 0 animations with all pins visible; without JavaScript they complete.
- **Slider:** arrow keys move it, and End reaches 100%; pointer drag works; `aria-valuetext` reads "After 60%, Before 40%"; the focus ring shows on the knob.
- **Metadata:** title "Website Design & Development — KAP Enterprises"; description, canonical and `og:url` correct; `Service` JSON-LD.
- **Structure:** one `h1`, no skipped heading levels.
- **Links:** every internal link returns 200. The page links only to built pages. The sitemap lists the route, and the homepage links to it. Console is clean apart from the deliberately blocked GA script.
- **Keyboard:** visible focus on every stop (skip link, header, hero CTAs, slider, showcase links, section F links, closing CTA, footer).
- **Screenshots:** `design/screenshots/final/service-websites-{1440,768,390}[-full].png`, plus:
  - `-1440-entering.png` (mid-animation);
  - `-1440-compare.png`;
  - `-1440-process.png`;
  - `-1440-showcase.png`.

---

# Phase 2D: Services navigation (2026-10-30)

Owner instruction: replace "Solutions" with a Services menu linking the three approved service pages,
with no overview page and no entries for the two deferred services.

- **Header:** Home, Services (menu), About, then the "Let's Talk" CTA.
  - "Contact" is no longer a separate header link; the CTA goes to the same `/contact` page.
  - The footer keeps every destination: Services (`/#solutions`, relabelled from "Solutions"),
    About, Contact and Make Payment.
- **Pattern:** a disclosure (button with `aria-expanded` / `aria-controls`, panel of links), the
  recommended pattern for site navigation, rather than an ARIA `menu`.
  - Opened by click, tap, Enter or Space; never by hover alone.
  - Escape (focus returns to the button), an outside click or tabbing out closes it.
  - Down/Up on the button open it at the first/last link; Up, Down, Home and End move between links.
  - The current page is marked with `aria-current`, and its icon tile turns magenta.
- **Panel:**
  - each of the three services has its homepage icon (Workflow, MessagesSquare, Globe), a title and a
    one-line description;
  - a quiet "See all services" link keeps `/#solutions` reachable, where the two deferred services
    are described;
  - styling: paper ground, rule border, 16px radius and 10px item radius, as in the service pages'
    cards.
- **Motion:** the panel fades and scales from 0.97 at its top edge, and the chevron turns, both over
  200ms ease-out (`cubic-bezier(0.23,1,0.32,1)`). Reduced motion shows it instantly. Visibility flips
  at once on open, so the arrow keys can focus a link straight away.
- **Mobile:** Services is an expandable section in the existing menu: one level, indented, with
  44px+ targets. The menu scrolls inside itself, so its CTA stays reachable with enlarged text. The
  CTA now wraps instead of clipping at 320px with enlarged text, a pre-existing fault.
- **Contact form (owner-authorized):**
  - "Website Development" is added to `GOAL_OPTIONS`, which the API's allow-list reads, so no other
    validation change was needed;
  - the visible label changed from "What do you want to automate?" to "What can we help with?",
    because a website is not automation;
  - the field `name`, endpoint, spam protection and email handling are unchanged.
- **Verification:**
  - **Checks:** tests 35/35, lint, tsc and build pass.
  - **Sweep:** 7 routes × 18 widths × 3 text modes (default, 20px root, 20px browser font), with the
    menu opened. No header overlap, nav wrapping, panel overflow or clipped links after the mobile
    CTA fix.
  - **Keyboard:** all sequences above pass, with the focus ring visible.
  - **Links:** every header and footer link returns 200.
  - **Contact form:** the option is selectable at 390, 768 and 1440 with no overflow; nothing was
    submitted.
  - **Pre-existing, not changed:** `/payment` overflows by 6px at 320px with a 20px browser font.
    The form and aside cards are slightly too wide. See open items.
- **Screenshots:** `design/screenshots/final/nav-services-{1440,768,390}.png`, `contact-goal-1440.png`.
