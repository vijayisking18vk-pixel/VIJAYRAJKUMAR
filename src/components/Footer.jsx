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
          <span className="mx-4">Chief Operating Officer @ Unfounded</span>
          <span className="mx-2 text-neutral-400">•</span>
          <span className="mx-4">Chief Operating Officer @ Zigger</span>
          <span className="mx-2 text-neutral-400">•</span>
          <span className="mx-4">Chief Operating Officer @ LoopMemory</span>
          <span className="mx-2 text-neutral-400">•</span>
          <span className="mx-4">SRMIST (Defence & Strategy)</span>
          <span className="mx-2 text-neutral-400">•</span>
          <span className="mx-4">Dakshina Bharat Hindi Prachar Sabha (MA Hindi)</span>
          <span className="mx-2 text-neutral-400">•</span>
          <span className="mx-4">Chennai · On-site</span>
          <span className="mx-2 text-neutral-400">•</span>
        </LetterGlitch>
      </div>

      {/* Main Footer Navigation & Metadata */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12 space-y-8 font-sans text-xs text-neutral-500">
        
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs border-b border-neutral-200 pb-8">
          <div className="space-y-2">
            <span className="font-bold text-neutral-950 uppercase tracking-wider text-[11px] block">Overview</span>
            <ul className="space-y-1.5">
              <li><a href="/" className="hover:text-neutral-950 transition-colors">Home</a></li>
              <li><a href="/about/" className="hover:text-neutral-950 transition-colors">About & Bio</a></li>
              <li><a href="/#journey" className="hover:text-neutral-950 transition-colors">Education & Journey</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-neutral-950 uppercase tracking-wider text-[11px] block">Ventures</span>
            <ul className="space-y-1.5">
              <li><a href="/ventures/ziggers/" className="hover:text-neutral-950 transition-colors">Ziggers Case Study</a></li>
              <li><a href="/ventures/loopmemory/" className="hover:text-neutral-950 transition-colors">LoopMemory Case Study</a></li>
              <li><a href="/#ventures" className="hover:text-neutral-950 transition-colors">Unfounded Studio</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-neutral-950 uppercase tracking-wider text-[11px] block">Thought Leadership</span>
            <ul className="space-y-1.5">
              <li><a href="/writing/" className="hover:text-neutral-950 transition-colors">All Writing & Essays</a></li>
              <li><a href="/#skills" className="hover:text-neutral-950 transition-colors">Ecosystem & Skills</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-neutral-950 uppercase tracking-wider text-[11px] block">Connect</span>
            <ul className="space-y-1.5">
              <li><a href="/contact/" className="hover:text-neutral-950 transition-colors">Start a Conversation</a></li>
              <li><a href="mailto:contact@unfounded.in" className="hover:text-neutral-950 transition-colors">contact@unfounded.in</a></li>
              <li><a href="https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-950 transition-colors">LinkedIn Profile ↗</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & top anchor */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-neutral-950 text-sm tracking-tight flex items-center space-x-2">
              <span>Vijayrajkumar</span>
              <span>·</span>
              <span>Active Timeline: <CountUp from={2016} to={2026} duration={1.5} suffix="" /></span>
            </div>
            <p className="text-neutral-500 text-xs">
              Chief Operating Officer & Co-Founder @ Unfounded • Zigger • LoopMemory | Chennai, Tamil Nadu, India
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a href="/sitemap.xml" className="text-neutral-400 hover:text-neutral-900 transition-colors text-xs">
              Sitemap.xml
            </a>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-neutral-950 text-white font-medium rounded-full hover:bg-black transition-colors shadow-sm text-xs"
            >
              Top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
