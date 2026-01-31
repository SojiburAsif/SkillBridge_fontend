"use client";

import { createBooking } from "@/services/booking.service";
import { useState } from "react";

import { toast } from "sonner";

export function BookingCard({ tutorId }: { tutorId: string }) {
  const [dateTime, setDateTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!dateTime) return toast.error("Please select a date & time");

    setLoading(true);
    try {
      const booking = await createBooking(tutorId, dateTime, "CONFIRMED");
      if (booking) {
        toast.success("Booking created successfully!");
      } else {
        toast.error("Failed to create booking");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error creating booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 p-6 rounded-[32px] shadow-md space-y-4">
      <h3 className="text-lg font-bold dark:text-white">Book a Session</h3>
      <input
        type="datetime-local"
        value={dateTime}
        onChange={e => setDateTime(e.target.value)}
        className="w-full border rounded-lg p-2 text-sm"
      />
      <button
        onClick={handleBooking}
        disabled={loading}
        className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}
