"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * بارالاكس مربوط بالتمرير. الشدّة نسبة من ارتفاع العنصر نفسه، لا بكسلات
 * ثابتة — فيبقى الأثر متناسقاً بين عنصر صغير وآخر بملء الشاشة.
 */
export function Parallax({
  children,
  strength = 0.12,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pct = `${strength * 100}%`;
  const y = useTransform(scrollYProgress, [0, 1], [pct, `-${pct}`]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
