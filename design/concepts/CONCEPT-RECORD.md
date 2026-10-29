# Homepage hero concepts — record

Branch `kap-website-redesign` (from `ebcd3bd`). Static concept surfaces, not wired into the app.
Open each `index.html` directly in a browser. Renders are in `renders/`.

All three share the real header (logo, Services / About / Contact, compact "Let's Talk",
mobile menu control), the same hero copy (proposed in Phase 2B, still awaiting owner approval)
and the same CTAs, so they differ in composition, imagery role and type system, not wording.

- Eyebrow: "AI automation for small and mid-sized businesses"
- H1: "Your tools, connected. Your busywork, automated."
- Sub (20 words): "We connect the tools you use and automate follow-ups, data entry and handoffs, so your team can focus on customers."
- Primary CTA: "Let's Talk About Your Business" → /contact. Secondary: "See how it works".

## The three concepts

| | 1. Automation in Action | 2. Engineering Credibility | 3. Approachable Automation |
|---|---|---|---|
| Folder | `automation-in-action/` | `engineering-credibility/` | `approachable-automation/` |
| Axis | Diagram-dominant, dark | Typography and structure, light | Photography-dominant, warm |
| Archetype | Headline over a split: copy left, workflow panel bleeding off the right edge | Twelve-column editorial split: headline left, framed system map right | Full-bleed photograph with a directional dark gradient (owner-preference candidate) |
| Imagery role | Explanatory diagram (illustrative workflow, HTML/CSS/SVG) | Explanatory diagram (illustrative system map) | Representative photograph, customer-outcome subject |
| Type | Bricolage Grotesque + Geist + Geist Mono | IBM Plex Sans + IBM Plex Mono | Plus Jakarta Sans |
| Colour | Charcoal ground; coral action; logo colours as a trigger / AI / result code | Cream ground; magenta action; charcoal integration band | Warm-dark gradient over amber light; coral action |
| Radius | 10px buttons, 20px panel, 14px nodes | 4px throughout | Pill buttons, 20px cards |
| Next section shown | "Where the hours actually go" today → automated rows | "Built by an engineer, not a marketer" credential band | "Sound familiar?" everyday-task cards |

## Written screen (before any generation)

**1. Automation in Action**
- *Idea:* shows what KAP actually does, a website inquiry being read, sorted and routed, in KAP's own colour code. A competitor would need its own diagram and palette.
- *False-claim risk:* low. Labelled "Example workflow" and "Illustrative example". It depicts a possible workflow, never a client project, and does not imitate any vendor's interface.
- *Path to STRONG:* replace or join the diagram with a real, sanitised KAP workflow capture (owner input G3), keeping the colour code.

**2. Engineering Credibility**
- *Idea:* the integration layer between the tools a business already runs and what its team sees, plus founder engineering credentials. It matches the "built by an engineer" positioning that competitors cannot claim.
- *False-claim risk:* low. Career facts are Kevin's (existing site copy), framed as his career. "Built by KAP" only; "run by KAP" was removed because ongoing support is unconfirmed. "Monitored / Documented / Recoverable" are existing About-page claims.
- *Path to STRONG:* an authentic founder photograph in the credential band, and more committed scale.

**3. Approachable Automation**
- *Idea:* the customer outcome, "the day's admin is already done": an empty desk at golden hour, laptop closed, keys on the folder.
- *False-claim risk:* the image is generated and representative. It shows no people, faces, screens, text or logos. The headline addresses the visitor ("Your tools… your busywork"), so it reads as the customer's own office, not KAP's premises. Residual risk: low.
- *Specificity:* rung 2 (customer outcome). A competitor *could* use the same photograph; the idea rests on the copy.
- *Variety:* two of the last three builds (Keetons, Dr. Safonova) shipped full-bleed dark-scrim heroes. This is a recorded variety concern.
- *Path to STRONG:* a stronger outcome cue in the composition, without adding claims.

## Gates (measured in the render, worst pixel behind each text line)

| Concept | Width | H1 | Sub | Eyebrow | Primary CTA text | CTA bottom (viewport) | Overflow |
|---|---|---|---|---|---|---|---|
| 1 | 390 | 16.91 | 9.21 | 9.84 | 6.15 | 495 (844) | 0 |
| 1 | 768 | 16.91 | 9.21 | 9.84 | 6.15 | 453 (1024) | 0 |
| 1 | 1440 | 9.78 | 9.21 | 9.84 | 6.15 | 654 (900) | 0 |
| 2 | 390 | 16.91 | 7.96 | 5.98 | 5.98 | 515 (844) | 0 |
| 2 | 768 | 16.91 | 7.96 | 5.98 | 5.98 | 474 (1024) | 0 |
| 2 | 1440 | 16.91 | 7.96 | 5.98 | 5.98 | 723 (900) | 0 |
| 3 | 390 | 16.10 | 11.95 | 8.90 | 6.15 | 771 (844) | 0 |
| 3 | 768 | **1.98 (fail)** | 5.68 | 7.60 | 6.15 | 633 (1024) | 0 |
| 3 | 1440 | 11.34 | 12.53 | 10.11 | 6.15 | 684 (900) | 0 |

