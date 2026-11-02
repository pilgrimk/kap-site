# KAP Website Redesign: Final Site-Wide QA Audit

Audit date: 2026-11-01. Branch: `kap-website-redesign`. The contact, payment, legal and first remediation work is now committed locally in checkpoint `f21f5afb83abb4de273106e661b5aa40a711f669`, which has not been pushed. The work in sections 12 and 14 is uncommitted in the working tree. Sections 2 to 9 are the original audit, with a status line added to each finding since addressed. Sections 10 to 14 record the remediation and the rate-limiting work. Section 8 is the audit's baseline; current results are in section 14.

## Readiness (after remediation, 2026-11-01)

| Question | Answer |
| --- | --- |
| **Technical readiness** | **Release authorized by the owner on 2026-11-02** (section 20). The Next.js upgrade and AI image removal are done. The real contact-form email passed locally (V-01). The real payment flow (V-02) and production's email configuration are verified after deployment. |
| **Legal readiness** | **Approved by the owner on 2026-11-02 and technically ready for publication** (section 17). The documents are not attorney-reviewed or legally certified. Analytics consent is implemented (L-03, section 19), without a claim of universal compliance. |
| **Owner acceptance** | **Decided on 2026-11-02** (section 18). Two external checks remain: the LinkedIn source check (O-01) and YouTube captions (O-04). |

Merging `kap-website-redesign` to `main` deploys to production, so all three gates need to close first. By owner decision, production stays unchanged until one coordinated release, so `main` keeps running Next.js 16.2.6 until then: an accepted risk. The contact form is verified locally with real delivery; the payment form has only been tested against fake services.

Open findings now, with the original audit's count in brackets:

| Severity | Technical | Verification | Legal | Owner | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| **P0** launch blocker | 0 (2) | 1 (2) | 0 (1) | 0 (0) | **1** (5) |
| **P1** important | 3 (6) | 0 (0) | 1 (8) | 2 (5) | **6** (19) |
| **P2** improvement | 10 (11) | 0 (0) | 0 (0) | 4 (4) | **14** (15) |

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
- **Status: resolved on this branch (16.4.1).** Production `main` stays on 16.2.6 until the coordinated release, by owner decision. See section 10.
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
- **Status: open.** Launch plan in section 14; nothing enabled.
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
- **Status: resolved** on the homepage (section 10) and on `/services/workflow-automation` (section 12).
- **Affected:** homepage hero (`components/shared/WorkflowMotion.tsx`).
- **Evidence:** 7 infinite animations and no pause control (WCAG 2.2.2). They stop off-screen and under reduced motion, but a visitor without that setting has no control. `/services/workflow-automation` also has cycling keyframes; check it during the fix.
- **Correction:** add a small pause control, or end the loop after a few cycles.
- **Owner approval:** yes, as it changes the hero's design.

### P2

| ID | Affected | Evidence | Correction | Owner approval |
| --- | --- | --- | --- | --- |
| **T-09** | Services menu, desktop | With reduced motion on, ArrowDown and ArrowUp open the menu but focus stays on the button (10 of 10 tries; 10 of 10 worked with motion allowed). A second arrow press or Tab still reaches the links, so nothing is blocked. Cause not established. | Find the cause and move focus reliably on open | No |
| **T-10** | `package.json` | **Resolved: `shadcn` moved to `devDependencies` (section 12).** At audit, `shadcn` (a CLI) was a production dependency and accounts for much of the production audit (MCP SDK, express, hono, proxy-addr). `npm audit`: 39 total (2 critical, 14 high, 21 moderate, 2 low); production only: 25 (2, 14, 7, 2). Many packages are outdated, e.g. `stripe` 22.1.1 to 22.6.2. | Move or remove `shadcn`, re-audit after T-01 | Yes |
| **T-11** | `/services/websites` mock site | **Resolved: now 4.76:1 (section 14).** At audit, white on `#c45f37` was 4.16:1 (4 instances). It was the only axe violation in any page or state, and is inside an illustrative, `aria-hidden` mock. | Darken the mock button | No |
| **T-12** | SEO metadata | **Canonicals on `/` and `/contact` added 2026-11-01.** Still open: `/contact` Open Graph title, description and URL are the homepage's; no Organization JSON-LD; sitemap `lastModified` is the build time | Complete metadata using only supported facts | No |
| **T-13** | OG image, `SITE_DESCRIPTION` | OG image says "Done-for-you AI automation", older wording not in the brief. The description's "help your business grow faster" is a soft outcome claim. | Align with approved copy | Yes |
| **T-14** | 404 page | Default Next page on white with the homepage title (noindex; navigation and footer work) | Design a branded 404 | No |
| **T-15** | Mobile menu toggle | 36×36 px (passes the 24 px minimum; other mobile targets are 44 px) and no `aria-controls` | Enlarge and add the attribute | No |
| **T-16** | `/about` logo | Requested at 828 px wide for a 56 px display (25 KB), because `sizes` is missing | Add `sizes` | No |
| **T-17** | API routes and hardening | No timeout on the Resend fetch; `RESEND_FROM` falls back to `onboarding@resend.dev`; `x-powered-by` header present; no Permissions-Policy; CSP is `frame-ancestors` only (deliberate) | Add timeout, fail on missing sender, tighten headers | Yes (protected routes, security configuration) |
| **T-18** | Payment flow | "Change details" leaves the earlier PaymentIntent open but uncharged. There is no webhook, so reconciliation is manual, as the brief expects. | Accept for now, or cancel or reuse the intent | Yes |
| **T-19** | Unused code | `SectionHeading`, `SectionContainer`, `PageHero`, `EyebrowTag`, `lib/animations`, `components/ui/card`, `components/ui/badge`, and `SOLUTIONS_SURVEY_COPY` (with a Typeform URL) | Remove | No |
| **T-20** | Homepage workflow diagram | New, found during remediation, and not caused by it. "Example workflow" and "New inquiry" have a 1 px gap at 320 px with enlarged text; nothing clips or overflows, and the gap is 41 px at 360 px | Add a minimum gap, or allow the row to wrap | No |
| **T-21** | Production dependencies, through `next` | **Resolved: lockfile refresh, 0 production advisories (section 14).** Found by the audit after T-10: `source-map-js` 1.2.1 (high, GHSA-68fv-2mgg-jv7q) through `postcss`, and `baseline-browser-mapping` 2.10.29 (moderate, GHSA-w5vr-8v7q-w6rv). Both are denial-of-service advisories. A scan of Next's `server` and `lib` code found no direct use of `source-map-js`; exploitability was not tested | Refresh both within their allowed ranges (1.2.2 or later and 2.11.0 or later), lockfile only, then regress | Yes |

