import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Virtual timeline duration = 30.73s (video) + 3.0s (black screen pause) - 0.3s (start at 18.0s) = 33.43s
const TOTAL_VIRTUAL_DURATION = 33.43;

interface NarrativeState {
  text: string;
  isBlackScreen: boolean;
  videoTime: number;
}

function getNarrative(T: number): NarrativeState {
  // 0.0 to 1.5 second: 05 /04 /2005 Thoothukudi (immediate on load)
  // 1.5 to 5.3: Chennai 2008
  // 5.3 to 9.7 sec: lazy naughty but pretty good in school
  // 9.7 seconds to 16.8 seconds: everything was good until
  // 16.8 seconds to 17.7 seconds: Covid struck
  // 17.7 to 20.7 (3-sec pause): covid struck failed in exams and debarred in college (black screen, no video)
  // 20.7 to 26.6 (video 18.0 to 23.9): joined hands with bunch of friends and built unfounded things
  // 26.6 to 33.43 (video 23.9 to 30.73): Currently Ceo of three business

  if (T < 1.5) {
    return {
      text: '05 /04 /2005 Thoothukudi',
      isBlackScreen: false,
      videoTime: Math.max(T, 0.1),
    };
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
  // 18.0s to 23.9s video (virtual 20.7s to 26.6s)
  if (T < 26.6) {
    const vTime = 18.0 + (T - 20.7);
    return {
      text: 'joined hands with bunch of friends and built unfounded things',
      isBlackScreen: false,
      videoTime: vTime,
    };
  }
  // 23.9s to 30.73s video (virtual 26.6s to 33.43s)
  const vTime = Math.min(23.9 + (T - 26.6), 30.73);
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

  // Initialize with the first narrative state so content is visible IMMEDIATELY on load
  const [narrative, setNarrative] = useState<NarrativeState>({
    text: '05 /04 /2005 Thoothukudi',
    isBlackScreen: false,
    videoTime: 0.1,
  });

  const targetProgress = useRef<number>(0);
  const smoothedProgress = useRef<number>(0);

  // 1. Mobile Video Decoder Warmup & Autoplay Initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0.1;

    const primeDecoder = () => {
      video.play().then(() => {
        video.pause();
      }).catch(() => {});
    };

    if (video.readyState >= 2) {
      primeDecoder();
    } else {
      video.addEventListener('canplay', primeDecoder, { once: true });
    }

    const handleFirstTouch = () => {
      if (video.paused && video.currentTime === 0) {
        primeDecoder();
      }
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

      const video = videoRef.current;
      if (video && video.readyState >= 1) {
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
      style={{ height: '650vh' }}
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
          <video
            ref={videoRef}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              narrative.isBlackScreen ? 'opacity-0' : 'opacity-100'
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

          {/* Black round mask covering the watermark star throughout the 30s */}
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

        {/* ================= NARRATIVE TEXT (DEDICATED LOWER SCREEN PLACEMENT) ================= */}
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
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
