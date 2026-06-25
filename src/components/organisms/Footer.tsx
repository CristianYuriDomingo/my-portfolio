'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── SVG Social Icons ────────────────────────────────────────────────────────

function FacebookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 9H2V21H6V9Z"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 19C4 20.5 4 16.5 2 16M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.12383 20.9627 5.7812 20 4.77C20.4559 3.54851 20.4236 2.19835 19.91 1C19.91 1 18.73 0.650001 16 2.48C13.708 1.85882 11.292 1.85882 9 2.48C6.27 0.650001 5.09 1 5.09 1C4.57638 2.19835 4.54414 3.54851 5 4.77C4.03013 5.7887 3.49252 7.14346 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.611 15.89 9.35726 16.2954 9.19531 16.7399C9.03335 17.1844 8.96681 17.6581 9 18.13V22"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const socials = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/yourprofile',
    icon: <FacebookIcon />,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourprofile',
    icon: <LinkedInIcon />,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/yourprofile',
    icon: <GitHubIcon />,
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function FooterSection() {
  return (
    <footer className="bg-[#0A0A0A] min-h-[75vh] flex flex-col justify-between">
      {/* ── Main Content ── */}
      <div className="px-[6vw] pt-20 pb-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="w-full max-w-7xl flex flex-col md:flex-row md:justify-between md:items-stretch gap-10 md:gap-0"
        >
          {/* Left: Contact + Email */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-between gap-4 md:gap-0"
          >
            <h2 className="text-white font-extralight text-[clamp(48px,8vw,80px)] leading-none tracking-[-3px] m-0">
              Contact
            </h2>
            <a
              href="mailto:dcristianyuri@gmail.com"
              className="text-accent text-sm tracking-wide hover:opacity-70 transition-opacity duration-200"
            >
              dcristianyuri@gmail.com
            </a>
          </motion.div>

          {/* Right: Copyright + Social Icons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-row-reverse md:flex-col justify-between md:justify-between md:items-end items-center"
          >
            <span className="text-white/40 text-xs tracking-widest">
              &copy; 2026 CYD Portfolio
            </span>

            <div className="flex gap-2.5">
              {socials.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-11 h-11 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Brand Watermark ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        className="overflow-hidden pl-[4vw] pb-4"
      >
        <p className="text-white/[0.025] font-black text-[clamp(56px,14vw,160px)] leading-[0.85] tracking-[-2px] whitespace-nowrap select-none m-0">
          CYD PORTFOLIO
        </p>
      </motion.div>
    </footer>
  );
}
