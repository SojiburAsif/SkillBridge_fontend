/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  getStudentProfile, 
  createStudentProfile, 
  updateStudentProfile, 
  StudentProfile 
} from "@/services/StudentProfile.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2, GraduationCap, Heart, 
  PlusCircle, Sparkles, BookOpen, Fingerprint, 
  ShieldCheck, ArrowRight, X, Save, Edit3, UserCircle, Hash
} from "lucide-react";
import Link from "next/link";

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [grade, setGrade] = useState("");
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getStudentProfile();
      setProfile(data);
      if (data) {
        setGrade(data.grade || "");
        setInterests(data.interests || "");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!grade.trim() || !interests.trim()) {
      return toast.error("Please fill all fields");
    }

    setIsSubmitting(true);
    try {
      let result;
      if (isEditing && profile) {
        result = await updateStudentProfile({ grade, interests });
        toast.success("Profile Updated Successfully");
      } else {
        result = await createStudentProfile(grade.trim(), interests.trim());
        toast.success("Profile Created Successfully");
      }

      if (result) {
        setProfile(prev => ({ ...prev, ...result, user: prev?.user || result?.user }));
        setIsEditing(false);
      }
    } catch (err) {
      toast.error("Operation failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-[80vh] items-center justify-center space-y-6 bg-[#fcfcfd] dark:bg-[#09090b]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-[10px] font-black uppercase tracking-[5px] text-slate-400">Syncing Identity</p>
      </div>
    );
  }

  // ================= VIEW MODE =================
  if (profile && !isEditing) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#09090b] py-12 px-6 transition-colors duration-500">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] border border-slate-100 dark:border-zinc-800 shadow-xl shadow-blue-500/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl" />
             
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                      <UserCircle size={32} />
                   </div>
                   <div>
                      <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-black uppercase tracking-tighter dark:text-white leading-none">
                          {profile?.user?.name || "Student"}
                        </h1>
                        <Badge className="bg-blue-600 text-white border-none rounded-md px-2 py-0.5 text-[8px] font-black uppercase tracking-widest">Official Member</Badge>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
                        <p className="text-slate-400 dark:text-zinc-500 font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                          <Hash size={12} className="text-blue-600" /> Student ID: <span className="text-slate-900 dark:text-slate-100 font-black">{profile?.id?.slice(-8).toUpperCase()}</span>
                        </p>
                        <p className="hidden md:block text-slate-300">|</p>
                        <p className="text-slate-400 dark:text-zinc-500 font-bold text-xs uppercase tracking-widest">{profile?.user?.email}</p>
                      </div>
                   </div>
                </div>

                <Button 
                  onClick={() => setIsEditing(true)}
                  className="rounded-2xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-black text-[10px] uppercase h-12 px-8 tracking-widest transition-all shadow-lg shadow-slate-900/10 dark:shadow-blue-600/20"
                >
                  <Edit3 size={14} className="mr-2" /> Modify Data
                </Button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                <div className="flex items-center gap-4 p-6 rounded-[25px] bg-slate-50 dark:bg-zinc-950/50 border border-slate-100 dark:border-zinc-800 transition-all hover:border-blue-200 group">
                   <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                      <GraduationCap size={24} />
                   </div>
                   <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Class Level</p>
                      <p className="font-black dark:text-white uppercase text-lg">{profile.grade}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-[25px] bg-slate-50 dark:bg-zinc-950/50 border border-slate-100 dark:border-zinc-800 transition-all hover:border-blue-200 group">
                   <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                      <Heart size={24} />
                   </div>
                   <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Key Interests</p>
                      <p className="font-black dark:text-white uppercase text-lg">{profile.interests}</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <Link href="/TutoreProfile" className="md:col-span-2">
                <Button className="w-full h-20 rounded-[30px] bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[3px] text-xs group shadow-xl shadow-blue-500/10 transition-all hover:translate-y-[-2px]">
                   Access Professional Mentors <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
             </Link>
             <div className="h-20 bg-white dark:bg-zinc-900 rounded-[30px] border border-slate-100 dark:border-zinc-800 flex flex-col items-center justify-center">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated via</p>
                <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                  <ShieldCheck size={14} /> Secure-Pass
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= FORM MODE =================
  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#09090b] flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl border-none shadow-2xl dark:bg-zinc-900 rounded-[45px] overflow-hidden bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-blue-600 p-10 flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute bottom-0 left-0 p-4 opacity-10"><ShieldCheck size={200} /></div>
            <div className="relative">
              <Sparkles size={40} className="mb-6 opacity-50" />
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Identity<br />Vault</h2>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[3px] opacity-60 leading-relaxed">
              Define your academic path to unlock personalized learning opportunities.
            </p>
          </div>

          <CardContent className="md:w-2/3 p-10 md:p-14 space-y-8">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-black uppercase tracking-tighter dark:text-white leading-none">
                {isEditing ? "Modify" : "Initialize"} <span className="text-blue-600">Identity</span>
              </CardTitle>
              <CardDescription className="text-[10px] font-black uppercase tracking-widest">Student Information System</CardDescription>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="group space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-blue-600 ml-2">Current Grade</label>
                <div className="relative">
                  <GraduationCap className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-all" size={20} />
                  <Input
                    placeholder="e.g. Honours 3rd Year"
                    value={grade}
                    onChange={e => setGrade(e.target.value)}
                    className="pl-14 h-14 rounded-[20px] border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 focus-visible:ring-blue-600 font-bold"
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-blue-600 ml-2">Academic Interests</label>
                <div className="relative">
                  <Heart className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-all" size={20} />
                  <Input
                    placeholder="e.g. AI & Robotics, Physics"
                    value={interests}
                    onChange={e => setInterests(e.target.value)}
                    className="pl-14 h-14 rounded-[20px] border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 focus-visible:ring-blue-600 font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button
                onClick={handleAction}
                disabled={isSubmitting}
                className="flex-1 h-14 rounded-[20px] bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
              >
                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : (isEditing ? <Save className="mr-2" size={16} /> : <PlusCircle className="mr-2" size={16} />)}
                {isEditing ? "Commit Changes" : "Setup Profile"}
              </Button>

              {isEditing && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)} 
                  className="h-14 w-14 rounded-[20px] border-slate-100 dark:border-zinc-800 text-slate-400 hover:text-red-500 hover:border-red-100 transition-colors"
                >
                  <X size={20} />
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}