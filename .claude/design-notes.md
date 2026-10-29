# Design Notes (reusable)

Option menus for decisions `CLAUDE.md` section 6 requires you to make. These are **prompts for
judgment, not mandates**. Nothing here is a default, a required pattern, or a checklist to
satisfy. Precedence is unchanged: user instruction, then the active brief, then `CLAUDE.md`,
then skills. Rendered evidence and the integrity rules outrank anything below.

Record the decision and its reasoning in `design/design-read.md`, including the option you
rejected.

---

## Identity placement

Decide what represents the business, and separately, where it appears.

| Option | Fits when |
| --- | --- |
| Authentic supplied logo | The business already has one. Always preferred. |
| Wordmark only | The name is the identity, or a mark would add nothing. |
| Mark or monogram plus wordmark | Recognition benefits from a compact mark, and one exists honestly. |
| Text-only branding | Genuinely the strongest treatment, not a fallback. |

If a monogram or mark was authored for the favicon or browser identity, ask whether reusing it
in the visible header improves recognition and finish, or whether it clutters a header that
already reads well. Both answers are legitimate.

**Never fabricate a logo**, and never add a mark to fill header space. A site with no mark is
not incomplete.

---

## Imagery: whether, and in what role

An art-direction decision in its own right, made deliberately rather than by default. The
integrity framework (`CLAUDE.md` §2.2) says what may carry a factual claim; this says how to
decide what the design actually needs.

Work through, and record the answer either way:

1. **Are authentic client assets available?** They are the strongest source, and the only source
   for a factual visual claim.
2. **Would this site's communication or design materially benefit from imagery at all?** Ask it
   of each section, not once for the page (*Whole-page visual strategy*, below).
3. **If authentic assets are unavailable, could representative imagery do the job honestly?**
   "No authentic photography" is an answer to question 1, not an answer to question 2.
4. **What role should imagery play?** Options, none preferred: dominant · supporting · editorial
   · atmospheric · category-based · conceptual · illustrative · none.
5. **What framing keeps it honest?** Check the heading, caption, alt text and nearby copy, not
   just the picture.
6. **What provenance, licensing and production-clearance status applies?**

**Do not force imagery, and do not let "no authentic assets" auto-resolve to "no imagery."**
Both are real outcomes; each has to be reasoned to.

### Subject class: what the image shows

Role says what an image *does* on the page. Subject class says what it *shows*. Decide both. A
well-composed image of the wrong subject still fails the hero's first question.

| Class | Shows | Strong when | Weak when |
| --- | --- | --- | --- |
| **Object / equipment** | The tool, product or installation itself, such as a panel, a chair or an espresso machine | The object *is* what the customer buys, or it is distinctive to this business | The object is generic to the category. Then it reads as "electrician", not as *this* electrician, which is the Keetons v1/v2 failure |
| **Process / service** | The work being done, by anonymous hands or a partial figure | Craft, care or skill is the selling point | It sits beside copy naming a person, where it may read as that person (see below) |
| **Customer outcome / environment** | The result the customer lives with, such as a warm, safe home, a restored car, a calm treatment room or a finished garden | The customer is buying a feeling or a result, more than an artefact | It drifts into luxury the brief cannot support, or reads as a specific customer's property |

**For a service business, explicitly weigh outcome imagery against equipment or process imagery.**
Ask which one shows the customer's *benefit*. Customers rarely want the panel; they want the house
that works. Record the answer either way. Outcome imagery carries its own honesty limits:

- it shows an ordinary, plausible place, never a showcase that implies a price point or a
  completed project;
- no identifiable house, street or view;
- nothing in the framing says it is a customer's home or this business's work.

**Composed for overlay** is not a class. It is a requirement on any class whenever type sits on the
image. It means three things:

- the subject is placed to leave the negative space the copy needs, on the side the gradient
  darkens;
- the frame survives the narrowest crop;
- no bright or detailed element sits behind the headline at any width.

Plan subject placement, negative space, overlay, gradient and mobile crop **together**, from the
layout, before the image exists.

### Photographic specificity ladder

Subject class says what an image shows. The ladder says **how much of this business** it shows.
Judge the image **together with the copy beside it**: a headline, caption or section purpose can
raise an image a rung honestly, and can also turn it into a false claim (`CLAUDE.md` §2.2).

| Rung | The image... | Example (a family dental practice) |
| --- | --- | --- |
| **1. Category-generic** | identifies the industry and nothing more | a toothbrush, a dental chair, a smile |
| **2. Customer-outcome** | communicates the experience or result the customer wants | a parent and child's ordinary, unhurried morning; the relief of a calm visit |
| **3. Business-evident** | connects to this business's actual services, customers' own language, location or distinctive traits | an image built around what the reviews actually praise, paired with a verbatim patient line; the brief's real neighbourhood, honestly framed |
| **4. Authentic** | depicts the real business, staff, premises, products or work, with permission | the real reception room, the dentists themselves |

