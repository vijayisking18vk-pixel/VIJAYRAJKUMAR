import React from 'react';
import { Compass, ArrowLeft, Home, Layers, BookOpen, Send } from 'lucide-react';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-futura selection:bg-[var(--color-accent-primary)] selection:text-white flex flex-col">

      <main className="flex-grow max-w-3xl mx-auto px-6 py-20 lg:py-32 space-y-8 text-center flex flex-col items-center justify-center">
        <div className="inline-flex items-center space-x-2 bg-[var(--gta-sky-low)] text-[var(--gta-text-outline)] border border-[var(--gta-silhouette)] text-xs px-3.5 py-1 rounded-full font-bank uppercase tracking-wider font-bold shadow-sm">
          <Compass className="w-3.5 h-3.5 text-[var(--gta-text-outline)]" />
          <span>404 · Mission Lost</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl sm:text-8xl font-pricedown font-bold tracking-wide text-[var(--gta-text-outline)]">
            404
          </h1>
          <p className="text-xl sm:text-2xl font-diploma text-[var(--color-accent-primary)]">
            Page Not Found
          </p>
        </div>

        <p className="text-base sm:text-lg text-[var(--gta-text-outline)] max-w-lg leading-relaxed font-futura">
          The page or case study you are looking for does not exist or has been relocated within the Vijayrajkumar directory.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[var(--gta-text-outline)] text-[var(--gta-text-fill)] font-bank uppercase tracking-wider font-bold rounded-full hover:bg-[var(--gta-text-shadow)] transition-colors text-xs shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </a>
          <a
            href="/about/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[var(--gta-text-fill-light)] border-2 border-[var(--gta-silhouette)] text-[var(--gta-text-outline)] font-bank uppercase tracking-wider font-bold rounded-full hover:border-[var(--color-accent-primary)] transition-colors text-xs shadow-sm"
          >
            <span>About &amp; Journey</span>
          </a>
        </div>

        <div className="pt-8 border-t border-[var(--gta-silhouette)]/30 w-full max-w-md">
          <span className="text-xs font-bank uppercase tracking-widest text-[var(--gta-silhouette)] block mb-3 font-bold">
            Explore Core Portals
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bank uppercase tracking-wider font-bold">
            <a href="/about/" className="p-2.5 bg-[var(--gta-text-fill-light)] border border-[var(--gta-silhouette)]/40 rounded-xl hover:border-[var(--color-accent-primary)] transition-colors text-[var(--gta-text-outline)]">
              About
            </a>
            <a href="/ventures/" className="p-2.5 bg-[var(--gta-text-fill-light)] border border-[var(--gta-silhouette)]/40 rounded-xl hover:border-[var(--color-accent-primary)] transition-colors text-[var(--gta-text-outline)]">
              Ventures
            </a>
            <a href="/writing/" className="p-2.5 bg-[var(--gta-text-fill-light)] border border-[var(--gta-silhouette)]/40 rounded-xl hover:border-[var(--color-accent-primary)] transition-colors text-[var(--gta-text-outline)]">
              Writing
            </a>
            <a href="/contact/" className="p-2.5 bg-[var(--gta-text-fill-light)] border border-[var(--gta-silhouette)]/40 rounded-xl hover:border-[var(--color-accent-primary)] transition-colors text-[var(--gta-text-outline)]">
              Contact
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
