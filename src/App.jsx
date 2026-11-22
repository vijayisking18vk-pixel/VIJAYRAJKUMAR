import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { Scene } from './components/canvas/Scene';
import { NavigationHUD } from './components/ui/NavigationHUD';
import { Preloader } from './components/ui/Preloader';
import { CustomCursor } from './components/ui/CustomCursor';
import { EasterEggModal } from './components/ui/EasterEggModal';

import { HeroAct } from './components/sections/HeroAct';
import { OriginAct } from './components/sections/OriginAct';
import { BlackoutAct } from './components/sections/BlackoutAct';
import { DefenceAct } from './components/sections/DefenceAct';
import { RemainingFiveAct } from './components/sections/RemainingFiveAct';
import { EmpireAct } from './components/sections/EmpireAct';
import { SignalFooterAct } from './components/sections/SignalFooterAct';

const SECTION_IDS = [
  'hero',
  'origin',
  'blackout',
  'defence',
  'turning-point',
  'empire',
  'signal',
];

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentAct, setCurrentAct] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const lenisRef = useRef(null);

  // 1. Mouse coordinates tracking for 3D parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalized from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. Secret Key Sequence Listener (Type "CAT" or "2005" anywhere to trigger Easter Egg)
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 10) {
        keyBuffer = keyBuffer.slice(-10);
      }

      if (keyBuffer.includes('cat') || keyBuffer.includes('2005')) {
        setEasterEggOpen(true);
        keyBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 3. Lenis Smooth Scroll Engine
  useEffect(() => {
    if (!preloaderDone) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    const onScroll = (e) => {
      const progress = e.progress; // 0.0 to 1.0
      setScrollProgress(progress);

      // Determine active section by scroll offset
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      SECTION_IDS.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45 && rect.bottom >= windowHeight * 0.45) {
            setCurrentAct(idx);
          }
        }
      });
    };

    lenis.on('scroll', onScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [preloaderDone]);

  // Navigate to specific Act on user click
  const handleNavigateToAct = useCallback((actIndex) => {
    const targetId = SECTION_IDS[actIndex];
    const el = document.getElementById(targetId);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#020005] text-[#F8ECFF] selection:bg-[#9D00FF] selection:text-[#FFFFFF] overflow-x-hidden font-sans">
      {/* Cinematic Preloader Boot Sequence */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Persistent WebGL 3D Canvas Background */}
      <Scene scrollProgress={scrollProgress} mouse={mouse} />

      {/* Atmospheric Overlays: CRT Scanlines & Analog Film Grain */}
      <div className="film-grain fixed inset-0 pointer-events-none z-30" />
      <div className="crt-scanlines fixed inset-0 pointer-events-none z-30" />

      {/* Custom Tactical Cursor */}
      <CustomCursor />

      {/* Fixed Tactical Navigation HUD */}
      <NavigationHUD
        currentAct={currentAct}
        onNavigateToAct={handleNavigateToAct}
        scrollProgress={scrollProgress}
      />

      {/* Narrative Section Architecture */}
      <main className="relative z-10 w-full flex flex-col">
        <HeroAct onScrollDown={() => handleNavigateToAct(1)} />
        <OriginAct />
        <BlackoutAct />
        <DefenceAct />
        <RemainingFiveAct />
        <EmpireAct />
        <SignalFooterAct onOpenEasterEgg={() => setEasterEggOpen(true)} />
      </main>

      {/* Secret Easter Egg Modal */}
      <EasterEggModal
        isOpen={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
      />
    </div>
  );
}
