import type {Metadata} from 'next';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lead Magnet — High-Converting Creator Landing Pages',
  description: 'Editorial, high-converting lead magnet landing page generator and previewer featuring Field Guide, Split Screen, Minimal Center, Dark Editorial, and Magazine layout variants.',
  openGraph: {
    title: 'Lead Magnet — High-Converting Creator Landing Pages',
    description: 'Editorial, high-converting lead magnet landing page generator and previewer featuring Field Guide, Split Screen, Minimal Center, Dark Editorial, and Magazine layout variants.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lead Magnet — High-Converting Creator Landing Pages',
    description: 'Editorial, high-converting lead magnet landing page generator and previewer featuring Field Guide, Split Screen, Minimal Center, Dark Editorial, and Magazine layout variants.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="antialiased selection:bg-blue-100 selection:text-blue-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
