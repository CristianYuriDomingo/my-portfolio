'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════════

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  onAiChatClick?: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════════════════════

const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Works', href: '/works' },
  { label: 'Services', href: '/#services' },
  { label: 'Ask AI', href: '#' },
  { label: 'Contact', href: '/#contact' },
];

const SCROLL_THRESHOLD = 10;
const MD_BREAKPOINT = 768;

const EASE_OUT = 'cubic-bezier(0.32, 0.72, 0, 1)';
const EASE_IN = 'cubic-bezier(0.50, 0, 0.75, 0)';

const FONT_LIGHT: React.CSSProperties = {
  fontFamily: 'var(--font-geist-sans)',
  fontWeight: 300,
};

const FONT_SEMI: React.CSSProperties = {
  fontFamily: 'var(--font-geist-sans)',
  fontWeight: 600,
};

// ═══════════════════════════════════════════════════════════════════════════════
// Utilities
// ═══════════════════════════════════════════════════════════════════════════════

/** Joins class names, filtering out falsy values. */
const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

/** Checks if a nav link matches the current route. */
const isRouteActive = (href: string, pathname: string) =>
  href !== '#' && (href === '/' ? pathname === '/' : pathname.startsWith(href));

/** Returns the appropriate font style based on active state. */
const fontFor = (active: boolean) => (active ? FONT_SEMI : FONT_LIGHT);

// ═══════════════════════════════════════════════════════════════════════════════
// Hooks
// ═══════════════════════════════════════════════════════════════════════════════

/** Hides navbar on scroll-down, reveals on scroll-up. */
function useScrollHide(disabled: boolean) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    if (disabled) return;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (delta > SCROLL_THRESHOLD) setVisible(false);
      if (delta < -SCROLL_THRESHOLD) setVisible(true);

      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [disabled]);

  return visible;
}

/** Prevents body scroll when the mobile menu is open. */
function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const scrollbarGap =
      window.innerWidth - document.documentElement.clientWidth;
    const { body } = document;

    Object.assign(body.style, {
      position: 'fixed',
      top: `-${scrollY}px`,
      left: '0',
      right: '0',
      paddingRight: `${scrollbarGap}px`,
    });

    return () => {
      Object.assign(body.style, {
        position: '',
        top: '',
        left: '',
        right: '',
        paddingRight: '',
      });
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}

