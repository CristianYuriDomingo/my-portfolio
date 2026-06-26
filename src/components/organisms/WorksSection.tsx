// src/components/organisms/WorksSection.tsx
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
import { type Work, works } from '@/data/works';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400'],
  variable: '--font-playfair',
});

function WorkCard({ work }: { work: Work }) {
  return (
    <a
      href={`/works/${work.slug}`}
      className="group block w-full flex-shrink-0"
    >
      {/* ── Boxy frame — sharp corners, hairline border, no shadow ── */}
      <div className="relative border border-navy/10 transition-colors duration-300 ease-out group-hover:border-navy/30">
        {/* Image */}
        <div
          className="relative h-[280px] w-full overflow-hidden sm:h-[360px]"
          style={{ background: '#fafafa' }}
        >
          <Image
            src={work.image}
            alt={work.title}
            fill
            quality={90}
            sizes="(min-width: 1024px) 560px, (min-width: 768px) 420px, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Scrim on hover so the corner marks / label stay legible */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/50" />

          {/* View Work — centered label, boxy outline */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
            <div className="flex items-center gap-2 border border-white/60 px-4 py-2">
              <span
                className="text-[9px] uppercase tracking-[0.15em] text-white"
                style={{ fontWeight: 300 }}
              >
                View Work
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </div>
        </div>

        {/* Footer meta bar — same recipe as the hero stats bar */}
        <div className="flex items-stretch border-t border-navy/10">
          <div className="flex-1 px-5 py-4 sm:py-5">
            <h3
              className="text-[1.05rem] leading-[1.3] text-navy sm:text-[1.15rem]"
              style={{ fontWeight: 400 }}
            >
              {work.title}
            </h3>
          </div>
          <div className="flex items-center px-5">
            <span
              className="whitespace-nowrap text-[9px] tracking-[0.15em] uppercase text-navy/35"
              style={{ fontWeight: 300 }}
            >
              {work.tag}
            </span>
          </div>
        </div>
      </div>

      {/* Description — sits outside the box, same as before */}
      <p
        className="mt-3 text-sm leading-[1.6] text-navy/60 sm:text-[0.95rem]"
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
    <div className="bg-black px-[40px] pt-[24px] pb-[24px] sm:px-[52px] sm:pt-[32px] sm:pb-[32px]">
      <div className="flex flex-col items-center text-center">
        {/* Line separator with badge — matching Hero */}
        <div className="flex items-center gap-4 w-full max-w-md">
          <div className="flex-1 h-[1px] bg-white/15" />
          <span
            className="text-[11px] tracking-[0.2em] uppercase text-white/40 whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontWeight: 300,
            }}
          >
            DESIGN • BRAND • DEVELOPMENT
          </span>
          <div className="flex-1 h-[1px] bg-white/15" />
        </div>

        {/* Selected Works heading — light "Selected", bold "Works" */}
        <h2
          className="mt-[24px] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight text-white"
          style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 700 }}
        >
          <span style={{ fontWeight: 200 }}>Selected</span> Works
        </h2>
      </div>
    </div>
  );
}

function SimpleWorksRow() {
  return (
    <section className="bg-[#f5f5f5] border-t border-navy/[0.06]">
      <WorksHeader />
      <div className="px-[40px] py-[48px] sm:px-[52px] sm:py-[56px]">
        {/* Grid layout for mobile with boxy spacing */}
        <div className="grid grid-cols-1 gap-[36px] sm:grid-cols-2 sm:gap-[32px]">
          {works.map((work) => (
            <div key={work.slug}>
              <WorkCard work={work} />
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
    // The track sits inside a container with px-[52px] padding on each side.
    // Without adding that back, the last card stops short by ~52–104px
    // and never scrolls fully into view.
    const EDGE_PADDING = 52;
    setDistance(
      Math.max(
        trackRef.current.scrollWidth - window.innerWidth + EDGE_PADDING * 2,
        0
      )
    );
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
      className={`${playfair.variable} relative hidden h-[320vh] bg-[#f5f5f5] border-t border-navy/[0.06] md:block`}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <WorksHeader />
        <div className="flex flex-1 items-center overflow-hidden px-[52px]">
          <motion.div ref={trackRef} style={{ x }} className="flex gap-[40px]">
            {works.map((work) => (
              <div key={work.slug} className="w-[560px] flex-shrink-0">
                <WorkCard work={work} />
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

  if (shouldReduceMotion)
    return (
      <section id="works">
        <SimpleWorksRow />
      </section>
    );

  return (
    <section id="works">
      <div className="md:hidden">
        <SimpleWorksRow />
      </div>
      <PinnedWorksRow />
    </section>
  );
}
