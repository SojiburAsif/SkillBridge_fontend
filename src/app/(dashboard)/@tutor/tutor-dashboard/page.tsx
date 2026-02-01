"use client";

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  PlayCircle, 
  Timer,
  Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function TutorDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // প্রতি সেকেন্ডে সময় আপডেট করার জন্য
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // সময়ের ওপর ভিত্তি করে গ্রিটিং লজিক
  const getTimeContext = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { msg: "Good Morning", sub: "Ready to inspire some students today?" };
    if (hour < 17) return { msg: "Good Afternoon", sub: "Keep up the great momentum!" };
    return { msg: "Good Evening", sub: "Wrapping up your successful day?" };
  };

  const greeting = getTimeContext();
  
  const formattedDate = currentTime.toLocaleDateString('en-GB', { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
  });

  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', minute: '2-digit', second: '2-digit' 
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#fcfcfd] dark:bg-black p-4 md:p-8">
      
      {/* PREMIUM WELCOME CARD */}
      <div className="relative w-full max-w-4xl p-10 md:p-16 rounded-[50px] bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 overflow-hidden shadow-2xl shadow-blue-100 dark:shadow-none ring-1 ring-slate-100 dark:ring-zinc-900">
        
        {/* Background Animated Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full -ml-20 -mb-20 blur-[80px]" />

        <div className="relative flex flex-col items-center text-center space-y-10">
          
          {/* Top Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[3px] border border-blue-100 dark:border-blue-500/20">
            <Sparkles size={12} /> {formattedDate}
          </div>

          {/* Main Greeting */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase dark:text-white leading-none">
              {greeting.msg}, <br />
              <span className="text-blue-600">Welcome Tutor!</span>
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 font-medium italic text-lg md:text-xl">
              {greeting.sub}
            </p>
          </div>

          {/* Time Display Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-2xl">
            <div className="flex-1 w-full p-8 rounded-[35px] bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3 mb-2 text-slate-400">
                <Timer size={16} />
                <p className="text-[10px] font-black uppercase tracking-[4px]">Current Local Time</p>
              </div>
              <p className="text-5xl md:text-6xl font-black text-blue-600 tabular-nums tracking-tight">
                {formattedTime}
              </p>
            </div>

           
             
          </div>

          {/* Bottom Instruction */}
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[5px]">
            Authorized Instructor Access Only
          </p>
        </div>
      </div>
    </div>
  );
}