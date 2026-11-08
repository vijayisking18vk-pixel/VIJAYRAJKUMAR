import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let targetTime = 0;
    let isSeeking = false;
    let rafId = null;

    const handleLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);

      if (video.duration) {
        targetTime = progress * video.duration;
      }
    };

    const handleSeeked = () => {
      isSeeking = false;
    };
    video.addEventListener("seeked", handleSeeked);

    const updateVideoFrame = () => {
      if (video && video.duration && !isSeeking) {
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.03) {
          isSeeking = true;
          video.currentTime += diff * 0.25;
        }
      }
      rafId = requestAnimationFrame(updateVideoFrame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(updateVideoFrame);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  // Compute smooth motion values from scroll progress (0 to 1)
  const videoTranslateY = (scrollProgress - 0.5) * -40; // moves with scroll
  const videoScale = 1 + scrollProgress * 0.04; // subtle scale breathing with scroll

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "260vh",
        backgroundColor: "#FFFFFF",
        color: "#1A1B1F",
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
        fontWeight: "700",
      }}
    >
      {/* Sticky Hero Viewport */}
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(16px, 3.5vh, 32px) clamp(16px, 4vw, 32px)",
          boxSizing: "border-box",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Top Header */}
        <header style={{ flexShrink: 0, zIndex: 10 }}>
          <h1
            style={{
              fontSize: "clamp(26px, 4.2vw, 46px)",
              fontWeight: "700",
              letterSpacing: "0.04em",
              margin: "0 0 6px 0",
              lineHeight: "1.15",
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
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
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
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
          <div
            style={{
              position: "relative",
              // Exact 720x1280 aspect ratio (0.5625 = 9/16)
              aspectRatio: "720 / 1280",
              height: "100%",
              maxHeight: "clamp(280px, 58vh, 620px)",
              maxWidth: "min(90vw, 380px)",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 18px 45px rgba(26, 27, 31, 0.12)",
              backgroundColor: "#1A1B1F",
              transform: `translate3d(0, ${videoTranslateY}px, 0) scale(${videoScale})`,
              transition: "transform 0.12s ease-out",
              willChange: "transform",
            }}
          >
            <video
              ref={videoRef}
              src="/videos/hero-scroll.mp4"
              poster="/videos/hero-scroll-poster.jpg"
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
                fontFamily: "Georgia, 'Times New Roman', Times, serif",
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
                fontFamily: "Georgia, 'Times New Roman', Times, serif",
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
