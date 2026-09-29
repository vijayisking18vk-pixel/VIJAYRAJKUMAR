import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
export function DistrictSun({ isMobile }) {
  const light = useRef(),
    last = useRef(Infinity),
    target = useMemo(() => new THREE.Object3D(), []);
  const { gl } = useThree();
  useEffect(() => {
    const original = gl.shadowMap.autoUpdate;
    gl.shadowMap.autoUpdate = false;
    gl.shadowMap.needsUpdate = true;
    return () => {
      gl.shadowMap.autoUpdate = original;
    };
  }, [gl]);
  useFrame(({ camera }) => {
    const z = camera.position.z - 22;
    if (Math.abs(z - last.current) < 0.65) return;
    last.current = z;
    light.current.position.set(-38, 34, z + 30);
    target.position.set(0, 0, z);
    target.updateMatrixWorld();
    if (!isMobile) gl.shadowMap.needsUpdate = true;
  });
  return (
    <>
      <primitive object={target} />
      <directionalLight
        ref={light}
        target={target}
        position={[-34, 48, 30]}
        intensity={2.8}
        color="#ffe0ae"
        castShadow={!isMobile}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-43}
        shadow-camera-right={43}
        shadow-camera-top={43}
        shadow-camera-bottom={-43}
        shadow-camera-near={1}
        shadow-camera-far={140}
        shadow-bias={-0.0004}
        shadow-normalBias={0.045}
        shadow-radius={3}
      />
    </>
  );
}
export function AdaptiveResolution({ dpr, onChange, isMobile }) {
  const sample = useRef({ sum: 0, count: 0, cooldown: 0 });
  useFrame((state, delta) => {
    if (delta > 0.15 || delta <= 0) return;
    const s = sample.current;
    if (state.clock.elapsedTime < s.cooldown) return;
    s.sum += delta;
    s.count++;
    if (s.count < 90) return;
    const average = s.sum / s.count;
    s.sum = s.count = 0;
    s.cooldown = state.clock.elapsedTime + 8;
    const floor = isMobile ? 0.8 : 1;
    if (average > 1 / 38 && dpr > floor)
      onChange(Math.max(floor, Math.round((dpr - 0.2) * 100) / 100));
  });
  return null;
}
export function ReducedMotionInvalidation() {
  const { invalidate } = useThree();
  useEffect(() => {
    const update = () => invalidate();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [invalidate]);
  return null;
}
