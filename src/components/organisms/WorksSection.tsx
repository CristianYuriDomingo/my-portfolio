'use client';

import { useRef, useState, useLayoutEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import Image from 'next/image';

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
    description: 'Gamified safety awareness platform',
    image: '/images/works/bantay-bayan.png',
  },
  {
    slug: 'laur-tourism',
    title: 'Laur Tourism',
    description: 'Digital front door for Laur, Nueva Ecija',
    image: '/images/works/laur-tourism.png',
  },
  {
    slug: 'lgu-campaigns',
    title: 'LGU Social Campaigns',
    description: 'Editorial graphics for government channels',
    image: '/images/works/lgu-campaigns.png',
  },
  {
    slug: 'cyd-portfolio',
    title: 'CYD Portfolio',
    description: 'This site — design portfolio in black and white',
    image: '/images/works/cyd-portfolio.png',
  },
];

// Card: fixed 640px wide, height is intrinsic — no cropping, full image visible
function WorkCard({ work, index }: { work: Work; index: number }) {
  return (
    <a
      href={`/works/${work.slug}`}
      className="group block w-[480px] flex-shrink-0 md:w-[640px]"
    >
      {/* Image wrapper — fixed size, object-contain so full image visible, no crop */}
      <div
        className="relative h-[320px] w-[480px] overflow-hidden rounded-[6px] border border-black/[0.06] md:h-[426px] md:w-[640px]"
        style={{ background: '#f5f5f5' }}
      >
        <Image
          src={work.image}
          alt={work.title}
          fill
          sizes="(min-width: 768px) 640px, 480px"
          className="object-contain brightness-[0.78] transition-[filter,transform] duration-500 ease-in-out group-hover:brightness-100 group-hover:scale-[1.035]"
        />

        {/* "View Work" pill — fades in on hover, bottom-right */}
        <div className="absolute inset-0 flex items-end justify-end p-[18px] opacity-0 transition-opacity duration-[350ms] ease-in-out group-hover:opacity-100">
          <span className="rounded-[3px] bg-white/92 px-[18px] py-[8px] font-mono text-[9.5px] uppercase tracking-[0.16em] text-neutral-900 backdrop-blur-sm">
            View Work
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-[22px]">
        <h3 className="inline text-[1.1rem] font-normal leading-snug tracking-[-0.01em] text-neutral-900 md:text-[1.15rem]">
          {work.title}
          <sup className="ml-[5px] font-mono text-[0.58em] font-normal text-neutral-300">
            {String(index + 1).padStart(2, '0')}
          </sup>
        </h3>
      </div>
      <p className="mt-[7px] text-[0.85rem] leading-relaxed tracking-[0.005em] text-neutral-500 md:text-[0.875rem]">
        {work.description}
      </p>
    </a>
  );
}

const hideScrollbar =
  '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

function WorksHeader({
  showNav,
  onPrev,
  onNext,
}: {
  showNav?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <div className="bg-[#0a0a0a] px-[52px] pt-[52px] pb-0">
      <div className="flex items-end justify-between gap-6">
        <div>
          {/* Mono eyebrow — very muted */}
          <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600">
            Featured
          </span>
          {/* Bebas Neue display title */}
          <h2 className="mt-[14px] font-display text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.92] tracking-[0.02em] text-white">
            Selected Works
          </h2>
        </div>

        {/* Desktop nav arrows */}
        {showNav && (
          <div className="flex shrink-0 gap-5 pb-1 text-[#444]">
            <button
              type="button"
              aria-label="Previous work"
              onClick={onPrev}
              className="text-[22px] leading-none transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next work"
              onClick={onNext}
              className="text-[22px] leading-none transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Hairline rule — barely visible, premium separator */}
      <div className="mt-[44px] h-[0.5px] w-full bg-white/[0.08]" />
    </div>
  );
}

function SimpleWorksRow() {
  return (
    <section className="bg-white">
      <WorksHeader />
      <div className="pb-24 pt-[44px]">
        <div
          className={`flex snap-x snap-mandatory gap-12 overflow-x-auto px-[52px] pb-2 md:gap-[48px] ${hideScrollbar}`}
        >
          {works.map((work, index) => (
            <div key={work.slug} className="snap-start">
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

  const scrollByCard = (direction: 1 | -1) => {
    if (!sectionRef.current) return;
    const scrollRange = sectionRef.current.offsetHeight - window.innerHeight;
    const step = scrollRange / Math.max(works.length - 1, 1);
    window.scrollBy({ top: direction * step, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative hidden h-[320vh] bg-white md:block"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <WorksHeader
          showNav
          onPrev={() => scrollByCard(-1)}
          onNext={() => scrollByCard(1)}
        />
        <div className="flex flex-1 items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-[48px] px-[52px]"
          >
            {works.map((work, index) => (
              <WorkCard key={work.slug} work={work} index={index} />
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
