import React from 'react';
import LetterGlitch from './react-bits/LetterGlitch';
import CountUp from './react-bits/CountUp';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[var(--color-background)] text-[var(--color-text-primary)] border-t border-[var(--color-border)]/40 overflow-hidden font-sans relative z-10">
      {/* Repeating Ribbon Seal with LetterGlitch */}
      <div className="bg-[var(--color-surface)]/20 text-[var(--color-text-primary)] py-3 text-xs font-semibold tracking-wider overflow-hidden select-none border-b border-[var(--color-border)]/30">
        <LetterGlitch>
          <span className="mx-4">Venture Studio Operations</span>
          <span className="mx-2 text-[var(--color-text-muted)]">•</span>
          <span className="mx-4">Gig-Economy Marketplaces</span>
          <span className="mx-2 text-[var(--color-text-muted)]">•</span>
          <span className="mx-4">Autonomous AI Memory Architecture</span>
          <span className="mx-2 text-[var(--color-text-muted)]">•</span>
          <span className="mx-4">Systems Strategy &amp; Game Theory</span>
          <span className="mx-2 text-[var(--color-text-muted)]">•</span>
          <span className="mx-4">Milestone Escrow Infrastructure</span>
          <span className="mx-2 text-[var(--color-text-muted)]">•</span>
          <span className="mx-4">Chennai, Tamil Nadu, India</span>
          <span className="mx-2 text-[var(--color-text-muted)]">•</span>
        </LetterGlitch>
      </div>

      {/* Main Footer Navigation & Metadata */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12 space-y-8 font-sans text-xs text-[#555555]">
        
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs border-b border-[var(--color-border)]/30 pb-8">
          <div className="space-y-2">
            <span className="font-bold text-[var(--color-accent-primary)] uppercase tracking-wider text-[11px] block">Overview</span>
            <ul className="space-y-1.5">
              <li><a href="/" className="hover:text-[var(--color-accent-primary)] transition-colors">Home</a></li>
              <li><a href="/about/" className="hover:text-[var(--color-accent-primary)] transition-colors">About &amp; Bio</a></li>
              <li><a href="/events/" className="hover:text-[var(--color-accent-primary)] transition-colors">Events &amp; Summits</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-[var(--color-accent-primary)] uppercase tracking-wider text-[11px] block">Ventures</span>
            <ul className="space-y-1.5">
              <li><a href="/ventures/ziggers/" className="hover:text-[var(--color-accent-primary)] transition-colors">Ziggers Case Study</a></li>
              <li><a href="/ventures/loopmemory/" className="hover:text-[var(--color-accent-primary)] transition-colors">LoopMemory Case Study</a></li>
              <li><a href="/ventures/" className="hover:text-[var(--color-accent-primary)] transition-colors">All Ventures</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-[var(--color-accent-primary)] uppercase tracking-wider text-[11px] block">Thought Leadership</span>
            <ul className="space-y-1.5">
              <li><a href="/writing/" className="hover:text-[var(--color-accent-primary)] transition-colors">All Writing &amp; Essays</a></li>
              <li><a href="/about/" className="hover:text-[var(--color-accent-primary)] transition-colors">Academic Credentials</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-[var(--color-accent-primary)] uppercase tracking-wider text-[11px] block">Connect</span>
            <ul className="space-y-1.5">
              <li><a href="/contact/" className="hover:text-[var(--color-accent-primary)] transition-colors">Start a Conversation</a></li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = ['mailto:', 'vijaykumarunfounded', '@', 'gmail.com'].join('');
                  }}
                  className="hover:text-[var(--color-accent-primary)] transition-colors text-left cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
                  title="Click to open direct email"
                >
                  <span className="font-mono text-xs">vijaykumarunfounded [at] gmail.com</span>
                </button>
              </li>
            </ul>
            <div className="pt-2">
              <SocialLinks compact={true} />
            </div>
          </div>
        </div>

        {/* Bottom copyright & top anchor */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-[var(--color-text-primary)] text-sm tracking-tight">
              Vijayrajkumar
            </div>
            <p className="text-[var(--color-text-muted)] text-xs">
              Chief Operating Officer &amp; Co-Founder @ Unfounded • Ziggers • LoopMemory · Chennai, Tamil Nadu, India
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a href="/sitemap.xml" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors text-xs">
              Sitemap.xml
            </a>
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-[var(--color-accent-primary)] text-white font-medium rounded-full hover:bg-[#1E2C1F] transition-colors shadow-sm text-xs"
            >
              Top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
