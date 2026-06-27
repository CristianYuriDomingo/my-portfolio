// src/components/organisms/ContactSection.tsx
'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400'],
  variable: '--font-playfair',
});

/* ──────────────────────────────────────────
   Shared icon shell — keeps every glyph the
   same stroke weight / size as the rest of
   the site's inline SVGs.
──────────────────────────────────────────── */
function Icon({
  children,
  size = 14,
  className,
}: {
  children: ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

const contactInfo: { label: string; href?: string; icon: ReactNode }[] = [
  {
    label: 'dcristianyuri@gmail.com',
    href: 'mailto:dcristianyuri@gmail.com',
    icon: (
      <Icon size={14}>
        <rect x="2" y="4" width="20" height="16" />
        <path d="m2 7 9.06 6a2 2 0 0 0 1.94 0L22 7" />
      </Icon>
    ),
  },
];

const socialLinks: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/cydoming',
    icon: (
      <Icon size={16}>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49c.5.092.682-.217.682-.482c0-.237-.008-.866-.013-1.7c-2.782.604-3.369-1.34-3.369-1.34c-.454-1.156-1.11-1.463-1.11-1.463c-.908-.62.069-.608.069-.608c1.003.07 1.531 1.03 1.531 1.03c.892 1.529 2.341 1.087 2.91.831c.092-.646.35-1.086.636-1.336c-2.22-.253-4.555-1.11-4.555-4.943c0-1.091.39-1.984 1.029-2.683c-.103-.253-.446-1.27.098-2.647c0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025c.546 1.377.202 2.394.1 2.647c.64.699 1.028 1.592 1.028 2.683c0 3.842-2.339 4.687-4.566 4.935c.359.309.678.919.678 1.852c0 1.336-.012 2.415-.012 2.743c0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </Icon>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/cyd.tech',
    icon: (
      <Icon size={16}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </Icon>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/cydoming',
    icon: (
      <Icon size={16}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </Icon>
    ),
  },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactSection() {
  const [status, setStatus] = useState<Status>('idle');

  // NOTE: wire this up to a real endpoint (an API route, Formspree, Resend, etc.)
  // — /api/contact is a placeholder so the form has somewhere to send to.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      id="contact"
      className={`${playfair.variable} relative bg-[#f9f9f9] border-t border-navy/[0.06] px-[6vw] py-28 lg:py-32`}
    >
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-12">
        {/* ══════════════════════════════════
            LEFT — Intro + contact details
        ══════════════════════════════════ */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Eyebrow */}
          <p
            className="mb-5 text-[10px] tracking-[0.22em] uppercase text-navy/35"
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
          >
            Contact · 2026
          </p>

          {/* Headline — same bold + italic recipe as the hero */}
          <h2
            className="text-[clamp(2.75rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-navy"
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 700 }}
          >
            Say{' '}
            <span
              style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: '1em',
                letterSpacing: '-0.02em',
                color: '#000',
              }}
            >
              Hi
            </span>
            <br />
            let&apos;s build your idea.
          </h2>

          {/* Availability label */}
          <p
            className="mt-5 text-[11px] tracking-[0.2em] uppercase text-navy/40"
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
          >
            Open To Freelance · Full-Time · Collabs
          </p>

          {/* Bio-style intro */}
          <div className="mt-7 pl-4 border-l-2 border-navy/15 max-w-[360px]">
            <p
              className="text-sm leading-[1.85] text-navy/55"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
            >
              Got a project, a rough idea, or just want to say hi? I&apos;m
              currently open to freelance work, full-time roles, and creative
              collaborations — tell me what you&apos;re building.
            </p>
          </div>

          {/* Contact info */}
          <div className="mt-9 flex flex-col gap-4">
            {contactInfo.map((item) => {
              const inner = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-navy/15 text-navy/50 transition-colors duration-200 ease-out group-hover:border-navy/30 group-hover:text-navy/70">
                    {item.icon}
                  </span>
                  <span
                    className="text-sm text-navy/70 transition-colors duration-200 ease-out group-hover:text-navy"
                    style={{
                      fontFamily: 'var(--font-geist-sans)',
                      fontWeight: 300,
                    }}
                  >
                    {item.label}
                  </span>
                </>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-4"
                >
                  {inner}
                </a>
              ) : (
                <div key={item.label} className="group flex items-center gap-4">
                  {inner}
                </div>
              );
            })}

            {/* Social logos row */}
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-navy/15 text-navy/50 transition-all duration-200 ease-out hover:border-navy/30 hover:text-navy/70 hover:bg-navy/[0.02]"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            RIGHT — Boxy form, hairline border,
            no shadow / no radius — matches the
            site's button + stats-bar language
        ══════════════════════════════════ */}
        <div className="w-full lg:w-1/2">
          <div className="border border-navy/10 bg-white p-8 sm:p-10">
            {/* Card header — mirrors the hero stats-bar divider */}
            <div className="flex items-center justify-between border-b border-navy/10 pb-6 mb-8">
              <p
                className="text-[10px] tracking-[0.22em] uppercase text-navy/35"
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontWeight: 300,
                }}
              >
                Project Inquiry
              </p>
              <p
                className="text-[10px] tracking-[0.22em] uppercase text-navy/35"
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontWeight: 300,
                }}
              >
                Reply Within 24h
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field id="name" label="Name *" placeholder="Hello" required />
                <Field
                  id="email"
                  label="Email *"
                  type="email"
                  placeholder="Where can I reach?"
                  required
                />
              </div>

              {/* Company */}
              <Field
                id="company"
                label="Company Name"
                placeholder="Your company or project"
              />

              {/* Message */}
              <div>
                <label
                  className="mb-2 flex items-center gap-[6px] text-[10px] tracking-[0.18em] uppercase text-navy/40"
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontWeight: 300,
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project…"
                  className="
                    w-full resize-y border border-navy/15 bg-white px-4 py-3
                    text-sm text-navy placeholder:text-navy/30 outline-none
                    transition-colors duration-200 ease-out
                    focus:border-navy/40
                  "
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontWeight: 300,
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="
                  inline-flex items-center justify-center gap-2
                  bg-navy px-[24px] py-[14px]
                  text-sm tracking-tight text-white
                  transition-all duration-200 ease-out
                  hover:opacity-90 active:scale-[0.97]
                  disabled:cursor-not-allowed disabled:opacity-60
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30
                "
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontWeight: 300,
                }}
              >
                {status === 'sending'
                  ? 'Sending…'
                  : status === 'sent'
                    ? 'Message Sent'
                    : status === 'error'
                      ? 'Try Again'
                      : 'Send Me'}
              </button>

              {status === 'error' && (
                <p
                  className="text-xs text-navy/50"
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontWeight: 300,
                  }}
                >
                  Something went wrong — mind trying again, or emailing me
                  directly?
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────
   Shared input field — sharp corners, hairline
   border, label with a small leading icon.
──────────────────────────────────────────── */
function Field({
  id,
  label,
  type = 'text',
  placeholder,
  required = false,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-[6px] text-[10px] tracking-[0.18em] uppercase text-navy/40"
        style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="
          w-full border border-navy/15 bg-white px-4 py-3
          text-sm text-navy placeholder:text-navy/30 outline-none
          transition-colors duration-200 ease-out
          focus:border-navy/40
        "
        style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
      />
    </div>
  );
}
