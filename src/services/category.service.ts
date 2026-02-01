"use server";

import { env } from "@/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type Category = {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

const API_URL = env.NEXT_PUBLIC_API_URL || env.API_URL;

export async function getAllCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/api/categories`, {
      // ১ ঘণ্টা ক্যাশ রাখার কারণে নতুন ডাটা আসছিল না। 
      // এটাকে 'no-store' করে দিন।
      cache: "no-store"
    });
    const data = await res.json();

    const finalData = data?.data || data?.categories || data || [];
    return Array.isArray(finalData) ? finalData : [];
  } catch (err) {
    console.error("Category Fetch Error:", err);
    return [];
  }
}
export async function createCategory(name: string): Promise<Category | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!sessionToken) {
      console.error("No session token found");
      return null;
    }

    const res = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `better-auth.session_token=${sessionToken}`,
      },
      body: JSON.stringify({ name }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create category: ${errorText}`);
    }

    const data = await res.json();

    // ক্যাশ রিভ্যালিডেট করা যাতে UI আপডেট হয়
    revalidatePath("/admin/categories");

    return data?.data || data;

  } catch (err: unknown) {
    // এখানে 'any' এর বদলে 'unknown' ব্যবহার করে টাইপ চেক করা হয়েছে
    if (err instanceof Error) {
      console.error("Category Creation Error:", err.message);
      throw new Error(err.message);
    }

    console.error("An unknown error occurred");
    throw new Error("An unexpected error occurred");
  }
}
