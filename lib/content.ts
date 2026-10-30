export type Stat = {
  value: string;
  label: string;
};

/* ---------------------------------------------------------------------------------------------
   Homepage (brief A4, A12). The hero headline is working copy, open to revision at acceptance
   review (brief B1). Factual claims trace to brief A2 or to existing site copy.
   ------------------------------------------------------------------------------------------- */

export const HOME_HERO = {
  eyebrow: "AI automation for small and mid-sized businesses",
  headlineLead: "Your tools, connected.",
  headlineEmphasis: "Your busywork, automated.",
  subhead:
    "We connect the tools you use and automate follow-ups, data entry and handoffs, so your team can focus on customers.",
  secondaryCta: { label: "See how it works", href: "#how" },
};

export type WorkflowStep = { kind?: string; title: string; detail: string };

export const HOME_WORKFLOW: {
  label: string;
  trigger: string;
  start: WorkflowStep;
  ai: WorkflowStep;
  results: WorkflowStep[];
  caption: string;
} = {
  label: "Example workflow",
  trigger: "New inquiry",
  start: {
    kind: "Starts when",
    title: "A website inquiry arrives",
    detail: "From your site's contact form",
  },
  ai: {
    kind: "AI step",
    title: "AI reads and sorts it",
    detail: "Service, urgency and the right next step",
  },
  results: [
    { title: "CRM record updated", detail: "Contact and deal, no retyping" },
    { title: "Follow-up sent", detail: "In your words, on your rules" },
    { title: "Your team is told", detail: "Only when a person is needed" },
  ],
  caption:
    "Illustrative example, not a client project. Every workflow is built around the tools you already use.",
};

export const HOME_HOURS = {
  title: "Where the hours actually go.",
  todayLabel: "Today",
  automatedLabel: "Done automatically",
  rows: [
    {
      today: "The same customer details typed into three systems",
      automated: "Entered once, synced everywhere",
    },
    {
      today: "A website inquiry waits until someone checks the inbox",
      automated: "Acknowledged and routed right away",
    },
    {
      today: "New leads sit in a spreadsheet until someone has time to chase them",
      automated: "Every lead logged and followed up on time",
    },
    {
      today: "Reminders and status updates sent by hand every week",
      automated: "Sent on schedule, exceptions flagged",
    },
  ],
};

export type Service = {
  icon: "Workflow" | "MessagesSquare" | "Megaphone" | "Blocks" | "Globe";
  title: string;
  description: string;
};

// Five categories from brief A3; AI automation carries the most weight (A4). Service pages are
// not built yet, so no card links to a missing page.
export const HOME_SERVICES: {
  title: string;
  intro: string;
  featured: Service & { points: string[]; link?: { label: string; href: string } };
  others: Service[];
} = {
  title: "What we automate.",
  intro:
    "Practical automation for the work that slows a small business down, with AI doing the reading, sorting and drafting in between.",
  featured: {
    icon: "Workflow",
    title: "AI Workflow Automation",
    description:
      "Connect the tools you already use so data entry, handoffs and follow-ups run on their own.",
    points: [
      "Data moved between systems without retyping",
      "Inquiries and requests sorted and routed",
      "Routine updates and reminders sent on schedule",
    ],
    link: { label: "Explore AI Workflow Automation", href: "/services/workflow-automation" },
  },
  others: [
    {
      icon: "MessagesSquare",
      title: "AI-Powered Customer Engagement",
      description:
        "Respond to inquiries faster and more consistently, with AI that sorts, drafts and routes each one.",
    },
    {
      icon: "Megaphone",
      title: "Sales & Marketing Automation",
      description:
        "Capture leads, keep follow-ups going and move your pipeline forward without manual chasing.",
    },
    {
      icon: "Blocks",
      title: "Custom Software & Integrations",
      description:
        "When off-the-shelf tools won't talk to each other, we build the integration or interface that connects them.",
    },
    {
      icon: "Globe",
      title: "Website Design & Development",
      description:
        "Websites built to turn visitors into inquiries, connected to the systems behind them.",
    },
  ],
};

// Owner-approved working copy (2026-10-29), kept verbatim, including its dash. The owner confirmed
// the video still represents KAP's current services. The summary states only verified facts: the
// video's content could not be reviewed (YouTube blocks automated viewing), and caption
// availability is unverified (design/open-items.md).
export const HOME_VIDEO = {
  title: "See What Automation Can Do",
  paragraphs: [
    "At KAP Enterprises, we don't just build automations for businesses. We put them to work in our own operations.",
    "This video introduces the possibilities of AI-powered automation—and it's also an example of automation in action.",
  ],
  highlight: "We created it using one of our own automated video-production workflows.",
  closing: "Imagine what the right automation could do for your business.",
  disclosure:
    "Created using a KAP Enterprises automation workflow. Features an AI-generated presenter.",
  video: {
    id: "bjfNFUCjJLU",
    // The video's published YouTube title
    title: "KAP Enterprises - Automations",
    kicker: "Video",
    note: "Plays on YouTube, with sound",
  },
  summaryLabel: "About this video",
  summary:
    "An introduction to AI-powered automation for businesses from KAP Enterprises, presented by an AI-generated presenter. The video was produced with one of KAP's own automated video-production workflows.",
};