- **Prefer the highest rung that is credible and available.** Rung 4 needs real assets (§2.1);
  rungs 2 and 3 are where honest representative imagery does its best work.
- **Attractive is not specific.** An image does not become compelling because it is well lit,
  beautiful or easy to compose. A well-made rung-1 frame is still rung 1.
- **Climbing must stay honest.** Rung 3 comes from the business's real evidence, not from implying
  premises, people or work the business cannot claim. Where climbing would require that
  implication, stay lower and let the copy carry the specificity.

**For each important image, record:**

- the emotional or practical **message** it carries;
- **why it belongs to this business**;
- whether **a competitor could use it unchanged**;
- how the **accompanying copy** contributes to its specificity;
- whether its **framing could misrepresent** the business.

Abstract, graphic, illustrative and typography-led treatments are judged on their own terms. The
ladder applies to images that depict a subject, not to every visual treatment.

### Depicting a service performed by people

Many businesses *are* people doing something: care, repair, teaching, hospitality, advice. Where
authentic photography of the real staff and customers is unavailable, the honest alternative is
not limited to abstraction. A service can be depicted **anonymously** — hands and forearms, a
gesture mid-task, a partial figure, a subject seen from behind or cropped above the hairline,
tools in use — and that remains **representative imagery** under `CLAUDE.md` §2.2.

**"No recognisable faces" is a composition instruction, not a bar on depicting the work.** The
integrity line in §2 and §2.2 is unchanged and is not relaxed here: no identifiable person, no
identifiable premises, and nothing in the heading, caption, alt text, section purpose or nearby
copy asserting that the people shown are this business's staff, customers or completed work.
Where the framing makes that claim, reframe the section or supply an authentic asset.

Four things this does **not** mean:

- **Permissible is not desirable.** Anonymity clears the integrity question; it does not make the
  image good. A frame that could belong to any business in the category is what the hero's first
  question — would this survive a competitor's name? — exists to catch, and it can weaken a
  composition that typography alone would have carried.
- **The hero can imply identity without a single face.** It is the most identity-laden slot on the
  page, and a figure placed directly behind the business's own claim may still be read as its
  staff. Judge the image together with the headline beside it, never on its own.
- **Residual risk is recorded, not argued away.** Where a meaningful chance remains that a visitor
  reads the subject as this business's own people or premises, record it in
  `design/open-items.md` together with the authentic asset that would remove it.
- **Authentic client photography stays the stronger asset** wherever it exists and suits the
  design, and asking for it stays a better answer than working around its absence.

No site requires a photograph. An image-free hero remains a legitimate outcome of this decision.
What is not legitimate is arriving there by assuming the only honest depiction of a people-based
service is an abstract one.

### The hero specifically

A hero may be photography-led, typography-led, illustration-led, graphic, mixed-media, spatial,
minimal, or any other justified treatment. **No hero type is mandated.** The owner's standing
preference for full-bleed cinematic photography ([owner-preferences.md](owner-preferences.md))
guarantees that treatment a place among the three concepts when it is suitable, and weights a
close selection. It never makes it the automatic answer.

But where a hero is repeatedly criticised for weak visual evidence, thin atmosphere, generic
composition, low emotional impact, or an inability to communicate the business visually,
**honest representative imagery is one of the options to consider** for solving it. Integrity
does not forbid exploring that direction merely because authentic client photography is missing.

The converse holds just as firmly: do not add imagery because a critic asked for "more visual
impact." It has to materially serve the concept, or it is decoration.

### Full-bleed photographic hero with a directional gradient

**What it is.** A photograph covers the whole hero under the header. A dark gradient gathers where
the copy sits, usually from the left on desktop, so the subject stays visible elsewhere. The
headline, supporting text and a prominent primary CTA sit in one aligned column *inside* the
photograph, with a secondary action subordinate to it. Type and image share one surface: there is
no seam, and no card floats over the photo.

**Suitability test.** It is a candidate in the hero concept stage only when **all** of these hold.
Record which condition failed, where one does.

1. **An honest image exists or can be made.** That means an authentic or licensed asset, or a
   generation that is available and permitted, whose subject can carry the concept *without*
   implying a person, premises, product or completed work this business cannot claim
   (`CLAUDE.md` §2.2).
2. **The subject survives the headline beside it.** Judge it as the critic will: image plus
   headline. For people-centred businesses (care, health, advice), where any figure behind the
   business's own claim reads as its staff or clients, this often fails. A non-figurative outcome
   or environment subject may still pass.
