// src/components/organisms/HeroSection.tsx
'use client';

import Image from 'next/image';
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
      {/* ── White base ── */}
      <div className="fixed inset-0 -z-30 bg-white" />

      {/* ── Watermark logo — full viewport bg ── */}
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
        className={`${playfair.variable} relative z-0 flex flex-col lg:flex-row min-h-[100svh]`}
      >
        {/* ══════════════════════════════════
            LEFT — Text content
        ══════════════════════════════════ */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-[6vw] py-28 lg:py-0 gap-0">
          {/* Eyebrow */}
          <p
            className="mb-5 text-[12px] tracking-[0.22em] uppercase text-navy/35"
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
          >
            Portfolio · 2026
          </p>

          {/* Headline */}
          <h1
            className="text-[clamp(4rem,7vw,7.5rem)] leading-[1.05] tracking-tight text-navy"
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 700 }}
          >
            I'm{' '}
            <span
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: '1em',
                letterSpacing: '-0.02em',
                color: '#000',
              }}
            >
              CYD
            </span>
          </h1>

          {/* Role labels */}
          <p
            className="mt-5 text-[13px] tracking-[0.2em] uppercase text-navy/40"
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
          >
            UI/UX Designer · Developer · Visual Creator
          </p>

          {/* Bio */}
          <div className="mt-7 pl-4 border-l-2 border-navy/15 max-w-[480px]">
            <p
              className="text-base leading-[1.85] text-navy/55"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
            >
              I'm Cristian Yuri Domingo — CYD for short. A 3-in-1 Designer,
              Developer, and Visual Creator from Nueva Ecija, PH. One person, full package.
            </p>
          </div>



          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/works"
              className="
                inline-flex items-center justify-center
                px-[24px] py-[10px]
                bg-navy text-white text-base tracking-tight
                transition-all duration-200 ease-out
                hover:opacity-90 active:scale-[0.97]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30
              "
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
            >
              View My Work
            </Link>

            <button
              onClick={handleAskAI}
              className="
                inline-flex items-center justify-center
                px-[24px] py-[10px]
                bg-white ring-1 ring-navy/15
                text-navy text-base tracking-tight
                transition-all duration-200 ease-out
                hover:bg-navy/[0.04] hover:ring-navy/25 active:scale-[0.97]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30
              "
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
            >
              Ask AI About Me
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════
            RIGHT — Photo + Stats bar
            · On mobile: full-width block below content
            · On desktop: 50% column with left margin
        ══════════════════════════════════ */}
        <div className="w-full lg:w-1/2 flex flex-col ml-0 lg:ml-6 lg:mr-6">
          {/* Photo wrapper — hover animation */}
          <div className="relative flex-1 min-h-[60vw] sm:min-h-[50vw] lg:min-h-0 group overflow-hidden">
            <Image
              src="/images/hero/portrait.webp"
              alt="CYD — Cristian Yuri Domingo"
              fill
              priority
              className="
                object-cover object-top grayscale
                transition-transform duration-700 ease-out
                group-hover:scale-[1.04]
              "
            />

            {/* Left-edge fade into white */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent pointer-events-none" />

            {/* Hover overlay — corner bracket + label */}
            <div
              className="
                absolute inset-0 pointer-events-none
                opacity-0 group-hover:opacity-100
                transition-opacity duration-500 ease-out
              "
            >
              {/* Thin inset border that draws in from corners */}
              <span
                className="
                  absolute top-4 left-4 w-8 h-8
                  border-t border-l border-navy/40
                  transition-all duration-500 ease-out
                  translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0
                "
              />
              <span
                className="
                  absolute top-4 right-4 w-8 h-8
                  border-t border-r border-navy/40
                  transition-all duration-500 ease-out
                  -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0
                "
              />
              <span
                className="
                  absolute bottom-4 left-4 w-8 h-8
                  border-b border-l border-navy/40
                  transition-all duration-500 ease-out
                  translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0
                "
              />
              <span
                className="
                  absolute bottom-4 right-4 w-8 h-8
                  border-b border-r border-navy/40
                  transition-all duration-500 ease-out
                  -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0
                "
              />

              {/* Subtle label bottom-left */}
              <p
                className="
                  absolute bottom-6 left-6
                  text-[9px] tracking-[0.22em] uppercase text-navy/50
                  translate-y-2 group-hover:translate-y-0
                  transition-transform duration-500 delay-100 ease-out
                "
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontWeight: 300,
                }}
              >
                Cristian Yuri Domingo
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex items-stretch border-t border-navy/10 bg-white/70 backdrop-blur-sm">
            {[
              { value: 'NEUST', label: 'Class of 2026' },
              { value: 'Gold', label: 'ARC 2026 Award' },
              { value: '3-in-1', label: 'Dev + Design + Visual' },
            ].map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex-1 flex flex-col gap-[6px] px-5 sm:px-8 py-5 sm:py-6 ${
                  i !== 0 ? 'border-l border-navy/10' : ''
                }`}
              >
                <span
                  className="text-navy text-lg sm:text-xl"
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontWeight: 600,
                  }}
                >
                  {value}
                </span>
                <span
                  className="text-[9px] tracking-[0.18em] uppercase text-navy/35"
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontWeight: 300,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
