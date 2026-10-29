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
