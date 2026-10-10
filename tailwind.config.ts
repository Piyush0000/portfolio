import type { Config } from "tailwindcss";

// Every color is a CSS variable (RGB channels) defined in globals.css, so the
// dark and light themes swap by changing `data-theme` on <html>.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem", xl: "3rem" }, screens: { "2xl": "1440px" } },
    extend: {
      colors: {
        bg: token("c-bg"),
        "bg-2": token("c-bg-2"),
        surface: token("c-surface"),
        ink: token("c-ink"),
        muted: token("c-muted"),
        line: token("c-line"),
        cyan: token("c-cyan"),
        magenta: token("c-magenta"),
        violet: token("c-violet"),
        lime: token("c-lime"),
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(2.75rem, 9vw, 9.5rem)", { lineHeight: "0.92", letterSpacing: "-0.045em" }],
        "display-xl": ["clamp(2.25rem, 6.5vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2rem, 4.5vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
      },
      spacing: {
        section: "clamp(6rem, 14vh, 11rem)",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        pulseRing: { "0%": { transform: "scale(.8)", opacity: ".7" }, "100%": { transform: "scale(2.4)", opacity: "0" } },
        shimmer: { to: { backgroundPosition: "200% center" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "pulse-ring": "pulseRing 2s cubic-bezier(0.16,1,0.3,1) infinite",
        shimmer: "shimmer 6s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
