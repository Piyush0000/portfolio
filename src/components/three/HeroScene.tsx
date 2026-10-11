"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { simplexNoise } from "./glsl";
import { readPalette, type ScenePalette } from "./palette";

type Input = { mx: number; my: number; scroll: number };
type InputRef = React.MutableRefObject<Input>;

// ─── Orb: noise-displaced icosphere with an iridescent fresnel rim ──────────
const orbVertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uScroll;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;
  ${simplexNoise}
  void main() {
    float n = snoise(normal * 1.3 + vec3(uTime * 0.22, uTime * 0.17, uTime * 0.05));
    float detail = snoise(normal * 3.4 - uTime * 0.35) * 0.3;
    float energy = 1.0 + length(uMouse) * 0.9 + uScroll * 1.6;
    vNoise = n;
    vec3 p = position + normal * (n + detail) * uAmp * energy;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vView = normalize(-mv.xyz);
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`;

const orbFragment = /* glsl */ `
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;
  void main() {
    float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.4);
    float t = vNoise * 0.5 + 0.5;
    vec3 grad = mix(uC1, uC2, smoothstep(0.0, 0.55, t));
    grad = mix(grad, uC3, smoothstep(0.45, 1.0, t));
    float bands = smoothstep(0.93, 1.0, sin(vNoise * 22.0 + uTime * 1.4) * 0.5 + 0.5);
    vec3 core = vec3(0.025, 0.028, 0.07);
    vec3 col = mix(core, grad, clamp(fres * 1.35 + 0.06, 0.0, 1.0));
    col += grad * bands * 0.45;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

function Orb({ palette, input, animate }: { palette: ScenePalette; input: InputRef; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.LineSegments>(null);
  const mouse = useRef(new THREE.Vector2());
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.2 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uC1: { value: palette.cyan.clone() },
      uC2: { value: palette.violet.clone() },
      uC3: { value: palette.magenta.clone() },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    uniforms.uC1.value.copy(palette.cyan);
    uniforms.uC2.value.copy(palette.violet);
    uniforms.uC3.value.copy(palette.magenta);
  }, [palette, uniforms]);

  const shellGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.05, 1)), []);

  useFrame((_, dt) => {
    const delta = Math.min(dt, 1 / 30);
    const { mx, my, scroll } = input.current;
    if (animate) uniforms.uTime.value += delta;
    mouse.current.set(mx, my);
    uniforms.uMouse.value.lerp(mouse.current, 0.06);
    uniforms.uScroll.value = THREE.MathUtils.lerp(uniforms.uScroll.value, scroll, 0.08);

    const g = group.current;
    if (!g) return;
    // Keep clear of the headline: sit in the right third, sized to the viewport.
    const baseX = viewport.width * 0.3;
    const fit = THREE.MathUtils.clamp(viewport.width / 15, 0.5, 0.95);
    g.position.x = THREE.MathUtils.lerp(g.position.x, baseX - mx * 0.25, 0.05);
    g.position.y = THREE.MathUtils.lerp(g.position.y, scroll * 2.2 + my * 0.2, 0.08);
    const s = fit * (1 - scroll * 0.25);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.08));
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, my * 0.35, 0.05);
    g.rotation.y += animate ? delta * 0.12 : 0;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -mx * 0.2, 0.05);
    if (shell.current && animate) {
      shell.current.rotation.y -= delta * 0.18;
      shell.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.45, 48]} />
        <shaderMaterial vertexShader={orbVertex} fragmentShader={orbFragment} uniforms={uniforms} />
      </mesh>
      <lineSegments ref={shell} geometry={shellGeometry}>
        <lineBasicMaterial color={palette.cyan} transparent opacity={palette.light ? 0.35 : 0.18} toneMapped={false} />
      </lineSegments>
      <OrbitRing radius={2.65} tilt={[1.2, 0.2, 0.3]} speed={0.5} color={palette.cyan} animate={animate} />
      <OrbitRing radius={3.2} tilt={[1.75, -0.4, -0.2]} speed={-0.32} color={palette.magenta} animate={animate} />
    </group>
  );
}

