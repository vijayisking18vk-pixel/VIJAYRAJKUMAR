import React from 'react';

export default function GradientText({
  children,
  className = '',
  colors = ['#0A0A0A', '#52525B', '#18181B'],
  animationSpeed = 6,
  showBorder = false
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `gradientMove ${animationSpeed}s linear infinite`
  };

  return (
    <span className={`inline-block font-bold ${showBorder ? 'border border-neutral-200 px-3 py-1 rounded-full' : ''} ${className}`}>
      <span style={gradientStyle}>{children}</span>
    </span>
  );
}
