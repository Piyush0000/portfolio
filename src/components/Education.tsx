"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Star } from "lucide-react";
import { education } from "@/data";

export default function Education() {
  return (
    <section id="education" className="py-24 px-5 sm:px-8 bg-white border-t-2 border-[#0D0B0A] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-24 h-24 bg-[#E8650A] opacity-10 hidden md:block" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-16"
        >
          <p className="section-label mb-3">05 — Education</p>
          <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight text-[#0D0B0A] uppercase">
            Academic<br />
            <span className="text-[#E8650A]">Background 🎓</span>
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -4 }}
          className="editorial-card rounded-sm p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Orange corner */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#E8650A] opacity-90 hidden sm:block" />
          <div className="absolute top-4 right-4 z-10 hidden sm:block">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-start">
            {/* Icon */}
            <div className="flex-shrink-0 w-16 h-16 bg-[#0D0B0A] flex items-center justify-center shadow-brutal-orange border-2 border-[#E8650A]">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div>
                  <h3 className="font-display font-black text-2xl text-[#0D0B0A] leading-tight">{education.institution}</h3>
                  <div className="flex items-center gap-1.5 mt-1.5 text-sm font-mono font-bold text-[#78716C]">
                    <MapPin className="w-3.5 h-3.5" /> {education.location}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs px-3 py-1.5 font-mono font-black uppercase tracking-wide bg-[#0D0B0A] text-white">
                    {education.duration}
                  </span>
                  <span className="text-xs px-3 py-1.5 font-mono font-black uppercase tracking-wide bg-[#E8650A] text-white">
                    CGPA: {education.cgpa} ⭐
                  </span>
                </div>
              </div>

              <p className="font-display font-bold text-[#0D0B0A] mb-6 text-lg border-l-4 border-[#E8650A] pl-4">
                {education.degree}
              </p>

              <div className="space-y-2.5">
                {education.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-2.5 text-sm text-[#1C1917] font-medium"
                  >
                    <Star className="w-3.5 h-3.5 text-[#E8650A] flex-shrink-0 mt-0.5" />
                    {h}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-xs font-mono font-bold text-[#D6CFC4] mt-6 uppercase tracking-widest">
          {/* TODO: Add certifications and online courses here */}
          // TODO: Add certifications
        </p>
      </div>
    </section>
  );
}
