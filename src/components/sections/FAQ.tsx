"use client";

import { useState } from "react";
import { faq } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AccordionItem } from "@/components/ui/AccordionItem";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ink-raised px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionEyebrow>Questions</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight text-paper md:text-5xl">
            Frequently asked
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          {faq.map((item, i) => (
            <AccordionItem
              key={item.q}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
