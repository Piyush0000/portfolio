// ============================================================
//  PORTFOLIO DATA — update this file to change site content
// ============================================================

export const siteConfig = {
  name: "Piyush Rathore",
  title: "AI/ML Engineer & Full Stack Developer",
  tagline: "Crafting intelligent systems at the intersection of AI and full-stack engineering.",
  location: "Delhi, India",
  email: "rathorepiyush0000@gmail.com",
  github: "https://github.com/Piyush0000",
  linkedin: "https://www.linkedin.com/in/piyussshhh/",
  resumeUrl: "/final-resume.pdf",
  avatarUrl: "/pic.jpg",
};

export const aboutBio = [
  "I build intelligent, impact-focused products at the intersection of full-stack engineering and applied AI. Grounded in Computer Science & AIML, I bring a pragmatic, experiment-first mindset to shipping reliable systems.",
  "Whether launching production web platforms or deploying ML models that solve real problems, I thrive on building things that matter — fast, clean, and at scale. 🚀",
];

export const stats = [
  { label: "Projects Built", value: "20+" },
  { label: "Hackathon Rank", value: "TOP 4" },
  { label: "ML Accuracy", value: "85%" },
  { label: "Cups of Coffee", value: "∞" },
];

export const achievements = [
  "💼 Shipped multiple freelance projects within deadlines",
  "🏆 Top 10 position in National Hackathon",
  "🥉 Top 4 position in College-level Competition",
  "👨‍💻 Member of Venture Lab",
  "🌟 Open Source Contributor — Social Winter of Code",
  "🚀 Open Source Contributor — IWOC Season 3",
  "🤝 Active Member of National Service Scheme (NSS)",
];

// ─── SKILLS ─────────────────────────────────────────────────
export const skillCategories = [
  {
    name: "Languages",
    emoji: "💻",
    color: "from-violet-500 to-indigo-400",
    glow: "rgba(139,92,246,0.4)",
    items: ["Python", "JavaScript", "TypeScript", "Java (DSA)", "C", "SQL"],
  },
  {
    name: "Frameworks",
    emoji: "⚡",
    color: "from-fuchsia-500 to-violet-400",
    glow: "rgba(217,70,239,0.4)",
    items: ["React.js", "Next.js", "Node.js", "Express.js", "Django", "React Native", "Expo"],
  },
  {
    name: "Databases & Tools",
    emoji: "🗄️",
    color: "from-indigo-500 to-cyan-400",
    glow: "rgba(99,102,241,0.4)",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Supabase", "Redis", "Prisma ORM", "Git", "GCP"],
  },
  {
    name: "AI / ML",
    emoji: "🤖",
    color: "from-cyan-500 to-violet-400",
    glow: "rgba(34,211,238,0.4)",
    items: [
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "OpenCV",
      "Pandas",
      "NumPy",
      "LangChain",
      "RAG",
      "ChromaDB",
      "FAISS",
      "LLM Fine-Tuning",
    ],
  },
];

