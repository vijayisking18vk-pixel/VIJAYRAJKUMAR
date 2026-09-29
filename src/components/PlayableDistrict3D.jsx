import React, { useRef, useEffect, useState, useMemo, memo } from "react";
import CityEnvironment, { Instances } from "./CityEnvironment";
import { asphaltTexture, pavementTexture } from "./worldTextures";
import LandmarkBuildings from "./LandmarkBuildings";
import {
  DistrictSun,
  AdaptiveResolution,
  ReducedMotionInvalidation,
} from "./SceneQuality";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

/**
 * Straight-road layout: landmarks placed sequentially along a single Z-axis road.
 * Shared roadside stops are spaced 28 units apart.
 */
import {
  DISTRICT_LANDMARKS,
  journeyProgress,
  cameraRoadZ,
  LAST_STOP,
} from "../data/district";
export { DISTRICT_LANDMARKS } from "../data/district";

/**
 * Procedural low-poly Fan Palm Tree with subtle wind sway
 */
function PalmTree({
  position = [0, 0, 0],
  scale = 1,
  rotationY = 0,
  curveDir = 1,
  swayOffset = 0,
}) {
  const groupRef = useRef();
  const motionPreference = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)"),
    [],
  );

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
    for (let i = 1; i <= 9; i++) {
      const t = i / 10,
        w = Math.sin(t * Math.PI) * 0.65 * scale;
      shape.lineTo(w, t * 3.6 * scale);
      shape.lineTo(w * 0.25, (t + 0.04) * 3.6 * scale);
    }
    shape.lineTo(0, 3.8 * scale);
    for (let i = 9; i >= 1; i--) {
      const t = i / 10,
        w = Math.sin(t * Math.PI) * 0.65 * scale;
      shape.lineTo(-w * 0.25, (t + 0.04) * 3.6 * scale);
      shape.lineTo(-w, t * 3.6 * scale);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape, 6);
  }, [scale]);

  const crownGeo = useMemo(() => {
    const positions = [],
      normals = [];
    fronds.forEach((f) => {
      const leaf = frondGeo.toNonIndexed();
      const matrix = new THREE.Matrix4()
        .makeRotationY(f.angle)
        .multiply(new THREE.Matrix4().makeRotationX(Math.PI * 0.5 + f.droop));
      leaf.applyMatrix4(matrix);
      positions.push(...leaf.attributes.position.array);
      normals.push(...leaf.attributes.normal.array);
      leaf.dispose();
    });
    const crown = new THREE.BufferGeometry();
    crown.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    crown.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    return crown;
  }, [frondGeo, fronds]);
  const silhouetteMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#39513c",
        roughness: 1,
        side: THREE.DoubleSide,
      }),
    [],
  );

  useEffect(
    () => () => {
      trunkGeo.dispose();
      frondGeo.dispose();
      crownGeo.dispose();
      silhouetteMat.dispose();
    },
    [trunkGeo, frondGeo, crownGeo, silhouetteMat],
  );

  useFrame(({ clock }) => {
    if (groupRef.current && !motionPreference.matches) {
      const t = clock.getElapsedTime() * 0.8 + swayOffset;
      groupRef.current.rotation.z = Math.sin(t) * 0.025;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
      <mesh geometry={trunkGeo} material={silhouetteMat} />
      <group position={[1.2 * curveDir * scale, 7 * scale, 0.3 * scale]}>
        <mesh geometry={crownGeo} material={silhouetteMat} />
      </group>
    </group>
  );
}

function StraightRoadGround() {
  const assets = useMemo(() => {
    const asphalt = asphaltTexture(),
      paving = pavementTexture();
    return {
      asphalt,
      paving,
      box: new THREE.BoxGeometry(1, 1, 1),
      road: new THREE.MeshStandardMaterial({
        map: asphalt,
        bumpMap: asphalt,
        bumpScale: 0.025,
        roughness: 0.98,
        color: "#929a94",
      }),
      walk: new THREE.MeshStandardMaterial({
        map: paving,
        bumpMap: paving,
        bumpScale: 0.018,
        roughness: 1,
      }),
      paint: new THREE.MeshStandardMaterial({ roughness: 1 }),
    };
  }, []);
  useEffect(
    () => () => Object.values(assets).forEach((a) => a.dispose()),
    [assets],
  );
  const markings = useMemo(() => {
    const a = [];
    for (let z = 20; z > -110; z -= 4)
      for (const x of [-0.16, 0.16])
        a.push({
          position: [x, 0.012, z],
          scale: [0.085, 0.014, 2.3],
          color: "#c9b16e",
        });
    for (const x of [-6.35, 6.35])
      a.push({
        position: [x, 0.012, -45],
        scale: [0.1, 0.014, 140],
        color: "#c2bfa5",
      });
    for (let x = -5.5; x <= 5.5; x += 1.3)
      a.push({
        position: [x, 0.013, -104],
        scale: [0.7, 0.016, 2.5],
        color: "#b9b7a0",
      });
    return a;
  }, []);
  return (
    <group position={[0, -0.05, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, -60]}>
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial color="#938b70" />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -45]}
        material={assets.road}
        receiveShadow
      >
        <planeGeometry args={[14, 140]} />
      </mesh>
      {[-10.5, 10.5].map((x) => (
        <mesh
          key={x}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[x, 0.15, -45]}
          material={assets.walk}
          receiveShadow
        >
          <planeGeometry args={[7, 140]} />
        </mesh>
      ))}
      <Instances
        items={markings}
        geometry={assets.box}
        material={assets.paint}
      />
    </group>
  );
}

