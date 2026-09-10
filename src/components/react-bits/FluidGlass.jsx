import React from 'react';

export default function FluidGlass({ children, className = '' }) {
  return (
    <div className={`relative bg-white border-2 border-[#7A968B] rounded-3xl p-8 sm:p-10 shadow-md ${className}`}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