3. **The copy fits.** The brief's hero copy fits in the gradient zone at 390, 768 and 1440 without
   pushing the primary CTA out of the first viewport at 390x844 at default text size.
4. **The brief does not direct otherwise.** A brief asking for a typographic, illustrated, light
   or image-free hero overrides the preference.
5. **The subject earns its place beside this business's name.** Together with the hero copy, the
   subject reaches at least **rung 2, customer-outcome**, on the specificity ladder above. A
   category-generic photograph alone, however well composed, does not qualify. It may still
   appear inside another concept, but it is not this archetype's whole idea.

**Specify it from the layout**, before the image exists:

- **Subject placement:** the subject and its brightest areas sit in the half of the frame *away*
  from the copy, and nothing bright or detailed sits behind the headline.
- **Gradient shape:** say which side, its stops, and how far it reaches. It should be strong enough
  for contrast where the text lines are, then fall off fast enough that the subject still
  contributes. A full-frame flat scrim that turns the photograph into texture is a failure (see
  *Hero imagery: presence and impact* below).
- **Mobile strategy, decided separately, not inherited:**
  - the portrait crop (`object-position`, or an art-directed `<picture>` source);
  - where the subject sits in it;
  - the scrim direction, usually top-down or bottom-up on phones rather than left-to-right;
  - a scrim band tied to where the copy actually starts, so short phones stay legible.
- **Wide screens:** wider than about 1440px, a centred copy column drifts across the image. Either
  extend the gradient stops with the extra width or anchor the column, then re-measure at 1920.

**Geometry.** Use a **landscape** master proportioned for the hero, never a square frame that
needs reconstruction.

- For a generated asset, the default is `--size 1536x1024`. That is 3:2, it covers the desktop
  hero, and it leaves more height for a portrait crop than 16:9.
- The engine passes `--size` straight to its provider. Use only sizes that have actually succeeded
  on this machine (1536x1024, 1536x864 and 1024x1024 have) or that the provider documents for the
  engine's current model. Do not assume a larger size exists.
- Plan the **desktop composition and the mobile crop before generating**: where the subject falls
  in each, and how much of the source each crop uses.

### Responsive image quality

A frame that is sharp on a desktop can be soft on a phone. A tall mobile hero crops a narrow slice
out of a landscape master and enlarges it. So judge sharpness where it is displayed, not from the
file's size.

**Effective density.** For each crop, divide the source pixels the crop actually uses by the CSS
pixels it fills. Under `object-fit: cover`, that is `1 / max(heroWidth / imageWidth, heroHeight /
imageHeight)`.

- **Worked example:** a 1536x1024 master filling a 390x844 hero gives about 1.2 source pixels per
  CSS pixel. On a 3x phone, each source pixel is spread across several device pixels.
- **Where to measure:** at the real mobile hero size (390x844 and the shortest supported phone),
  at 1440 and at the widest tested width.
- **What it is for:** it is a decision aid, not a pass mark.
  - At about 2 or more, the crop is normally sharp enough.
  - Below about 1.5, it is usually visibly soft.
  - In between, judge it in a render at `deviceScaleFactor: 3`, viewing native pixels on the
    subject and edges, not a thumbnail.

**When a crop is insufficient**, take the first remedy that genuinely fixes it, and record why:

1. **Reuse the selected image, recomposed.** A shorter mobile hero, a different focal crop, or an
   art-directed `<picture>` source cut from the same master may raise density enough. This costs
   nothing.
2. **A justified upscale of the selected image only.** This uses the local Real-ESRGAN build
   (`ClaudeCode/Tools/realesrgan/`, model `realesrgan-x4plus` for photographic content), then
   downsamples to the widths actually served.
   - It is local processing, not a generation, and costs no API call.
   - Use it only when density, not composition, is the failure.
   - Judge the result at native pixels for invented texture or artefacts, especially in faces,
     text-like marks and fine pattern.
   - Never upscale an image for a rejected concept, or a frame that will not ship.
   - Never upscale an **authentic client photo** in a way that invents detail a visitor would
     take as fact. Record the need for a higher-resolution original in `design/open-items.md` so
     it reaches the owner in the Phase 13 report. Do not pause the build for it, and ship the best
     honest delivery meanwhile.
   - If the tool is missing, record that and use remedy 1, 3 or the best honest delivery.
3. **One mobile-specific image**, only where the landscape master cannot give a phone a sound
   composition at any acceptable density, for example when the subject cannot sit clear of the
   copy in a portrait crop.
   - It is composed for the portrait hero, follows the same concept and subject class, and is
     specified from the mobile layout.
   - It counts as a generation under `CLAUDE.md` §4, in Phase 6, and it is never automatic.
   - Where the frame needs only more pixels, an upscale is the answer, not a new image.

