import React, { useState, useEffect } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';

export default function DecryptedText({
  text = '',
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  className = '',
  parentClassName = '',
  encryptedClassName = ''
}) {
  const [displayText, setDisplayText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    let iteration = 0;

    const originalLength = text.length;

    interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (iteration >= maxIterations) return char;

            if (sequential) {
              if (index < Math.floor((iteration / maxIterations) * originalLength)) {
                return char;
              }
            }

            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('');
      });

      iteration += 1;
      if (iteration > maxIterations + originalLength) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, sequential, isHovered]);

  return (
    <span
      className={`inline-block font-mono ${parentClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={className}>{displayText || text}</span>
    </span>
  );
}
