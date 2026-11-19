'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UtensilsCrossed, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="border-t border-border-light dark:border-border-dark bg-white dark:bg-surface-dark mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {settings.logo_url ? (
                <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                  <Image
                    src={settings.logo_url}
                    alt={settings.restaurant_name}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-ember to-coral flex items-center justify-center text-white">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
              )}
              <span className="font-bold text-lg text-neutral-900 dark:text-white">
                {settings.restaurant_name}
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {settings.tagline ||
                'Serving handcrafted culinary experiences with authentic flavor, premium ingredients, and warm hospitality.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm text-neutral-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <Link href="/" className="hover:text-ember transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-ember transition-colors">
                  Full Menu
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-ember transition-colors">
                  My Cart
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-ember transition-colors">
                  Owner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-semibold text-sm text-neutral-900 dark:text-white mb-4">
              Opening Hours
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-ember flex-shrink-0 mt-0.5" />
                <span>{settings.opening_hours || 'Mon - Sun: 12:00 PM - 11:00 PM'}</span>
              </li>
              <li className="text-ember font-medium pt-1">Fresh Delivery Daily</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm text-neutral-900 dark:text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-ember flex-shrink-0" />
                <span>{settings.address || '124 Culinary Way, Downtown'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-ember flex-shrink-0" />
                <span>{settings.phone || '+1 (555) 321-4567'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-ember flex-shrink-0" />
                <span>{settings.email || 'contact@emberbistro.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-light dark:border-border-dark mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 gap-4">
          <p>© {new Date().getFullYear()} {settings.restaurant_name}. All rights reserved.</p>
          <p>Powered by Ember Manager & Supabase Cloud</p>
        </div>
      </div>
    </footer>
  );
}
