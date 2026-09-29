import { useEffect, useState } from "react";
import * as THREE from "three";
const textures = new Map();
// Banners and street posters share one GPU texture per image; route changes release it.
export default function useDistrictTexture(url) {
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    let entry = textures.get(url);
    if (!entry) {
      entry = { refs: 0, listeners: new Set(), texture: null, timer: null };
      textures.set(url, entry);
      new THREE.TextureLoader().load(
        url,
        (t) => {
          if (textures.get(url) !== entry) {
            t.dispose();
            return;
          }
          t.colorSpace = THREE.SRGBColorSpace;
          t.anisotropy = 4;
          t.minFilter = THREE.LinearMipmapLinearFilter;
          entry.texture = t;
          entry.listeners.forEach((fn) => fn(t));
        },
        undefined,
        () => entry.listeners.forEach((fn) => fn(null)),
      );
    }
    clearTimeout(entry.timer);
    entry.refs++;
    entry.listeners.add(setTexture);
    setTexture(entry.texture);
    return () => {
      entry.listeners.delete(setTexture);
      entry.refs--;
      if (entry.refs === 0)
        entry.timer = setTimeout(() => {
          entry.texture?.dispose();
          textures.delete(url);
        }, 1500);
    };
  }, [url]);
  return texture;
}
