/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { completeBooking } from "@/services/booking.service";
import { updateBookingStatus } from "@/services/AdminBooking.service";
import { Calendar, Clock, User, ArrowRight, Inbox, RefreshCw, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { TutorBooking } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function TutorBookingsCard({ bookings }: { bookings: TutorBooking[] }) {
  const [localBookings, setLocalBookings] = useState(bookings);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);
  
  // Modal states
  const [openCompleteId, setOpenCompleteId] = useState<string | null>(null);
  const [openRescheduleId, setOpenRescheduleId] = useState<string | null>(null);

  // ✅ 1. Complete Session Logic (Shudhu ATTENDED thakle)
  const handleComplete = async (id: string) => {
    setIsActionLoading(id);
    const success = await completeBooking(id);
    if (success) {
      toast.success("Session marked as completed!");
      setLocalBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status: "COMPLETED" } : b))
      );
      setOpenCompleteId(null);
    } else {
      toast.error("Update failed. Try again.");
    }
    setIsActionLoading(null);
  };

  // ✅ 2. Reschedule Logic (Shudhu CONFIRMED thakle)
  const handleReschedule = async (id: string) => {
    setIsActionLoading(id);
    try {
      const res = await updateBookingStatus(id, "RESCHEDULED");
      if (res.success) {
        toast.success("Status updated to Rescheduled");
        setLocalBookings(prev =>
          prev.map(b => (b.id === id ? { ...b, status: "RESCHEDULED" } : b))
        );
        setOpenRescheduleId(null);
      }
    } catch (err) {
      toast.error("Failed to reschedule");
    } finally {
      setIsActionLoading(null);
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
        const displayTime = b.slot 
          ? `${b.slot.startTime} - ${b.slot.endTime}` 
          : (b.dateTime ? new Date(b.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Time TBD");

        return (
          <div key={b.id} className="group bg-white dark:bg-zinc-950 p-5 rounded-[32px] border border-slate-100 dark:border-zinc-900 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 dark:hover:border-indigo-500/20">

            {/* Student Info */}
            <div className="flex items-center gap-4 flex-1 w-full">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-indigo-600 border border-slate-100 dark:border-zinc-800 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <User size={24} />
              </div>
              <div>
                <h3 className="font-black text-sm dark:text-white uppercase tracking-tight">{b.student?.name || "Unknown Student"}</h3>
                <p className="text-[11px] text-slate-400 font-bold">{b.student?.email}</p>
              </div>
            </div>

            {/* Schedule */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-zinc-900 px-4 py-2 rounded-2xl border border-slate-100 dark:border-zinc-800">
                <Calendar size={14} className="text-indigo-500" />
                <span className="text-[10px] font-black uppercase text-slate-600 dark:text-zinc-300">{displayDate}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-zinc-900 px-4 py-2 rounded-2xl border border-slate-100 dark:border-zinc-800">
                <Clock size={14} className="text-indigo-500" />
                <span className="text-[10px] font-black uppercase text-slate-600 dark:text-zinc-300">{displayTime}</span>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-50 dark:border-zinc-900">
              <StatusBadge status={b.status} />

              <div className="flex items-center gap-2">
                
                {/* Case 1: ATTENDED -> Show Complete Button */}
                {b.status === "ATTENDED" && (
                  <Dialog open={openCompleteId === b.id} onOpenChange={(open) => setOpenCompleteId(open ? b.id : null)}>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase hover:bg-emerald-700 active:scale-95 transition-all shadow-lg shadow-emerald-200">
                        Complete <ArrowRight size={12} />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[400px] rounded-[32px] bg-white dark:bg-zinc-950 p-8 border-none">
                      <DialogHeader className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                          <CheckCircle2 size={32} />
                        </div>
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">Finish Session?</DialogTitle>
                        <DialogDescription className="text-sm">
                          Mark the session with {b.student?.name} as completed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex gap-3 mt-6">
                        <Button variant="ghost" onClick={() => setOpenCompleteId(null)} className="flex-1 rounded-2xl font-black text-[10px]">No</Button>
                        <Button onClick={() => handleComplete(b.id)} disabled={isActionLoading === b.id} className="flex-1 bg-emerald-600 text-white rounded-2xl font-black text-[10px]">
                          {isActionLoading === b.id ? <Loader2 className="animate-spin" /> : "Yes, Complete"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                {/* Case 2: CONFIRMED -> Show Reschedule Button */}
                {b.status === "CONFIRMED" && (
                  <Dialog open={openRescheduleId === b.id} onOpenChange={(open) => setOpenRescheduleId(open ? b.id : null)}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-10 rounded-2xl border-amber-200 text-amber-600 hover:bg-amber-50 text-[10px] font-black uppercase gap-2">
                        <RefreshCw size={12} /> Reschedule
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[400px] rounded-[32px] bg-white dark:bg-zinc-950 p-8 border-none">
                      <DialogHeader className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                          <AlertTriangle size={32} />
                        </div>
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">Reschedule?</DialogTitle>
                        <DialogDescription className="text-sm">
                          Are you sure you want to reschedule this session?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex gap-3 mt-6">
                        <Button variant="ghost" onClick={() => setOpenRescheduleId(null)} className="flex-1 rounded-2xl font-black text-[10px]">Cancel</Button>
                        <Button onClick={() => handleReschedule(b.id)} disabled={isActionLoading === b.id} className="flex-1 bg-amber-600 text-white rounded-2xl font-black text-[10px]">
                          {isActionLoading === b.id ? <Loader2 className="animate-spin" /> : "Confirm"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    CONFIRMED: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20",
    COMPLETED: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20",
    PENDING: "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20",
    CANCELLED: "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20",
    RESCHEDULED: "bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-500/10 dark:border-violet-500/20",
    ATTENDED: "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-500/10 dark:border-indigo-500/20",
  };

  return (
    <span className={`text-[9px] font-black px-4 py-2 rounded-full border uppercase tracking-widest ${styles[status] || styles.PENDING}`}>
      {status}
    </span>
  );
}