// src/components/organisms/AboutSection.tsx

import PortraitHoverImage from '@/components/molecules/PortraitHoverImage';

const ABOUT_LABEL = 'WHO AM I';
const ABOUT_DESCRIPTION =
  'I craft impactful digital experiences that blend creativity and technology. With expertise in branding, design, and full-stack development, I help businesses build a strong presence through thoughtful visuals and seamless digital solutions.';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="
        relative overflow-hidden
        bg-white
        min-h-[100dvh] flex flex-col
        px-9 pt-16 sm:pt-20 pb-0
        lg:h-screen lg:block lg:py-0
        [--page-x:2.25rem] lg:[--page-x:5rem]
      "
    >
      <div className="fixed inset-0 -z-20 flex items-center justify-center pointer-events-none select-none">
        <div
          className="opacity-[0.025] w-[110vw] h-[110vw] sm:w-[100vw] sm:h-[100vw] md:w-[90vw] md:h-[90vw]"
          style={{
            backgroundImage: "url('/images/hero/bg-logo1.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            filter: 'brightness(0)',
          }}
        />
      </div>

      <div
        className="
          relative mx-auto w-full max-w-[1700px]
          flex-1 flex flex-col items-center
          lg:h-full lg:block
        "
      >
        <h2
          className="
            w-full text-center font-display font-black leading-none tracking-tight
            text-navy
            text-[44px] sm:text-[64px] md:text-[80px]
            lg:absolute lg:top-[10%] lg:left-1/2 lg:z-0 lg:text-center lg:-translate-x-1/2
            lg:text-[clamp(140px,15vw,230px)]
          "
          style={{ fontWeight: 200 }}
        >
          ABOUT ME
        </h2>

        <div
          className="
            w-full max-w-[460px] mx-auto mt-6 sm:mt-8
            text-center
            lg:absolute lg:bottom-[24%] lg:left-[var(--page-x)] lg:z-20 lg:max-w-[28%] lg:mt-0 lg:mx-0 lg:text-left
          "
        >
          <h3
            className="
              font-display font-bold uppercase tracking-widest
              text-navy/40
              text-[13px] sm:text-[14px]
              mb-3
            "
            style={{ fontWeight: 400 }}
          >
            {ABOUT_LABEL}
          </h3>
          <p
            className="
              text-[18px] sm:text-[21px]
              leading-[1.8] text-navy/75
            "
            style={{ fontWeight: 200 }}
          >
            {ABOUT_DESCRIPTION}
          </p>
        </div>

        <div
          className="
            relative mt-10 w-full
            flex-1
            lg:absolute lg:bottom-0 lg:right-[var(--page-x)] lg:left-auto
            lg:mt-0 lg:w-auto lg:h-[115%] lg:max-w-none lg:aspect-[4/5] lg:z-10
          "
        >
          <PortraitHoverImage
            src="/images/about/portrait-cropped1.png"
            alt="Cristian Yuri Domingo"
            sizes="(min-width: 1024px) 45vw, (min-width: 640px) 60vw, 85vw"
            className="object-contain object-bottom lg:object-right-bottom"
          />
        </div>
      </div>
    </section>
  );
}
