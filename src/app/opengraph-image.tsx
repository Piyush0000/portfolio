import { renderOg, ogSize } from "@/lib/og";
import { site } from "@/data/site";

export const alt = `${site.name}: ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";
export const runtime = "edge";

export default function Image() {
  return renderOg({
    kicker: "Portfolio",
    title: site.name,
    subtitle: "Full-stack & AI engineer. Co-founder / CTO at Evoc Labs, leading Orbit 360 from first commit to production.",
    footer: "Backend · AI / LLM · Full-stack",
  });
}
