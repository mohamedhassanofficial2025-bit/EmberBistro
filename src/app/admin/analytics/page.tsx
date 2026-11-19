'use client';

import React from 'react';
import { BarChart3, PieChart, Users, DollarSign, Calendar } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-10 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-light dark:border-border-dark">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Sales & Kitchen Analytics
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Revenue velocity, category sales breakdown, and peak dining hours.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark text-xs font-semibold text-neutral-600 dark:text-neutral-300">
          <Calendar className="w-3.5 h-3.5 text-ember" />
          <span>Last 30 Days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-7 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <span className="text-xs text-neutral-400 font-semibold">Average Ticket Size</span>
          <div className="text-2xl font-extrabold text-neutral-900 dark:text-white">$32.80</div>
          <span className="text-xs text-emerald-500 font-semibold">+12% vs last month</span>
        </div>

        <div className="p-7 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-ember/10 text-ember flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <span className="text-xs text-neutral-400 font-semibold">Top Selling Category</span>
          <div className="text-2xl font-extrabold text-neutral-900 dark:text-white">Main Course</div>
          <span className="text-xs text-ember font-semibold">58% of total volume</span>
        </div>

        <div className="p-7 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-coral/10 text-coral flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xs text-neutral-400 font-semibold">Returning Customers</span>
          <div className="text-2xl font-extrabold text-neutral-900 dark:text-white">74.2%</div>
          <span className="text-xs text-emerald-500 font-semibold">High loyalty retention</span>
        </div>
      </div>

      <div className="p-8 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card text-center space-y-3">
        <PieChart className="w-10 h-10 text-neutral-300 dark:text-neutral-600 mx-auto" />
        <h3 className="font-bold text-base text-neutral-800 dark:text-neutral-200">
          Advanced Charts & Recharts Integration Ready
        </h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          Time-series revenue trends and customer heatmaps are mapped to Supabase orders telemetry.
        </p>
      </div>
    </div>
  );
}
