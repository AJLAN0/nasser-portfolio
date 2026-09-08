/**
 * مكتبة أقسام القالب.
 *
 * كل قسم مستقل، يستقبل بياناته كـ props من `TemplateData`، ولا يستورد محتوى
 * بعينه. تركيب قالب جديد = ترتيب مختلف لهذه الأقسام + ملف بيانات جديد.
 */

export { Section, Shell, Label } from "./section";
export { Hero } from "./hero";
export { About } from "./about";
export { Projects, ProjectCard } from "./projects";
export { Services } from "./services";
export { StackedCards } from "./stacked-cards";
export { Testimonials } from "./testimonials";
export { Contact } from "./contact";
export { SiteFooter } from "./site-footer";
