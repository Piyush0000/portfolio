"use client";

import { Fragment } from "react";
import { m } from "framer-motion";
import { useReducedMotion } from "../providers/Preferences";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

/**
 * Splits text into words that rise out of a mask as the element enters the
 * viewport. Wrap a word in *asterisks* to render it with the neon gradient.
 * Word separators sit outside the inline-block masks so they never collapse.
 */
export default function SplitReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on first paint instead of on scroll (for above-the-fold headings). */
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const plain = text.replace(/\*/g, "");
  const parts = words.map((word) => ({ accent: word.startsWith("*") && word.endsWith("*"), clean: word.replace(/\*/g, "") }));
  const gap = (i: number) => (i < words.length - 1 ? " " : null);

  // Above the fold: pure CSS so the heading animates from first paint
  // instead of waiting for hydration (keeps LCP fast).
  if (immediate) {
    const Static = as;
    return (
      <Static aria-label={plain} className={className}>
        {parts.map(({ accent, clean }, i) => (
          <Fragment key={i}>
            <span aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-top">
              <span className={`rise-word ${accent ? "text-gradient" : ""}`} style={{ ["--d" as string]: `${delay + i * stagger}s` }}>
                {clean}
              </span>
            </span>
            {gap(i)}
          </Fragment>
        ))}
      </Static>
    );
  }

  const Comp = m[as];
  return (
    <Comp aria-label={plain} className={className} initial={reduced ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "-12% 0px" }}>
      {parts.map(({ accent, clean }, i) => (
        <Fragment key={i}>
          <span aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-top">
            <m.span
              className={`inline-block ${accent ? "text-gradient" : ""}`}
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger } },
              }}
            >
              {clean}
            </m.span>
          </span>
          {gap(i)}
        </Fragment>
      ))}
    </Comp>
  );
}
