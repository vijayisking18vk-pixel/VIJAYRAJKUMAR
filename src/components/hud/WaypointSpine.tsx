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
  // Display all milestones 0 through 7 for full navigational clarity
  const waypoints = CHAMBER_MILESTONES;

  return (
    <nav
      aria-label="Chamber Waypoints"
      className="fixed right-4 sm:right-7 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center select-none pointer-events-auto"
    >
      {/* Subtle vertical hairline spine track behind dots */}
      <div className="absolute top-2 bottom-2 right-[9px] w-[1px] bg-gradient-to-b from-[#9D00FF]/20 via-[#D147FF]/30 to-[#9D00FF]/10 pointer-events-none" />

      <div className="relative flex flex-col items-center space-y-4">
        {waypoints.map((wp) => {
          const isActive = currentChamber === wp.chamber;
          return (
            <button
              key={wp.chamber}
              onClick={() => onSelectChamber(wp.chamber)}
              className="group relative flex items-center justify-end p-1.5 cursor-pointer focus:outline-none"
              aria-label={`Jump to ${wp.label}: ${wp.title}`}
              aria-current={isActive ? 'step' : undefined}
            >
              {/* Hover Tooltip (Left) */}
              <span className="absolute right-7 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none font-mono text-[10px] tracking-widest text-[#F8ECFF] whitespace-nowrap bg-[#020005]/90 px-2.5 py-1 rounded border border-[#9D00FF]/40 backdrop-blur-md shadow-lg">
                {wp.label} // {wp.title}
              </span>

              {/* Waypoint Dot Indicator */}
              <div
                className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'w-4 h-4 bg-[#D147FF]/20 border-2 border-[#D147FF] shadow-[0_0_12px_#D147FF]'
                    : 'w-2 h-2 bg-[#A89BB9]/30 hover:bg-[#9D00FF] hover:scale-125'
                }`}
              >
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F8ECFF] shadow-[0_0_6px_#FFFFFF]" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
