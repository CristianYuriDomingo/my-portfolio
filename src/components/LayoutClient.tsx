//src/components/LayoutClient.tsx
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Preloader from '@/components/organisms/Preloader';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [preloaderDone, setPreloaderDone] = useState(false);

  const isWorksSlug = pathname.startsWith('/works/');

  if (isWorksSlug) {
    return <main>{children}</main>;
  }

  return (
    <>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <main>{children}</main>
    </>
  );
}
