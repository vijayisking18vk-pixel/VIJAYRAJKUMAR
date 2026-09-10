import React, { useState } from 'react';
import { Send, CheckCircle, ArrowUpRight, GraduationCap, BookOpen, MapPin, Mail, Copy, Check } from 'lucide-react';
import TrueFocus from './react-bits/TrueFocus';
import FluidGlass from './react-bits/FluidGlass';
import SpecularButton from './react-bits/SpecularButton';
import BounceCards from './react-bits/BounceCards';
import SocialLinks from './SocialLinks';

export default function CollaborationDispatch() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const directEmail = 'vijaykumarunfounded@gmail.com';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const directLinks = [
    { title: 'Ziggers.in', url: 'https://www.ziggers.in/' },
    { title: 'LoopMemory.in', url: 'https://www.loopmemory.in/' },
    { title: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/' }
  ];

  return (
    <section id="dispatch" className="w-full bg-[var(--color-background)] text-[var(--color-text-primary)] py-24 lg:py-32 px-6 sm:px-12 border-t border-[var(--color-border)]/40 font-sans">
      <div className="max-w-6xl mx-auto space-y-16 lg:space-y-20">
        
        {/* Section Header */}
        <div className="space-y-5 border-b border-[var(--color-border)]/40 pb-10">
          <div className="inline-flex items-center space-x-2 bg-[var(--color-surface)]/30 text-[var(--color-accent-primary)] border border-[var(--color-border)]/40 font-sans text-xs px-3.5 py-1.5 rounded-full font-semibold">
            <Send className="w-3.5 h-3.5 shrink-0 text-[var(--color-accent-primary)]" />
            <span>04 // Contact & Collaboration</span>
          </div>

          <div className="text-3xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-[var(--color-text-primary)] leading-tight">
            <TrueFocus sentence="Let's build together" manualMode={false} blurAmount={3} />
          </div>

          {/* Explicit Contact Promise */}
          <div className="p-5 bg-[var(--color-surface)]/20 border border-[var(--color-border)]/40 rounded-2xl max-w-3xl space-y-2">
            <p className="text-sm sm:text-base text-[var(--color-text-primary)] font-medium leading-relaxed">
              "I usually respond within two working days. Contact me about venture partnerships, product and growth collaboration, startup ecosystems, or speaking and research opportunities."
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center space-x-1.5 font-medium text-[var(--color-text-primary)]">
                <Mail className="w-3.5 h-3.5 text-[var(--color-accent-primary)]" />
                <span>Direct email:</span>
              </span>
              <a
                href={`mailto:${directEmail}`}
                className="font-semibold text-[var(--color-accent-primary)] underline hover:text-[#1A1A1A]"
              >
                {directEmail}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white border border-[var(--color-border)]/40 rounded-md text-[11px] font-medium text-[var(--color-accent-primary)] hover:bg-[var(--color-surface)]/25 transition-colors"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[#2C3E2D]" />
                    <span className="text-[#2C3E2D] font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[var(--color-text-muted)]" />
                    <span>Copy email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Dispatch Brief Form */}
          <FluidGlass className="space-y-6">
            <h3 className="text-xl font-bold font-sans text-neutral-950 border-b border-neutral-100 pb-4">
              Send a collaboration message
            </h3>

            {submitted ? (
              <div className="p-8 border border-neutral-200 bg-neutral-50 rounded-2xl text-center space-y-3">
                <CheckCircle className="w-10 h-10 mx-auto text-neutral-900" />
                <div className="text-lg font-bold text-neutral-950">Message Sent Successfully</div>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                  Thank you for reaching out! Your brief has been transmitted directly to Vijayrajkumar. You will receive a response within two working days.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-3 text-xs text-neutral-900 font-semibold underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-neutral-700 font-medium">
                    Your Name or Organization <span className="text-neutral-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Founder, Investor, Co-builder"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/75 border border-[var(--color-border)]/70 rounded-xl p-3.5 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:bg-white focus:border-[var(--color-accent-primary)] outline-none transition-all text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-[var(--color-text-primary)] font-medium">
                    Contact Email Address <span className="text-[var(--color-text-muted)]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/75 border border-[var(--color-border)]/70 rounded-xl p-3.5 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:bg-white focus:border-[var(--color-accent-primary)] outline-none transition-all text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-[var(--color-text-primary)] font-medium">
                    Brief Details & Context <span className="text-[var(--color-text-muted)]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Venture partnership inquiry, product collaboration, or startup ecosystem project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/75 border border-[var(--color-border)]/70 rounded-xl p-3.5 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:bg-white focus:border-[var(--color-accent-primary)] outline-none transition-all text-xs resize-none"
                  ></textarea>
                </div>

                <div className="w-full pt-1">
                  <SpecularButton type="submit" className="w-full">
                    Send Collaboration Message
                  </SpecularButton>
                </div>

                <p className="text-[11px] text-neutral-400 text-center pt-1 font-medium">
                  Your information is kept confidential and sent directly. No spam.
                </p>
              </form>
            )}
          </FluidGlass>

          {/* Contact Details & Links */}
          <div className="space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Location */}
              <div className="space-y-1.5">
                <span className="text-xs text-neutral-400 font-medium block">Base & Location</span>
                <div className="text-lg font-bold text-neutral-950 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Chennai, Tamil Nadu, India · On-site</span>
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-1.5">
                <span className="text-xs text-neutral-400 font-medium block">Co-Founder Positions</span>
                <div className="text-base font-bold text-neutral-950">
                  Unfounded • Ziggers • LoopMemory
                </div>
                <div className="text-xs text-neutral-500">
                  Full-time (Jun 2025 – Present) · Vibe coding & product marketing
                </div>
              </div>

              {/* Education 1: SRMIST */}
              <div className="space-y-1.5">
                <span className="text-xs text-neutral-400 font-medium block">Education // Defence & Strategic Studies</span>
                <a
                  href="https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/details/education/edit/forms/1193197386/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-neutral-900 flex items-center space-x-2 hover:underline leading-snug"
                >
                  <GraduationCap className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>SRMIST — B.Sc. Defence & Strategic Studies (2023–2026)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>

              {/* Education 2: Hindi MA */}
              <div className="space-y-1.5">
                <span className="text-xs text-neutral-400 font-medium block">Education // Hindi Literature</span>
                <a
                  href="https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/details/education/edit/forms/1193198586/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-neutral-900 flex items-center space-x-2 hover:underline leading-snug"
                >
                  <BookOpen className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Dakshina Bharat Hindi Prachar Sabha — MA Hindi (2016–2021)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>

            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs text-neutral-400 font-medium block">Direct Venture Platforms</span>
              <BounceCards links={directLinks} />
            </div>

            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <span className="text-xs text-neutral-400 font-medium block">Social & Professional Channels</span>
              <SocialLinks compact={false} />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
