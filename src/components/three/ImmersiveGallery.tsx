"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { createXRStore, XR, useXRSessionModeSupported } from "@react-three/xr";
import * as THREE from "three";
import type { Project } from "@/data/projects";
import { readPalette, type ScenePalette } from "./palette";

const xrStore = createXRStore({ emulate: false });

/**
 * Draws a project panel onto a 2D canvas and returns it as a texture. Text is
 * rasterised locally, so nothing is fetched at runtime and it renders the same
 * in and out of a headset.
 */
function usePanelTexture(project: Project, palette: ScenePalette, active: boolean) {
  return useMemo(() => {
    const w = 1024;
    const h = 640;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    const accent = palette[project.accent];
    const rgb = (c: THREE.Color, a = 1) => `rgba(${(c.r * 255) | 0},${(c.g * 255) | 0},${(c.b * 255) | 0},${a})`;

    ctx.fillStyle = "rgba(10,12,24,0.92)";
    ctx.fillRect(0, 0, w, h);
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, rgb(accent, 0.35));
    grad.addColorStop(1, "rgba(10,12,24,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = rgb(accent, active ? 1 : 0.5);
    ctx.lineWidth = active ? 8 : 4;
    ctx.strokeRect(4, 4, w - 8, h - 8);

    ctx.fillStyle = rgb(accent);
    ctx.font = "600 30px ui-monospace, Menlo, Consolas, monospace";
    ctx.fillText(project.kicker.toUpperCase(), 56, 88);

    ctx.fillStyle = "#eef0fa";
    ctx.font = "700 84px system-ui, -apple-system, Segoe UI, sans-serif";
    ctx.fillText(project.title, 56, 190);

    ctx.fillStyle = "rgba(220,224,245,0.85)";
    ctx.font = "400 34px system-ui, -apple-system, Segoe UI, sans-serif";
    wrap(ctx, project.pitch, 56, 260, w - 112, 46, 5);

    ctx.fillStyle = rgb(accent, 0.9);
    ctx.font = "500 26px ui-monospace, Menlo, Consolas, monospace";
    const stack = project.stack.flatMap((s) => s.items).slice(0, 5).join("  ·  ");
    ctx.fillText(stack, 56, h - 56);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, [project, palette, active]);
}

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number, maxLines: number) {
  const words = text.split(" ");
  let line = "";
  let lines = 0;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) {
      if (++lines === maxLines) {
        ctx.fillText(`${line}…`, x, y);
        return;
      }
      ctx.fillText(line, x, y);
      line = word;
      y += lh;
    } else line = test;
  }
  ctx.fillText(line, x, y);
}

function Panel({
  project,
  index,
  total,
  palette,
  selected,
  onSelect,
}: {
  project: Project;
  index: number;
  total: number;
  palette: ScenePalette;
  selected: boolean;
  onSelect: (slug: string) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const texture = usePanelTexture(project, palette, hovered || selected);
  useEffect(() => () => texture.dispose(), [texture]);

  // Panels stand on a ring around the viewer at eye height.
  const angle = (index / total) * Math.PI * 2;
  const radius = 4.2;
  const position: [number, number, number] = [Math.sin(angle) * radius, 1.5, -Math.cos(angle) * radius];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + index) * 0.06;
    const target = hovered || selected ? 1.08 : 1;
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, target, 0.12));
  });

  return (
    <group ref={ref} position={position} rotation={[0, -angle, 0]}>
      <mesh
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect(project.slug);
        }}
      >
        <planeGeometry args={[1.92, 1.2]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Floor({ palette }: { palette: ScenePalette }) {
  return (
    <group>
      <gridHelper args={[30, 60, palette.cyan, palette.violet]} position={[0, 0, 0]}>
        <lineBasicMaterial attach="material" color={palette.violet} transparent opacity={0.25} />
      </gridHelper>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[15, 64]} />
        <meshBasicMaterial color={palette.bg} />
      </mesh>
    </group>
  );
}

function Starfield({ palette }: { palette: ScenePalette }) {
  const geo = useMemo(() => {
    const n = 900;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 12 + Math.random() * 14;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 0.9);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph);
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  return (
    <points geometry={geo}>
      <pointsMaterial color={palette.cyan} size={0.06} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

export default function ImmersiveGallery({
  projects,
  selected,
  onSelect,
}: {
  projects: Project[];
  selected: string | null;
  onSelect: (slug: string) => void;
}) {
  const [palette, setPalette] = useState<ScenePalette>(() => readPalette());
  const vrSupported = useXRSessionModeSupported("immersive-vr");
  const [inSession, setInSession] = useState(false);

  useEffect(() => {
    const obs = new MutationObserver(() => setPalette(readPalette()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const unsub = xrStore.subscribe((s) => setInSession(!!s.session));
    return () => {
      obs.disconnect();
      unsub();
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 1.6, 0.01], fov: 70 }} gl={{ antialias: true }}>
        <color attach="background" args={[palette.bg]} />
        <fog attach="fog" args={[palette.bg, 8, 26]} />
        <XR store={xrStore}>
          <Suspense fallback={null}>
            <Starfield palette={palette} />
            <Floor palette={palette} />
            {projects.map((p, i) => (
              <Panel
                key={p.slug}
                project={p}
                index={i}
                total={projects.length}
                palette={palette}
                selected={selected === p.slug}
                onSelect={onSelect}
              />
            ))}
          </Suspense>
        </XR>
        {!inSession && (
          <OrbitControls
            target={[0, 1.6, 0]}
            enablePan={false}
            enableZoom={false}
            rotateSpeed={-0.35}
            autoRotate={!selected}
            autoRotateSpeed={0.35}
          />
        )}
      </Canvas>

      {vrSupported && !inSession && (
        <button
          type="button"
          onClick={() => xrStore.enterVR()}
          className="btn-primary absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          Enter VR
        </button>
      )}
    </div>
  );
}
