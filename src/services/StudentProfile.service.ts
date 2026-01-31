"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export type StudentProfile = {
    id: string;
    StudentID: number;
    grade: string;
    interests: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: {
        id: string;
        name: string;
        email: string;
        image?: string;
        phone?: string;
        role: string;
        status: string;
        createdAt: string;
        updatedAt: string;
    };
};

const API_URL = env.NEXT_PUBLIC_API_URL || env.API_URL;

// Get student profile
export async function getStudentProfile(): Promise<StudentProfile | null> {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get("better-auth.session_token")?.value;

    if (!sessionToken) {
        console.error("No session token found");
        return null;
    }

    try {
        const res = await fetch(`${API_URL}/api/student/profile`, {
            headers: {
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Failed to fetch student profile:", res.status);
            return null;
        }

        const data = await res.json();
        return data?.data || null;
    } catch (error) {
        console.error("Error fetching student profile:", error);
        return null;
    }
}

// Create student profile
export async function createStudentProfile(grade: string, interests: string): Promise<StudentProfile | null> {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get("better-auth.session_token")?.value;

    if (!sessionToken) {
        console.error("No session token found");
        return null;
    }

    try {
        const res = await fetch(`${API_URL}/api/student/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            body: JSON.stringify({ grade, interests }),
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("Failed to create student profile:", res.status, text);
            return null;
        }

        const data = await res.json();
        return data?.data || null;
    } catch (error) {
        console.error("Error creating student profile:", error);
        return null;
    }
}


// Update student profile
export async function updateStudentProfile(payload: {
    grade?: string;
    interests?: string;
}): Promise<StudentProfile | null> {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get("better-auth.session_token")?.value;

    if (!sessionToken) return null;

    try {
        const res = await fetch(`${API_URL}/api/student/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data?.data || null;
    } catch {
        return null;
    }
}
