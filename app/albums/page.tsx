import type { Metadata } from "next";
import { AlbumsView } from "@/components/pages";

export const metadata: Metadata = {
  title: "الأعمال",
  description: "مجموعة مختارة من أعمال استديو أثر.",
};

export default function AlbumsPage() {
  return <AlbumsView />;
}
