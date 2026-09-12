import React from 'react';
import StatusBadge from './StatusBadge';

export default function VentureCard({ venture }) {
  const content = (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h3 className="text-xl sm:text-[22px] font-bold text-[#1F2421] tracking-tight leading-snug">
          {venture.title}
        </h3>
        <p className="mt-3 text-base text-[#525B56] leading-[1.6]">
          {venture.description}
        </p>
      </div>
      <div className="mt-6 pt-2">
        <StatusBadge text={venture.status} />
      </div>
    </div>
  );

  const baseCardStyles =
    'p-6 sm:p-8 bg-[#FFFFFF] border border-[#E5E2DC] rounded-lg transition-all duration-200 block';

  if (venture.href) {
    return (
      <a
        href={venture.href}
        aria-label={`${venture.title} case study`}
        className={`${baseCardStyles} hover:border-[#2C3E2D] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3E2D] focus-visible:ring-offset-2`}
      >
        {content}
      </a>
    );
  }

  return <div className={baseCardStyles}>{content}</div>;
}
