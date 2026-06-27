'use client';

import { useRef } from 'react';
import {
  useScroll,
  useTransform,
  motion,
  type MotionValue,
} from 'framer-motion';

const services = [
  {
    number: '01',
    heading: 'Development',
    description:
      'Building responsive websites, web apps, and systems with modern tools — clean code, fast performance, and scalable structure.',
    tools:
      'HTML • CSS • JavaScript • TypeScript • React • Next.js • Tailwind CSS • Git • AI-Assisted Development',
    bg: '#1a1a1a',
    color: '#ffffff',
  },
  {
    number: '02',
    heading: 'Design',
    description:
      'Designing clean, user-centered interfaces for web and mobile — from wireframes to polished UI, built with intention.',
    tools: 'Figma',
    bg: '#333333',
    color: '#ffffff',
  },
  {
    number: '03',
    heading: 'Graphics',
    description:
      'Creating visual content that communicates clearly — social media posts, infographics, layouts, and print-ready materials.',
    tools: 'Canva • Photopea',
    bg: '#ffffff',
    color: '#141D38',
  },
];

const ALL_WORDS =
  'What I bring to the table combines design, development, and brand strategy into one seamless process.'.split(
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
  scrollYProgress: MotionValue<number>;
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
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 clamp(24px, 10vw, 120px)',
            pointerEvents: 'none',
            userSelect: 'none',
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

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '64px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontWeight: 400,
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}
          >
            Scroll
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 6L8 11L13 6"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" style={{ position: 'relative' }}>
      <IntroPanel />

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
            overflow: 'hidden',
          }}
        >
          {/* Number — top right, large */}
          <span
            style={{
              position: 'absolute',
              top: '28px',
              right: '48px',
              fontFamily: 'var(--font-geist-sans)',
              fontWeight: 700,
              fontSize: 'clamp(5rem, 12vw, 10rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              opacity: 0.1,
            }}
          >
            {s.number}
          </span>

          {/* Center content */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 10vw',
              gap: '24px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontWeight: 700,
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            >
              {s.heading}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontWeight: 300,
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                lineHeight: 1.7,
                opacity: 0.55,
                maxWidth: '560px',
                margin: 0,
              }}
            >
              {s.description}
            </p>
          </div>

          {/* Tools — centered text */}
          <div
            style={{
              position: 'absolute',
              bottom: '72px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              padding: '0 24px',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontWeight: 400,
                fontSize: '0.65rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                opacity: 0.5,
              }}
            >
              Tools
            </span>
            <span
              style={{
                width: '1px',
                height: '10px',
                margin: '0 8px',
                backgroundColor: s.color,
                opacity: 0.2,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontWeight: 300,
                fontSize: '0.75rem',
                letterSpacing: '0.04em',
                opacity: 0.75,
                textAlign: 'center',
              }}
            >
              {s.tools}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
