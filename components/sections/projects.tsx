"use client";

import { CoverImage } from "@/components/media/cover-image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { MediaReveal } from "@/components/motion/media-reveal";
import { PinnedTitle } from "@/components/motion/pinned-title";
import { SplitText } from "@/components/motion/split-text";
import { Section, Shell } from "@/components/sections/section";
import type { Project, SectionTheme } from "@/lib/template";

export function ProjectCard({
  project,
  basePath,
  index = 0,
}: {
  project: Project;
  basePath: string;
  index?: number;
}) {
  return (
    <article>
      <Link
        href={`${basePath}/${project.slug}`}
        className="group block focus-visible:outline-none"
      >
        <MediaReveal
          className="relative aspect-[4/3] w-full"
          delay={index * 0.06}
        >
          <CoverImage
            media={project.cover}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </MediaReveal>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-label uppercase text-on-surface-muted">
              {project.eyebrow}
            </p>
            <h3 className="font-display text-display-s text-on-surface">
              {project.title}
            </h3>
          </div>
          <ArrowUpLeft
            className="size-6 shrink-0 text-on-surface-muted transition-transform group-hover:-translate-y-1"
            aria-hidden
          />
        </div>
      </Link>
    </article>
  );
}

export function Projects({
  heading,
  projects,
  basePath = "/albums",
  theme = "dark",
  pinned = true,
}: {
  heading: string;
  projects: Project[];
  basePath?: string;
  theme?: SectionTheme;
  /** التثبيت مناسب للصفحة الرئيسية فقط؛ صفحة الأعمال تعرض شبكة عادية. */
  pinned?: boolean;
}) {
  const title = (
    <SplitText as="h2" by="words" className="font-display text-display-l text-brand">
      {heading}
    </SplitText>
  );

  const grid = (
    <div className="grid gap-gap md:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectCard
          key={project.slug}
          project={project}
          basePath={basePath}
          index={i}
        />
      ))}
    </div>
  );

  return (
    <Section theme={theme}>
      <Shell>
        {pinned ? (
          <PinnedTitle title={title}>{grid}</PinnedTitle>
        ) : (
          <div className="flex flex-col gap-stack">
            {title}
            {grid}
          </div>
        )}
      </Shell>
    </Section>
  );
}
