"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { siteConfig, aboutBio, achievements } from "@/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const } }),
};

export default function About() {
  return (
    <section id="about" className="py-24 px-5 sm:px-8 bg-white border-t-2 border-[#0D0B0A] relative overflow-hidden">
      {/* Background deco */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5F0E8] border-l-2 border-b-2 border-[#D6CFC4]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} className="mb-16"
        >
          <p className="section-label mb-3">01 — About</p>
          <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight text-[#0D0B0A] uppercase">
            Who am I<span className="text-[#E8650A]">?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="space-y-8">
            {aboutBio.map((para, i) => (
              <motion.p
                key={i} custom={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                className="text-[#1C1917] text-lg leading-relaxed font-medium"
              >
                {para}
              </motion.p>
            ))}

            {/* Social */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={2}
              className="flex flex-wrap gap-3 pt-4"
            >
              {[
                { icon: FiGithub, label: "GitHub", href: siteConfig.github, id: "about-github" },
                { icon: FiLinkedin, label: "LinkedIn", href: siteConfig.linkedin, id: "about-linkedin" },
              ].map(({ icon: Icon, label, href, id }) => (
                <motion.a
                  key={id} id={id} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 px-4 py-2.5 border-2 border-[#0D0B0A] bg-white rounded-sm shadow-brutal hover:shadow-brutal-orange hover:border-[#E8650A] transition-all text-sm font-bold uppercase tracking-wide"
                >
                  <Icon className="w-4 h-4" /> {label}
                </motion.a>
              ))}
              <div className="flex items-center gap-2 px-4 py-2.5 border-2 border-[#D6CFC4] rounded-sm text-sm font-bold text-[#78716C]">
                <MapPin className="w-4 h-4" /> {siteConfig.location}
              </div>
            </motion.div>
          </div>

          {/* Right — info card + achievements */}
          <div className="space-y-6">
            {/* Info card */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={1}
              className="editorial-card rounded-sm p-6 relative overflow-hidden"
            >
              {/* Orange corner deco */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-[#E8650A]" />

              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: "🎓", label: "MAIT, Delhi" },
                  { emoji: "📅", label: "Batch 2024–28" },
                  { emoji: "🌏", label: "Delhi, India" },
                  { emoji: "💡", label: "AI/ML + Fullstack" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-[#F5F0E8] border border-[#D6CFC4]">
                    <span className="text-xl">{item.emoji}</span>
                    <span className="text-xs font-mono font-bold text-[#0D0B0A] uppercase">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={2}
            >
              <p className="section-label mb-4">🏅 Highlights</p>
              <div className="space-y-2">
                {achievements.slice(0, 6).map((a, i) => (
                  <motion.div
                    key={i} custom={i} variants={fadeUp} whileHover={{ x: 4 }}
                    className="flex items-start gap-3 p-3.5 border-l-4 border-[#E8650A] bg-[#F5F0E8] text-sm font-medium text-[#1C1917]"
                  >
                    {a}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
