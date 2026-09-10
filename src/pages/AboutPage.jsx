import React from 'react';
import { Compass, GraduationCap, BookOpen, MapPin, Shield, Rocket, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans selection:bg-neutral-900 selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        
        {/* Page Header */}
        <div className="space-y-4 border-b border-neutral-200 pb-10">
          <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-800 text-xs px-3 py-1 rounded-full font-semibold">
            <Compass className="w-3.5 h-3.5 text-neutral-900" />
            <span>About Vijayrajkumar</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            Co-Founder & Venture Builder based in Chennai, India.
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
            Vijayrajkumar is an Indian startup co-founder operating across marketplace dynamics, persistent AI memory infrastructure, product marketing, and venture incubation at Unfounded, Ziggers, and LoopMemory.
          </p>
        </div>

        {/* Core Profile & Philosophy */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
            Who is Vijayrajkumar?
          </h2>
          <div className="prose text-neutral-700 space-y-4 text-base leading-relaxed">
            <p>
              I am a venture builder and co-founder based on-site in Chennai, Tamil Nadu. My work sits at the intersection of product architecture, rapid vibe coding execution, and go-to-market distribution.
            </p>
            <p>
              Rather than approaching venture building as purely software engineering, I treat it as strategic system design. My background spans literature, geopolitics, and defence strategy — fields that study how incentives, communications, and power dynamics govern human systems at scale.
            </p>
            <p>
              Today, I co-found and build companies through <strong>Unfounded Venture Studio</strong>, focusing on solving concrete structural inefficiencies in Indian labor markets (<strong>Ziggers</strong>) and developer context engines (<strong>LoopMemory</strong>).
            </p>
          </div>
        </section>

        {/* Education Credentials */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
            Academic Background & Degrees
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
              <div className="w-9 h-9 bg-white border border-neutral-200 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-neutral-900" />
              </div>
              <span className="text-xs text-neutral-500 font-medium block">Apr 2023 – Apr 2026</span>
              <h3 className="text-lg font-bold text-neutral-950">B.Sc. in Defence & Strategic Studies</h3>
              <p className="text-xs text-neutral-600 font-semibold">SRM Institute of Science and Technology (SRMIST)</p>
              <p className="text-sm text-neutral-600 leading-relaxed pt-1">
                Rigorous study of international security, geopolitics, grand strategy, conflict resolution, and global economic dependencies.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
              <div className="w-9 h-9 bg-white border border-neutral-200 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-neutral-900" />
              </div>
              <span className="text-xs text-neutral-500 font-medium block">Dec 2016 – Jan 2021</span>
              <h3 className="text-lg font-bold text-neutral-950">Master of Arts (MA) in Hindi Literature</h3>
              <p className="text-xs text-neutral-600 font-semibold">Dakshina Bharat Hindi Prachar Sabha</p>
              <p className="text-sm text-neutral-600 leading-relaxed pt-1">
                Linguistic structures, literary history, dialectic analysis, and cross-cultural communication strategy across India.
              </p>
            </div>
          </div>
        </section>

        {/* Ventures Overview */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
            Active Co-Founder Positions
          </h2>

          <div className="space-y-4">
            <a
              href="/ventures/ziggers/"
              className="block p-6 bg-neutral-50 border border-neutral-200 rounded-2xl hover:border-neutral-400 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-neutral-950 group-hover:underline">
                    Ziggers — Co-Founder
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Local Gig-Economy Marketplace · Chennai On-site · Jun 2025 – Present
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-950 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-sm text-neutral-600 mt-2">
                Replacing informal WhatsApp gig hiring with verified labor, real-time tracking, and milestone escrow.
              </p>
            </a>

            <a
              href="/ventures/loopmemory/"
              className="block p-6 bg-neutral-50 border border-neutral-200 rounded-2xl hover:border-neutral-400 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-neutral-950 group-hover:underline">
                    LoopMemory — Co-Founder
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    AI Memory & Context Infrastructure · Chennai On-site · Jun 2025 – Present
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-950 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-sm text-neutral-600 mt-2">
                Persistent context structuring and semantic memory graphs for AI agents and developer workflows.
              </p>
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
