import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Piyush Rathore — AI/ML Engineer & Full Stack Developer",
  description:
    "Portfolio of Piyush Rathore — AI/ML Engineer and Full Stack Developer crafting intelligent systems at the intersection of AI and full-stack engineering. Based in Delhi, India.",
  keywords: ["Piyush Rathore", "AI/ML Engineer", "Full Stack Developer", "Portfolio", "React", "Next.js"],
  authors: [{ name: "Piyush Rathore" }],
  openGraph: {
    title: "Piyush Rathore — AI/ML Engineer & Full Stack Developer",
    description: "Crafting intelligent systems at the intersection of AI and full-stack engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-[#F5F0E8] text-[#0D0B0A] antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
