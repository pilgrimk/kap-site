@AGENTS.md

# Project Operating Constitution

This repository builds and maintains **one customer website**. Nothing here is client-specific
— client facts live in the project brief. This file governs **process, precedence, integrity, stack
authority, capability usage, and artifact hygiene**. It is not a design manual, an
implementation guide, or a business brief.

## 1. Source of Truth Hierarchy

Higher entries override lower ones on conflict.

1. **Direct user instruction** in the current session.
2. **The active project brief** (in `brief/`) — the source of truth for whatever business
   information it contains: business facts, positioning, services, customer psychology,
   supported claims, testimonials, content priorities, conversion priorities, and design
   direction/personality.
3. **This file** — process, precedence, integrity, stack authority, capability roles, hygiene.
4. **Standing owner preferences** ([.claude/owner-preferences.md](.claude/owner-preferences.md))
   — the KAP owner's recurring design preferences. They are **weights**, not rules: they shape
   which design candidates are considered and tilt close decisions, but never outrank the brief's
   own design direction, §2 integrity, or rendered evidence.
5. **Skills** — specialized craft, at their own altitude (see §3).
6. **Skill-internal defaults** — including any stack, framework, or styling recommendation.
   These yield to 1–4.

**Brief formats.** Two are supported, and they carry **equal authority** — JSON is not more
authoritative than TXT:

- `.txt` — a natural-language website brief or generation prompt
- `.json` — a structured website specification

Filenames are business-specific (e.g. `business_name.txt`); no fixed name is required. **Read
the active brief before any business, content, design, or implementation decision.** If
`brief/` holds more than one plausible primary brief and which one governs is ambiguous,
surface it to the user — never silently choose.

**Tool evidence outranks assertion.** If a rendered page is broken, the implementation is not
correct, regardless of what the code, the notes, or a prior message claim. Fix it; do not
explain the evidence away.

## 2. Integrity Rules (non-negotiable)

This site represents a real business to real customers.

- **Never invent** business claims, credentials, certifications, guarantees, pricing,
  statistics, awards, or testimonials. Unsupported by the brief means it does not ship.
- **Quoted material is verbatim.** Testimonials and other quoted client or customer words are
  reproduced exactly, including punctuation and phrasing, unless the user explicitly
  authorizes editing. No presentation or style rule justifies altering a real person's quote.
- **No fabricated business evidence in imagery.** Stock, generated, reference or placeholder
  imagery is never presented as factual evidence of the customer's actual premises, staff,
  owner, customers, completed work, equipment, events, environment, or products where exact
  product identity matters. Never fabricate visual evidence, and never frame an image so a
  reasonable visitor concludes **"this is this specific business."** Authentic client assets
  remain the strongest source whenever the design makes a factual visual claim. What this rule
  forbids is deceptive representation, not imagery: see §2.2.
- **Surface missing assets and information to the user** — never fill a gap with something that
  implies a fact.
- **Brief-authoritative wording stands.** Copy the brief supplies is not trimmed, reordered,
  or dropped to satisfy a skill preference. Only a higher-precedence reason justifies it, and
  the deviation is recorded.

### 2.1 Imagery provenance and licensing

- **Record source and provenance** for every delivered image, in `design/open-items.md`.
- **An aggregator's license badge is not proof.** Verify at the original landing page or
  another authoritative source.
- **If commercial-use rights cannot be confidently verified, the asset does not ship to
  production.** It may remain a documented development placeholder where the project permits
  one, but it must never quietly become a production asset.
- Where an image shows **recognizable people or private property**, surface the model or
  property release question rather than treating the asset as cleared.
- Benchmark or prototype builds may use clearly documented temporary assets, but those must
  be **identified as non-production** wherever they are recorded.
- Licensing caution governs **which asset ships**, not whether the design may use imagery.

### 2.2 Representative imagery and honest framing

Integrity forbids deceptive representation. It does not forbid imagery.

| Class | What it is | May it carry a factual claim about this business? |
| --- | --- | --- |
| **Authentic client assets** | The actual storefront, interior, team, owner, products, completed work, environment | **Yes**, where provenance supports it, and always the strongest source for a factual visual claim |
| **Representative imagery** | Appropriately licensed stock, category or product-type photography, textures, environmental or conceptual shots, editorial imagery, illustration, and generated material where project policy permits it | **No.** It may carry mood, atmosphere, category, concept, industry context, storytelling, composition and editorial interest, but never stands as evidence of this business's specific reality |
| **Development placeholders** | Anything not yet production-cleared, used where the project permits placeholders | **No**, and it stays internally identifiable as non-production, keeps its provenance, and is cleared or replaced before publication |

**Missing authentic photography is not, by itself, a reason to omit imagery.** Where imagery
would materially improve communication, comprehension, emotional impact, art direction,
hierarchy, product or service understanding, atmosphere, or conversion, honest representative
imagery is a legitimate option to weigh on its merits. Weigh it; do not default around it.

