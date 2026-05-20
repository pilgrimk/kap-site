# KAP Enterprises Website

Marketing + lead-generation site for [KAP Enterprises](https://kap-enterprises-llc.com) — an AI automation practice for small and mid-sized businesses.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4** + **shadcn/ui** (radix-nova style)
- **Motion** (`motion/react`) for animations
- **Resend** — contact form delivery
- **Stripe** Payment Element — invoice payments
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values. `.env.local` is gitignored — secrets stay on your machine.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key. Required for the contact form. |
| `RESEND_FROM` | Sender address on a verified Resend domain (e.g. `noreply@contact.kap-enterprises-llc.com`). |
| `RESEND_TO` | Inbox that receives contact-form submissions. Any address — no verification required on the receiving side. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (`pk_*`). Embedded in client JS — safe to expose. |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_*`). Server-only. **Never** commit or paste in chat. |

For development, prefer Stripe **test** keys (`pk_test_` / `sk_test_`) — live keys process real charges. Switch to live keys only for production deploys.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server on port 3000 (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |

## Project structure

```
kap-site/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Homepage
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── payment/page.tsx
│   ├── api/
│   │   ├── contact/route.ts                  # Resend handler
│   │   └── stripe/create-payment-intent/route.ts
│   ├── opengraph-image.tsx     # Auto-generated OG image
│   ├── robots.ts               # /robots.txt
│   ├── sitemap.ts              # /sitemap.xml
│   ├── layout.tsx              # Root layout + metadata
│   └── globals.css             # Tailwind theme tokens (brand palette)
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── sections/               # Page-level sections (Hero, Solutions, etc.)
│   ├── shared/                 # Reusable building blocks (PageHero, SectionContainer, YoutubeLoop, MotionProvider, …)
│   └── ui/                     # shadcn/ui primitives
├── lib/
│   ├── animations.ts           # Motion presets (fadeUp, staggerContainer, …)
│   ├── constants.ts            # Site config, nav links, CTAs, contact info
│   ├── content.ts              # All copy / structured content
│   └── utils.ts                # cn() helper
├── public/                     # Static assets (logo)
├── .env.example                # Env var template (committed)
├── .env.local                  # Real values (gitignored)
├── CLAUDE.md                   # Project conventions
├── AGENTS.md                   # Important: this is Next.js 16, NOT older versions
└── package.json
```

## Architecture notes

- **Routing.** Marketing pages (`/`, `/about`, `/contact`, `/payment`) prerender as static HTML at build time. API routes are server-rendered on demand.
- **Content.** Every piece of user-facing copy lives in `lib/content.ts`. Single source of truth — no copy hardcoded inside components.
- **Branding.** Brand palette (`#FFFCED` cream, `#1A1A1A` charcoal, `#B1296E` magenta, `#F17558` coral) is wired through Tailwind v4 CSS variables in `globals.css` and consumed by shadcn semantic tokens (`bg-card`, `bg-primary`, etc.).
- **Animations.** Motion-driven scroll reveals with `whileInView` + `once: true`. Wrapped in `<MotionProvider reducedMotion="user">` so OS-level "reduce motion" is respected automatically. CSS `@media (prefers-reduced-motion)` is a belt-and-suspenders fallback for non-Motion transitions.
- **Forms.** Contact + Payment forms use native HTML5 + JS submission. Server-side validation in route handlers; honeypot field for bot protection.
- **Payments.** Stripe Payment Element themed to match the site. Two-stage UX: customer enters details → enters card → Stripe redirects back with `redirect_status=succeeded`, which we detect and show a confirmation state.
- **Accessibility.** Skip-to-content link, focus-visible rings on interactive elements, proper heading hierarchy (one `h1` per page), `aria-label`/`aria-expanded` on the mobile menu, `suppressHydrationWarning` on `<body>` to silence the Grammarly extension's harmless dev-mode warning.
- **SEO.** Auto-generated `robots.txt`, `sitemap.xml`, and `opengraph-image` using Next.js metadata file conventions. Per-page metadata via the Next.js Metadata API.

## Build conventions

- [CLAUDE.md](./CLAUDE.md) — project structure rules, naming conventions, build order, design system constraints
- [AGENTS.md](./AGENTS.md) — **Important: this is Next.js 16**, which has breaking changes from older versions. Read `node_modules/next/dist/docs/` before adding code that touches routing, fonts, images, or metadata.

## Deployment

The build is platform-agnostic (Vercel, Netlify, self-hosted Node, etc.). Whichever target you use:

1. Set all environment variables from the table above
2. Run `npm run build` then `npm run start`, or let the host run them
3. For Resend, verify your sending domain at [resend.com/domains](https://resend.com/domains) before launch — emails won't send from unverified domains
4. For Stripe, switch from `pk_test_`/`sk_test_` to `pk_live_`/`sk_live_` in production

The site is small enough that any of Vercel's, Netlify's, or Cloudflare Pages' free tiers will host it comfortably.
