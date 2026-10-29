# Homepage — design record

Implements brief A12 (Modern Optimism) in the Next.js app on `kap-website-redesign`. Built from
`design/concepts/light-treatments/` (theme `optimism`); this record describes what shipped to the
branch. Not committed: awaiting owner review.

## Files

- Page: `app/page.tsx` (applies the display font to the homepage only).
- Sections: `components/sections/home/` — `HomeHero`, `WorkflowDiagram` + `WorkflowMotion` +
  `workflow.module.css`, `HoursSection`, `ServicesSection`, `ProcessSection`,
  `CredibilitySection`, `RecommendationsSection`, `HomeFinalCTA`, `HomeHeading`, `home.module.css`.
- Copy: `lib/content.ts` (`HOME_*`). Font: `lib/fonts.ts` (Bricolage Grotesque, homepage only).
- Tokens added in `app/globals.css`: `brand-amber`, `coral-ink` (#B8503A), `paper`, `deep-cream`,
  `rule`, `ink-soft`, `font-display`. No existing token changed.
- Shared changes: `Button` gains a `coral` variant (additive); `Navbar` CTA is coral, "Let's Talk"
  (full label in the mobile menu); `PRIMARY_CTA.label` is now the approved "Let's Talk About Your
  Business" (brief A6). `SECONDARY_CTA` removed (unused).
- Removed (homepage-only, superseded): `components/sections/{Hero,Problem,Solutions,Testimonials}.tsx`
  and their content constants.

## Whole-page visual strategy

| # | Section | Purpose | Treatment | Ground |
|---|---|---|---|---|
| 1 | Hero | What KAP does, for whom; primary CTA | Headline across; copy and the animated workflow panel share one top edge; panel bleeds right | Cream with soft logo-colour light |
| 2 | Where the hours actually go | Relatable problems (brief A4.2) | Each row a small workflow: a muted "Today" card, a coral connector, a "Done automatically" card with the amber result tile | Cream |
| 3 | What we automate (`#solutions`) | Five service categories, AI automation first (A4.3) | Featured card with gradient edge + compact list of four | Cream, paper card |
| 3b | See What Automation Can Do | KAP's own automation video (owner-approved 2026-10-29); mid-page contact prompt | Copy left, click-to-play player right (phone: copy, player, link); gradient-edged poster with coral play button; disclosure and "About this video" summary under the player; text link to `/contact` | Cream, paper poster |
| 4 | How we work together (`#how`) | Process (A4.4) | Four steps joined by a line, echoing the workflow | Deep-cream band |
| 5 | Built by an engineer | Founder credibility (A4.5) | Career facts + charcoal build-standard plate | Cream, charcoal plate |
| 6 | What clients say | Recommendations (A4.6, A7) | One lead quote, two supporting | Cream |
| 7 | Final CTA | Conversion (A4.7, A6) | Large headline, coral CTA, verified email second | Charcoal band |

- **Imagery:** none. No authentic photography exists, and the workflow diagram is the page's
  visual carrier (brief A8 prefers explanatory diagrams). The generated image is not used.
- **Tonal rhythm:** light throughout with two charcoal moments (credibility plate, closing band) and
  one deep-cream band, per the owner's "charcoal for occasional dramatic sections".
- **Conversion:** one contact intent. Header "Let's Talk", hero and final "Let's Talk About Your
  Business" → `/contact`; email `mailto:` as the secondary channel. No form on the homepage; the
  existing contact form stays the primary destination.

## Workflow animation (emil-design-eng budget)

- 7s CSS cycle, infinite: inquiry activates (0.3s), signal draws to the AI step (0.6-1.0s), AI
  activates, branch draws (1.25-1.7s), results activate 150ms apart (1.75-2.35s), completed hold
  to 5.6s, everything fades out together over 0.6s, rest, repeat. Strong ease-in-out for drawing,
  ease-out for activations; only `opacity` and `clip-path` animate (no layout shift).
- Always readable: neutral wires and all cards stay visible; only the coral signal and rings cycle.
- Reduced motion: no animation; the complete static diagram (finished signal, no rings).
- `WorkflowMotion` (client, no React state): pauses while the page is hidden or the diagram is off
  screen, resumes from the same point, and restarts all stages together when the layout switches
  between the phone and wider diagrams. Listeners and the observer are removed on unmount.
- Phone: compact flow with its own connector pieces, animated on the same cycle.

## Content decisions and deviations

- **Service pages** (brief A3) are not built, so service entries do not link to missing pages and
  the section carries no extra CTA (one label per contact intent).
- **Process wording is proposed** (A4.4) and makes no ongoing-support promise (B3). Needs owner
  confirmation.
- **Recommendations:** whole-sentence, unedited excerpts of the three quotes already published on
  the current site, attributed as clients (A7). Still to be checked against the LinkedIn originals
  (B4). Peter Greco is labelled "Client" without "automation training" while training's service
  status is open (B3).
- **Not used:** the "3.5M+" and "200+" statistics (unsourced, B5), the survey and its reassurance
  line (B2), "Book a Discovery Call" (A6).
- **Nav label** stays "Solutions" → `/#solutions` (existing URL and label preserved); the concept's
  "Services" label was not adopted.
- **Header layout** keeps the existing sticky Navbar (shared by every page); only its CTA changed.

## Taste pre-flight (rendered), deviations only

All other applicable checks pass: zero em-dashes in new copy, one eyebrow (hero), one radius system
(buttons 10px, panels and cards 20px, nodes 14px), CTA one line at desktop, contrast, no scroll
cues, dots, version labels or fake stats.

- **HTML diagram instead of photography (§4.8):** brief A8 directs explanatory diagrams; captioned
  as illustrative.
- **Dark closing band on a light page (§4.11):** owner direction (charcoal for occasional dramatic
  sections).
- **"Let's Talk" (header) and "Let's Talk About Your Business" (hero, final), same intent (§4.5):**
  the compact header form of the approved label.
- **Lucide icons:** the project already depends on `lucide-react`.
- **Large CTAs may wrap to two lines** only at narrow widths with enlarged text, instead of
  clipping the label.

## Verification (2026-10-29)

- `npm test` 35/35, `npm run lint`, `npx tsc --noEmit`, `npm run build`: pass.
- Playwright against the production build (analytics requests blocked so tests never reach GA4):
  16 widths (320-1920, every declared breakpoint ±1) × default, 20px CSS root and 20px browser
  default font: no overflow, clipping, label overflow or nav wrapping. Minimum text contrast
  4.8:1. Console clean. `/about` and `/contact` render without errors.
- Animation: measured period 6.98s; hero text and CTA never move; cards always visible; paused
  while hidden (0ms advance) and off screen, resumes from the same point; phone animates (11
  animations); reduced motion has none.
- Fixed during QA: the final CTA's single grid column grew to the no-wrap button and clipped its
  text at 320px (and at 390px with 20px text); large CTA labels overflowed at 320px with 20px text;
  phone result titles fell below the 844px fold.
- Screenshots: `design/screenshots/final/home-{1440,768,390}[-full].png`,
  `home-1440-reduced-motion.png`.

## Video section (added 2026-10-29)

- `components/sections/home/VideoSection.tsx`; click-to-play `components/shared/YoutubeFacade.tsx`
  (client) built on the existing `YoutubeEmbed`, which gained an `autoplay` flag used only after
  the visitor's click. No new dependency.
- Nothing loads from YouTube before Play (verified at 320, 390, 768 and 1440: zero requests). Then
  the privacy-enhanced player (`youtube-nocookie.com`) loads with `start=0` and takes focus.
- Copy is the owner's approved working copy, verbatim, including its em-dash (owner wording
  outranks the Taste em-dash rule). The summary states only verified facts.
