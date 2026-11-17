'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/dashboard/Sidebar';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Loader2, ShieldCheck, ArrowLeft, Menu } from 'lucide-react';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAdminAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Auto-close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Auth gate for non-login admin pages
  useEffect(() => {
    if (pathname !== '/admin/login' && !isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [pathname, isLoading, isAuthenticated, router]);

  // If on login page, render clean standalone view without dashboard chrome
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="flex flex-col items-center gap-3 text-neutral-400">
          <Loader2 className="w-8 h-8 animate-spin text-ember" />
          <span className="text-xs font-semibold">Validating owner session...</span>
        </div>
      </div>
    );
  }

  // Unauthorized fallback (will redirect via useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex overflow-x-hidden">
      {/* Auto-Hover Expandable Sidebar & Mobile Drawer */}
      <DashboardSidebar
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 pl-0 md:pl-20 transition-all duration-300">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-border-light dark:border-border-dark bg-white/85 dark:bg-surface-dark/85 backdrop-blur-xl px-4 sm:px-6 md:px-10 flex items-center justify-between">
          {/* Left: Mobile hamburger menu & Back to Storefront button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="p-2 -ml-1 rounded-xl text-neutral-600 dark:text-neutral-300 hover:text-ember hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors md:hidden focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-cardDark text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-ember hover:border-ember transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Storefront</span>
              <span className="sm:hidden">Store</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 pl-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Kitchen Live
              </span>
            </div>
          </div>

          {/* Right: Owner Profile & Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-cardDark text-xs shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-ember" />
              <span className="font-semibold text-neutral-900 dark:text-white truncate max-w-[120px] sm:max-w-none">
                {user?.name || 'Owner'}
              </span>
            </div>
          </div>
        </header>

        {/* Content Area with generous spacious margins & padding */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 max-w-7xl w-full mx-auto space-y-10">
          {children}
        </main>
      </div>
    </div>
  );
}
