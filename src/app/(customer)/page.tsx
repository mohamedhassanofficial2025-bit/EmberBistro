import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { Dish } from '@/types/database';
import { ArrowRight, Sparkles, Flame, Clock, Award, Star } from 'lucide-react';

export const revalidate = 5;

export default async function HomePage() {
  const { data: popularDishes } = await supabase
    .from('dishes')
    .select('*')
    .eq('available', true)
    .limit(3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-light dark:border-border-dark bg-white/80 dark:bg-surface-cardDark/80 text-xs font-semibold text-ember shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Modern Culinary Excellence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              Flavors Crafted to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember to-coral">
                Ignite Your Senses
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              From charcoal-fired ribeyes to handcrafted artisanal pastries, discover contemporary dining prepared fresh daily and delivered straight to your door.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-ember to-coral text-white font-semibold text-sm shadow-glow hover:opacity-95 transition-all transform hover:-translate-y-0.5"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cart"
                className="inline-flex items-center px-7 py-3.5 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-neutral-800 dark:text-neutral-200 font-semibold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Chef Specials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ember flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-ember" />
              <span>Chef Selections</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mt-1">
              Popular Menu Highlights
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-xs font-semibold text-ember hover:underline flex items-center gap-1"
          >
            <span>Browse all dishes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDishes && popularDishes.length > 0 ? (
            popularDishes.map((dish: Dish) => (
              <div
                key={dish.id}
                className="group p-5 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-4 hover:shadow-glow/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-ember/10 text-ember">
                      {dish.category}
                    </span>
                    <span className="font-bold text-lg text-neutral-900 dark:text-white">
                      ${Number(dish.price).toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-neutral-900 dark:text-white group-hover:text-ember transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <Link
                  href="/menu"
                  className="w-full py-2.5 rounded-xl bg-ember hover:bg-ember-hover text-white text-xs font-semibold shadow-sm transition-colors text-center block"
                >
                  Order on Menu
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-sm text-neutral-400">
              Loading popular dishes...
            </div>
          )}
        </div>
      </section>

      {/* Highlights Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-ember/10 text-ember flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Charcoal Fired</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Smoked and grilled over natural ember briquettes to seal in authentic, deep aromatic flavors.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-coral/10 text-coral flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Farm Fresh</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Locally sourced organic produce and high-grade cuts selected every morning by our executive chef.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-ember/10 text-ember flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Swift Delivery</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Packaged in custom insulated boxes so your meal arrives piping hot and restaurant-fresh.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
