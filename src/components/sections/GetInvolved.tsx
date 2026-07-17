import { volunteerRoles } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { TimeDial } from "@/components/ui/TimeDial";
import { Button } from "@/components/ui/Button";

export function GetInvolved() {
  return (
    <section id="volunteer" className="bg-ink-raised px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <SectionEyebrow>Get involved</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight text-paper md:text-5xl">
            Find your role in the movement
          </h2>
          <p className="mt-6 text-paper-dim leading-relaxed">
            Every role is flexible, remote-friendly, and built around your
            schedule — not the other way around.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {volunteerRoles.map((role, i) => (
            <Reveal key={role.title} delay={i * 0.08}>
              <Card className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl text-paper">
                      {role.title}
                    </h3>
                    <TimeDial load={role.load} label={role.time} />
                  </div>
                  <p className="mt-4 text-paper-dim leading-relaxed">
                    {role.body}
                  </p>
                </div>
                <Button
                  href="#join"
                  variant="secondary"
                  className="mt-8 w-full"
                >
                  Apply as {role.title}
                </Button>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