/**
 * Distant Marina / Urban Coastline Silhouette
 */
function DistantCoastlineSkyline() {
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#0F1512" }),
    [],
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
    <group position={[0, -0.6, -185]}>
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
function CameraDirector({ isMobile, isReducedMotion, fixedProgress }) {
  const { camera } = useThree();
  const progress = useRef(fixedProgress ?? journeyProgress());
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame((state, delta) => {
    const target = fixedProgress ?? journeyProgress();
    progress.current = isReducedMotion
      ? target
      : THREE.MathUtils.damp(
          progress.current,
          target,
          10,
          Math.min(delta, 0.1),
        );
    const p = progress.current;
    const index = Math.min(LAST_STOP - 1, Math.floor(p));
    const blend = THREE.MathUtils.smoothstep(p - index, 0, 1);
    const left = DISTRICT_LANDMARKS[index];
    const right = DISTRICT_LANDMARKS[index + 1];
    const lookX = THREE.MathUtils.lerp(left.pos[0], right.pos[0], blend);
    // Keep the end-of-road artwork fully framed on narrow phone screens.
    camera.position.set(
      0,
      isMobile ? 3.4 : 3.0,
      cameraRoadZ(p, isMobile, camera.aspect, camera.fov),
    );
    look.set(lookX * (isMobile ? 0.95 : 0.5), isMobile ? 2.8 : 3.7, -p * 28);
    if (fixedProgress !== undefined && !isMobile && !isReducedMotion)
      look.x += state.pointer.x * 0.65;
    camera.lookAt(look);
  });
  return null;
}

/**
 * Main PlayableDistrict3D Export
 * A straight boulevard with five modeled destination buildings.
 */
function PlayableDistrict3D({
  fixedProgress,
  activeLandmarkId = "safehouse",
  isExploreMode = false,
  onSelectLandmark = () => {},
  onProximityLandmark = () => {},
  className = "",
}) {
  const [hasWebGL, setHasWebGL] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [qualityDpr, setQualityDpr] = useState(() =>
    Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.25 : 1.75),
  );
  const [isReducedMotion, setIsReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const cameraOptions = useMemo(
    () => ({
      position: [0, 3, 19],
      fov: isMobile ? 65 : 48,
      near: 0.1,
      far: 220,
    }),
    [isMobile],
  );
  const containerRef = useRef();
  const [inView, setInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [journeyStarted, setJourneyStarted] = useState(
    () => window.scrollY > 0,
  );
  useEffect(() => {
    const update = () => setJourneyStarted(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      setHasWebGL(Boolean(gl));
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setHasWebGL(false);
    }

    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const handleMotion = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotion);

    const handleVisibility = () => setIsTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", checkSize);
      motionQuery.removeEventListener("change", handleMotion);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasWebGL]);

  if (hasWebGL === null)
    return <div className="absolute inset-0 bg-[#17251c]" />;
  if (!hasWebGL) {
    const landmark =
      DISTRICT_LANDMARKS[fixedProgress] ||
      DISTRICT_LANDMARKS.find((item) => item.id === activeLandmarkId) ||
      DISTRICT_LANDMARKS[0];
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C2B30] to-[#69796a] flex items-center justify-center">
        <button
          onClick={() => onSelectLandmark(landmark)}
          aria-label={`Open ${landmark.label}`}
          style={{ width: "min(80vw, 780px)" }}
        >
          <span className="block p-3 bg-[#101b16] text-[#E7B85A]">
            {landmark.bannerLabel}
          </span>
          <img
            src={
              isMobile
                ? landmark.textureUrl.replace(".webp", "-mobile.webp")
                : landmark.textureUrl
            }
            alt={landmark.label}
            className="w-full"
          />
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto ${className}`}
    >
      {/* San Andreas Golden Hour Sky Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #61585c 0%, #ae8374 28%, #ecc396 54%, #d7b28e 72%, #b19a7f 100%)",
        }}
      />

      <Canvas
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.toneMappingExposure = 1.08;
        }}
        shadows={!isMobile}
        camera={cameraOptions}
        dpr={qualityDpr}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        frameloop={
          isTabVisible &&
          inView &&
          (journeyStarted || fixedProgress !== undefined)
            ? isReducedMotion
              ? "demand"
              : "always"
            : "never"
        }
        className="w-full h-full"
      >
        <AdaptiveResolution
          dpr={qualityDpr}
          onChange={setQualityDpr}
          isMobile={isMobile}
        />
        <ReducedMotionInvalidation />
        {/* Warm Sunset Lighting */}
        <ambientLight intensity={0.3} color="#FCE6C4" />
        <DistrictSun isMobile={isMobile} />
        <directionalLight
          position={[8, 4, -4]}
          intensity={0.35}
          color="#7A9AA8"
        />

        {/* Distant Coastline Skyline */}
        <CityEnvironment />

        {/* Flat Straight Road */}
        <StraightRoadGround />

        <LandmarkBuildings isMobile={isMobile} onSelect={onSelectLandmark} />

        {/* Palm trees along the road — alternating left/right sides */}
        <PalmTree
          position={[-18, 0, -8]}
          scale={1.2}
          curveDir={-1}
          rotationY={0.2}
          swayOffset={0}
        />
        <PalmTree
          position={[18, 0, -8]}
          scale={1.15}
          curveDir={1}
          rotationY={-0.2}
          swayOffset={2.1}
        />
        <PalmTree
          position={[-18, 0, -10]}
          scale={1.3}
          curveDir={1}
          rotationY={-0.3}
          swayOffset={1.2}
        />
        <PalmTree
          position={[18, 0, -10]}
          scale={1.0}
          curveDir={-1}
          rotationY={0.4}
          swayOffset={3.3}
        />
        <PalmTree
          position={[-18, 0, -30]}
          scale={1.4}
          curveDir={-1}
          rotationY={0.5}
          swayOffset={0.8}
        />
        <PalmTree
          position={[18, 0, -30]}
          scale={1.2}
          curveDir={1}
          rotationY={-0.4}
          swayOffset={1.7}
        />
        <PalmTree
          position={[-18, 0, -50]}
          scale={1.1}
          curveDir={1}
          rotationY={0.3}
          swayOffset={2.5}
        />
        <PalmTree
          position={[18, 0, -50]}
          scale={1.35}
          curveDir={-1}
          rotationY={-0.1}
          swayOffset={0.4}
        />
        <PalmTree
          position={[-18, 0, -70]}
          scale={1.3}
          curveDir={-1}
          rotationY={-0.2}
          swayOffset={1.9}
        />
        <PalmTree
          position={[18, 0, -70]}
          scale={1.15}
          curveDir={1}
          rotationY={0.5}
          swayOffset={3.0}
        />
        <PalmTree
          position={[-18, 0, -90]}
          scale={1.2}
          curveDir={1}
          rotationY={-0.4}
          swayOffset={0.6}
        />
        <PalmTree
          position={[18, 0, -90]}
          scale={1.4}
          curveDir={-1}
          rotationY={0.2}
          swayOffset={2.8}
        />

        {/* 3D Floating Location Waypoints */}

        {/* Atmospheric Sunset Dust Motes */}
        {!isReducedMotion && <AtmosphericDust count={isMobile ? 20 : 40} />}

        {/* Camera Director */}
        <CameraDirector
          fixedProgress={fixedProgress}
          isExploreMode={isExploreMode}
          activeLandmarkId={activeLandmarkId}
          isMobile={isMobile}
          isReducedMotion={isReducedMotion}
          onProximityLandmark={onProximityLandmark}
        />
      </Canvas>
    </div>
  );
}

export default memo(PlayableDistrict3D);
