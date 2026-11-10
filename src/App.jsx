import { useEffect, useRef, useState } from 'react';
import HalftoneReveal from './components/HalftoneReveal';

const LOCK_DURATION_MS = 5000;
const BLOCKED_SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
  'Spacebar'
]);

const FEATURED_LINKS = [
  {
    id: 'daas-media',
    href: 'https://www.daas.media',
    ariaLabel: 'Visit daas.media',
    eyebrow: 'daas.media',
    title: 'Digital marketing built for distribution.',
    description:
      'DaaS.media builds digital campaigns, content, creators, and real-world distribution systems for businesses in Chennai.',
    videoSrc: '/videos/pin1.mp4',
    posterSrc: '/videos/pin1-poster.jpg',
    alignClass: 'stage-inner--left',
    unlockHint: 'Scroll unlocked — continue down'
  },
  {
    id: 'chennai-rents',
    href: 'https://www.chennairents.in',
    ariaLabel: 'Visit ChennaiRENTS',
    eyebrow: 'chennairents.in',
    title: 'Locality-first rental guide for Chennai.',
    description:
      'Explore real rental rates, water supply scores, flood history, and direct-owner homes across Chennai with zero middleman fees.',
    videoSrc: '/videos/pin2.mp4',
    posterSrc: '/videos/pin2-poster.jpg',
    alignClass: 'stage-inner--right',
    unlockHint: 'Free to scroll'
  }
];

