import React from 'react';
import { ArrowUpRight, Compass, Briefcase, FileText, Send, Sparkles } from 'lucide-react';
import soundSystem from '../lib/soundSystem';

const PORTALS = [
  {
    num: '01',
    category: 'PHILOSOPHY',
    title: 'About & Strategic Journey',
    description: 'Operator mindset, venture architect roadmap, and deep operational background across Indian markets.',
    href: '/about/',
    icon: Compass,
    accent: '#E7B85A',
  },
  {
    num: '02',
    category: 'VENTURES',
    title: 'Ventures & Case Studies',
    description: 'Ziggers (verified on-demand gig staffing) and LoopMemory (persistent AI cognitive context engine).',
    href: '/ventures/',
    icon: Briefcase,
    accent: '#8FADA0',
  },
  {
    num: '03',
    category: 'RESEARCH',
    title: 'Writing & Strategic Research',
    description: 'Deep dives on venture building, marketplace liquidity, informal labor economies, and agent memory architectures.',
    href: '/writing/',
    icon: FileText,
    accent: '#B7C2A8',
  },
  {
    num: '04',
    category: 'DISPATCH',
    title: 'Contact & Collaboration',
    description: 'Strategic advisory, fractional COO engagements, and institutional founder partnerships in Chennai and beyond.',
    href: '/contact/',
    icon: Send,
    accent: '#EDE4C8',
  },
];

export default function PortalsSection({ className = '' }) {
  const handlePortalClick = (href) => {
    soundSystem.playSelect();
    if (typeof window !== 'undefined' && window.location.pathname !== href) {
      window.history.pushState(null, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="portals"
      aria-label="Portals & Core Ventures"
      className={`relative z-20 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}
    >
      {/* Anchor identifier for smooth scroll from hero */}
      <div id="scroll-video-section" className="absolute -top-12 left-0 pointer-events-none" />

      {/* Header telemetry & Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--gta-text-outline)] border border-[var(--gta-silhouette)]/50 shadow-md mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E7B85A]" />
          <span className="font-bank text-[10px] sm:text-xs font-bold tracking-widest text-[var(--gta-sky-mid)] uppercase">
            EXPLORE THE ECOSYSTEM // 4 PORTALS
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bank font-bold text-[var(--gta-text-fill)] tracking-wider uppercase drop-shadow-md">
          Mission Directory &amp; Ventures
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[var(--gta-silhouette)] font-futura max-w-xl mx-auto leading-relaxed">
          Navigate directly into strategic frameworks, operating ventures, research essays, or direct advisory dispatches.
        </p>
      </div>

      {/* 4 Portals Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {PORTALS.map((portal) => {
          const Icon = portal.icon;
          return (
            <a
              key={portal.num}
              href={portal.href}
              onClick={(e) => {
                e.preventDefault();
                handlePortalClick(portal.href);
              }}
              onMouseEnter={() => soundSystem.playHover()}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[var(--gta-text-outline)]/95 hover:bg-[#151515] border-2 border-[var(--gta-silhouette)]/60 hover:border-[#E7B85A] shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_50px_rgba(231,184,90,0.15)] no-underline transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
            >
              <div>
                {/* Card Top: Number badge and Arrow CTA */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="font-bank text-xs font-black tracking-widest text-[#E7B85A]">
                      {portal.num} //
                    </span>
                    <span className="font-bank text-[10px] sm:text-xs font-bold text-[var(--gta-sky-mid)] tracking-wider uppercase">
                      {portal.category}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/40 flex items-center justify-center group-hover:border-[#E7B85A] group-hover:bg-[#E7B85A]/10 transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-[var(--gta-sky-mid)] group-hover:text-[#E7B85A] transition-colors" />
                  </div>
                </div>

                {/* Card Icon & Title */}
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center border border-[var(--gta-silhouette)]/40 bg-[#0C120F]"
                    style={{ color: portal.accent }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-futura font-bold text-[var(--gta-text-fill)] group-hover:text-white transition-colors leading-snug">
                    {portal.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--gta-silhouette)] group-hover:text-[var(--gta-sky-low)] transition-colors leading-relaxed">
                  {portal.description}
                </p>
              </div>

              {/* Bottom Mission CTA Link */}
              <div className="mt-6 pt-4 border-t border-[var(--gta-silhouette)]/20 flex items-center justify-between">
                <span className="font-bank text-[10px] font-bold text-[var(--gta-sky-mid)] group-hover:text-[#E7B85A] tracking-wider uppercase transition-colors">
                  Enter Mission →
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gta-silhouette)]/40 group-hover:bg-[#E7B85A] transition-colors" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
