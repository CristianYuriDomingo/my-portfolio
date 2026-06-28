// src/components/organisms/ContactSection.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400'],
  variable: '--font-playfair',
});

const socialLinks: { label: string; href: string }[] = [
  {
    label: 'Email',
    href: 'mailto:dcristianyuri@gmail.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/cydoming',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/cyd.tech',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/cydoming',
  },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactSection() {
  const [status, setStatus] = useState<Status>('idle');

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
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* LEFT */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Eyebrow */}
          <p
            className="mb-5 text-[10px] tracking-[0.22em] uppercase text-navy/35"
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
          >
            Contact
          </p>

          {/* Headline */}
          <h2
            className="text-[clamp(3.25rem,5.5vw,5.25rem)] leading-[1.05] tracking-tight text-navy"
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 700 }}
          >
            Let&apos;s{' '}
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
              work
            </span>
            <br />
            together.
          </h2>

          {/* Tagline */}
          <p
            className="mt-8 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.7] text-navy/50 max-w-[340px]"
            style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
          >
            Open to projects, roles, and ideas worth building.
          </p>

          {/* ── Editorial socials ── */}
          <div className="mt-10 flex flex-col">
            <p
              className="mb-3 text-[10px] tracking-[0.22em] uppercase text-navy/30"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
            >
              (Socials)
            </p>

            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={
                  link.href.startsWith('mailto')
                    ? undefined
                    : 'noopener noreferrer'
                }
                className="group flex items-baseline gap-2 leading-[1.2] transition-opacity duration-200 hover:opacity-50"
                style={{ textDecoration: 'none' }}
              >
                <span
                  className="text-[clamp(1.5rem,2.6vw,2.25rem)] tracking-tight text-navy"
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontWeight: 700,
                  }}
                >
                  {link.label}
                </span>
                <span
                  className="text-[clamp(0.85rem,1.5vw,1.2rem)] text-navy/35 -translate-y-1"
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontWeight: 300,
                  }}
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — Editorial Form */}
        <div className="w-full lg:w-1/2">
          {/* Form header */}
          <div className="flex items-center justify-between border-b border-navy/10 pb-4 mb-10">
            <p
              className="text-[10px] tracking-[0.22em] uppercase text-navy/35"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
            >
              New Inquiry
            </p>
            <p
              className="text-[10px] tracking-[0.22em] uppercase text-navy/35"
              style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
            >
              Reply within 24h
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Name + Email */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <EditorialField
                id="name"
                label="Name"
                placeholder="Your name"
                required
              />
              <EditorialField
                id="email"
                label="Email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Company */}
            <EditorialField
              id="company"
              label="Company"
              placeholder="Optional"
            />

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-[10px] tracking-[0.2em] uppercase text-navy/35"
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
                rows={4}
                placeholder="What are you building?"
                className="
                  w-full resize-none bg-transparent
                  border-b border-navy/20
                  px-0 py-3
                  text-base text-navy placeholder:text-navy/25
                  outline-none transition-colors duration-200
                  focus:border-navy/50
                "
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontWeight: 300,
                }}
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group flex items-baseline gap-2 transition-opacity duration-200 hover:opacity-50 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <span
                  className="text-[clamp(1.5rem,2.6vw,2.25rem)] tracking-tight text-navy leading-none"
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontWeight: 700,
                  }}
                >
                  {status === 'sending'
                    ? 'Sending…'
                    : status === 'sent'
                      ? 'Sent ✓'
                      : status === 'error'
                        ? 'Try Again'
                        : 'Send Message'}
                </span>
                {status !== 'sent' && (
                  <span
                    className="text-[clamp(0.85rem,1.5vw,1.2rem)] text-navy/35 -translate-y-1"
                    style={{
                      fontFamily: 'var(--font-geist-sans)',
                      fontWeight: 300,
                    }}
                  >
                    ↗
                  </span>
                )}
              </button>
            </div>

            {status === 'error' && (
              <p
                className="text-xs text-navy/40 -mt-4"
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontWeight: 300,
                }}
              >
                Something went wrong. Try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function EditorialField({
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
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[10px] tracking-[0.2em] uppercase text-navy/35"
        style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
      >
        {label} {required && '*'}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="
          w-full bg-transparent
          border-b border-navy/20
          px-0 py-3
          text-base text-navy placeholder:text-navy/25
          outline-none transition-colors duration-200
          focus:border-navy/50
        "
        style={{ fontFamily: 'var(--font-geist-sans)', fontWeight: 300 }}
      />
    </div>
  );
}