Two other observations carry no finding of their own. The repository has no Playwright suite, which this audit's scripts could seed. On a throttled phone profile, `/services/websites` reached largest contentful paint in about 3.6 s against 1.2–1.9 s elsewhere; that was measured on this slow machine, so re-measure on a Vercel preview before treating it as a defect.

## 3. Verification still required (P0)

A form may only be called working once it is VERIFIED (CLAUDE.md §6). Both flows have passed with fake upstream services only, so both remain unverified. Each run below needs your explicit go-ahead.

### V-01. One authorized real-email test

**Status: passed locally on 2026-11-02; the owner verified receipt.** Production's configuration is a separate launch task. See section 15.

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

These were questions for a qualified reviewer, not legal conclusions. Status as of 2026-11-02 is in each row; KAP has no counsel at present, and section 16 has the outcome.

| ID | Severity | Question or dependency | Evidence or context | Owner approval |
| --- | --- | --- | --- | --- |
| **L-01** | **P0** | Privacy and Terms must be approved before merge, because the footer links publish them | **Resolved: approved by the owner on 2026-11-02 (section 17), draft notices removed.** The audit reported 12 and 6 "To confirm" items, which was a double count; the real numbers were 6 and 3, and none remain. `noindex` confirmed; both are excluded from the 6-URL sitemap. | Yes |
| **L-02** | P1, **code and draft corrected** (section 10); the reviewer should read the new wording | Correct the session-storage statement | At audit, the Privacy draft said the payment return record is "Deleted once the result is shown". Testing shows it **stays in sessionStorage, client secret included**, until reset, retry or expiry. `design/legal.md` repeats the error. Change the code or the text, and tell the reviewer which. | Yes |
| **L-03** | P1 | Does GA4 need consent or a banner? | **Implemented (section 19).** GA4 stays off until the visitor accepts, and Global Privacy Control keeps it off. No claim of universal compliance; not legally reviewed. | Yes |
| **L-04** | P1 | GA retention period | **Addressed with general language.** The setting itself is unconfirmed, and no period is stated. | Yes |
| **L-05** | P1 | Which privacy laws apply, and which rights and response steps must be stated | **Addressed practically, not legally reviewed.** The policy gives a request process, qualified by identity verification, retention duties and applicable law. | Yes |
| **L-06** | P1 | "Do not sell" wording, Global Privacy Control and opt-out handling | **Reworded.** The policy separates KAP's own practice from processing by providers, by owner-approved wording. See L-03. | Yes |
| **L-07** | P1 | Refund policy | **Drafted from owner decisions.** Not checked against Stripe's requirements. | Yes |
| **L-08** | P1 | Liability, indemnification, governing law and venue | **Drafted, not legally reviewed.** Arizona and Maricopa County; no cap or indemnification. | Yes |
| **L-09** | P1 | KAP CRM hosting and the payment-to-CRM path | **Partly open.** Inquiry handling is now stated from the owner's decision. Whether a provider runs the CRM, and whether payment details reach it, are unconfirmed. Must be described accurately. Any Typeform disclosure is only needed if it returns; its copy is currently unused (T-19). | Yes |

## 5. Owner acceptance items

