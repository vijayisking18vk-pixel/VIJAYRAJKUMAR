/**
 * Sound System for GTA: San Andreas Portfolio Atmosphere
 * Featuring authentic GTA: San Andreas Theme Song playback + Procedural Web Audio UI sound effects.
 * 
 * Rules:
 * - Automatically attempts playback on entry as requested by user.
 * - Handles browser autoplay policies with lightweight gesture listeners.
 * - Stores user preference in localStorage if user explicitly mutes/unmutes.
 * - Loops theme audio smoothly in the background.
 * - Manages pause/resume on tab visibility changes.
 */

class SoundSystem {
  constructor() {
    this.ctx = null;
    let saved = null;
    try { saved = window.localStorage.getItem('gta_sound_enabled'); } catch (_) {}
    // Default to enabled (unmuted) on entry unless user explicitly disabled it previously
    this.muted = saved === 'false';
    this.masterGain = null;
    this.ambientGain = null;
    this.ambientOsc = null;
    this.isInitialized = false;
    this.listeners = new Set();
    this.bgMusic = null;
    this._pausedByVisibility = false;

    if (typeof window !== 'undefined') {
      try {
        this.bgMusic = new Audio('/audio/gta_theme.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.42;
        this.bgMusic.preload = 'auto';
        ['playing', 'pause', 'ended', 'error'].forEach((event) => {
          this.bgMusic.addEventListener(event, () => this.notify());
        });
      } catch (e) {
        console.warn('Audio initialization warning:', e);
      }

      // Try autoplaying theme on entry if unmuted
      if (!this.muted) {
        this.attemptPlayTheme();
      }

      // Fallback listeners for modern browser Autoplay Policy restrictions:
      // If browser blocks unmuted audio before user interaction, start on the first gesture.
      const interactionEvents = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'];
      const resumeOnGesture = (event) => {
        // The explicit sound button handles its own gesture, without a competing toggle.
        if (event.target.closest?.('[data-sound-control]')) return;
        if (!this.muted) {
          if (!this.isInitialized) {
            this.init();
          }
          if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
          }
          if (this.bgMusic && this.bgMusic.paused) {
            this.attemptPlayTheme();
          }
        }
      };

      interactionEvents.forEach((evt) => {
        window.addEventListener(evt, resumeOnGesture, { passive: true, capture: true });
      });

      // Pause audio when switching tabs, resume when returning
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (this.bgMusic && !this.bgMusic.paused) {
            this.bgMusic.pause();
            this._pausedByVisibility = true;
          }
        } else {
          if (this._pausedByVisibility && !this.muted) {
            this._pausedByVisibility = false;
            this.attemptPlayTheme();
          }
        }
      });
    }
  }

  attemptPlayTheme() {
    if (this.muted || !this.bgMusic || document.hidden) return;
    try {
      const playPromise = this.bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented by browser policy awaiting user interaction.
          // The gesture listener will safely start playback on the first interaction.
        });
      }
    } catch (_) {}
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(!this.muted);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(!this.muted);
      } catch (_) {}
    });
  }

  init() {
    if (this.isInitialized && this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.22, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.isInitialized = true;
      this.setupAmbientHum();
    } catch (e) {
      console.warn('Web Audio API unavailable:', e);
    }
  }

  setupAmbientHum() {
    if (!this.ctx || !this.masterGain) return;

    // Sub-bass warm engine / street hum (55Hz sine wave with soft lowpass)
    this.ambientOsc = this.ctx.createOscillator();
    this.ambientOsc.type = 'sine';
    this.ambientOsc.frequency.setValueAtTime(55, this.ctx.currentTime);

    // Warm analog lowpass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    this.ambientOsc.connect(filter);
    filter.connect(this.ambientGain);
    this.ambientGain.connect(this.masterGain);

    this.ambientOsc.start();
  }

  toggleSound() {
    return this.setSoundEnabled(this.muted);
  }

  setSoundEnabled(enabled) {
    this.muted = !enabled;
    if (enabled && !this.isInitialized) {
      this.init();
    }

    if (enabled && this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    try { window.localStorage.setItem('gta_sound_enabled', this.muted ? 'false' : 'true'); } catch (_) {}

    if (this.masterGain && this.ctx) {
      const targetGain = this.muted ? 0 : 0.22;
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.08);
    }

    if (this.bgMusic) {
      if (this.muted) {
        this.bgMusic.pause();
      } else {
        this.attemptPlayTheme();
      }
    }

    this.notify();
    return !this.muted;
  }

  isMuted() {
    return this.muted;
  }

  isThemePlaying() {
    return Boolean(this.bgMusic && !this.bgMusic.paused);
  }

  /**
   * Tactile UI hover click (crisp wooden mechanical micro-blip)
   */
  playHover() {
    if (this.muted) return;
    if (!this.isInitialized) {
      this.init();
    }
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (_) {}
  }

  /**
   * Tactile mission / button select click (satisfying resonant chirp)
   */
  playSelect() {
    if (this.muted) return;
    if (!this.isInitialized) {
      this.init();
    }
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'square';
      osc1.frequency.setValueAtTime(260, now);
      osc1.frequency.exponentialRampToValueAtTime(520, now + 0.05);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(520, now);
      osc2.frequency.exponentialRampToValueAtTime(1040, now + 0.06);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.08);
      osc2.stop(now + 0.08);
    } catch (_) {}
  }

  /**
   * Entering Explore Mode: Ascending resonant synth chord
   */
  playExploreEnter() {
    if (this.muted) return;
    if (!this.isInitialized) this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      const now = this.ctx.currentTime;
      [330, 440, 554].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.06, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.25);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.26);
      });
    } catch (_) {}
  }

  /**
   * Exiting Explore Mode: Descending soft chord
   */
  playExploreExit() {
    if (this.muted) return;
    if (!this.isInitialized) this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      const now = this.ctx.currentTime;
      [554, 440, 330].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.05, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.22);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.23);
      });
    } catch (_) {}
  }

  /**
   * Waypoint / Landmark Discovery Beep
   */
  playWaypointChirp() {
    if (this.muted) return;
    if (!this.isInitialized) this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.04);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch (_) {}
  }
}

export const soundSystem = new SoundSystem();
export default soundSystem;
