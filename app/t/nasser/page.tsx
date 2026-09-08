import type { Metadata } from "next";
import {
  About,
  Contact,
  Hero,
  Projects,
  Services,
  StackedCards,
  SiteFooter,
  Testimonials,
} from "@/components/sections";
import { nasserTemplate as data } from "@/lib/templates/nasser";

export const metadata: Metadata = {
  title: data.siteName,
  description: data.tagline,
};

/**
 * تركيب قالب «ناصر». لاحظ أن الصفحة ترتيب أقسام فقط — لا تخطيط ولا أنماط.
 * قالب جديد = نفس هذه الأقسام بترتيب مختلف وملف بيانات مختلف.
 */
export default function NasserTemplatePage() {
  return (
    <>
      <main>
        <Hero content={data.hero} />
        <About content={data.about} />
        {data.about.values && data.about.valuesHeading && (
          <StackedCards
            heading={data.about.valuesHeading}
            items={data.about.values}
          />
        )}
        <Projects heading="اعمالي" projects={data.projects} basePath="/t/nasser/albums" />
        <Services heading="خدماتي" items={data.services} />
        <Testimonials heading="آراء العملاء" items={data.testimonials} />
        <Contact content={data.contact} />
      </main>
      <SiteFooter data={data} />
    </>
  );
}
