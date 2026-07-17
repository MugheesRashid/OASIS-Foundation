"use client";

import { motion } from "motion/react";
import { joinCta } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { Reveal } from "@/components/ui/Reveal";

export function JoinCTA() {
  return (
    <section
      id="join"
      className="relative overflow-hidden bg-ink px-6 py-32 text-center md:px-10 md:py-40"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 100%, rgba(242,169,59,0.16), transparent 70%)",
        }}
      />

      <EmberParticles count={16} />

      <div className="relative mx-auto max-w-2xl">
        <Reveal>
          <p className="eyebrow justify-center">
            <span className="h-px w-6 bg-current" />
            {joinCta.eyebrow}
          </p>

          <h2 className="mt-6 font-display text-4xl leading-tight text-paper md:text-6xl">
            {joinCta.headline}
          </h2>

          <p className="mt-6 text-lg text-paper-dim">
            {joinCta.sub}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-10 flex justify-center"
          >
            <Button>
              <a
                href={joinCta.cta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {joinCta.cta.label}
              </a>
            </Button>
          </motion.div>

          <p className="mt-5 text-xs text-paper-dim">
            {joinCta.reassurance}
          </p>
        </Reveal>
      </div>
    </section>
  );
}