import { Route } from "@/types";

export const tutorRoutes: Route[] = [
    {
        title: "Dashboard",
        items: [
            { title: "CreateProfile", url: "/tutor-dashboard/CreateProfile" },
            { title: "My Booking", url: "/tutor-dashboard/MyBooking" },
            { title: "Profile", url: "/tutor-dashboard/profile" },
            { title: "Edit Profile", url: "/tutor-dashboard/Edit" },
        ],
    },
    {
        title: "Ratings & Reviews",
        items: [
            { title: "View Reviews", url: "/tutor/reviews" },
        ],
    },
];
