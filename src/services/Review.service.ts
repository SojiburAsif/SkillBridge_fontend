/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { env } from "@/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = env.NEXT_PUBLIC_API_URL;

export interface ReviewData {
    rating: number;
    comment: string;
    bookingId: string;
    studentId: string;
    tutorId: string;
}

/**
 * ✅ 1. Create a Review (POST)
 */
export const createReview = async (reviewData: ReviewData) => {
    try {
        const cookieStore = await cookies();

        // 🚨 FIXED: Apnar log onujayi cookie name eikhane 'better-auth.session_token'
        const sessionToken = cookieStore.get("better-auth.session_token")?.value;

        console.log("--- Server Action Check ---");
        console.log("Session Token Found:", !!sessionToken);

        if (!sessionToken) {
            return {
                success: false,
                message: "Authentication failed. Session not found. Please log in again."
            };
        }

        // Backend call
        const res = await fetch(`${BASE_URL}/api/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // ✅ Session token string format-e pathano hochche
                "Authorization": `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(reviewData),
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data.message || data.error || "Review submission failed."
            };
        }

        revalidatePath("/student-dashboard/MyBookings");

        return {
            success: true,
            message: "Review submitted successfully!",
            data: data.data
        };

    } catch (error: any) {
        console.error("CREATE_REVIEW_SERVICE_ERROR:", error.message);
        return {
            success: false,
            message: "Internal Server Error. Please try again later."
        };
    }
};

/**
 * ✅ 2. Get Review by Booking ID (GET)
 */
export const getReviewByBooking = async (bookingId: string) => {
    try {
        const res = await fetch(`${BASE_URL}/api/reviews/booking/${bookingId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { revalidate: 0 }
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.error || "Review not found" };
        }

        return { success: true, data: data.data };
    } catch (error: any) {
        return { success: false, message: "Could not fetch review data" };
    }
};

export const getMyReviews = async (userId: string) => {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("better-auth.session_token")?.value;

        console.log(sessionToken);

        // Apnar endpoint onujayi: /api/reviews/tutor/:id
        const res = await fetch(`${BASE_URL}/api/reviews/tutor/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionToken}`,
            },
            next: { revalidate: 0 }
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.error || "Failed to fetch reviews" };
        }

        return { success: true, data: data.data };
    } catch (error: any) {
        return { success: false, message: "Server connection error" };
    }
};