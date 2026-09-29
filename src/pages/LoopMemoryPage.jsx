import React from 'react';
import { Cpu, ArrowUpRight, CheckCircle2, Database, Brain, Sparkles } from 'lucide-react';
import Footer from '../components/Footer';

export default function LoopMemoryPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-futura selection:bg-[var(--color-accent-primary)] selection:text-white flex flex-col">

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
        <div className="space-y-4 border-b border-[var(--gta-silhouette)]/40 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[var(--gta-sky-low)] text-[var(--gta-text-outline)] border border-[var(--gta-silhouette)] text-xs px-3.5 py-1 rounded-full font-bank uppercase tracking-wider shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-[var(--gta-text-outline)]" />
            <span>AI Infrastructure Case Study · IGES Showcase</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-pricedown tracking-wider uppercase text-[var(--gta-text-outline)] leading-tight">
            LoopMemory — Persistent Memory &amp; Context Architecture for AI Agents
          </h1>

          <p className="text-lg text-[var(--gta-text-outline)] font-futura leading-relaxed max-w-3xl">
            Co-founded by Vijayrajkumar. A developer-focused context and cognitive architecture engine that solves LLM context loss across sessions, synthesizes dynamic knowledge graphs, and reduces token overhead.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 font-bank uppercase text-xs">
            <a
              href="https://www.loopmemory.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[var(--gta-text-outline)] text-[var(--gta-text-fill)] font-bank uppercase tracking-wider rounded-full hover:bg-[var(--gta-text-shadow)] transition-colors text-xs shadow-md"
            >
              <span>Visit live platform (loopmemory.in)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <span className="text-xs font-bank uppercase tracking-wider font-bold text-[var(--color-accent-primary)]">
              Vijayrajkumar · Chief Operating Officer &amp; Co-Founder · Available for Developers
            </span>
            <span className="text-[var(--gta-silhouette)]">•</span>
            <a href="/about/" className="text-xs font-bank uppercase tracking-wider text-[var(--color-accent-primary)] hover:underline font-bold">
              About Vijayrajkumar →
            </a>
          </div>
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
          
          <div className="p-6 bg-[var(--gta-text-fill-light)] border-2 border-[var(--gta-silhouette)] hover:border-[var(--color-accent-primary)] rounded-2xl space-y-2 shadow-md transition-all">
            <div className="flex items-center space-x-2 text-[var(--color-accent-primary)] font-bold">
              <Brain className="w-4 h-4 text-[var(--color-accent-primary)]" />
              <h2 className="text-lg font-futura font-bold tracking-wide text-[var(--gta-text-outline)]">1. The Problem</h2>
            </div>
            <p className="text-[var(--gta-text-outline)] font-futura leading-relaxed">
              Standard Large Language Models are stateless by design. When deploying AI agents or multi-turn conversational tools, context is either lost between sessions or shoved entirely into the prompt window — causing context rot, hallucinatory drift, and ballooning API costs.
            </p>
          </div>

          <div className="p-6 bg-[var(--gta-text-fill-light)] border-2 border-[var(--gta-silhouette)] hover:border-[var(--color-accent-primary)] rounded-2xl space-y-2 shadow-md transition-all">
            <div className="flex items-center space-x-2 text-[var(--color-accent-primary)] font-bold">
              <Database className="w-4 h-4 text-[var(--color-accent-primary)]" />
              <h2 className="text-lg font-futura font-bold tracking-wide text-[var(--gta-text-outline)]">2. The Target User</h2>
            </div>
            <p className="text-[var(--gta-text-outline)] font-futura leading-relaxed">
              AI software developers, enterprise engineers, and founders deploying agentic workflows, long-horizon customer assistants, or personal knowledge agents requiring cross-session recall.
            </p>
          </div>

          <div className="p-6 bg-[var(--gta-text-fill-light)] border-2 border-[var(--gta-silhouette)] hover:border-[var(--color-accent-primary)] rounded-2xl space-y-2 shadow-md transition-all">
            <div className="flex items-center space-x-2 text-[var(--color-accent-primary)] font-bold">
              <Sparkles className="w-4 h-4 text-[var(--color-accent-primary)]" />
              <h2 className="text-lg font-futura font-bold tracking-wide text-[var(--gta-text-outline)]">3. What Vijayrajkumar Personally Owned</h2>
            </div>
            <p className="text-[var(--gta-text-outline)] font-futura leading-relaxed">
              As Chief Operating Officer &amp; Co-Founder, Vijayrajkumar spearheaded the core context-structuring architecture, conceptualizing how short-term episodic conversational memory transforms into long-term semantic knowledge graphs. He directed developer positioning, API ergonomics, and industry delegation outreach.
            </p>
          </div>

          <div className="p-6 bg-[var(--gta-text-fill-light)] border-2 border-[var(--gta-silhouette)] hover:border-[var(--color-accent-primary)] rounded-2xl space-y-2 shadow-md transition-all">
            <div className="flex items-center space-x-2 text-[var(--color-accent-primary)] font-bold">
              <Cpu className="w-4 h-4 text-[var(--color-accent-primary)]" />
              <h2 className="text-lg font-futura font-bold tracking-wide text-[var(--gta-text-outline)]">4. Deliverables Shipped</h2>
            </div>
            <p className="text-[var(--gta-text-outline)] font-futura leading-relaxed">
              Engineered memory structuring endpoints, vector indexing with semantic retrieval, entity relationship clustering, and an intuitive developer dashboard for inspecting agent cognitive state and memory decay.
            </p>
          </div>

        </div>

        {/* Quantified Architectural Proof & Benchmarks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-pricedown uppercase tracking-wide text-[var(--gta-text-outline)]">
            Architectural Benchmarks &amp; Measured Outcomes
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-[var(--gta-text-fill-light)] border-2 border-[var(--gta-silhouette)] rounded-2xl shadow-sm text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-pricedown text-[var(--color-accent-primary)] tracking-wider">68%</div>
              <div className="text-xs font-bank uppercase tracking-wider text-[var(--gta-text-outline)] font-bold">Prompt Token Savings</div>
              <p className="text-[11px] font-futura text-[var(--color-text-muted)] font-medium">Replaces raw chat dump with semantic entity triples in prompt payload</p>
            </div>
            <div className="p-5 bg-[var(--gta-text-fill-light)] border-2 border-[var(--gta-silhouette)] rounded-2xl shadow-sm text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-pricedown text-[var(--color-accent-primary)] tracking-wider">&lt; 80ms</div>
              <div className="text-xs font-bank uppercase tracking-wider text-[var(--gta-text-outline)] font-bold">Retrieval Latency</div>
              <p className="text-[11px] font-futura text-[var(--color-text-muted)] font-medium">Sub-second semantic graph traversal across 50,000+ indexed facts</p>
            </div>
            <div className="p-5 bg-[var(--gta-text-fill-light)] border-2 border-[var(--gta-silhouette)] rounded-2xl shadow-sm text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-pricedown text-[var(--color-accent-primary)] tracking-wider">Zero</div>
              <div className="text-xs font-bank uppercase tracking-wider text-[var(--gta-text-outline)] font-bold">Context Rot Rate</div>
              <p className="text-[11px] font-futura text-[var(--color-text-muted)] font-medium">Eliminates catastrophic forgetting in 50+ turn agent interactions</p>
            </div>
            <div className="p-5 bg-[var(--gta-text-fill-light)] border-2 border-[var(--gta-silhouette)] rounded-2xl shadow-sm text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-pricedown text-[var(--color-accent-primary)] tracking-wider">100%</div>
              <div className="text-xs font-bank uppercase tracking-wider text-[var(--gta-text-outline)] font-bold">Lossless State</div>
              <p className="text-[11px] font-futura text-[var(--color-text-muted)] font-medium">Persistent relational graph stored at rest for indefinite agent longevity</p>
            </div>
          </div>
        </section>

        {/* Verifiable Milestones */}
        <section className="p-6 sm:p-8 bg-[var(--gta-text-fill-light)] border-2 border-[var(--gta-silhouette)] rounded-2xl shadow-md space-y-4">
          <h2 className="text-xl font-bold text-[var(--gta-text-outline)]">
            Verifiable Evidence & Milestones
          </h2>
          <ul className="space-y-3 text-sm text-[var(--gta-text-outline)]">
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-primary)] mt-0.5 shrink-0" />
              <span><strong>Global Education Summit Showcase:</strong> Represented Unfounded and showcased LoopMemory / Loopverse architecture as official delegates at Kalaivaanar Arangam.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-primary)] mt-0.5 shrink-0" />
              <span><strong>SaaSathoN &apos;26 at SSN:</strong> Checked into the 36-hour high-intent builder sprint, validating developer launch mechanics.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-primary)] mt-0.5 shrink-0" />
              <span><strong>Live Production Platform:</strong> Accessible to developers at <a href="https://www.loopmemory.in/" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-[var(--color-accent-primary)]">loopmemory.in</a>.</span>
            </li>
          </ul>
        </section>

      </main>

      <Footer />
    </div>
  );
}
