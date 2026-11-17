import React from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
          Secure Checkout
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Provide your delivery details and choose your preferred payment option.
        </p>
      </div>

      <div className="p-8 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark text-center space-y-4">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Add items to your cart to proceed with checkout.
        </p>
        <Link
          href="/menu"
          className="inline-block px-5 py-2.5 rounded-xl bg-ember text-white text-xs font-semibold"
        >
          Go to Menu
        </Link>
      </div>
    </div>
  );
}
