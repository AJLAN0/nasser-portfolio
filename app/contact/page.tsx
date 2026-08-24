import type { Metadata } from "next";
import { ContactView } from "@/components/pages";

export const metadata: Metadata = {
  title: "التواصل",
  description: "ابدأ مشروعك الفوتوغرافي مع استديو أثر.",
};

export default function ContactPage() {
  return <ContactView />;
}
