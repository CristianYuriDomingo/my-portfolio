export const ABOUT_LABEL = 'Who Am I?';
export const ABOUT_DESCRIPTION =
  "I'm a BSIT graduate majoring in Web Systems Technologies, passionate about UI/UX design, frontend development, and visual design. I love creating clean, user-focused digital experiences.";

export type ExpEntry = {
  period: string;
  role: string;
  org: string;
  type: string;
  bullets: React.ReactNode[];
};

export const workExperiences: ExpEntry[] = [
  {
    period: 'Feb – May 2026',
    role: 'Web Developer & Multimedia Artist (OJT)',
    org: 'Social Media Team & Municipal Tourism Office — Laur, Nueva Ecija',
    type: '',
    bullets: [
      <>
        Produced{' '}
        <strong className="text-navy/85 font-semibold">
          50+ print and digital marketing assets
        </strong>{' '}
        including social media graphics, tarpaulins, infographics, and event
        branding for multiple municipal campaigns.
      </>,
      <>
        Designed and developed a{' '}
        <strong className="text-navy/85 font-semibold">
          tourism website for the Municipality of Laur
        </strong>{' '}
        featuring tourist destinations, a gallery, and emergency information
        using HTML, CSS, and JavaScript.
      </>,
    ],
  },
  {
    period: '2024 – 2026',
    role: 'IT Org President · Layout Artist & Associate Editor',
    org: 'ACE-IT · The Pen Mover — NEUST',
    type: '',
    bullets: [
      <>
        Served as{' '}
        <strong className="text-navy/85 font-semibold">
          President of ACE-IT
        </strong>
        , the IT department student organization at NEUST Atate Campus.
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

export const academicExperiences: ExpEntry[] = [
  {
    period: '2022 – 2026',
    role: 'Bachelor of Science in Information Technology',
    org: 'Nueva Ecija University of Science and Technology — Atate Campus',
    type: '',
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
        recognized on the Dean&apos;s List across multiple semesters.
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
    type: '',
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
