import React from 'react';
import { Zap, ArrowUpRight, ArrowLeft, CheckCircle2, Shield, Users, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ZiggersPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center space-x-2 text-xs text-[var(--color-text-muted)] font-medium">
          <a href="/" className="hover:text-[var(--color-accent-primary)]">Home</a>
          <span>/</span>
          <a href="/ventures/" className="hover:text-[var(--color-accent-primary)]">Ventures</a>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-semibold">Ziggers Case Study</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 border-b border-[var(--color-border)]/40 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[var(--color-surface)]/30 text-[var(--color-accent-primary)] border border-[var(--color-border)]/40 text-xs px-3 py-1 rounded-full font-semibold">
            <Zap className="w-3.5 h-3.5 text-[var(--color-accent-primary)]" />
            <span>Product Case Study · Product Hunt Launched</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight">
            Ziggers — Local Gig-Economy & Staffing Marketplace
          </h1>

          <p className="text-lg text-[#383838] leading-relaxed max-w-3xl">
            A Chennai-first gig staffing marketplace built to replace informal WhatsApp hiring with verified workers, real-time tracking, and milestone-based escrow payments.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="https://www.ziggers.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[var(--color-accent-primary)] text-white font-semibold rounded-full hover:bg-[#1E2C1F] transition-colors text-xs shadow-sm"
            >
              <span>Visit live platform (ziggers.in)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <span className="text-xs text-[var(--color-text-muted)]">
              Chief Operating Officer & Co-Founder · Live in Production
            </span>
          </div>
        </div>

        {/* Case Study Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
          
          <div className="p-6 bg-white/75 backdrop-blur-sm border border-[var(--color-border)]/70 hover:border-[var(--color-accent-secondary)] rounded-2xl space-y-2 shadow-sm transition-all">
            <h2 className="text-base font-bold text-[var(--color-accent-primary)]">1. The Problem</h2>
            <p className="text-[#4A4A4A] leading-relaxed">
              In urban India, millions of short-term gig staffing requests (events, hospitality, promotions, warehouse shifts) happen through unorganized WhatsApp groups. Employers suffer high no-show rates and unverified workers, while workers face payment delays and wage theft.
            </p>
          </div>

          <div className="p-6 bg-white/75 backdrop-blur-sm border border-[var(--color-border)]/70 hover:border-[var(--color-accent-secondary)] rounded-2xl space-y-2 shadow-sm transition-all">
            <h2 className="text-base font-bold text-[var(--color-accent-primary)]">2. The Target User</h2>
            <p className="text-[#4A4A4A] leading-relaxed">
              Business managers, event organizers, catering operators, and logistics leads needing 5 to 50 reliable hands on short notice; and college students/flexible workers looking for transparent daily or weekly gigs.
            </p>
          </div>

          <div className="p-6 bg-white/75 backdrop-blur-sm border border-[var(--color-border)]/70 hover:border-[var(--color-accent-secondary)] rounded-2xl space-y-2 shadow-sm transition-all">
            <h2 className="text-base font-bold text-[var(--color-accent-primary)]">3. What I Personally Owned</h2>
            <p className="text-[#4A4A4A] leading-relaxed">
              As Co-Founder, I shaped product direction, user onboarding flows, marketplace matching rules, and the milestone escrow payment logic. I led go-to-market positioning, offline student community outreach across Chennai colleges, and the Product Hunt launch.
            </p>
          </div>

          <div className="p-6 bg-white/75 backdrop-blur-sm border border-[var(--color-border)]/70 hover:border-[var(--color-accent-secondary)] rounded-2xl space-y-2 shadow-sm transition-all">
            <h2 className="text-base font-bold text-[var(--color-accent-primary)]">4. Deliverables Shipped</h2>
            <p className="text-[#4A4A4A] leading-relaxed">
              Shipped responsive web application on React and Vite, real-time geolocation check-in, verified worker identification, shift matching engine, and automated escrow payout processing upon verified shift completion.
            </p>
          </div>

        </div>

        {/* Verifiable Milestones */}
        <section className="space-y-4 border-t border-[var(--color-border)]/40 pt-10">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            Verifiable Evidence & Milestones
          </h2>
          <ul className="space-y-3 text-sm text-[#383838]">
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-primary)] mt-0.5 shrink-0" />
              <span><strong>Product Hunt Launch:</strong> Launched globally to early community reviewers and startup founders.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-primary)] mt-0.5 shrink-0" />
              <span><strong>Startup Pitchfest 2026 Finals:</strong> Selected and pitched among top startup finalists in Kanyakumari.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-primary)] mt-0.5 shrink-0" />
              <span><strong>Live Production Deployment:</strong> Operating live at <a href="https://www.ziggers.in/" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-[var(--color-accent-primary)]">ziggers.in</a>.</span>
            </li>
          </ul>
        </section>

      </main>

      <Footer />
    </div>
  );
}
