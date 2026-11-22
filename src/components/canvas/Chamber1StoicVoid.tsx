import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { PlasmaFresnelShader } from '../shaders/plasmaFresnel';

interface Chamber1StoicVoidProps {
  scrollProgress: number;
}

export const Chamber1StoicVoid: React.FC<Chamber1StoicVoidProps> = ({ scrollProgress }) => {
  const monolithRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const plasmaShaderRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uColorCore: { value: new THREE.Color('#070112') },
      uColorRim: { value: new THREE.Color('#9D00FF') },
      uColorEdge: { value: new THREE.Color('#D147FF') },
      uFresnelBias: { value: 0.12 },
      uFresnelScale: { value: 2.4 },
      uFresnelPower: { value: 2.6 },
      uLightningIntensity: { value: 1.8 },
    };
  }, []);

  useFrame((state, delta) => {
    if (monolithRef.current) {
      monolithRef.current.rotation.y += delta * 0.25;
    }
    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.4;
      haloRef.current.rotation.y += delta * 0.15;
    }
    if (plasmaShaderRef.current) {
      plasmaShaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const isVisible = scrollProgress <= 0.28;

  return (
    <group position={[0, 0, -20]} visible={isVisible}>
      {/* 1. Reflective Obsidian Floor */}
      <mesh position={[0, -2.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 60]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={512}
          mirror={0.7}
          mixBlur={0.8}
          mixStrength={1.5}
          roughness={0.2}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#070112"
          metalness={0.9}
        />
      </mesh>

      {/* 2. Central Sculpted Faceted Obsidian Monolith & Plasma Shell */}
      <group ref={monolithRef} position={[0, 1.4, 0]}>
        {/* Core Faceted Icosahedron */}
        <mesh>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshPhysicalMaterial
            color="#070112"
            roughness={0.15}
            metalness={0.95}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={1.0}
          />
        </mesh>

        {/* Outer Plasma Fresnel Lightning Shell */}
        <mesh scale={[1.04, 1.04, 1.04]}>
          <icosahedronGeometry args={[1.5, 1]} />
          <shaderMaterial
            ref={plasmaShaderRef}
            vertexShader={PlasmaFresnelShader.vertexShader}
            fragmentShader={PlasmaFresnelShader.fragmentShader}
            uniforms={uniforms}
            transparent={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 3. Tilted Blazing White-Violet Stoic Halo */}
      <mesh
        ref={haloRef}
        position={[0, 2.6, -0.6]}
        rotation={[Math.PI / 3.5, 0.2, 0]}
      >
        <torusGeometry args={[2.2, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#F8ECFF"
          emissive="#D147FF"
          emissiveIntensity={4.5}
          roughness={0.1}
        />
      </mesh>

      {/* 4. In-World 3D Typography: R. VIJAYRAJKUMAR */}
      <Text
        position={[0, 3.8, -1.2]}
        fontSize={0.85}
        color="#F8ECFF"
        letterSpacing={0.15}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#9D00FF"
      >
        R. VIJAYRAJKUMAR
      </Text>

      {/* In-World Spatial Coordinates */}
      <Text
        position={[0, -0.8, 1.0]}
        fontSize={0.22}
        color="#D147FF"
        letterSpacing={0.2}
        anchorX="center"
        anchorY="middle"
      >
        05.04.2005 · KOVILPATTI ➔ CHENNAI 126
      </Text>
    </group>
  );
};
