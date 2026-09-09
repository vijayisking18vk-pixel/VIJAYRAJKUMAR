import React from 'react';

export default function FuzzyText({ children, className = '' }) {
  return (
    <span className={`inline-block font-poster font-bold text-white uppercase tracking-tight hover:animate-pulse ${className}`}>
      {children}
    </span>
  );
}
