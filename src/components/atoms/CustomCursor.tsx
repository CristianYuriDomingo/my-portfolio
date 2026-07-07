'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const frameX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 });
  const frameY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, [data-cursor-hover]'));
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const size = isHovering ? 44 : 24;
  const corner = isHovering ? 10 : 6;
  const color = isHovering ? '#0A0A0A' : '#888888';

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        x: frameX,
        y: frameY,
        translateX: '-50%',
        translateY: '-50%',
        width: size,
        height: size,
        transition: 'width 0.2s, height 0.2s',
      }}
    >
      <span
        className="absolute left-0 top-0"
        style={{
          width: corner,
          height: corner,
          borderTop: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
      <span
        className="absolute right-0 top-0"
        style={{
          width: corner,
          height: corner,
          borderTop: `1.5px solid ${color}`,
          borderRight: `1.5px solid ${color}`,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
      <span
        className="absolute bottom-0 left-0"
        style={{
          width: corner,
          height: corner,
          borderBottom: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
      <span
        className="absolute bottom-0 right-0"
        style={{
          width: corner,
          height: corner,
          borderBottom: `1.5px solid ${color}`,
          borderRight: `1.5px solid ${color}`,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
    </motion.div>
  );
}
