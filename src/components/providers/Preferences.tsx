"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "dark" | "light";
export type Motion = "full" | "reduced";

type Prefs = {
  theme: Theme;
  motion: Motion;
  /** True when the device can comfortably run the WebGL scenes. */
  canRender3D: boolean;
  toggleTheme: () => void;
  toggleMotion: () => void;
};

const PrefsContext = createContext<Prefs | null>(null);

const THEME_KEY = "pr-theme";
const MOTION_KEY = "pr-motion";

/**
 * Runs in <head> before first paint so there is no theme or motion flash.
 * Stored choices win; otherwise follow the OS settings.
 */
export const prefsInitScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.dataset.theme=t;var m=localStorage.getItem('${MOTION_KEY}');if(m!=='full'&&m!=='reduced'){m=matchMedia('(prefers-reduced-motion: reduce)').matches?'reduced':'full'}d.dataset.motion=m;if(sessionStorage.getItem('pr-intro')){d.dataset.intro='seen'}else{sessionStorage.setItem('pr-intro','1')}}catch(e){}})();`;

function detect3D(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if (window.matchMedia("(max-width: 767px)").matches) return false;
  if (!window.matchMedia("(pointer: fine)").matches && window.innerWidth < 1024) return false;
  if ((nav.hardwareConcurrency ?? 8) <= 2) return false;
  if ((nav.deviceMemory ?? 8) < 4) return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  // Server render assumes the defaults; the real values are read after mount
  // from the attributes the init script already applied.
  const [theme, setTheme] = useState<Theme>("dark");
  const [motion, setMotion] = useState<Motion>("full");
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    const d = document.documentElement;
    setTheme(d.dataset.theme === "light" ? "light" : "dark");
    setMotion(d.dataset.motion === "reduced" ? "reduced" : "full");
    setCanRender3D(detect3D());
    // Once the intro has fully played, later pages skip its delay.
    const introDone = window.setTimeout(() => (d.dataset.intro = "seen"), 3000);

    // Follow OS changes until the visitor makes an explicit choice.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (localStorage.getItem(MOTION_KEY)) return;
      const next: Motion = mq.matches ? "reduced" : "full";
      d.dataset.motion = next;
      setMotion(next);
    };
    mq.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(introDone);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  const toggleMotion = useCallback(() => {
    setMotion((prev) => {
      const next: Motion = prev === "full" ? "reduced" : "full";
      document.documentElement.dataset.motion = next;
      try {
        localStorage.setItem(MOTION_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, motion, canRender3D, toggleTheme, toggleMotion }),
    [theme, motion, canRender3D, toggleTheme, toggleMotion],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs(): Prefs {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside <PreferencesProvider>");
  return ctx;
}

export const useReducedMotion = () => usePrefs().motion === "reduced";
