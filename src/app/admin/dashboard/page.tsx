'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order } from '@/types/database';
import {
  DollarSign,
  ShoppingBag,
  Utensils,
  Clock,
  TrendingUp,
  ArrowRight,
  Plus,
  RefreshCw,
} from 'lucide-react';

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  activeDishes: number;
}

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    activeDishes: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, ordersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/orders'),
      ]);

      const statsJson = await statsRes.json();
      const ordersJson = await ordersRes.json();

      if (statsJson.success) setStats(statsJson.data);
      if (ordersJson.success) setRecentOrders(ordersJson.data.slice(0, 5));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const statCards = [
    {
      name: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      detail: 'Lifetime gross revenue',
      icon: DollarSign,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      name: 'Total Orders',
      value: stats.totalOrders.toString(),
      detail: 'Placed by customers',
      icon: ShoppingBag,
      color: 'text-ember bg-ember/10',
    },
    {
      name: 'Pending Orders',
      value: stats.pendingOrders.toString(),
      detail: 'Awaiting prep or pickup',
      icon: Clock,
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      name: 'Active Menu Items',
      value: stats.activeDishes.toString(),
      detail: 'Available on menu',
      icon: Utensils,
      color: 'text-coral bg-coral/10',
    },
  ];

  return (
    <div className="space-y-10 w-full">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-light dark:border-border-dark">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Operations & Performance
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Real-time analytics and quick kitchen controls.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            aria-label="Refresh stats"
            className="p-3 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark text-neutral-600 dark:text-neutral-300 hover:text-ember transition-colors shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            href="/admin/menu"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-ember to-coral text-white text-xs font-semibold shadow-glow hover:opacity-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Menu</span>
          </Link>
        </div>
      </div>

      {/* Bento Grid Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="p-6 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-4 hover:shadow-glow/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  {stat.name}
                </span>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                  {stat.value}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>{stat.detail}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Queue */}
      <div className="p-7 sm:p-8 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base text-neutral-900 dark:text-white">
              Latest Incoming Orders
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Customer tickets placed through the ordering app.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-ember hover:underline flex items-center gap-1"
          >
            <span>View all orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-12 text-xs text-neutral-400 space-y-2">
            <ShoppingBag className="w-8 h-8 mx-auto text-neutral-300 dark:text-neutral-600" />
            <p>No orders recorded yet. Place a test order from the website!</p>
          </div>
        ) : (
          <div className="divide-y divide-border-light dark:divide-border-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-surface-cardDark hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-colors text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-neutral-900 dark:text-white">
                      #{order.id.slice(0, 8)}
                    </span>
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                      {order.customer_name}
                    </span>
                  </div>
                  <div className="text-neutral-400 line-clamp-1 max-w-sm">
                    {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5">
                  <div className="text-right">
                    <span className="font-extrabold text-sm text-neutral-900 dark:text-white block">
                      ${Number(order.total).toFixed(2)}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-neutral-400">
                      {order.payment_method}
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                      order.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : order.status === 'Cancelled'
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}
                  >
                    {order.status}
                  </span>

                  <Link
                    href="/admin/orders"
                    className="p-1.5 rounded-lg border border-border-light dark:border-border-dark text-neutral-400 hover:text-ember transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
