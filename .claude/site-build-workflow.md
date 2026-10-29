# Site Build Workflow

The operational procedure for taking **any** new customer website from an active brief in
`brief/` to a finished, locally committed client repository, and, **only when the KAP owner asks**,
deploying a completed site as a prospect demo through `kap-demos` (Phase 14, in
[demo-deploy-workflow.md](demo-deploy-workflow.md)).

This file owns **sequence and mechanics**. It does not own design rules.

| Document | Owns |
| --- | --- |
| [CLAUDE.md](../CLAUDE.md) | Durable operating rules: precedence, integrity, capability roles, stack authority, QA principles, Definition of Done |
| [.claude/design-notes.md](design-notes.md) | Reusable visual and design judgement: option menus, the visual-treatment vocabulary, the specificity ladder, the five Hero Impact questions, the full-page questions, the verdict ladder, critic briefing |
| [.claude/owner-preferences.md](owner-preferences.md) | The owner's standing design preferences: weights applied in the hero concept stage and the whole-page visual strategy, overridable by a brief |
| **this file** | Intake → bootstrap → build → QA → local commit → report (Phases 0–13, including Phase 8B) |
| [demo-deploy-workflow.md](demo-deploy-workflow.md) | Phase 14, optional and owner-initiated: demo preparation, approval, demo deployment, lifecycle and removal |
| customer repository | The implementation and that customer's own evidence and history |
| `kap-demos` repository | Demo publishing, sanitisation, verification and the five-day lifecycle. Its `CLAUDE.md` and `OPERATIONS.md` govern every action there |

**This file is subordinate to CLAUDE.md.** Where they appear to disagree, CLAUDE.md wins and
the contradiction should be reported. Nothing here overrides the active brief or §2 integrity.

**Nothing in this file is industry-specific.** It never assumes a sector, a set of sections, a
conversion channel, a palette, a hero archetype, or a stack. Every such decision comes from the
active brief and from the judgement documents above.

---

## Trigger

When the user says something like *"New site is ready to go, go ahead and build it"* — or any
semantically equivalent instruction that a new site, brief or project is ready — start at
**Phase 0** below and work through the phases in order.

Do not start a build from a conversational mention of a business. Start only from an active
brief discovered in Phase 0.

**Phase 14 has its own trigger:** an explicit KAP owner request to prepare a demo of a named
customer site. A build request never triggers it, and Phases 0–13 never run as part of it.

---

## Phase 0 — Active brief discovery

Look in `brief/` for files with extension `.txt` or `.json`. Ignore `.gitkeep` and any other
extension.

| Found | Action |
| --- | --- |
| **Exactly one** | That file is the authoritative active brief. Continue. |
| **Zero** | **STOP.** Tell the user no active brief was found, and where to put one. |
| **More than one** | **STOP.** List the candidate filenames and ask which governs. |

**Never guess** which brief is active, and never merge two briefs. This mirrors CLAUDE.md §1,
which requires ambiguity about the governing brief to be surfaced rather than silently resolved.

Then **read the brief completely, start to finish, before deriving anything.** It is the source
of truth for business identity, project name, structure, content, visual direction, conversion
strategy, imagery strategy, and implementation decisions.

Read [owner-preferences.md](owner-preferences.md) next, and note where the brief's own design
direction overrides any of it. Briefs need no special field for this. Any stated hero treatment,
archetype, imagery stance, mood or reference site overrides the matching preference for this
project. Where the brief is silent, the preferences apply as weights.

### Brief completeness check

Before deriving anything from the brief, check that it arrived whole. These are **indicators to
investigate, not proof**:

- the file ends mid-table, mid-sentence or mid-list, or without a final newline after a partial
  line;
- numbered sections stop short, or a section the brief's own structure promises (a verification
  table, a closing summary) is absent or cut off;
- formatting breaks off suspiciously, such as an unclosed table or a heading with no body.

Then inventory the **conversion-critical details**: phone, email, physical address and hours
where relevant, the appointment or booking mechanism, and any business-specific requirement the
brief's conversion goals depend on. Record each as present, absent, or unclear.

**Keep the two apart.** A brief can be complete and simply lack a phone number; a truncated
brief may have lost one. Record which it appears to be, with the evidence.

Check also whether **authentic business photographs** are available, in the supplied material
or a documented source the brief names. A publicly visible image is not thereby licensed for
reuse: record each candidate's provenance and what permission it still needs (`CLAUDE.md`
§2.1).

**Continue autonomously** wherever a truthful build is still possible: record the placeholders
and blockers for `design/open-items.md`, and invent nothing. Stop and ask only where the brief is
genuinely ambiguous in a way that prevents safe, meaningful progress. Likely truncation is such
a case only when the missing part plausibly governs the build itself, rather than supplying a
detail that can be recorded as missing.

### Conversion data check

A brief can ask for a conversion channel without supplying the data needed to build it honestly.
Catch that here, **before** art direction and implementation decisions are settled, not once the
CTA is already designed in.

List the conversion channels the brief **requests or materially implies**, and for each one ask a
single question: **does the actionable data actually exist in the supplied material?** What counts
as actionable depends on the channel, for example a real phone number, a real email address, a
reliable destination for directions, a real booking or profile URL, or an actual submission
endpoint where the design implies a working form. These are illustrations, not a required set:
**the brief decides which channels matter**, and no business is assumed to need any of them.

Where the data exists, build the channel. Where it does not:

- **do not invent it**, and do not ship a dead or misleading control;
- **record it as an open item** for `design/open-items.md` and report it to the user;
- **adapt to the strongest honest conversion path the brief does support**, rather than shipping
  several unusable ones.

A non-assertive fallback may be used only where it fabricates no business information and
misrepresents no destination. If no honest fallback exists, the channel does not ship.

Where the brief asks for a **contact form**, the actionable datum is a real submission
destination. Without one the form is **still built, and built complete**; it enters the build at
**DESIGNED** (`CLAUDE.md` §6) and that status travels with it through Phase 10 and Phase 11. A
form is never upgraded to a working lead-capture channel by the fact that it has started to look
finished.

**Do not stop here to ask.** A missing endpoint is recorded, not escalated, and the user is not
offered a choice between building the form, substituting a `mailto:` and omitting it. The
decision that does still belong to this build is the conversion **hierarchy** (Phase 3), and a
form the brief neither requests nor justifies is still declined on its merits.

---

## Phase 1 — Customer project bootstrap

