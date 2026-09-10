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
    title: 'About | Chief Operating Officer & Venture Builder in Chennai',
    description: 'Learn about Vijayrajkumar, Chief Operating Officer and co-founder at Unfounded, Ziggers, and LoopMemory. Background in Defence and Strategic Studies (SRMIST) and Hindi Literature.',
    canonical: 'https://vijayrajkumar.vercel.app/about/',
    heading: 'About Vijayrajkumar',
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-12 font-sans">
        <nav class="text-xs text-neutral-500 mb-6"><a href="/">Home</a> / <span>About</span></nav>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">Chief Operating Officer & Venture Builder</h1>
        <p class="text-lg text-neutral-600 leading-relaxed">Based on-site in Chennai, Tamil Nadu. Building marketplaces and AI cognitive infrastructure as Chief Operating Officer & Co-founder at Unfounded, Ziggers, and LoopMemory.</p>
        
        <section class="space-y-4 pt-6 border-t border-neutral-200">
          <h2 class="text-2xl font-bold text-neutral-950">About Me & Philosophy</h2>
          <p class="text-neutral-700 leading-relaxed">I am a venture builder based on-site in Chennai, Tamil Nadu. My work sits at the intersection of product architecture, operational execution, and go-to-market distribution.</p>
          <p class="text-neutral-700 leading-relaxed">Rather than approaching venture building as purely software engineering, I treat it as strategic system design. My background spans literature, geopolitics, and defence strategy — fields that study how incentives, communications, and power dynamics govern human systems at scale.</p>
        </section>

        <section class="space-y-6 pt-6 border-t border-neutral-200">
          <h2 class="text-2xl font-bold text-neutral-950">Academic Credentials</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
              <span class="text-xs text-neutral-500 font-medium">Apr 2023 – Apr 2026</span>
              <h3 class="text-lg font-bold text-neutral-950 mt-1">B.Sc. in Defence & Strategic Studies</h3>
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
            <li><a href="/ventures/ziggers/" class="font-bold underline text-neutral-950">Ziggers</a> — Local Gig-Economy Marketplace (COO & Co-Founder)</li>
            <li><a href="/ventures/loopmemory/" class="font-bold underline text-neutral-950">LoopMemory</a> — AI Context & Memory Infrastructure (COO & Co-Founder)</li>
            <li><a href="/ventures/" class="font-bold underline text-neutral-950">Unfounded Venture Studio</a> — Chennai Studio Core (COO & Co-Founder)</li>
          </ul>
        </section>
      </div>
    `
  },
  {
    path: 'ventures',
    title: 'Ventures & Case Studies | Chief Operating Officer & Builder',
    description: 'Explore ventures co-founded and operated by Vijayrajkumar in Chennai: Ziggers (local gig marketplace), LoopMemory (AI context engine), and Unfounded Venture Studio.',
    canonical: 'https://vijayrajkumar.vercel.app/ventures/',
    heading: 'Ventures & Case Studies',
    content: `
      <div class="max-w-6xl mx-auto px-6 py-16 space-y-12 font-sans">
        <nav class="text-xs text-neutral-500 mb-6"><a href="/">Home</a> / <span>Ventures</span></nav>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">Ventures, Marketplaces & AI Systems</h1>
        <p class="text-lg text-neutral-600 leading-relaxed max-w-3xl">Detailed case studies of ventures co-founded and operated by me. Each study outlines the systemic problem, target audience, personal ownership, deliverables shipped, and verifiable evidence.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-neutral-200">
          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4">
            <span class="text-xs font-semibold px-2.5 py-1 bg-white border border-neutral-200 rounded-full text-neutral-800">Product Hunt Launched</span>
            <h2 class="text-2xl font-bold text-neutral-950"><a href="/ventures/ziggers/">Ziggers</a></h2>
            <p class="text-xs font-semibold text-neutral-800">Chief Operating Officer & Co-Founder · Product & Growth</p>
            <p class="text-sm text-neutral-600">Local gig-economy marketplace replacing unorganized WhatsApp hiring with verified workers, geo-tracking, and milestone escrow payouts.</p>
            <div class="pt-2"><a href="/ventures/ziggers/" class="font-bold text-xs underline text-neutral-950">Read full case study →</a></div>
          </div>

          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4">
            <span class="text-xs font-semibold px-2.5 py-1 bg-white border border-neutral-200 rounded-full text-neutral-800">IGES Summit Showcase</span>
            <h2 class="text-2xl font-bold text-neutral-950"><a href="/ventures/loopmemory/">LoopMemory</a></h2>
            <p class="text-xs font-semibold text-neutral-800">Chief Operating Officer & Co-Founder · Context Architecture</p>
            <p class="text-sm text-neutral-600">Persistent cognitive memory engine and knowledge graph for AI agents, preventing session context loss and reducing token overhead.</p>
            <div class="pt-2"><a href="/ventures/loopmemory/" class="font-bold text-xs underline text-neutral-950">Read full case study →</a></div>
          </div>

          <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4">
            <span class="text-xs font-semibold px-2.5 py-1 bg-white border border-neutral-200 rounded-full text-neutral-800">Venture Studio Core</span>
            <h2 class="text-2xl font-bold text-neutral-950">Unfounded</h2>
            <p class="text-xs font-semibold text-neutral-800">Chief Operating Officer & Co-Founder · Studio Orchestration</p>
            <p class="text-sm text-neutral-600">Chennai-based venture studio incubating parallel high-conviction ventures through rapid vibe coding execution and strategic ecosystem partnerships.</p>
            <div class="pt-2"><a href="/about/" class="font-bold text-xs underline text-neutral-950">About Founder & Studio →</a></div>
          </div>
        </div>
      </div>
    `
  },
  {
    path: 'ventures/ziggers',
    title: 'Ziggers Case Study | Vijayrajkumar · Co-Founder & Product Direction',
    description: 'Read the comprehensive case study on Ziggers: a Chennai-first gig staffing marketplace co-founded by Vijayrajkumar. Solving informal WhatsApp hiring with milestone escrow.',
    canonical: 'https://vijayrajkumar.vercel.app/ventures/ziggers/',
    heading: 'Ziggers Case Study',
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-12 font-sans">
        <nav class="text-xs text-neutral-500 mb-6"><a href="/">Home</a> / <a href="/#ventures">Ventures</a> / <span>Ziggers</span></nav>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">Ziggers — Local Gig-Economy & Staffing Marketplace</h1>
        <p class="text-lg text-neutral-600 leading-relaxed">A Chennai-first gig staffing marketplace built to replace informal WhatsApp hiring with verified workers, real-time tracking, and milestone-based escrow payments.</p>
        
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
            <p class="text-neutral-600">Co-founded the venture, shaped product direction, user onboarding flows, marketplace matching rules, and the milestone escrow payment logic.</p>
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
    title: 'LoopMemory Case Study | Chief Operating Officer & Context Architecture',
    description: 'Read the comprehensive case study on LoopMemory: persistent context and cognitive memory engine for AI agents co-founded and operated by Vijayrajkumar. Featured at India Global Education Summit.',
    canonical: 'https://vijayrajkumar.vercel.app/ventures/loopmemory/',
    heading: 'LoopMemory Case Study',
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-12 font-sans">
        <nav class="text-xs text-neutral-500 mb-6"><a href="/">Home</a> / <a href="/#ventures">Ventures</a> / <span>LoopMemory</span></nav>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">LoopMemory — Persistent Context & Memory for AI Agents</h1>
        <p class="text-lg text-neutral-600 leading-relaxed">A developer-focused context and cognitive architecture engine solving LLM context loss across multi-turn sessions and agentic workflows.</p>
        
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
            <h2 class="font-bold text-neutral-950 mb-2">3. What I Personally Owned</h2>
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
    path: 'writing',
    title: 'Writing & Strategic Research | Vijayrajkumar',
    description: 'Thought leadership and essays by Vijayrajkumar on local gig marketplaces, persistent context memory for AI agents, and applying defence doctrines to startup building.',
    canonical: 'https://vijayrajkumar.vercel.app/writing/',
    heading: 'Writing & Strategic Research',
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-12 font-sans">
        <nav class="text-xs text-neutral-500 mb-6"><a href="/">Home</a> / <span>Writing</span></nav>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">Writing, Engineering & Venture Strategy</h1>
        <p class="text-lg text-neutral-600 leading-relaxed">First-party perspectives on building marketplace infrastructure in India, architecting cognitive AI memory layers, and applying strategic defence doctrines to startup venture incubation.</p>

        <div class="space-y-8 pt-6 border-t border-neutral-200">
          <article class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
            <span class="text-xs uppercase font-bold text-neutral-500">Marketplace Mechanics & Labor Ops</span>
            <h2 class="text-2xl font-bold text-neutral-950">Building a Local Gig Marketplace in Chennai: Lessons Beyond WhatsApp Groups</h2>
            <p class="text-xs text-neutral-500">By COO & Co-Founder, Ziggers • Feb 2026 • 6 min read</p>
            <p class="text-sm text-neutral-600 leading-relaxed">Why informal WhatsApp hiring collapses at scale in Indian tier-1 cities, how milestone-based escrow resolves worker skepticism, and the operational playbook for building two-sided liquidity without cash burn.</p>
          </article>

          <article class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
            <span class="text-xs uppercase font-bold text-neutral-500">AI Infrastructure & Cognitive Systems</span>
            <h2 class="text-2xl font-bold text-neutral-950">Designing Persistent Context & Memory Architecture for AI Agents</h2>
            <p class="text-xs text-neutral-500">By COO & Co-Founder, LoopMemory • Jan 2026 • 8 min read</p>
            <p class="text-sm text-neutral-600 leading-relaxed">The technical and cognitive design challenges of multi-session AI agents: why dumping chat histories into large prompt windows causes context rot, and how hierarchical memory graphs solve long-term agent reasoning.</p>
          </article>

          <article class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
            <span class="text-xs uppercase font-bold text-neutral-500">Strategy, Game Theory & Operations</span>
            <h2 class="text-2xl font-bold text-neutral-950">From Geopolitics and Defence Strategy to Startup Venture Studios</h2>
            <p class="text-xs text-neutral-500">By COO & Co-Founder, Unfounded • Dec 2025 • 7 min read</p>
            <p class="text-sm text-neutral-600 leading-relaxed">How academic frameworks in international security, intelligence doctrine, and deterrence strategy directly translate into early-stage startup execution, competitive defensibility, and rapid vibe coding.</p>
          </article>
        </div>
      </div>
    `
  },
  {
    path: 'contact',
    title: 'Contact & Collaboration | Chief Operating Officer · Chennai, India',
    description: 'Get in touch with Vijayrajkumar. Chief Operating Officer and co-founder at Unfounded, Ziggers, and LoopMemory. Open to venture partnerships, operational collaboration, and speaking.',
    canonical: 'https://vijayrajkumar.vercel.app/contact/',
    heading: 'Contact Me',
    content: `
      <div class="max-w-4xl mx-auto px-6 py-16 space-y-12 font-sans">
        <nav class="text-xs text-neutral-500 mb-6"><a href="/">Home</a> / <span>Contact</span></nav>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">Start a Conversation with Me</h1>
        <p class="text-lg text-neutral-600 leading-relaxed">I usually respond within two working days. Reach out regarding venture partnerships, operational collaboration, product growth, startup ecosystems, or speaking and research opportunities.</p>

        <div class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3 text-sm">
          <p><strong>Base:</strong> Chennai, Tamil Nadu, India (On-site)</p>
          <p><strong>Response Commitment:</strong> Within 2 business days</p>
          <p><strong>Direct Email:</strong> <a href="mailto:contact@unfounded.in" class="underline font-bold text-neutral-950">contact@unfounded.in</a></p>
          <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/" target="_blank" rel="noopener noreferrer" class="underline font-bold text-neutral-950">linkedin.com/in/vijayraj-kumar-3042b43a3/</a></p>
        </div>
      </div>
    `
  }
];

// Generate files
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

  const outputPath = path.join(targetDir, 'index.html');
  fs.writeFileSync(outputPath, pageHtml, 'utf8');
  console.log(`Generated static route HTML: ${outputPath}`);
});

console.log('All static route HTML files successfully created.');
