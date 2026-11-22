import * as THREE from 'three';

export const PlasmaFresnelShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorCore: { value: new THREE.Color('#070112') },
    uColorRim: { value: new THREE.Color('#9D00FF') },
    uColorEdge: { value: new THREE.Color('#D147FF') },
    uFresnelBias: { value: 0.1 },
    uFresnelScale: { value: 2.2 },
    uFresnelPower: { value: 2.8 },
    uLightningIntensity: { value: 1.5 },
  },
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform vec3 uColorCore;
    uniform vec3 uColorRim;
    uniform vec3 uColorEdge;
    uniform float uFresnelBias;
    uniform float uFresnelScale;
    uniform float uFresnelPower;
    uniform float uLightningIntensity;

    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    varying vec2 vUv;

    // Simple procedural noise for lightning jitter
    float hash(vec3 p) {
      p = fract(p * 0.3183099 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float noise(vec3 x) {
      vec3 p = floor(x);
      vec3 w = fract(x);
      vec3 u = w * w * (3.0 - 2.0 * w);
      float n = p.x + p.y * 157.0 + 113.0 * p.z;
      return mix(
        mix(mix(hash(p + vec3(0,0,0)), hash(p + vec3(1,0,0)), u.x),
            mix(hash(p + vec3(0,1,0)), hash(p + vec3(1,1,0)), u.x), u.y),
        mix(mix(hash(p + vec3(0,0,1)), hash(p + vec3(1,0,1)), u.x),
            mix(hash(p + vec3(0,1,1)), hash(p + vec3(1,1,1)), u.x), u.y), u.z
      );
    }

    void main() {
      vec3 viewDir = normalize(vViewPosition);
      vec3 norm = normalize(vNormal);

      // Classical Fresnel equation
      float fresnel = uFresnelBias + uFresnelScale * pow(1.0 - max(0.0, dot(viewDir, norm)), uFresnelPower);
      fresnel = clamp(fresnel, 0.0, 1.0);

      // Crackling lightning jitter across coordinates
      vec3 noiseCoord = vWorldPosition * 2.5 + vec3(0.0, uTime * 4.0, 0.0);
      float n1 = noise(noiseCoord);
      float n2 = noise(noiseCoord * 2.0 - vec3(uTime * 3.0, 0.0, 0.0));
      float lightning = pow(abs(n1 - n2), 0.5) * uLightningIntensity;

      // Color blending: Obsidian core -> Electric violet rim -> Blazing magenta edge
      vec3 finalColor = mix(uColorCore, uColorRim, fresnel);
      finalColor += uColorEdge * (fresnel * lightning * 1.8);

      // Specular highlight spike
      float spec = pow(max(0.0, dot(reflect(-viewDir, norm), vec3(0.0, 1.0, 0.5))), 16.0);
      finalColor += vec3(0.97, 0.92, 1.0) * spec * 0.4;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};
