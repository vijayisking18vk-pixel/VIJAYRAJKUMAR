import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { ParallaxHero } from './components/ui/wilderness';
import PagePortalsGrid from './components/PagePortalsGrid';
import Footer from './components/Footer';
import Particles from './components/react-bits/Particles';

// Multi-page subpages
import AboutPage from './pages/AboutPage';
import VenturesPage from './pages/VenturesPage';
import ZiggersPage from './pages/ZiggersPage';
import LoopMemoryPage from './pages/LoopMemoryPage';
import WritingPage from './pages/WritingPage';
import ContactPage from './pages/ContactPage';

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

  if (normalizedPath === '/about') {
    return <AboutPage />;
  }
  if (normalizedPath === '/ventures') {
    return <VenturesPage />;
  }
  if (normalizedPath === '/ventures/ziggers') {
    return <ZiggersPage />;
  }
  if (normalizedPath === '/ventures/loopmemory') {
    return <LoopMemoryPage />;
  }
  if (normalizedPath === '/writing') {
    return <WritingPage />;
  }
  if (normalizedPath === '/contact') {
    return <ContactPage />;
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

        {/* 3. Directory Portals to Dedicated Pages (About, Ventures, Writing, Contact) */}
        <PagePortalsGrid />
      </main>


      {/* Footer */}
      <Footer />
    </div>
  );
}
