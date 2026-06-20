// src/components/organisms/AboutSection.tsx

import Image from 'next/image';

const ABOUT_DESCRIPTION =
  'I craft impactful digital experiences that blend creativity and technology. With expertise in branding, design, and full-stack development, I help businesses build a strong presence through thoughtful visuals and seamless digital solutions.';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="
        relative overflow-hidden
        bg-[#F5F5F5]
        min-h-[100dvh] flex flex-col
        px-9 pt-16 sm:pt-20 pb-0
        lg:h-screen lg:block lg:py-0
        [--page-x:2.25rem] lg:[--page-x:5rem]
      "
    >
      <div
        className="
          relative mx-auto w-full max-w-[1700px]
          flex-1 flex flex-col items-center
          lg:h-full lg:block
        "
      >
        {/* 1. Heading — centered while stacked; lowest layer once the row kicks in */}
        <h2
          className="
            w-full text-center font-display font-black leading-none tracking-tight
            text-[#141D38]
            text-[44px] sm:text-[64px] md:text-[80px]
            lg:absolute lg:top-[10%] lg:left-[var(--page-x)] lg:z-0 lg:text-left
            lg:text-[clamp(140px,15vw,230px)] lg:whitespace-nowrap
          "
        >
          ABOUT ME
        </h2>

        {/* 2. Paragraph — centered while stacked; pinned bottom-left and left-aligned once the row kicks in */}
        <p
          className="
            w-full max-w-[460px] mx-auto mt-6 sm:mt-8
            text-center
            text-[18px] sm:text-[21px]
            leading-[1.8] text-[#141D38]/80
            lg:absolute lg:bottom-[24%] lg:left-[var(--page-x)] lg:z-20 lg:max-w-[36%] lg:mt-0 lg:mx-0 lg:text-left
          "
        >
          {ABOUT_DESCRIPTION}
        </p>

        {/* 3. Portrait — full available width, grows to fill remaining height, pinned flush
               to the bottom while stacked; desktop sizing stays at 115%.
               TODO: once you have a taller (4:5) photo with more torso shown, swap the src below —
               that should close the remaining gap on its own, no other changes needed. */}
        <div
          className="
            relative mt-10 w-full
            flex-1
            lg:absolute lg:bottom-0 lg:right-[var(--page-x)] lg:left-auto
            lg:mt-0 lg:w-auto lg:h-[115%] lg:max-w-none lg:aspect-[4/5] lg:z-10
          "
        >
          <Image
            src="/images/about/portrait-cropped.png"
            alt="Cristian Yuri Domingo"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, (min-width: 640px) 60vw, 85vw"
            className="object-contain object-bottom lg:object-right-bottom"
          />
        </div>
      </div>
    </section>
  );
}
