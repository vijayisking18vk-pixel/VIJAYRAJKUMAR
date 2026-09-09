import React from 'react';
import SplitText from './SplitText';

export default function Shuffle({ text = '', className = '' }) {
  return (
    <SplitText
      text={text}
      className={className}
      delay={0.03}
      animationFrom={{ opacity: 0, y: 20 }}
      animationTo={{ opacity: 1, y: 0 }}
    />
  );
}
