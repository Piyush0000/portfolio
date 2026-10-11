import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { PreferencesProvider, prefsInitScript } from "@/components/providers/Preferences";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { MotionProvider } from "@/components/providers/Motion";
import Navbar from "@/components/sections/Navbar";
import Loader from "@/components/sections/Loader";
import Cursor from "@/components/ui/Cursor";

const display = Unbounded({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500"] });

const title = `${site.name} | ${site.role}`;
const description =
  "Full-stack and AI engineer. Co-founder/CTO at Evoc Labs, leading Orbit 360, a multi-tenant commerce platform, plus real-time voice AI and multi-agent LLM systems.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name,
    "Full-stack engineer",
    "Backend engineer",
    "AI engineer",
    "LLM engineer",
    "Node.js",
    "Python",
    "Next.js",
    "LangGraph",
    "Evoc Labs",
    "Orbit 360",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06070f" },
    { media: "(prefers-color-scheme: light)", color: "#f4f5fb" },
  ],
  colorScheme: "dark light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Co-founder / CTO",
  worksFor: { "@type": "Organization", name: "Evoc Labs", url: "https://www.evoclabs.com" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Maharaja Agrasen Institute of Technology" },
  address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
  sameAs: [site.github, site.linkedin],
  knowsAbout: ["Backend engineering", "Large language models", "AI agents", "Next.js", "Node.js", "Python"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" data-motion="full" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <PreferencesProvider>
          <MotionProvider>
            <SmoothScrollProvider>
              <Loader />
              <Navbar />
              {children}
              <Cursor />
              <div aria-hidden className="grain" />
            </SmoothScrollProvider>
          </MotionProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}