Derive a filesystem-safe project slug from the business name in the brief (lowercase,
underscores or hyphens, no spaces or punctuation). **Do not hard-code any slug.**

Create the project inside the **client websites directory**, which sits beside this repository:

```
web-dev/
├── website-builder/             ← this reusable repository, which stays where it is
└── client-websites/             ← container for every generated site, never a repository itself
    └── <derived_slug>/          ← the new customer project, with its own independent .git
```

**This is the single definition of where a build lands.** Nothing downstream hard-codes it:
servers, Playwright, generated assets, screenshots and commits all resolve from the customer
repository's own root, so they follow the project wherever it is created.

Create `client-websites/` if it is missing, and **never run `git init` inside it**. It is a plain
container; a repository there would swallow every client repository nested under it.

**Before creating it:**

- Verify the target path does not already hold an unrelated project.
- **Never overwrite an existing customer repository.**
- If the target exists and its status or purpose is at all ambiguous, **STOP and ask.**

**Copy** the reusable environment the customer build needs to stand alone: `CLAUDE.md`,
`.claude/` (design notes, skills, settings), `.mcp.json`, `.gitignore`, and the empty scaffold
directories the template defines.

**Do not copy:** `.git/`, temporary Playwright output, caches, build artifacts, unrelated
ignored files, or the active brief as part of a broad directory copy.

**Move** the active brief deliberately — not copy — from `website-builder/brief/` to the new
project's own `brief/`. **Do not leave a duplicate behind.**

Then confirm this repository's tracked working tree is still clean. It will be: active briefs
are intentionally ignored here, so moving one out changes nothing tracked.

---

## Phase 2 — Customer Git initialisation

Initialise the customer project as an **independent** repository on `main`.

- **Do not** create a GitHub repository, add a remote, or deploy. Those are the user's calls.
- Commit **after** the build succeeds (Phase 12), not before.

**Brief tracking — handle this deliberately.** The template's `.gitignore` excludes
`brief/*.txt` and `brief/*.json` because `brief/` here is a temporary drop-zone. That rule
exists for the intake repository and **should not be inherited blindly**: in the customer's own
repository the brief is the authoritative source every claim traces back to, so it is normally
**tracked** for traceability. Remove or narrow the inherited ignore rule so the brief can be
committed, and say in the commit why.

The exception is a concrete privacy or security reason — genuine personal data, credentials, or
material the user has asked to keep out of version control. If one applies, keep it ignored and
record that decision in `design/open-items.md`.

---

## Phase 3 — Design read, before any implementation

Establish art direction **before** building pages, and record it in `design/design-read.md`.

Consult **Taste** for page-level art direction and composition (CLAUDE.md §4 requires this for
any new site). Work through the decision menus in [design-notes.md](design-notes.md) and record
the decision **and the rejected alternative** for each area that applies to this business:

- identity and where it appears
- typography and palette, with measured contrast
- hero concept and archetype, chosen through the **hero concept stage** below: three rendered
  concepts, the one selected and why, the two it beat and why, and **the role imagery plays in
  each, decided in the same breath**
- composition at roughly 390, 768 and 1440
- the **whole-page visual strategy**: what carries each section visually, and the rhythm of the
  page as one scroll (see below)
- tonal rhythm across the page
- imagery, section by section: whether it is used, in what role, and its provenance plan (see
  below)
- icon family, if icons earn their place
- conversion channels the brief actually supports, which of them leads, and where a form
  belongs in the composition if one is justified at all
- section layout families
- footer treatment

**Every one of these is a brief-derived decision.** This workflow mandates no archetype, palette,
channel, section set or treatment. The standing owner preferences
([owner-preferences.md](owner-preferences.md)) weight the hero decision as described below, and a
brief that states its own design direction overrides them.

**Order within this phase:**

1. Settle identity, typography and palette provisionally.
2. Make the imagery assessment.
3. Run the hero concept stage.
4. Write the whole-page visual strategy around the selected concept, and settle composition,
   tonal rhythm, section families and footer with it.

The palette or type may be revised if the selected concept needs it; record the revision.

### Imagery assessment

Decide imagery deliberately here, not by default, working through the questions in
[design-notes.md](design-notes.md) and the three classes in CLAUDE.md §2.2. Make the decision
**for each planned section**, not once for the page: an authenticity limit that rules out one
section's subject says nothing about the next section's. Record for each image or image slot:

- **which class** it is — authentic client asset, representative imagery, or development
  placeholder;
- **what framing** surrounds it, and whether that framing turns it into a factual claim about
  this business. Check heading, caption, alt text and nearby copy together with the image;
- **provenance, licence and production-clearance status**, including any model or property
  release question;
- for each **important** image, its rung on the specificity ladder and its storytelling record
  ([design-notes.md](design-notes.md), *Photographic specificity ladder*).

**"No authentic client photography" does not by itself resolve to "no imagery."** That is an
art-direction judgement, and an image-free design is a legitimate outcome of making it, not a
default to fall into. Equally, never add imagery to fill space.

Where the assessment concludes that representative imagery is right and **no suitable authentic
or appropriately licensed asset exists**, purpose-built generated imagery is one available
source, weighed on its merits against the alternatives — including the alternative of no imagery
at all. It is never the preferred source, and never the automatic consequence of missing
photography.

If it is selected, record **what the image has to do**: its role, intended placement, composition
and subject position, the type or scrim it must sit under, the crops it must survive, the palette
and mood it must match, and the exclusions that keep it honest. That is the brief Phase 6
generates from, and the considerations for turning it into a prompt are in
[design-notes.md](design-notes.md).

**The decision is made in this phase.** Hero assets that a concept depends on are made in the
hero concept stage below, at their final geometry. Every other asset is made in Phase 6.

### The hero's imagery role is part of the hero decision

Decide the hero's archetype and what imagery does inside it **as one decision**, not one before
the other. State which of three it is:

- **image-led** — the image carries the composition;
- **image-supported** — an image is present and subordinate to the type;
- **deliberately image-free** — typography, space, graphic or material does the work.

Name it for each of the three concepts in the hero concept stage, alongside its archetype. Name
its **subject class** too, whenever an image is used:

- object or equipment;
- process or service;
- customer outcome or environment.

These classes are defined in [design-notes.md](design-notes.md).

