import React from 'react';
import { Terminal, Layers, ArrowRight, Activity, GitBranch, ShieldCheck, Compass } from 'lucide-react';
import { studioStats, venturesData } from '../data/venturesData';

export default function Hero({ onExploreVentures, onInspectLogs }) {
  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-grid-cad border-b border-drafting-steel">
      {/* Background CAD accent lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-drafting-blueprint/20"></div>
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-drafting-blueprint/20"></div>
        <div className="absolute left-1/4 top-0 h-full w-[1px] bg-drafting-blueprint/20"></div>
        <div className="absolute left-3/4 top-0 h-full w-[1px] bg-drafting-blueprint/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CAD Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6 font-mono text-xs text-drafting-ink-muted border-b border-drafting-steel pb-3">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2.5 h-2.5 bg-drafting-blueprint rounded-sm"></span>
            <span className="font-semibold text-drafting-ink">DRAFTING TABLE // WORKSHOP SPEC 2026</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>LAT: 12.9716° N</span>
            <span>|</span>
            <span>LON: 77.5946° E</span>
            <span>|</span>
            <span className="text-drafting-blueprint font-bold">[UNFOUNDED_STUDIOS]</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Headline & Positioning */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-drafting-blueprint/10 text-drafting-blueprint border border-drafting-blueprint/30 rounded font-mono text-xs">
              <Activity className="w-3.5 h-3.5 animate-pulse text-drafting-amber" />
              <span>ACTIVE VENTURE BUILDER & TECHNICAL PRODUCT CREATOR</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-drafting-ink leading-[1.1]">
              Building multiple ventures in parallel —{' '}
              <span className="text-drafting-blueprint underline decoration-drafting-blueprint/30 decoration-wavy underline-offset-8">
                learning tech while building
              </span>, not before.
            </h1>

            <p className="text-base sm:text-lg text-drafting-ink-muted font-body leading-relaxed max-w-2xl">
              I'm <strong className="text-drafting-ink">Vijayrajkumar</strong>, venture builder at{' '}
              <strong className="text-drafting-blueprint">UNFOUNDED Venture Studios</strong>. My work spans venture creation, startup ideation, product architecture, pitch deck iteration, user validation, and fundraising prep—making work-in-progress visible across 6 early-stage projects.
            </p>

            {/* Live Ticker Strip */}
            <div className="bg-drafting-surface p-3.5 rounded border border-drafting-steel shadow-spec">
              <div className="flex items-center space-x-2 font-mono text-xs text-drafting-ink-muted mb-2">
                <GitBranch className="w-3.5 h-3.5 text-drafting-blueprint" />
                <span className="font-semibold text-drafting-ink">PARALLEL BUILD STREAM:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                {venturesData.slice(0, 6).map((venture) => (
                  <div 
                    key={venture.id}
                    className="flex items-center space-x-1.5 p-1.5 bg-drafting-paper rounded border border-drafting-steel/60 hover:border-drafting-blueprint transition-colors"
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      venture.status === 'ACTIVE_BUILD' ? 'bg-drafting-blueprint' :
                      venture.status === 'PILOT_DEPLOYMENT' ? 'bg-drafting-emerald' :
                      venture.status === 'PROTOTYPE' ? 'bg-drafting-amber' : 'bg-slate-400'
                    }`}></span>
                    <span className="font-semibold text-drafting-ink truncate">{venture.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
              <button
                onClick={onExploreVentures}
                className="inline-flex items-center space-x-2 px-5 py-3 bg-drafting-blueprint text-white font-bold rounded shadow-md hover:bg-drafting-blueprint-hover transition-all duration-200"
              >
                <span>OPEN VENTURE WORKBENCH</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onInspectLogs}
                className="inline-flex items-center space-x-2 px-5 py-3 bg-drafting-surface text-drafting-ink font-semibold rounded border border-drafting-steel hover:bg-drafting-steel/30 transition-all duration-200 shadow-sm"
              >
                <Terminal className="w-4 h-4 text-drafting-blueprint" />
                <span>INSPECT BUILD LOG ({studioStats.totalBuildLogs})</span>
              </button>
            </div>
          </div>

          {/* Right Column: Workshop Active Spec Sheet */}
          <div className="lg:col-span-5">
            <div className="bg-drafting-slate text-slate-100 rounded-lg p-6 border border-slate-700 shadow-2xl relative font-mono">
              {/* CAD corner marks */}
              <div className="absolute top-2 left-2 text-[10px] text-slate-500">SPEC_ID: VR-2026</div>
              <div className="absolute top-2 right-2 text-[10px] text-drafting-amber flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-drafting-amber mr-1 animate-ping"></span>
                ACTIVE
              </div>

              <div className="border-b border-slate-700 pb-4 mb-4 mt-2">
                <h2 className="text-sm font-bold tracking-wider text-drafting-blueprint uppercase flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  BUILDER LEDGER & SPECS
                </h2>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  Vijayrajkumar @ UNFOUNDED Venture Studios
                </p>
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs mb-5">
                <div className="bg-slate-800/80 p-3 rounded border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">TOTAL VENTURES</span>
                  <span className="text-2xl font-bold text-white">{studioStats.totalVentures}</span>
                  <span className="text-[10px] text-drafting-blueprint block mt-0.5">3 in Active Build</span>
                </div>

                <div className="bg-slate-800/80 p-3 rounded border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">BUILD LOG ENTRIES</span>
                  <span className="text-2xl font-bold text-drafting-amber">{studioStats.totalBuildLogs}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Documented in public</span>
                </div>

                <div className="bg-slate-800/80 p-3 rounded border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">LEARNING VELOCITY</span>
                  <span className="text-2xl font-bold text-emerald-400">{studioStats.learningHours}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Go, Systems, UPI & AI</span>
                </div>

                <div className="bg-slate-800/80 p-3 rounded border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">CAMPUS PILOT USERS</span>
                  <span className="text-2xl font-bold text-purple-400">{studioStats.campusPilots}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">1,200+ Active Students</span>
                </div>
              </div>

              {/* Core Philosophy Box */}
              <div className="bg-slate-900/90 p-3.5 rounded border border-slate-700 text-xs leading-relaxed space-y-2">
                <div className="flex items-center text-drafting-blueprint font-bold text-[11px]">
                  <Compass className="w-3.5 h-3.5 mr-1.5" />
                  BUILDING PRINCIPLE:
                </div>
                <p className="text-slate-300 font-sans text-xs">
                  "No fake prototypes or vanity metrics. Heavy logic stays on controlled backends, sensitive actions use hardware security, and products solve real daily campus friction."
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>STATUS: OPERATIONAL</span>
                <span>REV: 4.2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
