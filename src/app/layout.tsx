import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { AdminAuthProvider } from '@/context/AdminAuthContext';

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-ember/20 selection:text-ember">
        <ThemeProvider>
          <SettingsProvider>
            <ToastProvider>
              <CartProvider>
                <AdminAuthProvider>
                  {children}
                </AdminAuthProvider>
              </CartProvider>
            </ToastProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
