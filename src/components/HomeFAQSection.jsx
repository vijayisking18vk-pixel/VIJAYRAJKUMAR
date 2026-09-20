import React, { useState } from 'react';
import { ChevronDown, Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'Who is Vijayrajkumar?',
    answer:
      'Vijayrajkumar is a Chennai-based Chief Operating Officer and venture builder. He operates at the intersection of marketplace mechanics, operational execution, and AI memory systems. He currently serves as COO and Co-founder at Unfounded (venture studio), Ziggers (verified gig marketplace), and LoopMemory (AI context engine).'
  },
  {
    question: 'What ventures does Vijayrajkumar operate in Chennai?',
    answer:
      'Vijayrajkumar co-founded and operates three primary initiatives: 1) Ziggers, an on-demand gig staffing marketplace replacing informal WhatsApp coordination with verified daily-wage workers and milestone escrow; 2) LoopMemory, a persistent context and semantic memory engine for AI agents; and 3) Unfounded, a venture studio validating and scaling digital products.'
  },
  {
    question: 'What is LoopMemory and how does it solve AI context rot?',
    answer:
      'LoopMemory is a developer-first cognitive memory and persistent context architecture. Rather than dumping raw chat histories into LLM context windows—which causes context rot, hallucination, and quadratic token costs—LoopMemory uses hierarchical semantic graphs, working memory buffers, and relational indexing to maintain continuous, lossless agent state.'
  },
  {
    question: 'How does Ziggers solve informal gig hiring in Chennai?',
    answer:
      'In tier-1 Indian cities, event catering and hospitality rely on chaotic WhatsApp groups plagued by no-shows, zero skill verification, and delayed cash payments. Ziggers introduces verified worker profiles, real-time dispatch, and automated milestone-based escrow payouts, ensuring event hosts get guaranteed staff while workers receive guaranteed payment on shift completion.'
  },
  {
    question: 'How can early-stage founders collaborate with Vijayrajkumar?',
    answer:
      'Founders can collaborate with Vijayrajkumar through venture partnerships, fractional COO engagements, and strategic advisory. He works with early-stage marketplace and AI infrastructure startups on zero-to-one go-to-market motions, unit economic modeling, operational supply liquidity, and defensible product architecture.'
  }
];

