# KAP Website Redesign: Final Site-Wide QA Audit

Audit date: 2026-11-01. Branch: `kap-website-redesign`, 7 commits ahead of `main`, with the contact, payment, legal and remediation work uncommitted. Sections 2 to 9 are the original audit, with a status line added to each finding since addressed. Sections 10 and 11 record the remediation and the rate-limiting assessment. Section 8 is the audit's baseline; current results are in section 10.

## Readiness (after remediation, 2026-11-01)

| Question | Answer |
| --- | --- |
| **Technical readiness** | **Not ready to merge to production.** The Next.js upgrade and AI image removal are done, so those two gates are closed. Two remain: the real Resend and Stripe test-mode runs (V-01, V-02). |
| **Legal readiness** | **Not ready.** Privacy and Terms are unreviewed drafts that say they must not be published, and the footer links them from every page (L-01). Legal review has not started. |
| **Owner acceptance** | **Open.** No item here blocks the code, but several affect what the site claims. O-01 to O-03 should be settled before launch. |

Merging `kap-website-redesign` to `main` deploys to production, so all three gates need to close first. Production `main` still runs the vulnerable Next.js version (section 10).

Open findings now, with the original audit's count in brackets:

| Severity | Technical | Verification | Legal | Owner | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| **P0** launch blocker | 0 (2) | 2 (2) | 1 (1) | 0 (0) | **3** (5) |
| **P1** important | 4 (6) | 0 (0) | 7 (8) | 5 (5) | **16** (19) |
| **P2** improvement | 12 (11) | 0 (0) | 0 (0) | 4 (4) | **16** (15) |

## 1. Confirmed state

| Check | Result |
| --- | --- |
| Footer Navigate column | Services (`/#solutions`), About, Contact, Make Payment on all 9 pages |
| Footer bottom bar | Privacy Policy, Terms & Conditions; no legal links in Navigate |
| Desktop navbar | Home, Services, About, Contact Us, Let's Talk |
| Positioning | Copy and page order lead with AI automation; website development is presented as one of three services |
| Working tree | Identical before and after the test runs (`git status --porcelain` hash `d46180ab…` until this file was added) |

The header call to action reads "Let's Talk" (see O-08).

## 2. Technical defects

### P0

**T-01. Next.js 16.2.6 has critical security advisories**
- **Status: resolved on this branch (16.4.1); still open on production `main`.** See section 10.
- **Affected:** whole site, and production `main` today.
- **Evidence:** `npm audit` lists 5 critical Next.js advisories, including remote code execution: GHSA-2464-fhr4-w9xw (image optimization and SVG on glibc Linux; sharp here is 0.34.5, patched in 0.35.5), GHSA-2xp9-vwfh-vxw4 (AVIF), GHSA-vcvr-r3jv-pc5j (`next/og`), GHSA-p293-qw3h-jr36 (Windows hosting) and GHSA-673q-mjm6-r5xr (`use cache`). Reading the code, most preconditions look unmet: no `remotePatterns`, no attacker values in the OG image, no proxy or server actions, Vercel rather than Windows hosting. However, `/_next/image` is public. I read the advisories and code; exploitability was not tested.
- **Also relevant:** `next dev` on this Windows machine listens on the local network (10.5.0.2), which is the setting the Windows advisory concerns.
- **Correction:** upgrade to the version `npm audit` recommends (16.4.3), read `node_modules/next/dist/docs/` first as `AGENTS.md` requires, align `@next/third-parties` (16.2.7 against next 16.2.6), and repeat this audit's regression suites. Consider upgrading production independently of the redesign, because the exposure is already live.
- **Owner approval:** yes.

**T-02. The uncleared AI image is publicly downloadable**
- **Status: resolved.** Both files deleted. See section 10.
- **Affected:** `public/images/hero/approachable-office-dusk.webp` (1.1 MB) and its `.webp.json` sidecar.
- **Evidence:** both return HTTP 200 at their URLs, and the sidecar exposes provider, model and full prompt. The image is **not displayed**: there were 0 requests while browsing and no references in the built output. It is absent from `main`, so merging would publish an asset recorded as "Not cleared for production" (CLAUDE.md §2.1).
- **Correction:** move both files out of `public/`, for example to `design/superseded-assets/`.
- **Owner approval:** yes, because you asked earlier to keep it in place.

### P1