Every line must reach 4.5:1 (3:1 for large text). The worst pixel is a strict measure.

**Fixes (one per concept, as the stage allows):**
- *Concept 1:* the headline was 4 lines at 1440. Fix: the headline spans the full width above the copy/workflow row. It is now 2 lines. Side effect: at 1440 there is a gap between the headline and the description, because the description centres against the taller panel.
- *Concept 3:* the headline was 4 lines at 1440 and illegible on the phone. Fix: a wider copy column, slightly smaller type, and a stronger, higher gradient. Separately, a **stacking bug** was corrected: the photograph was painting over the gradient at every width. It now passes at 390 and 1440, but **still fails at 768**, where the 2-line headline runs over the lit lamp. With its one fix used, Concept 3 is **disqualified from selection on this gate**. A tablet-specific bottom gradient would likely clear it at build time.
- *Concept 2:* no fix needed.

## Generation log and provenance

| # | Budget | Concept | Purpose | File |
|---|---|---|---|---|
| 1 | Concept stage (1 of max 2) | 3 | Full-bleed outcome photograph at final hero geometry | `public/images/hero/approachable-office-dusk.webp` (1536x1024, high) + `.webp.json` sidecar |

- **Provenance:** generated with the local image engine. The sidecar holds provider, model, timestamp, size, quality, bytes and the exact prompt, and no credential.
- **Class:** representative imagery under CLAUDE.md §2.2, never evidence of KAP's premises or work.
- **Status:** development asset, not yet production-cleared (confirm the provider's commercial-use terms before launch).
- **If Concept 3 is not selected:** the image and its sidecar move to `design/superseded-assets/`.
- **No other images:** concepts 1 and 2 use no photography. The logo is KAP's own.

## Critic and selection

**Independent critic (one fresh-context run).** It saw only a business summary, the nine
captures labelled 1/2/3 in an order unrelated to drafting, and the seven criteria. Its labels
map as critic 1 = Approachable, 2 = Automation in Action, 3 = Engineering Credibility. Close
paraphrase:

| Concept | Rank | Critic's reading | Biggest weakness |
|---|---|---|---|
| Automation in Action | **1** | Strongest on relevance: "shows the actual product" in about five seconds, honestly captioned. The coral second line lands. Strong on the phone. | Desktop: the headline and workflow panel do not lock together; dead gap in the left column; the panel reads as a bolted-on card. |
| Engineering Credibility | 2 | The clearest explanation of the business model; the reliability layer is a genuine differentiator. | Visually inert ("reads like documentation"); no dominant element; the outline secondary is nearly as heavy as the primary. Also flagged: a 768 gutter defect, **since fixed** (render bug). |
| Approachable Automation | 3 | Strongest first glance: warm, premium, "work handled" mood. | Interchangeable with any business; on the phone the image reduces to a dim lamp fragment above the copy. |

- **Best:** Automation in Action.
- **Compelling enough?** "Yes, conditionally." It has a real idea, but stays CORRECT until the desktop composition integrates the headline and the panel. The critic suggested a shared baseline, raising the panel into the gap, or the coral line connecting to the flow, plus animating the flow. Those are options, not prescriptions.
- **Build's own reading:** agrees on all three, and the measured gates match (Approachable fails contrast at 768).

**Recommendation: Automation in Action**, carrying the critic's composition weakness into the
build as a design requirement. Two elements are borrowed:
- Engineering Credibility's reliability layer ("Monitored / Documented / Recoverable") and credential band, as a later section. It is the strongest "built by an engineer" signal, phrased as how KAP builds, not as a guarantee.
- Optionally, the warm outcome photograph as a supporting image (for example behind the final CTA), where its mood helps and nothing claims it is KAP's office.

**Owner preference (full-bleed photographic hero):** considered and outweighed. Approachable is
the preference candidate, but it ranks last and has render-visible problems: it is generic to
the category (rung 2 only), weak on the phone, and fails the 768 contrast gate. The preference
weights close calls only, and this was not close. Two recent builds already used full-bleed
dark scrims.

**Selection is the owner's.** These concepts are presented for review; nothing has been promoted
into the app.

---

## Refinement: Automation in Action (2026-10-29)

Owner direction: Concept 1 preferred, with Concept 2's engineering credibility. Authorized as a
concept refinement only, not a homepage build. The original concept is untouched for comparison;
the refinement is `automation-in-action-refined/index.html`, renders in `renders/refined/`
(pass 1, superseded, in `renders/refined/pass1-superseded/`). Hero copy is unchanged and still
**proposed, not approved**.

### Desktop composition fix (before / after)

- **Before:** the full-width headline sat above a 5/7 row whose copy was vertically centred
  against the taller panel. That left a dead gap between the headline and the description, and the
  panel floated mid-hero as a card with all four edges exposed.
- **After:** the copy and the panel share one top edge directly under the headline (the
  description starts on the panel's label row), and the panel is anchored on two edges: it bleeds
  off the right of the viewport and sits flush on the hero's bottom edge. The hero now ends where
  the panel ends, and the next section's heading shows at the fold. The primary CTA moved up from
  654px to 537px at 1440x900. The panel's connectors finish in coral, the colour of the headline's
  second line.

### One motivated motion (emil-design-eng budget)

On load, at 768px and wider, a coral signal travels once through the workflow. Each node shows a
brief ring as it "receives" it, and the outputs stagger 60ms apart; about 2s in total, never
looping. Only `opacity` and `clip-path` are animated. **Fails open:** the static state is the
finished state. With reduced motion there is no animation and the finished state shows. CTAs
press to `scale(.97)` over 160ms, hover is gated to fine pointers, and `:focus-visible` gives a
2px ring. A full-page capture (a viewport resize) replays the signal: harmless, recorded.

### Credibility section (from Concept 2)

"Built by an engineer, not a marketer." with Kevin's career facts and a build-standard panel
that reuses the hero's panel and node language. Every string traces to a source; nothing new is
claimed:

| Content | Source |
|---|---|
| Heading | existing site copy (`lib/content.ts`, About eyebrow) |
| "led by Kevin Pilgrim, a software engineer with 30+ years of experience" | brief A2 |
| Healthcare / Payments / Manufacturing facts, labelled "From Kevin's career" | brief A2 (Kevin's career, never presented as KAP's) |
| "designed and built the way enterprise software is built": Monitored, Recoverable, Documented, Engineered for change | existing About page copy |

Placed after the problems section to follow brief A4's order (sections 3-4 are not part of this
concept). "Monitored" describes how automations are designed, not an ongoing monitoring service
(B3: ongoing support is unconfirmed).

### Hero impact gate (CLAUDE.md §7.2): CORRECT, bound reached

| Pass | Verdict | Single biggest weakness named |
|---|---|---|
| Critic 1 (fresh context) | CORRECT, "close to STRONG on desktop" | The diagram carries the idea, but below desktop it leaves the first viewport and becomes a generic stack of boxes. |
| Refinement | (one, targeted at that weakness) | Tablet uses the horizontal diagram; the phone gets a compact flow (inquiry, AI step, three results under a branch bus; node details kept for assistive technology). |
| Critic 2 (fresh context) | CORRECT, "a strong CORRECT, close to STRONG" | The diagram is a generic node-card flowchart in a separate box; it reads as a widget beside the headline. |

- **Recurring across both critiques:** the diagram's *form* is category-generic (any automation
  agency could use it), the panel reads as a boxed module rather than part of the composition, and
  the desktop area below the CTAs is unused. Both praise the headline, the coral second line, the
  CTA path and the honest caption.
