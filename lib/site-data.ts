export type Album = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  hero: string;
  cover: string;
  images: string[];
  alt: string;
  cardClass?: string;
};

export const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عنّي" },
  { href: "/albums", label: "أعمالي" },
  { href: "/contact", label: "التواصل" },
];

const images = {
  portraitMan:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=2200&q=88",
  portraitManTwo:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1800&q=88",
  portraitWoman:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1800&q=88",
  concert:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2200&q=88",
  concertTwo:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=88",
  wedding:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=88",
  perfume:
    "https://images.unsplash.com/photo-1643797517714-a273548abc3c?auto=format&fit=crop&w=1800&q=88",
  perfumeTwo:
    "https://images.unsplash.com/photo-1643797517590-c44cb552ddcc?auto=format&fit=crop&w=1800&q=88",
  watch:
    "https://images.unsplash.com/photo-1659461278051-699550cc6aec?auto=format&fit=crop&w=1800&q=88",
  watchTwo:
    "https://images.unsplash.com/photo-1610897534349-7759782118b9?auto=format&fit=crop&w=1800&q=88",
};

export const portraitImage = images.portraitMan;
export const aboutImage = images.portraitManTwo;

export const albums: Album[] = [
  {
    slug: "events",
    title: "تغطيات أحداث",
    eyebrow: "لحظات حيّة",
    description: "نوثّق إيقاع المكان، تفاصيله، واللحظات التي لا تتكرر.",
    hero: images.concert,
    cover: images.concert,
    images: [
      images.concert,
      images.concertTwo,
      images.portraitManTwo,
      images.wedding,
      images.portraitWoman,
    ],
    alt: "حضور في فعالية ليلية مضاءة",
    cardClass: "project-card--events",
  },
  {
    slug: "weddings",
    title: "زواجات",
    eyebrow: "قصص قريبة",
    description: "صور صادقة تحفظ دفء المناسبة وتفاصيلها بأناقة هادئة.",
    hero: images.wedding,
    cover: images.wedding,
    images: [images.wedding, images.portraitWoman, images.concertTwo],
    alt: "تفاصيل احتفال زفاف أنيق",
    cardClass: "project-card--weddings",
  },
  {
    slug: "products",
    title: "منتجات",
    eyebrow: "ضوء وتكوين",
    description: "تكوينات دقيقة وإضاءة محسوبة تمنح المنتج حضوراً واضحاً.",
    hero: images.perfume,
    cover: images.perfume,
    images: [images.perfume, images.perfumeTwo, images.watch, images.watchTwo],
    alt: "منتج فاخر تحت إضاءة استوديو داكنة",
    cardClass: "project-card--products",
  },
  {
    slug: "portraits",
    title: "بورتريه",
    eyebrow: "شخصية وحضور",
    description: "بورتريه بسيط، مباشر، ومبني على الضوء والتعبير الطبيعي.",
    hero: images.portraitWoman,
    cover: images.portraitWoman,
    images: [images.portraitWoman, images.portraitMan, images.portraitManTwo],
    alt: "صورة بورتريه تحريرية في استوديو",
    cardClass: "project-card--portraits",
  },
];

export const services = [
  {
    title: "تصوير تغطيات الأحداث",
    description: "سرد بصري متكامل للحظة والمكان والضيوف.",
  },
  {
    title: "تصوير الزواجات",
    description: "توثيق هادئ للمشاعر والتفاصيل التي تبقى.",
  },
  {
    title: "تصوير المنتجات",
    description: "إضاءة وتكوين يبرزان شخصية المنتج وقيمته.",
  },
  {
    title: "جلسات البورتريه",
    description: "صور شخصية صادقة بحضور بصري قوي.",
  },
];

export const values = ["الرؤية الإبداعية", "الاحترافية", "الشغف", "المرونة"];

export function getAlbum(slug: string) {
  return albums.find((album) => album.slug === slug);
}
