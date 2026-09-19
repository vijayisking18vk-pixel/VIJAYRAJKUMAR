import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface ParallaxLayer {
  src: string;
  alt: string;
  speedX: number;
  speedY: number;
  speedZ: number;
  rotation: number;
  distance: number;
  className?: string;
  zIndex: number;
  initialTop: string;
  initialLeft: string;
  width: string;
  deferred?: boolean;
}

export interface ParallaxHeroProps {
  layers?: ParallaxLayer[];
  title?: string;
  className?: string;
}

export const defaultLayers: ParallaxLayer[] = [
  {
    src: '/parallax/layer_01_bg.webp',
    alt: 'background',
    speedX: 0.03,
    speedY: 0.038,
    speedZ: 0,
    rotation: 0,
    distance: -200,
    zIndex: 1,
    initialTop: 'calc(50% - 50px)',
    initialLeft: 'calc(50% + 0px)',
    width: '3200px',
  },
  {
    src: '/parallax/layer_02_fog7.webp',
    alt: 'fog-7',
    speedX: 0.27,
    speedY: 0.32,
    speedZ: 0,
    rotation: 0,
    distance: 850,
    zIndex: 2,
    initialTop: 'calc(50% - 100px)',
    initialLeft: 'calc(50% + 300px)',
    width: '1900px',
    deferred: true,
  },
  {
    src: '/parallax/layer_03_mountain10.webp',
    alt: 'mountain-10',
    speedX: 0.095,
    speedY: 0.005,
    speedZ: 0,
    rotation: 0,
    distance: 1110,
    zIndex: 3,
    initialTop: 'calc(50% + 169px)',
    initialLeft: 'calc(50% + 330px)',
    width: '1200px',
  },
  {
    src: '/parallax/layer_04_fog6.webp',
    alt: 'fog-6',
    speedX: 0.25,
    speedY: 0.28,
    speedZ: 0,
    rotation: 0,
    distance: 1400,
    zIndex: 4,
    initialTop: 'calc(50% + 285px)',
    initialLeft: 'calc(50%)',
    width: '2200px',
    className: 'opacity-30',
    deferred: true,
  },
  {
    src: '/parallax/layer_05_mountain9.webp',
    alt: 'mountain-9',
    speedX: 0.125,
    speedY: 0.155,
    speedZ: 0.15,
    rotation: 0.02,
    distance: 1700,
    zIndex: 51,
    initialTop: 'calc(50% + 313px)',
    initialLeft: 'calc(50% - 557px)',
    width: '670px',
  },
  {
    src: '/parallax/layer_06_fog5.webp',
    alt: 'fog-5',
    speedX: 0.16,
    speedY: 0.105,
    speedZ: 0,
    rotation: 0,
    distance: 1900,
    zIndex: 7,
    initialTop: 'calc(50% + 360px)',
    initialLeft: 'calc(50% + 40px)',
    width: '650px',
    deferred: true,
  },
  {
    src: '/parallax/layer_07_mountain7.webp',
    alt: 'mountain-7',
    speedX: 0.1,
    speedY: 0.1,
    speedZ: 0,
    rotation: 0.09,
    distance: 2000,
    zIndex: 19,
    initialTop: 'calc(50% + 223px)',
    initialLeft: 'calc(50% + 495px)',
    width: '738px',
  },
  {
    src: '/parallax/layer_08_mountain6.webp',
    alt: 'mountain-6',
    speedX: 0.065,
    speedY: 0.05,
    speedZ: 0.05,
    rotation: 0.12,
    distance: 2300,
    zIndex: 18,
    initialTop: 'calc(50% + 120px)',
    initialLeft: 'calc(50% + 590px)',
    width: '408px',
    deferred: true,
  },
  {
    src: '/parallax/layer_09_fog4.webp',
    alt: 'fog-4',
    speedX: 0.135,
    speedY: 0.1,
    speedZ: 0,
    rotation: 0,
    distance: 2400,
    zIndex: 11,
    initialTop: 'calc(50% + 223px)',
    initialLeft: 'calc(50% + 460px)',
    width: '590px',
    className: 'opacity-50',
    deferred: true,
  },
  {
    src: '/parallax/layer_10_mountain5.webp',
    alt: 'mountain-5',
    speedX: 0.08,
    speedY: 0.05,
    speedZ: 0.13,
    rotation: 0.1,
    distance: 2550,
    zIndex: 12,
    initialTop: 'calc(50% + 320px)',
    initialLeft: 'calc(50% + 230px)',
    width: '725px',
  },
  {
    src: '/parallax/layer_11_fog3.webp',
    alt: 'fog-3',
    speedX: 0.11,
    speedY: 0.018,
    speedZ: 0,
    rotation: 0,
    distance: 2800,
    zIndex: 113,
    initialTop: 'calc(50% + 210px)',
    initialLeft: 'calc(50% + 5px)',
    width: '1600px',
    deferred: true,
  },
  {
    src: '/parallax/layer_12_mountain4.webp',
    alt: 'mountain-4',
    speedX: 0.059,
    speedY: 0.024,
    speedZ: 0.35,
    rotation: 0.14,
    distance: 3200,
    zIndex: 15,
    initialTop: 'calc(50% + 196px)',
    initialLeft: 'calc(50% - 698px)',
    width: '1100px',
  },
  {
    src: '/parallax/layer_13_mountain3.webp',
    alt: 'mountain-3',
    speedX: 0.04,
    speedY: 0.018,
    speedZ: 0.32,
    rotation: 0.05,
    distance: 3400,
    zIndex: 20,
    initialTop: 'calc(50% - 20px)',
    initialLeft: 'calc(50% + 750px)',
    width: '630px',
    deferred: true,
  },
  {
    src: '/parallax/layer_14_fog2.webp',
    alt: 'fog-2',
    speedX: 0.15,
    speedY: 0.0115,
    speedZ: 0,
    rotation: 0,
    distance: 3600,
    zIndex: 16,
    initialTop: 'calc(50% - 20px)',
    initialLeft: 'calc(50% + 698px)',
    width: '1100px',
    deferred: true,
  },
  {
    src: '/parallax/layer_15_mountain2.webp',
    alt: 'mountain-2',
    speedX: 0.0235,
    speedY: 0.013,
    speedZ: 0.42,
    rotation: 0.15,
    distance: 3800,
    zIndex: 17,
    initialTop: 'calc(50% + 256px)',
    initialLeft: 'calc(50% + 528px)',
    width: '800px',
  },
  {
    src: '/parallax/layer_16_mountain1.webp',
    alt: 'mountain-1',
    speedX: 0.027,
    speedY: 0.018,
    speedZ: 0.53,
    rotation: 0.2,
    distance: 4000,
    zIndex: 18,
    initialTop: 'calc(50% + 196px)',
    initialLeft: 'calc(50% - 728px)',
    width: '1100px',
  },
  {
    src: '/parallax/layer_17_fog1.webp',
    alt: 'fog-1',
    speedX: 0.12,
    speedY: 0.01,
    speedZ: 0,
    rotation: 0,
    distance: 4200,
    zIndex: 21,
    initialTop: 'calc(100% - 355px)',
    initialLeft: 'calc(50% + 100px)',
    width: '1900px',
    className: 'opacity-50',
  },
];

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  layers = defaultLayers,
  title = 'VIJAY',
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  // Motion coordinates for requestAnimationFrame lerp loop
  const targetX = useRef(0);
  const targetY = useRef(0);
  const targetRotate = useRef(0);
  const targetCursorX = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);

  const currentX = useRef(0);
  const currentY = useRef(0);
  const currentRotate = useRef(0);
  const currentCursorX = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);

  const rafId = useRef<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [gyroActive, setGyroActive] = useState(false);
  const [needsIosPermission, setNeedsIosPermission] = useState(false);
  const [loadSecondaryLayers, setLoadSecondaryLayers] = useState(false);

  // Progressive atmospheric layer loading to keep initial HTTP requests < 20
  useEffect(() => {
    const loadRemaining = () => setLoadSecondaryLayers(true);
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const handle = (window as any).requestIdleCallback(loadRemaining, { timeout: 1200 });
        return () => (window as any).cancelIdleCallback(handle);
      } else {
        const timer = setTimeout(loadRemaining, 800);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Request iOS Gyroscope Permission
  const requestGyroPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setGyroActive(true);
          setNeedsIosPermission(false);
          window.addEventListener('deviceorientation', handleOrientation, true);
        }
      } catch (err) {
        console.warn('Device orientation permission rejected or unavailable:', err);
      }
    } else {
      // Non-iOS or standard device
      setGyroActive(true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
  };

  // Device orientation tilt handler with higher sensitivity
  const handleOrientation = (e: DeviceOrientationEvent) => {
    if (e.gamma === null && e.beta === null) return;

    setGyroActive(true);

    // gamma: left-to-right tilt in degrees [-90, 90]
    // Tilting left gives negative gamma; tilting right gives positive gamma.
    // Clamp to [-45, 45] and normalize with higher responsiveness (full range at ~18deg)
    const gamma = e.gamma || 0;
    const clampedGamma = Math.max(-45, Math.min(45, gamma));
    const normX = clampedGamma / 18;

    // beta: front-to-back tilt in degrees [-180, 180]
    // Standard comfortable handheld viewing angle is ~45deg
    // Tilting back (top moves away, angle > 45) -> positive delta -> moves scene down/up
    // Tilting forward (top moves toward user, angle < 45) -> negative delta
    const beta = e.beta || 45;
    const deltaBeta = Math.max(-45, Math.min(45, beta - 45));
    const normY = deltaBeta / 16;

    // Higher sensitivity travel multipliers for mobile
    const travelX = normX * (window.innerWidth * 1.15);
    const travelY = normY * (window.innerHeight * 0.75);
    const rotateDeg = normX * 32;

    targetX.current = travelX;
    targetY.current = travelY;
    targetRotate.current = rotateDeg;
    targetCursorX.current = window.innerWidth / 2 + travelX;
  };

  useEffect(() => {
    const checkMobile = () => {
      const mobileCheck =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024;
      setIsMobile(mobileCheck);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Check if iOS requires explicit permission
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      setNeedsIosPermission(true);

      // Auto-trigger permission request on first user touch/tap
      const handleFirstInteraction = () => {
        requestGyroPermission();
        window.removeEventListener('touchstart', handleFirstInteraction);
        window.removeEventListener('click', handleFirstInteraction);
      };
      window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
      window.addEventListener('click', handleFirstInteraction, { passive: true, once: true });
    } else if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      // Standard browsers (Android Chrome, etc.) - listen immediately
      window.addEventListener('deviceorientation', handleOrientation, true);
      setGyroActive(true);
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse move handler for desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const newXValue = e.clientX - window.innerWidth / 2;
      const newYValue = e.clientY - window.innerHeight / 2;
      const newRotateDegree = (newXValue / (window.innerWidth / 2)) * 20;

      targetX.current = newXValue;
      targetY.current = newYValue;
      targetRotate.current = newRotateDegree;
      targetCursorX.current = e.clientX;
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // 60fps/120fps Hardware-Accelerated Physics Lerp Loop
    const animate = () => {
      if (prefersReducedMotion) return;
      // 0.12 lerp factor gives snappy responsive inertia with smooth damping
      currentX.current += (targetX.current - currentX.current) * 0.12;
      currentY.current += (targetY.current - currentY.current) * 0.12;
      currentRotate.current += (targetRotate.current - currentRotate.current) * 0.12;
      currentCursorX.current += (targetCursorX.current - currentCursorX.current) * 0.12;

      updateLayers(
        currentCursorX.current,
        currentX.current,
        currentY.current,
        currentRotate.current
      );

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation, true);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const updateLayers = (
    cursorPosition: number,
    xVal: number,
    yVal: number,
    rotateDeg: number
  ) => {
    layerRefs.current.forEach((el, index) => {
      if (!el) return;

      const layer = layers[index];
      const { speedX, speedY, speedZ, rotation } = layer;

      const computedLeft = parseFloat(
        getComputedStyle(el).left.replace('px', '')
      );
      const isInLeft = computedLeft < window.innerWidth / 2 ? 1 : -1;
      const zValue = (cursorPosition - computedLeft) * isInLeft * 0.1;

      // 3D parallax translation across X, Y, and Z
      el.style.transform = `perspective(2300px) translateZ(${
        zValue * speedZ
      }px) rotateY(${rotateDeg * rotation}deg) translateX(calc(-50% + ${
        xVal * speedX * 1.55
      }px)) translateY(calc(-50% + ${yVal * speedY * 1.55}px))`;
    });

    if (textRef.current) {
      const textSpeedX = 0.085;
      const textSpeedY = 0.065;
      const textSpeedZ = 0.08;
      const textRotation = 0.055;

      const computedLeft = parseFloat(
        getComputedStyle(textRef.current).left.replace('px', '')
      );
      const isInLeft = computedLeft < window.innerWidth / 2 ? 1 : -1;
      const zValue = (cursorPosition - computedLeft) * isInLeft * 0.1;

      textRef.current.style.transform = `perspective(2300px) translateZ(${
        zValue * textSpeedZ
      }px) rotateY(${rotateDeg * textRotation}deg) translateX(calc(-50% + ${
        xVal * textSpeedX * 1.45
      }px)) translateY(calc(-50% + ${yVal * textSpeedY * 1.45}px))`;
    }
  };

  const handleScrollDown = () => {
    const videoSection = document.getElementById('scroll-video-section') || document.getElementById('cinematic-story');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      const portals = document.getElementById('portals');
      if (portals) {
        portals.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  return (
    <main
      ref={containerRef}
      className={cn(
        'relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#061224] via-[#091b35] to-[#040a14] touch-pan-y select-none',
        className
      )}
      onClick={needsIosPermission ? requestGyroPermission : undefined}
    >
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 z-[100] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_45%,rgba(0,0,0,0.75)_100%)]" />

      {/* Parallax Layers - Hardware accelerated without CSS transition lag */}
      {layers.map((layer, index) => {
        if (layer.deferred && !loadSecondaryLayers) return null;
        return (
          <img
            key={index}
            ref={(el) => {
              if (el) layerRefs.current[index] = el;
            }}
            src={layer.src}
            alt={layer.alt}
            fetchPriority={index === 0 ? "high" : "low"}
            decoding={index === 0 ? "sync" : "async"}
            className={cn(
              'absolute pointer-events-none select-none max-w-none will-change-transform transition-opacity duration-700',
              layer.className
            )}
            style={{
              width: layer.width,
              top: layer.initialTop,
              left: layer.initialLeft,
              zIndex: layer.zIndex,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}

      {/* Centered Dynamic Title - Perfectly aligned with zero horizontal overflow */}
      <div
        ref={textRef}
        className="absolute z-[9] text-white text-center pointer-events-none select-none will-change-transform w-full max-w-[92vw] sm:max-w-xl md:max-w-3xl lg:max-w-5xl px-3 sm:px-6"
        style={{
          top: 'calc(50% - 100px)',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h1
          className="font-black text-[17vw] sm:text-[15vw] md:text-[12vw] lg:text-[15rem] leading-[0.85] tracking-wider sm:tracking-widest uppercase drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] opacity-95 truncate"
          aria-label="Vijayrajkumar — Chief Operating Officer and Venture Builder in Chennai"
        >
          <span className="sr-only">Vijayrajkumar — Chief Operating Officer and Venture Builder in Chennai</span>
          <span aria-hidden="true">{title}</span>
        </h1>
        <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs md:text-sm lg:text-base uppercase tracking-[0.18em] sm:tracking-[0.28em] md:tracking-[0.35em] text-[#C9D6D3] font-mono font-medium drop-shadow whitespace-normal leading-relaxed px-2">
          Chief Operating Officer &amp; Co-Founder
        </p>
      </div>

      {/* Floating Exploration Hint & Quick Actions at bottom */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-[105] flex flex-col items-center justify-center pointer-events-auto px-4">
        {needsIosPermission ? (
          <button
            onClick={requestGyroPermission}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[var(--color-accent-primary)]/80 hover:bg-[var(--color-accent-primary)] active:scale-95 backdrop-blur-md border border-[var(--color-border)]/40 text-white text-xs font-mono tracking-wider shadow-2xl transition-colors animate-pulse transform-gpu"
          >
            <span>📱</span>
            <span>Tap to Enable 3D Tilt Effect</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleScrollDown}
            className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[var(--color-accent-primary)]/85 hover:bg-[var(--color-accent-primary)] active:scale-95 backdrop-blur-md border border-[var(--color-border)]/40 text-white text-[11px] sm:text-xs font-mono tracking-wider shadow-2xl transition-colors cursor-pointer group max-w-[90vw] transform-gpu"
          >
            <span className="w-2 h-2 rounded-full bg-[#7E9490] animate-pulse shrink-0 transform-gpu" />
            <span className="truncate">
              {isMobile
                ? '📱 Tilt phone to explore • Tap to scroll down ↓'
                : 'Move cursor to explore depth • Scroll down ↓'}
            </span>
          </button>
        )}
      </div>
    </main>
  );
};

export default function ParallaxHeroDemo() {
  return <ParallaxHero title="VIJAY" />;
}
