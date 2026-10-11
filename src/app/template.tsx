"use client";

import { useEffect } from "react";
import { m } from "framer-motion";

// Only client-side navigations animate. The first (server-rendered) page is
// painted immediately so the intro loader and LCP are never held back.
let isFirstMount = true;

/**
 * Page transition: every navigation re-mounts the template, so a neon wipe
 * sweeps across while the new page fades up.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const animate = !isFirstMount;
  useEffect(() => {
    isFirstMount = false;
  }, []);

  return (
    <>
      {animate && (
        <m.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[90] bg-gradient-to-b from-violet via-magenta to-cyan"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)", "inset(0 0 100% 0)"] }}
          transition={{ duration: 0.9, times: [0, 0.45, 1], ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      <m.div
        initial={animate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.div>
    </>
  );
}
