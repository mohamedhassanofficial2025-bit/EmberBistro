import React from 'react';
import { supabase } from '@/lib/supabase/client';
import { Dish } from '@/types/database';
import MenuClient from '@/components/customer/MenuClient';

export const revalidate = 5;

export default async function MenuPage() {
  const { data: dishes } = await supabase
    .from('dishes')
    .select('*')
    .eq('available', true)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
          Our Culinary Menu
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Crafted fresh daily, smoked over natural charcoal embers, and seasoned to perfection.
        </p>
      </div>

      {/* Interactive Client View */}
      <MenuClient initialDishes={(dishes as Dish[]) || []} />
    </div>
  );
}
