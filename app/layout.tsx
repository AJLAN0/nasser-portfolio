import type { Metadata, Viewport } from "next";
import { Inter, Noto_Kufi_Arabic, Noto_Sans_Arabic } from "next/font/google";
import { headers } from "next/headers";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

const displayArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-display-ar",
  display: "swap",
});

const bodyArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body-ar",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const host =
    headerStore.get("x-forwarded-host") ??
    headerStore.get("host") ??
    "localhost:3000";
  const protocol =
    headerStore.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description =
    "استديو تصوير عربي يوثّق الأحداث والزواجات والمنتجات والبورتريه بلغة بصرية هادئة.";

  return {
    metadataBase: new URL(origin),
    title: {
      default: "استديو أثر",
      template: "%s | استديو أثر",
    },
    description,
    openGraph: {
      title: "استديو أثر",
      description,
      type: "website",
      locale: "ar_SA",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1200,
          height: 630,
          alt: "استديو أثر — تصوير عربي معاصر",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "استديو أثر",
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${displayArabic.variable} ${bodyArabic.variable} ${inter.variable}`}
    >
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
