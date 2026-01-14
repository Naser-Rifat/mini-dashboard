import type {
  User,
  UserFilters,
  ApiResponse,
  DashboardStats,
} from "@/app/types";
import { mockUsers, simulateDelay } from "./mock-data";

/**
 * Fetch users with filtering and pagination (Server-side)
 */
export async function fetchUsersServer(
  filters: UserFilters = {}
): Promise<ApiResponse<User[]>> {
  await simulateDelay(300);

  const {
    search = "",
    status = "all",
    role = "all",
    page = 1,
    pageSize = 10,
  } = filters;

  let users = [...mockUsers];

  // Search filter
  if (search) {
    const q = search.toLowerCase();
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }

  // Status filter
  if (status && status !== "all") {
    users = users.filter((u) => u.status === status);
  }

  // Role filter
  if (role && role !== "all") {
    users = users.filter((u) => u.role === role);
  }

  // Pagination
  const total = users.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedUsers = users.slice(start, start + pageSize);

  return {
    data: paginatedUsers,
    meta: { total, page, pageSize, totalPages },
  };
}

/**
 * Fetch dashboard stats (Server-side)
 */
export async function fetchDashboardStats(): Promise<DashboardStats> {
  await simulateDelay(200);

  return {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter((u) => u.status === "active").length,
    pendingUsers: mockUsers.filter((u) => u.status === "pending").length,
    newThisMonth: mockUsers.filter((u) => {
      const created = new Date(u.createdAt);
      const now = new Date();
      return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    }).length,
  };
}
