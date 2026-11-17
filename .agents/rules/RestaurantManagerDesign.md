# Product Design Document: Restaurant Management System

## 1. Overview

The **Restaurant Management System** is a modern, responsive web
application designed to help restaurant owners and managers manage daily
operations from a centralized dashboard.

The system provides tools for managing orders, tables, reservations,
menus, inventory, and sales analytics.

**Primary Goal:** Deliver a premium, intuitive restaurant management
experience with a clean interface and efficient workflows.

## 2. Design Philosophy & Aesthetics

-   **Theme:** Ember Modern --- A warm, premium, and contemporary
    restaurant SaaS experience.
-   **Color Palette:**
    -   **Primary:** Ember Orange `#FF6D4A`.
    -   **Secondary:** Coral Pink `#EA4B71`.
    -   **Light Background:** `#F7F5F2`.
    -   **Dark Background:** `#171717`.
    -   **Surface:** White in Light Mode, `#222222` in Dark Mode.
-   **Theme Support:** Full Light Mode and Dark Mode with a manual
    toggle and system preference detection.
-   **Typography:** Inter for clean and modern readability.
-   **UI Style:** Rounded cards, subtle shadows, refined borders, clean
    spacing, and modern dashboard layouts.
-   **Interactivity:**
    -   Smooth hover effects.
    -   Subtle Framer Motion animations.
    -   Interactive charts and tables.
    -   Responsive sidebar navigation.
    -   Consistent transitions between themes.

## 3. User Interface (UI) Layout

### Main Dashboard

The dashboard provides a quick overview of restaurant performance.

**Statistics Cards:** - Total Revenue. - Total Orders. - Active
Tables. - Pending Reservations.

**Analytics Section:** - Revenue Overview Chart. - Recent Orders. - Top
Selling Items. - Table Occupancy Overview.

### Sidebar Navigation

-   Overview
-   Orders Management
-   Tables Management
-   Reservations
-   Menu Management
-   Inventory
-   Customers
-   Reports & Analytics
-   Settings

### Header

-   Restaurant Logo and Name.
-   Global Search.
-   Notifications.
-   Light/Dark Mode Toggle.
-   User Profile Menu.

## 4. Core Functional Requirements

### A. Orders Management

-   Create new orders.
-   View order details.
-   Update order status.
-   Track order history.
-   Calculate order totals.

### B. Tables Management

-   Display restaurant floor layout.
-   Track available and occupied tables.
-   Assign orders to tables.
-   Update table status.

### C. Menu Management

-   Add, edit, and delete menu items.
-   Organize items into categories.
-   Manage prices and availability.
-   Upload item images.

### D. Reservations

-   Create and manage reservations.
-   Track customer information.
-   Manage reservation dates and times.
-   Assign tables to reservations.

### E. Inventory Management

-   Track stock quantities.
-   Add and update inventory items.
-   Monitor low-stock products.
-   Display inventory alerts.

### F. Reports & Analytics

-   Daily and monthly revenue.
-   Order statistics.
-   Best-selling products.
-   Sales performance charts.

## 5. Technical Stack Construction

The initial version will use a managed backend architecture to reduce
setup and infrastructure complexity.

-   **Frontend:** React + Vite + TypeScript.
-   **Styling:** Tailwind CSS.
-   **UI Components:** shadcn/ui.
-   **Animations:** Framer Motion.
-   **Backend Platform:** Supabase.
-   **Database:** Supabase PostgreSQL.
-   **Authentication:** Supabase Auth.
-   **Authorization & Data Security:** PostgreSQL Row Level Security
    (RLS).
-   **File Storage:** Supabase Storage.
-   **Server-side Logic:** Supabase Edge Functions when required.
-   **Charts:** Recharts.
-   **Version Control:** GitHub.
-   **Frontend Hosting & Deployment:** Vercel.
-   **Custom Domain:** To be purchased or connected through Hostinger in
    a later phase.

