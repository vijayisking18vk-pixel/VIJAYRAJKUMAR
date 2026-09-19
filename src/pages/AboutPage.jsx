import React from 'react';
import { Compass, BookOpen, Shield, ArrowRight, Award, Zap, CheckCircle2, MapPin, Download, ExternalLink } from 'lucide-react';
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
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs text-[var(--color-text-muted)] font-medium">
          <a href="/" className="hover:text-[var(--color-accent-primary)]">Home</a>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-semibold">About & Strategic Journey</span>
        </div>

        {/* Page Header */}
        <div className="space-y-4 border-b border-[var(--color-border)]/60 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[#E2ECE7] text-[#1B2F21] border border-[#85A296] text-xs px-3.5 py-1.5 rounded-full font-bold">
            <Compass className="w-3.5 h-3.5 text-[#203322]" />
            <span>Profile & Background</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight">
            Vijayrajkumar — Chief Operating Officer &amp; Venture Builder
          </h1>

          <p className="text-lg text-[#203028] leading-relaxed max-w-3xl">
            Based on-site in Chennai, Tamil Nadu. Building marketplaces and AI cognitive infrastructure as Chief Operating Officer &amp; Co-founder at Unfounded, Ziggers, and LoopMemory.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-center space-x-2 text-xs text-[#354E45] font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#203322]" />
              <span>Chennai, Tamil Nadu, India · On-site</span>
            </div>
            <span className="text-[#85A296]">•</span>
            <a href="/ventures/" className="inline-flex items-center space-x-1 text-xs font-bold text-[#203322] hover:underline">
              <span>Explore Ventures &amp; Case Studies</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Philosophy & Narrative */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            From Literature to Geopolitics to Venture Building
          </h2>
          <div className="text-[#203028] space-y-4 text-base leading-relaxed">
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
        <section className="space-y-6 border-t border-[var(--color-border)]/60 pt-10">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Academic Background & Degrees
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white border-2 border-[#7A968B] hover:border-[var(--color-accent-primary)] rounded-2xl space-y-3 shadow-md transition-all">
              <div className="w-10 h-10 bg-[#E2ECE7] border border-[#85A296] rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#203322]" />
              </div>
              <span className="text-xs text-[#354E45] font-bold block">Apr 2023 – Apr 2026</span>
              <h3 className="text-lg font-bold text-[#111815]">B.Sc. in Defence & Strategic Studies</h3>
              <p className="text-xs text-[#203322] font-bold">SRM Institute of Science and Technology (SRMIST)</p>
              <p className="text-sm text-[#203028] leading-relaxed pt-1">
                Rigorous study of international security, geopolitics, grand strategy, conflict resolution, deterrence theory, and global economic interdependencies.
              </p>
            </div>

            <div className="p-6 bg-white border-2 border-[#7A968B] hover:border-[var(--color-accent-primary)] rounded-2xl space-y-3 shadow-md transition-all">
              <div className="w-10 h-10 bg-[#E2ECE7] border border-[#85A296] rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#203322]" />
              </div>
              <span className="text-xs text-[#354E45] font-bold block">Dec 2016 – Jan 2021</span>
              <h3 className="text-lg font-bold text-[#111815]">Master of Arts (MA) in Hindi Literature</h3>
              <p className="text-xs text-[#203322] font-bold">Dakshina Bharat Hindi Prachar Sabha</p>
              <p className="text-sm text-[#203028] leading-relaxed pt-1">
                Linguistic morphology, literary history, dialectic analysis, and cross-cultural communication strategy across India.
              </p>
            </div>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="space-y-6 border-t border-[var(--color-border)]/60 pt-10">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Core Competencies & Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-4 bg-white border-2 border-[#7A968B] rounded-xl text-sm font-bold text-[#111815] shadow-sm">
                <Zap className="w-4 h-4 text-[#203322] shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Ecosystem Milestones & Summits */}
        <section className="space-y-6 border-t border-[var(--color-border)]/60 pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
              Verified Ecosystem Milestones & Summits
            </h2>
            <span className="text-xs text-[#354E45] font-bold">2025 – 2026</span>
          </div>

          <div className="space-y-4">
            {events.map((ev, idx) => (
              <div key={idx} className="p-6 bg-white border-2 border-[#7A968B] hover:border-[var(--color-accent-primary)] rounded-2xl space-y-3 shadow-md transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold px-3 py-1 bg-[#E2ECE7] border border-[#85A296] rounded-full text-[#1B2F21]">
                    {ev.tag}
                  </span>
                  <span className="text-xs text-[#354E45] font-semibold">{ev.location}</span>
                </div>
                <h3 className="text-lg font-bold text-[#111815]">{ev.title}</h3>
                <p className="text-sm text-[#203028] leading-relaxed">{ev.detail}</p>
                <div className="text-xs font-bold text-[#203322] pt-1">
                  {ev.badge}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Executive Media Kit & Entity Profile */}
        <section id="media-kit" className="space-y-8 border-t border-[var(--color-border)]/60 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center space-x-2 bg-[#E2ECE7] text-[#1B2F21] border border-[#85A296] text-xs px-3 py-1 rounded-full font-bold mb-2">
                <span>Official Verification &amp; Press Assets</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Executive Media Kit &amp; Entity Profile
              </h2>
            </div>
            <a
              href="/vijayrajkumar-poster.jpg"
              download="vijayrajkumar-official-portrait.jpg"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 bg-[#1B2F21] text-white rounded-xl hover:bg-[#2C4834] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Portrait (HD)</span>
            </a>
          </div>

          {/* Disambiguation Banner */}
          <div className="p-4 bg-[#E2ECE7]/80 border-2 border-[#85A296] rounded-2xl text-xs sm:text-sm text-[#1B2F21] space-y-1">
            <strong className="block font-bold">Official Entity Disambiguation Note:</strong>
            <p>
              Vijayrajkumar is an Indian technology executive, venture builder, and Chief Operating Officer based on-site in Chennai, Tamil Nadu, India. Co-founder of Unfounded, Ziggers, and LoopMemory. This is an independent executive identity and profile; he has no affiliation with Indian film actor Vinay Rajkumar or other persons of similar names.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Portrait Preview Card */}
            <div className="p-5 bg-white border-2 border-[#7A968B] rounded-2xl space-y-3 shadow-md flex flex-col items-center text-center">
              <img
                src="/vijayrajkumar-poster.jpg"
                alt="Vijayrajkumar — Chief Operating Officer &amp; Venture Builder"
                width="280"
                height="373"
                className="rounded-xl w-full max-w-[220px] h-auto object-cover border border-[#7A968B]/40 shadow"
                loading="lazy"
              />
              <div>
                <h3 className="font-bold text-base text-[#111815]">Vijayrajkumar</h3>
                <p className="text-xs text-[#354E45] font-semibold">COO &amp; Venture Builder · Chennai</p>
              </div>
              <a
                href="/vijayrajkumar-poster.jpg"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#203322] hover:underline inline-flex items-center gap-1 mt-1"
              >
                <span>View Full Resolution</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Bios */}
            <div className="md:col-span-2 space-y-4">
              <div className="p-5 bg-white border-2 border-[#7A968B] rounded-2xl space-y-2 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#354E45]">
                    Short Bio (50 Words — Event Guides &amp; Introductions)
                  </h3>
                </div>
                <p className="text-sm text-[#203028] leading-relaxed">
                  Vijayrajkumar is a Chennai-based Chief Operating Officer and venture builder specializing in two-sided gig marketplaces and AI cognitive memory infrastructure. He co-founded Unfounded Venture Studio, Ziggers (verified gig staffing), and LoopMemory (persistent context for AI agents), combining strategic doctrine with high-velocity product execution.
                </p>
              </div>

              <div className="p-5 bg-white border-2 border-[#7A968B] rounded-2xl space-y-2 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#354E45]">
                    Standard Bio (150 Words — Press &amp; Panel Profiles)
                  </h3>
                </div>
                <p className="text-sm text-[#203028] leading-relaxed">
                  Vijayrajkumar is an Indian technology executive, Chief Operating Officer, and venture builder based on-site in Chennai, Tamil Nadu. He leads operational execution, marketplace dynamics, and ecosystem growth across three key initiatives: Ziggers, a verified gig-economy staffing marketplace replacing unorganized WhatsApp hiring with escrow payouts; LoopMemory, a persistent context and hierarchical memory engine eliminating context rot in AI agents; and Unfounded, a venture studio validating digital products.
                </p>
                <p className="text-sm text-[#203028] leading-relaxed">
                  Vijayrajkumar holds an unconventional dual academic foundation: a B.Sc. in Defence and Strategic Studies from SRMIST, focusing on asymmetric strategy and game theory, and an MA in Hindi Literature from Dakshina Bharat Hindi Prachar Sabha. He applies strategic doctrine and narrative design to zero-to-one venture architecture.
                </p>
              </div>
            </div>
          </div>

          {/* Speaking & Keynote Topics */}
          <div className="p-6 bg-white border-2 border-[#7A968B] rounded-2xl space-y-3 shadow-md">
            <h3 className="text-base font-bold text-[#111815]">Speaking &amp; Press Topics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-[#E2ECE7]/50 rounded-xl text-xs sm:text-sm font-medium text-[#1B2F21]">
                • <strong>AI Persistent Context:</strong> Hierarchical semantic graphs vs prompt stuffing
              </div>
              <div className="p-3 bg-[#E2ECE7]/50 rounded-xl text-xs sm:text-sm font-medium text-[#1B2F21]">
                • <strong>Marketplace Liquidity:</strong> Migrating blue-collar gig workflows from WhatsApp to escrow
              </div>
              <div className="p-3 bg-[#E2ECE7]/50 rounded-xl text-xs sm:text-sm font-medium text-[#1B2F21]">
                • <strong>Grand Strategy in Startups:</strong> Applying military doctrine &amp; OODA loops to product sprints
              </div>
              <div className="p-3 bg-[#E2ECE7]/50 rounded-xl text-xs sm:text-sm font-medium text-[#1B2F21]">
                • <strong>Venture Studios in India:</strong> Parallel incubation models for tier-1 tech ecosystems
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps CTAs */}
        <section className="pt-6 border-t border-[var(--color-border)]/40 flex flex-wrap items-center justify-between gap-4">
          <a
            href="/ventures/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[var(--color-accent-primary)] text-white font-semibold rounded-full hover:bg-[#1E2C1F] transition-colors text-xs shadow-sm"
          >
            <span>Explore all ventures & case studies</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/contact/"
            className="text-xs font-semibold text-[var(--color-accent-primary)] hover:underline"
          >
            Start a conversation with me →
          </a>
        </section>

      </main>

      <Footer />
    </div>
  );
}
