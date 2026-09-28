import React, { useEffect } from 'react';
import { Compass, Eye, X, ArrowUpRight, Sparkles } from 'lucide-react';
import soundSystem from '../lib/soundSystem';

export default function PlayableDistrictHUD({
  isExploreMode,
  proximityLandmark,
  onExitExploreMode,
  onOpenDossier,
  onNavigateToRoute,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isExploreMode) return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onExitExploreMode();
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        if (proximityLandmark) {
          e.preventDefault();
          onOpenDossier(proximityLandmark);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExploreMode, proximityLandmark, onExitExploreMode, onOpenDossier]);

  if (!isExploreMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 select-none flex flex-col justify-between p-4 sm:p-6">
      {/* Top Exploration Control Bar */}
      <header className="pointer-events-auto flex items-center justify-between w-full max-w-5xl mx-auto bg-[var(--gta-text-outline)]/95 backdrop-blur-md border-2 border-[var(--gta-silhouette)] rounded-full px-4 sm:px-6 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E7B85A] animate-ping" />
          <span className="font-bank text-xs sm:text-sm font-bold tracking-widest text-[var(--gta-text-fill)] uppercase">
            DISTRICT EXPLORATION // CHENNAI 13.08° N
          </span>
        </div>

        {/* Desktop Controls Telemetry Hint */}
        <div className="hidden md:flex items-center gap-4 text-[11px] font-bank text-[var(--gta-sky-mid)] tracking-wider">
          <span className="px-2 py-0.5 rounded bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/40 text-[var(--gta-text-fill)]">
            W A S D / ARROWS
          </span>
          <span>TO WALK</span>
          <span className="px-2 py-0.5 rounded bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/40 text-[var(--gta-text-fill)]">
            DRAG
          </span>
          <span>TO LOOK</span>
        </div>

        {/* Exit Button */}
        <button
          type="button"
          onClick={() => {
            soundSystem.playSelect();
            onExitExploreMode();
          }}
          onMouseEnter={() => soundSystem.playHover()}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--gta-text-shadow)] hover:bg-[#202020] border border-[var(--gta-silhouette)] text-[var(--gta-text-fill)] hover:text-[#E7B85A] font-bank text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
          title="Return to Guided Journey (ESC)"
        >
          <span>EXIT (ESC)</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Center Reticle / Compass crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <div className="w-4 h-4 border border-[var(--gta-silhouette)] rounded-full flex items-center justify-center">
          <div className="w-1 h-1 bg-[#E7B85A] rounded-full" />
        </div>
      </div>

      {/* Bottom Proximity Landmark Discovery Banner */}
      <footer className="w-full max-w-xl mx-auto pb-4">
        {proximityLandmark ? (
          <div className="pointer-events-auto bg-[var(--gta-text-outline)]/95 backdrop-blur-md border-2 border-[#E7B85A] rounded-2xl p-4 sm:p-5 shadow-[0_16px_50px_rgba(231,184,90,0.25)] animate-bounce-short">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs"
                  style={{ backgroundColor: proximityLandmark.color, color: '#0A0E0C' }}
                >
                  {proximityLandmark.icon}
                </span>
                <span className="font-bank text-xs font-black tracking-widest text-[#E7B85A] uppercase">
                  {proximityLandmark.chapter}
                </span>
              </div>
              <span className="text-[10px] font-bank tracking-widest text-[var(--gta-sky-mid)] uppercase">
                LOCATION DISCOVERED
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-futura font-bold text-[var(--gta-text-fill)]">
              {proximityLandmark.title}
            </h3>
            <p className="mt-1 text-xs text-[var(--gta-silhouette)] leading-relaxed line-clamp-2">
              {proximityLandmark.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-4 pt-3 border-t border-[var(--gta-silhouette)]/30 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  soundSystem.playSelect();
                  onOpenDossier(proximityLandmark);
                }}
                onMouseEnter={() => soundSystem.playHover()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#E7B85A] hover:bg-[#F2C975] text-[#0A0E0C] font-bank text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>OPEN DOSSIER [SPACE]</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundSystem.playSelect();
                  onNavigateToRoute(proximityLandmark.path);
                }}
                onMouseEnter={() => soundSystem.playHover()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--gta-text-shadow)] hover:bg-[#252525] border border-[var(--gta-silhouette)] text-[var(--gta-text-fill)] font-bank text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                title="Open full page route"
              >
                <span>PAGE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="pointer-events-none text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--gta-text-outline)]/80 backdrop-blur-sm border border-[var(--gta-silhouette)]/40 font-bank text-[10px] text-[var(--gta-silhouette)] tracking-widest uppercase">
              WALK NEAR ANY LANDMARK TO DISCOVER DOSSIER
            </span>
          </div>
        )}
      </footer>
    </div>
  );
}
