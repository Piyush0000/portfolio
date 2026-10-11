"use client";

import { m } from "framer-motion";

export type OrbitNode = { id: string; label: string; ring: number; angle: number };

export const orbitNodes: OrbitNode[] = [
  { id: "merchant", label: "Merchant", ring: 1, angle: -40 },
  { id: "admin", label: "Admin", ring: 2, angle: 200 },
  { id: "store", label: "Storefront", ring: 2, angle: 20 },
  { id: "ai", label: "AI layer", ring: 3, angle: 130 },
  { id: "integrations", label: "Integrations", ring: 3, angle: -95 },
];

const RINGS = [0, 88, 140, 192];

/**
 * Orbit's architecture as a live diagram: the API at the core, apps on
 * orbits around it. `active` highlights one node, or the core if "api".
 */
export default function OrbitDiagram({ active, className }: { active: string | null; className?: string }) {
  return (
    <svg viewBox="-230 -230 460 460" className={className} role="img" aria-label="Orbit 360 architecture: API core with merchant, admin, storefront, AI and integration layers">
      <defs>
        <radialGradient id="core-glow">
          <stop offset="0%" stopColor="rgb(var(--c-cyan))" stopOpacity="0.55" />
          <stop offset="100%" stopColor="rgb(var(--c-cyan))" stopOpacity="0" />
        </radialGradient>
      </defs>

      {RINGS.slice(1).map((r, i) => (
        <m.circle
          key={r}
          r={r}
          fill="none"
          stroke="rgb(var(--c-line))"
          strokeOpacity={0.12}
          strokeDasharray={i === 1 ? "3 6" : undefined}
          animate={{ rotate: active ? (i % 2 ? -1 : 1) * 30 : 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* Spokes from core to each node */}
      {orbitNodes.map((n) => {
        const { x, y } = polar(RINGS[n.ring], n.angle);
        const on = active === n.id || active === "api";
        return (
          <m.line
            key={`l-${n.id}`}
            x1={0}
            y1={0}
            x2={x}
            y2={y}
            stroke={on ? "rgb(var(--c-cyan))" : "rgb(var(--c-line))"}
            animate={{ strokeOpacity: on ? 0.8 : 0.08, pathLength: on ? 1 : 0.6 }}
            transition={{ duration: 0.8 }}
            strokeDasharray="2 4"
          />
        );
      })}

      <circle r="90" fill="url(#core-glow)" />
      <m.circle
        r="34"
        fill="rgb(var(--c-bg-2))"
        stroke="rgb(var(--c-cyan))"
        animate={{ scale: active === "api" ? 1.15 : 1, strokeWidth: active === "api" ? 2.5 : 1.2 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
      />
      <text textAnchor="middle" y="4" fontSize="12" fontFamily="var(--font-mono)" fill="rgb(var(--c-ink))">
        API
      </text>

      {orbitNodes.map((n) => {
        const { x, y } = polar(RINGS[n.ring], n.angle);
        const on = active === n.id;
        return (
          <m.g key={n.id} animate={{ x, y }} initial={false}>
            <m.circle
              r={on ? 14 : 7}
              fill={on ? "rgb(var(--c-magenta))" : "rgb(var(--c-violet))"}
              animate={{ r: on ? 14 : 7 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            />
            {on && (
              <m.circle
                r={14}
                fill="none"
                stroke="rgb(var(--c-magenta))"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
            <text
              y={-22}
              textAnchor="middle"
              fontSize="11"
              fontFamily="var(--font-mono)"
              fill="rgb(var(--c-ink))"
              opacity={on ? 1 : 0.55}
              style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}
            >
              {n.label}
            </text>
          </m.g>
        );
      })}
    </svg>
  );
}

function polar(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: Math.cos(a) * r, y: Math.sin(a) * r };
}
