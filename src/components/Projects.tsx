"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { projects } from "@/data";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const featured = projects.filter((p) => p.featured);
  const visible = showAll ? projects : featured;

  return (
    <section id="projects" className="py-24 px-5 sm:px-8 bg-[#F5F0E8] border-t-2 border-[#0D0B0A] relative overflow-hidden">
      {/* Deco */}
      <div className="absolute top-12 right-0 w-6 h-32 bg-[#E8650A] hidden md:block" />
      <div className="absolute bottom-16 left-12 w-16 h-4 bg-[#0D0B0A] hidden md:block" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-label mb-3">04 — Projects</p>
            <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight text-[#0D0B0A] uppercase">
              Things I&apos;ve<br />
              <span className="text-[#E8650A]">Built 🛠️</span>
            </h2>
          </motion.div>

          {projects.length > featured.length && (
            <motion.button
              id="projects-toggle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onClick={() => setShowAll(!showAll)}
              whileHover={{ y: -2 }}
              className="btn-ghost text-xs px-6 py-3 rounded-sm self-start sm:self-end whitespace-nowrap"
            >
              {showAll ? "← Show Less" : `All Projects (${projects.length})`}
            </motion.button>
          )}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((proj, i) => (
              <motion.div
                key={proj.title} layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="editorial-card rounded-sm overflow-hidden flex flex-col group"
              >
                {/* Project image */}
                <div className="relative h-44 overflow-hidden bg-[#EDE8DE]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"; }}
                  />
                  {/* Featured badge */}
                  {proj.featured && (
                    <div className="absolute top-3 left-3 bg-[#E8650A] text-white text-xs font-mono font-black px-2 py-0.5 uppercase tracking-wide border border-[#0D0B0A]">
                      ⭐ Featured
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 bg-white">
                  <h3 className="font-display font-black text-base text-[#0D0B0A] mb-2 leading-tight">{proj.title}</h3>
                  <p className="text-sm text-[#78716C] leading-relaxed flex-1 mb-4 font-medium">{proj.description}</p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.tech.map((t) => (
                      <span key={t} className="tech-badge text-[10px] px-2 py-0.5">{t}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 border-t border-[#D6CFC4] pt-4">
                    {proj.github && proj.github !== "#" && proj.github !== "" && (
                      <a
                        href={proj.github} target="_blank" rel="noopener noreferrer"
                        id={`project-github-${i}`}
                        className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0D0B0A] hover:text-[#E8650A] transition-colors uppercase"
                      >
                        <FiGithub className="w-3.5 h-3.5" /> Code
                      </a>
                    )}
                    {proj.demo && proj.demo !== "#" && proj.demo !== "" && (
                      <a
                        href={proj.demo} target="_blank" rel="noopener noreferrer"
                        id={`project-demo-${i}`}
                        className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#E8650A] hover:text-[#0D0B0A] transition-colors uppercase"
                      >
                        <ArrowRight className="w-3.5 h-3.5" /> {proj.demo.includes("://") ? proj.demo.split("://")[1].replace("www.", "").replace(/\/$/, "") : "Live Link"}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
