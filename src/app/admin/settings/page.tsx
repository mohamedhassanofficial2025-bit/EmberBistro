'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { Settings, Store, Clock, Bell, Shield, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [storeName, setStoreName] = useState('EmberBistro');
  const [phone, setPhone] = useState('+1 (555) 321-4567');
  const [address, setAddress] = useState('124 Culinary Way, Downtown');
  const [taxRate, setTaxRate] = useState('10');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Restaurant configuration updated successfully!', 'success');
  };

  return (
    <div className="space-y-10 w-full max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-light dark:border-border-dark">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Restaurant Settings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Configure store profile, business operating hours, and tax rates.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-7 sm:p-8 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card space-y-6">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border-light dark:border-border-dark">
            <Store className="w-5 h-5 text-ember" />
            <h2 className="font-bold text-base text-neutral-900 dark:text-white">Store Identity</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Restaurant Brand Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Support Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Physical Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Default Sales Tax Rate (%)
              </label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-ember to-coral text-white text-xs font-semibold shadow-glow hover:opacity-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
