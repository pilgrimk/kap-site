# About page redesign (2026-10-30)

`/about`, redesigned to Modern Optimism (brief A12) under the owner's instruction of 2026-10-30.
Approved by the owner (2026-10-30).

## Page structure

| # | Section | Purpose | Treatment | Ground |
|---|---|---|---|---|
| 1 | Hero: "Experienced technology. Practical solutions." | Who KAP is and why it is credible, in one picture | Shared service-hero type, with a career-to-business map beside the copy | Light, atmosphere |
| 2 | Why KAP exists | The problem, then the mission | Headline and three problems, then the mission as a large typographic statement | Deep cream |
| 3 | Meet the founder (`#founder`) | Kevin Pilgrim, and how his career shapes KAP's approach | Typographic "30+" panel (sticky on wide screens) beside the biography and career facts | Light, charcoal panel |
| 4 | How we approach the work | Five working habits | Numbered rail: horizontal from 1024px, vertical below | Light |
| 5 | What we help businesses do | Route to the three service pages | Three clickable cards, each led by its page's own headline; other capabilities named in one line | Charcoal |
| 6 | In their words | Trust | Three verbatim recommendation excerpts with attribution and relationship | Light |
| 7 | Closing CTA | Conversation | Shared `ClosingCTA` band, "Let's Talk About Your Business" and the email | Charcoal |

**Tonal rhythm:** light, then deep cream, light, light, charcoal, light, charcoal. The two adjacent
light sections are told apart by the founder's charcoal panel and a rule between them.

## Hero

**Idea:** KAP's credibility comes from Kevin's career, and KAP exists to bring that experience to
small businesses. The map shows exactly that:
- **Left:** three charcoal chips, Kevin's career fields (Healthcare, Payments, Manufacturing),
  under the heading "Kevin's career · 30+ years of software engineering".
- **Centre:** they converge on a hub, KAP's own logo, which is itself a three-node graph.
- **Right:** the hub feeds three outcomes for "Your business", in the service pages' light cards.

**Distinct from the service heroes:** those show a task board (Workflow), a chat (Engagement) and a
device mock (Websites). This is the only diagram of the business itself.

**Concepts considered (screened in writing, not rendered):**
1. **Career-to-business map:** selected. Business-specific, uses only verified facts, and
   separates Kevin's career from KAP by label and by side.
2. **Full-bleed photographic hero with a directional dark gradient** (the owner's standing
   preference): unsuitable. There is no authentic photograph of Kevin or KAP (brief B5), and a
   stock office or portrait would imply KAP's premises or people. No image was generated.
3. **Typographic "30+" hero:** rejected for the hero. Leading with the number risks reading as 30
   years of KAP operating history, which the owner explicitly ruled out. It is used instead in the
   founder section, attached to Kevin's name.

The full three-render concept stage (CLAUDE.md §4) is for a new site's hero; this is one page of an
existing build, so the concepts were screened in writing only.

**Responsive:**
- **From 768px:** three columns joined by curves. The curves are drawn in a stretched 100×100 SVG,
  and the columns' rows are equal, so each curve end meets its chip's centre. Measured: 0px offset
  at 768, 1024 and 1440, and within 2px at every width and text size in the sweep.
- **Below 768px:** the map runs top to bottom: career, hub, outcomes, with one connector in and one
  out.

**Motion:**
- **Sequence:** plays once on load, about 1.8s: the career chips rise (staggered), the curves draw
  into the hub, the hub pops, the curves draw out, then the outcome chips rise. Durations are
  480–520ms with `cubic-bezier(0.23,1,0.32,1)` easing.
- **Reduced motion:** shows it complete.
- **Fails open:** without the animation everything is visible.
- **Rest of the page:** only the service cards' hover and focus state (border, arrow nudge),
  restricted to devices that can hover.

## Founder without a photograph

No approved photograph of Kevin exists (brief B5), so none was invented or generated.
- **The panel:** a charcoal panel carries the section: a large amber "30+", "years of software
  engineering", and Kevin's name and role. The logo mark sits faintly in its corner.
- **Not a likeness:** it is typographic, and nothing in it stands in for his face.
- **When a photograph is approved:** it can replace the panel's upper half or sit beside it. The
  layout already reserves a 5:7 column.

## Integrity decisions

- **Biography:** limited to brief A2:
  - Kevin Pilgrim leads KAP and is its founder, as the owner's instruction states;
  - he is a software engineer with 30+ years of experience;
  - his three career achievements, worded as in A2.
  - The career facts sit under "From Kevin's career" and the note "Achievements from Kevin's
    engineering career, not KAP client projects." The hero labels them "Kevin's career".
- **Removed:** "3.5M+ transactions per month" and "200+ enterprise client systems integrated"
  (unsourced, brief B5). Also removed: "Book a Discovery Call" (brief A6), the "Not someone learning
  AI on your dime" line, and the long protocol and tools copy.
  - The applied-mathematics background from the previous About copy is **not used**; it is not in
    the brief's established facts. Confirm it if it should return.
