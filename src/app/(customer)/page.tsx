import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Flame, Clock, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-20">
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
              From charcoal-fired mains to delicate handcrafted desserts, discover artisan dining prepared fresh daily and delivered straight to your table.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-ember to-coral text-white font-semibold text-sm shadow-glow hover:opacity-95 transition-all transform hover:-translate-y-0.5"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#about"
                className="inline-flex items-center px-6 py-3.5 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-neutral-800 dark:text-neutral-200 font-semibold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
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
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Smoked and grilled over natural ember briquettes to seal in authentic, deep aromatic flavors.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-coral/10 text-coral flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Farm Fresh</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Locally sourced organic produce and high-grade cuts selected every morning by our executive chef.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-ember/10 text-ember flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Swift Delivery</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Packaged in custom insulated eco-friendly boxes so your meal arrives piping hot and restaurant-fresh.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
