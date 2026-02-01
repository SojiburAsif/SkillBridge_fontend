"use client";

import { createBooking } from "@/services/booking.service";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, CalendarCheck, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { TutorSlotService } from "@/services/tutorSlot.service";

interface Slot {
  id: string;
  date: string;        // ISO string from backend
  startTime: string;   // ISO string from backend
  endTime: string;     // ISO string from backend
  isBooked: boolean;
}

export function BookingCard({ tutorId }: { tutorId: string }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // --- Load slots ---
  useEffect(() => {
    const loadSlots = async () => {
      try {
        const res = await TutorSlotService.getSlotsByTutor(tutorId);
        const availableSlots = (res.data ?? []).filter((s: Slot) => !s.isBooked);
        setSlots(availableSlots);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load available slots");
      } finally {
        setFetchLoading(false);
      }
    };
    loadSlots();
  }, [tutorId]);

  // --- Booking handler ---
  const handleBooking = async () => {
    if (!selectedSlotId) return toast.error("Please select a time slot");

    setLoading(true);
    const toastId = toast.loading("Confirming your session...");

    try {
      const result = await createBooking(tutorId, selectedSlotId, "CONFIRMED");
      if (result) {
        toast.success("Booking confirmed successfully! 🎉", { id: toastId });
        setSlots(prev => prev.filter(s => s.id !== selectedSlotId));
        setSelectedSlotId("");
      } else {
        toast.error("Booking failed. Please try again.", { id: toastId });
      }
    } catch (err) {
      toast.error("An error occurred during booking.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // --- Formatter functions ---
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (fetchLoading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-white/40" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-white/70 border-b border-white/10 pb-4">
        <CalendarCheck size={16} />
        <h3 className="text-[10px] font-black uppercase tracking-[3px]">Select Schedule</h3>
      </div>

      {slots.length === 0 ? (
        <div className="bg-black/20 p-8 rounded-[24px] text-center border border-white/5">
          <AlertCircle className="mx-auto text-white/20 mb-2" size={24} />
          <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
            No available slots found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
          {slots.map((s) => {
            const isSelected = selectedSlotId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSlotId(s.id)}
                className={`flex flex-col p-4 rounded-2xl border transition-all duration-300 text-left relative ${isSelected
                    ? "bg-white text-blue-700 border-white shadow-xl scale-[1.02]"
                    : "bg-black/20 border-white/10 text-white hover:border-white/30"
                  }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-[9px] font-black uppercase tracking-tighter ${isSelected ? "text-blue-700/50" : "text-white/40"
                      }`}
                  >
                    {formatDate(s.date)}
                  </span>
                  {isSelected && <CheckCircle size={14} className="text-blue-700" />}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={12} className={isSelected ? "text-blue-700" : "text-blue-400"} />
                  <span className="text-xs font-black tracking-tight">
                    {formatTime(s.startTime)} - {formatTime(s.endTime)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={handleBooking}
        disabled={loading || !selectedSlotId}
        className={`w-full h-14 rounded-2xl font-black uppercase tracking-[3px] text-[10px] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2 ${selectedSlotId
            ? "bg-white text-blue-600 hover:shadow-white/10"
            : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
          }`}
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : "Finalize Booking"}
      </button>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
