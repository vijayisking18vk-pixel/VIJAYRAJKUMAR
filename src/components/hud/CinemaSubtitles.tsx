import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinemaSubtitlesProps {
  currentChamber: number;
  onOpenSignalModal?: () => void;
  onOpenDossier?: () => void;
}

// Exactly matching the Blueprint subtitles (max 15-16 words, pure cinema)
const SUBTITLES: Record<number, { label: string; text: string }> = {
  0: {
    label: '00 // THE AWAKENING',
    text: 'Scroll or click to breach the void and enter the timeline.',
  },
  1: {
    label: '01 // ORIGIN',
    text: 'Born April 5, 2005 in Kovilpatti. Operating from Madambakkam, Chennai.',
  },
  2: {
    label: '02 // THE SPARK',
    text: 'A little naughty. A little lazy. Still gliding effortlessly above 85%.',
  },
  3: {
    label: '03 // THE 2020 FRACTURE',
    text: '10th lockdown hit. I stopped listening, failed hard, and drowned in Biology.',
  },
  4: {
    label: '04 // AIR FORCE & ABYSS',
    text: 'Hostel laziness killed the fire. 70% attendance. Debarred. Three years dragged into five.',
  },
  5: {
    label: '05 // THE REMAINING FIVE',
    text: 'A startup call. Every friend was technical except me. Everyone else left—five of us stayed.',
  },
  6: {
    label: '06 // THE CITADEL',
    text: '21 years old. CEO of three companies and building in distribution.',
  },
  7: {
    label: '07 // THE SIGNAL',
    text: 'Debarred by the system. Building an empire anyway.',
  },
};

export const CinemaSubtitles: React.FC<CinemaSubtitlesProps> = ({
  currentChamber,
  onOpenSignalModal,
  onOpenDossier,
}) => {
  const current = SUBTITLES[currentChamber] || SUBTITLES[0];

  return (
    <div className="fixed bottom-8 sm:bottom-12 left-0 right-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4 select-none">
      {/* Finale Action Strip for Chamber 7 (The Signal) - Clean, focused actions */}
      {currentChamber === 7 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mb-4 flex flex-wrap justify-center items-center gap-3 sm:gap-4 font-mono text-xs tracking-wider pointer-events-auto"
        >
          <button
            onClick={onOpenSignalModal}
            className="text-[#020005] bg-[#D147FF] hover:bg-[#F8ECFF] font-bold px-4 py-2 rounded transition-colors shadow-[0_0_15px_rgba(209,71,255,0.4)]"
          >
            [ SEND SIGNAL ]
          </button>
          <button
            onClick={onOpenDossier}
            className="text-[#F8ECFF] border border-[#9D00FF]/50 hover:border-[#D147FF] hover:bg-[#9D00FF]/20 px-4 py-2 rounded transition-colors"
          >
            [ FULL DOSSIER ]
          </button>
        </motion.div>
      )}

      {/* Single Cinema Subtitle Beat (Pure text floating, zero box) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentChamber}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-center max-w-2xl px-4"
        >
          {/* Micro Chapter Label */}
          <span className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#9D00FF] mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {current.label}
          </span>

          {/* Razor-Sharp Subtitle Line (Max 15 words) */}
          <p className="font-editorial text-base sm:text-xl md:text-2xl font-light text-[#F8ECFF] tracking-wide leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            "{current.text}"
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
