import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [glitchState, setGlitchState] = useState<'normal' | 'debarred' | 'override' | 'unlocked'>('normal');
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current <= 70) {
        setProgress(current);
      } else if (current > 70 && current < 95) {
        // Freeze at 70% for the dramatic debarred glitch moment
        clearInterval(interval);
        setGlitchState('debarred');

        setTimeout(() => {
          setGlitchState('override');

          // Rapid surge to 100%
          setTimeout(() => {
            setProgress(100);
            setGlitchState('unlocked');
            setTimeout(() => {
              setIsDismissed(true);
              setTimeout(onComplete, 400);
            }, 600);
          }, 650);
        }, 900);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsDismissed(true);
    onComplete();
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020005] select-none cursor-wait overflow-hidden"
        >
          {/* Subtle Ambient Background Flare */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(157,0,255,0.12)_0%,_transparent_70%)] pointer-events-none" />

          {/* Skip Intro Button */}
          <button
            onClick={handleSkip}
            className="absolute top-8 right-8 text-xs font-mono tracking-widest text-[#A89BB9]/60 hover:text-[#F8ECFF] border border-[#9D00FF]/30 hover:border-[#D147FF] px-4 py-2 rounded-sm transition-all duration-200 bg-[#0B011A]/60 backdrop-blur-sm"
          >
            [SKIP INTRO]
          </button>

          {/* Central Awakening: Glowing Fractal Violet Eyes */}
          <div className="relative mb-12 flex items-center justify-center">
            <svg
              viewBox="0 0 280 100"
              className="w-64 sm:w-80 h-28 overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur1" />
                  <feGaussianBlur stdDeviation="14" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#F8ECFF" />
                  <stop offset="65%" stopColor="#D147FF" />
                  <stop offset="100%" stopColor="#9D00FF" />
                </radialGradient>
              </defs>

              {/* Left Eye Slit */}
              <g filter="url(#eyeGlow)">
                <path
                  d="M 40 50 Q 80 20 120 50 Q 80 80 40 50 Z"
                  fill="none"
                  stroke="#9D00FF"
                  strokeWidth="2.5"
                  className="transition-all duration-700"
                />
                <ellipse
                  cx="80"
                  cy="50"
                  rx={glitchState === 'debarred' ? '14' : '10'}
                  ry={glitchState === 'debarred' ? '18' : '14'}
                  fill="url(#irisGrad)"
                  className="animate-pulse"
                />
                <circle cx="80" cy="50" r="3" fill="#FFFFFF" />
              </g>

              {/* Right Eye Slit */}
              <g filter="url(#eyeGlow)">
                <path
                  d="M 160 50 Q 200 20 240 50 Q 200 80 160 50 Z"
                  fill="none"
                  stroke="#9D00FF"
                  strokeWidth="2.5"
                  className="transition-all duration-700"
                />
                <ellipse
                  cx="200"
                  cy="50"
                  rx={glitchState === 'debarred' ? '14' : '10'}
                  ry={glitchState === 'debarred' ? '18' : '14'}
                  fill="url(#irisGrad)"
                  className="animate-pulse"
                />
                <circle cx="200" cy="50" r="3" fill="#FFFFFF" />
              </g>
            </svg>
          </div>

          {/* Telemetry Display */}
          <div className="w-80 sm:w-96 flex flex-col items-center text-center space-y-4">
            <div className="font-mono text-xs tracking-wider text-[#A89BB9]">
              INITIALIZING DOSSIER // R. VIJAYRAJKUMAR
            </div>

            {/* Tactical Status & Glitch Moment */}
            <div className="h-10 flex items-center justify-center">
              {glitchState === 'normal' && (
                <div className="font-mono text-xs text-[#9D00FF] tracking-widest animate-pulse">
                  SYSTEM CHECK // ATTENDANCE TELEMETRY
                </div>
              )}
              {glitchState === 'debarred' && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 0.2 }}
                  className="font-mono text-xs sm:text-sm font-bold text-[#FF1E56] bg-[#FF1E56]/10 px-3 py-1 border border-[#FF1E56] shadow-[0_0_20px_rgba(255,30,86,0.6)]"
                >
                  ATTENDANCE: 70% [REQUIRED: 75%] — STATUS: DEBARRED
                </motion.div>
              )}
              {glitchState === 'override' && (
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="font-mono text-xs sm:text-sm font-bold text-[#F8ECFF] bg-[#9D00FF]/30 px-3 py-1 border border-[#D147FF] shadow-plasma-md"
                >
                  OVERRIDE: FOUNDER PROTOCOL // ENGAGED
                </motion.div>
              )}
              {glitchState === 'unlocked' && (
                <div className="font-mono text-xs font-bold text-[#D147FF] tracking-widest">
                  ACCESS GRANTED // COMMAND DECK ACTIVE
                </div>
              )}
            </div>

            {/* Progress Bar & Percentage */}
            <div className="w-full space-y-2">
              <div className="flex justify-between font-mono text-xs text-[#A89BB9]/70">
                <span>BOOT_SEQUENCE</span>
                <span className={glitchState === 'debarred' ? 'text-[#FF1E56] font-bold' : 'text-[#F8ECFF]'}>
                  {progress}%
                </span>
              </div>
              <div className="w-full h-1 bg-[#0B011A] border border-[#9D00FF]/20 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full transition-all duration-100 ${
                    glitchState === 'debarred'
                      ? 'bg-[#FF1E56] shadow-[0_0_10px_#FF1E56]'
                      : 'bg-gradient-to-r from-[#9D00FF] via-[#D147FF] to-[#F8ECFF] shadow-[0_0_12px_#D147FF]'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
