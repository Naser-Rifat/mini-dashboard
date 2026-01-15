"use client";

import { memo, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  X,
  Check,
  Clock,
  UserPlus,
  AlertCircle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/contexts/auth-context";
import { ModeToggle } from "@/components/shared";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuClick: () => void;
}

// Mock notifications data
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New User Registered",
    message: "John Smith has joined the platform",
    type: "success",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "System Update",
    message: "Dashboard v2.0 is now available",
    type: "info",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "Pending Approval",
    message: "3 users are waiting for approval",
    type: "warning",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "4",
    title: "Security Alert",
    message: "Unusual login activity detected",
    type: "error",
    time: "1 day ago",
    read: true,
  },
];

// Quick search suggestions
const SEARCH_SUGGESTIONS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "All Users", href: "/dashboard?status=all" },
  { label: "Active Users", href: "/dashboard?status=active" },
  { label: "Pending Users", href: "/dashboard?status=pending" },
  { label: "Inactive Users", href: "/dashboard?status=inactive" },
  { label: "Admins", href: "/dashboard?role=admin" },
  { label: "Editors", href: "/dashboard?role=editor" },
];

// Notification icon based on type
function NotificationIcon({ type }: { type: Notification["type"] }) {
  const icons = {
    info: <Info className="h-4 w-4 text-blue-500" />,
    success: <UserPlus className="h-4 w-4 text-emerald-500" />,
    warning: <Clock className="h-4 w-4 text-amber-500" />,
    error: <AlertCircle className="h-4 w-4 text-red-500" />,
  };
  return icons[type];
}

export const Header = memo(function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Notifications state
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  // Filter search suggestions
  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return SEARCH_SUGGESTIONS;
    const query = searchQuery.toLowerCase();
    return SEARCH_SUGGESTIONS.filter((s) =>
      s.label.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Handle search navigation
  const handleSearchSelect = useCallback(
    (href: string) => {
      router.push(href);
      setSearchQuery("");
      setIsSearchOpen(false);
    },
    [router]
  );

  // Handle search with custom query
  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/dashboard?search=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
        setIsSearchOpen(false);
      }
    },
    [router, searchQuery]
  );

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // Clear notification
  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search with Popover */}
        <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="hidden sm:flex w-64 justify-start text-muted-foreground bg-muted/50 hover:bg-muted"
              aria-label="Search"
            >
              <Search className="mr-2 h-4 w-4" />
              <span className="flex-1 text-left">Search...</span>
              <kbd className="hidden lg:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <form onSubmit={handleSearchSubmit}>
              <div className="flex items-center border-b px-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  autoFocus
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </form>
            <div className="max-h-64 overflow-y-auto p-2">
              {filteredSuggestions.length > 0 ? (
                <>
                  <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    Quick Links
                  </p>
                  {filteredSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.href}
                      onClick={() => handleSearchSelect(suggestion.href)}
                      className="flex w-full items-center rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors text-left"
                    >
                      <Search className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                      {suggestion.label}
                    </button>
                  ))}
                </>
              ) : (
                <p className="px-2 py-4 text-sm text-center text-muted-foreground">
                  No results found
                </p>
              )}
              {searchQuery.trim() && (
                <button
                  onClick={() =>
                    handleSearchSelect(
                      `/dashboard?search=${encodeURIComponent(searchQuery)}`
                    )
                  }
                  className="flex w-full items-center rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors text-left border-t mt-2 pt-2"
                >
                  <Search className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  Search for &quot;{searchQuery}&quot;
                </button>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Theme Toggle */}
        <ModeToggle />

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`Notifications${
                unreadCount > 0 ? `, ${unreadCount} unread` : ""
              }`}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto py-1 px-2 text-xs"
                  onClick={markAllAsRead}
                >
                  Mark all read
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer",
                      !notification.read && "bg-muted/30"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="shrink-0 mt-0.5">
                      <NotificationIcon type={notification.type} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={cn(
                            "text-sm truncate",
                            !notification.read && "font-medium"
                          )}
                        >
                          {notification.title}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clearNotification(notification.id);
                          }}
                          className="shrink-0 text-muted-foreground hover:text-foreground"
                          aria-label="Dismiss notification"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="shrink-0">
                        <span className="h-2 w-2 rounded-full bg-primary block" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No notifications
                  </p>
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => router.push("/dashboard")}
                  >
                    View all notifications
                  </Button>
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full"
              aria-label="User menu"
            >
              <Avatar className="h-9 w-9 border">
                <AvatarImage
                  src={user?.avatar}
                  alt={user?.name || "User avatar"}
                />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
});
