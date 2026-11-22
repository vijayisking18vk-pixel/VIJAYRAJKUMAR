import * as THREE from 'three';

export const StormCloudShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorDeep: { value: new THREE.Color('#070112') },
    uColorViolet: { value: new THREE.Color('#4B009E') },
    uColorPlasma: { value: new THREE.Color('#9D00FF') },
    uColorLightning: { value: new THREE.Color('#F8ECFF') },
    uLightningFlash: { value: 0.0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    void main() {
      vUv = uv;
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform vec3 uColorDeep;
    uniform vec3 uColorViolet;
    uniform vec3 uColorPlasma;
    uniform vec3 uColorLightning;
    uniform float uLightningFlash;

    varying vec2 vUv;
    varying vec3 vWorldPosition;

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
      float a = 0.55;
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for (int i = 0; i < 5; ++i) {
        v += a * noise(p);
        p = rot * p * 2.0 + vec2(uTime * 0.04);
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv * 2.5;
      float cloud = fbm(uv + vec2(uTime * 0.03, 0.0));
      cloud += 0.5 * fbm(uv * 2.0 - vec2(0.0, uTime * 0.05));

      vec3 col = mix(uColorDeep, uColorViolet, smoothstep(0.2, 0.8, cloud));
      col = mix(col, uColorPlasma, smoothstep(0.6, 1.0, cloud));

      // Occasional lightning burst
      col += uColorLightning * (uLightningFlash * pow(cloud, 3.0) * 2.0);

      float alpha = smoothstep(0.1, 0.6, cloud) * 0.85;
      gl_FragColor = vec4(col, alpha);
    }
  `,
};
