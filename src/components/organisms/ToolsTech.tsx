const toolCategories = [
  { label: 'Languages', tools: ['HTML', 'CSS', 'JavaScript', 'TypeScript'] },
  { label: 'Design', tools: ['Figma', 'Canva', 'Photopea'] },
  {
    label: 'Frameworks & Libraries',
    tools: [
      'React',
      'Next.js',
      'Angular',
      'Ionic',
      'Tailwind CSS',
      'Framer Motion',
    ],
  },
  {
    label: 'Tools & Platforms',
    tools: [
      'Git',
      'GitHub',
      'Vercel',
      'PostgreSQL',
      'Prisma',
      'NextAuth',
      'Capacitor',
    ],
  },
  {
    label: 'Core Strengths',
    tools: [
      'Responsive Design',
      'UI/UX',
      'System Dev',
      'Brand Identity',
      'Print Design',
      'Typography',
      'Digital Art',
    ],
  },
];

export default function ToolsTech() {
  return (
    <div id="tools" className="bg-black w-full py-8 lg:py-12 border-t border-white/10">
      <div className="mx-auto w-full max-w-[1700px] px-9 lg:px-20">
        <h2 className="w-full text-center text-[18px] lg:text-[22px] tracking-[0.22em] uppercase text-white/50 font-semibold mb-8 lg:mb-12">
          Tools &amp; Technologies
        </h2>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-24 lg:gap-0 lg:overflow-x-auto pb-4">
            {toolCategories.map((cat) => (
              <div
                key={cat.label}
                className="flex flex-col gap-4 lg:gap-5 pl-8 sm:pl-10 lg:pl-8 pr-8 sm:pr-10 lg:pr-8"
              >
                <span className="text-[9px] lg:text-[10px] tracking-[0.22em] uppercase text-white/40 font-normal">
                  {cat.label}
                </span>
                <div className="flex flex-col gap-2 lg:gap-2.5">
                  {cat.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[12px] lg:text-[13px] tracking-[0.02em] text-white/70 font-light leading-snug"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
