import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import ShinyText from './react-bits/ShinyText';
import BorderGlow from './react-bits/BorderGlow';
import TextPressure from './react-bits/TextPressure';
import Marquee from './react-bits/Marquee';
import Magnet from './react-bits/Magnet';

export default function HeroPoster({ onStartAnimation }) {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Scroll Parallax logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const posterScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const posterOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);
  const portraitParallaxY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 8;
    const y = ((e.clientY - top) / height - 0.5) * 8;
    setMousePosition({ x, y });
  };

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ scale: posterScale, opacity: posterOpacity }}
      className="relative w-full min-h-screen bg-white text-neutral-950 flex flex-col justify-between items-center py-16 lg:py-24 px-6 sm:px-12 overflow-hidden font-sans select-none"
    >
      {/* Top Tag with Unique BorderGlow Component */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative z-20 pt-2 pb-4 mb-6"
      >
        <BorderGlow borderRadius={9999} glowColor="#0A0A0A" className="px-5 py-1.5 shadow-sm">
          <div className="flex items-center space-x-2.5 font-sans text-xs text-neutral-700">
            <Sparkles className="w-3.5 h-3.5 text-neutral-900 animate-pulse shrink-0" />
            <span className="font-semibold text-neutral-900 tracking-tight">
              Vijayrajkumar // Co-Founder @ Unfounded • Zigger • Loopverse
            </span>
          </div>
        </BorderGlow>
      </motion.div>

      {/* Living Poster Centerpiece */}
      <div className="relative z-20 my-auto flex flex-col items-center max-w-4xl w-full py-4 space-y-8">
        
        {/* Living Editorial Poster */}
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full max-w-xl rounded-2xl border border-neutral-200 shadow-poster-light bg-black overflow-hidden group cursor-pointer"
          animate={{
            x: mousePosition.x * 0.35,
            y: mousePosition.y * 0.35
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >

          {/* Clean High-Resolution Poster Image */}
          <motion.div
            style={{ y: portraitParallaxY }}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            className="relative z-20 w-full"
          >
            <img
              src="/vijayrajkumar-poster.jpg"
              alt="Vijayrajkumar Living Poster"
              className="w-full h-auto max-h-[58vh] sm:max-h-[64vh] object-contain filter grayscale contrast-[120%] brightness-[0.98]"
            />
          </motion.div>

          {/* Interactive Eye Glow */}
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0.15, scale: 0.95 }}
              animate={{
                opacity: isHovered ? 1.0 : 0.15,
                scale: isHovered ? 1.15 : 0.95,
                filter: isHovered
                  ? 'drop-shadow(0 0 35px rgba(255, 255, 255, 0.95))'
                  : 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.2))'
              }}
              transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full h-full"
            >
              <div className="w-full h-full bg-radial-eye-glow pointer-events-none"></div>
            </motion.div>
          </div>

          {/* Curved Bottom Ribbon Text Loop with Marquee Component */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            className="absolute bottom-3 inset-x-0 z-30 pointer-events-none"
          >
            <div className="bg-white/95 backdrop-blur-md text-neutral-950 py-1.5 font-sans text-xs font-semibold tracking-wider border-y border-neutral-200">
              <Marquee speed={28}>
                <span className="mx-4">UNFOUNDED VENTURE STUDIO</span>
                <span className="mx-2 text-neutral-400">•</span>
                <span className="mx-4">CO-FOUNDER @ ZIGGER</span>
                <span className="mx-2 text-neutral-400">•</span>
                <span className="mx-4">CO-FOUNDER @ LOOPVERSE</span>
                <span className="mx-2 text-neutral-400">•</span>
                <span className="mx-4">CHENNAI · ON-SITE</span>
                <span className="mx-2 text-neutral-400">•</span>
                <span className="mx-4">VIBE CODING & MARKETING</span>
                <span className="mx-2 text-neutral-400">•</span>
              </Marquee>
            </div>
          </motion.div>

        </motion.div>

        {/* Title Headline Statement with TextPressure & ShinyText */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-center space-y-3 max-w-2xl"
        >
          <TextPressure text="Vijayrajkumar" textColor="#0A0A0A" />
          
          <p className="text-base sm:text-lg text-neutral-600 font-sans leading-relaxed pt-1">
            Co-founder & venture builder across marketplaces, context structuring, and venture incubation. Specializing in vibe coding, marketing, and geopolitics.
          </p>
        </motion.div>

      </div>

      {/* Bottom Scroll CTA Button with Magnet Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.85 }}
        className="relative z-20 pt-6 pb-2 flex flex-col items-center space-y-2"
      >
        <Magnet magnetStrength={3} padding={60}>
          <button
            onClick={onStartAnimation}
            className="flex items-center space-x-2.5 px-7 py-3.5 bg-neutral-950 text-white font-semibold rounded-full hover:bg-black transition-all shadow-sm text-sm"
          >
            <span>Explore journey & work</span>
            <ArrowDown className="w-4 h-4 text-white animate-bounce shrink-0" />
          </button>
        </Magnet>

        <span className="text-xs text-neutral-400 font-medium">
          Education, experience & milestones below
        </span>
      </motion.div>

    </motion.section>
  );
}
