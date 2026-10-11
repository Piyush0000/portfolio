"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "../providers/Preferences";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEFXYZ";

/**
 * Decodes `text` from random glyphs when it scrolls into view, and again on
 * hover. Screen readers always get the final text through aria-label.
 */
export default function ScrambleText({
  text,
  className,
  as: Tag = "span",
  duration = 900,
  hover = true,
}: {
  text: string;
  className?: string;
  as?: "span" | "p" | "div";
  duration?: number;
  hover?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [output, setOutput] = useState(text);
  const frame = useRef(0);

  const run = useCallback(() => {
    if (reduced) {
      setOutput(text);
      return;
    }
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(progress * text.length);
      let next = text.slice(0, revealed);
      for (let i = revealed; i < text.length; i++) {
        next += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOutput(next);
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  }, [text, duration, reduced]);

  useEffect(() => {
    if (inView) run();
    return () => cancelAnimationFrame(frame.current);
  }, [inView, run]);

  return (
    <Tag
      ref={ref as never}
      onPointerEnter={hover ? run : undefined}
      className={className}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden>{output}</span>
    </Tag>
  );
}
