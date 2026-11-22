import * as THREE from 'three';

// Vertex Shader for Plasma Rim / Lightning Shell
export const plasmaVertexShader = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDirection;
  varying vec2 vUv;
  uniform float uTime;

  // Simple 3D noise function for vertex vibration
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + .1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                   mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                   mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vViewDirection = normalize(cameraPosition - worldPos.xyz);

    // Subtle plasma displacement along normal
    float displacement = noise(position * 3.5 + vec3(0.0, uTime * 2.2, uTime * 1.5)) * 0.05;
    vec3 newPosition = position + normal * displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// Fragment Shader for Electric Plasma Lightning Rim
export const plasmaFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewDirection;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec3 uColorCore;      // e.g. #F8ECFF
  uniform vec3 uColorElectric;  // e.g. #9D00FF
  uniform vec3 uColorPlasma;    // e.g. #D147FF
  uniform float uIntensity;

  // Simplex-style 2D Noise for crackling lightning filaments
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // Sharp Fresnel formula: 1.0 - dot(N, V)
    float NdotV = max(0.0, dot(vNormal, vViewDirection));
    float fresnel = pow(1.0 - NdotV, 2.5);

    // Crackling lightning noise on surface
    vec2 noiseCoord1 = vUv * 16.0 + vec2(uTime * 3.0, uTime * 2.0);
    vec2 noiseCoord2 = vUv * 32.0 - vec2(uTime * 4.5, uTime * 3.5);
    float n1 = snoise(noiseCoord1);
    float n2 = snoise(noiseCoord2);
    
    // High-frequency filament threshold
    float arc1 = pow(abs(n1), 6.0) * 1.5;
    float arc2 = pow(abs(n2), 8.0) * 2.2;
    float lightning = arc1 + arc2;

    // Composite glow: Base Fresnel + Electric Filaments
    float plasmaGlow = (fresnel * 1.8 + lightning * fresnel * 2.5) * uIntensity;

    // Color gradient mixing: Abyssal edge -> Plasma Magenta -> Electric Core
    vec3 color = mix(uColorElectric, uColorPlasma, clamp(fresnel * 1.5, 0.0, 1.0));
    color = mix(color, uColorCore, clamp(lightning * 1.8, 0.0, 1.0));

    // Dynamic alpha with transparent interior and glowing crackling rim
    float alpha = clamp(plasmaGlow, 0.0, 0.95);

    gl_FragColor = vec4(color, alpha);
  }
`;

// Shaders for Volumetric Ultraviolet Nebula Clouds
export const nebulaVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const nebulaFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorBase;
  uniform vec3 uColorHighlight;
  uniform float uOpacity;

  // Simple FBM for cosmic cloud turbulence
  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise2(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i), hash21(i + vec2(1, 0)), f.x),
               mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 4; ++i) {
      v += a * noise2(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 3.0;
    float t = uTime * 0.08;

    float q = fbm(p + vec2(t * 0.5, t * 0.3));
    float r = fbm(p + q * 1.5 + vec2(t * 0.2, -t * 0.4));
    
    // Radial falloff so billboards blend seamlessly
    float d = distance(vUv, vec2(0.5));
    float mask = smoothstep(0.5, 0.0, d);

    vec3 col = mix(uColorBase, uColorHighlight, r);
    float alpha = r * mask * uOpacity;

    gl_FragColor = vec4(col, alpha);
  }
`;