This never mandates a separate mobile image, and an image that already renders sharply needs
nothing.

**Record any processing.** Note the remedy chosen and the measured densities before and after.
For an upscale, also record the tool, its version and licence, the model, the scale factor and
the hash of the master. Keep that record beside the served files, as Keetons does in
`hero-home-upscale.json`. Add the image's provenance row in `design/open-items.md` (`CLAUDE.md`
§2.1), and report it in Phase 13.

Mirroring a frame to move a subject is also a recorded decision, and only where the frame contains
no text or orientation-specific detail.

**Contrast is measured, not estimated.**

- Measure against the rendered image, with the copy hidden, behind the **actual text line boxes**,
  not the elements' bounding boxes, which overlap image detail the glyphs never touch.
- Measure at 390, 768, 1440, the widest tested width, and each breakpoint where the crop changes.
- The headline must reach at least 3:1 as large text, and body and CTA labels at least 4.5:1.

**It is not centring.** Left-aligned (or otherwise directional) type over a full-bleed photograph
satisfies the intent of Taste's anti-centre rule (`taste` §4.3). That rule exists to stop a
symmetric, centred stack; it lists split and left-aligned structures as remedies, and a directional
column on a full-bleed image is one. Likewise, Taste's "centered hero over dark mesh" tell (§0.D) is
about centred type on an abstract gradient background, not about a composed photograph under a
directional scrim. Neither rule counts against this archetype. The vendored skill is unchanged;
this note governs its reading here (`CLAUDE.md` §1 ranks this guidance above skills).

**It is not the house look.** Vary the subject, palette, scrim shape and type from one business to
the next ([owner-preferences.md](owner-preferences.md), preference 7). Two consecutive sites
sharing a dark-left-gradient full-bleed hero is acceptable. Two sharing it *and* the same subject
class, palette family and type treatment is a repetition to avoid.

### Writing a prompt for generated imagery

Relevant only once the questions above have concluded that representative imagery is right, that
no suitable authentic or appropriately licensed asset exists, and what role the image plays.
Generated imagery is one source of representative imagery, not a preferred one, and reaching for
it is never the automatic consequence of missing photography.

The prompt is written **from this site's actual art direction and intended placement** — never
from a generic idea of a nice picture, and never to discover what the design should be.

Considerations, not a formula, and not all apply to every image:

- **Composition and subject placement** — where the subject sits in the frame, and what the
  layout needs the rest of the frame for.
- **Negative space** where type, a CTA or a scrim will sit over it, and on which side.
- **Crop behaviour** — the frame has to survive every crop the responsive design applies,
  especially the narrowest one.
- **Palette**, consistent with the page's own, so the asset belongs to the design rather than
  visiting it.
- **Lighting, mood and style**, set against the tonal rhythm already decided.
- **Realism or illustration intent**, stated rather than left to chance.
- **Exclusions** — what must not appear. Text and lettering, logos, signage, brand marks,
  recognisable faces and anything implying one specific real place are the usual ones, because
  those are what turn representative imagery into a false claim.

The integrity line is unchanged. A generated image carries atmosphere, category or concept and
**never** evidence of this business's premises, staff, customers, products or completed work; no
prompt wording makes it evidence. Where the surrounding heading, caption, alt text or section
purpose would assert otherwise, reframe the section or supply an authentic asset — do not
re-prompt around it.

---

## Hero imagery: presence and impact

When the hero carries photography or media, legibility is necessary but not sufficient. Also
judge, from the render:

- Is the subject **visible enough to contribute**, or has treatment reduced it to texture?
- Do the scrim, overlay, or opacity **suppress the subject** further than legibility requires?
- Does the image read as **intentional** rather than as decorative background filler?
- Do image and typography hold the **dominance the chosen archetype intends**? A type-led
  poster and a full-bleed photographic hero want opposite balances, and both are valid.

There is **no universal opacity target and no preference for brighter imagery**. A near-black
frame can be exactly right. Set the treatment against the hardest contrast constraint on the
page (often the accent colour in the headline), then verify at every width.

---

## Hero impact

The model behind `CLAUDE.md` section 7.2. **Judged from the rendered first viewport at ~390,
~768 and ~1440, never from source or from the design rationale.** Mobile is judged on its own.

### The five questions

**Idea.** What does the hero *show* about this particular business, rather than merely say?
Would substantially the same hero still work with a competitor's name dropped in? If yes, that
is evidence it is generic. This does not require a gimmick: the idea can live in typography,
photography, composition, restraint, space, crop, contrast, identity, material, or any other
business-appropriate decision.

