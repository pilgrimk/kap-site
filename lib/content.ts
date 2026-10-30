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
  link?: { label: string; href: string };
};

// Five categories from brief A3; AI automation carries the most weight (A4). Only services whose
// pages exist carry a link, so nothing points at a missing page.
export const HOME_SERVICES: {
  title: string;
  intro: string;
  featured: Service & { points: string[] };
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
      link: { label: "Explore Customer Engagement", href: "/services/customer-engagement" },
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
      link: { label: "Explore Website Development", href: "/services/websites" },
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
  | "Search" | "Lightbulb" | "Wrench" | "FileCheck" | "PhoneMissed" | "Hourglass" | "Moon"
  | "MessageCircleQuestion" | "UserRound" | "SlidersHorizontal" | "Plug" | "Palette"
  | "MonitorSmartphone" | "Signpost" | "MousePointerClick" | "Gauge" | "FileCode2"
  | "LayoutTemplate" | "MessageSquareText" | "Rocket" | "Workflow" | "MessagesSquare" | "Globe";

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

/* ---------------------------------------------------------------------------------------------
   Service page: AI-Powered Customer Engagement (/services/customer-engagement, brief A3 and A5).
   Hero headline and supporting copy, the outcomes and the section outline come from the owner's
   instruction (2026-10-29); the supporting copy keeps its dash verbatim. Everything else is
   proposed wording. AI voice and support agents are still to be classified (brief B3), so channels
   and capabilities are framed as what can be set up, never as delivered projects. Both example
   conversations are illustrative, with invented customers and businesses.
   ------------------------------------------------------------------------------------------- */

export const SERVICE_ENGAGEMENT = {
  path: "/services/customer-engagement",
  meta: {
    title: "AI-Powered Customer Engagement",
    description:
      "KAP Enterprises helps small businesses answer inquiries promptly, handle routine questions, capture customer details and route leads with AI, while people stay in charge of the conversations that need them.",
  },
  hero: {
    eyebrow: "AI-Powered Customer Engagement",
    headlineLead: "Every inquiry",
    headlineEmphasis: "deserves an answer.",
    subhead:
      "Give customers a faster way to get answers, share what they need, and reach the right person—even when your team is busy.",
    secondaryCta: { label: "Follow a conversation", href: "#conversation" },
    chat: {
      channel: "Website chat",
      assistant: "AI assistant",
      customerLabel: "Customer",
      replay: "Replay",
      replayLabel: "Replay the example conversation",
      messages: [
        { from: "customer", text: "Hi, do you have any openings this week? Our AC stopped working." },
        {
          from: "assistant",
          text: "Sorry to hear that. I can request a visit for you. What name should I give the team, and when is best to call?",
        },
        { from: "customer", text: "Dana. Afternoons are best." },
        {
          from: "assistant",
          text: "Thanks, Dana. I've passed this to the team so they can call you this afternoon.",
        },
      ] as { from: "customer" | "assistant"; text: string }[],
      captured: { label: "Details captured", fields: ["Dana", "AC repair", "Call: afternoons"] },
      handoff: {
        label: "Sent to your team",
        title: "Service request from Dana",
        details: ["AC not working", "Call back this afternoon"],
      },
      caption: "Illustrative example conversation, not a client project.",
    },
  },
  day: {
    title: "Where conversations slip away.",
    intro:
      "None of this means anyone is doing a bad job. It's what happens when a small team is busy doing the work.",
    label: "An ordinary day",
    moments: [
      {
        time: "8:40 am",
        icon: "PhoneMissed",
        title: "A missed call",
        body: "The phone rings while you're with a customer, and the caller doesn't leave a message.",
      },
      {
        time: "11:15 am",
        icon: "Hourglass",
        title: "A slow reply",
        body: "A website inquiry waits in the inbox until someone has a spare moment.",
      },
      {
        time: "2:30 pm",
        icon: "Repeat",
        title: "The same questions",
        body: "Hours, services, availability: answered again, one message at a time.",
      },
      {
        time: "9:20 pm",
        icon: "Moon",
        title: "After hours",
        body: "Someone is ready to get started tonight, and there's nobody there to answer.",
      },
    ] as { time: string; icon: ServiceIcon; title: string; body: string }[],
    caption: "Illustrative times.",
  },
  capabilities: {
    title: "What AI customer engagement can handle.",
    intro:
      "Practical jobs an assistant can take on, set up around your business. Which ones make sense depends on how your customers reach you.",
    items: [
      { icon: "MessageCircleQuestion", title: "Routine questions", body: "Hours, services, service areas and next steps, answered from information you approve." },
      { icon: "Contact", title: "Customer details", body: "Names, contact details and the reason for getting in touch, captured as the conversation happens." },
      { icon: "Funnel", title: "Lead qualification and routing", body: "A few well-chosen questions, so each inquiry reaches the right person with the right context." },
      { icon: "Send", title: "Prompt follow-up", body: "Replies and reminders that keep a promising inquiry from going quiet." },
      { icon: "CalendarCheck", title: "Appointment and callback requests", body: "Customers can ask for a time or a callback, and the request reaches your team or your scheduling tool." },
      { icon: "UserRound", title: "Handoffs to your team", body: "When a conversation needs a person, it's passed on with everything said so far." },
    ] as { icon: ServiceIcon; title: string; body: string }[],
    channels: {
      label: "Where it can work",
      items: ["Website chat", "Messaging", "Email", "Phone, with an AI voice agent"],
      note: "Which channels and integrations fit depends on your business and the tools you already use. We work that out together before anything is built.",
    },
  },
  conversation: {
    title: "A conversation, start to handoff.",
    intro: "An inquiry that arrives after hours, and what your team finds waiting the next morning.",
    label: "Example conversation",
    time: "9:12 pm",
    channel: "Website chat",
    customerLabel: "Customer",
    assistantLabel: "AI assistant",
    messages: [
      { from: "customer", text: "Hi, do you cater office lunches? We'd need food for about 30 people." },
      {
        from: "assistant",
        text: "Yes, we cater office lunches. What date are you planning for, and where is the office?",
        note: "Answers from information you approve",
      },
      { from: "customer", text: "Thursday the 14th, downtown. Can someone tell me the pricing?" },
      {
        from: "assistant",
        text: "Pricing depends on the menu, so our catering manager will send you options. What's the best email for you?",
        note: "Leaves pricing to a person",
      },
      { from: "customer", text: "jordan@example.com" },
      {
        from: "assistant",
        text: "Thanks, Jordan. You'll hear from us tomorrow morning.",
        note: "Sets a clear expectation",
      },
    ] as { from: "customer" | "assistant"; text: string; note?: string }[],
    handoff: {
      label: "Handoff to your team",
      title: "New catering inquiry",
      fields: [
        { name: "Contact", value: "Jordan, jordan@example.com" },
        { name: "Request", value: "Office lunch for about 30" },
        { name: "Date", value: "Thursday the 14th, downtown" },
        { name: "Needs a person", value: "Pricing and menu options" },
        { name: "Received", value: "9:12 pm, by website chat" },
      ],
      footer: "The full conversation comes with it.",
    },
    caption:
      "Illustrative example, not a client project. What's captured, and where it goes, is designed around your business.",
  },
  boundaries: {
    title: "People stay in charge.",
    intro:
      "An assistant is there to support your team, not to replace it. Before anything goes live, you decide what it handles, what it hands over, and how it introduces itself to customers.",
    assistant: {
      label: "The assistant handles",
      items: [
        "Routine questions with answers you've approved",
        "Collecting contact details and the reason for the inquiry",
        "Appointment and callback requests",
        "Replies when your team is busy or away",
      ],
    },
    team: {
      label: "Your team handles",
      items: [
        "Pricing, quotes and anything that needs judgement",
        "Complaints and sensitive conversations",
        "Anything the assistant isn't sure about",
        "Any customer who asks for a person",
      ],
    },
    handover: "Hands over",
    rule: "Every handoff carries the conversation so far, so customers don't have to start again.",
  },
  // Proposed wording; no ongoing-support promise (brief B3).
  approach: {
    title: "How we set it up.",
    intro: "A careful process, because these are conversations with your customers.",
    steps: [
      { icon: "Search", title: "Discovery", body: "We learn how customers reach you today, what they ask most and where inquiries get stuck." },
      { icon: "SlidersHorizontal", title: "Configuration", body: "We set up the assistant's answers, questions and boundaries with you, in your business's voice." },
      { icon: "Plug", title: "Integration", body: "We connect it to the channels and tools you already use, such as your website and CRM." },
      { icon: "FileCheck", title: "Testing", body: "We test realistic conversations, including the awkward ones, and refine them until the handoffs work." },
      { icon: "Wrench", title: "Handoff", body: "We hand it over with documentation, so your team knows how it works and how to adjust it." },
    ] as { icon: ServiceIcon; title: string; body: string }[],
  },
  tools: {
    title: "Engineered, not improvised.",
    body: "Customer conversations carry your reputation, so we build them the way enterprise software is built: AI language models connected to your website, CRM and business tools through established platforms such as n8n and Make, with clear rules for what happens next.",
    chips: ["AI language models", "Website chat", "CRMs", "n8n", "Make", "REST APIs"],
    credential: "KAP Enterprises is led by Kevin Pilgrim, a software engineer with 30+ years of experience.",
    // First sentence, unedited, of the recommendation already published on the current site
    // (brief A7; still to be checked against the LinkedIn original, B4).
    recommendation: {
      quote: "Kevin has played a pivotal role in enhancing our digital presence and client engagement strategies.",
      author: "Chandra Wrightsell",
      role: "Global Strategy & Branding Executive",
      company: "JT Advisors Group LLC",
      relationship: "Client",
    },
  },
  closing: {
    title: "Where do your customer conversations get stuck?",
    body: "Tell us how customers reach you today. We'll talk through where an AI assistant could help, and where your team should stay in the conversation.",
    emailLead: "Prefer email?",
  },
};

/* ---------------------------------------------------------------------------------------------
   Service page: Website Design & Development (/services/websites, brief A3 and A5).
   Hero headline, supporting copy, the problems, qualities, process stages and the automation
   examples come from the owner's Phase 2C instruction (2026-10-29); the rest is proposed wording.
   Commercial website engagements are not yet classified (brief B3), so the page shows KAP's own
   site as its example and never presents it, or the illustrative "Fernway" business, as a client
   project. No search-ranking, lead or revenue promises.
   ------------------------------------------------------------------------------------------- */

export type SiteMock = {
  name: string;
  nav: string[];
  navCta: string;
  headline: string;
  body: string;
  cta: string;
  secondary: string;
  tiles: string[];
};

export const SERVICE_WEBSITES = {
  path: "/services/websites",
  meta: {
    title: "Website Design & Development",
    description:
      "KAP Enterprises designs and builds modern, mobile-friendly websites for small businesses, with clear messaging, easy ways to get in touch and fast, accessible pages, and can connect them to the workflows behind them.",
  },
  hero: {
    eyebrow: "Website Design & Development",
    headlineLead: "A website that looks great.",
    headlineEmphasis: "And works harder.",
    subhead:
      "We build modern, professional websites that help small businesses make a strong first impression, earn customer trust, and turn more visitors into inquiries.",
    secondaryCta: { label: "See a before and after", href: "#compare" },
    // An invented business, captioned as illustrative wherever it appears.
    site: {
      name: "Fernway Landscaping",
      nav: ["Services", "Our work", "About", "Contact"],
      navCta: "Get a quote",
      headline: "Outdoor spaces, built to be lived in.",
      body: "Garden design, planting and stonework for homes across the valley.",
      cta: "Request a quote",
      secondary: "See our work",
      tiles: ["Garden design", "Patios & paths", "Seasonal care"],
    } satisfies SiteMock,
    phoneBar: ["Call", "Get a quote"],
    notesLabel: "What the design is doing",
    notes: [
      { title: "Says what you do", body: "The offer is clear before anyone scrolls." },
      { title: "One clear next step", body: "A single main button, not ten competing links." },
      { title: "Contact, one tap away", body: "On a phone, calling or asking for a quote is always in reach." },
    ],
    caption: "Illustrative example site for a fictional business, not a client project.",
  },
  compare: {
    title: "Your website is often your first impression.",
    intro:
      "Before customers call, they look you up. The same business can make two very different first impressions.",
    sliderLabel: "Compare the same website before and after a redesign",
    before: "Before",
    after: "After",
    beforeSite: {
      name: "Fernway Landscaping Co.",
      welcome: "Welcome to our website!",
      nav: ["Home", "About Us", "Services", "Gallery", "Links", "News", "FAQ", "Testimonials", "Contact"],
      body: "Fernway Landscaping Co. has been proud to serve our community. We offer a wide variety of services for residential and commercial properties. Please browse our website for more information about what we can do for you. Thank you for visiting!",
      link: "Click here for more info",
      list: ["Lawn Mowing", "Hedge Trimming", "Mulch", "Tree Service", "Snow Removal", "And Much More!!"],
      footer: "For contact details please see the Contact page.",
    },
    problemsLabel: "What changed",
    problems: [
      { problem: "Looks dated", fix: "A modern design that matches the quality of the work" },
      { problem: "Hard to use on a phone", fix: "Layouts designed for phones as well as desktops" },
      { problem: "Unclear what's on offer", fix: "Services stated plainly, in customers' words" },
      { problem: "Contact details buried", fix: "A clear way to get in touch on every page" },
      { problem: "Slow and confusing", fix: "Fast pages with an obvious next step" },
    ],
    caption: "Illustrative example for a fictional business. Drag the handle, or use the arrow keys, to compare.",
  },
  qualities: {
    title: "What goes into a KAP website.",
    intro: "Six things every site we build is designed around, because they're what your visitors notice.",
    items: [
      { icon: "Palette", title: "Modern, professional design", body: "A look that fits your business and builds trust, not a template with your logo dropped in." },
      { icon: "MonitorSmartphone", title: "Responsive layouts", body: "Designed for phones, tablets and desktops, so every visitor gets a page that works on their screen." },
      { icon: "Signpost", title: "Clear messaging and navigation", body: "Plain words about what you offer, and menus that take people where they expect to go." },
      { icon: "MousePointerClick", title: "Easy ways to get in touch", body: "Contact forms, email links and calls to action placed where visitors are ready to use them." },
      { icon: "Gauge", title: "Fast, accessible pages", body: "Pages that load quickly and work with keyboards, screen readers and enlarged text." },
      { icon: "FileCode2", title: "Maintainable build", body: "Clean, documented code that's straightforward to update as your business changes." },
    ] as { icon: ServiceIcon; title: string; body: string }[],
    specimen: { label: "Your brand, not ours", type: "Aa" },
    scale: { label: "Readable at any text size", sample: "Aa" },
  },
  // Stage names from the owner's instruction; descriptions are proposed wording. No turnaround or
  // revision-count promises.
  approach: {
    title: "Built around your business.",
    intro: "A collaborative process, with your feedback shaping the site before it launches.",
    evolution: {
      draft: "First layout",
      final: "Ready to launch",
      caption: "Illustrative: the example site from the top of this page, from first layout to finished design.",
    },
    steps: [
      { icon: "Search", title: "Understand your business", body: "We learn what you offer, who your customers are and what you want visitors to do." },
      { icon: "LayoutTemplate", title: "Initial design", body: "We design your key pages first, so you can see the direction before it's built." },
      { icon: "MessageSquareText", title: "Your feedback", body: "You review the design and tell us what's working and what isn't." },
      { icon: "SlidersHorizontal", title: "Refine and build", body: "We refine the design and build the site, checking it on phones, tablets and desktops as we go." },
      { icon: "Rocket", title: "Prepare for launch", body: "We set page titles and descriptions, test the contact form and check everything again before it goes live." },
    ] as { icon: ServiceIcon; title: string; body: string }[],
  },
  // KAP's own site as the example (owner's instruction). Every point is a checkable fact about
  // this site; it is never framed as a client project.
  showcase: {
    eyebrow: "Our work, in action",
    title: "You're looking at one.",
    body: "This website is KAP's own, designed and built in-house. It isn't a client project, but it's the most direct example we can show you of how we build: the design, the way it adapts to your screen, and how each page leads to a conversation.",
    points: [
      "Checked at 17 screen widths, from a small phone to a wide monitor, and with enlarged text",
      "One main action, repeated where you're ready for it: Let's Talk About Your Business",
      "Built on Next.js, with a working contact form and online payments through Stripe",
    ],
    tryIt: "Try it: open this page on another screen, or resize your browser window.",
    screensLabel: "Pages from this site, on a phone",
    // Real captures of this site (authentic; design/open-items.md), 390px wide, first screen.
    screens: [
      { label: "Homepage", href: "/", src: "/images/websites/kap-home-phone.png" },
      { label: "AI Workflow Automation", href: "/services/workflow-automation", src: "/images/websites/kap-workflow-phone.png" },
      { label: "Customer Engagement", href: "/services/customer-engagement", src: "/images/websites/kap-engagement-phone.png" },
    ],
  },
  connect: {
    title: "A website that connects to the rest of your business.",
    intro:
      "For many websites, the contact form is where the job ends. With KAP, it can be where your workflow begins.",
    form: { label: "Your website", fields: ["Name", "Email", "How can we help?"], button: "Send" },
    afterLabel: "What can happen next",
    items: [
      { icon: "BellRing", title: "Your team is notified", body: "The right person hears about each new inquiry." },
      { icon: "Contact", title: "Lead added to your CRM", body: "Contact details recorded without retyping." },
      { icon: "Send", title: "Customer follow-up", body: "A reply goes out promptly, in your words." },
      { icon: "CalendarCheck", title: "Appointment requests", body: "Requests reach your calendar or scheduling tool." },
      { icon: "Plug", title: "Other integrations", body: "Connected to the tools you already use." },
    ] as { icon: ServiceIcon; title: string; body: string }[],
    note: "Examples of what can be connected. What fits depends on your business and the tools you use.",
    links: [
      { label: "Explore AI Workflow Automation", href: "/services/workflow-automation" },
      { label: "Add an AI assistant to your site", href: "/services/customer-engagement" },
    ],
  },
  closing: {
    title: "Ready for a website that works harder?",
    body: "Tell us about your business and your current website, if you have one. We'll talk through what it needs to turn more visitors into inquiries.",
    emailLead: "Prefer email?",
  },
};

// Header Services menu (owner, 2026-10-30): only the three services with their own pages. The
// other two stay on the homepage, which the "all services" link reaches.
export const SERVICES_NAV: {
  label: string;
  items: { icon: Service["icon"]; title: string; description: string; href: string }[];
  all: { label: string; href: string };
} = {
  label: "Services",
  items: [
    {
      icon: "Workflow",
      title: "AI Workflow Automation",
      description: "Connect your tools and automate repetitive tasks and follow-ups.",
      href: SERVICE_WORKFLOW.path,
    },
    {
      icon: "MessagesSquare",
      title: "AI-Powered Customer Engagement",
      description: "Answer inquiries promptly, with people in charge when it matters.",
      href: SERVICE_ENGAGEMENT.path,
    },
    {
      icon: "Globe",
      title: "Website Development",
      description: "Modern websites built to turn visitors into inquiries.",
      href: SERVICE_WEBSITES.path,
    },
  ],
  all: { label: "See all services", href: "/#solutions" },
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
  { value: "website", label: "Website Development" },
  { value: "other", label: "Not sure yet" },
];

/* ---------------------------------------------------------------------------------------------
   About page (/about, owner instruction 2026-10-30). Biography is limited to brief A2: Kevin
   Pilgrim, founder, a software engineer with 30+ years of experience, and his career achievements,
   which are always framed as his career, never as KAP's history or client work. Recommendation
   excerpts are whole sentences, unedited, from the recommendations published on the previous site
   (brief A7; still to be checked against the LinkedIn originals, B4). No unsourced statistics.
   ------------------------------------------------------------------------------------------- */
export const ABOUT_PAGE = {
  path: "/about",
  meta: {
    title: "About",
    description:
      "KAP Enterprises helps small businesses use practical technology to improve operations, respond to customers and grow. It is led by founder Kevin Pilgrim, a software engineer with 30+ years of experience.",
  },
  hero: {
    eyebrow: "About KAP Enterprises",
    headlineLead: "Experienced technology.",
    headlineEmphasis: "Practical solutions.",
    subhead:
      "KAP Enterprises helps small businesses use practical technology to improve operations, respond to customers and grow, without unnecessary complexity.",
    secondaryCta: { label: "Meet the founder", href: "#founder" },
    map: {
      careerLabel: "Kevin's career",
      careerNote: "30+ years of software engineering",
      career: [
        { field: "Healthcare", detail: "Clinical data interfaces" },
        { field: "Payments", detail: "PCI-compliant integrations" },
        { field: "Manufacturing", detail: "Machine-control software" },
      ],
      hub: "KAP Enterprises",
      outcomesLabel: "Your business",
      outcomes: [
        { icon: "Workflow", text: "Busywork automated" },
        { icon: "MessagesSquare", text: "Inquiries answered promptly" },
        { icon: "Globe", text: "A website that works harder" },
      ] as { icon: ServiceIcon; text: string }[],
    },
    caption: "The experience behind KAP, applied to the everyday needs of a small business.",
  },
  why: {
    title: "Running a small business shouldn't mean running its software.",
    intro:
      "Nobody starts a business to copy details between apps, send the same reminders every week or answer the same questions late at night. But that is where many owners' hours go.",
    problems: [
      {
        icon: "ArrowLeftRight",
        title: "Disconnected systems",
        body: "Customer details in one app, invoices in another, the schedule in a third, and someone keeping them in step by hand.",
      },
      {
        icon: "Repeat",
        title: "Repetitive tasks",
        body: "The same data entry, reminders and follow-ups, done again every week.",
      },
      {
        icon: "Inbox",
        title: "Customer messages",
        body: "Inquiries arriving by email, form and message, each one waiting until someone has time.",
      },
    ] as { icon: ServiceIcon; title: string; body: string }[],
    missionLabel: "Our mission",
    mission:
      "To help small businesses put practical technology to work, so they spend less time on busywork, respond to customers sooner and grow sustainably.",
  },
  founder: {
    eyebrow: "Meet the founder",
    name: "Kevin Pilgrim",
    role: "Founder, KAP Enterprises",
    years: "30+",
    yearsLabel: "years of software engineering",
    paragraphs: [
      "KAP Enterprises is led by Kevin Pilgrim, a software engineer with more than 30 years of experience building systems that have to keep working, in healthcare, payments and manufacturing.",
      "That is where KAP's approach comes from. Systems that carry clinical data or process payments can't be fragile: they are planned around how the work really happens, tested before they go live and documented so others can follow them. KAP brings the same habits to the everyday systems a growing business depends on, at a scale that suits it.",
    ],
    careerLabel: "From Kevin's career",
    career: HOME_CREDIBILITY.career,
    careerNote: "Achievements from Kevin's engineering career, not KAP client projects.",
  },
  approach: {
    title: "How we approach the work.",
    intro: "Five habits that shape every project, whatever its size.",
    steps: [
      {
        title: "Understand your business first",
        body: "We start with how work actually moves through your business and what you want to change, before any technology comes up.",
      },
      {
        title: "Recommend what fits",
        body: "The right tool suits your budget, your team and the systems you already have. It isn't always the newest one.",
      },
      {
        title: "Build carefully",
        body: "Work is done in manageable steps, connecting to the tools and data you already rely on with care.",
      },
      {
        title: "Test thoroughly",
        body: "Workflows, pages and forms are tried with realistic examples before they go live.",
      },
      {
        title: "Make it understandable",
        body: "You'll know what was built, how it works and what to do when something needs to change.",
      },
    ],
  },
  services: {
    title: "What we help businesses do.",
    intro: "Three services, each with its own page.",
    items: [
      {
        icon: "Workflow",
        title: SERVICE_WORKFLOW.meta.title,
        headline: `${SERVICE_WORKFLOW.hero.headlineLead} ${SERVICE_WORKFLOW.hero.headlineEmphasis}`,
        description: "Connect the tools you already use and automate repetitive tasks, follow-ups and handoffs.",
        href: SERVICE_WORKFLOW.path,
      },
      {
        icon: "MessagesSquare",
        title: SERVICE_ENGAGEMENT.meta.title,
        headline: `${SERVICE_ENGAGEMENT.hero.headlineLead} ${SERVICE_ENGAGEMENT.hero.headlineEmphasis}`,
        description: "Help customers get answers sooner and reach the right person, even when your team is busy.",
        href: SERVICE_ENGAGEMENT.path,
      },
      {
        icon: "Globe",
        title: "Website Development",
        headline: `${SERVICE_WEBSITES.hero.headlineLead} ${SERVICE_WEBSITES.hero.headlineEmphasis}`,
        description: "Modern, mobile-friendly websites built to earn trust and turn visitors into inquiries.",
        href: SERVICE_WEBSITES.path,
      },
    ] as { icon: ServiceIcon; title: string; headline: string; description: string; href: string }[],
    others:
      "KAP also builds sales and marketing automations and custom software integrations. If you need something along those lines,",
    othersLink: { label: "tell us about it", href: "/contact" },
  },
  trust: {
    title: "In their words.",
    intro: "Excerpts from recommendations written by clients Kevin has worked with.",
    items: [
      {
        quote:
          "If you're looking for someone who not only delivers great technical work but also genuinely cares about your understanding and success, Kevin is your guy.",
        author: "Hunter O'Brien",
        role: "Creative Team Lead",
        company: "MemberUp",
        relationship: "Client, n8n automation project",
      },
      {
        quote: "By the end of our time together, I felt confident and equipped to build automations on my own.",
        author: "Peter Greco",
        role: "Agile Coach & Senior Product Manager",
        company: "Independent Consultant",
        relationship: "Client",
      },
      {
        quote:
          "Kevin has played a pivotal role in enhancing our digital presence and client engagement strategies.",
        author: "Chandra Wrightsell",
        role: "Global Strategy & Branding Executive",
        company: "JT Advisors Group LLC",
        relationship: "Client",
      },
    ] as Recommendation[],
  },
  closing: {
    title: "Let's talk about what your business needs.",
    body: "Tell us how things run today and where they get stuck. We'll help you work out what's worth improving first.",
    emailLead: "Prefer email?",
  },
};
