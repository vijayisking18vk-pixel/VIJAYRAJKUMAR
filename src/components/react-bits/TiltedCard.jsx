import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function TiltedCard({
  children,
  className = '',
  containerHeight = 'auto',
  maxTilt = 6
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(((y - centerY) / centerY) * -maxTilt);
    rotateY.set(((x - centerX) / centerX) * maxTilt);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        height: containerHeight
      }}
      className={`relative bg-white border-2 border-[#7A968B] hover:border-[#203322] rounded-2xl shadow-md transition-all duration-300 ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
