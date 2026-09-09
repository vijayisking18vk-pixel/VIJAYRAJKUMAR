import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function PixelTransition({ children, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden bg-white border border-neutral-200 rounded-2xl shadow-card-clean hover:shadow-card-hover transition-all duration-300 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-neutral-900/[0.02] grid grid-cols-6 grid-rows-6"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="border border-neutral-900/[0.04]" />
        ))}
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
