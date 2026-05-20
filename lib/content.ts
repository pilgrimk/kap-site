export type Testimonial = {
  quote: string;
  author: string;
  title: string;
  company: string;
};

export type Solution = {
  icon: string;
  title: string;
  description: string;
};

export type ProblemPoint = {
  icon: string;
  title: string;
  body: string;
};

export type Stat = {
  value: string;
  label: string;
};

export const HERO_COPY = {
  eyebrow: "Done-for-you AI automation",
  headline:
    "AI automation systems built to save time, cut costs, and scale your business.",
  subhead:
    "Custom-built automation systems for SMBs that streamline operations, reduce manual work, and help your business grow faster.",
};

export const HERO_TRUST: string[] = [
  "30+ years engineering",
  "Done-for-you delivery",
  "Trusted by SMBs",
];

export const PROBLEM_COPY = {
  eyebrow: "The hidden cost of manual work",
  title: "Manual processes are quietly draining your business.",
  description:
    "Every spreadsheet you maintain by hand, every email you copy-paste, every recurring task you do twice — they're costing you in places you can't see on a P&L.",
};

export const PROBLEMS: ProblemPoint[] = [
  {
    icon: "Clock",
    title: "Time",
    body: "Repetitive manual tasks consume hours every day — time your team should be spending on growth, customers, and strategy.",
  },
  {
    icon: "TrendingDown",
    title: "Revenue",
    body: "Every minute spent on busywork is a minute not spent closing deals, serving customers, or shipping the work that actually moves the business.",
  },
  {
    icon: "Lightbulb",
    title: "Opportunity",
    body: "Manual operations don't scale. The work piles up faster than you can hire — and the best opportunities slip past while you're stuck in the queue.",
  },
];

export const SOLUTIONS_COPY = {
  eyebrow: "What we build",
  title: "Automation systems wired into the seams of your business.",
  description:
    "Done-for-you AI workflows that connect the tools you already use, eliminate handoffs, and run unattended in production.",
};

export const SOLUTIONS_SURVEY_COPY = {
  eyebrow: "Quick fit-check",
  title: "Is your business ready for automation?",
  description:
    "Take our 2-minute survey to discover how AI can save you time, money, and resources. Get personalized insights tailored to your business.",
  cta: {
    label: "Start the Survey",
    href: "https://1n0dm14sn6f.typeform.com/to/RU5W0sd7?utm_source=KAP-website",
  },
  reassurance: "No obligation · Instant results · 100% confidential",
};

export const SOLUTIONS_FEATURED: Solution = {
  icon: "Sparkles",
  title: "General AI Automation",
  description:
    "Custom-built systems wiring AI into the seams of your business — connecting tools you already use, eliminating manual handoffs, and running unattended in production. Every engagement starts here: we map your operations, find the highest-leverage automation, and ship it.",
};

export const SOLUTIONS: Solution[] = [
  {
    icon: "Users",
    title: "CRM Systems",
    description:
      "Automate lead capture, contact enrichment, follow-up sequences, and pipeline transitions across your CRM.",
  },
  {
    icon: "Mail",
    title: "Email Management",
    description:
      "Personalized cold outreach, smart inbox routing, auto-responses, and AI-drafted replies built around your sales motion.",
  },
  {
    icon: "MessageSquare",
    title: "Social Media",
    description:
      "Schedule, generate, repurpose, and publish content across platforms with AI-assisted creative pipelines.",
  },
  {
    icon: "Headphones",
    title: "Customer Service",
    description:
      "First-response workflows, ticket triage, and knowledge-base–backed answers that escalate intelligently to humans.",
  },
  {
    icon: "Target",
    title: "Lead Generation",
    description:
      "Outbound systems that source prospects, qualify intent, personalize messaging, and book meetings while you sleep.",
  },
  {
    icon: "Video",
    title: "Video Automation",
    description:
      "Programmatic short-form and instructional video generation for marketing, training, and onboarding.",
  },
];

export const WHY_KAP_COPY = {
  eyebrow: "Built by an engineer, not a marketer",
  title:
    "30 years of shipping enterprise software. Now applied to AI automation for your business.",
  body: [
    "Kevin Pilgrim has spent three decades building the kind of systems most companies never see: HL7 medical interfaces processing millions of transactions a month, PCI-compliant payment integrations for nationwide property management platforms, and machine-control software for semiconductor equipment installed in four countries.",
    "KAP Enterprises brings that same engineering discipline to AI automation for small and mid-sized businesses. Instead of patched-together no-code workflows, you get systems built the way enterprise software is built — reliable, maintainable, and designed to run unattended.",
  ],
};

export const WHY_KAP_STATS: Stat[] = [
  { value: "3.5M+", label: "Transactions per month built and maintained" },
  { value: "30+", label: "Years shipping production software" },
  { value: "200+", label: "Enterprise client systems integrated" },
];