Settling a site-wide imagery role first and composing the hero afterwards decides the hero by
default. A conclusion drawn from the hardest slot on the page — commonly "no authentic
photography of these people exists" — is a conclusion about **that slot's framing**, not about
whether the hero may carry an image at all. The anonymous-depiction guidance in
[design-notes.md](design-notes.md) is part of answering it.

Where the hero is image-led or image-supported, specify the asset **from the layout**: the focal
point, where the subject sits in the frame, which side holds the negative space the headline and
CTAs occupy, the scrim or wash it sits under, and the crops it must survive at roughly 390, 768
and 1440. **Never generate a generic photograph and then look for somewhere to put it.** An image
produced that way arrives as an object standing beside the copy instead of as the composition, and
the layout then gets bent around whatever came back.

This role is decided here and is **not frozen here.** Phase 8 may reopen it where the rendered
critique diagnoses it as the hero's central weakness, within the one refinement that phase
already allows.

### Hero concept stage (autonomous, bounded)

Before the hero is implemented, render **three genuinely different hero concepts**, compare them,
and select one. This stage runs **without owner input**: it never pauses, asks or waits. It is
**not** `prototype` and not an imitation of it (CLAUDE.md §4). There is no picker and no second
round, and nothing is promoted from it except the one selected direction. It runs **once per
build**.

**1. Check variety.** In the three most recently committed customer builds under
`client-websites/`, read the hero record in `design/design-read.md`: the section about the hero,
however it is headed or numbered.

- This is read-only; never modify them.
- Skip any build without a design read.
- Prefer the "as shipped" description where one exists. Note their archetype, image
subject, scrim shape and palette. This build must not reuse the same combination unless this
business genuinely calls for it, and then the record says so ([owner-preferences.md](owner-preferences.md),
preference 7).
- Read their **whole page** too: the sections and layout record, the imagery assessment and the
  tonal rhythm. Note each build's section composition sequence, visual carriers, photographic
  treatment beyond the hero, CTA presentation and overall rhythm. The whole-page visual strategy
  below compares against these notes.

**2. Draft three concepts.** Each concept has:

- a **name** that describes its idea (never "Option A");
- a stated **axis** that differs from the other two;
- its archetype;
- its imagery role and, where an image is used, its subject class;
- its **idea in one line**: what it shows about *this* business that a competitor's hero would
  not.

The three must be distinct on a named axis, the way `prototype` requires of its variants:
composition, imagery role, image subject, or type-versus-image dominance. A palette or copy change
is not a new concept.

- **The full-bleed concept.** Where the suitability test in [design-notes.md](design-notes.md)
  passes, one concept is a **full-bleed photographic hero with a directional dark gradient**,
  specified as that section requires, including its mobile crop and contrast strategy. Where the
  test fails, record which condition failed, and draw three other concepts. Never force it.
- **The other concepts must be credible.** Each is a direction the build would defend shipping
  for this business: a typography-led poster, an image-supported split, an illustration- or
  graphic-led composition, a different photographic subject, or another justified archetype. A
  concept that exists to lose is a defect of this stage.
- **Outcome imagery for service businesses.** For a service business, at least one concept that
  uses imagery must weigh **customer outcome or environment** imagery against equipment or process
  imagery. Record which communicates the customer's benefit better, and why.
- **The brief's direction.** Where the brief prescribes a hero direction, one concept realises it
  faithfully. A departure from it can win only as CLAUDE.md §6 allows: deliberately, and recorded.

**Screen every concept in writing before anything is generated.** For each, record:

- **its business-specific creative idea**: what it says about *this* business, and why a
  competitor could not use it unchanged. Judge the subject together with the hero copy beside it,
  and place any image on the specificity ladder ([design-notes.md](design-notes.md));
- **its false-claim risk**: whether the imagery, read with the headline, could imply premises,
  staff, products, services or work this business cannot claim (CLAUDE.md §2.2). A setting that
  would be read as *this* practice's building, room or people fails here, before a single
  generation is spent on it;
- **its credible path to STRONG**: the one decision that could make it more than competent.

A concept that fails the screen is **revised or replaced in writing**, within the same three.
This is drafting, not a new round: it adds no render, no comparison and no generation. Only a
screened concept may spend part of the stage's generation budget.

**3. Specify, then make, the imagery.** Specify every image from its concept's layout: subject
placement, negative space, the type and gradient it sits under, and its crops at 390, 768 and
1440. Then source it.

- **Authentic or licensed assets first,** where one fairly establishes the concept.
- **Otherwise, generate.** At most **two generations** in this stage (CLAUDE.md §4), and only for
  concepts whose idea depends on a specific photograph. Reuse one frame across two concepts
  wherever it fairly serves both, for example a full-bleed treatment and a contained crop of the
  same scene. A typography-led concept needs none.
- **Generate at the final geometry.** A concept that might win must have its image generated
  where and how it would ship:
  - written directly to the customer repository's intended asset path, with its sidecar;
  - a **landscape** master for a full-bleed hero, at a size the engine is known to accept that
    covers the desktop hero (see design-notes.md, *Geometry*);
  - its **desktop composition and mobile crop planned first**, including the effective density
    each crop will have (design-notes.md, *Responsive image quality*). A crop that will clearly be
    soft is noted now, so Phase 6 can deal with it.

  The winner's asset then carries into Phase 6 with no further generation. This stage itself
  never upscales, never makes a mobile-specific image, and never processes a frame for a concept
  that may lose.
- **If generation is unavailable or fails,** record it. A full-bleed concept with no honest image
  is unsuitable, so draw another credible concept in its place. Invent nothing.

**4. Render matched first viewports.** Build each concept as a static first-viewport surface under
`design/concepts/<concept-name>/`, using:

- the project's provisional tokens and fonts;
- the **real header**, including the mobile menu control;
- the real primary and secondary CTAs;
- the brief's actual hero copy.

The harness-fidelity rules in Phase 8 apply. A concept weakened only by a missing control is
judged on its composition.

Capture each concept at 390x844, 768x1024 and 1440x900 into `.playwright-mcp/`, using Playwright
or whatever browser automation the session has. Then run these quick gates on every concept, each
measured in the render:

- hero text contrast against the image behind the actual text lines;
- primary CTA inside the first viewport at 390x844;
- no overflow or clipping;
- copy honest under CLAUDE.md §2.2.

A concept failing a check gets **one** inexpensive fix (crop, gradient, copy width or type size,
with no new image). If that fails, it is disqualified, and disqualifying it does not add a new
concept. Record each concept's mobile and accessibility result as pass or fail, with the measured
value behind it.

