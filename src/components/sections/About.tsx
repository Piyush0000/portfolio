"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { GraduationCap, Trophy } from "lucide-react";
import { about, education, journey, site } from "@/data/site";
import { useReducedMotion } from "../providers/Preferences";
import { loadGsap } from "../providers/SmoothScroll";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import TiltCard from "../ui/TiltCard";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-section">
      <div className="container">
        <SectionHeading index="01" eyebrow="About" title="Engineer by *shipping,* not by syllabus." />

        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <TiltCard className="overflow-hidden rounded-3xl" max={6}>
              <div className="glass relative aspect-[4/5] overflow-hidden rounded-3xl p-2">
                <div className="relative h-full w-full overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={site.avatarUrl}
                    alt={`Portrait of ${site.name}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    className="object-cover grayscale-[30%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.2em]">
                    <span>{site.location}</span>
                    <span className="text-cyan">● online</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div className="space-y-8 lg:col-span-8">
            <h3 id="about-title" className="sr-only">
              About me
            </h3>
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-xl leading-relaxed text-ink/85 md:text-2xl">{p}</p>
              </Reveal>
            ))}
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <Reveal className="glass rounded-2xl p-6">
                <div className="eyebrow mb-4 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-violet" aria-hidden /> Education
                </div>
                <p className="font-display text-lg font-semibold">{education.institution}</p>
                <p className="mt-1 text-muted">{education.degree}</p>
                <p className="mt-3 font-mono text-xs text-cyan">{education.period}</p>
              </Reveal>
              <Reveal className="glass rounded-2xl p-6" delay={0.1}>
                <div className="eyebrow mb-4 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-magenta" aria-hidden /> Recognition
                </div>
                <ul className="space-y-2 text-ink/85">
                  {about.achievements.map((a) => (
                    <li key={a} className="flex gap-3">
                      <span className="mt-2.5 h-1 w-3 shrink-0 bg-magenta" aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <Journey />
    </section>
  );
}

/** Pinned horizontal timeline on desktop; a plain vertical list otherwise. */
function Journey() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let revert = () => {};
    let cancelled = false;
    // Set up the pin only when the timeline is about a screen away.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setup();
      },
      { rootMargin: "100% 0px" },
    );
    if (section.current) io.observe(section.current);
    const setup = () =>
      loadGsap().then(({ gsap }) => {
        if (cancelled) return;
        const mm = gsap.matchMedia();
        revert = () => mm.revert();
        mm.add("(min-width: 1024px)", () => {
          const el = track.current!;
          const distance = () => el.scrollWidth - window.innerWidth + 96;
          const tween = gsap.to(el, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 0.8,
              pin: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
              },
            },
          });
          // Cards lift into place as they cross the viewport.
          el.querySelectorAll<HTMLElement>("[data-journey-card]").forEach((card) => {
            gsap.from(card, {
              y: 80,
              opacity: 0.2,
              rotate: 2,
              ease: "power2.out",
              scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true },
            });
          });
        });
      });
    return () => {
      cancelled = true;
      io.disconnect();
      revert();
    };
  }, [reduced]);

  return (
    <div ref={section} className="relative mt-section overflow-hidden lg:flex lg:h-screen lg:flex-col lg:justify-center">
      <div className="container mb-10 flex items-end justify-between gap-6">
        <h3 className="font-display text-display-md font-semibold">
          The <span className="text-gradient">journey</span>
        </h3>
        <div className="hidden h-px w-1/3 overflow-hidden bg-line/10 lg:block" aria-hidden>
          <div ref={progress} className="h-full origin-left scale-x-0 bg-gradient-to-r from-cyan via-violet to-magenta" />
        </div>
      </div>
      <ol ref={track} className="container flex flex-col gap-5 lg:w-max lg:max-w-none lg:flex-row lg:gap-6 lg:pr-[20vw]">
        {journey.map((step, i) => (
          <li
            key={step.title}
            data-journey-card
            className="glass group relative flex flex-col justify-between rounded-3xl p-7 lg:h-[52vh] lg:w-[min(30rem,38vw)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">{step.year}</span>
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="font-display text-2xl font-semibold leading-tight md:text-3xl">{step.title}</p>
              <p className="mt-4 text-ink/75">{step.body}</p>
            </div>
            <span
              aria-hidden
              className="absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-cyan/0 via-cyan/60 to-cyan/0 opacity-0 transition group-hover:opacity-100"
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
