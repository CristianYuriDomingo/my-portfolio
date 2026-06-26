export interface Work {
  slug: string;
  title: string;
  tag: string;
  description: string;
  image: string;
}

export const works: Work[] = [
  {
    slug: 'bantay-bayan',
    title: 'Bantay Bayan',
    tag: 'Full-Stack Web App',
    description:
      'Award-winning full-stack web app. Gamified civic education with a custom achievement engine, daily mini-games, and Admin CMS. **Best in Capstone · Gold Award ARC 2026.**',
    image: '/images/works/bantay-bayan.png',
  },
  {
    slug: 'sagip-247',
    title: 'Sagip 24/7',
    tag: 'Mobile App',
    description:
      'A complete emergency response mobile app. Bilingual, native device integration, medicine overdose protection — shipped and working.',
    image: '/images/works/sagip-247.png',
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    tag: 'Visual Design',
    description:
      '2 years. Hundreds of outputs. Tarpaulins, pubmats, festival branding, logos — I made the materials people actually stopped to look at.',
    image: '/images/works/graphic.png',
  },
  {
    slug: 'laur-tourism',
    title: 'Laur Tourism',
    tag: 'Website',
    description:
      "Designed it. Built it. Deployed it. Laur's first ever official tourism website — live, SEO-optimized, and built solo during OJT.",
    image: '/images/works/laur-tourism.png',
  },
  {
    slug: 'cyd-portfolio',
    title: 'CYD Portfolio',
    tag: 'Web Development',
    description:
      "Didn't use a template. Built from scratch — Next.js 14, Framer Motion, custom scroll animations. You're looking at it.",
    image: '/images/works/cyd-portfolio.png',
  },
];
