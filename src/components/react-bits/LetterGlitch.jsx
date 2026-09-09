import React from 'react';
import Marquee from './Marquee';

export default function LetterGlitch({ children, className = '' }) {
  return (
    <Marquee speed={35} className={className}>
      {children}
    </Marquee>
  );
}
