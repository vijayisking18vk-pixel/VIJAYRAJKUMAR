import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

export interface VirtualScrollState {
  progress: number; // 0.0 to 1.0 smoothed
  targetProgress: number; // 0.0 to 1.0 target
  currentChamber: number; // 0 to 7
  scrollToProgress: (target: number) => void;
  scrollToChamber: (chamberIndex: number) => void;
}

// Chamber progress milestones along the spline
export const CHAMBER_MILESTONES = [
  { chamber: 0, t: 0.00, label: '00 // AWAKENING', title: 'THE GAZE' },
  { chamber: 1, t: 0.08, label: '01 // ORIGIN', title: 'THE STOIC VOID' },
  { chamber: 2, t: 0.22, label: '02 // SPARK', title: 'THE SCHOOLING GATES' },
  { chamber: 3, t: 0.38, label: '03 // FRACTURE', title: 'THE 2020 BLACKOUT' },
  { chamber: 4, t: 0.55, label: '04 // ABYSS', title: 'DEFENCE & DEBARRED' },
  { chamber: 5, t: 0.72, label: '05 // THE FIVE', title: 'THE REMAINING FIVE' },
  { chamber: 6, t: 0.86, label: '06 // EMPIRE', title: 'THE CITADEL AT 21' },
  { chamber: 7, t: 0.98, label: '07 // SIGNAL', title: 'THE MANIFESTO' },
];

export function useVirtualScroll(): VirtualScrollState {
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const touchStartY = useRef(0);
  const rafId = useRef<number | null>(null);

  // Determine active chamber from progress
  const currentChamber = (() => {
    if (progress < 0.04) return 0;
    if (progress < 0.16) return 1;
    if (progress < 0.30) return 2;
    if (progress < 0.45) return 3;
    if (progress < 0.65) return 4;
    if (progress < 0.78) return 5;
    if (progress < 0.93) return 6;
    return 7;
  })();

  const scrollToProgress = useCallback((target: number) => {
    targetProgress.current = THREE.MathUtils.clamp(target, 0, 1);
  }, []);

  const scrollToChamber = useCallback((chamberIndex: number) => {
    const milestone = CHAMBER_MILESTONES.find((m) => m.chamber === chamberIndex);
    if (milestone) {
      scrollToProgress(milestone.t);
    }
  }, [scrollToProgress]);

  useEffect(() => {
    // 1. Wheel listener (normalized across browsers)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.00075;
      targetProgress.current = THREE.MathUtils.clamp(targetProgress.current + delta, 0, 1);
    };

    // 2. Touch listeners for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY.current - currentY;
      touchStartY.current = currentY;
      const delta = deltaY * 0.0016;
      targetProgress.current = THREE.MathUtils.clamp(targetProgress.current + delta, 0, 1);
    };

    // 3. Keyboard arrow navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        targetProgress.current = THREE.MathUtils.clamp(targetProgress.current + 0.05, 0, 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        targetProgress.current = THREE.MathUtils.clamp(targetProgress.current - 0.05, 0, 1);
      } else if (e.key === 'Home') {
        targetProgress.current = 0;
      } else if (e.key === 'End') {
        targetProgress.current = 1;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // 4. Smooth Animation Loop
    let lastTime = performance.now();
    const update = (time: number) => {
      const deltaSec = (time - lastTime) / 1000;
      lastTime = time;

      setProgress((prev) => {
        const next = THREE.MathUtils.damp(prev, targetProgress.current, 5.0, deltaSec);
        return Math.abs(next - prev) > 0.00001 ? next : prev;
      });

      rafId.current = requestAnimationFrame(update);
    };

    rafId.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return {
    progress,
    targetProgress: targetProgress.current,
    currentChamber,
    scrollToProgress,
    scrollToChamber,
  };
}
