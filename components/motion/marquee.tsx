"use client";

import { useAnimationFrame, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { marqueeSpeed } from "@/lib/motion";

/**
 * شريط لانهائي بسرعة ثابتة بالبكسل/الثانية — لا بالنسبة المئوية.
 *
 * لماذا؟ لأن حركة بنسبة مئوية تتسارع كلما طال المحتوى أو اتّسعت الشاشة، فيختلف
 * الإحساس بين الجوال والديسكتوب. القياس من المرجع كان 100px/ث ثابتة.
 *
 * واعٍ بالاتجاه: ينعكس تلقائياً في LTR.
 */
export function Marquee({
  children,
  reverse = false,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const dirRef = useRef(1);
  const [copies, setCopies] = useState(2);

  // عرض نسخة واحدة يُقاس من أول ابن مباشرةً، فلا نحتاج تتبّع عدد النسخ في ref
  // (والقراءة من ref أثناء الرسم ممنوعة أصلاً).
  const unitWidth = (track: HTMLDivElement) =>
    track.firstElementChild?.getBoundingClientRect().width ?? 0;

  useEffect(() => {
    const track = trackRef.current;
    const viewport = track?.parentElement;
    if (!track || !viewport) return;

    // الاتجاه يُقرأ بعد الرسم — لا يوجد document أثناء SSR. نحفظه في ref لأن
    // حلقة الإطار تقرأه، ولا داعي لإعادة رسم React من أجله.
    const rtl = getComputedStyle(document.documentElement).direction === "rtl";
    dirRef.current = (rtl ? 1 : -1) * (reverse ? -1 : 1);

    // ضاعف المحتوى حتى يغطي ضعف عرض الحاوية، وإلا ظهرت فجوة عند اللف.
    // نقيس داخل ResizeObserver لا في جسم الـ effect: تغيّر المقاس حدث خارجي،
    // وضبط الحالة من ردّ نداء المراقب لا يسبب سلسلة إعادة رسم.
    const observer = new ResizeObserver(() => {
      const unit = unitWidth(track);
      if (unit <= 0) return;
      const needed = Math.min(
        12,
        Math.ceil((viewport.offsetWidth * 2) / unit) + 1,
      );
      setCopies((prev) => (needed > prev ? needed : prev));
    });

    observer.observe(viewport);

    // إعادة قياس بعد تحميل الخطوط — أساسي مع الخطوط العربية المخصّصة: القياس
    // الأول يحدث على الخط الاحتياطي، وعرض النص يتغيّر كثيراً عند وصول الخط
    // الحقيقي، فتظهر فجوة في الحلقة أو تتضاعف النسخ بلا داع.
    let alive = true;
    document.fonts?.ready.then(() => {
      if (!alive) return;
      const unit = unitWidth(track);
      if (unit <= 0) return;
      const needed = Math.min(
        12,
        Math.ceil((viewport.offsetWidth * 2) / unit) + 1,
      );
      setCopies((prev) => (needed > prev ? needed : prev));
    });

    return () => {
      alive = false;
      observer.disconnect();
    };
  }, [reverse]);

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track || reduced) return;

    const unit = unitWidth(track);
    if (unit <= 0) return;

    offset.current -= ((marqueeSpeed * delta) / 1000) * dirRef.current;
    // اللف داخل وحدة واحدة يبقي الرقم صغيراً ويمنع فقدان الدقة مع الوقت.
    offset.current = ((offset.current % unit) + unit) % unit;
    track.style.transform = `translate3d(${(offset.current - unit).toFixed(2)}px,0,0)`;
  });

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} className="flex shrink-0" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
