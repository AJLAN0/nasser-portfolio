"use client";

import { CoverImage } from "@/components/media/cover-image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { SplitText } from "@/components/motion/split-text";
import { MediaReveal } from "@/components/motion/media-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Label, Section, Shell } from "@/components/sections/section";
import type { AboutContent, SectionTheme } from "@/lib/template";

export function About({
  content,
  theme = "dark",
}: {
  content: AboutContent;
  theme?: SectionTheme;
}) {
  return (
    <Section theme={theme}>
      <Shell className="flex flex-col gap-rhythm">
        {content.sinceYear && (
          <Reveal className="flex items-baseline justify-between gap-gap border-b border-rule pb-rhythm">
            <p className="font-display text-lead text-on-surface">
              {content.sinceLabel ?? "أعمل منذ"}
            </p>
            <p className="ltr-isolate text-num-xl font-medium text-brand">
              {content.sinceYear}
            </p>
          </Reveal>
        )}

        <div className="grid gap-gap md:grid-cols-[1fr_auto] md:items-start">
          <div className="flex flex-col gap-rhythm">
            <SplitText
              as="h2"
              by="words"
              className="font-display text-display-m text-brand"
            >
              {content.heading}
            </SplitText>

            <SplitText
              as="p"
              by="lines"
              className="max-w-[24ch] font-heavy text-lead text-on-surface"
            >
              {content.body}
            </SplitText>

            {content.ctaHref && content.ctaLabel && (
              <Reveal>
                <Link
                  href={content.ctaHref}
                  className="group inline-flex items-center gap-3 font-heavy text-heavy-s text-on-surface"
                >
                  <span className="grid size-10 place-items-center rounded-pill border border-rule transition-colors group-hover:bg-brand group-hover:text-black">
                    <ArrowUpLeft className="size-4" aria-hidden />
                  </span>
                  {content.ctaLabel}
                </Link>
              </Reveal>
            )}
          </div>

          {content.portrait && (
            <MediaReveal className="relative aspect-[3/4] w-full md:w-[362px]">
              <CoverImage
                media={content.portrait}
                sizes="(max-width: 768px) 100vw, 362px"
              />
            </MediaReveal>
          )}
        </div>

        {content.values && content.values.length > 0 && (
          <div className="flex flex-col gap-rhythm border-t border-rule pt-rhythm">
            <Label>ما الذي ستجده في عملي</Label>
            <RevealGroup className="grid gap-gap sm:grid-cols-2 lg:grid-cols-4">
              {content.values.map((value) => (
                <RevealItem key={value}>
                  <p className="font-heavy text-heavy-m text-on-surface">
                    {value}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}
      </Shell>
    </Section>
  );
}
