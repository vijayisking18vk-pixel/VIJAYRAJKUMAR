import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';

interface MischiefGlitchProps {
  isActive: boolean;
  onDismiss: () => void;
}

export const MischiefGlitch: React.FC<MischiefGlitchProps> = ({ isActive, onDismiss }) => {
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(onDismiss, 2800);
      return () => clearTimeout(timer);
    }
  }, [isActive, onDismiss]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onDismiss}
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center p-4 bg-[#020005]/95 select-none cursor-pointer"
        >
          {/* CRT scanlines & analog glitch jitter */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(209,71,255,0.08)_50%,_transparent_50%)] bg-[length:100%_4px] pointer-events-none" />

          {/* Centered Cat Eyes in Void */}
          <div className="relative max-w-md w-full h-72 rounded-2xl overflow-hidden border-2 border-[#D147FF] shadow-[0_0_100px_rgba(209,71,255,0.6)]">
            <img
              src="/images/moodboard/lofi-black-cat.jpg"
              alt="Mischief Cat"
              className="w-full h-full object-cover filter contrast-150 saturate-150"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020005] via-transparent to-transparent opacity-80" />
          </div>

          {/* Micro-Telemetry Toast */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-6 flex items-center space-x-2 font-mono text-xs text-[#D147FF] bg-[#0B011A] px-4 py-2 rounded-full border border-[#D147FF] shadow-[0_0_20px_#D147FF]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span className="font-bold tracking-widest">
              MISCHIEF PROTOCOL ACTIVATED // STILL A LITTLE NAUGHTY
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
