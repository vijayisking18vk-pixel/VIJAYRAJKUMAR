import React from 'react';
import LetterGlitch from './react-bits/LetterGlitch';
import CountUp from './react-bits/CountUp';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white text-neutral-950 border-t border-neutral-200 overflow-hidden font-sans relative z-10">
      {/* Repeating Ribbon Seal with LetterGlitch */}
      <div className="bg-neutral-100 text-neutral-900 py-3 text-xs font-semibold tracking-wider overflow-hidden select-none border-b border-neutral-200">
        <LetterGlitch>
          <span className="mx-4">Vijayrajkumar</span>
          <span className="mx-2 text-neutral-400">•</span>
          <span className="mx-4">Co-Founder @ Unfounded</span>
          <span className="mx-2 text-neutral-400">•</span>
          <span className="mx-4">Co-Founder @ Zigger</span>
          <span className="mx-2 text-neutral-400">•</span>
          <span className="mx-4">Co-Founder @ Loopverse</span>
          <span className="mx-2 text-neutral-400">•</span>
          <span className="mx-4">SRMIST (Defence & Strategy)</span>
          <span className="mx-2 text-neutral-400">•</span>
          <span className="mx-4">Dakshina Bharat Hindi Prachar Sabha (MA Hindi)</span>
          <span className="mx-2 text-neutral-400">•</span>
          <span className="mx-4">Chennai · On-site</span>
          <span className="mx-2 text-neutral-400">•</span>
        </LetterGlitch>
      </div>

      {/* Main Footer Metadata */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans text-xs text-neutral-500">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-neutral-950 text-sm tracking-tight flex items-center space-x-2">
            <span>Vijayrajkumar</span>
            <span>·</span>
            <span>Experience: <CountUp from={2016} to={2026} duration={1.5} suffix=" Timeline" /></span>
          </div>
          <div className="leading-relaxed">
            Co-Founder @ Unfounded • Zigger • Loopverse | SRMIST & Dakshina Bharat Hindi Prachar Sabha Alum | Chennai, India
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <a
            href="https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-950 transition-colors font-medium"
          >
            LinkedIn
          </a>
          <a
            href="https://www.ziggers.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-950 transition-colors font-medium"
          >
            Ziggers.in
          </a>
          <a
            href="https://www.loopmemory.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-950 transition-colors font-medium"
          >
            LoopMemory.in
          </a>
          <button
            onClick={scrollToTop}
            className="px-4 py-2 bg-neutral-950 text-white font-medium rounded-full hover:bg-black transition-colors shadow-sm text-xs"
          >
            Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
