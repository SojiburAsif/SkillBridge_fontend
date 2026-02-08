import { 
  BarChart3, 
  Users, 
  CalendarCheck, 
  Layers, 
  GraduationCap, 
  Briefcase,    
  LucideIcon 
} from "lucide-react";


export interface RouteItem {
  title: string;
  url: string;
  icon?: LucideIcon; 
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
    title: "Profiles",
    items: [
      { 
        title: "Student Profiles", 
        url: "/admin-dashboard/students",
        icon: GraduationCap 
      },
      { 
        title: "Tutor Profiles", 
        url: "/admin-dashboard/tutors", 
        icon: Briefcase 
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
]