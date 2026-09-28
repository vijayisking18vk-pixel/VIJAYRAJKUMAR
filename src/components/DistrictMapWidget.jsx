import React, { useState, useEffect, useMemo } from 'react';
import soundSystem from '../lib/soundSystem';

// Real 3D world coordinates synchronized with PlayableDistrict3D.jsx
const MAP_LANDMARKS = [
  {
    id: 'arrival',
    label: 'ARRIVAL',
    chapter: '00 // ARRIVAL',
    title: 'Arrival Street',
    path: '/',
    sectionId: 'hero',
    x: 0,
    z: 0,
    color: '#E7B85A',
    icon: '✦',
  },
  {
    id: 'safehouse',
    label: 'SAFEHOUSE',
    chapter: '01 // SAFEHOUSE',
    title: 'Founder Studio & Biography',
    path: '/about/',
    sectionId: 'safehouse',
    x: -16,
    z: -4,
    color: '#E7B85A',
    icon: '■',
  },
  {
    id: 'operations-garage',
    label: 'VENTURES',
    chapter: '02 // VENTURES',
    title: 'Operations Garage (Ziggers & LoopMemory)',
    path: '/ventures/',
    sectionId: 'operations-garage',
    x: 16,
    z: -4,
    color: '#8FADA0',
    icon: '◆',
  },
  {
    id: 'poster-wall',
    label: 'EVENTS',
    chapter: '03 // EVENTS',
    title: 'Poster Wall & Summits',
    path: '/events/',
    sectionId: 'poster-wall',
    x: -14,
    z: 14,
    color: '#D87942',
    icon: '▲',
  },
  {
    id: 'archive',
    label: 'ARCHIVE',
    chapter: '04 // WRITING',
    title: 'Research Library & Essays',
    path: '/writing/',
    sectionId: 'archive',
    x: 14,
    z: 14,
    color: '#B7C2A8',
    icon: '●',
  },
  {
    id: 'dispatch-point',
    label: 'CONTACT',
    chapter: '05 // CONTACT',
    title: 'Rooftop Dispatch & Advisory',
    path: '/contact/',
    sectionId: 'dispatch-point',
    x: 0,
    z: 24,
    color: '#EDE4C8',
    icon: '✦',
  },
];

// World bounds for 2D projection
// X: -25 to +25, Z: -10 to +30
const WORLD = {
  minX: -26,
  maxX: 26,
  minZ: -10,
  maxZ: 30,
  width: 240,
  height: 200,
};

function projectX(x) {
  return ((x - WORLD.minX) / (WORLD.maxX - WORLD.minX)) * WORLD.width;
}

function projectY(z) {
  return ((z - WORLD.minZ) / (WORLD.maxZ - WORLD.minZ)) * WORLD.height;
}

