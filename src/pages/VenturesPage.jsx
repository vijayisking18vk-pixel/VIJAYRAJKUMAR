import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VentureWorkbench from '../components/VentureWorkbench';
import { Layers, ArrowRight } from 'lucide-react';

export default function VenturesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto px-6 lg:px-12 py-16 space-y-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs text-[var(--color-text-muted)] font-medium">
          <a href="/" className="hover:text-[var(--color-accent-primary)]">Home</a>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-semibold">Ventures & Case Studies</span>
        </div>

        {/* Ventures Hero Header */}
        <div className="space-y-4 border-b border-[var(--color-border)]/40 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[var(--color-surface)]/30 text-[var(--color-accent-primary)] border border-[var(--color-border)]/40 text-xs px-3 py-1 rounded-full font-semibold">
            <Layers className="w-3.5 h-3.5 text-[var(--color-accent-primary)]" />
            <span>Chief Operating Officer & Co-Founder Portfolios</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight">
            Ventures, Marketplaces & AI Systems
          </h1>

          <p className="text-lg text-[#383838] leading-relaxed max-w-3xl">
            Detailed case studies of ventures co-founded and operated by me. Each study outlines the systemic problem, target audience, personal ownership, deliverables shipped, and verifiable evidence.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <a href="/ventures/ziggers/" className="inline-flex items-center space-x-1 text-[var(--color-accent-primary)] hover:underline">
              <span>Deep dive: Ziggers Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <span className="text-[var(--color-border)]">•</span>
            <a href="/ventures/loopmemory/" className="inline-flex items-center space-x-1 text-[var(--color-accent-primary)] hover:underline">
              <span>Deep dive: LoopMemory Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Venture Workbench Grid Component */}
        <div>
          <VentureWorkbench />
        </div>
      </main>

      <Footer />
    </div>
  );
}
