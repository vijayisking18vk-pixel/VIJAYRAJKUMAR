import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import soundSystem from '../lib/soundSystem';

// District landmark coordinates and metadata
export const DISTRICT_LANDMARKS = [
  {
    id: 'arrival',
    label: 'ARRIVAL STREET',
    chapter: '00 // ARRIVAL',
    title: 'Arrival Street & Identity',
    path: '/',
    pos: [0, 0, 0],
    camPos: [0, 2.2, 7.8],
    lookAt: [0, 2.3, 0],
    color: '#E7B85A',
    icon: '✦',
    description: 'Central street corner featuring the Vijayrajkumar official San Andreas artwork billboard.',
  },
  {
    id: 'safehouse',
    label: 'THE SAFEHOUSE',
    chapter: '01 // SAFEHOUSE',
    title: 'Biography & Strategic Journey',
    path: '/about/',
    pos: [-16, 0, -4],
    camPos: [-10, 2.6, 2],
    lookAt: [-16, 2.4, -4],
    color: '#E7B85A',
    icon: '■',
    description: 'Operator studio and safehouse. Background in Defence & Strategic Studies, Hindi Literature, and marketplace execution.',
  },
  {
    id: 'operations-garage',
    label: 'OPERATIONS GARAGE',
    chapter: '02 // VENTURES',
    title: 'Ventures & Case Studies',
    path: '/ventures/',
    pos: [16, 0, -4],
    camPos: [10, 2.6, 2],
    lookAt: [16, 2.4, -4],
    color: '#8FADA0',
    icon: '◆',
    description: 'Industrial workshop housing Unfounded (venture studio), Ziggers (gig staffing), and LoopMemory (AI context engine).',
  },
  {
    id: 'poster-wall',
    label: 'THE POSTER WALL',
    chapter: '03 // EVENTS',
    title: 'Events & Public Summits',
    path: '/events/',
    pos: [-14, 0, 14],
    camPos: [-9, 2.4, 19],
    lookAt: [-14, 2.2, 14],
    color: '#D87942',
    icon: '▲',
    description: 'Courtyard poster wall displaying community summits, hackathons, and international forums.',
  },
  {
    id: 'archive',
    label: 'THE ARCHIVE',
    chapter: '04 // WRITING',
    title: 'Writing & Strategic Research',
    path: '/writing/',
    pos: [14, 0, 14],
    camPos: [9, 2.4, 19],
    lookAt: [14, 2.2, 14],
    color: '#B7C2A8',
    icon: '●',
    description: 'Architectural bookstore and research archive. Deep dives into marketplace mechanics and cognitive memory.',
  },
  {
    id: 'dispatch-point',
    label: 'DISPATCH POINT',
    chapter: '05 // CONTACT',
    title: 'Contact & Collaboration',
    path: '/contact/',
    pos: [0, 0, 24],
    camPos: [0, 3.4, 30],
    lookAt: [0, 2.6, 23],
    color: '#EDE4C8',
    icon: '✦',
    description: 'Rooftop radio transmission station overlooking the city. Direct contact and founder advisory engagements.',
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
 * Utility Pole with cross arms
 */
function UtilityPole({ position = [0, 0, 0], scale = 1 }) {
  const poleMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: new THREE.Color('#0B0E0D') }),
    []
  );

  return (
    <group position={position} scale={[scale, scale, scale]}>
      <mesh position={[0, 4.5, 0]} material={poleMat}>
        <cylinderGeometry args={[0.12, 0.16, 9, 6]} />
      </mesh>
      <mesh position={[0, 7.8, 0]} material={poleMat}>
        <boxGeometry args={[2.8, 0.12, 0.14]} />
      </mesh>
      <mesh position={[0, 6.8, 0]} material={poleMat}>
        <boxGeometry args={[2.2, 0.1, 0.12]} />
      </mesh>
    </group>
  );
}

/**
 * Catenary Sagging Wires connecting buildings and poles
 */
function DistrictWires() {
  const wireMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: new THREE.Color('#0C100E'), linewidth: 1 }),
    []
  );

  const wireGeos = useMemo(() => {
    const list = [];
    const connections = [
      [[-16, 7.5, -4], [-8, 6.5, -1], [0, 5.8, 0]],
      [[16, 7.0, -4], [8, 6.5, -1], [0, 5.8, 0]],
      [[-14, 5.2, 14], [-6, 5.8, 10], [0, 5.8, 0]],
      [[14, 5.2, 14], [6, 5.8, 10], [0, 5.8, 0]],
      [[0, 8.0, 24], [0, 6.2, 12], [0, 5.8, 0]],
    ];

    connections.forEach(([p1, pMid, p2]) => {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...p1),
        new THREE.Vector3(...pMid),
        new THREE.Vector3(...p2)
      );
      list.push(new THREE.BufferGeometry().setFromPoints(curve.getPoints(20)));
    });
    return list;
  }, []);

  return (
    <group>
      {wireGeos.map((geo, idx) => (
        <line key={idx} geometry={geo} material={wireMat} />
      ))}
    </group>
  );
}

