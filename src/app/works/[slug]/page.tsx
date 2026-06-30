//src/app/works/[slug]/page.tsx
'use client';

import { works } from '@/data/works';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-3 py-[5px] border border-white/15 text-[10px] tracking-[0.12em] uppercase text-white/50"
      style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block text-[9px] tracking-[0.2em] uppercase text-white/30 mb-3"
      style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 400 }}
    >
      {children}
    </span>
  );
}

export default function WorkDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const work = works.find((w) => w.slug === params.slug);
  if (!work) notFound();

  const [open, setOpen] = useState(false);

  return (
    <main className="h-screen overflow-hidden bg-white flex flex-col">
      {/* ── FULL-WIDTH NAVBAR HEADER ── */}
      <div className="bg-[#F8F8F8]/95 backdrop-blur-md border-b border-navy/[0.06] px-[6vw] py-3 flex-shrink-0">
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-navy/35 hover:text-navy transition-colors"
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

      {/* ── CONTENT CONTAINER ── */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* ── LEFT SECTION ── */}
        <div className="flex flex-col w-full lg:w-[45%] flex-shrink-0 h-auto lg:h-full">
          {/* ── CONTENT AREA ── */}
          <div className="flex flex-col justify-center flex-1 px-[6vw] py-8 lg:py-0">
            {/* Tag */}
            <span
              className="text-[9px] tracking-[0.2em] uppercase text-navy/35 mb-5"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 400 }}
            >
              {work.tag}
            </span>

            {/* Title */}
            <h1
              className="text-[clamp(4.5rem,9vw,8rem)] leading-[0.9] tracking-tight text-navy"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 700 }}
            >
              {work.title}
            </h1>

            {/* Tagline */}
            <p
              className="mt-5 text-[0.95rem] leading-[1.7] text-navy/50 max-w-[340px]"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
            >
              {work.tagline}
            </p>

            {/* CTA */}
            <button
              onClick={() => setOpen(true)}
              className="mt-8 self-start inline-flex items-center gap-3 border border-navy/20 px-5 py-[10px] text-[10px] tracking-[0.18em] uppercase text-navy/50 hover:border-navy hover:text-navy transition-colors duration-200"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
            >
              About the Project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── RIGHT — scrollable screenshots stack ── */}
        <div className="w-full lg:flex-1 h-auto lg:h-full overflow-y-auto border-t lg:border-t-0 lg:border-l border-navy/10">
          {work.screenshots.length > 0
            ? work.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="relative w-full aspect-[16/10] border-b border-navy/10 flex-shrink-0"
                >
                  <Image
                    src={src}
                    alt={`${work.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full aspect-[16/10] border-b border-navy/10 bg-navy/[0.03]"
                />
              ))}
        </div>
      </div>

      {/* ── DARK PANEL (slide from right) ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed top-0 left-0 z-50 h-full w-full bg-[#0a0a0a] overflow-y-auto"
            >
              {/* Close button — navbar styled */}
              <div className="sticky top-0 left-0 right-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/8 px-6 lg:px-12 py-3">
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/8 hover:bg-white/12 transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Two-column layout */}
              <div className="flex flex-col lg:flex-row">
                {/* Left column */}
                <div className="w-full lg:w-1/2 px-6 lg:px-32 py-12 lg:py-16">
                  <h1
                    className="text-[clamp(2rem,6vw,5.5rem)] lg:text-[clamp(3rem,8vw,5.5rem)] leading-[0.9] font-bold text-white mb-6"
                    style={{
                      fontFamily: 'var(--font-geist-sans)',
                      fontWeight: 700,
                    }}
                  >
                    {work.title}
                  </h1>

                  <p
                    className="text-[0.9rem] lg:text-[0.95rem] leading-[1.7] text-white/50 mb-12"
                    style={{
                      fontFamily: 'var(--font-geist-sans)',
                      fontWeight: 300,
                    }}
                  >
                    {work.tagline}
                  </p>

                  <div className="space-y-8">
                    <div>
                      <SectionLabel>Industry</SectionLabel>
                      <div className="flex flex-wrap gap-2">
                        {work.industry.map((i) => (
                          <Tag key={i}>{i}</Tag>
                        ))}
                      </div>
                    </div>

                    <div>
                      <SectionLabel>Technologies</SectionLabel>
                      <div className="flex flex-wrap gap-2">
                        {work.technologies.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="w-full lg:w-1/2 px-6 lg:px-32 py-12 lg:py-16 space-y-8">
                  <div>
                    <SectionLabel>The Challenge</SectionLabel>
                    <p
                      className="text-[1rem] lg:text-[1.05rem] leading-[1.85] text-white/55"
                      style={{
                        fontFamily: 'var(--font-geist-sans)',
                        fontWeight: 300,
                      }}
                    >
                      {work.challenge}
                    </p>
                  </div>

                  <div>
                    <SectionLabel>The Solution</SectionLabel>
                    <p
                      className="text-[1rem] lg:text-[1.05rem] leading-[1.85] text-white/55"
                      style={{
                        fontFamily: 'var(--font-geist-sans)',
                        fontWeight: 300,
                      }}
                    >
                      {work.solution}
                    </p>
                  </div>

                  <div>
                    <SectionLabel>The Outcome</SectionLabel>
                    <p
                      className="text-[1rem] lg:text-[1.05rem] leading-[1.85] text-white/55"
                      style={{
                        fontFamily: 'var(--font-geist-sans)',
                        fontWeight: 300,
                      }}
                    >
                      {work.outcome}
                    </p>
                  </div>

                  {/* Prev / Next Navigation */}
                  {(() => {
                    const idx = works.findIndex((w) => w.slug === work.slug);
                    const prev = works[idx - 1];
                    const next = works[idx + 1];
                    const totalProjects = works.length;

                    return (
                      <div className="pt-8 border-t border-white/8">
                        {/* Project Counter */}
                        <span
                          className="block text-[9px] tracking-[0.2em] uppercase text-white/25 mb-6"
                          style={{
                            fontFamily: 'var(--font-geist-sans)',
                            fontWeight: 400,
                          }}
                        >
                          Project {idx + 1} of {totalProjects}
                        </span>

                        {/* Navigation Links */}
                        <div className="flex items-center justify-between gap-4">
                          {prev ? (
                            <Link
                              href={`/works/${prev.slug}`}
                              onClick={() => setOpen(false)}
                              className="flex-1 group flex items-center gap-2 px-4 py-3 rounded border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
                              style={{ fontFamily: 'var(--font-geist-sans)' }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-white/40 group-hover:text-white/70 transition-colors flex-shrink-0"
                              >
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                              </svg>
                              <div className="min-w-0">
                                <div className="text-[8px] tracking-[0.15em] uppercase text-white/40 group-hover:text-white/60 transition-colors">
                                  Previous
                                </div>
                                <div className="text-[13px] text-white/70 group-hover:text-white truncate">
                                  {prev.title}
                                </div>
                              </div>
                            </Link>
                          ) : (
                            <div className="flex-1" />
                          )}
                          {next ? (
                            <Link
                              href={`/works/${next.slug}`}
                              onClick={() => setOpen(false)}
                              className="flex-1 group flex items-center justify-end gap-2 px-4 py-3 rounded border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
                              style={{ fontFamily: 'var(--font-geist-sans)' }}
                            >
                              <div className="min-w-0 text-right">
                                <div className="text-[8px] tracking-[0.15em] uppercase text-white/40 group-hover:text-white/60 transition-colors">
                                  Next
                                </div>
                                <div className="text-[13px] text-white/70 group-hover:text-white truncate">
                                  {next.title}
                                </div>
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-white/40 group-hover:text-white/70 transition-colors flex-shrink-0"
                              >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                              </svg>
                            </Link>
                          ) : (
                            <div className="flex-1" />
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
