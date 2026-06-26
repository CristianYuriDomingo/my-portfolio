import { useEffect, useRef, useState, type RefObject } from 'react';

const SCROLL_THRESHOLD = 10;
const MD_BREAKPOINT = 768;

export function useScrollHide(disabled: boolean) {
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

export function useBodyScrollLock(locked: boolean) {
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

export function useBreakpointReset(close: () => void) {
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`);
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) close();
    };

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [close]);
}

export function useEscapeClose(active: boolean, close: () => void) {
  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, close]);
}

export function useNavbarHeight(ref: RefObject<HTMLElement>) {
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
