"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const DEFAULT_DURATION = 5000; // ms — total time the counter takes to reach 100
const HOLD_AT_100 = 2000; // ms — brief pause on "100" before the curtain lifts

type PreloaderProps = {
  /** Called the moment the preloader has fully exited the DOM. Use this to
   * kick off Hero animations, etc. so they land right as the curtain lifts. */
  onComplete?: () => void;
  /** Total ms for the count to go from 0 → 100. */
  duration?: number;
  /** When true (default), the preloader only plays once per browser tab
   * session (via sessionStorage) — refreshing within the same tab won't
   * replay it. Set to false to always play it (e.g. while designing it). */
  once?: boolean;
};

/**
 * Full-screen preloader: a plain, textured "ink" surface with a single
 * counting number pinned to the bottom-right corner. Intentionally quiet —
 * everything else on the site is expressive, so the one moment before the
 * site even appears stays disciplined and confident rather than flashy.
 *
 * Self-contained: mount it once near the root and it manages its own
 * lifecycle (timing, exit animation, scroll lock, reduced-motion handling).
 */
export function Preloader({
  onComplete,
  duration = DEFAULT_DURATION,
  once = true,
}: PreloaderProps) {
  //   const prefersReduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | undefined>(undefined);

  // Decide, once, on mount, whether this play-through should actually show.
  const alreadyPlayed =
    once &&
    typeof window !== "undefined" &&
    sessionStorage.getItem("oasis-preloader") === "seen";

  useEffect(() => {
    if (alreadyPlayed) {
      onComplete?.();
      return;
    }

    // One-time client-only mount decision (reads sessionStorage on first
    // render), not a synchronization loop — safe to disable for this block.
    /* eslint-disable react-hooks/set-state-in-effect */
    setShouldRender(true);
    setVisible(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!visible) return;

    if (alreadyPlayed) {
      // Skip the count animation entirely — jump straight to done after a
      // short, deliberate beat so the transition doesn't feel abrupt.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(100);
      const t = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(t);
    }

    function tick(ts: number) {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), HOLD_AT_100);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible, duration]);

  function handleExitComplete() {
    document.body.style.overflow = "";
    if (once && typeof window !== "undefined") {
      sessionStorage.setItem("oasis-preloader", "seen");
    }
    onComplete?.();
  }

  if (!shouldRender) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          style={{ willChange: "opacity, transform" }}
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label={`Loading OASIS Foundation, ${progress} percent`}
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            scale: 1.015,
            y: -60,
          }}
          transition={{
            duration: 1.1,
            ease: EASE_OUT_EXPO,
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-end overflow-hidden bg-ink"
        >
          {/* Texture: subtle grain + faint corner glow, nothing else */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 40% at 100% 100%, rgba(242,169,59,0.10), transparent 70%)",
            }}
          />

          {/* Tiny brand mark, top-left — quiet, not a hero moment */}
          <div className="absolute left-6 top-6 md:left-10 md:top-10">
            <span className="font-display text-sm tracking-tight text-paper-dim">
              <Image
                src="/Logo.png"
                alt="OASIS Foundation"
                width={100}
                height={100}
              ></Image>
            </span>
          </div>

          {/* Countdown, bottom-right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: EASE_OUT_EXPO,
            }}
            className="relative flex items-end justify-end p-6 md:p-10"
          >
            <div className="flex items-baseline gap-1 font-mono tabular-nums text-paper">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={progress}
                  initial={{ opacity: 0.6, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -70 }}
                  transition={{ duration: 0.18 }}
                  className="text-5xl progress md:text-7xl"
                >
                  {String(progress).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>{" "}
              <span className="text-lg text-paper-dim md:text-xl">%</span>
            </div>
          </motion.div>

          {/* Thin ember fill tracking progress along the bottom edge */}
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-ink-line">
            <motion.div
              className="h-full bg-gradient-to-r from-ember to-ember-soft"
              animate={{ width: `${progress}%` }}
              transition={{
                ease: "linear",
                duration: 0.08,
              }}
            />{" "}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