If no browser automation is available at all, the stage cannot render. In that case, record the
limitation and select from the written specifications against the same criteria, stating that
the selection was not render-based. Phase 7's rendered QA still applies once a surface exists.

**5. Compare.** Where the environment supports it, give **one fresh-context critic**:

- a short business summary;
- the nine captures, labelled only "Concept 1/2/3" in an order unrelated to the drafting order;
- the comparison criteria in [design-notes.md](design-notes.md) (*Comparing hero concepts*).

**Withhold:**

- the concept names and rationale;
- which concept is the full-bleed one;
- the owner preferences;
- any hoped-for result.

The comparison returns **two judgements**, and both are recorded: which concept is **best** among
the three, and whether that winner is **compelling enough to justify selection**, meaning it has a
credible path to STRONG rather than being the best of three adequate ideas.

If no subagent is available, the build compares the concepts itself against the same criteria
and records that the comparison was not independent. This is one comparison, never repeated to
obtain a preferred ranking.

**6. Select.** Combine the critic's evidence with the build's own assessment against the same
criteria, then apply the standing preferences **as a weight**:

- **The full-bleed concept wins** when it is valid and at least close on the evidence.
- **Another concept wins only when it is clearly stronger,** which means two things together:
  - the comparison ranks it above the full-bleed concept;
  - there is a concrete, render-visible reason the full-bleed concept is weaker on business
    relevance, trust and integrity, conversion, mobile or accessibility.
- **A generic split-column concept needs the same clear margin** to beat any valid
  non-split alternative (preference 6).
- **The brief's design direction**, where stated, outranks the preferences.
- **The weight never overrides a material problem.** A material accessibility, trust or
  conversion problem in the full-bleed concept is not outweighed by the preference, however close
  the ranking. Examples: illegible copy, an image that implies a claim, a buried primary action.
  The preference only decides between concepts that are both sound.
- **Where all three are merely adequate,** select the strongest anyway, within this same stage.
  Record the limitation, and carry the named weakness into the build as a design requirement
  that the whole-page visual strategy and Phase 6 must answer where they honestly can. There is
  **no fourth concept, no second comparison and no owner checkpoint**; the existing Phase 8
  refinement rules are unchanged.

**Brief-prescribed exception.** Where the brief explicitly requires one specific hero and excludes
alternatives (not merely describing a direction), render that concept alone:

- run its checks;
- record the exception, quoting the brief;
- skip the comparison, but not the Phase 8 critique.

A brief that only *describes* a direction gets the normal three concepts, one of them realising
it.

**The selection record** goes in `design/design-read.md`, under the hero section. Record it in
prose and with evidence. **No numerical scores:** they would give a judgement a precision it does
not have. It contains:

- **each of the three concepts** (or the prescribed exception): name, axis, archetype, imagery
  role, subject class and one-line idea;
- **each concept's written screen**: its business-specific idea, its false-claim check and its
  path to STRONG, and any concept revised or replaced at the screen, with the reason;
- **the critic's independent ranking**, in the critic's own words or a close paraphrase,
  attributed to the critic and kept separate from the build's own reading. If no independent
  critic was available, say so;
- **both judgements**: the best concept, and whether it is compelling enough to justify
  selection. Where it is not, the recorded limitation and how the build will answer it;
- **each concept's mobile and accessibility result**, pass or fail with the measured values
  (contrast behind the text lines, CTA position at 390x844, overflow), and any one fix applied;
- **the selected concept,** and the **specific business-fit reason** it serves *this* business's
  customers best;
- **whether the standing preferences changed the outcome**: yes (and between which concepts) or
  no. If the full-bleed concept lost, give the render-visible reason;
- **each rejected concept's material advantages and weaknesses,** so a later refinement or owner
  review can see what was traded away;
- **generations and processing** used in the stage, and any density concern noted for Phase 6.

**7. Clean up and continue.**

- Move the captures of the two concepts not selected to `design/screenshots/concepts/`, named
  `unselected-concept-<name>-<width>.png` so they read as superseded (CLAUDE.md §8).
- Move any generated image that no longer ships, with its sidecar, to `design/superseded-assets/`.
- Delete `design/concepts/`.

Then finish this phase around the selected concept: write the whole-page visual strategy below,
then continue to Phase 4. **Do not stop for review.** The owner sees the result in Phase 13, with
the full build.

### Whole-page visual strategy

Written after the hero is selected and **before any section is built**, in
`design/design-read.md`. It applies CLAUDE.md §6 (*Whole-page visual strategy*), and its
vocabulary and judgement live in [design-notes.md](design-notes.md) (*Whole-page visual
strategy*). Keep it concise: one row or short paragraph per section, not an essay.

For **every planned section**, record:

- its name and **conversion purpose**;
- the **impression or action** it is for;
- its **primary visual treatment**, from the design-notes vocabulary;
- **whether photography would strengthen it**, answered for this section on its own;
- the **image subject and source** where one is used: authentic, licensed, a crop or treatment
  of an existing asset, or a new generation;
- its **authenticity and framing check**: what a reasonable visitor would conclude the image
  shows, with this section's heading and copy around it;
- **why this treatment** fits better than the alternatives.

Then judge the plan as one scroll, and record the answers:

- **Rhythm.** Are there long runs of visually similar text sections, repeated card grids, empty
  areas without purpose, or a page carried by flat colour grounds alone? Where so, either change
  the plan or record why that run is right for this business.
- **Hero-only photography.** If the hero is the only photographic section, record why each other
  section works better without supporting imagery. "No authentic photographs of the people" is a
  reason for a people section's treatment, not for the whole page's.
- **Variety across builds.** Compare against the whole-page notes from concept-stage step 1.
  Where this page substantially resembles a recent build's section sequence, carriers or rhythm,
  record why this business warrants it. A successful structure is not reused by default, and
  novelty for its own sake is not a reason.
- **The concept stage's limitation**, where one was recorded: what in this plan answers it.

The plan names any **supporting generations** it needs (CLAUDE.md §4: at most two, a ceiling
and not a target), each with its section, its job and its specification from the layout, as for
the hero. Phase 6 makes them.

---

## Phase 4 — Motion budget

Consult **Emil** with a specific question, component or interaction — never bare (CLAUDE.md §4).
Do this **early enough to set a motion budget**, not as a post-build review.

