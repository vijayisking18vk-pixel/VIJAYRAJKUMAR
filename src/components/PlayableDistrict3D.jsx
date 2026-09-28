import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import soundSystem from '../lib/soundSystem';

/**
 * Straight-road layout: landmarks placed sequentially along a single Z-axis road.
 * Each banner is spaced 18 units apart for comfortable walking/viewing distance.
 */
export const DISTRICT_LANDMARKS = [
  {
    id: 'arrival',
    label: 'ARRIVAL STREET',
    chapter: '00 // ARRIVAL',
    title: 'Arrival Street & Identity',
    path: '/',
    pos: [0, 0, 0],
    camPos: [0, 2.2, 8],
    lookAt: [0, 2.0, 0],
    color: '#E7B85A',
    icon: '✦',
    description: 'Central arrival point featuring the Vijayrajkumar official San Andreas artwork billboard.',
    textureUrl: '/images/hero-desktop.webp',
    fallbackUrl: '/images/hero-desktop.jpg',
    bannerLabel: 'ARRIVAL // VIJAYRAJKUMAR',
  },
  {
    id: 'safehouse',
    label: 'THE SAFEHOUSE',
    chapter: '01 // SAFEHOUSE',
    title: 'Biography & Strategic Journey',
    path: '/about/',
    pos: [0, 0, -20],
    camPos: [0, 2.2, -12],
    lookAt: [0, 2.0, -20],
    color: '#E7B85A',
    icon: '■',
    description: 'Operator studio and safehouse. Background in Defence & Strategic Studies, Hindi Literature, and marketplace execution.',
    textureUrl: '/images/gta/about_studio.jpg',
    bannerLabel: 'THE SAFEHOUSE // ABOUT & STRATEGY',
  },
  {
    id: 'operations-garage',
    label: 'OPERATIONS GARAGE',
    chapter: '02 // VENTURES',
    title: 'Ventures & Case Studies',
    path: '/ventures/',
    pos: [0, 0, -40],
    camPos: [0, 2.2, -32],
    lookAt: [0, 2.0, -40],
    color: '#8FADA0',
    icon: '◆',
    description: 'Industrial workshop housing Unfounded (venture studio), Ziggers (gig staffing), and LoopMemory (AI context engine).',
    textureUrl: '/images/gta/ventures_workshop.jpg',
    bannerLabel: 'OPERATIONS GARAGE // VENTURES',
  },
  {
    id: 'poster-wall',
    label: 'THE POSTER WALL',
    chapter: '03 // EVENTS',
    title: 'Events & Public Summits',
    path: '/events/',
    pos: [0, 0, -60],
    camPos: [0, 2.2, -52],
    lookAt: [0, 2.0, -60],
    color: '#D87942',
    icon: '▲',
    description: 'Courtyard poster wall displaying community summits, hackathons, and international forums.',
    textureUrl: '/images/gta/events_gallery.jpg',
    bannerLabel: 'THE POSTER WALL // EVENTS',
  },
  {
    id: 'archive',
    label: 'THE ARCHIVE',
    chapter: '04 // WRITING',
    title: 'Writing & Strategic Research',
    path: '/writing/',
    pos: [0, 0, -80],
    camPos: [0, 2.2, -72],
    lookAt: [0, 2.0, -80],
    color: '#B7C2A8',
    icon: '●',
    description: 'Architectural bookstore and research archive. Deep dives into marketplace mechanics and cognitive memory.',
    textureUrl: '/images/gta/writing_archive.jpg',
    bannerLabel: 'THE ARCHIVE // WRITING & RESEARCH',
  },
  {
    id: 'dispatch-point',
    label: 'DISPATCH POINT',
    chapter: '05 // CONTACT',
    title: 'Contact & Collaboration',
    path: '/contact/',
    pos: [0, 0, -100],
    camPos: [0, 2.2, -92],
    lookAt: [0, 2.0, -100],
    color: '#EDE4C8',
    icon: '✦',
    description: 'Rooftop radio transmission station overlooking the city. Direct contact and founder advisory engagements.',
    textureUrl: '/images/gta/contact_rooftop.jpg',
    bannerLabel: 'DISPATCH POINT // CONTACT',
  },
];

