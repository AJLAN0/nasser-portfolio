"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { duration, easeOut, scaleIn, viewportOnce } from "@/lib/motion";

/**
 * كشف الوسائط: ستارة تنزلق للأسفل بينما تتقلّص الصورة من 1.08 إلى 1.
 *
 * لماذا ستارة وليس clip-path؟ لأن القص يخفي العنصر عن IntersectionObserver
 * فلا يبدأ الكشف أصلاً. الستارة تحل ذلك وتعطي نفس النتيجة البصرية.
 */
export function MediaReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`relative overflow-hidden ${className ?? ""}`}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <motion.div
        className="h-full w-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
        variants={{
          hidden: { scale: reduced ? 1 : scaleIn },
          show: {
            scale: 1,
            transition: {
              duration: reduced ? 0 : duration.xslow * 1.4,
              delay: reduced ? 0 : delay,
              ease: easeOut,
            },
          },
        }}
      >
        {children}
      </motion.div>

      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] bg-[var(--tpl-surface)]"
        variants={{
          hidden: { y: reduced ? "101%" : "0%" },
          show: {
            y: "101%",
            transition: {
              duration: reduced ? 0 : duration.xslow,
              delay: reduced ? 0 : delay,
              ease: easeOut,
            },
          },
        }}
      />
    </motion.div>
  );
}
