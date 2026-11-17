'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dish } from '@/types/database';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
}

export default function DishDetailModal({ dish, onClose }: DishDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const { addToCart } = useCart();

  if (!dish) return null;

  const handleAdd = () => {
    addToCart(dish, quantity, instructions);
    onClose();
  };

  const currentTotal = (Number(dish.price) * quantity).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-black/60 text-neutral-700 dark:text-neutral-200 backdrop-blur-md hover:scale-105 transition-all shadow-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Dish Hero Image */}
        <div className="relative w-full h-64 bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 dark:bg-surface-dark/90 text-ember backdrop-blur-md shadow-sm">
              {dish.category}
            </span>
            <span className="text-2xl font-black text-white drop-shadow-md">
              ${Number(dish.price).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-5">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              {dish.name}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-ember" />
              <span>Special Instructions (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Extra spicy, sauce on the side, allergy notes..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
            />
          </div>

          {/* Quantity and Add Action */}
          <div className="flex items-center gap-4 pt-2 border-t border-border-light dark:border-border-dark">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 p-1 rounded-2xl border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-bold w-6 text-center text-neutral-900 dark:text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAdd}
              className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-ember to-coral text-white font-semibold text-sm shadow-glow hover:opacity-95 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </div>
              <span className="font-bold">${currentTotal}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
