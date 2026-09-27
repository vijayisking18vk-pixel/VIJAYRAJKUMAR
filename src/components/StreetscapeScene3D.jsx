import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

/**
 * Procedural low-poly Fan Palm Tree
 */
function PalmTree({ position = [0, 0, 0], scale = 1, rotationY = 0, curveDir = 1 }) {
  const groupRef = useRef();

  // Procedural curved trunk
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

  // Procedural fan fronds
  const fronds = useMemo(() => {
    const frondList = [];
    const count = 9;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const droop = 0.35 + Math.sin(i * 1.5) * 0.15;
      frondList.push({ angle, droop });
    }
    return frondList;
  }, []);

  const frondGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.6 * scale, 1.8 * scale, 0, 3.2 * scale);
    shape.quadraticCurveTo(-0.6 * scale, 1.8 * scale, 0, 0);
    return new THREE.ShapeGeometry(shape, 6);
  }, [scale]);

  const silhouetteMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#0D110E'), // Deep dark silhouette
      }),
    []
  );

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
      {/* Trunk */}
      <mesh geometry={trunkGeo} material={silhouetteMat} />

      {/* Fronds Crown */}
      <group position={[1.2 * curveDir * scale, 7 * scale, 0.3 * scale]}>
        {fronds.map((f, idx) => (
          <group key={idx} rotation={[0, f.angle, 0]}>
            <mesh
              geometry={frondGeo}
              material={silhouetteMat}
              rotation={[Math.PI * 0.5 + f.droop, 0, 0]}
              position={[0, 0, 0]}
            />
          </group>
        ))}
      </group>
    </group>
  );
}

/**
 * Procedural Telephone / Utility Pole with Catenary Sagging Wires
 */
function UtilityPole({ position = [0, 0, 0], scale = 1 }) {
  const poleMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: new THREE.Color('#0A0C0B') }),
    []
  );

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Vertical pole */}
      <mesh position={[0, 4.5, 0]} material={poleMat}>
        <cylinderGeometry args={[0.12, 0.16, 9, 6]} />
      </mesh>
      {/* Upper cross arm */}
      <mesh position={[0, 7.8, 0]} material={poleMat}>
        <boxGeometry args={[2.8, 0.12, 0.14]} />
      </mesh>
      {/* Lower cross arm */}
      <mesh position={[0, 6.8, 0]} material={poleMat}>
        <boxGeometry args={[2.2, 0.1, 0.12]} />
      </mesh>
      {/* Insulator caps */}
      {[-1.2, -0.6, 0.6, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 7.95, 0]} material={poleMat}>
          <cylinderGeometry args={[0.04, 0.05, 0.2, 4]} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Sagging Catenary Wires connecting across the scene
 */
function StreetWires() {
  const wireMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: new THREE.Color('#0E1210'), linewidth: 1 }),
    []
  );

  const wire1 = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-14, 7.8, -2),
      new THREE.Vector3(0, 5.2, -1),
      new THREE.Vector3(14, 7.2, -3)
    );
    const points = curve.getPoints(24);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const wire2 = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-14, 6.8, -2),
      new THREE.Vector3(0, 4.6, -1),
      new THREE.Vector3(14, 6.4, -3)
    );
    const points = curve.getPoints(24);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <group>
      <line geometry={wire1} material={wireMat} />
      <line geometry={wire2} material={wireMat} />
    </group>
  );
}

/**
 * 3D Steel Billboard with Hero Artwork face & spot fixtures
 */