- **Evidence vs. one claim:** critic 2 says the phone diagram falls "almost entirely below the
  fold". Measured at 390x844 (mobile context), the whole path and every label are above the fold
  (results row 756-856px; titles visible). It does occupy only the bottom third.
- **Missing business input that could materially improve it:** a sanitised capture of a real KAP
  workflow (brief B5, preferred: KAP's own lead pipeline). It is the concept's original path to
  STRONG and directly answers "generic flowchart".
- **Next step:** the owner-run exploration below. Not attempted or approximated here.

```
/prototype KAP homepage hero (design/concepts/automation-in-action-refined/index.html), first viewport only. Recurring weakness across two independent critiques: the workflow diagram is a generic boxed node-card flowchart parked beside the headline rather than part of one composition, and the area below the desktop CTAs is unused. Explore two genuinely different compositional ideas that make the inquiry-to-results flow and the headline one composition (for example, the flow emerging from or threading through the type, or the flow as the hero's dominant ground with the copy set into it), at 1440, 768 and 390. Keep: proposed copy unchanged (not approved), "Let's Talk About Your Business" primary CTA to /contact, KAP palette (charcoal, cream, magenta, coral, amber), the diagram labelled "Illustrative example, not a client project", no invented claims, WCAG AA, reduced motion respected.
```

### Correctness (CLAUDE.md §7.1), final render

- **Widths:** 320, 359, 360, 390, 400, 401, 767, 768, 769, 1023, 1024, 1025, 1100, 1150, 1440,
  1920 (breakpoints read from this file: 359/360, 400/401, 767/768, 1023/1024). No horizontal
  overflow, no clipped text, header content never overlaps the hero, nav on one line, no CTA wraps,
  headline 2 lines from 767px up.
- **20px text:** both methods (CSS root size, and Chromium's default font size via CDP
  `Page.setFontSizes`) at the same widths: pass. Note: most concept type is sized in `px`, so it
  does not grow with the reader's setting; the build must size text in `rem`.
- **Contrast (computed, solid grounds):** every text element is at least 5.63:1 (diagram kind
  labels); career label 5.98; header text 16.9 and 9.2. CTA text 6.15.
- **Console:** clean except the browser's automatic `/favicon.ico` request (the concept has no
  favicon).
