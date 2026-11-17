'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, tax, total } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-ember/10 text-ember mx-auto flex items-center justify-center shadow-glow">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            Your Cart is Empty
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
            You haven&apos;t added any culinary dishes to your order yet. Explore our handcrafted menu!
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-ember to-coral text-white text-sm font-semibold shadow-glow hover:opacity-95 transition-all"
          >
            <span>Explore Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            Your Order Cart
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Review your dishes and proceed to checkout when ready.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-500 hover:text-rose-600 font-semibold transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.dish.id}
              className="p-4 sm:p-5 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-4">
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                  <Image
                    src={item.dish.image}
                    alt={item.dish.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Info */}
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-ember">
                    {item.dish.category}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                    {item.dish.name}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    ${Number(item.dish.price).toFixed(2)} each
                  </p>
                  {item.specialInstructions && (
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1 pt-0.5">
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span className="italic truncate max-w-xs">{item.specialInstructions}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Quantity Controls & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-border-light dark:border-border-dark">
                <div className="flex items-center gap-2 p-1 rounded-xl border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark">
                  <button
                    onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-6 text-center text-neutral-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right min-w-[70px]">
                  <span className="font-extrabold text-base text-neutral-900 dark:text-white">
                    ${(Number(item.dish.price) * item.quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.dish.id)}
                  aria-label="Remove item"
                  className="p-2 rounded-xl text-neutral-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-ember transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Add more dishes from the menu</span>
            </Link>
          </div>
        </div>

        {/* Order Summary (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-6 sticky top-24">
          <h2 className="font-bold text-lg text-neutral-900 dark:text-white">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
              <span>Estimated Tax (10%)</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
              <span>Delivery Fee</span>
              <span className="font-semibold text-emerald-500">Free</span>
            </div>
            <div className="border-t border-border-light dark:border-border-dark pt-3 flex items-center justify-between">
              <span className="font-bold text-base text-neutral-900 dark:text-white">
                Total
              </span>
              <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-ember to-coral">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-ember to-coral text-white font-semibold text-sm shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
