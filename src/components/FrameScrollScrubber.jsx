import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';

const TOTAL_FRAMES = 106; // 1 to 106 extracted from ezgif-47e887520ab47aeb-jpg.zip

export default function FrameScrollScrubber({ className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const currentFrameRef = useRef(0);
  const isTickingRef = useRef(false);
  const rafIdRef = useRef(null);

  // Preload all 106 frames into memory
  useEffect(() => {
    let count = 0;
    const imgs = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${numStr}.jpg`;

      img.onload = () => {
        count++;
        setLoadedCount(count);
        if (count === 1) {
          // Render first frame immediately once it arrives
          renderFrame(0, imgs);
        }
        if (count >= TOTAL_FRAMES) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        count++;
        setLoadedCount(count);
        if (count >= TOTAL_FRAMES) {
          setIsReady(true);
        }
      };

      imgs.push(img);
    }

    imagesRef.current = imgs;
  }, []);

  // Draw frame onto full-screen canvas preserving aspect ratio
  const renderFrame = (index, imgs = imagesRef.current) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imgs[index];
    if (!img || !img.complete || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Calculate aspect fill cover dimensions
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const scale = Math.max(displayWidth / imgWidth, displayHeight / imgHeight);
    const renderW = imgWidth * scale;
    const renderH = imgHeight * scale;
    const renderX = (displayWidth - renderW) / 2;
    const renderY = (displayHeight - renderH) / 2;

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, renderX, renderY, renderW, renderH);
    ctx.restore();
  };

  // Scroll mapping logic
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;

    const sectionScrollableDistance = sectionHeight - windowHeight;
    if (sectionScrollableDistance <= 0) return;

    // Calculate progress between 0 and 1
    const rawProgress = -sectionTop / sectionScrollableDistance;
    const scrollProgress = Math.max(0, Math.min(1, rawProgress));

    const targetFrame = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(scrollProgress * (TOTAL_FRAMES - 1))
    );

    if (targetFrame !== currentFrameRef.current) {
      currentFrameRef.current = targetFrame;
      renderFrame(targetFrame);
    }

    isTickingRef.current = false;
  }, []);

  // Scroll and resize listener throttled with requestAnimationFrame
  useEffect(() => {
    const onScroll = () => {
      if (!isTickingRef.current) {
        isTickingRef.current = true;
        rafIdRef.current = requestAnimationFrame(handleScroll);
      }
    };

    const onResize = () => {
      renderFrame(currentFrameRef.current);
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Initial check
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll]);

  const loadPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  return (
    <section
      id="cinematic-story"
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: '350vh' }}
    >
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        {/* Hardware-accelerated High-DPI Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block select-none pointer-events-none"
          style={{ width: '100vw', height: '100vh' }}
        />

        {/* Loading Overlay */}
        {!isReady && loadedCount < 10 && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white space-y-4 font-mono z-30">
            <div className="w-10 h-10 border-2 border-white/20 border-t-[#85A296] rounded-full animate-spin" />
            <div className="text-xs text-[#C9D6D3] uppercase tracking-widest">
              Initializing Frames ({loadPercent}%)
            </div>
          </div>
        )}

        {/* Subtle Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-10" />

        {/* Interactive Scroll Indicator */}
        <div className="absolute bottom-8 inset-x-0 z-20 flex justify-center items-center font-mono text-xs pointer-events-none px-4">
          <div className="flex items-center space-x-2.5 text-[#E2ECE7] bg-black/65 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#7A968B]/40 shadow-2xl">
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
