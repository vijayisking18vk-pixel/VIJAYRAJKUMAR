import React, { useState, useEffect } from 'react';
import SiteHeader from './components/SiteHeader';
import Hero from './components/Hero';
import ProfileDetailsGrid from './components/ProfileDetailsGrid';
import VentureSection from './components/VentureSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import SiteFooter from './components/SiteFooter';

import {
  nav,
  hero,
  profileDetails,
  ventures,
  education,
  contact,
  footerText,
} from './data';

// Multi-page subpages
import AboutPage from './pages/AboutPage';
import VenturesPage from './pages/VenturesPage';
import ZiggersPage from './pages/ZiggersPage';
import LoopMemoryPage from './pages/LoopMemoryPage';
import WritingPage from './pages/WritingPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Route matching
  const normalizedPath = currentPath.toLowerCase().replace(/\/+$/, '');

  if (normalizedPath === '/about') {
    return <AboutPage />;
  }
  if (normalizedPath === '/ventures') {
    return <VenturesPage />;
  }
  if (normalizedPath === '/ventures/ziggers') {
    return <ZiggersPage />;
  }
  if (normalizedPath === '/ventures/loopmemory') {
    return <LoopMemoryPage />;
  }
  if (normalizedPath === '/writing') {
    return <WritingPage />;
  }
  if (normalizedPath === '/contact') {
    return <ContactPage />;
  }

  // Homepage: Clean Structural Component Hierarchy per Component Design Plan
  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#1F2421] flex flex-col font-sans selection:bg-[#2C3E2D] selection:text-white">
      <SiteHeader homeLabel={nav.homeLabel} links={nav.links} activeHref={currentPath} />
      <main className="flex-grow">
        <Hero
          headline={hero.headline}
          subtext={hero.subtext}
          primaryCta={{ label: 'Get in touch', href: '/contact/' }}
          secondaryCta={{ label: 'See the ventures', href: '#ventures' }}
        />
        <ProfileDetailsGrid items={profileDetails} />
        <VentureSection heading="Venture Case Studies" ventures={ventures} />
        <EducationSection heading="Education & Strategic Background" items={education} />
        <ContactSection {...contact} />
      </main>
      <SiteFooter text={footerText} />
    </div>
  );
}
