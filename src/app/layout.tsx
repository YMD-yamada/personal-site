import type { Metadata } from 'next';
import { Outfit, Newsreader, IBM_Plex_Mono } from 'next/font/google';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { siteConfig } from '@/config/site';
import './globals.css';

const display = Newsreader({
  subsets: ['latin'],
  variable: '--font-display',
  style: ['normal', 'italic'],
});

const body = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brandName} — Portfolio`,
    template: `%s · ${siteConfig.brandName}`,
  },
  description: siteConfig.headline,
  metadataBase: new URL(siteConfig.publicBaseUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <div className="shell">
          <SiteHeader />
          <main className="main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
