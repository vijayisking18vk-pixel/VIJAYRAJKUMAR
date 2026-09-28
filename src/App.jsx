import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DistrictMapWidget from './components/DistrictMapWidget';
import PlayableDistrict3D from './components/PlayableDistrict3D';
import PlayableDistrictHUD from './components/PlayableDistrictHUD';
import LocationDossierModal from './components/LocationDossierModal';
import GuidedChaptersLayer from './components/GuidedChaptersLayer';

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

  // Playable District State
  const [activeLandmarkId, setActiveLandmarkId] = useState('arrival');
  const [isExploreMode, setIsExploreMode] = useState(false);
  const [playerTelemetry, setPlayerTelemetry] = useState(null);
  const [proximityLandmark, setProximityLandmark] = useState(null);
  const [activeDossierLandmark, setActiveDossierLandmark] = useState(null);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      // Close explore mode if navigating to a subpage
      if (window.location.pathname !== '/') {
        setIsExploreMode(false);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleNavigate = useCallback((path) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleToggleExploreMode = useCallback(() => {
    setIsExploreMode((prev) => !prev);
    setActiveDossierLandmark(null);
  }, []);

  const handleExitExploreMode = useCallback(() => {
    setIsExploreMode(false);
    setActiveDossierLandmark(null);
  }, []);

  const handleOpenDossier = useCallback((landmark) => {
    setActiveDossierLandmark(landmark);
  }, []);

  const handleCloseDossier = useCallback(() => {
    setActiveDossierLandmark(null);
  }, []);

  const handleSelectLandmarkFrom3D = useCallback((landmark) => {
    if (isExploreMode) {
      setActiveDossierLandmark(landmark);
    } else {
      const el = document.getElementById(landmark.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isExploreMode]);

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

  // If viewing a standalone subpage, render with persistent GTA Radar HUD
  if (subpageContent) {
    return (
      <div className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-futura selection:bg-[var(--color-accent-primary)] selection:text-white">
        <Suspense fallback={<PageFallback />}>
          {subpageContent}
        </Suspense>
        <DistrictMapWidget />
      </div>
    );
  }

  // =========================================================================
  // THE PLAYABLE PORTFOLIO HOMEPAGE EXPERIENCE
  // Shared 3D San Andreas District + Guided Chapters Layer + Explore Mode HUD
  // =========================================================================
  return (
    <div className="relative min-h-screen bg-[var(--gta-text-outline)] text-[var(--gta-text-fill)] flex flex-col font-futura selection:bg-[#E7B85A] selection:text-[#0A0E0C] overflow-x-clip">
      
      {/* 1. Shared 3D City District Canvas (Fixed Background Viewport) */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <PlayableDistrict3D
          activeLandmarkId={activeLandmarkId}
          isExploreMode={isExploreMode}
          onSelectLandmark={handleSelectLandmarkFrom3D}
          onPlayerTelemetryUpdate={setPlayerTelemetry}
          onProximityLandmark={setProximityLandmark}
        />
      </div>

      {/* 2. Top Navigation Header (hidden when in immersive Explore Mode) */}
      {!isExploreMode && (
        <Header
          isExploreMode={isExploreMode}
          onToggleExploreMode={handleToggleExploreMode}
        />
      )}

      {/* 3. Explore Mode Top/Bottom HUD Overlay (active during free exploration) */}
      <PlayableDistrictHUD
        isExploreMode={isExploreMode}
        proximityLandmark={proximityLandmark}
        onExitExploreMode={handleExitExploreMode}
        onOpenDossier={handleOpenDossier}
        onNavigateToRoute={handleNavigate}
      />

      {/* 4. Location Dossier Modal (opens when inspecting landmark in Explore Mode) */}
      <LocationDossierModal
        landmark={activeDossierLandmark}
        onClose={handleCloseDossier}
        onNavigate={handleNavigate}
      />

      {/* 5. Guided Chapters Content Layer (Native vertical scroll moves through city) */}
      {!isExploreMode && (
        <main className="relative z-10 flex-grow">
          <GuidedChaptersLayer
            onActiveChapterChange={setActiveLandmarkId}
            onEnterExploreMode={handleToggleExploreMode}
            onNavigate={handleNavigate}
          />
        </main>
      )}

      {/* 6. Footer (visible in Guided Journey mode) */}
      {!isExploreMode && <Footer />}

      {/* 7. Persistent GTA District Map HUD & Audio Console */}
      <DistrictMapWidget
        isExploreMode={isExploreMode}
        onToggleExploreMode={handleToggleExploreMode}
        playerTelemetry={playerTelemetry}
        activeLandmarkId={activeLandmarkId}
        onSelectLandmark={handleSelectLandmarkFrom3D}
      />

    </div>
  );
}
