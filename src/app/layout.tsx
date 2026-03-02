import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import { Toaster } from 'sonner';
import '@/styles/globals.css';
import { Header } from '@/components/header';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['700'],
});

export const metadata: Metadata = {
  title: 'Pet World',
  description:
    'Here you can see all the clients and services scheduled for today.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${interTight.variable} antialiased`}>
        <Header />

        <main className="flex flex-1 flex-col mt-12 max-w-3xl mx-auto">
          {children}
          <Toaster position="top-right" />
        </main>
      </body>
    </html>
  );
}
