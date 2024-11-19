import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'leaflet/dist/leaflet.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Heritage Navigator - Tavira',
  description: 'Udforsk Taviras rige kulturarv',
  manifest: '/manifest.json',
  icons: {
    icon: '/heritage-compass.svg',
    apple: '/heritage-compass.svg',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1B365D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className="light">
      <head>
        <link rel="icon" href="/heritage-compass.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/heritage-compass.svg" />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}
