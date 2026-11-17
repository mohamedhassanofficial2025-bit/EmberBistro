'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Utensils,
  ShoppingBag,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Menu Management', href: '/admin/menu', icon: Utensils },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 min-h-screen border-r border-border-light dark:border-border-dark bg-white dark:bg-surface-dark flex flex-col justify-between p-4 transition-colors duration-200">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between px-2 pt-2">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-ember to-coral flex items-center justify-center text-white shadow-glow">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base tracking-tight text-neutral-900 dark:text-white leading-tight">
                Ember<span className="text-ember">Manager</span>
              </h2>
              <span className="text-[11px] text-neutral-400 font-medium">Owner Portal</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-ember text-white shadow-glow'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-ember'}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="space-y-2 pt-4 border-t border-border-light dark:border-border-dark">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-400" />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </div>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">{theme}</span>
        </button>

        {/* Back to store */}
        <Link
          href="/"
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
        >
          <Utensils className="w-4 h-4 text-neutral-400" />
          <span>Customer View</span>
        </Link>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem('admin_token');
            window.location.href = '/admin/login';
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
