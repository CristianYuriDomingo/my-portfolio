// src/components/organisms/HeroSection.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();

  const handleAskAI = () => {
    // Dispatch event or open modal — adjust based on your AI chat implementation
    const event = new CustomEvent('openAIChat');
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* Fixed background — white */}
      <div className="fixed inset-0 -z-30 bg-white" />

      {/* Fixed giant watermark logo — dark with low opacity */}
      <div className="fixed inset-0 -z-20 flex items-center justify-center pointer-events-none select-none">
        <div
          className="opacity-[0.03] w-[110vw] h-[110vw] sm:w-[100vw] sm:h-[100vw] md:w-[90vw] md:h-[90vw]"
          style={{
            backgroundImage: "url('/images/hero/bg-logo1.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            filter: 'brightness(0)', // Makes logo dark/black
          }}
        />
      </div>

      {/* Hero content — text now rides on the "navy" token instead of raw
          black/gray, matching the navbar's palette */}
      <section
        id="hero"
        className="relative z-0 flex min-h-[100svh] flex-col items-center justify-center px-6 sm:px-10 text-center"
      >
        <h1 className="max-w-4xl text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.15] tracking-tight font-sans font-normal text-navy">
          <span
            className="italic text-navy/70 text-[1.3em]"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontWeight: '100',
              letterSpacing: '-0.02em',
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

        <p className="mt-6 max-w-xl font-sans text-base sm:text-lg font-normal text-navy">
          Web Developer · Layout Artist · UX/UI Designer
        </p>

        {/* Value proposition */}
        <p className="mt-8 max-w-2xl font-sans text-sm sm:text-base font-normal leading-relaxed text-navy/75">
          I design scalable, beautiful digital experiences with clean code and
          thoughtful UX. From pixel-perfect interfaces to AI-enhanced
          solutions—let's create something extraordinary.
        </p>

        {/* CTA Buttons — same radius, weight, and interaction recipe as the
            navbar's Contact chip, so hero and nav read as one design */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary CTA — solid navy fill. This stays the one bold, filled
              button on the page; the nav's Contact is deliberately quieter. */}
          <Link
            href="/works"
            className="
              inline-flex items-center justify-center
              px-[26px] py-[13px] rounded-[14px]
              bg-navy text-white font-semibold tracking-tight
              transition-all duration-200 ease-out
              hover:opacity-90 active:scale-[0.97]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30
            "
          >
            Explore My Work
            <span className="ml-2">→</span>
          </Link>

          {/* Secondary CTA — outlined chip: identical recipe to the navbar's
              Contact button (white fill, navy ring, navy text). */}
          <button
            onClick={handleAskAI}
            className="
              inline-flex items-center justify-center
              px-[26px] py-[13px] rounded-[14px]
              bg-white ring-1 ring-navy/15
              text-navy font-semibold tracking-tight
              transition-all duration-200 ease-out
              hover:bg-navy/[0.04] hover:ring-navy/25 active:scale-[0.97]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30
            "
          >
            Ask AI About Me
          </button>
        </div>
      </section>
    </>
  );
}
