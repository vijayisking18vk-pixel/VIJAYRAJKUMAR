import React, { useEffect, useRef, useState } from "react";

// Source video fades in from pure black (0.0s–0.4s); 1.4s matches the bright opening frame
const HERO_VIDEO_START_TIME = 1.4;

function computeTargetTime(progress, duration) {
  if (!duration || Number.isNaN(duration)) return HERO_VIDEO_START_TIME;
  const start = Math.min(HERO_VIDEO_START_TIME, Math.max(0, duration - 0.5));
  const end = Math.max(start, duration - 0.04);
  return start + progress * (end - start);
}

export default function App() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const unlockedRef = useRef(false);
  const progressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = null;
    let initialSeeked = false;
    let virtualTime = HERO_VIDEO_START_TIME;

    const getProgress = () => {
      if (!containerRef.current) return 0;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return 0;
      return Math.max(0, Math.min(1, -rect.top / totalScrollable));
    };

    const markFrameReady = () => {
      if (initialSeeked) return;
      initialSeeked = true;
      requestAnimationFrame(() => setVideoReady(true));
    };

    const handleSeekedOnce = () => {
      if (video.readyState >= 2) {
        markFrameReady();
      }
    };

    const initInitialFrame = () => {
      video.pause();
      const p = getProgress();
      progressRef.current = p;
      const initialTarget = computeTargetTime(p, video.duration);
      virtualTime = initialTarget;
      if (Math.abs(video.currentTime - initialTarget) > 0.05) {
        video.addEventListener("seeked", handleSeekedOnce, { once: true });
        video.currentTime = initialTarget;
      } else if (video.readyState >= 2) {
        markFrameReady();
      }
    };

    const handleCanPlay = () => {
      if (!initialSeeked) {
        const initialTarget = computeTargetTime(progressRef.current, video.duration);
        if (Math.abs(video.currentTime - initialTarget) <= 0.15) {
          markFrameReady();
        }
      }
    };

    video.addEventListener("loadedmetadata", initInitialFrame);
    video.addEventListener("canplay", handleCanPlay);
    if (video.readyState >= 1) {
      initInitialFrame();
    }

    // Unlock media pipeline on first touch/pointer gesture for iOS Safari & Android Chrome
    const unlockVideo = () => {
      if (unlockedRef.current || !video) return;
      unlockedRef.current = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
            if (video.duration && !Number.isNaN(video.duration)) {
              const target = computeTargetTime(progressRef.current, video.duration);
              virtualTime = target;
              video.currentTime = target;
            }
          })
          .catch(() => {
            unlockedRef.current = false;
          });
      }
    };

    window.addEventListener("touchstart", unlockVideo, { passive: true, once: true });
    window.addEventListener("pointerdown", unlockVideo, { passive: true, once: true });

    const onScroll = () => {
      const progress = getProgress();
      progressRef.current = progress;
      setScrollProgress(progress);
    };

    const updateVideoFrame = () => {
      if (
        video &&
        video.duration &&
        !Number.isNaN(video.duration) &&
        video.readyState >= 2
      ) {
        if (!initialSeeked && video.currentTime >= 1.0) {
          markFrameReady();
        }
        const target = computeTargetTime(progressRef.current, video.duration);
        virtualTime += (target - virtualTime) * 0.25;
        if (!video.seeking && Math.abs(virtualTime - video.currentTime) > 0.025) {
          video.currentTime = virtualTime;
        }
      }
      rafId = requestAnimationFrame(updateVideoFrame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    rafId = requestAnimationFrame(updateVideoFrame);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("touchstart", unlockVideo);
      window.removeEventListener("pointerdown", unlockVideo);
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", initInitialFrame);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("seeked", handleSeekedOnce);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "260vh",
        backgroundColor: "#FFFFFF",
        color: "#1A1B1F",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: "700",
      }}
    >
      {/* Fixed Hero Viewport — stays completely static while scrolling scrubs video */}
      <section className="hero-sticky-viewport" aria-label="Hero Video Section">
        {/* Top Header */}
        <header style={{ flexShrink: 0, zIndex: 10 }}>
          <h1
            style={{
              fontSize: "clamp(26px, 4.2vw, 46px)",
              fontWeight: "700",
              letterSpacing: "0.04em",
              margin: "0 0 6px 0",
              lineHeight: "1.15",
              fontFamily: "'Poppins', sans-serif",
              color: "#1A1B1F",
            }}
          >
            R Vijayrajkumar
          </h1>

          <p
            style={{
              fontSize: "clamp(12px, 1.8vw, 16px)",
              fontWeight: "700",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: "0",
              fontFamily: "'Poppins', sans-serif",
              color: "#1A1B1F",
            }}
          >
            Chief Executive Officer
          </p>
        </header>

        {/* Center: Scroll-Driven Video in Exact 720:1280 (9:16) Aspect Ratio */}
        <div
          style={{
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: 0,
            padding: "8px 0",
            zIndex: 5,
          }}
        >
          <div className="hero-video-frame">
            <video
              ref={videoRef}
              src="/videos/hero-scroll.mp4?v=617837642707231488"
              poster="/videos/hero-scroll-poster.jpg?v=617837642707231488"
              muted
              playsInline
              preload="auto"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                aspectRatio: "720 / 1280",
                pointerEvents: "none",
              }}
            />

            {/* Poster veil prevents initial black-frame flash until first decoded frame at t=1.4s is ready */}
            <img
              src="/videos/hero-scroll-poster.jpg?v=617837642707231488"
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                aspectRatio: "720 / 1280",
                opacity: videoReady ? 0 : 1,
                transition: "opacity 0.25s ease",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />

            {/* Subtle scroll indicator line at base of video */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "4px",
                width: `${scrollProgress * 100}%`,
                backgroundColor: "#1A1B1F",
                transition: "width 0.1s linear",
                zIndex: 5,
              }}
            />
          </div>
        </div>

        {/* Bottom: Links & Coordinates */}
        <footer
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(12px, 3vw, 24px)",
            }}
          >
            <a
              href="https://www.daas.media"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "clamp(13px, 1.6vw, 16px)",
                fontWeight: "700",
                fontFamily: "'Poppins', sans-serif",
                color: "#1A1B1F",
                textDecoration: "none",
                letterSpacing: "0.02em",
                borderBottom: "1px solid #1A1B1F",
                paddingBottom: "2px",
              }}
            >
              www.daas.media
            </a>
            <a
              href="https://www.chennairents.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "clamp(13px, 1.6vw, 16px)",
                fontWeight: "700",
                fontFamily: "'Poppins', sans-serif",
                color: "#1A1B1F",
                textDecoration: "none",
                letterSpacing: "0.02em",
                borderBottom: "1px solid #1A1B1F",
                paddingBottom: "2px",
              }}
            >
              www.chennairents.in
            </a>
          </div>

          <div
            style={{
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#1A1B1F",
              opacity: 0.65,
              marginTop: "2px",
            }}
          >
            Scroll to scrub video
          </div>
        </footer>
      </section>
    </div>
  );
}
