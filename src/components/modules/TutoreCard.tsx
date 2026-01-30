import React from "react";
import { Star, Clock, Users, BookOpen, LayoutGrid, CheckCircle2 } from "lucide-react";
import { Tutor } from "@/types/Tutor.type";
import Link from "next/link";

export default function TutorCard({ tutor }: { tutor: Tutor }) {
    return (
        <div className="max-w-[350px] bg-white dark:bg-slate-900 rounded-[32px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group">

            {/* Badge */}
            <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-full">
                    <LayoutGrid size={14} className="text-blue-600 dark:text-blue-400" />
                    <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {tutor.category.name}
                    </span>
                </div>

                <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-500/10 px-3 py-1.5 rounded-full">
                    <CheckCircle2 size={14} className="text-green-600 dark:text-green-400" />
                    <span className="text-[11px] font-black uppercase tracking-wider text-green-600 dark:text-green-400">
                        {tutor.status}
                    </span>
                </div>
            </div>

            {/* Title & Bio */}
            <div className="mb-5">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-blue-600">
                    {tutor.user.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {tutor.bio}
                </p>
            </div>

            {/* Stats */}
            <div className="flex justify-between py-4 border-y dark:border-slate-800 mb-5">
                <div className="flex items-center gap-2">
                    <BookOpen size={18} />
                    <span className="text-sm font-bold">{tutor.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span className="text-sm font-bold">Full Time</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span className="text-sm font-bold">1.2k</span>
                </div>
            </div>

            {/* Price & Rating */}
            <div className="flex justify-between">
                <div>
                    <span className="text-2xl font-black text-[#f47521]">${tutor.price}</span>
                    <span className="text-xs text-slate-400"> / Total</span>
                </div>

                <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-2xl">
                    <Star size={16} className="fill-orange-400 text-orange-400" />
                    <span className="font-black">{tutor.rating || "5.0"}</span>
                    <span className="text-xs text-slate-400">(120)</span>
                </div>
            </div>

            <Link href={`/TutoreProfile/${tutor.id}`}>
                <button className="w-full mt-6 bg-slate-900 dark:bg-blue-600 text-white py-3 rounded-2xl text-xs uppercase tracking-widest">
                    View Profile
                </button>
            </Link>
        </div>
    );
}