/**
 * Procedural low-poly Fan Palm Tree with subtle wind sway
 */
function PalmTree({ position = [0, 0, 0], scale = 1, rotationY = 0, curveDir = 1, swayOffset = 0 }) {
  const groupRef = useRef();

  const trunkGeo = useMemo(() => {
    const points = [];
    const height = 7 * scale;
    const segments = 10;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = Math.sin(t * Math.PI * 0.5) * 1.2 * curveDir * scale;
      const y = t * height;
      const z = Math.cos(t * Math.PI * 0.5) * 0.3 * scale;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 16, 0.22 * scale, 6, false);
  }, [scale, curveDir]);

  const fronds = useMemo(() => {
    const list = [];
    const count = 9;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const droop = 0.35 + Math.sin(i * 1.5) * 0.15;
      list.push({ angle, droop });
    }
    return list;
  }, []);

  const frondGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.6 * scale, 1.8 * scale, 0, 3.2 * scale);
    shape.quadraticCurveTo(-0.6 * scale, 1.8 * scale, 0, 0);
    return new THREE.ShapeGeometry(shape, 6);
  }, [scale]);

  const silhouetteMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: new THREE.Color('#0A0E0C') }),
    []
  );

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() * 0.8 + swayOffset;
      groupRef.current.rotation.z = Math.sin(t) * 0.025;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
      <mesh geometry={trunkGeo} material={silhouetteMat} />
      <group position={[1.2 * curveDir * scale, 7 * scale, 0.3 * scale]}>
        {fronds.map((f, idx) => (
          <group key={idx} rotation={[0, f.angle, 0]}>
            <mesh
              geometry={frondGeo}
              material={silhouetteMat}
              rotation={[Math.PI * 0.5 + f.droop, 0, 0]}
            />
          </group>
        ))}
      </group>
    </group>
  );
}

/**
 * Flat Artwork Banner — loads a texture and displays it as a flat billboard on the roadside.
 * No buildings, no walls — just a framed image banner standing on the ground.
 */
function RoadsideBanner({
  textureUrl,
  fallbackUrl,
  width = 8,
  height = 4.5,
  position = [0, 0, 0],
  accentColor = '#E7B85A',
  bannerLabel = '',
}) {
  const textureRef = useRef();
  const [textureLoaded, setTextureLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    const loader = new THREE.TextureLoader();

    loader.load(
      textureUrl,
      (tex) => {
        if (!active) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        textureRef.current = tex;
        setTextureLoaded(true);
      },
      undefined,
      () => {
        if (!fallbackUrl) return;
        loader.load(
          fallbackUrl,
          (fallbackTex) => {
            if (!active) return;
            fallbackTex.colorSpace = THREE.SRGBColorSpace;
            textureRef.current = fallbackTex;
            setTextureLoaded(true);
          }
        );
      }
    );

    return () => {
      active = false;
      if (textureRef.current) textureRef.current.dispose();
    };
  }, [textureUrl, fallbackUrl]);

  const frameMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#141615', roughness: 0.85, metalness: 0.4 }),
    []
  );

  const lampGlowMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#FFEBB8' }),
    []
  );

  return (
    <group position={position}>
      {/* Two thin support poles */}
      <mesh position={[-width * 0.42, height * 0.35, -0.15]} material={frameMat}>
        <cylinderGeometry args={[0.08, 0.12, height * 0.7, 6]} />
      </mesh>
      <mesh position={[width * 0.42, height * 0.35, -0.15]} material={frameMat}>
        <cylinderGeometry args={[0.08, 0.12, height * 0.7, 6]} />
      </mesh>

      {/* Outer frame backing */}
      <mesh position={[0, height * 0.55, 0]} material={frameMat}>
        <boxGeometry args={[width + 0.3, height + 0.3, 0.12]} />
      </mesh>

      {/* Accent border strip */}
      <mesh position={[0, height * 0.55, 0.065]}>
        <planeGeometry args={[width + 0.08, height + 0.08]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* Main artwork image */}
      <mesh position={[0, height * 0.55, 0.07]}>
        <planeGeometry args={[width, height]} />
        {textureLoaded && textureRef.current ? (
          <meshBasicMaterial map={textureRef.current} toneMapped={false} />
        ) : (
          <meshBasicMaterial color="#1A1815" />
        )}
      </mesh>

      {/* Overhead warm spotlights */}
      {[-width * 0.3, width * 0.3].map((x, idx) => (
        <group key={idx} position={[x, height + 0.3, 0.3]}>
          <mesh material={lampGlowMat}>
            <boxGeometry args={[0.3, 0.08, 0.14]} />
          </mesh>
        </group>
      ))}

      {/* Badge label strip below the banner */}
      {bannerLabel && (
        <mesh position={[0, height * 0.55 - height * 0.5 - 0.22, 0.07]}>
          <planeGeometry args={[Math.min(width * 0.85, 6), 0.3]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
      )}
    </group>
  );
}

