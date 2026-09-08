import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Media } from "@/lib/template";

/**
 * صورة تملأ حاويتها بالكامل.
 *
 * لماذا لا نستعمل `fill` من next/image مباشرة؟ لأن vinext لا ينفّذ خاصية
 * `fill`: الصورة تخرج بـ position:static وبأبعادها الطبيعية، فتنهار التخطيطات
 * التي تفترض التغطية. نضع التموضع صراحةً بأصناف Tailwind بدل الاعتماد عليها.
 *
 * كل صور القالب تمرّ من هنا، فإذا نفّذ vinext الخاصية لاحقاً يكفي تعديل هذا
 * الملف وحده.
 *
 * الحاوية يجب أن تكون relative/absolute وذات أبعاد محددة.
 */
export function CoverImage({
  media,
  sizes,
  priority = false,
  className,
}: {
  media: Media;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes={sizes}
      priority={priority}
      // الصور الخارجية تمرّ بلا تحسين حتى لا تعتمد على معالج صور Cloudflare
      // أثناء التطوير المحلي.
      unoptimized
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}
