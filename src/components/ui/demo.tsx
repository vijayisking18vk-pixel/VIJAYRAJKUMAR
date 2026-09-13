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
}

export interface ParallaxHeroProps {
  layers?: ParallaxLayer[];
  title?: string;
  className?: string;
}

export const defaultLayers: ParallaxLayer[] = [
  {
    src: 'https://cdn.21st.dev/assets/mirror/bf/bfb8ca258f591d2b7388d05d79ac2332b695867281627c1bc8c7165ca6429a6d.png',
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
    src: 'https://cdn.21st.dev/assets/mirror/c8/c878e14d1f8e481f6f70b31fb01de352338db5353f5b8852a241062bb251b558.png',
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
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/e9/e94a2247aa54feee12cd1580a7c3abf97d6f55bbe7e50006d8dda6e4dffbe921.png',
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
    src: 'https://cdn.21st.dev/assets/mirror/99/9955626de3f10d97d27b7b89f7be180c02e1700f288db28e0c6824142871523f.png',
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
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/dd/dd999609be149c46fcb65fce4d267cad8d5651b0c31901b399054da5146cb46e.png',
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
    src: 'https://cdn.21st.dev/assets/mirror/d5/d579e64ddeb3a32d04dff5391980b827eb4d6d4aafa2cc3231e2cbe02d66a7c7.png',
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
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/b7/b74be54427fd5b9568571ba97684bc8a4334d366a3f3b32c353d31fd1501c09b.png',
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
    src: 'https://cdn.21st.dev/assets/mirror/ed/edf306a4225b6188283aa94ecec1553b2e0855038a3acaed402001f38c64af1d.png',
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
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/8d/8d12582b7eac71f981eca3a8bb19157fb57fc4b05c14f9ef80fd029e5fecfab5.png',
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
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/9c/9c1a1b7f4b165011788c27d440d920e407d70f148cbc9a01eacfecb49126efcb.png',
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
    src: 'https://cdn.21st.dev/assets/mirror/0e/0e7888cc6d1732222b5c1f38b925cf1ecdb7fec02fd1193dd1cfef280a453c5a.png',
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
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/fa/fa0946f924ad025b207616cfe20ce022bcccd22ac9db4038a584ace23b7d9721.png',
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
    src: 'https://cdn.21st.dev/assets/mirror/90/90863919566208c1eb7a78136d1dd493dd402f4d5a5efe2fc890a288a6b07449.png',
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
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/b2/b2d0ba5c7f17d038a04475b8f36563aea22cfee00983db3b5477f1ac4c9a5097.png',
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
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/c4/c4ae700b3a0070eae9f3c005a17572ae68fcb8373d322f279d28c5bf19cd501d.png',
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
    src: 'https://cdn.21st.dev/assets/mirror/41/414097ad4507410ac1dc884afcc92bb3f4f45763fd17b2986bf82dd43c31da97.png',
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
    src: 'https://cdn.21st.dev/assets/mirror/aa/aa8ace86d9779fcccce3a1a28b8ac0cb86336b5980706659f2c8889c3daaf5a1.png',
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

    // Mouse move handler for desktop
    const handleMouseMove = (e: MouseEvent) => {
      const newXValue = e.clientX - window.innerWidth / 2;
      const newYValue = e.clientY - window.innerHeight / 2;
      const newRotateDegree = (newXValue / (window.innerWidth / 2)) * 20;

      targetX.current = newXValue;
      targetY.current = newYValue;
      targetRotate.current = newRotateDegree;
      targetCursorX.current = e.clientX;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 60fps/120fps Hardware-Accelerated Physics Lerp Loop
    const animate = () => {
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
      {layers.map((layer, index) => (
        <img
          key={index}
          ref={(el) => {
            if (el) layerRefs.current[index] = el;
          }}
          src={layer.src}
          alt={layer.alt}
          className={cn(
            'absolute pointer-events-none select-none max-w-none will-change-transform',
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
      ))}

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
        <h1 className="font-black text-[17vw] sm:text-[15vw] md:text-[12vw] lg:text-[15rem] leading-[0.85] tracking-wider sm:tracking-widest uppercase drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] opacity-95 truncate">
          {title}
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
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[var(--color-accent-primary)]/80 hover:bg-[var(--color-accent-primary)] active:scale-95 backdrop-blur-md border border-[var(--color-border)]/40 text-white text-xs font-mono tracking-wider shadow-2xl transition-all animate-pulse"
          >
            <span>📱</span>
            <span>Tap to Enable 3D Tilt Effect</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleScrollDown}
            className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[var(--color-accent-primary)]/85 hover:bg-[var(--color-accent-primary)] active:scale-95 backdrop-blur-md border border-[var(--color-border)]/40 text-white text-[11px] sm:text-xs font-mono tracking-wider shadow-2xl transition-all cursor-pointer group max-w-[90vw]"
          >
            <span className="w-2 h-2 rounded-full bg-[#7E9490] animate-pulse shrink-0" />
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
