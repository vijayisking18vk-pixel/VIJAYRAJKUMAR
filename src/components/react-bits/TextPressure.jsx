import React, { useEffect, useRef, useState } from 'react';

export default function TextPressure({
  text = 'Vijayrajkumar',
  className = '',
  textColor = '#0A0A0A'
}) {
  const containerRef = useRef(null);
  const spansRef = useRef([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const chars = text.split('');

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      <h1 className="font-sans font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight flex items-center justify-center">
        {chars.map((char, i) => {
          let dist = 100;
          let weight = 700;
          let scale = 1;

          if (spansRef.current[i]) {
            const rect = spansRef.current[i].getBoundingClientRect();
            const containerRect = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
            const charCenterX = rect.left - containerRect.left + rect.width / 2;
            const charCenterY = rect.top - containerRect.top + rect.height / 2;
            const dx = mouse.x - charCenterX;
            const dy = mouse.y - charCenterY;
            dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 180) {
              const factor = 1 - dist / 180;
              weight = Math.round(700 + factor * 200);
              scale = 1 + factor * 0.08;
            }
          }

          return (
            <span
              key={i}
              ref={(el) => (spansRef.current[i] = el)}
              className="inline-block transition-transform duration-100 ease-out"
              style={{
                color: textColor,
                fontWeight: weight,
                transform: `scale(${scale})`
              }}
            >
              {char}
            </span>
          );
        })}
      </h1>
    </div>
  );
}
