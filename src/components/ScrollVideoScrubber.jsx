import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * ============================================================================
 * ScrollVideoScrubber Component
 * ============================================================================
 * 
 * A self-contained production-grade React component that binds video playback
 * timeline directly to the user's vertical scroll position.
 * 
 * CORE PRINCIPLES:
 * 1. video.play() is NEVER called. The scroll position is the single source of truth:
 *      scroll position -> scroll offset -> frame index -> timestamp -> video.currentTime
 * 2. Reverse scrolling scrubs in reverse; forward scrolling scrubs forward.
 * 3. Frame accuracy: uses requestVideoFrameCallback when available to verify frame presentation.
 * 4. Performance: throttled with requestAnimationFrame, preventing redundant seeks.
 * 5. Handles codec realities: seeks converge to the latest target frame even during rapid wheel scrolling.
 */

// ----------------------------------------------------------------------------
// CONFIGURATION CONSTANTS
// ----------------------------------------------------------------------------

/**
 * Path to the video file.
 * In Vite/React, files placed in `public/` are served from the root URL.
 * e.g., `public/uploads/video.mp4` -> `/uploads/video.mp4`
 */
const VIDEO_SRC = "/uploads/video.mp4";

/**
 * Fallback Frame Rate (FPS)
 * 
 * WHY A FALLBACK IS MANDATORY:
 * The HTMLVideoElement specification does NOT universally expose the video's
 * native encoded frame rate across all browsers. While WebCodecs or browser-specific
 * experimental APIs exist in limited environments, standard HTML5 video elements
 * only expose `duration`, `videoWidth`, and `videoHeight`.
 * Therefore, a sensible fallback (typically 24, 25, 29.97, or 30 FPS) is required
 * to prevent division by zero or invalid calculations.
 */
const FALLBACK_FPS = 30;

/**
 * Scroll Sensitivity (PIXELS_PER_FRAME)
 * 
 * HOW SCROLL DISTANCE IS CALCULATED:
 *   scrollDistance = (totalFrames - 1) * PIXELS_PER_FRAME
 * 
 * TUNING GUIDE:
 * - Smaller value (e.g. 2 px/frame): Video advances quickly with short scroll distance.
 * - Moderate value (e.g. 4 px/frame): Balanced, intuitive scroll feel for mouse wheels and trackpads.
 * - Larger value (e.g. 8-12 px/frame): Slow-motion, precision scrutiny of every individual frame.
 * 
 * Alternative mental model:
 *   framesPerPixel = 1 / PIXELS_PER_FRAME (e.g., 0.25 frames per scrolled pixel).
 */
const PIXELS_PER_FRAME = 4;

/**
 * Development Debug Overlay Toggle
 * Set to `true` to visualize real-time FPS, frame index, current timestamp, and scroll offset.
 */
const SHOW_DEBUG = false;

