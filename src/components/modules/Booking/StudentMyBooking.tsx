"use client";

import { useState, useEffect } from "react";
import { Booking, cancelBooking, getMyBookings } from "@/services/booking.service";
import { TutorSlotService, Slot } from "@/services/tutorSlot.service";
import { toast } from "sonner";
import { Calendar, Clock, XCircle, AlertTriangle, Loader2, User, Star } from "lucide-react";
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
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MyBookingsCard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [slotsMap, setSlotsMap] = useState<Record<string, Slot>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const myBookings = await getMyBookings();
        setBookings(myBookings);

        const tutorIds = Array.from(new Set(myBookings.map(b => b.tutorId).filter(Boolean)));
        const allFetchedSlots: Record<string, Slot> = {};
        
        await Promise.all(tutorIds.map(async (tId) => {
          try {
            const res = await TutorSlotService.getSlotsByTutor(tId as string);
            const slots: Slot[] = res?.data || (Array.isArray(res) ? res : []);
            slots.forEach(s => {
              allFetchedSlots[s.id] = s;
            });
          } catch (err) {
            console.error(`Slots load failed for: ${tId}`);
          }
        }));

        setSlotsMap(allFetchedSlots);
      } catch (err) {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCancel = async (id: string) => {
    const success = await cancelBooking(id);
    if (success) {
      toast.success("Booking cancelled successfully");
      // UI থেকে বুকিংটি সরিয়ে ফেলা বা আপডেট করা
      setBookings(prev => prev.filter(b => b.id !== id));
    } else {
      toast.error("Could not cancel booking");
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="space-y-4">
      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-zinc-900/50 rounded-[32px] border border-dashed border-slate-200">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">No active bookings found</p>
        </div>
      ) : (
        bookings.map((b) => {
          const slot = b.slotId ? slotsMap[b.slotId] : null;

          return (
            <div key={b.id} className="bg-white dark:bg-zinc-950 p-6 rounded-[28px] border border-slate-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm hover:shadow-md transition-all">
              
              {/* Tutor Info */}
              <div className="flex items-center gap-4 flex-1 w-full">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-bold">
                   <User size={20} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase dark:text-white">
                    {b.tutor?.name || "Private Session"}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {b.tutor?.email}
                  </p>
                </div>
              </div>

              {/* Slot Time Details */}
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-zinc-900 px-4 py-2 rounded-xl border border-slate-100 dark:border-zinc-800">
                  <Calendar size={14} className="text-indigo-500" />
                  <span className="text-[10px] font-black uppercase text-slate-600 dark:text-zinc-300">
                    {slot?.date || (b.dateTime ? new Date(b.dateTime).toLocaleDateString() : "TBD")}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-zinc-900 px-4 py-2 rounded-xl border border-slate-100 dark:border-zinc-800">
                  <Clock size={14} className="text-indigo-500" />
                  <span className="text-[10px] font-black uppercase text-slate-600 dark:text-zinc-300">
                    {slot ? `${slot.startTime} - ${slot.endTime}` : "Pending Time"}
                  </span>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <span className={`text-[9px] font-black px-4 py-2 rounded-full border uppercase tracking-widest ${
                  b.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                  b.status === "COMPLETED" ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                  "bg-amber-50 text-amber-600 border-amber-100"
                }`}>
                  {b.status}
                </span>

                {/* Review Button for Completed */}
                {b.status === "COMPLETED" && (
                  <Link href={`/student-dashboard/reviews/${b.tutorId}`}>
                    <Button variant="outline" className="h-9 px-4 rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-black text-[10px] uppercase gap-2">
                      <Star size={14} fill="currentColor" /> Review
                    </Button>
                  </Link>
                )}

                {/* Cancel Button: CONFIRMED ba PENDING thakle dekhabe */}
                {(b.status === "CONFIRMED" || b.status === "PENDING") && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="p-2 text-slate-300 hover:text-rose-500 transition-all hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl">
                        <XCircle size={22} />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-[32px] border-none shadow-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-black uppercase text-sm tracking-tight flex items-center gap-2">
                          <AlertTriangle className="text-rose-500" size={20} /> Cancel Appointment?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-xs font-medium">
                          You are about to cancel this {b.status.toLowerCase()} session. The tutor will be notified and the slot will be released.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-4 gap-2">
                        <AlertDialogCancel className="rounded-2xl border-slate-100 font-black uppercase text-[10px] tracking-widest h-12">
                          Keep Session
                        </AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleCancel(b.id)} 
                          className="bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest h-12 shadow-lg shadow-rose-200"
                        >
                          Confirm Cancellation
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}