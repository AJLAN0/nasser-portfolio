"use client";

import { useState, type FormEvent } from "react";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { Label, Section, Shell } from "@/components/sections/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ContactContent, SectionTheme } from "@/lib/template";

export function Contact({
  content,
  theme = "dark",
}: {
  content: ContactContent;
  theme?: SectionTheme;
}) {
  const [sent, setSent] = useState(false);

  // بلا خادم: نبني رسالة mailto. عند تمرير formAction يُرسل النموذج فعلياً
  // إلى تلك الوجهة (Formspree أو دالة سحابية) بدل ذلك.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (content.formAction) return;
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const body = [
      `الاسم: ${data.get("name") ?? ""}`,
      `البريد: ${data.get("email") ?? ""}`,
      `الجوال: ${data.get("phone") ?? ""}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${content.email}?subject=${encodeURIComponent(
      "طلب مشروع تصوير",
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <Section theme={theme} id="contact">
      <Shell className="grid gap-stack lg:grid-cols-2">
        <div className="flex flex-col gap-rhythm">
          <SplitText
            as="h2"
            by="words"
            className="font-display text-display-m text-brand"
          >
            {content.heading}
          </SplitText>

          <div className="flex flex-col gap-4">
            <div>
              <Label latin>EMAIL</Label>
              <a
                href={`mailto:${content.email}`}
                className="ltr-isolate text-num-m text-on-surface underline-offset-4 hover:underline"
              >
                {content.email}
              </a>
            </div>
            <div>
              <Label latin>PHONE</Label>
              <a
                href={`tel:${content.phone.replace(/\s/g, "")}`}
                className="ltr-isolate text-num-m text-on-surface underline-offset-4 hover:underline"
              >
                {content.phone}
              </a>
            </div>
          </div>

          <ul className="flex flex-wrap gap-4">
            {content.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-label uppercase tracking-[0.06em] text-on-surface-muted underline-offset-4 hover:text-on-surface hover:underline"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <form
            className="flex flex-col gap-4"
            action={content.formAction}
            method={content.formAction ? "post" : undefined}
            onSubmit={handleSubmit}
          >
            <Label>أرسل رسالة</Label>

            <Input name="name" placeholder="الاسم" required aria-label="الاسم" />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                name="email"
                type="email"
                placeholder="البريد الإلكتروني"
                required
                aria-label="البريد الإلكتروني"
              />
              <Input
                name="phone"
                type="tel"
                placeholder="رقم الجوال"
                aria-label="رقم الجوال"
              />
            </div>

            <Textarea
              name="message"
              placeholder="موضوع الرسالة"
              rows={5}
              required
              aria-label="موضوع الرسالة"
            />

            <Button type="submit" className="w-fit">
              إرسال
            </Button>

            <p aria-live="polite" className="text-label text-on-surface-muted">
              {sent ? "فتحنا لك برنامج البريد لإتمام الإرسال." : ""}
            </p>
          </form>
        </Reveal>
      </Shell>
    </Section>
  );
}