A separate ASP.NET Core API is not required for the initial version.
Supabase will provide the database, authentication, storage, and backend
capabilities needed by the application.

## 6. Architecture & Data Flow

The initial architecture will consist of:

1.  **React Frontend:** The user interface, hosted on Vercel.
2.  **Supabase Backend:** Provides authentication, database access, file
    storage, and server-side functions.
3.  **PostgreSQL Database:** Stores restaurant data.
4.  **Supabase Auth:** Handles user sign-in and session management.
5.  **Row Level Security:** Restricts data access according to the
    authenticated user's permissions.

The React application will communicate with Supabase using the official
Supabase client.

### Security Requirements

-   Enable RLS on all tables exposed to the client.
-   Define policies that ensure users can only access data they are
    authorized to access.
-   Never expose the Supabase `service_role` key or other secret keys in
    frontend code.
-   Keep privileged operations on trusted server-side functions, such as
    Supabase Edge Functions, when needed.
-   Store frontend configuration and public client keys using
    environment variables.
-   Validate permissions on the backend; hiding UI elements is not an
    authorization mechanism.

## 7. Deployment Strategy

Deployment will happen in stages to keep the initial setup simple.

### Phase 1 --- Local Development

-   Create the React + Vite + TypeScript application.
-   Create and configure the Supabase project.
-   Set up the initial PostgreSQL schema and RLS policies.
-   Implement authentication and the core dashboard.
-   Test the application locally.

### Phase 2 --- Initial Deployment

-   Push the project to GitHub.
-   Connect the GitHub repository to Vercel.
-   Configure the required environment variables in Vercel.
-   Deploy the frontend using the Vercel-provided project URL.
-   Connect the deployed frontend to the Supabase project.

### Phase 3 --- Integration & Testing

-   Connect all frontend modules to Supabase.
-   Test authentication, database operations, and file uploads.
-   Verify RLS policies and role-based access.
-   Test the application across desktop, tablet, and mobile devices.
-   Fix integration, usability, and security issues.

### Phase 4 --- Custom Domain

-   Purchase or use a domain managed through Hostinger.
-   Add the custom domain to the Vercel project.
-   Configure the DNS records required by Vercel in Hostinger.
-   Verify domain ownership and HTTPS/SSL configuration.
-   Keep the frontend hosted on Vercel; Hostinger is used for domain
    management unless a hosting change is deliberately planned.

## 8. Responsive Design Requirements

-   **Desktop:** Full sidebar and dashboard grid.
-   **Tablet:** Adaptive sidebar and flexible card layouts.
-   **Mobile:** Collapsible navigation and vertically stacked content.
-   Both themes must work consistently across all screen sizes.

## 9. Future Considerations

-   Multi-Branch Restaurant Management.
-   Multi-Tenant SaaS Support.
-   Employee and Staff Management.
-   Advanced Role-Based Access Control.
-   Customer Loyalty Program.
-   Online Ordering Integration.
-   Kitchen Display System (KDS).
-   AI-powered Sales Forecasting.

The initial product scope (single restaurant, multi-branch, or
multi-tenant SaaS) must be confirmed before finalizing the database
model, tenant boundaries, and permission policies.

## 10. Project Success Criteria

The project is considered successful when:

1.  All agreed core restaurant management modules work correctly.
2.  The interface follows the Ember Modern identity.
3.  Light and Dark Modes are fully implemented.
4.  The application is responsive across devices.
5.  Frontend modules integrate correctly with Supabase.
6.  RLS policies protect restaurant data and enforce access permissions.
7.  The application is deployed on Vercel and connected to Supabase.
8.  The application provides a smooth and intuitive user experience.

------------------------------------------------------------------------

**Note:** This is an initial PDD. The project scope still needs
confirmation on whether the system is intended for a single restaurant,
a multi-branch operation, or a multi-tenant SaaS product before database
relationships and detailed permissions are finalized.
