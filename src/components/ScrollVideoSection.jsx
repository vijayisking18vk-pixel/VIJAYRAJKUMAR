import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, RotateCcw, Play, Pause } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 136; // Extracted from WhatsApp Video 2026-09-13 at 4.33.24 AM
const SCROLL_MULTIPLIER = 5; // 500vh container height

// 4 Portal Headings from the user's uploaded image (media_1789255481324.png)
const PORTAL_HEADINGS = [
  {
    category: '01 // BACKGROUND & PHILOSOPHY',
    title: 'About & Strategic Journey',
    href: '/about/',
    badge: 'SRMIST & DBHPS Alum'
  },
  {
    category: '02 // EXPERIENCE & PLATFORMS',
    title: 'Ventures & Case Studies',
    href: '/ventures/',
    badge: 'COO & Co-Founder'
  },
  {
    category: '03 // THOUGHT LEADERSHIP',
    title: 'Writing & Strategic Research',
    href: '/writing/',
    badge: 'In-Depth Essays'
  },
  {
    category: '04 // DIRECT DISPATCH',
    title: 'Contact & Collaboration',
    href: '/contact/',
    badge: 'Response in < 48h'
  }
];

export default function ScrollVideoSection({ className = '' }) {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedIndicesRef = useRef(new Set());
  const currentFrameRef = useRef(0);
  const scrollTriggerRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playRafRef = useRef(null);
  const playLastTimeRef = useRef(0);

  // Render a specific frame onto canvas with cover fit and retina crispness
  const drawFrame = useCallback((index) => {
    currentFrameRef.current = index;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find requested frame or nearest loaded frame
    let img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let nearestImg = null;
      let minDiff = Infinity;
      for (const loadedIdx of loadedIndicesRef.current) {
        const diff = Math.abs(loadedIdx - index);
        if (diff < minDiff) {
          minDiff = diff;
          nearestImg = imagesRef.current[loadedIdx];
        }
      }
      if (nearestImg && nearestImg.complete && nearestImg.naturalWidth > 0) {
        img = nearestImg;
      } else {
        return;
      }
    }

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const scale = Math.max(w / imgW, h / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const renderX = (w - renderW) / 2;
    const renderY = (h - renderH) / 2;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, renderX, renderY, renderW, renderH);
  }, []);

  // Resize canvas according to display width, height and DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const targetWidth = Math.floor(displayWidth * dpr);
    const targetHeight = Math.floor(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload all 136 WebP frames
  useEffect(() => {
    let count = 0;
    const imgs = new Array(TOTAL_FRAMES);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/WhatsApp_Video_2026-09-13_at_4_33_24_AM_frames/frame_${numStr}.webp`;

      const frameIndex = i - 1;

      img.onload = () => {
        count++;
        loadedIndicesRef.current.add(frameIndex);
        setLoadedCount(count);

        if (frameIndex === 0 || frameIndex === currentFrameRef.current) {
          drawFrame(frameIndex);
        }
      };

      img.onerror = () => {
        count++;
        setLoadedCount(count);
      };

      imgs[frameIndex] = img;
    }

    imagesRef.current = imgs;
  }, [drawFrame]);

  // Set up GSAP ScrollTrigger pinning and scrub synchronization
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinWrapperRef.current,
        start: 'top top',
        end: `+=${(SCROLL_MULTIPLIER - 1) * 100}%`,
        scrub: 0.1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = Math.max(0, Math.min(1, self.progress));
          setScrollProgress(progress);

          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(progress * (TOTAL_FRAMES - 1))
          );

          if (targetFrame !== currentFrameRef.current) {
            drawFrame(targetFrame);
          }
        },
      });

      scrollTriggerRef.current = trigger;
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      drawFrame(currentFrameRef.current);
    }, 200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resizeCanvas);
      ctx.revert();
    };
  }, [resizeCanvas, drawFrame]);

  // Handle Manual Scrubber Drag
  const handleScrubberChange = (e) => {
    const val = parseFloat(e.target.value) / 1000;
    setScrollProgress(val);

    if (scrollTriggerRef.current) {
      const start = scrollTriggerRef.current.start;
      const end = scrollTriggerRef.current.end;
      const targetScroll = start + val * (end - start);
      window.scrollTo({ top: targetScroll, behavior: 'auto' });
    }

    const targetFrame = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(val * (TOTAL_FRAMES - 1))
    );
    drawFrame(targetFrame);
  };

  // Reset to beginning of video
  const handleReset = () => {
    if (scrollTriggerRef.current) {
      window.scrollTo({
        top: scrollTriggerRef.current.start,
        behavior: 'smooth'
      });
    }
  };

  // Toggle Auto Play Preview
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (playRafRef.current) cancelAnimationFrame(playRafRef.current);
    } else {
      setIsPlaying(true);
      playLastTimeRef.current = performance.now();
      const step = (now) => {
        const delta = (now - playLastTimeRef.current) / 1000;
        playLastTimeRef.current = now;

        setScrollProgress((prev) => {
          const next = prev + delta * (1 / 6); // 6s full sequence
          if (next >= 1) {
            setIsPlaying(false);
            return 1;
          }
          if (scrollTriggerRef.current) {
            const start = scrollTriggerRef.current.start;
            const end = scrollTriggerRef.current.end;
            window.scrollTo({ top: start + next * (end - start), behavior: 'auto' });
          }
          return next;
        });

        playRafRef.current = requestAnimationFrame(step);
      };
      playRafRef.current = requestAnimationFrame(step);
    }
  };

  const loadPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
  const isEndFrame = scrollProgress >= 0.82;

  return (
    <section
      id="scroll-video-section"
      ref={containerRef}
      className={`relative w-full bg-black ${className}`}
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
    >
      {/* GSAP Pinned Viewport */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center select-none"
      >
        {/* Full-screen Render Canvas for Frame-by-Frame Progression */}
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover pointer-events-none select-none"
        />

        {/* Minimal Initial Preloader */}
        {loadedCount < 8 && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white space-y-4 font-mono z-30 pointer-events-none">
            <div className="w-9 h-9 border-2 border-white/20 border-t-[#85A296] rounded-full animate-spin" />
            <div className="text-xs text-[#C9D6D3] uppercase tracking-widest">
              Initializing Video Frames ({loadPercent}%)
            </div>
          </div>
        )}

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none z-10" />

        {/* Subtle Scroll Hint (Fades out smoothly once user starts scrolling) */}
        <div
          className="absolute bottom-20 sm:bottom-24 inset-x-0 z-20 flex justify-center items-center font-mono text-xs pointer-events-none px-4 transition-opacity duration-300"
          style={{ opacity: scrollProgress < 0.05 ? 1 : 0 }}
        >
          <div className="flex items-center space-x-2.5 text-[#E2ECE7] bg-black/65 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#7A968B]/40 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#85A296] animate-pulse" />
            <span className="tracking-wider uppercase font-semibold text-[11px]">
              Scroll to scrub video timeline
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-[#85A296] animate-bounce" />
          </div>
        </div>

        {/* Floating HUD Controls */}
        <div
          className="absolute bottom-6 inset-x-0 z-25 flex justify-center px-4 transition-opacity duration-300 pointer-events-auto"
          style={{ opacity: isEndFrame ? 0.3 : 1 }}
        >
          <div className="flex items-center gap-3 bg-[#0C120F]/85 backdrop-blur-md px-4 py-2 rounded-full border border-[#7A968B]/30 shadow-2xl max-w-xl w-full">
            {/* Reset */}
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#C9D6D3] hover:text-white transition-colors"
              title="Reset to start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Play/Pause */}
            <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#C9D6D3] hover:text-white transition-colors"
              title={isPlaying ? "Pause" : "Play preview"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Scrubber slider */}
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max="1000"
                value={Math.round(scrollProgress * 1000)}
                onChange={handleScrubberChange}
                className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#85A296]"
              />
            </div>

            {/* Frame readout */}
            <div className="font-mono text-[11px] text-[#85A296] whitespace-nowrap pl-1">
              Frame {currentFrameRef.current + 1} / {TOTAL_FRAMES}
            </div>
          </div>
        </div>

        {/* ==========================================================================
            END FRAME HEADINGS OVERLAY (From Uploaded Image: media_1789255481324.png)
            Clickable headings only, shown separately, zero word overflow
            ========================================================================== */}
        <div
          className={`absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md transition-all duration-500 ${
            isEndFrame
              ? 'opacity-100 pointer-events-auto scale-100'
              : 'opacity-0 pointer-events-none scale-95'
          }`}
        >
          <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
            
            {/* Header Tag */}
            <div className="text-center space-y-1">
              <span className="inline-block font-mono text-xs font-semibold text-[#85A296] bg-[#85A296]/15 border border-[#85A296]/40 px-3.5 py-1 rounded-full uppercase tracking-wider">
                05 // PORTAL DIRECTORY
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                Explore Vijayrajkumar
              </h2>
            </div>

            {/* 4 Clickable Heading Cards from Uploaded Screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {PORTAL_HEADINGS.map((portal, idx) => (
                <a
                  key={idx}
                  href={portal.href}
                  className="group relative bg-[#16211C]/80 hover:bg-[#1E2E27] border border-[#7E9490]/30 hover:border-[#85A296] rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-3 text-white no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl overflow-hidden min-w-0"
                >
                  {/* Category meta badge & Arrow button */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] sm:text-xs font-semibold text-[#85A296] tracking-wider uppercase truncate">
                      {portal.category}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#85A296]/20 text-[#85A296] group-hover:bg-[#85A296] group-hover:text-black flex items-center justify-center transition-colors shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Heading Title — strictly non-overflowing */}
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight leading-snug break-words overflow-wrap-normal">
                    {portal.title}
                  </h3>

                  {/* Open Link label */}
                  <div className="pt-1 flex items-center justify-between text-xs text-[#94A8A2] group-hover:text-[#C9D6D3]">
                    <span className="font-mono text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {portal.badge}
                    </span>
                    <span className="font-medium inline-flex items-center gap-1">
                      Open page &rarr;
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Scroll continuation hint */}
            <div className="text-center pt-2">
              <span className="text-xs font-mono text-[#85A296]/80 tracking-wide">
                &darr; Scroll down to view full page details &amp; case studies
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
