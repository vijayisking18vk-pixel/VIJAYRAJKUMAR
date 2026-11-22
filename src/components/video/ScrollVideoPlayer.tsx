import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface Chapter {
  id: number;
  timeRange: [number, number];
  label: string;
  title: string;
  subtitle: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    timeRange: [0, 5.2],
    label: '01 // THE AWAKENING',
    title: 'FRACTAL GAZE',
    subtitle: 'From the deepest void, electric-violet eyes breach the dark.',
  },
  {
    id: 2,
    timeRange: [5.2, 12.4],
    label: '02 // THE FAMILIAR',
    title: 'NOCTURNAL SHADOW',
    subtitle: 'A quiet, stoic sentinel watching through the purple storm.',
  },
  {
    id: 3,
    timeRange: [12.4, 17.67],
    label: '03 // THE ROOFTOP VOID',
    title: 'CELESTIAL HORIZON',
    subtitle: 'Perched above the city lights, gazing at crescent moons in the violet sky.',
  },
];

export const ScrollVideoPlayer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafId = useRef<number | null>(null);

  const [duration, setDuration] = useState<number>(17.67);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showHUD, setShowHUD] = useState<boolean>(true);

  const targetProgress = useRef<number>(0);
  const smoothedProgress = useRef<number>(0);

  // Determine current chapter
  const currentChapter = CHAPTERS.find(
    (c) => currentTime >= c.timeRange[0] && currentTime <= c.timeRange[1]
  ) || CHAPTERS[0];

  // 1. Video Metadata & Initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
        setDuration(video.duration);
      }
      setIsLoaded(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // 2. Native Window Scroll Listener mapping window scrollY to 0..1
  useEffect(() => {
    const handleScroll = () => {
      if (isPlaying) return;

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
      targetProgress.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying]);

  // 3. Smooth Damped Scrub Loop in RAF (60-120fps)
  useEffect(() => {
    let lastTime = performance.now();

    const updateScrub = (now: number) => {
      const deltaSec = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const video = videoRef.current;

      if (!isPlaying && video && duration > 0) {
        // Snappy exponential damp towards target progress
        const factor = 1.0 - Math.exp(-14.0 * deltaSec);
        smoothedProgress.current += (targetProgress.current - smoothedProgress.current) * factor;

        const targetTime = smoothedProgress.current * duration;

        // Throttled seek threshold to keep hardware decoder silky smooth
        if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.02) {
          if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
            (video as any).fastSeek(targetTime);
          } else {
            video.currentTime = targetTime;
          }
        }

        setCurrentTime(video.currentTime);
        setScrollProgress(smoothedProgress.current);
      } else if (isPlaying && video) {
        setCurrentTime(video.currentTime);
        if (duration > 0) {
          const p = video.currentTime / duration;
          setScrollProgress(p);
          smoothedProgress.current = p;
          targetProgress.current = p;
        }
      }

      rafId.current = requestAnimationFrame(updateScrub);
    };

    rafId.current = requestAnimationFrame(updateScrub);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [duration, isPlaying]);

  // 4. Toggle Play/Scrub
  const handleTogglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: (video.currentTime / duration) * totalScroll, behavior: 'instant' });
    } else {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.log('Autoplay prevented:', e));
    }
  }, [isPlaying, duration]);

  // Jump to Chapter Milestone
  const handleJumpToChapter = useCallback((chapter: Chapter) => {
    const targetT = chapter.timeRange[0] + 0.1;
    const p = targetT / duration;
    targetProgress.current = p;

    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: p * totalScroll, behavior: 'smooth' });
  }, [duration]);

  // Restart to beginning
  const handleRestart = useCallback(() => {
    targetProgress.current = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#020005] text-[#F8ECFF] select-none"
      style={{ height: '450vh' }} // 450vh native scroll track
    >
      {/* ================= FIXED IMMERSIVE 100dvh VIEWPORT (Never scrolls away) ================= */}
      <div
        className="fixed inset-0 w-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-[#020005] z-10"
      >
        {/* Background Ambient Glow derived from video colors */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(157,0,255,0.18)_0%,_rgba(11,1,26,0.5)_60%,_#020005_100%)] z-0" />

        {/* Video Element (Hardware Accelerated, Mobile-Optimized) */}
        <video
          ref={videoRef}
          src="/video/scroll-animation.mp4"
          className={`relative z-10 transition-all duration-300 ${
            fitMode === 'cover'
              ? 'w-full h-full object-cover object-center'
              : 'max-w-full max-h-full object-contain'
          }`}
          playsInline
          muted={isMuted}
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
        />

        {/* Cinematic Film Grain & CRT Scanline Accents */}
        <div className="film-grain fixed inset-0 pointer-events-none z-20 opacity-30" />
        <div className="crt-scanlines fixed inset-0 pointer-events-none z-20 opacity-25" />

        {/* Edge Vignette overlay for seamless blend on any screen ratio */}
        <div className="absolute inset-0 pointer-events-none z-15 bg-[radial-gradient(ellipse_at_center,transparent_60%,#020005_100%)]" />

        {/* ================= MINIMALIST HUD OVERLAYS ================= */}
        <AnimatePresence>
          {showHUD && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-4 sm:p-8"
            >
              {/* TOP BAR */}
              <div className="flex items-center justify-between w-full pointer-events-auto">
                {/* Brand Identity / Chapter Indicator */}
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-[#D147FF] animate-pulse shadow-[0_0_8px_#D147FF]" />
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#F8ECFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    R. VIJAYRAJKUMAR // OBSIDIAN
                  </span>
                </div>

                {/* Controls: Fit Mode, Play/Pause, Mute, Restart */}
                <div className="flex items-center space-x-2 sm:space-x-3 font-mono text-xs">
                  {/* Fit Mode Toggle (Fill vs Letterbox) */}
                  <button
                    onClick={() => setFitMode(fitMode === 'cover' ? 'contain' : 'cover')}
                    className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded bg-[#0B011A]/80 border border-[#9D00FF]/40 text-[#F8ECFF] hover:border-[#D147FF] hover:bg-[#9D00FF]/20 transition-all backdrop-blur-md shadow-lg"
                    title={fitMode === 'cover' ? 'Switch to Full Fit (Letterbox)' : 'Switch to Fill View'}
                  >
                    {fitMode === 'cover' ? (
                      <>
                        <Minimize2 className="w-3.5 h-3.5 text-[#D147FF]" />
                        <span className="hidden sm:inline">FIT: FILL</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3.5 h-3.5 text-[#D147FF]" />
                        <span className="hidden sm:inline">FIT: FIT</span>
                      </>
                    )}
                  </button>

                  {/* Play / Scrub Mode Toggle */}
                  <button
                    onClick={handleTogglePlay}
                    className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded bg-[#0B011A]/80 border border-[#9D00FF]/40 text-[#F8ECFF] hover:border-[#D147FF] hover:bg-[#9D00FF]/20 transition-all backdrop-blur-md shadow-lg"
                    title={isPlaying ? 'Pause auto-play (Scroll to scrub)' : 'Auto-play video'}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#D147FF]" />
                        <span className="hidden sm:inline">PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-[#D147FF]" />
                        <span className="hidden sm:inline">PLAY</span>
                      </>
                    )}
                  </button>

                  {/* Audio Mute Toggle */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded bg-[#0B011A]/80 border border-[#9D00FF]/40 text-[#A89BB9] hover:text-[#F8ECFF] transition-all backdrop-blur-md shadow-lg"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-[#D147FF]" />
                    )}
                  </button>

                  {/* Restart */}
                  <button
                    onClick={handleRestart}
                    className="p-1.5 rounded bg-[#0B011A]/80 border border-[#9D00FF]/40 text-[#A89BB9] hover:text-[#F8ECFF] transition-all backdrop-blur-md shadow-lg"
                    title="Restart from Beginning"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* RIGHT-EDGE CHAPTER MILESTONES (Desktop) */}
              <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col items-end space-y-4 pointer-events-auto">
                {CHAPTERS.map((chapter) => {
                  const isActive = currentChapter.id === chapter.id;
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => handleJumpToChapter(chapter)}
                      className="group flex items-center space-x-2.5 cursor-pointer focus:outline-none"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] tracking-wider text-[#A89BB9] whitespace-nowrap bg-[#020005]/80 px-2 py-0.5 rounded border border-[#9D00FF]/30">
                        {chapter.title}
                      </span>
                      <div
                        className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                          isActive
                            ? 'w-3.5 h-3.5 border-2 border-[#D147FF] shadow-[0_0_10px_#D147FF] bg-[#D147FF]/30'
                            : 'w-1.5 h-1.5 bg-[#A89BB9]/40 group-hover:bg-[#9D00FF]'
                        }`}
                      >
                        {isActive && <div className="w-1 h-1 rounded-full bg-[#FFFFFF]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* BOTTOM CENTER CINEMA SUBTITLE & SCRUBBER */}
              <div className="flex flex-col items-center w-full max-w-2xl mx-auto pointer-events-auto">
                {/* Cinema Subtitle Quote */}
                <div className="text-center mb-4 px-4">
                  <span className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#9D00FF] mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {currentChapter.label} // {currentChapter.title}
                  </span>
                  <p className="font-editorial text-sm sm:text-lg md:text-xl font-light text-[#F8ECFF] tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    "{currentChapter.subtitle}"
                  </p>
                </div>

                {/* Hairline Progress Scrubber Bar */}
                <div className="w-full flex items-center space-x-3 px-2 font-mono text-[10px] sm:text-xs text-[#A89BB9]">
                  {/* Time indicator */}
                  <span className="w-12 text-right">
                    {currentTime.toFixed(1)}s
                  </span>

                  {/* Interactive timeline bar */}
                  <div
                    className="relative flex-1 h-1 bg-[#1A0028] rounded-full overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const ratio = Math.max(0, Math.min(clickX / rect.width, 1));
                      targetProgress.current = ratio;
                      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
                      window.scrollTo({ top: ratio * totalScroll, behavior: 'smooth' });
                    }}
                  >
                    {/* Chapter divider ticks */}
                    {CHAPTERS.map((c) => (
                      <div
                        key={c.id}
                        className="absolute top-0 bottom-0 w-[1px] bg-white/30 z-10"
                        style={{ left: `${(c.timeRange[0] / duration) * 100}%` }}
                      />
                    ))}

                    {/* Progress fill */}
                    <div
                      className="h-full bg-gradient-to-r from-[#9D00FF] via-[#D147FF] to-[#F8ECFF] rounded-full transition-all duration-75 shadow-[0_0_8px_#D147FF]"
                      style={{ width: `${scrollProgress * 100}%` }}
                    />
                  </div>

                  {/* Total duration */}
                  <span className="w-12">
                    {duration.toFixed(1)}s
                  </span>
                </div>

                {/* Micro Scroll Hint */}
                <div className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest text-[#A89BB9]/60">
                  {isPlaying ? '▶ Auto-playing — Click pause to scrub' : '↓ Scroll or swipe to scrub frame-by-frame'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
