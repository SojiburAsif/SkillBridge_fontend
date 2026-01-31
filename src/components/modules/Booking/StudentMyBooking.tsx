"use client";

import { useEffect, useState } from "react";
import { getMyBookings, cancelBooking, Booking } from "@/services/booking.service";
import { toast } from "sonner";
import { 
  Calendar, Clock, Mail, XCircle, CheckCircle2, 
  AlertCircle, Trash2, ArrowRight, UserCircle2, Sparkles 
} from "lucide-react";

// Shadcn UI Components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

export default function MyBookingsCard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id: string) => {
    const toastId = toast.loading("Processing cancellation...");

    try {
      const updated = await cancelBooking(id);
      if (updated) {
        toast.success("Booking cancelled successfully!", { id: toastId });
        setBookings(prev =>
          prev.map(b => (b.id === id ? { ...b, status: "CANCELLED" } : b))
        );
      } else {
        toast.error("Failed to cancel booking", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative h-40 w-full overflow-hidden rounded-[32px] bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 dark:via-zinc-800/50 to-transparent animate-shimmer" />
             <div className="p-8 flex items-center gap-6">
                <div className="h-16 w-16 rounded-2xl bg-slate-100 dark:bg-zinc-900 animate-pulse" />
                <div className="space-y-3 flex-1">
                   <div className="h-4 w-1/4 bg-slate-100 dark:bg-zinc-900 rounded animate-pulse" />
                   <div className="h-3 w-1/3 bg-slate-100 dark:bg-zinc-900 rounded animate-pulse" />
                </div>
             </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-zinc-950 rounded-[40px] border border-dashed border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="h-20 w-20 rounded-full bg-slate-50 dark:bg-zinc-900 flex items-center justify-center text-slate-300 dark:text-zinc-700 mb-6">
            <AlertCircle size={40} />
          </div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-[5px]">No active sessions found</p>
          <button className="mt-6 text-xs font-bold text-blue-600 hover:underline flex items-center gap-2">
            Explore Tutors <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((b) => {
            const initial = b.tutor?.name?.charAt(0) || "T";
            const bookingDate = new Date(b.dateTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
            const bookingTime = new Date(b.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            const isCancelled = b.status === "CANCELLED";
            const isConfirmed = b.status === "CONFIRMED";

            return (
              <div
                key={b.id}
                className={`relative group overflow-hidden bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-[35px] border transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 ${
                  isCancelled ? 'border-slate-100 opacity-75' : 'border-slate-100 dark:border-zinc-900 hover:border-blue-200'
                }`}
              >
                {/* Background Glow */}
                <div className={`absolute -right-10 -top-10 h-32 w-32 blur-[80px] rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-20 ${isConfirmed ? 'bg-blue-600' : 'bg-rose-600'}`} />

                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                  
                  {/* Left: Avatar & Info */}
                  <div className="flex items-center gap-6 w-full lg:w-auto">
                    <div className={`relative h-20 w-20 shrink-0 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl transition-transform duration-500 group-hover:scale-105 ${
                      isCancelled ? 'bg-slate-300' : 'bg-gradient-to-br from-blue-600 to-indigo-800'
                    }`}>
                      {initial}
                      {!isCancelled && (
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-white dark:bg-zinc-950 rounded-full flex items-center justify-center">
                          <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-black text-slate-900 dark:text-zinc-100 uppercase tracking-tighter">
                          {b.tutor?.name}
                        </h3>
                        {isConfirmed && <Sparkles size={16} className="text-blue-500 animate-pulse" />}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <UserCircle2 size={14} />
                        <span className="text-[11px] font-bold uppercase tracking-widest truncate max-w-[150px]">
                          {b.tutor?.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center: Schedule Details */}
                  <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-center">
                    <div className="flex flex-col items-center px-6 py-3 bg-slate-50 dark:bg-zinc-900/50 rounded-[20px] border border-slate-100 dark:border-zinc-800 min-w-[120px]">
                      <Calendar size={14} className="text-blue-500 mb-1" />
                      <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Date</span>
                      <span className="text-xs font-black text-slate-700 dark:text-zinc-200">{bookingDate}</span>
                    </div>
                    <div className="flex flex-col items-center px-6 py-3 bg-slate-50 dark:bg-zinc-900/50 rounded-[20px] border border-slate-100 dark:border-zinc-800 min-w-[120px]">
                      <Clock size={14} className="text-indigo-500 mb-1" />
                      <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Time</span>
                      <span className="text-xs font-black text-slate-700 dark:text-zinc-200">{bookingTime}</span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-5 w-full lg:w-auto justify-between lg:justify-end">
                    <Badge className={`rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-[2px] border-none shadow-sm ${
                      isConfirmed ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10' : 
                      isCancelled ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10' : 
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {isConfirmed ? <CheckCircle2 size={10} className="mr-2 inline" /> : <XCircle size={10} className="mr-2 inline" />}
                      {b.status}
                    </Badge>

                    {isConfirmed && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="h-12 w-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 hover:bg-rose-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg shadow-rose-500/5 group/btn">
                            <Trash2 size={20} className="group-hover/btn:rotate-12 transition-transform" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="dark:bg-zinc-950 border-none rounded-[40px] shadow-2xl p-8">
                          <AlertDialogHeader>
                            <div className="h-16 w-16 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-600 mb-4">
                                <AlertCircle size={32} />
                            </div>
                            <AlertDialogTitle className="text-2xl font-black uppercase tracking-tighter dark:text-white leading-none">
                              Terminate <br /><span className="text-rose-600">Session?</span>
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-sm font-medium py-4">
                              Are you sure you want to cancel the booking with <span className="text-slate-900 dark:text-white font-bold">{b.tutor?.name}</span>? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="gap-3">
                            <AlertDialogCancel className="h-14 rounded-2xl border-none bg-slate-100 dark:bg-zinc-900 font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all">
                              No, Go Back
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleCancel(b.id)}
                              className="h-14 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-rose-600/20"
                            >
                              Yes, Cancel Booking
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}