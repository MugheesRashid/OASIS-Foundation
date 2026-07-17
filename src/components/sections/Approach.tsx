"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { approach } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Approach() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="approach" className="bg-ink-raised px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <SectionEyebrow>How change happens</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight text-paper md:text-5xl">
            Our approach
          </h2>
          <p className="mt-6 text-paper-dim leading-relaxed">
            {approach.intro}
          </p>
        </div>

        {/* Two-track model */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {approach.tracks.map((track, i) => (
            <Reveal key={track.title} delay={i * 0.1}>
              <div className="h-full rounded-[var(--radius-lg)] border border-ink-line bg-ink p-8 md:p-10">
                <span className="font-mono text-xs text-ember">
                  Track {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl text-paper md:text-3xl">
                  {track.title}
                </h3>
                <p className="mt-4 text-paper-dim leading-relaxed">
                  {track.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Activity areas: tabbed */}
        <Reveal delay={0.15} className="mt-20">
          <h3 className="font-display text-2xl text-paper mb-8">
            Core activity areas
          </h3>
          <div className="flex flex-wrap gap-3 border-b border-ink-line pb-6">
            {approach.activityAreas.map((area, i) => (
              <button
                key={area.title}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                  activeTab === i
                    ? "border-ember bg-ember text-ink"
                    : "border-ink-line text-paper-dim hover:text-paper hover:border-paper-dim"
                )}
              >
                {area.title}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-2xl"
          >
            <p className="text-lg leading-relaxed text-paper">
              {approach.activityAreas[activeTab].body}
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
