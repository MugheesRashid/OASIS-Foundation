"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cities } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function ReachMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="bg-ink px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <SectionEyebrow>Where we work</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight text-paper md:text-5xl">
              National reach, local roots
            </h2>
            <p className="mt-6 max-w-md text-paper-dim leading-relaxed">
              In-person programs run today in four cities — with new campuses
              added every quarter. Every workshop is also live online, so
              distance is never the barrier.
            </p>
            <ul className="mt-8 space-y-3">
              {cities.map((city) => (
                <li
                  key={city.name}
                  onMouseEnter={() => setHovered(city.name)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex items-center gap-3 text-sm transition-colors duration-300 ${
                    hovered === city.name ? "text-ember" : "text-paper-dim"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {city.name}
                </li>
              ))}
              <li className="flex items-center gap-3 text-sm text-paper-dim/60">
                <span className="h-1.5 w-1.5 rounded-full border border-current" />
                More cities added every quarter
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-square w-full max-w-md mx-auto rounded-[var(--radius-lg)] border border-ink-line bg-ink-raised p-8">
              <svg
                viewBox="0 0 100 100"
                className="h-full w-full opacity-90"
                aria-hidden
              >
                {/* Simplified abstract Pakistan silhouette — stylized, not geographically precise */}
                <path
                  d="M35 10 L58 14 L64 22 L60 30 L68 38 L66 50 L72 58 L64 68 L58 82 L46 90 L38 80 L30 72 L26 58 L20 46 L26 34 L24 20 Z"
                  fill="none"
                  stroke="var(--ink-line)"
                  strokeWidth="1"
                />
                {cities.map((city) => (
                  <g key={city.name}>
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r={hovered === city.name ? 3.2 : 2.2}
                      fill="var(--ember)"
                      animate={{
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ transition: "r 0.2s ease" }}
                    />
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="6"
                      fill="none"
                      stroke="var(--ember)"
                      strokeWidth="0.4"
                      opacity="0.4"
                    />
                  </g>
                ))}
              </svg>
              <p className="mt-4 text-center text-xs font-mono uppercase tracking-widest text-paper-dim">
                Illustrative map · not to scale
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
