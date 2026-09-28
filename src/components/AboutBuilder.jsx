import React from 'react';
import { MapPin, GraduationCap, Compass, Shield, BookOpen, Rocket } from 'lucide-react';
import DecryptedText from './react-bits/DecryptedText';
import SplitText from './react-bits/SplitText';
import GlassIcons from './react-bits/GlassIcons';
import SpotlightCard from './react-bits/SpotlightCard';
import TiltedCard from './react-bits/TiltedCard';
import GlareHover from './react-bits/GlareHover';
import BlurText from './react-bits/BlurText';
import MagicBento from './react-bits/MagicBento';

export default function AboutBuilder() {
  const badgeItems = [
    {
      icon: MapPin,
      label: 'Chennai, Tamil Nadu, India · On-site'
    },
    {
      icon: GraduationCap,
      label: 'SRMIST — B.Sc. Defence & Strategic Studies (2023–2026)',
      href: 'https://www.srmist.edu.in/'
    },
    {
      icon: BookOpen,
      label: 'Dakshina Bharat Hindi Prachar Sabha — MA Hindi (2016–2021)',
      href: 'https://www.dbhpscentral.org/'
    }
  ];

  return (
    <section id="journey" className="w-full bg-[var(--gta-text-fill-light)] text-[var(--gta-text-outline)] py-24 lg:py-32 px-6 sm:px-12 border-t border-[var(--gta-silhouette)]/30 font-futura relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 lg:space-y-20">
        
        {/* Section Header with sentence case typography */}
        <div className="space-y-5 border-b border-[var(--gta-silhouette)]/30 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[var(--gta-sky-low)] text-[var(--gta-text-outline)] font-bank uppercase text-xs px-3.5 py-1.5 rounded-full font-bold tracking-wider">
            <Compass className="w-3.5 h-3.5 shrink-0 text-[var(--gta-text-outline)]" />
            <span>
              <DecryptedText text="01 // The journey & education" speed={40} />
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-pricedown tracking-wide text-[var(--gta-text-outline)] leading-tight max-w-4xl">
            <SplitText text="From literature to geopolitics to venture building" delay={0.03} />
          </h2>

          <p className="text-base sm:text-lg text-[var(--gta-silhouette)] font-futura leading-relaxed max-w-3xl">
            A background combining the analytical rigor of Defence & Strategic Studies with the expressive mastery of Hindi Literature and high-speed Vibe Coding execution.
          </p>

          {/* GlassIcons Badges */}
          <div className="pt-2">
            <GlassIcons items={badgeItems} />
          </div>
        </div>

        {/* Story & Education Grid (SpotlightCard, TiltedCard, GlareHover) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: MA Hindi Language & Literature */}
          <SpotlightCard className="p-8 space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-[var(--gta-sky-low)] text-[var(--gta-text-outline)] rounded-xl flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs text-[var(--gta-silhouette)] font-bank uppercase tracking-wider font-bold block">
                Dec 2016 – Jan 2021
              </span>
              <h3 className="text-2xl font-bold font-beckett text-[var(--gta-text-outline)] tracking-tight leading-snug">
                MA Hindi literature
              </h3>
              <p className="text-sm font-futura text-[var(--gta-silhouette)] leading-relaxed">
                <strong className="text-[var(--gta-text-outline)] font-medium font-diploma text-base">Dakshina Bharat Hindi Prachar Sabha</strong> — Master of Arts (MA) in Hindi Language & Literature. Deep linguistic analysis, storytelling, and communication mastery across national cultural landscapes.
              </p>
            </div>
            <div className="text-xs text-[var(--gta-silhouette)] pt-5 border-t border-[var(--gta-silhouette)]/20 font-bank uppercase tracking-wider font-bold">
              Hindi · Linguistics · Communications
            </div>
          </SpotlightCard>

          {/* Card 2: B.Sc. Defence & Strategic Studies */}
          <TiltedCard containerHeight="auto" className="w-full">
            <div className="p-8 space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[var(--gta-sky-low)] text-[var(--gta-text-outline)] rounded-xl flex items-center justify-center font-bold">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-xs text-[var(--gta-silhouette)] font-bank uppercase tracking-wider font-bold block">
                  Apr 2023 – Apr 2026
                </span>
                <h3 className="text-2xl font-bold font-beckett text-[var(--gta-text-outline)] tracking-tight leading-snug">
                  B.Sc. Defence & strategy
                </h3>
                <p className="text-sm font-futura text-[var(--gta-silhouette)] leading-relaxed">
                  <strong className="text-[var(--gta-text-outline)] font-medium font-diploma text-base">SRM Institute of Science and Technology (SRMIST)</strong> — Deep dive into geopolitics, grand strategy, conflict dynamics, and systemic global forces governing technological infrastructure.
                </p>
              </div>
              <div className="text-xs text-[var(--gta-silhouette)] pt-5 border-t border-[var(--gta-silhouette)]/20 font-bank uppercase tracking-wider font-bold">
                Geopolitics · Strategic foresight
              </div>
            </div>
          </TiltedCard>

          {/* Card 3: Venture Studio & Co-Founder Roles */}
          <GlareHover className="p-8 space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-[var(--gta-sky-low)] text-[var(--gta-text-outline)] rounded-xl flex items-center justify-center font-bold">
                <Rocket className="w-5 h-5" />
              </div>
              <span className="text-xs text-[var(--gta-silhouette)] font-bank uppercase tracking-wider font-bold block">
                Jun 2025 – Present
              </span>
              <h3 className="text-2xl font-bold font-beckett text-[var(--gta-text-outline)] tracking-tight leading-snug">
                Co-Founder across 3 ventures
              </h3>
              <p className="text-sm font-futura text-[var(--gta-silhouette)] leading-relaxed">
                Full-time Co-Founder at <strong className="text-[var(--gta-text-outline)] font-medium">Unfounded Venture Studio</strong>, <strong className="text-[var(--gta-text-outline)] font-medium">Zigger</strong>, and <strong className="text-[var(--gta-text-outline)] font-medium">Loopverse</strong> based on-site in Chennai. Harnessing Vibe Coding, product engineering, and GTM marketing.
              </p>
            </div>
            <div className="text-xs text-[var(--gta-silhouette)] pt-5 border-t border-[var(--gta-silhouette)]/20 font-bank uppercase tracking-wider font-bold">
              Vibe coding · Marketing · Leadership
            </div>
          </GlareHover>

        </div>

        {/* Highlight Banner Container using MagicBento & BlurText */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[var(--gta-sky-horizon)] border border-[var(--gta-silhouette)]/30 space-y-3 text-center">
          <span className="text-xs font-bold text-[var(--gta-silhouette)] font-bank uppercase tracking-widest block">
            Core Philosophy
          </span>
          <BlurText
            text="From literature to battlefields to boardrooms — the common thread has always been strategic curiosity."
            className="text-xl sm:text-3xl font-bold font-diploma text-[var(--gta-text-outline)] leading-snug max-w-3xl mx-auto"
            delay={0.02}
          />
        </div>

      </div>
    </section>
  );
}
