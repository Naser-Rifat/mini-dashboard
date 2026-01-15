// Auth Types
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "user";
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// User Types
export type UserStatus = "active" | "inactive" | "pending";
export type UserRole = "admin" | "editor" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar: string;
  createdAt: string;
  lastLogin: string | null;
}

// API Types
export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  meta: PaginationMeta;
}

// Filter Types
export interface UserFilters {
  search?: string;
  status?: UserStatus | "all";
  role?: UserRole | "all";
  page?: number;
  pageSize?: number;
}

// Stats Types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  newThisMonth: number;
}
