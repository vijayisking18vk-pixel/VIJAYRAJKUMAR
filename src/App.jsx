import { useEffect, useRef } from 'react';
import HalftoneReveal from './components/HalftoneReveal';

const FEATURED_LINKS = [
  {
    id: 'daas-media',
    href: 'https://www.daas.media',
    ariaLabel: 'Visit daas.media',
    videoSrc: '/videos/pin1.mp4',
    posterSrc: '/videos/pin1-poster.jpg',
    alignClass: 'link-row--left'
  },
  {
    id: 'chennai-rents',
    href: 'https://www.chennairents.in',
    ariaLabel: 'Visit ChennaiRENTS',
    videoSrc: '/videos/pin2.mp4',
    posterSrc: '/videos/pin2-poster.jpg',
    alignClass: 'link-row--right'
  }
];

export default function App() {
  const videoRefs = useRef([]);

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean);
    if (!videos.length) return undefined;

    const tryPlay = video => {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };

    const onCanPlay = event => {
      const video = event.currentTarget;
      if (video.paused) tryPlay(video);
    };

    videos.forEach(video => {
      video.addEventListener('canplay', onCanPlay);
      tryPlay(video);
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.paused) {
            tryPlay(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    videos.forEach(video => observer.observe(video));

    const resumeOnGesture = () => {
      videos.forEach(video => {
        if (video.paused) tryPlay(video);
      });
    };

    window.addEventListener('pointerdown', resumeOnGesture, { once: true, passive: true });
    window.addEventListener('touchstart', resumeOnGesture, { once: true, passive: true });

    return () => {
      observer.disconnect();
      videos.forEach(video => video.removeEventListener('canplay', onCanPlay));
      window.removeEventListener('pointerdown', resumeOnGesture);
      window.removeEventListener('touchstart', resumeOnGesture);
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
        <div className="links-stage">
          {FEATURED_LINKS.map((item, index) => (
            <div key={item.id} className={`link-row ${item.alignClass}`}>
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
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
