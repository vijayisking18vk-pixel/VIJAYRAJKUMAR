import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { globalScroll } from '../../stores/scrollStore';

interface Chamber6CitadelPortalsProps {
  scrollProgress?: number;
  onPortalClick?: (url: string | null) => void;
  onPortalHover?: (name: string | null) => void;
}

export const Chamber6CitadelPortals: React.FC<Chamber6CitadelPortalsProps> = ({
  onPortalClick,
  onPortalHover,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null);

  // Portal Refs
  const daasRef = useRef<THREE.Group>(null);
  const crentsRef = useRef<THREE.Group>(null);
  const schlossRef = useRef<THREE.Group>(null);
  const distRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = globalScroll.current;
    const isVisible = t > 0.78 && t <= 0.93;

    if (groupRef.current) {
      groupRef.current.visible = isVisible;
    }
    if (!isVisible) return;

    // 1. Daas Media Prism Lens rotation
    if (daasRef.current) {
      const speed = hoveredPortal === 'daas' ? 1.5 : 0.4;
      daasRef.current.rotation.y += delta * speed;
      daasRef.current.position.y = 1.6 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }

    // 2. Chennai Rents Monolith Tower float
    if (crentsRef.current) {
      const speed = hoveredPortal === 'crents' ? 1.2 : 0.3;
      crentsRef.current.rotation.y += delta * speed;
      crentsRef.current.position.y = 1.6 + Math.cos(state.clock.elapsedTime * 1.4) * 0.15;
    }

    // 3. Schloss Living Archway float
    if (schlossRef.current) {
      const speed = hoveredPortal === 'schloss' ? 1.0 : 0.25;
      schlossRef.current.rotation.y += delta * speed;
      schlossRef.current.position.y = 1.6 + Math.sin(state.clock.elapsedTime * 1.6 + 1) * 0.15;
    }

    // 4. Distribution Gyro Rings
    if (distRef.current) {
      const speed = hoveredPortal === 'dist' ? 2.0 : 0.6;
      distRef.current.children.forEach((ring, i) => {
        ring.rotation.x += delta * speed * (i % 2 === 0 ? 1 : -1);
        ring.rotation.y += delta * speed * 0.8;
      });
      distRef.current.position.y = 1.6 + Math.cos(state.clock.elapsedTime * 1.3) * 0.15;
    }
  });

  const handlePointerOver = (name: string) => {
    setHoveredPortal(name);
    onPortalHover?.(name);
  };

  const handlePointerOut = () => {
    setHoveredPortal(null);
    onPortalHover?.(null);
  };

  const handleClick = (url: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    onPortalClick?.(url);
  };

  return (
    <group ref={groupRef} position={[0, 0, -305]} visible={false}>
      {/* 1. Grand Obsidian Arena Floor (High Specular MeshStandard - 120 FPS performance) */}
      <mesh position={[0, -2.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[25, 48]} />
        <meshStandardMaterial
          color="#070112"
          roughness={0.12}
          metalness={0.92}
        />
      </mesh>

      {/* Surrounding Stoic Pillars */}
      {[-13, -8.5, 8.5, 13].map((x, i) => (
        <mesh key={i} position={[x, 1.2, -6]}>
          <boxGeometry args={[0.8, 8, 0.8]} />
          <meshStandardMaterial color="#070112" roughness={0.3} metalness={0.9} />
        </mesh>
      ))}

      {/* ================= PORTAL 1: DAAS MEDIA (X = -7.6, Z = 0) ================= */}
      <group
        position={[-7.6, 0, 0]}
        onPointerOver={() => handlePointerOver('daas')}
        onPointerOut={handlePointerOut}
        onClick={() => handleClick('https://daas.media/')}
      >
        <group ref={daasRef}>
          <mesh>
            <octahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial
              color="#070112"
              emissive="#9D00FF"
              emissiveIntensity={hoveredPortal === 'daas' ? 3.5 : 1.2}
              roughness={0.1}
              metalness={0.95}
            />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.5, 0.04, 16, 32]} />
            <meshBasicMaterial color="#D147FF" />
          </mesh>
        </group>

        <Text
          position={[0, 3.4, 0]}
          fontSize={0.3}
          color="#F8ECFF"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          DAAS MEDIA
        </Text>
        <Text
          position={[0, 2.9, 0]}
          fontSize={0.16}
          color="#D147FF"
          letterSpacing={0.15}
          anchorX="center"
          anchorY="middle"
        >
          CEO // BRAND & MEDIA
        </Text>
      </group>

      {/* ================= PORTAL 2: CHENNAI RENTS (X = -2.6, Z = 1.2) ================= */}
      <group
        position={[-2.6, 0, 1.2]}
        onPointerOver={() => handlePointerOver('crents')}
        onPointerOut={handlePointerOut}
        onClick={() => handleClick('https://www.chennairents.in/')}
      >
        <group ref={crentsRef}>
          <mesh>
            <boxGeometry args={[1.1, 2.6, 1.1]} />
            <meshStandardMaterial
              color="#070112"
              emissive="#D147FF"
              emissiveIntensity={hoveredPortal === 'crents' ? 3.0 : 1.0}
              roughness={0.05}
              metalness={0.9}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.12, 2.62, 1.12)]} />
            <lineBasicMaterial color="#F8ECFF" />
          </lineSegments>
        </group>

        <Text
          position={[0, 3.4, 0]}
          fontSize={0.3}
          color="#F8ECFF"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          CHENNAI RENTS
        </Text>
        <Text
          position={[0, 2.9, 0]}
          fontSize={0.16}
          color="#D147FF"
          letterSpacing={0.15}
          anchorX="center"
          anchorY="middle"
        >
          CEO // LOCALITY PLATFORM
        </Text>
      </group>

      {/* ================= PORTAL 3: SCHLOSS LIVING (X = 2.6, Z = 1.2) ================= */}
      <group
        position={[2.6, 0, 1.2]}
        onPointerOver={() => handlePointerOver('schloss')}
        onPointerOut={handlePointerOut}
        onClick={() => handleClick('https://www.schloss.living/')}
      >
        <group ref={schlossRef}>
          <mesh position={[-0.6, 0, 0]}>
            <boxGeometry args={[0.3, 2.4, 0.5]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0.6, 0, 0]}>
            <boxGeometry args={[0.3, 2.4, 0.5]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 1.3, 0]}>
            <boxGeometry args={[1.5, 0.3, 0.5]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[1.1, 2.3]} />
            <meshBasicMaterial
              color={hoveredPortal === 'schloss' ? '#D147FF' : '#4B009E'}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        <Text
          position={[0, 3.4, 0]}
          fontSize={0.3}
          color="#F8ECFF"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          SCHLOSS LIVING
        </Text>
        <Text
          position={[0, 2.9, 0]}
          fontSize={0.16}
          color="#D147FF"
          letterSpacing={0.15}
          anchorX="center"
          anchorY="middle"
        >
          CEO // BOUTIQUE STAYS
        </Text>
      </group>

      {/* ================= PORTAL 4: DISTRIBUTION (X = 7.6, Z = 0) ================= */}
      <group
        position={[7.6, 0, 0]}
        onPointerOver={() => handlePointerOver('dist')}
        onPointerOut={handlePointerOut}
        onClick={() => handleClick(null)}
      >
        <group ref={distRef}>
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[1.2, 0.05, 16, 32]} />
            <meshBasicMaterial color="#9D00FF" />
          </mesh>
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[1.35, 0.05, 16, 32]} />
            <meshBasicMaterial color="#D147FF" />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, Math.PI / 3]}>
            <torusGeometry args={[1.5, 0.05, 16, 32]} />
            <meshBasicMaterial color="#F8ECFF" />
          </mesh>
        </group>

        <Text
          position={[0, 3.4, 0]}
          fontSize={0.3}
          color="#F8ECFF"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          DISTRIBUTION & SUPPLY
        </Text>
        <Text
          position={[0, 2.9, 0]}
          fontSize={0.16}
          color="#D147FF"
          letterSpacing={0.15}
          anchorX="center"
          anchorY="middle"
        >
          OPERATIONS // COMMERCE
        </Text>
      </group>
    </group>
  );
};
