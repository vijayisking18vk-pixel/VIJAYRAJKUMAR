import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const templateHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(templateHtmlPath)) {
  console.error('Error: dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templateHtmlPath, 'utf8');

const routes = [
  {
    path: 'about',
    title: 'About Vijayrajkumar | Chief Operating Officer & Venture Builder in Chennai',
    description: 'Learn about Vijayrajkumar, Chief Operating Officer and co-founder at Unfounded, Ziggers, and LoopMemory. Background in Defence and Strategic Studies (SRMIST) and Hindi Literature.',
    canonical: 'https://www.vijayrajkumar.in/about/',
    heading: 'About Vijayrajkumar',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Vijayrajkumar | Chief Operating Officer & Venture Builder in Chennai",
      "url": "https://www.vijayrajkumar.in/about/",
      "mainEntity": {
        "@type": "Person",
        "name": "Vijayrajkumar",
        "alternateName": "Vijayrajkumar R",
        "jobTitle": "Chief Operating Officer and Co-Founder",
        "worksFor": [
          { "@type": "Organization", "name": "Unfounded", "url": "https://www.unfounded.in/" },
          { "@type": "Organization", "name": "Ziggers", "url": "https://www.ziggers.in/" },
          { "@type": "Organization", "name": "LoopMemory", "url": "https://www.loopmemory.in/" }
        ]
      }
    }),
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-12 font-sans">
        <nav class="text-xs text-neutral-500 mb-6"><a href="/">Home</a> / <span>About</span></nav>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">Vijayrajkumar — Background &amp; Strategic Journey</h1>
        <p class="text-lg text-neutral-600 leading-relaxed">Based on-site in Chennai, Tamil Nadu. Building marketplaces and AI cognitive infrastructure as Chief Operating Officer &amp; Co-founder at Unfounded, Ziggers, and LoopMemory.</p>
        
        <section class="space-y-4 pt-6 border-t border-neutral-200">
          <h2 class="text-2xl font-bold text-neutral-950">About Me &amp; Philosophy</h2>
          <p class="text-neutral-700 leading-relaxed">I am a venture builder based on-site in Chennai, Tamil Nadu. My work sits at the intersection of product architecture, operational execution, and go-to-market distribution.</p>
          <p class="text-neutral-700 leading-relaxed">Rather than approaching venture building as purely software engineering, I treat it as strategic system design. My background spans literature, geopolitics, and defence strategy — fields that study how incentives, communications, and power dynamics govern human systems at scale.</p>
        </section>

        <section class="space-y-6 pt-6 border-t border-neutral-200">
          <h2 class="text-2xl font-bold text-neutral-950">Academic Credentials</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
              <span class="text-xs text-neutral-500 font-medium">Apr 2023 – Apr 2026</span>
              <h3 class="text-lg font-bold text-neutral-950 mt-1">B.Sc. in Defence &amp; Strategic Studies</h3>
              <p class="text-xs text-neutral-600 font-semibold">SRM Institute of Science and Technology (SRMIST)</p>
              <p class="text-sm text-neutral-600 mt-2">Rigorous study of international security, geopolitics, grand strategy, conflict resolution, and global economic dependencies.</p>
            </div>
            <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
              <span class="text-xs text-neutral-500 font-medium">Dec 2016 – Jan 2021</span>
              <h3 class="text-lg font-bold text-neutral-950 mt-1">Master of Arts (MA) in Hindi Literature</h3>
              <p class="text-xs text-neutral-600 font-semibold">Dakshina Bharat Hindi Prachar Sabha</p>
              <p class="text-sm text-neutral-600 mt-2">Linguistic structures, literary history, dialectic analysis, and cross-cultural communication strategy across India.</p>
            </div>
          </div>
        </section>

        <section class="space-y-4 pt-6 border-t border-neutral-200">
          <h2 class="text-2xl font-bold text-neutral-950">Active Co-Founder Roles</h2>
          <ul class="space-y-3">
            <li><a href="/ventures/ziggers/" class="font-bold underline text-neutral-950">Ziggers</a> — Local Gig-Economy Marketplace (COO &amp; Co-Founder)</li>
            <li><a href="/ventures/loopmemory/" class="font-bold underline text-neutral-950">LoopMemory</a> — AI Context &amp; Memory Infrastructure (COO &amp; Co-Founder)</li>
            <li><a href="/about/" class="font-bold underline text-neutral-950">Unfounded Venture Studio</a> — Chennai Studio Core (COO &amp; Co-Founder)</li>
          </ul>
        </section>

        <div class="pt-4">
          <a href="/ventures/" class="font-bold underline text-neutral-950">Explore Ventures &amp; Case Studies →</a>
        </div>
      </div>
    `
  },
  {
    path: 'ventures',
    title: 'Ventures & Case Studies | Vijayrajkumar · COO & Builder',
    description: 'Explore ventures co-founded and operated by Vijayrajkumar in Chennai: Ziggers (local gig marketplace), LoopMemory (AI context engine), and Unfounded Venture Studio.',
    canonical: 'https://www.vijayrajkumar.in/ventures/',
    heading: 'Ventures & Case Studies',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Ventures & Case Studies | Vijayrajkumar",
      "url": "https://www.vijayrajkumar.in/ventures/",
      "hasPart": [
        { "@type": "SoftwareApplication", "name": "Ziggers", "url": "https://www.ziggers.in/" },
        { "@type": "SoftwareApplication", "name": "LoopMemory", "url": "https://www.loopmemory.in/" }
      ]
    }),
    content: `
      <div class="max-w-6xl mx-auto px-6 py-16 space-y-12 font-sans">
        <nav class="text-xs text-neutral-500 mb-6"><a href="/">Home</a> / <span>Ventures</span></nav>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">Vijayrajkumar — Ventures &amp; Case Studies</h1>
        <p class="text-lg text-neutral-600 leading-relaxed max-w-3xl">Concise portfolio overview of ventures co-founded and operated by Vijayrajkumar. Explore detailed case studies for problems addressed, user segments, personal ownership, and verifiable evidence.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-neutral-200">
          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4">
            <span class="text-xs font-semibold px-2.5 py-1 bg-white border border-neutral-200 rounded-full text-neutral-800">Product Hunt Launched</span>
            <h2 class="text-2xl font-bold text-neutral-950"><a href="/ventures/ziggers/">Ziggers</a></h2>
            <p class="text-xs font-semibold text-neutral-800">Chief Operating Officer &amp; Co-Founder · Product &amp; Growth</p>
            <p class="text-sm text-neutral-600">Local gig-economy marketplace replacing unorganized WhatsApp hiring with verified workers, geo-tracking, and milestone escrow payouts.</p>
            <div class="pt-2"><a href="/ventures/ziggers/" class="font-bold text-xs underline text-neutral-950">Read full case study →</a></div>
          </div>

          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4">
            <span class="text-xs font-semibold px-2.5 py-1 bg-white border border-neutral-200 rounded-full text-neutral-800">IGES Summit Showcase</span>
            <h2 class="text-2xl font-bold text-neutral-950"><a href="/ventures/loopmemory/">LoopMemory</a></h2>
            <p class="text-xs font-semibold text-neutral-800">Chief Operating Officer &amp; Co-Founder · Context Architecture</p>
            <p class="text-sm text-neutral-600">Persistent cognitive memory engine and knowledge graph for AI agents, preventing session context loss and reducing token overhead.</p>
            <div class="pt-2"><a href="/ventures/loopmemory/" class="font-bold text-xs underline text-neutral-950">Read full case study →</a></div>
          </div>

          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4">
            <span class="text-xs font-semibold px-2.5 py-1 bg-white border border-neutral-200 rounded-full text-neutral-800">Venture Studio Core</span>
            <h2 class="text-2xl font-bold text-neutral-950">Unfounded</h2>
            <p class="text-xs font-semibold text-neutral-800">Chief Operating Officer &amp; Co-Founder · Studio Orchestration</p>
            <p class="text-sm text-neutral-600">Chennai-based venture studio incubating parallel high-conviction ventures through rapid vibe coding execution and strategic ecosystem partnerships.</p>
            <div class="pt-2"><a href="/about/" class="font-bold text-xs underline text-neutral-950">About Founder &amp; Studio →</a></div>
          </div>
        </div>
      </div>
    `
  },
  {
    path: 'ventures/ziggers',
    title: 'Ziggers Case Study | Vijayrajkumar · Co-Founder & COO',
    description: 'Read the comprehensive case study on Ziggers: a Chennai-first gig staffing marketplace co-founded by Vijayrajkumar. Solving informal WhatsApp hiring with milestone escrow.',
    canonical: 'https://www.vijayrajkumar.in/ventures/ziggers/',
    heading: 'Ziggers Case Study',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Ziggers",
      "operatingSystem": "Web",
      "applicationCategory": "BusinessApplication",
      "description": "A Chennai-first gig staffing marketplace replacing informal WhatsApp hiring with verified workers, real-time tracking, and milestone-based escrow payments.",
      "url": "https://www.ziggers.in/",
      "author": { "@type": "Person", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/about/" }
    }),
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-12 font-sans">
        <nav class="text-xs text-neutral-500 mb-6"><a href="/">Home</a> / <a href="/ventures/">Ventures</a> / <span>Ziggers</span></nav>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">Ziggers — Chennai Gig Marketplace and Temporary Staffing Platform</h1>
        <p class="text-lg text-neutral-600 leading-relaxed">A Chennai-first gig staffing marketplace co-founded by Vijayrajkumar to replace informal WhatsApp hiring with verified workers, real-time tracking, and milestone-based escrow payments.</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm pt-6 border-t border-neutral-200">
          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
            <h2 class="font-bold text-neutral-950 mb-2">1. The Problem</h2>
            <p class="text-neutral-600">Informal temporary gig hiring in urban India relies on chaotic WhatsApp groups with zero worker verification, rampant no-shows, and wage withholding.</p>
          </div>
          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
            <h2 class="font-bold text-neutral-950 mb-2">2. The Target User</h2>
            <p class="text-neutral-600">Event organizers, local business operators, warehouse logistics teams, and flexible gig workers needing fast, reliable shifts.</p>
          </div>
          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
            <h2 class="font-bold text-neutral-950 mb-2">3. What Vijayrajkumar Personally Owned</h2>
            <p class="text-neutral-600">As Chief Operating Officer &amp; Co-Founder, shaped product direction, user onboarding flows, marketplace matching rules, and the milestone escrow payment logic.</p>
          </div>
          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
            <h2 class="font-bold text-neutral-950 mb-2">4. Deliverables Shipped</h2>
            <p class="text-neutral-600">Shipped responsive web application on React and Vite, real-time geolocation check-in, verified worker identification, and escrow payout processing.</p>
          </div>
        </div>

        <section class="pt-6 border-t border-neutral-200 space-y-3">
          <h2 class="text-xl font-bold text-neutral-950">Verifiable Milestones</h2>
          <ul class="list-disc pl-5 text-sm text-neutral-700 space-y-1">
            <li>Product Hunt Launch global rollout</li>
            <li>Startup Pitchfest 2026 Finals in Kanyakumari</li>
            <li>Operating live in production at <a href="https://www.ziggers.in/" class="underline font-semibold">ziggers.in</a></li>
          </ul>
        </section>
      </div>
    `
  },
  {
    path: 'ventures/loopmemory',
    title: 'LoopMemory Case Study | Vijayrajkumar · COO & Context Architecture',
    description: 'Read the comprehensive case study on LoopMemory: persistent context and cognitive memory engine for AI agents co-founded and operated by Vijayrajkumar. Featured at India Global Education Summit.',
    canonical: 'https://www.vijayrajkumar.in/ventures/loopmemory/',
    heading: 'LoopMemory Case Study',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "LoopMemory",
      "operatingSystem": "Web",
      "applicationCategory": "DeveloperApplication",
      "description": "Persistent context and cognitive memory engine for AI agents and developer workflows.",
      "url": "https://www.loopmemory.in/",
      "author": { "@type": "Person", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/about/" }
    }),
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-12 font-sans">
        <nav class="text-xs text-neutral-500 mb-6"><a href="/">Home</a> / <a href="/ventures/">Ventures</a> / <span>LoopMemory</span></nav>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">LoopMemory — Persistent Memory and Context Architecture for AI Agents</h1>
        <p class="text-lg text-neutral-600 leading-relaxed">A developer-focused context and cognitive architecture engine co-founded by Vijayrajkumar to solve LLM context loss across multi-turn sessions and agentic workflows.</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm pt-6 border-t border-neutral-200">
          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
            <h2 class="font-bold text-neutral-950 mb-2">1. The Problem</h2>
            <p class="text-neutral-600">LLMs are stateless by default. Multi-turn AI agents suffer from context rot, lost instructions, hallucination, and expensive repetitive prompt token overhead.</p>
          </div>
          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
            <h2 class="font-bold text-neutral-950 mb-2">2. The Target User</h2>
            <p class="text-neutral-600">AI developers, enterprise software teams, and researchers deploying autonomous agents or long-horizon customer assistants.</p>
          </div>
          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
            <h2 class="font-bold text-neutral-950 mb-2">3. What Vijayrajkumar Personally Owned</h2>
            <p class="text-neutral-600">Spearheaded the core context-structuring architecture, knowledge graph synthesis, developer ergonomics, and ecosystem distribution strategy.</p>
          </div>
          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
            <h2 class="font-bold text-neutral-950 mb-2">4. Deliverables Shipped</h2>
            <p class="text-neutral-600">Persistent memory structuring API endpoints, vector indexing with semantic retrieval, entity relationship clustering, and cognitive inspection dashboard.</p>
          </div>
        </div>

        <section class="pt-6 border-t border-neutral-200 space-y-3">
          <h2 class="text-xl font-bold text-neutral-950">Verifiable Milestones</h2>
          <ul class="list-disc pl-5 text-sm text-neutral-700 space-y-1">
            <li>Official showcase and delegate keynote at India Global Education Summit (Kalaivaanar Arangam)</li>
            <li>SaaSathoN &apos;26 at SSN 36-hour sprint</li>
            <li>Live developer platform at <a href="https://www.loopmemory.in/" class="underline font-semibold">loopmemory.in</a></li>
          </ul>
        </section>
      </div>
    `
  },
  {
    path: 'events',
    title: 'Events, Summits & Keynotes | Vijayrajkumar',
    description: 'Explore events, keynote showcases, and builder sprints attended by Vijayrajkumar: India Global Education Summit, Kazakhstan-India Forum, SaaSathoN SSN, and Startup Pitchfest Kanyakumari.',
    canonical: 'https://www.vijayrajkumar.in/events/',
    heading: 'Events & Summits',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Events & Summits | Vijayrajkumar",
      "url": "https://www.vijayrajkumar.in/events/",
      "author": { "@type": "Person", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/about/" }
    }),
    content: `
      <div class="max-w-6xl mx-auto px-6 py-16 space-y-12 font-sans">
        <nav class="text-xs text-neutral-500 mb-6"><a href="/">Home</a> / <span>Events</span></nav>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">Vijayrajkumar — Events, Summits &amp; Builder Sprints</h1>
        <p class="text-lg text-neutral-600 leading-relaxed max-w-3xl">Firsthand photo records and verified milestones from global summits, international delegations, 36-hour builder sprints, and startup pitchfest finals where Vijayrajkumar represented Unfounded, Ziggers, and LoopMemory.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-neutral-200">
          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
            <span class="text-xs font-mono font-semibold text-neutral-500 uppercase">Kalaivaanar Arangam, Chennai · Feb 2026</span>
            <h2 class="text-2xl font-bold text-neutral-950">India Global Education Summit</h2>
            <p class="text-sm text-neutral-600">Represented Unfounded and showcased LoopMemory cognitive memory architecture to international delegations and education leaders.</p>
            <div><a href="/ventures/loopmemory/" class="font-bold text-xs underline text-neutral-950">View LoopMemory Case Study →</a></div>
          </div>

          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
            <span class="text-xs font-mono font-semibold text-neutral-500 uppercase">Chennai International Centre · Jan 2026</span>
            <h2 class="text-2xl font-bold text-neutral-950">Kazakhstan - India Innovation Forum</h2>
            <p class="text-sm text-neutral-600">Participated in bilateral innovation dialogues connecting Central Asian venture corridors with South Indian startup ecosystems.</p>
            <div><a href="/about/" class="font-bold text-xs underline text-neutral-950">About Founder Background →</a></div>
          </div>

          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
            <span class="text-xs font-mono font-semibold text-neutral-500 uppercase">SSN College of Engineering · Jan 2026</span>
            <h2 class="text-2xl font-bold text-neutral-950">SaaSathoN &apos;26 @ SSN College</h2>
            <p class="text-sm text-neutral-600">Intensive 36-hour sprint pressure-testing LoopMemory under multi-agent traffic and shipping developer API endpoints.</p>
            <div><a href="/ventures/loopmemory/" class="font-bold text-xs underline text-neutral-950">View LoopMemory Case Study →</a></div>
          </div>

          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
            <span class="text-xs font-mono font-semibold text-neutral-500 uppercase">Kanyakumari, Tamil Nadu · 2026</span>
            <h2 class="text-2xl font-bold text-neutral-950">Startup Pitchfest 2026 Finals</h2>
            <p class="text-sm text-neutral-600">Pitched Ziggers gig marketplace platform to venture capital funds, angel syndicates, and government incubators as a top state finalist.</p>
            <div><a href="/ventures/ziggers/" class="font-bold text-xs underline text-neutral-950">View Ziggers Case Study →</a></div>
          </div>
        </div>
      </div>
    `
  },
  {
    path: 'writing',
    title: 'Writing & Strategic Research | Vijayrajkumar',
    description: 'Thought leadership and essays by Vijayrajkumar on local gig marketplaces, persistent context memory for AI agents, and applying defence doctrines to startup building.',
    canonical: 'https://www.vijayrajkumar.in/writing/',
    heading: 'Writing & Strategic Research',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Writing & Strategic Research | Vijayrajkumar",
      "url": "https://www.vijayrajkumar.in/writing/",
      "author": { "@type": "Person", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/about/" }
    }),
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-12 font-sans">
        <nav class="text-xs text-neutral-500 mb-6"><a href="/">Home</a> / <span>Writing</span></nav>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">Vijayrajkumar — Writing &amp; Strategic Research</h1>
        <p class="text-lg text-neutral-600 leading-relaxed">First-party essays on building urban gig marketplaces in India, architecting cognitive AI memory layers, and applying strategic defence doctrines to startup venture incubation.</p>

        <div class="space-y-8 pt-6 border-t border-neutral-200">
          <article class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
            <span class="text-xs uppercase font-bold text-neutral-500">Marketplace Mechanics &amp; Labor Ops</span>
            <h2 class="text-2xl font-bold text-neutral-950"><a href="/writing/gig-marketplace-chennai/">Building a Local Gig Marketplace in Chennai: Lessons Beyond WhatsApp Groups</a></h2>
            <p class="text-xs text-neutral-500">By Vijayrajkumar (COO &amp; Co-Founder, Ziggers) • Feb 2026 • 6 min read</p>
            <p class="text-sm text-neutral-600 leading-relaxed">Why informal WhatsApp hiring collapses at scale in Indian tier-1 cities, how milestone-based escrow resolves worker skepticism, and the operational playbook for building two-sided liquidity without cash burn.</p>
            <div><a href="/writing/gig-marketplace-chennai/" class="font-bold text-xs underline text-neutral-950">Read complete essay →</a></div>
          </article>

          <article class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
            <span class="text-xs uppercase font-bold text-neutral-500">AI Infrastructure &amp; Cognitive Systems</span>
            <h2 class="text-2xl font-bold text-neutral-950"><a href="/writing/ai-persistent-context-architecture/">Designing Persistent Context &amp; Memory Architecture for AI Agents</a></h2>
            <p class="text-xs text-neutral-500">By Vijayrajkumar (COO &amp; Co-Founder, LoopMemory) • Jan 2026 • 8 min read</p>
            <p class="text-sm text-neutral-600 leading-relaxed">The technical and cognitive design challenges of multi-session AI agents: why dumping chat histories into large prompt windows causes context rot, and how hierarchical memory graphs solve long-term agent reasoning.</p>
            <div><a href="/writing/ai-persistent-context-architecture/" class="font-bold text-xs underline text-neutral-950">Read complete essay →</a></div>
          </article>

          <article class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
            <span class="text-xs uppercase font-bold text-neutral-500">Strategy, Game Theory &amp; Operations</span>
            <h2 class="text-2xl font-bold text-neutral-950"><a href="/writing/geopolitics-defence-venture-building/">From Geopolitics and Defence Strategy to Startup Venture Studios</a></h2>
            <p class="text-xs text-neutral-500">By Vijayrajkumar (COO &amp; Co-Founder, Unfounded) • Dec 2025 • 7 min read</p>
            <p class="text-sm text-neutral-600 leading-relaxed">How academic frameworks in international security, intelligence doctrine, and deterrence strategy directly translate into early-stage startup execution, competitive defensibility, and rapid vibe coding.</p>
            <div><a href="/writing/geopolitics-defence-venture-building/" class="font-bold text-xs underline text-neutral-950">Read complete essay →</a></div>
          </article>
        </div>
      </div>
    `
  },
  {
    path: 'contact',
    title: 'Contact & Collaboration | Vijayrajkumar · COO · Chennai, India',
    description: 'Get in touch with Vijayrajkumar. Chief Operating Officer and co-founder at Unfounded, Ziggers, and LoopMemory. Open to venture partnerships, operational collaboration, and speaking.',
    canonical: 'https://www.vijayrajkumar.in/contact/',
    heading: 'Contact Me',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Vijayrajkumar",
      "url": "https://www.vijayrajkumar.in/contact/",
      "mainEntity": {
        "@type": "Person",
        "name": "Vijayrajkumar",
        "email": "mailto:vijaykumarunfounded@gmail.com",
        "homeLocation": { "@type": "Place", "name": "Chennai, Tamil Nadu, India" }
      }
    }),
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-12 font-sans">
        <nav class="text-xs text-neutral-500 mb-6"><a href="/">Home</a> / <span>Contact</span></nav>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">Vijayrajkumar — Contact &amp; Venture Collaboration</h1>
        <p class="text-lg text-neutral-600 leading-relaxed">I usually respond within two working days. Reach out regarding venture partnerships, operational collaboration, product growth, startup ecosystems, or speaking and research opportunities.</p>

        <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3 text-sm">
          <p><strong>Base:</strong> Chennai, Tamil Nadu, India (On-site)</p>
          <p><strong>Response Commitment:</strong> Within 2 business days</p>
          <p><strong>Direct Email:</strong> <a href="mailto:vijaykumarunfounded@gmail.com" class="underline font-bold text-neutral-950">vijaykumarunfounded@gmail.com</a></p>
          <div class="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
            <a href="https://x.com/bigboy00106926" target="_blank" rel="noopener noreferrer" class="underline text-neutral-950">X (Twitter) ↗</a>
            <a href="https://www.instagram.com/vijayrajkumar_5405/" target="_blank" rel="noopener noreferrer" class="underline text-neutral-950">Instagram ↗</a>
            <a href="https://www.facebook.com/profile.php?id=61580836342430" target="_blank" rel="noopener noreferrer" class="underline text-neutral-950">Facebook ↗</a>
            <a href="https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/" target="_blank" rel="noopener noreferrer" class="underline text-neutral-950">LinkedIn ↗</a>
          </div>
        </div>
      </div>
    `
  },
  // ==========================================
  // Individual Writing Article Routes (Article-First, Clean URLs)
  // ==========================================
  {
    path: 'writing/gig-marketplace-chennai',
    title: 'Building a Local Gig Marketplace in Chennai | Vijayrajkumar',
    description: 'Why informal WhatsApp hiring collapses at scale in Indian tier-1 cities, how milestone-based escrow resolves worker skepticism, and the operational playbook for two-sided liquidity.',
    canonical: 'https://www.vijayrajkumar.in/writing/gig-marketplace-chennai/',
    heading: 'Building a Local Gig Marketplace in Chennai',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Building a Local Gig Marketplace in Chennai: Lessons Beyond WhatsApp Groups",
      "author": { "@type": "Person", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/about/" },
      "datePublished": "2026-02-01",
      "dateModified": "2026-09-14",
      "publisher": { "@type": "Organization", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/" },
      "url": "https://www.vijayrajkumar.in/writing/gig-marketplace-chennai/",
      "mainEntityOfPage": "https://www.vijayrajkumar.in/writing/gig-marketplace-chennai/",
      "description": "Why informal WhatsApp hiring collapses at scale in Indian tier-1 cities, how milestone-based escrow resolves worker skepticism, and the operational playbook for two-sided liquidity.",
      "keywords": ["gig marketplace", "Chennai", "escrow payments", "WhatsApp hiring", "staffing", "Vijayrajkumar"]
    }),
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-10 font-sans">
        <nav class="text-xs text-neutral-500 mb-4"><a href="/">Home</a> / <a href="/writing/">Writing</a> / <span>Gig Marketplace Chennai</span></nav>
        <div class="space-y-3 border-b border-neutral-200 pb-6">
          <span class="text-xs font-bold uppercase tracking-wider text-neutral-600">Marketplace Mechanics &amp; Labor Ops</span>
          <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">Building a Local Gig Marketplace in Chennai: Lessons Beyond WhatsApp Groups</h1>
          <p class="text-xs text-neutral-600">By <a href="/about/" class="font-bold underline text-neutral-950">Vijayrajkumar</a> (COO &amp; Co-Founder, Ziggers) • February 2026 • 6 min read</p>
        </div>

        <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
          <h2 class="text-xs font-bold uppercase tracking-wider text-neutral-950">Key Takeaways</h2>
          <ul class="list-disc pl-5 text-sm text-neutral-700 space-y-1">
            <li>WhatsApp lacks escrow, resulting in 40%+ worker no-show rates and employer wage withholding.</li>
            <li>Trust in Indian blue/gray-collar hiring is not reputational; it is liquidity-guaranteed via automated shift escrows.</li>
            <li>Offline hyper-local campus blitzes outperform paid digital ads for high-frequency shift supply.</li>
          </ul>
        </div>

        <section class="space-y-6 pt-4">
          <div class="space-y-3"><h2 class="text-2xl font-bold text-neutral-950">The Fragmented Reality of Urban Gig Hiring</h2><p class="text-neutral-700 leading-relaxed">Walk into any event venue, logistics warehouse, or catering setup in Chennai, and the labor force was almost certainly coordinated through an unmonitored WhatsApp group. While WhatsApp is zero-friction to start, it possesses zero accountability. Employers post shift timings and rates; workers RSVP with thumbs-up emojis; on the day of the event, up to 45% fail to show up.</p></div>
          <div class="space-y-3"><h2 class="text-2xl font-bold text-neutral-950">The Mechanics of Verified Escrow</h2><p class="text-neutral-700 leading-relaxed">When building Ziggers, our first realization was that neither party trusted the other. Employers feared paying for workers who would leave midway; workers feared not getting paid after completing their shift. We structured the platform around geo-fenced check-ins and escrow locks: the employer deposits the shift wage into escrow upfront, and the worker receives payout upon verified supervisor sign-off.</p></div>
          <div class="space-y-3"><h2 class="text-2xl font-bold text-neutral-950">Bootstrapping Liquidity in Chennai</h2><p class="text-neutral-700 leading-relaxed">Rather than spending capital on Facebook or Google ads, we went directly on-site to university campuses and vocational centers across Chennai. By engaging high-intent students seeking flexible weekend earnings and guaranteeing same-day payout settlements, we generated organic marketplace density.</p></div>
        </section>

        <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-neutral-500">About the Author</span>
            <h3 class="text-base font-bold text-neutral-950">Vijayrajkumar</h3>
            <p class="text-xs text-neutral-700 max-w-xl">Vijayrajkumar is a Chennai-based Chief Operating Officer &amp; Co-Founder at Unfounded, Ziggers, and LoopMemory, operating across gig-economy marketplace mechanics and persistent AI context infrastructure.</p>
          </div>
          <a href="/about/" class="shrink-0 px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-full hover:bg-neutral-800 transition-colors">About Vijayrajkumar →</a>
        </div>

        <div class="pt-4"><a href="/writing/" class="text-xs font-bold underline text-neutral-950">← Back to all essays</a></div>
      </div>
    `
  },
  {
    path: 'writing/ai-persistent-context-architecture',
    title: 'Designing Persistent Context & Memory Architecture for AI Agents | Vijayrajkumar',
    description: 'The technical and cognitive design challenges of multi-session AI agents: why dumping chat histories causes context rot, and how hierarchical memory graphs solve long-term agent reasoning.',
    canonical: 'https://www.vijayrajkumar.in/writing/ai-persistent-context-architecture/',
    heading: 'Persistent Context & Memory Architecture for AI Agents',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Designing Persistent Context & Memory Architecture for AI Agents",
      "author": { "@type": "Person", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/about/" },
      "datePublished": "2026-01-01",
      "dateModified": "2026-09-14",
      "publisher": { "@type": "Organization", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/" },
      "url": "https://www.vijayrajkumar.in/writing/ai-persistent-context-architecture/",
      "mainEntityOfPage": "https://www.vijayrajkumar.in/writing/ai-persistent-context-architecture/",
      "description": "The technical and cognitive design challenges of multi-session AI agents: why dumping chat histories causes context rot, and how hierarchical memory graphs solve long-term agent reasoning.",
      "keywords": ["AI agents", "persistent memory", "context architecture", "knowledge graph", "LLM", "Vijayrajkumar"]
    }),
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-10 font-sans">
        <nav class="text-xs text-neutral-500 mb-4"><a href="/">Home</a> / <a href="/writing/">Writing</a> / <span>AI Persistent Context</span></nav>
        <div class="space-y-3 border-b border-neutral-200 pb-6">
          <span class="text-xs font-bold uppercase tracking-wider text-neutral-600">AI Infrastructure &amp; Cognitive Systems</span>
          <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">Designing Persistent Context &amp; Memory Architecture for AI Agents</h1>
          <p class="text-xs text-neutral-600">By <a href="/about/" class="font-bold underline text-neutral-950">Vijayrajkumar</a> (COO &amp; Co-Founder, LoopMemory) • January 2026 • 8 min read</p>
        </div>

        <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
          <h2 class="text-xs font-bold uppercase tracking-wider text-neutral-950">Key Takeaways</h2>
          <ul class="list-disc pl-5 text-sm text-neutral-700 space-y-1">
            <li>Large context windows do not equal comprehension; attention decay degrades reasoning over lengthy prompts.</li>
            <li>Episodic memory must be parsed into declarative facts and stored in knowledge graph triples.</li>
            <li>Temporal decay functions ensure obsolete session variables do not pollute current agent decision-making.</li>
          </ul>
        </div>

        <section class="space-y-6 pt-4">
          <div class="space-y-3"><h2 class="text-2xl font-bold text-neutral-950">The Fallacy of the 1-Million Token Prompt</h2><p class="text-neutral-700 leading-relaxed">With model providers expanding context windows, many developers assumed the memory problem was solved: just feed the entire chat history back into the LLM on every turn. In practice, this creates severe latency, massive cost penalties, and attention degradation. Agents get confused by outdated user instructions from three days prior.</p></div>
          <div class="space-y-3"><h2 class="text-2xl font-bold text-neutral-950">Hierarchical Memory Decomposition</h2><p class="text-neutral-700 leading-relaxed">At LoopMemory, we architected a tripartite memory model: Working Memory (active prompt context), Episodic Memory (raw chronological turn logs), and Semantic Graph Memory (extracted entities, preferences, and verified beliefs). Raw conversational turns pass through an extraction pipeline that updates a developer-queried knowledge graph.</p></div>
          <div class="space-y-3"><h2 class="text-2xl font-bold text-neutral-950">Decay, Pruning, and Relevance Scoring</h2><p class="text-neutral-700 leading-relaxed">Human brains forget for a reason. AI agents similarly require deterministic forgetting curves. By scoring memories based on recency, retrieval frequency, and semantic relevance, LoopMemory surfaces only the high-signal context an agent needs to execute its next tool call.</p></div>
        </section>

        <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-neutral-500">About the Author</span>
            <h3 class="text-base font-bold text-neutral-950">Vijayrajkumar</h3>
            <p class="text-xs text-neutral-700 max-w-xl">Vijayrajkumar is a Chennai-based Chief Operating Officer &amp; Co-Founder at Unfounded, Ziggers, and LoopMemory, operating across gig-economy marketplace mechanics and persistent AI context infrastructure.</p>
          </div>
          <a href="/about/" class="shrink-0 px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-full hover:bg-neutral-800 transition-colors">About Vijayrajkumar →</a>
        </div>

        <div class="pt-4"><a href="/writing/" class="text-xs font-bold underline text-neutral-950">← Back to all essays</a></div>
      </div>
    `
  },
  {
    path: 'writing/geopolitics-defence-venture-building',
    title: 'From Geopolitics and Defence Strategy to Startup Venture Studios | Vijayrajkumar',
    description: 'How academic frameworks in international security, intelligence doctrine, and deterrence strategy directly translate into early-stage startup execution and competitive defensibility.',
    canonical: 'https://www.vijayrajkumar.in/writing/geopolitics-defence-venture-building/',
    heading: 'From Geopolitics to Venture Studios',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "From Geopolitics and Defence Strategy to Startup Venture Studios",
      "author": { "@type": "Person", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/about/" },
      "datePublished": "2025-12-01",
      "dateModified": "2026-09-14",
      "publisher": { "@type": "Organization", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/" },
      "url": "https://www.vijayrajkumar.in/writing/geopolitics-defence-venture-building/",
      "mainEntityOfPage": "https://www.vijayrajkumar.in/writing/geopolitics-defence-venture-building/",
      "description": "How academic frameworks in international security, intelligence doctrine, and deterrence strategy directly translate into early-stage startup execution and competitive defensibility.",
      "keywords": ["geopolitics", "defence strategy", "venture building", "OODA loop", "startup", "Vijayrajkumar"]
    }),
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-10 font-sans">
        <nav class="text-xs text-neutral-500 mb-4"><a href="/">Home</a> / <a href="/writing/">Writing</a> / <span>Geopolitics &amp; Venture Building</span></nav>
        <div class="space-y-3 border-b border-neutral-200 pb-6">
          <span class="text-xs font-bold uppercase tracking-wider text-neutral-600">Strategy, Game Theory &amp; Operations</span>
          <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">From Geopolitics and Defence Strategy to Startup Venture Studios</h1>
          <p class="text-xs text-neutral-600">By <a href="/about/" class="font-bold underline text-neutral-950">Vijayrajkumar</a> (COO &amp; Co-Founder, Unfounded) • December 2025 • 7 min read</p>
        </div>

        <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
          <h2 class="text-xs font-bold uppercase tracking-wider text-neutral-950">Key Takeaways</h2>
          <ul class="list-disc pl-5 text-sm text-neutral-700 space-y-1">
            <li>Startup competition is asymmetric warfare; small nimble teams must exploit incumbents&apos; rigid coordination costs.</li>
            <li>Information asymmetry is both a liability and an opportunity in marketplace creation.</li>
            <li>Studying linguistic nuances (Hindi literature) alongside defence strategy reveals how narratives shape real-world incentives.</li>
          </ul>
        </div>

        <section class="space-y-6 pt-4">
          <div class="space-y-3"><h2 class="text-2xl font-bold text-neutral-950">Asymmetric Advantage in Early-Stage Building</h2><p class="text-neutral-700 leading-relaxed">During my studies in Defence and Strategic Studies at SRMIST, one principle stood out repeatedly: smaller actors never defeat established powers by matching their conventional armor. They win through asymmetric speed, decentralized operational autonomy, and unconventional maneuvering. In startup terms, this is why a 2-person studio using vibe coding tools can out-iterate an enterprise engineering department with 50 managers.</p></div>
          <div class="space-y-3"><h2 class="text-2xl font-bold text-neutral-950">OODA Loops in Venture Studios</h2><p class="text-neutral-700 leading-relaxed">John Boyd's OODA Loop (Observe, Orient, Decide, Act) is the ultimate operating framework for venture building. At Unfounded, we run rapid cycles: observe user friction in the market, orient using historical patterns and system mechanics, decide on a minimal prototype, and act by deploying working code within 48 hours.</p></div>
          <div class="space-y-3"><h2 class="text-2xl font-bold text-neutral-950">Language, Narrative, and Cultural Cohesion</h2><p class="text-neutral-700 leading-relaxed">Pairing defence strategy with an MA in Hindi Literature taught me that systems are governed by the stories people believe. Whether convincing an investor at a pitchfest, onboarding the first 100 gig workers, or aligning a co-founding team, strategic narrative is the catalyst that transforms raw code into a living institution.</p></div>
        </section>

        <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-neutral-500">About the Author</span>
            <h3 class="text-base font-bold text-neutral-950">Vijayrajkumar</h3>
            <p class="text-xs text-neutral-700 max-w-xl">Vijayrajkumar is a Chennai-based Chief Operating Officer &amp; Co-Founder at Unfounded, Ziggers, and LoopMemory, operating across gig-economy marketplace mechanics and persistent AI context infrastructure.</p>
          </div>
          <a href="/about/" class="shrink-0 px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-full hover:bg-neutral-800 transition-colors">About Vijayrajkumar →</a>
        </div>

        <div class="pt-4"><a href="/writing/" class="text-xs font-bold underline text-neutral-950">← Back to all essays</a></div>
      </div>
    `
  }
];

