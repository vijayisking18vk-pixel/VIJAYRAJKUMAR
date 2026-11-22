import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FractalEyesShader } from '../shaders/fractalEyes';
import { globalScroll } from '../../stores/scrollStore';

interface Chamber0AwakeningProps {
  scrollProgress?: number;
  mouse?: { x: number; y: number };
  onEnter?: () => void;
}

export const Chamber0Awakening: React.FC<Chamber0AwakeningProps> = ({ onEnter }) => {
  const groupRef = useRef<THREE.Group>(null);
  const shaderMatRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uOpenProgress: { value: 1.0 },
      uColorIris: { value: new THREE.Color('#9D00FF') },
      uColorGaze: { value: new THREE.Color('#D147FF') },
      uColorCore: { value: new THREE.Color('#F8ECFF') },
      uIntensity: { value: 2.4 },
    };
  }, []);

  useFrame((state, delta) => {
    const t = globalScroll.current;
    const isVisible = t <= 0.05;

    if (groupRef.current) {
      groupRef.current.visible = isVisible;
    }
    if (!isVisible) return;

    if (shaderMatRef.current) {
      shaderMatRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Eyes follow cursor smoothly via native pointer
      shaderMatRef.current.uniforms.uMouse.value.x = THREE.MathUtils.damp(
        shaderMatRef.current.uniforms.uMouse.value.x,
        state.pointer.x,
        4.0,
        delta
      );
      shaderMatRef.current.uniforms.uMouse.value.y = THREE.MathUtils.damp(
        shaderMatRef.current.uniforms.uMouse.value.y,
        state.pointer.y,
        4.0,
        delta
      );

      const targetOpen = THREE.MathUtils.clamp(1.0 - t * 18, 0.0, 1.0);
      shaderMatRef.current.uniforms.uOpenProgress.value = targetOpen;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 7]} visible={true}>
      {/* Fractal Eyes Plane */}
      <mesh position={[0, 0, 0]} onClick={onEnter}>
        <planeGeometry args={[4.2, 2.2]} />
        <shaderMaterial
          ref={shaderMatRef}
          vertexShader={FractalEyesShader.vertexShader}
          fragmentShader={FractalEyesShader.fragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
