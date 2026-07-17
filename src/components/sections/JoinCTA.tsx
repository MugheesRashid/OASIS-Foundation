"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { joinCta } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { EmberParticles } from "@/components/ui/EmberParticles";
import { Reveal } from "@/components/ui/Reveal";

export function JoinCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

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
          <p className="mt-6 text-lg text-paper-dim">{joinCta.sub}</p>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 rounded-[var(--radius-lg)] border border-good/40 bg-ink-raised p-8"
            >
              <p className="font-display text-xl text-good">You&rsquo;re in! 🎉</p>
              <p className="mt-2 text-sm text-paper-dim">
                Check your inbox — we&rsquo;ll be in touch with next steps.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                required
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-ink-line bg-ink-raised px-6 py-3.5 text-sm text-paper placeholder:text-paper-dim/60 outline-none transition-colors focus:border-ember sm:w-72"
              />
              <Button type="submit">{joinCta.cta.label}</Button>
            </form>
          )}
          <p className="mt-5 text-xs text-paper-dim">{joinCta.reassurance}</p>
        </Reveal>
      </div>
    </section>
  );
}
