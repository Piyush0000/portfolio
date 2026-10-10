"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "../providers/Preferences";

/** Counts the numeric part of `value` up from zero when it enters view ("820+" → 0…820 + "+"). */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const [n, setN] = useState(match ? 0 : null);

  useEffect(() => {
    if (!match || !inView) return;
    const target = Number(match[2]);
    if (reduced) {
      setN(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      setN(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{match ? `${match[1]}${n}${match[3]}` : value}</span>
    </span>
  );
}
