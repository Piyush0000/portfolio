// ============================================================
//  SITE CONTENT — identity, journey, experience, skills.
//  Projects live in ./projects.ts.
// ============================================================

export const site = {
  name: "Piyush Rathore",
  shortName: "Piyush",
  role: "Full-Stack & AI Engineer",
  headline: "I build production systems where backend, AI and product meet.",
  intro:
    "Co-founder / CTO at Evoc Labs, leading Orbit 360 from its first commit to a multi-tenant commerce platform running in production. I work across Node.js and Python backends, real-time LLM and voice agents, and the Next.js interfaces on top.",
  location: "Delhi, India",
  email: "rathorepiyush0000@gmail.com",
  github: "https://github.com/Piyush0000",
  githubUser: "Piyush0000",
  linkedin: "https://www.linkedin.com/in/piyussshhh/",
  resumeUrl: "/final-resume.pdf",
  avatarUrl: "/pic.jpg",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://piyushrathore.dev",
  openTo: "full-stack, backend and AI/LLM engineering roles",
};

export const roles = ["Backend Engineer", "AI / LLM Engineer", "Full-Stack Developer", "Engineering Lead"];

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export const about = {
  paragraphs: [
    "I'm a Computer Science (AI/ML) undergraduate at MAIT, Delhi, but most of what I know comes from shipping. I started with freelance MERN builds and internships, then moved toward the parts of software I enjoy most: backend architecture, data models, integrations and AI that has to work on real traffic.",
    "Today I co-lead engineering at Evoc Labs, where I took Orbit 360 from an empty repository to a platform with a merchant dashboard, admin console, storefront and API, built with a team of more than twenty contributors. Alongside it I build voice and multi-agent AI systems in Python.",
  ],
  achievements: [
    "Top 10, national-level hackathon",
    "Top 4, college-level competition",
    "Open source: Social Winter of Code, IWOC Season 3",
    "Member, Venture Lab",
  ],
};

export type JourneyStep = { year: string; title: string; body: string };

// Each step is backed by the experience list or repository history.
export const journey: JourneyStep[] = [
  {
    year: "2024",
    title: "Started building for real users",
    body: "Began B.Tech CSE (AI/ML) and joined Thebookshelves as a full-stack intern, shipping React, Node.js and MongoDB features.",
  },
  {
    year: "2025",
    title: "Went deeper on data and backends",
    body: "Database internship at Analyzing.in on schema design, indexing and query tuning, then backend and frontend work at Oriental Solutions.",
  },
  {
    year: "Dec 2025",
    title: "Co-founded Evoc Labs",
    body: "Took on the CTO role: technical strategy, architecture and delivery for the company's products.",
  },
  {
    year: "Jan 2026",
    title: "First commit on Orbit 360",
    body: "Started the platform from scratch and grew it into four deployable apps backed by a 66-model PostgreSQL schema.",
  },
  {
    year: "2026",
    title: "AI in production",
    body: "Led the tool-calling AI assistants in Orbit, built Dialyn (a real-time voice calling API) and a LangGraph multi-agent research system.",
  },
];

export type Experience = {
  title: string;
  company: string;
  period: string;
  type: "Leadership" | "Internship" | "Achievement";
  summary: string;
  bullets: string[];
  stack?: string[];
};

export const experience: Experience[] = [
  {
    title: "Co-founder / CTO",
    company: "Evoc Labs",
    period: "Dec 2025 – Present",
    type: "Leadership",
    summary:
      "Leading engineering for Orbit 360, the company's multi-tenant commerce platform, from its first commit to production.",
    bullets: [
      "Own the architecture across the Express API, three Next.js apps, a 66-model PostgreSQL/Prisma schema and Redis/BullMQ queues, shipped by a CI/CD pipeline that deploys on every merge to master.",
      "Lead a codebase with 22 contributors: wrote the coding guidelines and review responsibilities, review and merge pull requests, and authored ~280 of its 820+ commits.",
      "Main author of the Prisma schema, merchant dashboard and admin console; built the shared Groq/Mistral LLM client and the Cloudflare domain-provisioning service.",
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Next.js", "PM2"],
  },
  {
    title: "Web Development Intern",
    company: "Delhi School of Management",
    period: "Feb 2026 – Mar 2026",
    type: "Internship",
    summary: "Built and optimized web modules for departmental workflows.",
    bullets: [
      "Developed and optimized web solutions for departmental workflows.",
      "Worked with project leads to design and build responsive portal modules.",
    ],
  },
  {
    title: "Software Developer Intern",
    company: "Oriental Solutions Pvt Ltd",
    period: "Dec 2025 – Jan 2026",
    type: "Internship",
    summary: "Frontend and backend features for client software.",
    bullets: [
      "Implemented frontend and backend features for client software solutions.",
      "Refined requirements, tested functionality and supported deployments with the team.",
    ],
  },
  {
    title: "Database Developer Intern",
    company: "Analyzing.in",
    period: "May 2025 – Aug 2025",
    type: "Internship",
    summary: "Schema design, query tuning and indexing.",
    bullets: [
      "Designed and optimized database structures for application performance.",
      "Wrote complex queries, stored procedures and triggers; applied normalization and indexing strategies.",
    ],
  },
  {
    title: "Full Stack Web Developer Intern",
    company: "Thebookshelves",
    period: "Aug 2024 – Oct 2025",
    type: "Internship",
    summary: "React, Node.js, Express and MongoDB web apps.",
    bullets: [
      "Developed and maintained responsive web apps with React.js, Node.js, Express and MongoDB.",
      "Designed REST APIs and optimized database queries to cut load times.",
    ],
  },
];

export type SkillGroup = {
  id: "backend" | "ai" | "frontend" | "devops";
  name: string;
  blurb: string;
  accent: "cyan" | "magenta" | "violet" | "lime";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    name: "Backend",
    blurb: "APIs, data models, queues and integrations.",
    accent: "cyan",
    items: ["Node.js", "Express", "FastAPI", "Python", "TypeScript", "PostgreSQL", "Prisma", "MongoDB", "Redis", "BullMQ", "WebSockets", "SQLAlchemy", "REST & Webhooks", "Java (DSA)"],
  },
  {
    id: "ai",
    name: "AI / LLM",
    blurb: "Agents, tool calling, voice and retrieval.",
    accent: "magenta",
    items: ["LangGraph", "LangChain", "Tool / function calling", "MCP", "Pipecat (voice)", "Groq", "Mistral", "Deepgram", "RAG", "ChromaDB", "FAISS", "TensorFlow", "Scikit-learn", "OpenCV"],
  },
  {
    id: "frontend",
    name: "Frontend",
    blurb: "Product interfaces people actually use.",
    accent: "violet",
    items: ["React", "Next.js", "React Native", "Expo", "Tailwind CSS", "Framer Motion", "Three.js", "shadcn/ui"],
  },
  {
    id: "devops",
    name: "DevOps & Cloud",
    blurb: "Shipping it and keeping it running.",
    accent: "lime",
    items: ["GitHub Actions", "Docker", "PM2", "Nginx", "Linux VPS", "Cloudflare", "Vercel", "Supabase", "GCP", "Firebase"],
  },
];

export const education = {
  institution: "Maharaja Agrasen Institute of Technology (MAIT)",
  degree: "B.Tech, Computer Science & Engineering (AI/ML)",
  period: "2024 – 2028",
  location: "Delhi, India",
};
