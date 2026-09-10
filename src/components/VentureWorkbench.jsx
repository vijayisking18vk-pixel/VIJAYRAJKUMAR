import React from 'react';
import { Layers, ArrowUpRight, Zap, Code, Rocket, CheckCircle2, Users, AlertCircle, Award } from 'lucide-react';
import PixelTransition from './react-bits/PixelTransition';
import StackCard from './react-bits/StackCard';
import ChromaGrid from './react-bits/ChromaGrid';
import FuzzyText from './react-bits/FuzzyText';
import ElectricBorder from './react-bits/ElectricBorder';

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
        <div className="space-y-5 border-b border-[var(--color-border)]/40 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[var(--color-surface)]/30 text-[var(--color-accent-primary)] border border-[var(--color-border)]/40 font-sans text-xs px-3.5 py-1.5 rounded-full font-semibold">
            <Layers className="w-3.5 h-3.5 shrink-0 text-[var(--color-accent-primary)]" />
            <span>02 // Ventures & Case Studies</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-[var(--color-text-primary)] leading-tight">
            Chief Operating Officer roles & verified case studies
          </h2>

          <p className="text-base sm:text-lg text-[#383838] font-sans leading-relaxed max-w-3xl">
            Detailed case studies of ventures I have co-founded, built, and launched. Each case study documents the core problem, target user, personal ownership, shipped deliverables, and verifiable evidence.
          </p>
        </div>

        {/* Deep Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Case Study 1: Ziggers -> PixelTransition */}
          <PixelTransition className="p-8 flex flex-col justify-between space-y-8 h-full bg-white/75 backdrop-blur-sm border border-[var(--color-border)]/70 rounded-3xl hover:border-[var(--color-accent-secondary)] transition-all shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-[var(--color-surface)]/30 text-[var(--color-accent-primary)] border border-[var(--color-border)]/40 px-3 py-1 rounded-full font-medium text-[11px]">
                  {caseStudies[0].badge}
                </span>
                <span className="text-[var(--color-text-muted)] font-mono text-xs">Case Study 01</span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
                    <FuzzyText>{caseStudies[0].name}</FuzzyText>
                  </h3>
                  <div className="w-9 h-9 bg-[var(--color-surface)]/30 border border-[var(--color-border)]/40 rounded-xl flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[var(--color-accent-primary)]" />
                  </div>
                </div>
                <div className="text-xs font-semibold text-[var(--color-accent-primary)] mt-1">
                  {caseStudies[0].role}
                </div>
                <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {caseStudies[0].period} • {caseStudies[0].location}
                </div>
              </div>

              {/* Case Study Questions & Answers */}
              <div className="space-y-4 pt-2 text-xs border-t border-[var(--color-border)]/30">
                <div>
                  <span className="font-bold text-[var(--color-text-primary)] block mb-1">Problem Solved:</span>
                  <p className="text-[#4A4A4A] leading-relaxed">{caseStudies[0].problem}</p>
                </div>

                <div>
                  <span className="font-bold text-[var(--color-text-primary)] block mb-1">Target User:</span>
                  <p className="text-[#4A4A4A] leading-relaxed">{caseStudies[0].user}</p>
                </div>

                <div>
                  <span className="font-bold text-[var(--color-text-primary)] block mb-1">What I Personally Owned:</span>
                  <p className="text-[#4A4A4A] leading-relaxed">{caseStudies[0].ownership}</p>
                </div>

                <div>
                  <span className="font-bold text-[var(--color-text-primary)] block mb-1">What Was Shipped:</span>
                  <p className="text-[#4A4A4A] leading-relaxed">{caseStudies[0].shipped}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {caseStudies[0].tags.map((t, i) => (
                  <span key={i} className="text-[11px] bg-[var(--color-surface)]/25 border border-[var(--color-border)]/40 px-2.5 py-1 rounded-md text-[var(--color-accent-primary)] font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--color-border)]/30 flex flex-wrap items-center justify-between gap-3">
              <a href="/ventures/ziggers/" className="text-xs font-bold text-[var(--color-accent-primary)] hover:underline">
                Read full case study →
              </a>
              <a href={caseStudies[0].url} target="_blank" rel="noopener noreferrer" className="inline-block">
                <ElectricBorder className="py-2 px-4 text-xs">
                  <span className="flex items-center space-x-1.5">
                    <span>Visit live platform</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </ElectricBorder>
              </a>
            </div>
          </PixelTransition>

          {/* Case Study 2: LoopMemory -> StackCard */}
          <StackCard className="h-full bg-white/75 backdrop-blur-sm border border-[var(--color-border)]/70 rounded-3xl hover:border-[var(--color-accent-secondary)] transition-all shadow-sm">
            <div className="flex flex-col justify-between space-y-8 h-full p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-[var(--color-surface)]/30 text-[var(--color-accent-primary)] border border-[var(--color-border)]/40 px-3 py-1 rounded-full font-medium text-[11px]">
                    {caseStudies[1].badge}
                  </span>
                  <span className="text-[var(--color-text-muted)] font-mono text-xs">Case Study 02</span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
                      <FuzzyText>{caseStudies[1].name}</FuzzyText>
                    </h3>
                    <div className="w-9 h-9 bg-[var(--color-surface)]/30 border border-[var(--color-border)]/40 rounded-xl flex items-center justify-center">
                      <Code className="w-4 h-4 text-[var(--color-accent-primary)]" />
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-[var(--color-accent-primary)] mt-1">
                    {caseStudies[1].role}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    {caseStudies[1].period} • {caseStudies[1].location}
                  </div>
                </div>

                {/* Case Study Questions & Answers */}
                <div className="space-y-4 pt-2 text-xs border-t border-[var(--color-border)]/30">
                  <div>
                    <span className="font-bold text-[var(--color-text-primary)] block mb-1">Problem Solved:</span>
                    <p className="text-[#4A4A4A] leading-relaxed">{caseStudies[1].problem}</p>
                  </div>

                  <div>
                    <span className="font-bold text-[var(--color-text-primary)] block mb-1">Target User:</span>
                    <p className="text-[#4A4A4A] leading-relaxed">{caseStudies[1].user}</p>
                  </div>

                  <div>
                    <span className="font-bold text-[var(--color-text-primary)] block mb-1">What I Personally Owned:</span>
                    <p className="text-[#4A4A4A] leading-relaxed">{caseStudies[1].ownership}</p>
                  </div>

                  <div>
                    <span className="font-bold text-[var(--color-text-primary)] block mb-1">What Was Shipped:</span>
                    <p className="text-[#4A4A4A] leading-relaxed">{caseStudies[1].shipped}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {caseStudies[1].tags.map((t, i) => (
                    <span key={i} className="text-[11px] bg-[var(--color-surface)]/25 border border-[var(--color-border)]/40 px-2.5 py-1 rounded-md text-[var(--color-accent-primary)] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--color-border)]/30 flex flex-wrap items-center justify-between gap-3">
                <a href="/ventures/loopmemory/" className="text-xs font-bold text-[var(--color-accent-primary)] hover:underline">
                  Read full case study →
                </a>
                <a href={caseStudies[1].url} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <ElectricBorder className="py-2 px-4 text-xs">
                    <span className="flex items-center space-x-1.5">
                      <span>Explore LoopMemory</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </ElectricBorder>
                </a>
              </div>
            </div>
          </StackCard>

          {/* Case Study 3: Unfounded -> ChromaGrid */}
          <ChromaGrid className="p-8 flex flex-col justify-between space-y-8 h-full bg-white/75 backdrop-blur-sm border border-[var(--color-border)]/70 rounded-3xl hover:border-[var(--color-accent-secondary)] transition-all shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-[var(--color-surface)]/30 text-[var(--color-accent-primary)] border border-[var(--color-border)]/40 px-3 py-1 rounded-full font-medium text-[11px]">
                  {caseStudies[2].badge}
                </span>
                <span className="text-[var(--color-text-muted)] font-mono text-xs">Case Study 03</span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
                    <FuzzyText>{caseStudies[2].name}</FuzzyText>
                  </h3>
                  <div className="w-9 h-9 bg-[var(--color-surface)]/30 border border-[var(--color-border)]/40 rounded-xl flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-[var(--color-accent-primary)]" />
                  </div>
                </div>
                <div className="text-xs font-semibold text-[var(--color-accent-primary)] mt-1">
                  {caseStudies[2].role}
                </div>
                <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {caseStudies[2].period} • {caseStudies[2].location}
                </div>
              </div>

              {/* Case Study Questions & Answers */}
              <div className="space-y-4 pt-2 text-xs border-t border-[var(--color-border)]/30">
                <div>
                  <span className="font-bold text-[var(--color-text-primary)] block mb-1">Problem Solved:</span>
                  <p className="text-[#4A4A4A] leading-relaxed">{caseStudies[2].problem}</p>
                </div>

                <div>
                  <span className="font-bold text-[var(--color-text-primary)] block mb-1">Target User:</span>
                  <p className="text-[#4A4A4A] leading-relaxed">{caseStudies[2].user}</p>
                </div>

                <div>
                  <span className="font-bold text-[var(--color-text-primary)] block mb-1">What I Personally Owned:</span>
                  <p className="text-[#4A4A4A] leading-relaxed">{caseStudies[2].ownership}</p>
                </div>

                <div>
                  <span className="font-bold text-[var(--color-text-primary)] block mb-1">What Was Shipped:</span>
                  <p className="text-[#4A4A4A] leading-relaxed">{caseStudies[2].shipped}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {caseStudies[2].tags.map((t, i) => (
                  <span key={i} className="text-[11px] bg-[var(--color-surface)]/25 border border-[var(--color-border)]/40 px-2.5 py-1 rounded-md text-[var(--color-accent-primary)] font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--color-border)]/30 flex flex-wrap items-center justify-between gap-3">
              <a href="/about/" className="text-xs font-bold text-[var(--color-accent-primary)] hover:underline">
                Read studio methodology →
              </a>
              <a href={caseStudies[2].url} target="_blank" rel="noopener noreferrer" className="inline-block">
                <ElectricBorder className="py-2 px-4 text-xs">
                  <span className="flex items-center space-x-1.5">
                    <span>LinkedIn Studio</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </ElectricBorder>
              </a>
            </div>
          </ChromaGrid>

        </div>

      </div>
    </section>
  );
}
