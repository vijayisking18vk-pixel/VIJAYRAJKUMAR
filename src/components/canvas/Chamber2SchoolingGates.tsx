import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { globalScroll } from '../../stores/scrollStore';

interface Chamber2SchoolingGatesProps {
  scrollProgress?: number;
}

export const Chamber2SchoolingGates: React.FC<Chamber2SchoolingGatesProps> = () => {
  const groupRef = useRef<THREE.Group>(null);
  const catEyeGlowRef = useRef<THREE.PointLight>(null);
  const catMeshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = globalScroll.current;
    const isVisible = t > 0.16 && t <= 0.31;

    if (groupRef.current) {
      groupRef.current.visible = isVisible;
    }
    if (!isVisible) return;

    // Lazy blink logic for cat eye in fog (blinks once every 4 seconds)
    if (catEyeGlowRef.current) {
      const cycle = state.clock.elapsedTime % 4.0;
      const intensity = cycle > 3.7 && cycle < 3.9 ? 0.1 : 1.8;
      catEyeGlowRef.current.intensity = intensity;
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* ================= GATE 1: ST. JOSEPH ================= */}
      <group position={[0, 0, -45]}>
        {/* Left Obsidian Pillar */}
        <mesh position={[-3.5, 1.2, 0]}>
          <boxGeometry args={[0.5, 6, 0.5]} />
          <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Right Obsidian Pillar */}
        <mesh position={[3.5, 1.2, 0]}>
          <boxGeometry args={[0.5, 6, 0.5]} />
          <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Top Arch Bar */}
        <mesh position={[0, 4.2, 0]}>
          <boxGeometry args={[7.5, 0.4, 0.5]} />
          <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Neon Violet Edge Strip */}
        <mesh position={[0, 4.2, 0.28]}>
          <boxGeometry args={[7.2, 0.06, 0.06]} />
          <meshBasicMaterial color="#9D00FF" />
        </mesh>

        {/* 3D Gate Inscription */}
        <Text
          position={[0, 3.4, 0]}
          fontSize={0.28}
          color="#F8ECFF"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          LKG // ST. JOSEPH MATRICULATION
        </Text>
        <Text
          position={[0, 2.9, 0]}
          fontSize={0.14}
          color="#A89BB9"
          letterSpacing={0.15}
          anchorX="center"
          anchorY="middle"
        >
          EARLY ROOTS · KOVILPATTI
        </Text>
      </group>

      {/* ================= EASTER EGG IN THE FOG: CAT EYES ================= */}
      <group ref={catMeshRef} position={[-6.5, 1.6, -58]} rotation={[0, 0.4, 0]}>
        {/* Left Curved Violet Eye */}
        <mesh position={[-0.3, 0, 0]} rotation={[0, 0, 0.2]}>
          <torusGeometry args={[0.15, 0.04, 8, 16, Math.PI * 0.9]} />
          <meshBasicMaterial color="#D147FF" />
        </mesh>
        {/* Right Curved Violet Eye */}
        <mesh position={[0.3, 0, 0]} rotation={[0, 0, -0.2]}>
          <torusGeometry args={[0.15, 0.04, 8, 16, Math.PI * 0.9]} />
          <meshBasicMaterial color="#D147FF" />
        </mesh>
        <pointLight ref={catEyeGlowRef} color="#D147FF" intensity={1.8} distance={5} />
      </group>

      {/* ================= GATE 2: BOAZ SCHOOL ================= */}
      <group position={[0, 0, -65]}>
        <mesh position={[-3.5, 1.2, 0]}>
          <boxGeometry args={[0.5, 6, 0.5]} />
          <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[3.5, 1.2, 0]}>
          <boxGeometry args={[0.5, 6, 0.5]} />
          <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, 4.2, 0]}>
          <boxGeometry args={[7.5, 0.4, 0.5]} />
          <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, 4.2, 0.28]}>
          <boxGeometry args={[7.2, 0.06, 0.06]} />
          <meshBasicMaterial color="#D147FF" />
        </mesh>

        <Text
          position={[0, 3.4, 0]}
          fontSize={0.28}
          color="#F8ECFF"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          UKG // BOAZ SCHOOL
        </Text>
        <Text
          position={[0, 2.9, 0]}
          fontSize={0.14}
          color="#A89BB9"
          letterSpacing={0.15}
          anchorX="center"
          anchorY="middle"
        >
          TRANSITION TO CHENNAI
        </Text>
      </group>

      {/* ================= GATE 3: ZION MATRICULATION (85%+) ================= */}
      <group position={[0, 0, -80]}>
        <mesh position={[-3.5, 1.2, 0]}>
          <boxGeometry args={[0.5, 6, 0.5]} />
          <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[3.5, 1.2, 0]}>
          <boxGeometry args={[0.5, 6, 0.5]} />
          <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, 4.2, 0]}>
          <boxGeometry args={[7.5, 0.4, 0.5]} />
          <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, 4.2, 0.28]}>
          <boxGeometry args={[7.2, 0.06, 0.06]} />
          <meshBasicMaterial color="#F8ECFF" />
        </mesh>

        <Text
          position={[0, 3.4, 0]}
          fontSize={0.32}
          color="#F8ECFF"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          STD I – XII // ZION MATRICULATION
        </Text>

        {/* Laser-Sharp Violet Horizon Line with 85%+ */}
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[14, 0.04, 0.04]} />
          <meshBasicMaterial color="#D147FF" />
        </mesh>
        <Text
          position={[0, 1.9, 0]}
          fontSize={0.45}
          color="#D147FF"
          letterSpacing={0.25}
          anchorX="center"
          anchorY="middle"
        >
          85%+ CONSISTENT
        </Text>
      </group>
    </group>
  );
};