export default function App() {
  const stageRefs = useRef([]);
  const videoRefs = useRef([]);
  const triggeredRef = useRef(FEATURED_LINKS.map(() => false));
  const lockedRef = useRef(false);
  const lockYRef = useRef(0);
  const lockTimerRef = useRef(0);
  const lockRafRef = useRef(0);

  const [activeLockIndex, setActiveLockIndex] = useState(null);
  const [lockProgress, setLockProgress] = useState(0);
  const [unlockedStages, setUnlockedStages] = useState(() => FEATURED_LINKS.map(() => false));

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean);
    const stages = stageRefs.current.filter(Boolean);
    if (!videos.length || !stages.length) return undefined;

    const playVideo = (video, fromStart = false) => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      if (fromStart) {
        try {
          if (video.readyState >= 1) {
            video.currentTime = 0;
          }
        } catch {
          // Ignore seek errors while metadata is still loading
        }
      }
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };

    const onCanPlay = event => {
      const video = event.currentTarget;
      if (video.paused) playVideo(video);
    };

    videos.forEach(video => {
      video.addEventListener('canplay', onCanPlay);
      playVideo(video);
    });

    const visibilityObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.paused) {
            playVideo(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    videos.forEach(video => visibilityObserver.observe(video));

    const resumeOnGesture = () => {
      videos.forEach(video => {
        if (video.paused) playVideo(video);
      });
    };
    window.addEventListener('pointerdown', resumeOnGesture, { passive: true });
    window.addEventListener('touchstart', resumeOnGesture, { passive: true });

    const releaseLock = stageIndex => {
      if (!lockedRef.current) return;
      lockedRef.current = false;
      clearTimeout(lockTimerRef.current);
      cancelAnimationFrame(lockRafRef.current);
      document.documentElement.classList.remove('is-scroll-locked');
      setActiveLockIndex(null);
      setLockProgress(1);
      setUnlockedStages(prev => prev.map((done, i) => (i === stageIndex ? true : done)));
    };

    const engageLock = stageIndex => {
      const stageEl = stageRefs.current[stageIndex];
      if (!stageEl || triggeredRef.current[stageIndex] || lockedRef.current) return;

      triggeredRef.current[stageIndex] = true;
      lockedRef.current = true;

      const stageRect = stageEl.getBoundingClientRect();
      const rawTargetY = Math.max(
        0,
        window.scrollY + stageRect.top - Math.max(0, (window.innerHeight - stageRect.height) / 2)
      );
      const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const targetScrollY = Math.min(maxScrollY, Math.round(rawTargetY));

      lockYRef.current = targetScrollY;
      document.documentElement.classList.add('is-scroll-locked');
      window.scrollTo({ top: targetScrollY, behavior: 'instant' });

      playVideo(videoRefs.current[stageIndex], true);

      setActiveLockIndex(stageIndex);
      setLockProgress(0);

      const startedAt = performance.now();
      const tick = now => {
        if (!lockedRef.current) return;
        const elapsed = now - startedAt;
        const nextProgress = Math.min(1, elapsed / LOCK_DURATION_MS);
        setLockProgress(nextProgress);
        if (elapsed >= LOCK_DURATION_MS) {
          releaseLock(stageIndex);
          return;
        }
        lockRafRef.current = requestAnimationFrame(tick);
      };

      lockRafRef.current = requestAnimationFrame(tick);
      lockTimerRef.current = window.setTimeout(() => {
        releaseLock(stageIndex);
      }, LOCK_DURATION_MS + 32);
    };

    const evaluateStages = () => {
      if (lockedRef.current) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (let i = 0; i < FEATURED_LINKS.length; i++) {
        if (triggeredRef.current[i]) continue;
        const el = stageRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.42 && rect.bottom >= vh * 0.45) {
          engageLock(i);
          break;
        }
      }
    };

    const preventWheel = event => {
      if (lockedRef.current) {
        event.preventDefault();
      }
    };

    const preventTouchMove = event => {
      if (lockedRef.current && event.cancelable) {
        event.preventDefault();
      }
    };

    const preventScrollKeys = event => {
      if (!lockedRef.current) return;
      const tag = event.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || event.target?.isContentEditable) return;
      if (BLOCKED_SCROLL_KEYS.has(event.key)) {
        event.preventDefault();
      }
    };

    const handleScroll = () => {
      if (lockedRef.current) {
        if (Math.abs(window.scrollY - lockYRef.current) > 1) {
          window.scrollTo(0, lockYRef.current);
        }
        return;
      }
      evaluateStages();
    };

    window.addEventListener('wheel', preventWheel, { passive: false });
    window.addEventListener('touchmove', preventTouchMove, { passive: false });
    window.addEventListener('keydown', preventScrollKeys, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', evaluateStages, { passive: true });

    const initialCheckRaf = requestAnimationFrame(evaluateStages);

    return () => {
      lockedRef.current = false;
      clearTimeout(lockTimerRef.current);
      cancelAnimationFrame(lockRafRef.current);
      cancelAnimationFrame(initialCheckRaf);
      document.documentElement.classList.remove('is-scroll-locked');

      visibilityObserver.disconnect();
      videos.forEach(video => video.removeEventListener('canplay', onCanPlay));
      window.removeEventListener('pointerdown', resumeOnGesture);
      window.removeEventListener('touchstart', resumeOnGesture);
      window.removeEventListener('wheel', preventWheel);
      window.removeEventListener('touchmove', preventTouchMove);
      window.removeEventListener('keydown', preventScrollKeys);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', evaluateStages);
    };
  }, []);

  return (
    <main>
      <section className="hero-section" aria-label="Hero">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <HalftoneReveal
            src="/images/hero-portrait.png"
            mode="mono"
            shape="dot"
            cellSize={6}
            angle={45}
            inkColor="#f4f1ea"
            paperColor="#120f17"
            revealRadius={160}
            dotScale={1}
            contrast={1.1}
            brightness={0}
            invert={false}
            roughness={0}
            misregistration={0}
            fit="contain"
            accentColor="#ff4f2a"
            softness={0.6}
            linger={1.2}
            reverse={false}
            wander={false}
            clickBurst
            intro
          />
        </div>
      </section>

      <section className="links-section" aria-label="Featured Links">
        {FEATURED_LINKS.map((item, index) => {
          const isLocked = activeLockIndex === index;
          const isUnlocked = unlockedStages[index];
          const remainingSeconds = Math.max(1, Math.ceil(((1 - lockProgress) * LOCK_DURATION_MS) / 1000));

          return (
            <div
              key={item.id}
              ref={el => {
                stageRefs.current[index] = el;
              }}
              className="stage-band"
            >
              <div className={`stage-inner ${item.alignClass}`}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  className="video-link-card"
                >
                  <video
                    ref={el => {
                      videoRefs.current[index] = el;
                    }}
                    src={item.videoSrc}
                    poster={item.posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="video-link-media"
                  />
                </a>

                <div className="stage-copy">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stage-eyebrow"
                  >
                    {item.eyebrow} ↗
                  </a>

                  <h2 className="stage-title">{item.title}</h2>
                  <p className="stage-description">{item.description}</p>

                  <div className="stage-status" aria-live="polite">
                    {isLocked ? (
                      <>
                        <div className="stage-progress-track" aria-hidden="true">
                          <div
                            className="stage-progress-fill"
                            style={{ transform: `scaleX(${lockProgress})` }}
                          />
                        </div>
                        <span className="stage-status-label">
                          Unlocking scroll in {remainingSeconds}s
                        </span>
                      </>
                    ) : isUnlocked ? (
                      <span className="stage-status-label stage-status-label--unlocked">
                        {item.unlockHint}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
