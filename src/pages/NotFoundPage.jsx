import React from 'react';
import { Compass, ArrowLeft, Home, Layers, BookOpen, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-futura selection:bg-[var(--color-accent-primary)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-3xl mx-auto px-6 py-20 lg:py-32 space-y-8 text-center flex flex-col items-center justify-center">
        <div className="inline-flex items-center space-x-2 bg-[#E2ECE7] text-[#1B2F21] border border-[#85A296] text-xs px-3.5 py-1 rounded-full font-bank uppercase tracking-wider font-bold shadow-sm">
          <Compass className="w-3.5 h-3.5 text-[#1B2F21]" />
          <span>404 · Mission Lost</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl sm:text-8xl font-pricedown font-bold tracking-wide text-[#111815]">
            404
          </h1>
          <p className="text-xl sm:text-2xl font-diploma text-[#203322]">
            Page Not Found
          </p>
        </div>

        <p className="text-base sm:text-lg text-[#1D2B24] max-w-lg leading-relaxed font-futura">
          The page or case study you are looking for does not exist or has been relocated within the Vijayrajkumar directory.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#203322] text-white font-bank uppercase tracking-wider font-bold rounded-full hover:bg-[#111815] transition-colors text-xs shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </a>
          <a
            href="/about/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white border-2 border-[#7A968B] text-[#111815] font-bank uppercase tracking-wider font-bold rounded-full hover:border-[#203322] transition-colors text-xs shadow-sm"
          >
            <span>About &amp; Journey</span>
          </a>
        </div>

        <div className="pt-8 border-t border-[#7A968B]/30 w-full max-w-md">
          <span className="text-xs font-bank uppercase tracking-widest text-[#354E45] block mb-3 font-bold">
            Explore Core Portals
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bank uppercase tracking-wider font-bold">
            <a href="/about/" className="p-2.5 bg-white border border-[#7A968B]/40 rounded-xl hover:border-[#203322] transition-colors text-[#111815]">
              About
            </a>
            <a href="/ventures/" className="p-2.5 bg-white border border-[#7A968B]/40 rounded-xl hover:border-[#203322] transition-colors text-[#111815]">
              Ventures
            </a>
            <a href="/writing/" className="p-2.5 bg-white border border-[#7A968B]/40 rounded-xl hover:border-[#203322] transition-colors text-[#111815]">
              Writing
            </a>
            <a href="/contact/" className="p-2.5 bg-white border border-[#7A968B]/40 rounded-xl hover:border-[#203322] transition-colors text-[#111815]">
              Contact
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