**First look.** At a glance, or squinting, is there one clear dominant element, and is it the
*right* one? The viewer should not have to decide which of several equally weighted things
matters first.

**Relationship.** Do type, image, space, identity, CTA, edges and background form **one**
composition, or independent modules parked beside each other? A split layout is not inherently
weak and a full-bleed one is not inherently strong. The question is whether the parts interact.

**Commitment.** Has at least one meaningful variable been pushed decisively: scale, crop,
colour, negative space, contrast, typography, image dominance, stillness, motion, restraint,
density? Louder is not better. For luxury, medical, financial, legal or trust-heavy work,
confident restraint is the committed choice. What fails is leaving every variable in the safe
middle.

**Path.** Is the primary next action obvious in that same first glance? A minimum, not a
definition of strength.

### Verdict ladder

| Verdict | Meaning |
| --- | --- |
| **CORRECT** | Competent, readable, usable, appropriate. Visually ordinary. **Does not pass.** |
| **STRONG** | Clearly art-directed, distinctive enough to feel custom, one intentional visual idea, strong first impression. **The release target.** |
| **MEMORABLE** | Exceptionally distinctive and cohesive while still serving the business and the conversion goal. Aspirational, never chased. |

The ladder judges a render; it does not decide how long to keep trying. The escalation is
**bounded** and its sequence lives in
[site-build-workflow.md](site-build-workflow.md).

### Briefing a fresh-context critic

Give it **only**: a short business and brand summary, the first-viewport screenshots, and the
five questions. **Withhold** the rationale, the archetype reasoning, implementation detail,
which candidate is the original or the newest, and any hint of a desired verdict. The point is
to strip anchoring from a builder grading its own reasoning.

Ask it to return an assessment per question, one verdict from the ladder, and the **single
biggest weakness**. When comparing alternatives, also ask which is strongest and whether that
one is genuinely STRONG or merely the best of several CORRECT designs.

**Read the signal, not the label.** Independent critics disagree at the CORRECT/STRONG
boundary, so one verdict — favourable or not — settles little. What carries weight is the same
weakness named across independent evaluations, and rendered evidence. Adding critics buys noise
rather than certainty, so the bounded passes in the workflow are the budget.

### Comparing hero concepts

Used once, in the hero concept stage ([site-build-workflow.md](site-build-workflow.md), Phase 3),
before anything is implemented. Its job is to choose between **ideas**, rendered well enough to
judge. It is not a verdict on finished work, so it uses no verdict ladder.

**Give the critic:**

- a short business summary;
- the matched captures at 390x844, 768x1024 and 1440x900, labelled only "Concept 1/2/3" in an
  order unrelated to the drafting order;
- the criteria below.

**Withhold:**

- concept names and rationale;
- which concept is full-bleed;
- the owner's preferences;
- any hoped-for winner.

**Ask it to assess each concept against each criterion, judging every width, with mobile on its
own:**

1. **Business relevance and differentiation:** does it show something about this business that a
   competitor's hero would not?
2. **Visual impact and emotional connection:** does the first glance land, and does it make the
   customer feel what they are buying?
3. **Trustworthiness and content integrity:** does anything look like a claim the business may
   not be able to make (the people, place or work shown)?
4. **Conversion effectiveness:** is the primary action obvious, and is the secondary one clearly
   subordinate?
5. **Typography and composition:** is it one composition, with a clear dominant element and a
   committed decision, or modules parked beside each other?
6. **Mobile responsiveness:** is the phone first viewport strong on its own?
7. **Accessibility and readability:** is every line comfortably legible over whatever is behind it?

**Then ask:**

- a ranking with the reason for each place;
- the single biggest weakness of each concept;
- whether the leader looks capable of becoming genuinely strong once built, or is merely the best
  of three ordinary ideas.

The last two questions yield **two separate judgements**, and the selection record keeps both:
which concept is best, and whether it is compelling enough to justify selection. "Best of three
adequate ideas" is a finding, not a failure of the stage. The workflow says what follows from it
(select the strongest, record the limitation, carry it into the build), and it never triggers a
fourth concept or a second comparison.

The critic's ranking is evidence. The build combines it with its own assessment and then applies
the standing preferences as the workflow specifies. The critic is never asked to apply them.

### When the verdict is CORRECT

Name the biggest weakness first; do not start tweaking. Common ones: no business-specific
idea, no dominant focal point, image and type that never interact, everything in the safe
middle, generic stock art direction, a weak mobile first viewport, or CTA hierarchy competing
with the visual idea. Then judge whether the current direction can be strengthened cleanly. The
concept stage's runner-ups are evidence for that judgement, not a second round.

