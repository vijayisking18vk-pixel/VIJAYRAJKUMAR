/**
 * Procedural Sound System for GTA: San Andreas Portfolio Atmosphere
 * Uses Web Audio API — Zero external audio files, zero latency, 100% reliable.
 * 
 * Complies with strict user rule:
 * - Starts 100% MUTED by default on first visit.
 * - Remembers user's explicit preference across navigation.
 * - Auto-resumes AudioContext if suspended by mobile OS during touch/scroll.
 */

class SoundSystem {
  constructor() {
    this.ctx = null;
    const saved = typeof window !== 'undefined' ? localStorage.getItem('gta_sound_enabled') : null;
    this.muted = saved === 'true' ? false : true; // Default muted unless user explicitly enabled
    this.masterGain = null;
    this.ambientGain = null;
    this.ambientOsc = null;
    this.isInitialized = false;
    this.listeners = new Set();

    if (typeof window !== 'undefined') {
      const resumeIfActive = () => {
        if (!this.muted) {
          if (!this.isInitialized) {
            this.init();
          }
          if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
          }
        }
      };
      window.addEventListener('touchstart', resumeIfActive, { passive: true });
      window.addEventListener('pointerdown', resumeIfActive, { passive: true });
      window.addEventListener('click', resumeIfActive, { passive: true });
    }
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
    if (!this.isInitialized) {
      this.init();
    }

    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    this.muted = !this.muted;

    if (typeof window !== 'undefined') {
      localStorage.setItem('gta_sound_enabled', this.muted ? 'false' : 'true');
    }

    if (this.masterGain) {
      const targetGain = this.muted ? 0 : 0.22;
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.08);
    }

    this.notify();
    return !this.muted;
  }

  isMuted() {
    return this.muted;
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
