import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { globalScroll } from '../../stores/scrollStore';

interface Chamber3FractureVortexProps {
  scrollProgress?: number;
}

export const Chamber3FractureVortex: React.FC<Chamber3FractureVortexProps> = () => {
  const groupRef = useRef<THREE.Group>(null);
  const shardsMeshRef = useRef<THREE.InstancedMesh>(null);
  const dnaGroupRef = useRef<THREE.Group>(null);
  const glitchCageRef = useRef<THREE.LineSegments>(null);

  // Generate 88 random fractured shard transforms
  const shardCount = 88;
  const shardData = useMemo(() => {
    const temp = [];
    for (let i = 0; i < shardCount; i++) {
      const radius = 2.5 + Math.random() * 6.0;
      const angle = Math.random() * Math.PI * 2;
      const z = -105 - Math.random() * 35; // centered around -125
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotX = Math.random() * Math.PI;
      const rotY = Math.random() * Math.PI;
      const rotZ = Math.random() * Math.PI;
      const scale = 0.2 + Math.random() * 0.6;
      temp.push({ x, y, z, rotX, rotY, rotZ, scale, speed: 0.2 + Math.random() * 0.8 });
    }
    return temp;
  }, []);

  // Procedural DNA Double Helix rungs & strands
  const dnaNodes = useMemo(() => {
    const nodes = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4; // 2 full turns
      const y = (i - count / 2) * 0.35;
      const r = 1.1;
      const x1 = Math.cos(t) * r;
      const z1 = Math.sin(t) * r;
      const x2 = -x1;
      const z2 = -z1;
      nodes.push({ x1, y, z1, x2, z2, key: i });
    }
    return nodes;
  }, []);

  useFrame((state, delta) => {
    const t = globalScroll.current;
    const isVisible = t > 0.30 && t <= 0.46;

    if (groupRef.current) {
      groupRef.current.visible = isVisible;
    }
    if (!isVisible) return;

    if (shardsMeshRef.current) {
      const dummy = new THREE.Object3D();
      shardData.forEach((s, i) => {
        dummy.position.set(
          s.x + Math.sin(state.clock.elapsedTime * s.speed + i) * 0.3,
          s.y + Math.cos(state.clock.elapsedTime * s.speed + i) * 0.3,
          s.z
        );
        dummy.rotation.set(
          s.rotX + state.clock.elapsedTime * 0.3,
          s.rotY + state.clock.elapsedTime * 0.4,
          s.rotZ
        );
        dummy.scale.set(s.scale, s.scale, s.scale);
        dummy.updateMatrix();
        shardsMeshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      shardsMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (dnaGroupRef.current) {
      dnaGroupRef.current.rotation.y += delta * 0.6;
      dnaGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }

    if (glitchCageRef.current) {
      glitchCageRef.current.rotation.x += delta * 0.2;
      glitchCageRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} visible={false}>
      {/* 1. Instanced Mesh of 88 Jagged Obsidian Fracture Shards */}
      <instancedMesh ref={shardsMeshRef} args={[undefined, undefined, shardCount]}>
        <tetrahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#070112"
          roughness={0.1}
          metalness={0.9}
          emissive="#FF1E56"
          emissiveIntensity={0.6}
        />
      </instancedMesh>

      {/* 2. Centerpiece: Twisted Fractured DNA inside Glitch Cage (at Z = -125) */}
      <group position={[0, 0, -125]}>
        {/* Outer Glitch Cage */}
        <lineSegments ref={glitchCageRef}>
          <boxGeometry args={[4.5, 9.0, 4.5]} />
          <lineBasicMaterial color="#FF1E56" opacity={0.75} transparent={true} />
        </lineSegments>

        {/* DNA Helix Group */}
        <group ref={dnaGroupRef}>
          {dnaNodes.map((node) => (
            <group key={node.key}>
              {/* Strand 1 Node */}
              <mesh position={[node.x1, node.y, node.z1]}>
                <sphereGeometry args={[0.12, 8, 8]} />
                <meshBasicMaterial color="#D147FF" />
              </mesh>
              {/* Strand 2 Node */}
              <mesh position={[node.x2, node.y, node.z2]}>
                <sphereGeometry args={[0.12, 8, 8]} />
                <meshBasicMaterial color="#FF1E56" />
              </mesh>
              {/* Rung connector */}
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([node.x1, node.y, node.z1, node.x2, node.y, node.z2])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#9D00FF" opacity={0.8} transparent={true} />
              </line>
            </group>
          ))}
        </group>

        {/* In-World 3D Floating Fragments */}
        <Text
          position={[0, 4.5, 0]}
          fontSize={0.38}
          color="#FF1E56"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          2020 LOCKDOWN // FRACTURED HABITS
        </Text>

        <Text
          position={[-2.8, -3.2, 1.2]}
          fontSize={0.22}
          color="#A89BB9"
          letterSpacing={0.15}
          anchorX="center"
          anchorY="middle"
        >
          ONLINE CLASSES: IGNORED
        </Text>

        <Text
          position={[2.8, -3.6, 1.0]}
          fontSize={0.24}
          color="#D147FF"
          letterSpacing={0.15}
          anchorX="center"
          anchorY="middle"
        >
          BIOLOGY STREAM TRAP
        </Text>
      </group>
    </group>
  );
};
