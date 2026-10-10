import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { getProject, projects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import ProjectCover from "@/components/project/ProjectCover";
import OrbitDiagram from "@/components/project/OrbitDiagram";
import SplitReveal from "@/components/ui/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import TiltCard from "@/components/ui/TiltCard";
import Footer from "@/components/sections/Footer";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  const title = `${p.title}: ${p.kicker}`;
  return {
    title,
    description: p.pitch,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title, description: p.pitch, url: `/projects/${p.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description: p.pitch },
  };
}

export default function ProjectPage({ params }: Params) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const cs = p.caseStudy;
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.pitch,
    creator: { "@type": "Person", name: site.name },
    dateCreated: p.year,
    keywords: p.stack.flatMap((s) => s.items).join(", "),
    ...(p.repos[0]?.visibility === "public" ? { codeRepository: p.repos[0].url } : {}),
  };

  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="main" className="pt-[calc(var(--nav-h)+3rem)]">
        <article>
          {/* ── Header ───────────────────────────── */}
          <header className="container">
            <Link href="/#projects" className="eyebrow inline-flex items-center gap-2 transition hover:text-ink">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All work
            </Link>
            <p className="eyebrow mt-10" style={{ color: `rgb(var(--c-${p.accent}))` }}>
              {p.kicker}
            </p>
            <SplitReveal as="h1" immediate text={p.title} className="mt-4 font-display text-display-xl font-bold" />
            <p className="fade-up mt-8 max-w-3xl text-xl leading-relaxed text-ink/85 md:text-2xl" style={{ ["--d" as string]: "0.2s" }}>
              {p.pitch}
            </p>

            <div className="fade-up" style={{ ["--d" as string]: "0.3s" }}>
              <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 sm:grid-cols-2 lg:grid-cols-4">
                <Meta label="Role">{p.role}</Meta>
                <Meta label="Year">{p.year}</Meta>
                <Meta label="Status">{p.status}</Meta>
                <Meta label="Links">
                  <span className="flex flex-col gap-1.5">
                    {p.repos.map((r) =>
                      r.visibility === "public" ? (
                        <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-cyan">
                          <FiGithub className="h-4 w-4" aria-hidden /> {r.label}
                        </a>
                      ) : (
                        <span key={r.url} className="inline-flex items-center gap-2 text-muted" title="Private repository, available on request">
                          <Lock className="h-4 w-4" aria-hidden /> {r.label} (private)
                        </span>
                      ),
                    )}
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-cyan">
                        <ArrowUpRight className="h-4 w-4" aria-hidden /> {l.label}
                      </a>
                    ))}
                  </span>
                </Meta>
              </dl>
            </div>
          </header>

          {/* ── Cover ────────────────────────────── */}
          <div className="container mt-16">
            <Reveal>
              <TiltCard className="rounded-3xl" max={3}>
                <div className="glass overflow-hidden rounded-3xl p-2">
                  {cs ? (
                    <div className="grid items-center gap-6 rounded-[1.25rem] bg-bg-2 p-6 md:grid-cols-2 md:p-10">
                      <OrbitDiagram active="api" className="mx-auto aspect-square w-full max-w-md" />
                      <div>
                        <p className="eyebrow mb-4">Architecture</p>
                        <p className="text-lg leading-relaxed text-ink/85">{p.architecture.summary}</p>
                      </div>
                    </div>
                  ) : (
                    <ProjectCover project={p} priority className="aspect-[16/8] rounded-[1.25rem]" />
                  )}
                </div>
              </TiltCard>
            </Reveal>

            {p.facts.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 md:grid-cols-4">
                {p.facts.map((f) => (
                  <div key={f.label} className="bg-bg p-6">
                    <dt className="sr-only">{f.label}</dt>
                    <dd>
                      <CountUp value={f.value} className="font-display text-3xl font-bold md:text-4xl" />
                      <span className="mt-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{f.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* ── Body ─────────────────────────────── */}
          <div className="container mt-section space-y-section pb-section">
            <Block num={num()} title="The problem">
              <p className="text-xl leading-relaxed text-ink/85">{p.problem}</p>
            </Block>

            {cs && (
              <Block num={num()} title="My leadership">
                <ul className="space-y-4">
                  {cs.leadership.map((l) => (
                    <li key={l} className="flex gap-4 text-lg text-ink/85">
                      <span aria-hidden className="mt-3 h-px w-6 shrink-0 bg-cyan" />
                      {l}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            <Block num={num()} title="Key features">
              <ul className="grid gap-3 md:grid-cols-2">
                {p.features.map((f, i) => (
                  <li key={f} className="glass rounded-2xl p-5 text-ink/85">
                    <span className="mb-2 block font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </Block>

            {cs && (
              <Block num={num()} title="Four surfaces, one platform">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {cs.surfaces.map((s) => (
                    <li key={s.name} className="glass rounded-2xl p-6">
                      <p className="eyebrow">{s.audience}</p>
                      <p className="mt-2 font-display text-xl font-semibold">{s.name}</p>
                      <p className="mt-3 text-ink/80">{s.body}</p>
                      <p className="mt-4 font-mono text-xs text-cyan">{s.stack.join(" · ")}</p>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            <Block num={num()} title="Architecture highlights">
              {!cs && <p className="mb-6 text-xl leading-relaxed text-ink/85">{p.architecture.summary}</p>}
              <ul className="space-y-4">
                {p.architecture.points.map((pt) => (
                  <li key={pt} className="flex gap-4 text-lg text-ink/85">
                    <span aria-hidden className="mt-3 h-px w-6 shrink-0 bg-violet" />
                    {pt}
                  </li>
                ))}
              </ul>
            </Block>

            {cs && (
              <>
                <Block num={num()} title={cs.storefront.title}>
                  <p className="text-xl leading-relaxed text-ink/85">{cs.storefront.body}</p>
                  <List items={cs.storefront.points} color="bg-lime" />
                </Block>
                <Block num={num()} title={cs.ai.title}>
                  <p className="text-xl leading-relaxed text-ink/85">{cs.ai.body}</p>
                  <List items={cs.ai.points} color="bg-magenta" />
                </Block>
                <Block num={num()} title={cs.engineering.title}>
                  <List items={cs.engineering.points} color="bg-cyan" />
                </Block>
                <Block num={num()} title="Timeline">
                  <ol className="relative space-y-8 border-l border-line/10 pl-8">
                    {cs.timeline.map((t) => (
                      <li key={t.title} className="relative">
                        <span aria-hidden className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-cyan bg-bg" />
                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan">{t.date}</p>
                        <p className="mt-1 font-display text-xl font-semibold">{t.title}</p>
                        <p className="mt-2 text-ink/80">{t.body}</p>
                      </li>
                    ))}
                  </ol>
                </Block>
              </>
            )}

            <Block num={num()} title="Tech stack">
              <div className="grid gap-6 sm:grid-cols-2">
                {p.stack.map((g) => (
                  <div key={g.group}>
                    <p className="eyebrow mb-3">{g.group}</p>
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Block>
          </div>

          <NextProject project={next} />
        </article>
      </main>
      <Footer />
    </>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-bg p-5">
      <dt className="eyebrow mb-2">{label}</dt>
      <dd className="text-ink/90">{children}</dd>
    </div>
  );
}

function Block({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 md:grid-cols-12">
      <Reveal className="md:col-span-4">
        <p className="font-mono text-xs text-cyan">{num}</p>
        <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">{title}</h2>
      </Reveal>
      <Reveal className="md:col-span-8" delay={0.08}>
        {children}
      </Reveal>
    </section>
  );
}

function List({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-4 text-ink/80">
          <span aria-hidden className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${color}`} />
          {i}
        </li>
      ))}
    </ul>
  );
}

function NextProject({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block border-t border-line/10" data-cursor="Next">
      <div className="container flex flex-wrap items-center justify-between gap-6 py-16 md:py-24">
        <div>
          <p className="eyebrow">Next project</p>
          <p className="mt-3 font-display text-display-lg font-semibold transition group-hover:text-cyan">{project.title}</p>
        </div>
        <ArrowUpRight className="h-12 w-12 transition duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:text-cyan md:h-20 md:w-20" aria-hidden />
      </div>
    </Link>
  );
}
