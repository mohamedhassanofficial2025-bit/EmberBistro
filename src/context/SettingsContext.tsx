'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { RestaurantSettings } from '@/types/database';

const DEFAULT_SETTINGS: RestaurantSettings = {
  id: 'main',
  restaurant_name: 'EmberBistro',
  tagline: 'Modern Culinary & Woodfire Kitchen',
  phone: '+1 (555) 321-4567',
  email: 'contact@emberbistro.com',
  address: '124 Culinary Way, Downtown',
  tax_rate: 10,
  delivery_fee: 5,
  currency_symbol: '$',
  opening_hours: 'Mon - Sun: 12:00 PM - 11:00 PM',
  logo_url: null,
  updated_at: new Date().toISOString(),
};

interface SettingsContextType {
  settings: RestaurantSettings;
  isLoading: boolean;
  refreshSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<RestaurantSettings>) => Promise<{ success: boolean; error?: string }>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<RestaurantSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings', { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data) {
        setSettings(json.data);
      }
    } catch (err) {
      console.warn('Failed to fetch settings, using defaults:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = async (partial: Partial<RestaurantSettings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partial),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setSettings(json.data);
        return { success: true };
      }
      return { success: false, error: json.error || 'Failed to update settings' };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isLoading,
        refreshSettings: fetchSettings,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
