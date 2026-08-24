import type { Metadata } from "next";
import { AboutView } from "@/components/pages";

export const metadata: Metadata = {
  title: "عنّي",
  description: "تعرّف إلى رؤية استديو أثر ومنهجه في صناعة الصورة.",
};

export default function AboutPage() {
  return <AboutView />;
}