// Generate subpage routes
routes.forEach((route) => {
  const targetDir = path.join(distDir, route.path);
  fs.mkdirSync(targetDir, { recursive: true });

  let pageHtml = templateHtml;

  // Replace Title
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

  // Replace Canonical Link
  pageHtml = pageHtml.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // Replace Meta Description
  pageHtml = pageHtml.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace Open Graph tags
  pageHtml = pageHtml.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${route.title}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${route.description}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  // Replace Twitter tags
  pageHtml = pageHtml.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${route.description}" />`
  );

  // Replace root inner content with route content
  pageHtml = pageHtml.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root">${route.content}</div>`
  );

  // Replace homepage JSON-LD with route-specific structured data
  if (route.jsonLd) {
    if (pageHtml.includes('<script type="application/ld+json">')) {
      pageHtml = pageHtml.replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        `<script type="application/ld+json">\n${route.jsonLd}\n    </script>`
      );
    } else {
      pageHtml = pageHtml.replace(
        '</head>',
        `<script type="application/ld+json">\n${route.jsonLd}\n    </script>\n  </head>`
      );
    }
  }

  const outputPath = path.join(targetDir, 'index.html');
  fs.writeFileSync(outputPath, pageHtml, 'utf8');
  console.log(`Generated static route HTML: ${outputPath}`);
});

// Generate 404.html
let notFoundHtml = templateHtml
  .replace(/<title>.*?<\/title>/, `<title>404: Page Not Found | Vijayrajkumar</title>`)
  .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="The requested page could not be found. Return to Vijayrajkumar homepage or about page." />`)
  .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="https://www.vijayrajkumar.in/404" />`)
  .replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root"><div class="max-w-xl mx-auto px-6 py-24 text-center font-sans space-y-4"><h1 class="text-4xl font-bold text-neutral-950">404 - Page Not Found</h1><p class="text-neutral-600">The requested page could not be found within the Vijayrajkumar site.</p><div class="pt-4 flex justify-center gap-4 text-xs font-semibold"><a href="/" class="underline text-neutral-950">Home</a> · <a href="/about/" class="underline text-neutral-950">About</a> · <a href="/ventures/" class="underline text-neutral-950">Ventures</a> · <a href="/writing/" class="underline text-neutral-950">Writing</a></div></div></div>`
  );

fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf8');
console.log(`Generated 404 HTML: ${path.join(distDir, '404.html')}`);

console.log('All static route HTML files successfully created.');
