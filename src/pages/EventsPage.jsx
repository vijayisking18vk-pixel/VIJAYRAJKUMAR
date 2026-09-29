import React from 'react';
import Footer from '../components/Footer';
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
    venture: 'BAL Carpet Partnership & Unfounded Studio',
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
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-futura selection:bg-[var(--color-accent-primary)] selection:text-white flex flex-col">

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20 space-y-12 sm:space-y-16 min-w-0">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bank uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
          <a href="/" className="hover:text-[var(--color-accent-primary)]">Home</a>
          <span>/</span>
          <span className="text-[var(--color-text-muted)]">Overview</span>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-bold">Events &amp; Summits</span>
        </div>

        {/* Page Header */}
        <div className="space-y-4 border-b border-[var(--gta-silhouette)]/40 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[var(--gta-sky-low)] text-[var(--gta-text-outline)] border border-[var(--gta-silhouette)] text-xs px-3.5 py-1 rounded-full font-bank uppercase tracking-wider font-bold shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[var(--gta-text-outline)]" />
            <span>Summits, Hackathons &amp; Keynotes</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-pricedown font-bold tracking-wide text-[var(--gta-text-outline)] leading-tight">
            Vijayrajkumar — Events, Summits &amp; Builder Sprints
          </h1>

          <p className="text-base sm:text-lg text-[var(--gta-text-outline)] leading-relaxed max-w-3xl font-futura">
            Firsthand photo records and verified milestones from global summits, international delegations, 36-hour builder sprints, and startup pitchfest finals where Vijayrajkumar represented Unfounded, Ziggers, and LoopMemory.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-bank uppercase tracking-wider text-[var(--gta-silhouette)]">
            <div className="flex items-center space-x-2 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-primary)]" />
              <span>Verified documentary photographs and event credentials</span>
            </div>
            <span className="text-[var(--gta-silhouette)]">•</span>
            <a href="/about/" className="font-bold text-[var(--color-accent-primary)] hover:underline">
              About Vijayrajkumar →
            </a>
          </div>
        </div>

        {/* Clean Framed Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {EVENTS_DATA.map((evt) => (
            <div
              key={evt.id}
              className="group bg-[var(--gta-text-fill-light)] border-2 border-[var(--gta-silhouette)] hover:border-[var(--color-accent-primary)] rounded-3xl p-5 sm:p-7 shadow-md transition-all flex flex-col space-y-6"
            >
              {/* Framed Photograph with Aspect Ratio Preservation */}
              <div className="w-full overflow-hidden rounded-2xl bg-[var(--gta-sky-horizon)] border border-[var(--gta-silhouette)]/40 aspect-[4/3] relative">
                <img
                  src={evt.image}
                  alt={`${evt.title} event photograph`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute top-3 left-3 bg-[#11100E]/85 backdrop-blur-sm text-[var(--gta-text-fill)] border border-[var(--gta-silhouette)]/40 px-3 py-1 rounded-full text-[10px] font-bank uppercase tracking-wider font-bold">
                  {evt.category}
                </div>
              </div>

              {/* Event Metadata & Verified Takeaways Outside Frame */}
              <div className="space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bank uppercase tracking-wider text-[var(--color-text-muted)] border-b border-[var(--gta-silhouette)]/30 pb-3 font-semibold">
                    <span className="flex items-center space-x-1.5 font-bold text-[var(--gta-text-outline)]">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-accent-primary)] shrink-0" />
                      <span>{evt.venue}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-[var(--color-text-muted)]">
                      <Calendar className="w-3.5 h-3.5 text-[var(--color-accent-primary)] shrink-0" />
                      <span>{evt.date}</span>
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-futura font-bold text-[var(--gta-text-outline)] leading-snug">
                    {evt.title}
                  </h2>

                  <p className="text-sm text-[var(--gta-text-outline)] leading-relaxed font-futura">
                    {evt.summary}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-bank uppercase tracking-widest text-[var(--color-accent-primary)] font-bold block">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1 text-xs text-[var(--gta-text-outline)] font-futura">
                      {evt.takeaways.map((highlight, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-accent-primary)] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--gta-silhouette)]/30 flex flex-wrap items-center justify-between gap-2 font-bank uppercase tracking-wider text-xs">
                  <div className="flex flex-col">
                    <span className="font-bold text-[var(--color-accent-primary)] inline-flex items-center space-x-1">
                      <Award className="w-3.5 h-3.5 text-[var(--color-accent-primary)]" />
                      <span>{evt.role}</span>
                    </span>
                    <span className="text-[10px] text-[var(--gta-silhouette)] font-medium">
                      {evt.venture}
                    </span>
                  </div>
                  <a
                    href={evt.ventureLink}
                    className="inline-flex items-center space-x-1 font-bold text-[var(--color-accent-primary)] hover:underline"
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
