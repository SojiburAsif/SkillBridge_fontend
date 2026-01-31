"use client";

import { TutorBooking, completeBooking } from "@/services/booking.service";
import { Calendar, Clock, Mail, CheckCircle2, XCircle, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function TutorBookingsCard({ bookings }: { bookings: TutorBooking[] }) {
  const [localBookings, setLocalBookings] = useState(bookings);

  const handleComplete = async (id: string) => {
    const updated = await completeBooking(id);
    if (updated) {
      toast.success("Booking marked as COMPLETED!");
      setLocalBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status: "COMPLETED" } : b))
      );
    } else {
      toast.error("Failed to update booking");
    }
  };

  if (localBookings.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-zinc-950 rounded-[32px] border border-dashed border-slate-200 dark:border-zinc-800">
        <AlertCircle className="mx-auto text-slate-300 dark:text-zinc-700 mb-4" size={48} />
        <p className="text-slate-500 dark:text-zinc-500 font-black uppercase text-xs tracking-widest">
          No Student Bookings Yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {localBookings.map(b => {
        const initial = b.student?.name?.charAt(0) || "S";
        const bookingDate = new Date(b.dateTime).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const bookingTime = new Date(b.dateTime).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={b.id}
            className="group bg-white dark:bg-zinc-950 p-6 rounded-[28px] border border-slate-100 dark:border-zinc-900 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
          >
            {/* Student Avatar Initial */}
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-500/20 uppercase tracking-tighter">
              {initial}
            </div>

            {/* Booking Info */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="text-lg font-black text-slate-900 dark:text-zinc-100 uppercase tracking-tight">
                  {b.student?.name}
                </h3>
                <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 dark:text-zinc-500">
                  <Mail size={12} />
                  <span className="text-[11px] font-bold">{b.student?.email}</span>
                </div>
              </div>

              {/* Schedule Badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-zinc-800">
                  <Calendar size={14} className="text-indigo-500" />
                  <span className="text-[10px] font-black uppercase text-slate-600 dark:text-zinc-400">
                    {bookingDate}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-zinc-800">
                  <Clock size={14} className="text-indigo-500" />
                  <span className="text-[10px] font-black uppercase text-slate-600 dark:text-zinc-400">
                    {bookingTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Status + Action */}
            <div className="shrink-0 w-full md:w-auto flex flex-col items-center md:items-end gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-slate-50 dark:border-zinc-900">
              <span
                className={`flex items-center gap-2 text-[10px] font-black px-5 py-2.5 rounded-full uppercase tracking-[2px] transition-all ${
                  b.status === "CONFIRMED"
                    ? "bg-green-50 text-green-600 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20"
                    : b.status === "CANCELLED"
                    ? "bg-red-50 text-red-600 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20"
                    : b.status === "COMPLETED"
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                    : "bg-slate-50 text-slate-600 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700"
                }`}
              >
                {b.status === "CONFIRMED" && <CheckCircle2 size={14} strokeWidth={3} />}
                {b.status === "CANCELLED" && <XCircle size={14} strokeWidth={3} />}
                {b.status === "COMPLETED" && <CheckCircle size={14} strokeWidth={3} className="animate-pulse" />}
                {b.status}
              </span>

              {/* Complete Button */}
              {b.status === "CONFIRMED" && (
                <button
                  onClick={() => handleComplete(b.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-blue-700 transition"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
