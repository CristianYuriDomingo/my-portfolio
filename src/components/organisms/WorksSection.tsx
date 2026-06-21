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
    image: '/works/bantay-bayan.jpg',
  },
  {
    slug: 'laur-tourism',
    title: 'Laur Tourism',
    description: 'Digital front door for Laur, Nueva Ecija',
    image: '/works/laur-tourism.jpg',
  },
  {
    slug: 'lgu-campaigns',
    title: 'LGU Social Campaigns',
    description: 'Editorial graphics for government channels',
    image: '/works/lgu-campaigns.jpg',
  },
  {
    slug: 'cyd-portfolio',
    title: 'CYD Portfolio',
    description: 'This site, in navy and yellow',
    image: '/works/cyd-portfolio.jpg',
  },
];

// Card image size: 528×396 on mobile, 700×525 on desktop (4:3 ratio)
function WorkCard({ work, index }: { work: Work; index: number }) {
  return (
    <a
      href={`/works/${work.slug}`}
      className="group block w-[528px] flex-shrink-0 md:w-[700px]"
    >
      <div className="relative h-[396px] w-[528px] overflow-hidden rounded-md bg-neutral-100 md:h-[525px] md:w-[700px]">
        <Image
          src={work.image}
          alt={work.title}
          fill
          sizes="(min-width: 768px) 700px, 528px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 flex items-baseline gap-3">
        <span className="font-mono text-xs text-neutral-400">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="text-lg font-normal text-neutral-900 md:text-xl">
          {work.title}
        </h3>
      </div>
      <p className="mt-1.5 text-sm text-neutral-500 md:text-base">
        {work.description}
      </p>
    </a>
  );
}

const hideScrollbar =
  '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

function SectionDivider() {
  return <div className="h-px w-full bg-neutral-200" />;
}

// Editorial-style masthead: small tracked eyebrow, oversized display
// headline, and a single accent rule. Shared by both the mobile row
// and the desktop pinned row so the section reads consistently.
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
    <div className="px-[6vw] pt-10 pb-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <span className="block font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            Featured
          </span>
          <h2 className="mt-2 font-display text-[clamp(2.25rem,5vw,4rem)] uppercase leading-[0.9] text-neutral-900">
            Selected Work
          </h2>
        </div>
        {showNav && (
          <div className="flex shrink-0 gap-3 pb-1 text-neutral-400">
            <button
              type="button"
              aria-label="Previous work"
              onClick={onPrev}
              className="transition-colors hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next work"
              onClick={onNext}
              className="transition-colors hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900"
            >
              →
            </button>
          </div>
        )}
      </div>
      <div className="mt-6 h-px w-full bg-[#FCDB32]" />
    </div>
  );
}

function SimpleWorksRow() {
  return (
    <section className="bg-white">
      <SectionDivider />
      <WorksHeader />
      <div className="pb-20">
        <div
          className={`flex snap-x snap-mandatory gap-8 overflow-x-auto px-[6vw] pb-2 ${hideScrollbar}`}
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
        <SectionDivider />
        <WorksHeader
          showNav
          onPrev={() => scrollByCard(-1)}
          onNext={() => scrollByCard(1)}
        />
        <div className="flex flex-1 items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-8 px-[6vw]"
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
