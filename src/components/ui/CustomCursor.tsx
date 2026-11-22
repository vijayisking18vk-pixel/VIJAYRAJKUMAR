import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  externalHoverText?: string | null;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ externalHoverText }) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [data-cursor], .interactive-target');
        if (interactive) {
          setIsHovering(true);
          const customText = interactive.getAttribute('data-cursor');
          setCursorText(customText || '');
        } else if (!externalHoverText) {
          setIsHovering(false);
          setCursorText('');
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, externalHoverText]);

  // Sync with 3D portal hover
  useEffect(() => {
    if (externalHoverText) {
      setIsHovering(true);
      setCursorText(externalHoverText);
    } else if (!cursorText) {
      setIsHovering(false);
    }
  }, [externalHoverText]);

  if (!isVisible) return null;

  const ringRadius = isHovering ? 40 : 18;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* 1. Sharp Inner Diamond Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#F8ECFF] rotate-45 shadow-[0_0_8px_#D147FF]"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isHovering ? 0.6 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* 2. Outer Translucent Plasma Ring with Contextual Label */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#9D00FF]/60 flex items-center justify-center bg-[#4B009E]/10 backdrop-blur-[1px]"
        animate={{
          x: mousePos.x - ringRadius,
          y: mousePos.y - ringRadius,
          width: ringRadius * 2,
          height: ringRadius * 2,
          borderColor: isHovering ? 'rgba(209, 71, 255, 0.9)' : 'rgba(157, 0, 255, 0.4)',
          boxShadow: isHovering ? '0 0 25px rgba(209, 71, 255, 0.5)' : 'none',
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 280, mass: 0.35 }}
      >
        {cursorText && (
          <span className="text-[9px] font-mono tracking-widest text-[#F8ECFF] font-bold uppercase select-none text-center px-1">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
};
