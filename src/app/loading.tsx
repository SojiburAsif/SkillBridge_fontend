"use client";

import { Loader2, GraduationCap, Sparkles } from "lucide-react";

export default function DashboardLoading() {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#fcfcfd] dark:bg-black">

            {/* 🌈 Soft gradient glow background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
                <div className="absolute left-1/3 top-1/3 h-[260px] w-[260px] rounded-full bg-indigo-500/10 blur-[120px]" />
            </div>

            {/* 🧠 Main content */}
            <div className="relative z-10 flex flex-col items-center px-6 text-center">

                {/* 🔄 Animated logo stack */}
                <div className="relative mb-10 flex items-center justify-center">
                    {/* Outer ring */}
                    <div className="absolute h-28 w-28 rounded-full border border-slate-200 dark:border-zinc-800" />
                    <Loader2 className="h-28 w-28 animate-spin text-blue-600/40 stroke-[1px]" />

                    {/* Inner card */}
                    <div className="absolute flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-zinc-950 shadow-xl ring-1 ring-slate-200 dark:ring-zinc-800">
                        <GraduationCap className="h-8 w-8 text-blue-600" />
                    </div>

                    {/* Sparkle */}
                    <Sparkles className="absolute -right-4 -top-4 h-6 w-6 animate-pulse text-blue-400" />
                </div>

                {/* 📝 Text */}
                <h2 className="mb-3 text-xs font-black uppercase tracking-[0.45em] text-slate-800 dark:text-white animate-pulse">
                    Initializing Portal
                </h2>

                {/* ⏳ Dots */}
                <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600" />
                </div>

                {/* 🔐 Footer text */}
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-400 opacity-70">
                    Secure Access • Global Learning
                </p>
            </div>
        </div>
    );
}
