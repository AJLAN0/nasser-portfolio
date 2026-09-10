/**
 * توكنز الحركة — المصدر الوحيد لكل توقيت في القالب.
 *
 * لماذا TypeScript وليس CSS؟ لأن Framer Motion يستهلك أرقاماً (ثوانٍ) ومصفوفات
 * bezier، لا نصوصاً. وضعها هنا يجعلها قابلة للاستيراد والاختبار، ويمنع تكرار
 * الأرقام داخل المكوّنات.
 *
 * القيم مقاسة من المرجع المنشور، لا مخمّنة.
 */

/** منحنى مفرط التخميد ≈ expo-out — منحنى الدخول الأساسي في القالب. */
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.44, 0, 0.56, 1] as const;
export const easeSoft = [0.33, 1, 0.68, 1] as const;

/** المدد بالثواني (Framer Motion يعمل بالثواني، لا ميلي ثانية). */
export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.3,
  mid: 0.42,
  slow: 0.65,
  xslow: 1,
  hero: 1.2,
} as const;

export const stagger = {
  line: 0.07,
  word: 0.045,
  item: 0.07,
} as const;

/** إزاحة العناصر غير النصية عند الدخول. */
export const shiftSoft = 28;

/** تكبير الصورة عند الدخول (يتقلّص إلى 1). */
export const scaleIn = 1.08;

/** سرعة الشريط المتحرك — بكسل/ثانية، مطابقة للمرجع. */
export const marqueeSpeed = 100;

/** أقصى ضباب للعنوان المثبّت خلف المحتوى. */
export const blurMax = 5;

/** حد الظهور المعتمد في كل الكشوفات — متطابق عبر القالب. */
export const viewportOnce = { once: true, amount: 0.12 } as const;

/**
 * يبني انتقالاً موحّداً، ويصفّر المدة عند تفعيل تقليل الحركة.
 * كل مكوّن حركة يمرّ من هنا حتى لا يُنسى احترام التفضيل في مكان ما.
 */
export function transition(
  reduced: boolean | null,
  d: number = duration.slow,
  delay = 0,
) {
  return reduced
    ? { duration: 0, delay: 0 }
    : { duration: d, delay, ease: easeOut };
}
