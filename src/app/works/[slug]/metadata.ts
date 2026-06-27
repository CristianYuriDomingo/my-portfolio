import type { Metadata } from 'next';
import { works } from '@/data/works';

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const work = works.find((w) => w.slug === params.slug);
  if (!work) return { title: 'Work Not Found — CYD Portfolio' };
  return {
    title: `${work.title} — CYD Portfolio`,
    description: work.tagline,
    openGraph: {
      title: `${work.title} — CYD Portfolio`,
      description: work.tagline,
      images: [{ url: work.image }],
    },
  };
}
