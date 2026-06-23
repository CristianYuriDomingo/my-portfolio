'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Works', href: '/works' },
  { label: 'Services', href: '/#services' },
  { label: 'Ask AI', href: '#' },
];

const HIDE_THRESHOLD_PX = 10; // scroll distance before navbar hides
const EASE = 'cubic-bezier(0.16,1,0.3,1)'; // Apple-style decelerate easing

// ─── Subcomponents ────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link
      href="/"
      aria-label="CYD Portfolio — home"
      className="flex-shrink-0 rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
    >
      <div className="relative w-[40px] h-[40px] rounded-[8px] overflow-hidden">
        <Image
          src="/images/logo/cyd-logo.png"
          alt="CYD"
          fill
          sizes="40px"
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
  onNavigate?: () => void;
  variant?: 'desktop' | 'mobile';
}

function NavItem({
  link,
  isActive,
  onAiChatClick,
  onNavigate,
  variant = 'desktop',
}: NavItemProps) {
  const isAiChat = link.href === '#';

  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30';

  // Desktop items live inside the gray pill, so active state reads as a
  // raised white "chip" rather than a tinted background.
  const desktopClass = `flex items-center px-[18px] py-[9px] rounded-full text-[14.5px] font-medium tracking-tight text-navy/75 transition-all duration-200 whitespace-nowrap active:scale-[0.97] hover:text-navy hover:bg-white/60 ${focusRing}`;
  const mobileClass = `flex items-center w-full px-[16px] py-[12px] rounded-[14px] text-[16px] font-medium tracking-tight text-navy transition-colors duration-200 active:scale-[0.98] hover:bg-navy/[0.05] ${focusRing}`;

  const base = variant === 'mobile' ? mobileClass : desktopClass;
  const activeClass =
    variant === 'mobile'
      ? 'bg-[#FCDB32]/25 font-semibold'
      : 'bg-white text-navy font-semibold shadow-[0_1px_2px_rgba(13,20,40,0.10)]';

  const handleAiClick = () => {
    onAiChatClick?.();
    onNavigate?.();
  };

  if (isAiChat) {
    return (
      <button
        onClick={handleAiClick}
        className={`${base} ${isActive ? activeClass : ''}`}
        aria-label="Open AI Chat"
      >
        {link.label}
      </button>
    );
  }

  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className={`${base} ${isActive ? activeClass : ''}`}
    >
      {link.label}
    </Link>
  );
}

// Hamburger ↔ close icon. All three bars share one duration + easing, so the
// morph reads as a single motion instead of three separately-timed parts.
function BurgerIcon({ open }: { open: boolean }) {
  const line =
    'absolute left-0 w-full h-[2px] bg-navy rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none';

  return (
    <span className="relative w-[18px] h-[13px] block">
      <span
        className={`${line} ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`}
      />
      <span
        className={`${line} top-1/2 -translate-y-1/2 ${open ? 'opacity-0' : 'opacity-100'}`}
      />
      <span
        className={`${line} ${open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`}
      />
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface NavbarProps {
  onAiChatClick?: () => void;
}

export default function Navbar({ onAiChatClick }: NavbarProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  const isLinkActive = (href: string) =>
    href !== '#' &&
    (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // Auto-hide on scroll down, reveal on scroll up — paused while mobile menu is open
  useEffect(() => {
    const handleScroll = () => {
      if (mobileOpen) return;
      const current = window.scrollY;
      const delta = current - lastScrollY.current;

      if (delta > HIDE_THRESHOLD_PX) setVisible(false);
      if (delta < -HIDE_THRESHOLD_PX) setVisible(true);

      lastScrollY.current = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  // Close the mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open — without the page
  // "jumping" sideways. Plain `overflow: hidden` removes the scrollbar and
  // makes the page reflow wider, which shifts everything on screen. Pinning
  // the body in place and padding back the scrollbar's width avoids that,
  // and also stops iOS Safari from scrolling the page behind the menu.
  useEffect(() => {
    if (!mobileOpen) return;

    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const { body } = document;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.paddingRight = '';
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-transform duration-500
        ${visible ? 'translate-y-0' : '-translate-y-full'}
      `}
      style={{ transitionTimingFunction: EASE }}
      role="banner"
    >
      <div className="relative flex items-center justify-between max-w-7xl mx-auto px-6 md:px-10 py-5">
        {/* Logo — bare, no container, sits directly on the page background */}
        <Logo />

        {/* Centered link pill — desktop only. Absolutely centered on the
            viewport so it stays visually centered regardless of how wide
            the logo or the Contact button end up being. */}
        <ul
          className="
            hidden md:flex items-center list-none m-0 p-[6px]
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            bg-navy/[0.045] backdrop-blur-md
            rounded-full ring-1 ring-navy/[0.06]
          "
          role="list"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href + link.label}>
              <NavItem
                link={link}
                isActive={isLinkActive(link.href)}
                onAiChatClick={link.href === '#' ? onAiChatClick : undefined}
              />
            </li>
          ))}
        </ul>

        {/* Right side: outlined Contact button (desktop) + hamburger (mobile) */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/#contact"
            className="
              hidden md:inline-flex
              px-[22px] py-[9px] rounded-[14px]
              bg-white/80 backdrop-blur-md
              ring-1 ring-navy/15
              text-navy text-[14.5px] font-semibold tracking-tight
              whitespace-nowrap
              transition-all duration-200 ease-out
              hover:bg-white hover:ring-navy/25 active:scale-[0.97]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30
            "
          >
            Contact
          </Link>

          {/* Hamburger toggle — mobile only */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="
              md:hidden flex items-center justify-center
              w-10 h-10 rounded-full flex-shrink-0
              bg-white ring-1 ring-navy/12
              hover:ring-navy/25 transition-all duration-200
              active:scale-95
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30
            "
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
          >
            <BurgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* Dropdown panel — mobile only */}
      <div
        id="mobile-nav-panel"
        className={`
          md:hidden overflow-hidden px-4
          transition-all duration-300
          ${mobileOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'}
        `}
        style={{ transitionTimingFunction: EASE }}
      >
        <div
          className="
            bg-white
            rounded-[24px] p-2 mb-3
            ring-1 ring-black/[0.06]
            shadow-[0_1px_2px_rgba(13,20,40,0.04),0_16px_32px_-8px_rgba(13,20,40,0.16)]
          "
        >
          <ul className="flex flex-col list-none m-0 p-0" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href + link.label}>
                <NavItem
                  link={link}
                  isActive={isLinkActive(link.href)}
                  onAiChatClick={link.href === '#' ? onAiChatClick : undefined}
                  onNavigate={closeMenu}
                  variant="mobile"
                />
              </li>
            ))}
          </ul>

          <Link
            href="/#contact"
            onClick={closeMenu}
            className="
              mt-1 flex items-center justify-center w-full
              px-[20px] py-[13px] rounded-[16px]
              bg-white ring-1 ring-navy/15
              text-navy text-[15px] font-semibold tracking-tight
              transition-all duration-200
              hover:bg-navy/[0.04] hover:ring-navy/25 active:scale-[0.98]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30
            "
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
