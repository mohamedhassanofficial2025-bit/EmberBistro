'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useToast } from '@/context/ToastContext';
import { useSettings } from '@/context/SettingsContext';
import {
  Store,
  Clock,
  DollarSign,
  Save,
  Loader2,
  UploadCloud,
  X,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const { settings, isLoading: isContextLoading, updateSettings } = useSettings();

  const [form, setForm] = useState({
    restaurant_name: '',
    tagline: '',
    phone: '',
    email: '',
    address: '',
    tax_rate: '10',
    delivery_fee: '5',
    currency_symbol: '$',
    opening_hours: '',
    logo_url: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  // Sync form when settings load
  useEffect(() => {
    if (settings) {
      setForm({
        restaurant_name: settings.restaurant_name || 'EmberBistro',
        tagline: settings.tagline || 'Modern Culinary & Woodfire Kitchen',
        phone: settings.phone || '+1 (555) 321-4567',
        email: settings.email || 'contact@emberbistro.com',
        address: settings.address || '124 Culinary Way, Downtown',
        tax_rate: String(settings.tax_rate ?? 10),
        delivery_fee: String(settings.delivery_fee ?? 5),
        currency_symbol: settings.currency_symbol || '$',
        opening_hours: settings.opening_hours || 'Mon - Sun: 12:00 PM - 11:00 PM',
        logo_url: settings.logo_url || '',
      });
    }
  }, [settings]);

  // Handle Logo Upload to Supabase Storage
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('Logo image must be under 5MB', 'error');
      return;
    }

    setIsUploadingLogo(true);
    try {
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success && json.url) {
        setForm((prev) => ({ ...prev, logo_url: json.url }));
        showToast('Logo uploaded to Supabase Storage!', 'success');
      } else {
        showToast(json.error || 'Failed to upload logo', 'error');
      }
    } catch {
      showToast('Error uploading logo', 'error');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.restaurant_name.trim()) {
      showToast('Restaurant brand name is required', 'error');
      return;
    }

    setIsSaving(true);
    const result = await updateSettings({
      restaurant_name: form.restaurant_name,
      tagline: form.tagline,
      phone: form.phone,
      email: form.email,
      address: form.address,
      tax_rate: parseFloat(form.tax_rate) || 0,
      delivery_fee: parseFloat(form.delivery_fee) || 0,
      currency_symbol: form.currency_symbol,
      opening_hours: form.opening_hours,
      logo_url: form.logo_url || null,
    });

    setIsSaving(false);
    if (result.success) {
      showToast('Settings saved to database successfully!', 'success');
    } else {
      showToast(result.error || 'Failed to save settings', 'error');
    }
  };

  if (isContextLoading) {
    return (
      <div className="py-20 flex items-center justify-center text-neutral-400 gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-ember" />
        <span className="text-xs font-semibold">Loading restaurant settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-10 w-full max-w-4xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-light dark:border-border-dark">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Restaurant Settings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Configure your brand identity, contact details, operating schedule, and sales tax. Changes update the storefront immediately.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Brand & Logo */}
        <div className="p-7 sm:p-8 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card space-y-6">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border-light dark:border-border-dark">
            <Store className="w-5 h-5 text-ember" />
            <h2 className="font-bold text-base text-neutral-900 dark:text-white">Brand Identity & Logo</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Restaurant Brand Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Restaurant Brand Name *
              </label>
              <input
                type="text"
                required
                value={form.restaurant_name}
                onChange={(e) => setForm({ ...form, restaurant_name: e.target.value })}
                placeholder="e.g. EmberBistro"
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
            </div>

            {/* Tagline */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Tagline / Slogan
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="e.g. Modern Culinary & Woodfire Kitchen"
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
            </div>

            {/* Logo Image */}
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                <span>Restaurant Logo</span>
                <span className="text-[10px] text-ember font-bold">Supabase Storage CDN</span>
              </label>

              {/* Logo Preview */}
              {form.logo_url && (
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden border border-border-light dark:border-border-dark bg-neutral-100 dark:bg-neutral-800">
                  <Image
                    src={form.logo_url}
                    alt="Logo Preview"
                    fill
                    unoptimized
                    className="object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, logo_url: '' })}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
                    title="Remove logo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Logo Upload Button */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleLogoUpload}
                    disabled={isUploadingLogo}
                    className="hidden"
                  />
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-ember/40 bg-ember/5 text-ember hover:bg-ember/10 transition-colors text-xs font-semibold">
                    {isUploadingLogo ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-ember" />
                        <span>Uploading Logo...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload Logo from Device</span>
                      </>
                    )}
                  </div>
                </label>

                <input
                  type="url"
                  placeholder="Or paste direct logo URL (https://...)"
                  value={form.logo_url}
                  onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                  className="flex-1 px-4 py-2 rounded-xl text-xs border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Location */}
        <div className="p-7 sm:p-8 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card space-y-6">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border-light dark:border-border-dark">
            <MapPin className="w-5 h-5 text-ember" />
            <h2 className="font-bold text-base text-neutral-900 dark:text-white">Contact & Location</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Support Phone
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 321-4567"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                />
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Support Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="contact@emberbistro.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Physical Street Address
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="124 Culinary Way, Downtown"
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Operating Schedule / Hours
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={form.opening_hours}
                  onChange={(e) => setForm({ ...form, opening_hours: e.target.value })}
                  placeholder="Mon - Sun: 12:00 PM - 11:00 PM"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                />
                <Clock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Billing & Taxes */}
        <div className="p-7 sm:p-8 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card space-y-6">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border-light dark:border-border-dark">
            <DollarSign className="w-5 h-5 text-ember" />
            <h2 className="font-bold text-base text-neutral-900 dark:text-white">Rates & Taxes</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Default Sales Tax (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={form.tax_rate}
                onChange={(e) => setForm({ ...form, tax_rate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Flat Delivery Fee ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.delivery_fee}
                onChange={(e) => setForm({ ...form, delivery_fee: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Currency Symbol
              </label>
              <input
                type="text"
                value={form.currency_symbol}
                onChange={(e) => setForm({ ...form, currency_symbol: e.target.value })}
                placeholder="$"
                className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-ember to-coral text-white text-xs sm:text-sm font-semibold shadow-glow hover:opacity-95 disabled:opacity-50 transition-all"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSaving ? 'Saving to Database...' : 'Save Settings to Database'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
