"use client";

import React, { JSX, useEffect, useState } from "react";
import TutorCard from "@/components/modules/Tutor/TutoreCard";
import { TutorService } from "@/services/TutorProfile.service";

import { Search, RefreshCw, SlidersHorizontal, Star, DollarSign, Layers } from "lucide-react";
import { Tutor, } from "@/types";

type Category = { id: string; name: string };

export default function TutorProfilePageClient(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [rating, setRating] = useState<string>("");

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [catsRes, tutsRes] = await Promise.all([
          TutorService.getCategories(),
          TutorService.getTutorProfile()
        ]);
        setCategories(catsRes.data ?? []);
        setTutors(tutsRes.data?.data ?? []);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleFilter = async () => {
    setLoading(true);
    try {
      const res = await TutorService.getTutorProfile({
        search: search || undefined,
        categoryId: categoryId || undefined,
        rating: rating ? Number(rating) : undefined,
        price: price ? Number(price) : undefined,
      });
      setTutors(res.data?.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setSearch("");
    setCategoryId("");
    setPrice("");
    setRating("");
    setLoading(true);
    const res = await TutorService.getTutorProfile();
    setTutors(res.data?.data ?? []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto p-6 md:p-12 mt-20">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-12 space-y-2">
          <h1 className="text-3xl md:text-5xl font-black  dark:text-white">
            Expert <span className="text-blue-600">Instructors</span>
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 font-medium tracking-wide">
            Find the perfect mentor to accelerate your learning journey.
          </p>
        </div>

        {/* --- LUXURY FILTER PANEL --- */}
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[32px] p-6 mb-12 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-white dark:border-zinc-800">
          <div className="flex items-center gap-2 mb-6 px-2">
            <SlidersHorizontal size={18} className="text-blue-600" />
            <h2 className="text-[10px] font-black uppercase tracking-[4px] text-slate-400">Advanced Search</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-4 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search by name, skill, or bio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-none ring-1 ring-slate-100 dark:ring-zinc-800 focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none"
              />
            </div>

            {/* Category Select */}
            <div className="lg:col-span-2 relative">
              <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full pl-10 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-none ring-1 ring-slate-100 dark:ring-zinc-800 focus:ring-2 focus:ring-blue-500 appearance-none text-sm outline-none"
              >
                <option value="">Categories</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            {/* Price Input */}
            <div className="lg:col-span-2 relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="number"
                placeholder="Max Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full pl-10 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-none ring-1 ring-slate-100 dark:ring-zinc-800 focus:ring-2 focus:ring-blue-500 text-sm outline-none"
              />
            </div>

            {/* Rating Select */}
            <div className="lg:col-span-2 relative">
              <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full pl-10 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-none ring-1 ring-slate-100 dark:ring-zinc-800 focus:ring-2 focus:ring-blue-500 appearance-none text-sm outline-none"
              >
                <option value="">Rating</option>
                {[5, 4, 3].map(num => <option key={num} value={num}>{num}+ Stars</option>)}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-2 flex gap-2">
              <button
                onClick={handleFilter}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                Apply
              </button>
              <button
                onClick={handleReset}
                className="p-4 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 rounded-2xl hover:bg-slate-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
              >
                <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
        </div>

        {/* --- CONTENT GRID --- */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 text-xs font-bold uppercase tracking-widest text-center mb-8 border border-red-100 dark:border-red-500/20">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-full h-[400px] rounded-[32px] bg-slate-200 dark:bg-zinc-900 animate-pulse border border-slate-100 dark:border-zinc-800" />
            ))}
          </div>
        ) : tutors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
             <div className="h-20 w-20 rounded-full bg-slate-100 dark:bg-zinc-900 flex items-center justify-center text-slate-300">
                <Search size={40} />
             </div>
             <p className="text-sm font-black uppercase tracking-[4px] text-slate-400">No instructors found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {tutors.map((tutor) => (
              <div key={tutor.id} className="transform transition-all duration-500 hover:-translate-y-2">
                <TutorCard tutor={tutor} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}