import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { StormCloudShader } from '../shaders/stormCloud';

interface Chamber4WingsAndAbyssProps {
  scrollProgress: number;
}

export const Chamber4WingsAndAbyss: React.FC<Chamber4WingsAndAbyssProps> = ({ scrollProgress }) => {
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);
  const gaugeArcRef = useRef<THREE.Mesh>(null);
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

  useFrame((state, delta) => {
    // Animate storm clouds
    if (stormShaderRef.current) {
      stormShaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Random lightning flash
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

  if (scrollProgress < 0.40 || scrollProgress > 0.72) return null;

  return (
    <group>
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
        {/* Left Wing Group */}
        <group ref={leftWingRef} position={[-0.8, 0, 0]}>
          {/* Feather 1 */}
          <mesh position={[-2.5, 1.2, 0]} rotation={[0, 0, 0.4]}>
            <coneGeometry args={[0.5, 5.0, 4]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Feather 2 */}
          <mesh position={[-4.2, 0.4, 0]} rotation={[0, 0, 0.7]}>
            <coneGeometry args={[0.4, 4.2, 4]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Feather 3 */}
          <mesh position={[-5.4, -0.6, 0]} rotation={[0, 0, 1.0]}>
            <coneGeometry args={[0.3, 3.2, 4]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>

        {/* Right Wing Group */}
        <group ref={rightWingRef} position={[0.8, 0, 0]}>
          {/* Feather 1 */}
          <mesh position={[2.5, 1.2, 0]} rotation={[0, 0, -0.4]}>
            <coneGeometry args={[0.5, 5.0, 4]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Feather 2 */}
          <mesh position={[4.2, 0.4, 0]} rotation={[0, 0, -0.7]}>
            <coneGeometry args={[0.4, 4.2, 4]} />
            <meshStandardMaterial color="#070112" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Feather 3 */}
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
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_al061wqUbewOs.woff"
          color="#D147FF"
          letterSpacing={0.2}
          anchorX="center"
          anchorY="middle"
        >
          B.SC. DEFENCE & STRATEGIC STUDIES · SRMIST KTR
        </Text>
      </group>

      {/* ================= ACT 4B: THE 70% DEBARRED GAUGE & 5 PILLARS (Z = -210, Y = -4.5) ================= */}
      <group position={[0, -4.5, -210]}>
        {/* Telemetry Tunnel Rings */}
        {[-8, -4, 0, 4].map((offsetZ) => (
          <mesh key={offsetZ} position={[0, 0, offsetZ]} rotation={[0, 0, 0]}>
            <torusGeometry args={[5.2, 0.05, 8, 32]} />
            <meshBasicMaterial color="#FF1E56" opacity={0.35} transparent={true} />
          </mesh>
        ))}

        {/* 3D Holographic Attendance Gauge */}
        <group position={[0, 0, 0]}>
          {/* Gauge Outer Ring Frame */}
          <mesh>
            <torusGeometry args={[3.2, 0.06, 16, 64]} />
            <meshStandardMaterial color="#4B009E" />
          </mesh>

          {/* 70% Attendance Filled Arc (0 to 70% = 0 to 0.70 * 2PI) */}
          <mesh ref={gaugeArcRef} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[3.0, 0.15, 16, 64, Math.PI * 2 * 0.70]} />
            <meshBasicMaterial color="#FF1E56" />
          </mesh>

          {/* 75% Barrier Tick Marker */}
          <group rotation={[0, 0, Math.PI / 2 + Math.PI * 2 * 0.75]}>
            <mesh position={[3.0, 0, 0]}>
              <boxGeometry args={[0.5, 0.15, 0.2]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>

          {/* Large Center Readout: 70% */}
          <Text
            position={[0, 0.6, 0.2]}
            fontSize={0.9}
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_al061wqUbewOs.woff"
            color="#FF1E56"
            letterSpacing={0.1}
            anchorX="center"
            anchorY="middle"
          >
            70%
          </Text>

          {/* Required Badge */}
          <Text
            position={[0, -0.2, 0.2]}
            fontSize={0.2}
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_al061wqUbewOs.woff"
            color="#A89BB9"
            letterSpacing={0.15}
            anchorX="center"
            anchorY="middle"
          >
            REQUIRED: 75% ATTENDANCE
          </Text>

          {/* DEBARRED Stamped Inscription */}
          <Text
            position={[0, -0.85, 0.2]}
            fontSize={0.48}
            color="#FF1E56"
            letterSpacing={0.25}
            anchorX="center"
            anchorY="middle"
          >
            STATUS: DEBARRED
          </Text>
        </group>

        {/* 5 Cracked Obsidian Pillars (3-Year Degree cracking to 5 Years) */}
        <group position={[0, -3.2, 0]}>
          {[-4, -2, 0, 2, 4].map((x, i) => (
            <group key={i} position={[x, 0, 0]}>
              <mesh position={[0, 1.2, 0]} rotation={[0, i * 0.3, 0]}>
                <boxGeometry args={[0.7, 2.5, 0.7]} />
                <meshStandardMaterial
                  color="#070112"
                  roughness={0.4}
                  metalness={0.8}
                  emissive={i >= 3 ? '#FF1E56' : '#9D00FF'}
                  emissiveIntensity={0.2}
                />
              </mesh>
              <Text
                position={[0, -0.4, 0.45]}
                fontSize={0.18}
                font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_al061wqUbewOs.woff"
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
            position={[0, 3.2, 0.5]}
            fontSize={0.28}
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_al061wqUbewOs.woff"
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
