import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import { ParallaxHero } from './components/ui/wilderness';
import ScrollVideoSection from './components/ScrollVideoSection';
import Footer from './components/Footer';
import Particles from './components/react-bits/Particles';

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

  if (normalizedPath === '/vijayrajkumar') {
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/about/');
    }
    return (
      <Suspense fallback={<PageFallback />}>
        <AboutPage />
      </Suspense>
    );
  }
  if (normalizedPath === '/about') {
    return (
      <Suspense fallback={<PageFallback />}>
        <AboutPage />
      </Suspense>
    );
  }
  if (normalizedPath === '/ventures') {
    return (
      <Suspense fallback={<PageFallback />}>
        <VenturesPage />
      </Suspense>
    );
  }
  if (normalizedPath === '/ventures/ziggers') {
    return (
      <Suspense fallback={<PageFallback />}>
        <ZiggersPage />
      </Suspense>
    );
  }
  if (normalizedPath === '/ventures/loopmemory') {
    return (
      <Suspense fallback={<PageFallback />}>
        <LoopMemoryPage />
      </Suspense>
    );
  }
  if (normalizedPath === '/events') {
    return (
      <Suspense fallback={<PageFallback />}>
        <EventsPage />
      </Suspense>
    );
  }
  if (normalizedPath === '/writing' || normalizedPath.startsWith('/writing/')) {
    return (
      <Suspense fallback={<PageFallback />}>
        <WritingPage />
      </Suspense>
    );
  }
  if (normalizedPath === '/startup-builder-venture-builder-india') {
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/writing/startup-builder-venture-builder-india/');
    }
    return (
      <Suspense fallback={<PageFallback />}>
        <WritingPage initialArticleId="startup-builder-venture-builder-india" />
      </Suspense>
    );
  }
  if (normalizedPath === '/catering-workers-in-chennai') {
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/writing/catering-workers-in-chennai/');
    }
    return (
      <Suspense fallback={<PageFallback />}>
        <WritingPage initialArticleId="catering-workers-in-chennai" />
      </Suspense>
    );
  }
  if (normalizedPath === '/contact') {
    return (
      <Suspense fallback={<PageFallback />}>
        <ContactPage />
      </Suspense>
    );
  }
  if (normalizedPath !== '' && normalizedPath !== '/') {
    return (
      <Suspense fallback={<PageFallback />}>
        <NotFoundPage />
      </Suspense>
    );
  }

  // Streamlined Homepage: Living Parallax Hero + Proof Strip + Section Directory Portals
  return (
    <div className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] flex flex-col font-sans selection:bg-[var(--color-accent-primary)] selection:text-white overflow-x-clip">
      {/* Global Ambient Interactive Particles Canvas Background */}
      <Particles particleCount={30} speed={0.3} particleColor="#2C3E2D" />

      {/* Navigation Header */}
      <Header />

      {/* Main Content Flow: Living Centerpiece & Dedicated Portals */}
      <main className="relative z-10 flex-grow">
        {/* 1. 3D Interactive Parallax Hero Centerpiece */}
        <ParallaxHero title="VIJAY" />

        {/* 2. Full-Screen Cinematic Scroll-Driven Video & Frame Progression */}
        <ScrollVideoSection />
      </main>


      {/* Footer */}
      <Footer />
    </div>
  );
}
