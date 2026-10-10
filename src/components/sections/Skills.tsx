"use client";

import { motion } from "framer-motion";
import { Server, Sparkles, LayoutTemplate, Cloud } from "lucide-react";
import { skillGroups, type SkillGroup } from "@/data/site";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { useReducedMotion } from "../providers/Preferences";

const icons: Record<SkillGroup["id"], typeof Server> = {
  backend: Server,
  ai: Sparkles,
  frontend: LayoutTemplate,
  devops: Cloud,
};

export default function Skills() {
  const reduced = useReducedMotion();
  const all = skillGroups.flatMap((g) => g.items);

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden py-section">
      <div className="container">
        <SectionHeading index="05" eyebrow="Toolkit" title="Backend first. *AI* native." />
        <h3 id="skills-title" className="sr-only">Skills by area</h3>

        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((g, gi) => {
            const Icon = icons[g.id];
            return (
              <TiltCard key={g.id} className="rounded-3xl" max={5}>
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: gi * 0.08 }}
                  className="glass group relative h-full overflow-hidden rounded-3xl p-7 md:p-9"
                  style={{ ["--accent" as string]: `var(--c-${g.accent})` }}
                >
                  <div
                    aria-hidden
                    className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                    style={{ background: `rgb(var(--accent))` }}
                  />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "rgb(var(--accent))" }}>
                        0{gi + 1}
                      </p>
                      <h4 className="mt-2 font-display text-3xl font-semibold">{g.name}</h4>
                      <p className="mt-2 text-muted">{g.blurb}</p>
                    </div>
                    <Icon className="h-7 w-7" style={{ color: "rgb(var(--accent))" }} aria-hidden />
                  </div>
                  <motion.ul
                    className="relative mt-8 flex flex-wrap gap-2"
                    initial={reduced ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{ show: { transition: { staggerChildren: 0.035, delayChildren: 0.2 + gi * 0.08 } } }}
                  >
                    {g.items.map((s) => (
                      <motion.li
                        key={s}
                        variants={{ hidden: { opacity: 0, y: 12, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
                        className="chip text-[0.78rem] transition-colors hover:border-[rgb(var(--accent))] hover:text-ink"
                      >
                        {s}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>

      {/* Infinite marquee of every skill */}
      <div aria-hidden className="mt-section flex overflow-hidden border-y border-line/10 py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...all, ...all].map((s, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-3xl font-semibold text-ink/25 md:text-5xl">
              {s}
              <span className="h-2 w-2 rounded-full bg-cyan/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
