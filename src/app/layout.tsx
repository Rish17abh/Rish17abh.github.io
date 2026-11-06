import type { Metadata } from 'next';
import '@fontsource-variable/newsreader/wght-italic.css';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navigation } from '@/components/navigation';
import { CursorCompanion } from '@/components/cursor-companion';
import { ScrollMotion } from '@/components/scroll-motion';

export const metadata: Metadata = {
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) } : {}),
  title: { default: 'Rishabh Ramteke — Business Intelligence, Data & AI', template: '%s · Rishabh Ramteke' },
  description: 'Business intelligence, data engineering and practical AI. Explore Rishabh Ramteke’s professional work and academic projects through interactive outcomes and case studies.',
  icons: { icon: '/icon.svg' },
  openGraph: { title: 'Rishabh Ramteke — Complex data. Clear decisions.', description: 'Business Intelligence Engineer | Data & AI', type: 'website', ...(process.env.NEXT_PUBLIC_SITE_URL ? { images: ['/social-card.png'] } : {}) },
  twitter: { card: 'summary_large_image' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><body><Providers><a className="skip-link" href="#main">Skip to content</a><div id="top"/><Navigation/>{children}<CursorCompanion/><ScrollMotion/></Providers></body></html>;
}
