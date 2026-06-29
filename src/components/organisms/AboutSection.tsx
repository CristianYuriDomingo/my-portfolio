'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import PortraitHoverImage from '@/components/molecules/PortraitHoverImage';
import {
  ABOUT_LABEL,
  ABOUT_DESCRIPTION,
  type ExpEntry,
  workExperiences,
  academicExperiences,
} from '@/data/experience';

function ExperienceRow({ exp, index }: { exp: ExpEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.06,
      }}
      className="group relative grid grid-cols-1 lg:grid-cols-[180px_1fr_auto] gap-y-3 gap-x-10 py-8 border-t border-navy/10"
    >
      <div className="absolute left-0 top-0 h-[1px] w-0 bg-navy/50 transition-all duration-500 group-hover:w-full" />

      <div className="flex flex-row lg:flex-col gap-4 lg:gap-2 items-start lg:pt-[2px]">
        <span className="text-[10px] tracking-[0.18em] uppercase text-navy/35 tabular-nums font-light">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-[11px] tracking-[0.04em] text-navy/55 font-light">
          {exp.period}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-[5px]">
          <h3 className="text-[clamp(1rem,1.6vw,1.2rem)] leading-tight tracking-tight text-navy font-semibold">
            {exp.role}
          </h3>
          <p className="text-[11px] tracking-[0.06em] uppercase text-navy/50 font-light">
            {exp.org}
          </p>
        </div>
        <ul className="flex flex-col gap-[6px]">
          {exp.bullets.map((b, bi) => (
            <li
              key={bi}
              className="flex items-start gap-3 text-[12.5px] leading-[1.75] text-navy/65 font-light text-left"
            >
              <span className="mt-[9px] w-[12px] h-[1px] bg-navy/20 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {exp.type && (
        <div className="flex lg:justify-end items-start">
          <span className="inline-flex items-center px-3 py-[4px] border border-navy/20 text-[9px] tracking-[0.16em] uppercase text-navy/50 font-normal">
            {exp.type}
          </span>
        </div>
      )}
    </motion.div>
  );
}

function SectionBlock({
  title,
  subtitle,
  entries,
  show,
  onToggle,
}: {
  title: string;
  subtitle: string;
  entries: ExpEntry[];
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[1700px] pt-16 pb-0 border-t border-navy/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-8 mb-12 text-left group"
      >
        <div className="flex flex-col gap-1 flex-1">
          <h2 className="text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight text-navy font-bold">
            {title} <span className="font-light">{subtitle}</span>
          </h2>
        </div>
        <div
          className="shrink-0 flex items-center justify-center w-12 h-12 text-3xl text-navy/60 transition-transform duration-300 group-hover:text-navy"
          style={{ transform: show ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ↓
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: show ? 'auto' : 0, opacity: show ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div>
          {entries.map((exp, i) => (
            <ExperienceRow key={exp.org} exp={exp} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const HEADING = 'ABOUT ME';

export default function AboutSection() {
  const [showAcad, setShowAcad] = useState(false);
  const [showExp, setShowExp] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white border-t border-navy/15 flex flex-col px-9 pt-16 sm:pt-20 pb-0 lg:block [--page-x:2.25rem] lg:[--page-x:5rem]"
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

      {/* ── ABOUT PART ── */}
      <div className="relative mx-auto w-full max-w-[1700px] flex flex-col items-center lg:min-h-screen lg:h-screen lg:block">
        <h2
          ref={headingRef}
          aria-label={HEADING}
          className="w-full text-center font-bold leading-none tracking-tight text-navy text-[44px] sm:text-[64px] md:text-[80px] lg:absolute lg:top-[10%] lg:left-1/2 lg:z-0 lg:text-center lg:-translate-x-1/2 lg:text-[clamp(140px,15vw,230px)] flex justify-center"
        >
          {HEADING.split('').map((char, i) => (
            <span
              key={i}
              style={{ overflow: 'hidden', display: 'inline-block' }}
            >
              <motion.span
                aria-hidden="true"
                style={{ display: 'inline-block' }}
                initial={{ y: '110%', opacity: 0 }}
                animate={headingInView ? { y: '0%', opacity: 1 } : {}}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: char === ' ' ? 0 : 0.05 + i * 0.055,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="w-full max-w-[460px] mx-auto mt-6 sm:mt-8 text-left lg:absolute lg:bottom-[24%] lg:left-[var(--page-x)] lg:z-20 lg:max-w-[28%] lg:mt-0 lg:mx-0">
          <h3 className="font-bold uppercase tracking-widest text-navy/40 text-[20px] sm:text-[24px] mb-3 font-normal">
            {ABOUT_LABEL}
          </h3>
          <p className="text-[18px] sm:text-[21px] leading-[1.8] text-navy/75 font-light">
            {ABOUT_DESCRIPTION}
          </p>
        </div>

        <div className="relative mt-10 w-full hidden lg:block lg:absolute lg:bottom-0 lg:right-[var(--page-x)] lg:left-auto lg:mt-0 lg:w-auto lg:h-[115%] lg:max-w-none lg:aspect-[4/5] lg:z-10">
          <PortraitHoverImage
            src="/images/about/portrait-cropped1.png"
            alt="Cristian Yuri Domingo"
            sizes="(min-width: 1024px) 45vw, (min-width: 640px) 60vw, 85vw"
            className="object-contain object-bottom lg:object-right-bottom"
          />
        </div>

        <div className="w-full mt-8 border-t border-navy/10 lg:hidden" />
      </div>

      {/* ── SEPARATOR ── */}
      <div className="w-full border-t border-navy/10" />

      {/* ── ACADEMIC BACKGROUND ── */}
      <SectionBlock
        title="Academic"
        subtitle="Background"
        entries={academicExperiences}
        show={showAcad}
        onToggle={() => setShowAcad((v) => !v)}
      />

      {/* ── WORK EXPERIENCE ── */}
      <SectionBlock
        title="Work"
        subtitle="Experience"
        entries={workExperiences}
        show={showExp}
        onToggle={() => setShowExp((v) => !v)}
      />
    </section>
  );
}
