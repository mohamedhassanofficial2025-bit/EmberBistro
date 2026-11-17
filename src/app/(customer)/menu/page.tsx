import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function MenuPage() {
  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Drinks'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
          Our Culinary Menu
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Explore our handcrafted selection of chef specialties, sides, and beverages.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                idx === 0
                  ? 'bg-ember text-white shadow-glow'
                  : 'bg-white dark:bg-surface-cardDark text-neutral-600 dark:text-neutral-300 border border-border-light dark:border-border-dark hover:border-ember'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search dishes..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember transition-all"
          />
        </div>
      </div>

      {/* Menu Grid Placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="p-5 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-4 hover:shadow-glow/20 transition-all"
          >
            <div className="w-full h-44 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 text-xs">
              Dish Image
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-ember/10 text-ember">
                Main Course
              </span>
              <span className="font-bold text-base text-neutral-900 dark:text-white">
                $18.50
              </span>
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Smoked Ember Sirloin #{item}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1">
                Tender char-grilled cut paired with rosemary garlic baby potatoes and signature reduction.
              </p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-ember hover:bg-ember-hover text-white text-xs font-semibold shadow-sm transition-colors">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
