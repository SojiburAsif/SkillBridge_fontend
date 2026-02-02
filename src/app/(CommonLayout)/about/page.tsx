"use client";

import React from 'react';
import { 
  Users, 
  BookOpen, 
  ShieldCheck, 
  Star, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Search,
  CalendarCheck,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  

  const workflows = [
    {
      title: "Search & Filter",
      description: "Browse through our extensive list of tutors. Filter by subject, rating, or price to find the perfect match for your needs.",
      icon: Search,
    },
    {
      title: "Instant Booking",
      description: "Check real-time availability and book your session instantly. No more back-and-forth emails to schedule a class.",
      icon: CalendarCheck,
    },
    {
      title: "Track Progress",
      description: "Manage your learning journey through a dedicated dashboard. View history, leave reviews, and monitor your growth.",
      icon: Trophy,
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-black min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HERO SECTION ================= */}
        <section className="text-center mb-24 mt-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 dark:text-white leading-tight">
            Bridging the Gap Between <br />
            <span className="text-blue-600">Ambition & Expertise.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-semibold leading-relaxed">
            SkillBridge is a premier full-stack ecosystem designed to connect students with elite tutors. 
            We provide the tools, the talent, and the technology to make learning seamless and effective.
          </p>
        </section>

      

        {/* ================= HOW IT WORKS (THE PROCESS) ================= */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight dark:text-white mb-4">How SkillBridge Works</h2>
            <p className="text-slate-500 font-semibold italic uppercase tracking-wider text-sm">Simplifying your learning experience</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {workflows.map((item, i) => (
              <div key={i} className="relative group p-8 rounded-3xl border border-transparent hover:border-slate-100 dark:hover:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900/30 transition-all duration-300">
                <div className="h-14 w-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <item.icon className="text-blue-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-2xl font-black mb-4 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= MISSION & REASONS ================= */}
        <section className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full text-sm font-black uppercase tracking-tighter">
              Our Identity
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight dark:text-white leading-tight">
              Why SkillBridge stands out in Modern Education.
            </h2>
            <div className="space-y-5">
              {[
                "Instant confirmation for every booking session.",
                "Robust role-based dashboards for personalized management.",
                "Direct communication between students and subject experts.",
                "Comprehensive review system to ensure quality and trust."
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                    <CheckCircle2 className="text-green-500 group-hover:text-white transition-colors" size={16} />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-semibold text-lg">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] overflow-hidden shadow-2xl flex items-center justify-center p-10">
               <div className="text-white space-y-6 text-center">
                  <ShieldCheck size={80} className="mx-auto opacity-50 mb-4" />
                  <h3 className="text-3xl font-black">Secure & Verified</h3>
                  <p className="text-blue-100 font-semibold text-lg">
                    Every tutor profile is vetted to ensure you receive the highest standard of guidance. 
                    Your privacy and education are our top priorities.
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* ================= CTA SECTION ================= */}
        <section className="bg-blue-600 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Ready to Expand <br className="hidden md:block" /> Your Knowledge?
            </h2>
            <p className="text-blue-100 mb-12 max-w-2xl mx-auto font-semibold text-lg opacity-90">
              Join SkillBridge today. Whether you want to master a new skill or share your expertise, we provide the perfect platform for your success.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild className="bg-white text-blue-600 hover:bg-slate-100 font-black px-10 py-7 rounded-2xl text-lg transition-transform active:scale-95 shadow-xl">
                <Link href="/register">Join as Student</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-blue-600 font-black px-10 py-7 rounded-2xl text-lg transition-all active:scale-95">
                <Link href="/register">Become a Tutor</Link>
              </Button>
            </div>
          </div>
          {/* Background Aesthetics */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-[100px]" />
        </section>

        {/* ================= FOOTER NOTE ================= */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
            © 2026 SkillBridge Platform. Empowering Minds Worldwide.
          </p>
        </div>

      </div>
    </div>
  );
}