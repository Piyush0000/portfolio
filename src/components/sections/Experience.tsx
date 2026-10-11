"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { experience } from "@/data/site";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

export default function Experience() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-section">
      <div className="container">
        <SectionHeading index="04" eyebrow="Experience" title="Leading now, *learning* always." />
        <h3 id="experience-title" className="sr-only">Work experience</h3>

        <ol ref={list} className="relative ml-2 md:ml-0">
          {/* Track + scroll-drawn progress line */}
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line/10 md:left-[25%]" />
          <m.span
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-cyan via-violet to-magenta md:left-[25%]"
          />

          {experience.map((job, i) => {
            const lead = job.type === "Leadership";
            return (
              <li key={`${job.company}-${job.title}`} className="relative grid gap-4 pb-14 pl-8 md:grid-cols-4 md:gap-12 md:pl-0">
                <span
                  aria-hidden
                  className={`absolute left-0 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 md:left-[25%] ${
                    lead ? "border-cyan bg-cyan shadow-[0_0_20px_rgb(var(--c-cyan))]" : "border-violet bg-bg"
                  }`}
                />
                <Reveal className="md:pr-10 md:text-right" delay={0.05}>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{job.period}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-cyan">{job.type}</p>
                </Reveal>
                <Reveal className="md:col-span-3" delay={0.1 + i * 0.02}>
                  <div className={lead ? "glass rounded-3xl p-6 md:p-8" : ""}>
                    <h4 className="font-display text-2xl font-semibold md:text-3xl">
                      {job.title} <span className="text-muted">@</span>{" "}
                      <span className={lead ? "text-gradient" : ""}>{job.company}</span>
                    </h4>
                    <p className="mt-3 text-lg text-ink/80">{job.summary}</p>
                    <ul className="mt-5 space-y-3">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-ink/75">
                          <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-cyan" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    {job.stack && (
                      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
                        {job.stack.map((s) => (
                          <li key={s} className="chip">
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
