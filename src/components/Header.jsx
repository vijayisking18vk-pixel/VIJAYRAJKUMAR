import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
// Load the shared audio player with every entry route, including the homepage.
import soundSystem from '../lib/soundSystem';
export default function Header() {
 const [playing, setPlaying] = useState(() => soundSystem.isThemePlaying());
 useEffect(() => soundSystem.subscribe(() => setPlaying(soundSystem.isThemePlaying())), []);
 return <header className="logo-only-header">
  <a href="/" aria-label="Vijayrajkumar home" className="district-brand"><span>Vijayrajkumar</span></a>
  <button className="district-sound-toggle" data-sound-control aria-label={playing ? 'Mute music' : 'Play music'} title={playing ? 'Mute music' : 'Play music'} onClick={() => soundSystem.setSoundEnabled(!playing)}>
   {playing ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
  </button>
 </header>;
}
