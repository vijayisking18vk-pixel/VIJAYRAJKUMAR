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
    title: 'About Vijayrajkumar | COO & Venture Builder in Chennai',
    description: 'Learn about Vijayrajkumar, COO & co-founder at Unfounded, Ziggers, and LoopMemory. Background in Defence and Strategic Studies and Hindi Literature.',
    canonical: 'https://www.vijayrajkumar.in/about/',
    heading: 'About Vijayrajkumar',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Vijayrajkumar | COO & Venture Builder in Chennai",
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
    description: 'Explore ventures operated by Vijayrajkumar in Chennai: Ziggers gig marketplace, LoopMemory AI context engine, and Unfounded Venture Studio.',
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
    description: 'Case study on Ziggers: Chennai gig marketplace co-founded by Vijayrajkumar. Solving informal WhatsApp hiring with verified staff and milestone escrow.',
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
    title: 'LoopMemory Case Study: AI Agent Memory | Vijayrajkumar',
    description: 'Case study on LoopMemory: persistent context and cognitive memory engine for AI agents, co-founded by Vijayrajkumar. Eliminating agent context rot.',
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
    description: 'Keynote showcases and builder summits attended by Vijayrajkumar: India Global Education Summit, Kazakhstan-India Forum, SaaSathoN, and Pitchfest.',
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
    description: 'Essays and research by Vijayrajkumar on local gig marketplaces, persistent AI agent memory architectures, and defence doctrines for startup scaling.',
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
            <span class="text-xs uppercase font-bold text-neutral-500">Venture Building &amp; Startup Operations</span>
            <h2 class="text-2xl font-bold text-neutral-950"><a href="/writing/startup-builder-venture-builder-india/">Startup Builder and Venture Builder in India: A Practical Guide for Founders</a></h2>
            <p class="text-xs text-neutral-500">By Vijayrajkumar (COO &amp; Co-Founder, Unfounded) • Sep 2026 • 10 min read</p>
            <p class="text-sm text-neutral-600 leading-relaxed">Looking for a startup builder or venture builder in India? Learn how studio, accelerator and fractional COO models work, who they suit, and how Vijayrajkumar helps founders build marketplaces and AI infrastructure ventures.</p>
            <div><a href="/writing/startup-builder-venture-builder-india/" class="font-bold text-xs underline text-neutral-950">Read complete essay →</a></div>
          </article>

          <article class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
            <span class="text-xs uppercase font-bold text-neutral-500">Local Gig Economy &amp; Event Staffing</span>
            <h2 class="text-2xl font-bold text-neutral-950"><a href="/writing/catering-workers-in-chennai/">Catering Workers in Chennai: Where to Hire Verified Workers and Get Catering Jobs in Chennai</a></h2>
            <p class="text-xs text-neutral-500">By Vijayrajkumar (COO &amp; Co-Founder, Ziggers) • Sep 2026 • 9 min read</p>
            <p class="text-sm text-neutral-600 leading-relaxed">Looking for catering workers in Chennai or catering jobs in Chennai? Learn where freshers, daily-wage workers and experienced staff can find verified shifts, and where event hosts can hire reliable catering workers.</p>
            <div><a href="/writing/catering-workers-in-chennai/" class="font-bold text-xs underline text-neutral-950">Read complete essay →</a></div>
          </article>

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
    title: 'Contact & Collaboration | Vijayrajkumar · COO, Chennai',
    description: 'Contact Vijayrajkumar, COO & co-founder at Unfounded, Ziggers, and LoopMemory. Available for venture partnerships, operational advisory, and speaking.',
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
    path: 'writing/startup-builder-venture-builder-india',
    title: 'Startup Builder & Venture Builder in India | Vijayrajkumar',
    description: 'Guide to startup and venture builders in India. Learn studio, accelerator, and fractional COO models with Vijayrajkumar for marketplace and AI ventures.',
    canonical: 'https://www.vijayrajkumar.in/writing/startup-builder-venture-builder-india/',
    heading: 'Startup Builder and Venture Builder in India',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "headline": "Startup Builder and Venture Builder in India: A Practical Guide for Founders",
          "name": "Startup Builder and Venture Builder in India",
          "author": { "@type": "Person", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/about/" },
          "datePublished": "2026-09-18",
          "dateModified": "2026-09-18",
          "publisher": { "@type": "Organization", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/" },
          "url": "https://www.vijayrajkumar.in/writing/startup-builder-venture-builder-india/",
          "mainEntityOfPage": "https://www.vijayrajkumar.in/writing/startup-builder-venture-builder-india/",
          "description": "Guide to startup and venture builders in India. Learn studio, accelerator, and fractional COO models with Vijayrajkumar for marketplace and AI ventures.",
          "about": [
            "Startup builder",
            "Venture builder",
            "Startup studio",
            "Fractional COO",
            "Gig marketplace",
            "AI infrastructure"
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the difference between a startup builder and a venture builder?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A startup builder usually helps develop one startup from idea to early execution. A venture builder can operate across multiple ventures and may contribute a shared studio system, talent, product resources and operating expertise."
              }
            },
            {
              "@type": "Question",
              "name": "What does a venture builder do for a marketplace startup?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A venture builder helps define the market, test supply and demand, design trust and payment mechanisms, build the first product workflow, plan the launch and establish marketplace metrics."
              }
            },
            {
              "@type": "Question",
              "name": "Can an early-stage startup work with a fractional COO?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. A fractional COO can be valuable when the founder needs help with execution, prioritisation, hiring, cross-functional coordination or operating systems but is not yet ready to hire a full-time COO."
              }
            },
            {
              "@type": "Question",
              "name": "What types of AI startups benefit from venture building?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AI infrastructure, developer tools, agent platforms and other technically complex ventures can benefit when they need help connecting architecture with user value, product positioning, developer adoption and commercial validation."
              }
            },
            {
              "@type": "Question",
              "name": "How do venture builders charge?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Common arrangements include a fixed project fee, a monthly operating fee, equity, a cash-and-equity combination or a co-founder agreement."
              }
            },
            {
              "@type": "Question",
              "name": "How can founders contact Vijayrajkumar?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Founders can use the contact and venture collaboration page (/contact/) or email vijaykumarunfounded@gmail.com. A useful enquiry includes the problem, target user, current stage and the specific operating support required."
              }
            }
          ]
        }
      ]
    }),
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-10 font-sans">
        <nav class="text-xs text-neutral-500 mb-4"><a href="/">Home</a> / <a href="/writing/">Writing</a> / <span>Startup Builder in India</span></nav>
        <div class="space-y-3 border-b border-neutral-200 pb-6">
          <span class="text-xs font-bold uppercase tracking-wider text-neutral-600">Venture Building &amp; Startup Operations</span>
          <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">Startup Builder and Venture Builder in India: A Practical Guide for Founders</h1>
          <p class="text-xs text-neutral-600">By <a href="/about/" class="font-bold underline text-neutral-950">Vijayrajkumar</a> (COO &amp; Co-Founder, Unfounded) • September 2026 • 10 min read</p>
        </div>

        <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
          <h2 class="text-xs font-bold uppercase tracking-wider text-neutral-950">Key Takeaways</h2>
          <ul class="list-disc pl-5 text-sm text-neutral-700 space-y-1">
            <li>A startup builder bridges the gap between early idea and market evidence, taking ownership of product direction, marketplace mechanics, and operational cadence.</li>
            <li>Founders should evaluate venture building models—Venture Studio, Accelerator, or Fractional COO—based on their capital position, operational bottleneck, and missing capabilities.</li>
            <li>Complex operational ventures like gig marketplaces (liquidity, trust, escrow) and AI infrastructure (persistent memory, context architecture) benefit most from embedded co-builders.</li>
            <li>Clear deliverables, stage-appropriate commercial terms, and evidence-based scorecards ensure venture-building partnerships create real enterprise value.</li>
          </ul>
        </div>

        <section class="space-y-8 pt-4">
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-neutral-950">Startup Builder and Venture Builder in India for Execution-Focused Founders</h2>
            <p class="text-neutral-700 leading-relaxed">Building a startup requires more than a strong idea. Founders must validate a real problem, design a product people will use, create a repeatable growth motion, recruit the right team and make important operating decisions before time and capital run out.</p>
            <p class="text-neutral-700 leading-relaxed">A <strong>startup builder</strong> helps turn an early idea into a working venture. A <strong>venture builder</strong> goes further by combining strategy, product direction, operating systems, talent assembly and launch execution. In some cases, the venture builder becomes a co-founder or acts as a fractional Chief Operating Officer (COO) during the most demanding stage of company building.</p>
            <p class="text-neutral-700 leading-relaxed">Vijayrajkumar is a Chennai-based <strong>Chief Operating Officer, co-founder and startup builder</strong> working across venture studio operations, gig-economy marketplaces and AI memory infrastructure. His work is designed for founders and teams that need a practical operating partner who can move from problem definition to shipped product and market validation.</p>
            <div class="p-4 bg-neutral-100 border-l-4 border-neutral-900 rounded-r-xl text-sm font-medium text-neutral-800">
              Have a startup idea, marketplace challenge or AI infrastructure venture to build? Share the problem, target user and current stage through the <a href="/contact/" class="underline font-bold text-neutral-950">venture collaboration page</a>.
            </div>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-neutral-950">What Does a Startup Builder Do?</h2>
            <p class="text-neutral-700 leading-relaxed">A startup builder helps a founder reduce the distance between an idea and evidence. The work may include customer and market discovery, product prioritisation, prototype development, marketplace design, go-to-market planning, hiring support, partnership development and investor preparation.</p>
            <p class="text-neutral-700 leading-relaxed">The exact role depends on the venture. A startup builder may work as a co-founder, an embedded operator, a venture studio partner or a fractional COO. The common principle is ownership: the builder is responsible for helping the team make decisions, ship useful work and learn from real users.</p>
            <p class="text-neutral-700 leading-relaxed">A good startup builder does not replace the founder. Instead, the builder strengthens the founding team by bringing structure, execution capacity and experience in the areas where the venture is most exposed.</p>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-neutral-950">How Venture Builder Models Work</h2>
            <p class="text-neutral-700 leading-relaxed">There is no single venture builder model. Founders should choose the structure based on the venture's stage, complexity, capital position and missing capabilities.</p>
            
            <div class="space-y-3 p-5 bg-white border border-neutral-200 rounded-xl">
              <h3 class="text-lg font-bold text-neutral-950">1. Venture Studio Model</h3>
              <p class="text-neutral-700 leading-relaxed text-sm">A venture studio develops and validates multiple startup ideas through a shared operating system. The studio may provide product thinking, technical resources, design, recruiting, partnerships, growth support and access to an investor network.</p>
              <p class="text-neutral-700 leading-relaxed text-sm">This model is useful when a problem is promising but the product, distribution model or founding team is still being formed. It can also help founders avoid spending months building features before testing demand.</p>
              <p class="text-neutral-700 leading-relaxed text-sm">The main question to clarify is ownership. Before working with a studio, founders should understand who owns the idea, how equity is allocated, how decisions are made and what happens if the venture is paused or spun out.</p>
            </div>

            <div class="space-y-3 p-5 bg-white border border-neutral-200 rounded-xl">
              <h3 class="text-lg font-bold text-neutral-950">2. Accelerator or Venture-Building Programme</h3>
              <p class="text-neutral-700 leading-relaxed text-sm">An accelerator usually offers a time-bound programme that combines mentorship, founder education, peer learning, introductions and sometimes funding. It is often valuable for a startup that already has a founding team and an early product but needs sharper positioning, stronger distribution or investor readiness.</p>
              <p class="text-neutral-700 leading-relaxed text-sm">Accelerators are generally less embedded than a co-founder or fractional COO. They can provide useful access and structure, but the founding team remains responsible for day-to-day execution.</p>
            </div>

            <div class="space-y-3 p-5 bg-white border border-neutral-200 rounded-xl">
              <h3 class="text-lg font-bold text-neutral-950">3. Fractional COO Model</h3>
              <p class="text-neutral-700 leading-relaxed text-sm">A fractional COO works with a startup for a defined period or on a defined operating mandate. The role may cover product operations, hiring, metrics, cross-functional execution, launch planning, customer feedback systems and strategic partnerships.</p>
              <p class="text-neutral-700 leading-relaxed text-sm">This model suits a founder who has product or technical strength but needs an experienced operator to create focus and operating discipline. It is also useful when a startup is moving from an informal founder-led process to a repeatable system.</p>
              <p class="text-neutral-700 leading-relaxed text-sm">The engagement should define the decision rights, weekly time commitment, deliverables, reporting cadence and success metrics. A fractional COO should be measured by operating progress, not by the number of meetings attended.</p>
            </div>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-neutral-950">Which Startups Benefit Most From a Venture Builder?</h2>
            <p class="text-neutral-700 leading-relaxed">Venture building is especially useful when the startup has a complex operating problem that cannot be solved by software development alone. Two examples are gig marketplaces and AI infrastructure ventures.</p>

            <div class="space-y-3 p-5 bg-white border border-neutral-200 rounded-xl">
              <h3 class="text-lg font-bold text-neutral-950">Gig Marketplace Startups</h3>
              <p class="text-neutral-700 leading-relaxed text-sm">A gig marketplace must coordinate at least two sides of a market. It needs to attract workers, build trust with buyers, define the service workflow, manage availability, support payments and create enough liquidity for both sides to return.</p>
              <p class="text-neutral-700 leading-relaxed text-sm">The difficult work is often operational. A marketplace may need worker verification, location-aware matching, milestone-based payments, dispute handling, fulfilment tracking and a focused launch strategy for one city or use case.</p>
              <p class="text-neutral-700 leading-relaxed text-sm">Vijayrajkumar's work with <a href="https://www.ziggers.in/" target="_blank" rel="noopener noreferrer" class="underline font-bold text-neutral-950">Ziggers</a> focuses on temporary gig staffing in India. The venture was built around a Chennai-first marketplace for verified temporary workers, with product direction covering user flows, marketplace positioning, real-time coordination and milestone-based escrow payments. The <a href="/ventures/ziggers/" class="underline font-bold text-neutral-950">Ziggers case study</a> documents the problem, target users, personal ownership and shipped platform capabilities.</p>
            </div>

            <div class="space-y-3 p-5 bg-white border border-neutral-200 rounded-xl">
              <h3 class="text-lg font-bold text-neutral-950">AI Infrastructure and AI Memory Ventures</h3>
              <p class="text-neutral-700 leading-relaxed text-sm">AI infrastructure startups face a different set of challenges. They must solve a technically meaningful problem while making the product understandable and usable for developers. The venture may need a clear architecture, developer experience, distribution strategy, ecosystem relationships and credible performance evidence.</p>
              <p class="text-neutral-700 leading-relaxed text-sm">AI agents and multi-turn applications often require persistent context, semantic retrieval and structured memory across sessions. A venture builder can help connect the technical architecture to a clear user problem, product narrative and adoption path.</p>
              <p class="text-neutral-700 leading-relaxed text-sm"><a href="https://www.loopmemory.in/" target="_blank" rel="noopener noreferrer" class="underline font-bold text-neutral-950">LoopMemory</a> is an AI memory and context architecture venture co-founded by Vijayrajkumar. Its <a href="/ventures/loopmemory/" class="underline font-bold text-neutral-950">case study</a> describes persistent context capture, semantic vector indexing, knowledge graphs and developer-facing workflows, including measured token savings and sprint milestones.</p>
            </div>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-neutral-950">How to Choose a Startup Builder in India</h2>
            <p class="text-neutral-700 leading-relaxed">The right partner should match the venture's actual bottleneck. A founder should evaluate a potential startup builder against five practical criteria:</p>
            <ol class="list-decimal pl-5 text-sm text-neutral-700 space-y-2">
              <li><strong>Relevant operating experience:</strong> Ask what the builder has personally owned. A list of advisory logos is less useful than evidence of products launched, users served, teams assembled, partnerships created or operating systems implemented. For marketplaces, look for experience with liquidity, trust, fulfilment and payments. For AI infrastructure, look for the ability to translate technical systems into developer adoption.</li>
              <li><strong>Clear ownership and deliverables:</strong> The engagement should state what the builder will own—customer discovery, product requirements, prototype validation, marketplace mechanics, hiring, launch planning, growth experiments or investor materials. Avoid vague promises about "support" or "network access." A strong brief identifies the decisions, artefacts and outcomes expected during the first 30, 60 and 90 days.</li>
              <li><strong>A working style that fits the founder:</strong> Some founders need a strategic sounding board; others need an embedded operator who will run weekly execution. Discuss communication, availability, decision rights, conflict resolution and future transitions early.</li>
              <li><strong>Commercial terms that reflect the stage:</strong> Common structures include a monthly operating fee, a project fee, equity, a cash-and-equity combination or a co-founder arrangement. The right structure depends on the work, risk, time commitment and expected duration. Founders should document vesting, termination, IP, confidentiality and decision rights before work begins.</li>
              <li><strong>Evidence-based success metrics:</strong> A startup builder should help define measurable progress—validated interviews, qualified demand, activation, repeat usage, marketplace fill rate, developer retention or retrieval latency—rather than measuring activity alone.</li>
            </ol>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-neutral-950">Typical Venture-Building Engagement Structure</h2>
            <p class="text-neutral-700 leading-relaxed">A practical engagement can be organised into four sequential stages:</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div class="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
                <h4 class="font-bold text-neutral-950">Stage 1: Diagnose the Problem</h4>
                <p class="text-neutral-600">Define the target user, urgent problem, existing alternatives and assumptions that could invalidate the business. Output: concise problem brief and prioritised validation plan.</p>
              </div>
              <div class="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
                <h4 class="font-bold text-neutral-950">Stage 2: Validate Demand &amp; Model</h4>
                <p class="text-neutral-600">Test demand through interviews, prototypes, landing pages, pilots or manual service delivery across both supply and demand sides.</p>
              </div>
              <div class="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
                <h4 class="font-bold text-neutral-950">Stage 3: Ship Smallest Useful Product</h4>
                <p class="text-neutral-600">Build and launch a focused product creating a reliable path to user feedback, usage data and commercial learning rather than bloated feature sets.</p>
              </div>
              <div class="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
                <h4 class="font-bold text-neutral-950">Stage 4: Build Repeatability</h4>
                <p class="text-neutral-600">Turn early learning into a repeatable system: hiring, onboarding, product analytics, sales/partnerships, and investor reporting for growth.</p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-neutral-950">How Success Should Be Measured</h2>
            <p class="text-neutral-700 leading-relaxed">The right scorecard combines product, market and operating evidence. A founder and builder can review it every week or two weeks:</p>
            <div class="overflow-x-auto border border-neutral-200 rounded-xl">
              <table class="w-full text-left text-sm border-collapse">
                <thead class="bg-neutral-100 text-neutral-950 border-b border-neutral-200">
                  <tr>
                    <th class="p-3.5 font-bold">Area</th>
                    <th class="p-3.5 font-bold">Example Measures</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-neutral-200">
                  <tr>
                    <td class="p-3.5 font-semibold text-neutral-950">Problem validation</td>
                    <td class="p-3.5 text-neutral-700">Qualified interviews, pilot commitments, paid demand and evidence of repeated pain</td>
                  </tr>
                  <tr>
                    <td class="p-3.5 font-semibold text-neutral-950">Product progress</td>
                    <td class="p-3.5 text-neutral-700">Shipped milestones, activation, retention, reliability and user feedback</td>
                  </tr>
                  <tr>
                    <td class="p-3.5 font-semibold text-neutral-950">Marketplace health</td>
                    <td class="p-3.5 text-neutral-700">Verified supply, buyer demand, match rate, fulfilment rate and repeat transactions</td>
                  </tr>
                  <tr>
                    <td class="p-3.5 font-semibold text-neutral-950">AI infrastructure quality</td>
                    <td class="p-3.5 text-neutral-700">Retrieval latency, token efficiency, integration completion and developer retention</td>
                  </tr>
                  <tr>
                    <td class="p-3.5 font-semibold text-neutral-950">Operating leverage</td>
                    <td class="p-3.5 text-neutral-700">Hiring progress, decision speed, documented processes and reduced founder bottlenecks</td>
                  </tr>
                  <tr>
                    <td class="p-3.5 font-semibold text-neutral-950">Commercial progress</td>
                    <td class="p-3.5 text-neutral-700">Revenue, pipeline quality, partnerships, gross margin and fundraising readiness</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-neutral-950">Vijayrajkumar's Venture-Building Experience</h2>
            <p class="text-neutral-700 leading-relaxed">Vijayrajkumar works at the intersection of startup operations, product direction and systems strategy. His public portfolio includes three connected areas of work:</p>
            <ul class="list-disc pl-5 text-sm text-neutral-700 space-y-1.5">
              <li><strong>Unfounded:</strong> A venture studio core focused on validation sprints, rapid prototypes, founder talent assembly and cross-venture operating systems.</li>
              <li><strong>Ziggers:</strong> A gig staffing marketplace focused on verified temporary workers, live coordination and milestone-based escrow workflows.</li>
              <li><strong>LoopMemory:</strong> An AI memory and context architecture venture focused on persistent context, semantic retrieval and developer adoption.</li>
            </ul>
            <p class="text-neutral-700 leading-relaxed text-sm">Together, these case studies show a practical form of venture building: identify a systemic problem, define the target user, build the operating and product mechanics, ship a usable platform and document evidence of progress. More detail is available on the <a href="/ventures/" class="underline font-bold text-neutral-950">ventures and case studies page</a>.</p>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-neutral-950">Is a Startup Builder Right for Your Venture?</h2>
            <p class="text-neutral-700 leading-relaxed">A startup builder may be a good fit if you have a clearly defined problem but lack operating capacity, if your product needs to be validated before a larger build, or if your startup involves complex coordination across users, workers, developers or partners.</p>
            <p class="text-neutral-700 leading-relaxed">You may not need a venture builder if your founding team already has the required product, technical, commercial and operating capabilities and only needs occasional advice. In that case, a focused advisor or specialist may be more efficient.</p>
            <p class="text-neutral-700 leading-relaxed">The best next step is a short, specific brief. Explain the problem, target user, current product stage, evidence collected so far and the decision that is currently blocking progress.</p>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-neutral-950">Work with a Chennai-Based Startup and Venture Builder</h2>
            <p class="text-neutral-700 leading-relaxed">If you are building a gig marketplace, an AI infrastructure product or another early-stage venture that needs hands-on operating support, Vijayrajkumar can discuss a possible collaboration.</p>
            <p class="text-neutral-700 leading-relaxed">Send a brief through the <a href="/contact/" class="underline font-bold text-neutral-950">contact and venture collaboration page</a> or email <a href="mailto:vijaykumarunfounded@gmail.com" class="underline font-bold text-neutral-950">vijaykumarunfounded@gmail.com</a>. Include your startup's problem, target customer, current stage and the kind of support you need. Vijayrajkumar is based in Chennai, Tamil Nadu, India, and states that collaboration enquiries are usually answered within two working days.</p>
            <div class="p-4 bg-neutral-100 border-l-4 border-neutral-900 rounded-r-xl text-sm font-semibold text-neutral-950">
              Build the right first version, validate the right market and create the operating system for the next stage of growth.
            </div>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-neutral-950">Frequently Asked Questions</h2>
            <div class="space-y-4 pt-2">
              <div class="p-4 bg-neutral-100 rounded-xl">
                <h4 class="font-bold text-neutral-950">What is the difference between a startup builder and a venture builder?</h4>
                <p class="text-sm text-neutral-700 mt-1">A startup builder usually helps develop one startup from idea to early execution. A venture builder can operate across multiple ventures and may contribute a shared studio system, talent, product resources and operating expertise. In practice, the terms overlap, so founders should evaluate the actual scope, ownership and deliverables.</p>
              </div>
              <div class="p-4 bg-neutral-100 rounded-xl">
                <h4 class="font-bold text-neutral-950">What does a venture builder do for a marketplace startup?</h4>
                <p class="text-sm text-neutral-700 mt-1">A venture builder can help define the market, test supply and demand, design trust and payment mechanisms, build the first product workflow, plan the launch and establish marketplace metrics. The goal is to validate liquidity and repeat usage, not simply to release an app.</p>
              </div>
              <div class="p-4 bg-neutral-100 rounded-xl">
                <h4 class="font-bold text-neutral-950">Can an early-stage startup work with a fractional COO?</h4>
                <p class="text-sm text-neutral-700 mt-1">Yes. A fractional COO can be valuable when the founder needs help with execution, prioritisation, hiring, cross-functional coordination or operating systems but is not yet ready to hire a full-time COO. The engagement should have clear decision rights and measurable outcomes.</p>
              </div>
              <div class="p-4 bg-neutral-100 rounded-xl">
                <h4 class="font-bold text-neutral-950">What types of AI startups benefit from venture building?</h4>
                <p class="text-sm text-neutral-700 mt-1">AI infrastructure, developer tools, agent platforms and other technically complex ventures can benefit when they need help connecting architecture with user value, product positioning, developer adoption and commercial validation. The builder should be able to work across technical and operating decisions.</p>
              </div>
              <div class="p-4 bg-neutral-100 rounded-xl">
                <h4 class="font-bold text-neutral-950">How do venture builders charge?</h4>
                <p class="text-sm text-neutral-700 mt-1">Common arrangements include a fixed project fee, a monthly operating fee, equity, a cash-and-equity combination or a co-founder agreement. The commercial structure should reflect the scope, risk, time commitment and stage of the startup. Legal and ownership terms should be documented before work begins.</p>
              </div>
              <div class="p-4 bg-neutral-100 rounded-xl">
                <h4 class="font-bold text-neutral-950">How can founders contact Vijayrajkumar?</h4>
                <p class="text-sm text-neutral-700 mt-1">Founders can use the contact and venture collaboration page (<a href="/contact/" class="underline font-semibold">/contact/</a>) or email <a href="mailto:vijaykumarunfounded@gmail.com" class="underline font-semibold">vijaykumarunfounded@gmail.com</a>. A useful enquiry includes the problem, target user, current stage and the specific operating support required.</p>
              </div>
            </div>
          </div>

          <div class="space-y-2 pt-2 border-t border-neutral-200 text-sm">
            <h3 class="font-bold text-neutral-950">References</h3>
            <ul class="space-y-1 text-xs text-neutral-600">
              <li>[1] <a href="/" class="underline font-semibold text-neutral-950">Vijayrajkumar — Chief Operating Officer and Venture Builder in Chennai</a></li>
              <li>[2] <a href="/ventures/" class="underline font-semibold text-neutral-950">Vijayrajkumar — Ventures, Marketplaces and AI Systems</a></li>
              <li>[3] <a href="/ventures/loopmemory/" class="underline font-semibold text-neutral-950">LoopMemory — Persistent Memory and Context Architecture for AI Agents</a></li>
              <li>[4] <a href="/contact/" class="underline font-semibold text-neutral-950">Vijayrajkumar — Contact and Venture Collaboration</a></li>
              <li>[5] <a href="https://www.ziggers.in/" target="_blank" rel="noopener noreferrer" class="underline font-semibold text-neutral-950">Ziggers — Gig Staffing Marketplace</a> (Official Portal)</li>
              <li>[6] <a href="https://www.loopmemory.in/" target="_blank" rel="noopener noreferrer" class="underline font-semibold text-neutral-950">LoopMemory — Persistent Context and Memory for AI Agents</a> (Live Platform)</li>
            </ul>
          </div>
        </section>

        <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-neutral-500">About the Author</span>
            <h3 class="text-base font-bold text-neutral-950">Vijayrajkumar</h3>
            <p class="text-xs text-neutral-700 max-w-xl">Vijayrajkumar is a Chennai-based Chief Operating Officer and venture builder. Through Unfounded, Ziggers, and LoopMemory, he works on marketplace liquidity, operations, and AI context infrastructure.</p>
          </div>
          <a href="/about/" class="shrink-0 px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-full hover:bg-neutral-800 transition-colors">About Vijayrajkumar →</a>
        </div>

        <div class="pt-4"><a href="/writing/" class="text-xs font-bold underline text-neutral-950">← Back to all essays</a></div>
      </div>
    `
  },
  {
    path: 'writing/gig-marketplace-chennai',
    title: 'Local Gig Marketplace in Chennai | Vijayrajkumar',
    description: 'Why informal WhatsApp hiring fails at scale in Indian cities, how milestone escrow builds trust, and the operational playbook for marketplace liquidity.',
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
      "description": "Why informal WhatsApp hiring fails at scale in Indian cities, how milestone escrow builds trust, and the operational playbook for marketplace liquidity.",
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
    title: 'Persistent Context & Memory for AI Agents | Vijayrajkumar',
    description: 'Why dumping chat histories causes agent context rot, and how hierarchical memory graphs solve long-term reasoning in multi-session AI workflows.',
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
      "description": "Why dumping chat histories causes agent context rot, and how hierarchical memory graphs solve long-term reasoning in multi-session AI workflows.",
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
    title: 'Geopolitics & Defence to Venture Studios | Vijayrajkumar',
    description: 'How academic frameworks in international security and deterrence strategy translate directly into early-stage startup execution and defensibility.',
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
      "description": "How academic frameworks in international security and deterrence strategy translate directly into early-stage startup execution and defensibility.",
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
  },
  {
    path: 'writing/catering-workers-in-chennai',
    title: 'Catering Workers in Chennai: Jobs & Staff | Vijayrajkumar',
    description: 'Guide to catering workers and jobs in Chennai: verified shifts for freshers and daily-wage staff, and reliable event hiring via Ziggers marketplace.',
    canonical: 'https://www.vijayrajkumar.in/writing/catering-workers-in-chennai/',
    heading: 'Catering Workers in Chennai',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "headline": "Catering Workers in Chennai: Where to Hire Verified Workers and Get Catering Jobs in Chennai",
          "name": "Catering Workers in Chennai: Verified Jobs and Reliable Staff for Events",
          "author": { "@type": "Person", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/about/" },
          "datePublished": "2026-09-17",
          "dateModified": "2026-09-17",
          "publisher": { "@type": "Organization", "name": "Vijayrajkumar", "url": "https://www.vijayrajkumar.in/" },
          "url": "https://www.vijayrajkumar.in/writing/catering-workers-in-chennai/",
          "mainEntityOfPage": "https://www.vijayrajkumar.in/writing/catering-workers-in-chennai/",
          "description": "Guide to catering workers and jobs in Chennai: verified shifts for freshers and daily-wage staff, and reliable event hiring via Ziggers marketplace.",
          "keywords": ["catering workers in chennai", "catering jobs in chennai", "daily payment catering jobs in chennai", "catering jobs in chennai for freshers", "marriage catering jobs in chennai", "hire catering staff chennai", "Ziggers", "Vijayrajkumar"]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Where can I find catering workers in Chennai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can search through verified staffing marketplaces, established catering companies, hotels, marriage halls and trusted local employers. Ziggers offers a Chennai catering staffing route for employers who need temporary event workers and for workers looking for local gig opportunities."
              }
            },
            {
              "@type": "Question",
              "name": "Are there catering jobs in Chennai for freshers?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, some employers consider freshers for serving, kitchen-helper, packing, cleaning and event-support roles. Requirements vary, so read the current listing and confirm the duties before applying."
              }
            },
            {
              "@type": "Question",
              "name": "Are daily payment catering jobs in Chennai genuine?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Some are genuine, but 'daily payment' does not always mean instant cash after the shift. Confirm the amount, approval process, payment date and deductions. Never pay an unexplained upfront fee to obtain a job."
              }
            },
            {
              "@type": "Question",
              "name": "How can I find marriage catering jobs in Chennai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Look for current listings from catering companies, event staffing platforms and wedding venues. Confirm the venue, shift timing, role, dress code and payment terms before travelling."
              }
            },
            {
              "@type": "Question",
              "name": "Can I hire catering workers for one day in Chennai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. One-day staffing is common for weddings, receptions, corporate events and private parties. Share the event date, location, headcount, roles and shift timing when requesting staff."
              }
            },
            {
              "@type": "Question",
              "name": "How can I contact catering workers in Chennai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use a verified staffing platform or a recognised employer channel instead of relying on random contact numbers forwarded through social media. Protect personal documents and confirm the job before sharing sensitive information."
              }
            }
          ]
        }
      ]
    }),
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-10 font-sans">
        <nav class="text-xs text-neutral-500 mb-4"><a href="/">Home</a> / <a href="/writing/">Writing</a> / <span>Catering Workers in Chennai</span></nav>
        <div class="space-y-3 border-b border-neutral-200 pb-6">
          <span class="text-xs font-bold uppercase tracking-wider text-neutral-600">Local Gig Economy &amp; Event Staffing</span>
          <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">Catering Workers in Chennai: Where to Hire Verified Workers and Get Catering Jobs in Chennai</h1>
          <p class="text-xs text-neutral-600">By <a href="/about/" class="font-bold underline text-neutral-950">Vijayrajkumar</a> (COO &amp; Co-Founder, Ziggers) • September 2026 • 9 min read</p>
        </div>

        <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
          <h2 class="text-xs font-bold uppercase tracking-wider text-neutral-950">Key Takeaways</h2>
          <ul class="list-disc pl-5 text-sm text-neutral-700 space-y-1">
            <li>Informal WhatsApp hiring lacks verification and payment transparency, leading to sudden cancellations, 40%+ worker no-show rates, and wage withholding.</li>
            <li>Event organizers can hire verified catering staff—including banquet servers, prep cooks, food packers, bussers, and supervisors—with clear shift parameters.</li>
            <li>Job seekers (freshers, students, and experienced supervisors) should verify reporting gates, shift hours, meal/travel provisions, and payment settlement terms before traveling.</li>
            <li>Platform-backed escrow and supervisor attendance logging protect daily-wage earnings and eliminate the friction of chasing event hosts after work is completed.</li>
          </ul>
        </div>

        <section class="space-y-8 pt-4">
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-neutral-950">The Search for Dependable Catering Work in Chennai</h2>
            <p class="text-neutral-700 leading-relaxed">If you search online for catering workers in Chennai, you will find a confusing mix of WhatsApp forwards, old Facebook posts, agency contacts and job advertisements with incomplete details. Some posts promise immediate work. Others advertise daily payment. A few mention wedding catering, industrial catering or hotel work. But many do not clearly explain the employer, venue, shift timing or payment date.</p>
            <p class="text-neutral-700 leading-relaxed">I have spent years working around operations, local businesses and the gig economy in Chennai. Through Ziggers, I have seen both sides of this problem: event organisers who urgently need dependable catering staff, and workers who are ready to work but want a fair opportunity, clear instructions and timely payment.</p>
            <p class="text-neutral-700 leading-relaxed">That is why this guide is personal to me. It is not only about finding a job. It is about building a more dependable way for Chennai’s catering workers and event hosts to meet.</p>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-neutral-950">The Real Problem with Catering Work in Chennai</h2>
            <p class="text-neutral-700 leading-relaxed">Chennai has constant demand for catering staff. Weddings, receptions, corporate meetings, birthday parties, temple functions, apartment events, restaurants, cloud kitchens and industrial cafeterias all require people who can prepare, serve, pack, clean and coordinate food service.</p>
            <p class="text-neutral-700 leading-relaxed">The work is available in many forms. Someone may be searching for a full-time catering job in Chennai. Another person may want a part-time catering job in Chennai after college. A fresher may need a first opportunity. An experienced supervisor may be looking for a longer contract. A family preparing for a marriage may simply need ten servers for one evening.</p>
            <p class="text-neutral-700 leading-relaxed">The difficulty is not always a lack of demand. The difficulty is trust and coordination. Workers often receive a forwarded message without a proper venue address. They travel across the city and discover that the shift has been cancelled. Sometimes the promised amount changes after the work is complete. In other cases, payment is delayed for days or weeks because attendance was not recorded properly or because the person who hired them stops responding.</p>
            <p class="text-neutral-700 leading-relaxed">Event hosts face a different problem. They may need catering workers in Chennai at short notice, but they do not know whether a person is experienced, punctual or available for the complete shift. Calling several unknown contacts during an event emergency is not a reliable staffing system.</p>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-neutral-950">My Reason for Building a Better Connection Through Ziggers</h2>
            <p class="text-neutral-700 leading-relaxed">I believe local work should be simple to understand before a worker accepts it. The worker should know the role, location, shift timing, payment terms and reporting contact. The organiser should know who is arriving and what work that person can do.</p>
            <p class="text-neutral-700 leading-relaxed">This is the thinking behind Ziggers. It connects people looking for flexible work with businesses and event organisers that need local staff. For catering, that can include servers, bussers, kitchen helpers, prep cooks, food-packing workers, cleaners and event support staff.</p>
            <p class="text-neutral-700 leading-relaxed">The goal is not to make unrealistic promises. Job availability changes by date, area, season and employer requirement. Instead, the goal is to make each opportunity clearer and more accountable than a random message in a group.</p>
            <p class="text-neutral-700 leading-relaxed">For employers, Ziggers is a way to hire catering staff in Chennai for weddings, corporate events and private functions. For workers, it can be a place to discover current catering and daily-gig opportunities, complete the required verification and review the assignment before accepting it.</p>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-neutral-950">Where to Hire Verified Catering Workers in Chennai</h2>
            <p class="text-neutral-700 leading-relaxed">If you are organising a wedding, reception, corporate event or private party, you can use the Ziggers catering staffing page for Chennai to explore temporary event staffing. The platform describes access to verified staff, including service professionals and kitchen support, along with identity and background-verification processes.</p>
            <p class="text-neutral-700 leading-relaxed">A practical hiring process should begin with the event details. Share the date, venue area, reporting time, expected shift duration, number of workers, type of work, dress requirements and payment terms. A server for a wedding reception is not the same as a prep cook for a large kitchen. Clear information helps the right people accept the right assignment.</p>
            <p class="font-semibold text-neutral-900 pt-2">Common roles include:</p>
            <ul class="list-disc pl-5 text-neutral-700 space-y-1">
              <li>Catering servers and banquet staff for guest service and table support.</li>
              <li>Kitchen helpers and prep cooks for preparation, packing and basic kitchen assistance.</li>
              <li>Food handlers and packing workers for portioning, parcel preparation and distribution.</li>
              <li>Bussers and cleaners for clearing tables and maintaining service areas.</li>
              <li>Catering supervisors for attendance, team coordination and event execution.</li>
              <li>Event support staff for setup, service movement and closing work.</li>
            </ul>
            <p class="text-neutral-700 leading-relaxed pt-2">For urgent requirements, the employer should confirm the final headcount before the event. Last-minute staffing can be necessary, but urgency should not remove basic checks. A reliable marketplace should make it easier to identify the worker, confirm availability and record completion of the shift.</p>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-neutral-950">How to Get Catering Jobs in Chennai</h2>
            <p class="text-neutral-700 leading-relaxed">If you are searching for catering jobs in Chennai, begin by deciding what kind of work suits your current situation. The most suitable role depends on your experience, travel distance, physical capacity, language skills and available hours.</p>
            
            <div class="space-y-4 pt-2">
              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                <h3 class="text-lg font-bold text-neutral-950">Full-Time Catering Jobs in Chennai</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">Full-time roles may be available with catering companies, hotels, restaurants, institutional kitchens, marriage halls and industrial food-service providers. Possible positions include cook, kitchen assistant, steward, waiter, catering supervisor, store assistant and catering manager.</p>
                <p class="text-sm text-neutral-700 leading-relaxed">Before joining, confirm whether the job includes food, accommodation, uniforms, weekly leave, overtime and any deductions. Do not rely only on a salary number mentioned in an informal post. Ask for the work location, shift schedule, duties and payment date in writing.</p>
              </div>

              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                <h3 class="text-lg font-bold text-neutral-950">Part-Time and Weekend Catering Jobs in Chennai</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">A part-time catering job in Chennai may suit students, homemakers, people between jobs or workers who want additional income. Wedding and event work is often concentrated on evenings, weekends and auspicious dates. Some assignments last only one day, while others repeat every week.</p>
                <p class="text-sm text-neutral-700 leading-relaxed">For weekend part-time catering jobs in Chennai, check the exact reporting time. A wedding shift may begin several hours before guests arrive and finish after dinner service. Include travel time when deciding whether the payment is worthwhile.</p>
              </div>

              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                <h3 class="text-lg font-bold text-neutral-950">Daily Payment Catering Jobs in Chennai</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">Many workers search for daily payment catering jobs in Chennai because they need fast access to income. Daily payment can mean different things, however. It may mean payment after the shift, payment after attendance approval, payment at the end of a defined cycle or payment through a platform after the assignment is marked complete.</p>
                <p class="text-sm font-semibold text-neutral-900">Ask these 6 questions before accepting daily payment work:</p>
                <ol class="list-decimal pl-5 text-sm text-neutral-700 space-y-1">
                  <li>What is the exact amount or calculation for the shift?</li>
                  <li>When will the payment be released?</li>
                  <li>Is supervisor approval required?</li>
                  <li>Are meals, transport or uniform provided?</li>
                  <li>Are there deductions for late arrival, cancellation or equipment?</li>
                  <li>What happens if the event is cancelled after travel?</li>
                </ol>
                <p class="text-sm text-neutral-700 leading-relaxed pt-1">A listing that says "daily payment" should still explain the actual settlement process. Never pay an unknown person a registration fee, interview fee or deposit just to access a catering job. If a job requires a legitimate expense, it should be explained clearly and verified through the official channel.</p>
              </div>

              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                <h3 class="text-lg font-bold text-neutral-950">Marriage Catering Jobs in Chennai</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">Marriage catering jobs in Chennai are among the most visible sources of short-term work. A single wedding may require servers, kitchen helpers, cleaners, parcel-packing workers and supervisors. The work can be physically demanding, and the shift may start early or end late.</p>
                <p class="text-sm text-neutral-700 leading-relaxed">If you are applying for marriage catering work, confirm the venue, reporting gate, dress code, food arrangements and expected end time. If you are hiring workers, communicate whether you need service staff, kitchen staff or a complete event team. Clear role descriptions reduce confusion on the day of the function.</p>
              </div>

              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                <h3 class="text-lg font-bold text-neutral-950">Industrial Catering Jobs in Chennai</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">Industrial catering jobs in Chennai are different from one-day wedding shifts. They may involve factory canteens, offices, hospitals, hostels or other institutional kitchens. These roles can require regular attendance, food-safety discipline, shift work and coordination with a facility manager.</p>
                <p class="text-sm text-neutral-700 leading-relaxed">Workers should ask whether the position is permanent, temporary or contract-based. Employers should explain the roster, weekly rest day, meal arrangements, safety requirements and payment cycle before onboarding.</p>
              </div>

              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                <h3 class="text-lg font-bold text-neutral-950">Contract and Internship Opportunities</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">Some workers search for contract catering jobs in Chennai, while students and hospitality learners search for catering internships in Chennai. Contract work should include a clear duration and scope. An internship should explain the learning role, hours, supervision and whether any stipend is offered.</p>
                <p class="text-sm text-neutral-700 leading-relaxed">Do not assume that "internship" means unpaid work with unlimited hours. Do not assume that "contract" means the same thing as full-time employment. Read the terms and ask questions before committing.</p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-neutral-950">Catering Jobs for Freshers, Supervisors &amp; Managers</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                <h3 class="text-lg font-bold text-neutral-950">Catering Jobs in Chennai for Freshers</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">There are opportunities for catering workers in Chennai for freshers, particularly in helper, serving, packing, cleaning and event-support roles. Previous experience may be preferred for some positions, but beginners can still be considered when the employer provides instructions and the worker is punctual and willing to learn.</p>
                <p class="text-sm text-neutral-700 leading-relaxed">Freshers should focus on listings that clearly state duties and requirements without demanding upfront fees. Highlight practical strengths such as punctuality, weekend availability, stamina, basic communication, and familiarity with your part of Chennai.</p>
              </div>
              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                <h3 class="text-lg font-bold text-neutral-950">Catering Manager and Supervisor Jobs</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">Experienced professionals managing catering teams coordinate staff allocation, vendor communication, kitchen-to-service timelines, stock control, guest service standards, and issue resolution.</p>
                <p class="text-sm text-neutral-700 leading-relaxed">A supervisor serves as the key point of contact on-site. Employers must define decision-making authority and ensure supervisors know approved headcounts and payment settlement workflows.</p>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-neutral-950">The Payment Lesson I Do Not Want Workers to Learn the Hard Way</h2>
            <p class="text-neutral-700 leading-relaxed">Denied and delayed payments are not minor inconveniences for a daily-wage worker. If a worker completes an eight-hour event shift and payment is withheld, the loss can affect rent, food, travel and family expenses.</p>
            <p class="text-neutral-700 leading-relaxed">I have seen how quickly trust disappears when a worker is told, "I will pay you tomorrow," and tomorrow becomes next week. I have also seen organisers become frustrated when a team member leaves because the payment expectation was never written down.</p>
            <p class="text-neutral-700 leading-relaxed">The solution is simple in principle: agree before the shift, record attendance, confirm completion and make the payment process visible. Technology cannot remove every dispute, but a structured workflow can reduce misunderstandings and create a record of what was accepted.</p>
            <p class="text-neutral-700 leading-relaxed">Workers should keep the job details, reporting instructions, supervisor name and payment terms. Employers should confirm the number of workers, approved rate and completion status. Neither side should depend only on a verbal promise.</p>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-neutral-950">Checklist Before Accepting Any Catering Job &amp; Chennai Localities</h2>
            <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
              <h3 class="text-lg font-bold text-neutral-950">Pre-Shift Verification Checklist</h3>
              <p class="text-sm text-neutral-700 leading-relaxed">Before travelling, verify the employer or platform, exact venue, reporting time, shift duration, role, payment calculation and contact person. Ask whether the work involves lifting, outdoor heat, late-night travel or special clothing.</p>
              <p class="text-sm text-neutral-700 leading-relaxed">Do not share Aadhaar, bank details, passwords or private documents in a public WhatsApp group. Use the official application process or a verified employer channel. Be especially careful with messages that demand money before revealing the job location.</p>
            </div>
            <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
              <h3 class="text-lg font-bold text-neutral-950">Chennai Areas Where Catering Work Frequently Appears</h3>
              <p class="text-sm text-neutral-700 leading-relaxed">Catering and event work can appear across Chennai and nearby suburbs, including <strong>Anna Nagar, Velachery, Taramani, Guindy, OMR, Tambaram, Chromepet, Porur, Ambattur, ECR</strong> and other growing residential and commercial areas. Availability changes continuously, so an old post should not be treated as a current vacancy.</p>
              <p class="text-sm text-neutral-700 leading-relaxed">Search by the area you can realistically reach. A job that looks attractive on paper may not be suitable if travel cost and transit time consume most of the payment. Confirm the exact venue before accepting the shift.</p>
            </div>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-neutral-950">Frequently Asked Questions About Catering Jobs in Chennai</h2>
            <div class="space-y-3">
              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1">
                <h3 class="text-base font-bold text-neutral-950">Where can I find catering workers in Chennai?</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">You can search through verified staffing marketplaces, established catering companies, hotels, marriage halls and trusted local employers. Ziggers offers a Chennai catering staffing route for employers who need temporary event workers and for workers looking for local gig opportunities.</p>
              </div>
              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1">
                <h3 class="text-base font-bold text-neutral-950">Are there catering jobs in Chennai for freshers?</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">Yes, some employers consider freshers for serving, kitchen-helper, packing, cleaning and event-support roles. Requirements vary, so read the current listing and confirm the duties before applying.</p>
              </div>
              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1">
                <h3 class="text-base font-bold text-neutral-950">Are daily payment catering jobs in Chennai genuine?</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">Some are genuine, but "daily payment" does not always mean instant cash after the shift. Confirm the amount, approval process, payment date and deductions. Never pay an unexplained upfront fee to obtain a job.</p>
              </div>
              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1">
                <h3 class="text-base font-bold text-neutral-950">How can I find marriage catering jobs in Chennai?</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">Look for current listings from catering companies, event staffing platforms and wedding venues. Confirm the venue, shift timing, role, dress code and payment terms before travelling.</p>
              </div>
              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1">
                <h3 class="text-base font-bold text-neutral-950">Can I hire catering workers for one day in Chennai?</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">Yes. One-day staffing is common for weddings, receptions, corporate events and private parties. Share the event date, location, headcount, roles and shift timing when requesting staff.</p>
              </div>
              <div class="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1">
                <h3 class="text-base font-bold text-neutral-950">How can I contact catering workers in Chennai?</h3>
                <p class="text-sm text-neutral-700 leading-relaxed">Use a verified staffing platform or a recognised employer channel instead of relying on random contact numbers forwarded through social media. Protect personal documents and confirm the job before sharing sensitive information.</p>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-neutral-950">Final Word</h2>
            <p class="text-neutral-700 leading-relaxed">The search for catering services in Chennai, catering service jobs in Chennai, catering boy jobs in Chennai, catering services part-time jobs in Chennai and catering workers in Chennai contact numbers all points to the same underlying need: a trustworthy connection between local work and local people.</p>
            <p class="text-neutral-700 leading-relaxed">As someone building Ziggers from Chennai, I want that connection to be clearer. Workers should not have to chase payment after completing honest work. Event organisers should not have to depend on unknown contacts when their function is approaching.</p>
            <p class="text-neutral-700 leading-relaxed">Verified identity, clear shift information and a transparent payment process are practical steps toward solving that problem. That is the standard I believe Chennai’s catering and gig-work ecosystem should move toward.</p>
            <p class="text-neutral-700 leading-relaxed font-semibold">Are you looking for catering workers in Chennai, or are you a worker looking for your next catering shift? Start with a verified listing, confirm the terms and choose work where both sides know what to expect.</p>
          </div>

          <div class="space-y-2 pt-2 border-t border-neutral-200 text-sm">
            <h3 class="font-bold text-neutral-950">References</h3>
            <ul class="space-y-1 text-xs text-neutral-600">
              <li>[1] <a href="https://www.ziggers.in/" target="_blank" rel="noopener noreferrer" class="underline font-semibold text-neutral-950">Hire Catering Staff in Chennai — Ziggers</a> (Official Portal)</li>
              <li>[2] <a href="https://www.ziggers.in/" target="_blank" rel="noopener noreferrer" class="underline font-semibold text-neutral-950">10th and 12th Pass Part-Time Jobs in Chennai for Freshers — Ziggers</a></li>
              <li>[3] <a href="/about/" class="underline font-semibold text-neutral-950">Vijayrajkumar — Chief Operating Officer and Venture Builder in Chennai</a></li>
              <li>[4] <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer" class="underline font-semibold text-neutral-950">Ziggers Staffing App on Google Play</a></li>
            </ul>
          </div>
        </section>

        <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-neutral-500">About the Author</span>
            <h3 class="text-base font-bold text-neutral-950">Vijayrajkumar</h3>
            <p class="text-xs text-neutral-700 max-w-xl">Vijayrajkumar is a Chennai-based Chief Operating Officer and venture builder. Through Ziggers, he works on practical systems for flexible local work, event staffing and gig-economy operations.</p>
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

  // Replace Title & Meta Title
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
  pageHtml = pageHtml.replace(
    /<meta name="title" content=".*?" \/>/,
    `<meta name="title" content="${route.title}" />`
  );

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
  .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="404: Page Not Found | Vijayrajkumar" />`)
  .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="The requested page could not be found. Return to Vijayrajkumar homepage or about page." />`)
  .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="https://www.vijayrajkumar.in/404" />`)
  .replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root"><div class="max-w-xl mx-auto px-6 py-24 text-center font-sans space-y-4"><h1 class="text-4xl font-bold text-neutral-950">404 - Page Not Found</h1><p class="text-neutral-600">The requested page could not be found within the Vijayrajkumar site.</p><div class="pt-4 flex justify-center gap-4 text-xs font-semibold"><a href="/" class="underline text-neutral-950">Home</a> · <a href="/about/" class="underline text-neutral-950">About</a> · <a href="/ventures/" class="underline text-neutral-950">Ventures</a> · <a href="/writing/" class="underline text-neutral-950">Writing</a></div></div></div>`
  );

fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf8');
console.log(`Generated 404 HTML: ${path.join(distDir, '404.html')}`);

console.log('All static route HTML files successfully created.');
