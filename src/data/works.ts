export interface Work {
  slug: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  tagline: string;
  challenge: string;
  solution: string;
  industry: string[];
  technologies: string[];
  outcome: string;
  screenshots: string[];
}

export const works: Work[] = [
  {
    slug: 'bantay-bayan',
    title: 'Bantay Bayan',
    tag: 'Full-Stack Web App',
    description:
      'Award-winning full-stack web app. Gamified civic education with a custom achievement engine, daily mini-games, and Admin CMS. **Best in Capstone · Gold Award ARC 2026.**',
    image: '/images/works/bantay-bayan.png',
    tagline:
      'A gamified civic education platform that makes learning Philippine governance actually engaging.',
    challenge:
      'Many Filipino students lack accessible and engaging resources to learn about civic responsibility and local governance. Traditional methods — textbooks and lectures — fail to capture the attention of a digitally-native generation, leaving a gap in civic awareness among the youth.',
    solution:
      'Bantay Bayan is a full-stack web application that turns civic education into an interactive experience through gamification. Users earn points, complete challenges, and progress through modules that cover Philippine governance, rights, and responsibilities — making learning feel less like a requirement and more like a game.',
    industry: ['Civic Tech', 'Education', 'Government'],
    technologies: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'NextAuth v4',
      'PostgreSQL',
      'Prisma ORM',
      'Vercel',
    ],
    outcome:
      'Bantay Bayan earned Best in Capstone at NEUST and took home the Gold Award at ARC 2026 — validating both its technical execution and real-world relevance. It stands as the most recognized academic project of the batch.',
    screenshots: [],
  },
  {
    slug: 'sagip-247',
    title: 'Sagip 24/7',
    tag: 'Mobile App',
    description:
      'A complete emergency response mobile app. Bilingual, native device integration, medicine overdose protection — shipped and working.',
    image: '/images/works/sagip-247.png',
    tagline:
      "A cross-platform emergency response app built for communities that can't afford to wait.",
    challenge:
      'In many Philippine communities, reporting emergencies is still done manually — through calls, word of mouth, or physical visits to barangay halls. This creates dangerous delays in response time, especially in situations where every second counts.',
    solution:
      'Sagip 24/7 is a mobile application that streamlines emergency reporting and response coordination. Residents can submit incident reports in real time, while local responders receive and act on alerts directly through the app — bridging the gap between citizens and frontline services.',
    industry: ['Public Safety', 'Civic Tech', 'Government'],
    technologies: [
      'Angular 18',
      'Ionic 8',
      'Capacitor 6',
      'TypeScript 5.4',
      'ngx-translate',
      'Lottie (ngx-lottie)',
      'Local Notifications',
      'Haptics',
    ],
    outcome:
      "Sagip 24/7 demonstrated that community-level emergency systems don't need to be complicated to be effective. The project proved the viability of cross-platform mobile development for local government use cases in the Philippine context.",
    screenshots: [],
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    tag: 'Visual Design',
    description:
      '2 years. Hundreds of outputs. Tarpaulins, pubmats, festival branding, logos — I made the materials people actually stopped to look at.',
    image: '/images/works/graphic.png',
    tagline:
      'Two years of visual communication across events, brands, and publications.',
    challenge:
      'Organizations — from student publications to local government units — constantly need visual materials that are both deadline-driven and brand-consistent. The work demands speed without sacrificing quality, and adaptability across very different contexts and audiences.',
    solution:
      'A body of design work spanning pubmats, tarpaulins, festival branding, logos, and infographics — produced for the Pen Mover student publication, ACE-IT, the Laur Tourism Office, and the Pagulyas Festival. Each piece was crafted to serve a specific communication goal while maintaining visual cohesion.',
    industry: ['Graphic Design', 'Branding', 'Publishing', 'Events'],
    technologies: [
      'Adobe Photoshop',
      'Canva',
      'Figma',
      'Print',
      'Digital',
      'Social Media',
    ],
    outcome:
      'Over 2+ years, the work reached real audiences — from students reading the publication to festival-goers seeing the branding live. It also built the design foundation that directly informs the visual direction of every web project since.',
    screenshots: [],
  },
  {
    slug: 'laur-tourism',
    title: 'Laur Tourism',
    tag: 'Website',
    description:
      "Designed it. Built it. Deployed it. Laur's first ever official tourism website — live, SEO-optimized, and built solo during OJT.",
    image: '/images/works/laur-tourism.png',
    tagline:
      'A fully deployed tourism web presence built solo for the Municipality of Laur.',
    challenge:
      'The Municipality of Laur had no dedicated digital platform to showcase its tourist destinations, local events, and cultural identity. Visitors and locals alike had no central online resource to discover what the town had to offer.',
    solution:
      "A clean, fully functional tourism website designed and developed solo during OJT. The site highlights Laur's destinations, events, and local culture — giving the municipality a legitimate digital presence for the first time. Built with vanilla technologies and deployed live via Vercel.",
    industry: ['Tourism', 'Government', 'Local Development'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'GitHub', 'Vercel'],
    outcome:
      "The site went live at laurtourism.vercel.app and served as the official digital face of Laur's tourism efforts during the Pagulyas Festival season. Built entirely by one person — from design to deployment — within the OJT period.",
    screenshots: [],
  },
];
