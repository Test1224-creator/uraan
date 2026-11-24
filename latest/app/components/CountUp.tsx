"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  /** text after the number, e.g. "+" or "K+" (drawn in the accent colour) */
  suffix?: string;
  durationMs?: number;
  suffixClassName?: string;
};

const format = (n: number) => n.toLocaleString("en-US");

/**
 * Counts up from 0 to `to` the first time it scrolls into view.
 * The final number is what's server-rendered, so it's correct without
 * JavaScript and for screen readers; reduced-motion users skip the count.
 */
export default function CountUp({
  to,
  suffix = "",
  durationMs = 1600,
  suffixClassName,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out
          setValue(Math.round(eased * to));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setValue(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, durationMs]);

  return (
    <span ref={ref}>
      {/* screen readers get the final number, not every frame */}
      <span className="sr-only">{`${format(to)}${suffix}`}</span>
      <span aria-hidden="true">{format(value)}</span>
      {suffix && (
        <span aria-hidden="true" className={suffixClassName}>
          {suffix}
        </span>
      )}
    </span>
  );
}
