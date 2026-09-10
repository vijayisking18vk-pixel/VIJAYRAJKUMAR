import React, { useState } from 'react';
import { Compass, Layers, BookOpen, Send, Menu, X } from 'lucide-react';
import GradientText from './react-bits/GradientText';
import VariableProximity from './react-bits/VariableProximity';
import StarBorder from './react-bits/StarBorder';

export default function Header({ activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/about/', label: 'About', icon: Compass },
    { href: '/#ventures', label: 'Ventures', icon: Layers },
    { href: '/writing/', label: 'Writing', icon: BookOpen },
    { href: '/contact/', label: 'Contact', icon: Send }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-neutral-200 font-sans text-xs select-none">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        
        {/* Brand Title linking to Home */}
        <a href="/" className="flex items-center space-x-3 group">
          <span className="w-2 h-2 bg-neutral-900 rounded-full animate-pulse"></span>
          <GradientText className="font-sans font-bold text-base tracking-tight text-neutral-950 group-hover:opacity-80 transition-opacity">
            Vijayrajkumar
          </GradientText>
          <span className="hidden sm:inline-block text-xs text-neutral-500 border-l border-neutral-200 pl-3">
            <VariableProximity label="Co-Founder @ Unfounded • Zigger • LoopMemory" radius={100} />
          </span>
        </a>

        {/* Desktop Navigation Items */}
        <nav className="hidden md:flex items-center space-x-7">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center space-x-1.5 text-neutral-600 hover:text-neutral-950 font-medium transition-colors text-xs py-1"
              >
                <Icon className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
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
            className="md:hidden p-2 rounded-lg text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-6 py-4 space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-sm text-neutral-800 hover:text-neutral-950 font-medium py-2"
              >
                <Icon className="w-4 h-4 text-neutral-500" />
                <span>{item.label}</span>
              </a>
            );
          })}
          <div className="pt-2 border-t border-neutral-100">
            <a
              href="https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-neutral-900 block py-1"
            >
              LinkedIn profile ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