/**
 * 3D Floating Location Waypoint Markers
 */
function WaypointMarkers({ activeLandmarkId, onSelectLandmark }) {
  return (
    <group>
      {DISTRICT_LANDMARKS.map((lm) => {
        const isCurrent = lm.id === activeLandmarkId;
        const [x, , z] = lm.pos;
        const markerY = 7;

        return (
          <group
            key={lm.id}
            position={[x, markerY, z]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectLandmark(lm);
            }}
          >
            <mesh rotation={[0, Math.PI * 0.25, 0]}>
              <octahedronGeometry args={[0.5, 0]} />
              <meshBasicMaterial color={lm.color} wireframe={!isCurrent} />
            </mesh>
            <pointLight color={lm.color} intensity={isCurrent ? 1.4 : 0.4} distance={6} />
          </group>
        );
      })}
    </group>
  );
}

/**
 * Single Straight Road Ground with dashed center-line markings.
 * Runs along the Z-axis from z=+15 to z=-115 (covering all 6 landmarks).
 */
function StraightRoadGround() {
  const asphaltMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#111312', roughness: 0.95 }),
    []
  );
  const sidewalkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1A1D1B', roughness: 0.85 }),
    []
  );
  const stripeMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#E7B85A' }),
    []
  );

  // Road runs from z = +15 to z = -115
  const roadLength = 135;
  const roadCenterZ = -50;

  // Generate dashed center-line markings
  const dashes = useMemo(() => {
    const arr = [];
    for (let z = 12; z >= -112; z -= 4) {
      arr.push(z);
    }
    return arr;
  }, []);

  return (
    <group position={[0, -0.05, 0]}>
      {/* Main road surface */}
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, 0, roadCenterZ]} material={asphaltMat} receiveShadow>
        <planeGeometry args={[14, roadLength]} />
      </mesh>

      {/* Left sidewalk */}
      <mesh position={[-9, 0.08, roadCenterZ]} material={sidewalkMat}>
        <boxGeometry args={[4, 0.16, roadLength]} />
      </mesh>
      {/* Right sidewalk */}
      <mesh position={[9, 0.08, roadCenterZ]} material={sidewalkMat}>
        <boxGeometry args={[4, 0.16, roadLength]} />
      </mesh>

      {/* Dashed yellow center-line */}
      {dashes.map((z, i) => (
        <mesh
          key={i}
          position={[0, 0.01, z]}
          rotation={[-Math.PI * 0.5, 0, 0]}
          material={stripeMat}
        >
          <planeGeometry args={[0.18, 2]} />
        </mesh>
      ))}

      {/* Road edge white lines */}
      <mesh position={[-6.5, 0.01, roadCenterZ]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[0.1, roadLength]} />
        <meshBasicMaterial color="#3A3D3B" />
      </mesh>
      <mesh position={[6.5, 0.01, roadCenterZ]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[0.1, roadLength]} />
        <meshBasicMaterial color="#3A3D3B" />
      </mesh>
    </group>
  );
}

