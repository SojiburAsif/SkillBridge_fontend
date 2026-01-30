"use server";

import { env } from "@/env";

export type Category = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

const API_URL = env.NEXT_PUBLIC_API_URL || env.API_URL;

export async function getAllCategories(): Promise<Category[]> {
    const res = await fetch(`${API_URL}/api/categories`, {
        cache: "no-store",
    });

    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.categories)) return data.categories;
    if (Array.isArray(data.data)) return data.data;

    console.log("Category API response:", data);
    return [];
}

export async function createCategories(categories: { name: string }[]) {
    const res = await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories }), 
        cache: "no-store",
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to create category: ${errorText}`);
    }

    return res.json();
}

