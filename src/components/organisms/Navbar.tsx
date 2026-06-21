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
      className="rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
    >
      <div className="relative w-[42px] h-[42px] rounded-[8px] overflow-hidden flex-shrink-0">
        <Image
          src="/images/logo/cyd-logo.png"
          alt="CYD"
          fill
          sizes="42px"
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

  const desktopClass = `flex items-center px-[16px] py-[6px] rounded-full text-[14.5px] font-medium tracking-tight text-navy transition-colors duration-200 whitespace-nowrap active:scale-[0.97] hover:bg-navy/[0.045] ${focusRing}`;
  const mobileClass = `flex items-center w-full px-[16px] py-[12px] rounded-[16px] text-[16px] font-medium tracking-tight text-navy transition-colors duration-200 active:scale-[0.98] hover:bg-navy/[0.045] ${focusRing}`;

  const base = variant === 'mobile' ? mobileClass : desktopClass;
  const activeClass =
    variant === 'mobile'
      ? 'bg-[#FCDB32]/25 font-semibold'
      : 'bg-navy/[0.07] font-semibold';

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
        fixed top-4 left-0 right-0 z-50
        flex justify-center px-4
        transition-transform duration-500
        ${visible ? 'translate-y-0' : '-translate-y-[calc(100%+1rem)]'}
      `}
      style={{ transitionTimingFunction: EASE }}
      role="banner"
    >
      <div className="w-full max-w-[420px] md:w-auto md:max-w-none">
        <nav
          className="
            flex items-center justify-between md:inline-flex
            w-full md:w-auto
            bg-white/75 backdrop-blur-xl backdrop-saturate-150
            rounded-full
            pl-[20px] md:pl-[36px] pr-[14px] md:pr-[28px] py-[8px]
            ring-1 ring-black/[0.06]
            shadow-[0_1px_2px_rgba(13,20,40,0.04),0_8px_24px_-8px_rgba(13,20,40,0.12)]
          "
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Logo />

          {/* Divider — desktop only */}
          <div
            className="hidden md:block w-px h-[22px] bg-navy/15 mx-4 flex-shrink-0"
            aria-hidden="true"
          />

          {/* Nav links — desktop only */}
          <ul
            className="hidden md:flex items-center list-none m-0 p-0"
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

          {/* Contact CTA — desktop only */}
          <Link
            href="/#contact"
            className="
              hidden md:inline-flex
              ml-2 px-[20px] py-[7px] rounded-full
              bg-navy text-white
              text-[15px] font-semibold tracking-tight
              whitespace-nowrap
              transition-all duration-200 ease-out
              hover:opacity-90 active:scale-[0.97]
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
              w-9 h-9 rounded-full flex-shrink-0
              hover:bg-navy/[0.06] transition-colors duration-200
              active:scale-95
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30
            "
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
          >
            <BurgerIcon open={mobileOpen} />
          </button>
        </nav>

        {/* Dropdown panel — mobile only */}
        <div
          id="mobile-nav-panel"
          className={`
            md:hidden overflow-hidden
            transition-all duration-300
            ${mobileOpen ? 'max-h-[420px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}
          `}
          style={{ transitionTimingFunction: EASE }}
        >
          <div
            className="
              bg-white/85 backdrop-blur-xl backdrop-saturate-150
              rounded-[24px] p-2
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
                    onAiChatClick={
                      link.href === '#' ? onAiChatClick : undefined
                    }
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
                px-[20px] py-[12px] rounded-[16px]
                bg-navy text-white
                text-[15px] font-semibold tracking-tight
                transition-opacity duration-200
                hover:opacity-90 active:scale-[0.98]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30
              "
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
