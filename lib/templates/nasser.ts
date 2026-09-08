import type { TemplateData } from "@/lib/template";

/**
 * قالب «ناصر الحنايا» — بيانات فقط، بلا أي JSX.
 *
 * الصور مستضافة حالياً على framerusercontent. قبل النشر الفعلي تُنزَّل إلى
 * public/ وتُحدَّث المسارات هنا فقط — لا يتغيّر أي مكوّن.
 */
const IMG = "https://framerusercontent.com/images/";

export const nasserTemplate: TemplateData = {
  id: "nasser",
  locale: "ar",
  dir: "rtl",
  siteName: "ناصر الحنايا",
  tagline: "مصور فوتوغرافي",

  nav: [
    { href: "/", label: "الرئيسية" },
    { href: "/about", label: "من انا" },
    { href: "/albums", label: "اعمالي" },
    { href: "/contact", label: "تواصل معي" },
  ],

  hero: {
    name: "ناصر الحنايا",
    role: "مصور فوتوغرافي",
    kicker: "NASSER AL-HANAYA · PHOTOGRAPHY",
    theme: "fog",
    media: {
      src: IMG + "2hSacfT3GMI1FYyt113oYjwZVc.jpg",
      alt: "بورتريه ناصر الحنايا",
    },
  },

  about: {
    heading: "من انا",
    body: "مصور فوتوغرافي من 2018 محب للأضاءة، اولويتي دائماً اخراج صوره تحكي قصة.",
    sinceLabel: "اعمل منذ",
    sinceYear: "2018",
    sinceFrom: 2000,
    ctaLabel: "اعرف عني اكثر",
    ctaHref: "/about",
    valuesHeading: "وش راح تحصل فيني",
    values: ["الرؤية الإبداعية", "الاحترافية", "شغوف", "المرونة"],
    portrait: {
      src: IMG + "k94JIGnvS8hHUkuyiCQYqPs89M.jpg",
      alt: "ناصر الحنايا أثناء التصوير",
    },
  },

  projects: [
    {
      slug: "events",
      title: "تغطيات احداث",
      eyebrow: "توثيق كل لحظة",
      description: "نوثّق إيقاع المكان، تفاصيله، واللحظات التي لا تتكرر.",
      cover: { src: IMG + "LjCZ6ouw3z06CzTPfqewLTqdaM.jpg", alt: "تغطية فعالية ليلية" },
      gallery: [
        { src: IMG + "lFp13WvxcwC071BpcwwqHl8QfE.jpg", alt: "لقطة من فعالية" },
        { src: IMG + "tJSC3gi0kjJzn1uALBie3bPjI.jpg", alt: "جمهور في فعالية" },
      ],
    },
    {
      slug: "weddings",
      title: "زواجات",
      eyebrow: "ليلة لا تُنسى",
      description: "صور صادقة تحفظ دفء المناسبة وتفاصيلها بأناقة هادئة.",
      cover: { src: IMG + "mpWVbhhz0LdOIdRdwnwPsLorCQ.jpg", alt: "تفاصيل حفل زفاف" },
      gallery: [
        { src: IMG + "EIxKDOW8AyTsYsddruIitlrqUI.jpg", alt: "لقطة من زفاف" },
      ],
    },
    {
      slug: "products",
      title: "منتجات",
      eyebrow: "تفاصيل تبيع",
      description: "تكوينات دقيقة وإضاءة محسوبة تمنح المنتج حضوراً واضحاً.",
      cover: { src: IMG + "cJJvqHI5SN7so2GHqfT3d08lPtE.jpg", alt: "تصوير منتج" },
      gallery: [
        { src: IMG + "6n90jXAD2Hh2jcuoyhBi7rmLI4.jpg", alt: "منتج تحت إضاءة استوديو" },
      ],
    },
    {
      slug: "portraits",
      title: "بورترية",
      eyebrow: "وجه يحكي قصة",
      description: "بورتريه بسيط، مباشر، ومبني على الضوء والتعبير الطبيعي.",
      cover: { src: IMG + "8VFMv25r8DnC8Hvu98YI2R1XM.jpg", alt: "صورة بورتريه" },
      gallery: [
        { src: IMG + "9fI1nHpZoFzBDhAJrsUR510kK8U.jpg", alt: "بورتريه في الاستوديو" },
      ],
    },
  ],

  services: [
    { title: "تصوير تغطيات احداث", description: "سرد بصري متكامل للحظة والمكان والضيوف." },
    { title: "تصوير زواجات", description: "توثيق هادئ للمشاعر والتفاصيل التي تبقى." },
    { title: "تصوير منتجات", description: "إضاءة وتكوين يبرزان شخصية المنتج وقيمته." },
    { title: "تصوير بورترية", description: "صور شخصية صادقة بحضور بصري قوي." },
  ],

  // نصوص واقعية مؤقتة — تُستبدل بشهادات حقيقية قبل النشر.
  testimonials: [
    {
      quote: "غطّى حفل التخرج بالكامل وطلعت الصور أنظف مما تخيلنا.",
      author: "منصور العتيبي",
      role: "منظّم فعاليات",
    },
    {
      quote: "تعامل هادئ واحترافي، وسلّم الملف قبل الموعد بيومين.",
      author: "ريم القحطاني",
      role: "عروس",
    },
    {
      quote: "صور المنتجات رفعت مبيعات المتجر بشكل ملحوظ.",
      author: "عبدالله الدوسري",
      role: "صاحب متجر",
    },
  ],

  contact: {
    heading: "تواصل معي",
    email: "Nasseralhnay@gmail.com",
    phone: "+966 55 312 3193",
    socials: [
      { label: "INSTAGRAM", href: "https://www.instagram.com/nasser_alhnay" },
      { label: "WHATSAPP", href: "https://wa.me/966553123193" },
    ],
  },

  marquee: ["مصور فوتوغرافي", "ناصر الحنايا"],
  credit: { name: "عــجـلان", href: "https://linktr.ee/ajlanms" },
};
