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

/* ----------------------------------------
   Fetch all users (ADMIN)
---------------------------------------- */


export async function getAllUsers(): Promise<User[]> {
    const cookieStore = cookies();

    const sessionToken =
        (await cookieStore).get("better-auth.session_token")?.value;

    if (!sessionToken) {
        console.error("No session token found");
        return [];
    }

    const res = await fetch(`${env.API_URL}/api/admin/users`, {
        headers: {
            Cookie: `better-auth.session_token=${sessionToken}`,
        },
        cache: "no-store",
    });

    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.users)) return data.users;
    if (Array.isArray(data.data)) return data.data;
    return [];

}

/* ----------------------------------------
   Update user status
---------------------------------------- */
export async function updateUserStatus(
    userId: string,
    status: string
) {
    const cookieStore = cookies();

    const sessionToken =
        (await cookieStore).get("better-auth.session_token")?.value;

    if (!sessionToken) {
        throw new Error("No session token found");
    }

    const res = await fetch(
        `${API_URL}/api/admin/users/${userId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            body: JSON.stringify({ status }),
            cache: "no-store",
        }
    );

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update status: ${errorText}`);
    }

    return res.json();
}
