import React from 'react';
import { Plus, Filter } from 'lucide-react';

export default function AdminMenuPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Menu Catalog Management
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Create, update dish pricing, categorize items, or toggle daily availability.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ember hover:bg-ember-hover text-white text-xs font-semibold shadow-glow transition-all">
          <Plus className="w-4 h-4" />
          <span>Add New Dish</span>
        </button>
      </div>

      <div className="p-8 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark text-center space-y-2">
        <Filter className="w-8 h-8 text-neutral-400 mx-auto" />
        <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">Menu items table ready for Phase 3</h3>
        <p className="text-xs text-neutral-500">Connected to the MongoDB Dish collection model.</p>
      </div>
    </div>
  );
}
