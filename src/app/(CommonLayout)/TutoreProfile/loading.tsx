"use client";

import React from 'react';
import { Loader2, GraduationCap, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#fcfcfd] dark:bg-black p-6">
      
      {/* Central Animated Icon */}
      <div className="relative mb-10 flex items-center justify-center">
        {/* Outer Spinning Ring */}
        <div className="absolute h-24 w-24 rounded-full border-4 border-slate-100 dark:border-zinc-900" />
        <Loader2 className="h-24 w-24 animate-spin text-blue-600 opacity-40 stroke-[1px]" />
        
        {/* Inner Logo */}
        <div className="absolute flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-zinc-950 shadow-xl ring-1 ring-slate-100 dark:ring-zinc-900">
          <GraduationCap className="h-8 w-8 text-blue-600" />
        </div>

        {/* Floating Particles */}
        <Sparkles className="absolute -top-4 -right-4 h-6 w-6 text-blue-400 animate-pulse" />
      </div>

      {/* Text Section */}
      <div className="flex flex-col items-center space-y-3 text-center">
        <h2 className="text-sm font-black uppercase tracking-[8px] text-slate-800 dark:text-white animate-pulse">
          Initializing Portal
        </h2>
        <div className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1 w-1 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1 w-1 rounded-full bg-blue-600 animate-bounce" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[4px] text-slate-400 pt-2 opacity-60">
          Syncing Tutors • Secure Access
        </p>
      </div>

      {/* Background Soft Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}