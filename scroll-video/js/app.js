/**
 * Scroll-Driven Video & Frame Progression Application
 * 
 * Production-ready vanilla JavaScript engine that smoothly binds
 * the user's vertical scroll position to video and frame progression.
 */

(() => {
  'use strict';

  /* ==========================================================================
     1. Global Configuration
     ========================================================================== */
  const CONFIG = {
    // Mode: 'video' (default, using /uploads/video.mp4) or 'frames' (using extracted WhatsApp video frames)
    mode: 'video',

    // Frame Sequence Configuration
    frames: {
      totalFrames: 136,
      startIndex: 1,
      // Function resolving the path for frame index (1-based)
      getPath: (i) => `/frames/WhatsApp_Video_2026-09-13_at_4_33_24_AM_frames/frame_${String(i).padStart(3, '0')}.webp`,
    },

    // Video Configuration
    video: {
      src: '/uploads/video.mp4',
    },

    // Scroll Distance Multiplier: 5 = 500vh total container height
    scrollMultiplier: 5,

    // Enable / Disable Floating HUD Controls
    enableControls: true,

    // Threshold (0.0 to 1.0) to reveal the end-frame clickable headings
    endFrameThreshold: 0.84,
  };

  /* ==========================================================================
     2. DOM Element References
     ========================================================================== */
  const elements = {
    section: document.getElementById('scroll-video-section'),
    viewport: document.querySelector('.sticky-viewport'),
    canvas: document.getElementById('frame-canvas'),
    video: document.getElementById('scroll-video'),
    preloader: document.getElementById('preloader'),
    loadProgress: document.getElementById('load-progress'),
    scrollHint: document.getElementById('scroll-hint'),
    controlsHud: document.getElementById('controls-hud'),
    btnReset: document.getElementById('btn-reset'),
    btnPlay: document.getElementById('btn-play'),
    iconPlay: document.getElementById('icon-play'),
    iconPause: document.getElementById('icon-pause'),
    labelPlay: document.getElementById('label-play'),
    scrubber: document.getElementById('timeline-scrubber'),
    scrubberFill: document.getElementById('scrubber-fill'),
    hudCurrent: document.getElementById('hud-current'),
    hudTotal: document.getElementById('hud-total'),
    endOverlay: document.getElementById('end-frame-overlay'),
    reducedNotice: document.getElementById('reduced-motion-notice'),
    backToVideoBtn: document.getElementById('back-to-video'),
  };

  /* ==========================================================================
     3. State Management
     ========================================================================== */
  const state = {
    // Scroll geometry
    sectionTop: 0,
    sectionHeight: 0,
    scrollableDistance: 0,
    scrollProgress: 0,

    // rAF loop throttle
    isRafScheduled: false,
    isPlaying: false,
    playRafId: null,
    playLastTimestamp: 0,

    // Frames mode state
    images: [],
    loadedIndices: new Set(),
    loadedCount: 0,
    currentFrameIndex: -1,
    isFirstFrameDrawn: false,

    // Video mode state
    videoDuration: 0,
    isVideoReady: false,
    lastTargetTime: -1,

    // User interaction
    isUserScrubbing: false,
  };

  const canvasCtx = elements.canvas.getContext('2d', { alpha: false });

  /* ==========================================================================
     4. Utility Helpers
     ========================================================================== */
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const formatSeconds = (sec) => {
    if (isNaN(sec) || sec < 0) return '0.00s';
    const m = Math.floor(sec / 60);
    const s = (sec % 60).toFixed(2);
    return m > 0 ? `${m}:${s.padStart(5, '0')}s` : `${s}s`;
  };

  /* ==========================================================================
     5. Geometry & Dimensions Recalculation
     ========================================================================== */
  function updateSectionGeometry() {
    const windowHeight = window.innerHeight;
    
    // Apply scroll multiplier to height
    const calculatedHeight = Math.round(windowHeight * CONFIG.scrollMultiplier);
    elements.section.style.height = `${calculatedHeight}px`;

    const rect = elements.section.getBoundingClientRect();
    state.sectionTop = rect.top + window.scrollY;
    state.sectionHeight = calculatedHeight;
    state.scrollableDistance = Math.max(1, state.sectionHeight - windowHeight);

    resizeCanvas();
  }

  function resizeCanvas() {
    if (CONFIG.mode !== 'frames' || !elements.canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayW = window.innerWidth;
    const displayH = window.innerHeight;

    const targetW = Math.floor(displayW * dpr);
    const targetH = Math.floor(displayH * dpr);

    if (elements.canvas.width !== targetW || elements.canvas.height !== targetH) {
      elements.canvas.width = targetW;
      elements.canvas.height = targetH;
    }

    if (canvasCtx) {
      canvasCtx.imageSmoothingEnabled = true;
      canvasCtx.imageSmoothingQuality = 'high';
    }

    // Force redraw current frame on resize
    if (state.currentFrameIndex >= 0) {
      renderFrame(state.currentFrameIndex, true);
    }
  }

  /* ==========================================================================
     6. Frame-by-Frame Engine (Canvas Mode)
     ========================================================================== */
  function initFramesEngine() {
    elements.canvas.style.display = 'block';
    elements.video.style.display = 'none';

    const total = CONFIG.frames.totalFrames;
    state.images = new Array(total);

    for (let i = 0; i < total; i++) {
      const img = new Image();
      const frameNum = CONFIG.frames.startIndex + i;
      img.src = CONFIG.frames.getPath(frameNum);

      img.onload = () => {
        state.loadedIndices.add(i);
        state.loadedCount++;
        updatePreloader();

        // Render frame 0 immediately as soon as ready
        if (!state.isFirstFrameDrawn && i === 0) {
          state.isFirstFrameDrawn = true;
          renderFrame(0);
        } else if (state.currentFrameIndex === i) {
          renderFrame(i);
        }
      };

      img.onerror = () => {
        state.loadedCount++;
        updatePreloader();
      };

      state.images[i] = img;
    }
  }

  function updatePreloader() {
    const total = CONFIG.frames.totalFrames;
    const percent = Math.min(100, Math.round((state.loadedCount / total) * 100));
    if (elements.loadProgress) {
      elements.loadProgress.textContent = `${percent}%`;
    }

    // Hide preloader once first few frames are available
    if (state.loadedCount >= 8 || state.loadedCount === total) {
      elements.preloader.classList.add('hidden');
    }
  }

  function renderFrame(index, forceRedraw = false) {
    if (!forceRedraw && state.currentFrameIndex === index) return;
    state.currentFrameIndex = index;

    if (!canvasCtx || !elements.canvas) return;

    // Find requested frame or fallback to closest loaded frame
    let img = state.images[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let nearestImg = null;
      let minDiff = Infinity;
      for (const loadedIdx of state.loadedIndices) {
        const diff = Math.abs(loadedIdx - index);
        if (diff < minDiff) {
          minDiff = diff;
          nearestImg = state.images[loadedIdx];
        }
      }
      if (nearestImg && nearestImg.complete && nearestImg.naturalWidth > 0) {
        img = nearestImg;
      } else {
        return;
      }
    }

    const canvasW = elements.canvas.width;
    const canvasH = elements.canvas.height;
    if (canvasW === 0 || canvasH === 0) return;

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    // Preserve aspect ratio using object-fit: cover math
    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = (canvasW - drawW) / 2;
    const drawY = (canvasH - drawH) / 2;

    canvasCtx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  /* ==========================================================================
     7. Video Engine (Video Mode)
     ========================================================================== */
  function initVideoEngine() {
    elements.canvas.style.display = 'none';
    elements.video.style.display = 'block';

    elements.video.src = CONFIG.video.src;
    elements.video.load();

    const onMetadata = () => {
      state.videoDuration = elements.video.duration || 5;
      state.isVideoReady = true;
      elements.preloader.classList.add('hidden');
      elements.hudTotal.textContent = formatSeconds(state.videoDuration);
      seekVideoToProgress(state.scrollProgress);
    };

    if (elements.video.readyState >= 1) {
      onMetadata();
    } else {
      elements.video.addEventListener('loadedmetadata', onMetadata, { once: true });
    }

    elements.video.addEventListener('error', () => {
      console.warn('Video failed to load from ' + CONFIG.video.src + '. Switching to frames fallback mode.');
      CONFIG.mode = 'frames';
      initFramesEngine();
    });
  }

  function seekVideoToProgress(progress) {
    if (!state.isVideoReady || !elements.video || state.videoDuration <= 0) return;

    const targetTime = progress * state.videoDuration;
    // Avoid redundant seeking
    if (Math.abs(targetTime - state.lastTargetTime) > 0.03) {
      state.lastTargetTime = targetTime;
      elements.video.currentTime = clamp(targetTime, 0, state.videoDuration);
    }
  }

  /* ==========================================================================
     8. Scroll Calculation & RequestAnimationFrame Synchronizer
     ========================================================================== */
  function calculateScrollProgress() {
    const currentScroll = window.scrollY;
    const rawProgress = (currentScroll - state.sectionTop) / state.scrollableDistance;
    return clamp(rawProgress, 0, 1);
  }

  function onScroll() {
    if (!state.isRafScheduled && !state.isPlaying) {
      state.isRafScheduled = true;
      requestAnimationFrame(updateOnAnimationFrame);
    }
  }

  function updateOnAnimationFrame() {
    state.isRafScheduled = false;

    // 1. Calculate new progress
    const progress = calculateScrollProgress();
    state.scrollProgress = progress;

    // 2. Drive media playback
    if (CONFIG.mode === 'frames') {
      const total = CONFIG.frames.totalFrames;
      const targetIndex = Math.min(total - 1, Math.floor(progress * (total - 1)));
      renderFrame(targetIndex);

      if (elements.hudCurrent && elements.hudTotal) {
        elements.hudCurrent.textContent = `Frame ${targetIndex + 1}`;
        elements.hudTotal.textContent = `${total}`;
      }
    } else {
      seekVideoToProgress(progress);
      if (elements.hudCurrent) {
        elements.hudCurrent.textContent = formatSeconds(progress * state.videoDuration);
      }
    }

    // 3. Update Scrubber UI (unless user is actively dragging it)
    if (!state.isUserScrubbing && elements.scrubber && elements.scrubberFill) {
      const sliderVal = Math.round(progress * 1000);
      elements.scrubber.value = sliderVal;
      elements.scrubberFill.style.width = `${progress * 100}%`;
    }

    // 4. Scroll Hint fade out
    if (elements.scrollHint) {
      if (progress > 0.05) {
        elements.scrollHint.classList.add('faded');
      } else {
        elements.scrollHint.classList.remove('faded');
      }
    }

    // 5. End Frame Headings Overlay (from uploaded image)
    // Reveal clickable text when user reaches the end frame
    if (elements.endOverlay) {
      if (progress >= CONFIG.endFrameThreshold) {
        elements.endOverlay.classList.add('visible');
        elements.endOverlay.setAttribute('aria-hidden', 'false');
      } else {
        elements.endOverlay.classList.remove('visible');
        elements.endOverlay.setAttribute('aria-hidden', 'true');
      }
    }
  }

  /* ==========================================================================
     9. Manual Controls & Scrubber Handlers
     ========================================================================== */
  function initControls() {
    if (!CONFIG.enableControls) {
      if (elements.controlsHud) elements.controlsHud.classList.add('hidden');
      return;
    }

    // Reset Button
    elements.btnReset.addEventListener('click', () => {
      stopAutoPlay();
      window.scrollTo({
        top: state.sectionTop,
        behavior: 'smooth'
      });
    });

    // Play / Pause Toggle
    elements.btnPlay.addEventListener('click', toggleAutoPlay);

    // Scrubber Input Dragging
    elements.scrubber.addEventListener('input', (e) => {
      state.isUserScrubbing = true;
      stopAutoPlay();

      const val = parseFloat(e.target.value) / 1000;
      elements.scrubberFill.style.width = `${val * 100}%`;

      // Synchronize scroll position immediately
      const targetScroll = state.sectionTop + val * state.scrollableDistance;
      window.scrollTo({
        top: targetScroll,
        behavior: 'auto'
      });

      // Synchronize media immediately
      state.scrollProgress = val;
      if (CONFIG.mode === 'frames') {
        const total = CONFIG.frames.totalFrames;
        const targetIndex = Math.min(total - 1, Math.floor(val * (total - 1)));
        renderFrame(targetIndex);
      } else {
        seekVideoToProgress(val);
      }
    });

    elements.scrubber.addEventListener('change', () => {
      state.isUserScrubbing = false;
    });

    // Back to video anchor
    if (elements.backToVideoBtn) {
      elements.backToVideoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: state.sectionTop,
          behavior: 'smooth'
        });
      });
    }
  }

  function toggleAutoPlay() {
    if (state.isPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }

  function startAutoPlay() {
    state.isPlaying = true;
    elements.iconPlay.classList.add('hidden');
    elements.iconPause.classList.remove('hidden');
    elements.labelPlay.textContent = 'Pause';

    // If already at end, reset to top
    if (state.scrollProgress >= 0.99) {
      window.scrollTo({ top: state.sectionTop, behavior: 'auto' });
    }

    state.playLastTimestamp = performance.now();
    state.playRafId = requestAnimationFrame(autoPlayStep);
  }

  function stopAutoPlay() {
    state.isPlaying = false;
    if (state.playRafId) cancelAnimationFrame(state.playRafId);
    elements.iconPlay.classList.remove('hidden');
    elements.iconPause.classList.add('hidden');
    elements.labelPlay.textContent = 'Play';
  }

  function autoPlayStep(now) {
    if (!state.isPlaying) return;

    const delta = (now - state.playLastTimestamp) / 1000;
    state.playLastTimestamp = now;

    // Complete whole video in ~6 seconds during preview play
    const progressSpeed = 1 / 6;
    let newProgress = state.scrollProgress + delta * progressSpeed;

    if (newProgress >= 1) {
      newProgress = 1;
      stopAutoPlay();
    }

    const targetScroll = state.sectionTop + newProgress * state.scrollableDistance;
    window.scrollTo({ top: targetScroll, behavior: 'auto' });
    updateOnAnimationFrame();

    if (state.isPlaying) {
      state.playRafId = requestAnimationFrame(autoPlayStep);
    }
  }

  /* ==========================================================================
     10. Keyboard Accessibility
     ========================================================================== */
  function initKeyboardAccess() {
    window.addEventListener('keydown', (e) => {
      // Ignore if user is inside an input or editable field
      if (['INPUT', 'TEXTAREA', 'BUTTON'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        toggleAutoPlay();
      } else if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
        const step = state.scrollableDistance / 20;
        window.scrollBy({ top: step, behavior: 'auto' });
      } else if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
        const step = state.scrollableDistance / 20;
        window.scrollBy({ top: -step, behavior: 'auto' });
      }
    });
  }

  /* ==========================================================================
     11. Reduced Motion Detection
     ========================================================================== */
  function checkReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && elements.reducedNotice) {
      elements.reducedNotice.hidden = false;
    }
  }

  /* ==========================================================================
     12. Lifecycle Initialization
     ========================================================================== */
  function init() {
    updateSectionGeometry();

    if (CONFIG.mode === 'frames') {
      initFramesEngine();
    } else {
      initVideoEngine();
    }

    initControls();
    initKeyboardAccess();
    checkReducedMotion();

    // Event Listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateSectionGeometry();
      onScroll();
    });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        updateSectionGeometry();
        onScroll();
      }, 150);
    });

    // Page restoration from bfcache / back button
    window.addEventListener('pageshow', () => {
      updateSectionGeometry();
      onScroll();
    });

    // Trigger initial calculation
    setTimeout(onScroll, 50);
  }

  // Bootstrap when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export config to window for easy runtime inspection/tuning
  window.SCROLL_VIDEO_CONFIG = CONFIG;
})();
