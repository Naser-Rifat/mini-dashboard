// Route paths
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  USERS: "/users",
} as const;

// API endpoints
export const API_ENDPOINTS = {
  USERS: "/api/users",
  STATS: "/api/stats",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50] as const,
} as const;

// User status options
export const USER_STATUS = {
  ALL: "all",
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
} as const;

// User role options
export const USER_ROLES = {
  ALL: "all",
  ADMIN: "admin",
  EDITOR: "editor",
  USER: "user",
} as const;

// Auth
export const AUTH = {
  STORAGE_KEY: "dashboard_auth_user",
  COOKIE_NAME: "auth_token",
  COOKIE_MAX_AGE: 86400, // 24 hours
} as const;
