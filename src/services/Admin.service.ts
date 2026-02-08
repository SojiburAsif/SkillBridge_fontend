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