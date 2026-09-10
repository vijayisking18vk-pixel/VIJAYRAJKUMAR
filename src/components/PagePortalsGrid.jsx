import React from 'react';
import { Compass, Layers, BookOpen, Send, ArrowUpRight, Zap, Code, Shield } from 'lucide-react';
import SpotlightCard from './react-bits/SpotlightCard';

export default function PagePortalsGrid() {
  const portals = [
    {
      title: 'About & Strategic Journey',
      category: '01 // Background & Philosophy',
      href: '/about/',
      description: 'The narrative bridge from Hindi Literature to B.Sc. Defence & Strategic Studies at SRMIST to rapid venture building in Chennai.',
      badge: 'SRMIST & DBHPS Alum',
      icon: Compass,
      highlights: ['Defence & Game Theory', 'Cross-Cultural Narrative', 'Vibe Coding Architecture']
    },
    {
      title: 'Ventures & Case Studies',
      category: '02 // Experience & Platforms',
      href: '/ventures/',
      description: 'Production case studies of Ziggers (local gig staffing marketplace) and LoopMemory (persistent AI agent memory), co-founded and built.',
      badge: 'COO & Co-Founder',
      icon: Layers,
      highlights: ['Ziggers (Production)', 'LoopMemory (Dev API)', 'Unfounded Studio']
    },
    {
      title: 'Writing & Strategic Research',
      category: '03 // Thought Leadership',
      href: '/writing/',
      description: 'First-party essays on two-sided marketplace escrow mechanics, hierarchical agent context graphs, and asymmetric startup strategy.',
      badge: 'In-Depth Essays',
      icon: BookOpen,
      highlights: ['Gig Marketplace Ops', 'AI Context Graphs', 'Defence & Startups']
    },
    {
      title: 'Contact & Collaboration',
      category: '04 // Direct Dispatch',
      href: '/contact/',
      description: 'Direct communication channel for venture partnerships, product and growth collaboration, and ecosystem initiatives with a <48h response commitment.',
      badge: 'Response in < 48h',
      icon: Send,
      highlights: ['Direct Founder Inbox', 'Email Fallback', 'Chennai On-site']
    }
  ];

  return (
    <section id="portals" className="w-full bg-white text-[var(--color-text-primary)] py-20 px-6 sm:px-12 border-t border-[var(--color-border)]/40 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[var(--color-surface)]/30 text-[var(--color-accent-primary)] border border-[var(--color-border)]/40 text-xs px-3 py-1 rounded-full font-semibold">
            <Layers className="w-3.5 h-3.5 text-[var(--color-accent-primary)]" />
            <span>Explore the Platform</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Dedicated sections & portfolios
          </h2>
          <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
            Navigate directly to detailed case studies, background credentials, strategic writing, or the collaboration dispatch.
          </p>
        </div>

        {/* 4 Directory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <a
                key={portal.title}
                href={portal.href}
                className="group block"
              >
                <SpotlightCard className="p-8 h-full flex flex-col justify-between space-y-6 hover:border-[var(--color-accent-secondary)] transition-all rounded-3xl bg-white border border-[var(--color-border)]/50 shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">
                        {portal.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[var(--color-surface)]/20 border border-[var(--color-border)]/40 flex items-center justify-center text-[var(--color-accent-primary)] group-hover:bg-[var(--color-accent-primary)] group-hover:text-white transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors">
                        {portal.title}
                      </h3>
                      <p className="text-sm text-[#4A4A4A] leading-relaxed">
                        {portal.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[var(--color-border)]/30">
                    <div className="flex flex-wrap gap-2">
                      {portal.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-[var(--color-surface)]/25 border border-[var(--color-border)]/40 text-[var(--color-accent-primary)] px-2.5 py-1 rounded-md font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="font-semibold text-[var(--color-accent-primary)]">
                        {portal.badge}
                      </span>
                      <span className="font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-primary)] inline-flex items-center space-x-1 transition-colors">
                        <span>Open page</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
