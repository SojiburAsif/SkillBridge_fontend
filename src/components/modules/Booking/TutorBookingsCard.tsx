"use client";

import {  completeBooking } from "@/services/booking.service";
import { Calendar, Clock,  User, ArrowRight, Inbox } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { TutorBooking } from "@/types";

export function TutorBookingsCard({ bookings }: { bookings: TutorBooking[] }) {
  const [localBookings, setLocalBookings] = useState(bookings);

  const handleComplete = async (id: string) => {
    const success = await completeBooking(id);
    if (success) {
      toast.success("Session marked as completed!");
      setLocalBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status: "COMPLETED" } : b))
      );
    } else {
      toast.error("Update failed. Try again.");
    }
  };

  if (localBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-zinc-950 rounded-[40px] border border-dashed border-slate-200 dark:border-zinc-800">
        <Inbox className="text-slate-300 mb-4" size={48} />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">No appointments yet</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {localBookings.map(b => {
        const displayDate = b.slot?.date || (b.dateTime ? new Date(b.dateTime).toLocaleDateString() : "TBD");
        const displayTime = b.slot ? `${b.slot.startTime} - ${b.slot.endTime}` : "Not set";

        return (
          <div key={b.id} className="group bg-white dark:bg-zinc-950 p-5 rounded-[32px] border border-slate-100 dark:border-zinc-900 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 dark:hover:border-indigo-500/20">
            
            {/* Student Avatar & Info */}
            <div className="flex items-center gap-4 flex-1 w-full">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-indigo-600 border border-slate-100 dark:border-zinc-800 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <User size={24} />
              </div>
              <div>
                <h3 className="font-black text-sm dark:text-white uppercase tracking-tight">{b.student?.name}</h3>
                <p className="text-[11px] text-slate-400 font-bold">{b.student?.email}</p>
              </div>
            </div>

            {/* Schedule Details */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-zinc-900 px-4 py-2 rounded-2xl">
                <Calendar size={14} className="text-indigo-500" />
                <span className="text-[10px] font-black uppercase text-slate-600 dark:text-zinc-300">{displayDate}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-zinc-900 px-4 py-2 rounded-2xl">
                <Clock size={14} className="text-indigo-500" />
                <span className="text-[10px] font-black uppercase text-slate-600 dark:text-zinc-300">{displayTime}</span>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-50 dark:border-zinc-900">
               <StatusBadge status={b.status} />
               
               {b.status === "CONFIRMED" && (
                 <button 
                  onClick={() => handleComplete(b.id)} 
                  className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
                 >
                   Complete Session <ArrowRight size={12} />
                 </button>
               )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// status design helper
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    CONFIRMED: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20",
    COMPLETED: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20",
    PENDING: "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20",
    CANCELLED: "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20",
  };

  return (
    <span className={`text-[9px] font-black px-4 py-2 rounded-full border uppercase tracking-widest ${styles[status] || styles.PENDING}`}>
      {status}
    </span>
  );
}