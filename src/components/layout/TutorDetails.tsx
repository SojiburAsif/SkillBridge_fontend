"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Star, 
  BookOpen, 
  Clock, 
  Monitor, 
  Users, 
  Quote 
} from "lucide-react";

const TutorDetails = () => {
  // ডামি সার্ভিস ডাটা
  const services = [
    { title: "One-on-One Tuition", desc: "Personalized attention for better understanding.", icon: <Users size={20} /> },
    { title: "Online Sessions", desc: "Live interactive classes via Google Meet/Zoom.", icon: <Monitor size={20} /> },
    { title: "Exam Preparation", desc: "Special mock tests and last-minute suggestions.", icon: <BookOpen size={20} /> },
    { title: "Flexible Timing", desc: "Choose slots that fit your daily schedule.", icon: <Clock size={20} /> },
  ];

  // ডামি ফিডব্যাক ডাটা
  const feedbacks = [
    { id: 1, name: "Arif Ahmed", role: "HSC Student", comment: "The teaching style is amazing! Complex physics problems became so easy.", rating: 5 },
    { id: 2, name: "Sara Khan", role: "IELTS Candidate", comment: "Highly recommended for English speaking practice. Improved my score significantly.", rating: 4 },
  ];

  return (
    <div className="w-full bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
        
        {/* --- Services Section --- */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-xs">Features</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase italic text-slate-900 dark:text-white leading-none">
                Our <span className="text-blue-600">Services</span>
              </h2>
            </div>
            <div className="h-[2px] flex-1 bg-slate-100 dark:bg-zinc-800/50 mx-8 hidden md:block mb-3 rounded-full" />
            <p className="text-slate-500 dark:text-zinc-500 font-medium md:max-w-[250px] text-sm md:text-right">
              Premium learning experience tailored for your academic success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="p-8 rounded-[35px] bg-slate-50 dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Feedback Section --- */}
        <section>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic text-slate-900 dark:text-white">
              Student <span className="text-emerald-500">Feedback</span>
            </h2>
            <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-zinc-900 px-4 py-2 rounded-full border border-slate-100 dark:border-zinc-800">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className="fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-sm font-black text-slate-700 dark:text-zinc-300 tracking-tighter">4.9/5 RATING</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="relative p-10 rounded-[45px] bg-white dark:bg-zinc-900/20 border border-slate-100 dark:border-zinc-800/60 backdrop-blur-sm">
                <Quote className="absolute top-8 right-10 text-slate-100/50 dark:text-zinc-800/30" size={80} />
                
                <div className="relative z-10">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: fb.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-lg md:text-xl text-slate-700 dark:text-zinc-300 font-bold italic mb-8 leading-snug">
                    {fb.comment}
                  </p>

                  <div className="flex items-center gap-4 border-t border-slate-50 dark:border-zinc-800/50 pt-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-black shadow-lg">
                      {fb.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white leading-none">{fb.name}</h4>
                      <p className="text-[10px] text-blue-600 dark:text-emerald-500 mt-1.5 uppercase font-black tracking-[0.1em]">{fb.role}</p>
                    </div>
                    <div className="ml-auto bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-xl">
                       <CheckCircle2 size={20} className="text-emerald-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default TutorDetails;