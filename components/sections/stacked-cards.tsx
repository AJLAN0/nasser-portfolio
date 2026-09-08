"use client";

import { motion, useReducedMotion } from "motion/react";
import { SplitText } from "@/components/motion/split-text";
import { Section, Shell } from "@/components/sections/section";
import { duration, easeOut, stagger, viewportOnce } from "@/lib/motion";
import type { SectionTheme } from "@/lib/template";

/** زوايا الميلان تعطي شكل «المروحة». مقاسة من الموقع المرجعي. */
const ANGLES = [10, -5, 4, -6];

/**
 * كروت متراكمة: كل كرت `sticky` عند نفس الارتفاع، فيثبت الأول ويركب عليه
 * التالي — التراكم يحدث بالـ CSS وحده، بلا أي JavaScript.
 *
 * تحذير: `position: sticky` يتعطّل تماماً إذا كان أي عنصر أب يحمل
 * `overflow: hidden` أو `clip`. لا تلفّ هذا القسم بحاوية كذلك.
 */
export function StackedCards({
  heading,
  items,
  theme = "dark",
}: {
  heading: string;
  items: string[];
  theme?: SectionTheme;
}) {
  const reduced = useReducedMotion();
  if (items.length === 0) return null;

  return (
    <Section theme={theme} className="overflow-visible">
      <Shell className="overflow-visible">
        <div className="sticky top-[calc(var(--spacing-header)*2)] z-0 mb-stack text-center">
          <SplitText
            as="h2"
            by="words"
            className="font-display text-display-m text-brand"
          >
            {heading}
          </SplitText>
        </div>

        <div className="flex flex-col items-center gap-stack">
          {items.map((label, i) => (
            <div
              key={label}
              className="sticky top-[38vh]"
              style={{ zIndex: i + 1 }}
            >
              <motion.div
                className="grid min-h-[123px] w-[min(700px,88vw)] place-items-center border border-cream-faint bg-black px-7 py-7"
                initial={
                  reduced
                    ? false
                    : { y: 60, opacity: 0, rotate: 0 }
                }
                whileInView={{
                  y: 0,
                  opacity: 1,
                  rotate: reduced ? 0 : ANGLES[i % ANGLES.length],
                }}
                viewport={viewportOnce}
                transition={{
                  duration: reduced ? 0 : duration.xslow,
                  delay: reduced ? 0 : i * stagger.item,
                  ease: easeOut,
                }}
              >
                <p className="text-center font-heavy text-heavy-m text-cream">
                  {label}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </Shell>
    </Section>
  );
}
