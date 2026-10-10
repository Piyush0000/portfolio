"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun, Pause, Play, Menu, X, Box } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { usePrefs } from "../providers/Preferences";
import { useSmoothScroll } from "../providers/SmoothScroll";
import Magnetic from "../ui/Magnetic";

export default function Navbar() {
  const { theme, motion: motionPref, toggleTheme, toggleMotion } = usePrefs();
  const { scrollTo } = useSmoothScroll();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // On the home page, section links scroll smoothly instead of navigating.
  const onNav = (e: React.MouseEvent, href: string) => {
    if (pathname !== "/" || !href.startsWith("/#")) return;
    e.preventDefault();
    setOpen(false);
    const hash = href.slice(1);
    history.replaceState(null, "", hash);
    scrollTo(hash);
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
      >
        <nav
          aria-label="Primary"
          className={`container flex items-center justify-between rounded-full transition-all duration-500 ${scrolled ? "glass max-w-6xl !px-4 py-2" : ""}`}
        >
          <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name}, home`}>
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-cyan/50 font-display text-xs font-bold">
              <span className="absolute inset-0 rounded-full bg-cyan/20 blur-md transition group-hover:bg-magenta/40" />
              <span className="relative">PR</span>
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-ink/80 sm:block">{site.name}</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={(e) => onNav(e, l.href)}
                  className="rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-ink/70 transition hover:bg-ink/5 hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <Link
              href="/immersive"
              className="hidden items-center gap-2 rounded-full border border-violet/40 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/80 transition hover:border-violet hover:text-ink md:inline-flex"
            >
              <Box className="h-3.5 w-3.5 text-violet" aria-hidden /> Immersive
            </Link>
            <IconToggle
              label={motionPref === "full" ? "Reduce motion" : "Enable motion"}
              pressed={motionPref === "reduced"}
              onClick={toggleMotion}
            >
              {motionPref === "full" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </IconToggle>
            <IconToggle label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"} onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </IconToggle>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 lg:hidden"
          >
            <ul className="space-y-4">
              {[...navLinks, { label: "Immersive", href: "/immersive" }].map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <Link href={l.href} onClick={(e) => onNav(e, l.href)} className="font-display text-4xl font-semibold">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function IconToggle({
  label,
  onClick,
  pressed,
  children,
}: {
  label: string;
  onClick: () => void;
  pressed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Magnetic>
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        aria-pressed={pressed}
        title={label}
        className="grid h-10 w-10 place-items-center rounded-full text-ink/80 transition hover:bg-ink/5 hover:text-ink"
      >
        {children}
      </button>
    </Magnetic>
  );
}
