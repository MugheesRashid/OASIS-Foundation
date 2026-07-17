"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { geoMercator, geoPath } from "d3-geo";

import { cities } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function ReachMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mapData, setMapData] = useState<any>(null);

  const width = 500;
  const height = 500;

  useEffect(() => {
    fetch("/map/pakistan.geojson")
      .then((res) => res.json())
      .then((data) => {
        setMapData(data);
        console.log(data);
      }).catch(e => console.error(e));
  }, []);

  const projection = geoMercator()
    .center([69.3, 30.3])
    .scale(1800)
    .translate([width / 2, height / 2]);

  const pathGenerator = geoPath().projection(projection);

  return (
    <section className="bg-ink px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto ">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">

          <Reveal>
            <SectionEyebrow>
              Where we work
            </SectionEyebrow>

            <h2 className="mt-6 font-display text-4xl leading-tight text-paper md:text-5xl">
              National reach, local roots
            </h2>

            <p className="mt-6 max-w-md text-paper-dim leading-relaxed">
              In-person programs run today in four cities — with new campuses
              added every quarter. Every workshop is also live online, so
              distance is never the barrier.
            </p>

            <ul className="mt-8 space-y-3">
              {cities.map((city) => (
                <li
                  key={city.name}
                  onMouseEnter={() => setHovered(city.name)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex items-center gap-3 text-sm cursor-pointer transition-colors ${hovered === city.name
                    ? "text-ember"
                    : "text-paper-dim"
                    }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {city.name}
                </li>
              ))}
            </ul>
          </Reveal>


          <Reveal delay={0.1}>
            <div className="relative aspect-square w-full max-w-md mx-auto rounded-[var(--radius-lg)] border border-ink-line bg-ink-raised overflow-hidden">

              {/* Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(242,169,59,0.12),transparent_70%)]" />


              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="relative h-full w-full"
              >

                {/* Pakistan GeoJSON */}
                {mapData && (
                  <path
                    d={pathGenerator(mapData) || ""}
                    fill="#111111"
                    stroke="#343434"
                    strokeWidth="1"
                  />
                )}


                {/* City Markers */}
                {cities.map((city) => {

                  const coords = projection([
                    city.lng,
                    city.lat,
                  ]);

                  if (!coords) return null;

                  const [x, y] = coords;


                  return (
                    <g
                      key={city.name}
                      onMouseEnter={() =>
                        setHovered(city.name)
                      }
                      onMouseLeave={() =>
                        setHovered(null)
                      }
                      style={{
                        cursor: "pointer",
                      }}
                    >

                      <motion.circle
                        cx={x}
                        cy={y}
                        r={
                          hovered === city.name
                            ? 8
                            : 5
                        }
                        fill="var(--ember)"
                        animate={{
                          opacity: [
                            0.5,
                            1,
                            0.5,
                          ],
                          scale: [
                            1,
                            1.3,
                            1,
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />


                      <circle
                        cx={x}
                        cy={y}
                        r="15"
                        fill="none"
                        stroke="var(--ember)"
                        opacity="0.35"
                      />


                      {hovered === city.name && (
                        <text
                          x={x}
                          y={y - 18}
                          textAnchor="middle"
                          fill="#fff"
                          fontSize="12"
                          fontWeight="600"
                        >
                          {city.name}
                        </text>
                      )}

                    </g>
                  );
                })}

              </svg>


              <p className="absolute bottom-4 left-0 right-0 text-center text-xs font-mono uppercase tracking-widest text-paper-dim">
                Live program locations across Pakistan
              </p>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}