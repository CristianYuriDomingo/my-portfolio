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
    label: 'Laur, Nueva Ecija, Philippines',
    icon: (
      <Icon size={14}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </Icon>
    ),
  },
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
  {
    label: '0966856844',
    href: 'tel:+63966856844',
    icon: (
      <Icon size={14}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
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
                <Field
                  id="name"
                  label="Name *"
                  placeholder="Hello"
                  required
                />
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
