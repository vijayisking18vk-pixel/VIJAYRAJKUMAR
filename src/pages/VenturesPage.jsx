import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VentureWorkbench from '../components/VentureWorkbench';
import { Layers, ArrowRight } from 'lucide-react';

export default function VenturesPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans selection:bg-neutral-900 selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto px-6 lg:px-12 py-16 space-y-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs text-neutral-500 font-medium">
          <a href="/" className="hover:text-neutral-950">Home</a>
          <span>/</span>
          <span className="text-neutral-950 font-semibold">Ventures & Case Studies</span>
        </div>

        {/* Ventures Hero Header */}
        <div className="space-y-4 border-b border-neutral-200 pb-10">
          <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-800 text-xs px-3 py-1 rounded-full font-semibold">
            <Layers className="w-3.5 h-3.5 text-neutral-900" />
            <span>Chief Operating Officer & Co-Founder Portfolios</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            Ventures, Marketplaces & AI Systems
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
            Detailed case studies of ventures co-founded and operated by me. Each study outlines the systemic problem, target audience, personal ownership, deliverables shipped, and verifiable evidence.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <a href="/ventures/ziggers/" className="inline-flex items-center space-x-1 text-neutral-950 hover:underline">
              <span>Deep dive: Ziggers Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <span className="text-neutral-300">•</span>
            <a href="/ventures/loopmemory/" className="inline-flex items-center space-x-1 text-neutral-950 hover:underline">
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
