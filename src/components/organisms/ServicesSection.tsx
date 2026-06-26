'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const services = [
  {
    number: '01',
    heading: 'Design',
    subtitle: 'UI/UX · Web · Branding',
    description:
      'Creating thoughtful digital experiences through UI/UX design, web design, mobile interfaces, posters, marketing materials, and visual communication.',
    image: '/images/services/design-preview.webp',
    bg: '#1a1a1a',
    color: '#ffffff',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  {
    number: '02',
    heading: 'Branding',
    subtitle: 'Identity · Systems · Strategy',
    description:
      'Crafting memorable visual identities, logos, and brand systems that build recognition, trust, and consistency.',
    image: '/images/services/branding-preview.webp',
    bg: '#333333',
    color: '#ffffff',
    borderColor: 'rgba(255, 255, 255, 0.10)',
  },
  {
    number: '03',
    heading: 'Development',
    subtitle: 'Frontend · Full-stack · Scalable',
    description:
      'Building fast, scalable, and responsive digital products with modern frontend technologies and clean code.',
    image: '/images/services/dev-preview.webp',
    bg: '#ffffff',
    color: '#141D38',
    borderColor: 'rgba(13, 20, 40, 0.08)',
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

  const color = useTransform(
    scrollYProgress,
    [wordStart, Math.min(wordEnd, FILL_END + 0.05)],
    ['#555555', '#ffffff']
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
          backgroundColor: '#000000',
          overflow: 'hidden',
          borderTop: '1px solid rgba(13, 20, 40, 0.06)',
          borderBottom: '1px solid rgba(13, 20, 40, 0.06)',
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
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              lineHeight: 1.5,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              maxWidth: '920px',
              margin: 0,
              color: '#ffffff',
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
    <section id="services" className="bg-[#f9f9f9]" style={{ position: 'relative' }}>
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
            color: s.color,
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: '48px',
            overflow: 'hidden',
            borderTop: `1px solid ${s.borderColor}`,
            borderBottom: `1px solid ${s.borderColor}`,
            paddingLeft: '64px',
            paddingRight: '64px',
            alignItems: 'center',
            paddingTop: '0',
            paddingBottom: '0',
          }}
          className="services-panel"
        >
          {/* LEFT — Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: '0',
              gap: '16px',
              paddingLeft: '32px',
              borderLeft: `2px solid ${s.borderColor}`,
            }}
          >
            {/* Service number */}
            <div
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontWeight: 400,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: s.color,
                opacity: 0.5,
                margin: 0,
              }}
            >
              {s.number}
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontWeight: 700,
                fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                textTransform: 'capitalize',
                margin: 0,
                color: s.color,
              }}
            >
              {s.heading}
            </h2>

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontWeight: 300,
                fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
                lineHeight: 1.6,
                letterSpacing: '0em',
                color: s.color,
                opacity: 0.55,
                margin: 0,
                maxWidth: '420px',
              }}
            >
              {s.description}
            </p>
          </div>

          {/* RIGHT — Image (Squared) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
              height: '100%',
              borderLeft: `1px solid ${s.borderColor}`,
              gap: '32px',
            }}
          >
            {/* Subtitle with divider */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0',
                width: '100%',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontWeight: 300,
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: s.color,
                  opacity: 0.5,
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {s.subtitle}
              </p>
            </div>

            {/* Square image wrapper with hover effects */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(300px, 60vh, 600px)',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                backgroundColor: 'transparent',
                flexShrink: 0,
              }}
              className="service-image-wrapper group"
            >
              <Image
                src={s.image}
                alt={`${s.heading} preview`}
                fill
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                sizes="(max-width: 1024px) 90vw, 30vw"
              />

              {/* Subtle fade overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    s.color === '#ffffff'
                      ? 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 100%)'
                      : 'linear-gradient(135deg, rgba(13, 20, 40, 0) 0%, rgba(13, 20, 40, 0.02) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <style jsx global>{`
        /* Service image hover — simple scale effect */
        .service-image-wrapper:hover img {
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .services-panel {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            padding-left: 48px !important;
            padding-right: 48px !important;
            align-items: stretch !important;
          }
          .services-panel > div:first-child {
            padding: 40px 0 !important;
            border-left: none !important;
            padding-left: 0 !important;
          }
          .services-panel > div:last-child {
            padding: 0 !important;
            border-left: none !important;
          }
          .service-image-wrapper {
            width: 100% !important;
            max-width: 100% !important;
          }
        }

        @media (max-width: 768px) {
          .services-panel {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .services-panel > div:first-child {
            padding: 32px 0 !important;
          }
          .services-panel h2 {
            font-size: clamp(3rem, 10vw, 6rem) !important;
          }
          .service-image-wrapper {
            max-height: 50vh !important;
          }
        }
      `}</style>
    </section>
  );
}
