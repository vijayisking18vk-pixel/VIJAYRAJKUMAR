import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, Sparkles, BookOpen } from 'lucide-react';
import { STORY_DATA } from '../../data/storyData';

export const OriginAct: React.FC = () => {
  return (
    <section
      id="origin"
      className="relative min-h-screen w-full flex flex-col justify-center px-4 sm:px-8 py-24 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Chapter Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#9D00FF]/20 pb-6 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#9D00FF] mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#9D00FF] inline-block" />
              <span>CHAPTER 01 // 2005 – 2019</span>
            </div>
            <h2 className="font-monumental text-3xl sm:text-5xl md:text-6xl font-bold text-[#F8ECFF] uppercase tracking-tight">
              THE MISCHIEVOUS SPARK
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 font-mono text-xs text-[#A89BB9] text-left sm:text-right">
            <div>BORN: 05.04.2005</div>
            <div className="text-[#D147FF]">KOVILPATTI ➔ MADAMBAKKAM</div>
          </div>
        </div>

        {/* Grid Layout: Left Narrative & Lo-Fi Gaze Card, Right Interactive Schooling Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col space-y-6"
          >
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0B011A]/80 border border-[#9D00FF]/30 backdrop-blur-md overflow-hidden group">
              {/* Subtle Violet Moodboard Background Artwork */}
              <div
                className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-700 bg-cover bg-center mix-blend-screen pointer-events-none"
                style={{ backgroundImage: `url('/images/moodboard/lofi-black-cat.jpg')` }}
              />

              <div className="relative z-10 flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#D147FF] uppercase tracking-wider px-2.5 py-1 rounded bg-[#9D00FF]/20 border border-[#9D00FF]/40">
                    NATURAL INSTINCT
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#9D00FF] animate-ping" />
                    <span className="font-mono text-[10px] text-[#A89BB9]">NOCTURNAL MIND</span>
                  </div>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#F8ECFF] leading-snug">
                  "A bright, playful, slightly mischievous kid who could clear 85%+ without cracking a textbook open."
                </h3>

                <p className="font-editorial text-sm sm:text-base text-[#A89BB9] leading-relaxed">
                  Born on <span className="text-[#F8ECFF] font-medium">April 5, 2005</span> in Kovilpatti, Tuticorin (Thoothukudi), Vijayrajkumar grew up in Madambakkam, Chennai. Early life was marked by boundless energy, curiosity, and an innate knack for quick comprehension. School was frictionless.
                </p>

                <div className="pt-4 border-t border-[#9D00FF]/20 grid grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <span className="text-[#A89BB9]/70 block text-[10px] uppercase">Birthplace</span>
                    <span className="text-[#F8ECFF] font-medium">Kovilpatti, TN</span>
                  </div>
                  <div>
                    <span className="text-[#A89BB9]/70 block text-[10px] uppercase">Base of Operations</span>
                    <span className="text-[#F8ECFF] font-medium">Madambakkam, 600126</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Playful Black Cat Glance Quote Card */}
            <div className="p-5 rounded-xl bg-[#020005]/80 border border-[#9D00FF]/20 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-[#4B009E]/30 border border-[#9D00FF]/40 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img
                  src="/images/moodboard/lofi-black-cat.jpg"
                  alt="Mischief spark"
                  className="w-full h-full object-cover filter contrast-125"
                />
              </div>
              <div className="flex-1 font-mono text-xs">
                <span className="text-[#D147FF] font-bold block mb-0.5">MISCHIEF ARCHETYPE</span>
                <span className="text-[#A89BB9] text-[11px] leading-tight block">
                  Quick-witted, untamed instinct that later became the fuel for independent enterprise.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Schooling Telemetry Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col space-y-4"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B011A]/60 border border-[#9D00FF]/30 backdrop-blur-md">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#9D00FF]/15">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-[#D147FF]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F8ECFF]">
                    ACADEMIC FOUNDATION TIMELINE
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#A89BB9]">3 INSTITUTIONS</span>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#9D00FF]/30 space-y-8">
                {STORY_DATA.education.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#020005] border-2 border-[#9D00FF] group-hover:border-[#D147FF] group-hover:scale-125 transition-all duration-300 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D147FF]" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                      <span className="font-mono text-xs text-[#D147FF] font-bold tracking-wider">
                        {item.period}
                      </span>
                      {item.metric && (
                        <span className="inline-flex items-center space-x-1 font-mono text-xs text-[#F8ECFF] bg-[#9D00FF]/30 px-2 py-0.5 rounded border border-[#9D00FF]/50 mt-1 sm:mt-0 w-fit">
                          <Award className="w-3 h-3 text-[#D147FF]" />
                          <span>{item.metric} CONSISTENT</span>
                        </span>
                      )}
                    </div>

                    <h4 className="mt-1 font-editorial text-lg sm:text-xl font-bold text-[#F8ECFF] group-hover:text-[#D147FF] transition-colors">
                      {item.school}
                    </h4>

                    <p className="mt-1.5 font-editorial text-sm text-[#A89BB9] leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Note */}
              <div className="mt-8 pt-6 border-t border-[#9D00FF]/20 flex items-start space-x-3 text-xs font-mono text-[#A89BB9]/90 bg-[#020005]/40 p-4 rounded-xl">
                <Sparkles className="w-4 h-4 text-[#D147FF] flex-shrink-0 mt-0.5" />
                <span>
                  Everything was easy. High scores came without effort. But unearned ease created a false sense of security — setting the stage for the cataclysm of 2020.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
