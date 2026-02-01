import { Route } from "@/types/icon";
import { LayoutDashboard, CalendarDays, UserCog } from "lucide-react";

export const studentRoutes: Route[] = [
    {
        title: "Dashboard",
        items: [
            { title: "Home", url: "/student-dashboard/", icon: LayoutDashboard },
            { title: "MyBookings", url: "/student-dashboard/MyBookings", icon: CalendarDays },
            { title: "Profile", url: "/student-dashboard/StudentProfileEdit", icon: UserCog },
        ],
    },
];