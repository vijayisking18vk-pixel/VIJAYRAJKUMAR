import React, { useEffect, useRef, useState } from 'react';
import { travelTo } from '../data/district';
import './OpeningSequence.css';

const portraits = [
  { image: 'hills-art', title: 'Off the grid', place: 'THE HILLS', alt: 'Vijayrajkumar overlooking sunlit green hills', position: '50% 48%' },
  { image: 'coast-art', title: 'Chasing horizons', place: 'THE COAST', alt: 'Vijayrajkumar at the ocean at sunset', position: '65% 50%' },
  { image: 'operator-art', title: 'Never done building', place: 'THE OPERATOR', alt: 'Portrait of Vijayrajkumar in sunglasses and a knit cap', position: '50% 32%' },
];
const DURATION = 18000;

export default function OpeningSequence({ onReveal }) {
  const layer = useRef(null);
  const elapsed = useRef(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(true);
  const active = Math.min(portraits.length - 1, Math.floor(progress * portraits.length));

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(preference.matches);
    preference.addEventListener('change', change);
    return () => preference.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const amount = Math.min(1, window.scrollY / (window.innerHeight * 0.95));
        layer.current.style.opacity = reduced ? (amount < 1 ? 1 : 0) : 1 - amount;
        layer.current.style.visibility = amount >= 1 ? 'hidden' : 'visible';
        layer.current.inert = amount > 0.2;
        setVisible(amount < 1);
        onReveal(amount > 0.85);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [onReveal, reduced]);

  useEffect(() => {
    if (paused || reduced || !visible) return;
    let previous = performance.now();
    const timer = setInterval(() => {
      const now = performance.now();
      if (!document.hidden) elapsed.current = Math.min(DURATION, elapsed.current + now - previous);
      previous = now;
      setProgress(elapsed.current / DURATION);
    }, 50);
    return () => clearInterval(timer);
  }, [paused, reduced, visible]);

  const select = (index) => {
    elapsed.current = index * DURATION / portraits.length;
    setProgress(index / portraits.length);
    setPaused(true);
  };

  return <section className={`opening-sequence loading-hero ${paused || reduced ? 'is-paused' : ''}`} ref={layer} aria-label="Vijayrajkumar — Unfounded" onFocusCapture={(event) => { if (!event.target.closest('.loading-pause')) setPaused(true); }}>
    <div className="loading-art" aria-live="off">
      {portraits.map((portrait, index) => <div key={portrait.place} className={`loading-frame ${index === active ? 'is-active' : ''}`} aria-hidden={index !== active}>
        <img src={`/images/loading/${portrait.image}.webp`} alt={portrait.alt}  fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" />
      </div>)}
    </div>
    <div className="loading-wash" />
    <div className="loading-grain" />
    <div className="loading-topline"><span>AN OPEN WORLD PORTFOLIO</span><span>CHENNAI, INDIA &nbsp; / &nbsp; VOL. 01</span></div>
    <div className="loading-identity">
      <span className="loading-kicker">OPERATOR. BUILDER. EXPLORER.</span>
      <div className="loading-wordmark" aria-label="Vijayrajkumar"><span>vijay</span><span>rajkumar</span></div>
      <div className="loading-subtitle">unfounded</div>
      <div className="loading-meter" role="progressbar" aria-label="Opening photo sequence" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}><span style={{ transform: `scaleX(${progress})` }} /></div>
      <div className="loading-status"><span>{progress >= 1 ? 'WELCOME TO MY WORLD' : 'LOADING THE STORY'}</span><span>{String(Math.round(progress * 100)).padStart(2, '0')}%</span></div>
    </div>
    <div className="loading-caption"><span>0{active + 1} / {portraits[active].place}</span><p>{portraits[active].title}</p></div>
    <div className="loading-footer">
      <div className="loading-controls" aria-label="Photo sequence controls">
        {portraits.map((portrait, index) => <button key={portrait.place} aria-label={`Show photo ${index + 1}: ${portrait.place.toLowerCase()}`} aria-pressed={index === active} onClick={() => select(index)}>0{index + 1}</button>)}
        {!reduced && <button className="loading-pause" aria-label={progress >= 1 ? 'Replay photo sequence' : paused ? 'Play photo sequence' : 'Pause photo sequence'} onClick={() => { if (progress >= 1) { elapsed.current = 0; setProgress(0); } setPaused(progress >= 1 ? false : !paused); }}>{progress >= 1 ? 'REPLAY' : paused ? 'PLAY' : 'PAUSE'}</button>}
      </div>
      <button className="loading-enter" onClick={() => travelTo(0)}>ENTER THE DISTRICT <span aria-hidden="true">↗</span></button>
    </div>
  </section>;
}