| ID | Severity | Item | Needed from you |
| --- | --- | --- | --- |
| **O-01** | P1, **owner-approved for retention; LinkedIn verification pending** (section 18) | **Recommendations** have not been checked against the LinkedIn originals (B4), and Brendan Parish is unresolved | Verify wording letter for letter (§2) |
| **O-02** | P1, **closed: owner-verified** (section 18) | **Unconfirmed service claims** (B3): AI voice agents, support agents, content and video, training, maintenance, commercial websites. Examples: "Phone, with an AI voice agent", and goal options "Video / content" and "Social media" | Confirm or remove each |
| **O-03** | P1, **closed: corrected and verified** (section 18) | **Other claims**: "a working contact form and online payments through Stripe" (depends on V-01, V-02), "Checked at 17 screen widths", "designed and built in-house", "Monitored, Recoverable…", "documented system", "Founder" title, "say so if not the right fit" | Confirm each is true of what KAP delivers |
| **O-04** | P1, **video approved; caption review pending** (section 18) | **Video captions**: YouTube reports only an auto-generated track, with no reviewed captions or transcript. The content was not reviewed in this audit. | Review captions in YouTube Studio |
| **O-05** | P1, **closed: hero approved, shortfall accepted, CTA built** (section 18) | **Hero and page quality**: recorded verdict is CORRECT, below the STRONG target; hero copy is working copy (B1) | Accept the shortfall or commission further work |
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

1. **Remaining fixes:** social images (T-05), then the P2 items that fit alongside them.
2. **Authorized real tests:** V-01 and V-02.
3. **External content checks:** the LinkedIn source check (O-01) and YouTube captions (O-04).
4. **Analytics consent (L-03):** implemented (section 19). The owner should read the updated policy passages.
5. **Final regression, then merge approval.**
6. **At launch:** the coordinated release, the permanent apex redirect (T-04), and the rate-limit rollout (T-03, section 14).

## 10. Remediation record (2026-11-01)

This section describes the state when that work finished. It was later committed locally as checkpoint `f21f5af`, on owner authorization. No push, merge, pull request, deployment or branch change was made. No real email was sent, no Stripe request was made, and no production or analytics configuration was changed.

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

At this stage, the remaining critical item was `proxy-addr`; section 12 removes it from the production tree. It was listed as a production dependency because `shadcn`, a command-line tool, is declared as one and pulls in the MCP SDK, express and hono. The site's pages do not use it. Moving it is T-10 and needs approval. `npm audit` proposes `shadcn@1.0.0`, a major downgrade, for some items, so `npm audit fix --force` should not be used.

**Remaining risk:** Stripe's real Payment Element has not run on 16.4.1 (V-02).

### Production security assessment

**Owner decision: production stays unchanged until the entire redesign is approved for one coordinated release.** The risk is accepted. `main` is locked to Next 16.2.6 and sharp 0.34.5, with `/_next/image` public. Reading the code, most advisory preconditions look unmet, but exploitability was not tested. The release itself brings production to the patched version.

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

**Evidence:** 49 of 49 checks, including 48 width and text-mode combinations from 320 to 1920 with no overlap, clipping or overflow. Captures are in `design/screenshots/final/hero-pause-control-*.png`. `/services/workflow-automation` looped with no control at this stage; section 12 adds it. The phone captures on `/services/websites` were taken with reduced motion, where the button is hidden, so they stay accurate.

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

Assessment only. Nothing has been enabled, purchased or changed. Section 14 supersedes this section's plan assumptions, cost notes and testing steps with verified facts and exact launch actions.

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

## 12. Final technical remediation (2026-11-01, uncommitted)

Built on checkpoint `f21f5af`. No commit, push, merge, pull request, deployment or branch change was made, and no real email or Stripe request was sent.

### Dependency remediation (T-10)

**Dependency path:** `shadcn` 4.7.0 → `@modelcontextprotocol/sdk` 1.29.0 → `express` 5.2.1 → `proxy-addr` 2.0.7.

**Is `shadcn` needed at runtime? No, but it is needed at build time.** No application code imports it, but `app/globals.css` imports `shadcn/tailwind.css`, which is compiled into the CSS. So it could not simply be removed. Moving it to `devDependencies` adds no new requirement: `tailwindcss` and `@tailwindcss/postcss` are already there, and the build already needs them.

**Change:** moved `shadcn` to `devDependencies` at the same version. In the lockfile, no package version changed; 346 entries are now marked development-only.

| Audit | Critical | High | Moderate | Low | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Production, before | 1 | 11 | 7 | 2 | 21 |
| **Production, after** | **0** | **1** | **1** | **0** | **2** |
| All packages, before | 1 | 11 | 22 | 2 | 36 |
| All packages, after | 1 | 11 | 22 | 2 | 36 |

**The critical advisory is eliminated from the production dependency tree.** It remains in the development tree, unchanged: moving a package does not patch it, and it now applies only where the command-line tool or build runs. Do not use `npm audit fix --force`, as it proposes `shadcn@1.0.0`.

**Remaining in production (T-21):** both arrive through Next and were not changed, because this assignment excluded unrelated upgrades.

| Package | Severity | Path | Fixed by |
| --- | --- | --- | --- |
| `source-map-js` 1.2.1 | High | `next` → `postcss` → `source-map-js` | 1.2.2 |
| `baseline-browser-mapping` 2.10.29 | Moderate | `next` → `baseline-browser-mapping` | 2.11.0 or later |

Both fixes fall within the ranges Next already allows, so a lockfile-only refresh should clear them. That is not yet tested.

**Remaining risk:** a production build on Vercel must install development dependencies. The current site already relies on this for Tailwind, so it is not a new risk, but a real Vercel build has not been run on this change.

### Workflow Automation animation (T-08)

