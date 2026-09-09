import React from 'react';

export default function FluidGlass({ children, className = '' }) {
  return (
    <div className={`relative bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-card-clean ${className}`}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
