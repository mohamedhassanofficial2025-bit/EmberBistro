'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useToast } from '@/context/ToastContext';
import { Utensils, Lock, Mail, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const res = await login(email, password);

    if (res.success) {
      showToast('Welcome back, Chef!', 'success');
      router.push('/admin/dashboard');
    } else {
      setErrorMsg(res.error || 'Invalid credentials');
      showToast(res.error || 'Failed to login', 'error');
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('owner@emberbistro.com');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md p-8 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark shadow-card dark:shadow-cardDark space-y-7">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-ember to-coral text-white mx-auto flex items-center justify-center shadow-glow">
            <Utensils className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Ember<span className="text-ember">Manager</span>
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Sign in to access restaurant operations & menu controls
          </p>
        </div>

        {/* Quick Demo Fill Pill */}
        <div className="p-3.5 rounded-2xl bg-ember/5 border border-ember/20 flex items-center justify-between text-xs text-neutral-700 dark:text-neutral-300">
          <div className="space-y-0.5">
            <span className="font-semibold text-ember block flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Demo Credentials</span>
            </span>
            <span className="text-[11px] text-neutral-500 font-mono">owner@emberbistro.com / admin123</span>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1.5 rounded-xl bg-ember text-white font-semibold text-[11px] shadow-sm hover:opacity-90 transition-opacity"
          >
            Auto Fill
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-300 text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@emberbistro.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-cardDark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-cardDark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ember to-coral text-white font-semibold text-sm shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 pt-3 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Session...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-ember transition-colors"
          >
            ← Return to Customer Website
          </Link>
        </div>
      </div>
    </div>
  );
}
