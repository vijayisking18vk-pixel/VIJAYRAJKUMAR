import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { plasmaVertexShader, plasmaFragmentShader } from '../shaders/plasmaShader';

interface ObsidianMonolithProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
}

export const ObsidianMonolith: React.FC<ObsidianMonolithProps> = ({ scrollProgress, mouse }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const plasmaRef = useRef<THREE.ShaderMaterial>(null);
  const shardsGroupRef = useRef<THREE.Group>(null);

  // Generate 48 procedural crystal shards with unique random trajectories and rotations
  const shards = useMemo(() => {
    const list = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random());
      const sinPhi = Math.sin(phi);
      
      const dir = new THREE.Vector3(
        r * sinPhi * Math.cos(theta),
        r * sinPhi * Math.sin(theta),
        r * Math.cos(phi)
      ).normalize();

      // Wing shape bias for Act IV
      const isWing = i % 2 === 0;
      const wingX = (isWing ? 1 : -1) * (1.5 + Math.random() * 2.2);
      const wingY = -0.5 + Math.random() * 1.8;
      const wingZ = -0.5 + (Math.random() - 0.5) * 0.8;

      list.push({
        basePos: dir.clone().multiplyScalar(0.7),
        shatterDir: dir.clone().multiplyScalar(2.5 + Math.random() * 3.5),
        wingPos: new THREE.Vector3(wingX, wingY, wingZ),
        rotAxis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
        rotSpeed: 0.8 + Math.random() * 2.5,
        scale: 0.12 + Math.random() * 0.22,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return list;
  }, []);

  // Plasma Shader Uniforms
  const plasmaUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorCore: { value: new THREE.Color('#F8ECFF') },
      uColorElectric: { value: new THREE.Color('#9D00FF') },
      uColorPlasma: { value: new THREE.Color('#D147FF') },
      uIntensity: { value: 1.0 },
    }),
    []
  );

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (plasmaRef.current) {
      plasmaRef.current.uniforms.uTime.value = time;
    }

    // Dynamic rotation & mouse tracking
    if (groupRef.current) {
      const targetRotX = mouse.y * 0.35 + (scrollProgress * Math.PI * 0.5);
      const targetRotY = mouse.x * 0.45 + time * 0.15;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    }

    // Halo pulse & rotation
    if (haloRef.current) {
      haloRef.current.rotation.z = time * 0.25;
      haloRef.current.rotation.x = Math.PI / 4 + Math.sin(time * 0.5) * 0.08;
      const haloScale = 1.0 + Math.sin(time * 2.0) * 0.04;
      haloRef.current.scale.set(haloScale, haloScale, haloScale);
    }

    // Morph System based on scroll progress (0.0 to 1.0)
    // Act I (0 - 0.2): Solid core with radiant plasma & halo
    // Act II (0.2 - 0.35): Mischievous drift, slight pulse
    // Act III (0.35 - 0.52): 2020 Blackout: Core vanishes/fractures into orbiting shards
    // Act IV (0.52 - 0.70): Defence & Labyrinth: Shards form dark wings & tactical radar ring
    // Act V (0.70 - 0.83): Gravitational pull: Shards converge
    // Act VI (0.83 - 0.95): Re-forged Crown Monolith
    // Act VII (0.95 - 1.0): Calm obsidian authority

    let coreScale = 1.0;
    let shatterFactor = 0.0;
    let wingFactor = 0.0;
    let haloOpacity = 1.0;

    if (scrollProgress < 0.30) {
      // Act I & II: Solid
      coreScale = 1.0;
      shatterFactor = 0.0;
      wingFactor = 0.0;
      haloOpacity = 1.0;
    } else if (scrollProgress >= 0.30 && scrollProgress < 0.52) {
      // Act III: Fracture into Shards
      const t = (scrollProgress - 0.30) / 0.22;
      coreScale = Math.max(0.001, 1.0 - t * 1.5);
      shatterFactor = Math.min(1.0, t * 1.4);
      wingFactor = 0.0;
      haloOpacity = Math.max(0.1, 1.0 - t * 0.8);
    } else if (scrollProgress >= 0.52 && scrollProgress < 0.70) {
      // Act IV: Wings & Radar Alignment
      const t = (scrollProgress - 0.52) / 0.18;
      coreScale = 0.001;
      shatterFactor = 1.0;
      wingFactor = Math.min(1.0, t * 1.2);
      haloOpacity = 0.35 + Math.sin(time * 4.0) * 0.25; // Glitching scanline halo
    } else if (scrollProgress >= 0.70 && scrollProgress < 0.84) {
      // Act V: Re-convergence
      const t = (scrollProgress - 0.70) / 0.14;
      shatterFactor = Math.max(0.0, 1.0 - t * 1.2);
      wingFactor = Math.max(0.0, 1.0 - t * 1.5);
      coreScale = Math.min(1.0, t * 1.1);
      haloOpacity = 0.4 + t * 0.6;
    } else {
      // Act VI & VII: Re-forged Crowned Monolith
      coreScale = 1.1;
      shatterFactor = 0.0;
      wingFactor = 0.0;
      haloOpacity = 1.0;
    }

    if (coreRef.current) {
      coreRef.current.scale.setScalar(coreScale);
    }

    // Animate Shards
    if (shardsGroupRef.current) {
      shardsGroupRef.current.children.forEach((child, idx) => {
        const item = shards[idx];
        if (!item) return;

        // Interpolate position from base -> shatter -> wing -> re-converge
        const targetPos = new THREE.Vector3();
        if (wingFactor > 0.01) {
          targetPos.lerpVectors(item.shatterDir, item.wingPos, wingFactor);
        } else {
          targetPos.lerpVectors(item.basePos, item.shatterDir, shatterFactor);
        }

        // Add subtle floating orbital drift
        targetPos.x += Math.sin(time * item.rotSpeed + item.phase) * 0.15 * shatterFactor;
        targetPos.y += Math.cos(time * item.rotSpeed + item.phase) * 0.15 * shatterFactor;

        child.position.lerp(targetPos, 0.08);
        child.rotation.x += delta * item.rotSpeed;
        child.rotation.y += delta * item.rotSpeed * 0.7;

        // Scale shards based on shatter activation
        const curScale = item.scale * Math.min(1.0, shatterFactor * 1.5);
        child.scale.setScalar(curScale);
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Core Faceted Obsidian Crystal */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshPhysicalMaterial
          color="#0B011A"
          emissive="#240046"
          emissiveIntensity={0.35}
          roughness={0.08}
          metalness={0.88}
          clearcoat={1.0}
          clearcoatRoughness={0.12}
          reflectivity={0.95}
          flatShading={true}
        />
        {/* Plasma Fresnel Shell (crackling electric ultraviolet lightning) */}
        <mesh scale={[1.04, 1.04, 1.04]}>
          <icosahedronGeometry args={[1.5, 1]} />
          <shaderMaterial
            ref={plasmaRef}
            vertexShader={plasmaVertexShader}
            fragmentShader={plasmaFragmentShader}
            uniforms={plasmaUniforms}
            transparent={true}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </mesh>

      {/* 2. Stoic Neon Plasma Halo */}
      <mesh ref={haloRef} rotation={[Math.PI / 3.8, 0, 0]} position={[0, 0.1, -0.4]}>
        <torusGeometry args={[2.2, 0.045, 16, 100]} />
        <meshStandardMaterial
          color="#F8ECFF"
          emissive="#9D00FF"
          emissiveIntensity={4.5}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Secondary Outer Halo Ring */}
      <mesh rotation={[-Math.PI / 4, 0, 0]} position={[0, 0, -0.6]}>
        <torusGeometry args={[2.8, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#D147FF"
          emissive="#4B009E"
          emissiveIntensity={2.5}
          transparent={true}
          opacity={0.65}
        />
      </mesh>

      {/* 3. Shatter Shards System (48 procedurally dispersed crystal shards) */}
      <group ref={shardsGroupRef}>
        {shards.map((_, i) => (
          <mesh key={i}>
            <tetrahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
              color="#0B011A"
              emissive="#9D00FF"
              emissiveIntensity={0.7}
              roughness={0.1}
              metalness={0.9}
              flatShading={true}
              clearcoat={1.0}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
