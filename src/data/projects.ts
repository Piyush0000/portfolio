// ============================================================
//  PROJECTS — single source of truth for every project card,
//  case-study page, immersive gallery panel and sitemap entry.
//
//  To add a project: append an object to `projects`. Nothing in
//  /components needs to change. Every claim here should be
//  verifiable from the repository it links to.
// ============================================================

export type Accent = "cyan" | "magenta" | "violet" | "lime";

export type Motif = "orbit" | "voice" | "candles" | "graph" | "grid";

export type RepoLink = {
  label: string;
  url: string;
  /** Private repos are shown as "private" instead of a dead link. */
  visibility: "public" | "private";
};

export type ExternalLink = { label: string; href: string };

export type StackGroup = { group: string; items: string[] };

export type Fact = { value: string; label: string };

export type Preview =
  | { kind: "generated"; motif: Motif }
  | { kind: "image"; src: string; alt: string };

export type CaseStudy = {
  leadership: string[];
  timeline: { date: string; title: string; body: string }[];
  surfaces: { name: string; audience: string; body: string; stack: string[] }[];
  storefront: { title: string; body: string; points: string[] };
  ai: { title: string; body: string; points: string[] };
  engineering: { title: string; points: string[] };
};

export type Project = {
  slug: string;
  title: string;
  /** Short label shown above the title. */
  kicker: string;
  pitch: string;
  tier: "flagship" | "featured" | "archive";
  year: string;
  status: string;
  role: string;
  problem: string;
  features: string[];
  stack: StackGroup[];
  architecture: { summary: string; points: string[] };
  repos: RepoLink[];
  links: ExternalLink[];
  facts: Fact[];
  accent: Accent;
  preview: Preview;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  // ─── FLAGSHIP ─────────────────────────────────────────────
  {
    slug: "orbit-360",
    title: "Orbit 360",
    kicker: "Flagship · Evoc Labs",
    pitch:
      "A multi-tenant commerce platform: brands launch a storefront on their own domain, then run orders, shipping, payments, ads and AI assistants from one dashboard.",
    tier: "flagship",
    year: "2026",
    status: "In production",
    role: "Co-founder / CTO. Engineering lead from the first commit",
    problem:
      "Small D2C brands in India stitch together a store builder, a courier aggregator, a payment gateway, an ads manager and WhatsApp tools, then reconcile data across all of them by hand. Orbit puts those workflows on one platform with one data model, so a merchant can go from sign-up to a live branded storefront and run daily operations in one place.",
    features: [
      "Multi-tenant storefronts on Orbit subdomains or a merchant's own domain, with domains provisioned automatically through the Cloudflare API",
      "Visual website editor with section-based layouts, theming and an AI store builder that drafts sections from a brief",
      "Catalog with variants and variant images, bundles, coupons, reviews, blogs and legal pages",
      "Order operations: returns and RTO analytics, COD remittance tracking and Shiprocket / iThink logistics",
      "PayU and cash-on-delivery checkout behind a pluggable payment-provider interface, with a merchant wallet for usage-based charges",
      "Meta and Google Ads: OAuth connection, campaign management and cached insights, with sync jobs on BullMQ",
      "Abandoned-cart recovery and order updates over WhatsApp",
      "Seller AI (analytics over the merchant's own data, also exposed over MCP) and Customer AI (a shopping assistant on the storefront)",
      "Separate admin console for brand onboarding, support tickets, credentials and platform analytics",
    ],
    stack: [
      { group: "Backend", items: ["Node.js", "Express 5", "PostgreSQL", "Prisma", "MongoDB", "Redis", "BullMQ", "WebSockets"] },
      { group: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
      { group: "AI", items: ["Groq (gpt-oss-120b)", "Mistral", "Tool calling", "SSE streaming", "MCP"] },
      { group: "Integrations", items: ["Cloudflare", "PayU", "Shiprocket", "iThink Logistics", "Meta Marketing API", "Google Ads", "WhatsApp (WAPI)"] },
      { group: "Ops", items: ["GitHub Actions", "PM2", "Nginx", "Linux VPS"] },
    ],
    architecture: {
      summary:
        "One Express API and one PostgreSQL schema serve three Next.js apps, a merchant dashboard, an admin console and a storefront that resolves the tenant from the request's hostname.",
      points: [
        "Tenant isolation by store: every storefront request resolves a store from its subdomain or custom domain, and CORS allows verified custom domains dynamically.",
        "66 Prisma models cover stores, catalog, orders, logistics, payments, wallets, ads caches, AI sessions and support. Migrations are applied in CI on every deploy.",
        "Slow third-party work (ad insights sync, order pushes) runs on BullMQ workers backed by Redis, not inside request handlers.",
        "AI features share one provider-agnostic LLM client (Groq or Mistral via an env flag). Assistant tools are read-only, store-scoped and validated, so the model can only see the authenticated merchant's data.",
      ],
    },
    repos: [
      { label: "Platform monorepo", url: "https://github.com/Piyush0000/orbit_software", visibility: "private" },
      { label: "Storefront", url: "https://github.com/miki-dev-5618/store", visibility: "public" },
    ],
    links: [{ label: "evoclabs.com", href: "https://www.evoclabs.com" }],
    facts: [
      { value: "4", label: "deployable apps" },
      { value: "66", label: "Prisma data models" },
      { value: "22", label: "contributors" },
      { value: "820+", label: "commits, ~280 mine" },
    ],
    accent: "cyan",
    preview: { kind: "generated", motif: "orbit" },
    caseStudy: {
      leadership: [
        "Started the repository in January 2026 and set the architecture: one API, one relational schema, separate apps per audience.",
        "Wrote the team's coding guidelines and review responsibilities, and merge feature branches from a team of 22 contributors after review.",
        "Main contributor to the shared Prisma schema, the merchant dashboard and the admin console.",
        "Made platform-level calls such as moving AI features to a single provider-agnostic client (Gemini → Mistral → Groq) and automating custom-domain provisioning.",
      ],
      timeline: [
        { date: "Jan 2026", title: "Hello, world", body: "First commit: the backend, merchant dashboard and storefront templates connected to one API." },
        { date: "Feb 2026", title: "Multi-category themes", body: "Moved storage to Supabase and Cloudinary and shipped 22 storefront themes across product categories." },
        { date: "Apr – Jun 2026", title: "Operations", body: "Voice-call scripts, Shiprocket logistics, PayU checkout, abandoned-cart recovery and first-party event tracking with Meta Pixel analytics." },
        { date: "Jul 2026", title: "Custom domains & growth", body: "Automated subdomain and custom-domain provisioning on Cloudflare, plus coupons, WhatsApp flows and Google Ads." },
        { date: "Aug 2026", title: "Scaling the team", body: "Wrote coding guidelines and review responsibilities as more contributors joined." },
        { date: "Sep – Oct 2026", title: "AI layer", body: "Seller AI and Customer AI assistants, product variants with images, payment-gateway settings and product reviews." },
      ],
      surfaces: [
        {
          name: "Merchant dashboard",
          audience: "Brands",
          body: "Catalog, orders, logistics, marketing, website editor, wallet and Seller AI.",
          stack: ["Next.js 16", "React 19", "shadcn/ui"],
        },
        {
          name: "Admin console",
          audience: "Evoc Labs team",
          body: "Brand onboarding, support tickets, merchant credentials and platform analytics.",
          stack: ["Next.js 16", "Prisma"],
        },
        {
          name: "Storefront",
          audience: "Shoppers",
          body: "One deployment serving every brand, themed per tenant, with PayU checkout and Customer AI.",
          stack: ["Next.js 16", "Prisma 7"],
        },
        {
          name: "API & workers",
          audience: "All three apps",
          body: "Express 5 API, BullMQ workers and WebSocket notifications on PostgreSQL and Redis.",
          stack: ["Express 5", "PostgreSQL", "Redis"],
        },
      ],
      storefront: {
        title: "The storefront: one codebase, every brand",
        body:
          "The storefront is a static shell that renders whichever brand owns the incoming hostname. It resolves the subdomain, fetches that store's catalog, theme, navigation, announcements and legal pages from the public storefront API, and renders them. A new brand needs no new deployment.",
        points: [
          "Hostname-based tenant resolution, with a local-dev override and a dedicated store-not-found route",
          "Hosted PayU redirect checkout; the store is resolved from the callback, so payments work on custom domains",
          "Catalogue, product, cart, wishlist, orders and policy pages driven entirely by API data",
          "Performance work: preloaded hero images, deferred slider scripts, tuned image qualities",
        ],
      },
      ai: {
        title: "AI that only sees what it should",
        body:
          "Both assistants use a tool-calling loop over a shared LLM client. The model never writes SQL. It picks from a small set of validated, read-only tools, and the server injects the merchant or store identity.",
        points: [
          "Seller AI: tools for sales summaries, recent orders, inventory, top products, customers and voice-call insights, with charts built only from verified tool results",
          "The same tool registry is served over stateless MCP JSON-RPC, so external agents get the same guarded access",
          "Customer AI: catalog search, product details, offers, shipping guidance and store knowledge, with citations and a per-store usage quota",
          "Responses stream over SSE, and every tool execution is persisted for audit",
        ],
      },
      engineering: {
        title: "Production engineering",
        points: [
          "Every merge to master runs a GitHub Actions deploy: sync, install, prisma migrate deploy, build all apps, then restart PM2. The deploy aborts on any failed step instead of restarting onto a stale build.",
          "Seller AI tests run the real handlers against mock Prisma and a mocked model client, with no network calls.",
          "Cloudflare-backed domain verification and provisioning for merchant custom domains.",
        ],
      },
    },
  },

  // ─── FEATURED ─────────────────────────────────────────────
  {
    slug: "dialyn",
    title: "Dialyn",
    kicker: "AI voice agent · API",
    pitch:
      "A real-time AI calling API for e-commerce. A store sends an order event and a natural-sounding voice agent calls the customer, records a structured outcome and posts it back to the store.",
    tier: "featured",
    year: "2026",
    status: "Beta",
    role: "Solo: design, backend, voice pipeline, dashboard and deployment",
    problem:
      "Indian e-commerce loses money on unverified cash-on-delivery orders, failed payments and missed deliveries. Calling every customer by hand doesn't scale, and generic voice bots don't return data a store's backend can act on.",
    features: [
      "Six order events (order confirmation, COD verification, payment success and failure, shipped, out for delivery), each with its own prompt, greeting and allowed outcomes",
      "Structured outcomes through a record_outcome tool. The agent states only the order facts it was sent and never promises changes",
      "Scheduler with per-merchant calling hours, time zones, retries on busy or no-answer, and concurrency limits",
      "Signed call.completed webhooks (HMAC-SHA256) with transcript, timeline and a stereo recording",
      "English and Hinglish (Sarvam Indian voices); per-merchant voice overrides, including consented ElevenLabs clones and recorded human greetings",
      "Shopify and WooCommerce webhooks trigger calls automatically, one call per order per event",
      "Twilio, Plivo and Exotel telephony, plus a browser WebRTC test call that needs no phone",
      "Multi-tenant merchant dashboard: API keys, team roles, analytics, call log and call detail",
    ],
    stack: [
      { group: "Voice & AI", items: ["Pipecat 1.11", "Deepgram STT/TTS", "Groq", "Sarvam", "ElevenLabs", "Cartesia", "Silero VAD"] },
      { group: "Backend", items: ["Python 3.12", "FastAPI", "SQLAlchemy (async)", "PostgreSQL", "SQLite"] },
      { group: "Telephony", items: ["Twilio", "Plivo", "Exotel", "WebRTC"] },
      { group: "Ops", items: ["Docker Compose", "PM2", "Nginx", "GitHub Actions", "pytest", "Ruff"] },
    ],
    architecture: {
      summary:
        "A FastAPI control plane (merchant API, scheduler, webhooks) dispatches calls into per-call Pipecat pipelines: VAD → STT → LLM with tools → TTS, streamed over telephony WebSockets or WebRTC.",
      points: [
        "Cascade pipeline by default, so every stage is swappable per merchant through config, including speech-to-text, LLM and text-to-speech providers.",
        "Call state lives in the database, not the worker, which keeps voice workers stateless.",
        "Idempotency keys on call creation and one-call-per-order-per-event on store webhooks prevent duplicate calls.",
        "51 pytest tests cover the API, merchant flows, platform integrations and WebRTC networking.",
      ],
    },
    repos: [{ label: "GitHub", url: "https://github.com/Piyush0000/Dialyn_ai_calling_assistant", visibility: "public" }],
    links: [],
    facts: [
      { value: "6", label: "order events" },
      { value: "3", label: "telephony providers" },
      { value: "2", label: "languages (EN, Hinglish)" },
      { value: "51", label: "automated tests" },
    ],
    accent: "magenta",
    preview: { kind: "generated", motif: "voice" },
  },
  {
    slug: "lr21",
    title: "LR21 · Elonix",
    kicker: "Web3 trading platform",
    pitch:
      "An automated crypto-futures trading platform: a web app, an Android app and a Python trading engine that trades users' Binance Futures accounts under strict risk limits.",
    tier: "featured",
    year: "2025 – 2026",
    status: "Live",
    role: "Full-stack developer: web, mobile, backend, trading bot and CI/CD",
    problem:
      "Retail traders want to automate futures trading without writing code or running servers, but they need guardrails (leverage caps, stop-losses, daily loss limits) and a clear view of what the bot is doing with their money.",
    features: [
      "Users connect a Binance Futures account and run the bot with scalping, short-term or swing strategies, each with its own take-profit, stop-loss and RSI thresholds",
      "Risk controls: isolated margin, per-trade size, max concurrent positions, cooldowns, daily loss limit and max drawdown",
      "Live P&L, positions and trade history in the web and mobile apps",
      "Subscription gating: the trading screen unlocks only with an active subscription, on both web and mobile",
      "Wallet connection on BNB Smart Chain, a token-swap contract with a platform fee, referrals and rewards",
      "Android app on Google Play, built with Expo",
    ],
    stack: [
      { group: "Frontend", items: ["Next.js 14", "React", "Tailwind CSS", "Radix UI", "Chart.js / Recharts"] },
      { group: "Mobile", items: ["React Native 0.81", "Expo 54", "Expo Router"] },
      { group: "Backend", items: ["Node.js", "Express 5", "MongoDB / Mongoose", "WebSockets", "Firebase Auth", "JWT"] },
      { group: "Trading & Web3", items: ["Python", "FastAPI", "python-binance (Futures)", "Solidity", "ethers.js", "BNB Smart Chain"] },
      { group: "Ops", items: ["GitHub Actions", "Docker", "PM2", "Nginx", "Linux VPS", "Vercel"] },
    ],
    architecture: {
      summary:
        "Three services: a Next.js web app on Vercel, an Express + MongoDB API with WebSocket token updates, and a FastAPI trading engine that talks only to Binance Futures. The web and Android apps share the same API.",
      points: [
        "The trading engine was refactored into config, client, signer (HMAC-SHA256), error-mapping, services and routes, with startup checks that the Binance environment matches the API keys.",
        "A dedicated mainnet/testnet switch blocks Spot endpoints whenever Futures mode is active.",
        "CI/CD pushes the API and trading bot to a VPS over SSH with a dedicated deploy key.",
      ],
    },
    repos: [{ label: "GitHub", url: "https://github.com/Piyush0000/blockchain_mining", visibility: "private" }],
    links: [
      { label: "lr21.org", href: "https://lr21.org" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.lr21.stormbot" },
    ],
    facts: [
      { value: "3", label: "trading strategies" },
      { value: "2", label: "Solidity contracts" },
      { value: "Web + Android", label: "clients" },
    ],
    accent: "lime",
    preview: { kind: "generated", motif: "candles" },
  },
  {
    slug: "researchmind",
    title: "ResearchMind",
    kicker: "Multi-agent AI system",
    pitch:
      "A LangGraph pipeline of four specialised agents that search the web, read sources, write a structured report and critique it, streaming each step live to the UI.",
    tier: "featured",
    year: "2026",
    status: "Prototype",
    role: "Solo: agent design, backend and frontend",
    problem:
      "One-shot LLM answers to research questions are unsourced and hard to trust. Splitting the work into search, reading, writing and review steps makes every stage inspectable and gives the final report an explicit quality score.",
    features: [
      "Search agent breaks the topic into sub-queries and gathers unique sources through Tavily",
      "Reader agent scrapes each source with BeautifulSoup and extracts relevant insights",
      "Writer agent turns the source notes into a structured Markdown report",
      "Critic agent scores the report from 0 to 10 with written feedback",
      "Live dashboard streams each agent's progress over Server-Sent Events",
    ],
    stack: [
      { group: "AI", items: ["LangGraph", "LangChain (LCEL)", "Mistral AI", "Tavily"] },
      { group: "Backend", items: ["Python", "FastAPI", "SSE", "BeautifulSoup", "Pydantic"] },
      { group: "Frontend", items: ["Next.js 14", "TypeScript"] },
    ],
    architecture: {
      summary:
        "A LangGraph StateGraph runs START → search → read → write → critique → END over a typed shared state. Each node emits progress events that FastAPI streams to the browser.",
      points: [
        "Shared ResearchState (topic, sources, summaries, report, critique, events) is the only contract between agents.",
        "The pipeline runs off the event loop and its events are bridged into an SSE generator, so the UI updates as each agent finishes.",
      ],
    },
    repos: [{ label: "GitHub", url: "https://github.com/Piyush0000/multi-agent-ai-research-agent-", visibility: "public" }],
    links: [],
    facts: [
      { value: "4", label: "agents" },
      { value: "0–10", label: "critic score" },
    ],
    accent: "violet",
    preview: { kind: "generated", motif: "graph" },
  },

  // ─── ARCHIVE (earlier work) ───────────────────────────────
  {
    slug: "ridebuddy",
    title: "RideBuddy Cabs",
    kicker: "Real-time web app",
    pitch: "Students share cab rides, form travel groups and coordinate in real-time chat.",
    tier: "archive",
    year: "2024",
    status: "Archived",
    role: "Full-stack developer",
    problem: "Students travelling the same way pay for separate cabs because they can't easily find each other.",
    features: ["Ride groups", "Real-time chat"],
    stack: [{ group: "Stack", items: ["React", "Node.js", "Express", "MongoDB", "Socket.io"] }],
    architecture: { summary: "MERN app with Socket.io for real-time group chat.", points: [] },
    repos: [{ label: "GitHub", url: "https://github.com/Piyush0000/carPool", visibility: "public" }],
    links: [],
    facts: [],
    accent: "cyan",
    preview: { kind: "generated", motif: "grid" },
  },
  {
    slug: "revivewheels",
    title: "ReviveWheels",
    kicker: "Marketplace",
    pitch: "Vehicle recycling, EV conversion services and a spare-parts marketplace with UPI payments.",
    tier: "archive",
    year: "2024",
    status: "Archived",
    role: "Full-stack developer",
    problem: "Vehicle recycling and EV-conversion services are fragmented and hard to book online.",
    features: ["Spare-parts marketplace", "UPI payments"],
    stack: [{ group: "Stack", items: ["MongoDB", "Express", "React", "Node.js", "UPI"] }],
    architecture: { summary: "MERN marketplace with UPI payment integration.", points: [] },
    repos: [{ label: "GitHub", url: "https://github.com/Piyush0000/Revive_Wheels", visibility: "public" }],
    links: [],
    facts: [],
    accent: "lime",
    preview: { kind: "image", src: "/revive.png", alt: "ReviveWheels home page" },
  },
  {
    slug: "lt-fault-detector",
    title: "LT Line Fault Detector",
    kicker: "ML + monitoring",
    pitch: "Real-time monitoring and alerts for low-tension power lines, with a predictive fire-hazard model.",
    tier: "archive",
    year: "2024",
    status: "Hackathon",
    role: "ML and full-stack developer",
    problem: "Faults on low-tension lines are often found only after they cause outages or fires.",
    features: ["Fault monitoring", "Fire-hazard prediction", "Automated alerts"],
    stack: [{ group: "Stack", items: ["Python", "Machine Learning", "React", "Node.js", "MongoDB"] }],
    architecture: { summary: "Python ML model behind a MERN monitoring dashboard.", points: [] },
    repos: [{ label: "GitHub", url: "https://github.com/Piyush0000/lt_fault_detection", visibility: "public" }],
    links: [],
    facts: [],
    accent: "magenta",
    preview: { kind: "generated", motif: "grid" },
  },
  {
    slug: "churn-predictor",
    title: "Customer Churn Predictor",
    kicker: "Deep learning",
    pitch: "An artificial neural network that predicts customer churn from interaction metrics.",
    tier: "archive",
    year: "2024",
    status: "Archived",
    role: "ML engineer",
    problem: "Teams find out a customer is leaving only after they've left.",
    features: ["ANN classifier", "Feature preprocessing pipeline"],
    stack: [{ group: "Stack", items: ["Python", "TensorFlow", "Keras", "Scikit-learn", "Pandas"] }],
    architecture: { summary: "Keras ANN trained on preprocessed tabular features.", points: [] },
    repos: [{ label: "GitHub", url: "https://github.com/Piyush0000/customer_chrun_using_ann", visibility: "public" }],
    links: [],
    facts: [],
    accent: "violet",
    preview: { kind: "generated", motif: "graph" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const flagship = projects.find((p) => p.tier === "flagship")!;
export const featured = projects.filter((p) => p.tier === "featured");
export const archive = projects.filter((p) => p.tier === "archive");
