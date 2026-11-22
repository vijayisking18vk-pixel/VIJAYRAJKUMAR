import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { globalScroll } from '../../stores/scrollStore';

interface CameraRigProps {
  scrollProgress?: number;
  mouse?: { x: number; y: number };
}

export const CameraRig: React.FC<CameraRigProps> = () => {
  const { camera } = useThree();
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  // 1. Camera Spatial Flight Spline
  const cameraSpline = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0, 12),        // Ch 0: The Awakening (eyes at z = 7)
      new THREE.Vector3(0, 0.6, 3.5),     // Ch 0 -> Ch 1 transition
      new THREE.Vector3(0, 1.4, -10),     // Ch 1: Stoic Void approach
      new THREE.Vector3(0, 2.4, -17.5),   // Ch 1: Stoic Void cinematic overlook (monolith is at [0, 1.2, -20])
      new THREE.Vector3(0, 1.8, -30),     // Ch 1 -> Ch 2 flyover
      new THREE.Vector3(0, 1.2, -45),     // Ch 2: Gate 1 (St. Joseph)
      new THREE.Vector3(0, 1.2, -65),     // Ch 2: Gate 2 (Boaz)
      new THREE.Vector3(0, 1.2, -80),     // Ch 2: Gate 3 (Zion 85%+)
      new THREE.Vector3(1.2, -0.3, -110), // Ch 3: 2020 Fracture Vortex
      new THREE.Vector3(-0.4, 0.4, -135), // Ch 3 exit
      new THREE.Vector3(0, 6.2, -165),    // Ch 4A: Storm Wings (wings at -175)
      new THREE.Vector3(0, -1.6, -195),   // Ch 4B: 70% Debarred Gauge (gauge at -210, y = -1.6)
      new THREE.Vector3(0, 0.6, -238),    // Ch 5: The Remaining Five (pentagon at -255)
      new THREE.Vector3(0, 1.8, -288),    // Ch 6: The Citadel at 21 Arena (portals at -305)
      new THREE.Vector3(0, 0.6, -338),    // Ch 7: The Horizon Signal (halo at -350)
      new THREE.Vector3(0, 0.6, -345),    // Ch 7 finale resting point
    ];
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);
  }, []);

  // 2. Parallel Camera LookAt Target Spline
  const lookAtSpline = useMemo(() => {
    const targets = [
      new THREE.Vector3(0, 0, 7),         // Ch 0: Look directly into glowing fractal eyes
      new THREE.Vector3(0, 0.8, -3),      // Ch 0 -> 1
      new THREE.Vector3(0, 1.2, -20),     // Ch 1: Center of Monolith & Halo
      new THREE.Vector3(0, 1.2, -20),     // Ch 1: Keep looking at monolith as camera glides above
      new THREE.Vector3(0, 1.2, -40),     // Ch 1 -> 2
      new THREE.Vector3(0, 1.2, -55),     // Ch 2: Gate 1
      new THREE.Vector3(0, 1.2, -75),     // Ch 2: Gate 2 & 3
      new THREE.Vector3(0, 1.2, -88),     // Ch 2: Zion 85%+ Horizon
      new THREE.Vector3(0, 0, -125),      // Ch 3: Fractured DNA center
      new THREE.Vector3(0, 2.0, -145),    // Ch 3 exit
      new THREE.Vector3(0, 6.0, -175),    // Ch 4A: Backlit Storm Wings
      new THREE.Vector3(0, -1.6, -210),   // Ch 4B: 70% Debarred Gauge & Pillars
      new THREE.Vector3(0, 0.2, -255),    // Ch 5: Central Reassembled Crown & 5 Stars
      new THREE.Vector3(0, 1.8, -305),    // Ch 6: Center of 4 Venture Portals
      new THREE.Vector3(0, 0.8, -350),    // Ch 7: Stoic Halo & Eyes
      new THREE.Vector3(0, 0.8, -355),    // Ch 7 finale
    ];
    return new THREE.CatmullRomCurve3(targets, false, 'catmullrom', 0.4);
  }, []);

  useFrame((state, delta) => {
    // 1. Advance normalized scroll physics smoothly inside WebGL frame
    const t = globalScroll.updateDamped(delta);

    // 2. Sample camera position and lookAt along the flight splines
    const targetPos = cameraSpline.getPointAt(t);
    const targetLook = lookAtSpline.getPointAt(t);

    // 3. Native pointer parallax (-1 to 1) from R3F state
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;
    const parallaxX = pointerX * 0.4;
    const parallaxY = pointerY * 0.3;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.x + parallaxX, 6.0, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.y + parallaxY, 6.0, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.z, 6.0, delta);

    lookAtTarget.current.x = THREE.MathUtils.damp(lookAtTarget.current.x, targetLook.x + parallaxX * 0.35, 6.0, delta);
    lookAtTarget.current.y = THREE.MathUtils.damp(lookAtTarget.current.y, targetLook.y + parallaxY * 0.35, 6.0, delta);
    lookAtTarget.current.z = THREE.MathUtils.damp(lookAtTarget.current.z, targetLook.z, 6.0, delta);

    camera.lookAt(lookAtTarget.current);

    // 4. Subtle Dutch tilt roll during Chapter 3 (t = 0.30 -> 0.46)
    let bankRoll = 0;
    if (t > 0.30 && t < 0.46) {
      bankRoll = Math.sin(((t - 0.30) / 0.16) * Math.PI) * 0.08;
    }
    camera.rotation.z += bankRoll;
  });

  return null;
};