**T-03. No rate limiting on the contact or payment APIs**
- **Status: open.** Recommendation in section 11; nothing enabled.
- **Affected:** `app/api/contact/route.ts`, `app/api/stripe/create-payment-intent/route.ts`.
- **Evidence:** 40 parallel posts to each route all returned 200. The honeypot and `sec-fetch-site` checks only stop casual abuse, and a scripted client can pass both. Risks are a flooded inbox, used-up Resend quota, and a pile of open PaymentIntents or card-testing attempts.
- **Correction:** Vercel Firewall rate rules on both routes and Stripe Radar review, as brief item B7 proposes. Code-level limiting is only needed if the firewall proves insufficient.
- **Owner approval:** yes (hosting configuration and protected routes).

**T-04. Canonical host contradicts the live redirect**
- **Status: code resolved (`www`); open for the infrastructure change.** The apex still answers 307; it should be permanent. See section 10.
- **Affected:** `SITE_URL`, canonicals, `og:url`, sitemap and robots `Host`, on all pages.
- **Evidence:** all use the apex domain, while the live apex returns **307** (temporary) to `https://www.`. Search engines are told to prefer an address that redirects elsewhere.
- **Correction:** pick one host (B7 proposes `www`), make the redirect permanent and align `SITE_URL`.
- **Owner approval:** yes (host decision and deployment settings).

**T-05. Four indexable pages have no social preview image**
- **Status: open.** No artwork made, by instruction.
- **Affected:** `/services/workflow-automation`, `/services/customer-engagement`, `/services/websites`, `/about`.
- **Evidence:** no `og:image` or `twitter:image`, though `twitter:card` is `summary_large_image`. Page-level `openGraph` replaces the site-wide image. `design/open-items.md` wrongly says they inherit it.
- **Correction:** add the shared image to each page's metadata and correct the record.
- **Owner approval:** no.

**T-06. Default keyboard focus ring is too faint**
- **Status: resolved.** See section 10. The buttons' separate ring had the same defect, which this audit missed; it is fixed too.
- **Affected:** logo link, footer links, mobile menu toggle and compare slider, on every page where they appear.
- **Evidence:** the `outline-ring/50` default renders `#b1296e` at 50% on cream, a measured **2.34:1** against the 3:1 minimum (WCAG 1.4.11). It is visible but weak. Navbar links and the About cards use stronger outlines and pass.
- **Correction:** use a solid outline colour in the shared default, then re-check on dark grounds.
- **Owner approval:** no.

**T-07. Footer headings narrowly fail contrast**
- **Status: resolved.** Now 5.35:1. See section 10.
- **Affected:** `components/layout/Footer.tsx`, "Navigate" and sibling headings, on all pages.
- **Evidence:** measured in the browser at **4.486:1** against the 4.5:1 minimum (12px, weight 600). axe did not flag it, probably from rounding, so a clean axe result does not clear this.
- **Correction:** raise `text-foreground/60` to `/65` (calculated 5.34:1).
- **Owner approval:** no.

**T-08. Homepage hero animation cannot be paused**
- **Status: homepage resolved; open for `/services/workflow-automation`,** which loops the same way. The approval covered the homepage only. See section 10.
- **Affected:** homepage hero (`components/shared/WorkflowMotion.tsx`).
- **Evidence:** 7 infinite animations and no pause control (WCAG 2.2.2). They stop off-screen and under reduced motion, but a visitor without that setting has no control. `/services/workflow-automation` also has cycling keyframes; check it during the fix.
- **Correction:** add a small pause control, or end the loop after a few cycles.
- **Owner approval:** yes, as it changes the hero's design.

### P2