export const TESTIMONIALS_COPY = {
  eyebrow: "What clients are saying",
  title: "Real systems. Real outcomes.",
  description:
    "Three perspectives from clients who've worked directly with Kevin — across automation, technical strategy, and engagement.",
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Kevin helped me set up an n8n project, and I couldn't recommend him more highly. He took the time to walk me through the entire process so I understood how everything worked. If you're looking for someone who not only delivers great technical work but also genuinely cares about your understanding and success, Kevin is your guy.",
    author: "Hunter O'Brien",
    title: "Creative Team Lead",
    company: "MemberUp",
  },
  {
    quote:
      "Kevin is incredibly knowledgeable. He doesn't just teach the 'how,' he also explains the 'why,' which made everything click so much faster. By the end of our time together, I felt confident and equipped to build automations on my own. He's the real deal.",
    author: "Peter Greco",
    title: "Agile Coach & Senior Product Manager",
    company: "Independent Consultant",
  },
  {
    quote:
      "Kevin has played a pivotal role in enhancing our digital presence and client engagement strategies. His technical expertise is nothing short of genius, and his ability to implement innovative solutions has significantly improved our efficiency and marketing effectiveness.",
    author: "Chandra Wrightsell",
    title: "Global Strategy & Branding Executive",
    company: "JT Advisors Group LLC",
  },
];

export const FINAL_CTA_COPY = {
  eyebrow: "Let's build it",
  headline: "Ready to automate the busywork holding your business back?",
  subhead:
    "Tell us where time is leaking. We'll show you what to automate first — and build it for you.",
  primary: { label: "Get Started", href: "/contact" },
  secondary: { label: "Book a Discovery Call", href: "/contact" },
};

export const ABOUT_HERO = {
  eyebrow: "About KAP Enterprises",
  title: "Three decades of integration. Now focused on AI automation.",
  description:
    "KAP Enterprises is the AI automation practice of Kevin Pilgrim, a software engineer who has spent 30+ years building systems that have to work — in healthcare, finance, property management, and manufacturing.",
};

export const ABOUT_NARRATIVE: string[] = [
  "Kevin Pilgrim has spent three decades in software engineering, building systems where reliability isn't optional. The work has ranged from manufacturing-floor controls running production equipment around the clock, to clinical interfaces processing millions of healthcare transactions a month, to PCI-compliant payment integrations serving nationwide enterprise clients. Different industries, very different stacks, one constant requirement: integrate complex systems and make them work without supervision, year after year.",
  "That experience — in regulated industries, under hard reliability constraints, at production scale — is what KAP Enterprises now brings to AI automation. The technologies are different. The engineering discipline isn't. Automations are designed and built the way enterprise software is built: monitored, recoverable, documented, and engineered to absorb the inevitable changes in tools, APIs, and the business they support.",
  "For a growing business, that means automation systems that actually hold up. Not patched-together workflows that break the first time a vendor changes an API. Not someone learning AI on your dime. Real systems built by an engineer with decades of shipping production software at scale, now focused on putting that rigor to work on AI for SMBs.",
];

export const ABOUT_PRINCIPLES_COPY = {
  eyebrow: "How the background shapes the work",
  title: "What 30 years of shipping software brings to your automation.",
};

export type Principle = {
  title: string;
  body: string;
};

export const ABOUT_PRINCIPLES: Principle[] = [
  {
    title: "Built to run unattended",
    body: "Production software runs without supervision — for years, across thousands of users. KAP's automations are designed the same way: monitored, recoverable, and engineered to survive the real world.",
  },
  {
    title: "Integration-first",
    body: "Three decades of integrating clinical systems, payment processors, and manufacturing equipment means knowing exactly where automations break — and designing around it before you find out.",
  },
  {
    title: "Engineered for change",
    body: "Tools change. APIs change. Your business changes. The system is built so that adapting is a small task, not a rewrite — because every previous one was.",
  },
];

export const PAYMENT_HERO = {
  eyebrow: "Make a payment",
  title: "Pay your KAP invoice securely.",
  description:
    "Enter the amount from your invoice and pay with any major credit or debit card. Payments are processed by Stripe — your card details never touch our servers.",
};

export const CONTACT_HERO = {
  eyebrow: "Get in touch",
  title: "Tell us what's eating your time.",
  description:
    "We'll come back with a plan for what to automate first — usually within one business day.",
};

export type GoalOption = { value: string; label: string };

export const GOAL_OPTIONS: GoalOption[] = [
  { value: "general", label: "General AI automation" },
  { value: "crm", label: "CRM workflows" },
  { value: "email", label: "Email management" },
  { value: "social", label: "Social media" },
  { value: "support", label: "Customer service" },
  { value: "leadgen", label: "Lead generation" },
  { value: "video", label: "Video / content" },
  { value: "other", label: "Not sure yet" },
];

export const ABOUT_BENEFITS = {
  eyebrow: "What it means for you",
  title: "Built to fit the business you already have.",
  paragraphs: [
    "Most automation work hits a wall where it meets the systems your business already runs on — your CRM, your accounting platform, your scheduling tools, the custom databases nobody documented. The tools used to build automations — n8n, Make, Airtable, the major AI APIs — aren't where projects fail. The protocols underneath are: REST and JSON for modern APIs, SOAP and HL7 for older enterprise platforms, SQL for the data layer. We've spent decades fluent in those protocols, which means we can meet your business wherever it already lives instead of asking it to change.",
    "When an automation needs a custom interface — a dashboard for your team, a portal for your customers, a form that triggers a workflow — we build that too. Same hands, same engineering standards. No handing you off to a different vendor for the front-end, no waiting weeks for a contractor to come up to speed on what we just built.",
    "Underneath it all, you're getting systems designed from first principles, not glued together from tutorials. The discipline that goes into them — analytical rigor from an applied-mathematics background, hardened over thirty years of building production software — is the reason they hold up when the inputs get messy, fail in ways you can recover from, and scale as your business grows instead of needing to be replaced when you do.",
  ],
};
