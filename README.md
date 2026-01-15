# SofOF Mini Dashboard

> **Frontend Technical Assessment Submission**

 Link                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| **Live Preview**   | [Insert Vercel/Netlify Link Here](https://your-app.vercel.app)       |

---

A modern, high-performance admin dashboard built with **Next.js 16**, **React 19**, and **Tailwind CSS**. This project demonstrates best practices in frontend architecture, accessibility (WCAG 2.1 AA), and state management.

## 🚀 Features

### **Dashboard & User Management**

- **Data Visualization**: Real-time mock statistics for active, pending, and total users.
- **Advanced Filtering**: Filter users by status (Active, Inactive, Pending) and role (Admin, Editor, User).
- **Global Search**: Command-palette style search with debounce and hotkey support (`⌘K`).
- **Pagination**: Responsive pagination with custom page sizes.
- **Deep Linking**: All filters, search queries, and pagination states are synced with the URL for easy sharing.

### **Authentication & Security**

- **Authentication Flow**: Login system with persistent session management (Context + Server Actions + Cookies).
- **Route Protection**: Proxy-based middleware protection for `/dashboard` and other private routes.
- **Role-Based UI**: UI elements adapt based on user permissions.

### **UI/UX & Accessibility**

- **Responsive Design**: Mobile-first approach with collapsible sidebar and mobile drawer.
- **Dark Mode**: Seamless theme switching (Light/Dark/System) using `next-themes`.
- **Accessibility**:
  - Full keyboard navigation support (Focus guards, Tab order).
  - Screen reader optimized (ARIA labels, roles, and descriptions).
  - Reduced motion support.
  - High contrast implementation.
  - **Audit Score**: 100% Pass.

### **Performance**

- **Hybrid Data Fetching**: Server-side rendering (SSR) for initial load + Client-side polling (SWR) for live updates.
- **Optimistic UI**: Loading skeletons and instant feedback states.
- **Code Structuring**: Atomic design principles with a clear separation of concerns.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16.1](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: [SWR](https://swr.vercel.app/)
- **Runtime/Manager**: [Bun](https://bun.sh/)

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router pages & layouts
│   ├── (auth)/           # Authentication routes (Login)
│   ├── (dashboard)/      # Protected dashboard routes
│   └── api/              # API Route Handlers
├── components/
│   ├── features/         # Complex feature-specific components
│   ├── shared/           # Reusable app-wide components (ThemeToggle)
│   └── ui/               # Atomic UI primitives (shadcn)
├── contexts/             # Global Providers (AuthProvider)
├── hooks/                # Custom hooks (useDebounce, useUrlState)
├── services/             # API service layer & Server Actions
├── types/                # TypeScript type definitions
├── constants/            # Global constants config
└── proxy.ts              # Edge middleware for auth protection
```

## 🏁 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (Optional, can use npm/pnpm/yarn)
- Node.js > 20.x

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sofof-mini-dashboard
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Run the development server**

   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. **Open the browser**  
   Navigate to [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
bun run build
bun start
```

## 🔐 Credentials (Demo)

Use these credentials to experience both Admin and User flows:

- **Email**: `demo@example.com`
- **Password**: `password123`

## 🧠 Key Technical Decisions & Trade-offs

### 1. **URL-Driven State Management**

- **Decision**: Used `useUrlState` hook to sync filters, search, and pagination with URL parameters.
- **Why**: Enables deep linking (shareable URLs), browser history navigation (Back button works), and server-side initial rendering.
- **Trade-off**: Slightly more complex implementation than `useState`, requires careful handling of synchronization to avoid race conditions.

### 2. **Hybrid Data Fetching (SSR + SWR)**

- **Decision**: Initial data is fetched on the server (SSR) and passed to SWR for client-side revalidation.
- **Why**: Provides instant "First Contentful Paint" (SEO & UX) while ensuring data remains fresh without manual page reloads.
- **Trade-off**: Sending initial data adds payload size to the HTML document.

### 3. **Server Actions for Auth Cookies**

- **Decision**: Migrated to Server Actions (`loginAction`, `logoutAction`) for cookie management.
- **Why**: Client-side `document.cookie` is unreliable for immediate server-side middleware checks (Middleware logic happens before client headers are fully propagated in some routing transitions). Server Actions guarantee the cookie is set in the secure HTTP response header.
- **Trade-off**: Requires `use client` components to import server modules, which Next.js handles well but requires architectural awareness.

### 4. **Radix UI Primitives**

- **Decision**: Used Headless UI primitives (Radix) via shadcn/ui.
- **Why**: Guarantees WCAG 2.1 compliance for complex interactive elements (Dropdowns, Dialogs, Selects) which are practically impossible to get perfect from scratch under time constraints.

---

Developed by **Abu Naser Rifat**
