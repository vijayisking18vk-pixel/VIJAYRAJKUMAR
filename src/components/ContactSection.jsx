import React from 'react';

export default function ContactSection({ heading, bodyText, email }) {
  return (
    <section
      aria-labelledby="contact-heading"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-10 sm:py-16 border-t border-[#E5E2DC]"
    >
      <h2
        id="contact-heading"
        className="text-2xl sm:text-[30px] font-bold text-[#1F2421] tracking-tight mb-4"
      >
        {heading}
      </h2>
      <p className="text-base sm:text-[17px] text-[#525B56] leading-[1.6] max-w-3xl mb-4">
        {bodyText}
      </p>
      <p className="text-base sm:text-[17px] text-[#1F2421]">
        Email:{' '}
        <a
          href={`mailto:${email}`}
          aria-label={`Email Vijayrajkumar at ${email}`}
          className="font-medium text-[#2C3E2D] underline underline-offset-4 decoration-1 hover:decoration-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3E2D] focus-visible:ring-offset-2 rounded"
        >
          {email}
        </a>
      </p>
    </section>
  );
}
