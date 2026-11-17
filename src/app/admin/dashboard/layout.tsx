'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/dashboard/Sidebar';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Loader2, ShieldCheck, ArrowLeft, Store } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, router]);

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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex">
      {/* Auto-Hover Expandable Sidebar */}
      <DashboardSidebar />

      {/* Main Container with generous left offset for sidebar */}
      <div className="flex-1 flex flex-col min-w-0 pl-20 transition-all duration-300">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-border-light dark:border-border-dark bg-white/80 dark:bg-surface-dark/80 backdrop-blur-xl px-6 md:px-10 flex items-center justify-between">
          {/* Left: Quick Back to Storefront button */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-cardDark text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-ember hover:border-ember transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
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
              <span className="font-semibold text-neutral-900 dark:text-white">
                {user?.name || 'Owner'}
              </span>
            </div>
          </div>
        </header>

        {/* Content Area with generous spacious margins & padding */}
        <main className="flex-1 px-6 py-8 md:px-12 md:py-12 max-w-7xl w-full mx-auto space-y-10">
          {children}
        </main>
      </div>
    </div>
  );
}
