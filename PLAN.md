# 📋 Restaurant App — Engineering Execution Plan

**Status:** Phase 1 & Phase 2 Complete (Ordering & Cart Flow Fully Functional)  
**Database & Backend:** Supabase PostgreSQL (`RestaurantApp`, ref: `ifikukoynoxstjozoepd`)  
**Quality Gate Target:** Score ≥ 9/10  
**Design Theme:** Ember Modern (`#FF6D4A` Primary, `#EA4B71` Secondary, Inter Typography)

---

## Phase 1 — Project Setup & Foundation

- [x] **1.1 Initialize Next.js 16 project with TypeScript**
- [x] **1.2 Configure Tailwind CSS with design tokens**
- [x] **1.3 Set up project folder structure**
- [x] **1.4 Configure ESLint + Prettier**
- [x] **1.5 Set up Database (Supabase Cloud PostgreSQL)**
- [x] **1.6 Create base layout components**
- [x] **1.7 Set up environment variables**
- [x] **1.8 Initialize Git repository + `.gitignore`**

---

## Phase 2 — Customer-Facing Features

### Sprint 2A — Menu & Dish Display
- [x] **2.1 Create Dish data model**: Seeded and indexed in Supabase `dishes` table.
- [x] **2.2 Build `GET /api/dishes` endpoint**: Returns all active dishes.
- [x] **2.3 Build `GET /api/dishes/:id` endpoint**: Retrieves single dish details.
- [x] **2.4 Build Home / Landing page**: Features hero banner, chef highlights, and direct CTAs.
- [x] **2.5 Build Menu page**: Filter tabs (All, Appetizers, Main Course, Desserts, Drinks) + live search.
- [x] **2.6 Build Dish Card component**: Interactive card with quick "Add to Cart" and modal trigger.
- [x] **2.7 Build Dish Detail modal**: High-res image, quantity selector, special instructions, and total price.
- [x] **2.8 Add loading skeletons**: Fallback state during initial fetch.
- [x] **2.9 Add empty state**: Informative message with reset button when no dishes match query.

### Sprint 2B — Cart & Checkout
- [x] **2.10 Create CartContext**: Global context with `addToCart`, `updateQuantity`, `removeFromCart`, `clearCart`.
- [x] **2.11 Persist cart to `localStorage`**: Auto-saves order items across reloads.
- [x] **2.12 Build Cart page**: Item list, quantity buttons, subtotal, tax (10%), free delivery, and order total.
- [x] **2.13 Add cart icon to Navbar**: Dynamic badge with real-time count.
- [x] **2.14 Build Checkout page**: Customer contact info, delivery address, gate instructions, payment choice.
- [x] **2.15 Build `POST /api/orders` endpoint**: Stores submitted orders directly into Supabase.
- [x] **2.16 Build Order Confirmation page**: Generates ticket number, estimated delivery time (25-35m), and status.
- [x] **2.17 Add form validation**: Ensures valid email, phone, and delivery address.
- [x] **2.18 Add toast notifications**: Floating feedback when dishes are added or orders placed.
- [x] **2.19 Add error state handling**: Friendly recoverable error messages.

---

## Upcoming Phases

- **Phase 3 — Owner Dashboard**
  - Sprint 3A: Admin Auth & protected layout.
  - Sprint 3B: Menu CRUD directly updating Supabase `dishes`.
  - Sprint 3C: Live Order pipeline with Supabase Realtime subscriptions.
- **Phase 4 — Integration & Polish**
- **Phase 5 — Visual & Functional Quality Gate (`/audit`)**
- **Phase 6 — Deployment & Launch**