| ID | Affected | Evidence | Correction | Owner approval |
| --- | --- | --- | --- | --- |
| **T-09** | Services menu, desktop | With reduced motion on, ArrowDown and ArrowUp open the menu but focus stays on the button (10 of 10 tries; 10 of 10 worked with motion allowed). A second arrow press or Tab still reaches the links, so nothing is blocked. Cause not established. | Find the cause and move focus reliably on open | No |
| **T-10** | `package.json` | `shadcn` (a CLI) is a production dependency and accounts for much of the production audit (MCP SDK, express, hono, proxy-addr). `npm audit`: 39 total (2 critical, 14 high, 21 moderate, 2 low); production only: 25 (2, 14, 7, 2). Many packages are outdated, e.g. `stripe` 22.1.1 to 22.6.2. | Move or remove `shadcn`, re-audit after T-01 | Yes |
| **T-11** | `/services/websites` mock site | White on `#c45f37` is 4.16:1 (4 instances). It is the only axe violation in any page or state, and is inside an illustrative, `aria-hidden` mock. | Darken the mock button | No |
| **T-12** | SEO metadata | **Canonicals on `/` and `/contact` added 2026-11-01.** Still open: `/contact` Open Graph title, description and URL are the homepage's; no Organization JSON-LD; sitemap `lastModified` is the build time | Complete metadata using only supported facts | No |
| **T-13** | OG image, `SITE_DESCRIPTION` | OG image says "Done-for-you AI automation", older wording not in the brief. The description's "help your business grow faster" is a soft outcome claim. | Align with approved copy | Yes |
| **T-14** | 404 page | Default Next page on white with the homepage title (noindex; navigation and footer work) | Design a branded 404 | No |
| **T-15** | Mobile menu toggle | 36×36 px (passes the 24 px minimum; other mobile targets are 44 px) and no `aria-controls` | Enlarge and add the attribute | No |
| **T-16** | `/about` logo | Requested at 828 px wide for a 56 px display (25 KB), because `sizes` is missing | Add `sizes` | No |
| **T-17** | API routes and hardening | No timeout on the Resend fetch; `RESEND_FROM` falls back to `onboarding@resend.dev`; `x-powered-by` header present; no Permissions-Policy; CSP is `frame-ancestors` only (deliberate) | Add timeout, fail on missing sender, tighten headers | Yes (protected routes, security configuration) |
| **T-18** | Payment flow | "Change details" leaves the earlier PaymentIntent open but uncharged. There is no webhook, so reconciliation is manual, as the brief expects. | Accept for now, or cancel or reuse the intent | Yes |
| **T-19** | Unused code | `SectionHeading`, `SectionContainer`, `PageHero`, `EyebrowTag`, `lib/animations`, `components/ui/card`, `components/ui/badge`, and `SOLUTIONS_SURVEY_COPY` (with a Typeform URL) | Remove | No |
| **T-20** | Homepage workflow diagram | New, found during remediation, and not caused by it. "Example workflow" and "New inquiry" have a 1 px gap at 320 px with enlarged text; nothing clips or overflows, and the gap is 41 px at 360 px | Add a minimum gap, or allow the row to wrap | No |

Two other observations carry no finding of their own. The repository has no Playwright suite, which this audit's scripts could seed. On a throttled phone profile, `/services/websites` reached largest contentful paint in about 3.6 s against 1.2–1.9 s elsewhere; that was measured on this slow machine, so re-measure on a Vercel preview before treating it as a defect.

## 3. Verification still required (P0)

A form may only be called working once it is VERIFIED (CLAUDE.md §6). Both flows have passed with fake upstream services only, so both remain unverified. Each run below needs your explicit go-ahead.

### V-01. One authorized real-email test

1. You confirm the environment and the receiving inbox, and set the Resend values yourself. No key is shown to or read by the tester.
2. Send one submission through the real form, marked `QA TEST` in the message, using an address you control.
3. Confirm: one email arrives at the intended inbox, the sender domain is correct and not `onboarding@resend.dev`, reply-to is the visitor, all fields read correctly, and it did not land in spam.
4. Confirm the on-page success state, then reply once to prove the reply path.
5. Record the date, environment and result in `design/open-items.md`, and change the status to VERIFIED.

**Depends on it:** "a working contact form" on `/services/websites` (O-03).

### V-02. Stripe test-mode run

Use a preview deployment with **test keys only**; pushing it needs its own approval. Live keys belong only in production.

| Step | Card or action | Expected |
| --- | --- | --- |
| 1. Create | $4.35 with name, email and reference | PaymentIntent has the right amount, `usd`, automatic methods, receipt email and metadata |
| 2. Render | Real Payment Element | Loads with no console or CSP errors, at 390 and 1440 |
| 3. Success | `4242 4242 4242 4242` | "Payment received."; dashboard shows succeeded; test receipt arrives |
| 4. 3D Secure | `4000 0025 0000 3155` | Challenge, then a correct return state on both pass and fail |
| 5. Decline | `4000 0000 0000 0002` | Message shown, stays on the step, retry works |
| 6. Abandon | Leave at the payment step | Intent stays open and uncharged |
| 7. Limits | $1.00 and $100,000.00 | Accepted; amounts match in the dashboard |

Afterwards, plan a separate go-live check that production holds live keys and the live-key refusal behaves as tested. Any live charge needs its own decision.

