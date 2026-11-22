import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Virtual timeline duration = 30.73s (video) + 3.0s (black screen pause) = 33.73s
const TOTAL_VIRTUAL_DURATION = 33.73;

interface NarrativeState {
  text: string;
  isBlackScreen: boolean;
  videoTime: number;
}

function getNarrative(T: number): NarrativeState {
  // 0.1 to 1.5 second: 05 /04 /2005 Thoothukudi
  // 1.5 to 5.3: Chennai 2008
  // 5.3 to 9.7 sec: lazy naughty but pretty good in school
  // 9.7 seconds to 16.8 seconds: everything was good until
  // 16.8 seconds to 17.7 seconds: Covid struck
  // 17.7 to 20.7 (3-sec pause): covid struck failed in exams and debarred in college (black screen, no video)
  // 20.7 to 26.9 (video 17.7 to 23.9): joined hands with bunch of friends and building unfounded things
  // 26.9 to 33.73 (video 23.9 to 30.73): Currently Ceo of three business

  if (T < 0.1) {
    return { text: '', isBlackScreen: false, videoTime: 0 };
  }
  if (T < 1.5) {
    return { text: '05 /04 /2005 Thoothukudi', isBlackScreen: false, videoTime: T };
  }
  if (T < 5.3) {
    return { text: 'Chennai 2008', isBlackScreen: false, videoTime: T };
  }
  if (T < 9.7) {
    return { text: 'lazy naughty but pretty good in school', isBlackScreen: false, videoTime: T };
  }
  if (T < 16.8) {
    return { text: 'everything was good until', isBlackScreen: false, videoTime: T };
  }
  if (T < 17.7) {
    return { text: 'Covid struck', isBlackScreen: false, videoTime: T };
  }
  // 3-second black screen pause (video holds at 17.7s and is completely hidden)
  if (T < 20.7) {
    return {
      text: 'covid struck failed in exams and debarred in college',
      isBlackScreen: true,
      videoTime: 17.7,
    };
  }
  // 17.7s to 23.9s video (virtual 20.7s to 26.9s)
  if (T < 26.9) {
    const vTime = 17.7 + (T - 20.7);
    return {
      text: 'joined hands with bunch of friends and building unfounded things',
      isBlackScreen: false,
      videoTime: vTime,
    };
  }
  // 23.9s to 30.73s video (virtual 26.9s to 33.73s)
  const vTime = Math.min(23.9 + (T - 26.9), 30.73);
  return {
    text: 'Currently Ceo of three business',
    isBlackScreen: false,
    videoTime: vTime,
  };
}

export const ScrollVideoPlayer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafId = useRef<number | null>(null);

  const [narrative, setNarrative] = useState<NarrativeState>({
    text: '',
    isBlackScreen: false,
    videoTime: 0,
  });

  const targetProgress = useRef<number>(0);
  const smoothedProgress = useRef<number>(0);

  // 1. Native Window Scroll Listener mapping window scrollY to 0..1
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
      targetProgress.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Smooth Damped Scrub Loop in RAF (60-120fps)
  useEffect(() => {
    let lastTime = performance.now();

    const updateScrub = (now: number) => {
      const deltaSec = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Snappy exponential damping towards target scroll progress
      const factor = 1.0 - Math.exp(-14.0 * deltaSec);
      smoothedProgress.current += (targetProgress.current - smoothedProgress.current) * factor;

      const currentVirtualT = smoothedProgress.current * TOTAL_VIRTUAL_DURATION;
      const state = getNarrative(currentVirtualT);
      setNarrative(state);

      const video = videoRef.current;
      if (video && video.readyState >= 1) {
        // Throttled seek threshold to keep hardware decoder silky smooth
        if (!video.seeking && Math.abs(video.currentTime - state.videoTime) > 0.02) {
          if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
            (video as any).fastSeek(state.videoTime);
          } else {
            video.currentTime = state.videoTime;
          }
        }
      }

      rafId.current = requestAnimationFrame(updateScrub);
    };

    rafId.current = requestAnimationFrame(updateScrub);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#020005] text-[#F8ECFF] select-none"
      style={{ height: '650vh' }} // Expansive scroll track for buttery-smooth scrubbing
    >
      {/* ================= FIXED IMMERSIVE VIEWPORT (100dvh) ================= */}
      <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-[#020005] z-10">
        
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(157,0,255,0.14)_0%,_rgba(11,1,26,0.5)_60%,_#020005_100%)] z-0" />

        {/* Video Element (Hardware Accelerated, Mobile-Optimized) */}
        <video
          ref={videoRef}
          src="/video/scroll-animation.mp4"
          className={`relative z-10 w-full h-full object-cover object-center transition-opacity duration-300 ${
            narrative.isBlackScreen ? 'opacity-0' : 'opacity-100'
          }`}
          playsInline
          muted
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
        />

        {/* Black screen overlay during pause (No video, only text) */}
        <div
          className={`absolute inset-0 bg-[#020005] z-20 pointer-events-none transition-opacity duration-300 ${
            narrative.isBlackScreen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Cinematic Film Grain & CRT Scanline Accents */}
        <div className="film-grain fixed inset-0 pointer-events-none z-25 opacity-25" />
        <div className="crt-scanlines fixed inset-0 pointer-events-none z-25 opacity-20" />

        {/* Subtle Vignette */}
        <div className="absolute inset-0 pointer-events-none z-25 bg-[radial-gradient(ellipse_at_center,transparent_65%,#020005_100%)]" />

        {/* ================= MINIMAL HEADER: ONLY vijayrajkumar ================= */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-10 z-30 pointer-events-none select-none">
          <span className="font-mono text-xs sm:text-sm tracking-widest text-[#F8ECFF] uppercase opacity-85 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            vijayrajkumar
          </span>
        </div>

        {/* ================= NARRATIVE TEXT OVERLAY (ONLY USER TEXTS) ================= */}
        <div className="absolute inset-x-0 bottom-14 sm:bottom-20 z-30 flex justify-center items-center px-6 pointer-events-none select-none">
          <AnimatePresence mode="wait">
            {narrative.text && (
              <motion.div
                key={narrative.text}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="text-center max-w-3xl"
              >
                <p
                  className={`font-editorial font-light tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] ${
                    narrative.isBlackScreen
                      ? 'text-xl sm:text-3xl md:text-4xl text-[#FF2A6D] text-glow'
                      : 'text-lg sm:text-2xl md:text-3xl text-[#F8ECFF]'
                  }`}
                >
                  "{narrative.text}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
