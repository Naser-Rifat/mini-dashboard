"use client";

import { Suspense, useCallback } from "react";
import { StatsCards } from "./stats-cards";
import { UsersTable } from "./users-table";
import { FilterBar } from "./filter-bar";
import { Pagination } from "./pagination";
import { StatsCardsSkeleton, TableSkeleton } from "./skeletons";
import { useUsers, useStats, useUrlState } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DashboardStats, User, PaginationMeta } from "@/types";

interface Props {
  initialStats: DashboardStats;
  initialUsers: User[];
  initialMeta: PaginationMeta;
}

function DashboardContentInner({
  initialStats,
  initialUsers,
  initialMeta,
}: Props) {
  const { filters, setFilters, resetFilters } = useUrlState();

  const {
    users,
    meta,
    isLoading: usersLoading,
    isValidating,
    error: usersError,
    mutate: mutateUsers,
  } = useUsers(filters);
  const {
    stats,
    isLoading: statsLoading,
    error: statsError,
    mutate: mutateStats,
  } = useStats();

  // Use SSR data as fallback while SWR loads
  const displayUsers = users.length > 0 ? users : initialUsers;
  const displayMeta = meta.total > 0 ? meta : initialMeta;
  const displayStats = stats.totalUsers > 0 ? stats : initialStats;

  const handleRefresh = useCallback(() => {
    mutateUsers();
    mutateStats();
  }, [mutateUsers, mutateStats]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your users and view statistics.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isValidating}
        >
          {isValidating ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* Stats */}
      {statsLoading && !displayStats.totalUsers ? (
        <StatsCardsSkeleton />
      ) : statsError ? (
        <Card className="border-destructive">
          <CardContent className="pt-6 text-destructive">
            Error: {statsError}
          </CardContent>
        </Card>
      ) : (
        <StatsCards stats={displayStats} />
      )}

      {/* Users Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Users</span>
            <span className="text-sm font-normal text-muted-foreground">
              {displayMeta.total} total
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            onReset={resetFilters}
            isLoading={usersLoading}
          />

          {usersLoading && displayUsers.length === 0 ? (
            <TableSkeleton rows={5} />
          ) : usersError ? (
            <div className="py-8 text-center">
              <p className="text-destructive mb-4">{usersError}</p>
              <Button onClick={() => mutateUsers()}>Retry</Button>
            </div>
          ) : displayUsers.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <p>No users found.</p>
              <Button variant="link" onClick={resetFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <UsersTable users={displayUsers} isLoading={isValidating} />
          )}

          {displayUsers.length > 0 && (
            <Pagination
              meta={displayMeta}
              onPageChange={(page) => setFilters({ page })}
              onPageSizeChange={(pageSize) => setFilters({ pageSize, page: 1 })}
              isLoading={isValidating}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function DashboardContent(props: Props) {
  return (
    <Suspense fallback={<TableSkeleton rows={5} />}>
      <DashboardContentInner {...props} />
    </Suspense>
  );
}
