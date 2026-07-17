"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * A thin ember trail fixed to the left edge of the viewport that fills
 * with a glowing gradient as the visitor scrolls. A spark rides the leading
 * edge. Uses window scroll events directly (compatible with Lenis) instead
 * of relying on ScrollTrigger's scrub, which can drift when Lenis intercepts
 * native scroll events.
 */
export function EmberRail() {
  const fillRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    function update() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${progress})`;
      }
      if (sparkRef.current) {
        sparkRef.current.style.top = `${progress * 100}%`;
      }
    }

    // Run once on mount so the spark is visible at 0 scroll
    update();

    // Listen to both native scroll and GSAP ticker so Lenis-driven scroll
    // (which doesn't fire native scroll events) is also captured.
    window.addEventListener("scroll", update, { passive: true });
    gsap.ticker.add(update);

    return () => {
      window.removeEventListener("scroll", update);
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 bottom-0 w-[3px] z-50 motion-reduce:hidden"
    >
      {/* Track — slightly lighter than bg so it's visible */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(242,169,59,0.12)" }}
      />
      {/* Fill — animated gradient */}
      <div
        ref={fillRef}
        className="absolute inset-0 origin-top"
        style={{
          transform: "scaleY(0)",
          background:
            "linear-gradient(to bottom, var(--ember), var(--ember-soft) 60%, var(--signal))",
          boxShadow: "2px 0 12px 0 var(--ember)",
        }}
      />
      {/* Spark — glowing orb riding the fill's leading edge */}
      <div
        ref={sparkRef}
        style={{
          position: "absolute",
          top: "0%",
          left: "50%",
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "var(--ember-soft)",
          transform: "translate(-50%, -50%)",
          boxShadow:
            "0 0 20px 6px var(--ember), 0 0 40px 10px rgba(242,169,59,0.4)",
        }}
      />
    </div>
  );
}