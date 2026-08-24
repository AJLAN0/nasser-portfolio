"use client";

import Image from "next/image";
import {
  AlbumGrid,
  ContactFooter,
  ContactForm,
  DetailGallery,
  IconTextButton,
  OtherAlbums,
  PageHeading,
  ScrollReveal,
  SectionHeading,
  StickyHero,
} from "@/components/portfolio";
import {
  aboutImage,
  albums,
  portraitImage,
  services,
  values,
  type Album,
} from "@/lib/site-data";

export function HomeView() {
  return (
    <>
      <main>
        <StickyHero image={portraitImage}>
          <section className="home-about">
            <div className="home-about__year">
              <span>أعمل منذ</span>
              <strong>2018</strong>
            </div>
            <SectionHeading align="right">من أنا</SectionHeading>
            <p className="home-about__statement">
              مصوّر أبحث عن الضوء الصادق، وأصنع صوراً تحفظ حضور الأشخاص
              والمكان وتترك للقصة مساحتها.
            </p>
            <IconTextButton href="/about">اعرف عنّي أكثر</IconTextButton>
          </section>
        </StickyHero>

        <section className="works-section">
          <div className="works-heading-wrap">
            <SectionHeading className="works-heading">أعمالي</SectionHeading>
          </div>
          <AlbumGrid />
        </section>

        <section className="services-section">
          <SectionHeading align="right" dark>
            خدماتي
          </SectionHeading>
          <div className="services-grid page-inset">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <p>{service.description}</p>
                <h3>{service.title}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>
      <ContactFooter />
    </>
  );
}

export function AboutView() {
  return (
    <>
      <main>
        <section className="about-hero">
          <div className="about-hero__image">
            <Image
              src={aboutImage}
              alt="بورتريه المصوّر سلمان الراوي"
              fill
              sizes="(max-width: 809px) calc(100vw - 48px), 362px"
              priority
              unoptimized
            />
          </div>
          <h1>
            <span>سلمان</span>
            <span>الراوي</span>
          </h1>
        </section>

        <section className="about-intro">
          <p>
            بدأت علاقتي بالصورة من مراقبة الضوء؛ واليوم أصنع مشاهد هادئة
            تلتقط الإنسان كما هو، وتحوّل التفاصيل العابرة إلى ذاكرة طويلة.
          </p>
        </section>

        <ScrollReveal className="values-section">
          <h2>ما الذي ستجده في عملي</h2>
          <div className="values-list">
            {values.map((value) => (
              <p key={value}>{value}</p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="about-contact-bridge">
          <SectionHeading>لنعمل معاً</SectionHeading>
          <IconTextButton href="/contact">ابدأ مشروعك</IconTextButton>
        </ScrollReveal>
      </main>
      <ContactFooter />
    </>
  );
}

export function AlbumsView() {
  return (
    <>
      <main>
        <PageHeading title="الأعمال" label="الصور" />
        <section className="albums-index page-inset">
          <AlbumGrid compact />
        </section>
      </main>
      <ContactFooter />
    </>
  );
}

export function AlbumDetailView({ album }: { album: Album }) {
  return (
    <>
      <main>
        <section className="detail-hero">
          <div className="detail-hero__image">
            <Image
              src={album.hero}
              alt={album.alt}
              fill
              sizes="calc(100vw - 100px)"
              priority
              unoptimized
            />
          </div>
          <h1>{album.title}</h1>
        </section>

        <section className="detail-overview page-inset">
          <p>{album.eyebrow}</p>
          <p>{album.description}</p>
        </section>

        <DetailGallery album={album} />
        <OtherAlbums currentSlug={album.slug} />
      </main>
      <ContactFooter />
    </>
  );
}

export function ContactView() {
  return (
    <>
      <main>
        <PageHeading title="معلومات التواصل" />
        <section className="contact-information">
          <div className="contact-value">
            <span>EMAIL</span>
            <a href="mailto:hello@athar.studio">hello@athar.studio</a>
          </div>
          <div className="contact-value">
            <span>PHONE</span>
            <a href="tel:+966500000000">+966 50 000 0000</a>
          </div>
          <a
            className="contact-instagram"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            INSTAGRAM
          </a>
          <ContactForm />
        </section>
      </main>
      <ContactFooter compact />
    </>
  );
}
