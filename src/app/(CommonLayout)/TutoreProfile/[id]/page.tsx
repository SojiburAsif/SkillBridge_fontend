import { TutorService } from "@/services/TutorProfile.service";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { Star, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BookingCard } from "@/components/modules/Booking/BookingSession";

export default async function TutorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await TutorService.getTutorById(id);
  const tutor = res?.data?.data;

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Tutor Not Found!</h2>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase text-xs tracking-widest hover:underline"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-[#f8fafc] dark:bg-black p-4 md:p-8 pt-24">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Back Button */}
        <Link
          href="/TutoreProfile"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase text-xs tracking-widest hover:underline"
        >
          <ArrowLeft size={16} /> Back to Browse Tutors
        </Link>

        {/* Profile Card */}
        <div className="relative bg-white dark:bg-zinc-950 rounded-[40px] p-8 border border-slate-100 dark:border-zinc-900 shadow-xl shadow-blue-500/5 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10" />

          <div className="flex flex-col md:flex-row gap-8 items-start">
          
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 bg-blue-600/10 w-fit px-3 py-1 rounded-lg">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    {tutor.category?.name}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                  {tutor.user?.name}
                </h1>
              </div>

              <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
                {tutor.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 text-slate-600 dark:text-zinc-400">
                  <div className="p-2 bg-slate-50 dark:bg-zinc-900 rounded-xl">
                    <HiOutlineMail size={18} />
                  </div>
                  <span className="text-xs font-bold">{tutor.user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-zinc-400">
                  <div className="p-2 bg-slate-50 dark:bg-zinc-900 rounded-xl">
                    <HiOutlinePhone size={18} />
                  </div>
                  <span className="text-xs font-bold">{tutor.user?.phone || "+880 1XXX-XXXXXX"}</span>
                </div>
              </div>
            </div>

           
            <div className="w-full md:w-auto bg-slate-900 dark:bg-blue-600 p-8 rounded-[32px] text-white text-center md:text-left min-w-[250px] space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[3px] opacity-70">Service Fee</p>
              <h2 className="text-4xl font-black">৳{tutor.price}</h2>

              {/* Booking Card */}
              <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl shadow-md space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                  Book a Session
                </h3>
                <BookingCard tutorId={tutor.id} />
              </div>
            </div>
          </div>
        </div>

        {/* ডিটেইলস গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Experience Card */}
          <div className="bg-white dark:bg-zinc-950 p-8 rounded-[32px] border border-slate-100 dark:border-zinc-900 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-2xl text-orange-600">
                <Clock />
              </div>
              <h4 className="font-black uppercase text-xs tracking-widest dark:text-white">Experience</h4>
            </div>
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">{tutor.experience}</p>
          </div>

          {/* Stats Card */}
          <div className="bg-white dark:bg-zinc-950 p-8 rounded-[32px] border border-slate-100 dark:border-zinc-900 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-2xl text-blue-600">
                <Star />
              </div>
              <h4 className="font-black uppercase text-xs tracking-widest dark:text-white">Rating & Reviews</h4>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black dark:text-white">{tutor.rating || "5.0"}</span>
              <span className="text-slate-400 text-xs font-bold mb-1">/ 5.0 (240 Reviews)</span>
            </div>
          </div>

          {/* Availability Card */}
          <div className="bg-white dark:bg-zinc-950 p-8 rounded-[32px] border border-slate-100 dark:border-zinc-900 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-2xl text-green-600">
                <HiOutlineLocationMarker size={24} />
              </div>
              <h4 className="font-black uppercase text-xs tracking-widest dark:text-white">Availability</h4>
            </div>
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-black tracking-widest uppercase">
              Available Now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
