import React from 'react';
import { Layers, ArrowUpRight, Zap, Code, Rocket } from 'lucide-react';
import ScrollFloat from './react-bits/ScrollFloat';
import PixelTransition from './react-bits/PixelTransition';
import StackCard from './react-bits/StackCard';
import ChromaGrid from './react-bits/ChromaGrid';
import FuzzyText from './react-bits/FuzzyText';
import ElectricBorder from './react-bits/ElectricBorder';

export default function VentureWorkbench() {
  const experiences = [
    {
      id: 'zigger',
      name: 'Zigger',
      role: 'Co-Founder · Full-time',
      period: 'Jun 2025 – Present · 1 yr 4 mos',
      location: 'Chennai, Tamil Nadu, India · On-site',
      tagline: 'Local Gig-Economy Marketplace',
      highlight: 'Product Hunt Launched',
      icon: Zap,
      desc: 'A local gig-economy marketplace replacing informal hiring systems with live tracking and escrow. Architecting product growth and market dynamics.',
      skills: ['Marketing', 'Vibe Coding', 'Live Escrow', 'Gig Marketplace'],
      url: 'https://www.ziggers.in/',
      linkedinUrl: 'https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/edit/forms/position/2869893701/',
      status: 'Live'
    },
    {
      id: 'loopverse',
      name: 'Loopverse',
      role: 'Co-Founder · Full-time',
      period: 'Jun 2025 – Present · 1 yr 4 mos',
      location: 'Chennai, Tamil Nadu, India · On-site',
      tagline: 'Knowledge Capture & Context Structuring',
      highlight: 'Global Education Summit',
      icon: Code,
      desc: 'Building intelligent knowledge capture and context structuring systems (LoopMemory). Streamlining semantic memory and context graphs.',
      skills: ['Marketing', 'Vibe Coding', 'Context Structuring', 'Vector Indexing'],
      url: 'https://www.loopmemory.in/',
      linkedinUrl: 'https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/edit/forms/position/2869898421/',
      status: 'Live'
    },
    {
      id: 'unfounded',
      name: 'Unfounded',
      role: 'Co-Founder · Full-time',
      period: 'Jun 2025 – Present · 1 yr 4 mos',
      location: 'Chennai, Tamil Nadu, India · On-site',
      tagline: 'Venture Studio & Incubation Core',
      highlight: 'Venture Studio Core',
      icon: Rocket,
      desc: 'Co-founding and building early-stage tech ventures in parallel. Orchestrating cross-functional teams, GTM strategy, product architecture, and investor networking.',
      skills: ['Hindi', 'Marketing', 'Start-up Leadership', 'Venture Building'],
      url: 'https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/',
      linkedinUrl: 'https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/edit/forms/position/2870752640/',
      status: 'Active Studio'
    }
  ];

  return (
    <section id="ventures" className="w-full bg-white text-neutral-950 py-24 lg:py-32 px-6 sm:px-12 border-t border-neutral-200 font-sans">
      <div className="max-w-6xl mx-auto space-y-16 lg:space-y-20">
        
        {/* Section Header with sentence case typography */}
        <div className="space-y-5 border-b border-neutral-200 pb-10">
          <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-800 font-sans text-xs px-3.5 py-1.5 rounded-full font-semibold">
            <Layers className="w-3.5 h-3.5 shrink-0 text-neutral-900" />
            <span>02 // Experience & venture matrix</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-neutral-950 leading-tight">
            Co-founder roles & active ventures
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 font-sans leading-relaxed max-w-2xl">
            Full-time Co-Founder at <span className="font-semibold text-neutral-950">Zigger</span>, <span className="font-semibold text-neutral-950">Loopverse</span>, and <span className="font-semibold text-neutral-950">Unfounded</span> in Chennai, India.
          </p>
        </div>

        {/* Experience Cards Grid using PixelTransition, StackCard, and ChromaGrid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Zigger -> PixelTransition */}
          <PixelTransition className="p-8 flex flex-col justify-between space-y-8 h-full">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full font-medium text-[11px]">
                  {experiences[0].highlight}
                </span>
                <span className="text-neutral-400 font-mono text-xs">01 / 03</span>
              </div>

              <div className="flex items-start justify-between gap-3 pt-1">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-950 tracking-tight leading-snug">
                    <FuzzyText>{experiences[0].name}</FuzzyText>
                  </h3>
                  <div className="text-xs text-neutral-900 font-semibold mt-1">
                    {experiences[0].role}
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">
                    {experiences[0].period} • {experiences[0].location}
                  </div>
                </div>
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-neutral-900" />
                </div>
              </div>

              <p className="text-sm font-sans text-neutral-600 leading-relaxed">
                {experiences[0].desc}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {experiences[0].skills.map((s, i) => (
                  <span key={i} className="text-xs bg-neutral-50 border border-neutral-200 px-2.5 py-1 rounded-md text-neutral-700 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-medium">Status: {experiences[0].status}</span>
              <a href={experiences[0].url} target="_blank" rel="noopener noreferrer" className="inline-block">
                <ElectricBorder className="py-2 px-4 text-xs">
                  <span className="flex items-center space-x-1.5">
                    <span>Visit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </ElectricBorder>
              </a>
            </div>
          </PixelTransition>

          {/* Card 2: Loopverse -> StackCard */}
          <StackCard className="h-full">
            <div className="flex flex-col justify-between space-y-8 h-full">
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full font-medium text-[11px]">
                    {experiences[1].highlight}
                  </span>
                  <span className="text-neutral-400 font-mono text-xs">02 / 03</span>
                </div>

                <div className="flex items-start justify-between gap-3 pt-1">
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-950 tracking-tight leading-snug">
                      <FuzzyText>{experiences[1].name}</FuzzyText>
                    </h3>
                    <div className="text-xs text-neutral-900 font-semibold mt-1">
                      {experiences[1].role}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {experiences[1].period} • {experiences[1].location}
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center shrink-0">
                    <Code className="w-5 h-5 text-neutral-900" />
                  </div>
                </div>

                <p className="text-sm font-sans text-neutral-600 leading-relaxed">
                  {experiences[1].desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {experiences[1].skills.map((s, i) => (
                    <span key={i} className="text-xs bg-neutral-50 border border-neutral-200 px-2.5 py-1 rounded-md text-neutral-700 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-medium">Status: {experiences[1].status}</span>
                <a href={experiences[1].url} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <ElectricBorder className="py-2 px-4 text-xs">
                    <span className="flex items-center space-x-1.5">
                      <span>Visit</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </ElectricBorder>
                </a>
              </div>
            </div>
          </StackCard>

          {/* Card 3: Unfounded -> ChromaGrid */}
          <ChromaGrid className="p-8 flex flex-col justify-between space-y-8 h-full">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full font-medium text-[11px]">
                  {experiences[2].highlight}
                </span>
                <span className="text-neutral-400 font-mono text-xs">03 / 03</span>
              </div>

              <div className="flex items-start justify-between gap-3 pt-1">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-950 tracking-tight leading-snug">
                    <FuzzyText>{experiences[2].name}</FuzzyText>
                  </h3>
                  <div className="text-xs text-neutral-900 font-semibold mt-1">
                    {experiences[2].role}
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">
                    {experiences[2].period} • {experiences[2].location}
                  </div>
                </div>
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center shrink-0">
                  <Rocket className="w-5 h-5 text-neutral-900" />
                </div>
              </div>

              <p className="text-sm font-sans text-neutral-600 leading-relaxed">
                {experiences[2].desc}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {experiences[2].skills.map((s, i) => (
                  <span key={i} className="text-xs bg-neutral-50 border border-neutral-200 px-2.5 py-1 rounded-md text-neutral-700 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-medium">Status: {experiences[2].status}</span>
              <a href={experiences[2].url} target="_blank" rel="noopener noreferrer" className="inline-block">
                <ElectricBorder className="py-2 px-4 text-xs">
                  <span className="flex items-center space-x-1.5">
                    <span>Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </ElectricBorder>
              </a>
            </div>
          </ChromaGrid>

        </div>

      </div>
    </section>
  );
}
