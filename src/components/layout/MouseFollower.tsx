"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * A glowing ember orb that smoothly trails the user's cursor.
 * Uses optimized GSAP property setters with quickTo mechanics to maintain
 * performance without breaking layout coordinate context.
 */
export function MouseFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {

    // const prefersReduced = window.matchMedia(
    //   "(prefers-reduced-motion: no-preference)"
    // ).matches;
    // const isTouch = window.matchMedia("(pointer: coarse)").matches;

    //  if (prefersReduced && !isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial layout positioning values to clear the baseline CSS configurations instantly
    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      opacity: 1,
      visibility: "visible"
    });

    // Use clean frame triggers explicitly referencing ClientX window dimensions
    const moveDotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      // Force layout calculation checks relative to the current window frame context
      moveDotX(e.clientX);
      moveDotY(e.clientY);
      moveRingX(e.clientX);
      moveRingY(e.clientY);
    };

    const onEnterLink = () => {
      gsap.to(ring, {
        scale: 1.6,
        borderColor: "var(--ember)",
        backgroundColor: "rgba(242,169,59,0.08)",
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.15, ease: "power2.out" });
    };

    const onLeaveLink = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "var(--ember-soft)",
        backgroundColor: "transparent",
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const selectors = "a, button, [role=button], input, textarea, select, [data-cursor-hover]";
    const attachHover = () => {
      document.querySelectorAll<HTMLElement>(selectors).forEach((el) => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = "1";
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };
    attachHover();

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Inner dot — tight follow layout layer */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99999]"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--ember)",
          boxShadow: "0 0 12px 4px var(--ember)",
          visibility: "hidden", // Starts hidden to clear structural pop during initial paint
          willChange: "transform",
        }}
      />

      {/* Outer ring — smooth loose lag spring trail layer */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99998]"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1.5px solid var(--ember-soft)",
          visibility: "hidden",
          willChange: "transform",
        }}
      />
    </>
  );
}