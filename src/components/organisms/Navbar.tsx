//src/components/organisms/Navbar.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
  icon?: string; // decorative prefix character
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Works', href: '/works' },
  { label: 'AI Chat', href: '#', icon: '+' },
];

const HIDE_THRESHOLD_PX = 10; // scroll distance before navbar hides

// ─── Subcomponents ────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link href="/" aria-label="CYD Portfolio — home">
      <div className="relative w-[34px] h-[34px] rounded-[8px] overflow-hidden flex-shrink-0">
        <Image
          src="/images/logo/cyd-logo.png"
          alt="CYD"
          fill
          sizes="34px"
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}

interface NavItemProps {
  link: NavLink;
  isActive: boolean;
  onAiChatClick?: () => void;
}

function NavItem({ link, isActive, onAiChatClick }: NavItemProps) {
  const isAiChat = link.icon !== undefined;

  const baseClass =
    'flex items-center gap-1 px-[13px] py-[6px] rounded-full text-[14px] font-medium text-navy transition-colors duration-150 whitespace-nowrap';
  const activeClass = 'bg-navy/[0.08] font-semibold';
  const hoverClass = 'hover:bg-navy/[0.06]';

  if (isAiChat) {
    return (
      <button
        onClick={onAiChatClick}
        className={`${baseClass} ${hoverClass} ${isActive ? activeClass : ''}`}
        aria-label="Open AI Chat"
      >
        <span className="text-[13px] opacity-40 font-normal" aria-hidden="true">
          {link.icon}
        </span>
        {link.label}
      </button>
    );
  }

  return (
    <Link
      href={link.href}
      className={`${baseClass} ${hoverClass} ${isActive ? activeClass : ''}`}
    >
      {link.label}
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface NavbarProps {
  onAiChatClick?: () => void;
}

export default function Navbar({ onAiChatClick }: NavbarProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Auto-hide on scroll down, reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollY.current;

      if (delta > HIDE_THRESHOLD_PX) setVisible(false); // scrolling down
      if (delta < -HIDE_THRESHOLD_PX) setVisible(true); // scrolling up

      lastScrollY.current = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-4 left-0 right-0 z-50
        flex justify-center
        transition-transform duration-300 ease-in-out
        ${visible ? 'translate-y-0' : '-translate-y-[calc(100%+1rem)]'}
      `}
      role="banner"
    >
      <nav
        className="
          inline-flex items-center
          bg-white rounded-full
          pl-[10px] pr-[5px] py-[5px]
          shadow-[0_1px_3px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.06)]
        "
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Logo />

        {/* Divider */}
        <div
          className="w-px h-[18px] bg-navy/15 mx-3 flex-shrink-0"
          aria-hidden="true"
        />

        {/* Nav links */}
        <ul className="flex items-center list-none m-0 p-0" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href + link.label}>
              <NavItem
                link={link}
                isActive={
                  link.href !== '#' &&
                  (link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href))
                }
                onAiChatClick={link.icon ? onAiChatClick : undefined}
              />
            </li>
          ))}
        </ul>

        {/* Contact CTA */}
        <Link
          href="/#contact"
          className="
            ml-1 px-[18px] py-[7px] rounded-full
            bg-navy text-white
            text-[14px] font-semibold
            whitespace-nowrap
            transition-opacity duration-150 hover:opacity-90
          "
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
