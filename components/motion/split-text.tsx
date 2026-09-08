"use client";

import { motion, useReducedMotion } from "motion/react";
import { createElement, type ElementType } from "react";
import { duration, easeOut, stagger, viewportOnce } from "@/lib/motion";

type Props = {
  children: string;
  /** كلمات = تتابع سريع للعناوين. أسطر = تتابع أبطأ للفقرات. */
  by?: "words" | "lines";
  as?: ElementType;
  className?: string;
  delay?: number;
};

/**
 * كشف نص عبر قناع: كل وحدة داخل حاوية overflow-hidden، تنزلق من الأسفل
 * بميلان خفيف. هذا هو التوقيع البصري للقالب — لا تستبدله بـ fade عام.
 *
 * ملاحظة على «الأسطر»: تقسيم الأسطر الحقيقي يتطلّب قياس التفاف النص بعد
 * الرسم، وهو يسبب وميضاً واختلافاً بين الخادم والمتصفح. نقسّم بالكلمات دائماً
 * ونبطّئ التتابع لمحاكاة إيقاع الأسطر — نفس الإحساس، بلا هشاشة.
 */
export function SplitText({
  children,
  by = "words",
  as = "span",
  className,
  delay = 0,
}: Props) {
  const reduced = useReducedMotion();
  const units = children.split(/(\s+)/).filter((t) => t.length > 0);
  const step = by === "words" ? stagger.word : stagger.line;

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : step,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  // الإزاحة بوحدة em لا بنسبة مئوية: النسبة تُحسب من ارتفاع السطر، فتتغيّر
  // مسافة الكشف بين عنوان بارتفاع سطر 0.8 وآخر 1.6. الـ em مرتبطة بحجم الخط
  // فيبقى الإحساس واحداً عبر كل الأحجام.
  const unit = {
    hidden: reduced ? { y: 0, rotate: 0, opacity: 1 } : { y: "1.1em", rotate: 1.2, opacity: 0 },
    show: {
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: { duration: reduced ? 0 : duration.slow, ease: easeOut },
    },
  };

  return createElement(
    motion[as as keyof typeof motion] as ElementType,
    {
      className,
      variants: container,
      initial: "hidden",
      whileInView: "show",
      viewport: viewportOnce,
    },
    units.map((token, i) =>
      token.trim() === "" ? (
        // مسافة نصية حقيقية، لا عنصر بعرض ثابت: تبقى الكلمات منفصلة عند
        // النسخ وفي قارئ الشاشة، ويأخذ الفراغ عرضه الطبيعي من الخط.
        <span key={i}> </span>
      ) : (
        // القناع أطول من صندوق السطر عمداً: العناوين تستخدم ارتفاع سطر 0.8،
        // والحروف العربية (صعود اللام، نزول الياء، الحركات) تتجاوزه فتُقصّ
        // نهائياً. الحشو يوسّع منطقة القص، والهامش السالب يلغي أثره على
        // التخطيط فلا يتحرك شيء.
        <span
          key={i}
          className="inline-block overflow-hidden align-top py-[0.3em] -my-[0.3em]"
        >
          <motion.span className="inline-block will-change-transform" variants={unit}>
            {token}
          </motion.span>
        </span>
      ),
    ),
  );
}
