"use server"

import { env } from "@/env";
import { Tutor } from "@/types/Tutor.type";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;

// ✅ Types
interface TutorApiResponse {
  data: Tutor[];
}

export interface TutorQueryParams {
  id?: string;
  search?: string;
  categoryId?: string;
  rating?: number;
  price?: number;
}


export const getMyProfile = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/my/profile`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("getMyProfile error:", err);
    return null;
  }
};

// --- Tutor Related Individual Exports ---

/**
 * ফিল্টার অনুযায়ী একাধিক টিউটর প্রোফাইল ফেচ করার জন্য
 */
export const getTutorProfiles = async (
  params?: TutorQueryParams
): Promise<{ data: TutorApiResponse | null; error: string | null }> => {
  try {
    const query = new URLSearchParams();

    if (params?.id) query.append("id", params.id);
    if (params?.search) query.append("search", params.search);
    if (params?.categoryId) query.append("categoryId", params.categoryId);
    if (params?.rating) query.append("rating", String(params.rating));
    if (params?.price) query.append("price", String(params.price));

    const res = await fetch(`${API_URL}/api/tutor/profile?${query.toString()}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    console.error(err);
    return { data: null, error: "Failed to fetch tutor profile" };
  }
};

/**
 * নির্দিষ্ট আইডি দিয়ে একজন টিউটরের প্রোফাইল ফেচ করার জন্য
 */
export const getTutorById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/api/tutor/profile/${id}`);
    const data = await res.json();
    return { data: data, error: null };
  } catch (err) {
    console.error(err);
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

/**
 * সব ক্যাটাগরি ফেচ করার জন্য
 */
export const getCategories = async (): Promise<{ data: { id: string; name: string }[]; error: string | null }> => {
  try {
    const res = await fetch(`${API_URL}/api/categories`);
    const data = await res.json();
    return { data: data?.data ?? data ?? [], error: null };
  } catch (err) {
    console.error(err);
    return { data: [], error: "Failed to fetch categories" };
  }
};

/**
 * কোনো ফিল্টার ছাড়া সব টিউটর প্রোফাইল ফেচ করার জন্য
 */
export const getAllTutorProfiles = async (): Promise<Tutor[]> => {
  try {
    const res = await fetch(`${API_URL}/api/tutor/profile`, {
      cache: "no-store",
    });
    const result = await res.json();
    return result.data || result || [];
  } catch (err) {
    console.error("getAllTutorProfiles error:", err);
    return [];
  }
};