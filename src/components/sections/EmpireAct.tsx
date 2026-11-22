import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Building2, Radio, Home, Truck, ShieldCheck } from 'lucide-react';
import { STORY_DATA, Venture } from '../../data/storyData';

const VENTURE_ICONS: Record<string, React.ReactNode> = {
  'daas-media': <Radio className="w-5 h-5 text-[#9D00FF]" />,
  'chennai-rents': <Building2 className="w-5 h-5 text-[#D147FF]" />,
  'schloss-living': <Home className="w-5 h-5 text-[#4B009E]" />,
  'distribution': <Truck className="w-5 h-5 text-[#F8ECFF]" />,
};

export const EmpireAct: React.FC = () => {
  return (
    <section
      id="empire"
      className="relative min-h-screen w-full flex flex-col justify-center px-4 sm:px-8 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Chapter Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#9D00FF]/20 pb-6 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#9D00FF] mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#9D00FF] inline-block" />
              <span>CHAPTER 05 // PRESENT DAY COMMAND</span>
            </div>
            <h2 className="font-monumental text-3xl sm:text-5xl md:text-6xl font-bold text-[#F8ECFF] uppercase tracking-tight">
              THE EMPIRE AT 21
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 font-mono text-xs text-[#A89BB9] text-left sm:text-right">
            <div>FOUR ACTIVE PILLARS</div>
            <div className="text-[#D147FF] font-bold">FOUNDER & CHIEF EXECUTIVE OFFICER</div>
          </div>
        </div>

        {/* 4 Asymmetric Venture Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {STORY_DATA.ventures.map((v: Venture, index: number) => {
            const hasUrl = !!v.url;
            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative p-6 sm:p-8 rounded-2xl bg-[#0B011A]/80 border border-[#9D00FF]/30 backdrop-blur-md flex flex-col justify-between hover:border-[#D147FF] transition-all duration-500 overflow-hidden"
                data-cursor={hasUrl ? `OPEN ${v.name}` : v.name}
              >
                {/* Subtle Plasma Hover Wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#9D00FF]/5 via-transparent to-[#D147FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-lg font-bold text-[#D147FF]">
                        {v.index}
                      </span>
                      <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-[#9D00FF]/20 text-[#A89BB9] border border-[#9D00FF]/30">
                        {v.badge}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#9D00FF] animate-pulse" />
                      <span className="font-mono text-[10px] text-[#A89BB9] uppercase tracking-wider">
                        {v.status}
                      </span>
                    </div>
                  </div>

                  {/* Logo or Brand Heading */}
                  <div className="mb-4">
                    {v.id === 'daas-media' ? (
                      <div className="flex items-center space-x-4">
                        <img
                          src="/images/daas-media-logo.png"
                          alt="daas.media logo"
                          className="h-9 sm:h-10 object-contain filter brightness-110"
                        />
                        <span className="font-mono text-xs text-[#A89BB9]">
                          // {v.role}
                        </span>
                      </div>
                    ) : v.id === 'chennai-rents' ? (
                      <div className="flex items-center space-x-4">
                        <img
                          src="/images/chennai-rents-logo.jpg"
                          alt="ChennaiRENTS logo"
                          className="h-10 sm:h-12 object-contain rounded"
                        />
                        <span className="font-mono text-xs text-[#A89BB9]">
                          // {v.role}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 rounded-xl bg-[#4B009E]/30 border border-[#9D00FF]/40">
                          {VENTURE_ICONS[v.id]}
                        </div>
                        <div>
                          <h3 className="font-monumental text-xl sm:text-2xl font-bold text-[#F8ECFF] tracking-wide">
                            {v.name}
                          </h3>
                          <span className="font-mono text-xs text-[#A89BB9]">
                            // {v.role}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tagline */}
                  <h4 className="font-editorial text-lg sm:text-xl font-semibold text-[#F8ECFF] mb-3 group-hover:text-[#D147FF] transition-colors">
                    {v.tagline}
                  </h4>

                  {/* Description */}
                  <p className="font-editorial text-sm sm:text-base text-[#A89BB9] leading-relaxed mb-6">
                    {v.description}
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-4 border-t border-[#9D00FF]/20 flex items-center justify-between">
                  {hasUrl ? (
                    <a
                      href={v.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 font-mono text-xs text-[#F8ECFF] bg-[#9D00FF]/30 hover:bg-[#D147FF] hover:text-[#020005] px-4 py-2 rounded-lg border border-[#9D00FF]/50 transition-all duration-300"
                    >
                      <span>VISIT LIVE DOMAIN</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="font-mono text-xs text-[#A89BB9] flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-[#D147FF]" />
                      <span>OFFLINE INFRASTRUCTURE & SUPPLY</span>
                    </div>
                  )}

                  <span className="font-mono text-[11px] text-[#A89BB9]/60">
                    2024 – PRESENT
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