**Imagery is equally never required.** A typography-led, illustration-led, shape-led or
image-free design may be the strongest answer. The decision comes from the brief, business fit,
art direction, visual quality, integrity and the render, never from a preferred look.

**The decision is made section by section, and so is the honesty check.** An authenticity
limit belongs to the slot where it arises: having no authentic photographs of the staff decides
how a staff section may be illustrated, not whether the rest of the page may carry photography.
Typography-only sections are a deliberate choice, never the default because imagery would take
more effort. A page whose only photograph is in the hero records why every other section works
better without one (§6, *Whole-page visual strategy*).

**Semantic framing decides honesty as much as the image does.** The same photograph can be
honest or deceptive depending on what surrounds it. A heading, caption, alt text, nearby copy,
section purpose or placement that asserts the pictured subject **is** this business's premises,
people, work or inventory turns otherwise acceptable representative imagery into a false claim.
Judge every image together with its framing and with the interpretation a reasonable visitor
will actually reach. Where the framing makes the claim factual, either supply an authentic
asset or reframe the section.

**Representative imagery still earns its place.** It carries a concept, category, atmosphere or
message the brief supports. Avoid decoration that could belong to any business, imagery chosen
to fill space, anything contradicting known business facts, and specificity that implies facts
the brief does not support. A generic image needs no visible "stock" label; what matters is
that it makes no false business claim and that its production clearance is real.

**Generated imagery** is never mandatory and depends on no particular tool. Where the capability
exists and project policy permits it, it sits under exactly this framework: usable as design
material, never as documentary evidence of real premises, people, products or work, and never a
route to fabricating business facts. A local generation capability **is** available to this
project (§3, §4); that availability changes what is possible, not what is preferred.

### 2.3 Public-source provenance

KAP's Google Business Profile / Google Maps lead-generation pipeline is an accepted source of
publicly available business information. Where the brief or its input establishes that
provenance, business phone numbers and addresses, public customer reviews and reviewer names, and
published ratings and review counts **with their actual values supplied** are publicly sourced;
they need no separate verification merely because the listing URL is absent. An email address is
public when it comes from a documented public source.

Provenance is judged **per field**: one source does not vouch for every field in a record, and a
free-mail (for example Gmail) address is neither private nor unverified in itself. A field with
no documented public source and no owner authorization is **flagged for review**, never silently
treated as verified. None of this relaxes §2: no invented contact details, ratings or totals, no
unsupported licences, insurance, certifications or guarantees, no rewritten testimonials. The
`kap-demos` README states the same rule for demos.

## 3. Capability Roles

| Capability | Owns | Does not own |
| --- | --- | --- |
| `taste` / `design-taste-frontend` | Page-level art direction, composition, section rhythm, anti-generic discipline, the pre-flight | Motion mechanics, business facts, stack choice |
| `emil-design-eng` | Interaction and motion craft, the motion budget | Page layout, copy, content order |
| `prototype` | Divergent exploration of one high-leverage unresolved design area | Production integration outside its own promote step |
| Playwright MCP | Verification evidence | Design judgment |
| Figma MCP | Optional design reference, inspection, and design-canvas workflows | Anything the task does not materially need |
| Local image-generation engine | API invocation, image creation, technical generation metadata | Whether imagery is needed, art direction, the prompt's intent, placement, semantic framing, accessibility treatment, and the keep / regenerate / remove decision |

**Taste is advisory, not absolute.** Direct user instruction, the active brief, the integrity
rules in §2, and rendered evidence all outrank a Taste recommendation. When a meaningful
pre-flight rule is intentionally broken, **name the deviation and justify it in one line** in
the completion report. Silent non-compliance is the failure mode this rule exists to prevent.
Its prohibitions describe what to avoid; they are not a substitute for positive visual
quality, which §7.2 judges separately.

**Motion split:** Taste decides *where* motion is useful; Emil governs *how* it behaves.
**Reduced-motion preferences must be respected** in all cases. **Motion does not rescue art
direction**: a weak static composition is not strong because it animates. Emil refines
interaction once the hero already has a coherent visual idea.

## 4. Invocation Policy

- **`taste`** — must be consulted for page-level art direction and composition on any new site
  or major page, and its pre-flight run before the site is declared visually complete. Not
  needed for copy tweaks or small fixes.
- **`emil-design-eng`** — never invoke bare; always supply a specific question, component,
  interaction, or diff. On a full-site build, consult it **early enough to set a motion
  budget**, not only as a post-build review.
- **`prototype`** — deliberate, exceptional, and **run by the user, never by the model**. One
  unresolved area per run. A hero still below STRONG after §7.2's bounded autonomous passes **is**
  that unresolved area, but the build **hands it over** rather than starting it. The skill is
  deliberately not model-invocable: never attempt it through the Skill tool, and never reproduce
  or approximate its workflow by hand as a substitute. Nothing here makes it model-invocable.
  **User authorization does not change this** — the constraint is where the skill can be run from,
  not whether permission exists. The handoff is a **ready-to-run `/prototype` command** the user
  runs themselves (§7.2).
