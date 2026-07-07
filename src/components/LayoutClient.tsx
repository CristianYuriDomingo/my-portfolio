//src/components/LayoutClient.tsx
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Preloader from '@/components/organisms/Preloader';
import CustomCursor from '@/components/atoms/CustomCursor';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [preloaderDone, setPreloaderDone] = useState(false);

  const isWorksSlug = pathname.startsWith('/works/');

  if (isWorksSlug) {
    return (
      <>
        <CustomCursor />
        <main>{children}</main>
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <main>{children}</main>
    </>
  );
}
