"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps photography with a soft radial "spotlight" that follows the
 * cursor, brightening the image beneath it — a nod to SolarAid's
 * cursor-illumination pattern, and thematically apt for a foundation
 * about "igniting" opportunity. Falls back to a static state on touch
 * devices, which have no cursor to track.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  function handleMove(e: MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)] border border-ink-line",
        className
      )}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(220px circle at ${pos.x}% ${pos.y}%, rgba(242,169,59,0.25), transparent 70%)`,
        }}
      />
    </div>
  );
}
