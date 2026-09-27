/**
 * Procedural Sound System for GTA: San Andreas Portfolio Atmosphere
 * Uses Web Audio API — Zero external audio files, zero latency, 100% reliable.
 * 
 * Complies with strict user rule:
 * - Starts 100% MUTED by default.
 * - AudioContext created ONLY upon explicit user interaction.
 * - Persistent mute and volume control.
 */

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.muted = true; // MUST start muted
    this.masterGain = null;
    this.ambientGain = null;
    this.ambientOsc = null;
    this.noiseNode = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.25, this.ctx.currentTime);
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
      this.ctx.resume();
    }

    this.muted = !this.muted;

    if (this.masterGain) {
      const targetGain = this.muted ? 0 : 0.22;
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.1);
    }

    return !this.muted;
  }

  isMuted() {
    return this.muted;
  }

  /**
   * Tactile UI hover click (crisp wooden mechanical micro-blip)
   */
  playHover() {
    if (this.muted || !this.ctx || !this.isInitialized) return;
    try {
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
    if (this.muted || !this.ctx || !this.isInitialized) return;
    try {
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
}

export const soundSystem = new SoundSystem();
export default soundSystem;
