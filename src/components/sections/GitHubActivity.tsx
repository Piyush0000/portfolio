"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import type { GitHubActivity as Data } from "@/lib/github";
import { site } from "@/data/site";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import CountUp from "../ui/CountUp";
import { useReducedMotion } from "../providers/Preferences";

const levels = ["bg-line/[0.06]", "bg-cyan/25", "bg-cyan/50", "bg-violet/75", "bg-magenta"];

function level(count: number, max: number) {
  if (count === 0) return 0;
  return Math.min(4, Math.ceil((count / Math.max(max, 1)) * 4));
}

const fmt = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function GitHubActivity({ data }: { data: Data | null }) {
  const reduced = useReducedMotion();

  const weeks: Data["days"][] = [];
  if (data) for (let i = 0; i < data.days.length; i += 7) weeks.push(data.days.slice(i, i + 7));
  const max = data ? Math.max(...data.days.map((d) => d.count)) : 0;
  const label = data?.source === "contributions" ? "contributions in the last year" : "public events, last 13 weeks";

  return (
    <section id="github" aria-labelledby="github-title" className="relative py-section">
      <div className="container">
        <SectionHeading index="06" eyebrow="Activity" title="Shipping, *in public* and private." />
        <h3 id="github-title" className="sr-only">GitHub activity</h3>

        {!data ? (
          <Reveal className="glass flex flex-wrap items-center justify-between gap-6 rounded-3xl p-8">
            <p className="text-lg text-ink/80">Live GitHub stats are unavailable right now.</p>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <FiGithub className="h-4 w-4" aria-hidden /> @{site.githubUser}
            </a>
          </Reveal>
        ) : (
          <div className="grid gap-5 lg:grid-cols-12">
            <Reveal className="glass rounded-3xl p-6 md:p-8 lg:col-span-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <CountUp value={String(data.total)} className="font-display text-5xl font-bold" />
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
                </div>
                <a href={data.profileUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <FiGithub className="h-4 w-4" aria-hidden /> @{data.user}
                </a>
              </div>

              <div className="mt-8 overflow-x-auto pb-2" role="img" aria-label={`GitHub heatmap: ${data.total} ${label}`}>
                <motion.div
                  className="flex w-max gap-[3px]"
                  initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((d) => (
                        <span
                          key={d.date}
                          title={`${d.count} on ${fmt.format(new Date(d.date))}`}
                          className={`block h-3 w-3 rounded-[3px] ${levels[level(d.count, max)]}`}
                        />
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                Less {levels.map((l) => <span key={l} className={`h-2.5 w-2.5 rounded-[2px] ${l}`} />)} More
              </div>
            </Reveal>

            <div className="grid gap-5 lg:col-span-4">
              <Reveal className="glass grid grid-cols-2 gap-4 rounded-3xl p-6" delay={0.1}>
                <div>
                  <CountUp value={String(data.publicRepos)} className="font-display text-3xl font-bold" />
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">public repos</p>
                </div>
                <div>
                  <CountUp value={String(data.followers)} className="font-display text-3xl font-bold" />
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">followers</p>
                </div>
              </Reveal>
              <Reveal className="glass rounded-3xl p-6" delay={0.15}>
                <p className="eyebrow mb-4">Recently pushed</p>
                <ul className="space-y-3">
                  {data.recentRepos.map((r) => (
                    <li key={r.name}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3">
                        <span className="min-w-0">
                          <span className="block truncate font-medium transition group-hover:text-cyan">{r.name}</span>
                          <span className="font-mono text-[0.68rem] text-muted">
                            {r.language ?? "Code"} · {fmt.format(new Date(r.pushedAt))}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-muted">
                          {r.stars > 0 && (
                            <>
                              <Star className="h-3 w-3" aria-hidden /> {r.stars}
                            </>
                          )}
                          <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
