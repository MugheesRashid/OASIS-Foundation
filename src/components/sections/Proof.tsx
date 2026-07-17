"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Camera, Quote } from "lucide-react";
import { proofStories } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const photoLabels = [
  "Campus workshop — Lahore",
  "Mentorship session — Islamabad",
  "Career guidance — Karachi",
];

export function Proof() {
  const [index, setIndex] = useState(0);
  const story = proofStories[index];

  function next() {
    setIndex((i) => (i + 1) % proofStories.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + proofStories.length) % proofStories.length);
  }

  return (
    <section className="bg-ink px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto ">
        <div className="max-w-2xl">
          <SectionEyebrow>Proof, not promises</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight text-paper md:text-5xl">
            What actually happens on the ground
          </h2>
        </div>

        {/* Photo grid — placeholders ready to be swapped for real documentary photography */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {photoLabels.map((label, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <SpotlightCard className="aspect-[4/5]">
                <div
                  className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center"
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(160deg, #0d1620, #1b2731)"
                        : "linear-gradient(160deg, #14202b, #0d1620)",
                  }}
                >
                  <Camera className="text-paper-dim" size={28} strokeWidth={1.5} />
                  <p className="text-xs font-mono uppercase tracking-wider text-paper-dim">
                    {label}
                  </p>
                  <p className="text-[11px] text-paper-dim/60">
                    Photo placeholder — swap for real session footage
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Testimonial carousel */}
        <Reveal delay={0.1} className="mt-16">
          <div className="relative mx-auto max-w-3xl rounded-[var(--radius-lg)] border border-ink-line bg-ink-raised p-10 md:p-14">
            <Quote className="text-ember" size={32} />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="mt-6 font-display text-xl leading-snug text-paper md:text-2xl">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <p className="mt-6 text-sm text-paper-dim">
                  <span className="text-signal">{story.name}</span> · {story.place}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous story"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-line text-paper-dim transition-colors hover:text-ember hover:border-ember"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                aria-label="Next story"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-line text-paper-dim transition-colors hover:text-ember hover:border-ember"
              >
                <ChevronRight size={16} />
              </button>
              <div className="ml-2 flex gap-1.5">
                {proofStories.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-ember" : "w-1.5 bg-ink-line"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
