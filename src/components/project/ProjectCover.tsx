import Image from "next/image";
import type { Accent, Motif, Project } from "@/data/projects";

const accentVar: Record<Accent, string> = {
  cyan: "var(--c-cyan)",
  magenta: "var(--c-magenta)",
  violet: "var(--c-violet)",
  lime: "var(--c-lime)",
};

/**
 * Cover art for a project. Uses the real screenshot when the data provides
 * one, otherwise draws a generated SVG preview of the project's architecture.
 */
export default function ProjectCover({ project, className, priority }: { project: Project; className?: string; priority?: boolean }) {
  const color = `rgb(${accentVar[project.accent]})`;
  return (
    <div
      className={`relative overflow-hidden bg-bg-2 ${className ?? ""}`}
      style={{ ["--accent" as string]: color }}
    >
      {project.preview.kind === "image" ? (
        <Image
          src={project.preview.src}
          alt={project.preview.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: `radial-gradient(120% 90% at 85% 10%, color-mix(in srgb, ${color} 28%, transparent), transparent 60%)` }}
          />
          <div aria-hidden className="bg-grid mask-radial absolute inset-0 opacity-60" />
          <svg
            role="img"
            aria-label={`Generated preview: ${project.title}`}
            viewBox="0 0 400 250"
            className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.04]"
            style={{ color }}
          >
            <MotifArt motif={project.preview.motif} />
          </svg>
        </>
      )}
    </div>
  );
}

function MotifArt({ motif }: { motif: Motif }) {
  switch (motif) {
    case "orbit":
      return (
        <g fill="none" stroke="currentColor">
          <circle cx="200" cy="125" r="26" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" />
          <text x="200" y="129" textAnchor="middle" fill="currentColor" stroke="none" fontSize="10" fontFamily="monospace">
            API
          </text>
          {[
            { rx: 70, ry: 30, rot: -18 },
            { rx: 115, ry: 48, rot: 12 },
            { rx: 165, ry: 70, rot: -6 },
          ].map((o, i) => (
            <ellipse key={i} cx="200" cy="125" rx={o.rx} ry={o.ry} transform={`rotate(${o.rot} 200 125)`} strokeOpacity={0.5 - i * 0.1} />
          ))}
          {[
            { x: 136, y: 140, l: "STORE" },
            { x: 300, y: 98, l: "MERCHANT" },
            { x: 92, y: 88, l: "ADMIN" },
            { x: 330, y: 160, l: "AI" },
          ].map((n) => (
            <g key={n.l}>
              <circle cx={n.x} cy={n.y} r="5" fill="currentColor" />
              <text x={n.x} y={n.y - 11} textAnchor="middle" fill="currentColor" stroke="none" fontSize="8" fontFamily="monospace" opacity="0.85">
                {n.l}
              </text>
            </g>
          ))}
        </g>
      );
    case "voice":
      return (
        <g fill="currentColor">
          {Array.from({ length: 48 }, (_, i) => {
            const h = 8 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 120;
            return <rect key={i} x={26 + i * 7.4} y={125 - h / 2} width="3.4" height={h} rx="1.7" opacity={0.35 + (h / 128) * 0.65} />;
          })}
          <text x="26" y="40" fontSize="9" fontFamily="monospace" opacity="0.8">
            VAD → STT → LLM → TTS
          </text>
        </g>
      );
    case "candles":
      return (
        <g>
          {Array.from({ length: 22 }, (_, i) => {
            const base = 150 - Math.sin(i * 0.45) * 40 - i * 2.2;
            const up = Math.sin(i * 1.7) > -0.2;
            const body = 10 + Math.abs(Math.cos(i * 1.3)) * 24;
            const x = 30 + i * 16;
            return (
              <g key={i} stroke="currentColor" fill="currentColor" opacity={up ? 1 : 0.4}>
                <line x1={x + 4} x2={x + 4} y1={base - body / 2 - 10} y2={base + body / 2 + 10} strokeWidth="1" />
                <rect x={x} y={base - body / 2} width="8" height={body} rx="1" fillOpacity={up ? 0.9 : 0.15} />
              </g>
            );
          })}
        </g>
      );
    case "graph":
      return (
        <g fill="none" stroke="currentColor">
          {[
            { x: 60, l: "SEARCH" },
            { x: 153, l: "READ" },
            { x: 246, l: "WRITE" },
            { x: 340, l: "CRITIC" },
          ].map((n, i, arr) => (
            <g key={n.l}>
              {i < arr.length - 1 && <path d={`M${n.x + 22} 125 L${arr[i + 1].x - 22} 125`} strokeDasharray="4 4" />}
              <rect x={n.x - 22} y="103" width="44" height="44" rx="12" fill="currentColor" fillOpacity="0.14" />
              <text x={n.x} y="165" textAnchor="middle" fill="currentColor" stroke="none" fontSize="8" fontFamily="monospace">
                {n.l}
              </text>
              <circle cx={n.x} cy="125" r="5" fill="currentColor" />
            </g>
          ))}
          <path d="M340 103 C 300 40, 100 40, 60 103" strokeOpacity="0.35" />
        </g>
      );
    default:
      return (
        <g fill="currentColor">
          {Array.from({ length: 60 }, (_, i) => {
            const x = 40 + (i % 12) * 28;
            const y = 50 + Math.floor(i / 12) * 32;
            const o = (Math.sin(i * 2.3) + 1) / 2;
            return <rect key={i} x={x} y={y} width="16" height="16" rx="4" opacity={0.1 + o * 0.7} />;
          })}
        </g>
      );
  }
}
