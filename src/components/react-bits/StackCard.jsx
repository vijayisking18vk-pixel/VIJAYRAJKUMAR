import React from 'react';

export default function StackCard({ children, className = '' }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
}
