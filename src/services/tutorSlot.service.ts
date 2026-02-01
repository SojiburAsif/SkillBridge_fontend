import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface SlotInput {
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:mm
  endTime: string;    // HH:mm
}

export type Slot = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  tutorProfileId: string;
};

export const TutorSlotService = {
  // ১. টিউটরের সব স্লট দেখা
  getSlotsByTutor: async (tutorId: string) => {
    const res = await fetch(`${API_URL}/api/tutor/profileSlot/${tutorId}`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch slots");
    return await res.json(); 
  },

  // ২. নতুন স্লট যোগ করা
  addSlots: async (tutorId: string, slots: SlotInput[]) => {
    const res = await fetch(`${API_URL}/api/tutor/profileSlot/${tutorId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ slots }),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add slots");
    }
    return await res.json();
  },

  // ৩. স্লট ডিলিট করা
  deleteSlot: async (slotId: string) => {
    const res = await fetch(`${API_URL}/api/tutor/profileSlot/${slotId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Delete failed");
    return await res.json();
  },
};