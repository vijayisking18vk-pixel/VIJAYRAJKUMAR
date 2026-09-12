import React from 'react';

export default function ProfileDetailsGrid({ items }) {
  return (
    <section
      aria-labelledby="profile-details-heading"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-8 sm:py-12"
    >
      <h2
        id="profile-details-heading"
        className="text-2xl sm:text-[30px] font-bold text-[#1F2421] tracking-tight mb-6"
      >
        Verified Profile Details
      </h2>
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 m-0 p-0">
        {items.map((item) => (
          <div
            key={item.label}
            className="p-5 sm:p-6 bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg shadow-sm flex flex-col justify-between"
          >
            <dt className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#525B56] mb-1.5">
              {item.label}
            </dt>
            <dd className="text-base sm:text-lg font-medium text-[#1F2421] leading-snug m-0">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
