import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, WifiOff, FileX, Flame, Zap } from 'lucide-react';
import { STORY_DATA } from '../../data/storyData';

export const BlackoutAct: React.FC = () => {
  return (
    <section
      id="blackout"
      className="relative min-h-screen w-full flex flex-col justify-center px-4 sm:px-8 py-24 z-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Chapter Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#FF1E56]/30 pb-6 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF1E56] mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#FF1E56] animate-pulse-glow inline-block" />
              <span>CHAPTER 02 // 2020 – 2022</span>
            </div>
            <h2 className="font-monumental text-3xl sm:text-5xl md:text-6xl font-bold text-[#F8ECFF] uppercase tracking-tight">
              THE 2020 BLACKOUT
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 font-mono text-xs text-[#FF1E56] text-left sm:text-right">
            <div>EVENT: COVID-19 LOCKDOWN</div>
            <div className="text-[#A89BB9]">CRITICAL FAILURE SEQUENCE</div>
          </div>
        </div>

        {/* Big Brutalist Pull-Quote Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#1A000F]/90 via-[#0B011A]/90 to-[#020005]/95 border-2 border-[#FF1E56]/40 backdrop-blur-md mb-12 shadow-[0_0_50px_rgba(255,30,86,0.15)]"
        >
          {/* CRT scanline simulation */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,30,86,0.03)_50%,_transparent_50%)] bg-[length:100%_4px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="font-mono text-xs text-[#FF1E56] uppercase tracking-[0.3em] mb-4 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#FF1E56]" />
              <span>CORE LESSON CARVED IN ASH</span>
            </span>

            <blockquote className="font-monumental text-2xl sm:text-4xl md:text-5xl font-bold text-[#F8ECFF] uppercase leading-tight tracking-tight">
              "{STORY_DATA.blackout.quote}"
            </blockquote>

            <p className="mt-6 font-editorial text-base sm:text-lg text-[#A89BB9] max-w-2xl">
              The effortless 85%+ streak vanished overnight. When classes shifted behind glowing monitors, attention shattered, habits rotted, and the illusion of natural genius dissolved.
            </p>
          </div>
        </motion.div>

        {/* Narrative Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: The Screen Trap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 rounded-xl bg-[#0B011A]/80 border border-[#FF1E56]/20 backdrop-blur-sm relative overflow-hidden group hover:border-[#FF1E56]/60 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-[#FF1E56] font-bold">01 // SCREEN DISCONNECT</span>
              <WifiOff className="w-4 h-4 text-[#FF1E56]" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#F8ECFF] mb-2">
              The Digital Mirage
            </h3>
            <p className="font-editorial text-sm text-[#A89BB9] leading-relaxed">
              10th standard lockdown hit. Zoom replaced classrooms. The discipline that came from physical routine dissolved into tab-switching, video games, and complete disengagement.
            </p>
          </motion.div>

          {/* Card 2: The Crash & Family Reality */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-xl bg-[#0B011A]/80 border border-[#FF1E56]/20 backdrop-blur-sm relative overflow-hidden group hover:border-[#FF1E56]/60 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-[#FF1E56] font-bold">02 // ACADEMIC COLLAPSE</span>
              <FileX className="w-4 h-4 text-[#FF1E56]" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#F8ECFF] mb-2">
              Failed Exams & Harsh Reality
            </h3>
            <p className="font-editorial text-sm text-[#A89BB9] leading-relaxed">
              Terminal exams brought the inevitable verdict: failure. Severe family confrontations, disappointed glances, and the painful realization that intelligence without execution is useless.
            </p>
          </motion.div>

          {/* Card 3: The Biology Trap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 rounded-xl bg-[#0B011A]/80 border border-[#FF1E56]/20 backdrop-blur-sm relative overflow-hidden group hover:border-[#FF1E56]/60 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-[#FF1E56] font-bold">03 // THE HIGH-PRESSURE TRAP</span>
              <Flame className="w-4 h-4 text-[#FF1E56]" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#F8ECFF] mb-2">
              The Biology Stream Crucible
            </h3>
            <p className="font-editorial text-sm text-[#A89BB9] leading-relaxed">
              Pushed into 11th & 12th standard Biology stream bearing the stigma of a falling student. Relentless rote-learning, sleepless pressure, and an acute hunger for something entirely different.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
