import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F5F0E8",
          dark: "#EDE8DE",
          darker: "#E0D9CE",
        },
        orange: {
          DEFAULT: "#E8650A",
          light: "#F97316",
          lighter: "#FB923C",
        },
        dark: {
          DEFAULT: "#0D0B0A",
          2: "#1C1917",
          3: "#292524",
        },
        muted: "#78716C",
        border: "#D6CFC4",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "900" }],
        "display-lg": ["clamp(2rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "900" }],
        "display-md": ["clamp(1.5rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
      },
      boxShadow: {
        brutal: "4px 4px 0 #0D0B0A",
        "brutal-lg": "6px 6px 0 #0D0B0A",
        "brutal-orange": "4px 4px 0 #E8650A",
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "spin-slow": "spin 10s linear infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