// Proposed process wording (brief A4: keep proposed wording distinct from verified practice).
// Needs the owner's confirmation before launch; it makes no ongoing-support promise (brief B3).
export const HOME_PROCESS = {
  title: "How we work together.",
  steps: [
    {
      title: "Talk it through",
      body: "Tell us where the time goes and which tools you use. We'll look at what's worth automating first.",
    },
    {
      title: "Map the work",
      body: "We trace how the work moves today and design the automation around the tools you already have.",
    },
    {
      title: "Build and test",
      body: "We build it and test it with you before anything goes live.",
    },
    {
      title: "Hand it over",
      body: "You get a documented system your team understands, built to adapt as your tools change.",
    },
  ],
};

// Sources: heading = existing site copy; lead and career facts = brief A2 (Kevin's career, never
// company accomplishments); build standard = existing About page copy.
export const HOME_CREDIBILITY = {
  title: "Built by an engineer, not a marketer.",
  lead: "KAP Enterprises is led by Kevin Pilgrim, a software engineer with 30+ years of experience.",
  careerLabel: "From Kevin's career",
  career: [
    {
      field: "Healthcare",
      fact: "HL7 clinical interfaces processing millions of healthcare transactions a month",
    },
    {
      field: "Payments",
      fact: "PCI-compliant payment integrations for nationwide property management platforms",
    },
    {
      field: "Manufacturing",
      fact: "Machine-control software for semiconductor equipment installed in four countries",
    },
  ],
  standardLead:
    "KAP automations are designed and built the way enterprise software is built:",
  traits: ["Monitored", "Recoverable", "Documented", "Engineered for change"] as const,
};

export type Recommendation = {
  quote: string;
  author: string;
  role: string;
  company: string;
  relationship: string;
};

// Whole-sentence excerpts, unedited, from the recommendations already published on the current
// site. Relationships per brief A7. To be checked against the LinkedIn originals (brief B4).
export const HOME_RECOMMENDATIONS: { title: string; items: Recommendation[] } = {
  title: "What clients say.",
  items: [
    {
      quote:
        "He took the time to walk me through the entire process so I understood how everything worked.",
      author: "Hunter O'Brien",
      role: "Creative Team Lead",
      company: "MemberUp",
      relationship: "Client, n8n automation project",
    },
    {
      quote:
        "He doesn't just teach the 'how,' he also explains the 'why,' which made everything click so much faster.",
      author: "Peter Greco",
      role: "Agile Coach & Senior Product Manager",
      company: "Independent Consultant",
      relationship: "Client",
    },
    {
      quote:
        "His technical expertise is nothing short of genius, and his ability to implement innovative solutions has significantly improved our efficiency and marketing effectiveness.",
      author: "Chandra Wrightsell",
      role: "Global Strategy & Branding Executive",
      company: "JT Advisors Group LLC",
      relationship: "Client",
    },
  ],
};

export const HOME_FINAL_CTA = {
  title: "Tell us where the busywork piles up.",
  body: "Describe how work moves through your business today, and we'll talk through what's worth automating first.",
  emailLead: "Prefer email?",
};

/* ---------------------------------------------------------------------------------------------
   Service page: AI Workflow Automation (/services/workflow-automation, brief A3 and A5).
   Hero headline, supporting message, outcomes, example situations, automation categories and
   the four approach steps come from the owner's Phase 2A instruction (2026-10-29). Technology and
   credibility lines come from existing About-page copy and brief A2. Automation categories are
   examples of what can be built, not packaged products.
   ------------------------------------------------------------------------------------------- */

export type ServiceIcon =
  | "Inbox" | "Sparkles" | "Contact" | "Send" | "BellRing" | "Keyboard" | "Clock"
  | "FileSpreadsheet" | "Repeat" | "Funnel" | "CalendarCheck" | "Mail" | "ArrowLeftRight"
  | "Search" | "Lightbulb" | "Wrench" | "FileCheck";