- **Recommendations:** whole sentences, unedited, from the three recommendations published on the
  previous site, checked character for character. They are different sentences from the
  homepage's excerpts, so the two pages don't repeat each other.
  - Relationships as on the homepage: Hunter O'Brien "Client, n8n automation project"; Peter Greco
    and Chandra Wrightsell "Client".
  - Still to be checked against the LinkedIn originals (B4).
- **Other capabilities:** sales and marketing automation, and custom software integrations (brief
  A1), are named in one line with a link to `/contact`. No new pages or links to non-existent
  pages.
- **Structured data:** `AboutPage` with the organisation, its URL and its founder's name. No other
  fields.

## Code changes

- **New:** `components/sections/about/` (`AboutHero`, `AboutWhy`, `AboutFounder`, `AboutApproach`,
  `AboutServices`, `AboutTrust`, `about.module.css`).
- **Rewritten:** `app/about/page.tsx`, adding canonical, Open Graph, Twitter metadata and JSON-LD.
- **`lib/content.ts`:**
  - new `ABOUT_PAGE`;
  - removed the About-only exports (`ABOUT_HERO`, `ABOUT_NARRATIVE`, `ABOUT_PRINCIPLES*`,
    `ABOUT_BENEFITS`, `WHY_KAP_*`, `FINAL_CTA_COPY`) and the `Stat` and `Principle` types;
  - `ServiceIcon` gains Workflow, MessagesSquare and Globe.
- **Deleted (About-only):** `AboutNarrative`, `AboutPrinciples`, `AboutFoundation`, `WhyKap`,
  `FinalCTA`. `PageHero`, `SectionContainer`, `SectionHeading` and `EyebrowTag` remain in use by
  the contact and payment pages.
- **`components/sections/services/icons.ts`:** adds Globe, MessagesSquare and Workflow.

## Impact gates (§7.2, §7.4)

Fresh-context critics, given only a short business summary, the screenshots and the questions.

**Hero, critique 1:**
- Desktop and tablet CORRECT, "close to STRONG"; phone CORRECT.
- Weakness: the career-to-business map is the only business-specific idea, but it is undersized
  next to a generic headline. On a phone it turned into a long list of dark cards below the fold.

**Hero, focused attempt (the one allowed):**
- The phone map became a compact, centred stack of pills: career fields, a connector, the KAP hub, a
  connector, outcome pills. It is about 540px tall instead of two screens, and starts inside the
  first viewport.
- From 768px the hub grew from 96 to 112px and the chip type went up one step.

**Hero, critique 2:**
- Desktop and tablet **STRONG** ("only just"); phone **CORRECT**.
- Weakness, recurring across both critiques: the specific idea sits under a headline that would
  fit any consultancy, so on a phone it still arrives below the fold. The headline is the owner's
  and was kept (§1).
- The escalation has ended. The phone hero ships as the strongest rendered version, and the
  shortfall is reported. Ready-to-run command, for the owner only:

  `/prototype The About hero at /about on a 390px phone: two genuinely different compositions in which the career-to-KAP-to-your-business map is visible within the first viewport alongside the owner's headline "Experienced technology. Practical solutions." and the primary CTA`

**Full page, critique 1: STRONG ("only just").**
- Strengths: the map, the mono labels, the restrained magenta, the tonal rhythm and real business
  specificity.
- Weakness: the founder section, where the "30+" panel was underpowered and, on phones, came after
  the dense paragraphs.
- Since the page reached STRONG, no refinement was required. One cheap change was made anyway: the
  panel now comes first on phones.
- Not adopted:
  - **A "Talk with Kevin" link:** a new CTA label outside the approved language (A6).
  - **Trimming the founder narrative to one paragraph:** left for owner review.
- No second page critique: the change did not alter the composition materially.

## Verification (2026-10-30)

- **Checks:** tests 35/35; lint, TypeScript and the production build pass.
- **Sweep:** 20 widths (320–1920, including either side of 640, 768, 1024 and 1280, plus 1100 and
  1150) × 2 heights × 3 text modes (default, 20px root, 20px browser font) = 120 checks, 0
  failures. The checks covered:
  - overflow, off-screen elements and clipped text;
  - header nav wrapping;
  - map curve ends within 2px of the chip centres, and chips filling their columns;
  - the sticky founder panel fitting the viewport.
  - The checker was validated against a planted overflow.
- **Contrast:** minimum 4.8:1 (mono eyebrows on cream).
- **Motion:** 13 one-shot animations; none running after 2.5s; reduced motion shows none.
- **Keyboard:** visible focus at every stop: skip link, header, hero CTAs, the three service cards
  (whole-card outline), "tell us about it", the closing CTA and the email.
- **Structure and metadata:**
  - one `h1`, no skipped heading levels;
  - title "About — KAP Enterprises", description, canonical and `og:url` `/about`, `AboutPage`
    JSON-LD;
  - "About" is marked current in the nav.
- **Links:** every link returns 200, and "Meet the founder" lands on `#founder` below the header.
  No "3.5M+", "200+" or "Discovery Call" text remains on the page.
- **Screenshots** (`design/screenshots/final/`): `about-{1440,768,390}.png` (first viewport),
  `about-{1440,768,390}-full.png`, `about-1440-entering.png` (mid-animation).
