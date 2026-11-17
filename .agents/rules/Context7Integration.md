# 📚 Context7 Integration Rule

**Description:** Mandates the use of Context7 to retrieve real-time, version-specific documentation, code snippets, and API references before and during code implementation, eliminating hallucinations and outdated syntax.

---

## 🎯 Purpose

When implementing or modifying code for this project (Next.js 16, React 19, Tailwind CSS, Prisma / Mongoose, Framer Motion, Lucide Icons, etc.):
1. **Never rely on outdated training memory** for fast-moving library APIs.
2. **Consult Context7** for setup patterns, signatures, component props, and configuration.

---

## 🛠️ Execution Protocol

### Step 1: Resolve Library ID
Before generating code or configuring a dependency, identify the Context7 library ID using `resolve-library-id`:
- **Next.js:** `/vercel/next.js` (specify version e.g. `v16.x` when applicable)
- **Tailwind CSS:** `/tailwindlabs/tailwindcss`
- **Prisma:** `/prisma/prisma`
- **Mongoose:** `/automattic/mongoose`
- **Framer Motion:** `/motiondivision/motion`
- **Lucide Icons:** `/lucide-icons/lucide`

### Step 2: Query Documentation & Snippets
Query Context7 (`query-docs`) for specific, scoped topics:
- App Router route handlers, server actions, caching, metadata
- Form validation and schema integration
- Tailwind theme extension and CSS variables
- Theme toggles (Ember Modern palette) and dark mode integration

### Step 3: Implement Verified Patterns
- Follow exact API signatures and best practices returned by Context7.
- Document any version-specific dependencies or constraints in the commit or implementation notes.

---

## 🚦 Quality Gate Integration
In Phase 5 (`/audit`), check whether external library usages align with the Context7-verified API guidelines and modern standards.