export const SERVICE_WORKFLOW = {
  path: "/services/workflow-automation",
  meta: {
    title: "AI Workflow Automation",
    description:
      "KAP Enterprises connects the tools your small business already uses and automates repetitive tasks, follow-ups and handoffs, so your team can focus on customers.",
  },
  hero: {
    eyebrow: "AI Workflow Automation",
    headlineLead: "Less busywork.",
    headlineEmphasis: "More business.",
    subhead:
      "We connect the tools your business already uses and automate repetitive tasks, follow-ups and handoffs, so your team can focus on customers instead of administrative work.",
    secondaryCta: { label: "See an example workflow", href: "#example" },
    board: {
      label: "Everyday tasks",
      manual: "By hand",
      automated: "Automated",
      tasks: [
        { icon: "Keyboard", text: "Copy a website inquiry into the CRM" },
        { icon: "Send", text: "Send the follow-up email" },
        { icon: "FileSpreadsheet", text: "Update the tracking spreadsheet" },
        { icon: "BellRing", text: "Tell the team a new lead arrived" },
      ] as { icon: ServiceIcon; text: string }[],
      caption: "Illustrative example tasks.",
    },
    outcomesLabel: "What changes",
    outcomes: [
      "Less manual data entry",
      "Faster customer follow-up",
      "Fewer missed inquiries",
      "Better coordination between systems",
      "Less administrative work",
      "More time for customers",
    ],
  },
  scenarios: {
    title: "Sound familiar?",
    todayLabel: "Today",
    automatedLabel: "With automation",
    items: [
      {
        icon: "Inbox",
        today: "A website inquiry arrives, and someone has to type it into the CRM.",
        automated: "The inquiry lands in your CRM on its own, ready to act on.",
      },
      {
        icon: "Clock",
        today: "A new customer needs a follow-up, but the message goes out late.",
        automated: "A follow-up goes out promptly, written the way you would say it.",
      },
      {
        icon: "FileSpreadsheet",
        today: "Details are copied by hand between spreadsheets and business apps.",
        automated: "Your spreadsheets and apps stay in step automatically.",
      },
      {
        icon: "Repeat",
        today: "Staff repeat the same administrative steps every day.",
        automated: "Routine steps run in the background, and people step in when needed.",
      },
    ] as { icon: ServiceIcon; today: string; automated: string }[],
  },
  capabilities: {
    title: "What we can automate.",
    intro:
      "A few of the workflows we can build. Each one is designed around the tools you already use, so the details are always specific to your business.",
    items: [
      { icon: "Funnel", title: "Lead capture and routing", body: "New leads collected from your forms and channels, and sent to the right person." },
      { icon: "BellRing", title: "Follow-ups and notifications", body: "Timely replies to customers and alerts to your team, without anyone remembering to send them." },
      { icon: "FileSpreadsheet", title: "CRM and spreadsheet updates", body: "Records created and kept current, so nobody retypes the same details." },
      { icon: "CalendarCheck", title: "Appointments and scheduling", body: "Bookings, confirmations and reminders handled as part of the flow." },
      { icon: "Mail", title: "Email processing and admin", body: "Incoming messages sorted, summarised or routed, and routine admin taken off the list." },
      { icon: "ArrowLeftRight", title: "Data sync across platforms", body: "The same information kept consistent across the apps your business runs on." },
    ] as { icon: ServiceIcon; title: string; body: string }[],
  },
  example: {
    title: "How an automation works.",
    intro: "One inquiry, followed from the moment it arrives.",
    label: "Example workflow",
    steps: [
      { icon: "Inbox", title: "Inquiry arrives", body: "A customer fills in the form on your website." },
      { icon: "Sparkles", title: "Automatically processed", body: "AI reads the request and picks out the details and urgency." },
      { icon: "Contact", title: "CRM updated", body: "The contact and request are added to your CRM, with no retyping." },
      { icon: "Send", title: "Follow-up sent", body: "The customer gets a prompt reply in your words." },
      { icon: "BellRing", title: "Team notified", body: "The right person is told when a human is needed." },
    ] as { icon: ServiceIcon; title: string; body: string }[],
    caption:
      "Illustrative example, not a client project. Every workflow is built around the tools you already use.",
  },
  // Step names are the owner's; step descriptions are proposed wording with no ongoing-support
  // promise (brief B3).
  approach: {
    title: "How we work with you.",
    intro: "A clear, practical process, built around how your business already runs.",
    steps: [
      { icon: "Search", title: "Understand your process", body: "We learn how the work moves today: the tools, the people involved and where the time goes." },
      { icon: "Lightbulb", title: "Find the best opportunities", body: "We identify which steps are worth automating first, and which are better left to people." },
      { icon: "Wrench", title: "Build and integrate", body: "We build the workflow and connect it to the tools you already use." },
      { icon: "FileCheck", title: "Test, refine and hand over", body: "We test it with you, refine it, and hand it over with documentation your team can follow." },
    ] as { icon: ServiceIcon; title: string; body: string }[],
  },
  tools: {
    title: "Proven tools, built properly.",
    body: "We build on established automation platforms such as n8n and Make, connect your CRM and other business tools through their APIs, and add AI where it genuinely helps. Every workflow is designed and built the way enterprise software is built.",
    chips: ["n8n", "Make", "Airtable", "CRMs", "REST APIs", "SQL databases", "AI models"],
    credential: "KAP Enterprises is led by Kevin Pilgrim, a software engineer with 30+ years of experience.",
    // Whole sentence, unedited, from the recommendation already published on the current site
    // (brief A7; still to be checked against the LinkedIn original, B4).
    recommendation: {
      quote: "Kevin helped me set up an n8n project, and I couldn't recommend him more highly.",
      author: "Hunter O'Brien",
      role: "Creative Team Lead",
      company: "MemberUp",
      relationship: "Client, n8n automation project",
    },
  },
  closing: {
    title: "What's one task you'd love to never do again?",
    body: "Tell us about a repetitive process in your business. We'll talk through whether it can be automated, and what it would take.",
    emailLead: "Prefer email?",
  },
};

// Not on the homepage: placement and reassurance wording await owner approval (brief B2).
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
