"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data";

const CATEGORY_COLORS: Record<string, string> = {
  Languages: "bg-[#E8650A]",
  Frameworks: "bg-[#0D0B0A]",
  "Databases & Tools": "bg-[#6366f1]",
  "AI / ML": "bg-[#E8650A]",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-5 sm:px-8 bg-[#F5F0E8] border-t-2 border-[#0D0B0A] relative overflow-hidden">
      {/* Deco elements */}
      <div className="absolute top-8 right-12 w-8 h-20 bg-[#E8650A] opacity-80 hidden md:block" />
      <div className="absolute bottom-12 left-8 w-12 h-4 bg-[#0D0B0A] opacity-70 hidden md:block" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-16"
        >
          <p className="section-label mb-3">02 — Skills</p>
          <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight text-[#0D0B0A] uppercase">
            My Tech<br />
            <span className="text-[#E8650A]">Arsenal ⚡</span>
          </h2>
        </motion.div>

        {/* Skill grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -4 }}
              className="editorial-card rounded-sm overflow-hidden"
            >
              {/* Card header strip */}
              <div className={`${CATEGORY_COLORS[cat.name] ?? "bg-[#E8650A]"} px-4 py-3 flex items-center gap-2`}>
                <span className="text-lg">{cat.emoji}</span>
                <h3 className="font-display font-black text-white text-xs uppercase tracking-widest leading-tight">
                  {cat.name}
                </h3>
              </div>

              {/* Skills list */}
              <div className="p-4 bg-white">
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-[#1C1917]">
                      <span className="w-2 h-2 bg-[#E8650A] rounded-none flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Specialization tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          <p className="section-label w-full mb-2">Also comfortable with:</p>
          {[
            "🧠 Generative AI",
            "🔗 LangChain & RAG",
            "📊 Data Science",
            "🌐 REST API Design",
            "📱 Mobile Dev",
            "☁️ Cloud (GCP)",
          ].map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.04, y: -2 }}
              className="tech-badge px-3 py-2 text-xs cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
