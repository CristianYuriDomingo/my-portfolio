// src/components/organisms/HeroSection.tsx

export default function HeroSection() {
  return (
    <>
      {/* Fixed background — yellow (Bright Sun accent) */}
      <div className="fixed inset-0 -z-30 bg-[var(--accent)]" />

      {/* Fixed giant watermark initial — navy on yellow, low opacity */}
      <div className="fixed inset-0 -z-20 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display font-black leading-none text-[var(--background)] opacity-[0.12] text-[32vw] sm:text-[38vw] md:text-[45vw]">
          Y
        </span>
      </div>

      {/* Hero content — navy text for contrast against the yellow bg */}
      <section
        id="hero"
        className="relative z-0 flex min-h-[100svh] flex-col items-center justify-center px-6 sm:px-10 text-center text-[var(--background)]"
      >
        <h1 className="font-display max-w-4xl text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[1.05] tracking-wide">
          SOLVING PROBLEMS THROUGH CODE & DESIGN.
        </h1>

        <p className="mt-5 max-w-xl font-body text-base sm:text-lg text-[var(--background)]/80">
          Web Developer · Layout Artist · UX/UI Designer
        </p>
      </section>
    </>
  );
}
