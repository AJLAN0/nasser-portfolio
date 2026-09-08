"use client";

import { CoverImage } from "@/components/media/cover-image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { SplitText } from "@/components/motion/split-text";
import { MediaReveal } from "@/components/motion/media-reveal";
import { Reveal } from "@/components/motion/reveal";
import { Section, Shell } from "@/components/sections/section";
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
              {content.sinceFrom ? (
                <CountUp from={content.sinceFrom} to={Number(content.sinceYear)} />
              ) : (
                content.sinceYear
              )}
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
                  className="group relative inline-flex items-center gap-4 overflow-hidden border border-on-surface px-6 py-3.5 font-heavy text-heavy-s text-on-surface"
                >
                  {/* تعبئة تزحف من جهة بداية السطر — تنقلب مع الاتجاه تلقائياً */}
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-[right] scale-x-0 bg-on-surface transition-transform duration-500 ease-out group-hover:scale-x-100 ltr:origin-left"
                  />
                  <span className="relative transition-colors group-hover:text-surface">
                    {content.ctaLabel}
                  </span>
                  <ArrowUpLeft
                    className="relative size-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-surface"
                    aria-hidden
                  />
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

      </Shell>
    </Section>
  );
}
