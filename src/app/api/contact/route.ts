import { NextResponse } from "next/server";
import { site } from "@/data/site";

// Sends contact-form messages through Resend's REST API.
// Required env: RESEND_API_KEY. Optional: CONTACT_TO (defaults to site.email),
// CONTACT_FROM (a sender on a domain verified in Resend).

export const runtime = "nodejs";

const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 };
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.company === "string" && body.company.trim()) return NextResponse.json({ ok: true });

  const field = (k: keyof typeof LIMITS) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const data = { name: field("name"), email: field("email"), subject: field("subject"), message: field("message") };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Please add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Please enter a valid email.";
  if (data.message.length < 10) errors.message = "A little more detail, please (10+ characters).";
  for (const [k, max] of Object.entries(LIMITS)) {
    if (data[k as keyof typeof data].length > max) errors[k] = `Keep this under ${max} characters.`;
  }
  if (Object.keys(errors).length) return NextResponse.json({ error: "Please fix the highlighted fields.", errors }, { status: 422 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "The form isn't connected yet. Please email me directly.", code: "not_configured" },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || site.email],
      reply_to: data.email,
      subject: `[Portfolio] ${data.subject || `Message from ${data.name}`}`,
      text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
      html: `<p><strong>From:</strong> ${escape(data.name)} &lt;${escape(data.email)}&gt;</p><p style="white-space:pre-wrap">${escape(data.message)}</p>`,
    }),
  }).catch(() => null);

  if (!res?.ok) {
    console.error("Contact form: Resend request failed", res?.status);
    return NextResponse.json({ error: "Couldn't send right now. Please email me directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
