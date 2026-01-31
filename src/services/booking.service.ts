"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export type Booking = {
    id: string;
    dateTime: string;
    status: string;
    createdAt: string;
    studentId: string;
    tutorId: string;
    tutor?: {
        id: string;
        name: string;
        email: string;
        image?: string;
    };
};

// Use the correct API URL
const API_URL = env.NEXT_PUBLIC_API_URL || env.API_URL;

// Fetch all bookings
export async function getAllBookings(): Promise<Booking[]> {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get("better-auth.session_token")?.value;

    if (!sessionToken) {
        console.error("No session token found");
        return [];
    }

    try {
        const res = await fetch(`${API_URL}/api/all/bookings`, {
            headers: {
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            cache: "no-store",
        });

        // Handle non-JSON response (HTML error page, 404, 500)
        if (!res.ok) {
            const text = await res.text();
            console.error("Booking API returned error:", res.status, text);
            return [];
        }

        const data = await res.json();

        // Support multiple possible response formats
        if (Array.isArray(data)) return data;
        if (Array.isArray(data.bookings)) return data.bookings;
        if (Array.isArray(data.data)) return data.data;

        console.log("Booking API response:", data);
        return [];
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return [];
    }
}

// Update booking status
export async function updateBookingStatus(
    bookingId: string,
    status: string
): Promise<Booking | null> {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get("better-auth.session_token")?.value;

    if (!sessionToken) {
        console.error("No session token found");
        return null;
    }

    try {
        const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            body: JSON.stringify({ status }),
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("Failed to update booking status:", res.status, text);
            return null;
        }

        const updated = await res.json();
        return updated;
    } catch (error) {
        console.error("Error updating booking status:", error);
        return null;
    }
}
// Create a new booking
export async function createBooking(
    tutorProfileId: string,
    dateTime: string,
    status: string
): Promise<Booking | null> {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get("better-auth.session_token")?.value;

    if (!sessionToken) {
        console.error("No session token found");
        return null;
    }

    try {
        const res = await fetch(`${API_URL}/api/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            body: JSON.stringify({
                tutorProfileId,
                dateTime,
                status,
            }),
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("Failed to create booking:", res.status, text);
            return null;
        }

        const created = await res.json();
        return created;
    } catch (error) {
        console.error("Error creating booking:", error);
        return null;
    }
}

// Fetch only current user's bookings
export async function getMyBookings(): Promise<Booking[]> {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get("better-auth.session_token")?.value;

    if (!sessionToken) {
        console.error("No session token found");
        return [];
    }

    try {
        const res = await fetch(`${API_URL}/api/my/bookings`, {
            headers: {
                "Content-Type": "application/json",
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("MyBookings API returned error:", res.status, text);
            return [];
        }

        const data = await res.json();

        // Support multiple possible response formats
        if (Array.isArray(data)) return data;
        if (Array.isArray(data.bookings)) return data.bookings;
        if (Array.isArray(data.data)) return data.data;

        console.log("MyBookings API response:", data);
        return [];
    } catch (error) {
        console.error("Error fetching my bookings:", error);
        return [];
    }
}

// Cancel booking
export async function cancelBooking(bookingId: string): Promise<Booking | null> {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get("better-auth.session_token")?.value;

    if (!sessionToken) {
        console.error("No session token found");
        return null;
    }

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
            const text = await res.text();
            console.error("Failed to cancel booking:", res.status, text);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Error cancelling booking:", error);
        return null;
    }
}

export type TutorBooking = {
    id: string;
    dateTime: string;
    status: string;
    createdAt: string;
    studentId: string;
    tutorId: string;
    student: {
        id: string;
        name: string;
        email: string;
        image?: string;
        phone?: string;
    };
};

export async function getTutorBookings(): Promise<TutorBooking[]> {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get("better-auth.session_token")?.value;

    if (!sessionToken) {
        console.error("No session token found");
        return [];
    }
    try {
        const res = await fetch(`${API_URL}/api/my/bookings/tutor`, {
            headers: {
                "Content-Type": "application/json",
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("TutorBookings API returned error:", res.status, text);
            return [];
        }

        const data = await res.json();


        // Flexible return: array হলে সরাসরি, না হলে object থেকে বের করো
        if (Array.isArray(data)) {
            return data;
        } else if (Array.isArray(data.bookings)) {
            return data.bookings;
        } else if (Array.isArray(data.data)) {
            return data.data;
        } else {
            console.error("Unexpected API response format:", data);
            return [];
        }
    } catch (error) {
        console.error("Error fetching tutor bookings:", error);
        return [];
    }

}

// Update booking status (Tutor side)
export async function completeBooking(bookingId: string): Promise<TutorBooking | null> {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get("better-auth.session_token")?.value;

    if (!sessionToken) {
        console.error("No session token found");
        return null;
    }

    try {
        const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
            body: JSON.stringify({ status: "COMPLETED" }),
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("Failed to complete booking:", res.status, text);
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Error completing booking:", error);
        return null;
    }
}
