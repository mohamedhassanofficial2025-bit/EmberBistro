'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Dish, DishCategory } from '@/types/database';
import { supabase } from '@/lib/supabase/client';
import DishCard from '@/components/customer/DishCard';
import DishDetailModal from '@/components/customer/DishDetailModal';
import { Search, UtensilsCrossed, Sparkles } from 'lucide-react';

interface MenuClientProps {
  initialDishes: Dish[];
}

const CATEGORIES: ('All' | DishCategory)[] = [
  'All',
  'Appetizers',
  'Main Course',
  'Desserts',
  'Drinks',
];

export default function MenuClient({ initialDishes }: MenuClientProps) {
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [selectedCategory, setSelectedCategory] = useState<'All' | DishCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalDish, setActiveModalDish] = useState<Dish | null>(null);

  // Sync if initialDishes changes (e.g. page navigation)
  useEffect(() => {
    setDishes(initialDishes);
  }, [initialDishes]);

  // Realtime subscription for instant live updates without page refresh
  useEffect(() => {
    const channel = supabase
      .channel('realtime:customer-menu-dishes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'dishes' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newDish = payload.new as Dish;
            if (newDish.available) {
              setDishes((prev) => [newDish, ...prev.filter((d) => d.id !== newDish.id)]);
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedDish = payload.new as Dish;
            setDishes((prev) => {
              if (!updatedDish.available) {
                return prev.filter((d) => d.id !== updatedDish.id);
              }
              const exists = prev.some((d) => d.id === updatedDish.id);
              if (exists) {
                return prev.map((d) => (d.id === updatedDish.id ? updatedDish : d));
              } else {
                return [updatedDish, ...prev];
              }
            });
          } else if (payload.eventType === 'DELETE') {
            const deletedId = (payload.old as { id?: string })?.id;
            if (deletedId) {
              setDishes((prev) => prev.filter((d) => d.id !== deletedId));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory =
        selectedCategory === 'All' || dish.category === selectedCategory;
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [dishes, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-ember text-white shadow-glow'
                    : 'bg-white dark:bg-surface-cardDark text-neutral-600 dark:text-neutral-300 border border-border-light dark:border-border-dark hover:border-ember'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search our dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredDishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish, index) => (
            <DishCard
              key={dish.id}
              dish={dish}
              priority={index < 4}
              onSelect={(selected) => setActiveModalDish(selected)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-border-light dark:border-border-dark bg-white/40 dark:bg-surface-cardDark/40 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 mx-auto flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-neutral-900 dark:text-white">
              No culinary dishes found
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
              We couldn&apos;t find any items matching &quot;{searchQuery}&quot; in the {selectedCategory} category.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ember/10 text-ember text-xs font-semibold hover:bg-ember hover:text-white transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        </div>
      )}

      {/* Detail Modal */}
      <DishDetailModal
        dish={activeModalDish}
        onClose={() => setActiveModalDish(null)}
      />
    </div>
  );
}
