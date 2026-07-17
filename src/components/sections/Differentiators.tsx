import { differentiators } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

const accentText: Record<string, string> = {
  good: "text-good",
  signal: "text-signal",
  ember: "text-ember",
};

export function Differentiators() {
  return (
    <section className="bg-ink px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto ">
        <div className="grid gap-4 md:grid-cols-3">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="flex h-full flex-col justify-between rounded-[var(--radius-lg)] border border-ink-line bg-ink-raised p-10 min-h-[280px]">
                <span
                  className={`font-display text-6xl md:text-7xl ${accentText[item.accent]}`}
                >
                  {item.kicker}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-paper md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-paper-dim leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
