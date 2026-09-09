import React from 'react';
import { Cpu, GitFork } from 'lucide-react';

export default function StudioMethodology() {
  const studioPhases = [
    {
      step: "01",
      title: "PROBLEM DISCOVERY",
      subtitle: "Campus Ground Truth",
      description: "Direct observation of campus workflows—student ID fraud, Wi-Fi payment freezes, ERP downtime, informal buy/sell groups. Pain points are validated before writing code.",
      tag: "VALIDATION_FIRST"
    },
    {
      step: "02",
      title: "PARALLEL ARCHITECTURE",
      subtitle: "Hands-On Execution",
      description: "Designing modular microservices in Golang, hardware key stores in Flutter, and event-driven state streams. Heavy business logic stays off the client; APIs run sub-20ms.",
      tag: "ENGINEERING_SPECS"
    },
    {
      step: "03",
      title: "PILOT DEPLOYMENT",
      subtitle: "Low-Latency Testing",
      description: "Deploying working prototypes directly into student pilot groups. Testing under actual campus peak-hour loads rather than simulated staging benchmarks.",
      tag: "PILOT_TESTING"
    },
    {
      step: "04",
      title: "FUNDRAISING BLUEPRINT",
      subtitle: "Investor Readiness",
      description: "Transforming empirical usage data, retention metrics, and technical safety proofs into concise, bulletproof pitch decks built for early-stage institutional support.",
      tag: "FUNDRAISING_PREP"
    }
  ];

  return (
    <section id="unfounded" className="py-20 md:py-32 bg-black text-white border-b border-white/20 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enormous Section Headline */}
        <div className="mb-12 border-b border-white/20 pb-6">
          <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-2">
            <span>SECTION // 04</span>
            <span>PARALLEL CREATION ENGINE</span>
          </div>
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-poster font-bold text-white tracking-tighter leading-none">
            STUDIO ENGINE
          </h2>
        </div>

        {/* Studio Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 font-poster">
          <div className="poster-card p-6">
            <span className="text-4xl font-bold text-white block mb-2 font-mono">01</span>
            <h3 className="text-xl font-bold text-white mb-2 uppercase">PARALLEL CREATION</h3>
            <p className="text-xs text-neutral-300 font-display leading-relaxed">
              Building across fintech, digital identity, ERP engines, and campus marketplaces simultaneously.
            </p>
          </div>

          <div className="poster-card p-6">
            <span className="text-4xl font-bold text-white block mb-2 font-mono">02</span>
            <h3 className="text-xl font-bold text-white mb-2 uppercase">LEARN WHILE BUILDING</h3>
            <p className="text-xs text-neutral-300 font-display leading-relaxed">
              Not a passive advisor—Vijayrajkumar writes code, designs database schemas, and refines pitch decks in real time.
            </p>
          </div>

          <div className="poster-card p-6">
            <span className="text-4xl font-bold text-white block mb-2 font-mono">03</span>
            <h3 className="text-xl font-bold text-white mb-2 uppercase">ZERO VANITY METRICS</h3>
            <p className="text-xs text-neutral-300 font-display leading-relaxed">
              Focusing on actual daily student habit loops, hardware security enclaves, sub-20ms API latency, and clear unit economics.
            </p>
          </div>
        </div>

        {/* 4-Stage Studio Process Grid */}
        <div className="border-2 border-white bg-neutral-950 p-6 sm:p-8 font-poster shadow-[0_0_50px_rgba(255,255,255,0.08)]">
          <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-6">
            <div className="font-mono text-xs text-white font-bold uppercase tracking-wider flex items-center">
              <GitFork className="w-4 h-4 mr-2" />
              THE UNFOUNDED 4-STAGE VENTURE LIFECYCLE
            </div>
            <span className="font-mono text-[10px] text-neutral-400">BUILD_PIPELINE // 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studioPhases.map((phase) => (
              <div key={phase.step} className="bg-black p-5 border border-white/30 space-y-3 relative group hover:border-white transition-colors">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-3xl font-bold text-white font-poster">
                    {phase.step}
                  </span>
                  <span className="text-[9px] bg-white text-black font-bold px-2 py-0.5 uppercase tracking-wider">
                    {phase.tag}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold font-poster text-white uppercase group-hover:underline">
                    {phase.title}
                  </h4>
                  <p className="text-[10px] font-mono text-neutral-400 uppercase mt-0.5">
                    {phase.subtitle}
                  </p>
                </div>

                <p className="text-xs text-neutral-300 font-display leading-relaxed font-normal">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
