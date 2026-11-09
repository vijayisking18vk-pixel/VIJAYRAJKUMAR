import React, { useEffect, useRef, useState } from "react";

// Source video fades in from pure black (0.0s–0.4s); 1.4s is the full-brightness opening frame
const HERO_VIDEO_START_TIME = 1.4;

function computeTargetTime(progress, duration) {
  if (!duration || Number.isNaN(duration)) return HERO_VIDEO_START_TIME;
  const start = Math.min(HERO_VIDEO_START_TIME, Math.max(0, duration - 0.5));
  const end = Math.max(start, duration - 0.04);
  return start + progress * (end - start);
}

export default function App() {
  const heroRef = useRef(null);
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

    const getProgress = () => {
      if (!heroRef.current) return 0;
      const rect = heroRef.current.getBoundingClientRect();
      const totalScrollable = heroRef.current.offsetHeight - window.innerHeight;
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
        if (Math.abs(video.currentTime - initialTarget) <= 0.1) {
          markFrameReady();
        }
      }
    };

    video.addEventListener("loadedmetadata", initInitialFrame);
    video.addEventListener("canplay", handleCanPlay);
    if (video.readyState >= 1) {
      initInitialFrame();
    }

    // Mobile browser (iOS Safari / Android Chrome) media pipeline unlock on first gesture
    const unlockVideo = () => {
      if (unlockedRef.current || !video) return;
      unlockedRef.current = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
            if (video.duration && !Number.isNaN(video.duration)) {
              video.currentTime = computeTargetTime(progressRef.current, video.duration);
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
        video.readyState >= 2 &&
        !video.seeking
      ) {
        if (!initialSeeked && video.currentTime >= 0.8) {
          markFrameReady();
        }
        const target = computeTargetTime(progressRef.current, video.duration);
        const diff = target - video.currentTime;
        if (Math.abs(diff) > 0.018) {
          const step = Math.abs(diff) < 0.05 ? diff : diff * 0.35;
          video.currentTime = video.currentTime + step;
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

  const cueOpacity = Math.max(0, 1 - scrollProgress * 6);

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        color: "#1A1B1F",
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
        fontWeight: "700",
      }}
    >
      {/* Hero Scroll Animation Section (Fits full mobile screen 100%, 9:16 exact ratio on desktop) */}
      <div ref={heroRef} className="hero-runway">
        <section className="hero-sticky" aria-label="Hero Video">
          <div className="hero-video-frame">
            <video
              ref={videoRef}
              className="hero-video"
              src="/videos/hero-scroll.mp4"
              poster="/videos/hero-scroll-poster.jpg"
              muted
              playsInline
              preload="auto"
              style={{
                pointerEvents: "none",
              }}
            />

            {/* Poster veil prevents any black flash until the first decoded frame at t=1.4s is ready */}
            <img
              src="/videos/hero-scroll-poster.jpg"
              alt=""
              aria-hidden="true"
              className="hero-video"
              style={{
                position: "absolute",
                inset: 0,
                opacity: videoReady ? 0 : 1,
                transition: "opacity 0.25s ease",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />

            {/* Minimal Scroll Indicator */}
            {cueOpacity > 0.02 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "max(24px, env(safe-area-inset-bottom, 24px))",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.92)",
                  color: "#1A1B1F",
                  fontFamily: "Georgia, 'Times New Roman', Times, serif",
                  fontWeight: "700",
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  opacity: cueOpacity,
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
                  zIndex: 10,
                }}
              >
                Scroll ↓
              </div>
            )}

            {/* Scrub Progress Indicator */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "3px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${scrollProgress * 100}%`,
                  backgroundColor: "#FFFFFF",
                  transition: "width 0.08s linear",
                }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Identity & Ventures Section */}
      <main
        style={{
          minHeight: "100dvh",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          textAlign: "center",
          fontFamily: "Georgia, 'Times New Roman', Times, serif",
          color: "#1A1B1F",
          fontWeight: "700",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(30px, 5vw, 52px)",
            fontWeight: "700",
            letterSpacing: "0.04em",
            margin: "0 0 12px 0",
            lineHeight: "1.2",
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            color: "#1A1B1F",
          }}
        >
          R Vijayrajkumar
        </h1>

        <p
          style={{
            fontSize: "clamp(13px, 2vw, 18px)",
            fontWeight: "700",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            margin: "0 0 48px 0",
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            color: "#1A1B1F",
          }}
        >
          Chief Executive Officer
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <a
            href="https://www.daas.media"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              fontWeight: "700",
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
              color: "#1A1B1F",
              textDecoration: "none",
              letterSpacing: "0.02em",
              borderBottom: "2px solid #1A1B1F",
              paddingBottom: "3px",
            }}
          >
            www.daas.media
          </a>
          <a
            href="https://www.chennairents.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              fontWeight: "700",
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
              color: "#1A1B1F",
              textDecoration: "none",
              letterSpacing: "0.02em",
              borderBottom: "2px solid #1A1B1F",
              paddingBottom: "3px",
            }}
          >
            www.chennairents.in
          </a>
        </div>
      </main>
    </div>
  );
}
