"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { useSmoothScroll } from "../providers/SmoothScroll";
import Magnetic from "../ui/Magnetic";

export default function Footer() {
  const { scrollTo } = useSmoothScroll();
  return (
    <footer className="relative overflow-hidden border-t border-line/10 pt-20">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-3xl font-semibold leading-tight md:text-4xl">
              Open to {site.openTo.toLowerCase()}.
            </p>
            <a href={`mailto:${site.email}`} className="mt-4 inline-block font-mono text-sm text-cyan underline-offset-4 hover:underline">
              {site.email}
            </a>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow mb-4">Index</p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink/75 transition hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/immersive" className="text-ink/75 transition hover:text-ink">
                  Immersive gallery
                </Link>
              </li>
            </ul>
          </nav>
          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="space-y-2">
              <li><a href={site.github} target="_blank" rel="noopener noreferrer" className="text-ink/75 hover:text-ink">GitHub</a></li>
              <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink/75 hover:text-ink">LinkedIn</a></li>
              <li><a href={site.resumeUrl} download className="text-ink/75 hover:text-ink">Résumé</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line/10 py-6 font-mono text-xs text-muted">
          <span>© {new Date().getFullYear()} {site.name}. Built with Next.js, Three.js and GSAP.</span>
          <Magnetic>
            <button type="button" onClick={() => scrollTo(0)} className="flex items-center gap-2 uppercase tracking-[0.16em] hover:text-ink">
              Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden />
            </button>
          </Magnetic>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[18vw] font-bold leading-[0.8] tracking-tighter text-ink/[0.04]">
        {site.name.toUpperCase()}
      </p>
    </footer>
  );
}