Record the budget in `design/motion-budget.md`: tokens, durations, which moments earn motion,
which are deliberately denied it, and the reduced-motion behaviour.

Taste decides *where* motion is useful; Emil governs *how* it behaves. Reduced-motion
preferences are respected in all cases.

---

## Phase 5 — Stack

Choose the **simplest stack that meets this project's actual requirements** (CLAUDE.md §5).
A framework requires a concrete architectural reason, stated and recorded. Skill defaults are
not authority. Do not add dependencies or tooling for convenience.

---

## Phase 6 — Build

Build the complete website the brief calls for.

- Treat the brief as authoritative business evidence. Apply CLAUDE.md §2 without exception:
  **never invent** claims, credentials, numbers, guarantees, availability, pricing or
  testimonials, and reproduce quoted material **verbatim**.
- Use honest imagery only, and record class, source, provenance and licence status per §2.1
  and §2.2 as you go — not afterwards from memory. Re-check the framing around each image as the
  copy settles: a heading written later can turn acceptable representative imagery into a
  factual claim about the business.
- Use one coherent, permissively licensed icon family where icons genuinely help.
- Where a form is part of the conversion plan, build it as a **designed section of the page**
  (`design-notes.md`) and implement only what its destination actually supports (`CLAUDE.md`
  §6): no invented endpoint, no credential in client-side code, and no success state that has
  not been earned.
- Implement responsive behaviour and responsive image delivery deliberately.
- Where the brief asks for something the supplied material cannot support, **build what is
  honest and record the gap** rather than fabricating the missing part.

### Generated imagery, only where Phase 3 selected it

A machine-level engine produces the asset. It owns API invocation, image creation and technical
metadata, and nothing else. Whether the image is needed, what it should be, where it goes, how it
is framed and whether it survives are decided here and in Phase 7.

The engine lives outside every repository. Its directory is given by the optional
`KAP_IMAGE_GENERATOR_DIR` environment variable and contains:

```
<KAP_IMAGE_GENERATOR_DIR>/
  .venv/Scripts/python.exe     ← the interpreter (.venv/bin/python on macOS or Linux)
  generate_image.py            ← the CLI
```

If the variable is not set, treat generation as unavailable (see below). Never set it, and
never modify the engine's installation, from this repository.

Invoke the CLI with that interpreter, passing `--prompt` and `--output`, and `--size`,
`--quality` or `--model` only where this project has a reason to. Write the prompt from Phase 3's
image brief.

- `--output` is a path **inside the customer repository**, at the asset location the page will
  actually reference. Do not generate into the engine's own output directory and copy afterwards.
  It must end in `.webp`; the engine refuses anything else, so plan the page's image delivery
  around that format.
- The engine writes a JSON **sidecar** beside the image recording provider, model, timestamp,
  dimensions, quality, byte size and the exact prompt. **Keep it** as technical provenance unless
  there is a documented reason not to.
- That sidecar records **how the file was made**. It says nothing about whether the image is
  appropriate, honest in its framing, or any good. Phase 7 decides that.
- The engine carries its own default model. **No model name is a design decision**; do not encode
  one into art direction.
- It reads its credential from `OPENAI_API_KEY` in the process environment, and the website
  system never supplies it. Check only whether that variable is **available** — the name is not
  the secret. Never read, print, log or copy its value, and never place a credential in any
  repository.
- **One purposeful generation for one defined design problem.** Each call costs money. Do not
  generate alternatives to browse for something attractive.
- **The selected hero concept's image already exists.** It was made in Phase 3, at its final
  geometry, so do not generate it again here. Phase 6 makes:
  - the derived delivery files (responsive widths, art-directed `<picture>` crops);
  - the **supporting imagery** the whole-page visual strategy selected, sourced in CLAUDE.md §4's
    order: authentic with permission, then licensed, then a crop or treatment of an asset the
    build already has, then a new generation. New generations for supporting imagery are **at
    most two** per build, separate from the concept stage's two, and a ceiling rather than a
    target. Generate each from its section's layout, as Phase 3 specifies for the hero, with the
    same prompt considerations and exclusions;
  - **only where the measured effective density is insufficient,** the first remedy that fixes it,
    in the order in design-notes.md (*Responsive image quality*):
    1. recompose the selected image;
    2. a justified local upscale of the selected image only;
    3. at most **one** mobile-specific generation, only where the landscape master cannot give a
       phone a sound composition.

  Measure density from the real delivery: the served file widths and the actual hero box at
  390x844, the shortest supported phone, 1440 and the widest tested width. Record the remedy,
  the densities before and after, and the upscale details where one was used.

  A regeneration remains possible only under Phase 7's rule: one answer to a specific failure
  named from the render.

- **Keep a generation log** in `design/open-items.md` as you go: every generation in the build,
  its budget (concept stage, supporting, mobile-specific, or a refinement), its section and its
  purpose. Phase 13 reports it.

**If generation is unavailable or fails** — engine missing, environment missing, credential
unavailable, or a failed call — then invent no asset, hunt for no credential, and expose nothing.
Record the limitation for `design/open-items.md`, report it, and continue with the strongest
honest design available. This blocks the build only where the brief genuinely requires that one
specific asset.

---

## Phase 7 — Visual QA: correctness

Use **Playwright** once a renderable surface exists. Apply CLAUDE.md §7.1 in full, including
its breakpoint sweep and its text-scaling check, not only the three reference widths.

Verify against the **render**, not the source: layout and art direction, hierarchy, CTA
visibility, interactive and hover states, focus states, form usability where a form exists,
console errors, failed resources, horizontal overflow, contrast, and reduced motion.

**Rendered evidence outranks assertion** (CLAUDE.md §1). If the page looks broken, it is broken,
whatever the code says.

Where a form exists, **exercise it in the render** rather than reading it: tab through every
control and watch the focus state, submit it empty and with bad input, and confirm each error is
specific, reaches assistive technology, and is not signalled by colour alone. A **DESIGNED** form
must demonstrably produce **no appearance of a successful submission**.

### Text scaling: widths and methods

Run the 20px check (CLAUDE.md §7.1) at the reference widths, at each breakpoint −1/0/+1, and at
**1024, 1100 and 1150px** wherever navigation or layout changes in that range. Measure the header
height and each navigation item's line count, not only document overflow.

Use **both** methods where the tooling supports them, and record which ran:

- **CSS root size**: inject `html { font-size: 20px }` after load. It enlarges `rem` content but
  leaves `rem` media queries at their default-size widths.
