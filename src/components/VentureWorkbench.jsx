import React, { useState } from 'react';
import { Layers, ArrowUpRight, Zap, Code, Rocket, RotateCcw } from 'lucide-react';
import FuzzyText from './react-bits/FuzzyText';
import ElectricBorder from './react-bits/ElectricBorder';

function FlipCard({ study, image, index }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = study.icon;
  const caseNum = String(index + 1).padStart(2, '0');

  return (
    <div
      className="group cursor-pointer"
      style={{ perspective: '1200px' }}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <div
        className="relative w-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '580px',
        }}
      >
        {/* ====== FRONT FACE — Image ====== */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-[#7A968B] shadow-lg"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <img
            src={image}
            alt={study.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Bottom overlay info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-3 py-1 rounded-full font-bold text-[11px]">
                {study.badge}
              </span>
              <span className="font-mono text-[11px] text-white/70">Case Study {caseNum}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
              {study.name}
            </h3>
            <p className="text-xs text-white/80 font-medium leading-relaxed max-w-sm">
              {study.category}
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-white/60 font-medium pt-1">
              <span className="inline-flex items-center space-x-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <span>Tap to read case study</span>
                <RotateCcw className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* ====== BACK FACE — Text ====== */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden bg-white border-2 border-[#7A968B] shadow-lg overflow-y-auto"
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
                <span className="bg-[#E2ECE7] text-[#1B2F21] border border-[#85A296] px-3 py-1 rounded-full font-bold text-[11px]">
                  {study.badge}
                </span>
                <span className="text-[#354E45] font-mono text-xs font-semibold">Case Study {caseNum}</span>
              </div>

              {/* Title + Role */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[#111815] tracking-tight">
                    <FuzzyText>{study.name}</FuzzyText>
                  </h3>
                  <div className="w-9 h-9 bg-[#E2ECE7] border border-[#85A296] rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#203322]" />
                  </div>
                </div>
                <div className="text-xs font-bold text-[#203322] mt-1">
                  {study.role}
                </div>
                <div className="text-xs text-[#354E45] font-medium mt-0.5">
                  {study.period} • {study.location}
                </div>
              </div>

              {/* Case Study Q&A */}
              <div className="space-y-3 pt-1 text-xs border-t border-[#7A968B]/40">
                <div>
                  <span className="font-bold text-[#111815] block mb-0.5">Problem Solved:</span>
                  <p className="text-[#203028] leading-relaxed">{study.problem}</p>
                </div>
                <div>
                  <span className="font-bold text-[#111815] block mb-0.5">Target User:</span>
                  <p className="text-[#203028] leading-relaxed">{study.user}</p>
                </div>
                <div>
                  <span className="font-bold text-[#111815] block mb-0.5">What I Personally Owned:</span>
                  <p className="text-[#203028] leading-relaxed">{study.ownership}</p>
                </div>
                <div>
                  <span className="font-bold text-[#111815] block mb-0.5">What Was Shipped:</span>
                  <p className="text-[#203028] leading-relaxed">{study.shipped}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {study.tags.map((t, i) => (
                  <span key={i} className="text-[11px] bg-[#E2ECE7] border border-[#85A296] px-2.5 py-1 rounded-md text-[#1B2F21] font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer links */}
            <div className="pt-4 border-t border-[#7A968B]/40 flex flex-wrap items-center justify-between gap-3">
              <a
                href={study.caseStudyUrl}
                className="text-xs font-bold text-[#203322] hover:underline"
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
                <ElectricBorder className="py-2 px-4 text-xs">
                  <span className="flex items-center space-x-1.5">
                    <span>{study.linkLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </ElectricBorder>
              </a>
            </div>

            {/* Flip back hint */}
            <button
              className="self-center mt-2 inline-flex items-center space-x-1.5 text-[11px] text-[#354E45] font-semibold bg-[#E2ECE7] border border-[#85A296] px-3 py-1.5 rounded-full hover:bg-[#D0DDD5] transition-colors"
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
    <section id="ventures" className="w-full bg-[var(--color-background)] text-[var(--color-text-primary)] py-24 lg:py-32 px-6 sm:px-12 border-t border-[var(--color-border)]/40 font-sans">
      <div className="max-w-6xl mx-auto space-y-16 lg:space-y-20">
        
        {/* Section Header */}
        <div className="space-y-5 border-b border-[var(--color-border)]/60 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[#E2ECE7] text-[#1B2F21] border border-[#85A296] font-sans text-xs px-3.5 py-1.5 rounded-full font-bold">
            <Layers className="w-3.5 h-3.5 shrink-0 text-[#203322]" />
            <span>02 // Ventures & Case Studies</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-[var(--color-text-primary)] leading-tight">
            Chief Operating Officer roles & verified case studies
          </h2>

          <p className="text-base sm:text-lg text-[#203028] font-sans leading-relaxed max-w-3xl">
            Detailed case studies of ventures I have co-founded, built, and launched. Each case study documents the core problem, target user, personal ownership, shipped deliverables, and verifiable evidence. <strong className="text-[#111815]">Click any card</strong> to flip and read the details.
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
