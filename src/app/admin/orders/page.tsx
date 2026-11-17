import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Kitchen Order Pipeline
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Track tickets across New, Preparing, Ready, and Completed statuses.
        </p>
      </div>

      <div className="p-8 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark text-center space-y-2">
        <ShoppingBag className="w-8 h-8 text-neutral-400 mx-auto" />
        <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">Order management queue scaffolded</h3>
        <p className="text-xs text-neutral-500">Live order status mutations and detail popovers configured for Phase 3.</p>
      </div>
    </div>
  );
}
