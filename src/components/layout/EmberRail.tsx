"use client";

import { useEffect, useRef } from "react";

export function EmberRail() {
  const pathRef = useRef<SVGPathElement>(null);
  const sparkRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const spark = sparkRef.current;

    if (!path || !spark) return;

    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    function update() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = height > 0 ? scrollTop / height : 0;

      const currentLength = length * progress;

      path.style.strokeDashoffset = `${length - currentLength}`;

      const point = path.getPointAtLength(currentLength);

      spark.setAttribute("cx", point.x.toString());
      spark.setAttribute("cy", point.y.toString());
    }

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 3000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="waveGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--ember)"
            />

            <stop
              offset="60%"
              stopColor="var(--ember-soft)"
            />

            <stop
              offset="100%"
              stopColor="var(--signal)"
            />
          </linearGradient>
        </defs>


        {/* Soft background wave */}

        <path
          d="
            M 600 0

            C 600 250, 700 400, 600 650

            C 480 900, 520 1100, 700 1350

            C 950 1650, 850 1850, 500 2150

            C 150 2450, 300 2700, 600 3000
          "
          fill="none"
          stroke="rgba(242,169,59,0.15)"
          strokeWidth="5"
        />


        {/* Animated wave */}

        <path
          ref={pathRef}
          d="
            M 600 0

            C 600 250, 700 400, 600 650

            C 480 900, 520 1100, 700 1350

            C 950 1650, 850 1850, 500 2150

            C 150 2450, 300 2700, 600 3000
          "
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            filter:
              "drop-shadow(0 0 8px var(--ember))",
          }}
        />


        {/* Ember point */}

        <circle
          ref={sparkRef}
          cx="600"
          cy="0"
          r="9"
          fill="var(--ember-soft)"
          style={{
            filter:
              "drop-shadow(0 0 18px var(--ember))",
          }}
        />

      </svg>
    </div>
  );
}