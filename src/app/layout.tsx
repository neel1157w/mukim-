
"use client"
import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const metadataConfig: Metadata = {
  title: 'ReWear Hub',
  description: 'Swap, Style, Sustain. A marketplace for second-hand fashion.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideHeaderFooter = ['/login', '/register'].includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{String(metadataConfig.title)}</title>
        <meta name="description" content={String(metadataConfig.description)} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-screen">
          {!hideHeaderFooter && <Header />}
          <main className={`flex-grow ${!hideHeaderFooter ? 'container mx-auto px-4 sm:px-6 lg:px-8' : ''}`}>
            {children}
          </main>
          {!hideHeaderFooter && <Footer />}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
