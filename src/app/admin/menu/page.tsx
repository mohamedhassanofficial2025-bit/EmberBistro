'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Dish, DishCategory } from '@/types/database';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabase/client';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  AlertTriangle,
  Loader2,
  Check,
  Utensils,
  RefreshCw,
  UploadCloud,
} from 'lucide-react';

const CATEGORIES: DishCategory[] = ['Appetizers', 'Main Course', 'Desserts', 'Drinks'];

export default function AdminMenuPage() {
  const { showToast } = useToast();

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<'All' | DishCategory>('All');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [deletingDish, setDeletingDish] = useState<Dish | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form inputs
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course' as DishCategory,
    image: '',
    available: true,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size must be under 5MB', 'error');
      return;
    }

    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        setFormData((prev) => ({ ...prev, image: json.url }));
        showToast('Image uploaded to Supabase Storage!', 'success');
      } else {
        showToast(json.error || 'Failed to upload image', 'error');
      }
    } catch {
      showToast('Error uploading image', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const fetchDishes = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/dishes');
      const json = await res.json();
      if (json.success) {
        setDishes(json.data);
      } else {
        showToast(json.error || 'Failed to load menu', 'error');
      }
    } catch {
      showToast('Network error loading dishes', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  // Realtime subscription for admin menu updates
  useEffect(() => {
    const channel = supabase
      .channel('realtime:admin-menu-dishes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'dishes' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newDish = payload.new as Dish;
            setDishes((prev) => [newDish, ...prev.filter((d) => d.id !== newDish.id)]);
          } else if (payload.eventType === 'UPDATE') {
            const updated = payload.new as Dish;
            setDishes((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
          } else if (payload.eventType === 'DELETE') {
            const deletedId = (payload.old as { id?: string })?.id;
            if (deletedId) {
              setDishes((prev) => prev.filter((d) => d.id !== deletedId));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingDish(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Main Course',
      image: '',
      available: true,
    });
    setIsFormOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (dish: Dish) => {
    setEditingDish(dish);
    setFormData({
      name: dish.name,
      description: dish.description,
      price: dish.price.toString(),
      category: dish.category,
      image: dish.image,
      available: dish.available,
    });
    setIsFormOpen(true);
  };

  // Toggle availability instantly (Optimistic UI)
  const handleToggleAvailable = async (dish: Dish) => {
    const nextVal = !dish.available;
    // Optimistic update
    setDishes((prev) =>
      prev.map((d) => (d.id === dish.id ? { ...d, available: nextVal } : d))
    );

    try {
      const res = await fetch(`/api/admin/dishes/${dish.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: nextVal }),
      });
      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error);
      }
      showToast(
        `"${dish.name}" is now ${nextVal ? 'available' : 'hidden'}`,
        'success'
      );
    } catch {
      // Revert on error
      setDishes((prev) =>
        prev.map((d) => (d.id === dish.id ? { ...d, available: !nextVal } : d))
      );
      showToast('Failed to update dish availability', 'error');
    }
  };

  // Save (Create or Update)
  const handleSaveDish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setIsSaving(true);
    const url = editingDish
      ? `/api/admin/dishes/${editingDish.id}`
      : '/api/admin/dishes';
    const method = editingDish ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Save failed');
      }

      showToast(
        editingDish ? 'Dish updated successfully' : 'New dish added to menu',
        'success'
      );
      setIsFormOpen(false);
      fetchDishes();
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Confirmation
  const handleConfirmDelete = async () => {
    if (!deletingDish) return;
    try {
      const res = await fetch(`/api/admin/dishes/${deletingDish.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      showToast(`Deleted "${deletingDish.name}"`, 'info');
      setDeletingDish(null);
      fetchDishes();
    } catch (err) {
      showToast((err as Error).message, 'error');
    }
  };

  // Filtering
  const filtered = dishes.filter((dish) => {
    const matchCat = selectedCat === 'All' || dish.category === selectedCat;
    const matchSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-10 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-light dark:border-border-dark">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Menu Catalog Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Create, update dish pricing, adjust categories, and toggle daily availability.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDishes}
            className="p-3 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark text-neutral-600 dark:text-neutral-300 hover:text-ember transition-colors shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-ember to-coral text-white text-xs font-semibold shadow-glow hover:opacity-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Dish</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {(['All', ...CATEGORIES] as ('All' | DishCategory)[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-ember text-white shadow-glow'
                  : 'bg-white dark:bg-surface-cardDark text-neutral-600 dark:text-neutral-300 border border-border-light dark:border-border-dark hover:border-ember'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
          />
        </div>
      </div>

      {/* Dishes Table */}
      <div className="rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-neutral-400">
            <Loader2 className="w-8 h-8 animate-spin text-ember" />
            <span className="text-xs font-medium">Fetching menu items...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <Utensils className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
              No dishes found
            </h3>
            <p className="text-xs text-neutral-400">
              Try adjusting your search criteria or add a new dish.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border-light dark:border-border-dark bg-neutral-50/50 dark:bg-surface-dark/50 text-neutral-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {filtered.map((dish) => (
                  <tr
                    key={dish.id}
                    className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                    {/* Item Thumbnail & Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                          <Image
                            src={dish.image}
                            alt={dish.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900 dark:text-white text-sm">
                            {dish.name}
                          </div>
                          <div className="text-neutral-400 line-clamp-1 max-w-xs mt-0.5">
                            {dish.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-ember/10 text-ember font-semibold text-[11px]">
                        {dish.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-bold text-sm text-neutral-900 dark:text-white">
                      ${Number(dish.price).toFixed(2)}
                    </td>

                    {/* Available Toggle */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleAvailable(dish)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                          dish.available
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 border border-neutral-300 dark:border-neutral-700'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            dish.available ? 'bg-emerald-500' : 'bg-neutral-400'
                          }`}
                        />
                        <span>{dish.available ? 'Available' : 'Unavailable'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(dish)}
                          aria-label="Edit dish"
                          className="p-2 rounded-xl border border-border-light dark:border-border-dark hover:border-ember text-neutral-600 dark:text-neutral-300 hover:text-ember transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingDish(dish)}
                          aria-label="Delete dish"
                          className="p-2 rounded-xl border border-border-light dark:border-border-dark hover:border-rose-500 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Dish Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-2xl p-6 md:p-8 space-y-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-border-light dark:border-border-dark">
              <h2 className="font-bold text-lg text-neutral-900 dark:text-white">
                {editingDish ? 'Edit Dish Details' : 'Add New Culinary Dish'}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDish} className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Dish Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Charcoal Ribeye Steak"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="24.50"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as DishCategory })
                    }
                    className="w-full px-3 py-2.5 rounded-xl text-xs border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Ingredients, preparation method, sides..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                />
              </div>

              {/* Dish Image Upload & URL */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                  <span>Dish Image</span>
                  <span className="text-[10px] text-ember font-bold">Supabase Storage CDN</span>
                </label>

                {/* Image Preview */}
                {formData.image && (
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-border-light dark:border-border-dark bg-neutral-100 dark:bg-neutral-800">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Upload from Device button */}
                <label className="block cursor-pointer">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/avif"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-ember/40 bg-ember/5 text-ember hover:bg-ember/10 transition-colors text-xs font-semibold">
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-ember" />
                        <span>Uploading to Supabase CDN...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload Image from Device</span>
                      </>
                    )}
                  </div>
                </label>

                {/* Or enter URL */}
                <input
                  type="url"
                  placeholder="Or paste direct image URL (https://...)"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                />
              </div>

              {/* Available Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="accent-ember w-4 h-4 rounded"
                />
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Dish is available for ordering
                </span>
              </label>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-light dark:border-border-dark">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark text-neutral-600 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-ember to-coral text-white text-xs font-semibold shadow-glow hover:opacity-95 disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                  <span>{editingDish ? 'Save Changes' : 'Create Dish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (Per Audit Rule 3D: High commitment = Modal) */}
      {deletingDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Delete &quot;{deletingDish.name}&quot;?
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                This will permanently remove the dish from the restaurant menu and database.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingDish(null)}
                className="px-4 py-2 rounded-xl border border-border-light dark:border-border-dark text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Yes, Delete Dish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
