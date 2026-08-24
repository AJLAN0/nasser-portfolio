"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpLeft } from "lucide-react";
import { albums, navItems, type Album } from "@/lib/site-data";

export function ScrollReveal({
  children,
  className = "",
  distance = 170,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { y: distance }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reducedMotion ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ProjectCard({
  album,
  className = "",
  compact = false,
}: {
  album: Album;
  className?: string;
  compact?: boolean;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className={`project-card ${album.cardClass ?? ""} ${className}`}
      initial={reducedMotion ? false : { y: 100 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: reducedMotion ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/albums/${album.slug}`} className="project-card__link">
        <span className="corner corner--tl" aria-hidden="true" />
        <span className="corner corner--tr" aria-hidden="true" />
        <span className="corner corner--bl" aria-hidden="true" />
        <span className="corner corner--br" aria-hidden="true" />
        <span className={`project-card__media${compact ? " is-compact" : ""}`}>
          <Image
            src={album.cover}
            alt={album.alt}
            fill
            sizes="(max-width: 809px) calc(100vw - 24px), (max-width: 1199px) calc(100vw - 80px), 50vw"
            unoptimized
          />
        </span>
        <span className="project-card__meta">
          <span className="project-card__eyebrow">اكتشف المزيد</span>
          <span className="project-card__title-row">
            <strong>{album.title}</strong>
            <ArrowUpLeft aria-hidden="true" />
          </span>
        </span>
      </Link>
    </motion.article>
  );
}

export function AlbumGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "album-grid" : "projects-field"}>
      {albums.map((album) => (
        <ProjectCard album={album} compact={compact} key={album.slug} />
      ))}
    </div>
  );
}

export function SectionHeading({
  children,
  align = "center",
  dark = false,
  className = "",
}: {
  children: ReactNode;
  align?: "center" | "right";
  dark?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`section-heading section-heading--${align}${dark ? " is-dark" : ""} ${className}`}
    >
      {children}
    </h2>
  );
}

export function IconTextButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="icon-text-button">
      <span className="icon-text-button__icon" aria-hidden="true">
        <ArrowUpLeft />
      </span>
      <span>{children}</span>
    </Link>
  );
}

export function PageHeading({ title, label }: { title: string; label?: string }) {
  return (
    <section className="page-heading">
      {label && <p>{label}</p>}
      <h1>{title}</h1>
    </section>
  );
}

function RadialButton() {
  return (
    <Link href="/contact" className="radial-button">
      <span className="radial-button__spikes" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, index) => (
          <i key={index} style={{ transform: `rotate(${index * 60}deg)` }} />
        ))}
      </span>
      <span className="radial-button__core">للتواصل</span>
    </Link>
  );
}

function FooterNav() {
  const pathname = usePathname();
  return (
    <footer className="footer-nav">
      <div className="footer-nav__top page-inset">
        <div className="footer-credit">
          <span className="footer-credit__badge">أثر</span>
          <span>هوية وتجربة مستقلة</span>
        </div>
        <nav aria-label="روابط التذييل">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                href={item.href}
                key={item.href}
                className={active ? "is-active" : ""}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="decorative-ticker" aria-hidden="true">
        <div>
          <span>مصور فوتوغرافي</span>
          <span>مصور فوتوغرافي</span>
          <span>مصور فوتوغرافي</span>
        </div>
      </div>
    </footer>
  );
}

export function ContactFooter({ compact = false }: { compact?: boolean }) {
  return (
    <>
      {!compact && (
        <section className="contact-cta page-inset" aria-label="تواصل معنا">
          <RadialButton />
          <a className="contact-cta__phone" href="tel:+966500000000">
            +966 50 000 0000
          </a>
          <a
            className="contact-cta__instagram"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </section>
      )}
      <FooterNav />
    </>
  );
}

export function StickyHero({ image, children }: { image: string; children?: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section className="home-hero" ref={ref}>
      <motion.div
        className="home-hero__media"
        style={{ opacity: reducedMotion ? 1 : opacity }}
      >
        <Image
          src={image}
          alt="بورتريه فوتوغرافي أحادي اللون"
          fill
          sizes="100vw"
          priority
          unoptimized
        />
      </motion.div>

      <div className="home-hero__overlay">
        <div className="home-hero__utilities" aria-hidden="true">
          <span>ATHAR PHOTOGRAPHY</span>
          <span>
            <ArrowDown /> SCROLL TO EXPLORE
          </span>
          <span>WORK WITH ME</span>
        </div>
        <h1>سلمان الراوي</h1>
      </div>
      {children}
    </section>
  );
}

export function OtherAlbums({ currentSlug }: { currentSlug: string }) {
  const related = albums.filter((album) => album.slug !== currentSlug).slice(0, 3);
  return (
    <ScrollReveal className="other-albums">
      <SectionHeading>المزيد من أعمالي</SectionHeading>
      <div className="other-albums__grid">
        {related.map((album) => (
          <ProjectCard album={album} compact key={album.slug} />
        ))}
      </div>
      <IconTextButton href="/albums">كل الأعمال</IconTextButton>
    </ScrollReveal>
  );
}

export function DetailGallery({ album }: { album: Album }) {
  const left = album.images.filter((_, index) => index % 2 === 0);
  const right = album.images.filter((_, index) => index % 2 === 1);

  return (
    <section className="detail-gallery">
      <div className="detail-gallery__column">
        {left.map((image, index) => (
          <ScrollReveal distance={100} className="detail-gallery__image" key={image}>
            <Image
              src={image}
              alt={`${album.title} — لقطة ${index * 2 + 1}`}
              fill
              sizes="(max-width: 809px) calc(100vw - 24px), 50vw"
              unoptimized
            />
          </ScrollReveal>
        ))}
      </div>
      <div className="detail-gallery__column detail-gallery__column--offset">
        {right.map((image, index) => (
          <ScrollReveal distance={100} className="detail-gallery__image" key={image}>
            <Image
              src={image}
              alt={`${album.title} — لقطة ${index * 2 + 2}`}
              fill
              sizes="(max-width: 809px) calc(100vw - 24px), 50vw"
              unoptimized
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        event.currentTarget.reset();
        setSent(true);
      }}
    >
      <p className="contact-form__title">أرسل رسالة عبر البريد</p>
      <label className="field field--full">
        <span>الاسم</span>
        <input name="name" placeholder="الاسم" required />
      </label>
      <div className="contact-form__row">
        <label className="field">
          <span>البريد الإلكتروني</span>
          <input name="email" type="email" placeholder="البريد الإلكتروني" required />
        </label>
        <label className="field">
          <span>رقم الجوال</span>
          <input name="phone" type="tel" placeholder="رقم الجوال" />
        </label>
      </div>
      <label className="field field--message">
        <span>موضوع الرسالة</span>
        <textarea name="message" placeholder="موضوع الرسالة" required />
      </label>
      <button type="submit">إرسال</button>
      <p className="contact-form__status" aria-live="polite">
        {sent ? "وصلتنا رسالتك — سنتواصل معك قريباً." : ""}
      </p>
    </form>
  );
}
