"use client";

import { motion, type Variants } from "motion/react";
import { ArrowDown } from "lucide-react";
import { heroCopy } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { EmberParticles } from "@/components/ui/EmberParticles";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { delay: 0.15 * i, duration: 0.9, ease: EASE_OUT_EXPO },
  }),
};

export function Hero({ start }: { start: boolean }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink px-6 pt-32 pb-20 md:px-10"
    >
      {/* Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(242,169,59,0.14), transparent 70%), radial-gradient(40% 40% at 90% 80%, rgba(62,214,196,0.08), transparent 70%)",
        }}
      />
      <EmberParticles count={60} />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: start ? 1 : 0, y: start ? 0 : 12 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="eyebrow mb-8"
        >
          <span className="h-px w-6 bg-current" />
          {heroCopy.eyebrow}
        </motion.div>

        <h1 className="font-display text-[15vw] leading-[0.95] tracking-tight text-paper md:text-[7.5rem] lg:text-[8.5rem]">
          {heroCopy.headline.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className={`block ${
                  i === heroCopy.headline.length - 1 ? "text-ember" : ""
                }`}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={start ? "visible" : "hidden"}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: start ? 1 : 0, y: start ? 0 : 16 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-paper-dim md:text-xl"
        >
          {heroCopy.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: start ? 1 : 0, y: start ? 0 : 16 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href={heroCopy.primaryCta.href}>
            {heroCopy.primaryCta.label}
          </Button>
          <Button href={heroCopy.secondaryCta.href} variant="secondary">
            {heroCopy.secondaryCta.label}
          </Button>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
          animate={{ opacity: start ? 1 : 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-paper-dim"
      >
        <span className="font-mono uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
}
