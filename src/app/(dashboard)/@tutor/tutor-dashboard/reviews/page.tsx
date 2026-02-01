/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";
import { getMyReviews } from "@/services/Review.service";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    Loader2, Star, MessageSquare, Calendar, 
    User, RefreshCcw, LayoutGrid 
} from "lucide-react";
import { toast } from "sonner";

interface ReviewPageProps {
    userId: string;
    role?: string; // Optional rakhlam jate error na dey
}

export default function ReviewPage({ userId, role }: ReviewPageProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getMyReviews(userId);
            if (res.success) {
                setReviews(res.data || []);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchReviews();
        }
    }, [userId, fetchReviews]);

    // ================= LOADING STATE =================
    if (loading) {
        return (
            <div className="flex flex-col h-[70vh] items-center justify-center space-y-6">
                <div className="relative">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                    <div className="absolute inset-0 blur-xl bg-blue-600/20 animate-pulse" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[5px] text-slate-400">Syncing Feedback</p>
            </div>
        );
    }

    // ================= NOT FOUND STATE =================
    if (reviews.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="relative mb-10">
                    <div className="absolute inset-0 bg-blue-600/10 blur-[60px] rounded-full scale-150" />
                    <div className="relative w-40 h-40 bg-white dark:bg-zinc-900 rounded-[50px] shadow-2xl border border-slate-100 dark:border-zinc-800 flex items-center justify-center">
                        <MessageSquare size={56} className="text-slate-100 dark:text-zinc-800" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <LayoutGrid size={24} className="text-slate-300 dark:text-zinc-600" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 max-w-sm">
                    <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white leading-none">
                        Records <span className="text-blue-600 italic">Empty</span>
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-[3px] text-slate-400 leading-relaxed">
                        Currently, no academic feedback has been registered for this account ID.
                    </p>
                </div>

                <button 
                    onClick={fetchReviews}
                    className="mt-12 group flex items-center gap-3 px-10 h-14 bg-slate-900 dark:bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-widest rounded-3xl transition-all shadow-xl shadow-blue-500/10 active:scale-95"
                >
                    <RefreshCcw size={14} className="group-active:rotate-180 transition-transform duration-500" />
                    Re-verify Data
                </button>
            </div>
        );
    }

    // ================= DATA VIEW MODE =================
    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-3">
                    <Badge className="bg-blue-600 text-white border-none rounded-md px-2 py-0.5 text-[8px] font-black uppercase tracking-widest">
                        System Records
                    </Badge>
                    <h1 className="text-5xl font-black uppercase tracking-tighter dark:text-white leading-none">
                        Feedback <span className="text-blue-600 italic">Logs</span>
                    </h1>
                    <p className="text-[10px] font-bold uppercase tracking-[4px] text-slate-400">
                        History of evaluations and mentorship reviews
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Total Entries</p>
                    <p className="text-3xl font-black text-blue-600 leading-none">{reviews.length}</p>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid gap-6">
                {reviews.map((review) => (
                    <Card key={review.id} className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-zinc-900 rounded-[40px] overflow-hidden transition-all hover:translate-y-[-5px]">
                        <CardContent className="p-10">
                            <div className="flex flex-col md:flex-row justify-between gap-8">
                                <div className="space-y-6 flex-1">
                                    {/* Star Rating */}
                                    <div className="flex items-center gap-1.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={18} 
                                                className={i < review.rating ? "fill-blue-600 text-blue-600" : "text-slate-100 dark:text-zinc-800"} 
                                            />
                                        ))}
                                        <span className="ml-4 text-xs font-black text-slate-900 dark:text-white">{review.rating}.0</span>
                                    </div>
                                    
                                    {/* Comment */}
                                    <p className="text-lg md:text-xl text-slate-700 dark:text-zinc-300 font-bold leading-snug tracking-tight italic">
                                        {review.comment}
                                    </p>

                                    {/* Footer Info */}
                                    <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-50 dark:border-zinc-800">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-600/10 flex items-center justify-center">
                                                <User size={14} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black uppercase text-slate-400">From Student</p>
                                                <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white">
                                                    {review.student?.name || "Anonymous Student"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-zinc-800 flex items-center justify-center">
                                                <Calendar size={14} className="text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black uppercase text-slate-400">Timestamp</p>
                                                <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white">
                                                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Icon Side */}
                                <div className="flex items-center justify-center md:w-32 border-l border-slate-50 dark:border-zinc-800 pl-8">
                                    <MessageSquare size={40} className="text-slate-100 dark:text-zinc-800" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}