## 4. Legal-review dependencies

These are questions for a qualified reviewer, not legal conclusions.

| ID | Severity | Question or dependency | Evidence or context | Owner approval |
| --- | --- | --- | --- | --- |
| **L-01** | **P0** | Privacy and Terms must be approved before merge, because the footer links publish them | Both pages show the draft notice and "must not be published in this form", with 12 and 6 "To confirm" items. `noindex` confirmed; both are excluded from the 6-URL sitemap. | Yes |
| **L-02** | P1, **code and draft corrected** (section 10); the reviewer should read the new wording | Correct the session-storage statement | At audit, the Privacy draft said the payment return record is "Deleted once the result is shown". Testing shows it **stays in sessionStorage, client secret included**, until reset, retry or expiry. `design/legal.md` repeats the error. Change the code or the text, and tell the reviewer which. | Yes |
| **L-03** | P1 | Does GA4 need consent or a banner? | GA4 loads with no consent step. Consider EU, UK and US state rules. | Yes |
| **L-04** | P1 | GA retention period | Must be read from GA Admin, then stated accurately. Not checked here, because analytics configuration is out of scope. | Yes |
| **L-05** | P1 | Which privacy laws apply, and which rights and response steps must be stated | Depends on KAP's size and customers | Yes |
| **L-06** | P1 | "Do not sell" wording, Global Privacy Control and opt-out handling | Whether any claim qualifies needs review, particularly alongside GA4 | Yes |
| **L-07** | P1 | Refund policy | Needs review against consumer rules and Stripe's requirements | Yes |
| **L-08** | P1 | Liability, indemnification, governing law and venue | Not drafted | Yes |
| **L-09** | P1 | KAP CRM hosting and the payment-to-CRM path | Must be described accurately. Any Typeform disclosure is only needed if it returns; its copy is currently unused (T-19). | Yes |

## 5. Owner acceptance items

| ID | Severity | Item | Needed from you |
| --- | --- | --- | --- |
| **O-01** | P1 | **Recommendations** have not been checked against the LinkedIn originals (B4), and Brendan Parish is unresolved | Verify wording letter for letter (§2) |
| **O-02** | P1 | **Unconfirmed service claims** (B3): AI voice agents, support agents, content and video, training, maintenance, commercial websites. Examples: "Phone, with an AI voice agent", and goal options "Video / content" and "Social media" | Confirm or remove each |
| **O-03** | P1 | **Other claims**: "a working contact form and online payments through Stripe" (depends on V-01, V-02), "Checked at 17 screen widths", "designed and built in-house", "Monitored, Recoverable…", "documented system", "Founder" title, "say so if not the right fit" | Confirm each is true of what KAP delivers |
| **O-04** | P1 | **Video captions**: YouTube reports only an auto-generated track, with no reviewed captions or transcript. The content was not reviewed in this audit. | Review captions in YouTube Studio |
| **O-05** | P1 | **Hero and page quality**: recorded verdict is CORRECT, below the STRONG target; hero copy is working copy (B1) | Accept the shortfall or commission further work |
| **O-06** | P2 | **Service scope**: 3 of the 5 A3 service pages are built; sales-marketing and custom-software are absent by your 2026-10-30 navigation decision, but the brief was not updated | Update the brief |
| **O-07** | P2 | **Missing or illustrative assets**: founder photo, authentic workflow capture; Fernway, HVAC and catering examples are illustrative; phone captures on `/services/websites` go stale if heroes change | Supply assets or accept |
| **O-08** | P2 | **Wording decisions**: short header call to action; the one-business-day promise and payment card brands were removed | Accept |
| **O-09** | P2 | **HeyGen watermark** on the video | Keep or remove |

## 6. What passed

