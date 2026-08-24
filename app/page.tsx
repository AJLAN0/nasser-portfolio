import type { Metadata } from "next";
import { HomeView } from "@/components/pages";

export const metadata: Metadata = {
  title: "الرئيسية",
  description: "استديو أثر — تصوير أحداث وزواجات ومنتجات وبورتريه.",
};

export default function Home() {
  return <HomeView />;
}