// ─── EXPERIENCE ──────────────────────────────────────────────
export const experiences = [
  {
    emoji: "🚀",
    title: "Co-founder / CTO",
    company: "Evoc Labs",
    duration: "Dec 2025 – Present",
    type: "Full-time",
    bullets: [
      "Leading technical strategy and product architecture, driving innovation across all software efforts.",
      "Managing engineering initiatives, mentoring team members, and overseeing product delivery timelines.",
      "Building and launching MVP features while aligning tech decisions with business goals.",
    ],
  },
  {
    emoji: "💼",
    title: "Web Development Intern",
    company: "Delhi School Of Management",
    duration: "Feb 2026 – Mar 2026",
    type: "Internship",
    bullets: [
      "Developed and optimized web solutions for departmental workflows.",
      "Collaborated with project leads to design and build responsive portal modules.",
    ],
  },
  {
    emoji: "💼",
    title: "Software Developer Intern",
    company: "Oriental Solutions Pvt Ltd",
    duration: "Dec 2025 – Jan 2026",
    type: "Internship",
    bullets: [
      "Contributed to frontend and backend feature implementation for client software solutions.",
      "Collaborated with team to refine requirements, test functionality, and support deployments.",
      "Gained practical experience building scalable applications and troubleshooting real-world issues.",
    ],
  },
  {
    emoji: "🛠",
    title: "Full Stack Web Developer Intern",
    company: "Thebookshelves",
    duration: "Aug 2024 – Oct 2025",
    type: "Internship",
    bullets: [
      "Developed and maintained responsive web apps using React.js, Node.js, Express, and MongoDB.",
      "Designed and implemented RESTful APIs, ensuring seamless frontend–backend integration.",
      "Optimized DB queries and workflows, reducing load times and improving scalability.",
    ],
  },
  {
    emoji: "🗄️",
    title: "Database Developer Intern",
    company: "Analyzing.in",
    duration: "May 2025 – Aug 2025",
    type: "Internship",
    bullets: [
      "Designed and optimized database structures for enhanced application performance.",
      "Developed complex queries, stored procedures, and triggers for efficient data processing.",
      "Implemented normalization and indexing strategies for improved scalability.",
    ],
  },
  {
    emoji: "🏆",
    title: "Hackathon Achievements",
    company: "Multiple National Events",
    duration: "2024 – 2025",
    type: "Achievement",
    bullets: [
      "Secured Top 10 position in national-level hackathon.",
      "Achieved Top 4 position, demonstrating rapid prototyping skills.",
      "Built innovative solutions across healthcare, legal tech, and sustainability domains.",
    ],
  },
];

// ─── PROJECTS ────────────────────────────────────────────────
export const projects = [
  {
    title: "📈 Crypto Trading Bot & Mobile App",
    description:
      "A high-performance automated trading platform and mobile application enabling users to execute real-time algorithmic cryptocurrency trades with low latency.",
    tech: ["React Native", "Node.js", "Express", "MongoDB", "Redis", "Binance API"],
    github: "",
    demo: "https://lr21.org",
    featured: true,
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop",
  },
  {
    title: "🚀 Orbit 360 (SaaS)",
    description:
      "A comprehensive enterprise SaaS application developed for Evoc Labs to streamline operational efficiency, user analytics, and database scaling.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Redis", "Prisma", "PostgreSQL", "GCP"],
    github: "",
    demo: "https://app.evoclabs.com",
    featured: true,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
  },
  {
    title: "🚗 RideBuddy Cabs",
    description:
      "A web application designed for students to share cab rides, coordinate travel groups, and communicate in real-time through an integrated chat platform.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    github: "https://github.com/Piyush0000/carPool",
    demo: "",
    featured: true,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop",
  },
  {
    title: "📊 Customer Churn Predictor",
    description:
      "Deep learning model utilizing Artificial Neural Networks (ANN) to analyze client interaction metrics and accurately forecast customer churn risk.",
    tech: ["Python", "TensorFlow", "Keras", "Scikit-Learn", "Pandas"],
    github: "https://github.com/Piyush0000/customer_chrun_using_ann",
    demo: "",
    featured: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "♻️ ReviveWheels",
    description:
      "Platform for vehicle recycling, EV conversion services, and spare parts marketplace with integrated UPI payments and a full MERN stack backend.",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "UPI Integration"],
    github: "https://github.com/Piyush0000/Revive_Wheels",
    demo: "",
    featured: false,
    image: "/revive.png",
  },
  {
    title: "⚡ LT Line Fault Detector",
    description:
      "A real-time monitoring and safety system designed for low tension power lines, incorporating predictive fire hazard algorithms and automated alerts.",
    tech: ["Python", "Machine Learning", "React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/Piyush0000/lt_fault_detection",
    demo: "",
    featured: false,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop",
  },
];

// ─── EDUCATION ───────────────────────────────────────────────
export const education = {
  institution: "Maharaja Agrasen Institute of Technology (MAIT)",
  location: "Delhi, India",
  degree: "B.Tech — Computer Science & Engineering (AI/ML Specialization)",
  duration: "2024 – 2028",
  cgpa: "7.5",
  highlights: [],
};

// ─── NAV LINKS ───────────────────────────────────────────────
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
