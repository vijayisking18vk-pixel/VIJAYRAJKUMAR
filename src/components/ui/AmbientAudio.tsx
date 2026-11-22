import React, { useState, useRef, useEffect, useCallback } from 'react';

interface AmbientAudioProps {
  currentChamber?: number;
  isPlaying?: boolean;
  onToggle?: (playing: boolean) => void;
}

export interface AmbientAudioController {
  toggleSound: () => void;
  playPortalChime: () => void;
  isActive: boolean;
}

export const AmbientAudio: React.FC<AmbientAudioProps> = ({
  currentChamber = 0,
  isPlaying = false,
  onToggle,
}) => {
  const [active, setActive] = useState(isPlaying);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  // Initialize Web Audio API Synth Drone
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Low pass filter whose cutoff shifts dynamically per chamber
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);
      filter.connect(masterGain);
      filterRef.current = filter;

      // Sub-bass drone oscillator (55Hz - A1 note)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      osc1.connect(filter);
      osc1.start();
      osc1Ref.current = osc1;

      // Ethereal violet-pad oscillator (110Hz - A2 note with detune)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110.5, ctx.currentTime);
      osc2.connect(filter);
      osc2.start();
      osc2Ref.current = osc2;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked by browser policy.", e);
    }
  }, []);

  // Shift Low-Pass Filter Frequency per Chamber dynamically
  useEffect(() => {
    if (!filterRef.current || !audioCtxRef.current || !active) return;
    const ctx = audioCtxRef.current;
    const filter = filterRef.current;

    const CUTOFFS: Record<number, number> = {
      0: 120, // Void
      1: 150, // Stoic Monolith
      2: 200, // Mischievous Spark
      3: 110, // 2020 Fracture
      4: 85,  // Deep Abyss & Debarred
      5: 230, // The Five Luminous Stars
      6: 300, // The Grand Citadel
      7: 170, // Epilogue Signal
    };

    const targetFreq = CUTOFFS[currentChamber] || 150;
    filter.frequency.cancelScheduledValues(ctx.currentTime);
    filter.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.8);
  }, [currentChamber, active]);

  const toggleSound = useCallback(() => {
    initAudio();
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;

    if (!ctx || !master) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (!active) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.2);
      setActive(true);
      onToggle?.(true);
    } else {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      setActive(false);
      onToggle?.(false);
    }
  }, [active, initAudio, onToggle]);

  // Expose toggleSound on window for header button trigger
  useEffect(() => {
    (window as unknown as { toggleAmbientSound?: () => void; isAudioActive?: boolean }).toggleAmbientSound = toggleSound;
    (window as unknown as { isAudioActive?: boolean }).isAudioActive = active;
  }, [toggleSound, active]);

  // Tactile Portal Hover Chime
  const playChime = useCallback(() => {
    if (!audioCtxRef.current || !active) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {}
  }, [active]);

  useEffect(() => {
    (window as unknown as { playPortalChime?: () => void }).playPortalChime = playChime;
  }, [playChime]);

  return null;
};
