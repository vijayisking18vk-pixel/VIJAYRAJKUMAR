import React from 'react';

export default function StarBorder({
  as: Component = 'button',
  children,
  className = '',
  color = '#0A0A0A',
  speed = '4s',
  ...props
}) {
  return (
    <Component
      className={`relative inline-block py-[1px] px-[1px] overflow-hidden rounded-full group ${className}`}
      {...props}
    >
      <div
        className="absolute inset-0 animate-spin opacity-40 group-hover:opacity-100 transition-opacity"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 320deg, ${color} 360deg)`,
          animationDuration: speed
        }}
      />
      <div className="relative bg-neutral-900 text-white px-5 py-2.5 rounded-full flex items-center space-x-2 font-sans text-xs font-semibold tracking-normal group-hover:bg-black transition-colors shadow-sm">
        {children}
      </div>
    </Component>
  );
}