The 7-second repeating example on `/services/workflow-automation` now has the same Pause/Play control as the homepage. Both now use one implementation: the styles moved from the homepage's CSS into `components/shared/workflow-motion.module.css`, the wording into `WORKFLOW_MOTION_CONTROL`, and `WorkflowMotion` takes a `pausable` prop. The design and animation sequence are unchanged. Pages whose animations play once do not get a control.

| Behaviour | Result |
| --- | --- |
| Label | "Pause workflow animation" or "Play workflow animation", matching the visible word |
| Pause and resume | Holds the exact frame, then continues from it without resetting |
| Keyboard and touch | Native button; Enter, Space and tap; focus stays on it; solid 2px ring |
| Contrast | Ring and text both pass their minimums, as measured in the suite |
| Touch area | 44 px or taller at every width and text size |
| Off screen and hidden tab | No animation runs; it resumes by itself unless the visitor paused |
| Visitor's pause | Survives scrolling away, tab hide and show, and a layout change |
| Reduced motion, no JavaScript | Button hidden; the finished diagram shows |

**Evidence:** 73 of 73 checks at 1440, 768 and 390, including 48 width and text-mode combinations from 320 to 1920 with no overlap, clipping or overflow. Captures are in `design/screenshots/final/workflow-pause-control-*.png`. Chromium only; not tested with a screen reader or on a real device.

### Regression results

| Check | Result | Compared with section 10 |
| --- | --- | --- |
| `npm test` | 42 of 42 | Same |
| `npm run lint`, `npx tsc --noEmit` | Clean | Same |
| `npm run build` | Pass on 16.4.1, 17 static pages, no warnings | Same |
| Workflow Automation control | 73 of 73 | New |
| Homepage control, after the refactor | 48 of 48 | 49 checks before; see below |
| Focus and footer contrast | 438 stops, 0 below 3:1, lowest 6.09:1 | 2 stops added: the new button at 2 widths |
| SEO, drafts, removed assets | 48 of 48 | Same |
| Payment session | 93 of 93 | Same |
| Functional suite (mocked) | 96 of 98 | Same |
| Layout, 320–1920 in 3 text modes | 900 checks, 0 overflow, 1 decorative clip | Same |
| axe | Only `color-contrast` on `/services/websites` (T-11) | Same |

**No new regressions.** The 2 functional failures are the existing rate-limit checks (T-03), open by decision. The first homepage run scored 48 of 49 because one test asserted that the workflow page had no control. That assertion was out of date, so it was removed and the suite rerun.

## 13. Remaining launch blockers and owner review

**Launch blockers (P0)**

1. **V-02:** real payment flow, including the real Payment Element on Next 16.4.1. Not verified. By owner decision, there is no further local testing, and it is verified after production deployment.
2. **L-01:** resolved. The owner approved both documents on 2026-11-02 (section 17).

**Passed:** V-01, the real contact-form email, locally on 2026-11-02, with receipt verified by the owner (section 15).

**Owner review and launch tasks**

1. **External content checks:** the LinkedIn source check (O-01) and YouTube captions (O-04). See section 18.
2. **Production email configuration:** set and verify it at release (section 15).
3. **Rate-limit rollout (T-03):** carry out section 14 at launch.
4. **Apex redirect (T-04):** make the 307 permanent in Vercel at launch.

**Other open technical items:** social images (T-05), and the P2 items in section 2.

## 14. Final dependency and security corrections (2026-11-01, uncommitted)

Built on checkpoint `f21f5af`. No commit, push, merge, pull request or deployment was made, no Vercel setting was changed, and no real email or Stripe request was sent. Vercel was only read, using read-only commands from an empty folder; the repository was not linked.

### Production advisories (T-21)

| Package | Before | After | Allowed range |
| --- | --- | --- | --- |
| `source-map-js` | 1.2.1 | **1.2.2** | `^1.2.1` |
| `baseline-browser-mapping` | 2.10.29 | **2.11.34** | `^2.9.19`, `^2.10.12` |

Lockfile only: `package.json` is unchanged, and these are the only 2 version changes. `npm update` takes the newest version in range, so `baseline-browser-mapping` went beyond the 2.11.0 minimum. No incompatibility appeared.

| Audit | Critical | High | Moderate | Low | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Production, before | 0 | 1 | 1 | 0 | 2 |
| **Production, after** | **0** | **0** | **0** | **0** | **0** |
| All packages, before | 1 | 11 | 22 | 2 | 36 |
| **All packages, after** | **1** | **10** | **21** | **2** | **34** |

**All 34 remaining advisories are development-only.** They are not in the production dependency tree.

| Source | Packages |
| --- | --- |
| `shadcn` command-line chain | **Critical:** `proxy-addr`. **High:** `shadcn`, `@modelcontextprotocol/sdk`, `body-parser`, `browserslist`, `fast-uri`, `hono`, `ip-address`, `zod`. **Moderate:** `@hono/node-server`, `@ts-morph/common`, `qs`, `ts-morph`. **Low:** `deepmerge`. |
| ESLint and shared tooling | **High:** `brace-expansion`, `js-yaml`. **Moderate:** `eslint`, `eslint-config-next`, `@next/eslint-plugin-next`, `@eslint/config-array`, `@eslint/eslintrc`, `@eslint-community/eslint-utils`, `@typescript-eslint/*` (5), `typescript-eslint`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, `minimatch`, `postcss-selector-parser`. **Low:** `@babel/core`. |

