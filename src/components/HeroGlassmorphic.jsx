import React from 'react';
import { ArrowDown, ArrowRight, Terminal, Sparkles, Layers, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { studioStats, venturesData } from '../data/venturesData';

export default function HeroGlassmorphic({ onExploreVentures, onInspectLogs }) {
  return (
    <section className="relative w-full py-8 md:py-16 overflow-hidden">
      
      {/* Background Soft Misty Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-200/40 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Full Unobscured Portrait Image + Glass Spec Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Full Portrait Photo Display (Zero Clipping, Crisp Natural Colors) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              
              {/* Outer Frosted Glass Photo Frame */}
              <div className="glass-panel p-3 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] relative overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
                
                {/* Full Unobscured Portrait Photo */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[9/16] sm:aspect-[3/4] lg:aspect-[9/16] flex items-center justify-center">
                  <img
                    src="/hero-full.png"
                    alt="Vijayrajkumar - Full Portrait in Misty Forest"
                    className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.02] saturate-[1.05] transition-all duration-700 group-hover:scale-105"
                  />

                  {/* Subtle Light Soft Vignette at Base Only */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none"></div>

                  {/* Floating Glass Badge Overlay on Photo */}
                  <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-xl backdrop-blur-md text-white border border-white/40 shadow-lg font-display">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="flex items-center text-emerald-300 font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                        BUILDING IN PUBLIC
                      </span>
                      <span className="text-slate-300 font-mono text-[11px]">2026 // IST</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative Subtle Shadow Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400/20 via-emerald-400/20 to-amber-400/20 rounded-3xl blur-xl -z-10 opacity-70"></div>
            </div>
          </div>

          {/* Right Column: Signature Space Grotesk Glass Typography & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center space-x-2 font-display text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50/90 px-4 py-1.5 rounded-full border border-sky-200/80 shadow-sm backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>VENTURE BUILDER · UNFOUNDED STUDIOS</span>
            </div>

            {/* Main Headline in Space Grotesk */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-slate-900 tracking-tight leading-[1.05]">
                Vijayrajkumar
              </h1>
              <p className="text-xl sm:text-2xl font-display font-medium text-sky-600 tracking-tight">
                Building ventures, learning as I go.
              </p>
            </div>

            {/* Glass Narrative Box */}
            <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-glass">
              <p className="text-sm sm:text-base font-display text-slate-700 leading-relaxed">
                I'm a young entrepreneur and venture builder at <strong className="text-slate-900 font-bold">UNFOUNDED Venture Studios</strong>. My work spans venture creation, startup ideation, product architecture, pitch deck iteration, user validation, and fundraising prep—building multiple early-stage ventures in parallel.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-display text-xs">
                <div className="bg-white/80 p-3 rounded-xl border border-slate-200/80">
                  <span className="text-slate-500 block text-[11px] font-mono">ACTIVE VENTURES</span>
                  <span className="text-xl font-bold text-slate-900">{studioStats.totalVentures} Ventures</span>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-slate-200/80">
                  <span className="text-slate-500 block text-[11px] font-mono">BUILD LOGS</span>
                  <span className="text-xl font-bold text-sky-600">{studioStats.totalBuildLogs} Entries</span>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-slate-200/80 col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block text-[11px] font-mono">PILOT USERS</span>
                  <span className="text-xl font-bold text-emerald-600">1,200+ Students</span>
                </div>
              </div>
            </div>

            {/* Parallel Build Ticker Strip */}
            <div className="glass-panel p-4 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-2 font-display text-xs text-slate-500 mb-2 font-semibold">
                <Cpu className="w-3.5 h-3.5 text-sky-600" />
                <span className="uppercase tracking-wider">PARALLEL BUILD STREAM:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-display text-xs">
                {venturesData.slice(0, 6).map((venture) => (
                  <div
                    key={venture.id}
                    className="flex items-center space-x-2 p-2 bg-white/70 rounded-xl border border-slate-200/80 hover:border-sky-400 transition-colors"
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      venture.status === 'ACTIVE_BUILD' ? 'bg-sky-500' :
                      venture.status === 'PILOT_DEPLOYMENT' ? 'bg-emerald-500' :
                      venture.status === 'PROTOTYPE' ? 'bg-amber-500' : 'bg-purple-500'
                    }`}></span>
                    <span className="font-semibold text-slate-900 truncate">{venture.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-display text-xs sm:text-sm font-semibold">
              <button
                onClick={onExploreVentures}
                className="px-6 py-3.5 rounded-full bg-slate-900 text-white font-semibold hover:bg-sky-600 transition-all shadow-md flex items-center space-x-2"
              >
                <span>EXPLORE VENTURE MATRIX</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onInspectLogs}
                className="px-6 py-3.5 rounded-full glass-pill text-slate-800 font-semibold hover:bg-white/90 transition-all shadow-sm flex items-center space-x-2 border border-slate-300/80"
              >
                <Terminal className="w-4 h-4 text-sky-600" />
                <span>INSPECT BUILD LOG ({studioStats.totalBuildLogs})</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
