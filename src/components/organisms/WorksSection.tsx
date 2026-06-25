'use client';

import { useRef, useState, useLayoutEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400'],
  variable: '--font-playfair',
});

interface Work {
  slug: string;
  title: string;
  description: string;
  image: string;
}

const works: Work[] = [
  {
    slug: 'bantay-bayan',
    title: 'Bantay Bayan',
    description:
      'Award-winning full-stack web app. Gamified civic education with a custom achievement engine, daily mini-games, and Admin CMS. **Best in Capstone · Gold Award ARC 2026.**',
    image: '/images/works/bantay-bayan.webp',
  },
  {
    slug: 'sagip-247',
    title: 'Sagip 24/7',
    description:
      'A complete emergency response mobile app. Bilingual, native device integration, medicine overdose protection — shipped and working.',
    image: '/images/works/sagip-247.webp',
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    description:
      '2 years. Hundreds of outputs. Tarpaulins, pubmats, festival branding, logos — I made the materials people actually stopped to look at.',
    image: '/images/works/graphic-design.webp',
  },
  {
    slug: 'laur-tourism',
    title: 'Laur Tourism',
    description:
      "Designed it. Built it. Deployed it. Laur's first ever official tourism website — live, SEO-optimized, and built solo during OJT.",
    image: '/images/works/laur-tourism.webp',
  },
  {
    slug: 'cyd-portfolio',
    title: 'CYD Portfolio',
    description:
      "Didn't use a template. Built from scratch — Next.js 14, Framer Motion, custom scroll animations. You're looking at it.",
    image: '/images/works/cyd-portfolio.webp',
  },
];

function WorkCard({ work, index }: { work: Work; index: number }) {
  return (
    <a
      href={`/works/${work.slug}`}
      className="group block w-full flex-shrink-0"
    >
      {/* Card container with subtle shadow for premium feel */}
      <div
        className="relative h-[280px] w-full overflow-hidden rounded-[8px] border border-gray-200/60 transition-all duration-300 ease-out hover:border-gray-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:h-[360px]"
        style={{ background: '#fafafa' }}
      >
        <Image
          src={work.image}
          alt={work.title}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 420px, 100vw"
          className="object-cover transition-[filter] duration-500 ease-in-out group-hover:brightness-95"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
          <div className="flex items-center gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span
              className="text-[9px] uppercase tracking-[0.15em] text-white"
              style={{ fontWeight: 300, letterSpacing: '0.15em' }}
            >
              View Work
            </span>
          </div>
        </div>
      </div>

      {/* Content section - airy spacing */}
      <div className="pt-[12px]">
        <h3
          className="text-[1.05rem] leading-[1.3] text-navy sm:text-[1.15rem]"
          style={{ fontWeight: 400 }}
        >
          {work.title}
        </h3>

        {/* Premium detail: subtle index, top-right aligned */}
        <div
          className="absolute mt-[-2.8rem] right-0 text-[0.75rem] text-navy/20"
          style={{ fontWeight: 300 }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Description with refined typography */}
      <p
        className="mt-[2px] text-sm leading-[1.6] text-navy/60 sm:text-[0.95rem]"
        style={{ fontWeight: 200, lineHeight: 1.65 }}
      >
        {work.description.split(/\*\*(.+?)\*\*/).map((part, i) =>
          i % 2 === 1 ? (
            <strong key={i} className="text-navy" style={{ fontWeight: 400 }}>
              {part}
            </strong>
          ) : (
            part
          )
        )}
      </p>
    </a>
  );
}

function WorksHeader() {
  return (
    <div className="bg-white px-[40px] pt-[80px] pb-0 sm:px-[52px] sm:pt-[100px]">
      <div className="flex flex-col items-center text-center">
        {/* Line separator with badge — matching Hero */}
        <div className="flex items-center gap-4 w-full max-w-md">
          <div className="flex-1 h-[1px] bg-navy/15" />
          <span
            className="text-[11px] tracking-[0.2em] uppercase text-navy/40 whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontWeight: 300,
            }}
          >
            DESIGN • BRAND • DEVELOPMENT
          </span>
          <div className="flex-1 h-[1px] bg-navy/15" />
        </div>

        {/* Selected Works heading */}
        <h2 className="mt-[24px] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-navy">
          <span style={{ fontWeight: 100, letterSpacing: '-0.01em' }}>
            Selected Works
          </span>
        </h2>
      </div>
    </div>
  );
}

function SimpleWorksRow() {
  return (
    <section className="bg-white border-t border-navy/[0.06]">
      <WorksHeader />
      <div className="px-[40px] py-[48px] sm:px-[52px] sm:py-[56px]">
        {/* Grid layout for mobile with refined spacing */}
        <div className="grid grid-cols-1 gap-[48px] sm:grid-cols-2 sm:gap-[40px]">
          {works.map((work, index) => (
            <div key={work.slug}>
              <WorkCard work={work} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PinnedWorksRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    setDistance(Math.max(trackRef.current.scrollWidth - window.innerWidth, 0));
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      ref={sectionRef}
      className={`${playfair.variable} relative hidden h-[320vh] bg-white border-t border-navy/[0.06] md:block`}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <WorksHeader />
        {/* Generous padding for premium feel */}
        <div className="flex flex-1 items-center overflow-hidden px-[52px]">
          <motion.div ref={trackRef} style={{ x }} className="flex gap-[56px]">
            {works.map((work, index) => (
              <div key={work.slug} className="w-[560px] flex-shrink-0">
                <WorkCard work={work} index={index} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function WorksSection() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <SimpleWorksRow />;

  return (
    <>
      <div className="md:hidden">
        <SimpleWorksRow />
      </div>
      <PinnedWorksRow />
    </>
  );
}
