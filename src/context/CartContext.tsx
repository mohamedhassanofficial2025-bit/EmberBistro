'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dish } from '@/types/database';
import { useToast } from './ToastContext';

export interface CartItem {
  dish: Dish;
  quantity: number;
  specialInstructions?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (dish: Dish, quantity?: number, specialInstructions?: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  removeFromCart: (dishId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
});

const CART_STORAGE_KEY = 'ember_bistro_cart_v1';
const TAX_RATE = 0.1; // 10% tax

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse cart storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage on mutation
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart storage', e);
      }
    }
  }, [items, isLoaded]);

  const addToCart = (
    dish: Dish,
    quantity: number = 1,
    specialInstructions: string = ''
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.dish.id === dish.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          specialInstructions:
            specialInstructions || next[existingIndex].specialInstructions,
        };
        return next;
      } else {
        return [...prev, { dish, quantity, specialInstructions }];
      }
    });

    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${dish.name}" to cart!`, 'success');
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (dishId: string) => {
    const target = items.find((i) => i.dish.id === dishId);
    if (target) {
      showToast(`Removed "${target.dish.name}" from cart`, 'info');
    }
    setItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.dish.price) * item.quantity,
    0
  );
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