- **Browser default font size**: the reader's real setting, which also moves `rem` media queries
  (`64rem` becomes 1280px). With Playwright driving Chromium, it was verified on 2026-10-28
  (Playwright 1.56.1, Chromium 153) that opening a CDP session on the page and sending
  `Page.setFontSizes` with `{ fontSizes: { standard: 20 } }` **before navigating** makes the
  root 20px and stops `(min-width: 64rem)` matching at 1100px, where CSS injection does not.
  Re-verify it the same way in any other tooling or version before relying on it. CDP is
  Chromium-only; where it is unavailable, record that only the CSS method ran.

### Generated assets are judged in the page, not on their own

A generated asset is not finished when it is created. Integrate it into the real page, render it,
and judge it exactly as any other image:

- composition and crop **in context** at all three widths — a frame that looks good alone very
  often fails the narrowest crop;
- legibility and contrast of anything overlaid on or adjacent to it;
- whether it **strengthens the intended communication**, or is merely present;
- whether the image together with its heading, caption, alt text and section purpose makes any
  factual claim about this business (CLAUDE.md §2.2).

Then decide from the **render**: keep it, recompose the section around it, regenerate, or remove
it. Removing it is a legitimate outcome. A regeneration must answer a **specific failure named
from the render** — "the subject sits exactly where the headline overlays it at 390" — never
general dissatisfaction, and never the hope that another attempt will be prettier.

---

## Phase 8 — Hero Impact: bounded escalation

The five questions, the verdict ladder and the critic briefing contract live in
[design-notes.md](design-notes.md). **The target is STRONG** (CLAUDE.md §7.2). This phase owns
only the sequence — and that sequence **terminates**.

### Pass 1

Render the completed hero, capture matched first-viewport screenshots at the three widths, and
run **one** fresh-context critique.

Give the critic **only** a short business summary, the screenshots and the five questions.
Withhold rationale, archetype, implementation history, which candidate is newest, any
preference, and any hoped-for verdict. Withhold the concept stage too: this critic judges the
built hero on its own, not as the winner of a comparison.

- **STRONG or MEMORABLE** → continue to Phase 8B.
- **CORRECT** → go to Pass 2.

### Pass 2 — one focused refinement

Name the **single most consequential weakness in the hero's composition or communication**
before changing anything — the one that most limits the hero, never the one that is easiest to
correct. Where that weakness involves imagery — **including its absence** — work out **which
cause** is actually producing it before choosing a remedy: the menu is in
[design-notes.md](design-notes.md), and the critic's own suggested fix is one option on it
rather than an instruction. Make **one** focused refinement that is the **strongest answer to
that cause this budget allows** — not the easiest cosmetic correction, and not a series of
tweaks. Re-render and run a fresh-context critique.

That refinement **may reopen the imagery role settled in Phase 3**, introducing, removing,
replacing or repositioning imagery in the hero where the diagnosis supports it. Phase 3 decided
that role before anything rendered, and it is art direction rather than an integrity finding, so
the render may overturn it. Reopening it adds **no round**: still one refinement, still one
further critique, no exploration phase, and no variant shopping. Where it introduces or replaces
an image, that asset is produced under CLAUDE.md §4's existing rule — one purposeful generation
for one defined design problem, specified from the composition as Phase 3 requires — not a spread
of candidates to pick from. The brief continues to outrank the critique, and a photograph is
never required to reach STRONG.

**The runner-up concepts are evidence, not a second round.** The refinement may draw on what the
concept stage showed: a subject, crop, scrim or type treatment that rendered well there, or a
switch to the runner-up concept's direction. That is allowed only where the diagnosis supports it,
and it is still the one refinement. It reuses any asset that stage already made. It does not
reopen the concept stage, and it adds no comparison.

Then apply CLAUDE.md §7.3: **re-judge the whole first viewport**, not just the thing fixed.

- **STRONG or MEMORABLE** → continue to Phase 8B.
- **CORRECT** → end autonomous hero exploration, record the limitation and prepare the handoff
  below, then continue to Phase 8B.

### Keeping the evidence for a direction that was rejected

Where one of these passes **rejects or materially changes** a hero direction, keep enough to
reconstruct the decision later, and no more:

- the **first-viewport capture** of the superseded direction, under `design/screenshots/` with a
  name that identifies it as superseded;
- the critic's **own diagnosis**, quoted or closely paraphrased and attributed to the critic,
  kept visibly separate from the build's interpretation of it and from the remedy the build
  chose;
- for a generated asset, its **prompt and sidecar**, even once the image no longer ships.

**Claim only what the evidence supports.** A critique that never saw a candidate did not reject
it, and two passes judging two different compositions are not two critics agreeing about one.
Say which pass saw what.

Then **reconcile `design/design-read.md` with what shipped** before Phase 11, per `CLAUDE.md`
§6: a design read still describing the abandoned composition is a wrong record.

This is a few lines and one screenshot inside artifacts that already exist. It is not an archive,
not a new phase, and nothing here requires retaining every experiment.

### Still CORRECT — record, prepare the handoff, continue

**Autonomous hero exploration ends here.** The hero is now the high-leverage unresolved design
problem, and the next step is `prototype` — which is **user-invoked only**.

The skill carries `disable-model-invocation: true`. The Skill tool refuses it and instructs the
model to ask the user to run `/prototype` themselves. **Never attempt it, and never reproduce or
approximate its workflow by hand as a substitute** (CLAUDE.md §4). **Asking for and receiving
authorization does not unblock anything**: the constraint is where the skill can be run from, not
whether permission exists. So the build does not ask whether to run the exploration; it hands over
the means to run it.

Record, for `design/open-items.md` (Phase 11) and the final report (Phase 13):

- the hero remains below the **STRONG** target after the bounded autonomous passes;
- the **recurring** weakness the rendered critiques actually support, not one critic's phrasing;
- **a ready-to-run `/prototype` command**, built from this build's own unresolved problem (below),
  for the user to run themselves.

Then continue the rest of the build, starting with Phase 8B. **Do not ask for owner approval and
do not wait**: the initial build is autonomous, and the completed site, the critique evidence and
the remaining concerns are presented together at the final handoff. A hero below target is a
reported gap, not a blocked build, and **Prototype is not a prerequisite for shipping**.

### Building the handoff command

Construct it from **this** build's unresolved problem, never from a stored template of a previous
one. Keep it short enough to copy and run. Include only what the exploration needs:

- the **target surface**, named precisely — one unresolved area, not a page;
- the **production file or local URL** where it renders, where that helps;
- the **number of alternatives** this bounded workflow requires;
- the **recurring criticism** that triggered escalation, in a line or two;
- the **constraints that bound the design space** — integrity limits, business facts, and brand or
  conversion requirements every variant must respect.

Shape, with each bracketed part replaced by this build's specifics:

```
/prototype <the one unresolved surface>, at <production file or local URL>.
<The recurring criticism, in a line or two.> Two genuinely different
compositions. x2
Constraints: <the integrity, business and conversion limits that apply.>
```

The command goes into the Phase 13 report; it is not a question put to the owner mid-build.
**Do not continue the escalation on the user's behalf**, and do not start a substitute
exploration. Whether and when to run it is the owner's decision after the final handoff.

### After the user has run Prototype

This happens only after the final handoff, and only if the owner runs `/prototype`. Resume at
**evaluation and promotion**, not at a second exploration.

Judge the candidates the user's run produced on **business fit, visual quality, conversion clarity
and integrity**, from the rendered first viewports at matched dimensions rather than in prose.
Where a fresh-context critic is used to compare them, **anonymise the candidates** and withhold
which is the incumbent, exactly as in [design-notes.md](design-notes.md).
CLAUDE.md §2 applies to a promoted variant exactly as to anything else: a composition that reaches
STRONG by making a claim the brief cannot support does not ship, however well it renders.

Promote the selected direction into production following the project's own conventions, remove the
prototype surface, run **one** final validation of the promoted hero, and **stop**. Do not open
another round, and do not run further critics to relabel the result.

If the user declines to run it, or simply does not, **nothing is worked around**: the hero ships as
the strongest rendered candidate and the shortfall is reported, exactly as below.

### When nothing reliably reaches STRONG

Ship the strongest valid candidate and **report it honestly**:

- state plainly that the STRONG target was not reached;
- describe the **recurring** visual limitation, not one critic's phrasing;
- identify what additional input could materially improve it, **if that is genuinely
  identifiable** — for example authentic photography, verified figures, or commissioned identity
  work. Name it as an unresolved opportunity; never fabricate the missing material to close it.

Do not keep generating critics or variants to obtain a preferred label.

### Critic signal quality

**A single categorical verdict is noisy.** Independent critics disagree at the CORRECT/STRONG
boundary, and one favourable verdict is not a pass any more than one unfavourable verdict is a
failure.

Weight, in this order: **criticism that recurs across independent evaluations**, praise that
recurs, the same compositional weakness named more than once, rendered evidence, and business
fit. Weight lightly: any single label.

**Do not resolve this by running more critics.** More evaluations buy noise, not certainty. The
critic exists to surface useful visual signal within the bounded passes above, not to produce
statistical confidence.

### Diminishing returns

If genuine divergent exploration — two materially different compositions, rendered and compared —
does not materially improve the rendered result, **recognise diminishing returns**. Do not assume
one more iteration will succeed.

This is not a claim that some businesses cannot reach STRONG. Typography, shape, spacing, colour,
illustration and composition can all produce excellent art direction with no supplied assets at
all. It is a claim about **this build's evidence**: when exploration has stopped moving the
render, say so and stop, rather than iterating on faith.

### Harness fidelity, when judging the candidates

For `/prototype`, the model does not build the harness; the user's run does. This is what to
convey in the handoff command and what to allow for when judging what comes back. The same
fidelity standard applies to the hero concept stage's renders in Phase 3, which the build does
make itself.

A comparison is only trustworthy if it reproduces enough of the **real production first viewport**
that the judgement lands on the design rather than on the harness. Relevant to the viewport being
judged: the actual navigation and header including responsive controls such as a menu toggle, the
actual CTA treatment, actual trust or proof elements, actual typography, actual responsive chrome,
and actual viewport behaviour.

Missing controls, absent icons or placeholder spacing produce **false design criticism**. Where a
candidate is weakened by a harness omission rather than by its own composition, say so and judge
the composition, rather than discarding the direction. Only the unresolved compositional area is
explored; the surrounding production context stays faithful.

---

## Phase 8B — Full-page impact: bounded

CLAUDE.md §7.4. Runs once the hero's Phase 8 passes have ended, whatever their outcome, and once
Phase 7 correctness passes. It judges the **whole scrolling page**; Phase 8 judges the first
viewport. Neither replaces the other, and neither spends the other's passes.

### Critique

Capture **full-page** screenshots at about **1440** and **390** wide, after any entrance motion
has settled. Give **one** fresh-context critic:

- a short business summary;
- the two full-page captures;
- the section list in page order, names only;
- the full-page questions in [design-notes.md](design-notes.md) (*Full-page impact*).

**Withhold** the visual strategy's reasoning, the hero concept history, the earlier critiques,
the owner preferences and any hoped-for verdict. Ask for one verdict from the ladder, the
**single most important weakness**, and a **specific recommended improvement**.

- **STRONG or MEMORABLE** → continue to Phase 9.
- **CORRECT** → one refinement, below.

If no subagent is available, the build judges the page itself against the same questions and
records that the judgement was not independent.

### One targeted refinement

Before changing anything, name the weakness and its cause, as for the hero
([design-notes.md](design-notes.md), *A critique is a diagnosis, not a prescription*). The
critic's recommendation is one option, never an instruction, and never outranks the brief or
CLAUDE.md §2. Make **at most one** targeted refinement aimed at the weakest stretch of the page.
It may change a section's treatment, add, crop or move imagery, recompose a run of sections or
rework a transition. It must keep correctness, accessibility, authenticity and conversion intact:
re-run the Phase 7 checks the change touches, and re-check the framing of any image it adds or
moves.

A new image for it draws only on the **unspent supporting-imagery budget** (CLAUDE.md §4). Where
none remains, the refinement uses what the build already has.

### Second critique, only where warranted

Do **not** commission another critique by default. Run one more, briefed the same way, only where
the refinement **materially changed the page's composition**, or where verifying the original
criticism genuinely needs it. Record which applied. There is no third critique, no second
refinement, and no owner checkpoint.

### Record

In `design/design-read.md`, under a *Full-page impact* heading: the verdict or verdicts in the
critic's own words, attributed, the principal findings, the refinement made and why, and what
remains. Keep the superseded full-page captures under `design/screenshots/` named as superseded,
as for the hero. A page still below STRONG ships as the strongest rendered version, and the
shortfall goes to `design/open-items.md` and the Phase 13 report, never relabelled.