If it needs a further set of genuinely different compositional ideas rendered side by side after
the build, that is an exploration **only the user can run**. The build never starts or imitates
it on its own; the one autonomous comparison already happened before implementation. Follow
the bounded sequence in [site-build-workflow.md](site-build-workflow.md), which says where
autonomous work stops, what to hand over, and where the build resumes afterwards.

The reusable capability is recognising **whether a hero has an idea**, not any particular
technique that once produced one.

### A critique is a diagnosis, not a prescription

A critic names what is wrong in the render. It does not decide the remedy. Any fix it volunteers
is one option among several, weighed like any other, and it sits outside the precedence in
`CLAUDE.md` §1 entirely: it never outranks the brief.

So when the named weakness involves imagery, **separate the symptom from the cause before
changing anything**. "The photograph is generic and never interacts with the type" is one
symptom with several possible causes, and they call for different remedies:

| Candidate cause | What answers it |
| --- | --- |
| The subject is wrong for this business | A different subject, or a different role for the image |
| The crop or focal point is wrong | Recrop, move the focal point, change `object-position` |
| The proportion is wrong | Change how much of the frame the image owns relative to the type |
| The treatment is wrong | Grade, scrim, contrast or tonal handling, not replacement |
| Image and type never interact | Shared edges, overlap, alignment, a crossing element, a common grid |
| The hierarchy is wrong | The image may be fine and simply louder than the thing that should lead |
| The placement is wrong | The image earns its place elsewhere on the page, not in the hero |
| The surrounding space is unshaped | What fails is the composition around the image, not the image |
| The hero carries no imagery and that absence is the weakness | Reconsider the imagery role settled in Phase 3 — see below |

**The imagery decision made in Phase 3 is one of the things a diagnosis may reopen.** It was art
direction settled before anything rendered, and `CLAUDE.md` §1 ranks rendered evidence above a
record's own assertion — this project's records included. So where the critique's diagnosis
genuinely supports it, the single permitted refinement may **introduce, remove, replace or
reposition** imagery in the hero, rather than only adjusting an image already present. An
exclusion recorded in `design/design-read.md` is revisitable art direction unless it restates §2;
the §2 line itself is not revisitable at all.

This widens what the one refinement may **be**, and changes nothing else. There is still a single
refinement and the same number of critiques, no exploration round added, and no browsing of
variants to find a preferred verdict. Where the refinement introduces or replaces an image, that
asset follows `CLAUDE.md` §4 exactly as it always does — **one purposeful generation for one
defined design problem**, specified from the composition rather than from a general idea of a
nice picture, and never a spread of candidates to choose between. A critic still never outranks
the brief, and **no hero needs a photograph to reach STRONG** — reopening the question is not
deciding it in imagery's favour. Where the refinement is spent this way, the superseded direction
is kept as evidence and `design/design-read.md` is reconciled to what shipped.

Only once a likely cause is named does **removal** join the options, weighed against targeted
refinement. **Neither keeping imagery nor removing it is the safe default.** Removing an image is
a legitimate design move, and it is also the move that makes a criticism disappear without
necessarily solving it, so it is argued for rather than reached for.

**Where the brief explicitly asked for imagery in that slot, that direction carries the weight
`CLAUDE.md` §1 gives it**, and a critic preferring otherwise is not a higher authority. Removal
stays permitted where it is genuinely the strongest answer. It is then a departure from the
brief's design direction, and is recorded as one with its reason and the alternative that was
tried (`CLAUDE.md` §6).

None of this adds a round. It is what the one focused refinement is spent deciding.

---

## Whole-page visual strategy

The judgement behind `CLAUDE.md` §6 (*Whole-page visual strategy*) and the section-by-section
plan in [site-build-workflow.md](site-build-workflow.md), Phase 3. The hero earns a site's first
impression; the rest of the page decides whether that impression holds as the visitor scrolls.

### Visual treatments

A vocabulary, not a menu to work through. **No treatment is mandatory, and none is the default.**

| Treatment | What it does well | Watch for |
| --- | --- | --- |
| **Full-bleed photographic section** | A change of pace and scale; atmosphere; a breath between dense sections | Copy on it needs the same contrast discipline as a hero; one per stretch of page, not every other section |
| **Image-backed call to action** | Gives the closing ask emotional weight, often reusing a frame the page already has | Scrim strength versus subject presence; the CTA must stay the first thing seen |
| **Image-and-text split** | Pairs one idea with one picture; services, process, people | Repetition: alternating splits turn into a zigzag template (Taste caps runs of them) |
| **Editorial crop** | An unexpected crop or scale of a frame gives a familiar subject a point of view | A crop that reads as accidental truncation (`CLAUDE.md` §7.1) |
| **Detail photography** | Texture, material, hands, tools, the small evidence of care | Detail that implies specific work or premises the business cannot claim |
| **Texture or material ground** | Surface and warmth without a subject to misread | Becoming decoration that could belong to any business |
| **Graphic or illustrative treatment** | An idea photography cannot show honestly; diagrams; brand shapes | Hand-rolled clip-art feel; one coherent style only |
| **Typography-led section** | Statements, quotes, numbers the brief supports; restraint as emphasis | Becoming the default because it is easiest, which is the failure this section exists to prevent |

