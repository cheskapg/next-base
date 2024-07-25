import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './Providers';
import Head from 'next/head';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'NextJS Base',
  description: 'NextJS base setup',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
    
      <body>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