/**
 * Distant Marina / Urban Coastline Silhouette
 */
function DistantCoastlineSkyline() {
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#0F1512' }),
    []
  );

  const buildings = useMemo(() => {
    const list = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      const x = (i - count / 2) * 1.8;
      const h = 1.4 + Math.abs(Math.sin(i * 1.6)) * 4.2;
      const w = 1.0 + Math.abs(Math.cos(i * 2.3)) * 0.9;
      list.push({ x, h, w });
    }
    return list;
  }, []);

  return (
    <group position={[0, -0.6, -55]}>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x + 22, b.h * 0.5, -8]} material={mat}>
          <boxGeometry args={[b.w, b.h, 0.2]} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Floating sunset dust motes
 */
function AtmosphericDust({ count = 35 }) {
  const meshRef = useRef();
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 8;
      pos[i * 3 + 2] = Math.random() * -110;
    }
    return pos;
  });

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += delta * 0.2;
      if (pos[i * 3 + 1] > 8.0) pos[i * 3 + 1] = 0.5;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#FDE8B5"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Camera Director: Controls camera during Guided Journey vs Explore Mode.
 * In explore mode, the player walks along the straight road using WASD.
 */
function CameraDirector({
  isExploreMode,
  activeLandmarkId,
  isMobile,
  isReducedMotion,
  onPlayerTelemetryUpdate,
  onProximityLandmark,
}) {
  const { camera } = useThree();
  const currentTargetPos = useRef(new THREE.Vector3(0, 2.2, 8));
  const currentLookAt = useRef(new THREE.Vector3(0, 2.0, 0));

  // Explore Mode State
  const playerPos = useRef(new THREE.Vector3(0, 1.8, 10));
  const playerAngle = useRef(Math.PI); // Face down the road (negative Z)
  const keysPressed = useRef({});
  const isPointerDown = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  // Touch joystick state for mobile
  const touchStart = useRef({ x: 0, y: 0 });
  const touchMoving = useRef(false);

  // Guided mouse parallax offset
  const mouseParallax = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      keysPressed.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    const handlePointerDown = (e) => {
      if (!isExploreMode) return;
      isPointerDown.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };
    const handlePointerUp = () => {
      isPointerDown.current = false;
      touchMoving.current = false;
    };
    const handlePointerMove = (e) => {
      if (isExploreMode) {
        if (!isPointerDown.current) return;
        const dx = e.clientX - lastPointer.current.x;
        playerAngle.current -= dx * 0.004;
        lastPointer.current = { x: e.clientX, y: e.clientY };
      } else {
        if (isReducedMotion) return;
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseParallax.current = { x: x * 0.4, y: y * 0.2 };
      }
    };

    // Mobile touch controls for explore mode: drag to move forward/backward, swipe left/right to turn
    const handleTouchStart = (e) => {
      if (!isExploreMode) return;
      const touch = e.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY };
      touchMoving.current = true;
    };
    const handleTouchMove = (e) => {
      if (!isExploreMode || !touchMoving.current) return;
      const touch = e.touches[0];
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;

      // Horizontal swipe = turn
      playerAngle.current -= dx * 0.002;

      // Vertical swipe = move forward/backward
      const fwd = new THREE.Vector3(-Math.sin(playerAngle.current), 0, -Math.cos(playerAngle.current));
      if (Math.abs(dy) > 2) {
        playerPos.current.add(fwd.multiplyScalar(-dy * 0.015));
      }

      touchStart.current = { x: touch.clientX, y: touch.clientY };
    };
    const handleTouchEnd = () => {
      touchMoving.current = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isExploreMode, isReducedMotion]);

  useFrame((_, delta) => {
    if (isExploreMode) {
      const speed = 8 * delta;
      const angle = playerAngle.current;
      const fwd = new THREE.Vector3(-Math.sin(angle), 0, -Math.cos(angle));
      const right = new THREE.Vector3(Math.cos(angle), 0, -Math.sin(angle));

      const move = new THREE.Vector3();
      const keys = keysPressed.current;
      if (keys['w'] || keys['arrowup']) move.add(fwd);
      if (keys['s'] || keys['arrowdown']) move.sub(fwd);
      if (keys['a'] || keys['arrowleft']) move.sub(right);
      if (keys['d'] || keys['arrowright']) move.add(right);

      if (move.lengthSq() > 0) {
        move.normalize().multiplyScalar(speed);
        playerPos.current.add(move);

        // Clamp to road corridor: X stays near road, Z runs from +15 to -110
        playerPos.current.x = Math.max(-10, Math.min(10, playerPos.current.x));
        playerPos.current.z = Math.max(-110, Math.min(15, playerPos.current.z));
      }

      camera.position.copy(playerPos.current);
      const lookTarget = playerPos.current.clone().add(fwd);
      camera.lookAt(lookTarget);

      if (onPlayerTelemetryUpdate) {
        onPlayerTelemetryUpdate({
          x: playerPos.current.x,
          z: playerPos.current.z,
          angle: playerAngle.current,
        });
      }

      // Check proximity to landmarks (< 8 units along Z)
      let closest = null;
      let minDistance = 8;
      DISTRICT_LANDMARKS.forEach((lm) => {
        const dz = Math.abs(lm.pos[2] - playerPos.current.z);
        const dx = Math.abs(lm.pos[0] - playerPos.current.x);
        const d = Math.sqrt(dx * dx + dz * dz);
        if (d < minDistance) {
          minDistance = d;
          closest = lm;
        }
      });
      if (onProximityLandmark) {
        onProximityLandmark(closest);
      }
    } else {
      // --- GUIDED JOURNEY MODE ---
      const current = DISTRICT_LANDMARKS.find((lm) => lm.id === activeLandmarkId) || DISTRICT_LANDMARKS[0];
      const targetPos = new THREE.Vector3(...current.camPos);
      const targetLook = new THREE.Vector3(...current.lookAt);

      if (!isReducedMotion && !isMobile) {
        targetPos.x += mouseParallax.current.x;
        targetPos.y += mouseParallax.current.y;
      }

      currentTargetPos.current.lerp(targetPos, Math.min(1, delta * 3.5));
      currentLookAt.current.lerp(targetLook, Math.min(1, delta * 3.5));

      camera.position.copy(currentTargetPos.current);
      camera.lookAt(currentLookAt.current);
    }
  });

  return null;
}