### Deciding a section's treatment

- **Ask the section's own question.** What should the visitor feel or do here, and would a
  picture make that faster, warmer or more convincing than words alone?
- **Run the authenticity check for this section only.** "We have no photographs of the
  dentists" decides how a people section is treated: typographic, illustrated, or an honest
  non-figurative image. It says nothing about whether the services section may carry detail
  photography, or the final call to action an image-backed ground.
- **Source in order.** Authentic with permission; licensed; a crop, grade or treatment of an asset
  the build already has; then, within the supporting budget (`CLAUDE.md` §4), a new generation
  that materially improves the page. **One master can serve several sections** through different
  crops, scales and treatments: a hero frame's detail as a services band, its darkened wide shot
  behind the final call. Reuse only while it reads as intended rather than repeated.
- **Climb the specificity ladder** for every important image, and record its storytelling notes.

### Judging the plan as one scroll

Read the plan top to bottom, as a visitor would:

- **Runs.** Three or more consecutive sections carried by text on a flat ground usually read as
  one long document. It is not forbidden; it needs a reason.
- **Repeated grids.** Card grid after card grid flattens hierarchy. Vary the family (Taste's
  layout-repetition rule).
- **Empty space with no job.** Whitespace is a tool when it frames something. A large void beside
  a short paragraph is not restraint.
- **Flat colour as the only change.** Shifting background colour is the cheapest kind of
  variation. Ask whether scale, image, crop or composition should carry the change instead.
- **Transitions.** Where does the eye land at each section edge? A photograph, an overlap, a
  change of scale or a shift in tone can each carry the visitor forward.
- **Conversion rhythm.** Calls to action land after the moments that earn them, not at a fixed
  interval.

There is **no image quota**, and no cap on typography-led sections. A wholly typographic page can
be the strongest answer, for a business whose voice is its product, or where every honest image
would be generic. It is then a decision, recorded with its reason.

### Variety across builds

Compare the plan with the last three builds' whole pages (workflow, Phase 3, step 1): section
sequence, visual carriers, photographic treatment beyond the hero, CTA presentation and rhythm. A
structure that worked once is not a template. Where this page resembles one closely, record why
this business warrants it. Do not invent difference for its own sake either; the business decides.

---

## Full-page impact

The model behind `CLAUDE.md` §7.4, judged from **full-page renders at ~1440 and ~390**. The hero
questions above judge the first viewport; these judge the whole scroll. The verdict ladder is the
same, and STRONG is the target.

### The full-page questions

1. **Overall impact.** Does the page hold the hero's first impression all the way down, or does
   it sag into a document?
2. **Business specificity.** Below the hero, what makes this page belong to this business rather
   than any business in its category?
3. **Photographic storytelling.** Where imagery is used, does it carry a message and earn its
   place? Where it is absent, is the absence a decision that works?
4. **Section-to-section variety.** Are compositions varied with purpose, or repeated? Are there
   long runs of similar text sections or card grids?
5. **Text density.** Can a scanning visitor get the story from headings, images and short lines,
   or is it a wall of paragraphs?
6. **Visual hierarchy.** On each screenful, is there one clear thing to look at first?
7. **Composition and whitespace.** Is space shaping the content, or merely left over?
8. **Transitions.** Do section edges carry the eye forward, or does each section stop dead?
9. **CTA placement and conversion rhythm.** Do the calls to action arrive where the page has
   earned them, with a clear primary and secondary?
10. **Premium and distinctive.** Does the whole page feel art-directed and custom, or assembled?

### Briefing the full-page critic

Give it **only**: a short business summary, the full-page captures at ~1440 and ~390, the section
names in page order, and the questions above. **Withhold** the visual strategy's reasoning, the
hero concept history, earlier critiques, the owner's preferences and any hoped-for verdict.

Ask for: an assessment per question, **one verdict** from the ladder, the **single most important
weakness**, and **one specific recommended improvement**. The recommendation is evidence, weighed
like any other remedy (*A critique is a diagnosis, not a prescription*, above). It never outranks
the brief or §2.

The bound lives in the workflow (Phase 8B): one critique, at most one refinement, and a second
critique only where the refinement materially changed the composition or the original criticism
needs verifying. As with the hero, weight criticism that recurs over any single label.

