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
    <section id="portals" className="w-full bg-[var(--color-background)] text-[var(--color-text-primary)] py-20 px-6 sm:px-12 border-t border-[var(--color-border)]/40 font-futura">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-[var(--gta-text-outline)] text-[var(--gta-text-fill)] border border-[var(--gta-silhouette)] text-xs px-3.5 py-1.5 rounded-full font-bank uppercase tracking-wider font-bold shadow-sm">
            <Layers className="w-3.5 h-3.5 text-[var(--gta-sky-top)]" />
            <span>Explore the Platform</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-pricedown gta-lettering tracking-wide">
            Dedicated sections &amp; portfolios
          </h2>
          <p className="text-sm sm:text-base text-[var(--gta-text-outline)] leading-relaxed font-futura">
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
                <SpotlightCard className="p-8 h-full flex flex-col justify-between space-y-6 hover:border-[var(--gta-text-outline)] transition-all rounded-3xl bg-[#FDFBF7] border-2 border-[var(--gta-silhouette)] shadow-md">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bank uppercase tracking-widest font-bold text-[var(--gta-silhouette)]">
                        {portal.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[var(--gta-text-outline)] border border-[var(--gta-silhouette)] flex items-center justify-center text-[var(--gta-text-fill)] group-hover:scale-110 transition-transform">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-beckett font-bold text-[var(--gta-text-outline)] group-hover:text-[#1C2E24] transition-colors">
                        {portal.title}
                      </h3>
                      <p className="text-sm text-[var(--gta-text-outline)]/85 leading-relaxed font-futura">
                        {portal.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[var(--gta-silhouette)]/40">
                    <div className="flex flex-wrap gap-2">
                      {portal.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-[var(--gta-sky-mid)]/60 border border-[var(--gta-silhouette)] text-[var(--gta-text-outline)] px-2.5 py-1 rounded-md font-bank uppercase tracking-wider font-bold"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 font-bank uppercase tracking-wider">
                      <span className="font-bold text-[var(--gta-text-fill)] bg-[var(--gta-text-outline)] px-2.5 py-1 rounded-full border border-[var(--gta-silhouette)]">
                        {portal.badge}
                      </span>
                      <span className="font-bold text-[var(--gta-text-outline)] group-hover:underline inline-flex items-center space-x-1 transition-colors">
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