export default function HomeFAQSection() {
  const [openIndices, setOpenIndices] = useState({ 0: true, 1: true, 2: true, 3: true, 4: true });

  const toggleIndex = (index) => {
    setOpenIndices((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section 
      id="aeo-knowledge-hub"
      aria-label="Executive Summary and Frequently Asked Questions"
      className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-[#E2ECE7]"
    >
      {/* 1. Answer-First TL;DR & Executive Summary Section */}
      <section 
        id="executive-summary" 
        className="mb-16 bg-[#121C17]/90 border border-[#7A968B]/35 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#7A968B]/20">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-[#85A296]/15 text-[var(--gta-text-fill)]">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="font-bank text-xs uppercase tracking-widest text-[var(--gta-text-fill)] font-bold">
              Executive Profile // Leadership Track Record
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bank uppercase text-[var(--gta-text-fill-warm)]">
            <Clock className="w-3.5 h-3.5" />
            <span>Last Updated:</span>
            <time dateTime="2026-09-19" className="text-[var(--gta-text-fill)] font-bold">
              September 19, 2026
            </time>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-48 shrink-0">
              <div className="relative rounded-2xl overflow-hidden border border-[#7A968B]/40 shadow-lg bg-[#0B130E]">
                <img
                  src="/vijayrajkumar-poster.jpg"
                  alt="Vijayrajkumar — Chief Operating Officer and Venture Builder in Chennai"
                  width="400"
                  height="533"
                  className="w-full h-auto object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="p-2.5 bg-[#0B130E]/90 text-center border-t border-[#7A968B]/20">
                  <span className="text-base font-pricedown gta-lettering text-[var(--gta-text-fill)] uppercase tracking-wider block">
                    VIJAYRAJKUMAR
                  </span>
                  <span className="text-xs font-diploma text-[var(--gta-text-fill-warm)] font-bold">COO &amp; Venture Builder</span>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-pricedown uppercase text-[var(--gta-text-fill)] tracking-wider leading-snug">
                TL;DR: Key Takeaways &amp; Executive Summary
              </h2>
              <p className="text-base sm:text-lg text-[var(--gta-text-fill)] leading-relaxed font-futura">
                <strong className="text-white font-bold">Vijayrajkumar</strong> is a Chennai-based Chief Operating Officer and venture builder specializing in two-sided gig marketplaces (<a href="/ventures/ziggers/" className="text-white underline font-bold">Ziggers</a>) and persistent AI context memory infrastructure (<a href="/ventures/loopmemory/" className="text-white underline font-bold">LoopMemory</a>). He combines academic frameworks in Defence &amp; Strategic Studies (SRMIST) and Hindi Literature with battle-tested operational execution.
              </p>
              <div className="p-3.5 rounded-xl bg-[#0A130E] border border-[var(--gta-silhouette)] text-xs text-[var(--gta-text-fill-warm)] font-futura">
                <strong className="text-white font-bank uppercase tracking-wider font-bold">Entity Disambiguation:</strong> Independent technology executive profile. Vijayrajkumar is an on-site startup operator based in Chennai, Tamil Nadu, and is not affiliated with Indian film actor Vinay Rajkumar.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#0B130E]/90 border border-[var(--gta-silhouette)]/60 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-[var(--gta-sky-mid)] text-xs font-bank uppercase tracking-wider mb-1 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Core Role
              </div>
              <p className="text-sm font-bold text-white font-futura">Chief Operating Officer &amp; Co-Founder</p>
              <p className="text-xs text-[var(--gta-text-fill-warm)] mt-1 font-bank uppercase tracking-wider">Unfounded · Ziggers · LoopMemory</p>
            </div>

            <div className="bg-[#0B130E]/90 border border-[var(--gta-silhouette)]/60 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-[var(--gta-sky-mid)] text-xs font-bank uppercase tracking-wider mb-1 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Operating Base
              </div>
              <p className="text-sm font-bold text-white font-futura">Chennai, Tamil Nadu, India</p>
              <p className="text-xs text-[var(--gta-text-fill-warm)] mt-1 font-bank uppercase tracking-wider">On-site execution &amp; ecosystem building</p>
            </div>

            <div className="bg-[#0B130E]/90 border border-[var(--gta-silhouette)]/60 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-[var(--gta-sky-mid)] text-xs font-bank uppercase tracking-wider mb-1 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Primary Domains
              </div>
              <p className="text-sm font-bold text-white font-futura">Gig Economy &amp; AI Infrastructure</p>
              <p className="text-xs text-[var(--gta-text-fill-warm)] mt-1 font-bank uppercase tracking-wider">Marketplace liquidity &amp; cognitive graphs</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Structured Q&A Section with Question-Style Headings */}
      <section id="faq" className="space-y-6">
        <div className="text-center sm:text-left space-y-2 mb-8">
          <span className="font-bank text-xs uppercase tracking-widest text-[var(--gta-text-outline)] font-bold">
            Executive Q&amp;A // Verified Profile Details
          </span>
          <h2 className="text-2xl sm:text-3xl font-pricedown uppercase text-[var(--gta-text-outline)] tracking-wider">
            Frequently Asked Questions About Vijayrajkumar
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] font-futura">
            Verified facts and direct answers on background, active ventures, and executive advisory.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = !!openIndices[idx];
            return (
              <article 
                key={idx} 
                className="bg-[#121C17] border border-[var(--gta-silhouette)]/60 rounded-2xl overflow-hidden transition-all duration-200 hover:border-[var(--gta-sky-mid)]"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-[#1A2A22]"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base sm:text-lg font-futura font-bold text-[var(--gta-text-fill)] tracking-wide">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--gta-text-fill)] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-3 border-t border-[var(--gta-silhouette)]/40">
                    <p className="text-sm sm:text-base text-[var(--gta-text-fill)] leading-relaxed font-futura">
                      {item.answer}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Quick Nav Anchor Links - Bank Gothic GTA Menu Items */}
        <div className="pt-8 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-bank uppercase tracking-wider text-[var(--gta-text-outline)]">
          <a href="/about/" className="flex items-center gap-1 text-[var(--gta-text-outline)] hover:text-[var(--color-accent-primary)] transition-colors font-bold">
            Detailed Biography <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <span className="text-[var(--gta-silhouette)]">•</span>
          <a href="/ventures/" className="flex items-center gap-1 text-[var(--gta-text-outline)] hover:text-[var(--color-accent-primary)] transition-colors font-bold">
            All Venture Case Studies <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <span className="text-[var(--gta-silhouette)]">•</span>
          <a href="/writing/" className="flex items-center gap-1 text-[var(--gta-text-outline)] hover:text-[var(--color-accent-primary)] transition-colors font-bold">
            Research &amp; Essays <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <span className="text-[var(--gta-silhouette)]">•</span>
          <a href="/contact/" className="flex items-center gap-1 text-[var(--gta-text-outline)] hover:text-[var(--color-accent-primary)] transition-colors font-bold">
            Direct Dispatch <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </section>
  );
}
