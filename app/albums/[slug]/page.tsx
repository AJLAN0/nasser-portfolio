import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlbumDetailView } from "@/components/pages";
import { albums, getAlbum } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = getAlbum(slug);
  if (!album) return {};

  return {
    title: album.title,
    description: album.description,
  };
}

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params;
  const album = getAlbum(slug);
  if (!album) notFound();

  return <AlbumDetailView album={album} />;
}
