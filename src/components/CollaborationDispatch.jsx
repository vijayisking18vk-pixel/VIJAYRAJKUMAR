import React, { useState } from 'react';
import { Send, CheckCircle, ArrowUpRight, GraduationCap, BookOpen, MapPin } from 'lucide-react';
import TrueFocus from './react-bits/TrueFocus';
import FluidGlass from './react-bits/FluidGlass';
import SpecularButton from './react-bits/SpecularButton';
import BounceCards from './react-bits/BounceCards';

export default function CollaborationDispatch() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const directLinks = [
    { title: 'Ziggers.in', url: 'https://www.ziggers.in/' },
    { title: 'LoopMemory.in', url: 'https://www.loopmemory.in/' },
    { title: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/' }
  ];

  return (
    <section id="dispatch" className="w-full bg-white text-neutral-950 py-24 lg:py-32 px-6 sm:px-12 border-t border-neutral-200 font-sans">
      <div className="max-w-6xl mx-auto space-y-16 lg:space-y-20">
        
        {/* Section Header with sentence case typography */}
        <div className="space-y-5 border-b border-neutral-200 pb-10">
          <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-800 font-sans text-xs px-3.5 py-1.5 rounded-full font-semibold">
            <Send className="w-3.5 h-3.5 shrink-0 text-neutral-900" />
            <span>04 // Dispatch brief</span>
          </div>

          <div className="text-3xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-neutral-950 leading-tight">
            <TrueFocus sentence="Let's build together" manualMode={false} blurAmount={3} />
          </div>

          <p className="text-base sm:text-lg text-neutral-600 font-sans leading-relaxed max-w-2xl">
            Co-founding early-stage ventures, local gig marketplaces, and knowledge structuring engines. Let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Dispatch Brief Form with FluidGlass & SpecularButton */}
          <FluidGlass className="space-y-6">
            <h3 className="text-xl font-bold font-sans text-neutral-950 border-b border-neutral-100 pb-4">
              Send a dispatch brief
            </h3>

            {submitted ? (
              <div className="p-8 border border-neutral-200 bg-neutral-50 rounded-2xl text-center space-y-3">
                <CheckCircle className="w-10 h-10 mx-auto text-neutral-900" />
                <div className="text-lg font-bold text-neutral-950">Dispatch sent</div>
                <p className="text-xs text-neutral-600 font-medium">
                  Thank you! Your dispatch has been transmitted to Vijayrajkumar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div className="space-y-1.5">
                  <label className="block text-neutral-700 font-medium">Your name or organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Founder, Investor, or Builder"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 text-neutral-950 placeholder-neutral-400 focus:bg-white focus:border-neutral-900 outline-none transition-all text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-neutral-700 font-medium">Contact email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@studio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 text-neutral-950 placeholder-neutral-400 focus:bg-white focus:border-neutral-900 outline-none transition-all text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-neutral-700 font-medium">Brief details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Collaboration inquiry, venture idea, or introduction..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 text-neutral-950 placeholder-neutral-400 focus:bg-white focus:border-neutral-900 outline-none transition-all text-xs resize-none"
                  ></textarea>
                </div>

                <div className="w-full pt-2">
                  <SpecularButton type="submit" className="w-full">
                    Dispatch message
                  </SpecularButton>
                </div>
              </form>
            )}
          </FluidGlass>

          {/* Contact Details & Links */}
          <div className="space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Location */}
              <div className="space-y-1.5">
                <span className="text-xs text-neutral-400 font-medium block">Location</span>
                <div className="text-lg font-bold text-neutral-950 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Chennai, Tamil Nadu, India · On-site</span>
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-1.5">
                <span className="text-xs text-neutral-400 font-medium block">Co-founder positions</span>
                <div className="text-base font-bold text-neutral-950">
                  Unfounded • Zigger • Loopverse
                </div>
                <div className="text-xs text-neutral-500">
                  Full-time (Jun 2025 – Present) · Vibe coding & marketing
                </div>
              </div>

              {/* Education 1: SRMIST */}
              <div className="space-y-1.5">
                <span className="text-xs text-neutral-400 font-medium block">Education // Defence & Strategy</span>
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
              <span className="text-xs text-neutral-400 font-medium block">Direct venture links</span>
              <BounceCards links={directLinks} />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