---

## Tonal rhythm

Tools for pacing a page tonally:

dark and light section transitions · image-backed bands · tonal shifts within one palette ·
texture changes · subtle surface changes · border and rule transitions · a single
uninterrupted treatment

**Do not mechanically alternate light and dark.** A wholly dark or wholly light page is
correct when it is intentional. The question to answer during composition is whether tonal
variation would improve pacing, hierarchy, perceived depth, section differentiation, scroll
interest, or premium feel.

Taste's theme lock is advisory here. A deliberate tonal transition is valid when the brief and
the rendered result justify it; unexamined sameness is not.

---

## Interactive card state

Where card-based content is genuinely interactive, a restrained state change on hover and
focus can add feedback and polish. Candidates include testimonials, services, team, portfolio,
benefits, pricing, gallery-adjacent tiles, and contact options.

Properties worth combining, sparingly: background colour · foreground and text colour · border
treatment · icon colour · quotation-mark treatment · image scale or grade inside a fixed frame
· subtle elevation · shadow · opacity · restrained positional movement.

Constraints:

- **Not every card.** Decorative, non-interactive elements get no hover state.
- Gate hover behind `@media (hover: hover) and (pointer: fine)`.
- Keep keyboard focus coherent and visible wherever the card is interactive.
- Honour `prefers-reduced-motion`: movement goes, colour and feedback may stay.
- Prefer a **short, responsive transition and a clear state change** over elaborate animation.
- Scaling a bordered frame drags its edge out of alignment with neighbours. Scaling the image
  **inside** a fixed frame usually reads better.

---

## Conversion channels

Assess which channels the active brief actually supports, and which this audience would
prefer, before finalising.

telephone (`tel:`) · email (`mailto:`) · inquiry or contact form · quote or estimate request ·
booking or scheduling link · directions and maps · in-person visit · social or messaging
channel · external ordering or reservation link · a business-specific path

- **Never invent** a phone number, email, address, form endpoint, booking URL, social profile,
  or operating detail. An unsupported channel does not ship.
- Where a **verified email exists**, explicitly consider whether an email CTA or `mailto:`
  link improves how reachable the business is. It often does for SMB sites where a phone call
  feels like a bigger commitment than a message.
- Where a **form suits the business but no destination is known**: build only what can be
  implemented honestly, prevent any appearance of successful submission, and record the
  missing backend in `design/open-items.md`. That is the **DESIGNED** state in `CLAUDE.md` §6,
  and it is never described as more than that.
- Many SMB sites benefit from a primary call or booking CTA plus a secondary email, form, or
  directions path. **Do not force multiple channels** on a business with one clear conversion
  path. Where several are legitimate, decide which one leads; equally weighted CTAs decide
  nothing for the visitor.

### When a form is the right channel

Relevant only once the assessment above concludes a form genuinely helps this business.
`CLAUDE.md` §6 owns **whether it may ship and in what state**; this is how to design the thing
itself. None of the options below is preferred.

**Where it lives.** Integrated into the final CTA band · a dedicated contact section · paired
with the visit, hours or map panel · inline after the section that raises the question it
answers · a quote or estimate request attached to a specific service · nowhere on the page, with
a `tel:` or `mailto:` CTA doing the work instead.

**How it looks.** Composed with the same type scale, radius, accent, spacing and tonal treatment
as everything around it. A form band is a designed section: a heading that says what actually
happens next, copy in this business's voice, and a submit control that reads as this page's own
button. The default to avoid is generic stacked inputs under "Contact Us" in a grey utility
block — the footer equivalent of a widget.

**What it asks.** The fewest fields that let the business reply. Name · one reliable reply
channel, email or phone · a short free-text message · an inquiry type **only** where it
genuinely routes or speeds the response. Every extra field costs conversion, so each earns its
place. Never collect what the business does not need to act, and never route sensitive personal
detail through an ordinary inquiry form (`CLAUDE.md` §6): for clinical, financial or legal work,
invite contact and let the sensitive exchange happen on a channel built for it.

**How it behaves.** Labels are visible and associated, not placeholder-only. Errors are
specific, inline, announced to assistive technology, and never signalled by colour alone. Every
control is keyboard-operable with a visible focus state. Loading, success and failure states are
**honest**: no success state appears unless the submission actually succeeded, a failure says so
plainly and offers the working alternative channel, and a form with no configured destination
presents no appearance of success at all. Client-side validation is a courtesy; real validation
and abuse protection belong at the destination and are specified once one exists, sized to the
actual deployment. **No credential, private key or provider token appears in client-side code.**
Promise nothing about response time, privacy or delivery that the brief does not support.
