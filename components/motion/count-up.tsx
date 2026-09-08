"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { duration as D, easeOut } from "@/lib/motion";

/**
 * عدّاد رقمي يبدأ عند دخول العنصر للشاشة.
 *
 * الرقم معزول باتجاه LTR: بدونه ينقلب ترتيب الخانات داخل نص عربي.
 */
export function CountUp({
  from,
  to,
  className,
}: {
  from: number;
  to: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const value = useMotionValue(reduced ? to : from);
  const text = useTransform(value, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(value, to, {
      duration: D.hero * 1.35,
      ease: easeOut,
    });
    return () => controls.stop();
  }, [inView, reduced, to, value]);

  return (
    <motion.span ref={ref} className={className} dir="ltr">
      {text}
    </motion.span>
  );
}
