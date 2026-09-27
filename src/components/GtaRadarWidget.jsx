import React, { useState, useEffect } from 'react';
import soundSystem from '../lib/soundSystem';

const WAYPOINTS = [
  { id: 'about', label: 'ABOUT', path: '/about/', angle: -45, dist: 52, color: '#E7B85A', icon: '■' },
  { id: 'ventures', label: 'VENTURES', path: '/ventures/', angle: 30, dist: 58, color: '#8FADA0', icon: '◆' },
  { id: 'events', label: 'EVENTS', path: '/events/', angle: 120, dist: 64, color: '#D87942', icon: '▲' },
  { id: 'writing', label: 'WRITING', path: '/writing/', angle: -130, dist: 50, color: '#A96E72', icon: '●' },
  { id: 'contact', label: 'CONTACT', path: '/contact/', angle: 180, dist: 55, color: '#F0E8D0', icon: '✦' },
];

export default function GtaRadarWidget() {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeBlip, setActiveBlip] = useState(null);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setIsAudioActive(!soundSystem.isMuted());
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
      // Auto-collapse on small mobile screens to keep view clean
      if (window.innerWidth < 640) {
        setIsCollapsed(true);
      }
    }

    const handlePop = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const handleToggleAudio = () => {
    const active = soundSystem.toggleSound();
    setIsAudioActive(active);
    if (active) {
      soundSystem.playSelect();
    }
  };

  const handleNavigate = (path) => {
    soundSystem.playSelect();
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="GTA Minimap Navigation HUD and Audio Console"
      className="fixed bottom-4 left-4 z-50 select-none print:hidden"
    >
      {/* Collapsed State: Discrete circular HUD badge */}
      {isCollapsed ? (
        <button
          type="button"
          onClick={() => {
            soundSystem.playSelect();
            setIsCollapsed(false);
          }}
          onMouseEnter={() => soundSystem.playHover()}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[var(--gta-text-outline)]/90 backdrop-blur-md border-2 border-[var(--gta-silhouette)] shadow-[0_8px_30px_rgba(0,0,0,0.85)] hover:border-[#E7B85A] transition-all cursor-pointer"
          title="Open GTA Minimap HUD & Audio"
          aria-label="Expand Minimap HUD"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E7B85A] animate-ping absolute" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#E7B85A] z-10" />
          <span className="sr-only">Expand Minimap</span>
        </button>
      ) : (
        /* Expanded Circular Radar HUD */
        <div className="relative bg-[var(--gta-text-outline)]/95 backdrop-blur-lg border-2 border-[var(--gta-silhouette)] rounded-2xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.9)] max-w-[240px] text-xs">
          {/* Header Controls: Minimize & Audio Toggle */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--gta-silhouette)]/30">
            <button
              type="button"
              onClick={handleToggleAudio}
              onMouseEnter={() => soundSystem.playHover()}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bank font-bold tracking-wider transition-all border ${
                isAudioActive
                  ? 'bg-[#E7B85A]/20 text-[#E7B85A] border-[#E7B85A]'
                  : 'bg-[var(--gta-text-outline)] text-[var(--gta-silhouette)] border-[var(--gta-silhouette)]/50 hover:text-[var(--gta-text-fill)]'
              }`}
              title="Toggle Ambient Audio & UI Clicks"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isAudioActive ? 'bg-[#E7B85A] animate-pulse' : 'bg-neutral-600'
                }`}
              />
              <span>{isAudioActive ? 'AUDIO: ON' : 'AUDIO: OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundSystem.playSelect();
                setIsCollapsed(true);
              }}
              onMouseEnter={() => soundSystem.playHover()}
              className="text-[var(--gta-silhouette)] hover:text-[var(--gta-text-fill)] px-1.5 py-0.5 text-xs font-mono font-bold transition-colors cursor-pointer"
              title="Minimize Minimap"
              aria-label="Minimize Minimap HUD"
            >
              ✕
            </button>
          </div>

          {/* Circular Radar Screen */}
          <div className="relative w-44 h-44 mx-auto rounded-full bg-[#0C120F] border-2 border-[var(--gta-silhouette)] overflow-hidden shadow-inner flex items-center justify-center">
            {/* Concentric distance rings */}
            <div className="absolute inset-4 rounded-full border border-[var(--gta-silhouette)]/25 pointer-events-none" />
            <div className="absolute inset-10 rounded-full border border-[var(--gta-silhouette)]/35 pointer-events-none" />
            <div className="absolute inset-16 rounded-full border border-[var(--gta-silhouette)]/45 pointer-events-none" />

            {/* Radar Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-[var(--gta-silhouette)]/30" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-full w-[1px] bg-[var(--gta-silhouette)]/30" />
            </div>

            {/* Rotating Radar Sweep Beam */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none animate-[spin_4s_linear_infinite]"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(231,184,90,0.3) 0deg, rgba(231,184,90,0.05) 45deg, transparent 90deg, transparent 360deg)',
              }}
            />

            {/* North Indicator */}
            <div className="absolute top-1 font-bank text-[9px] font-black text-[#E7B85A] select-none pointer-events-none">
              N
            </div>

            {/* Center Player Marker (White Directional Chevron) */}
            <div className="relative z-10 w-2.5 h-2.5 flex items-center justify-center text-[var(--gta-text-fill)] font-bold text-[10px] drop-shadow-md pointer-events-none">
              ▲
            </div>

            {/* Mission Waypoints / Route Blips */}
            {WAYPOINTS.map((wp) => {
              const rad = (wp.angle * Math.PI) / 180;
              const x = Math.cos(rad) * wp.dist;
              const y = Math.sin(rad) * wp.dist;
              const isCurrent = currentPath.startsWith(wp.path);

              return (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => handleNavigate(wp.path)}
                  onMouseEnter={() => {
                    soundSystem.playHover();
                    setActiveBlip(wp);
                  }}
                  onMouseLeave={() => setActiveBlip(null)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    color: wp.color,
                  }}
                  className={`absolute z-20 w-4 h-4 flex items-center justify-center text-xs font-bold transition-transform hover:scale-150 cursor-pointer ${
                    isCurrent ? 'animate-pulse scale-125' : ''
                  }`}
                  aria-label={`Jump to ${wp.label}`}
                  title={`${wp.label} — ${wp.path}`}
                >
                  <span className="drop-shadow-[0_0_4px_currentColor]">{wp.icon}</span>
                </button>
              );
            })}
          </div>

          {/* Active Blip Label or Coordinate Telemetry */}
          <div className="mt-2 text-center font-bank text-[10px] tracking-wider uppercase">
            {activeBlip ? (
              <span className="text-[#E7B85A] font-bold">
                DEST: {activeBlip.label} ({activeBlip.path})
              </span>
            ) : (
              <span className="text-[var(--gta-silhouette)]">
                LOC: CHENNAI // 13.08° N, 80.27° E
              </span>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
