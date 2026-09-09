import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, Award, Sparkles } from 'lucide-react';

export default function AccordionGallery({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = activeIndex === idx;
        return (
          <div
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`border rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer ${
              isOpen
                ? 'bg-white border-neutral-300 shadow-card-hover'
                : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-card-clean'
            }`}
          >
            {/* Header row */}
            <div className="p-6 sm:p-7 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-3 font-sans text-xs">
                  <span className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full font-medium text-[11px]">
                    {item.tag || `Event 0${idx + 1}`}
                  </span>
                  <span className="text-neutral-500 flex items-center space-x-1.5 font-sans text-xs">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{item.location}</span>
                  </span>
                </div>

                <h4 className="font-sans font-semibold text-xl sm:text-2xl text-neutral-950 tracking-tight leading-snug">
                  {item.title}
                </h4>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className="font-mono text-xs text-neutral-400 font-medium hidden sm:inline-block">
                  0{idx + 1} / 0{items.length}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                    isOpen ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 text-neutral-600'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </div>
            </div>

            {/* Expanded Content with Photo & Quote */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="px-6 pb-8 sm:px-8 border-t border-neutral-100 pt-6 space-y-6"
                >
                  {/* Photo Container */}
                  {item.image && (
                    <div className="relative w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 group max-h-[380px] sm:max-h-[440px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-[1.01] transition-all duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-neutral-200 px-3 py-1 rounded-full font-sans text-[11px] text-neutral-900 font-medium flex items-center space-x-1.5 shadow-sm">
                        <Sparkles className="w-3 h-3 text-neutral-900" />
                        <span>{item.caption || 'Event Archive'}</span>
                      </div>
                    </div>
                  )}

                  {/* Narrative Body Text */}
                  <div className="space-y-3">
                    <p className="text-sm sm:text-base font-sans text-neutral-700 leading-relaxed font-normal">
                      "{item.detail}"
                    </p>
                    {item.attendees && (
                      <div className="font-sans text-xs text-neutral-500 pt-2 border-t border-neutral-100 flex items-center space-x-2">
                        <Award className="w-3.5 h-3.5 text-neutral-700" />
                        <span>{item.attendees}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
