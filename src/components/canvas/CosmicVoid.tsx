import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { nebulaVertexShader, nebulaFragmentShader } from '../shaders/plasmaShader';

interface CosmicVoidProps {
  scrollProgress: number;
  mouse: { x: number; y: number };
}

export const CosmicVoid: React.FC<CosmicVoidProps> = ({ scrollProgress, mouse }) => {
  const starsRef = useRef<THREE.Points>(null);
  const nebula1Ref = useRef<THREE.ShaderMaterial>(null);
  const nebula2Ref = useRef<THREE.ShaderMaterial>(null);
  const fiveNodesRef = useRef<THREE.Group>(null);

  // Generate 3,200 cosmic stars with randomized positions, colors, and pulse speeds
  const { positions, colors, sizes } = useMemo(() => {
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 900 : 3200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const cWhite = new THREE.Color('#F8ECFF');
    const cViolet = new THREE.Color('#9D00FF');
    const cMagenta = new THREE.Color('#D147FF');
    const cAbyss = new THREE.Color('#4B009E');

    for (let i = 0; i < count; i++) {
      // Spherical distribution around camera
      const r = 10 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Color distribution (mostly white/violet with magenta highlights)
      const rand = Math.random();
      let chosenColor = cWhite;
      if (rand < 0.35) chosenColor = cViolet;
      else if (rand < 0.6) chosenColor = cMagenta;
      else if (rand < 0.75) chosenColor = cAbyss;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      sz[i] = 1.2 + Math.random() * 2.8;
    }

    return {
      positions: pos,
      colors: col,
      sizes: sz,
    };
  }, []);

  // 5 Orbital Nodes configuration for Act V ("The Remaining Five")
  const fiveNodes = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      nodes.push({
        radius: 3.2,
        baseAngle: angle,
        speed: 0.4 + (i % 2) * 0.2,
        heightOffset: (i - 2) * 0.45,
      });
    }
    return nodes;
  }, []);

  // Nebula Shader Uniforms
  const nebula1Uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorBase: { value: new THREE.Color('#0B011A') },
      uColorHighlight: { value: new THREE.Color('#4B009E') },
      uOpacity: { value: 0.38 },
    }),
    []
  );

  const nebula2Uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorBase: { value: new THREE.Color('#4B009E') },
      uColorHighlight: { value: new THREE.Color('#9D00FF') },
      uOpacity: { value: 0.28 },
    }),
    []
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate and twinkle starfield
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.015 + mouse.x * 0.05;
      starsRef.current.rotation.x = time * 0.008 + mouse.y * 0.05;
    }

    // Update nebula shader time
    if (nebula1Ref.current) nebula1Ref.current.uniforms.uTime.value = time;
    if (nebula2Ref.current) nebula2Ref.current.uniforms.uTime.value = time + 10.0;

    // Act V Five Nodes Animation (active around scrollProgress 0.65 - 0.85)
    if (fiveNodesRef.current) {
      const isActV = scrollProgress >= 0.65 && scrollProgress <= 0.88;
      const targetScale = isActV ? 1.0 : 0.001;
      fiveNodesRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

      fiveNodesRef.current.children.forEach((child, i) => {
        const node = fiveNodes[i];
        if (!node) return;
        const currentAngle = node.baseAngle + time * node.speed;
        child.position.x = Math.cos(currentAngle) * node.radius;
        child.position.z = Math.sin(currentAngle) * node.radius;
        child.position.y = node.heightOffset + Math.sin(time * 2.0 + i) * 0.25;
      });
    }
  });

  return (
    <group>
      {/* 1. Deep Cosmic Starfield */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors={true}
          transparent={true}
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 2. Soft Volumetric Ultraviolet Storm Clouds (Nebulae) */}
      <mesh position={[0, 0, -8]} scale={[26, 18, 1]}>
        <planeGeometry args={[1, 1, 16, 16]} />
        <shaderMaterial
          ref={nebula1Ref}
          vertexShader={nebulaVertexShader}
          fragmentShader={nebulaFragmentShader}
          uniforms={nebula1Uniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[2, -1, -5]} scale={[22, 14, 1]} rotation={[0, 0, Math.PI / 6]}>
        <planeGeometry args={[1, 1, 16, 16]} />
        <shaderMaterial
          ref={nebula2Ref}
          vertexShader={nebulaVertexShader}
          fragmentShader={nebulaFragmentShader}
          uniforms={nebula2Uniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. The Remaining Five (Act V Constellation Orbiters) */}
      <group ref={fiveNodesRef} scale={[0.001, 0.001, 0.001]}>
        {fiveNodes.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial
              color="#F8ECFF"
              emissive="#9D00FF"
              emissiveIntensity={6.0}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
