import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Compass, Briefcase, FileText, Send, Calendar, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import HomeFAQSection from './HomeFAQSection';
import soundSystem from '../lib/soundSystem';

export default function GuidedChaptersLayer({
  onActiveChapterChange = () => {},
  onEnterExploreMode = () => {},
  onNavigate = () => {},
}) {
  const heroRef = useRef(null);
  const safehouseRef = useRef(null);
  const garageRef = useRef(null);
  const posterWallRef = useRef(null);
  const archiveRef = useRef(null);
  const dispatchRef = useRef(null);

  useEffect(() => {
    const sections = [
      { id: 'arrival', ref: heroRef },
      { id: 'safehouse', ref: safehouseRef },
      { id: 'operations-garage', ref: garageRef },
      { id: 'poster-wall', ref: posterWallRef },
      { id: 'archive', ref: archiveRef },
      { id: 'dispatch-point', ref: dispatchRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            onActiveChapterChange(entry.target.getAttribute('data-chapter-id'));
          }
        });
      },
      { threshold: [0.35, 0.6] }
    );

    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [onActiveChapterChange]);

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    soundSystem.playSelect();
    onNavigate(path);
  };

  return (
    <div className="relative z-10 w-full flex flex-col pointer-events-none select-none">
      
      {/* =========================================================================
          CHAPTER 0: ARRIVAL STREET (Hero Overlay)
          ========================================================================= */}
      <section
        id="hero"
        data-chapter-id="arrival"
        ref={heroRef}
        aria-label="Arrival Street — Vijayrajkumar Portfolio"
        className="min-h-screen flex flex-col justify-between p-4 sm:p-8 max-w-7xl mx-auto w-full pt-6 pointer-events-none"
      >
        {/* Top Telemetry Header */}
        <div className="pointer-events-auto flex items-center justify-between w-full">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--gta-text-outline)]/90 backdrop-blur-md border border-[var(--gta-silhouette)] shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E7B85A] animate-ping" />
            <span className="font-bank text-[10px] sm:text-xs font-bold tracking-widest text-[var(--gta-text-fill)] uppercase">
              CHENNAI, IN // MISSION: ACTIVE
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--gta-text-outline)]/90 backdrop-blur-md border border-[var(--gta-silhouette)] shadow-lg">
            <span className="font-bank text-[10px] sm:text-xs font-bold tracking-widest text-[var(--gta-text-fill-warm)] uppercase">
              DISTRICT MAP // 5 LOCATIONS
            </span>
          </div>
        </div>

        {/* Middle Spacer */}
        <div className="flex-1" />

        {/* Bottom Hero Call to Action Bar */}
        <div className="pointer-events-auto pb-10 flex flex-col items-center justify-center gap-4 text-center max-w-2xl mx-auto">
          <div className="bg-[#1B1A16] border-2 border-[var(--gta-silhouette)] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.95)] w-full">
            <span className="font-bank text-[10px] sm:text-xs font-black tracking-widest text-[#E7B85A] uppercase block mb-1">
              THE PLAYABLE PORTFOLIO // AUTONOMOUS DISTRICT
            </span>
            <h1 className="text-2xl sm:text-4xl font-bank font-bold text-[#F7F0E3] uppercase tracking-wide leading-tight">
              Vijayrajkumar
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-futura text-[#EDE4C8] leading-relaxed">
              Chief Operating Officer &amp; Venture Builder in Chennai. Building gig marketplaces (Ziggers) and cognitive memory infrastructure (LoopMemory).
            </p>

            {/* Action Buttons */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  soundSystem.playSelect();
                  document.getElementById('safehouse')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={() => soundSystem.playHover()}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#E7B85A] hover:bg-[#F2C975] text-[#0A0E0C] font-bank text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <span>Explore City Journey ↓</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundSystem.playExploreEnter();
                  onEnterExploreMode();
                }}
                onMouseEnter={() => soundSystem.playHover()}
                className="hidden md:flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#141310] hover:bg-[#222222] border-2 border-[var(--gta-silhouette)] text-[#EDE4C8] hover:text-[#E7B85A] font-bank text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                title="Enter free 3D exploration mode with WASD keys and mouse look"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E7B85A]" />
                <span>Playable Explore Mode (WASD)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 1: THE SAFEHOUSE (About & Biography)
          ========================================================================= */}
      <section
        id="safehouse"
        data-chapter-id="safehouse"
        ref={safehouseRef}
        aria-label="The Safehouse — About Vijayrajkumar"
        className="min-h-screen py-24 px-4 sm:px-8 max-w-5xl mx-auto w-full flex items-center justify-start pointer-events-none"
      >
        <div className="pointer-events-auto max-w-xl bg-[#1B1A16] border-2 border-[var(--gta-silhouette)]/80 hover:border-[#E7B85A] rounded-3xl p-6 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.95)] transition-all">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#E7B85A] text-[#0A0E0C] flex items-center justify-center font-bold text-xs">
                ■
              </span>
              <span className="font-bank text-xs font-black tracking-widest text-[#E7B85A] uppercase">
                01 // THE SAFEHOUSE
              </span>
            </div>
            <span className="font-bank text-[10px] text-[#8FADA0] tracking-widest uppercase">
              ABOUT &amp; STRATEGY
            </span>
          </div>

          <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-[var(--gta-silhouette)]/40 relative shadow-inner">
            <img
              src="/images/gta/about_studio.jpg"
              alt="The Safehouse — Operator Studio & Workspace"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <h2 className="text-xl sm:text-3xl font-bank font-bold text-[#F7F0E3] uppercase leading-snug">
            Operator Mindset &amp; Strategic Journey
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-futura text-[#EDE4C8] leading-relaxed">
            Operating on-site in Chennai, Tamil Nadu. Deep academic foundations in Defence and Strategic Studies and Hindi Literature, applied directly to venture operations, supply liquidity, and unit economics.
          </p>

          <div className="mt-4 p-3 rounded-xl bg-[#141310] border border-[var(--gta-silhouette)]/40 text-[11px] text-[#D9D8B0] leading-relaxed">
            <strong className="text-[#F7F0E3] block mb-0.5">Entity Verification:</strong>
            Independent technology executive profile. Not affiliated with Indian film actor Vinay Rajkumar.
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--gta-silhouette)]/30 flex items-center justify-between">
            <a
              href="/about/"
              onClick={(e) => handleLinkClick(e, '/about/')}
              onMouseEnter={() => soundSystem.playHover()}
              className="inline-flex items-center gap-2 font-bank text-xs font-bold text-[#E7B85A] hover:text-[#F2C975] uppercase tracking-wider group cursor-pointer"
            >
              <span>Inspect Full Biography &amp; Credentials</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 2: THE OPERATIONS GARAGE (Ventures & Case Studies)
          ========================================================================= */}
      <section
        id="operations-garage"
        data-chapter-id="operations-garage"
        ref={garageRef}
        aria-label="The Operations Garage — Operating Ventures"
        className="min-h-screen py-24 px-4 sm:px-8 max-w-5xl mx-auto w-full flex items-center justify-end pointer-events-none"
      >
        <div className="pointer-events-auto max-w-xl bg-[#1B1A16] border-2 border-[var(--gta-silhouette)]/80 hover:border-[#8FADA0] rounded-3xl p-6 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.95)] transition-all">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#8FADA0] text-[#0A0E0C] flex items-center justify-center font-bold text-xs">
                ◆
              </span>
              <span className="font-bank text-xs font-black tracking-widest text-[#8FADA0] uppercase">
                02 // OPERATIONS GARAGE
              </span>
            </div>
            <span className="font-bank text-[10px] text-[#8FADA0] tracking-widest uppercase">
              VENTURES &amp; SYSTEMS
            </span>
          </div>

          <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-[var(--gta-silhouette)]/40 relative shadow-inner">
            <img
              src="/images/gta/ventures_workshop.jpg"
              alt="Operations Garage — 3-Bay Industrial Workshop"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <h2 className="text-xl sm:text-3xl font-bank font-bold text-[#F7F0E3] uppercase leading-snug">
            Active Ventures &amp; Production Deployments
          </h2>

          <div className="mt-4 space-y-3">
            <a
              href="/ventures/ziggers/"
              onClick={(e) => handleLinkClick(e, '/ventures/ziggers/')}
              onMouseEnter={() => soundSystem.playHover()}
              className="block p-3.5 rounded-2xl bg-[#141310] hover:bg-[#1E2420] border border-[var(--gta-silhouette)]/40 transition-all cursor-pointer group no-underline"
            >
              <div className="flex items-center justify-between">
                <span className="font-bank text-xs font-bold text-[#E7B85A] uppercase">01 // Ziggers</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8FADA0] group-hover:text-[#E7B85A] transition-colors" />
              </div>
              <p className="text-xs text-[#EDE4C8] mt-1 leading-relaxed">
                On-demand verified gig staffing marketplace solving catering no-shows with real-time dispatch and milestone escrow payouts.
              </p>
            </a>

            <a
              href="/ventures/loopmemory/"
              onClick={(e) => handleLinkClick(e, '/ventures/loopmemory/')}
              onMouseEnter={() => soundSystem.playHover()}
              className="block p-3.5 rounded-2xl bg-[#141310] hover:bg-[#1E2420] border border-[var(--gta-silhouette)]/40 transition-all cursor-pointer group no-underline"
            >
              <div className="flex items-center justify-between">
                <span className="font-bank text-xs font-bold text-[#8FADA0] uppercase">02 // LoopMemory</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8FADA0] group-hover:text-[#8FADA0] transition-colors" />
              </div>
              <p className="text-xs text-[#EDE4C8] mt-1 leading-relaxed">
                Developer-first persistent context and cognitive memory engine for autonomous AI agents, eliminating context rot.
              </p>
            </a>

            <a
              href="/ventures/"
              onClick={(e) => handleLinkClick(e, '/ventures/')}
              onMouseEnter={() => soundSystem.playHover()}
              className="block p-3.5 rounded-2xl bg-[#141310] hover:bg-[#1E2420] border border-[var(--gta-silhouette)]/40 transition-all cursor-pointer group no-underline"
            >
              <div className="flex items-center justify-between">
                <span className="font-bank text-xs font-bold text-[#B7C2A8] uppercase">03 // Unfounded</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8FADA0] group-hover:text-[#B7C2A8] transition-colors" />
              </div>
              <p className="text-xs text-[#EDE4C8] mt-1 leading-relaxed">
                Venture studio validating and launching defensible digital products and urban operational frameworks.
              </p>
            </a>
          </div>

          <div className="mt-5 pt-4 border-t border-[var(--gta-silhouette)]/30 flex items-center justify-between">
            <a
              href="/ventures/"
              onClick={(e) => handleLinkClick(e, '/ventures/')}
              onMouseEnter={() => soundSystem.playHover()}
              className="inline-flex items-center gap-2 font-bank text-xs font-bold text-[#8FADA0] hover:text-[#B7C2A8] uppercase tracking-wider cursor-pointer"
            >
              <span>Explore All Ventures &amp; Case Studies</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 3: THE POSTER WALL (Events & Community Summits)
          ========================================================================= */}
      <section
        id="poster-wall"
        data-chapter-id="poster-wall"
        ref={posterWallRef}
        aria-label="The Poster Wall — Events and Public Summits"
        className="min-h-screen py-24 px-4 sm:px-8 max-w-5xl mx-auto w-full flex items-center justify-start pointer-events-none"
      >
        <div className="pointer-events-auto max-w-xl bg-[#1B1A16] border-2 border-[var(--gta-silhouette)]/80 hover:border-[#D87942] rounded-3xl p-6 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.95)] transition-all">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#D87942] text-[#0A0E0C] flex items-center justify-center font-bold text-xs">
                ▲
              </span>
              <span className="font-bank text-xs font-black tracking-widest text-[#D87942] uppercase">
                03 // THE POSTER WALL
              </span>
            </div>
            <span className="font-bank text-[10px] text-[#D87942] tracking-widest uppercase">
              EVENTS &amp; APPEARANCES
            </span>
          </div>

          <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-[var(--gta-silhouette)]/40 relative shadow-inner">
            <img
              src="/images/gta/events_gallery.jpg"
              alt="The Poster Wall — Courtyard Poster Gallery"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <h2 className="text-xl sm:text-3xl font-bank font-bold text-[#F7F0E3] uppercase leading-snug">
            Keynotes, Summits &amp; Community Forums
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-futura text-[#EDE4C8] leading-relaxed">
            Public appearances and ecosystem discussions bridging international tech collaborations, gig labor rights, and student developer hackathons.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-[#141310] border border-[var(--gta-silhouette)]/30">
              <span className="font-futura font-bold text-[#F7F0E3] text-xs block">Kazakhstan-India Forum</span>
              <span className="text-[10px] font-bank text-[#D9D8B0]">Central Asia tech diplomacy</span>
            </div>
            <div className="p-3 rounded-xl bg-[#141310] border border-[var(--gta-silhouette)]/30">
              <span className="font-futura font-bold text-[#F7F0E3] text-xs block">Global Education Summit</span>
              <span className="text-[10px] font-bank text-[#D9D8B0]">Vocational liquidity panel</span>
            </div>
            <div className="p-3 rounded-xl bg-[#141310] border border-[var(--gta-silhouette)]/30">
              <span className="font-futura font-bold text-[#F7F0E3] text-xs block">SaaSathon SSN</span>
              <span className="text-[10px] font-bank text-[#D9D8B0]">Hackathon jury &amp; mentor</span>
            </div>
            <div className="p-3 rounded-xl bg-[#141310] border border-[var(--gta-silhouette)]/30">
              <span className="font-futura font-bold text-[#F7F0E3] text-xs block">Startup Pitchfest Kanyakumari</span>
              <span className="text-[10px] font-bank text-[#D9D8B0]">Tier-2 founder jury</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--gta-silhouette)]/30 flex items-center justify-between">
            <a
              href="/events/"
              onClick={(e) => handleLinkClick(e, '/events/')}
              onMouseEnter={() => soundSystem.playHover()}
              className="inline-flex items-center gap-2 font-bank text-xs font-bold text-[#D87942] hover:text-[#EDE4C8] uppercase tracking-wider cursor-pointer"
            >
              <span>View All Events &amp; Photo Archives</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 4: THE ARCHIVE (Writing & Research)
          ========================================================================= */}
      <section
        id="archive"
        data-chapter-id="archive"
        ref={archiveRef}
        aria-label="The Archive — Writing and Strategic Research"
        className="min-h-screen py-24 px-4 sm:px-8 max-w-5xl mx-auto w-full flex items-center justify-end pointer-events-none"
      >
        <div className="pointer-events-auto max-w-xl bg-[#1B1A16] border-2 border-[var(--gta-silhouette)]/80 hover:border-[#B7C2A8] rounded-3xl p-6 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.95)] transition-all">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#B7C2A8] text-[#0A0E0C] flex items-center justify-center font-bold text-xs">
                ●
              </span>
              <span className="font-bank text-xs font-black tracking-widest text-[#B7C2A8] uppercase">
                04 // THE ARCHIVE
              </span>
            </div>
            <span className="font-bank text-[10px] text-[#8FADA0] tracking-widest uppercase">
              ESSAYS &amp; RESEARCH
            </span>
          </div>

          <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-[var(--gta-silhouette)]/40 relative shadow-inner">
            <img
              src="/images/gta/writing_archive.jpg"
              alt="The Archive — Research Library & Essays"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <h2 className="text-xl sm:text-3xl font-bank font-bold text-[#F7F0E3] uppercase leading-snug">
            Long-Form Research &amp; Field Reports
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-futura text-[#EDE4C8] leading-relaxed">
            Essays on startup building in India, informal marketplace dynamics, defence strategic studies, and agent context graphs.
          </p>

          <div className="mt-4 space-y-2.5">
            <a
              href="/writing/startup-builder-venture-builder-india/"
              onClick={(e) => handleLinkClick(e, '/writing/startup-builder-venture-builder-india/')}
              onMouseEnter={() => soundSystem.playHover()}
              className="p-3.5 rounded-xl bg-[#141310] hover:bg-[#1E2420] border border-[var(--gta-silhouette)]/40 flex items-center justify-between text-xs text-[#EDE4C8] no-underline transition-colors block"
            >
              <span className="font-futura font-bold text-[#F7F0E3] truncate pr-2">Startup Builder &amp; Venture Builder in India</span>
              <span className="font-bank text-[10px] text-[#E7B85A] uppercase shrink-0">READ →</span>
            </a>

            <a
              href="/writing/catering-workers-in-chennai/"
              onClick={(e) => handleLinkClick(e, '/writing/catering-workers-in-chennai/')}
              onMouseEnter={() => soundSystem.playHover()}
              className="p-3.5 rounded-xl bg-[#141310] hover:bg-[#1E2420] border border-[var(--gta-silhouette)]/40 flex items-center justify-between text-xs text-[#EDE4C8] no-underline transition-colors block"
            >
              <span className="font-futura font-bold text-[#F7F0E3] truncate pr-2">Catering Workers in Chennai: Informal Liquidity</span>
              <span className="font-bank text-[10px] text-[#8FADA0] uppercase shrink-0">READ →</span>
            </a>

            <a
              href="/writing/ai-persistent-context-architecture/"
              onClick={(e) => handleLinkClick(e, '/writing/ai-persistent-context-architecture/')}
              onMouseEnter={() => soundSystem.playHover()}
              className="p-3.5 rounded-xl bg-[#141310] hover:bg-[#1E2420] border border-[var(--gta-silhouette)]/40 flex items-center justify-between text-xs text-[#EDE4C8] no-underline transition-colors block"
            >
              <span className="font-futura font-bold text-[#F7F0E3] truncate pr-2">AI Persistent Context &amp; Cognitive Architecture</span>
              <span className="font-bank text-[10px] text-[#B7C2A8] uppercase shrink-0">READ →</span>
            </a>
          </div>

          <div className="mt-5 pt-4 border-t border-[var(--gta-silhouette)]/30 flex items-center justify-between">
            <a
              href="/writing/"
              onClick={(e) => handleLinkClick(e, '/writing/')}
              onMouseEnter={() => soundSystem.playHover()}
              className="inline-flex items-center gap-2 font-bank text-xs font-bold text-[#B7C2A8] hover:text-[#EDE4C8] uppercase tracking-wider cursor-pointer"
            >
              <span>Explore Complete Writing Archive</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 5: THE DISPATCH POINT (Contact & FAQs)
          ========================================================================= */}
      <section
        id="dispatch-point"
        data-chapter-id="dispatch-point"
        ref={dispatchRef}
        aria-label="The Dispatch Point — Contact and FAQs"
        className="min-h-screen py-24 px-4 sm:px-8 max-w-5xl mx-auto w-full flex flex-col justify-center pointer-events-none"
      >
        <div className="pointer-events-auto bg-[#1B1A16] border-2 border-[var(--gta-silhouette)]/80 hover:border-[#EDE4C8] rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.95)] mb-12">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#EDE4C8] text-[#0A0E0C] flex items-center justify-center font-bold text-xs">
                ✦
              </span>
              <span className="font-bank text-xs font-black tracking-widest text-[#EDE4C8] uppercase">
                05 // DISPATCH POINT
              </span>
            </div>
            <span className="font-bank text-[10px] text-[#8FADA0] tracking-widest uppercase">
              CONTACT &amp; ADVISORY
            </span>
          </div>

          <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-[var(--gta-silhouette)]/40 relative shadow-inner">
            <img
              src="/images/gta/contact_rooftop.jpg"
              alt="Dispatch Point — Rooftop Transmission Station"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <h2 className="text-xl sm:text-3xl font-bank font-bold text-[#F7F0E3] uppercase leading-snug">
            Founder Collaboration &amp; Direct Dispatch
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-futura text-[#EDE4C8] leading-relaxed">
            Available for fractional COO partnerships, marketplace zero-to-one validation, and AI memory architecture advisory.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="/contact/"
              onClick={(e) => handleLinkClick(e, '/contact/')}
              onMouseEnter={() => soundSystem.playHover()}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#E7B85A] hover:bg-[#F2C975] text-[#0A0E0C] font-bank text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Collaboration Dispatch →</span>
            </a>

            <a
              href="mailto:vijaykumarunfounded@gmail.com"
              onMouseEnter={() => soundSystem.playHover()}
              className="px-5 py-3 rounded-2xl bg-[#141310] hover:bg-[#202020] border border-[var(--gta-silhouette)] text-[#EDE4C8] hover:text-[#E7B85A] font-bank text-xs font-bold uppercase tracking-wider transition-all"
            >
              vijaykumarunfounded@gmail.com
            </a>
          </div>
        </div>

        {/* Executive Summary & Knowledge Hub (Full FAQs) */}
        <div className="pointer-events-auto">
          <HomeFAQSection />
        </div>
      </section>

    </div>
  );
}
