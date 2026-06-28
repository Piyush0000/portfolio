"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => { const v = entries.find((e) => e.isIntersecting); if (v) setActiveId(v.target.id); },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#F5F0E8]/95 backdrop-blur-md border-b-2 border-[#0D0B0A]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <motion.a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          whileHover={{ scale: 1.04 }}
          className="font-display font-black text-xl tracking-tight text-[#0D0B0A] hover:text-[#E8650A] transition-colors"
        >
          {siteConfig.name.split(" ")[0]}<span className="text-[#E8650A]">.</span>
        </motion.a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = activeId === id;
            return (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  className={`text-sm font-bold uppercase tracking-wide transition-colors duration-150 relative ${
                    isActive ? "text-[#E8650A]" : "text-[#0D0B0A]/70 hover:text-[#0D0B0A]"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.div layoutId="nav-bar" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E8650A]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Resume CTA */}
        <div className="hidden md:block">
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange text-xs px-5 py-2.5 rounded-sm inline-block"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 border-2 border-[#0D0B0A] rounded-sm"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#F5F0E8] border-t-2 border-[#0D0B0A]"
          >
            <ul className="px-5 py-4 space-y-1">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="w-full text-left px-3 py-3 text-sm font-bold uppercase tracking-wide hover:text-[#E8650A] transition-colors border-b border-[#D6CFC4]"
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li className="pt-3">
                <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-orange text-xs px-5 py-3 rounded-sm block text-center">
                  Resume ↗
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
