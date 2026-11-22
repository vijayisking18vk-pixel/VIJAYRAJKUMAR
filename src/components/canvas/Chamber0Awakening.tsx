import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { FractalEyesShader } from '../shaders/fractalEyes';

interface Chamber0AwakeningProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
  onEnter?: () => void;
}

export const Chamber0Awakening: React.FC<Chamber0AwakeningProps> = ({
  scrollProgress,
  mouse,
  onEnter,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
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

  const isVisible = scrollProgress <= 0.16;

  useFrame((state, delta) => {
    if (!isVisible) return;

    if (shaderMatRef.current) {
      shaderMatRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Eyes follow cursor
      shaderMatRef.current.uniforms.uMouse.value.x = THREE.MathUtils.damp(
        shaderMatRef.current.uniforms.uMouse.value.x,
        mouse.x,
        4,
        delta
      );
      shaderMatRef.current.uniforms.uMouse.value.y = THREE.MathUtils.damp(
        shaderMatRef.current.uniforms.uMouse.value.y,
        mouse.y,
        4,
        delta
      );

      const targetOpen = THREE.MathUtils.clamp(
        1.0 - scrollProgress * 8,
        0.0,
        1.0
      );
      shaderMatRef.current.uniforms.uOpenProgress.value = targetOpen;
    }
  });

  return (
    <group position={[0, 0, 7]} visible={isVisible}>
      {/* Fractal Eyes Plane */}
      <mesh ref={meshRef} position={[0, 0, 0]} onClick={onEnter}>
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

      {/* Floating Micro Monospace Prompt */}
      <Text
        position={[0, -1.3, 0.1]}
        fontSize={0.12}
        color="#F8ECFF"
        letterSpacing={0.25}
        anchorX="center"
        anchorY="middle"
        onClick={onEnter}
      >
        SCROLL OR CLICK TO ENTER // R. VIJAYRAJKUMAR
      </Text>
    </group>
  );
};
