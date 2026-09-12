import React from 'react';
import VentureCard from './VentureCard';

export default function VentureSection({ heading, ventures }) {
  return (
    <section
      id="ventures"
      aria-labelledby="ventures-heading"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-10 sm:py-16 scroll-mt-20"
    >
      <h2
        id="ventures-heading"
        className="text-2xl sm:text-[30px] font-bold text-[#1F2421] tracking-tight mb-8"
      >
        {heading}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:gap-8">
        {ventures.map((venture) => (
          <VentureCard key={venture.title} venture={venture} />
        ))}
      </div>
    </section>
  );
}
