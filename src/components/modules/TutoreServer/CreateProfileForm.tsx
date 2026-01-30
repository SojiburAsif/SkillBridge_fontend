"use server";

import { revalidateTag } from "next/cache";
import { env } from "@/env";
import { cookies } from "next/headers";


const API_URL = env.API_URL;

export type CreateTutorProfileInput = {
    bio: string;
    experience: string;
    price: number;
    categoryId: string;
};

export async function createTutorProfile(formData: FormData) {
    const bio = formData.get("bio") as string;
    const experience = formData.get("experience") as string;
    const price = Number(formData.get("price"));
    const categoryId = formData.get("categoryId") as string;

    const data: CreateTutorProfileInput = { bio, experience, price, categoryId };

      const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/tutor/profile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),

    });

    if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Failed to create profile");
    }

    revalidateTag("tutorProfile", "max");

    return { success: true };
}
