/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { getMyBookings } from "@/services/booking.service";
import { TutorSlotService, Slot } from "@/services/tutorSlot.service";
import { createReview, getReviewByBooking } from "@/services/Review.service"; 
import { toast } from "sonner";
import { Calendar, Clock, XCircle, AlertTriangle, Loader2, User, Star, CheckCircle2, UserCheck } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { updateBookingStatus } from "@/services/AdminBooking.service";

interface Review {
  id: string;
  rating: number;
  comment: string;
}

export interface Booking {
  id: string;
  tutorId: string;
  studentId: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "ATTENDED";
  slotId?: string;
  dateTime?: string;
  tutor?: {
    name: string;
    email: string;
  };
  review?: Review | null;
}

export default function MyBookingsCard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [slotsMap, setSlotsMap] = useState<Record<string, Slot>>({});
  const [loading, setLoading] = useState(true);

  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getMyBookings() as any;
      const myBookings: Booking[] = res?.data ? res.data : (Array.isArray(res) ? res : []);
      
      const bookingsWithReviews = await Promise.all(
        myBookings.map(async (b: Booking) => {
          if (b.status === "COMPLETED") {
            try {
              const revRes = await getReviewByBooking(b.id) as any;
              const reviewData = revRes?.data || (revRes?.id ? revRes : null);
              return { ...b, review: reviewData };
            } catch (err) {
              return { ...b, review: null };
            }
          }
          return { ...b, review: null };
        })
      );

      setBookings(bookingsWithReviews);

      const tutorIds = Array.from(new Set(myBookings.map((b) => b.tutorId).filter((id): id is string => !!id)));
      const allFetchedSlots: Record<string, Slot> = {};

      await Promise.all(tutorIds.map(async (tId) => {
        try {
          const res = await TutorSlotService.getSlotsByTutor(tId) as any;
          const slots: Slot[] = res?.data || (Array.isArray(res) ? res : []);
          slots.forEach(s => { allFetchedSlots[s.id] = s; });
        } catch (err) {
          console.error("Error loading slots:", tId);
        }
      }));

      setSlotsMap(allFetchedSlots);
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ✅ Fixed Status Update: Full page refresh charai state update hobe
  const handleStatusUpdate = async (id: string, status: "ATTENDED" | "CANCELLED") => {
    setActionLoading(id);
    try {
      const res = await updateBookingStatus(id, status);
      if (res.success) {
        toast.success(`Booking ${status.toLowerCase()} successfully`);
        
        // ✅ UI State update without full reload
        setBookings(prevBookings => 
          prevBookings.map(b => 
            b.id === id ? { ...b, status: status } : b
          )
        );
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReviewSubmit = async (b: Booking) => {
    if (rating === 0) return toast.error("Please select a rating");
    if (!comment.trim()) return toast.error("Please write a comment");

    setIsReviewLoading(true);
    const result = await createReview({
      rating,
      comment,
      bookingId: b.id,
      tutorId: b.tutorId,
      studentId: b.studentId,
    });

    if (result?.success) {
      toast.success("Review submitted!");
      
      // ✅ Status change holeo jeno refresh na hoy, review-o update kore dichi
      setBookings(prev => 
        prev.map(item => item.id === b.id ? { ...item, review: { id: "temp", rating, comment } } : item)
      );

      setOpenDialogId(null);
      setRating(0);
      setComment("");
    } else {
      toast.error(result?.message || "Failed to submit review");
    }
    setIsReviewLoading(false);
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
          const isCancelled = b.status === "CANCELLED";

          return (
            <div 
              key={b.id} 
              className={`bg-white dark:bg-zinc-950 p-6 rounded-[28px] border border-slate-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm transition-all ${isCancelled ? "opacity-40 grayscale pointer-events-none" : ""}`}
            >
              <div className="flex items-center gap-4 flex-1 w-full">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-bold">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase dark:text-white">{b.tutor?.name || "Tutor"}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider italic">{b.tutor?.email}</p>
                </div>
              </div>

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
                    {slot ? `${slot.startTime} - ${slot.endTime}` : "Pending"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <span className={`text-[9px] font-black px-4 py-2 rounded-full border uppercase tracking-widest 
                  ${b.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                    b.status === "ATTENDED" || b.status === "COMPLETED" ? "bg-indigo-50 text-indigo-600 border-indigo-100" : 
                    b.status === "CANCELLED" ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}>
                  {b.status}
                </span>

                {b.status === "CONFIRMED" && (
                  <Button 
                    onClick={() => handleStatusUpdate(b.id, "ATTENDED")}
                    disabled={actionLoading === b.id}
                    className="h-9 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] uppercase gap-2"
                  >
                    {actionLoading === b.id ? <Loader2 size={12} className="animate-spin" /> : <UserCheck size={14} />} Mark Attended
                  </Button>
                )}

                {/* ✅ REVIEW SECTION START */}
                {b.status === "COMPLETED" && (
                  b.review ? (
                    <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-100 text-[10px] font-black uppercase">
                      <CheckCircle2 size={14} /> Rated {b.review.rating}/5
                    </div>
                  ) : (
                    <Dialog open={openDialogId === b.id} onOpenChange={(val) => setOpenDialogId(val ? b.id : null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="h-9 px-4 rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-black text-[10px] uppercase gap-2">
                          <Star size={14} /> Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-[32px] sm:max-w-[425px] bg-white dark:bg-zinc-950">
                        <DialogHeader><DialogTitle className="text-xl font-black uppercase italic text-center">Rate Session</DialogTitle></DialogHeader>
                        <div className="space-y-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button key={s} type="button" onClick={() => setRating(s)} className="transition-transform hover:scale-110">
                                <Star size={32} className={`${s <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                              </button>
                            ))}
                          </div>
                          <textarea
                            className="w-full h-24 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 outline-none text-xs font-bold uppercase"
                            placeholder="Feedback..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <Button onClick={() => handleReviewSubmit(b)} disabled={isReviewLoading} className="w-full h-12 rounded-2xl bg-indigo-600 text-white font-black uppercase text-[10px]">
                            {isReviewLoading ? "Submitting..." : "Submit Review"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )
                )}
                {/* ✅ REVIEW SECTION END */}

                {(b.status === "CONFIRMED" || b.status === "PENDING") && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="p-2 text-slate-300 hover:text-rose-500 transition-all"><XCircle size={22} /></button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-[32px]">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-black uppercase text-sm flex items-center gap-2"><AlertTriangle className="text-rose-500" size={20} /> Cancel Session?</AlertDialogTitle>
                        <AlertDialogDescription className="text-xs">This action cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-4 gap-2">
                        <AlertDialogCancel className="rounded-2xl text-[10px] font-black uppercase">No</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleStatusUpdate(b.id, "CANCELLED")} className="bg-rose-500 rounded-2xl text-[10px] font-black uppercase">Yes, Cancel</AlertDialogAction>
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