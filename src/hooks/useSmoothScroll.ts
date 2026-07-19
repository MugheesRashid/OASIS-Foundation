"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisSingleton: Lenis | null = null;

export function getLenis() {
  return lenisSingleton;
}

/**
 * Drives Lenis smooth scrolling and keeps GSAP's ScrollTrigger in sync with
 * it (otherwise pinned/scrubbed animations drift out of alignment with the
 * eased scroll position). Skips entirely when the user prefers reduced
 * motion — native scroll is faster and calmer for them.
 */
export function useSmoothScroll() {
  // useEffect(() => {
  //   const prefersReduced = window.matchMedia(
  //     "(prefers-reduced-motion: reduce)"
  //   ).matches;
  //   if (prefersReduced) return;

  //   gsap.registerPlugin(ScrollTrigger);

  //   const lenis = new Lenis({
  //     duration: 1.1,
  //     easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     smoothWheel: true,
  //     touchMultiplier: 1.2,
  //   });
  //   lenisSingleton = lenis;

  //   lenis.on("scroll", ScrollTrigger.update);

  //   gsap.ticker.add((time) => {
  //     lenis.raf(time * 1000);
  //   });
  //   gsap.ticker.lagSmoothing(0);

  //   return () => {
  //     lenis.destroy();
  //     lenisSingleton = null;
  //     gsap.ticker.remove((time) => lenis.raf(time * 1000));
  //   };
  // }, []);
}
