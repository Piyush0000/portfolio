"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, FileDown } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { roles, site } from "@/data/site";
import { onWake } from "@/lib/wake";
import { usePrefs } from "../providers/Preferences";
import Magnetic from "../ui/Magnetic";
import ScrambleText from "../ui/ScrambleText";

// Three.js is code-split and only fetched on capable devices, once the visitor
// interacts (or after a few seconds), so it never competes with first paint.
const HeroScene = dynamic(() => import("../three/HeroScene"), { ssr: false });

function useWake() {
  const [awake, setAwake] = useState(false);
  useEffect(() => onWake(() => setAwake(true)), []);
  return awake;
}

function RoleCycler() {
  const [i, setI] = useState(0);
  const { motion } = usePrefs();
  useEffect(() => {
    if (motion === "reduced") return;
    const id = window.setInterval(() => setI((n) => (n + 1) % roles.length), 2800);
    return () => window.clearInterval(id);
  }, [motion]);
  return <ScrambleText key={roles[i]} text={roles[i]} hover={false} duration={700} className="text-cyan" />;
}

export default function Hero() {
  const { canRender3D, motion } = usePrefs();
  const awake = useWake();
  const [sceneReady, setSceneReady] = useState(false);
  const show3D = canRender3D && awake;

  const first = site.name.split(" ")[0];
  const last = site.name.split(" ").slice(1).join(" ");

  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--nav-h)]">
      {/* Backdrop: neon glows, grid and the static orb that the 3D scene replaces. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[20%] top-[-10%] h-[60vmax] w-[60vmax] bg-[radial-gradient(closest-side,rgb(var(--c-violet)/0.22),transparent)]" />
        <div className="absolute -right-[15%] bottom-[-20%] h-[50vmax] w-[50vmax] bg-[radial-gradient(closest-side,rgb(var(--c-cyan)/0.12),transparent)]" />
        <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
        <div
          className={`absolute right-[-22vmin] top-[14%] h-[58vmin] w-[58vmin] transition-opacity duration-1000 md:right-[4vw] md:top-1/2 md:h-[56vmin] md:w-[56vmin] md:-translate-y-1/2 ${
            sceneReady ? "opacity-0" : "opacity-50 md:opacity-100"
          }`}
        >
          <div className="absolute inset-0 animate-[spin_24s_linear_infinite] rounded-full will-change-transform bg-[conic-gradient(from_0deg,rgb(var(--c-cyan)),rgb(var(--c-violet)),rgb(var(--c-magenta)),rgb(var(--c-cyan)))] opacity-80 [mask-image:radial-gradient(closest-side,transparent_55%,black_80%,transparent)]" />
          <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#1c2142,#06070f_70%)] shadow-[inset_0_0_60px_rgb(var(--c-cyan)/0.5)]" />
          <div className="absolute inset-[-10%] rounded-full border border-cyan/20" />
        </div>
      </div>

      {show3D && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${sceneReady ? "opacity-100" : "opacity-0"}`}>
          <HeroScene animate={motion === "full"} onReady={() => setSceneReady(true)} />
        </div>
      )}

      <div className="container relative z-10">
        <div className="max-w-5xl">
          <p className="fade-up chip mb-8 w-fit" style={{ ["--d" as string]: "0s" }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-lime" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Open to {site.openTo}
          </p>

          <h1 id="hero-title" aria-label={site.name} className="font-display text-display-2xl font-bold uppercase">
            <span aria-hidden className="block overflow-hidden pb-[0.06em]">
              <span className="rise-word" style={{ ["--d" as string]: "0s" }}>
                {first}
              </span>
            </span>
            <span aria-hidden className="block overflow-hidden pb-[0.06em]">
              <span className="rise-word" style={{ ["--d" as string]: "0.08s" }}>
                <span className="text-gradient animate-shimmer">{last}</span>
              </span>
            </span>
          </h1>

          <p className="fade-up mt-8 font-mono text-sm uppercase tracking-[0.2em] text-muted md:text-base" style={{ ["--d" as string]: "0.25s" }}>
            <span className="text-ink/60">&gt; </span>
            <RoleCycler />
          </p>

          <p className="fade-up mt-6 max-w-2xl text-lg leading-relaxed text-ink/80 md:text-xl" style={{ ["--d" as string]: "0.35s" }}>
            {site.intro}
          </p>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "0.45s" }}>
            <Magnetic>
              <Link href="/projects/orbit-360" className="btn-primary" data-cursor="Open">
                Orbit case study <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Magnetic>
            <Magnetic>
              <a href={site.resumeUrl} download className="btn-ghost">
                Résumé <FileDown className="h-4 w-4" aria-hidden />
              </a>
            </Magnetic>
            <div className="ml-1 flex items-center gap-1">
              <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="grid h-11 w-11 place-items-center rounded-full text-ink/70 transition hover:bg-ink/5 hover:text-ink">
                <FiGithub className="h-5 w-5" />
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="grid h-11 w-11 place-items-center rounded-full text-ink/70 transition hover:bg-ink/5 hover:text-ink">
                <FiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="fade-up absolute inset-x-0 bottom-6 z-10" style={{ ["--d" as string]: "0.6s" }}>
        <div className="container flex items-end justify-between font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          <span className="hidden sm:block">
            CTO · Evoc Labs <span className="text-cyan">/</span> {site.location}
          </span>
          <a href="#about" className="flex items-center gap-2 transition hover:text-ink">
            Scroll <ArrowDownRight className="h-3.5 w-3.5 animate-float" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