export default function DistrictMapWidget({
  isExploreMode = false,
  onToggleExploreMode = () => {},
  playerTelemetry = null,
  activeLandmarkId = null,
  onSelectLandmark = null,
}) {
  const [isAudioActive, setIsAudioActive] = useState(!soundSystem.isMuted());
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeBlip, setActiveBlip] = useState(null);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    const unsubscribe = soundSystem.subscribe((active) => {
      setIsAudioActive(active);
    });

    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      setCurrentPath(path);
      // On subpages or on screens narrower than 768px, default to collapsed
      // On desktop homepage, start open for immediate orientation
      if (path !== '/' || window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    }

    const handlePop = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        setCurrentPath(path);
        if (path !== '/') {
          setIsCollapsed(true);
        }
      }
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

  const handleWaypointClick = (lm) => {
    soundSystem.playSelect();
    if (onSelectLandmark) {
      onSelectLandmark(lm);
    }
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      const el = document.getElementById(lm.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (window.location.pathname !== lm.path) {
      window.history.pushState(null, '', lm.path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Player position in SVG coordinates
  const playerSvgPos = useMemo(() => {
    if (!playerTelemetry) return null;
    return {
      x: projectX(playerTelemetry.x),
      y: projectY(playerTelemetry.z),
      rotation: playerTelemetry.angle ? (playerTelemetry.angle * 180) / Math.PI : 0,
    };
  }, [playerTelemetry]);

  return (
    <aside
      aria-label="District Map and Navigation HUD"
      className="fixed bottom-4 left-4 z-50 select-none print:hidden font-futura"
    >
      {/* 1. Collapsed State: Clean Discrete Badge that NEVER blocks reading */}
      {isCollapsed ? (
        <button
          type="button"
          onClick={() => {
            soundSystem.playSelect();
            setIsCollapsed(false);
          }}
          onMouseEnter={() => soundSystem.playHover()}
          className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#11100E] border-2 border-[var(--gta-silhouette)] shadow-[0_8px_32px_rgba(0,0,0,0.9)] hover:border-[#E7B85A] active:scale-95 transition-all cursor-pointer"
          title="Open District Map HUD & Audio Controls"
          aria-label="Expand District Map"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E7B85A] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E7B85A]" />
          </span>
          <span className="font-bank text-xs font-bold tracking-wider text-[var(--gta-text-fill)] uppercase">
            DISTRICT MAP
          </span>
        </button>
      ) : (
        /* 2. Expanded SVG District Map HUD */
        <div className="relative bg-[#11100E] border-2 border-[var(--gta-silhouette)] rounded-2xl p-3 shadow-[0_16px_50px_rgba(0,0,0,0.95)] w-[260px] text-xs">
          
          {/* Header Controls: Audio Toggle, Explore Button & Close */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--gta-silhouette)]/30 gap-1.5">
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={handleToggleAudio}
              onMouseEnter={() => soundSystem.playHover()}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bank font-bold tracking-wider transition-all border cursor-pointer active:scale-95 ${
                isAudioActive
                  ? 'bg-[#E7B85A]/20 text-[#E7B85A] border-[#E7B85A]'
                  : 'bg-[#181816] text-[var(--gta-silhouette)] border-[var(--gta-silhouette)]/50 hover:text-[var(--gta-text-fill)]'
              }`}
              title="Toggle Audio Clicks & Ambience"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isAudioActive ? 'bg-[#E7B85A] animate-pulse' : 'bg-neutral-600'
                }`}
              />
              <span>AUDIO: {isAudioActive ? 'ON' : 'OFF'}</span>
            </button>

            {/* Explore Mode Toggle (only relevant on home) */}
            {currentPath === '/' && (
              <button
                type="button"
                onClick={() => {
                  if (isExploreMode) soundSystem.playExploreExit();
                  else soundSystem.playExploreEnter();
                  onToggleExploreMode();
                }}
                onMouseEnter={() => soundSystem.playHover()}
                className={`hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bank font-bold tracking-wider transition-all border cursor-pointer active:scale-95 ${
                  isExploreMode
                    ? 'bg-[#E7B85A] text-[#0A0E0C] border-[#E7B85A]'
                    : 'bg-[#181816] text-[var(--gta-silhouette)] border-[var(--gta-silhouette)]/50 hover:text-[var(--gta-text-fill)]'
                }`}
                title="Toggle 3D Free Roam Mode"
              >
                <span>{isExploreMode ? 'GUIDED' : '3D EXPLORE'}</span>
              </button>
            )}

            {/* Collapse/Minimize Button */}
            <button
              type="button"
              onClick={() => {
                soundSystem.playSelect();
                setIsCollapsed(true);
              }}
              onMouseEnter={() => soundSystem.playHover()}
              className="text-[var(--gta-silhouette)] hover:text-[var(--gta-text-fill)] active:scale-90 px-1.5 py-0.5 text-xs font-mono font-bold transition-transform cursor-pointer ml-auto"
              title="Minimize Map"
              aria-label="Collapse District Map"
            >
              ✕
            </button>
          </div>

          {/* SVG District Road & Parcel Map */}
          <div className="relative w-full h-[180px] bg-[#0E1410] border border-[var(--gta-silhouette)]/50 rounded-xl overflow-hidden shadow-inner">
            <svg
              viewBox={`0 0 ${WORLD.width} ${WORLD.height}`}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* City District Parcel Blocks */}
              <g id="parcels" opacity="0.85">
                {/* Northwest block (near Safehouse) */}
                <rect x="15" y="10" width="90" height="30" rx="4" fill="#18231C" stroke="#25352A" strokeWidth="1" />
                {/* Northeast block (near Garage) */}
                <rect x="135" y="10" width="90" height="30" rx="4" fill="#18231C" stroke="#25352A" strokeWidth="1" />
                {/* Central West block */}
                <rect x="15" y="55" width="90" height="50" rx="4" fill="#16201A" stroke="#25352A" strokeWidth="1" />
                {/* Central East block */}
                <rect x="135" y="55" width="90" height="50" rx="4" fill="#16201A" stroke="#25352A" strokeWidth="1" />
                {/* Southwest block (near Poster Wall) */}
                <rect x="15" y="120" width="90" height="60" rx="4" fill="#18231C" stroke="#25352A" strokeWidth="1" />
                {/* Southeast block (near Archive) */}
                <rect x="135" y="120" width="90" height="60" rx="4" fill="#18231C" stroke="#25352A" strokeWidth="1" />
              </g>

              {/* Asphalt Road Network */}
              <g id="roads">
                {/* Main Central Boulevard (North-South) */}
                <line x1="120" y1="0" x2="120" y2="200" stroke="#2B3A30" strokeWidth="16" strokeLinecap="square" />
                <line x1="120" y1="0" x2="120" y2="200" stroke="#E7B85A" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />

                {/* North Cross Street (Safehouse <-> Garage) */}
                <line x1="0" y1="30" x2="240" y2="30" stroke="#2B3A30" strokeWidth="14" strokeLinecap="square" />
                <line x1="0" y1="30" x2="240" y2="30" stroke="#8FADA0" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

                {/* South Cross Street (Poster Wall <-> Archive) */}
                <line x1="0" y1="120" x2="240" y2="120" stroke="#2B3A30" strokeWidth="14" strokeLinecap="square" />
                <line x1="0" y1="120" x2="240" y2="120" stroke="#8FADA0" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

                {/* Arrival Roundabout */}
                <circle cx="120" cy="50" r="14" fill="#1E2B23" stroke="#2B3A30" strokeWidth="4" />
                <circle cx="120" cy="50" r="4" fill="#E7B85A" opacity="0.7" />

                {/* Dispatch Cul-de-Sac */}
                <circle cx="120" cy="170" r="16" fill="#1E2B23" stroke="#2B3A30" strokeWidth="4" />
              </g>

              {/* Landmark Waypoints / Blips */}
              {MAP_LANDMARKS.map((lm) => {
                const cx = projectX(lm.x);
                const cy = projectY(lm.z);
                const isCurrent =
                  activeLandmarkId === lm.id ||
                  (currentPath === lm.path && lm.path !== '/') ||
                  (currentPath === '/' && lm.id === 'arrival');

                return (
                  <g
                    key={lm.id}
                    className="cursor-pointer transition-transform"
                    onClick={() => handleWaypointClick(lm)}
                    onMouseEnter={() => {
                      soundSystem.playHover();
                      setActiveBlip(lm);
                    }}
                    onMouseLeave={() => setActiveBlip(null)}
                  >
                    {/* Pulsing ring when active */}
                    {isCurrent && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="11"
                        fill="none"
                        stroke={lm.color}
                        strokeWidth="1.5"
                        opacity="0.8"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer marker boundary */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="7.5"
                      fill="#11100E"
                      stroke={lm.color}
                      strokeWidth="2"
                    />

                    {/* Inner color dot */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="4"
                      fill={lm.color}
                    />

                    {/* Landmark Short Label */}
                    <text
                      x={cx}
                      y={cy - 10}
                      fill="#F0E8D0"
                      fontSize="7"
                      fontWeight="bold"
                      fontFamily="Arial, sans-serif"
                      textAnchor="middle"
                      className="pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                    >
                      {lm.label}
                    </text>
                  </g>
                );
              })}

              {/* Dynamic Real-time Player Marker */}
              {playerSvgPos && (
                <g
                  transform={`translate(${playerSvgPos.x}, ${playerSvgPos.y}) rotate(${playerSvgPos.rotation})`}
                  className="pointer-events-none transition-transform duration-75"
                >
                  <polygon
                    points="0,-7 -5,6 0,3 5,6"
                    fill="#FFFFFF"
                    stroke="#11100E"
                    strokeWidth="1"
                    className="drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                  />
                </g>
              )}
            </svg>

            {/* Compass Rose (North Indicator) */}
            <div className="absolute top-1.5 right-2 font-bank text-[9px] font-black text-[#E7B85A] select-none pointer-events-none">
              ▲ N
            </div>
          </div>

          {/* Active Blip Description or Telemetry Footer */}
          <div className="mt-2 h-5 flex items-center justify-center text-center font-bank text-[10px] tracking-wider uppercase overflow-hidden">
            {activeBlip ? (
              <span className="text-[#E7B85A] font-bold truncate max-w-full block px-1">
                DEST: {activeBlip.title}
              </span>
            ) : isExploreMode && playerTelemetry ? (
              <span className="text-[#E7B85A] font-bold truncate max-w-full block px-1">
                POS: [{Math.round(playerTelemetry.x)}, {Math.round(playerTelemetry.z)}] // 3D EXPLORATION
              </span>
            ) : (
              <span className="text-[var(--gta-silhouette)] truncate max-w-full block px-1">
                CHENNAI DISTRICT // 13.08° N, 80.27° E
              </span>
            )}
          </div>

        </div>
      )}
    </aside>
  );
}
