import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFloat({
  children,
  className = '',
  animationDuration = 1,
  stagger = 0.03
}) {
  const containerRef = useRef(null);

  const text = typeof children === 'string' ? children : '';
  const chars = useMemo(() => {
    return text.split('').map((char, index) => (
      <span
        className="inline-block transform-gpu"
        key={index}
        style={{ display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [text]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charElements = el.children;

    const anim = gsap.fromTo(
      charElements,
      {
        opacity: 0,
        y: 40,
        scaleY: 1.4,
        transformOrigin: '50% 100%'
      },
      {
        duration: animationDuration,
        ease: 'back.out(2)',
        opacity: 1,
        y: 0,
        scaleY: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      anim.kill();
    };
  }, [animationDuration, stagger]);

  return (
    <h2
      ref={containerRef}
      className={`font-poster font-bold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-tight ${className}`}
    >
      {chars}
    </h2>
  );
}
