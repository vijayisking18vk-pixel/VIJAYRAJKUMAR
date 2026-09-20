import React from 'react';

export default function ElectricBorder({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center bg-[var(--gta-text-outline)] text-white hover:bg-[var(--gta-text-shadow)] font-semibold text-xs py-2.5 px-5 rounded-full shadow-sm transition-all duration-200 group ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
