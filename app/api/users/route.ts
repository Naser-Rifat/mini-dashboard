import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchUsersServer } from "@/lib/api";
import type { UserFilters, UserStatus, UserRole } from "@/app/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: UserFilters = {
      search: searchParams.get("search") || undefined,
      status: (searchParams.get("status") as UserStatus | "all") || "all",
      role: (searchParams.get("role") as UserRole | "all") || "all",
      page: parseInt(searchParams.get("page") || "1", 10),
      pageSize: parseInt(searchParams.get("pageSize") || "10", 10),
    };

    const result = await fetchUsersServer(filters);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
