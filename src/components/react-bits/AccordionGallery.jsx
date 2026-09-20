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
                ? 'bg-[var(--gta-text-fill-light)] border-[var(--gta-silhouette)]/40 shadow-card-hover'
                : 'bg-[var(--gta-text-fill-light)] border-[var(--gta-silhouette)]/30 hover:border-[var(--gta-silhouette)] shadow-card-clean'
            }`}
          >
            {/* Header row */}
            <div className="p-6 sm:p-7 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-3 font-futura text-xs">
                  <span className="bg-[var(--gta-sky-low)] text-[var(--gta-text-outline)] px-3 py-1 rounded-full font-medium text-[11px]">
                    {item.tag || `Event 0${idx + 1}`}
                  </span>
                  <span className="text-[var(--gta-silhouette)] flex items-center space-x-1.5 font-futura text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[var(--gta-silhouette)]" />
                    <span>{item.location}</span>
                  </span>
                </div>

                <h4 className="font-futura font-semibold text-xl sm:text-2xl text-[var(--gta-text-outline)] tracking-tight leading-snug">
                  {item.title}
                </h4>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className="font-mono text-xs text-[var(--gta-silhouette)] font-medium hidden sm:inline-block">
                  0{idx + 1} / 0{items.length}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                    isOpen ? 'border-[var(--gta-text-outline)] bg-[var(--gta-text-outline)] text-white' : 'border-[var(--gta-silhouette)]/30 text-[var(--gta-silhouette)]'
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
                  className="px-6 pb-8 sm:px-8 border-t border-[var(--gta-silhouette)]/20 pt-6 space-y-6"
                >
                  {/* Photo Container */}
                  {item.image && (
                    <div className="relative w-full overflow-hidden rounded-xl border border-[var(--gta-silhouette)]/30 bg-[var(--gta-sky-low)] group max-h-[380px] sm:max-h-[440px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-[1.01] transition-all duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[var(--gta-text-fill-light)]/90 backdrop-blur-md border border-[var(--gta-silhouette)]/30 px-3 py-1 rounded-full font-futura text-[11px] text-[var(--gta-text-outline)] font-medium flex items-center space-x-1.5 shadow-sm">
                        <Sparkles className="w-3 h-3 text-[var(--gta-text-outline)]" />
                        <span>{item.caption || 'Event Archive'}</span>
                      </div>
                    </div>
                  )}

                  {/* Narrative Body Text */}
                  <div className="space-y-3">
                    <p className="text-sm sm:text-base font-futura text-[var(--gta-silhouette)] leading-relaxed font-normal">
                      "{item.detail}"
                    </p>
                    {item.attendees && (
                      <div className="font-futura text-xs text-[var(--gta-silhouette)] pt-2 border-t border-[var(--gta-silhouette)]/20 flex items-center space-x-2">
                        <Award className="w-3.5 h-3.5 text-[var(--gta-silhouette)]" />
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
