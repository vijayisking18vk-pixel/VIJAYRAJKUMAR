import React, { useState } from 'react';

export default function ClickSpark({ children, sparkColor = '#ffffff' }) {
  const [sparks, setSparks] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setSparks((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== id));
    }, 600);
  };

  return (
    <div onClick={handleClick} className="relative inline-block overflow-hidden">
      {children}
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="absolute w-2 h-2 bg-white rounded-full pointer-events-none animate-ping"
          style={{ left: spark.x, top: spark.y }}
        />
      ))}
    </div>
  );
}
