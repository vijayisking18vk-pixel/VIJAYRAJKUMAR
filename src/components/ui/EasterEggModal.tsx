import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Terminal, Flame } from 'lucide-react';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  // ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#020005]/90 backdrop-blur-xl select-none"
        >
          {/* Grain & CRT Scanline Simulation */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(157,0,255,0.06)_50%,_transparent_50%)] bg-[length:100%_4px] pointer-events-none" />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-lg w-full bg-[#0B011A] border-2 border-[#D147FF] rounded-2xl p-6 sm:p-8 shadow-[0_0_80px_rgba(209,71,255,0.4)] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-[#020005]/80 text-[#A89BB9] hover:text-[#F8ECFF] hover:bg-[#9D00FF]/30 transition-colors z-20"
              data-cursor="CLOSE"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Cat Image Card */}
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 border border-[#9D00FF]/50 bg-[#020005]">
              <img
                src="/images/moodboard/lofi-black-cat.jpg"
                alt="Nocturnal Mischief Cat"
                className="w-full h-full object-cover filter contrast-125 saturate-150"
              />

              {/* Pulsing Glowing Violet Eyes Accent */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B011A] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-[#F8ECFF]">
                <span className="flex items-center space-x-1.5 text-[#D147FF]">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>MISCHIEF PROTOCOL // ACTIVE</span>
                </span>
                <span className="text-[#A89BB9]">CODE: CAT_2005</span>
              </div>
            </div>

            {/* Terminal Toast Box */}
            <div className="p-3.5 rounded-lg bg-[#020005] border border-[#9D00FF]/40 mb-4 font-mono text-xs text-[#D147FF] flex items-center space-x-2">
              <Terminal className="w-4 h-4 flex-shrink-0" />
              <span className="font-bold tracking-wide">
                MISCHIEF PROTOCOL ACTIVATED // STILL A LITTLE NAUGHTY
              </span>
            </div>

            {/* Story Text */}
            <h3 className="font-monumental text-xl font-bold text-[#F8ECFF] mb-2 uppercase">
              The Nocturnal Builder
            </h3>

            <p className="font-editorial text-sm text-[#A89BB9] leading-relaxed mb-6">
              Long before board meetings, commercial contracts, and scaling four ventures, Vijayrajkumar was the untamed, curious kid scoring 85%+ while skipping homework. The playful fire never went away — it just graduated into building companies without seeking anyone's permission.
            </p>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#9D00FF] to-[#D147FF] text-[#020005] font-mono text-xs font-bold tracking-wider hover:brightness-110 transition-all shadow-[0_0_20px_rgba(157,0,255,0.3)]"
            >
              RESUME COMMAND CONSOLE
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
