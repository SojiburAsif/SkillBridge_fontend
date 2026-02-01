"use client";

import { useEffect, useState } from "react";
import { 
  Loader2, 
  GraduationCap, 
  Timer,
  Sparkles,
  ArrowRightCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    // সিমুলেটেড লোডিং
    const timeout = setTimeout(() => setLoading(false), 800);
    
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-GB', { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
  });

  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', minute: '2-digit', second: '2-digit' 
  });

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-6 bg-[#fcfcfd] dark:bg-black">
        <div className="relative flex items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-blue-600 opacity-20" />
          <GraduationCap className="absolute h-8 w-8 text-blue-600" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[5px] text-slate-400 animate-pulse">Initializing Portal</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fcfcfd] dark:bg-black p-6 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-5xl">
        
        {/* Main Dashboard Card */}
        <div className="relative p-8 md:p-20 rounded-[60px] bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 dark:ring-zinc-900 overflow-hidden">
          
          <div className="flex flex-col items-center text-center space-y-12">
            
            {/* Top Status Badge */}
            <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[4px] text-slate-500">{formattedDate}</span>
            </div>

            {/* Welcome Text */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase dark:text-white leading-[0.9]">
                Welcome Back, <br />
                <span className="text-blue-600">Student!</span>
              </h1>
              <p className="text-slate-400 dark:text-zinc-500 font-medium italic text-lg md:text-xl max-w-lg mx-auto">
                Your potential is endless. Go do what you were created to do.
              </p>
            </div>

            {/* Time and Action Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl pt-4">
              
              {/* Live Time Display */}
              <div className="p-10 rounded-[40px] bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800 flex flex-col items-center justify-center group">
                <div className="flex items-center gap-2 mb-3">
                  <Timer size={16} className="text-blue-600 group-hover:rotate-180 transition-transform duration-700" />
                  <span className="text-[9px] font-black uppercase tracking-[3px] text-slate-400">System Time</span>
                </div>
                <div className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
                  {formattedTime}
                </div>
              </div>

              {/* Action Button */}
              <Link href="/TutoreProfile" className="h-full">
                <Button className="w-full h-full min-h-[160px] rounded-[40px] bg-blue-600 hover:bg-blue-700 text-white flex flex-col gap-3 shadow-2xl shadow-blue-200 dark:shadow-none transition-all group active:scale-95">
                  <ArrowRightCircle size={40} strokeWidth={1.5} className="group-hover:translate-x-2 transition-transform" />
                  <div className="text-center">
                    <span className="block text-[10px] font-black uppercase tracking-[3px] opacity-70">New Journey</span>
                    <span className="text-xl font-black uppercase tracking-widest">Find a Tutor</span>
                  </div>
                </Button>
              </Link>

            </div>

            {/* Mini Footer */}
            <div className="pt-4">
              <p className="text-[9px] font-bold text-slate-300 dark:text-zinc-700 uppercase tracking-[6px]">
                Global Learning Portal v2.0
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}