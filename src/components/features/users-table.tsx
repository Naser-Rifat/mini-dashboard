"use client";

import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: User["status"] }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize",
        status === "active" &&
          "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25",
        status === "inactive" &&
          "border-transparent bg-slate-500/15 text-slate-700 dark:text-slate-400 hover:bg-slate-500/25",
        status === "pending" &&
          "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25"
      )}
    >
      {status}
    </Badge>
  );
}

function RoleBadge({ role }: { role: User["role"] }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize font-normal",
        role === "admin" &&
          "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900 dark:bg-purple-900/20 dark:text-purple-400",
        role === "editor" &&
          "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-400",
        role === "user" &&
          "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/20 dark:text-slate-400"
      )}
    >
      {role}
    </Badge>
  );
}

const UserRow = memo(function UserRow({ user }: { user: User }) {
  const formatDate = (date: string | null) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <TableRow className="group">
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 transition-transform group-hover:scale-105">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <RoleBadge role={user.role} />
      </TableCell>
      <TableCell>
        <StatusBadge status={user.status} />
      </TableCell>
      <TableCell className="text-muted-foreground text-sm tabular-nums text-right">
        <time dateTime={user.lastLogin || undefined}>
          {formatDate(user.lastLogin)}
        </time>
      </TableCell>
    </TableRow>
  );
});

interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
}

export function UsersTable({ users, isLoading }: UsersTableProps) {
  return (
    <div
      className="rounded-xl border bg-card shadow-sm"
      role="region"
      aria-label="Users table"
      aria-busy={isLoading}
    >
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-75">User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Last Login</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
