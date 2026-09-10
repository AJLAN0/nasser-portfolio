/**
 * عقد القالب — الأنواع التي تصف أي موقع بورتفوليو في المنصة.
 *
 * القاعدة: الأقسام لا تعرف محتوى بعينه. تستقبل هذه الأنواع كـ props فقط.
 * إضافة قالب جديد = ملف بيانات جديد يحقق `TemplateData` + ترتيب أقسام مختلف.
 * لا نسخ مكوّنات، ولا HTML منفصل.
 */

export type Media = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type NavItem = {
  href: string;
  label: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  /** سطر تحريري قصير فوق العنوان. */
  eyebrow: string;
  description: string;
  cover: Media;
  gallery: Media[];
};

export type Service = {
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  /** الدور أو الجهة — اختياري لأن بعض العملاء لا يحبون ذكرها. */
  role?: string;
  avatar?: Media;
};

export type HeroContent = {
  name: string;
  role: string;
  kicker?: string;
  media: Media;
  /** خلفية القسم: fog للهيرو الفاتح، ink/‏افتراضي للداكن. */
  theme?: SectionTheme;
};

export type AboutContent = {
  heading: string;
  body: string;
  sinceLabel?: string;
  sinceYear?: string;
  portrait?: Media;
  values?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type ContactContent = {
  heading: string;
  email: string;
  phone: string;
  socials: SocialLink[];
  /** وجهة النموذج. اتركه فارغاً ليعمل بـ mailto. */
  formAction?: string;
};

export type SectionTheme = "dark" | "ink" | "light" | "fog";

export type TemplateData = {
  /** معرّف القالب داخل المنصة — يُستخدم في المسارات وتحليلات الاستخدام. */
  id: string;
  locale: string;
  dir: "rtl" | "ltr";
  siteName: string;
  tagline: string;
  logo?: Media;
  nav: NavItem[];
  hero: HeroContent;
  about: AboutContent;
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  contact: ContactContent;
  /** نص الشريط المتحرك المتكرر. */
  marquee?: string[];
  credit?: { name: string; href: string };
};

/** خريطة الثيم إلى قيمة data-theme التي تفهمها طبقة التوكنز. */
export function themeAttr(theme: SectionTheme = "dark") {
  return theme === "dark" ? undefined : theme;
}
