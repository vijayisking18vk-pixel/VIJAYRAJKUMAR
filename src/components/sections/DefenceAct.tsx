import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertOctagon, Clock, Plane, Compass, ArrowRight } from 'lucide-react';
import { STORY_DATA } from '../../data/storyData';

export const DefenceAct: React.FC = () => {
  return (
    <section
      id="defence"
      className="relative min-h-screen w-full flex flex-col justify-center px-4 sm:px-8 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Chapter Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#9D00FF]/20 pb-6 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#9D00FF] mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#9D00FF] inline-block" />
              <span>CHAPTER 03 // 2022 – PRESENT</span>
            </div>
            <h2 className="font-monumental text-3xl sm:text-5xl md:text-6xl font-bold text-[#F8ECFF] uppercase tracking-tight">
              AIR FORCE ECHOES & THE 70% CRASH
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 font-mono text-xs text-[#A89BB9] text-left sm:text-right">
            <div>SRMIST KATTANKULATHUR</div>
            <div className="text-[#FF1E56] font-bold">STATUS: DEBARRED (70% ATTENDANCE)</div>
          </div>
        </div>

        {/* Top Story Hero Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
          {/* Left: IAF Inspiration & The Hostel Trap */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0B011A]/80 border border-[#9D00FF]/30 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#D147FF] mb-4">
                <Plane className="w-4 h-4 text-[#D147FF]" />
                <span className="uppercase tracking-widest">PATERNAL HERITAGE // INDIAN AIR FORCE</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F8ECFF] leading-snug mb-4">
                "Driven by stories of fighter jets, tactical precision, and stoic honor told by his father."
              </h3>

              <p className="font-editorial text-sm sm:text-base text-[#A89BB9] leading-relaxed mb-4">
                Enrolled in <span className="text-[#F8ECFF] font-semibold">B.Sc. Defence and Strategic Studies</span> at SRMIST Kattankulathur (KTR). Believing distance from home would forge unshakeable discipline, Vijayrajkumar moved into the university hostel.
              </p>

              <p className="font-editorial text-sm sm:text-base text-[#A89BB9] leading-relaxed">
                The reality was inverted: the complete absence of curfew, structure, or supervision became an amplifier for peak procrastination. Days blurred into nights; lectures were skipped; inertia took over.
              </p>
            </div>

            {/* Pull Quote Box */}
            <div className="mt-6 pt-6 border-t border-[#9D00FF]/20">
              <blockquote className="font-editorial text-lg italic text-[#F8ECFF]/90 border-l-2 border-[#D147FF] pl-4">
                "{STORY_DATA.defence.quote}"
              </blockquote>
            </div>
          </motion.div>

          {/* Right: Interactive Brutalist Attendance Meter */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#1A000F]/90 border-2 border-[#FF1E56]/40 backdrop-blur-md flex flex-col justify-between relative overflow-hidden shadow-[0_0_40px_rgba(255,30,86,0.15)]"
          >
            {/* Warning Watermark */}
            <div className="absolute top-0 right-0 p-4 font-mono text-5xl font-black text-[#FF1E56]/10 select-none pointer-events-none">
              70%
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#FF1E56] font-bold">
                  <ShieldAlert className="w-4 h-4 text-[#FF1E56]" />
                  <span>DEBARMENT THRESHOLD BREACHED</span>
                </div>
                <span className="font-mono text-[10px] text-[#FF1E56] px-2 py-0.5 rounded bg-[#FF1E56]/20 border border-[#FF1E56]/40 animate-pulse">
                  CRITICAL
                </span>
              </div>

              {/* Attendance Progress Bars Comparison */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between font-mono text-xs mb-1.5">
                    <span className="text-[#A89BB9]">ACTUAL RECORDED ATTENDANCE</span>
                    <span className="text-[#FF1E56] font-bold text-base">70%</span>
                  </div>
                  <div className="w-full h-3 bg-[#020005] rounded-full overflow-hidden p-0.5 border border-[#FF1E56]/40">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '70%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#FF1E56] to-[#D147FF] rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-xs mb-1.5">
                    <span className="text-[#A89BB9]">MANDATORY EXAM QUALIFICATION</span>
                    <span className="text-[#F8ECFF] font-bold text-base">75%</span>
                  </div>
                  <div className="w-full h-3 bg-[#020005] rounded-full overflow-hidden p-0.5 border border-[#9D00FF]/30">
                    <div className="w-[75%] h-full bg-[#9D00FF]/60 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Debarred Stamped Box */}
              <div className="mt-8 p-4 rounded-xl bg-[#020005]/80 border border-[#FF1E56]/50 text-center">
                <span className="font-monumental text-xl sm:text-2xl font-black text-[#FF1E56] tracking-widest block">
                  STATUS: DEBARRED
                </span>
                <span className="font-mono text-xs text-[#A89BB9] block mt-1">
                  Barred from terminal examinations · Academic trajectory broken
                </span>
              </div>
            </div>

            {/* 3 Years stretched to 5 Years Metric */}
            <div className="mt-6 pt-4 border-t border-[#FF1E56]/20 flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-[#A89BB9]/70 block text-[10px]">SCHEDULED DURATION</span>
                <span className="text-[#F8ECFF] line-through">3 YEARS</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#FF1E56]" />
              <div className="text-right">
                <span className="text-[#FF1E56] block text-[10px] font-bold">EXTENDED LABYRINTH</span>
                <span className="text-[#FF1E56] font-bold text-sm">5 YEARS (PAST YR 4)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
