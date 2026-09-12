import React from 'react';

export function EducationEntry({ institution, description }) {
  return (
    <p className="text-base sm:text-[17px] text-[#525B56] leading-[1.6]">
      <strong className="font-bold text-[#1F2421]">{institution}</strong> {description}
    </p>
  );
}

export default function EducationSection({ heading, items }) {
  return (
    <section
      aria-labelledby="education-heading"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-10 sm:py-16 border-t border-[#E5E2DC]"
    >
      <h2
        id="education-heading"
        className="text-2xl sm:text-[30px] font-bold text-[#1F2421] tracking-tight mb-6"
      >
        {heading}
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <EducationEntry
            key={item.institution}
            institution={item.institution}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
