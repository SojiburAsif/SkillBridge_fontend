"use client";

import React, { JSX, useEffect, useState } from "react";
import TutorCard from "@/components/modules/Tutor/TutoreCard";
import { TutorService } from "@/services/TutorProfile.service";
import { Tutor } from "@/types/Tutor.type";
import { Search, RefreshCw } from "lucide-react";

type Category = { id: string; name: string };

export default function TutorProfilePageClient(): JSX.Element {
  // filters (strings from inputs)
  const [search, setSearch] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [rating, setRating] = useState<string>("");

  // data
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 초기 data লোড
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const catsRes = await TutorService.getCategories();
        const tutsRes = await TutorService.getTutorProfile();
        const cats = catsRes.data ?? [];
        const tuts = tutsRes.data?.data ?? [];
        setCategories(cats);
        setTutors(tuts);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ফিল্টার হ্যান্ডলার
  const handleFilter = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await TutorService.getTutorProfile({
        search: search || undefined,
        categoryId: categoryId || undefined,
        rating: rating ? Number(rating) : undefined,
        price: price ? Number(price) : undefined,
      });
      setTutors(res.data?.data ?? []);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  // রিসেট
  const handleReset = async (): Promise<void> => {
    setSearch("");
    setCategoryId("");
    setPrice("");
    setRating("");
    setLoading(true);
    try {
      const res = await TutorService.getTutorProfile();
      setTutors(res.data?.data ?? []);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark:bg-black">
      <div className="max-w-7xl mx-auto p-8 mt-[5.75rem] ">
        {/* Filter panel */}
        <div className="bg-white dark:bg-slate-900 shadow-md dark:shadow-black/30 rounded-2xl p-4 mb-6 transition-colors">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            {/* search */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search (name, bio, experience, price...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* category */}
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="border rounded-lg p-2 w-full md:w-1/5 bg-white dark:bg-slate-800 text-sm border-slate-200 dark:border-slate-700"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* price */}
            <input
              type="number"
              placeholder="Max price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded-lg p-2 w-full md:w-1/6 text-sm border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            />

            {/* rating */}
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border rounded-lg p-2 w-full md:w-1/6 bg-white dark:bg-slate-800 text-sm border-slate-200 dark:border-slate-700"
            >
              <option value="">Rating</option>
              <option value="5">5+</option>
              <option value="4">4+</option>
              <option value="3">3+</option>
            </select>

            {/* actions */}
            <div className="flex gap-2">
              <button
                onClick={handleFilter}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Filter
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 rounded-lg text-sm border border-slate-200 dark:border-slate-700 transition"
              >
                <RefreshCw size={16} /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Status */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Grid / loading / empty */}
        {loading ? (
          // skeleton grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-full max-w-[350px] p-6 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"
              >
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4" />
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/5 mb-4" />
                <div className="flex justify-between mt-4">
                  <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : tutors.length === 0 ? (
          <div className="py-20 text-center text-slate-500 dark:text-slate-400">No tutors found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {tutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
