"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;

export type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

export type DashboardAnalytics = {
    users: {
        total: number;
        byRole: {
            students: number;
            tutors: number;
            admins: number;
        };
        byStatus: {
            active: number;
            inactive: number;
            band: number;
        };
    };
    profiles: {
        students: number;
        tutors: number;
    };
    bookings: {
        total: number;
        completed: number;
        cancelled: number;
    };
    reviews: {
        total: number;
    };
    categories: {
        total: number;
    };
    tutorSlots: {
        total: number;
        booked: number;
        available: number;
    };
};

const emptyDashboardAnalytics: DashboardAnalytics = {
    users: {
        total: 0,
        byRole: {
            students: 0,
            tutors: 0,
            admins: 0,
        },
        byStatus: {
            active: 0,
            inactive: 0,
            band: 0,
        },
    },
    profiles: {
        students: 0,
        tutors: 0,
    },
    bookings: {
        total: 0,
        completed: 0,
        cancelled: 0,
    },
    reviews: {
        total: 0,
    },
    categories: {
        total: 0,
    },
    tutorSlots: {
        total: 0,
        booked: 0,
        available: 0,
    },
};

function normalizeDashboardAnalytics(input: unknown): DashboardAnalytics {
    const data = (input && typeof input === "object" ? input : {}) as Partial<DashboardAnalytics>;

    return {
        users: {
            total: data.users?.total ?? 0,
            byRole: {
                students: data.users?.byRole?.students ?? 0,
                tutors: data.users?.byRole?.tutors ?? 0,
                admins: data.users?.byRole?.admins ?? 0,
            },
            byStatus: {
                active: data.users?.byStatus?.active ?? 0,
                inactive: data.users?.byStatus?.inactive ?? 0,
                band: data.users?.byStatus?.band ?? 0,
            },
        },
        profiles: {
            students: data.profiles?.students ?? 0,
            tutors: data.profiles?.tutors ?? 0,
        },
        bookings: {
            total: data.bookings?.total ?? 0,
            completed: data.bookings?.completed ?? 0,
            cancelled: data.bookings?.cancelled ?? 0,
        },
        reviews: {
            total: data.reviews?.total ?? 0,
        },
        categories: {
            total: data.categories?.total ?? 0,
        },
        tutorSlots: {
            total: data.tutorSlots?.total ?? 0,
            booked: data.tutorSlots?.booked ?? 0,
            available: data.tutorSlots?.available ?? 0,
        },
    };
}

// Fetch all users
export async function getAllUsers(): Promise<User[]> {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!sessionToken) return [];

    try {
        const res = await fetch(`${env.API_URL}/api/admin/users`, {
            headers: {
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            next: { revalidate: 0 }, // cache control
        });

        const data = await res.json();
        // Handle different data structures
        return Array.isArray(data) ? data : (data.users || data.data || []);
    } catch (error) {
        console.error("Fetch users error:", error);
        return [];
    }
}


export async function updateUserStatus(userId: string, status: string) {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!sessionToken) throw new Error("No session token found");

    const res = await fetch(`${env.API_URL}/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: `better-auth.session_token=${sessionToken}`,
        },
        body: JSON.stringify({ status }),
    });

    if (!res.ok) throw new Error("Failed to update status");
    return res.json();
}

export type StudentProfile = {
    id: string;
    studentId: string; 
    grade: string;
    interests: string[]; 
    user: {
        id: string;
        name: string;
        email: string;
        phone: string;
        role: string;
        status: string;
    };
    createdAt: string;
};

export async function getAllStudentProfiles(): Promise<StudentProfile[]> {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${env.API_URL}/api/admin/student/Allprofile`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
            next: { revalidate: 0 },
        });

        if (!res.ok) return [];

        const data = await res.json();
        return Array.isArray(data) ? data : (data.students || data.data || []);
    } catch (error) {
        console.error("Fetch student profiles error:", error);
        return [];
    }
}

export async function getDashboardAnalytics(): Promise<DashboardAnalytics> {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!sessionToken) return emptyDashboardAnalytics;

    try {
        const res = await fetch(`${env.API_URL}/api/admin/dashboard/analytics`, {
            headers: {
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            next: { revalidate: 0 },
        });

        if (!res.ok) return emptyDashboardAnalytics;

        const data = await res.json();
        return normalizeDashboardAnalytics(data?.data || data);
    } catch (error) {
        console.error("Fetch dashboard analytics error:", error);
        return emptyDashboardAnalytics;
    }
}