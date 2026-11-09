import React, { useEffect, useRef, useState } from "react";

// Source video fades in from pure black (0.0s–0.4s); 1.4s matches the bright opening frame
const HERO_VIDEO_START_TIME = 1.4;

export default function App() {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let started = false;
    let ended = false;
    let pendingSeekHandler = null;

    video.muted = true;
    video.loop = false;

    const removeGestureListeners = () => {
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };

    const handlePlaying = () => {
      if (!cancelled) {
        setVideoReady(true);
      }
    };

    const startPlayback = () => {
      if (cancelled || started || ended) return;
      started = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!cancelled) setVideoReady(true);
          })
          .catch(() => {
            started = false;
          });
      }
    };

    function handleFirstGesture() {
      if (cancelled || ended) {
        removeGestureListeners();
        return;
      }
      if (video.paused) {
        started = false;
        startPlayback();
      }
      removeGestureListeners();
    }

    const handleEnded = () => {
      ended = true;
      video.pause();
      removeGestureListeners();
    };

    const initAndPlay = () => {
      if (cancelled || ended) return;
      const duration = video.duration;
      const start =
        duration && !Number.isNaN(duration)
          ? Math.min(HERO_VIDEO_START_TIME, Math.max(0, duration - 0.5))
          : HERO_VIDEO_START_TIME;

      if (Math.abs(video.currentTime - start) > 0.05) {
        pendingSeekHandler = () => {
          pendingSeekHandler = null;
          if (!cancelled) startPlayback();
        };
        video.addEventListener("seeked", pendingSeekHandler, { once: true });
        video.currentTime = start;
      } else {
        startPlayback();
      }
    };

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("loadedmetadata", initAndPlay, { once: true });
    video.addEventListener("ended", handleEnded, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { passive: true });
    window.addEventListener("pointerdown", handleFirstGesture, { passive: true });
    window.addEventListener("keydown", handleFirstGesture);

    if (video.readyState >= 1) {
      initAndPlay();
    }

    return () => {
      cancelled = true;
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("loadedmetadata", initAndPlay);
      video.removeEventListener("ended", handleEnded);
      if (pendingSeekHandler) {
        video.removeEventListener("seeked", pendingSeekHandler);
      }
      removeGestureListeners();
    };
  }, []);

  return (
    <main className="hero-viewport" aria-label="Hero Video Section">
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

      {/* Center: Plays once automatically on arrival in exact 720:1280 (9:16) aspect ratio */}
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

          {/* Poster veil prevents initial black-frame flash until seek to t=1.4s completes */}
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
              transition: "opacity 0.2s ease",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        </div>
      </div>

      {/* Bottom Links */}
      <footer
        style={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
      </footer>
    </main>
  );
}
