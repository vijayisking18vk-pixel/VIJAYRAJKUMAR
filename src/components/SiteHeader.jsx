import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function SiteHeader({ homeLabel, links, activeHref = '/' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const normalize = (path) => (path ? path.toLowerCase().replace(/\/+$/, '') : '');
  const normalizedActive = normalize(activeHref);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F6F3]/90 backdrop-blur-md border-b border-[#E5E2DC] transition-colors">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand / Home Link */}
        <a
          href="/"
          className="text-lg sm:text-xl font-bold tracking-tight text-[#1F2421] hover:text-[#2C3E2D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3E2D] focus-visible:ring-offset-2 rounded"
        >
          {homeLabel}
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden md:flex items-center space-x-6">
          <ul className="flex items-center space-x-6 list-none m-0 p-0">
            {links.map((link) => {
              const isActive = normalizedActive === normalize(link.href);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-sm font-medium transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3E2D] focus-visible:ring-offset-2 rounded ${
                      isActive
                        ? 'text-[#2C3E2D] font-semibold underline underline-offset-8 decoration-2 decoration-[#2C3E2D]'
                        : 'text-[#525B56] hover:text-[#1F2421]'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="p-2 rounded-lg text-[#1F2421] hover:bg-[#E5E2DC]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3E2D] focus-visible:ring-offset-2"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E2DC] bg-[#F7F6F3] px-6 py-4 space-y-3 shadow-lg">
          <nav aria-label="Mobile Navigation">
            <ul className="flex flex-col space-y-3 list-none m-0 p-0">
              {links.map((link) => {
                const isActive = normalizedActive === normalize(link.href);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-base font-medium py-2 px-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3E2D] focus-visible:ring-offset-2 ${
                        isActive
                          ? 'text-[#2C3E2D] font-semibold bg-[#2C3E2D]/10 underline underline-offset-4 decoration-2 decoration-[#2C3E2D]'
                          : 'text-[#525B56] hover:text-[#1F2421] hover:bg-[#E5E2DC]/40'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
