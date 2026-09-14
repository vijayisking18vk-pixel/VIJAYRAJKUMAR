import React from 'react';
import { 
  User, 
  MapPin, 
  Briefcase, 
  BookOpen, 
  Shield, 
  Layers, 
  Zap, 
  Calendar, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Mail, 
  Share2, 
  Award, 
  Cpu, 
  Compass,
  FileText
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CollaborationDispatch from '../components/CollaborationDispatch';
import SocialLinks from '../components/SocialLinks';

export default function ProfilePage() {
  const currentRoles = [
    {
      venture: 'Unfounded Venture Studio',
      role: 'Chief Operating Officer & Co-Founder',
      period: '2025 – Present',
      location: 'Chennai, India · On-site',
      description: 'Co-founding and incubating parallel tech ventures. Leading studio operational framework, rapid prototyping, cross-functional team orchestration, and go-to-market execution.',
      link: '/about/'
    },
    {
      venture: 'Ziggers',
      role: 'Chief Operating Officer & Co-Founder',
      period: '2025 – Present',
      location: 'Chennai, India · On-site',
      description: 'Local gig-economy marketplace replacing unorganized WhatsApp hiring with geo-fenced worker verification, automated shift tracking, and milestone-based escrow payouts.',
      link: '/ventures/ziggers/',
      external: 'https://www.ziggers.in/'
    },
    {
      venture: 'LoopMemory',
      role: 'Chief Operating Officer & Co-Founder',
      period: '2025 – Present',
      location: 'Chennai, India · On-site',
      description: 'Persistent context and cognitive memory layer for autonomous AI agents, eliminating multi-turn context rot and reducing token overhead by up to 68%.',
      link: '/ventures/loopmemory/',
      external: 'https://www.loopmemory.in/'
    }
  ];

  const timelineMilestones = [
    {
      year: '2026',
      title: 'Ziggers Production Launch & Ecosystem Growth',
      detail: 'Launched Ziggers across Chennai event and logistics venues; pitched at Startup Pitchfest 2026 Finals in Kanyakumari; introduced milestone escrow architecture reducing worker no-shows to under 5%.'
    },
    {
      year: '2026',
      title: 'LoopMemory Showcase & Builder Sprints',
      detail: 'Official delegate and presenter at India Global Education Summit (IGES) at Kalaivaanar Arangam; stress-tested agent memory engine at SaaSathoN \'26 36-hour sprint at SSN College of Engineering.'
    },
    {
      year: '2026',
      title: 'Kazakhstan-India Innovation Delegation',
      detail: 'Represented Unfounded at the Kazakhstan-India Business Forum, exploring cross-border technology export and bilateral venture collaboration.'
    },
    {
      year: '2025',
      title: 'Co-Founded Unfounded Venture Studio',
      detail: 'Established studio operations in Chennai to build and scale high-frequency, high-conviction software ventures using rapid vibe coding and disciplined systems thinking.'
    },
    {
      year: '2023–2026',
      title: 'B.Sc. in Defence & Strategic Studies at SRMIST',
      detail: 'Specialized in international security, conflict dynamics, game theory, deterrence, and strategic decision-making frameworks.'
    },
    {
      year: '2016–2021',
      title: 'Master of Arts (MA) in Hindi Literature',
      detail: 'Mastered linguistic morphology, classical literature, and dialectic communication at Dakshina Bharat Hindi Prachar Sabha.'
    }
  ];

  const writings = [
    {
      slug: 'gig-marketplace-chennai',
      title: 'Building a Local Gig Marketplace in Chennai: Lessons Beyond WhatsApp Groups',
      category: 'Labor Ops & Marketplaces',
      date: 'February 2026',
      summary: 'Why informal WhatsApp hiring collapses at scale in Indian tier-1 cities, how milestone-based escrow resolves worker skepticism, and the operational playbook for two-sided liquidity without cash burn.'
    },
    {
      slug: 'ai-persistent-context-architecture',
      title: 'Designing Persistent Context & Memory Architecture for AI Agents',
      category: 'AI Infrastructure & Memory',
      date: 'January 2026',
      summary: 'The technical and cognitive design challenges of multi-session AI agents: why dumping chat histories into large prompt windows causes context rot, and how hierarchical memory graphs solve long-term agent reasoning.'
    },
    {
      slug: 'geopolitics-defence-venture-building',
      title: 'From Geopolitics and Defence Strategy to Startup Venture Studios',
      category: 'Strategy & Operations',
      date: 'December 2025',
      summary: 'How academic frameworks in international security, intelligence doctrine, and deterrence strategy directly translate into early-stage startup execution, competitive defensibility, and rapid vibe coding.'
    }
  ];

  const competencies = [
    'Venture Incubation & Studio Operations',
    'Marketplace Mechanics & Escrow Systems',
    'AI Agent Memory & Context Architectures',
    'Rapid Vibe Coding & Full-Stack Prototyping',
    'Go-to-Market (GTM) Distribution Strategy',
    'Game Theory & Strategic Decision Making',
    'Cross-Cultural Linguistic Communication',
    'Operational Systems Design & Scaling'
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[var(--color-text-muted)] font-medium">
          <a href="/" className="hover:text-[var(--color-accent-primary)]">Home</a>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-semibold">Executive Profile</span>
        </nav>

        {/* Section 1: Professional Biography & Profile Header */}
        <section aria-labelledby="profile-heading" className="space-y-6 border-b border-[#7A968B]/40 pb-12">
          <div className="inline-flex items-center space-x-2 bg-[#E2ECE7] text-[#1B2F21] border border-[#85A296] text-xs px-3.5 py-1 rounded-full font-bold shadow-sm">
            <User className="w-3.5 h-3.5 text-[#1B2F21]" />
            <span>Executive Dossier · Official Profile</span>
          </div>

          <div className="space-y-3">
            <h1 id="profile-heading" className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111815] leading-tight">
              Vijayrajkumar
            </h1>
            <p className="text-sm font-mono font-semibold uppercase tracking-wider text-[#203322]">
              Chief Operating Officer &amp; Venture Builder · Chennai, India
            </p>
          </div>

          <div className="text-base sm:text-lg text-[#1D2B24] leading-relaxed space-y-4 font-normal">
            <p>
              <strong>Vijayrajkumar</strong> (also referenced professionally as <em>Vijayrajkumar R</em>) is a Chennai-based Chief Operating Officer, startup operator, and venture builder. He operates at the nexus of marketplace mechanics, operational execution, and artificial intelligence context infrastructure.
            </p>
            <p>
              Currently serving as Chief Operating Officer and Co-Founder across <strong>Unfounded</strong>, <strong>Ziggers</strong>, and <strong>LoopMemory</strong>, Vijayrajkumar combines strategic doctrines from Defence &amp; Strategic Studies with cultural and communicative precision from an MA in Hindi Literature to build resilient, incentive-aligned software businesses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#2A3E34] font-medium pt-2">
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-[#203322]" />
              <span>Location: Chennai, Tamil Nadu, India (On-site)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Mail className="w-4 h-4 text-[#203322]" />
              <span>Email: <a href="mailto:vijaykumarunfounded@gmail.com" className="font-bold text-[#203322] hover:underline">vijaykumarunfounded@gmail.com</a></span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Briefcase className="w-4 h-4 text-[#203322]" />
              <span>Availability: Venture Partnerships &amp; Advisory</span>
            </div>
          </div>
        </section>

        {/* Section 2: Current Leadership Roles */}
        <section aria-labelledby="roles-heading" className="space-y-6">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
            <Briefcase className="w-4 h-4 text-[#203322]" />
            <span>Executive Responsibilities</span>
          </div>
          <h2 id="roles-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Current Roles &amp; Leadership
          </h2>

          <div className="space-y-4">
            {currentRoles.map((item, idx) => (
              <div key={idx} className="p-6 bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-2xl space-y-3 shadow-md transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold px-3 py-1 bg-[#E2ECE7] border border-[#85A296] rounded-full text-[#1B2F21]">
                    {item.role}
                  </span>
                  <span className="text-xs text-[#354E45] font-semibold">{item.period}</span>
                </div>
                <h3 className="text-xl font-bold text-[#111815]">{item.venture}</h3>
                <p className="text-sm text-[#1D2B24] leading-relaxed">{item.description}</p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold">
                  <a href={item.link} className="inline-flex items-center space-x-1 text-[#203322] hover:underline">
                    <span>Read case study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  {item.external && (
                    <>
                      <span className="text-[#85A296]">•</span>
                      <a href={item.external} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-[#203322] hover:underline">
                        <span>Live product website</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Venture Portfolio & Operational Metrics */}
        <section aria-labelledby="portfolio-heading" className="space-y-6 border-t border-[#7A968B]/40 pt-12">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
            <Layers className="w-4 h-4 text-[#203322]" />
            <span>Ventures &amp; Measurable Outcomes</span>
          </div>
          <h2 id="portfolio-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Venture Deliverables &amp; Shipped Systems
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white border-2 border-[#7A968B] rounded-2xl space-y-4 shadow-md">
              <span className="text-xs font-bold px-2.5 py-1 bg-[#E2ECE7] text-[#1B2F21] rounded-full">Ziggers Marketplace</span>
              <h3 className="text-lg font-bold text-[#111815]">Local Gig &amp; Shift Staffing</h3>
              <p className="text-xs text-[#1D2B24] leading-relaxed">
                Shipped responsive mobile-web application, real-time geo-fenced worker check-ins, automated shift matching, and instant escrow settlements upon completion.
              </p>
              <div className="pt-2 border-t border-[#7A968B]/20 grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-[#E2ECE7]/50 rounded-lg">
                  <div className="text-lg font-black text-[#203322]">&lt; 5%</div>
                  <div className="text-[10px] font-bold text-[#111815]">No-Show Rate</div>
                </div>
                <div className="p-2 bg-[#E2ECE7]/50 rounded-lg">
                  <div className="text-lg font-black text-[#203322]">&lt; 2 Hrs</div>
                  <div className="text-[10px] font-bold text-[#111815]">Escrow Payout</div>
                </div>
              </div>
              <a href="/ventures/ziggers/" className="block text-xs font-bold text-[#203322] hover:underline pt-1">
                Ziggers in-depth case study →
              </a>
            </div>

            <div className="p-6 bg-white border-2 border-[#7A968B] rounded-2xl space-y-4 shadow-md">
              <span className="text-xs font-bold px-2.5 py-1 bg-[#E2ECE7] text-[#1B2F21] rounded-full">LoopMemory Engine</span>
              <h3 className="text-lg font-bold text-[#111815]">AI Cognitive Context &amp; Memory</h3>
              <p className="text-xs text-[#1D2B24] leading-relaxed">
                Engineered hierarchical tripartite memory (Working, Episodic, Semantic Knowledge Graph) for multi-session AI agents with deterministic decay and relevance pruning.
              </p>
              <div className="pt-2 border-t border-[#7A968B]/20 grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-[#E2ECE7]/50 rounded-lg">
                  <div className="text-lg font-black text-[#203322]">68%</div>
                  <div className="text-[10px] font-bold text-[#111815]">Token Savings</div>
                </div>
                <div className="p-2 bg-[#E2ECE7]/50 rounded-lg">
                  <div className="text-lg font-black text-[#203322]">&lt; 80ms</div>
                  <div className="text-[10px] font-bold text-[#111815]">Query Latency</div>
                </div>
              </div>
              <a href="/ventures/loopmemory/" className="block text-xs font-bold text-[#203322] hover:underline pt-1">
                LoopMemory in-depth case study →
              </a>
            </div>
          </div>
        </section>

        {/* Section 4: Professional Timeline */}
        <section aria-labelledby="timeline-heading" className="space-y-6 border-t border-[#7A968B]/40 pt-12">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
            <Calendar className="w-4 h-4 text-[#203322]" />
            <span>Career Milestones</span>
          </div>
          <h2 id="timeline-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Chronological Track Record
          </h2>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#7A968B] space-y-8">
            {timelineMilestones.map((m, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#203322] border-4 border-[var(--color-background)] shadow-sm" />
                <span className="text-xs font-bold text-[#354E45] uppercase tracking-wider">{m.year}</span>
                <h3 className="text-lg font-bold text-[#111815] mt-0.5">{m.title}</h3>
                <p className="text-sm text-[#1D2B24] leading-relaxed mt-1 font-normal">{m.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Academic Credentials & Strategic Discipline */}
        <section aria-labelledby="education-heading" className="space-y-6 border-t border-[#7A968B]/40 pt-12">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
            <Shield className="w-4 h-4 text-[#203322]" />
            <span>Academic Qualifications</span>
          </div>
          <h2 id="education-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Formal Education &amp; Strategic Training
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white border-2 border-[#7A968B] rounded-2xl space-y-3 shadow-md">
              <div className="w-10 h-10 bg-[#E2ECE7] border border-[#85A296] rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#203322]" />
              </div>
              <span className="text-xs text-[#354E45] font-bold block">April 2023 – April 2026</span>
              <h3 className="text-lg font-bold text-[#111815]">B.Sc. in Defence &amp; Strategic Studies</h3>
              <p className="text-xs font-bold text-[#203322]">SRM Institute of Science and Technology (SRMIST)</p>
              <p className="text-sm text-[#1D2B24] leading-relaxed pt-1">
                Rigorous coursework and research in geopolitics, national security doctrine, conflict simulation, game theory, asymmetric strategy, and international economic diplomacy.
              </p>
            </div>

            <div className="p-6 bg-white border-2 border-[#7A968B] rounded-2xl space-y-3 shadow-md">
              <div className="w-10 h-10 bg-[#E2ECE7] border border-[#85A296] rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#203322]" />
              </div>
              <span className="text-xs text-[#354E45] font-bold block">December 2016 – January 2021</span>
              <h3 className="text-lg font-bold text-[#111815]">Master of Arts (MA) in Hindi Literature</h3>
              <p className="text-xs font-bold text-[#203322]">Dakshina Bharat Hindi Prachar Sabha</p>
              <p className="text-sm text-[#1D2B24] leading-relaxed pt-1">
                Deep analysis of classical and contemporary Hindi literary history, structural linguistics, narrative psychology, and pan-Indian cultural communications.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Events, Delegations & Summits */}
        <section aria-labelledby="events-heading" className="space-y-6 border-t border-[#7A968B]/40 pt-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
              <Award className="w-4 h-4 text-[#203322]" />
              <span>Conferences &amp; Delegations</span>
            </div>
            <a href="/events/" className="text-xs font-bold text-[#203322] hover:underline">
              View all event records →
            </a>
          </div>
          <h2 id="events-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Verified Keynotes, Summits &amp; Sprints
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white border-2 border-[#7A968B] rounded-2xl space-y-2 shadow-sm">
              <span className="text-[11px] font-bold px-2.5 py-0.5 bg-[#E2ECE7] text-[#1B2F21] rounded-full">Official Delegate &amp; Presenter</span>
              <h3 className="text-base font-bold text-[#111815]">India Global Education Summit (IGES)</h3>
              <p className="text-xs text-[#354E45]">Kalaivaanar Arangam, Chennai · February 2026</p>
              <p className="text-xs text-[#1D2B24] leading-relaxed">
                Presented LoopMemory and Loopverse cognitive infrastructure to global educational institutions and government delegations.
              </p>
            </div>

            <div className="p-5 bg-white border-2 border-[#7A968B] rounded-2xl space-y-2 shadow-sm">
              <span className="text-[11px] font-bold px-2.5 py-0.5 bg-[#E2ECE7] text-[#1B2F21] rounded-full">Startup Delegation</span>
              <h3 className="text-base font-bold text-[#111815]">Kazakhstan-India Innovation Forum</h3>
              <p className="text-xs text-[#354E45]">Chennai International Centre · January 2026</p>
              <p className="text-xs text-[#1D2B24] leading-relaxed">
                Engaged in bilateral venture corridors, cross-border technology export, and international supply chain partnerships.
              </p>
            </div>

            <div className="p-5 bg-white border-2 border-[#7A968B] rounded-2xl space-y-2 shadow-sm">
              <span className="text-[11px] font-bold px-2.5 py-0.5 bg-[#E2ECE7] text-[#1B2F21] rounded-full">36-Hour National Sprint</span>
              <h3 className="text-base font-bold text-[#111815]">SaaSathoN &apos;26 @ SSN College</h3>
              <p className="text-xs text-[#354E45]">SSN College of Engineering, Chennai · January 2026</p>
              <p className="text-xs text-[#1D2B24] leading-relaxed">
                Built and launched developer tool APIs under high-intent sprint conditions, validating real-time agent memory retrieval.
              </p>
            </div>

            <div className="p-5 bg-white border-2 border-[#7A968B] rounded-2xl space-y-2 shadow-sm">
              <span className="text-[11px] font-bold px-2.5 py-0.5 bg-[#E2ECE7] text-[#1B2F21] rounded-full">Top State Finalist</span>
              <h3 className="text-base font-bold text-[#111815]">Startup Pitchfest 2026 Finals</h3>
              <p className="text-xs text-[#354E45]">Kanyakumari, Tamil Nadu · 2026</p>
              <p className="text-xs text-[#1D2B24] leading-relaxed">
                Pitched Ziggers to angel networks and venture capitalists, representing breakthrough marketplace mechanics from Chennai.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Published Writing & Strategic Research */}
        <section aria-labelledby="writing-heading" className="space-y-6 border-t border-[#7A968B]/40 pt-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
              <FileText className="w-4 h-4 text-[#203322]" />
              <span>Publications &amp; Essays</span>
            </div>
            <a href="/writing/" className="text-xs font-bold text-[#203322] hover:underline">
              Browse all essays →
            </a>
          </div>
          <h2 id="writing-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Published Writing &amp; Research by Vijayrajkumar
          </h2>

          <div className="space-y-4">
            {writings.map((w, idx) => (
              <a
                key={idx}
                href={`/writing/${w.slug}/`}
                className="block p-6 bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-2xl shadow-sm transition-all group no-underline text-inherit"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#354E45] font-semibold">
                  <span className="uppercase tracking-wider text-[#203322]">{w.category}</span>
                  <span>{w.date}</span>
                </div>
                <h3 className="text-lg font-bold text-[#111815] group-hover:text-[#203322] mt-1 transition-colors">
                  {w.title}
                </h3>
                <p className="text-xs text-[#1D2B24] leading-relaxed mt-2 font-normal">
                  {w.summary}
                </p>
                <div className="pt-3 flex items-center space-x-1 text-xs font-bold text-[#203322] group-hover:translate-x-1 transition-transform">
                  <span>Read full essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Section 8: Strategic & Technical Areas of Expertise */}
        <section aria-labelledby="expertise-heading" className="space-y-6 border-t border-[#7A968B]/40 pt-12">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
            <Zap className="w-4 h-4 text-[#203322]" />
            <span>Core Capabilities</span>
          </div>
          <h2 id="expertise-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Strategic &amp; Technical Competencies
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {competencies.map((comp, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-4 bg-white border-2 border-[#7A968B] rounded-xl text-sm font-bold text-[#111815] shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#203322] shrink-0" />
                <span>{comp}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 9: External Professional Profiles */}
        <section aria-labelledby="profiles-heading" className="space-y-6 border-t border-[#7A968B]/40 pt-12">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
            <Share2 className="w-4 h-4 text-[#203322]" />
            <span>Verified Identity &amp; External Profiles</span>
          </div>
          <h2 id="profiles-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Connect on External Platforms
          </h2>
          <p className="text-sm text-[#1D2B24]">
            Official profiles maintained by Vijayrajkumar across social and developer networks:
          </p>
          <SocialLinks compact={false} />
        </section>

        {/* Section 10: Contact & Collaboration Dispatch */}
        <section aria-labelledby="contact-heading" className="space-y-6 border-t border-[#7A968B]/40 pt-12">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
            <Mail className="w-4 h-4 text-[#203322]" />
            <span>Direct Channel</span>
          </div>
          <h2 id="contact-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Contact &amp; Collaboration Dispatch
          </h2>
          <p className="text-sm text-[#1D2B24] leading-relaxed">
            I respond within two business days. Reach out directly via the form below or email <a href="mailto:vijaykumarunfounded@gmail.com" className="font-bold underline text-[#203322]">vijaykumarunfounded@gmail.com</a> for venture partnerships, product growth, or advisory inquiries.
          </p>
          <CollaborationDispatch />
        </section>

      </main>

      <Footer />
    </div>
  );
}
