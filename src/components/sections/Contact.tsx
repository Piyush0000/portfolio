"use client";

import { useState } from "react";
import { ArrowUpRight, Check, FileDown, Loader2, Send } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { site } from "@/data/site";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import Magnetic from "../ui/Magnetic";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string; errors?: Record<string, string> };

const empty = { name: "", email: "", subject: "", message: "", company: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ state: "sent" });
        setForm(empty);
      } else setStatus({ state: "error", message: json.error, errors: json.errors });
    } catch {
      setStatus({ state: "error", message: "Network error. Please email me directly." });
    }
  };

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(form.subject || "Hello Piyush")}&body=${encodeURIComponent(form.message)}`;
  const err = status.errors ?? {};

  const socials = [
    { icon: FiMail, label: site.email, href: `mailto:${site.email}` },
    { icon: FiLinkedin, label: "LinkedIn", href: site.linkedin },
    { icon: FiGithub, label: `github.com/${site.githubUser}`, href: site.github },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-section">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[50vh] w-[90vw] -translate-x-1/2 rounded-full bg-violet/15 blur-[140px]" />
      <div className="container relative">
        <SectionHeading index="07" eyebrow="Contact" title="Let's build something *that ships.*" />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <Reveal>
              <p className="text-xl leading-relaxed text-ink/80">
                Hiring for full-stack, backend or AI/LLM engineering? I&apos;d like to hear about the problem. I usually reply within a day.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="space-y-2">
                {socials.map(({ icon: Icon, label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-2xl border border-line/10 px-5 py-4 transition hover:border-cyan/60 hover:bg-cyan/5"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-cyan" aria-hidden />
                        <span className="font-mono text-sm">{label}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <Magnetic>
                <a href={site.resumeUrl} download className="btn-ghost">
                  Download résumé (PDF) <FileDown className="h-4 w-4" aria-hidden />
                </a>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <form onSubmit={submit} noValidate className="glass relative space-y-5 rounded-3xl p-6 md:p-9" aria-describedby="contact-status">
              <h3 id="contact-title" className="font-display text-2xl font-semibold">
                Send a message
              </h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" value={form.name} onChange={update} error={err.name} autoComplete="name" required />
                <Field label="Email" name="email" type="email" value={form.email} onChange={update} error={err.email} autoComplete="email" required />
              </div>
              <Field label="Subject" name="subject" value={form.subject} onChange={update} error={err.subject} />
              <Field label="Message" name="message" value={form.message} onChange={update} error={err.message} textarea required />

              {/* Honeypot */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Company
                  <input tabIndex={-1} name="company" value={form.company} onChange={update} autoComplete="off" />
                </label>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p id="contact-status" role="status" aria-live="polite" className="min-h-[1.5rem] text-sm">
                  {status.state === "sent" && (
                    <span className="flex items-center gap-2 text-lime">
                      <Check className="h-4 w-4" aria-hidden /> Sent. Thanks, I&apos;ll be in touch soon.
                    </span>
                  )}
                  {status.state === "error" && (
                    <span className="text-magenta">
                      {status.message ?? "Something went wrong."}{" "}
                      <a href={mailto} className="underline underline-offset-4">
                        Open email
                      </a>
                    </span>
                  )}
                </p>
                <Magnetic>
                  <button type="submit" className="btn-primary disabled:opacity-60" disabled={status.state === "sending"}>
                    {status.state === "sending" ? (
                      <>
                        Sending <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      </>
                    ) : (
                      <>
                        Send <Send className="h-4 w-4" aria-hidden />
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  textarea,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  textarea?: boolean;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;
  const common = {
    id,
    name,
    value,
    onChange,
    required,
    autoComplete,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: `field ${error ? "!border-magenta" : ""}`,
  };
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-muted">
        {label}
        {required && <span className="text-magenta"> *</span>}
      </label>
      {textarea ? <textarea rows={6} {...common} className={`${common.className} resize-none`} /> : <input type={type} {...common} />}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-magenta">
          {error}
        </p>
      )}
    </div>
  );
}
