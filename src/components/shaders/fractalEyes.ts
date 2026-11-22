import * as THREE from 'three';

export const FractalEyesShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uOpenProgress: { value: 1.0 }, // 0 = closed, 1 = fully open
    uColorIris: { value: new THREE.Color('#9D00FF') },
    uColorGaze: { value: new THREE.Color('#D147FF') },
    uColorCore: { value: new THREE.Color('#F8ECFF') },
    uIntensity: { value: 2.2 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uOpenProgress;
    uniform vec3 uColorIris;
    uniform vec3 uColorGaze;
    uniform vec3 uColorCore;
    uniform float uIntensity;

    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    // Single eye computation
    float eyeMask(vec2 uv, vec2 center, vec2 mouseOffset, float open) {
      vec2 p = uv - center;

      // Eyelid opening
      float h = 0.45;
      float w = 0.85;
      float d = length(vec2(p.x / w, p.y / max(0.02, h * max(0.05, open))));
      float eyeAperture = 1.0 - smoothstep(0.7, 1.0, d);

      // Pupil & Iris tracking cursor
      vec2 irisCenter = center + mouseOffset * 0.08;
      vec2 ip = uv - irisCenter;
      float r = length(ip);
      float angle = atan(ip.y, ip.x);

      // Fractal iris filaments
      float filament = fbm(vec2(angle * 4.0, r * 12.0 - uTime * 0.5));
      filament += 0.5 * fbm(vec2(angle * 8.0 + uTime * 0.3, r * 20.0));

      // Inverted smoothsteps: 1.0 - smoothstep(min, max, r)
      float pupil = 1.0 - smoothstep(0.02, 0.06, length(vec2(ip.x * 2.2, ip.y)));
      float iris = (1.0 - smoothstep(0.08, 0.34, r)) * (0.6 + 0.4 * filament);
      float glow = 1.0 - smoothstep(0.0, 0.65, r);

      float val = (iris - pupil * 0.85 + glow * 0.6) * eyeAperture;
      return max(0.0, val);
    }

    void main() {
      // Centered UV aspect
      vec2 uv = (vUv - 0.5) * vec2(2.4, 1.0) + 0.5;

      vec2 leftEye = vec2(0.28, 0.5);
      vec2 rightEye = vec2(0.72, 0.5);

      float e1 = eyeMask(uv, leftEye, uMouse, uOpenProgress);
      float e2 = eyeMask(uv, rightEye, uMouse, uOpenProgress);
      float totalEyes = e1 + e2;

      // Vivid violet color blend with glowing white core
      vec3 col = mix(uColorIris, uColorGaze, clamp(totalEyes * 0.8, 0.0, 1.0));
      col = mix(col, uColorCore, clamp(pow(totalEyes, 2.2) * 1.6, 0.0, 1.0));
      col *= totalEyes * uIntensity;

      float alpha = clamp(totalEyes * 1.8, 0.0, 1.0);
      gl_FragColor = vec4(col, alpha);
    }
  `,
};
