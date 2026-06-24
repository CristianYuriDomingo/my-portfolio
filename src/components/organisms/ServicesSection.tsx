'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const services = [
  {
    number: '01',
    heading: 'Design',
    description:
      'Creating thoughtful digital experiences through UI/UX design, web design, mobile interfaces, posters, marketing materials, and visual communication.',
    image: '/images/services/design-preview.webp',
    bg: '#ffffff', // White - like intro panel
  },
  {
    number: '02',
    heading: 'Branding',
    description:
      'Crafting memorable visual identities, logos, and brand systems that build recognition, trust, and consistency.',
    image: '/images/services/branding-preview.webp',
    bg: '#fffdf0', // Very light warm white
  },
  {
    number: '03',
    heading: 'Development',
    description:
      'Building fast, scalable, and responsive digital products with modern frontend technologies and clean code.',
    image: '/images/services/dev-preview.webp',
    bg: '#fffaf5', // Very light off-white
  },
];

const ALL_WORDS =
  'WHAT I BRING TO THE TABLE COMBINES DESIGN, DEVELOPMENT, AND BRAND STRATEGY INTO ONE SEAMLESS PROCESS.'.split(
    ' '
  );

function AnimatedWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const FILL_START = 0.05;
  const FILL_END = 0.8;
  const sliceSize = (FILL_END - FILL_START) / total;
  const wordStart = FILL_START + index * sliceSize;
  const wordEnd = wordStart + sliceSize * 2.2;

  // Light bg: start dim (#999) → fill to gold (#fcd525)
  const color = useTransform(
    scrollYProgress,
    [wordStart, Math.min(wordEnd, FILL_END + 0.05)],
    ['#999999', '#fcd525']
  );

  return (
    <motion.span style={{ color, display: 'inline' }}>{word} </motion.span>
  );
}

function IntroPanel() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={wrapperRef} style={{ position: 'relative', height: '220vh' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 5,
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            padding: '0 48px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontWeight: 400,
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
              textAlign: 'center',
              maxWidth: '920px',
              margin: 0,
              color: '#141D38',
            }}
          >
            {ALL_WORDS.map((word, i) => (
              <AnimatedWord
                key={i}
                word={word}
                index={i}
                total={ALL_WORDS.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" style={{ position: 'relative' }}>
      {/* ─── INTRO PANEL ──────────────────────────────────────────── */}
      <IntroPanel />

      {/* ─── SERVICE PANELS ──────────────────────────────────────────── */}
      {services.map((s, idx) => (
        <div
          key={s.number}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            zIndex: 20 + idx,
            backgroundColor: s.bg,
            color: '#141D38',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            overflow: 'hidden',
          }}
          className="services-panel"
        >
          {/* LEFT — Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '64px 56px',
              gap: '28px',
            }}
          >
            {/* Service number badge - subtle and refined */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#141D38',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-geist-sans)',
                fontWeight: 300,
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                flexShrink: 0,
              }}
            >
              {s.number}
            </div>

            {/* Heading - refined, light weight */}
            <h2
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontWeight: 200,
                fontSize: 'clamp(6rem, 14vw, 10rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                textTransform: 'capitalize',
                margin: 0,
                color: '#141D38',
              }}
            >
              {s.heading}
            </h2>

            {/* Description - premium readability */}
            <p
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontWeight: 300,
                fontSize: 'clamp(1.2rem, 1.4vw, 1.3rem)',
                lineHeight: 1.7,
                letterSpacing: '0em',
                color: '#141D38',
                opacity: 0.6,
                margin: 0,
                maxWidth: '480px',
              }}
            >
              {s.description}
            </p>
          </div>

          {/* RIGHT — Image with subtle border */}
          <div
            style={{
              position: 'relative',
              height: '100%',
              borderLeft: '1px solid #e5e4e2',
            }}
          >
            <Image
              src={s.image}
              alt={`${s.heading} preview`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="33vw"
            />
          </div>
        </div>
      ))}

      <style jsx global>{`
        @media (max-width: 768px) {
          .services-panel {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto 1fr !important;
          }
          .services-panel > div:first-child {
            padding: 48px 28px 32px !important;
          }
          .services-panel > div:last-child {
            height: 40vh !important;
            border-left: none !important;
            border-top: 1px solid #e5e4e2 !important;
          }
        }
      `}</style>
    </section>
  );
}
