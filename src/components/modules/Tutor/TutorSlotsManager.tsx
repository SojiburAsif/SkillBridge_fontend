/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { TutorSlotService, Slot, SlotInput } from "@/services/tutorSlot.service";
import { Plus, Trash2, Clock, Calendar as CalIcon, Loader2, CheckCircle2, XCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
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

export function ManageSlots({ tutorId }: { tutorId: string }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [newSlot, setNewSlot] = useState<SlotInput>({ date: "", startTime: "", endTime: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSlots = useCallback(async () => {
    if (!tutorId) return;
    setIsLoading(true);
    try {
      const res = await TutorSlotService.getSlotsByTutor(tutorId);
      const actualData = res?.data || res;
      setSlots(Array.isArray(actualData) ? actualData : []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load slots");
    } finally {
      setIsLoading(false);
    }
  }, [tutorId]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const sortedSlots = useMemo(() => {
    return [...slots].sort((a, b) => Number(a.isBooked) - Number(b.isBooked));
  }, [slots]);

  const handleAddSlot = async () => {
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) {
      return toast.error("Please fill in all fields", { icon: <AlertCircle className="text-amber-500" /> });
    }
    if (newSlot.startTime >= newSlot.endTime) {
      return toast.error("End time must be after start time");
    }

    setIsSubmitting(true);
    try {
      const res = await TutorSlotService.addSlots(tutorId, [newSlot]);
      if (res) {
        toast.success("New slot published! 🚀");
        setNewSlot({ date: "", startTime: "", endTime: "" });
        fetchSlots();
      }
    } catch (error: any) {
      toast.error(error.message || "Could not add slot");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Removing slot...");
    try {
      await TutorSlotService.deleteSlot(id);
      toast.success("Slot removed", { id: toastId });
      setSlots(prev => prev.filter(s => s.id !== id));
    } catch (err: any) {
      toast.error(err.message || "Delete failed", { id: toastId });
    }
  };

  return (
    <div className="space-y-8 mt-6 max-w-5xl mx-auto px-4 md:px-0">
      {/* Create Availability Card */}
      <div className="bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-[32px] border border-slate-100 dark:border-zinc-900 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <h2 className="text-sm font-black uppercase tracking-[3px] text-indigo-600 dark:text-indigo-400 mb-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
            <Plus size={16} />
          </div>
          Create Availability
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 ml-2 tracking-widest">Date</label>
            <input 
              type="date" 
              min={new Date().toISOString().split("T")[0]} 
              value={newSlot.date}
              onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
              className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl p-4 text-sm font-bold ring-1 ring-slate-200 dark:ring-zinc-800 focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 ml-2 tracking-widest">Starts</label>
            <input 
              type="time" 
              value={newSlot.startTime}
              onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
              className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl p-4 text-sm font-bold ring-1 ring-slate-200 dark:ring-zinc-800 focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 ml-2 tracking-widest">Ends</label>
            <input 
              type="time" 
              value={newSlot.endTime}
              onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
              className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl p-4 text-sm font-bold ring-1 ring-slate-200 dark:ring-zinc-800 focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none transition-all"
            />
          </div>
          <button 
            onClick={handleAddSlot}
            disabled={isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white h-[54px] rounded-2xl font-black uppercase text-[10px] tracking-[2px] shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <>Publish <Plus size={14} className="rotate-45" /></>}
          </button>
        </div>
      </div>

      {/* Schedule Table Card */}
      <div className="bg-white dark:bg-zinc-950 rounded-[32px] border border-slate-100 dark:border-zinc-900 overflow-hidden shadow-2xl shadow-slate-200/40 dark:shadow-none">
        <div className="p-6 border-b border-slate-50 dark:border-zinc-900 flex justify-between items-center bg-slate-50/30 dark:bg-zinc-900/30">
          <div className="flex items-center gap-3">
             <div className="w-2 h-6 bg-indigo-500 rounded-full" />
             <h3 className="font-black uppercase tracking-widest text-[11px] dark:text-zinc-300">Your Active Schedule</h3>
          </div>
          <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-4 py-1.5 rounded-full text-[10px] font-black border border-indigo-100 dark:border-indigo-500/20">
            {slots.length} TOTAL SLOTS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-zinc-900/50 border-b dark:border-zinc-900">
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 tracking-widest">Date</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 tracking-widest">Duration</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 text-right tracking-widest">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-900">
              {isLoading ? (
                <tr><td colSpan={4} className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-indigo-500" /></td></tr>
              ) : slots.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center opacity-30 text-[10px] font-black uppercase tracking-[2px] dark:text-zinc-400">No Active Slots Found</td></tr>
              ) : (
                sortedSlots.map((s) => (
                  <tr key={s.id} className={`group hover:bg-slate-50/50 dark:hover:bg-zinc-900/40 transition-colors ${s.isBooked ? 'opacity-50' : ''}`}>
                    <td className="p-6">
                      <div className="flex items-center gap-3 font-bold text-sm text-slate-800 dark:text-zinc-200">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.isBooked ? 'bg-slate-100 dark:bg-zinc-800 text-slate-400' : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'}`}>
                           <CalIcon size={16} />
                        </div>
                        {new Date(s.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 font-bold text-sm text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-900 w-fit px-3 py-1.5 rounded-lg border dark:border-zinc-800">
                        <Clock size={14} className={s.isBooked ? "text-slate-400" : "text-indigo-500"} /> {s.startTime} - {s.endTime}
                      </div>
                    </td>
                    <td className="p-6">
                      {s.isBooked ? (
                        <div className="flex items-center gap-1.5 text-rose-500 font-black text-[9px] uppercase bg-rose-50 dark:bg-rose-500/10 px-3 py-1 rounded-full border border-rose-100 dark:border-rose-500/20 w-fit">
                          <XCircle size={12} /> Booked
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-emerald-500 font-black text-[9px] uppercase bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20 w-fit">
                          <CheckCircle2 size={12} /> Available
                        </div>
                      )}
                    </td>
                    <td className="p-6 text-right">
                      {!s.isBooked && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all">
                              <Trash2 size={18} />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-[32px] border-none shadow-2xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2 font-black uppercase text-sm tracking-tight text-slate-800 dark:text-zinc-200">
                                <AlertTriangle className="text-amber-500" /> Are you sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-xs font-medium dark:text-zinc-400">
                                This will permanently remove this availability slot. Students won&apos;t be able to book this time anymore.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="mt-4">
                              <AlertDialogCancel className="rounded-2xl border-slate-100 dark:border-zinc-800 font-black uppercase text-[10px] tracking-widest h-12">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(s.id)}
                                className="bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest h-12"
                              >
                                Yes, Delete Slot
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}