'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Order, OrderStatus } from '@/types/database';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabase/client';
import {
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Eye,
  X,
  Loader2,
} from 'lucide-react';

const STATUS_OPTIONS: OrderStatus[] = [
  'New',
  'Preparing',
  'Ready',
  'Completed',
  'Cancelled',
];

export default function AdminOrdersPage() {
  const { showToast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'All' | OrderStatus>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/orders');
      const json = await res.json();
      if (json.success) {
        setOrders(json.data);
      } else {
        showToast(json.error || 'Failed to fetch orders', 'error');
      }
    } catch {
      showToast('Error loading orders', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Realtime subscription for instant order arrivals and kitchen status updates
  useEffect(() => {
    const channel = supabase
      .channel('realtime:admin-kitchen-orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newOrder = payload.new as Order;
            setOrders((prev) => [newOrder, ...prev.filter((o) => o.id !== newOrder.id)]);
            showToast(`🔔 New Order! #${newOrder.id.slice(0, 6)} by ${newOrder.customer_name}`, 'success');
          } else if (payload.eventType === 'UPDATE') {
            const updated = payload.new as Order;
            setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
          } else if (payload.eventType === 'DELETE') {
            const deletedId = (payload.old as { id?: string })?.id;
            if (deletedId) {
              setOrders((prev) => prev.filter((o) => o.id !== deletedId));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [showToast]);

  // Update status (Optimistic UI)
  const handleUpdateStatus = async (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );

    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      showToast(`Order #${orderId.slice(0, 8)} updated to ${nextStatus}`, 'success');
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => prev ? { ...prev, status: nextStatus } : null);
      }
    } catch (err) {
      showToast((err as Error).message, 'error');
      fetchOrders(); // Revert
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'All') return true;
    return o.status === filterStatus;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Preparing':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Ready':
        return 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'Completed':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Cancelled':
        return 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800';
    }
  };

  return (
    <div className="space-y-10 w-full">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-light dark:border-border-dark">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Kitchen & Order Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Real-time ticket board for customer orders, status transitions, and deliveries.
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-ember transition-colors shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['All', ...STATUS_OPTIONS] as ('All' | OrderStatus)[]).map((st) => {
          const isSelected = filterStatus === st;
          const count =
            st === 'All'
              ? orders.length
              : orders.filter((o) => o.status === st).length;

          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-ember text-white shadow-glow'
                  : 'bg-white dark:bg-surface-cardDark text-neutral-600 dark:text-neutral-300 border border-border-light dark:border-border-dark hover:border-ember'
              }`}
            >
              <span>{st}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-neutral-800'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-card dark:shadow-cardDark overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-neutral-400">
            <Loader2 className="w-8 h-8 animate-spin text-ember" />
            <span className="text-xs font-medium">Fetching orders ticket queue...</span>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <ShoppingBag className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
              No orders found
            </h3>
            <p className="text-xs text-neutral-400">
              There are no orders with &quot;{filterStatus}&quot; status right now.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border-light dark:border-border-dark bg-neutral-50/50 dark:bg-surface-dark/50 text-neutral-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Ticket</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Items Summary</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status & Transition</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                    {/* Ticket # & Date */}
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-neutral-900 dark:text-white">
                        #{order.id.slice(0, 8)}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        {new Date(order.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-neutral-900 dark:text-white">
                        {order.customer_name}
                      </div>
                      <div className="text-neutral-400 text-[11px] flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-ember" />
                        <span>{order.customer_phone}</span>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="px-6 py-4">
                      <div className="text-neutral-700 dark:text-neutral-300 max-w-xs line-clamp-1">
                        {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                      </div>
                      <div className="text-neutral-400 text-[11px] mt-0.5 truncate max-w-xs">
                        📍 {order.delivery_address}
                      </div>
                    </td>

                    {/* Total & Payment */}
                    <td className="px-6 py-4">
                      <div className="font-extrabold text-sm text-neutral-900 dark:text-white">
                        ${Number(order.total).toFixed(2)}
                      </div>
                      <span className="text-[10px] uppercase font-semibold text-neutral-400">
                        {order.payment_method}
                      </span>
                    </td>

                    {/* Status Select */}
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleUpdateStatus(order.id, e.target.value as OrderStatus)
                        }
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold focus:outline-none cursor-pointer ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option
                            key={st}
                            value={st}
                            className="bg-white dark:bg-surface-dark text-neutral-900 dark:text-white"
                          >
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-neutral-700 dark:text-neutral-300 hover:text-ember text-xs font-semibold transition-colors shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5 text-ember" />
                        <span>View Ticket</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-cardDark shadow-2xl p-6 md:p-8 space-y-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border-light dark:border-border-dark">
              <div>
                <span className="text-[11px] font-semibold uppercase text-ember tracking-wider">
                  Kitchen Ticket Details
                </span>
                <h2 className="font-bold text-lg text-neutral-900 dark:text-white">
                  Order #{selectedOrder.id}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer Info Card */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-surface-dark border border-border-light dark:border-border-dark space-y-2 text-xs">
              <div className="font-bold text-neutral-900 dark:text-white text-sm">
                {selectedOrder.customer_name}
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <Phone className="w-3.5 h-3.5 text-ember" />
                <span>{selectedOrder.customer_phone}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <Mail className="w-3.5 h-3.5 text-ember" />
                <span>{selectedOrder.customer_email}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-ember" />
                <span>{selectedOrder.delivery_address}</span>
              </div>
            </div>

            {/* Ordered Dishes List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Ordered Items
              </h3>
              <div className="divide-y divide-border-light dark:divide-border-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 flex items-start justify-between bg-white dark:bg-surface-cardDark text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-ember">{item.quantity}x</span>
                        <span className="font-bold text-neutral-900 dark:text-white">
                          {item.name}
                        </span>
                      </div>
                      {item.special_instructions && (
                        <p className="text-[11px] text-amber-600 dark:text-amber-400 italic">
                          &quot;{item.special_instructions}&quot;
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-neutral-900 dark:text-white">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="space-y-1.5 text-xs border-t border-border-light dark:border-border-dark pt-3">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span>${Number(selectedOrder.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Tax (10%)</span>
                <span>${Number(selectedOrder.tax).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-neutral-900 dark:text-white pt-1">
                <span>Total Amount ({selectedOrder.payment_method})</span>
                <span className="text-ember">${Number(selectedOrder.total).toFixed(2)}</span>
              </div>
            </div>

            {/* Quick Status Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border-light dark:border-border-dark">
              <span className="text-xs font-semibold text-neutral-400">Change Status:</span>
              <div className="flex items-center gap-1.5">
                {STATUS_OPTIONS.map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedOrder.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      selectedOrder.status === st
                        ? 'bg-ember text-white shadow-sm'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
