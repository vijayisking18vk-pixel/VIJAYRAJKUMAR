import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { FractalEyesShader } from '../shaders/fractalEyes';
import { globalScroll } from '../../stores/scrollStore';

interface Chamber7HorizonSignalProps {
  scrollProgress?: number;
  mouse?: { x: number; y: number };
}

export const Chamber7HorizonSignal: React.FC<Chamber7HorizonSignalProps> = () => {
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const shaderMatRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uOpenProgress: { value: 1.0 },
      uColorIris: { value: new THREE.Color('#9D00FF') },
      uColorGaze: { value: new THREE.Color('#D147FF') },
      uColorCore: { value: new THREE.Color('#F8ECFF') },
      uIntensity: { value: 2.2 },
    };
  }, []);

  useFrame((state, delta) => {
    const t = globalScroll.current;
    const isVisible = t > 0.92;

    if (groupRef.current) {
      groupRef.current.visible = isVisible;
    }
    if (!isVisible) return;

    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.3;
      haloRef.current.rotation.y += delta * 0.15;
    }
    if (shaderMatRef.current) {
      shaderMatRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      shaderMatRef.current.uniforms.uMouse.value.x = THREE.MathUtils.damp(
        shaderMatRef.current.uniforms.uMouse.value.x,
        state.pointer.x,
        3.5,
        delta
      );
      shaderMatRef.current.uniforms.uMouse.value.y = THREE.MathUtils.damp(
        shaderMatRef.current.uniforms.uMouse.value.y,
        state.pointer.y,
        3.5,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.8, -350]} visible={false}>
      {/* 1. Calm Focused Fractal Violet Eyes */}
      <mesh position={[0, 0, -0.2]}>
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

      {/* 2. Blazing White-Violet Stoic Halo Framing the Eyes */}
      <mesh ref={haloRef} position={[0, 0, 0]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#F8ECFF"
          emissive="#D147FF"
          emissiveIntensity={4.5}
          roughness={0.1}
        />
      </mesh>

      {/* 3. In-World Spatial Creed Coordinates below halo */}
      <Text
        position={[0, -2.0, 0]}
        fontSize={0.2}
        color="#D147FF"
        letterSpacing={0.25}
        anchorX="center"
        anchorY="middle"
      >
        MADAMBAKKAM, CHENNAI 600126 · R. VIJAYRAJKUMAR
      </Text>
    </group>
  );
};
