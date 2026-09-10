import React from 'react';
import { Compass, BookOpen, Shield, ArrowRight, Award, Zap, CheckCircle2, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  const events = [
    {
      title: 'Startup Pitchfest 2026 Finals',
      location: 'Kanyakumari, India',
      tag: 'Pitchfest Finals',
      detail: "My team and I had the honour of representing two of our ventures at the Startup Pitchfest 2026 Finals, held at the stunning Kanyakumari. We didn't just pitch — we connected with investors who believed in our vision, bonded with fellow founders who are changing the game, and walked away richer in knowledge and purpose.",
      badge: 'Represented 2 ventures · Investor networking & founder cohorts'
    },
    {
      title: "SaaSathoN '26",
      location: 'SSN College of Engineering, Chennai',
      tag: '36-Hr Hackathon',
      detail: "We checked in for SaaSathoN'26 at SSN. 🚀 The 36 hours was intense. We weren't there to just write code; we were there to learn how to actually launch and sell a product. Grateful to be part of the 'high intent' builder group.",
      badge: 'Built & launched DevFriend (60+ tools) · High-intent builder sprint'
    },
    {
      title: 'Global Education Summit (IGES)',
      location: 'Kalaivaanar Arangam, Chennai',
      tag: 'Global Summit',
      detail: "What an incredible experience at the Global Education Summit held at Kalaivaanar Arangam! Representing UNFOUNDED Venture Studios as delegates, my teammate and I gained powerful insights, forged meaningful connections, and showcased our vision for Loopverse and our venture studio.",
      badge: 'Delegates representing Unfounded & Loopverse'
    },
    {
      title: 'Kazakhstan-India Business Forum',
      location: 'International Business Forum',
      tag: 'Global Partnerships',
      detail: "Valuable experience connecting with industry experts from Kazakhstan and India at the Kazakhstan-India Business Forum, exploring cross-border supply chains and international venture partnerships with executive leaders including Mr. Karakulov Nurken.",
      badge: 'Bilateral trade & venture discussion'
    }
  ];

  const skills = [
    'Vibe coding & rapid prototyping',
    'Marketplace mechanics & escrow workflows',
    'Go-to-market (GTM) distribution',
    'AI persistent memory & context systems',
    'Defence strategy & game theory',
    'Hindi language & cross-cultural communication'
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans selection:bg-neutral-900 selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs text-neutral-500 font-medium">
          <a href="/" className="hover:text-neutral-950">Home</a>
          <span>/</span>
          <span className="text-neutral-950 font-semibold">About & Strategic Journey</span>
        </div>

        {/* Page Header */}
        <div className="space-y-4 border-b border-neutral-200 pb-10">
          <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-800 text-xs px-3 py-1 rounded-full font-semibold">
            <Compass className="w-3.5 h-3.5 text-neutral-900" />
            <span>Profile & Background</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            Vijayrajkumar — Co-Founder & Venture Builder
          </h1>

          <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
            Based on-site in Chennai, Tamil Nadu. Building marketplaces and AI cognitive infrastructure at Unfounded, Ziggers, and LoopMemory.
          </p>

          <div className="flex items-center space-x-2 text-xs text-neutral-500 pt-1">
            <MapPin className="w-3.5 h-3.5 text-neutral-700" />
            <span>Chennai, Tamil Nadu, India · On-site</span>
          </div>
        </div>

        {/* Philosophy & Narrative */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
            From Literature to Geopolitics to Venture Building
          </h2>
          <div className="text-neutral-700 space-y-4 text-base leading-relaxed">
            <p>
              I treat venture building not as isolated software coding, but as systemic architecture. A successful product is the convergence of incentive alignment, technical speed, and human trust.
            </p>
            <p>
              My academic background brings an unconventional synthesis: combining the strategic doctrine of <strong>Defence & Strategic Studies</strong> (game theory, asymmetric conflict, intelligence and statecraft) with the expressive, linguistic depth of <strong>Hindi Literature</strong>. These disciplines examine how large groups of people coordinate, communicate, and respond to incentives.
            </p>
            <p>
              Through <strong>Unfounded Venture Studio</strong> in Chennai, I apply these frameworks alongside rapid vibe coding to co-found companies that solve real inefficiencies — from unorganized temporary labor in urban India (<strong>Ziggers</strong>) to session context amnesia in autonomous AI agents (<strong>LoopMemory</strong>).
            </p>
          </div>
        </section>

        {/* Education Credentials */}
        <section className="space-y-6 border-t border-neutral-200 pt-10">
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
                Rigorous study of international security, geopolitics, grand strategy, conflict resolution, deterrence theory, and global economic interdependencies.
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
                Linguistic morphology, literary history, dialectic analysis, and cross-cultural communication strategy across India.
              </p>
            </div>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="space-y-6 border-t border-neutral-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
            Core Competencies & Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-center space-x-2.5 p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-800">
                <Zap className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Ecosystem Milestones & Summits */}
        <section className="space-y-6 border-t border-neutral-200 pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
              Verified Ecosystem Milestones & Summits
            </h2>
            <span className="text-xs text-neutral-500">2025 – 2026</span>
          </div>

          <div className="space-y-4">
            {events.map((ev, idx) => (
              <div key={idx} className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-white border border-neutral-200 rounded-full text-neutral-800">
                    {ev.tag}
                  </span>
                  <span className="text-xs text-neutral-500">{ev.location}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-950">{ev.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{ev.detail}</p>
                <div className="text-xs font-semibold text-neutral-800 pt-1">
                  {ev.badge}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next Steps CTAs */}
        <section className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <a
            href="/ventures/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-950 text-white font-semibold rounded-full hover:bg-black transition-colors text-xs shadow-sm"
          >
            <span>Explore all ventures & case studies</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/contact/"
            className="text-xs font-semibold text-neutral-700 hover:text-neutral-950 underline"
          >
            Start a conversation with Vijayrajkumar →
          </a>
        </section>

      </main>

      <Footer />
    </div>
  );
}
