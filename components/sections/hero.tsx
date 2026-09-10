"use client";

import { CoverImage } from "@/components/media/cover-image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { SplitText } from "@/components/motion/split-text";
import { Label } from "@/components/sections/section";
import { themeAttr, type HeroContent } from "@/lib/template";
import { duration, easeOut } from "@/lib/motion";

/**
 * هيرو مثبّت: الصورة تكبر وتنزاح مع التمرير بينما تتلاشى الطبقة النصية.
 * الارتفاع 200vh يعطي مسافة التمرير التي يحتاجها التثبيت.
 */
export function Hero({ content }: { content: HeroContent }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section
      ref={ref}
      data-theme={themeAttr(content.theme ?? "fog")}
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { y, scale }}
          initial={reduced ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduced ? 0 : duration.hero, ease: easeOut }}
        >
          <CoverImage media={content.media} sizes="100vw" priority />
        </motion.div>

        <motion.div
          className="relative flex h-full flex-col justify-between px-gutter py-rhythm"
          style={reduced ? undefined : { opacity: overlayOpacity }}
        >
          <div dir="ltr" className="flex items-start justify-between">
            <Label latin>{content.kicker ?? content.name}</Label>
            <Label latin className="flex items-center gap-2">
              <ArrowDown className="size-3" aria-hidden />
              SCROLL TO EXPLORE
            </Label>
          </div>

          <SplitText
            as="h1"
            by="words"
            className="font-display text-display-xl text-on-surface"
          >
            {content.name}
          </SplitText>

          <div className="flex items-end justify-between">
            <Label>{content.role}</Label>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
