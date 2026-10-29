# KAP Enterprises Website Redesign — Project Brief

The active brief for this repository (CLAUDE.md §11.1). It records what the business owner has
**approved** and, separately, what is still **awaiting approval**. Anything in Part B is not a
decision: it must not be built as final, published, or treated as approved until the owner says so.

Sources are the owner's phase instructions: Phase 1 (discovery), Phase 2 (blueprint), 2B
(readiness), 2C/2D (remediation) and the redesign hand-off. Where a value comes from the existing
production site, it says so.

---

## Part A — Approved

### A1. Business positioning (Phase 1, Phase 2 §1, 2B §1)

- **KAP Enterprises, LLC is primarily an AI automation solutions company serving small and
  medium-sized businesses (SMBs).** It must not be presented as a website development agency.
- **Mission:** help SMBs leverage artificial intelligence, workflow automation and custom software
  solutions to improve efficiency, reduce operating costs, streamline customer engagement and
  support sustainable growth.
- **Primary offerings:** AI-powered business automation, workflow integrations, customer
  engagement, sales and marketing automation, and custom technology solutions.
- **Website design and development is one service vertical.** It must not dominate homepage
  messaging, visual hierarchy or brand identity.
- **Messaging leads with the business problems KAP solves**, in language nontechnical business
  owners understand. Technical expertise is a differentiator, not the lead.
