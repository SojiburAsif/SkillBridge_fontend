import React from "react";
import { Star, LayoutGrid, ArrowRight, ShieldCheck, Banknote } from "lucide-react";
import { Tutor } from "@/types/Tutor.type";
import Link from "next/link";

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="group relative w-full max-w-[360px] bg-white dark:bg-zinc-950 rounded-[35px] p-7 border border-slate-100 dark:border-zinc-900 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] hover:-translate-y-2">
      
      {/* Header: Category & Status Text */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-500/5 px-3 py-1.5 rounded-xl border border-blue-100/50 dark:border-blue-500/10">
          <LayoutGrid size={14} className="text-blue-600 dark:text-blue-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {tutor.category.name}
          </span>
        </div>
        
        {/* Status as Text */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-tighter text-green-500 dark:text-green-400 bg-green-500/10 px-2 py-1 rounded-md">
            • {tutor.status || "Active"}
          </span>
        </div>
      </div>

      {/* Name & Experience Area */}
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors leading-tight tracking-tight uppercase">
          {tutor.user.name}
        </h3>
        <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-500">
           <ShieldCheck size={14} className="text-blue-500/50" />
           <p className="text-[11px] font-bold uppercase tracking-wide truncate">
             {tutor.experience} Experience
           </p>
        </div>
      </div>

      {/* Pricing & Rating Box */}
      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-900/50 rounded-[24px] mb-8 border border-slate-100/50 dark:border-zinc-800/50">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
             <Banknote size={14} className="text-orange-500" />
             <span className="text-2xl font-black text-slate-900 dark:text-white italic">৳{tutor.price}</span>
          </div>
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-[2px] ml-5">Per Month</span>
        </div>

        <div className="flex flex-col items-end">
           <div className="flex items-center gap-1 mb-1">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-black text-slate-900 dark:text-white">{tutor.rating || "5.0"}</span>
           </div>
           <span className="text-[8px] font-bold text-slate-400 uppercase">Top Rated</span>
        </div>
      </div>

      {/* Action Button */}
      <Link href={`/TutoreProfile/${tutor.id}`} className="block">
        <button className="group/btn w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white py-4 rounded-[20px] text-[11px] font-black uppercase tracking-[2px] transition-all active:scale-[0.98] shadow-lg shadow-slate-200 dark:shadow-none">
          Explore Profile 
          <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </button>
      </Link>

      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 -z-10 w-24 h-24 bg-blue-600/5 blur-3xl rounded-full" />
    </div>
  );
}