import React, { useState, useEffect, useCallback } from 'react';
import { MainScene } from './components/canvas/MainScene';
import { useVirtualScroll } from './hooks/useVirtualScroll';
import { CinemaSubtitles } from './components/hud/CinemaSubtitles';
import { TopHairlineBar } from './components/hud/TopHairlineBar';
import { WaypointSpine } from './components/hud/WaypointSpine';
import { DossierDrawer } from './components/hud/DossierDrawer';
import { SignalModal } from './components/hud/SignalModal';
import { MischiefGlitch } from './components/hud/MischiefGlitch';
import { AmbientAudio } from './components/ui/AmbientAudio';
import { CustomCursor } from './components/ui/CustomCursor';

export default function App() {
  const { currentChamber, scrollToChamber } = useVirtualScroll();

  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isSignalModalOpen, setIsSignalModalOpen] = useState(false);
  const [isMischiefActive, setIsMischiefActive] = useState(false);
  const [portalHoverText, setPortalHoverText] = useState<string | null>(null);
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Secret Key Sequence Listener: typing "CAT" or "2005" anywhere triggers Mischief Glitch
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 10) keyBuffer = keyBuffer.slice(-10);

      if (keyBuffer.includes('cat') || keyBuffer.includes('2005')) {
        setIsMischiefActive(true);
        keyBuffer = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Audio & Portal interactions
  const handleToggleSound = useCallback(() => {
    const win = window as unknown as { toggleAmbientSound?: () => void };
    win.toggleAmbientSound?.();
  }, []);

  const handlePortalHover = useCallback((portalName: string | null) => {
    if (portalName) {
      setPortalHoverText(portalName === 'dist' ? 'INSPECT' : 'OPEN PORTAL ↗');
      const win = window as unknown as { playPortalChime?: () => void };
      win.playPortalChime?.();
    } else {
      setPortalHoverText(null);
    }
  }, []);

  const handlePortalClick = useCallback((url: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setIsDossierOpen(true);
    }
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020005] text-[#F8ECFF] select-none font-sans">
      {/* 1. Pure 3D Canvas Viewport (100vw x 100vh) */}
      <MainScene
        onEnterChamber1={() => scrollToChamber(1)}
        onPortalClick={handlePortalClick}
        onPortalHover={handlePortalHover}
      />

      {/* 2. Analog Film Grain & CRT Scanline Atmospheric Overlays */}
      <div className="film-grain fixed inset-0 pointer-events-none z-20" />
      <div className="crt-scanlines fixed inset-0 pointer-events-none z-20" />

      {/* 3. Minimalist Cinema HUD: Top Hairline Bar */}
      <TopHairlineBar
        onWarpOrigin={() => scrollToChamber(1)}
        onToggleSound={handleToggleSound}
        isAudioActive={isAudioActive}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      {/* 4. Right-Edge Waypoint Spine (Chambers 1–7) */}
      <WaypointSpine
        currentChamber={currentChamber}
        onSelectChamber={scrollToChamber}
      />

      {/* 5. Bottom-Center Cinema Subtitles (Zero AI Boxes) */}
      <CinemaSubtitles
        currentChamber={currentChamber}
        onOpenSignalModal={() => setIsSignalModalOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      {/* 6. Optional Hidden Dossier Slide-Over Drawer */}
      <DossierDrawer
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* 7. Direct Inquiry Signal Modal */}
      <SignalModal
        isOpen={isSignalModalOpen}
        onClose={() => setIsSignalModalOpen(false)}
      />

      {/* 8. Nocturnal Mischief Glitch Overlay (CAT / 2005) */}
      <MischiefGlitch
        isActive={isMischiefActive}
        onDismiss={() => setIsMischiefActive(false)}
      />

      {/* 9. Web Audio API Ambient Generative Drone */}
      <AmbientAudio
        currentChamber={currentChamber}
        onToggle={(active) => setIsAudioActive(active)}
      />

      {/* 10. Custom Magnetic Cursor */}
      <CustomCursor externalHoverText={portalHoverText} />
    </div>
  );
}
