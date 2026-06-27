export const ABOUT_LABEL = 'Who Am I?';
export const ABOUT_DESCRIPTION =
  'I craft impactful digital experiences that blend creativity and technology. With expertise in branding, design, and full-stack development, I help businesses build a strong presence through thoughtful visuals and seamless digital solutions.';

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

export const academicExperiences: ExpEntry[] = [
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
