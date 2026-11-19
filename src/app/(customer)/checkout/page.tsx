'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  ArrowLeft,
  Loader2,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, total, clearCart } = useCart();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    paymentMethod: 'cash' as 'cash' | 'online',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
          No items to checkout
        </h2>
        <p className="text-sm text-neutral-500">
          Your cart is empty. Please select dishes from our menu before placing an order.
        </p>
        <Link
          href="/menu"
          className="inline-flex px-6 py-3 rounded-2xl bg-ember text-white font-semibold text-xs shadow-glow"
        >
          Go to Menu
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!formData.address.trim()) errs.address = 'Delivery address is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please correct the highlighted fields', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Build order payload for Supabase
      const payload = {
        customer_name: formData.name.trim(),
        customer_phone: formData.phone.trim(),
        customer_email: formData.email.trim(),
        delivery_address: formData.address.trim(),
        items: items.map((i) => ({
          dish_id: i.dish.id,
          name: i.dish.name,
          price: i.dish.price,
          quantity: i.quantity,
          special_instructions: i.specialInstructions || formData.notes || '',
        })),
        subtotal,
        tax,
        total,
        payment_method: formData.paymentMethod,
        status: 'New',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to submit order');
      }

      const orderId = json.data.id;
      clearCart();
      showToast('Order placed successfully!', 'success');
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
          Checkout & Delivery
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Complete your information to have your meal delivered fresh to your door.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact Details Card */}
          <div className="p-6 sm:p-7 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border-light dark:border-border-dark">
              <User className="w-4 h-4 text-ember" />
              <h2 className="font-bold text-base text-neutral-900 dark:text-white">
                1. Customer Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border ${
                      errors.name ? 'border-rose-500' : 'border-border-light dark:border-border-dark'
                    } bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember`}
                  />
                </div>
                {errors.name && <p className="text-[11px] text-rose-500">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border ${
                      errors.phone ? 'border-rose-500' : 'border-border-light dark:border-border-dark'
                    } bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-rose-500">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border ${
                      errors.email ? 'border-rose-500' : 'border-border-light dark:border-border-dark'
                    } bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-rose-500">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Delivery Address Card */}
          <div className="p-6 sm:p-7 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border-light dark:border-border-dark">
              <Truck className="w-4 h-4 text-ember" />
              <h2 className="font-bold text-base text-neutral-900 dark:text-white">
                2. Delivery Destination
              </h2>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Full Street Address, Apt / Suite *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <textarea
                  rows={3}
                  placeholder="e.g. 742 Evergreen Terrace, Apt 4B, Springfield"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border ${
                    errors.address ? 'border-rose-500' : 'border-border-light dark:border-border-dark'
                  } bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember`}
                />
              </div>
              {errors.address && <p className="text-[11px] text-rose-500">{errors.address}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Delivery / Gate Instructions (Optional)
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <textarea
                  rows={2}
                  placeholder="e.g. Ring bell #12, leave at front door..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="p-6 sm:p-7 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border-light dark:border-border-dark">
              <Banknote className="w-4 h-4 text-ember" />
              <h2 className="font-bold text-base text-neutral-900 dark:text-white">
                3. Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Cash on Delivery */}
              <label
                className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'cash'
                    ? 'border-ember bg-ember/5 text-neutral-900 dark:text-white shadow-sm'
                    : 'border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                  className="accent-ember w-4 h-4"
                />
                <Banknote className="w-5 h-5 text-ember shrink-0" />
                <div>
                  <div className="text-xs font-bold">Cash on Delivery</div>
                  <div className="text-[11px] text-neutral-500">Pay when your food arrives</div>
                </div>
              </label>

              {/* Online Payment */}
              <label
                className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'online'
                    ? 'border-ember bg-ember/5 text-neutral-900 dark:text-white shadow-sm'
                    : 'border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-dark text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={formData.paymentMethod === 'online'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'online' })}
                  className="accent-ember w-4 h-4"
                />
                <CreditCard className="w-5 h-5 text-coral shrink-0" />
                <div>
                  <div className="text-xs font-bold">Credit / Debit Card</div>
                  <div className="text-[11px] text-neutral-500">Fast & contactless demo payment</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-border-light dark:border-border-dark">
            <h2 className="font-bold text-base text-neutral-900 dark:text-white">
              Order Review
            </h2>
            <Link
              href="/cart"
              className="text-xs text-ember hover:underline font-semibold"
            >
              Edit Cart
            </Link>
          </div>

          {/* Mini items list */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.dish.id}
                className="flex items-center justify-between text-xs text-neutral-700 dark:text-neutral-300"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ember">{item.quantity}x</span>
                  <span className="truncate max-w-[180px]">{item.dish.name}</span>
                </div>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  ${(Number(item.dish.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-2.5 text-xs border-t border-border-light dark:border-border-dark pt-4">
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
              <span>Taxes (10%)</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
              <span>Estimated Delivery</span>
              <span className="font-semibold text-emerald-500">Free</span>
            </div>
            <div className="border-t border-border-light dark:border-border-dark pt-3 flex items-center justify-between">
              <span className="font-bold text-sm text-neutral-900 dark:text-white">
                Final Total
              </span>
              <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-ember to-coral">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-ember to-coral text-white font-semibold text-sm shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Your Order...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Place Order (${total.toFixed(2)})</span>
              </>
            )}
          </button>

          <div className="text-center">
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-ember transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Cart</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
