export const venturesData = [
  {
    id: "loop-id",
    code: "VENTURE-01",
    name: "Loop ID",
    tagline: "Digital Student Identity Engine",
    category: "Identity & Security",
    status: "ACTIVE_BUILD",
    statusLabel: "Active Build",
    statusBadgeColor: "blue",
    phase: "Phase 2: Hardware Keystore Integration",
    shortDescription: "OS-level biometric digital student identity replacing physical campus IDs with encrypted key storage.",
    fullDescription: "Loop ID establishes a cryptographic student identity bound to the user's mobile device hardware. Built using OS-level biometric auth and secure enclave key storage, it ensures student credentials cannot be spoofed, shared, or visually forged.",
    problemStatement: "Legacy campus physical IDs are easily lost, shared for attendance fraud, and disconnected from digital campus services. Digital alternatives often rely on unsafe static QR codes.",
    solutionBlueprint: "Hardware-backed asymmetric key pairs generated inside device secure enclaves, signed by campus authority, verified via low-latency offline backend validation.",
    learningFocus: [
      "Golang microservices for low-latency identity validation",
      "Flutter integration with iOS Secure Enclave / Android Keystore",
      "Asymmetric cryptography & token rotation mechanisms"
    ],
    techStack: ["Golang", "Flutter", "PostgreSQL", "Redis", "Secure Enclave"],
    metrics: {
      latency: "< 85ms",
      verificationSpeed: "Instant",
      securityModel: "Hardware-Bound"
    },
    pitchHighlights: [
      "Zero plain-text storage of student credentials",
      "Offline-capable cryptographic verification for gate scanners",
      "Unified single sign-on across all UNFOUNDED campus services"
    ],
    github: null,
    buildLogCount: 14,
    lastUpdated: "2026-08-05"
  },
  {
    id: "loop-pay",
    code: "VENTURE-02",
    name: "Loop Pay",
    tagline: "Event-Driven Campus UPI Payments",
    category: "Fintech & UPI",
    status: "PROTOTYPE",
    statusLabel: "Prototype / Testing",
    statusBadgeColor: "amber",
    phase: "Phase 3: Async Event Queueing",
    shortDescription: "Ultra-fast, asynchronous UPI payment coordinator built specifically for high-density campus micro-transactions.",
    fullDescription: "Loop Pay decouples payment user experience from synchronous gateway delays. By leveraging event-driven architecture and webhooks, students experience immediate UI responsiveness while backend settlement runs asynchronously.",
    problemStatement: "Traditional payment SDKs cause UI freezes on weak campus Wi-Fi networks and fail during peak lunch hour transaction floods.",
    solutionBlueprint: "Async event queue architecture using Go channels and Redis streams, paired with idempotent backend payment state reconciliation.",
    learningFocus: [
      "Event-driven architecture in Go",
      "Razorpay / UPI webhook idempotency handling",
      "Optimistic UI updates backed by server confirmation"
    ],
    techStack: ["Golang", "UPI API", "Redis Streams", "PostgreSQL", "Flutter"],
    metrics: {
      targetTPS: "500+ TPS",
      uiResponse: "Immediate (Optimistic)",
      reconciliationRate: "99.99%"
    },
    pitchHighlights: [
      "Eliminates client-side payment state manipulation",
      "Built for high-volume, low-ticket transactions (canteen, bookstore)",
      "Automated vendor settlement ledger"
    ],
    github: null,
    buildLogCount: 19,
    lastUpdated: "2026-08-08"
  },
  {
    id: "campus-loop",
    code: "VENTURE-03",
    name: "Campus Loop",
    tagline: "Student ERP Data Coordinator",
    category: "Marketplace & ERP",
    status: "PILOT_DEPLOYMENT",
    statusLabel: "Pilot Deployment",
    statusBadgeColor: "emerald",
    phase: "Phase 4: Multi-Campus Adapter",
    shortDescription: "Clean, lightning-fast mobile API layer abstracting complex legacy university ERP databases.",
    fullDescription: "Campus Loop acts as an isolation barrier between clunky enterprise ERP software and the student mobile experience. It ingests timetables, attendance, and exam results into a high-speed cached data layer.",
    problemStatement: "University ERP systems suffer from horrible mobile UX, constant downtime during exam registration, and slow database queries.",
    solutionBlueprint: "Go worker services running background sync jobs into Supabase / PostgreSQL with Redis caching for sub-10ms timetable reads.",
    learningFocus: [
      "Data parsing & scraping resilient adapters",
      "High-throughput caching strategies with Redis",
      "Database schema normalization for legacy ERP tables"
    ],
    techStack: ["Golang", "Supabase", "PostgreSQL", "Redis", "REST/gRPC"],
    metrics: {
      activeStudents: "1,200+ Pilot Users",
      avgQueryTime: "12ms",
      uptime: "99.9%"
    },
    pitchHighlights: [
      "Students access schedules in 1 click instead of 5-minute ERP logins",
      "Zero load strain on central university servers",
      "Modular adapter system for rapidly onboarding new campuses"
    ],
    github: null,
    buildLogCount: 22,
    lastUpdated: "2026-08-07"
  },
  {
    id: "loop-shop",
    code: "VENTURE-04",
    name: "Loop Shop",
    tagline: "Campus Hyper-Local Marketplace",
    category: "Marketplace & ERP",
    status: "VALIDATION",
    statusLabel: "User Validation",
    statusBadgeColor: "purple",
    phase: "Phase 1: Vendor Onboarding & MVP Specs",
    shortDescription: "Peer-to-peer student marketplace and merchant ordering engine with instant on-campus pickup.",
    fullDescription: "Loop Shop connects student creators, campus vendors, and peer-to-peer commerce into a trusted, closed-loop marketplace powered by Loop ID and Loop Pay.",
    problemStatement: "Student entrepreneurs lack a dedicated venue to sell course notes, lab equipment, and handmade merchandise without paying high platform fees.",
    solutionBlueprint: "Simplified listing workflow with verified seller badges (Loop ID) and automated buyer escrow protection.",
    learningFocus: [
      "Multi-tenant marketplace architecture",
      "State machines for order fulfillment",
      "Product discovery & search indexing"
    ],
    techStack: ["Golang", "PostgreSQL", "Flutter", "Tailwind CSS"],
    metrics: {
      validationInterviews: "45 Founders",
      targetMerchants: "30 Campus Vendors",
      takeFeeModel: "Zero student fee"
    },
    pitchHighlights: [
      "Closed-loop trust backed by verified student identity",
      "Integrated instant campus delivery network run by students",
      "Seamless Loop Pay cash-out"
    ],
    github: null,
    buildLogCount: 8,
    lastUpdated: "2026-08-02"
  },
  {
    id: "loop-learn",
    code: "VENTURE-05",
    name: "Loop Learn",
    tagline: "AI Learning Orchestration Layer",
    category: "AI & Memory",
    status: "IDEATION",
    statusLabel: "Ideation & Spec Drafting",
    statusBadgeColor: "amber",
    phase: "Phase 1: Controlled Orchestration Specs",
    shortDescription: "Context-aware AI study assistant orchestrating course materials, syllabus specs, and personal study logs.",
    fullDescription: "Loop Learn sits alongside student course loads to generate personalized review plans, practice problem sets, and instant conceptual explanations—routed safely through backend orchestration.",
    problemStatement: "Generic AI chatbots lack context on specific university course syllabi, resulting in vague or inaccurate exam prep.",
    solutionBlueprint: "Controlled backend RAG pipeline indexing professor slides and course specs, serving tailored answers through client proxy.",
    learningFocus: [
      "Vector embeddings & retrieval-augmented generation (RAG)",
      "Controlled backend AI gateway design (no raw client keys)",
      "Prompt engineering for academic problem solving"
    ],
    techStack: ["Golang", "Python (AI Pipeline)", "PostgreSQL/pgvector", "OpenAI/Gemini APIs"],
    metrics: {
      indexedCourses: "12 Engineering Modules",
      ragAccuracyRate: "94%",
      latencyTarget: "< 350ms"
    },
    pitchHighlights: [
      "No client-side API key exposure or prompt leaks",
      "Direct integration with student's Campus Loop schedule",
      "Adaptive study flashcards based on historical exam patterns"
    ],
    github: null,
    buildLogCount: 6,
    lastUpdated: "2026-07-29"
  },
  {
    id: "loop-memory",
    code: "VENTURE-06",
    name: "Loop Memory",
    tagline: "Student + AI Context & Memory Layer",
    category: "AI & Memory",
    status: "IDEATION",
    statusLabel: "Architectural Planning",
    statusBadgeColor: "slate",
    phase: "Phase 0: Schema & Security Design",
    shortDescription: "Long-term encrypted context vault preserving student project history, skill milestones, and AI memory.",
    fullDescription: "Loop Memory acts as the persistent context backbone across the entire ecosystem. It securely remembers student preferences, learning speed, and project achievements over their 4-year degree.",
    problemStatement: "Student learning data gets wiped clean every semester, losing valuable insights into career progression and technical mastery.",
    solutionBlueprint: "Client-side encrypted memory graph with server-enforced access boundaries and explicit user deletion controls.",
    learningFocus: [
      "Data lifecycle & security at rest (AES-GCM encryption)",
      "Graph data structures for skill tree mapping",
      "Privacy-first memory retention policies"
    ],
    techStack: ["Golang", "PostgreSQL", "Redis", "Crypto Enclave"],
    metrics: {
      encryptionStandard: "AES-256-GCM",
      dataRetention: "Full 4-Year Journey",
      userControl: "1-Click Purge"
    },
    pitchHighlights: [
      "Student retains total ownership of their behavioral memory graph",
      "Powering personalized venture builder recommendations",
      "Strict data isolation and zero plain-text leaks"
    ],
    github: null,
    buildLogCount: 4,
    lastUpdated: "2026-07-25"
  }
];

export const studioStats = {
  totalVentures: 6,
  activeBuilds: 3,
  codeLinesWritten: "48,500+",
  totalBuildLogs: 73,
  learningHours: "950+ hrs",
  campusPilots: 2
};