function BillboardStructure({ isMobile }) {
  const textureUrl = isMobile ? '/images/hero-mobile.webp' : '/images/hero-desktop.webp';
  const textureRef = useRef();
  const [textureLoaded, setTextureLoaded] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      textureUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        textureRef.current = tex;
        setTextureLoaded(true);
      },
      undefined,
      () => {
        // Fallback to jpg if webp fails
        const fallbackUrl = isMobile ? '/images/hero-mobile.jpg' : '/images/hero-desktop.jpg';
        loader.load(fallbackUrl, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          textureRef.current = tex;
          setTextureLoaded(true);
        });
      }
    );

    return () => {
      if (textureRef.current) textureRef.current.dispose();
    };
  }, [textureUrl, isMobile]);

  const frameMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1A1C1B'),
        roughness: 0.7,
        metalness: 0.6,
      }),
    []
  );

  const panelWidth = isMobile ? 6.0 : 10.2;
  const panelHeight = isMobile ? 9.0 : 5.74;

  return (
    <group position={[0, 0.4, 0]}>
      {/* Dual Heavy Steel Support Pillars */}
      <mesh position={[-panelWidth * 0.32, -0.6, -0.2]} material={frameMat}>
        <cylinderGeometry args={[0.22, 0.28, 6.4, 8]} />
      </mesh>
      <mesh position={[panelWidth * 0.32, -0.6, -0.2]} material={frameMat}>
        <cylinderGeometry args={[0.22, 0.28, 6.4, 8]} />
      </mesh>

      {/* Cross braces */}
      <mesh position={[0, 0.8, -0.3]} rotation={[0, 0, 0.35]} material={frameMat}>
        <boxGeometry args={[panelWidth * 0.7, 0.08, 0.08]} />
      </mesh>
      <mesh position={[0, 0.8, -0.3]} rotation={[0, 0, -0.35]} material={frameMat}>
        <boxGeometry args={[panelWidth * 0.7, 0.08, 0.08]} />
      </mesh>

      {/* Billboard Outer Steel Bezel */}
      <mesh position={[0, 2.5, 0]} material={frameMat}>
        <boxGeometry args={[panelWidth + 0.35, panelHeight + 0.35, 0.3]} />
      </mesh>

      {/* Billboard Artwork Canvas Face */}
      <mesh position={[0, 2.5, 0.16]}>
        <planeGeometry args={[panelWidth, panelHeight]} />
        {textureLoaded && textureRef.current ? (
          <meshBasicMaterial map={textureRef.current} toneMapped={false} />
        ) : (
          <meshBasicMaterial color="#1A1815" />
        )}
      </mesh>

      {/* Top Lighting Gantry & Spot Fixtures */}
      {[-panelWidth * 0.35, 0, panelWidth * 0.35].map((x, i) => (
        <group key={i} position={[x, 2.5 + panelHeight * 0.5 + 0.2, 0.4]}>
          {/* Support bracket */}
          <mesh material={frameMat} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.5, 6]} />
          </mesh>
          {/* Lamp housing */}
          <mesh position={[0, 0.2, 0.2]} material={frameMat} rotation={[0.6, 0, 0]}>
            <boxGeometry args={[0.4, 0.18, 0.24]} />
          </mesh>
        </group>
      ))}

      {/* Subtle warm billboard spotlight */}
      <spotLight
        position={[0, 2.5 + panelHeight * 0.5 + 1.2, 2.0]}
        target-position={[0, 2.5, 0]}
        intensity={1.2}
        distance={10}
        angle={Math.PI / 3}
        penumbra={0.6}
        color="#FDE8B5"
      />
    </group>
  );
}

/**
 * Distant Marina Beach / Chennai City Skyline Silhouette
 */
function DistantSkyline() {
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#141A17'), // Atmospheric dark dusk
      }),
    []
  );

  const buildings = useMemo(() => {
    const list = [];
    const count = 26;
    for (let i = 0; i < count; i++) {
      const x = (i - count / 2) * 1.35;
      const h = 1.2 + Math.abs(Math.sin(i * 1.7)) * 2.8;
      const w = 0.8 + Math.abs(Math.cos(i * 2.1)) * 0.7;
      list.push({ x, h, w });
    }
    return list;
  }, []);

  return (
    <group position={[0, -0.6, -12]}>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h * 0.5, 0]} material={mat}>
          <boxGeometry args={[b.w, b.h, 0.2]} />
        </mesh>
      ))}
      {/* Horizon fog strip */}
      <mesh position={[0, 0.2, 0.1]}>
        <planeGeometry args={[40, 1.5]} />
        <meshBasicMaterial color="#35463D" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/**
 * Road Asphalt Ground Plane with Amber Lane Lines
 */
function RoadGround() {
  const roadMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#101211'),
        roughness: 0.9,
      }),
    []
  );

  const stripeMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#E7B85A'), // GTA Amber
      }),
    []
  );

  return (
    <group position={[0, -1.8, 0]}>
      {/* Asphalt */}
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} material={roadMat} receiveShadow>
        <planeGeometry args={[45, 25]} />
      </mesh>
      {/* Dashed amber markings */}
      {[-9, -5, -1, 3, 7, 11].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0.01, 3.2]}
          rotation={[-Math.PI * 0.5, 0, 0]}
          material={stripeMat}
        >
          <planeGeometry args={[1.6, 0.18]} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Floating sunset atmospheric motes / dust
 */
