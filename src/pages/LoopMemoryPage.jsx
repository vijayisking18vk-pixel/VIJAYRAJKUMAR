import React from 'react';
import { Cpu, ArrowUpRight, CheckCircle2, Database, Brain, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoopMemoryPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center space-x-2 text-xs text-[var(--color-text-muted)] font-medium">
          <a href="/" className="hover:text-[var(--color-accent-primary)]">Home</a>
          <span>/</span>
          <a href="/ventures/" className="hover:text-[var(--color-accent-primary)]">Ventures</a>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-semibold">LoopMemory Case Study</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 border-b border-[#7A968B]/40 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[#E2ECE7] text-[#1B2F21] border border-[#85A296] text-xs px-3.5 py-1 rounded-full font-bold shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-[#1B2F21]" />
            <span>AI Infrastructure Case Study · IGES Showcase</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111815] leading-tight">
            LoopMemory — Persistent Context & Memory for AI Agents
          </h1>

          <p className="text-lg text-[#1D2B24] leading-relaxed max-w-3xl font-medium">
            A developer-focused context and cognitive architecture engine that solves LLM context loss across sessions, synthesizes dynamic knowledge graphs, and reduces token overhead.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="https://www.loopmemory.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#203322] text-white font-semibold rounded-full hover:bg-[#111815] transition-colors text-xs shadow-md"
            >
              <span>Visit live platform (loopmemory.in)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <span className="text-xs text-[#2A3E34] font-semibold">
              Chief Operating Officer & Co-Founder · Available for Developers
            </span>
          </div>
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
          
          <div className="p-6 bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-2xl space-y-2 shadow-md transition-all">
            <div className="flex items-center space-x-2 text-[#203322] font-bold">
              <Brain className="w-4 h-4 text-[#203322]" />
              <h2 className="text-base text-[#111815]">1. The Problem</h2>
            </div>
            <p className="text-[#1D2B24] leading-relaxed">
              Standard Large Language Models are stateless by design. When deploying AI agents or multi-turn conversational tools, context is either lost between sessions or shoved entirely into the prompt window — causing context rot, hallucinatory drift, and ballooning API costs.
            </p>
          </div>

          <div className="p-6 bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-2xl space-y-2 shadow-md transition-all">
            <div className="flex items-center space-x-2 text-[#203322] font-bold">
              <Database className="w-4 h-4 text-[#203322]" />
              <h2 className="text-base text-[#111815]">2. The Target User</h2>
            </div>
            <p className="text-[#1D2B24] leading-relaxed">
              AI software developers, enterprise engineers, and founders deploying agentic workflows, long-horizon customer assistants, or personal knowledge agents requiring cross-session recall.
            </p>
          </div>

          <div className="p-6 bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-2xl space-y-2 shadow-md transition-all">
            <div className="flex items-center space-x-2 text-[#203322] font-bold">
              <Sparkles className="w-4 h-4 text-[#203322]" />
              <h2 className="text-base text-[#111815]">3. What I Personally Owned</h2>
            </div>
            <p className="text-[#1D2B24] leading-relaxed">
              As Co-Founder, I spearheaded the core context-structuring architecture, conceptualizing how short-term episodic conversational memory transforms into long-term semantic knowledge graphs. I directed developer positioning, API ergonomics, and industry delegation outreach.
            </p>
          </div>

          <div className="p-6 bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-2xl space-y-2 shadow-md transition-all">
            <div className="flex items-center space-x-2 text-[#203322] font-bold">
              <Cpu className="w-4 h-4 text-[#203322]" />
              <h2 className="text-base text-[#111815]">4. Deliverables Shipped</h2>
            </div>
            <p className="text-[#1D2B24] leading-relaxed">
              Engineered memory structuring endpoints, vector indexing with semantic retrieval, entity relationship clustering, and an intuitive developer dashboard for inspecting agent cognitive state and memory decay.
            </p>
          </div>

        </div>

        {/* Verifiable Milestones */}
        <section className="p-6 sm:p-8 bg-white border-2 border-[#7A968B] rounded-2xl shadow-md space-y-4">
          <h2 className="text-xl font-bold text-[#111815]">
            Verifiable Evidence & Milestones
          </h2>
          <ul className="space-y-3 text-sm text-[#1D2B24]">
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#203322] mt-0.5 shrink-0" />
              <span><strong>Global Education Summit Showcase:</strong> Represented Unfounded and showcased LoopMemory / Loopverse architecture as official delegates at Kalaivaanar Arangam.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#203322] mt-0.5 shrink-0" />
              <span><strong>SaaSathoN &apos;26 at SSN:</strong> Checked into the 36-hour high-intent builder sprint, validating developer launch mechanics.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#203322] mt-0.5 shrink-0" />
              <span><strong>Live Production Platform:</strong> Accessible to developers at <a href="https://www.loopmemory.in/" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-[#203322]">loopmemory.in</a>.</span>
            </li>
          </ul>
        </section>

      </main>

      <Footer />
    </div>
  );
}
