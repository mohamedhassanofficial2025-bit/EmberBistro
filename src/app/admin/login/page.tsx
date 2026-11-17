'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Utensils, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary redirect stub until Auth API is wired in Phase 3
    localStorage.setItem('admin_token', 'demo-token');
    window.location.href = '/admin/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md p-8 rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark shadow-card dark:shadow-cardDark space-y-8">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-cardDark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-border-light dark:border-border-dark bg-neutral-50 dark:bg-surface-cardDark text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-ember to-coral text-white font-semibold text-sm shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 pt-3"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
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
