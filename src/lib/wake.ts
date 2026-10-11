// Runs `cb` once, on the visitor's first interaction or after `timeout` ms,
// whichever comes first. Used to keep non-essential work (smooth scroll,
// GSAP, WebGL) out of the initial load.

const EVENTS = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown", "scroll"] as const;

export function onWake(cb: () => void, timeout = 6000): () => void {
  let done = false;
  const fire = () => {
    if (done) return;
    done = true;
    cleanup();
    cb();
  };
  const timer = window.setTimeout(fire, timeout);
  EVENTS.forEach((e) => window.addEventListener(e, fire, { passive: true }));
  function cleanup() {
    window.clearTimeout(timer);
    EVENTS.forEach((e) => window.removeEventListener(e, fire));
  }
  return cleanup;
}
