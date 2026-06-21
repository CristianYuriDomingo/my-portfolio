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
      {/* Fixed background — yellow (Bright Sun accent) */}
      <div className="fixed inset-0 -z-30 bg-[var(--accent)]" />

      {/* Fixed giant watermark logo — original colors, low opacity */}
      <div className="fixed inset-0 -z-20 flex items-center justify-center pointer-events-none select-none">
        <div
          className="opacity-[0.12] w-[110vw] h-[110vw] sm:w-[100vw] sm:h-[100vw] md:w-[90vw] md:h-[90vw]"
          style={{
            backgroundImage: "url('/images/hero/bg-logo1.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
          }}
        />
      </div>

      {/* Hero content — navy text for contrast against the yellow bg */}
      <section
        id="hero"
        className="relative z-0 flex min-h-[100svh] flex-col items-center justify-center px-6 sm:px-10 text-center text-[#141D38]"
      >
        <h1 className="font-body max-w-4xl text-[clamp(2.5rem,7vw,4.75rem)] font-extrabold leading-[1.15] tracking-tight">
          Infinite by Design.
          <br />
          Built to Create
          <br />
          Without Limits
        </h1>

        <p className="mt-6 max-w-xl font-body text-base sm:text-lg font-medium text-[#141D38]">
          Web Developer · Layout Artist · UX/UI Designer
        </p>

        {/* Value proposition */}
        <p className="mt-8 max-w-2xl font-body text-sm sm:text-base leading-relaxed text-[#141D38]/85">
          I design scalable, beautiful digital experiences with clean code and
          thoughtful UX. From pixel-perfect interfaces to AI-enhanced
          solutions—let's create something extraordinary.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
          {/* Primary CTA */}
          <Link
            href="/works"
            className="inline-flex items-center justify-center px-7 py-3 bg-[#141D38] text-[#FCDB32] font-medium rounded-md transition-opacity duration-300 hover:opacity-90 active:opacity-75"
          >
            Explore My Work
            <span className="ml-2">→</span>
          </Link>

          {/* Secondary CTA */}
          <button
            onClick={handleAskAI}
            className="inline-flex items-center justify-center px-7 py-3 border border-[#141D38] text-[#141D38] font-medium rounded-md transition-colors duration-300 hover:bg-[#141D38]/5"
          >
            Ask AI About Me
          </button>
        </div>
      </section>
    </>
  );
}
