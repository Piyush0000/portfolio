"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { onWake } from "@/lib/wake";
import { useReducedMotion } from "./Preferences";

type ScrollApi = { scrollTo: (target: string | number) => void };
const ScrollContext = createContext<ScrollApi>({ scrollTo: () => {} });

type Gsap = { gsap: typeof import("gsap").gsap; ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger };
let gsapPromise: Promise<Gsap> | null = null;

/** GSAP + ScrollTrigger, fetched once on demand so they stay off the critical path. */
export function loadGsap(): Promise<Gsap> {
  return (gsapPromise ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
    g.gsap.registerPlugin(st.ScrollTrigger);
    return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
  }));
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in
 * sync. Both load on the visitor's first interaction, not during page load.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let teardown = () => {};
    const cancelWake = onWake(() => {
      Promise.all([import("lenis"), loadGsap()]).then(([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
        if (cancelled) return;
        const lenis = new LenisCtor({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.4 });
        lenisRef.current = lenis;
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        teardown = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
          lenisRef.current = null;
        };
      });
    });
    return () => {
      cancelled = true;
      cancelWake();
      teardown();
    };
  }, [reduced]);

  // New route: start at the top (or at the hash target) and re-measure any
  // ScrollTriggers that already exist.
  useEffect(() => {
    const hash = window.location.hash;
    const el = hash ? document.querySelector(hash) : null;
    if (el) lenisRef.current?.scrollTo(el as HTMLElement, { immediate: true, offset: -72 });
    else lenisRef.current?.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => gsapPromise?.then(({ ScrollTrigger }) => ScrollTrigger.refresh()), 1200);
    return () => window.clearTimeout(id);
  }, [pathname]);

  const scrollTo = useCallback(
    (target: string | number) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset: -72, duration: 1.4 });
        return;
      }
      if (typeof target === "number") window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
      else document.querySelector(target)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    },
    [reduced],
  );

  return <ScrollContext.Provider value={{ scrollTo }}>{children}</ScrollContext.Provider>;
}

export const useSmoothScroll = () => useContext(ScrollContext);
