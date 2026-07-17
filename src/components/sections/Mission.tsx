import { pillars } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

const accentText: Record<string, string> = {
  ember: "text-ember",
  signal: "text-signal",
  bloom: "text-bloom",
};

export function Mission() {
  return (
    <section id="mission" className="bg-ink px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <SectionEyebrow>Our mission</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight text-paper md:text-5xl">
            Six pillars, one movement.
          </h2>
          <p className="mt-6 text-paper-dim leading-relaxed">
            Every program we run — in a classroom or over Discord — ladders
            up to one of these commitments.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={(i % 3) * 0.08}>
              <Card
                accent={pillar.accent as "ember" | "signal" | "bloom"}
                className="h-full"
              >
                <span
                  className={`font-mono text-sm ${accentText[pillar.accent]}`}
                >
                  {pillar.n}
                </span>
                <h3 className="mt-4 font-display text-2xl text-paper">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-paper-dim leading-relaxed">
                  {pillar.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
