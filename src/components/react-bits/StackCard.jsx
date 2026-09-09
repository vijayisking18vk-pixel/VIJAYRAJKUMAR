import React from 'react';

export default function StackCard({ children, className = '' }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-1 bg-neutral-100 border border-neutral-200 rounded-2xl translate-x-2 translate-y-2 pointer-events-none transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
      <div className="relative bg-white border border-neutral-200 rounded-2xl shadow-card-clean hover:shadow-card-hover p-8 z-10 transition-all duration-300 group-hover:border-neutral-300">
        {children}
      </div>
    </div>
  );
}
