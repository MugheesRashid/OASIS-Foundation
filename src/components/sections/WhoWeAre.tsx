"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroCopy, tickerItems } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

const facts = [
  {
    title: "Grassroots, not top-down",
    body: "OASIS was founded by students who felt the gap in career guidance, ethics, and civic education firsthand — and decided to build the solution themselves.",
  },
  {
    title: "In-person and online",
    body: "Sessions run directly on partner campuses in four cities, and every program is also available over Zoom and Discord for students anywhere in Pakistan.",
  },
  {
    title: "Volunteer-powered",
    body: "Mentors, campus ambassadors, and content creators keep the movement running — no paid staff, no overhead passed on to students.",
  },
];

export function WhoWeAre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // const prefersReduced = window.matchMedia(
    //   "(prefers-reduced-motion: reduce)"
    // ).matches;
    // const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    // if (prefersReduced || !isDesktop) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !pinRef.current) return;
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=80",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative bg-ink">
      <div className="mx-auto  px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: pinned narrative */}
          <div ref={pinRef} className="h-max py-24 md:py-32">
            <SectionEyebrow>Who we are</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight text-paper md:text-5xl">
              By students.
              <br />
              For students.
            </h2>
            <p className="mt-6 max-w-md text-paper-dim leading-relaxed">
              {heroCopy.quote}
            </p>
            <p className="mt-4 text-sm font-medium text-ember">
              — Sahibzada Ahmed Raza, Founder
            </p>
          </div>

          {/* Right: scrolling supporting facts */}
          <div className="flex flex-col gap-10 py-24 md:py-32">
            {facts.map((fact, i) => (
              <Reveal key={fact.title} delay={i * 0.05}>
                <div className="rounded-[var(--radius-lg)] border border-ink-line bg-ink-raised p-8">
                  <span className="font-mono text-xs text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-paper">
                    {fact.title}
                  </h3>
                  <p className="mt-3 text-paper-dim leading-relaxed">
                    {fact.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Marquee items={tickerItems} />
    </section>
  );
}