/**
 * Central Arrival Billboard Structure
 */
function ArrivalBillboard({ isMobile }) {
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
        loader.load(
          isMobile ? '/images/hero-mobile.jpg' : '/images/hero-desktop.jpg',
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            textureRef.current = tex;
            setTextureLoaded(true);
          }
        );
      }
    );

    return () => {
      if (textureRef.current) textureRef.current.dispose();
    };
  }, [textureUrl, isMobile]);

  const frameMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#161917', roughness: 0.8, metalness: 0.5 }),
    []
  );

  const panelWidth = isMobile ? 6.0 : 10.2;
  const panelHeight = isMobile ? 9.0 : 5.74;

  return (
    <group position={[0, 0.4, 0]}>
      <mesh position={[-panelWidth * 0.32, -0.6, -0.2]} material={frameMat}>
        <cylinderGeometry args={[0.22, 0.28, 6.4, 8]} />
      </mesh>
      <mesh position={[panelWidth * 0.32, -0.6, -0.2]} material={frameMat}>
        <cylinderGeometry args={[0.22, 0.28, 6.4, 8]} />
      </mesh>
      <mesh position={[0, 2.5, 0]} material={frameMat}>
        <boxGeometry args={[panelWidth + 0.35, panelHeight + 0.35, 0.3]} />
      </mesh>
      <mesh position={[0, 2.5, 0.16]}>
        <planeGeometry args={[panelWidth, panelHeight]} />
        {textureLoaded && textureRef.current ? (
          <meshBasicMaterial map={textureRef.current} toneMapped={false} />
        ) : (
          <meshBasicMaterial color="#1A1815" />
        )}
      </mesh>
    </group>
  );
}

/**
 * Landmark 1: The Safehouse (About & Strategic Journey)
 */
function SafehouseBuilding() {
  const wallMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#3A3832', roughness: 0.9 }),
    []
  );
  const trimMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#252522', roughness: 0.7 }),
    []
  );
  const litWindowMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#F7C66B' }), // Warm amber window glow
    []
  );
  const waterTankMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1E2D27', roughness: 0.7 }),
    []
  );

  return (
    <group position={[-16, 0, -4]}>
      {/* Main 2-story building block */}
      <mesh position={[0, 3.6, 0]} material={wallMat}>
        <boxGeometry args={[9.5, 7.2, 8.5]} />
      </mesh>
      {/* Roof cornice trim */}
      <mesh position={[0, 7.3, 0]} material={trimMat}>
        <boxGeometry args={[9.9, 0.3, 8.9]} />
      </mesh>

      {/* Lit windows - Upper Floor */}
      {[-3, -1, 1, 3].map((x, i) => (
        <mesh key={i} position={[x, 5.2, 4.3]} material={litWindowMat}>
          <planeGeometry args={[1.2, 1.6]} />
        </mesh>
      ))}

      {/* Lit windows - Ground Floor */}
      {[-3, 3].map((x, i) => (
        <mesh key={i} position={[x, 2.0, 4.3]} material={litWindowMat}>
          <planeGeometry args={[1.2, 1.8]} />
        </mesh>
      ))}

      {/* Entrance Door & Awning */}
      <mesh position={[0, 1.8, 4.32]} material={trimMat}>
        <planeGeometry args={[2.0, 3.6]} />
      </mesh>
      <mesh position={[0, 3.7, 4.8]} material={trimMat} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[3.2, 0.1, 1.2]} />
      </mesh>

      {/* Rooftop Water Tank (Classic Chennai Sintex / galvanized tank on steel stilts) */}
      <group position={[2.5, 8.4, -1.5]}>
        <mesh position={[0, 0.7, 0]} material={waterTankMat}>
          <cylinderGeometry args={[0.9, 0.9, 1.4, 12]} />
        </mesh>
        <mesh position={[0, -0.2, 0]} material={trimMat}>
          <boxGeometry args={[1.8, 0.4, 1.8]} />
        </mesh>
      </group>

      {/* Neon Signboard: THE SAFEHOUSE */}
      <mesh position={[0, 4.3, 4.4]}>
        <planeGeometry args={[4.2, 0.7]} />
        <meshBasicMaterial color="#E7B85A" />
      </mesh>
    </group>
  );
}