The groupings are my reading of each package's role, not an audit output. These packages run only on developer machines and during the build. They were not changed, because this assignment excluded unrelated upgrades.

- **18 have a non-breaking fix, according to `npm audit`,** including critical `proxy-addr`. A plain `npm audit fix`, without `--force`, could clear them. This is untested and is an owner choice.
- **16 have no safe automatic fix.** `npm audit` proposes downgrades such as `eslint@4.0.0`, `eslint-config-next@0.2.4` and `shadcn@1.0.0`. Do not use `npm audit fix --force`.

### Contrast on `/services/websites` (T-11)

The mock Fernway site's button used white text on `--fw-terra`. It was isolated, as that colour is used only by the mock's buttons and one palette swatch. Changed `#c45f37` to `#b8562f` in both places (`site.module.css`, `QualityBento.tsx`), a slightly deeper terracotta. Layout and design are unchanged.

**Evidence:** all 4 instances measure **4.76:1**, up from 4.17:1, against the 4.5:1 minimum. axe now reports **0 violations across all 31 scans**. Axe's unresolved "incomplete" items on gradient grounds are still not all checked by hand.

### Rate limiting: what was verified (T-03)

| Question | Finding | Source |
| --- | --- | --- |
| Plan | **Pro**, team "Kevin Pilgrim's projects", which owns project `kap-site` | Vercel CLI |
| Current firewall | **No custom or rate-limit rules.** Platform DDoS mitigation active; Attack Mode, Bot Protection and OWASP off | Vercel CLI |
| Recent traffic, 1 day | 414 allowed, about 1.3k denied and 1.8k challenged by platform mitigation; these are whole-site counts, and most of the mitigated traffic is automated rather than form use | Vercel CLI |
| Two rules | Supported: Pro allows 40 rate-limit rules per project | Vercel docs |
| 60-second window, IP key | Supported: fixed window of 10 s to 10 min; IP and JA4 keys | Vercel docs |
| Log first | Supported: a rate-limit rule can use **Log**, which blocks nothing | Vercel docs |
| Path and method conditions | Supported: Vercel's own example is "Rate limit POST /auth/login to 10 per minute per IP" | Vercel docs |
| Monitoring | Traffic filtered by rule and grouped by IP. **The dashboard view covers at most 24 hours, so it must be checked daily while in Log mode** | Vercel docs |
| Effect of a change | Immediate, with no redeploy; rules can be disabled at once | Vercel docs |
| Cost | $0.50 per 1,000,000 allowed requests in the US (iad1); blocked requests are not billed. Vercel's 2025 changelog also mentions 1,000,000 included per month, while the current page shows Pro as usage-based. Either way, cost is negligible at these two routes' volume: 100,000 requests would be about $0.05 | Vercel docs |

**Not verified:** how Log-mode rate-limit events display in the dashboard (step 3 below tests this), and any spend limits on the account.

### Rate limiting: assessment of the limits

**Keep both proposed limits as starting values, and enforce only after the Log data supports them.**

| Risk | Assessment |
| --- | --- |
| **Payment reliability** | **A 429 cannot interrupt a charge.** Reading `PaymentForm.tsx`, only "Continue to payment" calls this route. The card step, Pay, the 3D Secure return and "Try again" all use Stripe directly or the existing PaymentIntent. The worst case is a wait of up to a minute before starting a payment |
| **Legitimate retries** | Few. Validation errors stay in the browser, double submissions are blocked, and only "Change details" followed by resubmitting uses another payment request. 10 per minute allows for this. A contact visitor rarely needs more than 1 or 2 sends |
| **Shared IP addresses** | The real exposure, from offices and mobile carriers. It is unlikely at KAP's volume, and the 5 and 10 limits are one IP's total across all its users. The Log data will show this |
| **What a blocked visitor sees** | Contact: a "wait a minute" message with the email address, tested with a mocked 429. Payment: a "wait a minute" message with no email address, confirmed by reading the code but not yet tested |
| **Limits of the protection** | Counters are per region and fixed-window, so about double the limit can pass across a window boundary. Limits per IP slow abuse from one source; they do not stop a distributed attack. Stripe says IP rules alone are usually not enough for card testing, so this adds to Stripe's own controls |
| **Avoid** | Challenge (these routes are called by `fetch`, and the forms expect a 429), persistent blocks (they would extend a false positive), and bypass rules |

### Rate limiting: owner actions at launch

Do these after the coordinated release is live, because the rules apply to production. All are in the Vercel dashboard: project **kap-site** → **Firewall** → **Configure**.

**Step 1. Create two rules in Log mode.** Use **Add New… → Rule** for each:

| Field | Rule 1 | Rule 2 |
| --- | --- | --- |
| Name | `Contact rate limit` | `Payment rate limit` |
| If | Request Path equals `/api/contact` | Request Path equals `/api/stripe/create-payment-intent` |
| And | Method equals `POST` | Method equals `POST` |
| Then | Rate Limit | Rate Limit |
| Algorithm | Fixed Window | Fixed Window |
| Time window | 60 seconds | 60 seconds |
| Request limit | 5 | 10 |
| Key | IP | IP |
| Follow-up action | **Log** | **Log** |

