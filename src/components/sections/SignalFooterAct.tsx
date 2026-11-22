import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowUpRight, Send, MapPin, Eye, X, Terminal, Sparkles } from 'lucide-react';
import { STORY_DATA } from '../../data/storyData';

interface SignalFooterActProps {
  onOpenEasterEgg: () => void;
}

export const SignalFooterAct: React.FC<SignalFooterActProps> = ({ onOpenEasterEgg }) => {
  const [copied, setCopied] = useState(false);
  const contactEmail = 'contact@daas.media';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="signal"
      className="relative min-h-screen w-full flex flex-col justify-between px-4 sm:px-8 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Chapter Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#9D00FF]/20 pb-6 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#9D00FF] mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#9D00FF] inline-block" />
              <span>CHAPTER 06 // THE SIGNAL</span>
            </div>
            <h2 className="font-monumental text-3xl sm:text-5xl md:text-6xl font-bold text-[#F8ECFF] uppercase tracking-tight">
              THE MANIFESTO & TRANSMISSION
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 font-mono text-xs text-[#A89BB9] text-left sm:text-right">
            <div>COMMAND DIRECTORY</div>
            <div className="text-[#D147FF]">OPEN FREQUENCY</div>
          </div>
        </div>

        {/* Founder Creed Monumental Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#0B011A]/90 via-[#020005]/95 to-[#020005] border border-[#9D00FF]/40 backdrop-blur-md mb-12 overflow-hidden group shadow-[0_0_60px_rgba(157,0,255,0.15)]"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle_at_center,_rgba(157,0,255,0.18)_0%,_transparent_70%)] blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="font-mono text-xs text-[#D147FF] uppercase tracking-[0.3em] mb-6 flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-[#D147FF]" />
              <span>THE PERSONAL CREED</span>
            </span>

            <blockquote className="font-monumental text-2xl sm:text-4xl md:text-5xl font-bold text-[#F8ECFF] uppercase leading-tight tracking-tight">
              "{STORY_DATA.founder.creed}"
            </blockquote>

            <div className="mt-8 flex items-center space-x-4 font-mono text-xs text-[#A89BB9]">
              <span className="text-[#F8ECFF] font-bold">— R. VIJAYRAJKUMAR</span>
              <span>·</span>
              <span>21 YEARS OLD</span>
              <span>·</span>
              <span className="text-[#D147FF]">FOUNDER & BUILDER</span>
            </div>
          </div>
        </motion.div>

        {/* Direct Transmission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Transmission Channel Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#0B011A]/70 border border-[#9D00FF]/30 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs text-[#D147FF] uppercase tracking-wider block mb-2">
                DIRECT TRANSMISSION
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#F8ECFF] mb-2">
                Initiate Contact
              </h3>
              <p className="font-editorial text-sm text-[#A89BB9] leading-relaxed mb-6">
                Whether exploring strategic venture partnerships, distribution channels, real-estate collaborations, or media infrastructure — send a direct dispatch.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${contactEmail}?subject=Dispatch%20for%20R.%20Vijayrajkumar`}
                className="flex-1 inline-flex items-center justify-center space-x-2 font-mono text-xs font-bold text-[#020005] bg-[#D147FF] hover:bg-[#F8ECFF] px-5 py-3 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(209,71,255,0.3)]"
                data-cursor="TRANSMIT"
              >
                <Mail className="w-4 h-4" />
                <span>OPEN EMAIL DISPATCH</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center space-x-2 font-mono text-xs text-[#F8ECFF] bg-[#020005] hover:bg-[#9D00FF]/30 px-5 py-3 rounded-xl border border-[#9D00FF]/40 transition-all duration-300"
                data-cursor="COPY"
              >
                <span>{copied ? 'FREQUENCY COPIED' : 'COPY ADDRESS'}</span>
              </button>
            </div>
          </motion.div>

          {/* Location & Network Coordinates Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#0B011A]/70 border border-[#9D00FF]/30 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs text-[#D147FF] uppercase tracking-wider block mb-2">
                BASE TELEMETRY
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#F8ECFF] mb-2">
                Operational Grid
              </h3>
              <div className="space-y-3 font-mono text-xs mt-4">
                <div className="flex items-center space-x-2 text-[#A89BB9]">
                  <MapPin className="w-4 h-4 text-[#9D00FF]" />
                  <span>MADAMBAKKAM, CHENNAI 600126</span>
                </div>
                <div className="text-[#A89BB9]/80 pl-6">
                  TAMIL NADU, INDIA · 12.9056° N, 80.1582° E
                </div>
                <div className="text-[#A89BB9]/80 pl-6">
                  TIMEZONE: ASIA/KOLKATA (IST / UTC+05:30)
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#9D00FF]/20 flex items-center justify-between font-mono text-xs">
              <span className="text-[#A89BB9]">LIVE ENTERPRISES</span>
              <div className="flex space-x-3 text-[#D147FF]">
                <a
                  href="https://daas.media/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center space-x-0.5"
                >
                  <span>DAAS</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <span>·</span>
                <a
                  href="https://www.chennairents.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center space-x-0.5"
                >
                  <span>CRENTS</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <span>·</span>
                <a
                  href="https://www.schloss.living/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center space-x-0.5"
                >
                  <span>SCHLOSS</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Extreme Bottom Bar with Secret Easter Egg Trigger */}
      <div className="max-w-6xl mx-auto w-full pt-8 border-t border-[#9D00FF]/20 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#A89BB9]/70 space-y-4 sm:space-y-0">
        <div>
          © 2026 R. VIJAYRAJKUMAR · ALL RIGHTS RESERVED · EDITORIAL BRUTALISM
        </div>

        {/* Secret Easter Egg Clickable Trigger Dot */}
        <div className="flex items-center space-x-3">
          <span>NOCTURNAL PROTOCOL</span>
          <button
            onClick={onOpenEasterEgg}
            title="Mischief Protocol"
            className="w-4 h-4 rounded-full bg-[#4B009E]/40 border border-[#9D00FF]/60 hover:bg-[#D147FF] hover:border-[#F8ECFF] transition-all flex items-center justify-center cursor-pointer group"
            data-cursor="SECRET"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D147FF] group-hover:bg-[#020005]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
