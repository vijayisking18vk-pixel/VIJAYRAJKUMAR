import React, { useState } from 'react';
import SplitText from './react-bits/SplitText';
import BlurText from './react-bits/BlurText';
import DecryptedText from './react-bits/DecryptedText';
import TrueFocus from './react-bits/TrueFocus';
import ShinyText from './react-bits/ShinyText';
import SpotlightCard from './react-bits/SpotlightCard';
import TiltedCard from './react-bits/TiltedCard';
import Magnet from './react-bits/Magnet';
import MagicBento from './react-bits/MagicBento';
import { Layers, Sparkles, Terminal, Cpu, ArrowRight } from 'lucide-react';

export default function ReactBitsShowcase() {
  const [activeCategory, setActiveCategory] = useState('text');

  const categories = [
    { id: 'text', label: 'TEXT ANIMATIONS', icon: Terminal, count: 28 },
    { id: 'components', label: 'COMPONENTS', icon: Layers, count: 32 },
    { id: 'animations', label: 'ANIMATIONS', icon: Sparkles, count: 26 },
    { id: 'backgrounds', label: 'BACKGROUNDS', icon: Cpu, count: 24 }
  ];

  return (
    <section className="w-full bg-black text-white py-20 px-6 sm:px-12 border-t border-white/20 font-display">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 text-center sm:text-left border-b border-white/20 pb-8">
          <div className="inline-flex items-center space-x-2 bg-white text-black font-mono text-xs px-3 py-1 font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REACT BITS COMPONENT LIBRARY INTEGRATION</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold font-poster tracking-tighter uppercase text-white">
            <ShinyText text="REACT BITS SHOWCASE MATRIX" speed={3} />
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-display max-w-2xl">
            Integrated high-performance interactive components, text animations, and physical UI bits directly from the official <span className="font-mono text-white underline">DavidHDev/react-bits</span> system.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-3 border-b border-white/15 pb-4 font-mono text-xs">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 font-bold uppercase transition-all border ${
                  isActive
                    ? 'bg-white text-black border-white shadow-lg'
                    : 'bg-black text-neutral-400 border-white/20 hover:border-white hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-none font-mono ${isActive ? 'bg-black text-white' : 'bg-neutral-800 text-neutral-300'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Text Animations */}
        {activeCategory === 'text' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            {/* SplitText */}
            <SpotlightCard className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 block">[TEXT BIT // SPLITTEXT]</span>
              <div className="text-2xl sm:text-3xl font-bold font-poster tracking-wider uppercase text-white min-h-[60px]">
                <SplitText text="SPLIT CHARACTER ANIMATION" delay={0.06} />
              </div>
              <p className="text-xs font-mono text-neutral-400">
                Staggers every character independently with spring physics and threshold triggers.
              </p>
            </SpotlightCard>

            {/* BlurText */}
            <SpotlightCard className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 block">[TEXT BIT // BLURTEXT]</span>
              <div className="text-2xl sm:text-3xl font-bold font-poster tracking-wider uppercase text-white min-h-[60px]">
                <BlurText text="SMOOTH BLUR FOCAL REVEAL" delay={0.05} />
              </div>
              <p className="text-xs font-mono text-neutral-400">
                Word-by-word GPU blur filter transition with directional offset.
              </p>
            </SpotlightCard>

            {/* DecryptedText */}
            <SpotlightCard className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 block">[TEXT BIT // DECRYPTEDTEXT]</span>
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-widest text-white min-h-[60px] flex items-center">
                <DecryptedText text="CYBERPUNK DECRYPTED SYSTEM" speed={40} />
              </div>
              <p className="text-xs font-mono text-neutral-400">
                Hover or scroll to decrypt randomized character iterations into target text.
              </p>
            </SpotlightCard>

            {/* TrueFocus */}
            <SpotlightCard className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 block">[TEXT BIT // TRUEFOCUS]</span>
              <div className="text-2xl font-bold font-poster tracking-wider uppercase text-white min-h-[60px] flex items-center">
                <TrueFocus sentence="DYNAMIC FOCAL BOX HIGHLIGHT" />
              </div>
              <p className="text-xs font-mono text-neutral-400">
                Active tracking focus box with corner indicators and background blur.
              </p>
            </SpotlightCard>
          </div>
        )}

        {/* Tab 2: Components */}
        {activeCategory === 'components' && (
          <div className="space-y-8 animate-fade-in">
            {/* Bento Grid */}
            <div className="space-y-3">
              <span className="font-mono text-xs text-neutral-400 block">[COMPONENT // MAGIC BENTO GRID]</span>
              <MagicBento />
            </div>

            {/* 3D Tilted Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <TiltedCard
                captionText="[TILT BIT // 3D PARALLAX DEPTH]"
                containerHeight="260px"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs text-white/70 uppercase">INTERACTIVE CARD</span>
                  <h3 className="text-2xl font-bold font-poster uppercase">3D CURSOR TILT PHYSICS</h3>
                  <p className="text-xs text-neutral-300">Move your mouse across the surface to tilt with real-time perspective depth.</p>
                </div>
              </TiltedCard>

              <TiltedCard
                captionText="[SPOTLIGHT BIT // RADIAL LIGHTING]"
                containerHeight="260px"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs text-white/70 uppercase">LIGHTING EFFECT</span>
                  <h3 className="text-2xl font-bold font-poster uppercase">RADIAL MOUSE SPOTLIGHT</h3>
                  <p className="text-xs text-neutral-300">Card surface illuminates smooth radial spotlight following your cursor.</p>
                </div>
              </TiltedCard>
            </div>
          </div>
        )}

        {/* Tab 3: Animations */}
        {activeCategory === 'animations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            <SpotlightCard className="space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs text-neutral-400 block">[ANIMATION BIT // MAGNET BUTTON]</span>
                <h3 className="text-2xl font-bold font-poster uppercase">MAGNETIC CURSOR ATTRACTION</h3>
                <p className="text-sm text-neutral-300">
                  Elements physically pull towards the cursor when hovered within magnetic range.
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <Magnet magnetStrength={2} padding={80}>
                  <button className="px-6 py-3 bg-white text-black font-bold uppercase font-poster text-sm border border-white hover:bg-neutral-200 transition-colors shadow-lg">
                    MAGNETIC BUTTON
                  </button>
                </Magnet>

                <Magnet magnetStrength={3} padding={80}>
                  <button className="px-6 py-3 bg-black text-white font-bold uppercase font-poster text-sm border border-white hover:bg-white hover:text-black transition-colors">
                    MAGNETIC OUTLINE
                  </button>
                </Magnet>
              </div>
            </SpotlightCard>

            <SpotlightCard className="space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs text-neutral-400 block">[ANIMATION BIT // SHINY TEXT]</span>
                <h3 className="text-2xl font-bold font-poster uppercase">METALLIC SWEEPING SHINE</h3>
                <p className="text-sm text-neutral-300">
                  Continuous metallic light sheen passing across high-contrast typography.
                </p>
              </div>

              <div className="py-4">
                <div className="text-3xl sm:text-4xl font-bold font-poster uppercase tracking-wider">
                  <ShinyText text="PREMIUM METALLIC GLOW" speed={3} />
                </div>
              </div>
            </SpotlightCard>
          </div>
        )}

        {/* Tab 4: Backgrounds */}
        {activeCategory === 'backgrounds' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            <SpotlightCard className="space-y-4 relative min-h-[240px] flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-film-grain opacity-30 pointer-events-none"></div>
              <div className="space-y-2 relative z-10">
                <span className="font-mono text-xs text-neutral-400 block">[BACKGROUND BIT // FILM GRAIN & NOISE]</span>
                <h3 className="text-2xl font-bold font-poster uppercase">EDITORIAL FILM GRAIN MASK</h3>
                <p className="text-xs text-neutral-300">Authentic analog texture overlay masking digital render softness.</p>
              </div>
              <div className="font-mono text-xs text-neutral-400 relative z-10">[OPACITY: 8% MIX-BLEND OVERLAY]</div>
            </SpotlightCard>

            <SpotlightCard className="space-y-4 relative min-h-[240px] flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
              <div className="space-y-2 relative z-10">
                <span className="font-mono text-xs text-neutral-400 block">[BACKGROUND BIT // DOT MATRIX GRID]</span>
                <h3 className="text-2xl font-bold font-poster uppercase">DOT FIELD MATRIX CANVAS</h3>
                <p className="text-xs text-neutral-300">Responsive geometric dot field layout providing subtle depth cues.</p>
              </div>
              <div className="font-mono text-xs text-neutral-400 relative z-10">[16PX GRID STEPPING]</div>
            </SpotlightCard>
          </div>
        )}

      </div>
    </section>
  );
}
