"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { Slot } from "./tutorSlot.service";

const API_URL = env.NEXT_PUBLIC_API_URL || env.API_URL;

export type BookingStatus = "CONFIRMED" | "CANCELLED" | "PENDING" | "COMPLETED";

export type Booking = {
    id: string;
    dateTime: string; 
    status: BookingStatus;
    createdAt?: string;
    studentId?: string;
    tutorId?: string;
    slotId?: string | null;
    slot?: {
        id: string;
        date: string;
        startTime: string;
        endTime: string;
    } | null;
    student?: {
        id: string;
        name: string;
        email: string;
        image?: string;
        phone?: string;
    };
    tutor?: {
        id: string;
        name: string;
        email: string;
        image?: string;
    };
};

async function getAuthToken() {
    const cookieStore = await cookies();
    return cookieStore.get("better-auth.session_token")?.value;
}




export async function cancelBooking(bookingId: string): Promise<boolean> {
    const sessionToken = await getAuthToken();
    if (!sessionToken) return false;

    try {
        const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            body: JSON.stringify({ status: "CANCELLED" }),
        });

        if (!res.ok) {
            const errorData = await res.text();
            console.error("Cancel Booking Error:", errorData);
            return false;
        }

        return true;
    } catch (error) {
        console.error("cancelBooking error:", error);
        return false;
    }
}


export async function getMyBookings(): Promise<Booking[]> {
    const sessionToken = await getAuthToken();
    if (!sessionToken) return [];

    try {
        const res = await fetch(`${API_URL}/api/my/bookings`, {
            headers: {
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            next: { revalidate: 0 },
        });

        if (!res.ok) throw new Error("Failed to fetch student bookings");
        const data = await res.json();
        return data?.data || data?.bookings || (Array.isArray(data) ? data : []);
    } catch (error) {
        console.error("getMyBookings error:", error);
        return [];
    }
}


export async function getTutorBookings(): Promise<Booking[]> {
    const sessionToken = await getAuthToken();
    if (!sessionToken) return [];

    try {
        const res = await fetch(`${API_URL}/api/my/bookings/tutor`, {
            headers: {
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            next: { revalidate: 0 },
        });

        const data = await res.json();
     
        return data?.data || data?.bookings || (Array.isArray(data) ? data : []);
    } catch (error) {
        console.error("getTutorBookings error:", error);
        return [];
    }
}


export async function createBooking(tutorProfileId: string, dateTime: string, status: string, slotId?: string): Promise<Booking | null> {
    const sessionToken = await getAuthToken();
    if (!sessionToken) return null;

    try {
        const res = await fetch(`${API_URL}/api/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            body: JSON.stringify({ tutorProfileId, dateTime, status, slotId }),
        });
        return res.ok ? await res.json() : null;
    } catch (error) {
        return null;
    }
}


export async function completeBooking(bookingId: string): Promise<boolean> {
    const sessionToken = await getAuthToken();
    if (!sessionToken) return false;

    try {
        const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            body: JSON.stringify({ status: "COMPLETED" }),
        });
        return res.ok;
    } catch (error) {
        return false;
    }
}


