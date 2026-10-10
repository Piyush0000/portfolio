/**
 * Branded intro. Pure CSS: it plays from the first paint and removes itself
 * after ~1.2s without waiting for JavaScript. The head script marks
 * `data-intro="seen"` on repeat visits (per session) and with reduced motion,
 * which hides it entirely.
 */
export default function Loader() {
  return (
    <div aria-hidden className="intro-loader fixed inset-0 z-[150] flex items-end justify-between bg-bg p-6 md:p-12">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-24 w-24">
          <span className="absolute inset-0 rounded-full border border-cyan/60" />
          <span className="intro-spin absolute inset-0 rounded-full border-t-2 border-magenta" />
          <span className="absolute inset-0 grid place-items-center font-display text-lg font-bold">PR</span>
        </div>
      </div>
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Initializing</span>
      <span className="intro-count font-display text-6xl font-bold tabular-nums md:text-8xl" />
    </div>
  );
}
