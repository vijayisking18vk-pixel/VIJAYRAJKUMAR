import React from 'react';
import { Cpu, ArrowUpRight, CheckCircle2, Database, Brain, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoopMemoryPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans selection:bg-neutral-900 selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center space-x-2 text-xs text-neutral-500 font-medium">
          <a href="/" className="hover:text-neutral-950">Home</a>
          <span>/</span>
          <a href="/#ventures" className="hover:text-neutral-950">Ventures</a>
          <span>/</span>
          <span className="text-neutral-950 font-semibold">LoopMemory Case Study</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 border-b border-neutral-200 pb-10">
          <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-800 text-xs px-3 py-1 rounded-full font-semibold">
            <Cpu className="w-3.5 h-3.5 text-neutral-900" />
            <span>AI Infrastructure Case Study · IGES Showcase</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            LoopMemory — Persistent Context & Memory for AI Agents
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
            A developer-focused context and cognitive architecture engine that solves LLM context loss across sessions, synthesizes dynamic knowledge graphs, and reduces token overhead.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="https://www.loopmemory.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-950 text-white font-semibold rounded-full hover:bg-black transition-colors text-xs shadow-sm"
            >
              <span>Visit live platform (loopmemory.in)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <span className="text-xs text-neutral-500">
              Chief Operating Officer & Co-Founder · Available for Developers
            </span>
          </div>
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
          
          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
            <div className="flex items-center space-x-2 text-neutral-950 font-bold">
              <Brain className="w-4 h-4" />
              <h2 className="text-base">1. The Problem</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Standard Large Language Models are stateless by design. When deploying AI agents or multi-turn conversational tools, context is either lost between sessions or shoved entirely into the prompt window — causing context rot, hallucinatory drift, and ballooning API costs.
            </p>
          </div>

          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
            <div className="flex items-center space-x-2 text-neutral-950 font-bold">
              <Database className="w-4 h-4" />
              <h2 className="text-base">2. The Target User</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              AI software developers, enterprise engineers, and founders deploying agentic workflows, long-horizon customer assistants, or personal knowledge agents requiring cross-session recall.
            </p>
          </div>

          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
            <div className="flex items-center space-x-2 text-neutral-950 font-bold">
              <Sparkles className="w-4 h-4" />
              <h2 className="text-base">3. What I Personally Owned</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              As Co-Founder, I spearheaded the core context-structuring architecture, conceptualizing how short-term episodic conversational memory transforms into long-term semantic knowledge graphs. I directed developer positioning, API ergonomics, and industry delegation outreach.
            </p>
          </div>

          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
            <div className="flex items-center space-x-2 text-neutral-950 font-bold">
              <Cpu className="w-4 h-4" />
              <h2 className="text-base">4. Deliverables Shipped</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Engineered memory structuring endpoints, vector indexing with semantic retrieval, entity relationship clustering, and an intuitive developer dashboard for inspecting agent cognitive state and memory decay.
            </p>
          </div>

        </div>

        {/* Verifiable Milestones */}
        <section className="space-y-4 border-t border-neutral-200 pt-10">
          <h2 className="text-xl font-bold text-neutral-950">
            Verifiable Evidence & Milestones
          </h2>
          <ul className="space-y-3 text-sm text-neutral-700">
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 mt-0.5 shrink-0" />
              <span><strong>Global Education Summit Showcase:</strong> Represented Unfounded and showcased LoopMemory / Loopverse architecture as official delegates at Kalaivaanar Arangam.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 mt-0.5 shrink-0" />
              <span><strong>SaaSathoN &apos;26 at SSN:</strong> Checked into the 36-hour high-intent builder sprint, validating developer launch mechanics.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 mt-0.5 shrink-0" />
              <span><strong>Live Production Platform:</strong> Accessible to developers at <a href="https://www.loopmemory.in/" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-neutral-950">loopmemory.in</a>.</span>
            </li>
          </ul>
        </section>

      </main>

      <Footer />
    </div>
  );
}
