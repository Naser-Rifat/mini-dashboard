import { Suspense } from "react";
import { fetchUsersServer, fetchDashboardStats } from "@/services/api";
import { DashboardContent, DashboardSkeleton } from "@/components/features";
import type { UserFilters } from "@/types";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    role?: string;
    page?: string;
    pageSize?: string;
  }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const filters: UserFilters = {
    search: params.search,
    status: (params.status as UserFilters["status"]) || "all",
    role: (params.role as UserFilters["role"]) || "all",
    page: params.page ? parseInt(params.page) : 1,
    pageSize: params.pageSize ? parseInt(params.pageSize) : 10,
  };

  // Server-side data fetching (SSR)
  const [usersResponse, stats] = await Promise.all([
    fetchUsersServer(filters),
    fetchDashboardStats(),
  ]);

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent
        initialStats={stats}
        initialUsers={usersResponse.data}
        initialMeta={usersResponse.meta}
      />
    </Suspense>
  );
}
