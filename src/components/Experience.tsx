"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data";

const TYPE_BADGE: Record<string, string> = {
  "Full-time": "bg-[#0D0B0A] text-white",
  Internship: "bg-[#E8650A] text-white",
  Achievement: "bg-[#F5F0E8] text-[#0D0B0A] border-2 border-[#0D0B0A]",
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-5 sm:px-8 bg-white border-t-2 border-[#0D0B0A] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#F5F0E8] border-t-2 border-l-2 border-[#D6CFC4] hidden md:block" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-16"
        >
          <p className="section-label mb-3">03 — Experience</p>
          <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight text-[#0D0B0A] uppercase">
            Professional<br />
            <span className="text-[#E8650A]">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8 sm:pl-12">
          {/* Vertical line */}
          <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-0.5 bg-[#0D0B0A]" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-8 sm:-left-12 top-5 flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#E8650A] border-2 border-[#0D0B0A] flex items-center justify-center text-xs z-10">
                    {exp.emoji}
                  </div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="editorial-card rounded-sm p-6 relative overflow-hidden"
                >
                  {/* Orange top border accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#E8650A]" />

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 mt-1">
                    <div>
                      <h3 className="font-display font-black text-xl text-[#0D0B0A] leading-tight">{exp.title}</h3>
                      <p className="font-mono font-bold text-sm text-[#E8650A] mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 flex-shrink-0">
                      <span className={`text-xs px-2.5 py-1 font-mono font-black uppercase tracking-wide rounded-none ${TYPE_BADGE[exp.type] ?? "bg-[#0D0B0A] text-white"}`}>
                        {exp.type}
                      </span>
                      <span className="text-xs px-2.5 py-1 font-mono font-bold text-[#78716C] border border-[#D6CFC4]">
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-[#1C1917] leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 bg-[#E8650A] flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
