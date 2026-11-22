import React from 'react';
import { Volume2, VolumeX, BookOpen } from 'lucide-react';

interface TopHairlineBarProps {
  onWarpOrigin: () => void;
  onToggleSound: () => void;
  isAudioActive: boolean;
  onOpenDossier: () => void;
}

export const TopHairlineBar: React.FC<TopHairlineBarProps> = ({
  onWarpOrigin,
  onToggleSound,
  isAudioActive,
  onOpenDossier,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 sm:px-10 py-5 pointer-events-none select-none">
      {/* Top-Left: R. VIJAYRAJKUMAR // 21 */}
      <button
        onClick={onWarpOrigin}
        className="pointer-events-auto font-mono text-xs font-bold tracking-widest text-[#F8ECFF] hover:text-[#D147FF] transition-colors flex items-center space-x-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        data-cursor="WARP TO 01"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#9D00FF] animate-pulse" />
        <span>R. VIJAYRAJKUMAR // 21</span>
      </button>

      {/* Top-Right: [ SOUND: OFF/ON ] & [ DOSSIER ] */}
      <div className="pointer-events-auto flex items-center space-x-4 sm:space-x-6 font-mono text-xs tracking-wider">
        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className="flex items-center space-x-1.5 text-[#A89BB9] hover:text-[#F8ECFF] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          data-cursor="SOUND"
        >
          {isAudioActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#D147FF]" />
              <span className="text-[#D147FF]">[ SOUND: ON ]</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#A89BB9]" />
              <span>[ SOUND: OFF ]</span>
            </>
          )}
        </button>

        {/* Dossier Toggle */}
        <button
          onClick={onOpenDossier}
          className="flex items-center space-x-1.5 text-[#F8ECFF] hover:text-[#D147FF] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          data-cursor="DOSSIER"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#9D00FF]" />
          <span>[ DOSSIER ]</span>
        </button>
      </div>
    </header>
  );
};
