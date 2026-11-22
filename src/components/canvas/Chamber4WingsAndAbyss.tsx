import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { StormCloudShader } from '../shaders/stormCloud';
import { globalScroll } from '../../stores/scrollStore';

interface Chamber4WingsAndAbyssProps {
  scrollProgress?: number;
}

export const Chamber4WingsAndAbyss: React.FC<Chamber4WingsAndAbyssProps> = () => {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);
  const stormShaderRef = useRef<THREE.ShaderMaterial>(null);

  const stormUniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uColorDeep: { value: new THREE.Color('#070112') },
      uColorViolet: { value: new THREE.Color('#4B009E') },
      uColorPlasma: { value: new THREE.Color('#9D00FF') },
      uColorLightning: { value: new THREE.Color('#F8ECFF') },
      uLightningFlash: { value: 0.0 },
    };
  }, []);

  useFrame((state) => {
    const t = globalScroll.current;
    const isVisible = t > 0.45 && t <= 0.66;

    if (groupRef.current) {
      groupRef.current.visible = isVisible;
    }
    if (!isVisible) return;

    // Animate storm clouds
    if (stormShaderRef.current) {
      stormShaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      const flash = Math.random() > 0.96 ? 1.0 : 0.0;
      stormShaderRef.current.uniforms.uLightningFlash.value = flash;
    }

    // Wings breathing flap
    if (leftWingRef.current && rightWingRef.current) {
      const flap = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
      leftWingRef.current.rotation.z = -0.3 + flap;
      rightWingRef.current.rotation.z = 0.3 - flap;
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* ================= ACT 4A: THE SPARK — BACKLIT STORM WINGS (Z = -175, Y = 6.0) ================= */}
      <group position={[0, 6.0, -175]}>
        {/* Backlit Storm Cloud Plane */}
        <mesh position={[0, 0, -2.5]}>
          <planeGeometry args={[35, 20]} />
          <shaderMaterial
            ref={stormShaderRef}
            vertexShader={StormCloudShader.vertexShader}
            fragmentShader={StormCloudShader.fragmentShader}
            uniforms={stormUniforms}
            transparent={true}
            depthWrite={false}
          />
        </mesh>

        {/* Spread Obsidian Wings Centerpiece */}
        <group ref={leftWingRef} position={[-0.8, 0, 0]}>
          <mesh position={[-2.5, 1.2, 0]} rotation={[0, 0, 0.4]}>
            <coneGeometry args={[0.5, 5.0, 4]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[-4.2, 0.4, 0]} rotation={[0, 0, 0.7]}>
            <coneGeometry args={[0.4, 4.2, 4]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[-5.4, -0.6, 0]} rotation={[0, 0, 1.0]}>
            <coneGeometry args={[0.3, 3.2, 4]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>

        <group ref={rightWingRef} position={[0.8, 0, 0]}>
          <mesh position={[2.5, 1.2, 0]} rotation={[0, 0, -0.4]}>
            <coneGeometry args={[0.5, 5.0, 4]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[4.2, 0.4, 0]} rotation={[0, 0, -0.7]}>
            <coneGeometry args={[0.4, 4.2, 4]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[5.4, -0.6, 0]} rotation={[0, 0, -1.0]}>
            <coneGeometry args={[0.3, 3.2, 4]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>

        {/* Floating 3D Text: AIR FORCE ECHOES */}
        <Text
          position={[0, 4.2, 1.0]}
          fontSize={0.48}
          color="#F8ECFF"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          AIR FORCE ECHOES
        </Text>
        <Text
          position={[0, 3.5, 1.0]}
          fontSize={0.24}
          color="#D147FF"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          B.SC. DEFENCE & STRATEGIC STUDIES · SRMIST KTR
        </Text>
      </group>

      {/* ================= ACT 4B: THE 70% DEBARRED GAUGE & 5 PILLARS (Z = -210, Y = -1.6) ================= */}
      <group position={[0, -1.6, -210]}>
        {/* Telemetry Tunnel Rings */}
        {[-8, -4, 0, 4].map((offsetZ) => (
          <mesh key={offsetZ} position={[0, 0.8, offsetZ]}>
            <torusGeometry args={[5.2, 0.05, 8, 32]} />
            <meshBasicMaterial color="#FF1E56" opacity={0.35} transparent={true} />
          </mesh>
        ))}

        {/* 3D Holographic Attendance Gauge - Lifted to clear subtitles */}
        <group position={[0, 1.2, 0]}>
          <mesh>
            <torusGeometry args={[2.6, 0.06, 16, 64]} />
            <meshStandardMaterial color="#4B009E" />
          </mesh>

          {/* 70% Attendance Arc */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[2.45, 0.13, 16, 64, Math.PI * 2 * 0.70]} />
            <meshBasicMaterial color="#FF1E56" />
          </mesh>

          {/* Large Center Readout: 70% */}
          <Text
            position={[0, 0.45, 0.2]}
            fontSize={0.8}
            color="#FF1E56"
            letterSpacing={0.1}
            anchorX="center"
            anchorY="middle"
          >
            70%
          </Text>

          <Text
            position={[0, -0.2, 0.2]}
            fontSize={0.17}
            color="#A89BB9"
            letterSpacing={0.15}
            anchorX="center"
            anchorY="middle"
          >
            REQUIRED: 75% ATTENDANCE
          </Text>

          <Text
            position={[0, -0.7, 0.2]}
            fontSize={0.38}
            color="#FF1E56"
            letterSpacing={0.25}
            anchorX="center"
            anchorY="middle"
          >
            STATUS: DEBARRED
          </Text>
        </group>

        {/* 5 Cracked Obsidian Pillars (3-Year Degree cracking to 5 Years) */}
        <group position={[0, -1.8, 0]}>
          {[-4, -2, 0, 2, 4].map((x, i) => (
            <group key={i} position={[x, 0, 0]}>
              <mesh position={[0, 0.9, 0]} rotation={[0, i * 0.3, 0]}>
                <boxGeometry args={[0.6, 1.8, 0.6]} />
                <meshStandardMaterial
                  color="#070112"
                  roughness={0.4}
                  metalness={0.8}
                  emissive={i >= 3 ? '#FF1E56' : '#9D00FF'}
                  emissiveIntensity={0.2}
                />
              </mesh>
              <Text
                position={[0, -0.25, 0.35]}
                fontSize={0.15}
                color={i >= 3 ? '#FF1E56' : '#A89BB9'}
                anchorX="center"
                anchorY="middle"
              >
                YR 0{i + 1}
              </Text>
            </group>
          ))}

          {/* Floating Duration Conversion Inscription */}
          <Text
            position={[0, 2.5, 0.5]}
            fontSize={0.24}
            color="#F8ECFF"
            letterSpacing={0.2}
            anchorX="center"
            anchorY="middle"
          >
            3-YEAR DEGREE ➔ 5 YEARS EXTENDED
          </Text>
        </group>
      </group>
    </group>
  );
};
