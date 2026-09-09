import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import SplitText from './react-bits/SplitText';
import CountUp from './react-bits/CountUp';

gsap.registerPlugin(ScrollTrigger);

const START_FRAME = 29;
const END_FRAME = 220;
const TOTAL_SEQUENCE_FRAMES = END_FRAME - START_FRAME + 1; // 192 frames total

// Frame-to-Text Caption Mapping
const CAPTION_MAP = [
  { start: 29, end: 73, text: "I WAS RUNNING WITH LIFE" },
  { start: 74, end: 105, text: "THEN LIFE KNOCKED ME DOWN" },
  { start: 106, end: 220, text: "I GOT UP AND I AM FIGHTING" }
];

export default function CinematicSequenceCanvas() {
  const containerRef = useRef(null);
  const mainCanvasRef = useRef(null);
  const offscreenCanvasRef = useRef(document.createElement('canvas'));

  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrameNum, setCurrentFrameNum] = useState(START_FRAME);

  // Caption state
  const [activeCaption, setActiveCaption] = useState(CAPTION_MAP[0].text);
  const targetCaptionRef = useRef(CAPTION_MAP[0].text);

  const pixelBlockSize = 4;
  const grainOpacity = 0.08;

  const formatFrameNumber = (num) => String(num).padStart(3, '0');

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const imgArray = [];

    for (let i = START_FRAME; i <= END_FRAME; i++) {
      const img = new Image();
      const frameNum = formatFrameNumber(i);
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        const percent = Math.round((loadedCount / TOTAL_SEQUENCE_FRAMES) * 100);
        setLoadProgress(percent);
        if (loadedCount === TOTAL_SEQUENCE_FRAMES) setIsLoaded(true);
      };

      img.onerror = () => {
        loadedCount++;
        const percent = Math.round((loadedCount / TOTAL_SEQUENCE_FRAMES) * 100);
        setLoadProgress(percent);
        if (loadedCount === TOTAL_SEQUENCE_FRAMES) setIsLoaded(true);
      };

      imgArray.push(img);
    }

    setImages(imgArray);
  }, []);

  // Draw frame
  const drawFrame = (arrayIndex, imgList = images) => {
    const mainCanvas = mainCanvasRef.current;
    if (!mainCanvas) return;
    const mainCtx = mainCanvas.getContext('2d');
    if (!mainCtx) return;

    const img = imgList[arrayIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const windowW = window.innerWidth;
    const windowH = window.innerHeight;

    mainCanvas.width = windowW;
    mainCanvas.height = windowH;

    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    const offCanvas = offscreenCanvasRef.current;
    const offCtx = offCanvas.getContext('2d');

    const smallW = Math.max(1, Math.floor(windowW / pixelBlockSize));
    const smallH = Math.max(1, Math.floor(windowH / pixelBlockSize));

    offCanvas.width = smallW;
    offCanvas.height = smallH;

    const smallScale = Math.max(smallW / imgWidth, smallH / imgHeight);
    const smallX = (smallW - imgWidth * smallScale) / 2;
    const smallY = (smallH - imgHeight * smallScale) / 2;

    offCtx.imageSmoothingEnabled = false;
    offCtx.clearRect(0, 0, smallW, smallH);
    offCtx.drawImage(img, smallX, smallY, imgWidth * smallScale, imgHeight * smallScale);

    mainCtx.imageSmoothingEnabled = false;
    mainCtx.clearRect(0, 0, windowW, windowH);
    mainCtx.drawImage(offCanvas, 0, 0, smallW, smallH, 0, 0, windowW, windowH);
  };

  const updateCaptionForFrame = (frameNum) => {
    const matched = CAPTION_MAP.find(c => frameNum >= c.start && frameNum <= c.end);
    const nextText = matched ? matched.text : (frameNum > END_FRAME ? CAPTION_MAP[CAPTION_MAP.length - 1].text : "");

    if (nextText !== targetCaptionRef.current) {
      targetCaptionRef.current = nextText;
      setActiveCaption(nextText);
    }
  };

  useEffect(() => {
    if (!isLoaded || images.length < TOTAL_SEQUENCE_FRAMES) return;

    drawFrame(0, images);
    updateCaptionForFrame(START_FRAME);

    let currentArrayIdx = 0;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=450%',
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        currentArrayIdx = Math.min(TOTAL_SEQUENCE_FRAMES - 1, Math.floor(self.progress * (TOTAL_SEQUENCE_FRAMES - 1)));
        const frameNum = START_FRAME + currentArrayIdx;
        setCurrentFrameNum(frameNum);
        updateCaptionForFrame(frameNum);
        drawFrame(currentArrayIdx, images);
      }
    });

    const handleResize = () => {
      drawFrame(currentArrayIdx, images);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      trigger.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, images]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black text-white overflow-hidden select-none">
      
      {/* Preloader Screen with Unique CountUp Component */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-8 space-y-6 font-mono">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          
          <div className="text-center space-y-3">
            <div className="text-6xl font-bold font-mono tracking-tighter text-white">
              <CountUp to={loadProgress} duration={1} suffix="%" />
            </div>
            <span className="text-xs text-neutral-400 block font-mono uppercase tracking-wider">
              LOADING STORY
            </span>
          </div>

          <div className="w-full max-w-xs h-2 bg-neutral-900 border border-white/30 overflow-hidden mt-4">
            <div
              className="h-full bg-white transition-all duration-150 ease-out"
              style={{ width: `${loadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Main Canvas */}
      <canvas
        ref={mainCanvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 filter grayscale contrast-[125%] brightness-[0.95]"
      />

      {/* Subtle Film Grain */}
      <div 
        className="absolute inset-0 bg-film-grain pointer-events-none z-10 mix-blend-overlay"
        style={{ opacity: grainOpacity }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none z-10"></div>

      {/* Bottom-Right Frame-Synced Caption Track */}
      <div className="absolute bottom-24 right-8 sm:right-16 lg:right-24 z-20 flex flex-col items-end justify-end max-w-xl sm:max-w-2xl lg:max-w-3xl pointer-events-none text-right">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white uppercase tracking-[0.06em] leading-[1.2] drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)]">
          <SplitText
            key={activeCaption}
            text={activeCaption}
            delay={0.04}
            textAlign="right"
          />
        </h2>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 inset-x-0 z-20 flex justify-center items-center font-mono text-xs pointer-events-none">
        <div className="flex items-center space-x-3 text-white bg-black/80 backdrop-blur-md px-6 py-3 border border-white/30 shadow-2xl">
          <span className="tracking-wider uppercase font-bold text-xs">SCROLL TO SEE MY STORY</span>
          <ArrowDown className="w-4 h-4 text-white animate-bounce shrink-0" />
        </div>
      </div>

    </div>
  );
}
