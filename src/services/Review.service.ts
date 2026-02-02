/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { env } from "@/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = env.NEXT_PUBLIC_API_URL;


export const createReview = async (reviewData: any) => {
    try {
        const cookieStore = await cookies();
       
        const allCookies = cookieStore.toString();

        const res = await fetch(`${BASE_URL}/api/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": allCookies,
            },
            body: JSON.stringify(reviewData),
            cache: "no-store",
        });

        const data = await res.json();

        // ব্যাকএন্ড যদি success: false পাঠায়
        if (!res.ok) return { success: false, message: data.error || data.message || "Failed" };

        revalidatePath("/student-dashboard/MyBookings");
        return { success: true, data: data.data };
    } catch (error) {
        return { success: false, message: "Internal Server Error." };
    }
};

/**
 * ✅ 2. Get Review by Booking ID (GET)
 */
export const getReviewByBooking = async (bookingId: string) => {
    try {
        const res = await fetch(`${BASE_URL}/api/reviews/booking/${bookingId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        const data = await res.json();
        if (!res.ok) return { success: false, message: data.message || "Review not found" };

        return { success: true, data: data.data };
    } catch (error) {
        return { success: false, message: "Could not fetch review data" };
    }
};

/**
 * ✅ 3. Get Tutor's My Reviews (GET)
 */
export const getMyReviews = async (userId: string) => {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("better-auth.session_token")?.value;

        if (!sessionToken || !userId) {
            return { success: false, message: "Invalid session or User ID missing." };
        }

        const res = await fetch(`${BASE_URL}/api/reviews/tutor/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken}`,
            },
            cache: 'no-store'
        });

        const data = await res.json();
        if (!res.ok) return { success: false, message: data.message || "Fetch failed" };

        return { success: true, data: data.data || [] };
    } catch (error) {
        console.error("SERVICE_ERROR:", error);
        return { success: false, message: "Server connection error" };
    }
};