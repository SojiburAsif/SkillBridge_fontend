// src/app/tutor/[id]/page.tsx
import { TutorService } from "@/services/TutorProfile.service";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { Star, Clock, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { BookingCard } from "@/components/modules/Booking/BookingSession";

export default async function TutorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await TutorService.getTutorById(id);
  const tutor = res?.data?.data;

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-6">
        <div className="text-center space-y-6">
          <div className="h-20 w-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Tutor Not Found!</h2>
          <Link href="/dashboard" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-500/20">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-[#fbfcfd] dark:bg-zinc-950 p-4 md:p-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <Link href="/TutoreProfile" className="group inline-flex items-center gap-3 text-slate-400 hover:text-blue-600 transition-colors font-black uppercase text-[10px] tracking-[3px]">
          <div className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-600 transition-all">
            <ArrowLeft size={14} />
          </div>
          Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-black/40 rounded-[45px] p-8 md:p-12 border border-slate-100 dark:border-zinc-900 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5"><Zap size={120} className="text-blue-600" /></div>
               
               <div className="space-y-6 relative">
                 <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-500/20">
                    <div className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{tutor.category?.name}</span>
                 </div>

                 <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.9]">
                    {tutor.user?.name}
                 </h1>

                 <p className="text-slate-500 dark:text-zinc-400 text-lg leading-relaxed font-medium">
                    {tutor.bio}
                 </p>

                 <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-50 dark:border-zinc-900">
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 bg-slate-50 dark:bg-zinc-900 rounded-xl flex items-center justify-center text-blue-600"><HiOutlineMail size={20} /></div>
                       <span className="text-xs font-bold dark:text-zinc-300">{tutor.user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 bg-slate-50 dark:bg-zinc-900 rounded-xl flex items-center justify-center text-emerald-600"><HiOutlinePhone size={20} /></div>
                       <span className="text-xs font-bold dark:text-zinc-300">{tutor.user?.phone || "N/A"}</span>
                    </div>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white dark:bg-black/40 p-8 rounded-[35px] border border-slate-100 dark:border-zinc-900 flex items-start gap-5">
                  <div className="p-4 bg-orange-50 dark:bg-orange-500/10 rounded-2xl text-orange-600"><Clock size={28} /></div>
                  <div>
                    <h4 className="font-black uppercase text-[10px] tracking-widest text-slate-400 mb-2">Expertise</h4>
                    <p className="text-sm font-bold dark:text-white">{tutor.experience}</p>
                  </div>
               </div>
               <div className="bg-white dark:bg-black/40 p-8 rounded-[35px] border border-slate-100 dark:border-zinc-900 flex items-start gap-5">
                  <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600"><Star size={28} /></div>
                  <div>
                    <h4 className="font-black uppercase text-[10px] tracking-widest text-slate-400 mb-2">Success Rate</h4>
                    <div className="flex items-baseline gap-1">
                       <span className="text-2xl font-black dark:text-white">{tutor.rating || "5.0"}</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase">/ 5.0 Rating</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-slate-900 dark:bg-blue-600 p-8 rounded-[40px] text-white shadow-2xl shadow-blue-500/20">
                <p className="text-[10px] font-black uppercase tracking-[4px] opacity-60 mb-2">Consultation Fee</p>
                <div className="flex items-baseline gap-2 mb-8">
                   <span className="text-5xl font-black">৳{tutor.price}</span>
                   <span className="text-xs font-bold opacity-70">/ Session</span>
                </div>
                <BookingCard tutorId={tutor.id} />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}