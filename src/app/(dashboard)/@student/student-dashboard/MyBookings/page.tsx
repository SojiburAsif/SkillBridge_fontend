import MyBookings from "@/components/modules/Booking/StudentMyBooking";
import React from "react";

export default function MyBookingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-black p-4 md:p-12 pt-28">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 space-y-2">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
            My Bookings
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm font-medium">
            Manage your scheduled sessions and tutor interactions.
          </p>
        </div>
        <MyBookings />
      </div>
    </div>
  );
}