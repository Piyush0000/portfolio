"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "./Preferences";

gsap.registerPlugin(ScrollTrigger);

type ScrollApi = { scrollTo: (target: string | number) => void };
const ScrollContext = createContext<ScrollApi>({ scrollTo: () => {} });

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.4 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // New route: start at the top (or at the hash target) and re-measure triggers.
  useEffect(() => {
    const hash = window.location.hash;
    const el = hash ? document.querySelector(hash) : null;
    if (el) lenisRef.current?.scrollTo(el as HTMLElement, { immediate: true, offset: -72 });
    else lenisRef.current?.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 1200);
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
