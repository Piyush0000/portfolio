"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { flagship } from "@/data/projects";
import OrbitDiagram from "../project/OrbitDiagram";
import SectionHeading from "../ui/SectionHeading";
import CountUp from "../ui/CountUp";
import Magnetic from "../ui/Magnetic";

const cs = flagship.caseStudy!;

// Each scroll step lights up one part of the diagram.
const steps = [
  { node: null, eyebrow: "The brief", title: "From hello world to production", body: flagship.problem },
  { node: "merchant", eyebrow: cs.surfaces[0].audience, title: cs.surfaces[0].name, body: cs.surfaces[0].body },
  { node: "admin", eyebrow: cs.surfaces[1].audience, title: cs.surfaces[1].name, body: cs.surfaces[1].body },
  { node: "store", eyebrow: cs.surfaces[2].audience, title: cs.surfaces[2].name, body: cs.storefront.body },
  { node: "api", eyebrow: cs.surfaces[3].audience, title: cs.surfaces[3].name, body: flagship.architecture.summary },
  { node: "ai", eyebrow: "Seller & Customer AI", title: cs.ai.title, body: cs.ai.body },
  { node: "integrations", eyebrow: "Integrations", title: "Built for Indian D2C", body: "Cloudflare domains, PayU, Shiprocket and iThink logistics, Meta and Google Ads, and WhatsApp, wired into one data model." },
] as const;

export default function Flagship() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" aria-labelledby="flagship-title" className="relative py-section">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 h-[60vh] bg-[radial-gradient(ellipse_at_center,rgb(var(--c-cyan)/0.10),transparent_60%)]" />
      <div className="container relative">
        <SectionHeading index="02" eyebrow="Flagship" title="Orbit 360: *leading* a platform from zero." />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Sticky visual */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
              <div className="glass relative overflow-hidden rounded-3xl p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <p className="eyebrow">
                    <span className="text-cyan">{flagship.kicker}</span>
                  </p>
                  <span className="chip">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden /> {flagship.status}
                  </span>
                </div>
                <OrbitDiagram active={steps[active].node} className="mx-auto mt-4 aspect-square w-full max-w-[30rem]" />
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line/10 xl:grid-cols-4">
                  {flagship.facts.map((f) => (
                    <div key={f.label} className="bg-bg-2/80 p-4">
                      <dt className="sr-only">{f.label}</dt>
                      <dd>
                        <CountUp value={f.value} className="font-display text-2xl font-bold" />
                        <span className="mt-1 block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{f.label}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* Scroll steps */}
          <div className="lg:col-span-6">
            <h3 id="flagship-title" className="sr-only">Orbit 360 overview</h3>
            <ol className="space-y-6 lg:space-y-0">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  data-step={i}
                  className="flex min-h-[38vh] flex-col justify-center lg:min-h-[62vh]"
                >
                  <div
                    className={`border-l-2 pl-6 transition-colors duration-700 ${
                      active === i ? "border-cyan text-ink" : "border-line/10 lg:text-muted"
                    }`}
                  >
                    <p className="eyebrow mb-3">
                      <span className="text-cyan">0{i + 1}</span> · {s.eyebrow}
                    </p>
                    <p className="font-display text-2xl font-semibold md:text-4xl">{s.title}</p>
                    <p className="mt-4 text-lg leading-relaxed opacity-90">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3 pl-6">
              <Magnetic>
                <Link href={`/projects/${flagship.slug}`} className="btn-primary" data-cursor="Read">
                  Full case study <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </Magnetic>
              {flagship.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  {l.label} <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
