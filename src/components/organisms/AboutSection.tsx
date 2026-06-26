// src/components/organisms/AboutSection.tsx
'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import PortraitHoverImage from '@/components/molecules/PortraitHoverImage';

const ABOUT_LABEL = 'WHO AM I';
const ABOUT_DESCRIPTION =
  'I craft impactful digital experiences that blend creativity and technology. With expertise in branding, design, and full-stack development, I help businesses build a strong presence through thoughtful visuals and seamless digital solutions.';

const workExperiences = [
  {
    period: 'Feb – May 2026',
    role: 'Graphic Designer & Web Developer',
    org: 'Laur Municipal Tourism Office',
    type: 'OJT / Internship',
    bullets: [
      <>
        Designed{' '}
        <strong className="text-navy/85 font-semibold">
          Pagulyas Festival
        </strong>{' '}
        materials — tarpaulins, pubmats, and full branding collateral.
      </>,
      <>
        Built and deployed{' '}
        <strong className="text-navy/85 font-semibold">
          laurtourism.vercel.app
        </strong>{' '}
        using vanilla HTML, CSS, and JS via GitHub + Vercel.
      </>,
      <>
        Produced social media graphics and visual communications for municipal
        tourism campaigns.
      </>,
      <>
        Proposed 3D design concepts and developed an{' '}
        <strong className="text-navy/85 font-semibold">
          admin CMS UI demo
        </strong>{' '}
        for the tourism office.
      </>,
    ],
  },
  {
    period: '2024 – 2026',
    role: 'IT Org President · Layout Artist & Associate Editor',
    org: 'ACE-IT · The Pen Mover — NEUST',
    type: 'Leadership · Publication',
    bullets: [
      <>
        Served as{' '}
        <strong className="text-navy/85 font-semibold">
          President of ACE-IT
        </strong>
        , the IT department student organization at NEUST Atate Campus.
      </>,
      <>
        Represented the IT department in university-wide leadership councils.
      </>,
      <>
        Worked as{' '}
        <strong className="text-navy/85 font-semibold">Layout Artist</strong>{' '}
        then promoted to{' '}
        <strong className="text-navy/85 font-semibold">Associate Editor</strong>{' '}
        for The Pen Mover student publication over 2 years, handling editorial
        layout and visual design.
      </>,
    ],
  },
];

const academicExperiences = [
  {
    period: '2022 – 2026',
    role: 'Bachelor of Science in Information Technology',
    org: 'Nueva Ecija University of Science and Technology — Atate Campus',
    type: 'Web Systems Technology',
    bullets: [
      <>
        Graduated with a specialization in{' '}
        <strong className="text-navy/85 font-semibold">
          Web Systems Technology
        </strong>
        , Class of 2026.
      </>,
      <>
        Maintained a{' '}
        <strong className="text-navy/85 font-semibold">GWA of 1.50</strong>,
        recognized on the Dean's List across multiple semesters.
      </>,
      <>
        Received the{' '}
        <strong className="text-navy/85 font-semibold">
          Excellence in Service Award (USO) — Silver
        </strong>
        .
      </>,
    ],
  },
  {
    period: '2025 – 2026',
    role: 'Capstone Lead Developer',
    org: 'Bantay Bayan — NEUST Capstone Project',
    type: 'Best in Capstone · Gold @ ARC 2026',
    bullets: [
      <>
        Built a full-stack{' '}
        <strong className="text-navy/85 font-semibold">
          gamified civic education web app
        </strong>{' '}
        using Next.js 15, React 19, and TypeScript.
      </>,
      <>
        Designed and implemented PostgreSQL schema with Prisma ORM and NextAuth
        v4 authentication.
      </>,
      <>
        <strong className="text-navy/85 font-semibold">
          Won Best in Capstone
        </strong>{' '}
        at NEUST and{' '}
        <strong className="text-navy/85 font-semibold">
          Gold Award at ARC 2026
        </strong>
        .
      </>,
    ],
  },
];

