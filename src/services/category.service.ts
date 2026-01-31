"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export type Category = {
  id?: string;   // optional করে দিলাম
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

const API_URL = env.NEXT_PUBLIC_API_URL || env.API_URL;

export async function getAllCategories(): Promise<Category[]> {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("better-auth.session_token")?.value;

  const res = await fetch(`${API_URL}/api/categories`, {
    headers: {
      Cookie: `better-auth.session_token=${sessionToken}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (Array.isArray(data)) return data;
  if (Array.isArray(data.categories)) return data.categories;
  if (Array.isArray(data.data)) return data.data;

  console.log("Category API response:", data);
  return [];
}

export async function createCategory(name: string): Promise<Category | null> {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("better-auth.session_token")?.value;

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

  return res.json();
}
