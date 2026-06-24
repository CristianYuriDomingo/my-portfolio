import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Bebas_Neue } from 'next/font/google';
import './globals.css';

// ─── Fonts ────────────────────────────────────────────────────────────────────

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
// TODO: update metadataBase with your real domain before deploying

export const metadata: Metadata = {
  title: {
    default: 'CYD Portfolio — Infinite by Design',
    template: '%s | CYD Portfolio',
  },
  description:
    'Portfolio of Cristian Yuri Domingo — Infinite by Design, Build Without Limits.',
  metadataBase: new URL('https://localhost:3000'),
  openGraph: {
    title: 'CYD Portfolio — Infinite by Design',
    description:
      'Portfolio of Cristian Yuri Domingo — Infinite by Design, Build Without Limits.',
    siteName: 'CYD Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CYD Portfolio — Infinite by Design',
    description:
      'Portfolio of Cristian Yuri Domingo — Infinite by Design, Build Without Limits.',
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${bebasNeue.variable}
          font-sans antialiased
          bg-background text-foreground
        `}
      >
        {children}
      </body>
    </html>
  );
}
