"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { siteConfig, stats } from "@/data";

const TYPING_STRINGS = [
  "Freelancer",
  "AI/ML Engineer",
  "Full Stack Developer",
  "Open Source Contributor",
];

function useTypingEffect(strings: string[], speed = 75, pause = 2000) {
  const [text, setText] = useState("");
  const [sIdx, setSIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = strings[sIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && cIdx <= cur.length) {
      t = setTimeout(() => { setText(cur.slice(0, cIdx)); setCIdx((c) => c + 1); if (cIdx === cur.length) setTimeout(() => setDel(true), pause); }, speed);
    } else if (del && cIdx >= 0) {
      t = setTimeout(() => { setText(cur.slice(0, cIdx)); setCIdx((c) => c - 1); if (cIdx === 0) { setDel(false); setSIdx((s) => (s + 1) % strings.length); } }, speed / 2);
    }
    return () => clearTimeout(t);
  }, [cIdx, del, sIdx, strings, speed, pause]);
  return text;
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const typedText = useTypingEffect(TYPING_STRINGS);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const tiltX = typeof window !== "undefined" ? ((mousePos.y / (window.innerHeight || 1)) - 0.5) * -5 : 0;
  const tiltY = typeof window !== "undefined" ? ((mousePos.x / (window.innerWidth || 1)) - 0.5) * 8 : 0;
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-[#F5F0E8]">
      {/* Decorative orange rectangles — like the reference image */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="absolute top-16 right-8 md:right-24 w-10 h-24 bg-[#E8650A] z-0 hidden sm:block"
      />
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="absolute top-32 right-24 md:right-48 w-6 h-6 bg-[#0D0B0A] z-0 hidden sm:block"
      />
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="absolute bottom-24 left-8 w-16 h-5 bg-[#E8650A] z-0 hidden sm:block"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-40 left-28 w-4 h-4 bg-[#0D0B0A] z-0 hidden md:block"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[85vh] py-16">

          {/* ── Left: Text ── */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 border-2 border-[#0D0B0A] rounded-sm bg-white"
            >
              <span className="w-2 h-2 bg-[#E8650A] rounded-full animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest">Available for Opportunities</span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-6"
            >
              <h1 className="font-display font-black text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.04em] text-[#0D0B0A] uppercase">
                <span className="block">Hi, I&apos;m</span>
                <span className="block text-[#E8650A]">{siteConfig.name.split(" ")[0]}</span>
                <span className="block">{siteConfig.name.split(" ").slice(1).join(" ")}</span>
              </h1>
            </motion.div>

            {/* Typing subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 h-8 flex items-center gap-2"
            >
              <span className="w-1 h-6 bg-[#E8650A]" />
              <p className="font-mono font-bold text-lg text-[#E8650A] tracking-tight">
                {typedText}<span className="animate-pulse">_</span>
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base text-[#78716C] max-w-md mb-10 leading-relaxed font-medium"
            >
              {siteConfig.tagline} Shipped multiple freelance projects within deadlines.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <button
                id="hero-view-work"
                onClick={() => scrollTo("projects")}
                className="btn-orange flex items-center gap-2 px-7 py-3.5 rounded-sm text-sm"
              >
                View My Work <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-contact"
                onClick={() => scrollTo("contact")}
                className="btn-ghost flex items-center gap-2 px-7 py-3.5 rounded-sm text-sm"
              >
                Get In Touch
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex flex-wrap gap-6 border-t-2 border-[#D6CFC4] pt-8"
            >
              {stats.map((s, i) => (
                <div key={s.label} className={`${i !== stats.length - 1 ? "pr-6 border-r-2 border-[#D6CFC4]" : ""}`}>
                  <div className="font-display font-black text-2xl text-[#E8650A] leading-none">{s.value}</div>
                  <div className="text-xs text-[#78716C] font-mono font-bold uppercase tracking-wide mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Avatar + social ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Photo frame */}
            <div
              className="relative"
              style={{ transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`, transition: "transform 0.3s ease" }}
            >
              {/* Offset border */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#E8650A] rounded-sm z-0" />
              <div className="absolute inset-0 translate-x-6 translate-y-6 border-2 border-[#0D0B0A] rounded-sm z-0" />

              {/* Main image */}
              <div className="relative z-10 w-72 h-80 sm:w-80 sm:h-96 overflow-hidden border-2 border-[#0D0B0A] rounded-sm bg-[#EDE8DE]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={siteConfig.avatarUrl}
                  alt={siteConfig.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                {/* Overlay gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0D0B0A]/60 to-transparent" />
                {/* Name overlay */}
                <div className="absolute bottom-4 left-4">
                  <p className="font-display font-black text-white text-sm tracking-widest uppercase">{siteConfig.name}</p>
                </div>
              </div>

              {/* Floating stickers */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 z-20 bg-white border-2 border-[#0D0B0A] px-3 py-1.5 rounded-sm shadow-brutal text-sm font-mono font-bold"
              >
                🤖 AI/ML
              </motion.div>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.2 }}
                className="absolute -bottom-4 -right-4 z-20 bg-white border-2 border-[#0D0B0A] px-3 py-1.5 rounded-sm shadow-brutal text-sm font-mono font-bold"
              >
                💼 Freelancer
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 z-20 bg-[#E8650A] border-2 border-[#0D0B0A] px-3 py-1.5 rounded-sm shadow-brutal text-sm font-mono font-bold text-white"
              >
                ⚡ Full Stack
              </motion.div>
            </div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-3"
            >
              {[
                { icon: FiGithub, href: siteConfig.github, id: "hero-github" },
                { icon: FiLinkedin, href: siteConfig.linkedin, id: "hero-linkedin" },
              ].map(({ icon: Icon, href, id }) => (
                <motion.a
                  key={id}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 border-2 border-[#0D0B0A] bg-white flex items-center justify-center rounded-sm shadow-brutal hover:shadow-brutal-orange hover:border-[#E8650A] hover:text-[#E8650A] transition-all duration-150"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        onClick={() => scrollTo("about")}
      >
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#78716C]">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-[#E8650A]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
