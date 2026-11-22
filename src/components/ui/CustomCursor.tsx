import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate for non-touch pointers
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check for custom cursor targets or links
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [data-cursor], .interactive-target');
        if (interactive) {
          setIsHovering(true);
          const customText = interactive.getAttribute('data-cursor');
          setCursorText(customText || '');
        } else {
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
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* 1. Sharp Inner Diamond Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#F8ECFF] rotate-45 shadow-[0_0_8px_#D147FF]"
        animate={{
          x: mousePos.x - 5,
          y: mousePos.y - 5,
          scale: isHovering ? 0.6 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* 2. Outer Translucent Plasma Ring with Contextual Label */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#9D00FF]/60 flex items-center justify-center bg-[#4B009E]/10 backdrop-blur-[1px]"
        animate={{
          x: isHovering ? mousePos.x - 36 : mousePos.y ? mousePos.x - 18 : -100,
          y: isHovering ? mousePos.y - 36 : mousePos.x ? mousePos.y - 18 : -100,
          width: isHovering ? 72 : 36,
          height: isHovering ? 72 : 36,
          borderColor: isHovering ? 'rgba(209, 71, 255, 0.9)' : 'rgba(157, 0, 255, 0.4)',
          boxShadow: isHovering ? '0 0 25px rgba(209, 71, 255, 0.5)' : 'none',
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 280, mass: 0.35 }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono tracking-widest text-[#F8ECFF] font-bold uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
};