**Step 2. Publish.** Select **Save Rule**, then **Review Changes**, then **Publish**. Vercel may show a pricing dialog on the first rate-limit rule; continue only if it matches the cost above.

**Step 3. Prove the rule logs.** From your own connection, send more than the limit with deliberately invalid data, such as an empty JSON body. The API rejects it before reaching Resend or Stripe, so no email or payment results. Confirm the events appear under **Firewall → Traffic**, filtered by the rule, and that nothing was blocked.

**Step 4. Watch for at least 7 days.** Check **Firewall → Traffic** daily, since the view covers 24 hours at most. Group by Client IP, and compare with real inbox messages and Stripe payments that day.

**Step 5. Decide.**

| What the Log data shows | Action |
| --- | --- |
| Only automated or unfamiliar traffic exceeds the limit | Enforce |
| A real customer exceeded it | Raise that limit, for example contact to 10 or payment to 20, and watch for 7 more days |
| Nothing exceeded it | Enforce anyway: the limits are well above normal use |

**Step 6. Enforce.** Change each rule's follow-up action from **Log** to **Default (429)**. Review Changes, then Publish. Enforce the contact rule first and payment a day later, so any problem has one clear cause.

**Step 7. Test the block.** Repeat step 3 and confirm a 429, including how the payment form shows it. Then, after the window passes, confirm the page still works. A real contact submission here counts as a real email and needs your own go-ahead.

**Step 8. Keep watching.** Check weekly for the first month. Vercel's documented firewall alerts cover large DDoS events, so don't expect an alert from a rate-limit rule.

**To roll back:** disable the rule, or set it back to Log. It takes effect immediately, with no redeploy.

**Also at launch:** review Radar in the Stripe Dashboard; rules there depend on your Stripe plan. Change nothing until the test-mode run (V-02) is done.

### Regression results

| Check | Result | Compared with section 12 |
| --- | --- | --- |
| `npm test` | 42 of 42 | Same |
| `npm run lint`, `npx tsc --noEmit` | Clean | Same |
| `npm run build` | Pass on 16.4.1, 17 static pages, no warnings | Same |
| Production audit | **0 advisories** | Was 2 |
| Full audit | 34, all development-only | Was 36 |
| axe | **0 violations in 31 scans** | Was 3 scans with T-11 |
| Focus and footer contrast | 438 stops, 0 below 3:1, lowest 6.09:1 | Same |
| Workflow control / homepage control | 73 of 73 / 48 of 48 | Same |
| SEO, drafts, removed assets | 48 of 48 | Same |
| Payment session (mocked) | 93 of 93 | Same |
| Functional suite (mocked) | 96 of 98 | Same |
| Layout, 320–1920 in 3 text modes | 900 checks, 0 overflow, 1 decorative clip | Same |

**No new regressions.** The 2 functional failures are the rate-limit checks. They run against a local server with no Vercel firewall, so they will keep failing locally even after the rollout; the real check is step 7 above.

**Not covered:** real Resend and Stripe traffic, a real Vercel build of this branch, Firefox, Safari, real devices, screen readers and Lighthouse.

## 15. Real contact-form test (2026-11-02, uncommitted)

One submission, authorized by the owner, sent at 2026-11-02 07:01 UTC from a local production server, through the real `/contact` form and its normal route. No retry was made. A test-only wrapper outside the repository allowed one Resend call, refused any other sender or recipient, and recorded the message ID. Application code was not changed.