- **Fixed during QA:** an 11px header overflow at about 360px wide, inherited from the original
  concept (narrow-phone gutters and header button), and a regression from that fix (shorthand
  `padding` removed the hero's top padding at 400px and below) caught in the render and corrected.

### Taste pre-flight (rendered), deviations only

All other applicable checks pass: zero em-dashes, one eyebrow, one radius system (documented at
the top of the stylesheet), no CTA wrap, contrast, no scroll cues, decorative dots or version
labels.

- **HTML diagram instead of photography (§4.8, §9.F):** intentional; brief A8 directs explanatory
  HTML/CSS/SVG diagrams and forbids fabricated screenshots. It is captioned as illustrative.
- **Theme switch from a dark hero to cream sections (§4.11):** intentional, a single transition
  carrying the brand's cream. CLAUDE.md §6 makes the theme lock advisory.
- **"Let's Talk" (header) and "Let's Talk About Your Business" (hero), same intent (§4.5):** the
  existing header label and the brief's approved primary label. Unify in the build if the owner
  agrees.
- **Lucide icons:** the project already depends on `lucide-react`.
- **Google Fonts link and no dark/light pair:** concept-surface shortcuts; the build uses
  `next/font` and decides the colour-scheme strategy.

### Full-page impact (§7.4)

Not run: this is a three-section concept, not the homepage. It runs once the full homepage
exists.

---

## Hero prototype and light treatments (2026-10-29)

**Owner-run `/prototype`** (`hero-prototype/`): Current (baseline), Route (transit-line flow)
and Annotated (flow set on the headline's lines). Owner ranking: Current, then Route ("distinctive,
not as balanced"), then Annotated ("too cramped; do not pursue"). The owner especially values the
workflow animation. The harness is kept on the owner's instruction not to remove concepts.

**Owner direction change:** the dark treatment reads as too heavy and imposing. Keep Current's
layout and the animation, and move to a warm, light appearance where charcoal gives typographic
contrast and occasional dramatic moments. This supersedes the dark ground of the refined concept;
the dark version stays as the record of what was tried.

**Light treatments** (`light-treatments/index.html?theme=ivory|balanced|optimism`, comparison at
`light-treatments/compare.html`, renders in `light-treatments/renders/`). One layout and identical
wording; only colour and atmosphere differ:

| Treatment | Second headline line | Workflow surface | Build-standard plate | Atmosphere |
|---|---|---|---|---|
| Warm Ivory | coral ink | deep cream, paper nodes | light | none |
| Balanced Contrast | coral ink | charcoal (original panel) | charcoal | none |
| Modern Optimism | magenta | paper, logo-gradient top edge | charcoal, logo-gradient edge | soft amber, coral and magenta light, kept clear of the text columns |

- **Coral ink `#B8503A`:** the logo coral deepened along its own hue, for coral text and lines on
  light grounds (4.8:1 on cream). The logo coral is 2.75:1 on cream, so it stays the CTA fill;
  amber stays a fill only (1.7:1 on cream).
- **Gates (all three):** 16 widths, 20px text by both methods, no overflow, clipping or header
  collision; minimum text contrast 4.8:1; finished connector lines 4.3-5.6:1 against their surface
  (3:1 required for graphics); Optimism's glows checked at worst case (charcoal 14.8:1, magenta
  5.2:1, body grey 7.5:1). The animation runs at tablet and desktop in all three; reduced motion
  gets no animation and the finished static state.
- **Selected: Modern Optimism** (owner, 2026-10-29), recorded as brief A12. The owner liked the
  warm, welcoming appearance, the magenta headline emphasis, the light workflow panel and the
  animated workflow. Implementation in the app follows; the homepage design record is
  `design/homepage.md`.
