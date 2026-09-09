import React, { useRef, useState, useEffect } from 'react';

export default function VariableProximity({
  label = '',
  className = '',
  containerRef,
  radius = 100,
  falloff = 'linear'
}) {
  const elementRef = useRef(null);
  const [proximityWeight, setProximityWeight] = useState(400);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (distance < radius) {
        const factor = 1 - distance / radius;
        setProximityWeight(Math.round(400 + factor * 400)); // 400 -> 800 weight
      } else {
        setProximityWeight(400);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [radius]);

  return (
    <span
      ref={elementRef}
      className={`inline-block transition-all duration-150 ${className}`}
      style={{ fontWeight: proximityWeight }}
    >
      {label}
    </span>
  );
}
