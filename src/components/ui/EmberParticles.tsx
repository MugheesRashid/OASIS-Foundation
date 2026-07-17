"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Purely decorative ember particles rising through the hero. Built with
 * CSS keyframes (GPU transform/opacity only) instead of canvas or a JS
 * animation loop, so it's essentially free at runtime. Disabled for
 * reduced-motion users since it carries no information.
 */
export function EmberParticles({ count = 22 }: { count?: number }) {
  const prefersReduced = useReducedMotion();
  // Must not render on the server: Math.random() produces different values
  // on SSR vs client, and useReducedMotion() returns null on SSR — both
  // cause hydration mismatches. Rendering nothing server-side is safe
  // because this component is purely decorative.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        size: 2 + Math.round(Math.random() * 4),
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 10,
        drift: (Math.random() - 0.5) * 60,
      })),
    [count]
  );

  if (!mounted || prefersReduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              background: "var(--ember-soft)",
              opacity: 0,
              filter: `blur(${p.size > 4 ? 1 : 0.5}px)`,
              boxShadow: `0 0 ${p.size * 3}px ${p.size}px var(--ember)`,
              animation: `rise ${p.duration}s ease-in ${p.delay}s infinite`,
              "--drift": `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
