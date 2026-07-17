"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A glowing ember orb that smoothly trails the user's cursor.
 * Uses GSAP quickTo for lag-spring physics. xPercent/yPercent handle
 * centering so GSAP's x/y transform doesn't fight the inline translate.
 * Hidden on touch devices and for reduced-motion users.
 */
export function MouseFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReduced || isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial centering via GSAP so it owns the full transform matrix.
    // Using xPercent/yPercent avoids fighting with x/y quickTo.
    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 1 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 1 });

    // quickTo caches the property setter — much faster than gsap.to() per frame
    const moveDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      moveDotX(e.clientX);
      moveDotY(e.clientY);
      moveRingX(e.clientX);
      moveRingY(e.clientY);
    };

    const onEnterLink = () => {
      gsap.to(ring, {
        scale: 1.7,
        borderColor: "var(--ember)",
        backgroundColor: "rgba(242,169,59,0.08)",
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.18, ease: "power2.out" });
    };

    const onLeaveLink = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "var(--ember-soft)",
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.22, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    // Attach hover listeners to interactive elements
    const selectors = "a, button, [role=button], input, textarea, select";
    const attachHover = () => {
      document.querySelectorAll<HTMLElement>(selectors).forEach((el) => {
        // Prevent duplicate listeners
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

  return (
    <>
      {/* Inner dot — tight follow */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] motion-reduce:hidden"
        style={{
          opacity: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--ember)",
          boxShadow: "0 0 10px 3px var(--ember)",
          willChange: "transform",
        }}
      />

      {/* Outer ring — springy lag */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] motion-reduce:hidden"
        style={{
          opacity: 0,
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: "1.5px solid var(--ember-soft)",
          willChange: "transform",
        }}
      />
    </>
  );
}
