import { BarChart3, Users, CalendarCheck, Layers, LucideIcon } from "lucide-react";

// Route টাইপটিকে আইকন সহ ডিফাইন করে নেওয়া
export interface RouteItem {
  title: string;
  url: string;
  icon?: LucideIcon; // আইকন সাপোর্ট যোগ করা হলো
}

export interface Route {
  title: string;
  items: RouteItem[];
}

export const adminRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      { 
        title: "Statistics", 
        url: "/admin-dashboard",
        icon: BarChart3 
      },
    ],
  },
  {
    title: "Users",
    items: [
      { 
        title: "Manage Users", 
        url: "/admin-dashboard/users",
        icon: Users 
      },
    ],
  },
  {
    title: "Bookings",
    items: [
      { 
        title: "All Bookings", 
        url: "/admin-dashboard/bookings",
        icon: CalendarCheck 
      },
    ],
  },
  {
    title: "Categories",
    items: [
      { 
        title: "Manage Categories", 
        url: "/admin-dashboard/categories",
        icon: Layers 
      },
    ],
  },
];