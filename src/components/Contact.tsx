"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Send } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { siteConfig } from "@/data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", subject: "", message: "" }); setTimeout(() => setStatus("idle"), 5000); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const socials = [
    { icon: FiGithub, label: "GitHub", href: siteConfig.github, id: "contact-github" },
    { icon: FiLinkedin, label: "LinkedIn", href: siteConfig.linkedin, id: "contact-linkedin" },
    { icon: FiMail, label: siteConfig.email, href: `mailto:${siteConfig.email}`, id: "contact-email" },
  ];

  return (
    <section id="contact" className="py-24 px-5 sm:px-8 bg-[#F5F0E8] border-t-2 border-[#0D0B0A] relative overflow-hidden">
      {/* Deco */}
      <div className="absolute top-8 right-8 w-10 h-24 bg-[#E8650A] hidden md:block" />
      <div className="absolute bottom-8 left-8 w-24 h-4 bg-[#0D0B0A] hidden md:block" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-16"
        >
          <p className="section-label mb-3">06 — Contact</p>
          <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight text-[#0D0B0A] uppercase">
            Let&apos;s Build<br />
            <span className="text-[#E8650A]">Together 🤝</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Availability badge */}
            <div className="bg-[#0D0B0A] p-5 border-l-4 border-[#E8650A]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 bg-[#E8650A] animate-pulse" />
                <span className="text-sm font-display font-black text-white uppercase tracking-wide">
                  Open to Opportunities
                </span>
              </div>
              <p className="text-xs text-white/60 font-mono">
                Internships · Freelance · Full-time roles
              </p>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              {socials.map(({ icon: Icon, label, href, id }) => (
                <motion.a
                  key={id} id={id} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-4 bg-white border-2 border-[#D6CFC4] hover:border-[#E8650A] hover:shadow-brutal-orange transition-all group"
                >
                  <div className="w-8 h-8 bg-[#F5F0E8] border border-[#D6CFC4] flex items-center justify-center group-hover:bg-[#E8650A] group-hover:border-[#E8650A] transition-all">
                    <Icon className="w-4 h-4 text-[#0D0B0A] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-mono font-bold text-[#0D0B0A] truncate">{label}</span>
                </motion.a>
              ))}
              <div className="flex items-center gap-3 p-4 bg-white border border-[#D6CFC4]">
                <div className="w-8 h-8 bg-[#F5F0E8] border border-[#D6CFC4] flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#78716C]" />
                </div>
                <span className="text-sm font-mono font-bold text-[#78716C]">{siteConfig.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            id="contact-form" onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3 bg-white border-2 border-[#0D0B0A] p-7 space-y-5 relative"
          >
            {/* Orange corner */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-[#E8650A]" />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#0D0B0A] uppercase tracking-wide mb-1.5">Name</label>
                <input id="contact-name" name="name" type="text" placeholder="Piyush Rathore"
                  value={form.name} onChange={handleChange} required className="contact-input" />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-[#0D0B0A] uppercase tracking-wide mb-1.5">Email</label>
                <input id="contact-email-input" name="email" type="email" placeholder="hello@example.com"
                  value={form.email} onChange={handleChange} required className="contact-input" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-[#0D0B0A] uppercase tracking-wide mb-1.5">Subject</label>
              <input id="contact-subject" name="subject" type="text" placeholder="Let&apos;s collaborate..."
                value={form.subject} onChange={handleChange} required className="contact-input" />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-[#0D0B0A] uppercase tracking-wide mb-1.5">Message</label>
              <textarea id="contact-message" name="message" rows={5} placeholder="Tell me about your project or just say hi 👋"
                value={form.message} onChange={handleChange} required className="contact-input resize-none" />
            </div>

            {status === "sent" && <p className="text-sm font-mono font-bold text-[#E8650A]">✅ Message sent! I&apos;ll get back to you soon.</p>}
            {status === "error" && <p className="text-sm font-mono font-bold text-red-600">❌ Something went wrong. Please email me directly.</p>}

            <motion.button
              id="contact-submit" type="submit"
              disabled={status === "sending" || status === "sent"}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="btn-orange w-full py-4 rounded-none text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === "sending" ? (
                <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending...</>
              ) : (
                <><Send className="w-4 h-4" /> Send Message</>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
