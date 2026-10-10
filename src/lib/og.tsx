import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card: dark neon backdrop, kicker, title and subtitle. */
export function renderOg({ kicker, title, subtitle, footer }: { kicker: string; title: string; subtitle: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#06070f",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(151,107,255,0.45), transparent 45%), radial-gradient(circle at 10% 110%, rgba(34,230,255,0.35), transparent 50%)",
          color: "#eceffa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#22e6ff" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#b6ff3b" }} />
          {kicker}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: title.length > 18 ? 84 : 112, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>{title}</div>
          <div style={{ fontSize: 32, color: "#b8bdd6", lineHeight: 1.35, maxWidth: 1000 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#8c93b2" }}>
          <span>{footer}</span>
          <div style={{ display: "flex", height: 6, width: 280, backgroundImage: "linear-gradient(90deg,#22e6ff,#976bff,#ff3dd8)", borderRadius: 3 }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