---

## Phase 9 — Taste pre-flight

Run the Taste pre-flight **against the rendered result**, not the source (CLAUDE.md §7.1).

Taste is advisory. Direct user instruction, the brief, §2 integrity and rendered evidence all
outrank it. Where a meaningful pre-flight rule is broken deliberately, **name the deviation and
justify it in one line** in the completion report. Silent non-compliance is the failure this
rule exists to prevent.

**Record it**, concisely, in `design/design-read.md` under a *Taste pre-flight* heading: each
applicable rule as **pass**, **intentional deviation** (with its one-line reason), or **not
applicable**. Group trivially passing rules rather than listing every box. Give particular
attention to its imagery rules (real images, no pure-text minimalism) and its visual-variety
rules (layout-family repetition, zigzag cap, bento background diversity). They are weighed, not
enforced: CLAUDE.md outranks the skill, so its suggested image count is never a quota here. But a
text-heavy page records why it deviates, so the choice is visible rather than defaulted into.

---

## Phase 10 — Production readiness

Where the site is destined for production, work through CLAUDE.md §9 item 8: browser-tab
identity, title and meta description, canonical strategy, social preview metadata, structured
data appropriate to the business, and responsive image delivery.

Confirm every delivered image is **production-cleared**, and that no development placeholder has
silently become a production asset.

**Verify every referenced asset actually exists and loads.** A referenced-but-missing file is a
production defect, not a detail.

Where a form ships, confirm its state against `CLAUDE.md` §6. A **CONFIGURED** form is not
finished: run one safe end-to-end test and confirm the submission actually arrives before calling
it **VERIFIED**. If it cannot be verified, it is disabled or replaced with the user's agreement —
an apparently working submit button must not reach a public deployment. Where the brief or the
user requires a working form, that is a **launch blocker**, not an open item.

**Never fabricate a schema field or business detail to complete metadata.** Omit what the brief
does not support, and record the omission.

---

## Phase 11 — Open items

Write `design/open-items.md` in the customer repository. It records what could **not** be
resolved from the brief, and is the artifact that keeps CLAUDE.md §9 item 6 honest.

Include: blocking items before production; content the brief does not support and that therefore
did not ship; imagery provenance and licence status per §2.1; decisions taken that deserve
review; the brief completeness findings from Phase 0 (likely truncation, missing
conversion-critical details, authentic-photo candidates and their permission status); the
generation log from Phase 6; and the visual completion status, including the Hero Impact and
Full-page Impact outcomes stated plainly.

Record any **generated** asset as representative imagery, with its sidecar retained as technical
provenance and the prompt traceable through it. Note that no third-party licence governs it, and
name the authentic asset that would be stronger in its place where one would be.

Record any form the build designed: its intended **conversion purpose**, the **fields** it
collects, the **submission destination** where one is known, its **state** — DESIGNED,
CONFIGURED or VERIFIED — and anything still **blocking production**. This file is that record; do
not start a separate tracking document for it.

**Surface gaps; never fill one with something that implies a fact.**

---

## Phase 12 — Local commit

Before staging, check artifact hygiene (CLAUDE.md §8): temporary captures gitignored, retained
final QA screenshots under `design/screenshots/final/`, no scratch files or stray screenshots in
the project root, any prototype surface removed, and `design/concepts/` deleted (Phase 3), with
the unselected concept captures kept under `design/screenshots/concepts/`.

Scan for secrets. Inspect the **complete** staged file list before committing.

Commit locally on `main` in the customer repository. **No remote, no push, no deploy** unless the
user asks.

---

## Phase 13 — Report

Report to the user: what was built and the stack with its stated reason; integrity decisions,
including anything the brief asked for that was deliberately not built; visual QA results at all
three widths; the **Hero Impact outcome, stated honestly**, including a target that was not
reached, with the ready-to-run `/prototype` command where Phase 8 prepared one; the **Full-page
Impact outcome** (Phase 8B), equally honestly: the verdict, the single weakness named, the
refinement made and what remains; production-readiness status; open items; and the commit.

Include **every image generation** in the build, by budget, with its section and purpose:
concept stage (at most two), supporting imagery (at most two), any mobile-specific image, and any
refinement. Say plainly where a budget went unused.

Include the **hero concept stage outcome** in a few lines:

- the three concepts, by name and axis;
- which was selected and why, and whether the comparison judged it compelling or only the best
  of three adequate concepts;
- whether the standing preferences changed the outcome;
- whether full-bleed was considered unsuitable, and why;
- how many generations the stage used;
- any responsive-image processing in Phase 6 (recomposition, upscale or mobile-specific image),
  and why.

This is the owner's first sight of the concepts. It is reported, not put up for approval.

Close with a short **demo readiness** block. It is an assessment, not an action: nothing is
prepared or published at the end of a build.

```
Demo readiness
- Demo ready:        Yes | No | Needs review
- Source repository: client-websites/<repo>
- Source commit:     <Phase 12 commit SHA>
- Proposed slug:     <slug>   (see demo-deploy-workflow.md, 14.1)
- Business name:     <official name from the brief>
- Call-bar selector: <selector from the site's CSS> | none
- Outstanding:       <what prevents or needs review before public demonstration> | none
```

Judge it against the prerequisites in [demo-deploy-workflow.md](demo-deploy-workflow.md) (14.1),
from this build's own evidence. **Yes** means every check passes. **Needs review** means only the
owner can decide something, for example a hero below STRONG, or a contact detail whose public
source is unknown. **No** means a blocking failure, for example an uncleared image or an active
form integration.

Then, separately: **potential reusable lessons — as observations only.**

**Do not modify `website-builder` during a customer build.** Improvements to the reusable system
are proposed to the user and applied later, as a deliberate maintenance task in this repository.

---

## Phase 14 — Demo deployment (optional, owner-initiated)

Turns a completed, committed customer website into a temporary, unofficial prospect demo on KAP's
demo hosting platform. It runs **only when the KAP owner explicitly asks** for a demo of a named
customer site, never at the end of Phase 13, and it works for any committed customer repository.

The whole procedure, its approval checkpoints and its lifecycle live in
[demo-deploy-workflow.md](demo-deploy-workflow.md). Follow that file; nothing about demo
publishing is repeated here. A demo deployment is never a customer production deployment.