export default function ScrollVideoScrubber({
  videoSrc = VIDEO_SRC,
  pixelsPerFrame = PIXELS_PER_FRAME,
  fallbackFps = FALLBACK_FPS,
  showDebug = SHOW_DEBUG,
  className = "",
}) {
  // DOM References
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Video Metadata & Scrubber State (only state that triggers UI updates)
  const [metadataLoaded, setMetadataLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [fps, setFps] = useState(fallbackFps);
  const [totalFrames, setTotalFrames] = useState(1);
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });

  // Debug State (only updated when showDebug is enabled)
  const [debugInfo, setDebugInfo] = useState({
    currentFrame: 0,
    currentTime: 0,
    scrollOffset: 0,
    totalScrollDistance: 0,
    isSeeking: false,
  });

  // Mutable animation and synchronization refs (prevents unnecessary React re-renders)
  const isSeekingRef = useRef(false);
  const targetTimeRef = useRef(0);
  const pendingSeekTimeRef = useRef(null);
  const lastTargetFrameRef = useRef(-1);
  const lastRenderedFrameRef = useRef(-1);
  const rafIdRef = useRef(null);
  const isTickingRef = useRef(false);
  const isUnmountedRef = useRef(false);

  // --------------------------------------------------------------------------
  // 1. NATIVE FPS DETECTION STRATEGY
  // --------------------------------------------------------------------------
  /**
   * Attempts to detect video framerate from browser-supported APIs,
   * otherwise falls back to the configured fallbackFps safely.
   */
  const detectFps = useCallback((videoElement) => {
    // Check if video tracks expose framerate information (e.g. Chrome/Firefox media stream tracks)
    try {
      if (videoElement.captureStream) {
        const stream = videoElement.captureStream();
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
          const settings = videoTrack.getSettings ? videoTrack.getSettings() : null;
          if (settings && typeof settings.frameRate === 'number' && settings.frameRate > 0) {
            return Math.round(settings.frameRate);
          }
        }
      }
    } catch {
      // CaptureStream may be restricted by CORS or browser policy; continue to fallback
    }

    // HTMLVideoElement does not expose a standard .fps or .frameRate property
    return fallbackFps;
  }, [fallbackFps]);

  // --------------------------------------------------------------------------
  // 2. VIDEO METADATA INITIALIZATION
  // --------------------------------------------------------------------------
  useEffect(() => {
    isUnmountedRef.current = false;
    const video = videoRef.current;
    if (!video) return;

    // Reset states
    setMetadataLoaded(false);
    setError(null);
    lastTargetFrameRef.current = -1;
    lastRenderedFrameRef.current = -1;

    const handleLoadedMetadata = () => {
      if (isUnmountedRef.current) return;

      const duration = video.duration;
      const width = video.videoWidth;
      const height = video.videoHeight;

      // Validate duration
      if (!duration || isNaN(duration) || duration <= 0) {
        setError("Invalid video duration or video failed to parse.");
        return;
      }

      // Determine FPS
      const detectedFps = detectFps(video);
      const safeFps = (detectedFps && detectedFps > 0) ? detectedFps : fallbackFps;

      /**
       * TOTAL FRAME CALCULATION:
       *   totalFrames = Math.max(1, Math.ceil(duration * fps))
       * Ensures valid frame count >= 1. Frame indices span [0 ... totalFrames - 1].
       */
      const calculatedTotalFrames = Math.max(1, Math.ceil(duration * safeFps));

      setFps(safeFps);
      setTotalFrames(calculatedTotalFrames);
      setVideoDimensions({ width, height });
      setMetadataLoaded(true);

      // Force video to initial frame 0 (timestamp 0.0) without autoplaying
      video.currentTime = 0;
    };

    const handleError = (e) => {
      if (isUnmountedRef.current) return;
      console.error("Video loading error:", e);
      setError("Failed to load video. Verify file path and network availability.");
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("error", handleError);

    // If metadata is already cached and loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
    };
  }, [videoSrc, detectFps, fallbackFps]);

  // --------------------------------------------------------------------------
  // 3. FRAME-ACCURATE SEEKING ENGINE & RACE-CONDITION DISPATCHER
  // --------------------------------------------------------------------------
  /**
   * Performs the seek operation safely.
   * If a seek is already in-flight, queues the latest timestamp into `pendingSeekTimeRef`.
   * When the current seek completes, immediately dispatches the queued timestamp.
   * This guarantees that fast scrolling never drops the user's latest target position.
   */
  const executeSeek = useCallback((timestamp) => {
    const video = videoRef.current;
    if (!video || isUnmountedRef.current) return;

    // If video is currently seeking, queue the latest target time and exit
    if (video.seeking || isSeekingRef.current) {
      pendingSeekTimeRef.current = timestamp;
      return;
    }

    isSeekingRef.current = true;
    targetTimeRef.current = timestamp;

    // Feature detection: fastSeek vs currentTime
    // Note: fastSeek prioritizes speed over keyframe precision.
    // Standard currentTime is preferred for exact frame scrubs.
    try {
      video.currentTime = timestamp;
    } catch (err) {
      console.warn("video.currentTime seek failed:", err);
      isSeekingRef.current = false;
    }
  }, []);

  // Set up seek event listeners to drain queued seeks
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeked = () => {
      if (isUnmountedRef.current) return;
      isSeekingRef.current = false;

      // Track presentation through requestVideoFrameCallback where supported
      if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
        try {
          video.requestVideoFrameCallback(() => {
            if (!isUnmountedRef.current && showDebug) {
              setDebugInfo((prev) => ({ ...prev, isSeeking: false }));
            }
          });
        } catch {
          // Fallback if rVFC throws
        }
      }

      // If a newer seek target was requested while seeking was active, execute it now
      if (pendingSeekTimeRef.current !== null) {
        const nextTime = pendingSeekTimeRef.current;
        pendingSeekTimeRef.current = null;
        executeSeek(nextTime);
      }
    };

    video.addEventListener("seeked", handleSeeked);

    return () => {
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [executeSeek, showDebug]);

  // --------------------------------------------------------------------------
  // 4. SCROLL-TO-FRAME CONVERSION LOOP (requestAnimationFrame)
  // --------------------------------------------------------------------------
  const updateVideoFromScroll = useCallback(() => {
    if (isUnmountedRef.current) return;

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || !metadataLoaded || totalFrames <= 1) {
      isTickingRef.current = false;
      return;
    }

    /**
     * SCROLL METRICS CALCULATION:
     * 
     * container.getBoundingClientRect().top gives the current viewport offset of the section.
     * When top <= 0, user has entered the scroll section.
     * 
     * scrollOffset = currentScrollY - videoStartScrollY
     *              = -containerRect.top
     */
    const containerRect = container.getBoundingClientRect();
    const scrollOffset = -containerRect.top;

    /**
     * TOTAL SCROLLABLE TRAVEL DISTANCE:
     *   scrollDistance = (totalFrames - 1) * PIXELS_PER_FRAME
     */
    const totalScrollDistance = (totalFrames - 1) * pixelsPerFrame;

    /**
     * FRAME INDEX FORMULA:
     *   frameIndex = clamp(round(scrollOffset / PIXELS_PER_FRAME), 0, totalFrames - 1)
     * 
     * Clamping ensures:
     * - Scrolling above the section clamps safely to Frame 0.
     * - Scrolling beyond the section clamps safely to Frame (totalFrames - 1).
     */
    const rawFrame = Math.round(scrollOffset / pixelsPerFrame);
    const clampedFrameIndex = Math.max(0, Math.min(totalFrames - 1, rawFrame));

    /**
     * REDUNDANT SEEK SUPPRESSION:
     * Only trigger seeking if the calculated frame index has changed.
     */
    if (clampedFrameIndex !== lastTargetFrameRef.current) {
      lastTargetFrameRef.current = clampedFrameIndex;

      /**
       * TIMESTAMP FORMULA:
       *   time = frameIndex / fps
       */
      const targetTime = Math.min(video.duration, Math.max(0, clampedFrameIndex / fps));

      executeSeek(targetTime);

      // Update debug information if requested
      if (showDebug) {
        setDebugInfo({
          currentFrame: clampedFrameIndex,
          currentTime: Number(targetTime.toFixed(3)),
          scrollOffset: Math.round(scrollOffset),
          totalScrollDistance,
          isSeeking: true,
        });
      }
    }

    isTickingRef.current = false;
  }, [metadataLoaded, totalFrames, pixelsPerFrame, fps, executeSeek, showDebug]);

  // Global scroll & resize event listeners
  useEffect(() => {
    const handleScroll = () => {
      if (!isTickingRef.current) {
        isTickingRef.current = true;
        rafIdRef.current = requestAnimationFrame(updateVideoFromScroll);
      }
    };

    const handleResize = () => {
      if (!isTickingRef.current) {
        isTickingRef.current = true;
        rafIdRef.current = requestAnimationFrame(updateVideoFromScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial check upon mount
    handleScroll();

    return () => {
      isUnmountedRef.current = true;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [updateVideoFromScroll]);

  // --------------------------------------------------------------------------
  // 5. RENDER PRESENTATION & STYLES
  // --------------------------------------------------------------------------
  /**
   * DYNAMIC SCROLL CONTAINER HEIGHT:
   * Total section height equals the sticky viewport (100vh) plus the scroll distance.
   * This gives the user exact vertical runway to scrub through all frames.
   */
  const scrollSectionHeight = metadataLoaded
    ? `calc(100vh + ${(totalFrames - 1) * pixelsPerFrame}px)`
    : "100vh";

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{
        height: scrollSectionHeight,
        backgroundColor: "#000000",
      }}
    >
      {/* Sticky Viewport Container: keeps video fixed in view while scrolling the runway */}
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "#040807",
        }}
      >
        {/* HTML5 Video Element: No autoplay, no native controls, playsinline for iOS */}
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            pointerEvents: "none",
            backgroundColor: "#000000",
          }}
        />

        {/* Error Fallback Notice */}
        {error && (
          <div
            style={{
              position: "absolute",
              padding: "16px 24px",
              backgroundColor: "rgba(220, 38, 38, 0.9)",
              color: "#ffffff",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              textAlign: "center",
              maxWidth: "90%",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
            }}
          >
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {!metadataLoaded && !error && (
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              color: "#ACC2B9",
              fontFamily: "monospace",
              fontSize: "13px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                border: "3px solid #2C3E2D",
                borderTopColor: "#ACC2B9",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <span>Initializing Video Scrub Timeline...</span>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Interactive Scroll Indicator Overlay */}
        {metadataLoaded && !error && (
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              pointerEvents: "none",
              backgroundColor: "rgba(17, 24, 21, 0.75)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(122, 150, 139, 0.4)",
              color: "#E2ECE7",
              fontSize: "11px",
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: "0.08em",
              padding: "8px 16px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
              zIndex: 10,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#7E9490",
                display: "inline-block",
              }}
            />
            <span>SCROLL TO SCRUB VIDEO TIMELINE ↓</span>
          </div>
        )}

        {/* Optional Development Debug Overlay */}
        {showDebug && metadataLoaded && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              border: "1px solid #7A968B",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#34D399",
              fontFamily: "monospace",
              fontSize: "12px",
              lineHeight: "1.6",
              zIndex: 50,
              pointerEvents: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ fontWeight: "bold", color: "#FFFFFF", marginBottom: "4px" }}>
              Video Scrubber Debug
            </div>
            <div>FPS: {fps} (Fallback: {fallbackFps})</div>
            <div>
              Frame: {debugInfo.currentFrame} / {totalFrames - 1}
            </div>
            <div>Time: {debugInfo.currentTime}s / {videoRef.current ? videoRef.current.duration.toFixed(2) : 0}s</div>
            <div>
              Scroll: {debugInfo.scrollOffset}px / {debugInfo.totalScrollDistance}px
            </div>
            <div>Sensitivity: {pixelsPerFrame} px/frame</div>
            <div>Status: {debugInfo.isSeeking ? "Seeking..." : "Ready"}</div>
            <div>
              Resolution: {videoDimensions.width}x{videoDimensions.height}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