function OrbitRing({
  radius,
  tilt,
  speed,
  color,
  animate,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: THREE.Color;
  animate: boolean;
}) {
  const pivot = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (animate && pivot.current) pivot.current.rotation.z += Math.min(dt, 1 / 30) * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <group ref={pivot}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Particle field ─────────────────────────────────────────────────────────
const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uScroll;
  attribute float aSeed;
  attribute float aScale;
  varying float vSeed;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.3 + aSeed * 6.2831) * 0.25;
    p.x += cos(uTime * 0.2 + aSeed * 12.0) * 0.18;
    p.z += uScroll * 3.0 * aSeed;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * uPixelRatio * (26.0 / -mv.z);
    vSeed = aSeed;
    vAlpha = 0.45 + 0.55 * (0.5 + 0.5 * sin(uTime * 1.5 + aSeed * 40.0));
  }
`;

const particleFragment = /* glsl */ `
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform float uOpacity;
  varying float vSeed;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    vec3 col = vSeed < 0.45 ? uC1 : (vSeed < 0.75 ? uC2 : uC3);
    gl_FragColor = vec4(col, a * vAlpha * uOpacity);
    #include <colorspace_fragment>
  }
`;

function Particles({ palette, input, animate, count }: { palette: ScenePalette; input: InputRef; animate: boolean; count: number }) {
  const points = useRef<THREE.Points>(null);
  const dpr = useThree((s) => s.viewport.dpr);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const scale = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spherical shell so the orb sits in clear space.
      const r = 3.6 + Math.pow(Math.random(), 0.7) * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(phi) - 2;
      seed[i] = Math.random();
      scale[i] = 0.6 + Math.random() * 1.8;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aScale", new THREE.BufferAttribute(scale, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPixelRatio: { value: 1 },
      uOpacity: { value: 1 },
      uC1: { value: new THREE.Color() },
      uC2: { value: new THREE.Color() },
      uC3: { value: new THREE.Color() },
    }),
    [],
  );

  useEffect(() => {
    uniforms.uC1.value.copy(palette.cyan);
    uniforms.uC2.value.copy(palette.violet);
    uniforms.uC3.value.copy(palette.magenta);
    uniforms.uOpacity.value = palette.light ? 0.75 : 1;
  }, [palette, uniforms]);

  useEffect(() => {
    uniforms.uPixelRatio.value = Math.min(dpr, 2);
  }, [dpr, uniforms]);

  useFrame((_, dt) => {
    const delta = Math.min(dt, 1 / 30);
    if (animate) uniforms.uTime.value += delta;
    uniforms.uScroll.value = THREE.MathUtils.lerp(uniforms.uScroll.value, input.current.scroll, 0.08);
    if (points.current) {
      if (animate) points.current.rotation.y += delta * 0.015;
      points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, input.current.my * 0.08, 0.04);
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <shaderMaterial
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={palette.light ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraRig({ input }: { input: InputRef }) {
  useFrame(({ camera }) => {
    const { mx, my, scroll } = input.current;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mx * 0.6, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, my * 0.4, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.5 + scroll * 1.5, 0.06);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/** Signals the parent once the first frame has rendered, so the fallback can fade. */
function ReadySignal({ onReady }: { onReady?: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (!done.current) {
      done.current = true;
      requestAnimationFrame(() => onReady?.());
    }
  });
  return null;
}

export default function HeroScene({ animate = true, onReady }: { animate?: boolean; onReady?: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const input = useRef<Input>({ mx: 0, my: 0, scroll: 0 });
  const [palette, setPalette] = useState<ScenePalette>(() => readPalette());
  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState(1.5);

  // Pointer and scroll are tracked on window: the canvas sits behind the hero copy.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      input.current.mx = (e.clientX / window.innerWidth) * 2 - 1;
      input.current.my = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      input.current.scroll = Math.min(1, window.scrollY / window.innerHeight);
    };
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Re-read colors on theme change.
  useEffect(() => {
    const obs = new MutationObserver(() => setPalette(readPalette()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Stop rendering when the hero is off-screen or the tab is hidden.
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    let onScreen = true;
    const update = () => setVisible(onScreen && document.visibilityState === "visible");
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const frameloop = !visible ? "never" : animate ? "always" : "demand";

  return (
    <div ref={container} className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, dpr]}
        frameloop={frameloop}
        camera={{ position: [0, 0, 7.5], fov: 42, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.75)} />
        <CameraRig input={input} />
        <Orb palette={palette} input={input} animate={animate} />
        <Particles palette={palette} input={input} animate={animate} count={1600} />
        <ReadySignal onReady={onReady} />
      </Canvas>
    </div>
  );
}
