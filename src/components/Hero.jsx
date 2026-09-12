import React from 'react';
import Button from './Button';

export default function Hero({ headline, subtext, primaryCta, secondaryCta }) {
  return (
    <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 max-w-5xl mx-auto px-6 sm:px-8">
      <h1 className="text-3xl sm:text-[44px] md:text-[48px] font-bold text-[#1F2421] tracking-tight leading-[1.15]">
        {headline}
      </h1>
      <p className="mt-6 text-base sm:text-lg md:text-[18px] text-[#525B56] leading-[1.6] max-w-3xl">
        {subtext}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {primaryCta && (
          <Button variant="primary" href={primaryCta.href}>
            {primaryCta.label}
          </Button>
        )}
        {secondaryCta && (
          <Button variant="secondary" href={secondaryCta.href}>
            {secondaryCta.label}
          </Button>
        )}
      </div>
    </section>
  );
}
