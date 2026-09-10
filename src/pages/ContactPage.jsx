import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CollaborationDispatch from '../components/CollaborationDispatch';
import { Mail, MessageSquare, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans selection:bg-neutral-900 selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-neutral-500 font-medium">
          <a href="/" className="hover:text-neutral-950">Home</a>
          <span>/</span>
          <span className="text-neutral-950 font-semibold">Contact & Collaboration</span>
        </div>

        {/* Header Block */}
        <div className="space-y-4 border-b border-neutral-200 pb-10">
          <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-800 text-xs px-3 py-1 rounded-full font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-neutral-900" />
            <span>Direct Communication Channel</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            Start a Conversation with Me
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
            I usually respond within two working days. Reach out regarding venture partnerships, product and growth collaboration, startup ecosystems, or speaking and research opportunities.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-500 pt-2">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-neutral-800" />
              <span>Response promise: &lt; 48 hours</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-neutral-800" />
              <span>Base: Chennai, Tamil Nadu, India (IST)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Mail className="w-4 h-4 text-neutral-800" />
              <span>Email: <a href="mailto:contact@unfounded.in" className="font-semibold text-neutral-950 underline">contact@unfounded.in</a></span>
            </div>
          </div>
        </div>

        {/* Contextual Guidance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
            <h2 className="font-bold text-neutral-950 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-neutral-900" />
              <span>What I Prioritize</span>
            </h2>
            <ul className="text-neutral-600 space-y-1.5 text-xs leading-relaxed pt-1">
              <li>• Early-stage co-founding & studio venture partnerships</li>
              <li>• Marketplace architecture & product-led growth strategy</li>
              <li>• AI context/memory infrastructure implementations</li>
              <li>• Keynotes, panel discussions, and pitchfest judging</li>
            </ul>
          </div>

          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
            <h2 className="font-bold text-neutral-950 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-neutral-900" />
              <span>What to Expect</span>
            </h2>
            <p className="text-neutral-600 text-xs leading-relaxed pt-1">
              Direct communication without intermediary screening. If you share a brief with clear problem definitions and goals, we can schedule an introductory sync or meet in person across Chennai.
            </p>
          </div>
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
