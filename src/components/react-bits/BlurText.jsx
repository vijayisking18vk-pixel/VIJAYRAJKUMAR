import React from 'react';
import { motion } from 'framer-motion';

export default function BlurText({
  text = '',
  className = '',
  delay = 0.04,
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top',
  threshold = 0.1,
  rootMargin = '-50px',
  animationFrom,
  animationTo
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const defaultFrom = direction === 'top'
    ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-20px,0)' }
    : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,20px,0)' };

  const defaultTo = {
    filter: 'blur(0px)',
    opacity: 1,
    transform: 'translate3d(0,0px,0)'
  };

  const from = animationFrom || defaultFrom;
  const to = animationTo || defaultTo;

  return (
    <motion.p
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: rootMargin }}
      transition={{ staggerChildren: delay }}
    >
      {elements.map((item, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: from,
            visible: to
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {item === ' ' ? '\u00A0' : item}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.p>
  );
}
