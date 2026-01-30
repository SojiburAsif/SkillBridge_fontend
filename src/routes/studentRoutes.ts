import { Route } from "@/types";

export const studentRoutes: Route[] = [
    {
        title: "Dashboard",
        items: [
            { title: "MyBookings", url: "/student-dashboard/MyBookings" },
            // { title: "My Bookings", url: "/student-dashboard/bookings" },
            { title: "Profile", url: "/student-dashboard/StudentProfileEdit" },
        ],
    },
   
];
