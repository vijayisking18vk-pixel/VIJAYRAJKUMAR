import React, { useRef, useState } from 'react';

export default function GlareHover({
  children,
  className = '',
  glareColor = 'rgba(0, 0, 0, 0.05)'
}) {
  const cardRef = useRef(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-2xl shadow-md transition-all duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor}, transparent 60%)`
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
