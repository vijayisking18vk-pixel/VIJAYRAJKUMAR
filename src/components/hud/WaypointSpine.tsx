import React from 'react';
import { CHAMBER_MILESTONES } from '../../hooks/useVirtualScroll';

interface WaypointSpineProps {
  currentChamber: number;
  onSelectChamber: (chamberIndex: number) => void;
}

export const WaypointSpine: React.FC<WaypointSpineProps> = ({
  currentChamber,
  onSelectChamber,
}) => {
  // We display chambers 1 through 7 on the waypoint spine
  const waypoints = CHAMBER_MILESTONES.filter((m) => m.chamber > 0);

  return (
    <nav
      aria-label="Chamber Waypoints"
      className="fixed right-4 sm:right-7 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center space-y-4 select-none pointer-events-auto"
    >
      {waypoints.map((wp) => {
        const isActive = currentChamber === wp.chamber;
        return (
          <button
            key={wp.chamber}
            onClick={() => onSelectChamber(wp.chamber)}
            className="group relative flex items-center justify-end p-1 cursor-pointer focus:outline-none"
            aria-label={`Jump to ${wp.label}: ${wp.title}`}
          >
            {/* Hover Tooltip (Left) */}
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none font-mono text-[10px] tracking-widest text-[#F8ECFF] whitespace-nowrap bg-[#020005]/80 px-2 py-0.5 rounded border border-[#9D00FF]/30 backdrop-blur-sm">
              {wp.label}
            </span>

            {/* Hairline Dot Indicator */}
            <div
              className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                isActive
                  ? 'w-3 h-3 bg-transparent border-2 border-[#D147FF] shadow-[0_0_10px_#D147FF]'
                  : 'w-1.5 h-1.5 bg-[#A89BB9]/40 group-hover:bg-[#9D00FF] group-hover:scale-150'
              }`}
            >
              {isActive && <div className="w-1 h-1 rounded-full bg-[#F8ECFF]" />}
            </div>
          </button>
        );
      })}
    </nav>
  );
};
