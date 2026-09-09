import React from 'react';

export default function Marquee({
  children,
  speed = 30,
  className = '',
  pauseOnHover = false
}) {
  return (
    <div className={`overflow-hidden select-none flex whitespace-nowrap ${className}`}>
      <div
        className="flex shrink-0 items-center animate-ribbon-loop"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        className="flex shrink-0 items-center animate-ribbon-loop"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
}
