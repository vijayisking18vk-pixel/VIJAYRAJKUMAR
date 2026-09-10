import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroPoster from './components/HeroPoster';
import AboutBuilder from './components/AboutBuilder';
import VentureWorkbench from './components/VentureWorkbench';
import LearningStack from './components/LearningStack';
import CollaborationDispatch from './components/CollaborationDispatch';
import Footer from './components/Footer';
import Particles from './components/react-bits/Particles';

// Multi-page subpages
import AboutPage from './pages/AboutPage';
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

  // Default: Homepage with living centerpiece, proof strip & structured sections
  const scrollToJourney = () => {
    const el = document.getElementById('journey');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-neutral-950 flex flex-col font-sans selection:bg-neutral-900 selection:text-white overflow-x-hidden">
      {/* Global Ambient Interactive Particles Canvas Background */}
      <Particles particleCount={30} speed={0.3} particleColor="#18181B" />

      {/* Navigation Header */}
      <Header />

      {/* Main Content Flow */}
      <main className="relative z-10 flex-grow">
        {/* 1. Hero Poster Image Centerpiece & Proof Strip */}
        <HeroPoster onStartAnimation={scrollToJourney} />

        {/* 01 // The Journey & Education */}
        <AboutBuilder />

        {/* 02 // Experience & Venture Matrix */}
        <VentureWorkbench />

        {/* 03 // Skills & Ecosystem Engagement */}
        <LearningStack />

        {/* 04 // Connect & Dispatch */}
        <CollaborationDispatch />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
