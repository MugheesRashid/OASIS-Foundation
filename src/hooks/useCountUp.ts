"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "motion/react";

/**
 * Animates a number counting up from 0 to `value` once the element enters
 * the viewport. Respects prefers-reduced-motion by snapping straight to the
 * final value instead of animating.
 */
export function useCountUp(value: number, duration = 1.6) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      // Reduced-motion users get the final value immediately instead of
      // an animated count — an intentional synchronous set, not a bug.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, prefersReduced]);

  return { ref, display };
}
