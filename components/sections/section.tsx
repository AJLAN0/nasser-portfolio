import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { themeAttr, type SectionTheme } from "@/lib/template";

/**
 * غلاف القسم — يضبط الحشو الرأسي والثيم. كل قسم في القالب يبدأ به،
 * فيصبح الإيقاع الرأسي موحّداً بلا اتفاق شفهي بين المكوّنات.
 */
export function Section({
  children,
  theme = "dark",
  className,
  id,
  label,
}: {
  children: ReactNode;
  theme?: SectionTheme;
  className?: string;
  id?: string;
  /** اسم يُقرأ بالقارئ الصوتي عندما لا يوجد عنوان ظاهر. */
  label?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      data-theme={themeAttr(theme)}
      className={cn("py-section", className)}
    >
      {children}
    </section>
  );
}

/** الحاوية: أقصى عرض + هامش جانبي. لا تكتب max-width في المكوّنات. */
export function Shell({
  children,
  className,
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-gutter",
        narrow ? "max-w-narrow" : "max-w-shell",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** ليبل دقيق — الفاصل التحريري بين الكتل الكبيرة. */
export function Label({
  children,
  className,
  latin = false,
}: {
  children: ReactNode;
  className?: string;
  latin?: boolean;
}) {
  return (
    <p
      className={cn(
        "text-label uppercase text-on-surface-muted",
        latin ? "font-latin tracking-[0.06em]" : "font-ui",
        className,
      )}
    >
      {children}
    </p>
  );
}
