"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Ambient infinite ticker. Duplicated content + CSS keyframe animation
 * (GPU-friendly transform, not JS-driven) so it costs almost nothing at
 * runtime. Pauses on hover, and freezes entirely for reduced-motion users.
 */
export function Marquee({
  items,
  speed = 42,
  className,
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loop = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative overflow-hidden border-y border-ink-line py-5",
        className
      )}
    >
      <div
        className="flex w-max gap-10 whitespace-nowrap [animation:marquee_var(--speed)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={
          {
            "--speed": `${speed}s`,
          } as React.CSSProperties
        }
      >
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl md:text-3xl text-paper-dim">
              {item}
            </span>
            <span className="text-ember text-xl" aria-hidden>
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}