function AtmosphericDust({ count = 40 }) {
  const meshRef = useRef();

  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = Math.random() * 8 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += delta * 0.25;
      if (pos[i * 3 + 1] > 7.5) {
        pos[i * 3 + 1] = -1.5;
      }
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
        size={0.06}
        color="#F0D095"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Camera Controller with Mouse Parallax and Gentle Settle
 */
function CameraRig({ isReducedMotion }) {
  const { camera } = useThree();
  const mouseTarget = useRef({ x: 0, y: 0 });
  const settleProgress = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isReducedMotion) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseTarget.current.x = x * 0.45;
      mouseTarget.current.y = y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isReducedMotion]);

  useFrame((state, delta) => {
    if (isReducedMotion) {
      camera.position.set(0, 2.2, 7.8);
      camera.lookAt(0, 2.4, 0);
      return;
    }

    // Initial cinematic settle
    if (settleProgress.current < 1) {
      settleProgress.current += delta * 0.8;
      const t = Math.min(settleProgress.current, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      camera.position.y = 1.0 + ease * 1.2;
      camera.position.z = 8.8 - ease * 1.0;
    }

    // Subtle pointer parallax damping
    const targetX = mouseTarget.current.x;
    const targetY = 2.2 + mouseTarget.current.y;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 2.3, 0);
  });

  return null;
}

/**
 * Scene container with Sunset Lighting
 */
function SceneContent({ isMobile, isReducedMotion }) {
  return (
    <>
      {/* Sunset Ambient and Directional Warm Light */}
      <ambientLight intensity={0.55} color="#FCE6C4" />
      <directionalLight
        position={[-6, 5, 4]}
        intensity={0.85}
        color="#E8965A" // Warm sunset orange
      />
      <directionalLight
        position={[6, 3, -2]}
        intensity={0.4}
        color="#7A9AA8" // Twilight sky fill
      />

      {/* Distant Cityline */}
      <DistantSkyline />

      {/* Road Plane */}
      <RoadGround />

      {/* The Central Billboard Structure */}
      <BillboardStructure isMobile={isMobile} />

      {/* Silhouetted Fan Palms */}
      {/* Left Group */}
      <PalmTree position={[-6.8, -1.8, 1.2]} scale={1.2} curveDir={-1} rotationY={0.2} />
      <PalmTree position={[-8.5, -1.8, -1.0]} scale={1.4} curveDir={1} rotationY={-0.3} />

      {/* Right Group */}
      <PalmTree position={[6.9, -1.8, 1.1]} scale={1.15} curveDir={1} rotationY={-0.2} />
      <PalmTree position={[8.6, -1.8, -0.8]} scale={1.45} curveDir={-1} rotationY={0.4} />

      {/* Utility Pole on Right */}
      <UtilityPole position={[5.6, -1.8, 0.4]} scale={0.9} />

      {/* Catenary Wires */}
      <StreetWires />

      {/* Floating Dust Motes */}
      {!isReducedMotion && <AtmosphericDust count={isMobile ? 20 : 45} />}

      {/* Camera Rig */}
      <CameraRig isReducedMotion={isReducedMotion} />
    </>
  );
}

/**
 * 2D High-Fidelity SVG/CSS Fallback in case WebGL is unavailable or fails
 */
function StreetscapeFallback({ isMobile }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
      {/* Sunset Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2B3E42] via-[#8FADA0] via-60%-[#D87942] to-[#E7B85A]" />

      {/* Silhouette Skyline SVG */}
      <div className="absolute bottom-16 inset-x-0 h-32 bg-[radial-gradient(ellipse_at_bottom,#141A17_0%,transparent_80%)] opacity-80" />

      {/* 2D Billboard Poster Card */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="border-4 border-[var(--gta-text-outline)] shadow-[0_20px_60px_rgba(10,10,10,0.85)] bg-[var(--gta-text-outline)] rounded-2xl overflow-hidden">
          <img
            src={isMobile ? '/images/hero-mobile.webp' : '/images/hero-desktop.webp'}
            alt="Vijayrajkumar — GTA San Andreas Artwork Poster"
            className="w-full h-auto max-h-[65vh] object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Main StreetscapeScene3D export
 */
export default function StreetscapeScene3D() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    // Check Mobile Breakpoint
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Check Reduced Motion Preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const handleMotion = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotion);

    // Tab Visibility
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', handleMotion);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  if (!hasWebGL) {
    return <StreetscapeFallback isMobile={isMobile} />;
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto">
      {/* Sky Gradient CSS Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, #1C2B30 0%, #2E4549 28%, #8FADA0 52%, #D87942 78%, #E7B85A 95%, #E8DFB8 100%)',
        }}
      />

      <Canvas
        camera={{ position: [0, 1.2, 8.8], fov: isMobile ? 55 : 45 }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.75)}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        frameloop={isTabVisible ? 'always' : 'never'}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneContent isMobile={isMobile} isReducedMotion={isReducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
