import React from 'react';

export default function ChromaGrid({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-2xl shadow-md group transition-all duration-300 ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
