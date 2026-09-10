import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CollaborationDispatch from '../components/CollaborationDispatch';
import SocialLinks from '../components/SocialLinks';
import { Mail, MessageSquare, Clock, MapPin, CheckCircle2, Share2 } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-[var(--color-text-muted)] font-medium">
          <a href="/" className="hover:text-[var(--color-accent-primary)] transition-colors">Home</a>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-semibold">Contact & Collaboration</span>
        </div>

        {/* Header Block */}
        <div className="space-y-4 border-b border-[var(--color-border)]/40 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[var(--color-surface)]/35 text-[var(--color-accent-primary)] border border-[var(--color-border)]/50 text-xs px-3 py-1 rounded-full font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-[var(--color-accent-primary)]" />
            <span>Direct Communication Channel</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight">
            Start a Conversation with Me
          </h1>

          <p className="text-lg text-[var(--color-text-primary)]/80 leading-relaxed max-w-3xl">
            I usually respond within two working days. Reach out regarding venture partnerships, product and growth collaboration, startup ecosystems, or speaking and research opportunities.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--color-text-muted)] pt-2">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-[var(--color-accent-primary)]" />
              <span>Response promise: &lt; 48 hours</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-[var(--color-accent-primary)]" />
              <span>Base: Chennai, Tamil Nadu, India (IST)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Mail className="w-4 h-4 text-[var(--color-accent-primary)]" />
              <span>Email: <a href="mailto:vijaykumarunfounded@gmail.com" className="font-semibold text-[var(--color-accent-primary)] hover:underline">vijaykumarunfounded@gmail.com</a></span>
            </div>
          </div>
        </div>

        {/* Contextual Guidance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div className="p-6 bg-[var(--color-surface)]/20 border border-[var(--color-border)]/50 rounded-2xl space-y-2">
            <h2 className="font-bold text-[var(--color-text-primary)] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-primary)]" />
              <span>What I Prioritize</span>
            </h2>
            <ul className="text-[var(--color-text-primary)]/80 space-y-1.5 text-xs leading-relaxed pt-1">
              <li>• Early-stage co-founding & studio venture partnerships</li>
              <li>• Marketplace architecture & product-led growth strategy</li>
              <li>• AI context/memory infrastructure implementations</li>
              <li>• Keynotes, panel discussions, and pitchfest judging</li>
            </ul>
          </div>

          <div className="p-6 bg-[var(--color-surface)]/20 border border-[var(--color-border)]/50 rounded-2xl space-y-2">
            <h2 className="font-bold text-[var(--color-text-primary)] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-primary)]" />
              <span>What to Expect</span>
            </h2>
            <p className="text-[var(--color-text-primary)]/80 text-xs leading-relaxed pt-1">
              Direct communication without intermediary screening. If you share a brief with clear problem definitions and goals, we can schedule an introductory sync or meet in person across Chennai.
            </p>
          </div>
        </div>

        {/* Social & Professional Channels */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
            <Share2 className="w-3.5 h-3.5 text-[var(--color-accent-primary)]" />
            <span>Direct Social & Network Profiles</span>
          </div>
          <SocialLinks compact={false} />
        </div>

        {/* Embedded Collaboration Dispatch Form */}
        <div className="pt-4">
          <CollaborationDispatch />
        </div>

      </main>

      <Footer />
    </div>
  );
}