/**
 * Landmark 2: Operations Garage (Ventures & Case Studies)
 */
function OperationsGarageBuilding() {
  const brickMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#3A2E28', roughness: 0.9 }),
    []
  );
  const trimMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1B1C1A', roughness: 0.8 }),
    []
  );
  const bayDoorMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#252B28', roughness: 0.6, metalness: 0.4 }),
    []
  );

  return (
    <group position={[16, 0, -4]}>
      {/* Main Garage Warehouse structure */}
      <mesh position={[0, 3.2, 0]} material={brickMat}>
        <boxGeometry args={[11.5, 6.4, 9.0]} />
      </mesh>
      <mesh position={[0, 6.5, 0]} material={trimMat}>
        <boxGeometry args={[11.9, 0.3, 9.4]} />
      </mesh>

      {/* 3 Roll-up Garage Bays */}
      {[
        { x: -3.5, labelColor: '#8FADA0' },
        { x: 0, labelColor: '#E7B85A' },
        { x: 3.5, labelColor: '#B7C2A8' },
      ].map((bay, i) => (
        <group key={i} position={[bay.x, 2.0, 4.52]}>
          <mesh material={bayDoorMat}>
            <planeGeometry args={[2.8, 4.0]} />
          </mesh>
          {/* Illuminated neon sign strip above each bay */}
          <mesh position={[0, 2.3, 0.05]}>
            <planeGeometry args={[2.6, 0.45]} />
            <meshBasicMaterial color={bay.labelColor} />
          </mesh>
        </group>
      ))}

      {/* Overhead Rooftop Industrial Exhaust Pipes */}
      <mesh position={[-3.5, 7.2, -1.0]} material={trimMat} rotation={[0, 0, Math.PI * 0.5]}>
        <cylinderGeometry args={[0.3, 0.3, 4.5, 8]} />
      </mesh>
    </group>
  );
}

/**
 * Landmark 3: The Poster Wall (Events & Community Summits)
 */
function PosterWallCourtyard() {
  const wallMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#322E2B', roughness: 0.95 }),
    []
  );
  const posterFrameMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#181A19', roughness: 0.8 }),
    []
  );
  const posterColors = ['#E7B85A', '#8FADA0', '#D87942', '#EDE4C8'];

  return (
    <group position={[-14, 0, 14]}>
      {/* Brick courtyard perimeter wall */}
      <mesh position={[0, 2.2, 0]} material={wallMat}>
        <boxGeometry args={[12.5, 4.4, 1.2]} />
      </mesh>
      <mesh position={[0, 4.5, 0]} material={posterFrameMat}>
        <boxGeometry args={[12.9, 0.25, 1.4]} />
      </mesh>

      {/* 4 Illuminated Framed Event Posters */}
      {[-4.2, -1.4, 1.4, 4.2].map((x, i) => (
        <group key={i} position={[x, 2.2, 0.65]}>
          <mesh material={posterFrameMat}>
            <boxGeometry args={[2.2, 2.8, 0.08]} />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[1.9, 2.5]} />
            <meshBasicMaterial color={posterColors[i]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Landmark 4: The Archive (Writing & Strategic Research)
 */
function ArchiveBuilding() {
  const stoneMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#2B322F', roughness: 0.9 }),
    []
  );
  const glassMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#D4B36A' }), // Amber bookshop window
    []
  );
  const trimMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1A1E1C', roughness: 0.7 }),
    []
  );

  return (
    <group position={[14, 0, 14]}>
      {/* Archive Bookstore façade */}
      <mesh position={[0, 3.4, 0]} material={stoneMat}>
        <boxGeometry args={[10.5, 6.8, 8.5]} />
      </mesh>
      <mesh position={[0, 6.9, 0]} material={trimMat}>
        <boxGeometry args={[10.9, 0.3, 8.9]} />
      </mesh>

      {/* Large floor-to-ceiling glass display windows with warm bookshop glow */}
      {[-3, 0, 3].map((x, i) => (
        <mesh key={i} position={[x, 2.2, 4.3]} material={glassMat}>
          <planeGeometry args={[2.2, 3.4]} />
        </mesh>
      ))}

      {/* Architectural fascia sign */}
      <mesh position={[0, 4.5, 4.35]}>
        <planeGeometry args={[8.0, 0.7]} />
        <meshBasicMaterial color="#B7C2A8" />
      </mesh>
    </group>
  );
}

/**
 * Landmark 5: The Dispatch Point (Contact & Collaboration)
 */
function DispatchPointStation() {
  const stationMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#232825', roughness: 0.85 }),
    []
  );
  const mastMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#141715', roughness: 0.5, metalness: 0.8 }),
    []
  );
  const beaconRef = useRef();

  useFrame(({ clock }) => {
    if (beaconRef.current) {
      const t = clock.getElapsedTime() * 3.5;
      beaconRef.current.intensity = 0.5 + Math.sin(t) * 0.5;
    }
  });

  return (
    <group position={[0, 0, 24]}>
      {/* Elevated communications platform */}
      <mesh position={[0, 1.8, 0]} material={stationMat}>
        <boxGeometry args={[8.5, 3.6, 7.5]} />
      </mesh>

      {/* Tall Transmission Radio Mast */}
      <group position={[0, 3.6, 0]}>
        <mesh position={[0, 5.0, 0]} material={mastMat}>
          <cylinderGeometry args={[0.08, 0.22, 10, 6]} />
        </mesh>
        {/* Mast cross struts */}
        {[2.5, 5.0, 7.5].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} material={mastMat}>
            <boxGeometry args={[1.2, 0.08, 1.2]} />
          </mesh>
        ))}

        {/* Pulsing red/amber aircraft warning beacon at apex */}
        <mesh position={[0, 10.1, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial color="#FF5533" />
        </mesh>
        <pointLight
          ref={beaconRef}
          position={[0, 10.1, 0]}
          color="#FF5533"
          distance={12}
          intensity={1.0}
        />
      </group>

      {/* Dispatch station sign */}
      <mesh position={[0, 3.0, 3.8]}>
        <planeGeometry args={[5.2, 0.6]} />
        <meshBasicMaterial color="#EDE4C8" />
      </mesh>
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
        const markerY = lm.id === 'dispatch-point' ? 14.5 : lm.id === 'arrival' ? 6.8 : 8.8;

        return (
          <group
            key={lm.id}
            position={[x, markerY, z]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectLandmark(lm);
            }}
          >
            {/* Diamond / Marker Mesh */}
            <mesh rotation={[0, Math.PI * 0.25, 0]}>
              <octahedronGeometry args={[0.6, 0]} />
              <meshBasicMaterial color={lm.color} wireframe={!isCurrent} />
            </mesh>
            {/* Subtle glow light */}
            <pointLight color={lm.color} intensity={isCurrent ? 1.4 : 0.4} distance={6} />
          </group>
        );
      })}
    </group>
  );
}

