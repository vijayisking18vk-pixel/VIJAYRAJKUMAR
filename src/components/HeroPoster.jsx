import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Sparkles, MapPin, Briefcase, Cpu, CheckCircle2 } from 'lucide-react';
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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ scale: posterScale, opacity: posterOpacity }}
      className="relative w-full min-h-screen bg-white text-neutral-950 flex flex-col justify-between items-center pt-12 pb-16 px-6 sm:px-12 overflow-hidden font-sans select-none"
    >
      {/* Top Tag with BorderGlow Component */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative z-20 mb-6"
      >
        <BorderGlow borderRadius={9999} glowColor="#0A0A0A" className="px-5 py-1.5 shadow-sm">
          <div className="flex items-center space-x-2.5 font-sans text-xs text-neutral-700">
            <Sparkles className="w-3.5 h-3.5 text-neutral-900 animate-pulse shrink-0" />
            <span className="font-semibold text-neutral-900 tracking-tight">
              Vijayrajkumar // Co-Founder @ Unfounded • Ziggers • LoopMemory
            </span>
          </div>
        </BorderGlow>
      </motion.div>

      {/* Main Hero Container */}
      <div className="relative z-20 my-auto flex flex-col items-center max-w-4xl w-full py-4 space-y-8 text-center">
        
        {/* Living Editorial Poster Graphic */}
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full max-w-lg rounded-2xl border border-neutral-200 shadow-poster-light bg-black overflow-hidden group cursor-pointer"
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
              alt="Vijayrajkumar — Co-Founder and Venture Builder based in Chennai"
              className="w-full h-auto max-h-[52vh] sm:max-h-[58vh] object-contain filter grayscale contrast-[120%] brightness-[0.98]"
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

          {/* Curved Bottom Ribbon Loop */}
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
                <span className="mx-4">CO-FOUNDER @ ZIGGERS</span>
                <span className="mx-2 text-neutral-400">•</span>
                <span className="mx-4">CO-FOUNDER @ LOOPMEMORY</span>
                <span className="mx-2 text-neutral-400">•</span>
                <span className="mx-4">CHENNAI · ON-SITE</span>
                <span className="mx-2 text-neutral-400">•</span>
                <span className="mx-4">VIBE CODING & GTM MARKETING</span>
                <span className="mx-2 text-neutral-400">•</span>
              </Marquee>
            </div>
          </motion.div>
        </motion.div>

        {/* 5-Second Answer Rule Hero Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="space-y-4 max-w-3xl px-2"
        >
          <div className="flex justify-center">
            <TextPressure text="Vijayrajkumar" textColor="#0A0A0A" />
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-sans tracking-tight text-neutral-950 leading-tight">
            Vijayrajkumar is a Chennai-based co-founder and venture builder building marketplaces and AI context infrastructure.
          </h1>
          
          <p className="text-base sm:text-lg text-neutral-600 font-sans leading-relaxed max-w-2xl mx-auto">
            Co-founder at Unfounded, Ziggers, and LoopMemory. I work across product architecture, growth, marketing, and strategic research.
          </p>

          {/* Two Primary Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Magnet magnetStrength={3} padding={40}>
              <a
                href="/ventures/"
                className="flex items-center space-x-2 px-6 py-3 bg-neutral-950 text-white font-semibold rounded-full hover:bg-black transition-all shadow-sm text-sm"
              >
                <span>Explore ventures</span>
                <ArrowRight className="w-4 h-4 text-white shrink-0" />
              </a>
            </Magnet>

            <Magnet magnetStrength={3} padding={40}>
              <a
                href="/contact/"
                className="flex items-center space-x-2 px-6 py-3 bg-neutral-100 border border-neutral-200 text-neutral-900 font-semibold rounded-full hover:bg-neutral-200 transition-all text-sm"
              >
                <span>Start a conversation</span>
              </a>
            </Magnet>
          </div>
        </motion.div>

      </div>

      {/* Verifiable Proof Strip (Immediately below hero) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.85 }}
        className="w-full max-w-5xl pt-10 border-t border-neutral-200"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          
          {/* Fact 1: Current Role */}
          <div className="p-4 bg-neutral-50/80 border border-neutral-200 rounded-xl space-y-1">
            <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-neutral-900" />
              <span>Current Role</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug">
              Co-founder at Unfounded, Ziggers & LoopMemory
            </p>
          </div>

          {/* Fact 2: Base */}
          <div className="p-4 bg-neutral-50/80 border border-neutral-200 rounded-xl space-y-1">
            <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-neutral-900" />
              <span>Base</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug">
              Chennai, Tamil Nadu, India (On-site)
            </p>
          </div>

          {/* Fact 3: Product Focus */}
          <div className="p-4 bg-neutral-50/80 border border-neutral-200 rounded-xl space-y-1">
            <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-neutral-900" />
              <span>Product Focus</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug">
              Gig marketplaces & AI memory infrastructure
            </p>
          </div>

          {/* Fact 4: Current Status */}
          <div className="p-4 bg-neutral-50/80 border border-neutral-200 rounded-xl space-y-1">
            <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900" />
              <span>Current Status</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-neutral-950 leading-snug">
              Ziggers live · LoopMemory active · Unfounded studio
            </p>
          </div>

        </div>
      </motion.div>

    </motion.section>
  );
}
