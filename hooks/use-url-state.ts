"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { UserFilters } from "@/app/types";

/**
 * Hook to persist filter state in URL query parameters
 */
export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse URL params into filters object
  const filters = useMemo<UserFilters>(
    () => ({
      search: searchParams.get("search") || "",
      status: (searchParams.get("status") as UserFilters["status"]) || "all",
      role: (searchParams.get("role") as UserFilters["role"]) || "all",
      page: parseInt(searchParams.get("page") || "1", 10),
      pageSize: parseInt(searchParams.get("pageSize") || "10", 10),
    }),
    [searchParams]
  );

  // Update URL with new filters
  const setFilters = useCallback(
    (newFilters: Partial<UserFilters>) => {
      const params = new URLSearchParams(searchParams.toString());
      const updated = { ...filters, ...newFilters };

      // Reset to page 1 when search/status/role changes
      if (
        newFilters.search !== undefined ||
        newFilters.status !== undefined ||
        newFilters.role !== undefined
      ) {
        if (newFilters.page === undefined) {
          updated.page = 1;
        }
      }

      // Set or delete params based on value
      Object.entries(updated).forEach(([key, value]) => {
        const isDefault =
          value === "" ||
          value === "all" ||
          (key === "page" && value === 1) ||
          (key === "pageSize" && value === 10);

        if (isDefault) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams, filters]
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return { filters, setFilters, resetFilters };
}
