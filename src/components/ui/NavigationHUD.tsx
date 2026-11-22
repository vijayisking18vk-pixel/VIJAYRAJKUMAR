import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, ExternalLink } from 'lucide-react';
import { AmbientAudio } from './AmbientAudio';
import { STORY_DATA } from '../../data/storyData';

interface NavigationHUDProps {
  currentAct: number;
  onNavigateToAct: (actIndex: number) => void;
  scrollProgress: number;
}

export const NavigationHUD: React.FC<NavigationHUDProps> = ({
  currentAct,
  onNavigateToAct,
  scrollProgress,
}) => {
  const [istTime, setIstTime] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Live Chennai IST Clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setIstTime(formatter.format(new Date()));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* 1. Top Tactical Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#020005]/75 backdrop-blur-md border-b border-[#9D00FF]/15 px-4 sm:px-8 py-3 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-xs text-[#A89BB9]">
          {/* Left: Founder Stamp & Birthday */}
          <div className="flex items-center space-x-3">
            <span className="font-bold tracking-widest text-[#F8ECFF]">
              RV // 05.04.2005
            </span>
            <span className="hidden sm:inline-block text-[#9D00FF]/60">·</span>
            <span className="hidden sm:inline-block text-[#A89BB9]/80 text-[11px] tracking-wide">
              21 YRS
            </span>
          </div>

          {/* Center: Live Chennai IST Clock + Coordinates */}
          <div className="hidden md:flex items-center space-x-3 bg-[#0B011A]/80 border border-[#9D00FF]/20 px-3.5 py-1 rounded-sm">
            <Compass className="w-3.5 h-3.5 text-[#D147FF] animate-pulse" />
            <span className="tracking-widest text-[#F8ECFF]">
              MAA // {istTime || '00:00:00'} IST
            </span>
            <span className="text-[#9D00FF]/40">|</span>
            <span className="text-[11px] text-[#A89BB9]/80">
              12.9056° N, 80.1582° E
            </span>
          </div>

          {/* Right: Ambient Audio & Chapter Drawer Trigger */}
          <div className="flex items-center space-x-3">
            <AmbientAudio />

            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle chapter navigation drawer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm border border-[#9D00FF]/30 hover:border-[#D147FF] bg-[#0B011A]/60 text-[#F8ECFF] text-xs font-mono tracking-wider transition-all duration-200"
            >
              {drawerOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">ACTS</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Vertical Scroll Progress Spine (Right Edge) */}
      <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center space-y-4">
        {/* Spine Track Line */}
        <div className="relative w-[1.5px] h-48 bg-[#9D00FF]/20">
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#9D00FF] via-[#D147FF] to-[#F8ECFF] shadow-[0_0_8px_#D147FF] transition-all duration-150"
            style={{ height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />
        </div>

        {/* 7 Interactive Act Indicators */}
        <div className="flex flex-col items-center space-y-2.5">
          {STORY_DATA.chapters.map((ch, idx) => {
            const isActive = currentAct === idx;
            return (
              <button
                key={ch.id}
                onClick={() => onNavigateToAct(idx)}
                title={`${ch.label} — ${ch.title}`}
                aria-label={`Jump to ${ch.title}`}
                className="group relative flex items-center justify-end"
              >
                {/* Floating Act Tooltip */}
                <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap font-mono text-[10px] tracking-wider text-[#F8ECFF] bg-[#0B011A] border border-[#9D00FF]/40 px-2 py-0.5 rounded-sm shadow-plasma-sm">
                  {ch.label}
                </span>

                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#F8ECFF] shadow-[0_0_12px_#D147FF] scale-150'
                      : 'bg-[#9D00FF]/30 hover:bg-[#D147FF]/80'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Tactical Chapter Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#020005]/95 backdrop-blur-xl flex flex-col justify-center px-8 sm:px-16 animate-fadeIn">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex justify-between items-center border-b border-[#9D00FF]/25 pb-4 mb-8">
              <span className="font-mono text-xs tracking-widest text-[#9D00FF]">
                TACTICAL INDEX // CHRONICLE
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="font-mono text-xs tracking-wider text-[#A89BB9] hover:text-[#F8ECFF] flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>CLOSE</span>
              </button>
            </div>

            <div className="space-y-4">
              {STORY_DATA.chapters.map((ch, idx) => {
                const isActive = currentAct === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      onNavigateToAct(idx);
                      setDrawerOpen(false);
                    }}
                    className={`w-full text-left group flex items-baseline justify-between p-3 rounded-sm border transition-all duration-200 ${
                      isActive
                        ? 'bg-[#0B011A] border-[#D147FF] shadow-plasma-sm text-[#F8ECFF]'
                        : 'border-transparent hover:border-[#9D00FF]/40 text-[#A89BB9] hover:text-[#F8ECFF]'
                    }`}
                  >
                    <div className="flex items-baseline space-x-4">
                      <span className="font-mono text-xs text-[#9D00FF]">
                        {ch.label}
                      </span>
                      <span className="font-display text-lg sm:text-2xl font-bold tracking-wide">
                        {ch.title}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#A89BB9]/50 group-hover:text-[#D147FF] transition-colors">
                      ACT 0{idx + 1} ↗
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Domain Teleport */}
            <div className="mt-12 pt-6 border-t border-[#9D00FF]/20 flex flex-wrap gap-4 text-xs font-mono text-[#A89BB9]">
              <span className="text-[#9D00FF]">ACTIVE ENTERPRISES:</span>
              <a
                href="https://daas.media"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F8ECFF] flex items-center space-x-1"
              >
                <span>DAAS MEDIA</span>
                <ExternalLink className="w-3 h-3 text-[#D147FF]" />
              </a>
              <span>·</span>
              <a
                href="https://www.chennairents.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F8ECFF] flex items-center space-x-1"
              >
                <span>CHENNAI RENTS</span>
                <ExternalLink className="w-3 h-3 text-[#D147FF]" />
              </a>
              <span>·</span>
              <a
                href="https://www.schloss.living"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F8ECFF] flex items-center space-x-1"
              >
                <span>SCHLOSS LIVING</span>
                <ExternalLink className="w-3 h-3 text-[#D147FF]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
