# 📋 Restaurant App — Engineering Execution Plan

**Status:** Phase 1 Complete (Supabase Integration Active)  
**Database & Backend:** Supabase PostgreSQL (`RestaurantApp`, ref: `ifikukoynoxstjozoepd`)  
**Quality Gate Target:** Score ≥ 9/10  
**Design Theme:** Ember Modern (`#FF6D4A` Primary, `#EA4B71` Secondary, Inter Typography)

---

## Phase 1 — Project Setup & Foundation

- [x] **1.1 Initialize Next.js 16 project with TypeScript**
  - Configured `package.json`, `tsconfig.json`, `next.config.ts`.
- [x] **1.2 Configure Tailwind CSS with design tokens**
  - Set up `tailwind.config.ts`, `postcss.config.mjs`, and `src/styles/globals.css` with Ember Orange, Coral Pink, light/dark surfaces, glassmorphism, and custom shadow tokens.
- [x] **1.3 Set up project folder structure**
  - Customer routes: `src/app/(customer)/` (`page.tsx`, `menu/`, `cart/`, `checkout/`, `order-confirmation/`).
  - Owner dashboard routes: `src/app/admin/` (`login/`, `dashboard/`, `menu/`, `orders/`).
  - API routes: `src/app/api/` (`dishes/`, `orders/`, `admin/login/`).
  - Reusable components: `src/components/customer/`, `src/components/dashboard/`, `src/components/ui/`.
- [x] **1.4 Configure ESLint + Prettier**
  - Created `eslint.config.mjs` and `.prettierrc`.
- [x] **1.5 Set up Database (Supabase Cloud PostgreSQL)**
  - Created project `RestaurantApp` (`ifikukoynoxstjozoepd`).
  - Created `dishes` and `orders` tables with Row Level Security (RLS) policies.
  - Seeded starter gourmet dishes.
  - Set up Supabase client in `src/lib/supabase/client.ts` and database types in `src/types/database.ts`.
- [x] **1.6 Create base layout components**
  - Customer base: `Navbar.tsx` (brand, menu links, cart indicator, theme switcher) and `Footer.tsx`.
  - Admin shell: `Sidebar.tsx` (navigation, theme switch, customer view toggle, sign-out).
  - Theme provider: `ThemeContext.tsx` with light/dark persistence.
- [x] **1.7 Set up environment variables**
  - Configured `.env.local` and `.env.example` with Supabase project URL and anon public key.
- [x] **1.8 Initialize Git repository + `.gitignore`**
  - Initialized git repository with standard Next.js `.gitignore`.

---

## Upcoming Phases

- **Phase 2 — Customer-Facing Features**
  - Sprint 2A: Menu & Dish Display (Live Supabase menu, category filter tabs, search).
  - Sprint 2B: Cart & Checkout (`CartContext`, `localStorage` persistence, checkout form, order creation in Supabase).
- **Phase 3 — Owner Dashboard**
  - Sprint 3A: Admin Auth with Supabase Auth.
  - Sprint 3B: Menu CRUD directly updating Supabase `dishes`.
  - Sprint 3C: Live Order pipeline with Supabase Realtime subscriptions.
- **Phase 4 — Integration & Polish**
- **Phase 5 — Visual & Functional Quality Gate (`/audit`)**
- **Phase 6 — Deployment & Launch**
