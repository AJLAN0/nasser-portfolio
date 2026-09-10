"use client";

import { SplitText } from "@/components/motion/split-text";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Section, Shell } from "@/components/sections/section";
import type { SectionTheme, Service } from "@/lib/template";

export function Services({
  heading,
  items,
  theme = "light",
}: {
  heading: string;
  items: Service[];
  theme?: SectionTheme;
}) {
  if (items.length === 0) return null;

  return (
    <Section theme={theme}>
      <Shell className="flex flex-col gap-stack">
        <SplitText
          as="h2"
          by="words"
          className="font-display text-display-m text-on-surface"
        >
          {heading}
        </SplitText>

        <RevealGroup className="flex flex-col">
          {items.map((service) => (
            <RevealItem key={service.title}>
              <article className="flex flex-col gap-2 border-t border-rule py-rhythm md:flex-row md:items-baseline md:justify-between md:gap-gap">
                <h3 className="font-heavy text-heavy-m text-on-surface">
                  {service.title}
                </h3>
                <p className="max-w-[42ch] font-ui text-heavy-s text-on-surface-muted">
                  {service.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Shell>
    </Section>
  );
}
