"use client";

import React, { useEffect, useState } from "react";

import TutorCard from "@/components/modules/Tutor/TutoreCard";
import { Tutor } from "@/types";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { getTutorProfiles } from "@/services/TutorProfile.service";

export default function TutoreHomeLayout() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopTutors = async () => {
      try {
        const res = await getTutorProfiles();
        const topThree = (res.data?.data ?? []).slice(0, 3);
        setTutors(topThree);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopTutors();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Top Rated Mentors</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black dark:text-white">
              Learn from the <span className="text-blue-600">Best Professionals</span>
            </h2>
          </div>
          
          <Link 
            href="/TutoreProfile" 
            className="group flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-all"
          >
            View All Instructors
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* --- Content Grid --- */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        ) : tutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {tutors.map((tutor) => (
              <div 
                key={tutor.id} 
                className="hover:scale-[1.02] transition-transform duration-500"
              >
                <TutorCard tutor={tutor} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-100 dark:border-zinc-800 rounded-[32px]">
             <p className="text-slate-400 font-medium">No instructors available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}


function SkeletonLoader() {
  return (
    <div className="w-full h-[420px] rounded-[32px] bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800 p-6 space-y-4 animate-pulse">
      <div className="w-full h-48 rounded-2xl bg-slate-200 dark:bg-zinc-800" />
      <div className="h-6 w-2/3 bg-slate-200 dark:bg-zinc-800 rounded-lg" />
      <div className="h-4 w-full bg-slate-200 dark:bg-zinc-800 rounded-lg" />
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-slate-200 dark:bg-zinc-800 rounded-full" />
        <div className="h-8 w-20 bg-slate-200 dark:bg-zinc-800 rounded-full" />
      </div>
      <div className="pt-4 flex justify-between items-center">
        <div className="h-10 w-24 bg-slate-200 dark:bg-zinc-800 rounded-xl" />
        <div className="h-6 w-12 bg-slate-200 dark:bg-zinc-800 rounded-lg" />
      </div>
    </div>
  );
}