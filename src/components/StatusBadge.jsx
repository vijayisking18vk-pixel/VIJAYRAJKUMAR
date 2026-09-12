import React from 'react';

export default function StatusBadge({ text, className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-sm font-bold rounded-full bg-[#F6E8C8] text-[#B8892E] select-none ${className}`.trim()}
    >
      {text}
    </span>
  );
}
