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
    <section id="portals" className="w-full bg-[var(--color-background)] text-[var(--color-text-primary)] py-20 px-6 sm:px-12 border-t border-[var(--color-border)]/40 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[#E2ECE7] text-[#1B2F21] border border-[#85A296] text-xs px-3.5 py-1.5 rounded-full font-bold">
            <Layers className="w-3.5 h-3.5 text-[#203322]" />
            <span>Explore the Platform</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Dedicated sections & portfolios
          </h2>
          <p className="text-sm sm:text-base text-[#203028] leading-relaxed">
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
                <SpotlightCard className="p-8 h-full flex flex-col justify-between space-y-6 hover:border-[var(--color-accent-primary)] transition-all rounded-3xl bg-white border-2 border-[#7A968B] shadow-md">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-bold text-[#354E45]">
                        {portal.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#E2ECE7] border border-[#85A296] flex items-center justify-center text-[#1B2F21] group-hover:bg-[#203322] group-hover:text-white transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#111815] group-hover:text-[#203322] transition-colors">
                        {portal.title}
                      </h3>
                      <p className="text-sm text-[#203028] leading-relaxed">
                        {portal.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[#7A968B]/40">
                    <div className="flex flex-wrap gap-2">
                      {portal.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-[#E2ECE7] border border-[#85A296] text-[#1B2F21] px-2.5 py-1 rounded-md font-bold"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="font-bold text-[#1B2F21] bg-[#E2ECE7] px-2.5 py-1 rounded-full border border-[#85A296]">
                        {portal.badge}
                      </span>
                      <span className="font-bold text-[#203322] group-hover:underline inline-flex items-center space-x-1 transition-colors">
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