- **Hero concept stage** — not `prototype`, and not an approximation of it. During an initial
  build, before the hero is implemented, the build itself **autonomously** renders and compares
  **exactly three** hero concepts, selects one, and continues. The one exception is a brief that
  explicitly requires a single hero and excludes alternatives. Then only that concept is rendered,
  and the exception is recorded. It is bounded:
  - one stage per build;
  - static first-viewport concept renders, with no picker and no further rounds;
  - **no owner checkpoint**.

  Everything after it is unchanged. The sequence lives in
  [.claude/site-build-workflow.md](.claude/site-build-workflow.md) (Phase 3). `prototype` remains
  the owner-run, post-build exploration for a hero still below STRONG after §7.2's passes.
- **Playwright** — use during visual QA once a renderable surface exists.
- **Figma** — only when it materially helps the task at hand.
- **Local image generation** — available, never required, and never itself a reason to add
  imagery. Reach for it only once the imagery assessment has concluded that representative
  imagery is right and that no suitable authentic or appropriately licensed asset exists. Its
  output is **representative imagery** under §2.2, never business evidence. **One purposeful
  generation for one defined design problem**; a regeneration answers a specific failure observed
  in the render, not vague dissatisfaction, because each call costs money. Never generate
  alternatives to browse for something attractive.

  **In the hero concept stage:**
  - each concept is screened in writing first (its business-specific idea, its false-claim risk,
    its credible path to STRONG), and nothing is generated for a concept that fails the screen
    until it is revised;
  - each concept whose idea genuinely depends on a specific photograph counts as one defined
    design problem;
  - **at most two generations** in the stage;
  - a frame is reused across concepts wherever it fairly serves them;
  - the selected concept's asset is generated at its final geometry, so it carries into the build
    rather than being made again.

  **For supporting imagery** (sections other than the hero, planned in the whole-page visual
  strategy, §6):
  - **at most two generations** per build, separate from the concept-stage budget. This is a
    ceiling, never a target: nothing is generated to use it;
  - sources in order of preference: authentic business-owned imagery with permission, properly
    licensed imagery, a recomposition or crop of an asset the build already has, then a new
    generation where it materially improves the page;
  - one master may serve several sections through different crops or treatments, where the
    repetition does not weaken the page;
  - a refinement after the full-page critique (§7.4) that needs a new image draws on this budget's
    unspent remainder; it opens no new one.

  Every generation in the build, and its purpose, is listed in the final report.

  **Responsive image quality** (the full rules are in
  [.claude/design-notes.md](.claude/design-notes.md)):
  - Where the selected hero image's measured density is insufficient on a phone or a wide
    screen, first recompose it.
  - Next, upscale it locally. That is processing, not a generation, so it costs no call. It is
    allowed for the selected image only, never for a rejected concept.
  - Only as a last resort, make **one** mobile-specific image, which counts as a generation.
  - Nothing here is automatic, and each step is recorded with its justification.

  Check only whether the credential is
  *available* — never read, print, log or copy its value, and never place one in any repository.
  If the engine, its environment or the credential is unavailable, or a generation fails, **record
  the limitation and continue with the strongest honest design**; invent nothing. No model name is
  a design decision. Mechanics live in
  [.claude/site-build-workflow.md](.claude/site-build-workflow.md).

### 4.1 Starting a new site

When the user indicates that a new site, brief or project is ready — for example *"New site is
ready to go. Go ahead and build it."* or any equivalent — follow
[.claude/site-build-workflow.md](.claude/site-build-workflow.md).

That file owns the operational sequence: active-brief discovery in `brief/`, customer-project
bootstrap **including where the project is created**, the build, visual QA, the bounded hero
gate, the local commit and the report. It is **subordinate to this file**; on conflict, this
file wins and the contradiction is reported.

### 4.2 Preparing a prospect demo

A completed customer site becomes a five-day public preview **only when the KAP owner explicitly
asks** for a demo of a named customer site. Never at the end of a build, and never inferred from a
build request. Whenever a demo is to be prepared, deployed, extended or removed, follow **Phase 14**
in [.claude/demo-deploy-workflow.md](.claude/demo-deploy-workflow.md). It works on any committed
customer repository, not only the one just built.

Publishing belongs to the separate `kap-demos` repository. Its own `CLAUDE.md` and
`OPERATIONS.md` govern every action taken there, and its tools are the only publishing mechanism:
publishing logic is never copied into this repository. A demo is a public page, so §2 applies to
it in full.

