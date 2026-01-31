import { Route } from "@/types";

export const studentRoutes: Route[] = [
    {
        title: "Dashboard",
        items: [
            { title: "Home", url: "/student-dashboard/" },
            { title: "MyBookings", url: "/student-dashboard/MyBookings" },
            { title: "Profile", url: "/student-dashboard/StudentProfileEdit" },
        ],
    },

];
