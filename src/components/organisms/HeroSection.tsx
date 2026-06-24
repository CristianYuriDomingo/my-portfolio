// src/components/organisms/HeroSection.tsx
'use client';

import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400'],
  variable: '--font-playfair',
});

export default function HeroSection() {
  const handleAskAI = () => {
    const event = new CustomEvent('openAIChat');
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* Fixed background — white */}
      <div className="fixed inset-0 -z-30 bg-white" />

      {/* Fixed giant watermark logo */}
      <div className="fixed inset-0 -z-20 flex items-center justify-center pointer-events-none select-none">
        <div
          className="opacity-[0.015] w-[110vw] h-[110vw] sm:w-[100vw] sm:h-[100vw] md:w-[90vw] md:h-[90vw]"
          style={{
            backgroundImage: "url('/images/hero/bg-logo.webp')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            filter: 'brightness(0)',
          }}
        />
      </div>

      <section
        id="hero"
        className={`${playfair.variable} relative z-0 flex min-h-[100svh] flex-col items-center justify-center px-6 sm:px-10 text-center`}
      >
        {/* ── Separator ── */}
        <div className="flex items-center gap-4 w-full max-w-md mb-10">
          <div className="flex-1 h-[1px] bg-navy/15" />
          <span
            className="text-[11px] tracking-[0.2em] uppercase text-navy/40 whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontWeight: 300,
            }}
          >
            Portfolio · 2026
          </span>
          <div className="flex-1 h-[1px] bg-navy/15" />
        </div>

        <h1
          className="max-w-4xl text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.15] tracking-tight text-navy"
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontWeight: 200,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: '1.3em',
              letterSpacing: '-0.02em',
              color: '#000000',
            }}
          >
            Infinite
          </span>{' '}
          by Design.
          <br />
          Built to Create
          <br />
          Without Limits
        </h1>

        <p
          className="mt-6 max-w-xl text-base sm:text-lg text-navy"
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontWeight: 200,
          }}
        >
          By Cristian Yuri Domingo / CYD
        </p>

        <p
          className="mt-14 max-w-2xl text-sm sm:text-base leading-relaxed text-navy/75"
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontWeight: 200,
          }}
        >
          I design scalable, beautiful digital experiences with clean code and
          thoughtful UX. From pixel-perfect interfaces to AI-enhanced
          solutions—let's create something extraordinary.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/works"
            className="
              inline-flex items-center justify-center
              px-[26px] py-[10px]
              bg-navy text-white tracking-tight
              transition-all duration-200 ease-out
              hover:opacity-90 active:scale-[0.97]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30
            "
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontWeight: 300,
            }}
          >
            Explore My Work
            <span className="ml-2">→</span>
          </Link>

          <button
            onClick={handleAskAI}
            className="
              inline-flex items-center justify-center
              px-[26px] py-[10px]
              bg-white ring-1 ring-navy/15
              text-navy tracking-tight
              transition-all duration-200 ease-out
              hover:bg-navy/[0.04] hover:ring-navy/25 active:scale-[0.97]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30
            "
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontWeight: 300,
            }}
          >
            Ask AI About Me
          </button>
        </div>
      </section>
    </>
  );
}
