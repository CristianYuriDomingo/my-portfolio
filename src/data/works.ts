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
    slug: 'graphic-design',
    title: 'Graphic Design',
    tag: 'Visual Design',
    description:
      '2 years. Hundreds of outputs. Tarpaulins, pubmats, festival branding, logos — I made the materials people actually stopped to look at.',
    image: '/images/works/graphic.png',
    tagline:
      'Two years of visual communication across events, brands, and publications.',
    challenge:
      'Every design project begins with a different objective, audience, and set of constraints. The challenge is transforming ideas into visuals that are clear, engaging, and consistent while balancing creativity, usability, and effective communication.',
    solution:
      'I approach every project with a strategy-first mindset—combining visual design, branding principles, and modern design tools to create work that is both aesthetically refined and purpose-driven. Every design is crafted to communicate clearly and leave a lasting impression.',
    industry: ['Graphic Design', 'Branding', 'Publishing', 'Events'],
    technologies: ['Canva', 'Figma', 'Print', 'Digital', 'Social Media'],
    outcome:
      'The result is a collection of designs that solve real communication problems while maintaining a strong visual identity. Each project has strengthened my creative process, attention to detail, and ability to deliver meaningful design solutions across different mediums.',
    screenshots: [
      '/images/works/graphic-design/1.png',
      '/images/works/graphic-design/2.png',
    ],
  },
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
    ],
    outcome:
      'Bantay Bayan earned Best in Capstone at NEUST and took home the Gold Award at ARC 2026 — validating both its technical execution and real-world relevance. It stands as the most recognized academic project of the batch.',
    screenshots: [
      '/images/works/bantay-bayan/1.png',
      '/images/works/bantay-bayan/2.png',
      '/images/works/bantay-bayan/3.png',
      '/images/works/bantay-bayan/4.png',
      '/images/works/bantay-bayan/5.png',
      '/images/works/bantay-bayan/6.png',
      '/images/works/bantay-bayan/7.png',
      '/images/works/bantay-bayan/8.png',
      '/images/works/bantay-bayan/9.png',
    ],
  },
  {
    slug: 'sagip-247',
    title: 'Sagip 24/7',
    tag: 'Mobile App',
    description:
      'Offline-first first aid emergency app. Comprehensive medical guidance, step-by-step procedures, visual aids, CPR instructions, and myth-busting — accessible anytime, anywhere, without internet.',
    image: '/images/works/sagip-247.png',
    tagline:
      'A lifeline in times of crisis — offline first aid guidance for communities that need it most.',
    challenge:
      'In medical emergencies, quick and correct first aid can be the difference between life and death. However, in crisis situations, reliable information and internet access are often unavailable. People in remote areas, disaster-prone regions, and first responders lack accessible, trustworthy first aid guidance when it matters most.',
    solution:
      'Sagip 24/7 is an offline-first mobile app that delivers comprehensive first aid instructions, step-by-step procedures, and visual demonstrations for common medical emergencies. From CPR and choking to burns and fractures, the app provides clear guidance, graphic support, myth-busting, and best practices — all stored locally and accessible without internet connectivity.',
    industry: ['Healthcare', 'Emergency Response', 'Medical Education'],
    technologies: [
      'Angular 18',
      'Ionic 8',
      'Capacitor 6',
      'TypeScript 5.4',
      'Local Storage',
      'Offline Sync',
      'Visual Media Assets',
      'Cross-Platform',
    ],
    outcome:
      'Sagip 24/7 demonstrated that critical medical information can be delivered effectively offline, making first aid guidance accessible to underserved communities. The app bridges gaps in healthcare access and empowers people to respond confidently during emergencies, potentially saving lives until professional help arrives.',
    screenshots: [
      '/images/works/sagip-247/1.png',
      '/images/works/sagip-247/2.png',
    ],
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
    screenshots: [
      '/images/works/laur-tourism/1.png',
      '/images/works/laur-tourism/2.png',
      '/images/works/laur-tourism/3.png',
      '/images/works/laur-tourism/4.png',
    ],
  },
];