- **Approach (owner's words):** practical, affordable, reliable solutions that deliver measurable
  business value. Specific results may only be stated where real evidence exists (see A9).
- A visitor should understand within seconds what KAP does, who it serves and why it is valuable.

### A2. Established business facts (from the existing production site)

- Business name: KAP Enterprises (legal entity: KAP Enterprises, LLC).
- Led by Kevin Pilgrim, a software engineer with 30+ years of experience.
- Email: sales@kap-enterprises-llc.com
- Mailing address: PO Box 3573, Scottsdale, AZ 85271
- Website: https://kap-enterprises-llc.com
- Existing logo: `public/logo.png` (node-graph mark in magenta, coral and amber).
- Existing palette: cream `#FFFCED`, charcoal `#1A1A1A`, magenta `#B1296E`, coral `#F17558`, plus
  the logo's amber `#F0BA58`.
- Kevin's career background, as worded on the existing site: HL7 clinical interfaces processing
  millions of healthcare transactions a month; PCI-compliant payment integrations for nationwide
  property management platforms; machine-control software for semiconductor equipment installed in
  four countries. **These are Kevin's career achievements and must never be presented as
  company-wide KAP accomplishments** (Phase 2 §3).

### A3. Site architecture (Phase 2 §2, 2B §1)

Hybrid multipage site on the existing Next.js application:

| URL | Page |
|---|---|
| `/` | Conversion-focused scrolling homepage |
| `/services/workflow-automation` | AI Workflow Automation |
| `/services/customer-engagement` | AI-Powered Customer Engagement |
| `/services/sales-marketing` | Sales & Marketing Automation |
| `/services/custom-software` | Custom Software & Integrations |
| `/services/websites` | Website Design & Development |
| `/about` | About (existing) |
| `/contact` | Contact (existing) |
| `/payment` | Payment (existing functionality preserved) |
| `/privacy` | Privacy |
| `/terms` | Terms |

- `/work` (case studies) is a possible future page. **Never invent projects or customer results to
  populate it.**
- Do not add pages merely to increase the page count.
- Preserve existing URLs where possible. Document any required redirects or canonical changes.
- Logical navigation, SEO-friendly URLs and a consistent visual identity across all pages.

### A4. Homepage sections (Phase 2 §3)

1. **Hero:** establishes that KAP provides AI automation solutions, specializes in SMBs, and helps
   businesses save time, reduce manual work and operate more efficiently. Avoid generic AI-agency
   language.
2. **Business problems we solve:** common SMB challenges (manual data entry, disconnected
   systems, delayed customer responses, repetitive admin, inefficient lead management), shown as
   relatable scenarios, not unsupported performance claims.
3. **Our solutions:** the five service categories, with AI automation given the greatest visual
   and messaging emphasis. Each has a concise business-focused explanation and a link to its page.
4. **How we work:** how KAP identifies opportunities, designs solutions, implements workflows and
   provides support. Proposed process wording must be kept distinct from verified current practice.
5. **Why KAP Enterprises:** 30+ years of software engineering; complex systems and integrations;
   practical automation expertise; attention to detail and reliability; clear communication and
   collaborative delivery; solutions tailored to actual business requirements.
6. **Client and professional recommendations:** a prominent section using authentic LinkedIn
   recommendations (see A7).
7. **Final conversion section:** an invitation for SMB owners to discuss their challenges and
   explore automation opportunities.

### A5. Service pages (Phase 2 §4)

Each of the five pages explains the business problems addressed, what KAP can provide, typical
applications and examples, potential benefits **without invented results**, relevant technologies,
supporting recommendations or proof, and a clear conversion path. The pages share a structure but
**must not all look identical**. Established services must not be removed just because public case
studies are unavailable.

### A6. Conversion (2B §2)

- **The existing contact form is the primary conversion destination.**
- **Primary CTA label: "Let's Talk About Your Business".**
- All primary consultation CTAs link to `/contact`, optionally with a service-specific query
  parameter.
- **Do not use "Book a Discovery Call"** or any wording that implies direct scheduling.
- No Cal.com, Calendly or other scheduling integration in the initial redesign.
- The contact form keeps the existing Resend integration, field names and routing.
- **Never invent** a phone number, booking link, endpoint or any other contact channel.

### A7. Recommendations and testimonials (Phase 1 §6, Phase 2 §6, 2B §7)

Eight authentic LinkedIn recommendations, with the relationships the owner gave:

| Person | Relationship given by the owner | Date |
|---|---|---|
| Brendan Parish | CTO & Co-Founder, A24 | July 28, 2026 |
| Matt Livingston | Client: enterprise analytics and business development | July 10, 2026 |
| Fran Molina | Direct manager: AI automation and business systems | September 17, 2025 |
| Hunter O'Brien | Client: n8n automation project | August 5, 2025 |
| Peter Greco | Client: automation training | June 11, 2025 |
| Chandra Wrightsell | Client: JT Advisors Group LLC | March 18, 2025 |
| Garrick Atkinson | Former colleague: Yardi | February 26, 2025 |
| Christopher D. Langehaug | Former senior colleague | February 15, 2024 |

- **Use only verbatim excerpts** of the original text. Excerpts may be shortened, never rewritten
  or paraphrased. Never reconstruct a quotation from a summary.
- Attribute accurately. **Distinguish client recommendations from manager and colleague
  recommendations**, and never imply that a colleague purchased KAP services.
- Never invent quotes, outcomes or endorsements.
- Prioritize recommendations showing automation expertise, technical delivery, reliability,
  communication and business value.

### A8. Visual direction (2B §4, §6; redesign hand-off)

- **Preferred direction: Concept A, "Automation in Action"**, supplemented by Concept B's
  engineering credibility and founder-led trust and Concept C's approachable, business-focused
  language. **This is a preferred direction, not approval of a rendered design.**
- Start from KAP's existing logo and brand colours.
- Strong readability and accessibility; a visually compelling homepage; professional, consistent
  service pages; clear conversion opportunities.
- **Imagery approach:** combine authentic KAP automation workflows with purpose-built explanatory
  diagrams (for example *Website inquiry → AI processing → CRM update → customer follow-up*).
  - Diagrams are accurate illustrations of possible workflows, never fabricated screenshots of
    completed client projects. Favour lightweight HTML, CSS or SVG in KAP's brand colours.
  - Authentic workflow screenshots: access to a project is not permission to publish it. Never
    expose credentials, tokens, customer personal information, confidential business data,
    internal infrastructure, or private URLs and webhook endpoints. No screenshot containing client
    data is published without authorization.

### A9. Integrity rules carried through every phase

- Never fabricate testimonials, customer results, business evidence or claims.
- Distinguish demonstrated technical capability, commercially delivered service and proposed or
  future offerings (2B §8). Avoid unsupported claims about completed customer projects.
- Do not publish legal text (privacy, terms) without review, and do not create placeholder legal
  text that could reach production (2D §15).

### A10. Payments (D16–D20, Phase 2D)

- **D16:** invoices are issued through KAP's own CRM, not Stripe Invoicing. Preserve the current
  website payment workflow.
- **D18:** the invoice reference stays **optional**; no invoice-number verification.
- **D19:** the permitted range stays **$1.00–$100,000.00**.
- **D20:** payment methods are not restricted for now.
- The website does not mark CRM invoices paid; reconciliation is manual.
- **End-to-end Stripe testing is deferred** until the redesigned payment page is ready, and needs
  separate authorization.

### A11. Technical constraints (Phase 2 §9, 2B §1, 2D; CLAUDE.md §11)

- Retain the existing Next.js, React, TypeScript and Tailwind architecture in this repository. No
  replacement repository.
- Redesign work happens on the `kap-website-redesign` branch, which inherits the Phase 2D security
  and reliability remediation (commit `ebcd3bd`).
- Preserve the Resend contact flow, the Stripe payment flow (including the Phase 2D hardening and
  status verification), GA4, `noindex` on `/payment`, the security headers, and content that is
  visible without JavaScript.
- Accessibility: WCAG AA contrast, visible focus, keyboard operability, honoured reduced-motion
  preferences, progressive enhancement that fails open.
- No new dependencies without a stated architectural reason. No machine-specific paths in the
  repository.
- No commit, push, merge, preview or deployment, and no change to production settings (Stripe,
  Vercel, GA4, environment variables), without the owner's explicit authorization for that action.

---

## Part B — Awaiting owner approval (not decided)

### B1. Homepage hero and concept

- **Concept selection.** Three homepage concepts are rendered under `design/concepts/`. The
  recommendation is *Automation in Action*, with an unresolved desktop composition weakness. Not
  yet selected.
- **Hero copy — PROPOSED, NOT APPROVED:**
  - Eyebrow: "AI automation for small and mid-sized businesses"
  - Headline: "Your tools, connected. Your busywork, automated."
  - Supporting copy: "We connect the tools you use and automate follow-ups, data entry and handoffs,
    so your team can focus on customers."

### B2. Conversion details

- The supporting CTA strategy: secondary labels such as "See how it works", and whether "Tell Us
  What You'd Like to Automate" is a form heading rather than a button.
- Placement of the existing Typeform fit-check survey, and its reassurance wording ("No
  obligation · Instant results · 100% confidential" is unverified).
- Whether to show a telephone number (none has been supplied).
- Whether to keep the existing "reply within one business day" promise.

### B3. Service confirmations (2B §8)

Classify each as *demonstrated capability*, *commercially delivered* or *proposed / future* before
public claims are made:

- AI voice agent implementations
- AI customer support agents
- AI content and video generation
- Automation training
- Ongoing maintenance and support
- Commercial website development engagements

Also open: where content/video generation and automation training sit in the architecture
(proposed: content within Sales & Marketing; training within Workflow Automation).

### B4. Recommendations

- The original text of all eight recommendations (required before any testimonial copy).
- Brendan Parish's relationship to KAP (client or colleague).
- LinkedIn profile or recommendation URLs, if links are wanted.

### B5. Assets

- Sanitized screenshots of authentic KAP workflows (KAP's own lead pipeline is the preferred
  candidate). Any client workflow needs that client's permission or an approved anonymized
  re-creation.
- A professional photograph of Kevin Pilgrim.
- Confirmation that the existing YouTube video may continue to be used. Note: its thumbnail shows
  an AI-generated presenter.
- Whether the generated concept image `public/images/hero/approachable-office-dusk.webp` may be
  used as a supporting image, and confirmation of the provider's commercial-use terms.
- Whether the career statistics on the current site ("3.5M+ transactions per month", "200+
  enterprise client systems integrated") can be sourced, and if so where they belong (proposed:
  About only, framed as Kevin's career).

### B6. Legal and policy content

- Privacy policy content (covering GA4, Resend, Stripe, Typeform, YouTube and Vercel), who drafts
  it, and who reviews it legally.
- Terms content, and whether Stripe's website requirements call for a published refund policy.

### B7. Technical and external configuration

- Canonical host (proposed: `www`, with the apex domain redirecting permanently).
- Owner-side security actions: Vercel Firewall rate limits; Stripe Radar, payment-method,
  receipt and notification settings; GA4 query-parameter redaction for Stripe return parameters.
- Engagement-model or pricing signals on the site, if any.