- Small screens get a compact poster so nothing is clipped by the 16:9 frame.
- Verified: 18 widths × default / 20px CSS root / 20px browser default font, no overflow or
  clipping; keyboard reaches Play with a visible ring; Enter starts the player.

## Impact gates

**Hero (§7.2): CORRECT.** One fresh-context critic on the implemented hero. Its single biggest
weakness repeats the two earlier independent critiques of this composition: the workflow diagram
is a boxed, category-generic module beside the headline rather than one composition, and the area
below the desktop CTA is under-used. The hero's bounded escalation was already spent (two
critiques, one refinement, the owner-run `/prototype`), after which the owner chose this
composition and asked for it to be preserved. Recorded as an accepted limitation; not reworked.
The input most likely to lift it is still an authentic, sanitised KAP workflow capture (brief B5).
Also noted: on phones the eyebrow wraps, leaving "BUSINESSES" alone on the second line.

**Full page (§7.4): CORRECT.** Most important weakness: the diagram's visual language stops after
the hero, so the middle of the page (hours, services, process), especially on phones, reads as
undifferentiated text on cream. Also noted: no conversion prompt between the hero and the closing
band; the process band's right side is empty on desktop.

- **The one refinement:** "Where the hours actually go" rebuilt in the workflow's node-and-connector
  language (the critic's recommendation in part; its "tangled chain" and continuous-line ideas
  were not adopted, as more than one bounded change). Correctness re-verified after the change.
- **Second critique:** not run. The refinement changed one section, not the page's composition.
- **Remaining:** services and process still lean on text; no mid-page CTA; process band spacing.
