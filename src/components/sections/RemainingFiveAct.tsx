import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, PhoneCall, CheckCircle2, Shield, Flame, Sparkles } from 'lucide-react';
import { STORY_DATA } from '../../data/storyData';

const FIVE_PILLARS = [
  { id: 1, role: 'R. VIJAYRAJKUMAR', title: 'OPERATIONS & CEO', trait: 'Commercial Velocity & Tenacity', active: true },
  { id: 2, role: 'FOUNDER NODE 02', title: 'FULL-STACK SYSTEMS', trait: 'Backend & Cloud Infrastructure' },
  { id: 3, role: 'FOUNDER NODE 03', title: 'PRODUCT ARCHITECTURE', trait: 'UI/UX & Client Applications' },
  { id: 4, role: 'FOUNDER NODE 04', title: 'HARDWARE & IOT', trait: 'Device Firmware & Physical Nodes' },
  { id: 5, role: 'FOUNDER NODE 05', title: 'GROWTH & DATA', trait: 'Customer Acquisition & Analytics' },
];

export const RemainingFiveAct: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState(1);

  return (
    <section
      id="turning-point"
      className="relative min-h-screen w-full flex flex-col justify-center px-4 sm:px-8 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Chapter Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#9D00FF]/20 pb-6 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#9D00FF] mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#9D00FF] inline-block" />
              <span>CHAPTER 04 // 2023 – 2024</span>
            </div>
            <h2 className="font-monumental text-3xl sm:text-5xl md:text-6xl font-bold text-[#F8ECFF] uppercase tracking-tight">
              THE CALL & THE REMAINING FIVE
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 font-mono text-xs text-[#A89BB9] text-left sm:text-right">
            <div>TURNING POINT</div>
            <div className="text-[#D147FF]">SURVIVAL RATE: 5 BROTHERS</div>
          </div>
        </div>

        {/* Narrative & Quote Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Narrative Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0B011A]/80 border border-[#9D00FF]/30 backdrop-blur-md flex flex-col space-y-6"
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-[#D147FF]">
              <PhoneCall className="w-4 h-4 text-[#D147FF]" />
              <span className="uppercase tracking-widest">THE SPARK IN ACADEMIC LIMBO</span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F8ECFF] leading-snug">
              "Everyone in that room knew how to code. I was the only non-technical guy standing there."
            </h3>

            <p className="font-editorial text-sm sm:text-base text-[#A89BB9] leading-relaxed">
              When debarred from exams and staring down an empty future, an unexpected phone call came from a close friend rallying a crew to start building companies.
            </p>

            <p className="font-editorial text-sm sm:text-base text-[#A89BB9] leading-relaxed">
              The internal imposter voice screamed: <em className="text-[#F8ECFF]">"What value do I even add among engineers?"</em> But instead of retreating into excuses, Vijayrajkumar stepped into the arena. If they built the software, he would own the ground: operations, cold outreach, commercial deals, real-estate legwork, and ruthless execution.
            </p>

            {/* Attrition stat */}
            <div className="p-4 rounded-xl bg-[#020005]/80 border border-[#9D00FF]/20 font-mono text-xs text-[#A89BB9]">
              <span className="text-[#D147FF] font-bold block mb-1">THE NATURAL ATTRITION:</span>
              Dozens joined early brainstorming sessions. When real pressure, sleepless nights, and sacrifices arrived, most fled back to standard campus placements.
            </div>
          </motion.div>

          {/* Right Constellation Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0B011A]/80 border border-[#9D00FF]/30 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#9D00FF]/20">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#D147FF]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F8ECFF]">
                    THE 5 SURVIVORS CONSTELLATION
                  </span>
                </div>
                <span className="font-mono text-xs text-[#D147FF] font-bold">5 / 5 CORE LOCKED</span>
              </div>

              {/* 5 Constellation Nodes Interactive Select */}
              <div className="space-y-3">
                {FIVE_PILLARS.map((node) => {
                  const isSelected = selectedNode === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#4B009E]/40 border-[#D147FF] shadow-[0_0_20px_rgba(209,71,255,0.25)]'
                          : 'bg-[#020005]/60 border-[#9D00FF]/20 hover:border-[#9D00FF]/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                            isSelected ? 'bg-[#D147FF] text-[#020005]' : 'bg-[#9D00FF]/20 text-[#A89BB9]'
                          }`}
                        >
                          0{node.id}
                        </div>
                        <div>
                          <div className="font-editorial text-sm font-bold text-[#F8ECFF]">
                            {node.role}
                          </div>
                          <div className="font-mono text-[11px] text-[#A89BB9]">
                            {node.title} · {node.trait}
                          </div>
                        </div>
                      </div>

                      {node.active && (
                        <span className="font-mono text-[10px] text-[#D147FF] bg-[#9D00FF]/20 px-2 py-0.5 rounded border border-[#9D00FF]/40">
                          FOUNDER
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Resolute Pull-Quote */}
            <div className="mt-6 pt-6 border-t border-[#9D00FF]/20">
              <blockquote className="font-monumental text-xl sm:text-2xl font-bold text-[#F8ECFF] uppercase tracking-tight text-center">
                "{STORY_DATA.turningPoint.quote}"
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
