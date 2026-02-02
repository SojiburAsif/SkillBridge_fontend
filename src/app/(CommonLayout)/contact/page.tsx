"use client";

import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  Globe 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  
  const contactDetails = [
    {
      title: "Email Us",
      info: "support@skillbridge.com",
      description: "Send us a message anytime!",
      icon: Mail,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Call Us",
      info: "+1 (555) 000-1234",
      description: "Mon-Fri from 9am to 6pm.",
      icon: Phone,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Visit Office",
      info: "123 Education Lane",
      description: "New York, NY 10001, USA",
      icon: MapPin,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-900/20"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-black transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER SECTION ================= */}
        <section className="text-center mb-20 mt-10">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white leading-tight">
            Get in <span className="text-blue-600">Touch.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-semibold">
            Have questions about SkillBridge? We&#39;re here to help you navigate your 
            learning or teaching journey.
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* ================= CONTACT INFO CARDS ================= */}
          <div className="lg:col-span-1 space-y-6">
            {contactDetails.map((item, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/30 transition-all hover:shadow-xl group">
                <div className={`h-14 w-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6`}>
                  <item.icon className={item.color} size={28} />
                </div>
                <h3 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold mb-1">{item.info}</p>
                <p className="text-slate-500 dark:text-slate-500 font-semibold text-sm uppercase tracking-wide">{item.description}</p>
              </div>
            ))}

            {/* Support Hours Card */}
            <div className="p-8 rounded-[2.5rem] bg-blue-600 text-white overflow-hidden relative group shadow-lg shadow-blue-500/20">
              <Clock className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10 group-hover:rotate-12 transition-transform" />
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <Globe size={20} /> Support Hours
              </h3>
              <div className="space-y-2 font-semibold opacity-90">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Mon - Fri:</span> <span>9am - 6pm</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Saturday:</span> <span>10am - 4pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span> <span className="text-blue-200 uppercase text-sm">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= CONTACT FORM ================= */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-8 md:p-12 rounded-[3rem] shadow-xl shadow-slate-100 dark:shadow-none">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                Send a Message <MessageSquare className="text-blue-600" />
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-semibold">Fill out the form and our team will get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Full Name</label>
                  <Input 
                    placeholder="John Doe" 
                    className="h-14 rounded-2xl border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-600 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="h-14 rounded-2xl border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-600 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Subject</label>
                <Input 
                  placeholder="How can we help?" 
                  className="h-14 rounded-2xl border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-600 transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Your Message</label>
                <Textarea 
                  placeholder="Write your message here..." 
                  className="min-h-[150px] rounded-[2rem] border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-semibold p-6 focus:ring-2 focus:ring-blue-600 transition-all"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30">
                Send Message <Send size={20} />
              </Button>
            </form>
          </div>

        </div>

        {/* ================= FOOTER NOTE ================= */}
        <div className="mt-20 text-center border-t border-slate-100 dark:border-zinc-900 pt-10">
          <p className="text-slate-400 dark:text-zinc-600 font-bold text-sm uppercase tracking-[0.2em]">
            SkillBridge Support Team • Fast Response Guaranteed
          </p>
        </div>

      </div>
    </div>
  );
}