A **demo deployment** (a temporary, unofficial preview on KAP's demo hosting) is never a
**production deployment** (a purchased, customer-approved site on its own hosting), whatever label
the hosting platform shows. Nothing in Phase 14 authorizes a production deployment, a customer
domain or DNS change.

Customer repositories carry **snapshots** of these instructions (`CLAUDE.md`, `.claude/`) from
when each site was built. They remain the record of how that site was built, but they never
govern demo operations: preparing, deploying, extending and removing a demo always follow the
**current** `website-builder/.claude/demo-deploy-workflow.md` and `kap-demos/OPERATIONS.md`.
Snapshots are not mass-updated and their history is not rewritten.

## 5. Stack Authority

The stack is chosen **per this project's actual requirements**, not by skill recommendation.

- Do not adopt React, Next.js, Tailwind, Astro, or any other framework because a skill
  suggests it. Skill stack sections are defaults for their own context, not authority here.
- Choose the **simplest reasonable stack** for the real requirements.
- Adopting a framework requires a **concrete architectural reason**, stated and recorded.
- Do not introduce dependencies or tooling for convenience alone.

## 6. Composition & Conversion Decisions

These are **internal decisions**, made and recorded in `design/`, not user checkpoints. Option
menus for each live in [.claude/design-notes.md](.claude/design-notes.md); none of them is a
default or a required pattern.

**The brief's design direction is authority, not a cage.** Where the brief states a direction —
an archetype, a palette, a treatment, an image it wants in a particular place — that direction
outranks any skill preference and any critic's suggestion (§1). It is not an absolute
prohibition on a better answer. What it does require is that a departure be **recognised as
one**: decided deliberately, and recorded in `design/` with its reason and the alternative it
replaced. Drifting away from the brief's direction without noticing is the failure this
prevents; departing from it with a reason is not.

**`design/` describes what shipped.** When a decision changes during refinement, update the
record so it describes the final implementation, keeping the superseded choice visible as the
alternative that was tried and why it was replaced. A design record still describing an
abandoned plan is a wrong record, and §1's rule that evidence outranks assertion applies to this
project's own notes.

**Identity.** Decide what represents the business (an authentic supplied logo, a wordmark, a
mark or monogram plus wordmark, or text-only branding) **and where it appears**. Never
fabricate a logo, and never add a mark to fill header space. When a monogram or mark is
authored for the favicon or browser identity, explicitly consider whether reusing it in the
visible header improves recognition and finish. Text-only is a legitimate outcome.

**Hero.** The primary hero is chosen through the **hero concept stage** (§4). Three genuinely
different concepts are rendered and compared before any of them is implemented, unless a brief
explicitly requires one specific hero. Selection is autonomous: it is not a user checkpoint. The
preference weight never overrides a material accessibility, trust or conversion problem.

- **The full-bleed candidate.** Where suitable, one concept is a **full-bleed photographic hero
  with a directional dark gradient**, the owner's standing preference (§1). "Suitable" is defined
  in [.claude/design-notes.md](.claude/design-notes.md). Where it is unsuitable, it is not forced,
  and the record says why.
- **The other two.** They are credible alternatives for this business, never token variations
  built to lose.
- **Screened before anything is generated.** Each concept states its business-specific idea,
  is checked for imagery that could imply false claims about premises, staff, products or
  services, and is judged for a credible path to STRONG. A concept failing the screen is revised
  or replaced in writing, before any money is spent on it.
- **Two judgements, not one.** The comparison records which concept is best **and** whether the
  winner is compelling enough to justify selection. Where all three are merely adequate, the
  strongest is still selected within the same bounded stage, and the limitation is recorded and
  carried into the build. No fourth concept, no second comparison.
- **What the chosen concept records:**
  - its archetype and why it fits this business;
  - the two concepts it beat, and why;
  - how it adapts at roughly 390, 768 and 1440;
  - where imagery is used: the subject class, focal point, crop intent and negative space, and how
    much of the frame the image owns relative to the type.

  The full selection record (all candidates, the critic's independent ranking, mobile and
  accessibility results, and whether the preferences changed the outcome) is specified in
  [.claude/site-build-workflow.md](.claude/site-build-workflow.md), Phase 3.

No archetype is mandated, and the standing preferences weight the choice without deciding it.

**Whole-page visual strategy.** The hero is one section of a page that is judged as a whole.
Before sections are built, decide **section by section** what carries each one visually, and
record it in `design/`: its conversion purpose, the impression or action it is for, its primary
treatment, whether photography would strengthen it, the subject and source of any image, the
authenticity and framing check for that section, and why the treatment fits. The treatment
vocabulary (full-bleed photographic sections, image-backed calls to action, image-and-text
splits, editorial crops, detail photography, textures and material grounds, graphic or
illustrative treatments, typography-led sections) lives in
[.claude/design-notes.md](.claude/design-notes.md). **No treatment is mandatory, and none is the
default**: a typography-led section is chosen for a reason, exactly as a photograph is.

- **Visual rhythm.** Judge the plan as one continuous scroll. Avoid long runs of visually similar
  text sections, repeated card grids, large empty areas without purpose, and over-reliance on
  flat colour grounds. Vary composition, scale, photography, typography, whitespace and
  transitions where that serves the page. There is no image quota and no fixed limit on
  typography-led sections.
- **Variety across builds.** Compare the page, not only the hero, with the last three completed
  builds: section composition, visual carriers, photographic treatment, CTA presentation and
  overall rhythm. A recent build's structure is not reused by default; where this page
  substantially resembles one, the record says why this business warrants it. Variety serves the
  business, never novelty for its own sake.

**Tonal rhythm.** Decide how the page paces tonally before composing sections. **Do not
mechanically alternate light and dark**; a wholly dark or wholly light page is correct when
intentional. Ask whether tonal variation would improve pacing, hierarchy, perceived depth,
section differentiation, or premium feel, and record the answer either way. Taste's theme lock
is advisory: a deliberate transition is valid when the brief and the render justify it.

**Interactive state.** During the motion pass, consider whether card-based content earns a
restrained state change on hover and focus. Not every card should; non-interactive decoration
should not. Gate hover behind pointer-capable queries, keep keyboard focus coherent, honour
reduced motion, and prefer a short clear state change over elaborate animation.

**Conversion channels.** Assess which contact and conversion channels the brief actually
supports and which this audience prefers. **Never invent** a number, address, endpoint,
profile, or booking URL. Where a verified email exists, explicitly consider whether a
`mailto:` CTA improves reachability. Do not force multiple channels on a business with one
clear path, and where several are legitimate, **decide the hierarchy deliberately** rather than
giving every CTA equal weight.

**Contact forms and lead capture.** A form is one option on that menu — never mandatory, never a
default, and never added because the page has room for one. It is justified where it serves this
business's conversion goal better than, or usefully alongside, the channels the brief already
supports, and it must **support rather than compete with** the primary path. Where one is built,
it is designed as part of the page's art direction rather than pasted in as a widget, it asks
only for what the business needs in order to reply, and it never solicits sensitive personal
information — clinical detail, government identifiers, payment or account credentials — through
an ordinary inquiry form.

**A missing endpoint is a build decision, not a user checkpoint.** Where the brief asks for a
form, or the assessment concludes one belongs, absent delivery infrastructure never halts the
build and is never escalated to the user as a choice between building it, substituting a
`mailto:` and omitting it. Build the form **complete** — business-appropriate fields, responsive
layout, accessible labelling and error handling, client-side validation, honest interaction
states — at **DESIGNED**, and record the pending integration. Implement no provider, backend or
third-party service to close the gap. This changes nothing about whether a form is warranted:
one the brief neither requests nor justifies is still declined on its merits.

**A form's functional status is stated, never implied.** There are three states:

| State | Means |
| --- | --- |
| **DESIGNED** | Visual design and interaction exist; no working submission service is configured |
| **CONFIGURED** | A real submission destination is connected; end-to-end delivery is not yet confirmed |
| **VERIFIED** | A safe end-to-end test confirmed delivery to the intended recipient or system |

Only a **VERIFIED** form may be described as a working lead-capture channel. A form must never
silently discard a submission or show a success state it has not earned, and **no endpoint,
address, key or integration is ever invented** to produce one — §2 applies here as everywhere. A
DESIGNED form may be retained in development with its pending status recorded in
`design/open-items.md`; a site going to production either carries a VERIFIED one or, with the
user's agreement, disables or replaces it with a channel that genuinely works. Where the brief or
the user requires a working form, missing delivery is a **launch blocker**; where the form is
optional, the site may launch on another honest channel. **Delivery architecture stays
provider-neutral** until the project's real requirements and hosting decide it, and §5 governs
that choice as it governs any other.

**Footer.** The footer is part of the designed page. Choose a closing composition that suits
this business and the sections above it. Defaulting to a generic three-column utility block is
a decision that must be earned, not assumed.

**Icons.** Where icons genuinely help, use **one coherent, permissively licensed family**.
Never emoji as UI or service icons. Do not hand-roll inconsistent SVG paths without a concrete
reason. Static projects may vendor the needed glyphs directly rather than adding a package.
Icons should inherit `currentColor` where reasonable and carry accessible labelling. Sections
that gain nothing from icons do not get them.

**Responsive imagery.** Where images matter, one center crop is not assumed correct at every
width. Consider focal point and crop intent, reach for `object-position`, `srcset`, `sizes`,
and `<picture>` where appropriate, and **verify the result visually**.

## 7. Visual QA

Rendered evidence, not reasoning. Three gates, in order: **correctness**, then **hero impact**,
then **full-page impact** (§7.4). They answer different questions, and passing one does not
imply the next.

### 7.1 Correctness

- Check the reference widths **~390px, ~768px and ~1440px**, and **every breakpoint this
  project's own stylesheet declares** at one pixel below it, at it, and one pixel above. Read
  the breakpoints out of the CSS actually written; never assume a framework's scale. This is a
  floor, not a ceiling. Reference widths alone have twice passed a site whose desktop
  navigation was broken across a narrow band at its own breakpoint, because a breakpoint is
  exactly where a layout is least tested and most likely to fail.
- Verify: responsive layout and art direction, content hierarchy, CTA visibility, interactive
  card and hover states, form usability, focus states, console errors, broken resources, and
  obvious accessibility problems.
- **A clean document-level overflow check proves little.** Comparing `scrollWidth` to the
  viewport is necessary and nowhere near sufficient: the worst failures are clipped rather than
  scrollable, or are not overflow at all. Inspect elements, not just the document — content cut
  off by an ancestor's `overflow`, a control pushed outside its container, grid or flex children
  that fail to reflow, and fixed or sticky elements covering what is beneath them. While the
  desktop navigation is active it stays on one line: **measure the items, not the list**, because
  an item that wraps inside itself leaves the list reporting a single line.
- **Text scaling is a separate axis from viewport width.** With the viewport held fixed, render
  at a **20px root font** and confirm navigation, buttons, forms and content stay usable, with no
  clipping and no horizontal overflow. This is the reader who has enlarged text, not browser
  zoom. A header given a fixed pixel height around contents sized in `rem` passes every viewport
  width and fails this.
  - Run it at the reference widths, at the breakpoint-adjacent widths above, and at the
    **intermediate desktop widths 1024, 1100 and 1150px** wherever navigation or layout changes
    in that range. A header that fits at its breakpoint with default text can overflow there.
  - **Two methods, and they differ.** Raising the root size in CSS enlarges `rem` content but
    leaves `rem`-based media queries where they were. Changing the browser's **default font-size
    preference** enlarges both, so a `64rem` breakpoint moves from 1024 to 1280px. The second is
    what a reader with enlarged text actually has. Use both where the tooling supports them; the
    verified mechanics are in [.claude/site-build-workflow.md](.claude/site-build-workflow.md),
    Phase 7.
- Where the hero carries imagery, confirm the subject stays **visible enough to contribute**
  rather than being suppressed into texture by its own scrim. No universal opacity target.
- **Intentional overflow, bleed, overlap and cropping must read unmistakably as intentional.**
  If the render makes a deliberate treatment look like accidental truncation, broken layout,
  clipped copy, missing content or a rendering defect, the composition has failed that
  treatment and is adjusted — not defended. Never let a crop cut meaningful text in a way that
  reads as accidental. This is not a prohibition on bleed or overlap, which remain legitimate.
- **Progressive reveal must fail open.** Content that is hidden until an effect runs must not
  depend on that effect, on observer or scroll timing, or on any particular browser lifecycle
  event in order to become visible. Check the reveal survives fast scrolling, anchor
  navigation, a reload or restore into the middle of the page, reduced motion, and the
  enhancement simply not running. The acceptable failure is **content visible without the
  effect**; the unacceptable failure is **content that stays hidden**. No specific mechanism is
  mandated: choose the simplest robust one for the site.
- Run the **Taste pre-flight against the rendered result**, not against the source, and
  **record** it: each applicable rule as pass, intentional deviation with its reason, or not
  applicable. Its imagery and visual-variety rules are recorded like any other, so a text-only
  default cannot pass unnoticed; they are weighed, not enforced, because this file outranks the
  skill (§1).

### 7.2 Hero impact

A hero can pass every correctness check and still be visually ordinary. Ask separately:
**is this hero merely correct, or is it genuinely strong?**

This gate judges the **implemented** hero, the concept the hero concept stage selected (§6). That
stage chose between ideas before the build; this gate judges the built result. Neither replaces
the other, and the stage adds no passes to the bound below.

- Judge from the **rendered first viewport** at those three widths. Not from source, not from
  the design rationale. **Mobile counts on its own**: a strong desktop hero does not excuse a
  weak first viewport on a phone.
- Apply the five-question model and the verdict ladder in
  [.claude/design-notes.md](.claude/design-notes.md): CORRECT, STRONG, MEMORABLE.
- Where the environment supports it, hand the judgement to a **fresh-context critic** given
  only a short business summary, the screenshots, and the five questions. Never the rationale,
  the archetype reasoning, the builder's preference, or a hoped-for verdict.
- **The critic diagnoses; it does not prescribe.** Its verdict and the weakness it names are
  evidence. Any remedy it volunteers is one option to weigh against the others, and it never
  outranks the brief. Choosing the remedy stays the build's judgement
  ([.claude/design-notes.md](.claude/design-notes.md)).
- **STRONG is the release target.** A merely CORRECT hero does not pass visual completion while
  the bounded escalation below still has a step to run. Once it has run, a CORRECT result is an
  accepted, documented limitation that ships and is reported (§9), not a blocked build.
  MEMORABLE is aspirational, never chased for its own sake.
- If the verdict is CORRECT, **name the single biggest weakness before changing anything**,
  rather than starting cosmetic tweaks, then judge whether the existing direction can be
  strengthened cleanly.
- If it remains below STRONG after one focused attempt, **autonomous hero exploration ends
  there.** That hero is the high-leverage unresolved area, and the next step is `prototype` —
  which **only the user can run** (see §4). Record that the hero is still below target,
  summarise the recurring weakness the rendered critiques actually support, prepare a
  **ready-to-run `/prototype` command** for that one area, and **continue the build**. The
  initial build never pauses for owner approval: the limitation, the critique evidence and the
  command are presented together at the final handoff. Never attempt the skill, and never
  imitate it.
- **The exploration is the user's to run, not the build's.** It produces **two genuinely different
  compositional ideas**, not restyles of one, judged as rendered first viewports at matched
  dimensions rather than rejected in prose unseen. Once the user's run has completed, the build
  resumes at **evaluation and promotion**: select the strongest on business fit, visual quality,
  conversion clarity and integrity, promote it, validate **once**, and stop. Louder, more
  photographic, or more unconventional is not by itself the tie-breaker; the business and the
  render are. The standing owner preferences (§1) weight a genuinely close call, exactly as they
  do in the hero concept stage (§6).
  **Prototype is not a prerequisite for shipping** — if the user does not run it, the hero ships
  as the strongest rendered candidate and the shortfall is reported.
- **The escalation is bounded, and the bound is part of the gate.** The sequence lives in
  [.claude/site-build-workflow.md](.claude/site-build-workflow.md) and it terminates. A single
  categorical verdict is noisy: weight **criticism that recurs across independent evaluations**
  over any one label, and never run further critics or variants to obtain a preferred one.
  If nothing reliably reaches STRONG once exploration has ended, **ship the strongest rendered
  candidate and report the target as not reached** — naming the recurring limitation, and any
  missing business input that could materially improve it. Reporting the shortfall plainly satisfies
  §9 item 6; quietly relabelling it does not.

### 7.3 Refining without losing the composition

After any meaningful hero change, **re-judge the whole first viewport**, not just the thing
that was fixed. A locally cleaner result can be globally weaker: closing a gap, nudging the
fold, or resizing type can quietly flatten the idea. Rendered compositional quality outranks
an isolated metric, provided correctness and accessibility still pass.

**Stop** when the hero is STRONG — or when §7.2's bounded escalation has ended — and
correctness passes, mobile and desktop both work, the conversion path is clear, and what
remains is polish. If a refinement regresses a STRONG concept, keep the stronger composition
and fix only what genuinely blocks correctness, accessibility, responsiveness, integrity, or
conversion. Report what was checked and anything left unresolved.

### 7.4 Full-page impact

A strong hero above a page of undifferentiated text is not a strong website. After the hero gate,
ask of the **whole scrolling page**: is it merely correct, or is it genuinely strong?

- **Separate from §7.2.** The hero gate judges the first viewport; this gate judges the complete
  scroll. Neither replaces the other, and neither spends the other's passes.
- Judge from **full-page renders at ~1440 and ~390**, using the full-page questions in
  [.claude/design-notes.md](.claude/design-notes.md): overall impact, business specificity,
  photographic storytelling, section-to-section variety, text density, hierarchy, composition
  and whitespace, transitions, CTA placement and conversion rhythm, and whether the page feels
  premium and distinctive. The verdict uses the same ladder: CORRECT, STRONG, MEMORABLE.
  **STRONG is the target.**
- Where the environment supports it, a **fresh-context critic** judges it, briefed as in
  design-notes.md and withholding the rationale, the visual strategy's reasoning and any
  hoped-for verdict. It names the single most important weakness and recommends a specific
  improvement. That recommendation is evidence; choosing the remedy stays the build's judgement,
  and it never outranks the brief or §2.
- **Bounded.** Below STRONG, make **at most one** targeted refinement of the weakest part of the
  page, preserving correctness, accessibility, authenticity and conversion. A second critique
  runs **only** where the refinement materially changed the page's composition, or where
  verifying the original criticism genuinely needs it. There is no third. A new image for the
  refinement draws only on the unspent supporting-imagery budget (§4).
- Record the verdict, the principal findings, the change made and what remains. A page still
  below STRONG ships as the strongest rendered version and the shortfall is reported, exactly as
  §7.2 requires of the hero. It is never relabelled, and the build continues without seeking
  owner approval.

## 8. Artifact Hygiene & Isolation

- **Temporary** screenshots and snapshots → `.playwright-mcp/` (gitignored).
- **Retained** final QA screenshots → `design/screenshots/final/`.
- A capture kept as **evidence for a superseded design direction** → `design/screenshots/`,
  named so it is identifiable as superseded. It is neither temporary nor final.
- Verify where tooling actually wrote files and relocate strays. Browser tooling has been
  observed writing to the project root rather than its configured output directory.
- **Generated assets are written straight to the customer repository's intended asset path**,
  with their provenance sidecar beside them — never into a shared tool output directory to be
  copied afterwards, and never into this repository. Machine-level tooling and its environment
  stay outside both repositories and are never vendored into either.
- No scratch files or stray screenshots in the project root.
- **Do not modify user-level or global Claude configuration** from this repository, and keep
  all changes within it and the customer project being built. The one exception is an
  owner-requested Phase 14 demo deployment (§4.2), which prepares files in `kap-demos` **only
  through that repository's own tools**, and never modifies the customer repository.
- **No commit, push or deployment happens in any repository without explicit authorization**
  for that specific action. A build request authorizes only the customer repository's local
  commit (Phase 12). A demo request authorizes only local preparation in `kap-demos`; its
  commit, push and lifecycle record each need the owner's own approval. Approval for one
  action never carries over to the next.

## 9. Definition of Done

A page is done when all of the following hold:

1. Every claim, number, and quote traces to the active project brief; quotes are verbatim.
2. No imagery falsely depicts the business; missing assets are flagged, not faked; provenance
   and licensing status are recorded per §2.1.
3. Visual QA passed across the widths and the text-scaling check §7.1 requires, with a clean
   console and no broken resources, and the hero reached at least **STRONG** on the §7.2
   impact gate, judged from the rendered first viewport — or, where the bounded escalation
   ended without it, the strongest rendered candidate shipped and the shortfall was
   **reported to the user**, not relabelled.
4. Reduced-motion is respected and focus states are visible.
5. Stack additions, if any, have a stated architectural reason.
6. Open gaps and assumptions are reported to the user, not silently resolved.
7. The page supports the conversion priorities in the active project brief: the primary CTA
   is clear, trust signals are appropriately surfaced, important customer questions or
   objections are addressed, and every conversion channel the brief supports is either
   present or consciously declined. No channel was invented to fill a gap. Any form present is
   described as nothing more than its §6 state supports.
8. **Production readiness**, where the site is destined for production: favicon and
   browser-tab identity; page title and meta description; canonical URL strategy; Open Graph
   and social preview metadata; structured data appropriate to the business; responsive image
   delivery. **Never fabricate a schema field or business detail to complete metadata** —
   omit what the brief does not support. Where a form ships to production, its submission path
   is **VERIFIED**, or the form is disabled or replaced per §6.
9. **Full-page impact** (§7.4) was assessed from the rendered full page: the full-page critique
   ran, its CORRECT / STRONG / MEMORABLE verdict is recorded, and the one permitted targeted
   refinement was made where the verdict was below STRONG. Any remaining limitation is recorded
   in `design/open-items.md` and stated in the final report. STRONG is the target, not a
   completion requirement: once this bounded process is exhausted, a CORRECT result is an
   accepted, documented limitation, exactly as item 3 treats the hero.

## 10. Not in This File

Craft rules belong to the skills, reusable option menus to
[.claude/design-notes.md](.claude/design-notes.md), the owner's standing design preferences to
[.claude/owner-preferences.md](.claude/owner-preferences.md), the operational build sequence to
[.claude/site-build-workflow.md](.claude/site-build-workflow.md), the demo deployment procedure to
[.claude/demo-deploy-workflow.md](.claude/demo-deploy-workflow.md), and client specifics to the
brief. Do not add here: skill checklists or rule restatements, business facts or copy,
palettes, fonts, design tokens, or transient TODO state.

## 11. Project Addendum: kap-site

This repository is KAP Enterprises' own production website, deployed from `main` on Vercel.
It predates the website-builder process and is being redesigned under it. This section adapts
that process to an existing repository and overrides §1–§10 only where it says so.

### 11.1 Existing-repository adaptation
- **Brief:** the active brief is `brief/KAP-WEBSITE-REDESIGN.md`, tracked in this repository.
  It is Markdown by owner decision; Phase 0's `.txt` / `.json` discovery rule is overridden for
  this file only. Items the brief marks as awaiting approval are not approved.
- **Phases 1–2 do not apply** (no bootstrap, no `git init`). Work happens on branches; `main` is
  production and is never committed to directly.
- **Commits** need explicit authorization each time. **Every push is a deployment:** pushing a
  branch may create a Vercel preview, so each push needs its own authorization (§8).
- **Demos (§4.2, Phase 14) do not apply.** `demo-deploy-workflow.md` is deliberately not included.
- **Stack (§5 reason):** Next.js 16, React 19, TypeScript, Tailwind v4, shadcn/ui and Motion are
  retained because the site runs working server routes for Resend and Stripe.
- **Protected integrations:** changes to `app/api/**`, Stripe behaviour or configuration,
  environment variable names, GA4 identifiers, form field `name` attributes, existing URLs or
  deployment settings require explicit approval. Secret values are never read, printed or committed.
- **Tests:** `npm test`, `npm run lint`, `npx tsc --noEmit` and `npm run build` must pass before
  any commit.

### 11.2 Project conventions
- Routes, layouts and global styles in `app/`; reusable UI in `components/{layout,sections,shared,ui}`;
  utilities, constants, animation presets and content in `lib/`.
- All user-facing copy lives in `lib/content.ts`; shared constants in `lib/constants.ts`.
- Components PascalCase; utilities camelCase or lowercase; Next.js file conventions for routes.
- Prefer server components; use `"use client"` only where interactivity requires it.
- Keep spacing, heading hierarchy and CTA styling consistent; use shared section containers.
- If it is unclear where a file belongs, ask before creating it.
