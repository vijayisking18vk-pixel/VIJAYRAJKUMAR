import React, { useState, useEffect } from 'react';
import { Compass, Layers, BookOpen, Send, Calendar, Menu, X, Volume2, VolumeX } from 'lucide-react';
import StarBorder from './react-bits/StarBorder';
import soundSystem from '../lib/soundSystem';

export default function Header({ activeSection, setActiveSection, isExploreMode = false, onToggleExploreMode = null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(!soundSystem.isMuted());

  useEffect(() => {
    const unsubscribe = soundSystem.subscribe((active) => {
      setIsAudioActive(active);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleAudio = () => {
    const active = soundSystem.toggleSound();
    setIsAudioActive(active);
    if (active) {
      soundSystem.playSelect();
    }
  };

  const navItems = [
    { href: '/about/', label: 'About', icon: Compass },
    { href: '/ventures/', label: 'Ventures', icon: Layers },
    { href: '/events/', label: 'Events', icon: Calendar },
    { href: '/writing/', label: 'Writing', icon: BookOpen },
    { href: '/contact/', label: 'Contact', icon: Send }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#11100E] border-b border-[var(--gta-silhouette)]/40 font-futura text-xs select-none">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        
        {/* Brand Title linking to Home - GTA Pricedown Logo */}
        <a
          href="/"
          onMouseEnter={() => soundSystem.playHover()}
          onClick={() => soundSystem.playSelect()}
          className="flex items-center space-x-2.5 group"
        >
          <span className="w-2.5 h-2.5 bg-[#E7B85A] rounded-full animate-pulse transform-gpu"></span>
          <span className="font-pricedown text-xl sm:text-2xl tracking-wider uppercase group-hover:scale-105 transition-transform text-[#F0E8D0] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            VIJAYRAJKUMAR
          </span>
        </a>

        {/* Desktop Navigation Items - GTA Bank Gothic Menu Items */}
        <nav className="hidden md:flex items-center space-x-7">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => soundSystem.playHover()}
                onClick={() => soundSystem.playSelect()}
                className="flex items-center space-x-1.5 text-[#F0E8D0] hover:text-[#E7B85A] font-bank uppercase tracking-wider font-bold transition-colors text-xs py-1"
              >
                <Icon className="w-3.5 h-3.5 shrink-0 text-[#8FADA0]" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Button & Audio Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Audio Theme Toggle Button */}
          <button
            type="button"
            onClick={handleToggleAudio}
            onMouseEnter={() => soundSystem.playHover()}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[var(--gta-text-outline)] hover:bg-[#1A1A1A] border border-[var(--gta-silhouette)] text-[var(--gta-text-fill)] hover:text-[#E7B85A] font-bank uppercase tracking-wider text-xs font-bold transition-all cursor-pointer active:scale-95"
            title={isAudioActive ? 'Mute Theme Song & Audio' : 'Play GTA Theme Song'}
            aria-label={isAudioActive ? 'Mute Theme Song & Audio' : 'Play GTA Theme Song'}
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#E7B85A] animate-pulse" />
                <span className="hidden sm:inline">THEME ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden sm:inline">AUDIO OFF</span>
              </>
            )}
          </button>

          {onToggleExploreMode && (
            <button
              type="button"
              onClick={() => {
                if (isExploreMode) soundSystem.playExploreExit();
                else soundSystem.playExploreEnter();
                onToggleExploreMode();
              }}
              onMouseEnter={() => soundSystem.playHover()}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--gta-text-outline)] hover:bg-[#1A1A1A] border border-[var(--gta-silhouette)] text-[var(--gta-text-fill)] hover:text-[#E7B85A] font-bank uppercase tracking-wider text-xs font-bold transition-all cursor-pointer active:scale-95"
            >
              <span>{isExploreMode ? 'Exit Explore' : '🎮 Explore Mode'}</span>
            </button>
          )}

          <StarBorder
            as="a"
            href="https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundSystem.playHover()}
            onClick={() => soundSystem.playSelect()}
            className="hidden sm:inline-flex font-bank uppercase tracking-wider text-xs font-bold"
          >
            <span>LinkedIn Profile ↗</span>
          </StarBorder>

          <button
            onClick={() => {
              soundSystem.playSelect();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            onMouseEnter={() => soundSystem.playHover()}
            className="md:hidden p-2 rounded-lg text-[#F0E8D0] hover:text-[#E7B85A] hover:bg-[#1A1A1A] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--gta-silhouette)]/40 bg-[#11100E] px-6 py-4 space-y-3 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => soundSystem.playHover()}
                onClick={() => {
                  soundSystem.playSelect();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-xs font-bank uppercase tracking-wider text-[#F0E8D0] hover:text-[#E7B85A] py-2"
              >
                <Icon className="w-4 h-4 text-[#8FADA0]" />
                <span>{item.label}</span>
              </a>
            );
          })}
          
          <div className="pt-2 border-t border-[var(--gta-silhouette)]/30 space-y-2">
            <button
              type="button"
              onClick={() => {
                handleToggleAudio();
              }}
              onMouseEnter={() => soundSystem.playHover()}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--gta-text-outline)] border border-[var(--gta-silhouette)]/40 text-xs font-bank uppercase tracking-wider text-[#F0E8D0] hover:text-[#E7B85A]"
            >
              <span>GTA THEME AUDIO</span>
              <span className={isAudioActive ? 'text-[#E7B85A] font-bold' : 'text-neutral-400'}>
                {isAudioActive ? '🔊 PLAYING' : '🔇 MUTED'}
              </span>
            </button>

            <a
              href="https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundSystem.playHover()}
              onClick={() => soundSystem.playSelect()}
              className="text-xs font-bank uppercase tracking-wider text-[#E7B85A] hover:underline block py-1"
            >
              LinkedIn Profile ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
