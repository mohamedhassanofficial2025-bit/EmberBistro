import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
          Your Shopping Cart
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Review your selected items before proceeding to checkout.
        </p>
      </div>

      <div className="p-8 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark text-center space-y-4 shadow-card dark:shadow-cardDark">
        <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 mx-auto flex items-center justify-center">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Your cart is currently empty</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
          Explore our artisan menu to add your favorite starters, mains, and beverages.
        </p>
        <div className="pt-2">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-ember hover:bg-ember-hover text-white text-sm font-semibold shadow-glow transition-all"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
