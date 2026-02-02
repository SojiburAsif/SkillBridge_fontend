"use client";

import React from "react";
import { Star, LayoutGrid, ArrowRight, ShieldCheck, Banknote } from "lucide-react";
import Link from "next/link";
import { Tutor } from "@/types";

interface TutorCardProps {
  tutor: Tutor;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  // টাইপ সেফটি নিশ্চিত করতে এবং এরর এড়াতে ভ্যালুগুলো আগে ডিফাইন করে নেওয়া ভালো
  const categoryName = tutor?.category?.name || "General";
  const tutorName = tutor?.user?.name || "Unknown Instructor";
  const tutorExperience = tutor?.experience || "N/A";
  const tutorPrice = tutor?.price || 0;
  const tutorRating = tutor?.rating || "5.0";
  const tutorStatus = tutor?.status || "Active";

  return (
    <div className="group relative w-full max-w-[360px] min-h-[480px] flex flex-col justify-between bg-white dark:bg-zinc-950 rounded-[40px] p-8 border border-slate-100 dark:border-zinc-900 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(59,130,246,0.15)] hover:-translate-y-2 overflow-hidden">
      
      <div>
        {/* --- Header: Category & Status --- */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 px-4 py-2 rounded-2xl border border-blue-100/50 dark:border-blue-500/10">
            <LayoutGrid size={14} className="text-blue-600 dark:text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {categoryName}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 bg-emerald-500/10 dark:bg-emerald-500/5 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tight text-emerald-600 dark:text-emerald-400">
              {tutorStatus}
            </span>
          </div>
        </div>

        {/* --- Name & Experience Area --- */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors leading-tight tracking-tight uppercase">
            {tutorName}
          </h3>
          <div className="flex items-center gap-2.5 text-slate-500 dark:text-zinc-500">
             <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-900">
                <ShieldCheck size={16} className="text-blue-500" />
             </div>
             <p className="text-xs font-bold uppercase tracking-wide">
               {tutorExperience} Experience
             </p>
          </div>
        </div>

        {/* --- Pricing & Rating Box --- */}
        <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-zinc-900/50 rounded-[30px] mb-10 border border-slate-100/50 dark:border-zinc-800/50 shadow-inner">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
               <Banknote size={18} className="text-emerald-500" />
               <span className="text-3xl font-black text-slate-900 dark:text-white italic">৳{tutorPrice}</span>
            </div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[2px] mt-1">Per Month</span>
          </div>

          <div className="h-10 w-[1px] bg-slate-200 dark:bg-zinc-800" />

          <div className="flex flex-col items-end">
             <div className="flex items-center gap-1.5 mb-1">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="text-lg font-black text-slate-900 dark:text-white">{tutorRating}</span>
             </div>
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Verified Rating</span>
          </div>
        </div>
      </div>

      {/* --- Action Button --- */}
      <Link href={`/TutoreProfile/${tutor.id}`} className="block mt-auto">
        <button className="group/btn w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white py-5 rounded-[22px] text-xs font-black uppercase tracking-[2px] transition-all active:scale-[0.96] shadow-xl shadow-blue-500/10 dark:shadow-none">
          Explore Profile 
          <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1.5" />
        </button>
      </Link>

      {/* Subtle background glow effect */}
      <div className="absolute -top-10 -right-10 -z-10 w-40 h-40 bg-blue-600/10 blur-[80px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />
    </div>
  );
}