/**
 * Main PlayableDistrict3D Export
 * Flat single straight road with image banners — no buildings, no walls.
 */
export default function PlayableDistrict3D({
  activeLandmarkId = 'arrival',
  isExploreMode = false,
  onSelectLandmark = () => {},
  onPlayerTelemetryUpdate = () => {},
  onProximityLandmark = () => {},
  className = '',
}) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener('resize', checkSize);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const handleMotion = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);

    const handleVisibility = () => setIsTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', checkSize);
      motionQuery.removeEventListener('change', handleMotion);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C2B30] via-[#8FADA0] via-60%-[#D87942] to-[#E7B85A] flex items-center justify-center">
        <div className="text-center font-bank text-sm uppercase text-[var(--gta-text-fill)]">
          [ 2D DISTRICT VIEWPORT ACTIVE // WEBGL ACCELERATION UNAVAILABLE ]
        </div>
      </div>
    );
  }

  // Banner sizing: slightly smaller on mobile
  const bannerW = isMobile ? 6 : 8.5;
  const bannerH = isMobile ? 3.375 : 4.78;

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto ${className}`}>
      {/* San Andreas Golden Hour Sky Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, #1C2B30 0%, #2E4549 28%, #8FADA0 52%, #D87942 78%, #E7B85A 95%, #E8DFB8 100%)',
        }}
      />

      <Canvas
        camera={{ position: [0, 2.2, 8], fov: isMobile ? 58 : 48 }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.75)}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        frameloop={isTabVisible ? 'always' : 'never'}
        className="w-full h-full"
      >
        {/* Warm Sunset Lighting */}
        <ambientLight intensity={0.65} color="#FCE6C4" />
        <directionalLight position={[-8, 6, 6]} intensity={0.9} color="#E8965A" />
        <directionalLight position={[8, 4, -4]} intensity={0.35} color="#7A9AA8" />

        {/* Distant Coastline Skyline */}
        <DistantCoastlineSkyline />

        {/* Flat Straight Road */}
        <StraightRoadGround />

        {/* Image Banners — placed along the road, one per landmark */}
        {DISTRICT_LANDMARKS.map((lm) => (
          <RoadsideBanner
            key={lm.id}
            textureUrl={lm.textureUrl}
            fallbackUrl={lm.fallbackUrl}
            width={lm.id === 'arrival' ? bannerW * 1.15 : bannerW}
            height={lm.id === 'arrival' ? bannerH * 1.1 : bannerH}
            position={[0, 0, lm.pos[2]]}
            accentColor={lm.color}
            bannerLabel={lm.bannerLabel}
          />
        ))}

        {/* Palm trees along the road — alternating left/right sides */}
        <PalmTree position={[-8, 0, 5]} scale={1.2} curveDir={-1} rotationY={0.2} swayOffset={0} />
        <PalmTree position={[8, 0, 5]} scale={1.15} curveDir={1} rotationY={-0.2} swayOffset={2.1} />
        <PalmTree position={[-8.5, 0, -10]} scale={1.3} curveDir={1} rotationY={-0.3} swayOffset={1.2} />
        <PalmTree position={[8.5, 0, -10]} scale={1.0} curveDir={-1} rotationY={0.4} swayOffset={3.3} />
        <PalmTree position={[-8, 0, -30]} scale={1.4} curveDir={-1} rotationY={0.5} swayOffset={0.8} />
        <PalmTree position={[8, 0, -30]} scale={1.2} curveDir={1} rotationY={-0.4} swayOffset={1.7} />
        <PalmTree position={[-8.5, 0, -50]} scale={1.1} curveDir={1} rotationY={0.3} swayOffset={2.5} />
        <PalmTree position={[8.5, 0, -50]} scale={1.35} curveDir={-1} rotationY={-0.1} swayOffset={0.4} />
        <PalmTree position={[-8, 0, -70]} scale={1.3} curveDir={-1} rotationY={-0.2} swayOffset={1.9} />
        <PalmTree position={[8, 0, -70]} scale={1.15} curveDir={1} rotationY={0.5} swayOffset={3.0} />
        <PalmTree position={[-8.5, 0, -90]} scale={1.2} curveDir={1} rotationY={-0.4} swayOffset={0.6} />
        <PalmTree position={[8.5, 0, -90]} scale={1.4} curveDir={-1} rotationY={0.2} swayOffset={2.8} />

        {/* 3D Floating Location Waypoints */}
        <WaypointMarkers
          activeLandmarkId={activeLandmarkId}
          onSelectLandmark={onSelectLandmark}
        />

        {/* Atmospheric Sunset Dust Motes */}
        {!isReducedMotion && <AtmosphericDust count={isMobile ? 20 : 40} />}

        {/* Camera Director */}
        <CameraDirector
          isExploreMode={isExploreMode}
          activeLandmarkId={activeLandmarkId}
          isMobile={isMobile}
          isReducedMotion={isReducedMotion}
          onPlayerTelemetryUpdate={onPlayerTelemetryUpdate}
          onProximityLandmark={onProximityLandmark}
        />
      </Canvas>
    </div>
  );
}
