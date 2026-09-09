import React from 'react';

export default function ShinyText({
  text = '',
  disabled = false,
  speed = 5,
  className = ''
}) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`relative inline-block overflow-hidden font-bold ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.4) 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: disabled ? 'none' : `shiny-text ${animationDuration} linear infinite`
      }}
    >
      {text}
    </span>
  );
}
