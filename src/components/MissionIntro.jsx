import React, { useEffect, useRef } from 'react';
import PlayableDistrict3D from './PlayableDistrict3D';

const missions = {
  about: { index: 1, code: '01 / PLAYER PROFILE', title: 'The Safehouse', subtitle: 'About Vijayrajkumar', summary: 'Every operator has an origin story. This is mine.', tag: 'BACKGROUND · STRATEGY · AMBITION' },
  ventures: { index: 2, code: '02 / ACTIVE OPERATIONS', title: 'The Garage', subtitle: 'Ventures & case studies', summary: 'Ideas leave the drawing board. Real systems hit the street.', tag: 'UNFOUNDED · ZIGGERS · LOOPMEMORY' },
  events: { index: 3, code: '03 / CITY CONNECTIONS', title: 'Out in the City', subtitle: 'Events & appearances', summary: 'The people, places, and conversations that move things forward.', tag: 'SUMMITS · HACKATHONS · COMMUNITY' },
  writing: { index: 4, code: '04 / FIELD INTELLIGENCE', title: 'The Archives', subtitle: 'Writing & research', summary: 'Notes from the field. Systems, strategy, and things worth questioning.', tag: 'ESSAYS · RESEARCH · FIELD NOTES' },
  contact: { index: 5, code: '05 / DIRECT LINE', title: 'Make the Call', subtitle: 'Contact & collaboration', summary: 'Got something worth building? Let’s put a plan in motion.', tag: 'CHENNAI, INDIA · OPEN TO COLLABORATION' },
  ziggers: { index: 2, code: '02-A / VENTURE DOSSIER', title: 'Ziggers', subtitle: 'The marketplace operation', summary: 'Verified people. Real shifts. A better way to connect work and workers.', tag: 'GIG STAFFING · MARKETPLACE · OPERATIONS' },
  loopmemory: { index: 2, code: '02-B / VENTURE DOSSIER', title: 'LoopMemory', subtitle: 'The memory operation', summary: 'Persistent context for the next generation of intelligent systems.', tag: 'AI MEMORY · CONTEXT · INFRASTRUCTURE' },
  unknown: { index: 0, code: '404 / OFF THE MAP', title: 'Wrong Turn', subtitle: 'This street does not exist', summary: 'Head back to the district. There’s more to explore.', tag: 'RETURN TO THE MAIN ROAD' },
};

export default function MissionIntro({ path }) {
  const name = path.includes('ziggers') ? 'ziggers' : path.includes('loopmemory') ? 'loopmemory' : path.split('/').filter(Boolean)[0];
  const mission = missions[name] || missions.unknown;
  const hero = useRef();
  useEffect(() => {
    const element = hero.current;
    const move = (event) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      element.style.setProperty('--mission-tilt', `${(event.clientX / window.innerWidth - .5) * 1.5}deg`);
    };
    element.addEventListener('pointermove', move);
    return () => element.removeEventListener('pointermove', move);
  }, []);
  return <section ref={hero} className={`mission-intro ${mission.index % 2 === 0 ? 'mission-right' : ''}`} aria-label={mission.subtitle}>
    <div className="mission-world"><PlayableDistrict3D fixedProgress={mission.index} /></div>
    <div className="mission-vignette" />
    <div className="mission-intro-copy">
      <a className="back-to-district" href="/">← BACK TO THE DISTRICT</a>
      <span className="mission-code"><i /> {mission.code}</span>
      <h1>{mission.title}</h1>
      <h2>{mission.subtitle}</h2>
      <p>{mission.summary}</p>
      <a className="mission-enter" href="#mission-content">OPEN THE DOSSIER <span>↓</span></a>
    </div>
    <div className="mission-intro-bottom"><span>{mission.tag}</span><span aria-hidden="true">★★★★★</span></div>
  </section>;
}
