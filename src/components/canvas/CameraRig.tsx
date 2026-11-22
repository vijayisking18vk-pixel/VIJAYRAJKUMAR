import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  scrollProgress: number; // 0.0 to 1.0
  mouse: { x: number; y: number };
}

export const CameraRig: React.FC<CameraRigProps> = ({ scrollProgress, mouse }) => {
  const { camera } = useThree();
  const currentProgress = useRef(0);
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // 1. Camera Spatial Flight Spline
  const cameraSpline = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0, 12),       // Ch 0: The Awakening
      new THREE.Vector3(0, 0.8, 4),      // Ch 0 -> Ch 1 transition
      new THREE.Vector3(0, 1.2, -10),    // Ch 1: Stoic Void (Monolith at -20)
      new THREE.Vector3(0, 1.0, -45),    // Ch 2: Gate 1 (St. Joseph)
      new THREE.Vector3(0, 1.0, -65),    // Ch 2: Gate 2 (Boaz)
      new THREE.Vector3(0, 1.0, -80),    // Ch 2: Gate 3 (Zion 85%+)
      new THREE.Vector3(1.5, -0.6, -110),// Ch 3: 2020 Fracture Vortex (Dutch tilt)
      new THREE.Vector3(-0.5, 0.2, -130),// Ch 3 exit
      new THREE.Vector3(0, 7.5, -160),   // Ch 4A: Swoop up into Air Force Wings (Wings at -175)
      new THREE.Vector3(0, -5.0, -195),  // Ch 4B: Plunge down into 70% Debarred Shaft (Gauge at -210)
      new THREE.Vector3(0, 0, -235),     // Ch 5: Emerge into The Remaining Five (Pentagon at -255)
      new THREE.Vector3(0, 2.0, -285),   // Ch 6: The Citadel at 21 Arena (Portals at -305)
      new THREE.Vector3(0, 0.5, -335),   // Ch 7: The Horizon Signal (Halo at -350)
      new THREE.Vector3(0, 0.5, -345),   // Ch 7 finale resting point
    ];
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);
  }, []);

  // 2. Parallel Camera LookAt Target Spline
  const lookAtSpline = useMemo(() => {
    const targets = [
      new THREE.Vector3(0, 0, 8),        // Ch 0: Look at glowing eyes
      new THREE.Vector3(0, 0.8, -2),     // Ch 0 -> 1
      new THREE.Vector3(0, 1.5, -20),    // Ch 1: Center of Monolith & Halo
      new THREE.Vector3(0, 1.2, -55),    // Ch 2: Gate 1
      new THREE.Vector3(0, 1.2, -75),    // Ch 2: Gate 2 & 3
      new THREE.Vector3(0, 1.2, -90),    // Ch 2: Zion 85%+ Horizon
      new THREE.Vector3(0, 0, -125),     // Ch 3: Fractured DNA center
      new THREE.Vector3(0, 2.0, -145),   // Ch 3 exit
      new THREE.Vector3(0, 6.5, -175),   // Ch 4A: Backlit Storm Wings
      new THREE.Vector3(0, -4.5, -210),  // Ch 4B: 70% Debarred Gauge & 5 Pillars
      new THREE.Vector3(0, 0, -255),     // Ch 5: Central Reassembled Crown & 5 Stars
      new THREE.Vector3(0, 1.8, -305),   // Ch 6: Center of 4 Venture Portals
      new THREE.Vector3(0, 0.8, -350),   // Ch 7: Stoic Halo & Eyes
      new THREE.Vector3(0, 0.8, -355),   // Ch 7 finale
    ];
    return new THREE.CatmullRomCurve3(targets, false, 'catmullrom', 0.4);
  }, []);

  useFrame((state, delta) => {
    // Smooth dampening of scroll progress t
    currentProgress.current = THREE.MathUtils.damp(
      currentProgress.current,
      scrollProgress,
      4.5,
      delta
    );

    const t = THREE.MathUtils.clamp(currentProgress.current, 0, 1);

    // Get interpolated camera position and lookAt on the splines
    const targetPos = cameraSpline.getPointAt(t);
    const targetLook = lookAtSpline.getPointAt(t);

    // Pointer Parallax (±0.45 X/Y damped offset)
    const parallaxX = mouse.x * 0.45;
    const parallaxY = mouse.y * 0.35;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.x + parallaxX, 5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.y + parallaxY, 5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.z, 6, delta);

    lookAtTarget.current.x = THREE.MathUtils.damp(lookAtTarget.current.x, targetLook.x + parallaxX * 0.4, 6, delta);
    lookAtTarget.current.y = THREE.MathUtils.damp(lookAtTarget.current.y, targetLook.y + parallaxY * 0.4, 6, delta);
    lookAtTarget.current.z = THREE.MathUtils.damp(lookAtTarget.current.z, targetLook.z, 6, delta);

    camera.lookAt(lookAtTarget.current);

    // Dutch tilt roll during Chapter 3 (t = 0.30 -> 0.45) & turns
    let bankRoll = 0;
    if (t > 0.28 && t < 0.46) {
      // Dutch tilt roll representing academic fracture
      bankRoll = Math.sin((t - 0.28) / (0.46 - 0.28) * Math.PI) * 0.08;
    }
    camera.rotation.z += bankRoll;
  });

  return null;
};
