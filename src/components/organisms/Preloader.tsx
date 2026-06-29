'use client';

import { useEffect, useState } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const count = useMotionValue(0);
  const [displayCount, setDisplayCount] = useState('00');
  const [isVisible, setIsVisible] = useState(true);
  const [sweeping, setSweeping] = useState(false);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 2.0,
      ease: [0.45, 0, 0.55, 1],
      onUpdate: (v) => {
        const rounded = Math.round(v);
        setDisplayCount(
          rounded >= 100 ? '100' : String(rounded).padStart(2, '0')
        );
      },
    });

    const curtainTimer = setTimeout(() => {
      setSweeping(true);
    }, 2200);

    return () => {
      controls.stop();
      clearTimeout(curtainTimer);
    };
  }, [count]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      <motion.div
        className="absolute inset-0 bg-white flex flex-col items-center justify-center"
        animate={sweeping ? { y: '-100%' } : { y: 0 }}
        transition={
          sweeping
            ? { duration: 1.1, ease: [0.45, 0, 0.55, 1] }
            : { duration: 0 }
        }
        onAnimationComplete={() => {
          if (sweeping) {
            setIsVisible(false);
            onComplete?.();
          }
        }}
      >
        {/* Logo */}
        <div className="relative text-center">
          <span
            className="block font-playfair italic font-bold text-[clamp(60px,10vw,116px)] tracking-tight text-[#d4d4d4]"
            aria-hidden="true"
          >
            CYD Creates
          </span>

          <motion.span
            className="absolute inset-0 block font-playfair italic font-bold text-[clamp(60px,10vw,116px)] tracking-tight text-[#0a0a0a] overflow-hidden whitespace-nowrap"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 2.0, ease: [0.45, 0, 0.55, 1] }}
          >
            CYD Creates
          </motion.span>
        </div>

        {/* Tagline */}
        <motion.p
          className="mt-5 font-sans font-light text-[clamp(11px,1.6vw,14px)] tracking-[0.28em] uppercase text-[#b0b0b0]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1.5 }}
        >
          Design &nbsp;·&nbsp; Development &nbsp;·&nbsp; Experience
        </motion.p>

        {/* Counter */}
        <div className="absolute bottom-8 font-sans font-light text-[15px] tracking-[0.1em] text-[#c0c0c0]">
          {displayCount}
        </div>
      </motion.div>
    </div>
  );
}
