"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;

// নির্দিষ্ট স্ট্যাটাস টাইপ ডিফাইন করা
export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export type Booking = {
    id: string;
    dateTime: string;
    status: BookingStatus; // string এর বদলে নির্দিষ্ট টাইপ
    studentId: string | null;
    tutorId: string | null;
    slotId: string | null;
    createdAt?: string;
};

export async function getAllBookings(): Promise<Booking[]> {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;
    
    try {
        const res = await fetch(`${API_URL}/api/all/bookings`, {
            headers: { Cookie: `better-auth.session_token=${sessionToken}` },
            next: { revalidate: 0 }
        });
        const data = await res.json();
        return Array.isArray(data) ? data : (data.data || []);
    } catch (error) {
        console.error("Fetch bookings error:", error);
        return [];
    }
}

export async function updateBookingStatus(bookingId: string, status: string) {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    const res = await fetch(`${env.API_URL}/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Cookie: `better-auth.session_token=${sessionToken}`
        },
        body: JSON.stringify({ status })
    });
    return res.json();
}

// টিউটর প্রোফাইল এবং স্লট ফেচ করার জন্য (Client-side use এর জন্য API route ব্যবহার করা ভালো, তবে এখানে সরাসরি দেখাচ্ছি)
export async function getTutorProfile(tutorId: string) {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/tutor/profile/${tutorId}`);
    return res.json();
}