/**
 * District Ground, Asphalt Streets, Curbs & Amber Markings
 */
function DistrictGround() {
  const asphaltMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#111312', roughness: 0.95 }),
    []
  );
  const curbMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#242725', roughness: 0.85 }),
    []
  );
  const stripeMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#E7B85A' }),
    []
  );

  return (
    <group position={[0, -0.05, 0]}>
      {/* Main Ground Plane */}
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} material={asphaltMat} receiveShadow>
        <planeGeometry args={[70, 70]} />
      </mesh>

      {/* Sidewalk Blocks Left & Right */}
      <mesh position={[-16, 0.12, 5]} material={curbMat}>
        <boxGeometry args={[14, 0.24, 45]} />
      </mesh>
      <mesh position={[16, 0.12, 5]} material={curbMat}>
        <boxGeometry args={[14, 0.24, 45]} />
      </mesh>

      {/* North-South Center Avenue Dashed Amber Markings */}
      {[-6, -1, 4, 9, 14, 19, 24, 29].map((z, i) => (
        <mesh
          key={i}
          position={[0, 0.02, z]}
          rotation={[-Math.PI * 0.5, 0, 0]}
          material={stripeMat}
        >
          <planeGeometry args={[0.2, 2.2]} />
        </mesh>
      ))}

      {/* East-West Cross Street Dashed Amber Markings */}
      {[-12, -7, -2, 3, 8, 13].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0.02, 0]}
          rotation={[-Math.PI * 0.5, 0, Math.PI * 0.5]}
          material={stripeMat}
        >
          <planeGeometry args={[0.2, 2.0]} />
        </mesh>
      ))}
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
    const count = 36;
    for (let i = 0; i < count; i++) {
      const x = (i - count / 2) * 1.8;
      const h = 1.4 + Math.abs(Math.sin(i * 1.6)) * 4.2;
      const w = 1.0 + Math.abs(Math.cos(i * 2.3)) * 0.9;
      list.push({ x, h, w });
    }
    return list;
  }, []);

  return (
    <group position={[0, -0.6, -22]}>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h * 0.5, 0]} material={mat}>
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
      pos[i * 3] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 1] = Math.random() * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 45 + 10;
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
 * Camera Director: Controls camera during Guided Journey vs Explore Mode
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
  const currentTargetPos = useRef(new THREE.Vector3(0, 2.2, 7.8));
  const currentLookAt = useRef(new THREE.Vector3(0, 2.3, 0));

  // Explore Mode State
  const playerPos = useRef(new THREE.Vector3(0, 1.8, 8));
  const playerAngle = useRef(0);
  const keysPressed = useRef({});
  const isPointerDown = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  // Guided mouse parallax offset
  const mouseParallax = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if an input is focused
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

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isExploreMode, isReducedMotion]);

  useFrame((_, delta) => {
    if (isExploreMode) {
      // --- EXPLORE MODE: Free movement with WASD / Arrows ---
      const speed = 7.5 * delta;
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

        // Clamp inside district bounding box
        playerPos.current.x = Math.max(-22, Math.min(22, playerPos.current.x));
        playerPos.current.z = Math.max(-8, Math.min(27, playerPos.current.z));
      }

      camera.position.copy(playerPos.current);
      const lookTarget = playerPos.current.clone().add(fwd);
      camera.lookAt(lookTarget);

      // Report telemetry (x, z, angle) to HUD & check proximity to landmarks
      if (onPlayerTelemetryUpdate) {
        onPlayerTelemetryUpdate({
          x: playerPos.current.x,
          z: playerPos.current.z,
          angle: playerAngle.current,
        });
      }

      // Check proximity to landmarks (< 6.5 units)
      let closest = null;
      let minDistance = 6.5;
      DISTRICT_LANDMARKS.forEach((lm) => {
        const dx = lm.pos[0] - playerPos.current.x;
        const dz = lm.pos[2] - playerPos.current.z;
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
      // --- GUIDED JOURNEY MODE: Smooth Interpolation to active landmark camera pose ---
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
        camera={{ position: [0, 2.2, 7.8], fov: isMobile ? 55 : 45 }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.75)}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        frameloop={isTabVisible ? 'always' : 'never'}
        className="w-full h-full"
      >
        {/* Warm Sunset Lighting */}
        <ambientLight intensity={0.6} color="#FCE6C4" />
        <directionalLight position={[-8, 6, 6]} intensity={0.9} color="#E8965A" />
        <directionalLight position={[8, 4, -4]} intensity={0.4} color="#7A9AA8" />

        {/* Distant Coastline Skyline */}
        <DistantCoastlineSkyline />

        {/* Ground Asphalt, Curbs & Dashed Markings */}
        <DistrictGround />

        {/* Landmark 0: Arrival Billboard */}
        <ArrivalBillboard isMobile={isMobile} />

        {/* Landmark 1: The Safehouse */}
        <SafehouseBuilding />

        {/* Landmark 2: Operations Garage */}
        <OperationsGarageBuilding />

        {/* Landmark 3: The Poster Wall */}
        <PosterWallCourtyard />

        {/* Landmark 4: The Archive */}
        <ArchiveBuilding />

        {/* Landmark 5: The Dispatch Point */}
        <DispatchPointStation />

        {/* Silhouetted Palms */}
        <PalmTree position={[-6.8, 0, 1.2]} scale={1.2} curveDir={-1} rotationY={0.2} swayOffset={0} />
        <PalmTree position={[-8.5, 0, -1.0]} scale={1.4} curveDir={1} rotationY={-0.3} swayOffset={1.2} />
        <PalmTree position={[6.9, 0, 1.1]} scale={1.15} curveDir={1} rotationY={-0.2} swayOffset={2.1} />
        <PalmTree position={[8.6, 0, -0.8]} scale={1.45} curveDir={-1} rotationY={0.4} swayOffset={3.3} />
        <PalmTree position={[-16.5, 0, 9.5]} scale={1.3} curveDir={1} rotationY={0.5} swayOffset={0.8} />
        <PalmTree position={[16.5, 0, 9.5]} scale={1.3} curveDir={-1} rotationY={-0.4} swayOffset={1.7} />

        {/* Utility Poles */}
        <UtilityPole position={[5.6, 0, 0.4]} scale={0.9} />
        <UtilityPole position={[-5.6, 0, 12]} scale={0.9} />

        {/* Catenary Wires connecting the district */}
        <DistrictWires />

        {/* 3D Floating Location Waypoints */}
        <WaypointMarkers
          activeLandmarkId={activeLandmarkId}
          onSelectLandmark={onSelectLandmark}
        />

        {/* Atmospheric Sunset Dust Motes */}
        {!isReducedMotion && <AtmosphericDust count={isMobile ? 20 : 40} />}

        {/* Camera Director: Manages Guided Journey Lerp & Explore Mode Movement */}
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
