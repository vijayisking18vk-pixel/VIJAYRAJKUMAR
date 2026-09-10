import React, { useState } from 'react';
import { Compass, Layers, BookOpen, Send, Menu, X } from 'lucide-react';
import GradientText from './react-bits/GradientText';
import StarBorder from './react-bits/StarBorder';

export default function Header({ activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/about/', label: 'About', icon: Compass },
    { href: '/ventures/', label: 'Ventures', icon: Layers },
    { href: '/writing/', label: 'Writing', icon: BookOpen },
    { href: '/contact/', label: 'Contact', icon: Send }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[var(--color-border)]/40 font-sans text-xs select-none">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        
        {/* Brand Title linking to Home - Only Name */}
        <a href="/" className="flex items-center space-x-2.5 group">
          <span className="w-2 h-2 bg-[var(--color-accent-primary)] rounded-full animate-pulse"></span>
          <GradientText className="font-sans font-bold text-base tracking-tight text-[var(--color-text-primary)] group-hover:opacity-85 transition-opacity">
            Vijayrajkumar
          </GradientText>
        </a>

        {/* Desktop Navigation Items */}
        <nav className="hidden md:flex items-center space-x-7">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center space-x-1.5 text-[#383838] hover:text-[var(--color-accent-primary)] font-medium transition-colors text-xs py-1"
              >
                <Icon className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-muted)]" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center space-x-3">
          <StarBorder
            as="a"
            href="https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <span>LinkedIn profile ↗</span>
          </StarBorder>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-surface)]/25 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)]/40 bg-white px-6 py-4 space-y-3 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-sm text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] font-medium py-2"
              >
                <Icon className="w-4 h-4 text-[var(--color-text-muted)]" />
                <span>{item.label}</span>
              </a>
            );
          })}
          <div className="pt-2 border-t border-[var(--color-border)]/30">
            <a
              href="https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[var(--color-accent-primary)] hover:underline block py-1"
            >
              LinkedIn profile ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
