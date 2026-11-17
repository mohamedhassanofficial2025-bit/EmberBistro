import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EmberBistro — Artisan Flavors & Contemporary Dining',
  description: 'Experience handcrafted cuisine, fresh locally sourced dishes, and seamless online ordering.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="antialiased selection:bg-ember/20 selection:text-ember">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
