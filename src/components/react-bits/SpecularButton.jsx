import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function SpecularButton({
  children,
  className = '',
  onClick,
  type = 'button'
}) {
  const btnRef = useRef(null);
  const [highlightPos, setHighlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHighlightPos({ x, y });
  };

  return (
    <motion.button
      ref={btnRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden bg-neutral-950 hover:bg-black text-white font-semibold text-sm py-3.5 px-8 rounded-full shadow-sm transition-colors group ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-full transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.2 : 0,
          background: `radial-gradient(circle 80px at ${highlightPos.x}% ${highlightPos.y}%, rgba(255,255,255,0.8), transparent 70%)`
        }}
      />
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </motion.button>
  );
}