/** Closes mobile menu when viewport crosses the md breakpoint. */
function useBreakpointReset(close: () => void) {
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`);
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) close();
    };

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [close]);
}

/** Closes mobile menu on Escape key. */
function useEscapeClose(active: boolean, close: () => void) {
  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, close]);
}

/** Syncs a CSS custom property with the navbar's measured height. */
function useNavbarHeight(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = () =>
      document.documentElement.style.setProperty(
        '--navbar-h',
        `${el.offsetHeight}px`
      );

    sync();
    window.addEventListener('resize', sync, { passive: true });
    return () => window.removeEventListener('resize', sync);
  }, [ref]);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ size = 46 }: { size?: number }) {
  return (
    <Link
      href="/"
      aria-label="CYD Portfolio — home"
      className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/20"
    >
      <div
        className="relative overflow-hidden"
        style={{ width: size, height: size }}
      >
        <Image
          src="/images/logo/cyd-logo.png"
          alt="CYD"
          fill
          sizes={`${size}px`}
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={cx('flex items-center gap-[7px]', className)}
      aria-label="Status: Available for work"
    >
      <span className="relative flex h-[7px] w-[7px]">
        <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-emerald-500" />
      </span>
      <span
        className="text-[12px] uppercase tracking-[0.1em] text-navy/50 whitespace-nowrap"
        style={FONT_LIGHT}
      >
        Available for Work
      </span>
    </div>
  );
}

// ─── Desktop nav link ─────────────────────────────────────────────────────────

function DesktopNavLink({
  link,
  active,
  onAiClick,
}: {
  link: NavLink;
  active: boolean;
  onAiClick?: () => void;
}) {
  const cls = cx(
    'inline-flex items-center py-1.5',
    'text-[12px] tracking-[0.12em] uppercase whitespace-nowrap',
    'transition-colors duration-200 active:scale-[0.97]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/20',
    active ? 'text-navy' : 'text-navy/50 hover:text-navy'
  );

  if (link.href === '#') {
    return (
      <button
        onClick={onAiClick}
        className={cls}
        style={fontFor(active)}
        aria-label="Open AI Chat"
      >
        {link.label}
      </button>
    );
  }

  return (
    <Link href={link.href} className={cls} style={fontFor(active)}>
      {link.label}
    </Link>
  );
}

// ─── Burger button ────────────────────────────────────────────────────────────

function BurgerButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const barBase: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '1.5px',
    backgroundColor: 'white',
    borderRadius: '9999px',
    transitionProperty: 'all',
    transitionDuration: '450ms',
    transitionTimingFunction: EASE_OUT,
  };

  return (
    <button
      onClick={onToggle}
      className={cx(
        'md:hidden relative flex items-center justify-center',
        'w-9 h-9 flex-shrink-0 bg-black',
        'hover:bg-black/85 active:scale-[0.92]',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30'
      )}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls="mobile-nav-panel"
    >
      <span className="relative w-[18px] h-[12px] block">
        {/* Top bar → rotates to \ */}
        <span
          style={{
            ...barBase,
            top: open ? '50%' : '0%',
            transform: open
              ? 'translateY(-50%) rotate(45deg)'
              : 'translateY(0) rotate(0)',
          }}
        />

        {/* Middle bar → fades out */}
        <span
          style={{
            ...barBase,
            top: '50%',
            opacity: open ? 0 : 1,
            transform: open
              ? 'translateY(-50%) scaleX(0)'
              : 'translateY(-50%) scaleX(1)',
            transitionDuration: '300ms',
          }}
        />

        {/* Bottom bar → rotates to / */}
        <span
          style={{
            ...barBase,
            ...(open
              ? { top: '50%', transform: 'translateY(-50%) rotate(-45deg)' }
              : {
                  top: 'auto',
                  bottom: '0%',
                  transform: 'translateY(0) rotate(0)',
                }),
          }}
        />
      </span>
    </button>
  );
}

// ─── Mobile dropdown ──────────────────────────────────────────────────────────

function MobileDropdown({
  open,
  onClose,
  pathname,
  onAiClick,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  onAiClick?: () => void;
}) {
  // Prevent initial flash — don't render until first open
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  if (!mounted) return null;

  const totalLinks = NAV_LINKS.length;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className={cx(
          'fixed inset-0 z-[45] md:hidden',
          'bg-black/20 backdrop-blur-[3px]',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        style={{
          opacity: open ? 1 : 0,
          transition: `opacity ${open ? '500ms' : '350ms'} ${open ? EASE_OUT : EASE_IN}`,
        }}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* ── Panel ── */}
      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
        className="fixed left-0 right-0 z-[48] md:hidden overflow-hidden pointer-events-none"
        style={{ top: 'var(--navbar-h, 65px)' }}
      >
        {/* Curtain reveal via CSS grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: open ? '1fr' : '0fr',
            transition: `grid-template-rows ${open ? '500ms' : '380ms'} ${open ? EASE_OUT : EASE_IN}`,
          }}
        >
          <div className="overflow-hidden">
            <div
              className="bg-[#F8F8F8] shadow-xl pointer-events-auto"
              style={{
                opacity: open ? 1 : 0,
                transition: `opacity ${open ? '350ms' : '250ms'} ${open ? EASE_OUT : EASE_IN}`,
              }}
            >
              <nav aria-label="Mobile navigation">
                <ul className="list-none m-0 p-0">
                  {NAV_LINKS.map((link, i) => (
                    <MobileNavItem
                      key={link.label}
                      link={link}
                      index={i}
                      totalLinks={totalLinks}
                      open={open}
                      active={isRouteActive(link.href, pathname)}
                      onClose={onClose}
                      onAiClick={link.href === '#' ? onAiClick : undefined}
                    />
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div
                className="px-6 py-3.5"
                style={{
                  opacity: open ? 1 : 0,
                  transition: `opacity 350ms ${EASE_OUT} ${open ? '180ms' : '0ms'}`,
                }}
              >
                <StatusBadge />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Mobile nav item ──────────────────────────────────────────────────────────

function MobileNavItem({
  link,
  index,
  totalLinks,
  open,
  active,
  onClose,
  onAiClick,
}: {
  link: NavLink;
  index: number;
  totalLinks: number;
  open: boolean;
  active: boolean;
  onClose: () => void;
  onAiClick?: () => void;
}) {
  const cls = cx(
    'flex items-center w-full',
    'px-6 py-[16px]',
    'border-b border-navy/[0.06]',
    'text-[11.5px] tracking-[0.14em] uppercase',
    'transition-colors duration-150',
    'focus-visible:outline-none',
    active
      ? 'text-navy bg-[#FCDB32]/[0.08]'
      : 'text-navy/45 hover:text-navy hover:bg-navy/[0.02] active:bg-navy/[0.04]'
  );

  // Open: stagger top→bottom. Close: stagger bottom→top (reverse).
  const delay = open ? `${index * 45}ms` : `${(totalLinks - 1 - index) * 25}ms`;

  const staggerStyle: React.CSSProperties = {
    ...fontFor(active),
    opacity: open ? 1 : 0,
    transform: open ? 'translateY(0)' : 'translateY(-8px)',
    transition: [
      `opacity ${open ? '350ms' : '200ms'} ${EASE_OUT} ${delay}`,
      `transform ${open ? '400ms' : '200ms'} ${EASE_OUT} ${delay}`,
    ].join(', '),
  };

  const handleClick = () => {
    onAiClick?.();
    onClose();
  };

  if (link.href === '#') {
    return (
      <li>
        <button
          onClick={handleClick}
          className={cls}
          style={{ ...staggerStyle, width: '100%', textAlign: 'left' }}
        >
          {link.label}
        </button>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={link.href}
        onClick={onClose}
        className={cls}
        style={staggerStyle}
      >
        {link.label}
      </Link>
    </li>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main Navbar
// ═══════════════════════════════════════════════════════════════════════════════

export default function Navbar({ onAiChatClick }: NavbarProps) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);

  const navVisible = useScrollHide(mobileOpen);

  // Close on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  // Close when resizing past desktop breakpoint
  useBreakpointReset(closeMobile);

  // Lock body scroll while open
  useBodyScrollLock(mobileOpen);

  // Close on Escape
  useEscapeClose(mobileOpen, closeMobile);

  // Keep --navbar-h in sync for dropdown positioning
  useNavbarHeight(headerRef);

  return (
    <>
      {/* ── Navbar ── */}
      <header
        ref={headerRef}
        className={cx(
          'fixed top-0 left-0 right-0 z-50',
          'bg-[#F8F8F8]/95 backdrop-blur-md',
          'border-b border-navy/[0.06]',
          'transition-transform duration-500',
          navVisible || mobileOpen ? 'translate-y-0' : '-translate-y-full'
        )}
        style={{ transitionTimingFunction: EASE_OUT }}
        role="banner"
      >
        <div className="relative flex items-center justify-between max-w-7xl mx-auto px-6 md:px-12 py-2.5">
          {/* Left: Logo */}
          <Logo size={46} />

          {/* Center: Desktop links */}
          <ul
            className="hidden md:flex items-center gap-9 list-none m-0 p-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            role="list"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <DesktopNavLink
                  link={link}
                  active={isRouteActive(link.href, pathname)}
                  onAiClick={link.href === '#' ? onAiChatClick : undefined}
                />
              </li>
            ))}
          </ul>

          {/* Right: Badge + Burger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <StatusBadge className="hidden lg:flex" />
            <BurgerButton open={mobileOpen} onToggle={toggleMobile} />
          </div>
        </div>
      </header>

      {/* ── Mobile dropdown ── */}
      <MobileDropdown
        open={mobileOpen}
        onClose={closeMobile}
        pathname={pathname}
        onAiClick={onAiChatClick}
      />
    </>
  );
}
