import React from 'react';

export default function FluidGlass({ children, className = '' }) {
  return (
    <div className={`relative bg-[var(--gta-text-fill-light)] border-2 border-[var(--gta-silhouette)] rounded-3xl p-8 sm:p-10 shadow-md ${className}`}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
