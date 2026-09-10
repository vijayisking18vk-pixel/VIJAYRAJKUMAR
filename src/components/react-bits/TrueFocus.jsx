import React, { useState, useRef, useEffect } from 'react';

export default function TrueFocus({
  sentence = 'TRUE FOCUS ANIMATION',
  manualMode = false,
  blurAmount = 5,
  borderColor = '#2C3E2D',
  glowColor = 'rgba(44, 62, 45, 0.25)',
  animationDuration = 0.4,
  pauseBetweenAnimations = 1
}) {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const wordRefs = useRef([]);

  useEffect(() => {
    if (manualMode) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);
    return () => clearInterval(interval);
  }, [words.length, animationDuration, pauseBetweenAnimations, manualMode]);

  useEffect(() => {
    const target = wordRefs.current[currentIndex];
    if (target) {
      setFocusRect({
        x: target.offsetLeft,
        y: target.offsetTop,
        width: target.offsetWidth,
        height: target.offsetHeight
      });
    }
  }, [currentIndex]);

  return (
    <div className="relative inline-flex flex-wrap gap-x-3 gap-y-2 select-none items-center">
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => (wordRefs.current[index] = el)}
          onClick={() => manualMode && setCurrentIndex(index)}
          className={`cursor-pointer transition-all duration-300 font-bold ${
            index === currentIndex
              ? 'text-[var(--color-text-primary)] scale-105'
              : 'text-[#486358] blur-[2px]'
          }`}
          style={{
            filter: index === currentIndex ? 'none' : `blur(${blurAmount}px)`
          }}
        >
          {word}
        </span>
      ))}

      {/* Focus Box Border Indicator */}
      <div
        className="absolute border-2 pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: `${focusRect.x - 6}px`,
          top: `${focusRect.y - 4}px`,
          width: `${focusRect.width + 12}px`,
          height: `${focusRect.height + 8}px`,
          borderColor: borderColor,
          boxShadow: `0 0 15px ${glowColor}`
        }}
      >
        <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#2C3E2D]"></span>
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#2C3E2D]"></span>
        <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#2C3E2D]"></span>
        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#2C3E2D]"></span>
      </div>
    </div>
  );
}
