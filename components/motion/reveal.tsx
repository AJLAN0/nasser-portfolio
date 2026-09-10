"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  duration,
  easeOut,
  shiftSoft,
  stagger,
  viewportOnce,
} from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** up = من الأسفل. in = من حافة البداية (ينقلب مع الاتجاه). */
  variant?: "up" | "in";
  delay?: number;
};

/** كشف عنصر غير نصي: أزرار، ليبلات، بطاقات، لوحات. */
export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
}: RevealProps) {
  const reduced = useReducedMotion();
  const from =
    variant === "up"
      ? { opacity: 0, y: shiftSoft }
      : { opacity: 0, x: shiftSoft };

  return (
    <motion.div
      className={className}
      initial={reduced ? false : from}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewportOnce}
      transition={{
        duration: reduced ? 0 : duration.slow,
        delay: reduced ? 0 : delay,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * يتابع أبناءه المباشرين. استعمله بدل حساب delay يدوياً لكل عنصر —
 * الأبناء يجب أن يكونوا <RevealItem>.
 */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : stagger.item } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: shiftSoft },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? 0 : duration.slow, ease: easeOut },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
