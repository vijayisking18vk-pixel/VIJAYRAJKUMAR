import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AmbientAudioProps {
  isPlaying?: boolean;
  onToggle?: (playing: boolean) => void;
}

export const AmbientAudio: React.FC<AmbientAudioProps> = ({ isPlaying = false, onToggle }) => {
  const [active, setActive] = useState(isPlaying);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

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

      // Low pass filter for dark stoic drone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);
      filter.connect(masterGain);

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

      // Slow LFO for filter breath (0.12Hz)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
      lfoGain.gain.setValueAtTime(45, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      lfoRef.current = lfo;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked by browser policy.", e);
    }
  }, []);

  const toggleSound = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;

    if (!ctx || !master) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (!active) {
      // Fade in smoothly
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.5);
      setActive(true);
      onToggle?.(true);
    } else {
      // Fade out smoothly
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      setActive(false);
      onToggle?.(false);
    }
  };

  // Play subtle tactile high-frequency click on UI interactions
  const playClick = useCallback(() => {
    if (!audioCtxRef.current || !active) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }, [active]);

  useEffect(() => {
    window.addEventListener('click', playClick);
    return () => window.removeEventListener('click', playClick);
  }, [playClick]);

  return (
    <button
      onClick={toggleSound}
      aria-label="Toggle ambient audio"
      className="flex items-center space-x-2 text-xs font-mono tracking-widest text-[#A89BB9] hover:text-[#F8ECFF] transition-all duration-200 px-3 py-1.5 rounded-sm border border-[#9D00FF]/20 hover:border-[#D147FF]/60 bg-[#0B011A]/50 backdrop-blur-md"
    >
      {active ? (
        <>
          <div className="flex items-center space-x-0.5 h-3">
            <span className="w-0.5 h-full bg-[#D147FF] animate-pulse" />
            <span className="w-0.5 h-2 bg-[#9D00FF] animate-pulse delay-75" />
            <span className="w-0.5 h-3 bg-[#F8ECFF] animate-pulse delay-150" />
          </div>
          <span className="text-[#F8ECFF]">SOUND: ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#A89BB9]/60" />
          <span className="text-[#A89BB9]/60">SOUND: OFF</span>
        </>
      )}
    </button>
  );
};
