import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface Chamber5RemainingFiveProps {
  scrollProgress: number;
}

export const Chamber5RemainingFive: React.FC<Chamber5RemainingFiveProps> = ({ scrollProgress }) => {
  const crownRef = useRef<THREE.Group>(null);
  const formationRef = useRef<THREE.Group>(null);
  const fadingOrbsRef = useRef<THREE.Group>(null);

  // 5 Star Positions in tight pentagon (radius = 3.2)
  const fiveStars = useMemo(() => {
    const stars = [];
    const radius = 3.2;
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      stars.push({ x, y, id: i + 1, name: i === 0 ? 'R.V (OPERATIONS)' : `FOUNDER 0${i + 1}` });
    }
    return stars;
  }, []);

  // 15 Fading ash orbs drifting outward
  const fadingOrbs = useMemo(() => {
    const orbs = [];
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const baseDist = 5.5 + Math.random() * 8.0;
      orbs.push({
        baseX: Math.cos(angle) * baseDist,
        baseY: Math.sin(angle) * baseDist,
        z: -10 + Math.random() * 20,
        speed: 0.15 + Math.random() * 0.3,
      });
    }
    return orbs;
  }, []);

  useFrame((state, delta) => {
    if (formationRef.current) {
      formationRef.current.rotation.z += delta * 0.15;
    }
    if (crownRef.current) {
      crownRef.current.rotation.y += delta * 0.4;
      crownRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
    if (fadingOrbsRef.current) {
      fadingOrbsRef.current.children.forEach((child, i) => {
        const orb = fadingOrbs[i];
        if (orb) {
          child.position.x = orb.baseX + Math.sin(state.clock.elapsedTime * orb.speed) * 0.5;
          child.position.y = orb.baseY + Math.cos(state.clock.elapsedTime * orb.speed) * 0.5;
        }
      });
    }
  });

  const isVisible = scrollProgress >= 0.58 && scrollProgress <= 0.86;

  return (
    <group position={[0, 0, -255]} visible={isVisible}>
      {/* 1. 15 Dim Ash Orbs Drifting Outward (Faded Friends) */}
      <group ref={fadingOrbsRef}>
        {fadingOrbs.map((orb, i) => (
          <mesh key={i} position={[orb.baseX, orb.baseY, orb.z]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#2B2735" opacity={0.35} transparent={true} />
          </mesh>
        ))}
      </group>

      {/* 2. Pentagonal Formation of 5 Blazing Electric-Violet Plasma Stars */}
      <group ref={formationRef}>
        {fiveStars.map((star) => (
          <group key={star.id} position={[star.x, star.y, 0]}>
            {/* Plasma Star Core */}
            <mesh>
              <sphereGeometry args={[0.32, 16, 16]} />
              <meshBasicMaterial color="#D147FF" />
            </mesh>
            {/* Pulsing Glow Ring */}
            <mesh>
              <ringGeometry args={[0.38, 0.5, 32]} />
              <meshBasicMaterial color="#9D00FF" side={THREE.DoubleSide} opacity={0.7} transparent={true} />
            </mesh>
            {/* Energy Beam to Center */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([0, 0, 0, -star.x, -star.y, 0])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#D147FF" opacity={0.75} transparent={true} />
            </line>
          </group>
        ))}
      </group>

      {/* 3. Central Luminous Forge: Reassembled Obsidian Shards into Gleaming Crown */}
      <group ref={crownRef} position={[0, 0, 0]}>
        {/* Crown Base Torus */}
        <mesh position={[0, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.08, 16, 32]} />
          <meshStandardMaterial color="#070112" roughness={0.1} metalness={0.95} />
        </mesh>
        {/* 5 Crown Spires */}
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 1.1, 0.3, Math.sin(a) * 1.1]}
              rotation={[0, 0, 0]}
            >
              <coneGeometry args={[0.2, 1.2, 4]} />
              <meshStandardMaterial
                color="#070112"
                emissive="#9D00FF"
                emissiveIntensity={1.2}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
          );
        })}
        {/* Center Radiant Core */}
        <pointLight color="#D147FF" intensity={3.5} distance={8} />
      </group>

      {/* In-World Orbiting 3D Typography */}
      <Text
        position={[0, 4.4, 0]}
        fontSize={0.34}
        color="#F8ECFF"
        letterSpacing={0.25}
        anchorX="center"
        anchorY="middle"
      >
        NON-TECHNICAL ➔ COURAGE ➔ ONLY 05 REMAINED
      </Text>
    </group>
  );
};
