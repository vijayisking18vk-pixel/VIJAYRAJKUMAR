import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import GtaHero from './components/GtaHero';
import PortalsSection from './components/PortalsSection';
import HomeFAQSection from './components/HomeFAQSection';
import Footer from './components/Footer';
import Particles from './components/react-bits/Particles';
import GtaRadarWidget from './components/GtaRadarWidget';

// Code-split multi-page subpages (lazy loaded on demand)
const AboutPage = lazy(() => import('./pages/AboutPage'));
const VenturesPage = lazy(() => import('./pages/VenturesPage'));
const ZiggersPage = lazy(() => import('./pages/ZiggersPage'));
const LoopMemoryPage = lazy(() => import('./pages/LoopMemoryPage'));
const WritingPage = lazy(() => import('./pages/WritingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const PageFallback = () => (
  <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-[var(--color-accent-primary)] border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Route matching
  const normalizedPath = currentPath.toLowerCase().replace(/\/+$/, '');

  let subpageContent = null;

  if (normalizedPath === '/vijayrajkumar' || normalizedPath === '/about') {
    if (normalizedPath === '/vijayrajkumar' && typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/about/');
    }
    subpageContent = <AboutPage />;
  } else if (normalizedPath === '/ventures') {
    subpageContent = <VenturesPage />;
  } else if (normalizedPath === '/ventures/ziggers') {
    subpageContent = <ZiggersPage />;
  } else if (normalizedPath === '/ventures/loopmemory') {
    subpageContent = <LoopMemoryPage />;
  } else if (normalizedPath === '/events') {
    subpageContent = <EventsPage />;
  } else if (normalizedPath === '/writing' || normalizedPath.startsWith('/writing/')) {
    subpageContent = <WritingPage />;
  } else if (normalizedPath === '/startup-builder-venture-builder-india') {
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/writing/startup-builder-venture-builder-india/');
    }
    subpageContent = <WritingPage initialArticleId="startup-builder-venture-builder-india" />;
  } else if (normalizedPath === '/catering-workers-in-chennai') {
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/writing/catering-workers-in-chennai/');
    }
    subpageContent = <WritingPage initialArticleId="catering-workers-in-chennai" />;
  } else if (normalizedPath === '/contact') {
    subpageContent = <ContactPage />;
  } else if (normalizedPath !== '' && normalizedPath !== '/') {
    subpageContent = <NotFoundPage />;
  }

  // If viewing a subpage, render with persistent GTA Radar HUD
  if (subpageContent) {
    return (
      <div className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-futura selection:bg-[var(--color-accent-primary)] selection:text-white">
        <Suspense fallback={<PageFallback />}>
          {subpageContent}
        </Suspense>
        <GtaRadarWidget />
      </div>
    );
  }

  // Streamlined Homepage: GTA Hero + Proof Strip + Section Directory Portals + Radar HUD
  return (
    <div className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] flex flex-col font-futura selection:bg-[var(--color-accent-primary)] selection:text-white overflow-x-clip">
      {/* Global Ambient Interactive Particles Canvas Background */}
      <Particles particleCount={30} speed={0.3} particleColor="#7C8873" />

      {/* Navigation Header */}
      <Header />

      {/* Main Content Flow: Living Centerpiece & Dedicated Portals */}
      <main className="relative z-10 flex-grow">
        {/* 1. Authentic GTA San Andreas Artwork Hero (Mobile Portrait & Desktop Landscape) */}
        <GtaHero />

        {/* 2. Responsive 4-Portal Directory (Zero Scroll-Jacking / Natural Flow) */}
        <PortalsSection />

        {/* 3. AEO/GEO Executive Summary & Question Knowledge Hub */}
        <HomeFAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* GTA Minimap HUD & Audio Console */}
      <GtaRadarWidget />
    </div>
  );
}
