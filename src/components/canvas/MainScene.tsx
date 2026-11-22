import React, { Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

import { CameraRig } from './CameraRig';
import { WorldEnvironment } from './WorldEnvironment';
import { Chamber0Awakening } from './Chamber0Awakening';
import { Chamber1StoicVoid } from './Chamber1StoicVoid';
import { Chamber2SchoolingGates } from './Chamber2SchoolingGates';
import { Chamber3FractureVortex } from './Chamber3FractureVortex';
import { Chamber4WingsAndAbyss } from './Chamber4WingsAndAbyss';
import { Chamber5RemainingFive } from './Chamber5RemainingFive';
import { Chamber6CitadelPortals } from './Chamber6CitadelPortals';
import { Chamber7HorizonSignal } from './Chamber7HorizonSignal';

interface MainSceneProps {
  scrollProgress: number; // 0.0 to 1.0
  mouse: { x: number; y: number };
  onEnterChamber1?: () => void;
  onPortalClick?: (url: string | null) => void;
  onPortalHover?: (name: string | null) => void;
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

export const MainScene: React.FC<MainSceneProps> = ({
  scrollProgress,
  mouse,
  onEnterChamber1,
  onPortalClick,
  onPortalHover,
}) => {
  // Chromatic Aberration spikes during Chapter 3 (COVID fracture) and Chapter 4B (Debarred drop)
  const isHighIntensity =
    (scrollProgress > 0.30 && scrollProgress < 0.45) ||
    (scrollProgress > 0.54 && scrollProgress < 0.65);

  const aberrationOffset = isHighIntensity
    ? new THREE.Vector2(0.0035, 0.0035)
    : new THREE.Vector2(0.0006, 0.0006);

  const fallbackBackdrop = (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#020005] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4B009E]/30 via-[#0B011A]/80 to-[#020005]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#9D00FF]/30 shadow-plasma-lg" />
    </div>
  );

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden bg-[#020005]">
      <WebGLErrorBoundary fallback={fallbackBackdrop}>
        <Canvas
          camera={{ position: [0, 0, 12], fov: 48 }}
          dpr={[1, 1.75]}
          gl={{
            antialias: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15,
          }}
        >
          {/* 1. Spline Flythrough Camera Rig (Always active, never suspends) */}
          <CameraRig scrollProgress={scrollProgress} mouse={mouse} />

          {/* 2. Unified World Environment - Lighting, Fog & Starfield (Always active) */}
          <WorldEnvironment scrollProgress={scrollProgress} />

          <Suspense fallback={null}>
            {/* 3. 7 Sequential 3D Storytelling Chambers */}
            <Chamber0Awakening
              scrollProgress={scrollProgress}
              mouse={mouse}
              onEnter={onEnterChamber1}
            />

            <Chamber1StoicVoid scrollProgress={scrollProgress} />

            <Chamber2SchoolingGates scrollProgress={scrollProgress} />

            <Chamber3FractureVortex scrollProgress={scrollProgress} />

            <Chamber4WingsAndAbyss scrollProgress={scrollProgress} />

            <Chamber5RemainingFive scrollProgress={scrollProgress} />

            <Chamber6CitadelPortals
              scrollProgress={scrollProgress}
              onPortalClick={onPortalClick}
              onPortalHover={onPortalHover}
            />

            <Chamber7HorizonSignal scrollProgress={scrollProgress} mouse={mouse} />

            {/* 4. Post-Processing Engine */}
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
                modulationOffset={0.25}
              />
              <Vignette offset={0.25} darkness={0.8} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};
