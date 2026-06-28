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
    <section
      id="tools"
      className="bg-black w-full border-t border-white/10 py-10 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10 lg:px-20">
        {/* Header */}
        <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 font-normal mb-8 lg:mb-10 text-center">
          Tools &amp; Technologies
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10">
          {toolCategories.map((cat) => (
            <div
              key={cat.label}
              className="bg-black px-6 py-6 lg:px-8 lg:py-7 flex flex-col gap-4"
            >
              <span className="text-[9px] tracking-[0.28em] uppercase text-white/30 font-normal">
                {cat.label}
              </span>
              <ul className="flex flex-col gap-2.5">
                {cat.tools.map((tool) => (
                  <li
                    key={tool}
                    className="text-[13px] tracking-[0.01em] text-white/70 font-light leading-none"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
