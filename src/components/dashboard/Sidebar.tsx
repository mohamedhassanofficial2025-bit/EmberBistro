'use client';

import React, { useState } from 'react';
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
  ArrowLeft,
  Pin,
  PinOff,
  Store,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAdminAuth();

  // Hover and Pin states
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const isExpanded = isPinned || isHovered;

  const menuItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Menu Catalog', href: '/admin/menu', icon: Utensils },
    { name: 'Orders Pipeline', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 bottom-0 z-40 h-screen border-r border-border-light dark:border-border-dark bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl flex flex-col justify-between py-6 transition-all duration-300 ease-in-out shadow-2xl ${
        isExpanded ? 'w-64 px-4' : 'w-20 px-3'
      }`}
    >
      <div className="space-y-6">
        {/* Brand & Pin Button */}
        <div className="flex items-center justify-between px-1">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 overflow-hidden group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-ember to-coral flex items-center justify-center text-white shadow-glow shrink-0 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            {isExpanded && (
              <div className="animate-in fade-in duration-200 whitespace-nowrap">
                <h2 className="font-extrabold text-base tracking-tight text-neutral-900 dark:text-white leading-tight">
                  Ember<span className="text-ember">Manager</span>
                </h2>
                <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                  Kitchen Portal
                </span>
              </div>
            )}
          </Link>

          {isExpanded && (
            <button
              onClick={() => setIsPinned(!isPinned)}
              title={isPinned ? 'Unpin (Auto-collapse on mouse leave)' : 'Pin sidebar open'}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-ember hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors animate-in fade-in"
            >
              {isPinned ? <PinOff className="w-4 h-4 text-ember" /> : <Pin className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Quick Return to Store Button (Prominent) */}
        <Link
          href="/"
          title="Back to Customer Website"
          className={`flex items-center gap-3 p-2.5 rounded-2xl border border-ember/20 bg-ember/5 text-ember hover:bg-ember hover:text-white transition-all group overflow-hidden ${
            !isExpanded ? 'justify-center' : ''
          }`}
        >
          <Store className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
          {isExpanded && (
            <div className="animate-in fade-in duration-200 whitespace-nowrap flex items-center justify-between flex-1 text-xs font-bold">
              <span>Customer Website</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </div>
          )}
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1.5 pt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={item.name}
                className={`flex items-center gap-3.5 px-3 py-3 rounded-2xl text-xs font-semibold transition-all group overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-ember to-coral text-white shadow-glow'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 hover:text-neutral-900 dark:hover:text-white'
                } ${!isExpanded ? 'justify-center' : 'justify-between'}`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-neutral-400 group-hover:text-ember'
                    }`}
                  />
                  {isExpanded && (
                    <span className="animate-in fade-in duration-200 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>
                {isExpanded && isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="space-y-2 pt-4 border-t border-border-light dark:border-border-dark">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 transition-colors ${
            !isExpanded ? 'justify-center' : 'justify-between'
          }`}
        >
          <div className="flex items-center gap-3">
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-400 shrink-0" />
            )}
            {isExpanded && (
              <span className="animate-in fade-in duration-200 whitespace-nowrap">
                {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
              </span>
            )}
          </div>
          {isExpanded && (
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
              {theme}
            </span>
          )}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          title="Sign Out of Dashboard"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ${
            !isExpanded ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {isExpanded && (
            <span className="animate-in fade-in duration-200 whitespace-nowrap">
              Sign Out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
