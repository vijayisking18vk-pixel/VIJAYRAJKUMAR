import { useState, useEffect, useCallback } from 'react';
import { globalScroll, CHAMBER_MILESTONES, ChamberMilestone, getChamberFromProgress } from '../stores/scrollStore';

export { CHAMBER_MILESTONES, getChamberFromProgress };
export type { ChamberMilestone };

export interface VirtualScrollState {
  currentChamber: number; // 0 to 7
  scrollToProgress: (target: number) => void;
  scrollToChamber: (chamberIndex: number) => void;
}

export function useVirtualScroll(): VirtualScrollState {
  const [currentChamber, setCurrentChamber] = useState<number>(globalScroll.chamber);

  useEffect(() => {
    // Subscribe to chamber changes - only triggers when crossing chamber boundaries
    const unsubscribe = globalScroll.subscribeChamber((chamber) => {
      setCurrentChamber(chamber);
    });

    // 1. Wheel listener (normalized across browsers)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.00065;
      globalScroll.addTargetDelta(delta);
    };

    // 2. Touch listeners for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      touchStartY = currentY;
      const delta = deltaY * 0.0014;
      globalScroll.addTargetDelta(delta);
    };

    // 3. Keyboard arrow navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        globalScroll.addTargetDelta(0.04);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        globalScroll.addTargetDelta(-0.04);
      } else if (e.key === 'Home') {
        globalScroll.setTarget(0);
      } else if (e.key === 'End') {
        globalScroll.setTarget(1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToProgress = useCallback((target: number) => {
    globalScroll.setTarget(target);
  }, []);

  const scrollToChamber = useCallback((chamberIndex: number) => {
    const milestone = CHAMBER_MILESTONES.find((m) => m.chamber === chamberIndex);
    if (milestone) {
      globalScroll.setTarget(milestone.t);
    }
  }, []);

  return {
    currentChamber,
    scrollToProgress,
    scrollToChamber,
  };
}
