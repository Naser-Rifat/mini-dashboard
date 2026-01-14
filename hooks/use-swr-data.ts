"use client";

import useSWR from "swr";
import type {
  User,
  UserFilters,
  ApiResponse,
  DashboardStats,
} from "@/app/types";

// Simple fetcher function
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

// Build query string from filters
function toQueryString(filters: UserFilters): string {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.status && filters.status !== "all")
    params.set("status", filters.status);
  if (filters.role && filters.role !== "all") params.set("role", filters.role);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.pageSize) params.set("pageSize", String(filters.pageSize));
  return params.toString();
}

/**
 * SWR hook for fetching users with filters
 */
export function useUsers(filters: UserFilters) {
  const url = `/api/users?${toQueryString(filters)}`;

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    ApiResponse<User[]>
  >(url, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  return {
    users: data?.data ?? [],
    meta: data?.meta ?? { total: 0, page: 1, pageSize: 10, totalPages: 0 },
    isLoading,
    isValidating,
    error: error?.message ?? null,
    mutate,
  };
}

/**
 * SWR hook for fetching dashboard stats
 */
export function useStats() {
  const { data, error, isLoading, mutate } = useSWR<DashboardStats>(
    "/api/stats",
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    stats: data ?? {
      totalUsers: 0,
      activeUsers: 0,
      pendingUsers: 0,
      newThisMonth: 0,
    },
    isLoading,
    error: error?.message ?? null,
    mutate,
  };
}
