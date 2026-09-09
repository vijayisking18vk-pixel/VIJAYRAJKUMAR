import React, { useEffect, useState } from 'react';

export default function CountUp({
  to = 100,
  from = 0,
  duration = 2,
  className = '',
  suffix = '%'
}) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [from, to, duration]);

  return (
    <span className={`font-mono font-bold ${className}`}>
      {count}{suffix}
    </span>
  );
}
