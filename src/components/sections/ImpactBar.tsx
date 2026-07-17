"use client";

import { impactStats } from "@/lib/data";
import { useCountUp } from "@/hooks/useCountUp";

function Stat({
  value,
  suffix,
  label,
  note,
}: (typeof impactStats)[number]) {
  const { ref, display } = useCountUp(value);
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-8 text-center md:items-start md:text-left">
      <span className="font-display text-5xl text-paper md:text-6xl">
        <span ref={ref} className="font-mono tabular-nums text-ember">
          {display}
        </span>
        {suffix}
      </span>
      <span className="text-sm font-medium text-paper">{label}</span>
      <span className="text-xs text-paper-dim">{note}</span>
    </div>
  );
}

export function ImpactBar() {
  return (
    <section className="relative border-y border-ink-line bg-ink-raised">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-y divide-ink-line md:grid-cols-4 md:divide-x md:divide-y-0">
        {impactStats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
