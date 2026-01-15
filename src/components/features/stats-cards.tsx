import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserPlus, Clock } from "lucide-react";
import type { DashboardStats } from "@/types";

export function StatsCards({ stats }: { stats: DashboardStats }) {
  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      desc: "All registered users",
      trend: "+12% from last month",
      icon: Users,
      trendColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      desc: "Currently active",
      trend: "+8% from last month",
      icon: UserCheck,
      trendColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Pending Users",
      value: stats.pendingUsers,
      desc: "Awaiting approval",
      trend: "+3% from last month",
      icon: Clock,
      trendColor: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "New This Month",
      value: stats.newThisMonth,
      desc: "New registrations",
      trend: "+15% from last month",
      icon: UserPlus,
      trendColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{c.title}</CardTitle>
            <c.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{c.value}</div>
            <p className="text-xs text-muted-foreground mb-1">{c.desc}</p>
            <p className={`text-xs ${c.trendColor} font-medium`}>{c.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
