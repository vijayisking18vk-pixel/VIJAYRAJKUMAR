import React, { useRef, useState } from 'react';

export default function BorderGlow({
  children,
  className = '',
  glowColor = '#0A0A0A',
  borderRadius = 9999
}) {
  const cardRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-[1px] overflow-hidden border border-neutral-200 ${className}`}
      style={{ borderRadius: `${borderRadius}px` }}
    >
      <div
        className="pointer-events-none absolute -inset-[150%] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.3 : 0.05,
          background: `radial-gradient(circle 100px at ${cursorPos.x}% ${cursorPos.y}%, ${glowColor} 0%, transparent 70%)`
        }}
      />
      <div
        className="relative bg-white z-10 w-full h-full"
        style={{ borderRadius: `${borderRadius - 1}px` }}
      >
        {children}
      </div>
    </div>
  );
}
