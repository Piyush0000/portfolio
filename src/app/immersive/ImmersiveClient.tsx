"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCover from "@/components/project/ProjectCover";

const ImmersiveGallery = dynamic(() => import("@/components/three/ImmersiveGallery"), {
  ssr: false,
  loading: () => <p className="absolute inset-0 grid place-items-center font-mono text-sm text-muted">Loading gallery…</p>,
});

// The gallery shows flagship and featured work.
const gallery = projects.filter((p) => p.tier !== "archive");

export default function ImmersiveClient() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const project = gallery.find((p) => p.slug === selected);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setWebgl(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setWebgl(false);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main id="main" className="relative h-[100svh] overflow-hidden">
      <h1 className="sr-only">Immersive project gallery</h1>

      {webgl && <ImmersiveGallery projects={gallery} selected={selected} onSelect={setSelected} />}

      {webgl === false && (
        <div className="container grid h-full content-center gap-6 pt-[var(--nav-h)]">
          <p className="max-w-xl text-muted">
            This device doesn&apos;t support WebGL, so here is the flat version of the gallery.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {gallery.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="group glass block overflow-hidden rounded-2xl p-2">
                  <ProjectCover project={p} className="aspect-[16/9] rounded-xl" />
                  <p className="p-3 font-display text-lg font-semibold">{p.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-[calc(var(--nav-h)+1rem)] z-10">
        <div className="container flex items-start justify-between gap-4">
          <Link href="/" className="glass pointer-events-auto inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.16em]">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Exit
          </Link>
          {webgl && (
            <p className="glass hidden max-w-xs rounded-2xl px-4 py-3 font-mono text-[0.7rem] leading-relaxed text-muted md:block">
              Drag to look around · Click a panel to open it · On a WebXR headset, press <span className="text-cyan">Enter VR</span>
            </p>
          )}
        </div>
      </div>

      {/* Keyboard / screen-reader access to the same panels */}
      {webgl && (
        <nav aria-label="Gallery projects" className="absolute inset-x-0 bottom-24 z-10 md:bottom-8">
          <ul className="container flex flex-wrap justify-center gap-2">
            {gallery.map((p) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => setSelected(p.slug)}
                  aria-pressed={selected === p.slug}
                  className={`chip backdrop-blur transition ${selected === p.slug ? "!border-cyan text-ink" : ""}`}
                >
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <AnimatePresence>
        {project && (
          <motion.aside
            key={project.slug}
            aria-label={`${project.title} details`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute bottom-4 right-4 z-20 w-[min(26rem,calc(100%-2rem))] rounded-3xl p-6 md:top-[calc(var(--nav-h)+5rem)] md:bottom-auto"
          >
            <button type="button" onClick={() => setSelected(null)} aria-label="Close details" className="absolute right-4 top-4 text-muted hover:text-ink">
              <X className="h-5 w-5" />
            </button>
            <p className="eyebrow" style={{ color: `rgb(var(--c-${project.accent}))` }}>
              {project.kicker}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold">{project.title}</h2>
            <p className="mt-3 text-ink/80">{project.pitch}</p>
            <p className="mt-3 font-mono text-xs text-muted">{project.role}</p>
            <Link href={`/projects/${project.slug}`} className="btn-primary mt-6">
              Open case study <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}
