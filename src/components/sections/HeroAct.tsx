import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ShieldCheck, MapPin, Sparkles, Terminal } from 'lucide-react';
import { STORY_DATA } from '../../data/storyData';

interface HeroActProps {
  onScrollDown?: () => void;
}

export const HeroAct: React.FC<HeroActProps> = ({ onScrollDown }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-8 pt-28 pb-12 z-10 select-none overflow-hidden"
    >
      {/* Top Tactical Label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center space-x-2 text-xs font-mono text-[#A89BB9] uppercase tracking-[0.25em] bg-[#0B011A]/60 px-4 py-1.5 rounded-full border border-[#9D00FF]/30 backdrop-blur-md"
      >
        <span className="w-2 h-2 rounded-full bg-[#9D00FF] animate-pulse-glow" />
        <span>CHAPTER 00 // AUTOBIOGRAPHICAL TELEMETRY</span>
      </motion.div>

      {/* Main Hero Monumental Title & Narrative Center */}
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-5xl my-auto py-8">
        {/* Name Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Subtle background glow */}
          <div className="absolute -inset-x-8 -inset-y-4 bg-[radial-gradient(ellipse_at_center,_rgba(157,0,255,0.25),_transparent_70%)] blur-2xl pointer-events-none" />

          <h1 className="relative font-monumental text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#F8ECFF] uppercase drop-shadow-[0_0_35px_rgba(157,0,255,0.4)]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F8ECFF] to-[#A89BB9]">
              R. VIJAYRAJKUMAR
            </span>
          </h1>
        </motion.div>

        {/* Dynamic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 sm:mt-8 font-editorial text-lg sm:text-2xl md:text-3xl text-[#F8ECFF] max-w-2xl font-light tracking-wide leading-relaxed"
        >
          21. Debarred by the system.{' '}
          <span className="text-[#D147FF] font-medium underline decoration-[#9D00FF]/50 underline-offset-8">
            Building an empire anyway.
          </span>
        </motion.p>

        {/* Roles & Active Ventures Command Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-4 max-w-3xl"
        >
          {STORY_DATA.roles.map((role, idx) => (
            <div
              key={idx}
              className="group flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#0B011A]/70 border border-[#9D00FF]/30 backdrop-blur-sm hover:border-[#D147FF] hover:bg-[#4B009E]/30 transition-all duration-300"
              data-cursor={role.company}
            >
              <span className="text-[10px] font-mono font-bold text-[#D147FF] group-hover:text-[#F8ECFF]">
                0{idx + 1}
              </span>
              <span className="text-xs font-mono tracking-wider text-[#A89BB9] group-hover:text-[#F8ECFF]">
                {role.title} · {role.company}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Location & Tactical Coordinates Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex items-center space-x-4 font-mono text-[11px] text-[#A89BB9]/80"
        >
          <span className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#9D00FF]" />
            <span>MADAMBAKKAM, CHENNAI</span>
          </span>
          <span>·</span>
          <span>12.9056° N, 80.1582° E</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline text-[#D147FF]">AGE 21</span>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex flex-col items-center justify-center cursor-pointer group mt-4"
        onClick={onScrollDown}
        data-cursor="EXPLORE"
      >
        <span className="font-mono text-[10px] sm:text-xs text-[#A89BB9] uppercase tracking-[0.2em] group-hover:text-[#F8ECFF] transition-colors flex items-center space-x-1.5">
          <span>SCROLL TO INITIALIZE</span>
          <span className="text-[#9D00FF] font-bold">//</span>
          <span className="text-[#D147FF]">TIMELINE UNLOCKED</span>
        </span>
        <div className="w-5 h-8 mt-3 rounded-full border border-[#9D00FF]/40 flex items-start justify-center p-1 group-hover:border-[#D147FF] transition-colors">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[#D147FF] shadow-[0_0_8px_#D147FF]"
          />
        </div>
      </motion.div>
    </section>
  );
};
