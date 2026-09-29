import React, { useState } from 'react';
import { Layers, ArrowUpRight, Zap, Code, Rocket, RotateCcw } from 'lucide-react';
import FuzzyText from './react-bits/FuzzyText';
import ElectricBorder from './react-bits/ElectricBorder';
import soundSystem from '../lib/soundSystem';

function FlipCard({ study, image, index }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = study.icon;
  const caseNum = String(index + 1).padStart(2, '0');

  return (
    <div
      className="group cursor-pointer"
      role="group"
      tabIndex={0}
      aria-label={study.name + ' venture dossier. Press Enter to flip.'}
      onKeyDown={(event) => { if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); setIsFlipped(value => !value); } }}
      style={{ perspective: '1200px' }}
      onMouseEnter={() => soundSystem.playHover()}
      onClick={() => {
        soundSystem.playSelect();
        setIsFlipped((prev) => !prev);
      }}
    >
      <div
        className="relative w-full transition-transform duration-700 ease-in-out motion-reduce:transition-none"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '580px',
        }}
      >
        {/* ====== FRONT FACE — Image Only ====== */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-[var(--gta-silhouette)] shadow-lg"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <img
            src={image}
            alt={study.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* ====== BACK FACE — Text ====== */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden bg-[var(--gta-text-fill-light)] border-2 border-[var(--gta-silhouette)] shadow-lg overflow-y-auto"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-5">
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between text-xs">
                <span className="bg-[var(--gta-sky-low)] text-[var(--gta-text-outline)] border border-[var(--gta-silhouette)] px-3 py-1 rounded-full font-bank uppercase tracking-wider text-[10px] font-bold">
                  {study.badge}
                </span>
                <span className="text-[var(--color-text-muted)] font-bank uppercase text-xs font-bold">Case Study {caseNum}</span>
              </div>

              {/* Title + Role */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-pricedown uppercase tracking-wider text-[var(--gta-text-outline)]">
                    <FuzzyText>{study.name}</FuzzyText>
                  </h3>
                  <div className="w-9 h-9 bg-[var(--gta-sky-low)] border border-[var(--gta-silhouette)] rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[var(--color-accent-primary)]" />
                  </div>
                </div>
                <div className="text-xs font-bank uppercase tracking-wider font-bold text-[var(--color-accent-primary)] mt-1">
                  {study.role}
                </div>
                <div className="text-xs font-bank uppercase text-[var(--color-text-muted)] font-bold mt-0.5">
                  {study.period} • {study.location}
                </div>
              </div>

              {/* Case Study Q&A */}
              <div className="space-y-3 pt-1 text-xs border-t border-[var(--gta-silhouette)]/40 font-futura">
                <div>
                  <span className="font-bank uppercase text-[11px] text-[var(--gta-text-outline)] block mb-0.5 tracking-wider">Problem Solved:</span>
                  <p className="text-[var(--gta-text-outline)] leading-relaxed font-futura">{study.problem}</p>
                </div>
                <div>
                  <span className="font-bank uppercase text-[11px] text-[var(--gta-text-outline)] block mb-0.5 tracking-wider">Target User:</span>
                  <p className="text-[var(--gta-text-outline)] leading-relaxed font-futura">{study.user}</p>
                </div>
                <div>
                  <span className="font-bank uppercase text-[11px] text-[var(--gta-text-outline)] block mb-0.5 tracking-wider">What I Personally Owned:</span>
                  <p className="text-[var(--gta-text-outline)] leading-relaxed font-futura">{study.ownership}</p>
                </div>
                <div>
                  <span className="font-bank uppercase text-[11px] text-[var(--gta-text-outline)] block mb-0.5 tracking-wider">What Was Shipped:</span>
                  <p className="text-[var(--gta-text-outline)] leading-relaxed font-futura">{study.shipped}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 font-bank uppercase">
                {study.tags.map((t, i) => (
                  <span key={i} className="text-[10px] bg-[var(--gta-sky-low)] border border-[var(--gta-silhouette)] px-2.5 py-1 rounded-md text-[var(--gta-text-outline)] tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer links */}
            <div className="pt-4 border-t border-[var(--gta-silhouette)]/40 flex flex-wrap items-center justify-between gap-3 font-bank uppercase text-xs">
              <a
                href={study.caseStudyUrl}
                className="text-xs text-[var(--color-accent-primary)] hover:underline tracking-wider"
                onClick={(e) => e.stopPropagation()}
              >
                Read full case study →
              </a>
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                onClick={(e) => e.stopPropagation()}
              >
                <ElectricBorder className="py-2 px-4 text-xs font-bank uppercase tracking-wider">
                  <span className="flex items-center space-x-1.5">
                    <span>{study.linkLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </ElectricBorder>
              </a>
            </div>

            {/* Flip back hint */}
            <button
              className="self-center mt-2 inline-flex items-center space-x-1.5 text-[10px] font-bank uppercase tracking-wider text-[var(--gta-silhouette)] bg-[var(--gta-sky-low)] border border-[var(--gta-silhouette)] px-3 py-1.5 rounded-full hover:bg-[var(--gta-sky-mid)] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              <RotateCcw className="w-3 h-3" />
              <span>Flip back to image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VentureWorkbench() {
  const caseStudies = [
    {
      id: 'ziggers',
      name: 'Ziggers',
      role: 'Chief Operating Officer & Co-Founder · Product & Growth Direction',
      period: 'Jun 2025 – Present · 1 yr 4 mos',
      location: 'Chennai, Tamil Nadu, India (On-site)',
      category: 'Gig Staffing & Local Labor Marketplace',
      badge: 'Product Hunt Launched',
      icon: Zap,
      url: 'https://www.ziggers.in/',
      caseStudyUrl: '/ventures/ziggers/',
      linkLabel: 'Visit live platform',
      image: '/ventures/ziggers.jpg',
      problem: 'Informal temporary gig hiring in India relies on chaotic, untrusted WhatsApp groups with zero worker verification, rampant payment defaults, and no real-time coordination.',
      user: 'Event organizers, local business operators, warehouse logistics teams, and flexible gig workers in urban India.',
      ownership: 'I co-founded and helped shape a Chennai-first gig staffing marketplace for verified temporary workers. My work spans product direction, user flows, marketplace positioning, escrow milestone design, and launch marketing.',
      shipped: 'Shipped production web platform on React/Vite with real-time location tracking, verified worker onboarding, and a milestone-based live escrow payment workflow.',
      evidence: 'Featured and launched on Product Hunt; operating live platform with active shifts matched across Chennai.',
      status: 'Live in Production',
      tags: ['Marketplace Mechanics', 'Live Escrow', 'Product Direction', 'GTM Marketing']
    },
    {
      id: 'loopmemory',
      name: 'LoopMemory',
      role: 'Chief Operating Officer & Co-Founder · Context Architecture',
      period: 'Jun 2025 – Present · 1 yr 4 mos',
      location: 'Chennai, Tamil Nadu, India (On-site)',
      category: 'AI Memory & Context Structuring Engine',
      badge: 'Global Education Summit Showcase',
      icon: Code,
      url: 'https://www.loopmemory.in/',
      caseStudyUrl: '/ventures/loopmemory/',
      linkLabel: 'Explore LoopMemory',
      image: '/ventures/loopmemory.jpg',
      problem: 'AI agents and multi-turn LLM tools fail at long-term execution because sessions lose persistent context, semantic state, and structured user memory graphs.',
      user: 'AI developers, knowledge workers, students, and engineering teams building autonomous agentic workflows.',
      ownership: 'Co-founded and drove product positioning, context-structuring architecture, developer adoption strategies, and ecosystem distribution across developer communities.',
      shipped: 'Shipped persistent context capture engine, semantic vector indexing integrations, and knowledge aggregation graphs for developer workflows.',
      evidence: 'Demonstrated as delegate keynote at the India Global Education Summit (Kalaivaanar Arangam) to institutional education leaders; active developer platform.',
      status: 'Available for Developers',
      tags: ['AI Memory Systems', 'Context Structuring', 'Vector Indexing', 'Developer Adoption']
    },
    {
      id: 'unfounded',
      name: 'Unfounded',
      role: 'Chief Operating Officer & Co-Founder · Studio Orchestration',
      period: 'Jun 2025 – Present · 1 yr 4 mos',
      location: 'Chennai, Tamil Nadu, India (On-site)',
      category: 'Parallel Venture Incubation & Validation Core',
      badge: 'Venture Studio Core',
      icon: Rocket,
      url: 'https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/',
      caseStudyUrl: '/about/',
      linkLabel: 'LinkedIn Studio',
      image: '/ventures/unfounded.jpg',
      problem: 'Early-stage founders spend months over-engineering unvalidated software before testing real distribution, marketplace liquidity, or paying customer demand.',
      user: 'Early-stage founders, cross-functional engineering teams, and institutional co-building partners.',
      ownership: 'Co-founded the studio core in Chennai. I lead cross-venture validation sprints, rapid vibe coding prototypes, founder talent assembly, and investor ecosystem relationships.',
      shipped: 'Incubated multiple live ventures in parallel including Ziggers and LoopMemory, leading hackathon delegations (SaaSathoN at SSN) and pitchfest cohorts (Startup Pitchfest Finals).',
      evidence: 'Co-founders representing portfolio ventures at Startup Pitchfest 2026 Finals (Kanyakumari) and Kazakhstan-India Business Forum delegations.',
      status: 'Active Venture Studio',
      tags: ['Venture Incubation', 'Vibe Coding Architecture', 'Startup Leadership', 'Cross-Border Partnerships']
    }
  ];

  return (
    <section id="ventures" className="w-full bg-[var(--color-background)] text-[var(--color-text-primary)] py-24 lg:py-32 px-6 sm:px-12 border-t border-[var(--color-border)]/40 font-futura">
      <div className="max-w-6xl mx-auto space-y-16 lg:space-y-20">
        
        {/* Section Header */}
        <div className="space-y-5 border-b border-[var(--color-border)]/60 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[var(--gta-sky-low)] text-[var(--gta-text-outline)] border border-[var(--gta-silhouette)] font-bank uppercase tracking-wider text-xs px-3.5 py-1.5 rounded-full">
            <Layers className="w-3.5 h-3.5 shrink-0 text-[var(--color-accent-primary)]" />
            <span>02 // Ventures &amp; Case Studies</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-beckett tracking-wide text-[var(--color-text-primary)] leading-tight">
            Chief Operating Officer roles &amp; verified case studies
          </h2>

          <p className="text-base sm:text-lg text-[var(--gta-text-outline)] font-futura leading-relaxed max-w-3xl">
            Detailed case studies of ventures I have co-founded, built, and launched. Each case study documents the core problem, target user, personal ownership, shipped deliverables, and verifiable evidence. <strong className="text-[var(--gta-text-outline)]">Select any card</strong> to flip and read the details.
          </p>
        </div>

        {/* Flip Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => (
            <FlipCard
              key={study.id}
              study={study}
              image={study.image}
              index={idx}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
