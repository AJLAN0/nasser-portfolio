"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { blurMax } from "@/lib/motion";

/**
 * عنوان يبقى مثبّتاً بينما يمرّ المحتوى فوقه، ويكتسب ضباباً وتقلّصاً بمقدار ما
 * يغطّيه — يخلق عمقاً بلا طبقة إضافية. سلوك مأخوذ من المرجع.
 */
export function PinnedTitle({
  title,
  children,
  className,
}: {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", `blur(${blurMax}px)`],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="sticky top-[calc(var(--spacing-header)+var(--spacing-rhythm))] z-0"
        style={reduced ? undefined : { filter, scale, opacity }}
      >
        {title}
      </motion.div>
      <div className="relative z-[1] mt-stack">{children}</div>
    </div>
  );
}
