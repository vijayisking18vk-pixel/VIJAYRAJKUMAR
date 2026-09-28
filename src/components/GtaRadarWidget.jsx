import React, { useState, useEffect } from 'react';
import soundSystem from '../lib/soundSystem';

const WAYPOINTS = [
  { id: 'safehouse', label: 'SAFEHOUSE', sectionId: 'safehouse', path: '/about/', angle: -45, dist: 52, color: '#E7B85A', icon: '■' },
  { id: 'operations-garage', label: 'VENTURES', sectionId: 'operations-garage', path: '/ventures/', angle: 30, dist: 58, color: '#8FADA0', icon: '◆' },
  { id: 'poster-wall', label: 'EVENTS', sectionId: 'poster-wall', path: '/events/', angle: 120, dist: 64, color: '#D87942', icon: '▲' },
  { id: 'archive', label: 'ARCHIVE', sectionId: 'archive', path: '/writing/', angle: -130, dist: 50, color: '#B7C2A8', icon: '●' },
  { id: 'dispatch-point', label: 'CONTACT', sectionId: 'dispatch-point', path: '/contact/', angle: 180, dist: 55, color: '#EDE4C8', icon: '✦' },
];

export default function GtaRadarWidget({
  isExploreMode = false,
  onToggleExploreMode = () => {},
  playerTelemetry = null,
  activeLandmarkId = null,
  onSelectLandmark = null,
}) {
  const [isAudioActive, setIsAudioActive] = useState(!soundSystem.isMuted());
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeBlip, setActiveBlip] = useState(null);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    const unsubscribe = soundSystem.subscribe((active) => {
      setIsAudioActive(active);
    });

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
    return () => {
      unsubscribe();
      window.removeEventListener('popstate', handlePop);
    };
  }, []);

  const handleToggleAudio = () => {
    const active = soundSystem.toggleSound();
    setIsAudioActive(active);
    if (active) {
      soundSystem.playSelect();
    }
  };

  const handleWaypointClick = (wp) => {
    soundSystem.playSelect();
    if (onSelectLandmark) {
      onSelectLandmark(wp);
    }
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      const el = document.getElementById(wp.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (window.location.pathname !== wp.path) {
      window.history.pushState(null, '', wp.path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const chevronRotation = playerTelemetry?.angle
    ? `${(-playerTelemetry.angle * 180) / Math.PI}deg`
    : '0deg';

  return (
    <aside
      aria-label="GTA Minimap Navigation HUD and Audio Console"
      className="fixed bottom-4 left-4 z-50 select-none touch-none print:hidden"
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
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[var(--gta-text-outline)]/95 backdrop-blur-md border-2 border-[var(--gta-silhouette)] shadow-[0_8px_30px_rgba(0,0,0,0.85)] hover:border-[#E7B85A] active:scale-95 transition-all cursor-pointer touch-manipulation"
          title="Open GTA Minimap HUD & Audio"
          aria-label="Expand Minimap HUD"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E7B85A] animate-ping absolute" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#E7B85A] z-10" />
          <span className="sr-only">Expand Minimap</span>
        </button>
      ) : (
        /* Expanded Circular Radar HUD */
        <div className="relative bg-[var(--gta-text-outline)]/95 backdrop-blur-lg border-2 border-[var(--gta-silhouette)] rounded-2xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.9)] w-[240px] text-xs">
          {/* Header Controls: Audio Toggle, Explore Mode Toggle & Minimize */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--gta-silhouette)]/30 gap-1.5">
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={handleToggleAudio}
              onMouseEnter={() => soundSystem.playHover()}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bank font-bold tracking-wider transition-all border cursor-pointer active:scale-95 touch-manipulation ${
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
              <span>{isAudioActive ? 'ON' : 'OFF'}</span>
            </button>

            {/* Desktop Explore Mode Toggle */}
            <button
              type="button"
              onClick={() => {
                if (isExploreMode) soundSystem.playExploreExit();
                else soundSystem.playExploreEnter();
                onToggleExploreMode();
              }}
              onMouseEnter={() => soundSystem.playHover()}
              className={`hidden md:flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bank font-bold tracking-wider transition-all border cursor-pointer active:scale-95 touch-manipulation ${
                isExploreMode
                  ? 'bg-[#E7B85A] text-[#0A0E0C] border-[#E7B85A]'
                  : 'bg-[var(--gta-text-outline)] text-[var(--gta-silhouette)] border-[var(--gta-silhouette)]/50 hover:text-[var(--gta-text-fill)]'
              }`}
              title="Toggle Free 3D Explore Mode (WASD)"
            >
              <span>{isExploreMode ? 'GUIDED' : 'EXPLORE'}</span>
            </button>

            {/* Minimize button */}
            <button
              type="button"
              onClick={() => {
                soundSystem.playSelect();
                setIsCollapsed(true);
              }}
              onMouseEnter={() => soundSystem.playHover()}
              className="text-[var(--gta-silhouette)] hover:text-[var(--gta-text-fill)] active:scale-90 px-1.5 py-0.5 text-xs font-mono font-bold transition-transform cursor-pointer touch-manipulation ml-auto"
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

            {/* Center Player Marker (White Directional Chevron, rotates with player facing angle) */}
            <div
              className="relative z-10 w-2.5 h-2.5 flex items-center justify-center text-[var(--gta-text-fill)] font-bold text-[10px] drop-shadow-md pointer-events-none transition-transform duration-75"
              style={{ transform: `rotate(${chevronRotation})` }}
            >
              ▲
            </div>

            {/* Mission Waypoints / Route Blips */}
            {WAYPOINTS.map((wp) => {
              const rad = (wp.angle * Math.PI) / 180;
              const x = Math.cos(rad) * wp.dist;
              const y = Math.sin(rad) * wp.dist;
              const isCurrent =
                activeLandmarkId === wp.id ||
                currentPath.startsWith(wp.path);

              return (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => handleWaypointClick(wp)}
                  onPointerEnter={() => {
                    soundSystem.playHover();
                    setActiveBlip(wp);
                  }}
                  onPointerLeave={() => setActiveBlip(null)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    color: wp.color,
                  }}
                  className={`absolute z-20 w-5 h-5 -ml-2.5 -mt-2.5 flex items-center justify-center text-xs font-bold transition-transform md:hover:scale-125 active:scale-110 cursor-pointer touch-manipulation ${
                    isCurrent ? 'animate-pulse scale-110' : ''
                  }`}
                  aria-label={`Jump to ${wp.label}`}
                  title={`${wp.label} — ${wp.path}`}
                >
                  <span className="drop-shadow-[0_0_4px_currentColor] pointer-events-none select-none">{wp.icon}</span>
                </button>
              );
            })}
          </div>

          {/* Active Blip Label or Coordinate Telemetry (Fixed height prevents vertical layout shaking) */}
          <div className="mt-2 h-5 flex items-center justify-center text-center font-bank text-[10px] tracking-wider uppercase overflow-hidden">
            {activeBlip ? (
              <span className="text-[#E7B85A] font-bold truncate max-w-full block px-1">
                DEST: {activeBlip.label} ({activeBlip.path})
              </span>
            ) : isExploreMode && playerTelemetry ? (
              <span className="text-[#E7B85A] font-bold truncate max-w-full block px-1">
                POS: [{Math.round(playerTelemetry.x)}, {Math.round(playerTelemetry.z)}] // EXPLORE
              </span>
            ) : (
              <span className="text-[var(--gta-silhouette)] truncate max-w-full block px-1">
                LOC: CHENNAI // 13.08° N, 80.27° E
              </span>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
