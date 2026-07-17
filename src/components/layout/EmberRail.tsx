"use client"

import { useEffect, useRef } from "react";

export function EmberRail() {
  const fillRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${progress})`;
      }

      if (sparkRef.current) {
        sparkRef.current.style.top = `${progress * 100}%`;
      }
    }

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 bottom-0 w-[3px] z-50"
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(242,169,59,0.12)" }}
      />

      <div
        ref={fillRef}
        className="absolute inset-0 origin-top"
        style={{
          transform: "scaleY(0)",
          background:
            "linear-gradient(to bottom, var(--ember), var(--ember-soft) 60%, var(--signal))",
          boxShadow: "2px 0 12px 0 var(--ember)",
        }}
      />

      <div
        ref={sparkRef}
        style={{
          position: "absolute",
          top: "0%",
          left: "50%",
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "var(--ember-soft)",
          transform: "translate(-50%, -50%)",
          boxShadow:
            "0 0 20px 6px var(--ember), 0 0 40px 10px rgba(242,169,59,0.4)",
        }}
      />
    </div>
  );
}