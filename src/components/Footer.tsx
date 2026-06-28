"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { siteConfig, navLinks } from "@/data";

export default function Footer() {
  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="bg-[#0D0B0A] border-t-4 border-[#E8650A] py-12 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo */}
          <motion.span
            whileHover={{ scale: 1.06 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display font-black text-2xl text-white cursor-pointer hover:text-[#E8650A] transition-colors"
          >
            {siteConfig.name.split(" ")[0]}<span className="text-[#E8650A]">.</span>
          </motion.span>

          {/* Nav */}
          <ul className="flex flex-wrap justify-center gap-6">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  className="text-xs font-mono font-bold uppercase tracking-widest text-white/50 hover:text-[#E8650A] transition-colors"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { icon: FiGithub, href: siteConfig.github, id: "footer-github" },
              { icon: FiLinkedin, href: siteConfig.linkedin, id: "footer-linkedin" },
            ].map(({ icon: Icon, href, id }) => (
              <motion.a
                key={id} id={id} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="w-10 h-10 border-2 border-white/20 flex items-center justify-center hover:border-[#E8650A] hover:text-[#E8650A] text-white/60 transition-all"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono font-bold text-white/30 uppercase tracking-widest">
          <p className="flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 text-[#E8650A] inline" /> by {siteConfig.name} · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
