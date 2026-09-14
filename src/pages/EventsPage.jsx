import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DecayCard from '../components/react-bits/DecayCard';
import { Calendar, MapPin, Award, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

const EVENTS_DATA = [
  {
    id: 'global-education-summit',
    title: 'India Global Education Summit',
    category: 'Keynote & AI Showcase',
    venue: 'Kalaivaanar Arangam, Chennai',
    date: 'February 2026',
    role: 'Official Delegate & Presenter',
    venture: 'LoopMemory & Loopverse',
    ventureLink: '/ventures/loopmemory/',
    image: '/events/global-education-summit.png',
    summary:
      'Represented Unfounded and presented the LoopMemory persistent context architecture to international education leaders, AI researchers, and ministry delegations at Kalaivaanar Arangam.',
    takeaways: [
      'Showcased cognitive knowledge graph memory engine for personalized learning agents.',
      'Engaged with academic chancellors and global technology delegations.',
      'Demonstrated 68% token reduction in multi-turn assistant workflows.'
    ]
  },
  {
    id: 'kazakhstan-india-forum',
    title: 'Kazakhstan - India Innovation Forum',
    category: 'Bilateral Trade & Venture Delegation',
    venue: 'Chennai International Centre',
    date: 'January 2026',
    role: 'Startup Delegation Representative',
    venture: 'Unfounded Venture Studio',
    ventureLink: '/about/',
    image: '/events/kazakhstan-india-forum.png',
    summary:
      'Participated in bilateral innovation dialogues connecting Central Asian venture corridors with South Indian technology ecosystems, focusing on cross-border software exports and AI collaboration.',
    takeaways: [
      'Strategic discussions on cross-border venture building and talent mobility.',
      'Presented venture studio methodologies and rapid AI deployment models.',
      'Networked with diplomatic delegations and technology park representatives.'
    ]
  },
  {
    id: 'saasathon-ssn',
    title: "SaaSathoN '26 @ SSN College",
    category: '36-Hour National Builder Sprint',
    venue: 'SSN College of Engineering, Chennai',
    date: 'January 2026',
    role: 'Co-Founder & System Architect',
    venture: 'LoopMemory Developer API',
    ventureLink: '/ventures/loopmemory/',
    image: '/events/saasathon-ssn.png',
    summary:
      'Checked into the intensive 36-hour SaaSathoN builder sprint at SSN College, pressure-testing LoopMemory under extreme agentic traffic and shipping developer API endpoints in real-time.',
    takeaways: [
      'Stress-tested persistent memory graphs under high concurrency.',
      'Validated sub-80ms semantic retrieval across 50,000+ extracted facts.',
      'Earned high commendation from enterprise engineering judges.'
    ]
  },
  {
    id: 'startup-pitchfest-kanyakumari',
    title: 'Startup Pitchfest 2026 Finals',
    category: 'Statewide Venture Finals',
    venue: 'Kanyakumari, Tamil Nadu',
    date: '2026',
    role: 'Top Startup Finalist & Pitch Lead',
    venture: 'Ziggers Gig Marketplace',
    ventureLink: '/ventures/ziggers/',
    image: '/events/startup-pitchfest-kanyakumari.png',
    summary:
      'Selected among elite startup finalists across Tamil Nadu. Pitched the Ziggers verified gig marketplace to venture capitalists, angel syndicates, and government startup incubators.',
    takeaways: [
      'Pitched geo-fenced check-in and milestone escrow payment innovations.',
      'Demonstrated 45% to < 5% worker no-show rate reduction.',
      'Finalist recognition across regional angel investor syndicates.'
    ]
  }
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto px-6 lg:px-12 py-16 space-y-16">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs text-[var(--color-text-muted)] font-medium">
          <a href="/" className="hover:text-[var(--color-accent-primary)]">Home</a>
          <span>/</span>
          <span className="text-[var(--color-text-muted)]">Overview</span>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-semibold">Events & Summits</span>
        </div>

        {/* Page Header */}
        <div className="space-y-4 border-b border-[#7A968B]/40 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[#E2ECE7] text-[#1B2F21] border border-[#85A296] text-xs px-3.5 py-1 rounded-full font-bold shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#1B2F21]" />
            <span>Summits, Hackathons & Keynotes</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111815] leading-tight">
            Vijayrajkumar — Events, Summits &amp; Builder Sprints
          </h1>

          <p className="text-lg text-[#1D2B24] leading-relaxed max-w-3xl font-medium">
            Firsthand photo records and verified milestones from global summits, international delegations, 36-hour builder sprints, and startup pitchfest finals where Vijayrajkumar represented Unfounded, Ziggers, and LoopMemory.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-[#2A3E34] font-semibold">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#203322]" />
              <span>Interactive physics: Hover over event cards to experience dynamic liquid displacement</span>
            </div>
            <span className="text-[#85A296]">•</span>
            <a href="/about/" className="font-bold text-[#203322] hover:underline">
              About Vijayrajkumar →
            </a>
          </div>
        </div>

        {/* 4 Interactive DecayCard Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {EVENTS_DATA.map((evt) => (
            <div
              key={evt.id}
              className="bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-3xl p-6 sm:p-7 shadow-md transition-all flex flex-col space-y-6"
            >
              {/* Interactive DecayCard Canvas Visual */}
              <div className="w-full flex justify-center items-center overflow-hidden rounded-2xl bg-[#0B1510] py-4">
                <DecayCard
                  width={310}
                  height={400}
                  image={evt.image}
                  baseFrequency={0.018}
                  numOctaves={4}
                  seed={7}
                  maxDisplacement={380}
                  movementBound={45}
                >
                  <div className="text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.95)]">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#98B5A9] font-bold block mb-1">
                      {evt.category}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                      {evt.title}
                    </h2>
                  </div>
                </DecayCard>
              </div>

              {/* Event Metadata & Verified Takeaways */}
              <div className="space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#2A3E34] font-medium border-b border-[#7A968B]/30 pb-3">
                    <span className="flex items-center space-x-1.5 font-bold text-[#111815]">
                      <MapPin className="w-3.5 h-3.5 text-[#203322] shrink-0" />
                      <span>{evt.venue}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-[#2A3E34]">
                      <Calendar className="w-3.5 h-3.5 text-[#203322] shrink-0" />
                      <span>{evt.date}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#111815] leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-sm text-[#1D2B24] leading-relaxed">
                    {evt.summary}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2A3E34] block">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1 text-xs text-[#1D2B24]">
                      {evt.takeaways.map((highlight, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#203322] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#7A968B]/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#203322] inline-flex items-center space-x-1">
                    <Award className="w-3.5 h-3.5 text-[#203322]" />
                    <span>{evt.role}</span>
                  </span>
                  <a
                    href={evt.ventureLink}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#203322] hover:underline"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
