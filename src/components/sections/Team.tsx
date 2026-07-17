import { ExternalLink } from "lucide-react";
import { founder, councils } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

export function Team() {
  return (
    <section id="team" className="bg-ink-raised px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto ">
        <div className="max-w-2xl">
          <SectionEyebrow>Our leadership</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight text-paper md:text-5xl">
            Led by students, guided by mentors
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-5">
          {/* Founder — larger, prominent card */}
          <Reveal className="md:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-[var(--radius-lg)] border border-ember/40 bg-ink p-8">
              <div>
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full font-display text-2xl text-ink"
                  style={{ background: "var(--ember)" }}
                  aria-hidden
                >
                  {founder.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <h3 className="mt-6 font-display text-2xl text-paper">
                  {founder.name}
                </h3>
                <p className="mt-1 text-sm text-ember">{founder.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-paper-dim">
                  Founded OASIS to close the gap between what students are
                  taught and what they actually need to lead — in the
                  classroom, on campus, and in their communities.
                </p>
              </div>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-paper-dim transition-colors hover:text-ember"
              >
                <ExternalLink size={16} /> Connect on LinkedIn
              </a>
            </div>
          </Reveal>

          {/* Advisory council */}
          <div className="grid gap-6 md:col-span-3 md:grid-cols-2">
            {councils.map((council, i) => (
              <Reveal key={council.title} delay={0.1 + i * 0.08}>
                <Card accent="signal" className="h-full">
                  <span className="font-mono text-xs text-signal">
                    Advisory
                  </span>
                  <h3 className="mt-3 font-display text-xl text-paper">
                    {council.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                    {council.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
