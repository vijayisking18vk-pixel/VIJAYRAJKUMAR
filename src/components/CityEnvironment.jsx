import React, { useMemo, useRef, useLayoutEffect, useEffect } from "react";
import * as THREE from "three";
import {
  plasterTexture,
  contactShadowTexture,
  glazingEnvironment,
} from "./worldTextures";
export function Instances({ items, geometry, material, castShadow = false }) {
  const ref = useRef();
  useLayoutEffect(() => {
    const t = new THREE.Object3D();
    items.forEach((item, i) => {
      t.position.set(...item.position);
      t.scale.set(...item.scale);
      if (item.quaternion) t.quaternion.set(...item.quaternion);
      else t.rotation.set(0, item.rotation || 0, 0);
      t.updateMatrix();
      ref.current.setMatrixAt(i, t.matrix);
      if (item.color) ref.current.setColorAt(i, new THREE.Color(item.color));
    });
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
    ref.current.computeBoundingSphere();
  }, [items]);
  return (
    <instancedMesh
      ref={ref}
      args={[geometry, material, items.length]}
      castShadow={castShadow}
      receiveShadow
    />
  );
}
function Architecture() {
  const data = useMemo(() => {
    const walls = [],
      trim = [],
      metal = [],
      lamps = [],
      glass = [],
      shadows = [];
    const add = (array, p, s, color) =>
      array.push({ position: p, scale: s, color });
    const colors = [
      "#cec1a3",
      "#c4bfa8",
      "#afbbb0",
      "#cfa78b",
      "#d3c6ae",
      "#a1afa1",
    ];
    for (let i = 0; i < 24; i++) {
      const side = i % 2 ? -1 : 1,
        z = 14 - Math.floor(i / 2) * 14,
        h = 8 + ((i * 7) % 8),
        w = 9 + (i % 3),
        x = side * (28 + (i % 3) * 2),
        front = x - (side * w) / 2;
      add(walls, [x, h / 2, z], [w, h, 11], colors[i % 6]);
      // Separate recessed glazing and projecting stone frames give real depth.
      for (let y = 4.45; y < h - 1.4; y += 3.4) {
        for (const offset of [-3.3, 0, 3.3]) {
          const tint =
            (i + Math.round(y) + Math.round(offset)) % 5 === 0
              ? "#a49b70"
              : "#637d79";
          add(
            metal,
            [front - side * 0.035, y, z + offset],
            [0.12, 2.15, 1.95],
            "#293d38",
          );
          add(
            glass,
            [front - side * 0.105, y, z + offset],
            [0.06, 1.8, 1.6],
            tint,
          );
          for (const edge of [-1, 1]) {
            add(
              trim,
              [front - side * 0.2, y, z + offset + edge * 0.93],
              [0.32, 2.25, 0.14],
              "#d5ceba",
            );
            add(
              trim,
              [front - side * 0.2, y + edge * 1.05, z + offset],
              [0.32, 0.14, 2],
              "#d5ceba",
            );
          }
          add(
            metal,
            [front - side * 0.16, y, z + offset],
            [0.09, 1.9, 0.06],
            "#929f94",
          );
          add(
            trim,
            [front - side * 0.3, y - 1.12, z + offset],
            [0.6, 0.14, 2.12],
            "#d5ceba",
          );
          add(metal, [x + offset, y, z + 5.53], [1.95, 2.15, 0.12], "#293d38");
          add(glass, [x + offset, y, z + 5.6], [1.6, 1.8, 0.06], tint);
          for (const edge of [-1, 1]) {
            add(
              trim,
              [x + offset + edge * 0.93, y, z + 5.68],
              [0.14, 2.25, 0.32],
              "#d5ceba",
            );
            add(
              trim,
              [x + offset, y + edge * 1.05, z + 5.68],
              [2, 0.14, 0.32],
              "#d5ceba",
            );
          }
          add(metal, [x + offset, y, z + 5.67], [0.06, 1.9, 0.08], "#929f94");
          add(
            trim,
            [x + offset, y - 1.12, z + 5.8],
            [2.12, 0.14, 0.6],
            "#d5ceba",
          );
        }
      }
      add(shadows, [x, 0.112, z], [w + 7, 1, 18], "#ffffff");
      // Layered rooflines and corner pilasters break up the repeated blocks.
      for (const edge of [-1, 1])
        add(
          trim,
          [x + edge * (w / 2 - 0.12), h / 2, z + 5.56],
          [0.28, h, 0.25],
          "#c7c2b0",
        );
      if (i % 3 === 0) {
        add(walls, [x, h + 0.75, z - 1], [w * 0.64, 1.5, 7], colors[i % 6]);
        add(trim, [x, h + 1.6, z - 1], [w * 0.64 + 0.35, 0.2, 7.35], "#a9ac9c");
      }
      add(trim, [x, h + 0.1, z], [w + 0.6, 0.3, 11.6], "#777766");
      add(trim, [x, h + 0.5, z - 5.3], [w, 0.8, 0.22], "#a19b83");
      add(trim, [x, h + 0.5, z + 5.3], [w, 0.8, 0.22], "#a19b83");
      add(trim, [x, h + 0.7, z], [2, 1.4, 2.3], "#495754");
      add(metal, [x + 2, h + 1.6, z], [0.06, 3.2, 0.06], "#454e46");
      add(metal, [x + 2, h + 2.5, z], [2, 0.05, 0.05], "#454e46");
      for (let y = 3.2; y < h; y += 3.4) {
        add(trim, [x, y, z + 5.6], [w + 0.25, 0.16, 0.5], "#c9c3ad");
        add(trim, [front, y, z], [0.6, 0.16, 11.1], "#c9c3ad");
        for (const dz of [-3, 1]) {
          add(
            trim,
            [front - side * 0.65, y, z + dz],
            [1.4, 0.18, 2.5],
            "#afa990",
          );
          add(
            metal,
            [front - side * 1.25, y + 0.65, z + dz],
            [0.06, 0.07, 2.5],
            "#424e44",
          );
          for (let k = -1; k <= 1; k++)
            add(
              metal,
              [front - side * 1.25, y + 0.33, z + dz + k],
              [0.05, 0.65, 0.05],
              "#424e44",
            );
        }
      }
      for (const dz of [-3.6, 0, 3.6]) {
        add(
          metal,
          [front - side * 0.04, 1.25, z + dz],
          [0.1, 2.5, 2.7],
          "#3a4c45",
        );
        for (let k = 0; k < 8; k++)
          add(
            trim,
            [front - side * 0.1, 0.3 + k * 0.26, z + dz],
            [0.08, 0.025, 2.6],
            "#788075",
          );
      }
      add(
        trim,
        [front - side * 0.65, 2.7, z],
        [1.5, 0.14, 10.5],
        i % 3 === 0 ? "#98654b" : "#637365",
      );
      add(trim, [front - side * 0.07, 3, z], [0.13, 0.5, 10.5], "#c1ad79");
    }
    // Curbs, drains and modest street furniture use shared geometry and three draw calls.
    for (let z = 23, k = 0; z > -114; z -= 2, k++)
      for (const side of [-1, 1]) {
        add(
          trim,
          [side * 7.1, 0.14, z],
          [0.32, 0.3, 1.96],
          k % 3 === 0 ? "#ad9d76" : "#d2c8ab",
        );
        if (k % 7 === 0) {
          add(metal, [side * 6.8, 0.015, z], [0.32, 0.025, 0.8], "#323e36");
          for (let n = 0; n < 5; n++)
            add(
              trim,
              [side * 6.8, 0.035, z - 0.3 + n * 0.15],
              [0.26, 0.012, 0.025],
              "#90937e",
            );
        }
      }
    for (let i = 0; i < 12; i++) {
      const side = i % 2 ? -1 : 1,
        z = 10 - Math.floor(i / 2) * 25,
        x = side * 16;
      add(metal, [x, 3.6, z], [0.13, 7.2, 0.13], "#475349");
      add(metal, [x - side * 0.9, 7.2, z], [1.9, 0.12, 0.15], "#475349");
      add(lamps, [x - side * 1.7, 7.1, z], [0.75, 0.12, 0.4], "#ffe2a5");
      add(trim, [x, 0.3, z], [0.35, 0.6, 0.35], "#8b8b75");
      if (i % 2 === 0) {
        add(trim, [side * 13, 0.45, z - 5], [2.5, 0.18, 0.7], "#816947");
        add(metal, [side * 13, 0.23, z - 5], [2, 0.46, 0.5], "#38463c");
      }
    }
    return { walls, trim, metal, lamps, glass, shadows };
  }, []);
  const assets = useMemo(() => {
    const box = new THREE.BoxGeometry(1, 1, 1),
      map = plasterTexture(),
      shadowMap = contactShadowTexture(),
      reflection = glazingEnvironment();
    return {
      box,
      map,
      shadowMap,
      reflection,
      shadowPlane: new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2),
      shadow: new THREE.MeshBasicMaterial({
        map: shadowMap,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
      }),
      glass: new THREE.MeshStandardMaterial({
        envMap: reflection,
        envMapIntensity: 0.8,
        roughness: 0.25,
        metalness: 0.35,
      }),
      wall: new THREE.MeshStandardMaterial({
        map,
        bumpMap: map,
        bumpScale: 0.012,
        roughness: 0.94,
      }),
      trim: new THREE.MeshStandardMaterial({ roughness: 0.9 }),
      metal: new THREE.MeshStandardMaterial({ roughness: 0.8 }),
      lamp: new THREE.MeshBasicMaterial({ color: "#ffe2a5" }),
    };
  }, []);
  useEffect(
    () => () => Object.values(assets).forEach((a) => a.dispose()),
    [assets],
  );
  return (
    <>
      <Instances
        items={data.walls}
        geometry={assets.box}
        material={assets.wall}
        castShadow
      />
      <Instances
        items={data.trim}
        geometry={assets.box}
        material={assets.trim}
      />
      <Instances
        items={data.metal}
        geometry={assets.box}
        material={assets.metal}
      />
      <Instances
        items={data.lamps}
        geometry={assets.box}
        material={assets.lamp}
      />
      <Instances
        items={data.glass}
        geometry={assets.box}
        material={assets.glass}
      />
      <Instances
        items={data.shadows}
        geometry={assets.shadowPlane}
        material={assets.shadow}
      />
    </>
  );
}
export default function CityEnvironment() {
  return (
    <>
      <fog attach="fog" args={["#c4a68c", 42, 155]} />
      <hemisphereLight args={["#e8dec6", "#566b60", 0.95]} />
      <mesh position={[-65, 34, -140]}>
        <sphereGeometry args={[12, 24, 16]} />
        <meshBasicMaterial color="#ffdaa0" fog={false} toneMapped={false} />
      </mesh>
      <Architecture />
    </>
  );
}