- **Layout:** 900 checks across 9 pages, widths from 320 to 1920 including every breakpoint edge, in 3 text modes (default, 20px CSS root, 20px browser default). 0 document overflow, header overflow, navigation collisions, wrapped navigation or calls to action, off-screen elements or cut text. The one clipped element is decorative, in the mock on `/services/websites` at 320–361 px with enlarged text. Tablet navbar at 768 is correct, with the short "KAP" mark.
- **Automated checks:** see §8.
- **Contact form (mocked):** validation, field errors and focus, double-submit sends one email, success state and focus, Resend failure with email fallback, typed text kept after failure, 429, network failure, honeypot, HTML escaping, single-line subject, goal allow-list, size limits and cross-site rejection.
- **Payment form (mocked):** limits ($1 to $100,000, cents correct), server validation, one PaymentIntent on double submit, one confirmation on double Pay, decline and error messages, all five return states, cleaned address bar, and no success state from a forged URL, forged secret or mismatched ID.
- **Security:** no secret-shaped strings in tracked or untracked files or branch history; `.env*` ignored except a blank `.env.example`; logs carry no form content. Only variable names were read, never values.
- **Drafts:** notices present, `noindex, nofollow` set, excluded from the sitemap.
- **Links:** all internal links return 200, all 69 anchors resolve, all 8 external legal links return 200, and `/#solutions` lands below the header.
- **Accessibility:** one axe violation (T-11); no heading-order or landmark violations; one `h1` per page. Skip link and About card focus rings work. The compare slider has a name and works from the keyboard.
- **Motion:** 0 running animations under reduced motion. "By hand" labels are hidden on the workflow page by design. With JavaScript off, all reveal content is visible within 2 seconds, and content on the other pages is present.
- **Video:** click-to-play confirmed: 0 YouTube requests before the click, then `youtube-nocookie.com` loads with focus moved to the player. The AI presenter is disclosed.
- **Third parties and fonts:** only Google Tag Manager on normal pages; `js.stripe.com` only on `/payment`; 3 self-hosted fonts (126 KB).
- **Performance:** no console errors or failed requests. Local LCP 228–732 ms and CLS ≤ 0.009 unthrottled. Throttled phone profile: 367–405 KB transferred, CLS ≤ 0.016, 0 long tasks.

## 7. Method and limits

- **Harness:** temporary scripts outside the repository, using Playwright 1.63 with Chromium and axe-core 4.11.4 against production builds. The Playwright MCP server failed to connect.
- **Mocks:** audit servers ran with fake credentials and a local fake upstream. No real email was sent, and no Stripe traffic left the machine.
- **Not covered:**
  - The real Stripe Payment Element, which was stubbed in the browser (V-02).
  - Real Resend delivery (V-01).
  - Firefox, Safari, real devices and screen readers. Chromium only.
  - Lighthouse, not run. Performance figures come from this slow machine and localhost, so they are not field numbers.
  - axe's "incomplete" contrast results on gradients (3–43 per page), which were not all resolved by hand.
  - The content of the video.
- **Test faults corrected before these results:** a preload that blocked the Stripe mock, a navigation-wrap measure that counted the chevron icon, a contact test that caught Next's route announcer, and a no-JS check that did not wait for animation delays. Skip-link and About-card reports were false alarms confirmed by render. These were faults in my scripts, not site defects.
- **Heading evidence:** based on axe and the per-page `h1` count; the full outline was not saved to a file.

## 8. Automated results

| Check | Result | Warnings |
| --- | --- | --- |
| `npm test` | 35 of 35 pass | None |
| `npm run lint` | Clean | None |
| `npx tsc --noEmit` | Clean | None |
| `npm run build` | Pass, 17 static pages, 2 dynamic API routes | None |
| `npm audit` | 39: 2 critical, 14 high, 21 moderate, 2 low | Production only: 25: 2 critical, 14 high, 7 moderate, 2 low |
| Repository Playwright tests | None exist | Audit harness used instead |
| Functional suite (mocked) | 95 of 98 pass | The 3 failures are T-03 (2) and L-02 (1) |
| Layout sweep | 900 checks, 1 decorative clip | None |

## 9. Recommended resolution order (updated after remediation)

1. **Production security:** decide on a separate minimal Next.js patch for `main` (section 10).
2. **Owner decisions:** rate limiting (section 11), the workflow-page pause control (T-08), `shadcn` (T-10).
3. **Infrastructure and abuse protection:** permanent apex redirect (T-04), firewall rules and a Radar review (T-03).
4. **Remaining fixes:** social images (T-05), then the P2 items that fit alongside them.
5. **Authorized real tests:** V-01 and V-02.
6. **Owner content:** O-01 to O-05.
7. **Legal review:** L-02 to L-09, then L-01. Draft notices come off only after approval.
8. **Final regression, then merge approval.**

## 10. Remediation record (2026-11-01)

No commit, push, merge, pull request, deployment or branch change was made. HEAD is still `4d6960f`. No real email was sent, no Stripe request was made, and no production or analytics configuration was changed.

### Dependencies (T-01)

