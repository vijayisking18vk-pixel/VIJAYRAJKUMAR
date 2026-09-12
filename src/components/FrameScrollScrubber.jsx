import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 106; // ezgif-frame-001.jpg to ezgif-frame-106.jpg

export default function FrameScrollScrubber({ className = '' }) {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedIndicesRef = useRef(new Set());
  const currentFrameRef = useRef(0);
  const scrollTriggerRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Preload all 106 frames progressively
  useEffect(() => {
    let count = 0;
    const imgs = new Array(TOTAL_FRAMES);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${numStr}.jpg`;

      const frameIndex = i - 1;

      img.onload = () => {
        count++;
        loadedIndicesRef.current.add(frameIndex);
        setLoadedCount(count);

        // If this is frame 0 or the currently targeted frame, render immediately
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
        end: '+=350%',
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

    // Refresh ScrollTrigger after slight delay to ensure layout is measured accurately
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

  const loadPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  return (
    <section
      id="cinematic-story"
      ref={containerRef}
      className={`relative w-full bg-black ${className}`}
      style={{ height: '450vh' }}
    >
      {/* GSAP Pinned Viewport */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center select-none"
      >
        {/* Full-screen Render Canvas */}
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover pointer-events-none select-none"
        />

        {/* Minimal Initial Preloader (only until first 5 frames are ready) */}
        {loadedCount < 5 && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white space-y-4 font-mono z-30 pointer-events-none">
            <div className="w-9 h-9 border-2 border-white/20 border-t-[#85A296] rounded-full animate-spin" />
            <div className="text-xs text-[#C9D6D3] uppercase tracking-widest">
              Loading Sequence ({loadPercent}%)
            </div>
          </div>
        )}

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none z-10" />

        {/* Subtle Scroll Hint (Fades out smoothly once user starts scrolling) */}
        <div
          className="absolute bottom-8 inset-x-0 z-20 flex justify-center items-center font-mono text-xs pointer-events-none px-4 transition-opacity duration-300"
          style={{ opacity: scrollProgress < 0.08 ? 1 : 0 }}
        >
          <div className="flex items-center space-x-2.5 text-[#E2ECE7] bg-black/60 backdrop-blur-md px-5 py-2 rounded-full border border-[#7A968B]/30 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#85A296] animate-pulse" />
            <span className="tracking-wider uppercase font-semibold text-[11px]">
              Scroll to scrub timeline
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-[#85A296] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
