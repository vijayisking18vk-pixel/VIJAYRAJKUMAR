import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 136; // Extracted from WhatsApp Video 2026-09-13 at 4.33.24 AM
const SCROLL_MULTIPLIER = 5; // 500vh container height

// 4 Portal Headings (Headings only: 2 on the left, 2 on the right)
const PORTALS_LEFT = [
  {
    category: '01 // PHILOSOPHY',
    title: 'About & Strategic Journey',
    href: '/about/',
  },
  {
    category: '02 // VENTURES',
    title: 'Ventures & Case Studies',
    href: '/ventures/',
  }
];

const PORTALS_RIGHT = [
  {
    category: '03 // RESEARCH',
    title: 'Writing & Strategic Research',
    href: '/writing/',
  },
  {
    category: '04 // DISPATCH',
    title: 'Contact & Collaboration',
    href: '/contact/',
  }
];

export default function ScrollVideoSection({ className = '' }) {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const mainCanvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedIndicesRef = useRef(new Set());
  const currentFrameRef = useRef(0);
  const scrollTriggerRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Render a specific frame onto both main and ambient background canvases
  const drawFrame = useCallback((index) => {
    currentFrameRef.current = index;
    const mainCanvas = mainCanvasRef.current;
    if (!mainCanvas) return;

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

    const imgW = img.naturalWidth || 502;
    const imgH = img.naturalHeight || 848;
    const isDesktop = window.innerWidth >= 768;

    // 1. Draw dynamic ambient background on desktop/laptop widescreen
    const bgCanvas = bgCanvasRef.current;
    if (bgCanvas && isDesktop) {
      const bgCtx = bgCanvas.getContext('2d', { alpha: false });
      if (bgCtx) {
        const bgW = bgCanvas.width;
        const bgH = bgCanvas.height;
        const bgScale = Math.max(bgW / imgW, bgH / imgH);
        const bgRenderW = imgW * bgScale;
        const bgRenderH = imgH * bgScale;
        const bgRenderX = (bgW - bgRenderW) / 2;
        const bgRenderY = (bgH - bgRenderH) / 2;

        bgCtx.drawImage(img, bgRenderX, bgRenderY, bgRenderW, bgRenderH);
      }
    }

    // 2. Draw crisp main video frame (fully contained on desktop/laptop, full bleed on mobile)
    const mainCtx = mainCanvas.getContext('2d');
    if (!mainCtx) return;

    const cw = mainCanvas.width;
    const ch = mainCanvas.height;
    if (cw === 0 || ch === 0) return;

    // On desktop/laptop: Math.min ensures 100% of the vertical video is visible without cropping
    // On mobile screens: Math.max provides an immersive full-screen edge-to-edge experience
    const scale = isDesktop
      ? Math.min(cw / imgW, ch / imgH)
      : Math.max(cw / imgW, ch / imgH);

    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const renderX = (cw - renderW) / 2;
    const renderY = (ch - renderH) / 2;

    mainCtx.clearRect(0, 0, cw, ch);
    mainCtx.drawImage(img, renderX, renderY, renderW, renderH);
  }, []);

  // Resize canvas according to display width, height and DPR
  const resizeCanvas = useCallback(() => {
    const mainCanvas = mainCanvasRef.current;
    const videoWrapper = videoWrapperRef.current;
    if (!mainCanvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
    const isDesktop = displayWidth >= 768;

    let targetWidth = displayWidth;
    let targetHeight = displayHeight;

    if (isDesktop && videoWrapper) {
      const rect = videoWrapper.getBoundingClientRect();
      targetWidth = Math.round(rect.width) || displayWidth;
      targetHeight = Math.round(rect.height) || displayHeight;
    }

    const canvasW = Math.max(1, Math.floor(targetWidth * dpr));
    const canvasH = Math.max(1, Math.floor(targetHeight * dpr));

    if (mainCanvas.width !== canvasW || mainCanvas.height !== canvasH) {
      mainCanvas.width = canvasW;
      mainCanvas.height = canvasH;
    }

    const mainCtx = mainCanvas.getContext('2d');
    if (mainCtx) {
      mainCtx.imageSmoothingEnabled = true;
      mainCtx.imageSmoothingQuality = 'high';
    }

    // Low-res ambient background canvas for buttery smooth performance
    const bgCanvas = bgCanvasRef.current;
    if (bgCanvas && isDesktop) {
      const bgW = Math.max(160, Math.floor(displayWidth / 4));
      const bgH = Math.max(90, Math.floor(displayHeight / 4));
      if (bgCanvas.width !== bgW || bgCanvas.height !== bgH) {
        bgCanvas.width = bgW;
        bgCanvas.height = bgH;
      }
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

  const loadPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
  const isEndFrame = scrollProgress >= 0.75;

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
        {/* ==========================================================================
            AMBIENT LIGHTING BACKDROP
            Dynamically projects the video's color palette across widescreen displays
            ========================================================================== */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
          <canvas
            ref={bgCanvasRef}
            className="w-full h-full object-cover filter blur-[70px] opacity-40 scale-110 pointer-events-none"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        </div>

        {/* Minimal Initial Preloader */}
        {loadedCount < 8 && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white space-y-4 font-mono z-30 pointer-events-none">
            <div className="w-9 h-9 border-2 border-white/20 border-t-[#85A296] rounded-full animate-spin" />
            <div className="text-xs text-[#C9D6D3] uppercase tracking-widest">
              Initializing Video ({loadPercent}%)
            </div>
          </div>
        )}

        {/* ==========================================================================
            UNIFIED CENTER STAGE (Desktop & Mobile)
            Zero separate overlay! Video in the center, 2 boxes on the left, 2 on the right!
            Headings only! Native resolution, zero distortion, zero cut-off!
            ========================================================================== */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-3.5 md:gap-6 lg:gap-10 w-full max-w-7xl mx-auto px-4 lg:px-8 h-full pt-12 md:pt-0">
          
          {/* DESKTOP: 2 Boxes on the Left */}
          <div
            className={`hidden md:flex flex-col justify-center gap-4 lg:gap-5 w-56 lg:w-72 transition-all duration-700 ${
              isEndFrame
                ? 'opacity-100 translate-x-0 pointer-events-auto'
                : 'opacity-0 -translate-x-8 pointer-events-none'
            }`}
          >
            {PORTALS_LEFT.map((portal, idx) => (
              <a
                key={idx}
                href={portal.href}
                className="group relative bg-[#121C17]/90 hover:bg-[#1A2A22] border border-[#7A968B]/35 hover:border-[#85A296] rounded-2xl p-4 lg:p-5 flex flex-col gap-2 text-white no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] lg:text-[11px] font-semibold text-[#85A296] tracking-wider uppercase truncate">
                    {portal.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#85A296] group-hover:text-white transition-colors shrink-0" />
                </div>
                <h3 className="text-sm lg:text-base font-bold text-white tracking-tight leading-snug group-hover:text-[#E2ECE7]">
                  {portal.title}
                </h3>
              </a>
            ))}
          </div>

          {/* Center Video Frame: Native 502/848 ratio, razor-sharp on both desktop & mobile */}
          <div
            ref={videoWrapperRef}
            className="relative flex-shrink-0 h-[48vh] md:h-[78vh] lg:h-[82vh] max-h-[820px] aspect-[502/848] rounded-2xl md:rounded-3xl overflow-hidden border border-[#7A968B]/35 shadow-[0_25px_70px_rgba(0,0,0,0.9)] ring-1 ring-white/10 flex items-center justify-center transition-all duration-300"
          >
            <canvas
              ref={mainCanvasRef}
              className="block w-full h-full object-contain pointer-events-none select-none"
            />
          </div>

          {/* DESKTOP: 2 Boxes on the Right */}
          <div
            className={`hidden md:flex flex-col justify-center gap-4 lg:gap-5 w-56 lg:w-72 transition-all duration-700 ${
              isEndFrame
                ? 'opacity-100 translate-x-0 pointer-events-auto'
                : 'opacity-0 translate-x-8 pointer-events-none'
            }`}
          >
            {PORTALS_RIGHT.map((portal, idx) => (
              <a
                key={idx}
                href={portal.href}
                className="group relative bg-[#121C17]/90 hover:bg-[#1A2A22] border border-[#7A968B]/35 hover:border-[#85A296] rounded-2xl p-4 lg:p-5 flex flex-col gap-2 text-white no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] lg:text-[11px] font-semibold text-[#85A296] tracking-wider uppercase truncate">
                    {portal.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#85A296] group-hover:text-white transition-colors shrink-0" />
                </div>
                <h3 className="text-sm lg:text-base font-bold text-white tracking-tight leading-snug group-hover:text-[#E2ECE7]">
                  {portal.title}
                </h3>
              </a>
            ))}
          </div>

          {/* MOBILE: 4 Boxes Grid (2 on the Left, 2 on the Right, Headings only) */}
          <div
            className={`grid md:hidden grid-cols-2 gap-2 w-full max-w-sm transition-all duration-500 ${
              isEndFrame
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            {/* Left Column (2 Boxes) */}
            <div className="flex flex-col gap-2">
              {PORTALS_LEFT.map((portal, idx) => (
                <a
                  key={idx}
                  href={portal.href}
                  className="group bg-[#121C17]/95 border border-[#7A968B]/35 rounded-xl p-2.5 flex flex-col gap-1 text-white no-underline active:scale-95 transition-all"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[9px] font-semibold text-[#85A296] uppercase truncate">
                      {portal.category}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#85A296] shrink-0" />
                  </div>
                  <h3 className="text-[11px] font-bold text-white leading-tight line-clamp-2">
                    {portal.title}
                  </h3>
                </a>
              ))}
            </div>

            {/* Right Column (2 Boxes) */}
            <div className="flex flex-col gap-2">
              {PORTALS_RIGHT.map((portal, idx) => (
                <a
                  key={idx}
                  href={portal.href}
                  className="group bg-[#121C17]/95 border border-[#7A968B]/35 rounded-xl p-2.5 flex flex-col gap-1 text-white no-underline active:scale-95 transition-all"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[9px] font-semibold text-[#85A296] uppercase truncate">
                      {portal.category}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[#85A296] shrink-0" />
                  </div>
                  <h3 className="text-[11px] font-bold text-white leading-tight line-clamp-2">
                    {portal.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
