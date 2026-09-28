import React, { useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2, Layers, BookOpen, Calendar, Send, Compass } from 'lucide-react';
import soundSystem from '../lib/soundSystem';

const LANDMARK_IMAGES = {
  'arrival': '/images/gta/home_poster.jpg',
  'safehouse': '/images/gta/about_studio.jpg',
  'operations-garage': '/images/gta/ventures_workshop.jpg',
  'poster-wall': '/images/gta/events_gallery.jpg',
  'archive': '/images/gta/writing_archive.jpg',
  'dispatch-point': '/images/gta/contact_rooftop.jpg',
};

export default function LocationDossierModal({ landmark, onClose, onNavigate }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!landmark) return null;

  const renderContent = () => {
    switch (landmark.id) {
      case 'safehouse':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-[var(--gta-text-fill)]">
            <div className="p-3.5 rounded-xl bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/40 leading-relaxed">
              <strong className="text-[#E7B85A] block mb-1">CHIEF OPERATING OFFICER // CHENNAI</strong>
              Vijayrajkumar builds and scales operationally heavy marketplaces and AI cognitive memory architectures.
              Co-Founder &amp; COO at Unfounded, Ziggers, and LoopMemory.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-lg bg-[var(--gta-text-shadow)]/60 border border-[var(--gta-silhouette)]/30">
                <span className="text-[10px] font-bank text-[var(--gta-sky-mid)] block uppercase font-bold">Academic Focus</span>
                <span className="font-futura font-bold text-white text-xs">Defence &amp; Strategic Studies + Hindi Literature</span>
              </div>
              <div className="p-3 rounded-lg bg-[var(--gta-text-shadow)]/60 border border-[var(--gta-silhouette)]/30">
                <span className="text-[10px] font-bank text-[var(--gta-sky-mid)] block uppercase font-bold">Operational Base</span>
                <span className="font-futura font-bold text-white text-xs">Chennai, Tamil Nadu, India</span>
              </div>
            </div>
            <p className="text-[var(--gta-silhouette)] text-xs leading-relaxed">
              Independent technology executive profile. Specialized in unit economics, liquidity mechanics, and lossless agent state context.
            </p>
          </div>
        );

      case 'operations-garage':
        return (
          <div className="space-y-3 text-xs sm:text-sm text-[var(--gta-text-fill)]">
            <div className="p-3 rounded-xl bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/40 flex items-start gap-3">
              <span className="px-2 py-1 rounded bg-[#E7B85A]/20 text-[#E7B85A] font-bank text-[10px] font-black shrink-0">01</span>
              <div>
                <h4 className="font-futura font-bold text-white">Ziggers — On-Demand Gig Staffing</h4>
                <p className="text-xs text-[var(--gta-silhouette)] mt-0.5">Replacing informal WhatsApp coordination with verified daily-wage hospitality workers, real-time dispatch, and milestone escrow payouts.</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/40 flex items-start gap-3">
              <span className="px-2 py-1 rounded bg-[#8FADA0]/20 text-[#8FADA0] font-bank text-[10px] font-black shrink-0">02</span>
              <div>
                <h4 className="font-futura font-bold text-white">LoopMemory — AI Context &amp; Cognitive Graph</h4>
                <p className="text-xs text-[var(--gta-silhouette)] mt-0.5">Developer-first persistent context engine preventing context rot and quadratic token costs through hierarchical semantic memory graphs.</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/40 flex items-start gap-3">
              <span className="px-2 py-1 rounded bg-[#B7C2A8]/20 text-[#B7C2A8] font-bank text-[10px] font-black shrink-0">03</span>
              <div>
                <h4 className="font-futura font-bold text-white">Unfounded — Venture Studio</h4>
                <p className="text-xs text-[var(--gta-silhouette)] mt-0.5">Venture studio incubating zero-to-one digital products and operational frameworks in Chennai.</p>
              </div>
            </div>
          </div>
        );

      case 'poster-wall':
        return (
          <div className="space-y-3 text-xs sm:text-sm text-[var(--gta-text-fill)]">
            <p className="text-xs text-[var(--gta-silhouette)] leading-relaxed">
              Public keynotes, founder forums, and hackathon orchestrations across India and Central Asia.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/30">
                <span className="font-futura font-bold text-white block">Kazakhstan-India Forum</span>
                <span className="text-[10px] text-[var(--gta-sky-mid)]">Cross-border technology ecosystem bridge</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/30">
                <span className="font-futura font-bold text-white block">Global Education Summit</span>
                <span className="text-[10px] text-[var(--gta-sky-mid)]">Vocational liquidity and gig accreditation</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/30">
                <span className="font-futura font-bold text-white block">SaaSathon SSN</span>
                <span className="text-[10px] text-[var(--gta-sky-mid)]">Tamil Nadu engineering jury &amp; venture mentor</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/30">
                <span className="font-futura font-bold text-white block">Startup Pitchfest Kanyakumari</span>
                <span className="text-[10px] text-[var(--gta-sky-mid)]">Regional tier-2/3 founder incubation</span>
              </div>
            </div>
          </div>
        );

      case 'archive':
        return (
          <div className="space-y-3 text-xs sm:text-sm text-[var(--gta-text-fill)]">
            <p className="text-xs text-[var(--gta-silhouette)] leading-relaxed">
              Strategic research essays on marketplace liquidity, agent context architectures, and Indian venture ecosystems:
            </p>
            <ul className="space-y-2 text-xs">
              <li className="p-2 rounded bg-[var(--gta-text-shadow)]/60 border border-[var(--gta-silhouette)]/30 flex items-center justify-between">
                <span className="font-futura font-bold text-white">Startup Builder &amp; Venture Builder in India</span>
                <span className="text-[10px] font-bank text-[#E7B85A]">READ →</span>
              </li>
              <li className="p-2 rounded bg-[var(--gta-text-shadow)]/60 border border-[var(--gta-silhouette)]/30 flex items-center justify-between">
                <span className="font-futura font-bold text-white">Informal Gig Marketplaces &amp; Catering Workers</span>
                <span className="text-[10px] font-bank text-[#8FADA0]">READ →</span>
              </li>
              <li className="p-2 rounded bg-[var(--gta-text-shadow)]/60 border border-[var(--gta-silhouette)]/30 flex items-center justify-between">
                <span className="font-futura font-bold text-white">AI Persistent Context &amp; Cognitive Graph Engineering</span>
                <span className="text-[10px] font-bank text-[#B7C2A8]">READ →</span>
              </li>
            </ul>
          </div>
        );

      case 'dispatch-point':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-[var(--gta-text-fill)]">
            <div className="p-3.5 rounded-xl bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/40 leading-relaxed">
              <strong className="text-[#E7B85A] block mb-1">FOUNDER ADVISORY &amp; COO DISPATCH</strong>
              Available for fractional COO partnerships, marketplace zero-to-one validation, and AI memory architecture advisory.
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/40 text-[var(--gta-sky-mid)] font-mono">
                Email: vijaykumarunfounded@gmail.com
              </span>
              <span className="px-3 py-1 rounded-full bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/40 text-[var(--gta-sky-mid)] font-mono">
                Location: Chennai, Tamil Nadu
              </span>
            </div>
          </div>
        );

      default:
        return (
          <p className="text-xs text-[var(--gta-silhouette)] leading-relaxed">
            {landmark.description}
          </p>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[var(--gta-text-outline)] border-2 border-[var(--gta-silhouette)] rounded-3xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] max-h-[90vh] flex flex-col justify-between">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[var(--gta-silhouette)]/30">
            <div className="flex items-center gap-2.5">
              <span
                className="w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs"
                style={{ backgroundColor: landmark.color, color: '#0A0E0C' }}
              >
                {landmark.icon}
              </span>
              <div>
                <span className="font-bank text-[10px] font-black tracking-widest text-[#E7B85A] uppercase block">
                  MISSION DOSSIER // {landmark.chapter}
                </span>
                <h3 className="font-bank text-lg sm:text-xl font-bold text-[var(--gta-text-fill)] uppercase">
                  {landmark.title}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundSystem.playSelect();
                onClose();
              }}
              onMouseEnter={() => soundSystem.playHover()}
              className="w-8 h-8 rounded-full bg-[var(--gta-text-shadow)] border border-[var(--gta-silhouette)]/40 flex items-center justify-center text-[var(--gta-silhouette)] hover:text-white transition-colors cursor-pointer"
              title="Close Dossier (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Landmark Visual Preview */}
          {LANDMARK_IMAGES[landmark.id] && (
            <div className="mt-4 w-full h-36 sm:h-44 rounded-2xl overflow-hidden border border-[var(--gta-silhouette)]/40 relative shadow-inner">
              <img
                src={LANDMARK_IMAGES[landmark.id]}
                alt={landmark.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-[#11100E]/85 backdrop-blur-sm text-[10px] font-bank uppercase tracking-wider px-2.5 py-0.5 rounded text-[#E7B85A] font-bold border border-[var(--gta-silhouette)]/30">
                {landmark.chapter} // VISUAL RECORD
              </div>
            </div>
          )}

          {/* Body Content */}
          <div className="mt-4 overflow-y-auto max-h-[42vh] pr-1">
            {renderContent()}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[var(--gta-silhouette)]/30 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              soundSystem.playSelect();
              onClose();
            }}
            onMouseEnter={() => soundSystem.playHover()}
            className="px-4 py-2 rounded-xl bg-[var(--gta-text-shadow)] hover:bg-[#202020] border border-[var(--gta-silhouette)] text-[var(--gta-silhouette)] hover:text-white font-bank text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            ← BACK TO EXPLORATION (ESC)
          </button>

          <button
            type="button"
            onClick={() => {
              soundSystem.playSelect();
              onNavigate(landmark.path);
            }}
            onMouseEnter={() => soundSystem.playHover()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E7B85A] hover:bg-[#F2C975] text-[#0A0E0C] font-bank text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <span>OPEN FULL PAGE</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
