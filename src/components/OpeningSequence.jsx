import React, { useEffect, useRef } from 'react';
import { travelTo } from '../data/district';

export default function OpeningSequence({ onReveal }) {
  const layer = useRef();
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const amount = Math.min(1, window.scrollY / (window.innerHeight * 0.95));
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        layer.current.style.opacity = reduced ? (amount < 1 ? 1 : 0) : 1 - amount;
        layer.current.style.visibility = amount >= 1 ? 'hidden' : 'visible';
        layer.current.style.setProperty('--opening-scale', reduced ? 1 : 1 + amount * 0.12);
        layer.current.style.pointerEvents = amount > 0.2 ? 'none' : 'auto';
        onReveal(amount > 0.85);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [onReveal]);
  return <section className="opening-sequence" ref={layer} aria-label="Welcome to Vijayrajkumar's district">
    <picture>
      <source media="(max-width: 600px)" srcSet="/images/hero-mobile.webp" />
      <img src="/images/hero-desktop.webp" alt="Vijayrajkumar, a collage of travel, ambition, and life in Chennai" fetchPriority="high" />
    </picture>
    <div className="opening-shade" />
    <div className="opening-edition"><span className="status-square" /> AN OPEN WORLD PORTFOLIO <span>CHENNAI EDITION</span></div>
    <div className="opening-bottom">
      <div><span className="eyebrow">YOUR NEXT CONNECTION STARTS HERE</span><p>Welcome to<br /><em>my district.</em></p></div>
      <button className="enter-district" onClick={() => travelTo(0)}><span>ENTER THE DISTRICT</span><b aria-hidden="true">↓</b><small>SCROLL TO BEGIN</small></button>
      <div className="opening-coordinate">13.0827° N / 80.2707° E<br /><span>OPERATOR. BUILDER. EXPLORER.</span></div>
    </div>
  </section>;
}
