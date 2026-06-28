export interface ServiceEntry {
  number: string;
  heading: string;
  description: string;
  bg: string;
  color: string;
}

export const services: ServiceEntry[] = [
  {
    number: '01',
    heading: 'Development',
    description:
      'Building responsive websites, web apps, and systems with modern tools, clean code, fast performance, and scalable structure.',
    bg: '#1a1a1a',
    color: '#ffffff',
  },
  {
    number: '02',
    heading: 'Design',
    description:
      'Designing clean, user-centered interfaces for web and mobile, from wireframes to polished UI, built with intention.',
    bg: '#333333',
    color: '#ffffff',
  },
  {
    number: '03',
    heading: 'Graphics',
    description:
      'Creating visual content that communicates clearly, including social media posts, infographics, layouts, and print-ready materials.',
    bg: '#ffffff',
    color: '#141D38',
  },
];