| Package | Before | After | Why |
| --- | --- | --- | --- |
| `next` | 16.2.6 | **16.4.1** | Smallest release clearing every Next.js advisory |
| `sharp` (through Next) | 0.34.5 | 0.35.5 | Required by Next 16.4.1 |
| `eslint-config-next` | 16.2.6 | 16.4.1 | Next's upgrade guide installs it with Next; development only |
| `react`, `react-dom` | 19.2.4 | 19.2.4 | Already satisfy `^19.0.0` |
| `eslint` | 9.39.4 | 9.39.4 | No change needed |
| `@next/third-parties` | 16.2.7 | 16.2.7 | Compatible and not flagged, so left alone |

**How the version was chosen:** each candidate was audited in a scratch copy of the lockfile. 16.3.8 still carries GHSA-2464-fhr4-w9xw, GHSA-673q-mjm6-r5xr and GHSA-p3m5-59mp-jv5r. 16.4.1, 16.4.2 and 16.4.3 all clear them, so 16.4.1 is the smallest. The audit's earlier mention of 16.4.3 is what `npm audit` proposes, not the minimum. No `--force` or peer-dependency bypass was used, and no framework migration was needed. Lockfile changes are limited to Next's own chain: 45 entries, mainly `@next/*` and `@img/sharp-*`, plus `postcss`, `nanoid`, `@swc/helpers` and `@emnapi/runtime`.

**Advisories addressed:** all 20 listed against `next`, including the 5 critical ones, and all 3 listed against `sharp`.

**Advisories remaining:**

| Scope | Before | After |
| --- | --- | --- |
| All packages | 39: 2 critical, 14 high, 21 moderate, 2 low | 36: 1 critical, 11 high, 22 moderate, 2 low |
| Production dependencies | 25: 2 critical, 14 high, 7 moderate, 2 low | 21: 1 critical, 11 high, 7 moderate, 2 low |

The one added moderate item is `@next/eslint-plugin-next`, which comes with `eslint-config-next` 16.4.1 and is development only. That bump follows Next's upgrade guide, but was not strictly required for compatibility; it can be returned to 16.2.6 if preferred.

The remaining critical item is `proxy-addr`. It is listed as a production dependency because `shadcn`, a command-line tool, is declared as one and pulls in the MCP SDK, express and hono. The site's pages do not use it. Moving it is T-10 and needs approval. `npm audit` proposes `shadcn@1.0.0`, a major downgrade, for some items, so `npm audit fix --force` should not be used.

**Remaining risk:** Stripe's real Payment Element has not run on 16.4.1 (V-02).

### Production security assessment

**Recommendation: yes, prioritize a separate minimal patch.** `main` is locked to Next 16.2.6 and sharp 0.34.5, with `/_next/image` public. Reading the code, most advisory preconditions look unmet, but exploitability was not tested, and the redesign cannot ship soon because it waits on legal review. A patch should stand apart from the redesign: a new branch from `main`, changing only `package.json` and `package-lock.json` to Next 16.4.1, built and checked on a preview deployment, then released. Each of those steps needs your authorization. None was done here.

### Removed assets (T-02)

Deleted: `public/images/hero/approachable-office-dusk.webp` and `public/images/hero/approachable-office-dusk.webp.json`.

**Evidence:** no references in `app`, `components`, `lib` or `next.config.ts`; 0 references in the built output; both URLs return 404, and the image optimizer refuses both. **Remaining risk:** the files stay in this branch's Git history. `design/concepts/approachable-automation/index.html`, a historical concept, now shows a broken image.

### Canonical domain (T-04, part of T-12)

`SITE_URL` is now `https://www.kap-enterprises-llc.com`, which drives `metadataBase`, canonicals, `og:url`, the sitemap, robots and JSON-LD. `/` and `/contact` gained canonicals, as they had none.

**Evidence:** 48 of 48 checks. All 6 indexable pages have `www` canonicals, the sitemap lists exactly those 6, robots uses `www`, and no bare-host URL appears in the HTML of any page.

**Infrastructure change needed (not made):** the bare domain still returns a temporary **307** to `www`. Change it to a permanent redirect in Vercel's domain settings.

### Hero Pause/Play (T-08)

A small "Pause" pill now sits on the caption line of the homepage diagram.

