import { renderOg, ogSize } from "@/lib/og";
import { getProject } from "@/data/projects";
import { site } from "@/data/site";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";
export const runtime = "edge";

export default function Image({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  return renderOg({
    kicker: p?.kicker ?? "Case study",
    title: p?.title ?? site.name,
    subtitle: p?.pitch ?? "",
    footer: `${site.name} · Case study`,
  });
}
