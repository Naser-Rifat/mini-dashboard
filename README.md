# SofOF Mini Dashboard

A modern, high-performance admin dashboard built with Next.js 16, React 19, and Tailwind CSS. This project demonstrates best practices in frontend architecture, accessibility (WCAG 2.1 AA), and state management.

## 🚀 Features

### **Dashboard & User Management**

- **Data Visualization**: Real-time mock statistics for active, pending, and total users.
- **Advanced Filtering**: Filter users by status (Active, Inactive, Pending) and role (Admin, Editor, User).
- **Global Search**: Command-palette style search with debounce and hotkey support (`⌘K`).
- **Pagination**: Responsive pagination with custom page sizes.
- **Deep Linking**: All filters, search queries, and pagination states are synced with the URL for easy sharing.

### **Authentication & Security**

- **Authentication Flow**: Login system with persistent session management (Context + Cookies).
- **Route Protection**: Middleware-based route protection for `/dashboard` and other private routes.
- **Role-Based UI**: UI elements adapt based on user permissions.

### **UI/UX & Accessibility**

- **Responsive Design**: Mobile-first approach with collapsible sidebar and mobile drawer.
- **Dark Mode**: Seamless theme switching (Light/Dark/System) using `next-themes`.
- **Accessibility**:
  - Full keyboard navigation support.
  - Screen reader optimized (ARIA labels, roles, and descriptions).
  - Reduced motion support.
  - High contrast implementation.
  - **Score**: 100% Accessibility Audit pass.

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
│   ├── shared/           # Reusable app-wide components
│   └── ui/               # Atomic UI primitives (shadcn)
├── contexts/             # React Contexts (Auth)
├── hooks/                # Custom hooks (useDebounce, useUrlState, etc.)
├── services/             # API service layer
├── types/                # TypeScript type definitions
├── constants/            # Global constants config
└── middleware.ts         # Edge middleware for auth protection
```

## 🏁 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
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
   ```

3. **Run the development server**

   ```bash
   bun run dev
   ```

4. **Open the browser**
   Navigate to [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
bun run build
bun start
```

## 🔐 Credentials (Demo)

Use these credentials to log in:

- **Email**: `demo@example.com`
- **Password**: `password123`

## 🎨 Design Decisions

- **URL State Management**: Instead of local React state, filters and pagination use the URL query parameters. This makes the state shareable and preserves it on refresh.
- **Composition over Inheritance**: Features are composed of smaller, single-responsibility components.
- **Server State**: We treat user data as server state, using SWR to handle caching, revalidation, and loading states automatically.

## ✅ Accessibility Checklist

This project has been audited for:

- [x] Semantic HTML elements
- [x] Proper ARIA roles and labels
- [x] Keyboard focus management
- [x] Color contrast compliance (WCAG AA)
- [x] Screen reader testing

---

Developed by **Abu Naser Rifat**
