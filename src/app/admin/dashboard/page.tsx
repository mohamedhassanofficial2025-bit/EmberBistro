import React from 'react';
import { DollarSign, ShoppingBag, Utensils, Clock, TrendingUp } from 'lucide-react';

export default function DashboardOverviewPage() {
  const stats = [
    { name: "Today's Revenue", value: '$1,248.50', change: '+14.2%', icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10' },
    { name: 'Total Orders', value: '38', change: '+8.1%', icon: ShoppingBag, color: 'text-ember bg-ember/10' },
    { name: 'Active Menu Items', value: '24', change: '4 categories', icon: Utensils, color: 'text-coral bg-coral/10' },
    { name: 'Pending Orders', value: '3', change: 'Requires prep', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Operations Overview
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Live snapshot of restaurant revenue, orders, and kitchen ticket queue.
        </p>
      </div>

      {/* Stats Cards Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="p-5 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  {stat.name}
                </span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                  {stat.value}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder table for recent orders */}
      <div className="p-6 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-4">
        <h2 className="font-bold text-base text-neutral-900 dark:text-white">
          Recent Incoming Orders
        </h2>
        <div className="text-xs text-neutral-500 dark:text-neutral-400 py-6 text-center">
          Order feed will update in real-time as tickets are placed through the customer app.
        </div>
      </div>
    </div>
  );
}
