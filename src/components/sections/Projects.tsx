"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { archive, featured, type Project } from "@/data/projects";
import ProjectCover from "../project/ProjectCover";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import Reveal from "../ui/Reveal";
import { useReducedMotion } from "../providers/Preferences";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-section">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title="AI agents, voice and *real-money* systems."
          intro="Each one is in a repo you can read. Entries come from the code, READMEs and git history, not from memory."
        />
        <h3 id="projects-title" className="sr-only">Featured projects</h3>
        <div className="space-y-16 md:space-y-28">
          {featured.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} flip={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-section">
          <Reveal>
            <h3 className="eyebrow mb-6">Earlier work</h3>
          </Reveal>
          <ul className="divide-y divide-line/10 border-y border-line/10">
            {archive.map((p) => (
              <ArchiveRow key={p.slug} project={p} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ project: p, flip }: { project: Project; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);
  const repo = p.repos[0];

  return (
    <article ref={ref} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <TiltCard className="rounded-3xl" max={7}>
          <Link
            href={`/projects/${p.slug}`}
            data-cursor="View"
            className="group glass block overflow-hidden rounded-3xl p-2"
            aria-label={`${p.title} case study`}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem]">
              <motion.div style={{ y }} className="absolute inset-[-10%]">
                <ProjectCover project={p} className="h-full w-full" />
              </motion.div>
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="chip backdrop-blur">{p.status}</span>
                <span className="chip backdrop-blur">{p.year}</span>
              </div>
            </div>
          </Link>
        </TiltCard>
      </Reveal>

      <Reveal className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`} delay={0.1}>
        <p className="eyebrow mb-4" style={{ color: `rgb(var(--c-${p.accent}))` }}>
          {p.kicker}
        </p>
        <h4 className="font-display text-display-md font-semibold">
          <Link href={`/projects/${p.slug}`} className="transition hover:text-cyan">
            {p.title}
          </Link>
        </h4>
        <p className="mt-5 text-lg leading-relaxed text-ink/80">{p.pitch}</p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">Role: {p.role}</p>

        {p.facts.length > 0 && (
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
            {p.facts.slice(0, 3).map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="font-display text-2xl font-bold">{f.value}</span>
                  <span className="block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
          {p.stack.flatMap((s) => s.items).slice(0, 7).map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href={`/projects/${p.slug}`} className="btn-ghost">
            Case study <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          {repo &&
            (repo.visibility === "public" ? (
              <a href={repo.url} target="_blank" rel="noopener noreferrer" className="btn px-4 text-ink/80 hover:text-ink">
                <FiGithub className="h-4 w-4" aria-hidden /> Code
              </a>
            ) : (
              <span className="btn cursor-default px-4 text-muted" title="Private repository, available on request">
                <Lock className="h-4 w-4" aria-hidden /> Private repo
              </span>
            ))}
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn px-4 text-ink/80 hover:text-ink">
              {l.label} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          ))}
        </div>
      </Reveal>
    </article>
  );
}

function ArchiveRow({ project: p }: { project: Project }) {
  const repo = p.repos[0];
  return (
    <li className="group relative">
      <a
        href={repo?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-ink/[0.03] md:py-8"
      >
        <span className="col-span-2 font-mono text-xs text-muted md:col-span-1">{p.year}</span>
        <span className="col-span-10 font-display text-xl font-semibold transition group-hover:translate-x-2 group-hover:text-cyan md:col-span-4 md:text-2xl">
          {p.title}
        </span>
        <span className="col-span-12 text-ink/70 md:col-span-5">{p.pitch}</span>
        <span className="col-span-12 flex items-center justify-end gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted md:col-span-2">
          <FiGithub className="h-4 w-4" aria-hidden /> Code <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
        </span>
      </a>
      {/* Floating preview on hover (desktop) */}
      <div aria-hidden className="pointer-events-none absolute right-[18%] top-1/2 z-10 hidden w-64 -translate-y-1/2 scale-90 overflow-hidden rounded-2xl opacity-0 shadow-2xl transition duration-500 group-hover:scale-100 group-hover:opacity-100 xl:block">
        <ProjectCover project={p} className="aspect-[16/10]" />
      </div>
    </li>
  );
}
