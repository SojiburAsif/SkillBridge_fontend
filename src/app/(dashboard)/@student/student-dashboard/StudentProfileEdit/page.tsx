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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Loader2, User, Mail, GraduationCap, Heart, 
  PlusCircle, Sparkles, BookOpen, Fingerprint, 
  ShieldCheck, ArrowRight, X, Save, Edit3
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
      toast.error("প্রোফাইল লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!grade.trim() || !interests.trim()) {
      return toast.error("সবগুলো ঘর পূরণ করুন");
    }

    setIsSubmitting(true);
    try {
      let result;
      if (isEditing && profile) {
        result = await updateStudentProfile({ grade, interests });
        toast.success("Profile Updated");
      } else {
        result = await createStudentProfile(grade.trim(), interests.trim());
        toast.success("Create Profile");
      }

      if (result) {

        setProfile(prev => ({ ...prev, ...result, user: prev?.user || result?.user }));
        setIsEditing(false);
      }
    } catch (err) {
      toast.error("Faild");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-[80vh] items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-[10px] font-black uppercase tracking-[4px] text-slate-400">Syncing Identity...</p>
      </div>
    );
  }

  // ================= VIEW MODE =================
  if (profile && !isEditing) {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-10 space-y-8 animate-in fade-in zoom-in-95 duration-700">
        <div className="flex items-center justify-between bg-white dark:bg-zinc-950 p-6 rounded-[28px] border border-slate-100 dark:border-zinc-900 shadow-sm">
           <div className="flex items-center gap-3">
             <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <ShieldCheck size={24} />
             </div>
             <div>
                <h1 className="text-xl font-black uppercase tracking-tighter italic">Student <span className="text-blue-600">Portal</span></h1>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Academic Identity Card</p>
             </div>
           </div>
           <Button 
             variant="outline" 
             onClick={() => setIsEditing(true)}
             className="rounded-xl border-blue-100 hover:bg-blue-50 text-blue-600 font-bold text-xs h-10 px-6 transition-all active:scale-95"
           >
             <Edit3 size={14} className="mr-2" /> Edit Profile
           </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-4 border-none shadow-2xl dark:bg-zinc-950 rounded-[40px] overflow-hidden group">
            <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-900 relative">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            </div>
            <CardContent className="relative pt-0 pb-10 text-center">
              <Avatar className="h-32 w-32 -mt-16 mx-auto border-[8px] border-white dark:border-zinc-950 shadow-2xl rounded-[35px] transition-transform duration-500 group-hover:scale-105">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.user?.name || "User"}`} />
                <AvatarFallback className="text-3xl font-black bg-blue-50 text-blue-600">
                    {profile?.user?.name ? profile.user.name[0] : "S"}
                </AvatarFallback>
              </Avatar>
              <div className="mt-6 space-y-2">
                <h2 className="text-2xl font-black dark:text-white uppercase tracking-tight truncate px-4">
                    {profile?.user?.name || "Student Name"}
                </h2>
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-500 border-none rounded-lg px-3 py-1 text-[9px] font-black uppercase tracking-widest">Verified Account</Badge>
              </div>
              <div className="mt-8 space-y-4 pt-8 border-t border-slate-50 dark:border-zinc-900 text-left px-6">
                <div className="flex items-center gap-3 text-slate-500 group-hover:text-blue-600 transition-colors">
                  <Mail size={16} />
                  <span className="text-xs font-bold truncate">{profile?.user?.email || "Email not available"}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Fingerprint size={16} />
                  <span className="text-[10px] font-mono tracking-tighter uppercase italic">Ref: {profile?.id?.slice(-12) || "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white dark:bg-zinc-950 rounded-[32px] shadow-xl shadow-blue-500/5 flex items-center gap-6 border border-slate-50 dark:border-zinc-900">
                 <div className="h-16 w-16 bg-blue-50 dark:bg-blue-500/10 rounded-[22px] flex items-center justify-center text-blue-600 shadow-inner"><GraduationCap size={32} /></div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 mb-1">Grade Level</p>
                    <p className="text-xl font-black text-slate-800 dark:text-zinc-100">{profile.grade}</p>
                 </div>
              </div>
              <div className="p-8 bg-white dark:bg-zinc-950 rounded-[32px] shadow-xl shadow-rose-500/5 flex items-center gap-6 border border-slate-50 dark:border-zinc-900">
                 <div className="h-16 w-16 bg-rose-50 dark:bg-rose-500/10 rounded-[22px] flex items-center justify-center text-rose-600 shadow-inner"><Heart size={32} /></div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 mb-1">Interests</p>
                    <p className="text-xl font-black text-slate-800 dark:text-zinc-100">{profile.interests}</p>
                 </div>
              </div>
            </div>

            <Card className="border-none shadow-2xl shadow-slate-200/40 dark:shadow-none dark:bg-zinc-950 rounded-[40px] p-2 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5"><Sparkles size={100} /></div>
               <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-sm font-black uppercase tracking-[4px] flex items-center gap-2 text-blue-600">
                    <BookOpen size={18}/> Navigation Portal
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-8 pt-0 flex flex-col md:flex-row gap-4">
                  <Link href="/TutoreProfile" className="flex-[2]">
                    <Button className="w-full h-16 rounded-[22px] bg-blue-600 hover:bg-blue-700 font-black uppercase tracking-[2px] text-xs shadow-xl shadow-blue-500/30 group">
                        Explore Professional Tutors 
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="flex-1 h-16 rounded-[22px] border-slate-100 dark:border-zinc-800 font-black uppercase tracking-widest text-[9px]">
                    My Learning
                  </Button>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // ================= CREATE / EDIT FORM MODE =================
  return (
    <div className="max-w-xl mx-auto p-4 md:p-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <Card className="border-none shadow-2xl dark:bg-zinc-950 rounded-[50px] overflow-hidden backdrop-blur-sm border border-white/10">
        <CardHeader className="text-center pt-14 pb-4">
          <div className={`inline-flex items-center justify-center p-6 rounded-[30px] text-white mb-6 shadow-2xl transition-all duration-700 ${isEditing ? 'bg-amber-500 rotate-12 scale-110' : 'bg-blue-600 -rotate-3'}`}>
            {isEditing ? <Edit3 size={32} /> : <Sparkles size={32} />}
          </div>
          <CardTitle className="text-4xl font-black uppercase tracking-tighter dark:text-white leading-[0.9]">
              {isEditing ? "Update" : "Create"} <br /><span className={isEditing ? 'text-amber-500' : 'text-blue-600'}>Profile</span>
          </CardTitle>
          <CardDescription className="text-xs font-bold uppercase tracking-[3px] pt-8 opacity-60 italic">
              {isEditing ? "Modify your current credentials" : "Build your academic identity today"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 md:p-14 space-y-10">
          <div className="space-y-6">
            <div className="group space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[4px] text-slate-400 group-focus-within:text-blue-600 transition-colors ml-1">Grade Level</label>
              <div className="relative">
                <GraduationCap className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                <Input
                  placeholder="e.g. 3rd Year (CSE) or Grade 12"
                  value={grade}
                  onChange={e => setGrade(e.target.value)}
                  className="pl-14 h-16 rounded-[24px] border-slate-100 dark:border-zinc-900 bg-slate-50/50 dark:bg-zinc-900/50 focus-visible:ring-2 focus-visible:ring-blue-600/20 focus-visible:border-blue-600 font-bold transition-all"
                />
              </div>
            </div>

            <div className="group space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[4px] text-slate-400 group-focus-within:text-rose-600 transition-colors ml-1">Learning Interests</label>
              <div className="relative">
                <Heart className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-600 transition-colors" size={20} />
                <Input
                  placeholder="e.g. Web Dev, Physics, Music"
                  value={interests}
                  onChange={e => setInterests(e.target.value)}
                  className="pl-14 h-16 rounded-[24px] border-slate-100 dark:border-zinc-900 bg-slate-50/50 dark:bg-zinc-900/50 focus-visible:ring-2 focus-visible:ring-rose-600/20 focus-visible:border-rose-600 font-bold transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              onClick={handleAction}
              disabled={isSubmitting}
              className={`w-full h-16 rounded-[25px] text-white font-black uppercase tracking-[4px] text-[11px] shadow-xl transition-all hover:translate-y-[-2px] active:scale-[0.98] ${
                isEditing 
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'
              }`}
            >
              {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : (isEditing ? <Save className="mr-2" size={18} /> : <PlusCircle className="mr-2" size={18} />)}
              {isEditing ? "Confirm Changes" : "Initialize Identity"}
            </Button>

            {isEditing && (
              <Button 
                variant="ghost" 
                onClick={() => setIsEditing(false)} 
                className="h-12 rounded-2xl font-bold uppercase tracking-widest text-[10px] text-slate-400 hover:text-rose-500 hover:bg-rose-50/50"
              >
                <X className="mr-1" size={14} /> Abort Editing
              </Button>
            )}
          </div>
          
          <div className="text-center pt-2">
             <p className="text-[9px] font-black text-slate-300 uppercase tracking-[3px]">System Authenticated Secure Access</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}