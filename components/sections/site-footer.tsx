"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Marquee } from "@/components/motion/marquee";
import { Label } from "@/components/sections/section";
import type { TemplateData } from "@/lib/template";

export function SiteFooter({ data }: { data: TemplateData }) {
  const pathname = usePathname();
  const marquee = data.marquee ?? [data.tagline];

  return (
    <footer data-theme="ink" className="pt-section">
      <div className="mx-auto flex max-w-shell flex-col gap-rhythm px-gutter pb-stack md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-display text-display-s text-brand">
            {data.siteName}
          </span>
          <Label>{data.tagline}</Label>
        </div>

        <nav aria-label="روابط التذييل" className="flex flex-wrap gap-gap">
          {data.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "font-heavy text-heavy-s text-orange"
                    : "font-heavy text-heavy-s text-on-surface-muted transition-colors hover:text-on-surface"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <ul className="flex flex-wrap gap-4">
          {data.contact.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-label uppercase tracking-[0.06em] text-on-surface-muted hover:text-on-surface"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Marquee className="border-y border-rule py-4" aria-hidden>
        {marquee.map((text, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-8 font-display text-display-xxl text-on-surface-muted"
          >
            {text}
          </span>
        ))}
      </Marquee>

      {data.credit && (
        <div className="mx-auto max-w-shell px-gutter py-rhythm">
          <Label latin>
            <a href={data.credit.href} target="_blank" rel="noreferrer">
              {data.credit.name}
            </a>
          </Label>
        </div>
      )}
    </footer>
  );
}
