import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      { title: "Statistics", url: "/admin-dashboard/" },
    ],
  },
  {
    title: "Users",
    items: [
      { title: "Manage Users", url: "/admin-dashboard/users" },
    ],
  },
  {
    title: "Bookings",
    items: [
      { title: "All Bookings", url: "/admin-dashboard/bookings" },
    ],
  },
  {
    title: "Categories",
    items: [
      { title: "Manage Categories", url: "/admin-dashboard/categories" },
    ],
  },
];
