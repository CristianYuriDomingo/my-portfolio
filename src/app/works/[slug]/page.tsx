import { works } from '@/data/works';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
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
    description: work.description.replace(/\*\*(.+?)\*\*/g, '$1'),
    openGraph: {
      title: `${work.title} — CYD Portfolio`,
      description: work.description.replace(/\*\*(.+?)\*\*/g, '$1'),
      images: [{ url: work.image }],
    },
  };
}

function parseBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-navy">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default function WorkDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const work = works.find((w) => w.slug === params.slug);
  if (!work) notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* ── Back link ── */}
      <div className="px-[6vw] pt-8 pb-4">
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-navy/40 transition-colors duration-200 hover:text-navy"
          style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Works
        </Link>
      </div>

      {/* ── Hero image ── */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] border-y border-navy/10">
        <Image
          src={work.image}
          alt={work.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-[6vw] py-16 sm:py-20">
        {/* Tag badge */}
        <span
          className="inline-flex items-center px-3 py-[5px] border border-navy/20 text-[9px] tracking-[0.16em] uppercase text-navy/50"
          style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 400 }}
        >
          {work.tag}
        </span>

        {/* Title */}
        <h1
          className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-navy"
          style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 700 }}
        >
          {work.title}
        </h1>

        {/* Description */}
        <div className="mt-8 pl-5 border-l-2 border-navy/15">
          <p
            className="text-base sm:text-lg leading-[1.85] text-navy/60"
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
          >
            {parseBold(work.description)}
          </p>
        </div>
      </div>
    </main>
  );
}
