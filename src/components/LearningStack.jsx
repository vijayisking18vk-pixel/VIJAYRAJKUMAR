import React from 'react';
import { Cpu, Award, Zap } from 'lucide-react';
import Shuffle from './react-bits/Shuffle';
import RotatingText from './react-bits/RotatingText';
import AccordionGallery from './react-bits/AccordionGallery';
import ClickSpark from './react-bits/ClickSpark';

export default function LearningStack() {
  const skillsList = [
    'Vibe coding & architecture',
    'Marketing & GTM strategy',
    'Start-up leadership',
    'Geopolitics & defence',
    'Hindi language & literature',
    'Cross-border partnerships'
  ];

  const events = [
    {
      title: 'Startup Pitchfest 2026 Finals',
      location: 'Kanyakumari, India',
      tag: 'Pitchfest Finals',
      caption: 'Startup Pitchfest 2026 Finals @ Kanyakumari',
      detail: "My team and I had the honour of representing two of our ventures at the Startup Pitchfest 2026 Finals, held at the stunning Kanyakumari. We didn't just pitch — we connected with investors who believed in our vision, bonded with fellow founders who are changing the game, and walked away richer in knowledge and purpose. Building is hard. But moments like these remind you exactly why you started.",
      attendees: 'Represented 2 ventures · Investor networking & founder cohorts'
    },
    {
      title: "SaaSathoN '26",
      location: 'SSN College of Engineering, Chennai',
      tag: '36-Hr Hackathon',
      caption: "SaaSathoN '26 @ SSN College of Engineering",
      detail: "We checked in for SaaSathoN'26 at SSN. 🚀 The 36 hours was intense. We weren't there to just write code we were there to learn how to actually launch and sell a product. Grateful to be part of the \"high intent\" group.",
      attendees: 'Built & launched DevFriend (60+ tools) · High-intent builder sprint'
    },
    {
      title: 'Global Education Summit (IGES)',
      location: 'Kalaivaanar Arangam, Chennai',
      tag: 'Global Summit',
      caption: 'India Global Education Summit @ Kalaivaanar Arangam',
      detail: "What an incredible experience at the Global Education Summit held at Kalaivaanar Arangam! Representing UNFOUNDED Venture Studios as delegates, my teammate and I gained powerful insights, forged meaningful connections, and showcased our vision for Loopverse and our venture studio. The response was overwhelming — so many brilliant minds genuinely excited about what we're building. This is just the beginning.",
      attendees: 'Delegates representing Unfounded & Loopverse'
    },
    {
      title: 'Kazakhstan-India Business Forum',
      location: 'International Business Forum',
      tag: 'Global Partnerships',
      caption: 'Meeting with Mr. Karakulov Nurken (Exec Director, Bal Carpet)',
      detail: 'It was a pleasure meeting Mr. Karakulov Nurken, Executive Director of Production at Bal Carpet. We had a great conversation exploring opportunities to work together and discussing potential partnerships across both Kazakhstan and India. It was a valuable experience connecting with industry experts from Kazakhstan and India at the Kazakhstan-India Business forum, exchanging ideas, and exploring possibilities for collaboration. Looking forward to more international meetings, meaningful partnerships, and opportunities to build something impactful together.',
      attendees: 'Mr. Karakulov Nurken (Bal Carpet, Kazakhstan) & Vijayrajkumar'
    }
  ];

  return (
    <section id="skills" className="w-full bg-white text-neutral-950 py-24 lg:py-32 px-6 sm:px-12 border-t border-neutral-200 font-sans">
      <div className="max-w-6xl mx-auto space-y-16 lg:space-y-20">
        
        {/* Section Header with sentence case typography */}
        <div className="space-y-5 border-b border-neutral-200 pb-10">
          <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-800 font-sans text-xs px-3.5 py-1.5 rounded-full font-semibold">
            <Cpu className="w-3.5 h-3.5 shrink-0 text-neutral-900" />
            <span>03 // Skills & ecosystem engagements</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-neutral-950 leading-tight">
            <Shuffle text="Core skills & ecosystem engagements" />
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 font-sans leading-relaxed max-w-2xl">
            Active milestones, hackathons, international delegations, and pitching events where we represent our ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Core Skill Sets with RotatingText & ClickSpark */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-lg font-bold font-sans text-neutral-950 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-neutral-900 shrink-0" />
              <span>Core skill sets</span>
            </h3>

            <ClickSpark sparkColor="#18181B">
              <div className="p-7 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4 shadow-card-clean cursor-pointer hover:border-neutral-300 transition-colors">
                <span className="text-xs text-neutral-500 block font-medium">
                  Active focus skill
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-tight min-h-[3.5rem]">
                  <RotatingText words={skillsList} interval={2000} />
                </div>
                <p className="text-xs text-neutral-500 pt-3 border-t border-neutral-200/80 leading-relaxed font-sans">
                  Click anywhere on this card to trigger subtle spark particles
                </p>
              </div>
            </ClickSpark>

            {/* Quick Skills Pills */}
            <div className="space-y-3 pt-2">
              <span className="text-xs text-neutral-500 font-medium block">Capability matrix</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {skillsList.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-white border border-neutral-200 px-3 py-1.5 rounded-lg text-neutral-800 font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Ecosystem Engagement with AccordionGallery */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-lg font-bold font-sans text-neutral-950 flex items-center space-x-2">
              <Award className="w-4 h-4 text-neutral-900 shrink-0" />
              <span>Key events & milestones ({events.length})</span>
            </h3>

            <AccordionGallery items={events} />
          </div>

        </div>

      </div>
    </section>
  );
}
