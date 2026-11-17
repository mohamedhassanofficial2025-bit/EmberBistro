'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dish } from '@/types/database';
import { useCart } from '@/context/CartContext';
import { Plus, Eye, Utensils } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  onSelect: (dish: Dish) => void;
  priority?: boolean;
}

export default function DishCard({ dish, onSelect, priority = false }: DishCardProps) {
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(dish, 1);
  };

  return (
    <div
      onClick={() => onSelect(dish)}
      className="group cursor-pointer p-5 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-4 hover:shadow-glow/25 hover:border-ember/40 transition-all duration-300 flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Dish Image */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          {!imgError && dish.image ? (
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              priority={priority}
              onError={() => setImgError(true)}
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 gap-2">
              <Utensils className="w-8 h-8 text-neutral-300 dark:text-neutral-600" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Ember Bistro</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-surface-dark/90 text-neutral-800 dark:text-neutral-200 text-xs font-semibold backdrop-blur-md shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="w-3.5 h-3.5 text-ember" />
              <span>Quick View</span>
            </span>
          </div>
        </div>

        {/* Category & Price */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-ember/10 text-ember">
            {dish.category}
          </span>
          <span className="font-extrabold text-lg text-neutral-900 dark:text-white">
            ${Number(dish.price).toFixed(2)}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white group-hover:text-ember transition-colors">
            {dish.name}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
            {dish.description}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleQuickAdd}
        className="w-full mt-2 py-2.5 px-4 rounded-xl bg-ember hover:bg-ember-hover text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
      >
        <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
}