| Behaviour | Result |
| --- | --- |
| Label | "Pause workflow animation" or "Play workflow animation", matching the visible word |
| Pause | Holds the exact frame; all diagram text stays readable because only wires and rings animate |
| Play | Continues from that frame, without resetting |
| Keyboard and touch | Native button; Enter, Space and tap; focus stays on it; solid 2px ring; 44 px tall touch area |
| Visitor's pause | Survives scrolling away, tab hide and show, and a layout change |
| Automatic behaviour | Still pauses off screen and in a hidden tab, with 0 running animations, and resumes unless the visitor paused |
| Reduced motion, no JavaScript | Button hidden; the finished diagram shows |
| Reload | A pause is not remembered across a reload |

If the layout switches between phone and wider diagrams while paused, the existing resync returns the cycle to its start, and it stays paused.

**Evidence:** 49 of 49 checks, including 48 width and text-mode combinations from 320 to 1920 with no overlap, clipping or overflow. Captures are in `design/screenshots/final/hero-pause-control-*.png`. **Remaining risk:** `/services/workflow-automation` loops with no control. It uses the same component, so enabling it is small but needs approval. The phone captures on `/services/websites` were taken with reduced motion, where the button is hidden, so they stay accurate.

### Payment session storage (L-02)

| Question | Finding |
| --- | --- |
| What was stored | Client secret, PaymentIntent ID and time, in `sessionStorage` key `kap:stripe-return`, plus a page-level copy. No server key, name, email or card data. |
| Written | By the inline return script, before hydration and analytics |
| Read | By `PaymentForm` on load |
| Removed, before the fix | Only on a new payment, a retry, 1-hour expiry, corrupted data or tab close |
| Needed after confirmation | Not for a final outcome. A failed payment needs it to retry on the same PaymentIntent; processing and unconfirmed outcomes need it for the next check. |

**The fix:** `settleReturn` runs only after Stripe has answered.

| Outcome | Client secret | What a reload does |
| --- | --- | --- |
| Succeeded, canceled | **Deleted** from storage and memory | Shows the same result from a record holding only reference, amount, currency, status and time; Stripe is not asked again |
| Failed | Kept, so "Try again" can use the same PaymentIntent | Asks Stripe again |
| Processing | Kept until a later check finds a final outcome | Asks Stripe again |
| Unknown | Kept, as nothing has been confirmed | Asks Stripe again |

Clearing everything after success would have broken something: a reload would show an empty form and invite a second payment, so a secret-free record stays instead. It is still browser storage, so the Privacy draft now says exactly this, and `design/legal.md` and `design/payment.md` match. The embedded Payment Element, validation and duplicate-submission protection are unchanged, and no API route changed.

**Evidence:** 7 new unit tests, and 93 of 93 mocked browser checks covering all five outcomes, refresh, back navigation, retry, starting over, processing then succeeded, 9 kinds of bad record, a new tab, and blocked storage. They also confirm the secret is still stored during the Stripe check, so cleanup is not premature. **Remaining risk:** a real Stripe redirect has not been exercised (V-02). The browser tests are scripts outside the repository, because it has no Playwright setup. The unit tests are in the repository.

### Accessibility (T-06, T-07)

| Item | Before | After |
| --- | --- | --- |
| Default focus ring | 2.34:1, magenta at 50% | Solid 2px in the text colour: 6.50:1 or better on cream, 16.91:1 on charcoal |
| Button focus ring | Magenta at 50% (missed by the audit) | Two-tone charcoal and cream ring: 16.91:1 on both grounds |
| Form fields | Solid magenta border | Unchanged, 6.09:1 |
| Footer headings, Navigate and Contact | 4.486:1 | **5.35:1** |

My first attempt, solid magenta, passed on cream but measured 2.83:1 on dark sections, so it was replaced. The text colour matches how the navbar links already draw focus.

**Evidence:** all 436 Tab stops across 9 pages at 1440 and 390, plus the mobile menu, measure 3:1 or better, with a lowest of 6.09:1. 3 stops sit on gradient grounds, measured against the nearest solid colour. Footer Navigate remains Services, About, Contact, Make Payment; Privacy Policy and Terms & Conditions appear only in the bottom bar.

### Regression results

