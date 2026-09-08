"use client";

import { CoverImage } from "@/components/media/cover-image";
import { SplitText } from "@/components/motion/split-text";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Label, Section, Shell } from "@/components/sections/section";
import type { SectionTheme, Testimonial } from "@/lib/template";

export function Testimonials({
  heading,
  items,
  theme = "ink",
}: {
  heading: string;
  items: Testimonial[];
  theme?: SectionTheme;
}) {
  if (items.length === 0) return null;

  return (
    <Section theme={theme}>
      <Shell className="flex flex-col gap-stack">
        <SplitText
          as="h2"
          by="words"
          className="font-display text-display-m text-brand"
        >
          {heading}
        </SplitText>

        <RevealGroup className="grid gap-gap md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <RevealItem key={item.author}>
              <figure className="flex h-full flex-col justify-between gap-rhythm border border-rule p-rhythm">
                <blockquote className="font-heavy text-heavy-m text-on-surface">
                  {item.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  {item.avatar && (
                    <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
                      <CoverImage media={item.avatar} sizes="40px" />
                    </span>
                  )}
                  <span>
                    <span className="block font-heavy text-heavy-s text-on-surface">
                      {item.author}
                    </span>
                    {item.role && <Label>{item.role}</Label>}
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </Shell>
    </Section>
  );
}
