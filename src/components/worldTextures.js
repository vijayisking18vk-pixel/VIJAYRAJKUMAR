import * as THREE from "three";
// Seeded grain avoids visible grid artifacts and keeps every visit deterministic.
function random(seed = 31) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}
function surface(size, paint) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  paint(ctx, random());
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
export function facadeTexture() {
  return surface(512, (c, r) => {
    c.fillStyle = "#dad2bd";
    c.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 34000; i++) {
      const v = r() > 0.5 ? "#fff8e820" : "#635c481b";
      c.fillStyle = v;
      c.fillRect(r() * 512, r() * 512, 1 + r() * 2, 1 + r() * 2);
    }
    for (let y = 20; y < 512; y += 128) {
      c.fillStyle = "#6f695333";
      c.fillRect(0, y + 100, 512, 3);
      for (let x = 25; x < 512; x += 128) {
        c.fillStyle = "#594d3c40";
        c.fillRect(x + 3, y + 5, 65, 84);
        c.fillStyle = "#ede2c8";
        c.fillRect(x - 4, y - 4, 64, 80);
        const g = c.createLinearGradient(x, y, x + 60, y + 75);
        g.addColorStop(0, "#1c302f");
        g.addColorStop(1, r() > 0.72 ? "#b6965a" : "#4f635c");
        c.fillStyle = g;
        c.fillRect(x, y, 56, 69);
        c.fillStyle = "#acaa91";
        c.fillRect(x + 26, y, 3, 69);
        c.fillRect(x, y + 32, 56, 3);
        c.fillStyle = "#e5ddc5";
        c.fillRect(x - 7, y + 70, 70, 5);
        c.fillStyle = "#453e3244";
        c.fillRect(x - 7, y + 75, 70, 4);
        if (r() > 0.5) {
          c.fillStyle = "#bab49666";
          for (let k = 7; k < 65; k += 8) c.fillRect(x + 2, y + k, 24, 2);
        }
        c.strokeStyle = "#fff6dd20";
        c.beginPath();
        c.moveTo(x + 32, y + 4);
        c.lineTo(x + 49, y + 25);
        c.stroke();
      }
    }
    for (let i = 0; i < 45; i++) {
      c.fillStyle = "#6257430b";
      c.fillRect(r() * 512, r() * 512, 2 + r() * 5, 10 + r() * 50);
    }
  });
}
export function plasterTexture() {
  return surface(256, (c, r) => {
    c.fillStyle = "#eee9df";
    c.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 16000; i++) {
      c.fillStyle = r() > 0.5 ? "#ffffff24" : "#827c7116";
      c.fillRect(r() * 256, r() * 256, 1, 1);
    }
    for (let y = 0; y < 256; y += 64) {
      c.fillStyle = "#817c7110";
      c.fillRect(0, y, 256, 1);
    }
  });
}
export function contactShadowTexture() {
  return surface(128, (c) => {
    const g = c.createRadialGradient(64, 64, 15, 64, 64, 64);
    g.addColorStop(0, "#15221ccc");
    g.addColorStop(0.55, "#15221c60");
    g.addColorStop(1, "#15221c00");
    c.fillStyle = g;
    c.fillRect(0, 0, 128, 128);
  });
}
// A tiny local environment supplies glazing reflections without an HDR download.
export function glazingEnvironment() {
  const faces = Array.from({ length: 6 }, (_, face) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const c = canvas.getContext("2d");
    const gradient = c.createLinearGradient(0, 0, 0, 64);
    gradient.addColorStop(0, "#829395");
    gradient.addColorStop(0.52, "#dbc09b");
    gradient.addColorStop(0.58, "#7c8174");
    gradient.addColorStop(1, "#343f38");
    c.fillStyle = gradient;
    c.fillRect(0, 0, 64, 64);
    if (face !== 2) {
      c.fillStyle = "#4a5650";
      for (let i = 0; i < 8; i++) c.fillRect(i * 9, 30 + ((i * 7) % 9), 7, 34);
    }
    return canvas;
  });
  const texture = new THREE.CubeTexture(faces);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
export function asphaltTexture() {
  const t = surface(512, (c, r) => {
    c.fillStyle = "#555958";
    c.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 85000; i++) {
      const n = 40 + Math.floor(r() * 85);
      c.fillStyle = `rgba(${n},${n},${n},.28)`;
      c.fillRect(r() * 512, r() * 512, 1 + r(), 1 + r());
    }
    for (let j = 0; j < 4; j++) {
      let x = r() * 512,
        y = r() * 512;
      c.strokeStyle = "#262c2b55";
      c.lineWidth = 0.7;
      c.beginPath();
      c.moveTo(x, y);
      for (let i = 0; i < 6; i++) {
        x += (r() - 0.5) * 35;
        y += r() * 17;
        c.lineTo(x, y);
      }
      c.stroke();
    }
    c.fillStyle = "#9a8c6c0c";
    c.fillRect(0, 0, 65, 512);
    c.fillRect(447, 0, 65, 512);
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 22);
  return t;
}
export function pavementTexture() {
  const t = surface(256, (c, r) => {
    c.fillStyle = "#b6ab90";
    c.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 16000; i++) {
      c.fillStyle = r() > 0.5 ? "#e9debd26" : "#534e3922";
      c.fillRect(r() * 256, r() * 256, 1, 1);
    }
    c.strokeStyle = "#665f4e";
    c.lineWidth = 2;
    for (let x = 0; x <= 256; x += 64) {
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(x, 256);
      c.stroke();
    }
    for (let y = 0; y <= 256; y += 64) {
      c.beginPath();
      c.moveTo(0, y);
      c.lineTo(256, y);
      c.stroke();
    }
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1, 35);
  return t;
}
