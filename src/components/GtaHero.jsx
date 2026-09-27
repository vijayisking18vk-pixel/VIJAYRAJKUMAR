import React from 'react';
import StreetscapeScene3D from './StreetscapeScene3D';
import soundSystem from '../lib/soundSystem';

export default function GtaHero() {
  const handleScrollDown = () => {
    soundSystem.playSelect();
    const nextSection =
      document.getElementById('scroll-video-section') ||
      document.getElementById('cinematic-story') ||
      document.getElementById('portals') ||
      document.getElementById('home-faq');

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Vijayrajkumar — Chief Operating Officer & Venture Builder in Chennai"
      className="relative w-full h-[calc(100vh-68px)] min-h-[540px] sm:min-h-[600px] bg-[var(--gta-text-outline)] flex flex-col items-center justify-between overflow-hidden select-none border-b-2 border-[var(--gta-silhouette)]/40"
    >
      {/* 3D Immersive West Coast Sunset Streetscape */}
      <StreetscapeScene3D />

      {/* Screen Reader Semantic Headings for SEO, AEO & Crawlers */}
      <div className="sr-only">
        <h1>Vijayrajkumar — Chief Operating Officer &amp; Venture Builder in Chennai</h1>
        <p>
          Co-Founder &amp; COO at Unfounded, Ziggers, and LoopMemory. Operating across urban gig-economy
          marketplaces and persistent AI memory infrastructure.
        </p>
        <img
          src="/images/hero-desktop.webp"
          alt="Vijayrajkumar official GTA San Andreas artwork poster in Chennai"
        />
      </div>

      {/* Top HUD Telemetry Ribbon */}
      <header className="relative z-20 w-full pt-4 sm:pt-6 px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center space-x-2.5 bg-[var(--gta-text-outline)]/85 backdrop-blur-md border border-[var(--gta-silhouette)] px-3.5 sm:px-4 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E7B85A] animate-ping" />
          <span className="font-bank uppercase text-[10px] sm:text-xs tracking-widest text-[var(--gta-text-fill)] font-bold">
            CHENNAI, IN // MISSION: ACTIVE
          </span>
        </div>

        <div className="pointer-events-auto hidden sm:flex items-center space-x-2 bg-[var(--gta-text-outline)]/85 backdrop-blur-md border border-[var(--gta-silhouette)] px-3.5 sm:px-4 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          <span className="font-bank uppercase text-[10px] sm:text-xs tracking-widest text-[var(--gta-text-fill-warm)] font-bold">
            UNFOUNDED // STUDIO OPS
          </span>
        </div>
      </header>

      {/* Middle Spacer to keep Billboard visually dominant */}
      <div className="flex-1 pointer-events-none" />

      {/* Bottom GTA HUD Action Bar */}
      <footer className="relative z-20 pb-6 sm:pb-8 flex flex-col items-center justify-center px-4 w-full">
        <button
          type="button"
          onClick={handleScrollDown}
          onMouseEnter={() => soundSystem.playHover()}
          className="flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full bg-[var(--gta-text-outline)]/95 hover:bg-[#1A1A1A] active:scale-95 border-2 border-[var(--gta-silhouette)] text-[var(--gta-text-fill)] text-xs sm:text-sm font-bank uppercase tracking-widest font-bold shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all cursor-pointer group"
          aria-label="Scroll down to explore case studies and portals"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E7B85A] group-hover:scale-125 transition-transform shrink-0" />
          <span className="group-hover:text-[var(--gta-text-fill-warm)] transition-colors">
            Explore Portals &amp; Ventures ↓
          </span>
        </button>
      </footer>
    </section>
  );
}