| Check | Result | Compared with the audit |
| --- | --- | --- |
| `npm test` | 42 of 42 | 35 before; 7 added |
| `npm run lint` | Clean | Same |
| `npx tsc --noEmit` | Clean | Same |
| `npm run build` | Pass on 16.4.1, 17 static pages, 2 dynamic routes, no warnings | Same |
| Functional suite (mocked) | 96 of 98 | Was 95. The privacy check now passes. **The 2 failures are the rate-limit checks: pre-existing, open by decision (T-03)** |
| Payment session | 93 of 93 | New |
| Hero control | 49 of 49 | New |
| Focus and footer contrast | 436 stops, 0 below 3:1 | New |
| SEO, drafts, removed assets | 48 of 48 | New |
| Layout, 320–1920 in 3 text modes | 900 checks, 0 overflow, 0 navigation problems, 1 decorative clip | Same |
| axe | Only `color-contrast` on `/services/websites` (T-11) | Same |
| Throttled phone, largest paint | 1.4–1.9 s, and 3.7 s on `/services/websites` | Same range |

Earlier failures during this work, all fixed before these results: magenta on dark grounds and a 42 px touch area (my changes); a test stub that read blocked storage and a focus test that measured mid-transition (test faults).

Also confirmed: all 9 pages render with no failed links; navbar and footer are unchanged on every page; Privacy and Terms keep their draft notices, `noindex`, and sitemap exclusion. The API routes call only Resend's send endpoint and Stripe's PaymentIntent creation, and the forms contain no CRM or marketing-list integration.

**Not covered, as in section 7:** real Resend and Stripe traffic, Firefox, Safari, real devices, screen readers and Lighthouse.

## 11. Rate-limiting assessment (T-03)

Assessment only. Nothing has been enabled, purchased or changed.

**Recommendation: use Vercel WAF rate-limit rules, start in Log mode, and keep the existing form protections.** Do not add a new provider or application-level limiter now.

| Layer | Assessment |
| --- | --- |
| **Vercel WAF rate limiting** | Best first step. It stops requests before they reach the API routes, so they reach neither Resend nor Stripe, needs no code, and the forms already show a friendly message on a 429. Vercel documents it on all plans, with IP as a key, a 10-second to 10-minute fixed window, and a Log action. |
| **Honeypot and validation** | Keep. They stop casual bots and bad input, but a scripted client can pass both. |
| **Application-level limiter** | Not now. Serverless instances do not share memory, so an in-memory counter is unreliable, and a shared store means a new service. Revisit if the firewall proves insufficient. |
| **Stripe's protections** | Stripe documents built-in card-testing controls for the Payment Element, including rate limiters, AI models and adaptive CAPTCHA. Stripe also warns that IP rules alone are usually not enough, so the firewall reduces load and does not replace these. |
| **Stripe Radar** | Review your plan and current rules in the Dashboard. Custom velocity rules depend on the plan. Change nothing until the real test run is done. |
| **Challenge action** | Avoid on these routes without testing, as both are called by `fetch` from the page. |

**Proposed starting rules**, to be tuned from Log data:

| Rule | Matches | Limit per IP | Action |
| --- | --- | --- | --- |
| Contact | `POST /api/contact` | 5 per 60 s | 429 |
| Payment | `POST /api/stripe/create-payment-intent` | 10 per 60 s | 429 |

These limits are a judgement, not measured from KAP's traffic. If the project is on Hobby, which allows only 1 rate-limit rule, use one rule matching both paths at 10 per 60 s, with the two sharing a counter.

**False positives:** low at these volumes, as a genuine visitor rarely submits more than a couple of times a minute. An office sharing one IP is the main case, and the payment limit allows for "Change details" and retries. Counters are per region, so a distributed attack can exceed them.

**Cost:** Vercel says mitigated traffic is not billed. Hobby includes 1,000,000 allowed requests; Pro is usage-based at regional rates, and the page does not state the figure, so read it in the pricing dialog Vercel shows when creating the first rule. KAP's plan is not known here. Stripe's published Radar pricing varies by plan and region; I could not confirm a current figure for this account, so check the Dashboard.

**Testing, after approval:**
1. Publish in Log mode and watch for several days. Vercel applies rules to the production deployment.
2. Switch to 429.
3. From your own connection, send more than the limit using invalid data. Invalid requests are rejected before Resend or Stripe, so this sends no email and creates no payment.
4. Confirm the 429 and the form's message, then confirm a normal submission works after the window.
5. Review the firewall view weekly at first. To roll back, set the rule to Log or remove it.

Sources: [Vercel WAF rate limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting), [Vercel WAF usage and pricing](https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing), [Stripe card testing guidance](https://docs.stripe.com/disputes/prevention/card-testing), [Stripe Radar pricing](https://stripe.com/radar/pricing).
