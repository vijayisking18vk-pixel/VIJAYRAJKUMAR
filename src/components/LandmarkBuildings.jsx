import React, { useMemo, useEffect } from "react";
import * as THREE from "three";
import { Instances } from "./CityEnvironment";
import {
  plasterTexture,
  glazingEnvironment,
  contactShadowTexture,
} from "./worldTextures";
import useDistrictTexture from "./useDistrictTexture";
import { DISTRICT_LANDMARKS, LAST_STOP } from "../data/district";

function FacadeArtwork({ landmark, isMobile, onSelect }) {
  const texture = useDistrictTexture(
    isMobile
      ? landmark.textureUrl.replace(".webp", "-mobile.webp")
      : landmark.textureUrl,
  );
  const width = landmark.index === LAST_STOP ? 12 : 9.2,
    height = (width * 9) / 16;
  const label = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 128;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#172821";
    ctx.fillRect(0, 0, 1024, 128);
    ctx.fillStyle = landmark.color;
    ctx.font = "600 46px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(landmark.bannerLabel, 512, 64);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [landmark]);
  useEffect(() => () => label.dispose(), [label]);
  return (
    <group
      position={landmark.pos}
      rotation={[
        0,
        landmark.index === LAST_STOP ? 0 : -Math.sign(landmark.pos[0]) * 0.12,
        0,
      ]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(landmark);
      }}
    >
      <mesh position={[0, 5.55, 0.36]}>
        <boxGeometry args={[width + 0.24, height + 0.24, 0.16]} />
        <meshStandardMaterial color="#293b32" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 5.55, 0.455]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          key={texture ? texture.uuid : "loading-artwork"}
          map={texture}
          color={texture ? "#ffffff" : "#24382c"}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 5.55 + height / 2 + 0.52, 0.38]}>
        <planeGeometry args={[width, 0.7]} />
        <meshBasicMaterial map={label} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function LandmarkBuildings({ isMobile, onSelect }) {
  const data = useMemo(() => {
    const stone = [],
      trim = [],
      metal = [],
      glass = [],
      light = [],
      columns = [],
      shadows = [],
      foliage = [];
    for (const lm of DISTRICT_LANDMARKS) {
      const end = lm.index === LAST_STOP,
        w = end ? 16 : 12,
        h = end ? 11.8 : 10.2,
        d = end ? 10 : 8,
        yaw = end ? 0 : -Math.sign(lm.pos[0]) * 0.12;
      const q = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        yaw,
      );
      const add = (arr, p, s, color, rotation = [0, 0, 0]) => {
        const pos = new THREE.Vector3(...p)
          .applyQuaternion(q)
          .add(new THREE.Vector3(...lm.pos));
        const rot = q
          .clone()
          .multiply(
            new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)),
          );
        arr.push({
          position: pos.toArray(),
          scale: s,
          color,
          quaternion: rot.toArray(),
        });
      };
      const wall = ["#d8c9aa", "#aaa796", "#d7b19a", "#a6b5a5", "#d0c9ac"][
        lm.index
      ];
      add(stone, [0, h / 2, -d / 2], [w, h, d], wall);
      add(trim, [0, 0.22, -d / 2], [w + 0.6, 0.44, d + 0.7], "#a8a58d");
      add(trim, [0, h - 0.05, -d / 2], [w + 0.65, 0.35, d + 0.55], "#727d6c");
      add(trim, [0, h + 0.38, -d / 2], [w + 0.15, 0.48, d + 0.1], wall);
      add(trim, [0, 3, 0.1], [w + 0.1, 0.16, 0.5], "#d5cfb7");
      // Front portico and a recessed entry below the mounted artwork.
      add(metal, [0, 1.4, 0.07], [2.25, 2.5, 0.16], "#233c32");
      add(glass, [0, 1.4, 0.19], [1.85, 2.2, 0.07], "#789185");
      add(trim, [0, 1.4, 0.25], [0.06, 2.3, 0.09], "#cfc4a0");
      add(light, [0, 2.58, 0.32], [1.8, 0.035, 0.08], "#e5c18c");
      for (let i = 0; i < 3; i++)
        add(
          trim,
          [0, 0.08 + i * 0.075, 0.55 + i * 0.22],
          [3.2 - i * 0.25, 0.16, 0.65],
          "#bbb79e",
        );
      for (const side of [-1, 1]) {
        add(
          trim,
          [side * (w / 2 - 0.23), h / 2, 0.13],
          [0.46, h, 0.36],
          "#dcd2b9",
        );
        add(
          trim,
          [side * (w / 2 + 0.15), 0.55, 0.85],
          [1.4, 1.1, 1.8],
          "#828e76",
        );
        for (const offset of [-0.4, 0, 0.4])
          add(
            foliage,
            [
              side * (w / 2 + 0.15),
              1.28 + (0.4 - Math.abs(offset)) * 0.4,
              0.85 + offset,
            ],
            [0.62, 0.42, 0.6],
            offset === 0 ? "#647e4f" : "#435e42",
          );
        add(
          metal,
          [side * (w / 2 - 0.85), 2.2, 0.55],
          [0.12, 1.3, 0.2],
          "#32473b",
        );
        add(
          light,
          [side * (w / 2 - 0.85), 2.6, 0.66],
          [0.22, 0.38, 0.2],
          "#ffe0a0",
        );
        // Both side elevations have actual inset windows and frames.
        for (let z = -2; z > -d; z -= 2.7)
          for (let y = 2; y < h - 1; y += 3) {
            add(
              metal,
              [side * (w / 2 + 0.015), y, z],
              [0.08, 1.7, 1.6],
              "#30443b",
            );
            add(
              glass,
              [side * (w / 2 + 0.07), y, z],
              [0.07, 1.45, 1.3],
              "#81948a",
            );
            for (const edge of [-1, 1])
              add(
                trim,
                [side * (w / 2 + 0.12), y + edge * 0.85, z],
                [0.24, 0.12, 1.8],
                "#c8c6af",
              );
          }
      }
      // Five architectural identities, with no additional advertising boards.
      if (lm.index === 0) {
        for (const x of [-5.1, 5.1]) {
          add(columns, [x, 4.75, 0.7], [0.3, 9, 0.3], "#e1d1b1");
          add(trim, [x, 9.25, 0.7], [0.85, 0.25, 0.85], "#ded0b4");
        }
        for (const side of [-1, 1])
          add(trim, [side * 3.25, 11, -d / 2], [6.8, 0.2, d + 0.9], "#8d5f43", [
            0,
            0,
            -side * 0.19,
          ]);
      } else if (lm.index === 1) {
        add(metal, [0, 10.6, -d / 2], [w + 0.7, 0.2, d + 0.6], "#596e61");
        add(metal, [0, 3, 0.8], [w + 0.6, 0.22, 1.9], "#556d5b");
        for (const side of [-1, 1]) {
          add(metal, [side * 3.7, 1.45, 0.12], [3.5, 2.45, 0.16], "#475d51");
          for (let k = 0; k < 11; k++)
            add(
              trim,
              [side * 3.7, 0.38 + k * 0.2, 0.23],
              [3.45, 0.026, 0.06],
              "#8c9480",
            );
        }
        for (const x of [-3, 3])
          add(metal, [x, 11, -4], [2.2, 0.65, 1.8], "#65746a");
      } else if (lm.index === 2) {
        add(trim, [0, 10.8, -4], [w * 0.74, 0.8, 6.5], wall);
        add(trim, [0, 11.3, -4], [w * 0.74 + 0.4, 0.18, 6.8], "#747f69");
        add(metal, [0, 3, 0.65], [w + 0.9, 0.22, 1.8], "#6a4f3d");
        for (let x = -5.5; x < 6; x += 0.7)
          add(light, [x, 2.93, 1.54], [0.09, 0.08, 0.09], "#ffdb93");
      } else if (lm.index === 3) {
        add(trim, [0, 3, 0.75], [w + 0.5, 0.2, 1.9], "#47604d");
        for (const side of [-1, 1]) {
          add(glass, [side * 3.5, 1.5, 0.15], [3.3, 2.2, 0.12], "#8b987a");
          for (let k = 0; k < 4; k++)
            add(
              trim,
              [side * 3.5, 0.65 + k * 0.48, 0.26],
              [3.2, 0.06, 0.16],
              "#c0b38c",
            );
        }
      } else {
        add(stone, [0, 12.5, -4], [5.6, 3.4, 5], wall);
        add(stone, [0, 14.25, -4], [3, 1.8, 3.5], wall);
        for (const side of [-1, 1])
          for (const x of [5.8, 7])
            add(trim, [side * x, 6, 0.48], [0.3, 12, 0.7], "#e1d5b7");
        for (let k = 0; k < 3; k++)
          add(metal, [0, 11.1 + k * 0.4, 0.24], [w, 0.12, 0.25], "#7e8c73");
      }
      add(shadows, [0, 0.115, -2], [w + 5, 1, d + 8], "#ffffff");
    }
    return { stone, trim, metal, glass, light, columns, shadows, foliage };
  }, []);
  const assets = useMemo(() => {
    const map = plasterTexture(),
      env = glazingEnvironment(),
      shade = contactShadowTexture();
    return {
      map,
      env,
      shade,
      box: new THREE.BoxGeometry(1, 1, 1),
      bush: new THREE.IcosahedronGeometry(1, 1),
      leaves: new THREE.MeshStandardMaterial({ roughness: 1 }),
      column: new THREE.CylinderGeometry(1, 1, 1, 12),
      plane: new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2),
      stone: new THREE.MeshStandardMaterial({
        map,
        bumpMap: map,
        bumpScale: 0.025,
        roughness: 0.9,
      }),
      trim: new THREE.MeshStandardMaterial({ roughness: 0.78 }),
      metal: new THREE.MeshStandardMaterial({
        roughness: 0.55,
        metalness: 0.28,
      }),
      glass: new THREE.MeshStandardMaterial({
        envMap: env,
        envMapIntensity: 0.9,
        roughness: 0.2,
        metalness: 0.45,
      }),
      light: new THREE.MeshBasicMaterial(),
      shadow: new THREE.MeshBasicMaterial({
        map: shade,
        transparent: true,
        depthWrite: false,
        opacity: 0.55,
      }),
    };
  }, []);
  useEffect(
    () => () => Object.values(assets).forEach((a) => a.dispose()),
    [assets],
  );
  return (
    <>
      {["stone", "trim", "metal", "glass", "light"].map((key) => (
        <Instances
          key={key}
          items={data[key]}
          geometry={assets.box}
          material={assets[key]}
          castShadow={key === "stone" || key === "trim"}
        />
      ))}
      <Instances
        items={data.columns}
        geometry={assets.column}
        material={assets.trim}
        castShadow
      />
      <Instances
        items={data.foliage}
        geometry={assets.bush}
        material={assets.leaves}
      />
      <Instances
        items={data.shadows}
        geometry={assets.plane}
        material={assets.shadow}
      />
      {DISTRICT_LANDMARKS.map((lm) => (
        <FacadeArtwork
          key={lm.id}
          landmark={lm}
          isMobile={isMobile}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}
