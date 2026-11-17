'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Sun, Moon, UtensilsCrossed } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-light dark:border-border-dark glass dark:glass-dark transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ember to-coral flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white">
              Ember<span className="text-ember">Bistro</span>
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-ember ${
                  isActive
                    ? 'text-ember font-semibold'
                    : 'text-neutral-600 dark:text-neutral-300'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-neutral-600 dark:text-neutral-300 hover:text-ember transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center p-2.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-neutral-700 dark:text-neutral-200 hover:text-ember transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1.5 -right-1.5 bg-ember text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
              0
            </span>
          </Link>

          {/* Admin Link */}
          <Link
            href="/admin/login"
            className="hidden sm:inline-flex text-xs font-semibold px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-ember transition-colors"
          >
            Owner
          </Link>
        </div>
      </div>
    </header>
  );
}
