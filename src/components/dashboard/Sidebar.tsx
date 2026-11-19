'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  X,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useSettings } from '@/context/SettingsContext';

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function DashboardSidebar({
  isMobileOpen = false,
  onMobileClose = () => {},
}: SidebarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAdminAuth();
  const { settings } = useSettings();

  // Desktop Hover and Pin states
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const isExpandedDesktop = isPinned || isHovered;

  const menuItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Menu Catalog', href: '/admin/menu', icon: Utensils },
    { name: 'Orders Pipeline', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 bottom-0 left-0 z-50 h-screen border-r border-border-light dark:border-border-dark bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl flex flex-col justify-between py-6 transition-all duration-300 ease-in-out shadow-2xl ${
          /* Mobile classes */
          isMobileOpen
            ? 'translate-x-0 w-72 px-5'
            : '-translate-x-full md:translate-x-0'
        } ${
          /* Desktop classes */
          isExpandedDesktop ? 'md:w-64 md:px-4' : 'md:w-20 md:px-3'
        }`}
      >
        <div className="space-y-6">
          {/* Brand & Close / Pin Buttons */}
          <div className="flex items-center justify-between px-1">
            <Link
              href="/admin/dashboard"
              onClick={onMobileClose}
              className="flex items-center gap-3 overflow-hidden group"
            >
              {settings.logo_url ? (
                <div className="relative w-10 h-10 rounded-2xl overflow-hidden shadow-glow shrink-0 border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark">
                  <Image
                    src={settings.logo_url}
                    alt={settings.restaurant_name}
                    fill
                    unoptimized
                    className="object-contain p-1"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-ember to-coral flex items-center justify-center text-white shadow-glow shrink-0 group-hover:scale-105 transition-transform">
                  <Utensils className="w-5 h-5" />
                </div>
              )}
              <div
                className={`whitespace-nowrap transition-opacity duration-200 ${
                  isExpandedDesktop || isMobileOpen ? 'opacity-100' : 'hidden'
                }`}
              >
                <h2 className="font-extrabold text-base tracking-tight text-neutral-900 dark:text-white leading-tight truncate max-w-[140px]">
                  {settings.restaurant_name}
                </h2>
                <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                  Kitchen Portal
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={onMobileClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Desktop Pin Button */}
            {(isExpandedDesktop || isPinned) && (
              <button
                onClick={() => setIsPinned(!isPinned)}
                title={isPinned ? 'Auto-collapse on mouse leave' : 'Pin sidebar open'}
                className="hidden md:block p-1.5 rounded-lg text-neutral-400 hover:text-ember hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {isPinned ? <PinOff className="w-4 h-4 text-ember" /> : <Pin className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Quick Return to Storefront Button */}
          <Link
            href="/"
            onClick={onMobileClose}
            title="Return to Customer Storefront"
            className={`flex items-center gap-3 p-3 rounded-2xl border border-ember/25 bg-ember/5 text-ember hover:bg-ember hover:text-white transition-all group overflow-hidden ${
              !isExpandedDesktop && !isMobileOpen ? 'md:justify-center' : ''
            }`}
          >
            <Store className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
            <div
              className={`whitespace-nowrap flex items-center justify-between flex-1 text-xs font-bold ${
                isExpandedDesktop || isMobileOpen ? 'block' : 'hidden'
              }`}
            >
              <span>Back to Storefront</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1.5 pt-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const showText = isExpandedDesktop || isMobileOpen;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onMobileClose}
                  title={item.name}
                  className={`flex items-center gap-3.5 px-3 py-3 rounded-2xl text-xs font-semibold transition-all group overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-ember to-coral text-white shadow-glow'
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 hover:text-neutral-900 dark:hover:text-white'
                  } ${!showText ? 'md:justify-center' : 'justify-between'}`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-white' : 'text-neutral-400 group-hover:text-ember'
                      }`}
                    />
                    {showText && (
                      <span className="whitespace-nowrap">{item.name}</span>
                    )}
                  </div>
                  {showText && isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
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
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 transition-colors ${
              !isExpandedDesktop && !isMobileOpen ? 'md:justify-center' : 'justify-between'
            }`}
          >
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-400 shrink-0" />
              )}
              {(isExpandedDesktop || isMobileOpen) && (
                <span className="whitespace-nowrap">
                  {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
                </span>
              )}
            </div>
            {(isExpandedDesktop || isMobileOpen) && (
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                {theme}
              </span>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              onMobileClose();
              logout();
            }}
            title="Sign Out"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ${
              !isExpandedDesktop && !isMobileOpen ? 'md:justify-center' : ''
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {(isExpandedDesktop || isMobileOpen) && (
              <span className="whitespace-nowrap">Sign Out</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