type ExpEntry = {
  period: string;
  role: string;
  org: string;
  type: string;
  bullets: React.ReactNode[];
};

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
      {/* Hover accent line */}
      <div className="absolute left-0 top-0 h-[1px] w-0 bg-navy/50 transition-all duration-500 group-hover:w-full" />

      {/* LEFT — index + period */}
      <div className="flex flex-row lg:flex-col gap-4 lg:gap-2 items-start lg:pt-[2px]">
        <span
          className="text-[10px] tracking-[0.18em] uppercase text-navy/35 tabular-nums"
          style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="text-[11px] tracking-[0.04em] text-navy/55"
          style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
        >
          {exp.period}
        </span>
      </div>

      {/* CENTER — role, org, bullets */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-[5px]">
          <h3
            className="text-[clamp(1rem,1.6vw,1.2rem)] leading-tight tracking-tight text-navy"
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 600 }}
          >
            {exp.role}
          </h3>
          <p
            className="text-[11px] tracking-[0.06em] uppercase text-navy/50"
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
          >
            {exp.org}
          </p>
        </div>
        <ul className="flex flex-col gap-[6px]">
          {exp.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 text-[12.5px] leading-[1.75] text-navy/65"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
            >
              <span className="mt-[9px] w-[12px] h-[1px] bg-navy/20 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT — type badge */}
      <div className="flex lg:justify-end items-start">
        <span
          className="inline-flex items-center px-3 py-[4px] border border-navy/20 text-[9px] tracking-[0.16em] uppercase text-navy/50 whitespace-nowrap"
          style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 400 }}
        >
          {exp.type}
        </span>
      </div>
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
  delay = 0,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className="mb-12 flex flex-col gap-3"
    >
      <p
        className="text-[10px] tracking-[0.22em] uppercase text-navy/30"
        style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight text-navy"
        style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 700 }}
      >
        {title}
      </h2>
      <p
        className="mt-1 text-sm leading-[1.85] text-navy/40 max-w-[400px]"
        style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
      >
        {sub}
      </p>
    </motion.div>
  );
}

export default function AboutSection() {
  const [showExp, setShowExp] = useState(false);
  const [showAcad, setShowAcad] = useState(false);

  return (
    <section
      id="about"
      className="
        relative overflow-hidden
        bg-white border-t border-navy/15
        flex flex-col
        px-9 pt-16 sm:pt-20 pb-0
        lg:block
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

      {/* ── ABOUT PART ── */}
      <div
        className="
          relative mx-auto w-full max-w-[1700px]
          flex flex-col items-center
          lg:min-h-screen lg:h-screen lg:block
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
          style={{ fontWeight: 700 }}
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
            relative mt-10 w-full hidden lg:block
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

        {/* Separator below image — visible on mobile/tablet, hidden on desktop where image bleeds */}
        <div className="w-full mt-8 border-t border-navy/10 lg:hidden" />
      </div>

      {/* ── SEPARATOR ── */}
      <div className="w-full border-t border-navy/10" />

      {/* ── WORK EXPERIENCE — heading always visible, rows toggled ── */}
      <div className="relative mx-auto w-full max-w-[1700px] pt-16 pb-0">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-3">
            <p
              className="text-[10px] tracking-[0.22em] uppercase text-navy/30"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
            >
              Experience
            </p>
            <h2
              className="text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight text-navy"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 700 }}
            >
              Work <span style={{ fontWeight: 200 }}>Experience</span>
            </h2>
          </div>
          <button
            onClick={() => setShowExp((v) => !v)}
            className="
              mb-1 shrink-0 inline-flex items-center gap-3
              px-5 py-[9px]
              border border-navy/15
              text-[10px] tracking-[0.18em] uppercase text-navy/50
              transition-all duration-300
              hover:border-navy/40 hover:text-navy
              focus-visible:outline-none
            "
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 400 }}
          >
            {showExp ? 'Hide' : 'View Details'}
            <span
              className="inline-block transition-transform duration-300"
              style={{ transform: showExp ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              ↓
            </span>
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: showExp ? 'auto' : 0, opacity: showExp ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <div>
            {workExperiences.map((exp, i) => (
              <ExperienceRow key={exp.org} exp={exp} index={i} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── ACADEMIC — heading always visible, rows toggled ── */}
      <div className="relative mx-auto w-full max-w-[1700px] pt-16 pb-24 lg:pb-32 border-t border-navy/10">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-3">
            <p
              className="text-[10px] tracking-[0.22em] uppercase text-navy/30"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
            >
              Recognition
            </p>
            <h2
              className="text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tight text-navy"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 700 }}
            >
              Academic <span style={{ fontWeight: 200 }}>Achievements</span>
            </h2>
          </div>
          <button
            onClick={() => setShowAcad((v) => !v)}
            className="
              mb-1 shrink-0 inline-flex items-center gap-3
              px-5 py-[9px]
              border border-navy/15
              text-[10px] tracking-[0.18em] uppercase text-navy/50
              transition-all duration-300
              hover:border-navy/40 hover:text-navy
              focus-visible:outline-none
            "
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 400 }}
          >
            {showAcad ? 'Hide' : 'View Details'}
            <span
              className="inline-block transition-transform duration-300"
              style={{
                transform: showAcad ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              ↓
            </span>
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: showAcad ? 'auto' : 0, opacity: showAcad ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <div>
            {academicExperiences.map((exp, i) => (
              <ExperienceRow key={exp.org} exp={exp} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
