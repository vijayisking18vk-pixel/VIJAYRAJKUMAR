import React from 'react';

export default function GtaHero() {
  const handleScrollDown = () => {
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
      className="relative w-full min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen bg-[#070D0A] flex flex-col items-center justify-center overflow-hidden select-none border-b border-[#7A968B]/30"
    >
      {/* Background Ambience & Subtle Radial Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(16,28,21,0.4)_0%,rgba(7,13,10,0.95)_100%)] z-0" />

      {/* Screen Reader Semantic Headings for SEO & AEO */}
      <div className="sr-only">
        <h1>Vijayrajkumar — Chief Operating Officer &amp; Venture Builder in Chennai</h1>
        <p>
          Co-Founder &amp; COO at Unfounded, Ziggers, and LoopMemory. Operating across urban gig-economy
          marketplaces and persistent AI memory infrastructure.
        </p>
      </div>

      {/* Top HUD Telemetry Ribbon */}
      <div className="absolute top-4 sm:top-6 left-4 right-4 z-20 flex items-center justify-between pointer-events-none max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 bg-[var(--gta-text-outline)]/85 backdrop-blur-md border border-[var(--gta-silhouette)] px-3 sm:px-4 py-1.5 rounded-full shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[var(--gta-sky-top)] animate-ping" />
          <span className="font-bank uppercase text-[10px] sm:text-xs tracking-widest text-[var(--gta-text-fill)] font-bold">
            CHENNAI, IN // MISSION: ACTIVE
          </span>
        </div>

        <div className="hidden sm:flex items-center space-x-2 bg-[var(--gta-text-outline)]/85 backdrop-blur-md border border-[var(--gta-silhouette)] px-3 sm:px-4 py-1.5 rounded-full shadow-lg">
          <span className="font-bank uppercase text-[10px] sm:text-xs tracking-widest text-[var(--gta-text-fill-warm)] font-bold">
            UNFOUNDED // STUDIO OPS
          </span>
        </div>
      </div>

      {/* Hero Visual Poster: Mobile (First Image) vs Desktop (Second Image) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-16 sm:py-20 flex items-center justify-center">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-[var(--gta-text-outline)] shadow-[0_20px_60px_rgba(10,10,10,0.85)] bg-[var(--gta-text-outline)] max-w-full">
          <picture className="block w-full h-full">
            {/* Desktop Screen: Landscape Widescreen (1024x576, 16:9) */}
            <source
              media="(min-width: 768px)"
              type="image/webp"
              srcSet="/images/hero-desktop.webp"
            />
            <source
              media="(min-width: 768px)"
              type="image/jpeg"
              srcSet="/images/hero-desktop.jpg"
            />

            {/* Mobile Screen: Portrait Mobile-Optimized (682x1024, 2:3) */}
            <source
              media="(max-width: 767px)"
              type="image/webp"
              srcSet="/images/hero-mobile.webp"
            />
            <source
              media="(max-width: 767px)"
              type="image/jpeg"
              srcSet="/images/hero-mobile.jpg"
            />

            <img
              src="/images/hero-desktop.jpg"
              alt="Vijay Raj Kumar Unfounded — GTA San Andreas Official Artwork Poster"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              className="w-full h-auto max-h-[75vh] sm:max-h-[80vh] lg:max-h-[82vh] object-contain mx-auto block transform-gpu hover:scale-[1.01] transition-transform duration-500"
            />
          </picture>
        </div>
      </div>

      {/* Bottom GTA HUD Scroll Action Button */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex flex-col items-center justify-center px-4">
        <button
          type="button"
          onClick={handleScrollDown}
          className="flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[var(--gta-text-outline)]/90 hover:bg-[var(--gta-text-outline)] active:scale-95 backdrop-blur-md border border-[var(--gta-silhouette)] text-[var(--gta-text-fill)] text-[10px] sm:text-xs font-bank uppercase tracking-wider font-bold shadow-2xl transition-all cursor-pointer group"
          aria-label="Scroll down to explore case studies and portals"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--gta-sky-top)] animate-pulse shrink-0" />
          <span className="group-hover:text-[var(--gta-text-fill-warm)] transition-colors">
            Explore Portals &amp; Ventures ↓
          </span>
        </button>
      </div>
    </section>
  );
}
