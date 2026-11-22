import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldCheck, MapPin, Calendar, Award, AlertTriangle, Users, BookOpen } from 'lucide-react';
import { STORY_DATA } from '../../data/storyData';

interface DossierDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DossierDrawer: React.FC<DossierDrawerProps> = ({ isOpen, onClose }) => {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020005]/80 backdrop-blur-md"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-xl bg-[#0B011A] border-l border-[#9D00FF]/30 p-6 sm:p-10 overflow-y-auto z-10 shadow-[-20px_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#9D00FF]/20 mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D147FF] block mb-1">
                  OFFICIAL ARCHIVE // DOSSIER
                </span>
                <h2 className="font-monumental text-2xl sm:text-3xl font-bold text-[#F8ECFF]">
                  R. VIJAYRAJKUMAR
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-[#020005] border border-[#9D00FF]/30 text-[#A89BB9] hover:text-[#F8ECFF] transition-colors"
                aria-label="Close Dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8 font-editorial text-sm text-[#A89BB9]">
              {/* 1. Verified Telemetry */}
              <div className="p-4 rounded-xl bg-[#020005]/80 border border-[#9D00FF]/20 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#A89BB9]/70">AGE & DOB</span>
                  <span className="text-[#F8ECFF]">21 YEARS OLD · 05.04.2005</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A89BB9]/70">BIRTHPLACE</span>
                  <span className="text-[#F8ECFF]">KOVILPATTI, TUTICORIN (THOOTHUKUDI)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A89BB9]/70">BASE OF OPERATIONS</span>
                  <span className="text-[#F8ECFF]">MADAMBAKKAM, CHENNAI 600126</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A89BB9]/70">COORDINATES</span>
                  <span className="text-[#D147FF]">12.9056° N, 80.1582° E</span>
                </div>
              </div>

              {/* 2. Creed */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#F8ECFF] mb-2">
                  THE FOUNDER CREED
                </h3>
                <blockquote className="border-l-2 border-[#D147FF] pl-4 italic text-[#F8ECFF] text-base leading-relaxed">
                  "{STORY_DATA.founder.creed}"
                </blockquote>
              </div>

              {/* 3. Schooling History */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#F8ECFF] mb-3 flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-[#9D00FF]" />
                  <span>ACADEMIC FOUNDATION</span>
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  {STORY_DATA.education.map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[#020005]/60 border border-[#9D00FF]/15">
                      <div className="flex justify-between text-[#D147FF] font-bold">
                        <span>{item.period}</span>
                        {item.metric && <span>{item.metric}</span>}
                      </div>
                      <div className="text-[#F8ECFF] text-sm font-sans mt-0.5">{item.school}</div>
                      <div className="text-[#A89BB9] text-[11px] mt-1">{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. 2020 Lockdown Fracture & Biology */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#FF1E56] mb-2 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-[#FF1E56]" />
                  <span>2020 BLACKOUT & BIOLOGY STREAM</span>
                </h3>
                <p className="leading-relaxed">
                  {STORY_DATA.blackout.story}
                </p>
              </div>

              {/* 5. SRMIST KTR Defence & Debarment */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#FF1E56] mb-2">
                  SRMIST KTR // DEFENCE & THE 70% DEBARMENT
                </h3>
                <p className="leading-relaxed mb-3">
                  Enrolled in B.Sc. Defence and Strategic Studies inspired by his father's Indian Air Force stories. Lack of supervision in the hostel caused severe procrastination.
                </p>
                <div className="p-3 rounded-lg bg-[#1A000F] border border-[#FF1E56]/40 font-mono text-xs flex justify-between items-center text-[#FF1E56]">
                  <span>ATTENDANCE: 70% [REQ: 75%]</span>
                  <span className="font-bold underline">STATUS: DEBARRED</span>
                </div>
                <p className="text-xs mt-2">
                  Course extended from 3 years to 5 years (still unfinished past year 4).
                </p>
              </div>

              {/* 6. The Turning Point & The Remaining Five */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#D147FF] mb-2 flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#D147FF]" />
                  <span>THE REMAINING FIVE</span>
                </h3>
                <p className="leading-relaxed">
                  Amid academic limbo, an unexpected startup rally called the gang together. Despite being the only non-technical founder among engineers, Vijayrajkumar owned operations and commercial execution. When peers left for safe corporate paths, exactly 5 founders stayed.
                </p>
              </div>

              {/* 7. Four Live Pillars at 21 */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#F8ECFF] mb-3">
                  THE FOUR ENTERPRISES
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  {STORY_DATA.ventures.map((v) => (
                    <div key={v.id} className="p-3.5 rounded-lg bg-[#020005]/70 border border-[#9D00FF]/30 flex items-center justify-between">
                      <div>
                        <div className="text-[#F8ECFF] font-bold text-sm font-sans">{v.name}</div>
                        <div className="text-[#D147FF] text-[11px]">{v.role} · {v.badge}</div>
                      </div>
                      {v.url ? (
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-[#F8ECFF] bg-[#9D00FF]/30 hover:bg-[#D147FF] hover:text-[#020005] px-2.5 py-1 rounded transition-colors"
                        >
                          <span>VISIT</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[#A89BB9] text-[10px]">OPERATIONAL</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
