"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Loads only Framer Motion's DOM animation features (animate, variants,
 * exit, hover/tap/inView). Components use `m.*`; `strict` flags any stray
 * `motion.*` that would pull the full bundle back in.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
