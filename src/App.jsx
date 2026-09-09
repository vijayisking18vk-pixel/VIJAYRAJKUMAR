import React, { useState } from 'react';
import Header from './components/Header';
import HeroPoster from './components/HeroPoster';
import AboutBuilder from './components/AboutBuilder';
import VentureWorkbench from './components/VentureWorkbench';
import LearningStack from './components/LearningStack';
import CollaborationDispatch from './components/CollaborationDispatch';
import Footer from './components/Footer';
import Particles from './components/react-bits/Particles';

export default function App() {
  const [activeSection, setActiveSection] = useState('poster');

  const scrollToJourney = () => {
    const el = document.getElementById('journey');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-neutral-950 flex flex-col font-sans selection:bg-neutral-900 selection:text-white overflow-x-hidden">
      {/* Global Ambient Interactive Particles Canvas Background */}
      <Particles particleCount={30} speed={0.3} particleColor="#18181B" />

      {/* Navigation Header */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Flow */}
      <main className="relative z-10 flex-grow">
        {/* 1. Hero Poster Image Centerpiece */}
        <HeroPoster onStartAnimation={scrollToJourney} />

        {/* 01 // The Journey & Education */}
        <AboutBuilder />

        {/* 02 // Experience & Venture Matrix */}
        <VentureWorkbench />

        {/* 03 // Skills & Ecosystem Engagement */}
        <LearningStack />

        {/* 04 // Connect & Dispatch */}
        <CollaborationDispatch />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