| Field | Value |
| --- | --- |
| Sender | `KAP Website <noreply@contact.kap-enterprises-llc.com>` (domain Verified, per the owner's check in the Resend dashboard) |
| Recipient | `sales@kap-enterprises-llc.com` |
| Reply-to (test visitor) | `sales@kap-enterprises-llc.com` |
| Subject | `New inquiry from KAP Website QA Test` |
| Resend message ID | `01a19b0f-c06a-7203-96a4-5953ceb44f1b` |

| Stage | Status | Evidence |
| --- | --- | --- |
| **Form submission accepted** | **Confirmed** | One POST to `/api/contact` returned 200; the page showed "Message received."; no page errors or server-log errors |
| **Resend API accepted the email** | **Confirmed** | Resend returned 200 with the message ID above |
| **Email delivery confirmed** | **Confirmed** | Shown by the owner's receipt in the inbox. The Resend dashboard's delivery status was not read, as the local key is send-only and it was not reported |
| **Owner verified receipt in the inbox** | **Confirmed** | On 2026-11-02 the owner confirmed it reached the business inbox, with the expected subject, sender, name, email and the exact test message |

**V-01 passed locally. The contact form is VERIFIED for this local configuration.** That covers delivery only from the local server, using the local key and these addresses.

**Separate launch task: production email configuration.** Production's `RESEND_FROM`, `RESEND_TO` and API key cannot be read and were not tested. At release, set the two addresses to the values above, confirm the key, redeploy, and confirm one real submission from the live site. That submission needs its own approval. Until then, production's form is not verified.

**Not separately tested:** replying to a real visitor. The test visitor and the recipient were the same address, so a reply would come back to that inbox. The production submission can confirm this by using a different visitor address.

**Effect on O-03:** the claim "a working contact form" on `/services/websites` now has local evidence. "Online payments through Stripe" still depends on V-02.

## 16. Privacy Policy and Terms revision (2026-11-02, uncommitted)

Both documents were revised from the owner's final decisions; the full record is in `design/legal.md`. KAP has no legal counsel at present, so **no attorney has reviewed them, and this is not legal advice.**

**Publication controls at this stage:** both pages kept the "Draft for review" notice and `noindex, nofollow`, and stayed out of the sitemap. Section 17 replaces this.

**Verification, focused only:** ESLint on the changed files and TypeScript are clean. On the local dev server, both pages return 200, render the notice and `noindex`, and show no "To confirm" callouts. The wording was compared with the contact route, payment route, payment form and return script. No comprehensive regression was run, no email was sent, and no Stripe request or Payment Intent was made.

**Remaining launch considerations:**
- **Analytics and consent (L-03):** Google Analytics loads on every page with no consent step, banner or Global Privacy Control handling. No tracking changed. The current wording is in section 17, and the concern may not be met by wording alone, depending on where visitors are.
- **Accuracy depends on production email:** the policy says messages reach the business inbox, which is verified only locally until the production email task is done (section 15).
- **Unconfirmed facts:** whether a provider runs KAP CRM, whether payment details reach it, the Google Analytics retention setting, and the `m` cookie's documentation. See `design/open-items.md`.
- **Stripe's refund-policy requirements** were not checked.

## 17. Privacy Policy and Terms: owner approval (2026-11-02, uncommitted)

**The owner approved both documents with three wording corrections, and they are technically ready for publication with the coordinated release.** They are not attorney-reviewed or legally certified. The full record is in `design/legal.md`.

**Applied:** the three corrections; the confirmed mailing address kept; draft notices and callout code removed; dates now "Last updated: November 2, 2026"; `noindex` removed from both pages; `/privacy` and `/terms` added to the sitemap. `/payment` stays `noindex` and out of the sitemap. Design, navigation and footer links are unchanged, apart from removing the notice.

**Focused verification on the local dev server:** ESLint on the changed files and TypeScript are clean, and all 22 page checks pass, covering rendering, no draft text, indexable metadata, `www` canonicals, 8 sitemap URLs, the mailing address and all three corrections. A line comparison of `lib/content.ts` showed only the expected changes. No production build, comprehensive regression, email or Stripe request was run. These pages are not live until the coordinated release.

**Stayed open at this approval:** analytics consent (L-03), since implemented in section 19.

## 18. Content findings O-01 to O-05: owner decisions (2026-11-02, uncommitted)

Original findings are preserved in section 5. Legal pages, the navbar and the closing call to action were not changed.

| Finding | Status | What was done | Still outstanding |
| --- | --- | --- | --- |
| **O-01** | **Owner-approved for retention; verification pending** | All seven excerpts and attributions kept unchanged | Compare with the LinkedIn originals. They were checked only against the previous production code |
| **O-02** | **Closed: owner-verified** | The owner confirms all eight capabilities were delivered to actual clients. Existing descriptions and contact options kept | None |
| **O-03** | **Closed** | Enterprise wording on home and Workflow; documentation qualified on home, Workflow, Customer Engagement and Websites; testing claim, approach intro and lead wording changed; in-house, Founder, right-fit and "every site we build" kept | None |
| **O-04** | **Video approved; caption review pending** | No change to the video, its description, disclosure or player | Review and publish captions in YouTube Studio before launch. Not done |
| **O-05** | **Closed** | Hero approved and unchanged; recorded limitations accepted for launch; mid-page call to action added after "How we work together." | None |

**Verification, focused only:** ESLint on the changed files and TypeScript are clean, and 41 of 41 checks pass on the local dev server. They cover the wording on each page, retained service wording and contact options, testimonial fields identical to before, unchanged legal text, navigation and footer links, and the call to action at 9 width and text-size combinations from 320 to 1920 with no overflow, plus keyboard access, focus ring and the link to `/contact`. Desktop and phone renders were inspected. No production build or comprehensive regression was run.

**Notes for the owner:**
- **Training and maintenance:** both are confirmed as delivered, but no page names either as a service. Nothing was added, as instructed. Peter Greco's quote is the only reference to training.
- **Customer Engagement:** still says "we build them the way enterprise software is built". The instruction covered home and Workflow, so this was left unchanged.
- **About:** the intro "How we approach projects, whatever their size." now sits under the heading "How we approach the work.", which is somewhat repetitive.

## 19. Google Analytics consent (2026-11-02, owner's Option A, uncommitted)

**Implemented, and verified locally.** This is a practical mechanism. It does not guarantee compliance with every privacy law, and it has not been legally reviewed.

| Topic | Behaviour |
| --- | --- |
| **Code** | `components/shared/AnalyticsConsent.tsx`, `lib/analytics-consent.ts`, `tests/analytics-consent.test.mjs`, `app/layout.tsx`, `components/layout/Footer.tsx`, `lib/content.ts`. No new dependency. |
| **Before consent** | GA is not in the server HTML. The client renders `GoogleAnalytics` only in the "accepted" state, so no script, initialization, pageview or cookie happens first. No Consent Mode pings. |
| **Notice** | Non-modal, compact, with "Accept analytics" and "Decline" styled identically and a Privacy Policy link. Placed right after the skip link in tab order. |
| **Storage** | `localStorage` key `kap.analytics-consent.v1`, holding only "accepted" or "declined". |
| **Changing** | "Cookie Preferences" in the footer's bottom bar reopens the notice and states the current setting. |
| **Withdrawal** | No reload, so unsaved form text is kept. It sets Google's `ga-disable` flag, drops any GA hits already queued, and clears `_ga` and `_ga_*` on the host and parent domains. gtag stays in memory until the next full page load, but can send nothing, and that load does not start it. It also reaches other open tabs. Other cookies and Stripe storage are untouched. |
| **Global Privacy Control** | `navigator.globalPrivacyControl === true` outranks everything, including an earlier acceptance. No prompt appears, old GA cookies are cleared, and the footer panel explains the state and offers no Accept. A stored choice is kept and applies again if the signal is later off. |
| **Storage unavailable** | Fails closed, with the reason shown in the footer panel. |
| **Pageviews** | One per page load or client navigation, from GA's own history tracking. The site adds no custom events. |

**Verification of the first version, which reloaded on withdrawal:** ESLint and TypeScript are clean. Eight new unit tests pass, as do 75 of 75 browser checks on the local dev server covering all 15 requested scenarios. The real gtag.js loaded, and every hit to Google was intercepted and answered locally, so no analytics reached Google. Contact posts were answered locally, Stripe was stubbed, and no email or payment occurred. A first run scored 70 of 75 because of five test faults, each diagnosed and corrected; none needed a site change. Chromium only, on the dev server rather than production.

**Remaining limitations:**
- **Production:** not yet exercised on the live domain. Confirm the notice, one pageview and the cookies clearing there at release. Whether history-based pageviews stay on depends on the GA property's enhanced measurement setting, which worked in this test.
- **Global Privacy Control:** detected only by JavaScript in browsers that expose it, such as Firefox and Brave. Chrome and Safari do not send it without an extension. The server does not read the `Sec-GPC` header, which is unnecessary as GA never loads from the server.
- **Data already sent:** not erased by withdrawal, as the policy says.
- **Cookies on other subdomains or paths:** cannot be removed unless they match the candidates tried.
- **Small screens:** until a choice is made, the notice still covers 29% of a 320x568 screen, and 40% with enlarged text.
- **No-JavaScript visitors:** see no notice or footer control, and analytics cannot run.
- **Google's other products:** the YouTube player and Stripe are outside this control, as the policy describes.
- **Legal questions:** whether this satisfies any particular law remains unreviewed.

### Consent refinements (2026-11-02, uncommitted)

**Mobile notice.** Tighter spacing, slightly shorter wording ("KAP uses optional Google Analytics to understand site usage. It stays off unless you accept."), and on phones the heading is kept for screen readers and focus but not shown. Body text stays at 14px or larger, and the buttons stay equal and 44px or taller.

| Viewport | Before | After |
| --- | --- | --- |
| 320x568 | 250px, 44% | **163px, 29%** |
| 390x844 | 206px, 24% | **144px, 17%** |
| 320x568, enlarged text | 341px, 60% | **227px, 40%** |
| 390x844, enlarged text | 311px, 37% | **202px, 24%** |
| 1440x900 | 206px | 182px |

**Withdrawal.** A probe against the real gtag.js found two things. Once GA is idle, the `ga-disable` flag and cookie clearing stop it, with no reload. But hits it has already queued still go out seconds later, so the flag alone is not enough, and a reload is a typical moment for queued hits to flush. So withdrawal now stops GA in place and adds a narrow guard on `fetch` and `sendBeacon`, which drops only requests to Google Analytics' hosts while analytics is withdrawn. It is installed only after a visitor has accepted. Accepting again on the same page resumes GA and sends one pageview.

**Verification:** ESLint and TypeScript are clean, and 64 of 64 focused checks pass on the local dev server with the real gtag.js and every hit answered locally. They cover the notice at seven sizes; equal choices and keyboard access; withdrawal with unsaved contact text, which is kept with no reload or submission; no hits afterward through scrolling, a direct event, navigation, a hidden tab, leaving the page, or withdrawal 0, 300 and 1500ms after a navigation; another tab; accepting again; other storage and cookies untouched; persistence; and GPC. No comprehensive regression or production build was run for this refinement.

**Remaining limitations:**
- gtag.js stays in memory, idle, until the next full page load.
- The guard depends on gtag sending through `fetch` or `sendBeacon`, which is what the tested version did. A future gtag using another transport would still be limited by the disable flag, but not for hits already queued.
- Hits sent before withdrawal stay with Google, as the policy says.
- Verified in Chromium on the dev server only. Confirm on the live domain at release.

## 20. Coordinated release (authorized 2026-11-02)

The owner approved the current design, content, testimonials, legal pages, analytics consent and functionality for one coordinated production release.

**Deferred by the owner, not blocking:** YouTube caption editing (O-04), the LinkedIn source check (O-01), social preview images (T-05) and the smaller P2 findings. They remain open.

**Verified after deployment:** one owner-approved contact submission from the live site, the real payment flow (V-02), the permanent bare-domain redirect (T-04), and the rate-limit rollout (T-03, section 14).
