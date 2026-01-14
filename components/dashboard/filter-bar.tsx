"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import type { UserFilters, UserStatus, UserRole } from "@/app/types";

interface FilterBarProps {
  filters: UserFilters;
  onFiltersChange: (filters: Partial<UserFilters>) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export function FilterBar({
  filters,
  onFiltersChange,
  onReset,
}: FilterBarProps) {
  const [searchInput, setSearchInput] = useState(filters.search || "");
  const debouncedSearch = useDebounce(searchInput, 300);

  // Update filters when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFiltersChange({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, onFiltersChange]);

  // Sync input with URL state when navigating (e.g. back button)
  // Only sync if the URL value is different from our local state AND
  // matches our last pushed value (debouncedSearch) to avoid overwriting ongoing typing
  useEffect(() => {
    if (
      filters.search !== undefined &&
      filters.search !== searchInput &&
      filters.search !== debouncedSearch
    ) {
      setSearchInput(filters.search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search]);

  const hasFilters =
    filters.search ||
    (filters.status && filters.status !== "all") ||
    (filters.role && filters.role !== "all");

  return (
    <div
      className="flex flex-col gap-4 sm:flex-row sm:items-end"
      role="search"
      aria-label="Filter users"
    >
      {/* Search */}
      <div>
        <Label htmlFor="search-users" className="sr-only">
          Search users
        </Label>
        <Input
          id="search-users"
          type="search"
          placeholder="Search users..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-xs h-9"
          aria-describedby="search-hint"
        />
        <p id="search-hint" className="sr-only">
          Search by name or email
        </p>
      </div>

      {/* Status */}
      <div>
        <Label htmlFor="status-filter" className="sr-only">
          Filter by status
        </Label>
        <Select
          value={filters.status || "all"}
          onValueChange={(value) =>
            onFiltersChange({ status: value as UserStatus | "all" })
          }
        >
          <SelectTrigger id="status-filter" className="w-32 h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Role */}
      <div>
        <Label htmlFor="role-filter" className="sr-only">
          Filter by role
        </Label>
        <Select
          value={filters.role || "all"}
          onValueChange={(value) =>
            onFiltersChange({ role: value as UserRole | "all" })
          }
        >
          <SelectTrigger id="role-filter" className="w-32 h-9">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          aria-label="Clear all filters"
          className="hover:text-destructive hover:bg-destructive/10"
        >
          Reset Filters
        </Button>
      )}
    </div>
  );
}
