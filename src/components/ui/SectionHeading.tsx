import SplitReveal from "./SplitReveal";
import ScrambleText from "./ScrambleText";

/** Numbered eyebrow + split-reveal headline used by every home section. */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  id,
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <header className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
      <div className="eyebrow flex items-center gap-3 md:col-span-3 md:pt-3">
        <span className="text-cyan">{index}</span>
        <span className="h-px w-8 bg-line/20" />
        <ScrambleText text={eyebrow} />
      </div>
      <div className="md:col-span-9">
        <SplitReveal as="h2" text={title} className="font-display text-display-lg font-semibold text-balance" />
        {intro && <p className="mt-6 max-w-2xl text-lg text-muted" id={id}>{intro}</p>}
      </div>
    </header>
  );
}
