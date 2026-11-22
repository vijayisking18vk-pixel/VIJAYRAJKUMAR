import React, { Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { ObsidianMonolith } from './ObsidianMonolith';
import { CosmicVoid } from './CosmicVoid';

interface SceneProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("WebGL Scene encountered an error; falling back to CSS canvas backdrop.", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const Scene: React.FC<SceneProps> = ({ scrollProgress, mouse }) => {
  // Chromatic Aberration offset: increases dynamically during intense chapters (Act III / IV)
  const isHighIntensityChapter =
    (scrollProgress > 0.32 && scrollProgress < 0.52) ||
    (scrollProgress > 0.55 && scrollProgress < 0.70);
  
  const aberrationOffset = isHighIntensityChapter
    ? new THREE.Vector2(0.0035, 0.0035)
    : new THREE.Vector2(0.0008, 0.0008);

  const fallbackBackdrop = (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#020005] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4B009E]/30 via-[#0B011A]/80 to-[#020005]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#9D00FF]/30 shadow-plasma-lg animate-pulse-glow" />
    </div>
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <WebGLErrorBoundary fallback={fallbackBackdrop}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 1.75]}
        >
          <Suspense fallback={null}>
            {/* Ambient & Atmospheric Lighting */}
            <ambientLight color="#240046" intensity={1.2} />
            <directionalLight position={[5, 8, 4]} color="#D147FF" intensity={2.5} />
            <directionalLight position={[-5, -4, -3]} color="#9D00FF" intensity={2.0} />
            <pointLight position={[0, 0, 2]} color="#F8ECFF" intensity={1.8} distance={6} />

            {/* 3D Cosmic Environment & Nebulae */}
            <CosmicVoid scrollProgress={scrollProgress} mouse={mouse} />

            {/* Central Procedural Obsidian Monolith & Plasma Halo */}
            <ObsidianMonolith scrollProgress={scrollProgress} mouse={mouse} />

            {/* Cinematic WebGL Post-Processing */}
            <EffectComposer multisampling={0} disableNormalPass>
              <Bloom
                mipmapBlur
                luminanceThreshold={0.55}
                luminanceSmoothing={0.85}
                intensity={1.4}
              />
              <ChromaticAberration
                offset={aberrationOffset}
                radialModulation={true}
                modulationOffset={0.2}
              />
              <Vignette
                offset={0.25}
                darkness={0.75}
                eskil={false}
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};
