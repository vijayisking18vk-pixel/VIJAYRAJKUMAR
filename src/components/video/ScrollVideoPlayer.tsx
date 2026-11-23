import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Video 1 virtual duration: 30.73s (video) + 3.0s (black screen pause) - 0.3s (resume at 18.0s) = 33.43s
const V1_DURATION = 33.43;
// Video 2 actual duration: 15.04s
const V2_DURATION = 15.04;
// Combined virtual timeline duration
const TOTAL_VIRTUAL_DURATION = V1_DURATION + V2_DURATION; // 48.47s

interface NarrativeState {
  text: string;
  isBlackScreen: boolean;
  video1Time: number;
  video2Time: number;
  activeVideo: 1 | 2;
  showTimer: boolean;
}

function formatTimer(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  const ms = Math.floor((sec % 1) * 10);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms}`;
}

function getNarrative(T: number): NarrativeState {
  // If T <= V1_DURATION (33.43s), Video 1 is active
  if (T <= V1_DURATION) {
    if (T < 1.5) {
      return {
        text: '05 /04 /2005 Thoothukudi',
        isBlackScreen: false,
        video1Time: Math.max(T, 0.1),
        video2Time: 0,
        activeVideo: 1,
        showTimer: false,
      };
    }
    if (T < 5.3) {
      return {
        text: 'Chennai 2008',
        isBlackScreen: false,
        video1Time: T,
        video2Time: 0,
        activeVideo: 1,
        showTimer: false,
      };
    }
    if (T < 9.7) {
      return {
        text: 'lazy naughty but pretty good in school',
        isBlackScreen: false,
        video1Time: T,
        video2Time: 0,
        activeVideo: 1,
        showTimer: false,
      };
    }
    if (T < 16.8) {
      return {
        text: 'everything was good until',
        isBlackScreen: false,
        video1Time: T,
        video2Time: 0,
        activeVideo: 1,
        showTimer: false,
      };
    }
    if (T < 17.7) {
      return {
        text: 'Covid struck',
        isBlackScreen: false,
        video1Time: T,
        video2Time: 0,
        activeVideo: 1,
        showTimer: false,
      };
    }
    // 3-second black screen pause (video holds at 17.7s and is completely hidden)
    if (T < 20.7) {
      return {
        text: 'covid struck failed in exams and debarred in college',
        isBlackScreen: true,
        video1Time: 17.7,
        video2Time: 0,
        activeVideo: 1,
        showTimer: false,
      };
    }
    // 18.0s to 23.9s video (virtual 20.7s to 26.6s)
    if (T < 26.6) {
      const vTime = 18.0 + (T - 20.7);
      return {
        text: 'joined hands with bunch of friends and built unfounded things',
        isBlackScreen: false,
        video1Time: vTime,
        video2Time: 0,
        activeVideo: 1,
        showTimer: false,
      };
    }
    // 23.9s to 30.73s video (virtual 26.6s to 33.43s)
    const vTime = Math.min(23.9 + (T - 26.6), 30.73);
    return {
      text: 'Currently Ceo of three business',
      isBlackScreen: false,
      video1Time: vTime,
      video2Time: 0,
      activeVideo: 1,
      showTimer: false,
    };
  }

  // When T > V1_DURATION (33.43s), Video 2 is active with live timer
  const v2Time = Math.min(Math.max(T - V1_DURATION, 0), V2_DURATION);
  return {
    text: '',
    isBlackScreen: false,
    video1Time: 30.73,
    video2Time: v2Time,
    activeVideo: 2,
    showTimer: true,
  };
}

export const ScrollVideoPlayer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const rafId = useRef<number | null>(null);

  // Initialize with the first narrative state so content is visible IMMEDIATELY on load
  const [narrative, setNarrative] = useState<NarrativeState>({
    text: '05 /04 /2005 Thoothukudi',
    isBlackScreen: false,
    video1Time: 0.1,
    video2Time: 0,
    activeVideo: 1,
    showTimer: false,
  });

  const targetProgress = useRef<number>(0);
  const smoothedProgress = useRef<number>(0);

  // 1. Mobile Video Decoder Warmup & Autoplay Initialization for both videos
  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    if (!video1 || !video2) return;

    video1.currentTime = 0.1;
    video2.currentTime = 0.01;

    const primeDecoder = () => {
      video1.play().then(() => video1.pause()).catch(() => {});
      video2.play().then(() => video2.pause()).catch(() => {});
    };

    if (video1.readyState >= 2 && video2.readyState >= 2) {
      primeDecoder();
    } else {
      video1.addEventListener('canplay', primeDecoder, { once: true });
      video2.addEventListener('canplay', primeDecoder, { once: true });
    }

    const handleFirstTouch = () => {
      primeDecoder();
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
    };
    window.addEventListener('touchstart', handleFirstTouch, { passive: true });
    window.addEventListener('click', handleFirstTouch, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
    };
  }, []);

  // 2. Multi-Platform Scroll & Touch Handlers
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
      targetProgress.current = progress;
    };

    const handleWheel = (e: WheelEvent) => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const delta = e.deltaY * 0.0006;
      targetProgress.current = Math.min(Math.max(targetProgress.current + delta, 0), 1);
      window.scrollTo({ top: targetProgress.current * totalScroll });
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      touchStartY = currentY;

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const delta = (deltaY / window.innerHeight) * 0.8;
      targetProgress.current = Math.min(Math.max(targetProgress.current + delta, 0), 1);
      window.scrollTo({ top: targetProgress.current * totalScroll });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // 3. Smooth Damped Scrub Loop in RAF (60-120fps)
  useEffect(() => {
    let lastTime = performance.now();

    const updateScrub = (now: number) => {
      const deltaSec = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const factor = 1.0 - Math.exp(-14.0 * deltaSec);
      smoothedProgress.current += (targetProgress.current - smoothedProgress.current) * factor;

      const currentVirtualT = smoothedProgress.current * TOTAL_VIRTUAL_DURATION;
      const state = getNarrative(currentVirtualT);
      setNarrative(state);

      const video1 = video1Ref.current;
      const video2 = video2Ref.current;

      if (state.activeVideo === 1) {
        if (video1 && video1.readyState >= 1) {
          if (!video1.seeking && Math.abs(video1.currentTime - state.video1Time) > 0.02) {
            if ('fastSeek' in video1 && typeof (video1 as any).fastSeek === 'function') {
              (video1 as any).fastSeek(state.video1Time);
            } else {
              video1.currentTime = state.video1Time;
            }
          }
        }
      } else {
        if (video2 && video2.readyState >= 1) {
          if (!video2.seeking && Math.abs(video2.currentTime - state.video2Time) > 0.02) {
            if ('fastSeek' in video2 && typeof (video2 as any).fastSeek === 'function') {
              (video2 as any).fastSeek(state.video2Time);
            } else {
              video2.currentTime = state.video2Time;
            }
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
      style={{ height: '950vh' }}
    >
      {/* ================= FIXED IMMERSIVE VIEWPORT (100dvh) ================= */}
      <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden flex flex-col items-center justify-center bg-[#020005] z-10 pointer-events-none px-0 sm:px-6">
        
        {/* ================= MINIMAL HEADER: ONLY vijayrajkumar ================= */}
        <div className="absolute top-5 left-5 sm:top-8 sm:left-10 z-30 pointer-events-none select-none">
          <span className="font-mono text-xs sm:text-sm tracking-widest text-[#F8ECFF] uppercase opacity-85 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            vijayrajkumar
          </span>
        </div>

        {/* ================= MOBILE-OPTIMIZED 16:9 VIDEO CONTAINER ================= */}
        {/* Preserves respected 16:9 aspect ratio on mobile so zero content is cropped */}
        <div className="relative w-full max-w-5xl aspect-video max-h-[60vh] sm:max-h-[75vh] flex items-center justify-center overflow-hidden z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          
          {/* Video 1 (Original Narrative Video) */}
          <video
            ref={video1Ref}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
              narrative.activeVideo === 1 && !narrative.isBlackScreen
                ? 'opacity-100 z-10'
                : 'opacity-0 pointer-events-none z-0'
            }`}
            playsInline
            muted
            autoPlay
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src="/video/scroll-animation.mp4" type="video/mp4" />
            <source src="https://v1.pinimg.com/videos/iht/expMp4/b9/f2/e5/b9f2e59139cc31d145835f884aa0dd52_720w.mp4" type="video/mp4" />
          </video>

          {/* Video 2 (Second Uploaded Pinterest Video) */}
          <video
            ref={video2Ref}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
              narrative.activeVideo === 2
                ? 'opacity-100 z-10'
                : 'opacity-0 pointer-events-none z-0'
            }`}
            playsInline
            muted
            autoPlay
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src="/video/scroll-animation-2.mp4" type="video/mp4" />
            <source src="https://v1.pinimg.com/videos/iht/expMp4/8c/88/80/8c8880b1b7edb801e7770e8be0aa953e_720w.mp4" type="video/mp4" />
          </video>

          {/* Black round mask covering the watermark star throughout both videos */}
          <div
            className="absolute pointer-events-none z-20 rounded-full bg-black shadow-[0_0_6px_2px_#000000]"
            style={{
              left: '90.56%',
              top: '83.21%',
              width: '4.8%',
              aspectRatio: '1 / 1',
              transform: 'translate(-50%, -50%)',
            }}
            aria-hidden="true"
          />

          {/* Pure Black screen overlay during pause ("no video only text") */}
          <div
            className={`absolute inset-0 bg-[#020005] z-20 pointer-events-none transition-opacity duration-300 ${
              narrative.isBlackScreen ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Subtle Vignette for clean framing */}
        <div className="absolute inset-0 pointer-events-none z-25 bg-[radial-gradient(ellipse_at_center,transparent_75%,#020005_100%)]" />

        {/* ================= NARRATIVE TEXT / VIDEO 2 TIMER ================= */}
        {/* Lifted higher up from screen bottom for superior mobile and desktop readability */}
        <div className="absolute inset-x-0 bottom-[16vh] sm:bottom-14 md:bottom-16 z-30 flex justify-center items-center px-6 pointer-events-none select-none">
          <AnimatePresence mode="wait">
            {narrative.text && (
              <motion.div
                key={narrative.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="text-center max-w-2xl px-2"
              >
                <p
                  className={`font-editorial font-light tracking-wide drop-shadow-[0_2px_14px_rgba(0,0,0,1)] ${
                    narrative.isBlackScreen
                      ? 'text-lg sm:text-2xl md:text-3xl text-[#FF2A6D]'
                      : 'text-base sm:text-2xl md:text-3xl text-[#F8ECFF]'
                  }`}
                >
                  "{narrative.text}"
                </p>
              </motion.div>
            )}

            {narrative.showTimer && (
              <motion.div
                key="video2-timer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#020005]/85 border border-white/20 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
                  <span className="font-mono text-sm sm:text-base tracking-widest text-[#F8ECFF]">
                    {formatTimer(narrative.video2Time)} / {formatTimer(V2_DURATION)}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
