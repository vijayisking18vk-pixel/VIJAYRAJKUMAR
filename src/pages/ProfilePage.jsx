import React from 'react';
import { 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Layers, 
  Zap, 
  Calendar, 
  BookOpen, 
  Send, 
  ArrowRight, 
  ArrowUpRight, 
  Mail, 
  Compass,
  CheckCircle2
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialLinks from '../components/SocialLinks';
import { PROFILE, CURRENT_ROLES, KEY_PROOF_POINTS, EDUCATION } from '../data/profileData';

export default function ProfilePage() {
  const portalLinks = [
    {
      title: 'About & Strategic Journey',
      description: 'Personal narrative, strategic synthesis of Defence Studies & Hindi Literature, and core competencies.',
      href: '/about/',
      icon: Compass,
      label: 'Read background'
    },
    {
      title: 'Ventures & Deep Dives',
      description: 'Comprehensive case studies, target users, deliverables shipped, and production architectures.',
      href: '/ventures/',
      icon: Layers,
      label: 'View ventures',
      caseStudies: [
        { label: 'Ziggers Case Study', href: '/ventures/ziggers/' },
        { label: 'LoopMemory Case Study', href: '/ventures/loopmemory/' }
      ]
    },
    {
      title: 'Events & Summits',
      description: 'Verified milestones from India Global Education Summit, Kazakhstan-India Forum, and builder sprints.',
      href: '/events/',
      icon: Calendar,
      label: 'Explore records'
    },
    {
      title: 'Writing & Research',
      description: 'Essays on urban gig marketplaces, multi-session AI memory architecture, and defence game theory.',
      href: '/writing/',
      icon: BookOpen,
      label: 'Read essays'
    },
    {
      title: 'Contact & Collaboration',
      description: 'Direct communication channel, collaboration dispatch form, response SLA, and partnership topics.',
      href: '/contact/',
      icon: Send,
      label: 'Get in touch'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 lg:py-24 space-y-16">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[var(--color-text-muted)] font-medium">
          <a href="/" className="hover:text-[var(--color-accent-primary)]">Home</a>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-semibold">Executive Profile</span>
        </nav>

        {/* Section 1: Professional Biography & Profile Header */}
        <section aria-labelledby="profile-heading" className="space-y-6 border-b border-[#7A968B]/40 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[#E2ECE7] text-[#1B2F21] border border-[#85A296] text-xs px-3.5 py-1 rounded-full font-bold shadow-sm">
            <User className="w-3.5 h-3.5 text-[#1B2F21]" />
            <span>Executive Dossier · Navigation Hub</span>
          </div>

          <div className="space-y-2">
            <h1 id="profile-heading" className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111815] leading-tight">
              {PROFILE.name}
            </h1>
            <p className="text-sm font-mono font-semibold uppercase tracking-wider text-[#203322]">
              {PROFILE.mainTitle} · {PROFILE.city}, {PROFILE.country}
            </p>
          </div>

          <p className="text-base sm:text-lg text-[#1D2B24] leading-relaxed max-w-3xl font-normal">
            {PROFILE.shortBio} Serving as {PROFILE.mainTitle} across <strong>Unfounded</strong>, <strong>Ziggers</strong>, and <strong>LoopMemory</strong>, Vijayrajkumar combines strategic doctrines from Defence &amp; Strategic Studies with cultural and linguistic precision to build resilient software ventures.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#2A3E34] font-medium pt-1">
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-[#203322]" />
              <span>{PROFILE.base}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Mail className="w-4 h-4 text-[#203322]" />
              <a href={`mailto:${PROFILE.email}`} className="font-bold text-[#203322] hover:underline">
                {PROFILE.email}
              </a>
            </div>
            <div className="flex items-center space-x-1.5">
              <Briefcase className="w-4 h-4 text-[#203322]" />
              <span>SLA: Response within 48 hours</span>
            </div>
          </div>
        </section>

        {/* Section 2: Current Leadership Roles */}
        <section aria-labelledby="roles-heading" className="space-y-6">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
            <Briefcase className="w-4 h-4 text-[#203322]" />
            <span>Executive Leadership</span>
          </div>
          <h2 id="roles-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Current Roles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CURRENT_ROLES.map((item, idx) => (
              <div key={idx} className="p-5 bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-2xl space-y-2.5 shadow-sm transition-all flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 bg-[#E2ECE7] text-[#1B2F21] rounded-full">
                    {item.scope}
                  </span>
                  <h3 className="text-lg font-bold text-[#111815] pt-1">{item.company}</h3>
                  <p className="text-xs text-[#354E45] font-semibold">{item.role}</p>
                  <p className="text-xs text-[#1D2B24] leading-relaxed pt-1">{item.description}</p>
                </div>
                <div className="pt-2 border-t border-[#7A968B]/20 flex items-center justify-between text-xs font-bold text-[#203322]">
                  <a href={item.link} className="hover:underline flex items-center space-x-1">
                    <span>Case study</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                  {item.external && (
                    <a href={item.external} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center space-x-1">
                      <span>Live</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Key Proof Points & Benchmarks */}
        <section aria-labelledby="proof-heading" className="space-y-6 border-t border-[#7A968B]/40 pt-10">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
            <Zap className="w-4 h-4 text-[#203322]" />
            <span>Operational Outcomes</span>
          </div>
          <h2 id="proof-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Key Proof Points
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {KEY_PROOF_POINTS.map((pt, idx) => (
              <div key={idx} className="p-4 bg-white border-2 border-[#7A968B] rounded-2xl shadow-sm text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-[#203322]">{pt.metric}</div>
                <div className="text-xs font-bold text-[#111815]">{pt.label}</div>
                <p className="text-[11px] text-[#2A3E34] leading-tight">{pt.context}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Concise Academic Background */}
        <section aria-labelledby="education-heading" className="space-y-6 border-t border-[#7A968B]/40 pt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
              <GraduationCap className="w-4 h-4 text-[#203322]" />
              <span>Academic Credentials</span>
            </div>
            <a href="/about/" className="text-xs font-bold text-[#203322] hover:underline">
              Full background &amp; narrative →
            </a>
          </div>
          <h2 id="education-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Education Summary
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="p-5 bg-white border-2 border-[#7A968B] rounded-2xl space-y-2 shadow-sm">
                <span className="text-xs text-[#354E45] font-bold">{edu.period}</span>
                <h3 className="text-base font-bold text-[#111815]">{edu.degree}</h3>
                <p className="text-xs font-bold text-[#203322]">{edu.institution}</p>
                <p className="text-xs text-[#1D2B24] leading-relaxed pt-1">{edu.focus}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Navigation & Deep Dive Portals */}
        <section aria-labelledby="portals-heading" className="space-y-6 border-t border-[#7A968B]/40 pt-10">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
            <Layers className="w-4 h-4 text-[#203322]" />
            <span>Information Architecture</span>
          </div>
          <h2 id="portals-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Explore Dedicated Portals
          </h2>
          <p className="text-sm text-[#1D2B24]">
            Detailed case studies, full event records, complete research essays, and communication dispatches are housed in their dedicated sections:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portalLinks.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-5 bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-2xl shadow-sm transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-[#E2ECE7] flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#203322]" />
                      </div>
                      <h3 className="text-base font-bold text-[#111815]">{p.title}</h3>
                    </div>
                    <p className="text-xs text-[#1D2B24] leading-relaxed">{p.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#7A968B]/20">
                    <a
                      href={p.href}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#203322] hover:underline"
                    >
                      <span>{p.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    {p.caseStudies && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {p.caseStudies.map((cs, cIdx) => (
                          <a
                            key={cIdx}
                            href={cs.href}
                            className="text-[11px] font-semibold px-2.5 py-1 bg-[#E2ECE7] text-[#1B2F21] rounded-full hover:bg-[#85A296]/30 transition-colors"
                          >
                            {cs.label} →
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 6: Connect & External Profiles */}
        <section aria-labelledby="connect-heading" className="space-y-6 border-t border-[#7A968B]/40 pt-10">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2A3E34]">
            <Mail className="w-4 h-4 text-[#203322]" />
            <span>Connect &amp; Collaborate</span>
          </div>
          <h2 id="connect-heading" className="text-2xl sm:text-3xl font-bold text-[#111815]">
            Direct Collaboration
          </h2>
          <p className="text-sm text-[#1D2B24] leading-relaxed">
            Open for venture co-founding discussions, marketplace strategy, and AI memory architecture partnerships. Reach out directly or use the dedicated dispatch portal.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white border-2 border-[#7A968B] rounded-2xl shadow-sm">
            <div className="space-y-1">
              <span className="text-xs text-[#354E45] font-bold block uppercase tracking-wider">Direct Email</span>
              <a href={`mailto:${PROFILE.email}`} className="text-sm font-bold text-[#111815] hover:text-[#203322] hover:underline">
                {PROFILE.email}
              </a>
              <span className="text-xs text-[#354E45] block">Response promise within 48 hours</span>
            </div>
            <a
              href="/contact/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#203322] text-white font-semibold rounded-full hover:bg-[#111815] transition-colors text-xs shadow-sm"
            >
              <span>Open Collaboration Dispatch</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#354E45] block mb-3">
              External Verified Profiles
            </span>
            <SocialLinks compact={false} />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
