'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Clock, ChefHat, ArrowRight, ShoppingBag } from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'EB-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-8 animate-in fade-in duration-300">
      {/* Success Badge */}
      <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 mx-auto flex items-center justify-center shadow-lg">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
          Order Placed Successfully
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">
          We&apos;ve Received Your Order!
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          Our kitchen master is already prepping your artisan dishes with care.
        </p>
      </div>

      {/* Ticket Details Card */}
      <div className="p-6 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark text-left space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border-light dark:border-border-dark">
          <div>
            <span className="text-[11px] text-neutral-400 uppercase font-semibold">Order Reference</span>
            <div className="font-mono font-bold text-sm text-neutral-900 dark:text-white truncate max-w-[200px]">
              #{orderId}
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-ember/10 text-ember">
            Preparing
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
              <Clock className="w-3.5 h-3.5 text-ember" />
              <span>Estimated Delivery</span>
            </div>
            <div className="font-bold text-neutral-900 dark:text-white text-sm">
              25 – 35 Mins
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
              <ChefHat className="w-3.5 h-3.5 text-coral" />
              <span>Kitchen Status</span>
            </div>
            <div className="font-bold text-neutral-900 dark:text-white text-sm">
              In Kitchen
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/menu"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-ember to-coral text-white text-xs sm:text-sm font-semibold shadow-glow hover:opacity-95 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order More Dishes</span>
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        >
          <span>Back to Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-neutral-400">Loading order receipt...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
