import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { globalScroll } from '../../stores/scrollStore';

interface WorldEnvironmentProps {
  scrollProgress?: number;
}

export const WorldEnvironment: React.FC<WorldEnvironmentProps> = () => {
  const fogRef = useRef<THREE.FogExp2>(null);
  const starsRef = useRef<THREE.Points>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);

  // 3,000 Instanced Cosmic Stars distributed along the 350-unit corridor
  const [starPositions, starColors] = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cViolet = new THREE.Color('#9D00FF');
    const cMagenta = new THREE.Color('#D147FF');
    const cWhite = new THREE.Color('#F8ECFF');

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 6.0 + Math.random() * 45.0;
      const z = 20 - Math.random() * 380;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const r = Math.random();
      const chosenColor = r < 0.5 ? cViolet : r < 0.8 ? cMagenta : cWhite;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    return [positions, colors];
  }, []);

  useFrame((_, delta) => {
    const t = globalScroll.current;

    if (fogRef.current) {
      let targetDensity = 0.014;
      let targetColor = new THREE.Color('#020005');

      if (t >= 0.16 && t < 0.31) {
        targetDensity = 0.018;
        targetColor = new THREE.Color('#0B011A');
      } else if (t >= 0.31 && t < 0.46) {
        targetDensity = 0.022;
        targetColor = new THREE.Color('#100008');
      } else if (t >= 0.46 && t < 0.66) {
        targetDensity = 0.024;
        targetColor = new THREE.Color('#1A0028');
      } else if (t >= 0.66 && t < 0.79) {
        targetDensity = 0.008;
        targetColor = new THREE.Color('#020005');
      } else if (t >= 0.79 && t < 0.93) {
        targetDensity = 0.012;
        targetColor = new THREE.Color('#070112');
      }

      fogRef.current.density = THREE.MathUtils.damp(fogRef.current.density, targetDensity, 3.0, delta);
      fogRef.current.color.lerp(targetColor, 0.05);
    }

    if (starsRef.current) {
      starsRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <>
      <fogExp2 ref={fogRef} attach="fog" args={['#020005', 0.014]} />

      <ambientLight ref={ambientLightRef} color="#2A0845" intensity={1.4} />
      <directionalLight
        ref={dirLightRef}
        position={[10, 15, 10]}
        color="#D147FF"
        intensity={2.2}
      />
      <directionalLight position={[-10, -10, -10]} color="#9D00FF" intensity={1.8} />

      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starColors.length / 3}
            array={starColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors={true}
          transparent={true}
          opacity={0.85}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};
