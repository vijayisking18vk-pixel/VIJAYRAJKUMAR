import React from 'react';
import { Compass, Layers, Cpu, Send } from 'lucide-react';
import GradientText from './react-bits/GradientText';
import VariableProximity from './react-bits/VariableProximity';
import StarBorder from './react-bits/StarBorder';

export default function Header({ activeSection, setActiveSection }) {
  const navItems = [
    { id: 'journey', label: 'Journey & Education', icon: Compass },
    { id: 'ventures', label: 'Experience & Ventures', icon: Layers },
    { id: 'skills', label: 'Skills & Ecosystem', icon: Cpu },
    { id: 'dispatch', label: 'Contact', icon: Send }
  ];

  const scrollToId = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-neutral-200/80 font-sans text-xs select-none">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        
        {/* Brand Title with GradientText & VariableProximity */}
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 bg-neutral-900 rounded-full animate-pulse"></span>
          <GradientText className="font-sans font-bold text-base tracking-tight text-neutral-950">
            Vijayrajkumar
          </GradientText>
          <span className="hidden sm:inline-block text-xs text-neutral-500 border-l border-neutral-200 pl-3">
            <VariableProximity label="Co-Founder @ Unfounded • Zigger • Loopverse" radius={100} />
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center space-x-7">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="flex items-center space-x-1.5 text-neutral-600 hover:text-neutral-950 font-medium transition-colors text-xs py-1"
              >
                <Icon className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Link Button with StarBorder */}
        <StarBorder
          as="a"
          href="https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>LinkedIn profile ↗</span>
        </StarBorder>

      </div>
    </header>
  );
}
