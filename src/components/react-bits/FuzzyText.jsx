import React from 'react';

export default function FuzzyText({ children, className = '' }) {
  return (
    <span className={`inline-block font-poster font-bold text-[var(--color-text-primary)] uppercase tracking-tight hover:text-[var(--color-accent-primary)] transition-colors ${className}`}>
      {children}
    </span>
  );
}
