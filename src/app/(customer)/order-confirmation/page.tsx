import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function OrderConfirmationPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500 mx-auto flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
        Order Received!
      </h1>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
        Thank you for ordering with EmberBistro. Our kitchen has received your ticket and is preparing your meal with care.
      </p>
      <div className="pt-4">
        <Link
          href="/menu"
          className="inline-flex px-6 py-3 rounded-2xl bg-ember hover:bg-ember-hover text-white text-sm font-semibold shadow-glow transition-all"
        >
          Return to Menu
        </Link>
      </div>
    </div>
  );
}
