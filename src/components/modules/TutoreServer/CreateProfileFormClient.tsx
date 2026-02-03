/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
  BadgeCheck,
  DollarSign,
  Briefcase,
  Pencil,
  Loader2,
  Sparkles,
  BookOpen,
  Check,
  Layers
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { getAllCategories, Category } from "@/services/category.service";

import { upsertTutorProfile } from "./CreateProfileForm";
import { getMyProfile } from "@/services/TutorProfile.service";

export function CreateProfileFormClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    defaultValues: {
      bio: "",
      experience: "",
      price: 0,
      categoryId: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(profile ? "Updating profile..." : "Creating profile...");
      try {
        const formData = new FormData();
        Object.entries(value).forEach(([k, v]) => formData.append(k, String(v)));
        await upsertTutorProfile(formData, profile?.id);
        toast.success("Profile synced successfully! ✨", { id: toastId });
        setIsEditing(false);
        await loadInitialData();
      } catch (err: any) {
        toast.error(err.message || "Operation failed", { id: toastId });
      }
    },
  });

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const [catData, profileRes] = await Promise.all([
        getAllCategories(),
        getMyProfile(),
      ]);
      setCategories(catData);
      if (profileRes?.data) {
        const p = profileRes.data;
        setProfile(p);
        form.setFieldValue("bio", p.bio);
        form.setFieldValue("experience", p.experience);
        form.setFieldValue("price", Number(p.price));
        form.setFieldValue("categoryId", p.categoryId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => { loadInitialData(); }, [loadInitialData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[4px] text-slate-400">Loading Intelligence</p>
      </div>
    );
  }

  // 🪪 VIEW MODE: PREMIUM PROFILE CARD
  if (profile && !isEditing) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-1">
        <Card className="rounded-[48px] border-none shadow-2xl bg-white dark:bg-zinc-950 overflow-hidden ring-1 ring-slate-200 dark:ring-zinc-800">
          <div className="h-40 bg-blue-600 relative flex items-end justify-end p-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <Sparkles className="text-white/30 absolute top-6 left-6" size={40} />
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest">
              Verified Tutor
            </div>
          </div>

          <CardContent className="px-8 pb-10 relative">
            <div className="absolute -top-14 left-8">
              <div className="w-28 h-28 rounded-[36px] bg-white dark:bg-zinc-900 shadow-2xl flex items-center justify-center border-[6px] border-white dark:border-zinc-950 text-blue-600">
                <BookOpen size={48} />
              </div>
            </div>

            <div className="pt-16 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-black tracking-tight dark:text-white flex items-center gap-2">
                  Tutor Expert <BadgeCheck className="text-blue-500" fill="currentColor" size={24} />
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {categories.find(c => c.id === profile.categoryId)?.name || "Academic Specialist"}
                  </p>
                </div>
              </div>
              <Button onClick={() => setIsEditing(true)} variant="outline" className="rounded-2xl h-12 px-6 border-slate-200 dark:border-zinc-800 font-bold hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all">
                <Pencil size={14} className="mr-2" /> Edit
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-5 rounded-[32px] bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-slate-400 mb-2 uppercase text-[9px] font-black tracking-widest">
                  <Briefcase size={14} className="text-blue-600" /> Experience
                </div>
                <p className="text-xl font-black dark:text-white">{profile.experience}</p>
              </div>
              <div className="p-5 rounded-[32px] bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-slate-400 mb-2 uppercase text-[9px] font-black tracking-widest">
                  <DollarSign size={14} className="text-emerald-500" /> Rate / Hour
                </div>
                <p className="text-xl font-black dark:text-white">${profile.price}</p>
              </div>
            </div>

            <div className="mt-6 p-6 rounded-[32px] bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100/50 dark:border-blue-500/10">
              <span className="text-[9px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-[2px]">Biography</span>
              <p className="mt-3 text-sm font-medium text-slate-600 dark:text-zinc-400 leading-relaxed italic">
                {profile.bio}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 📝 FORM MODE: BEAUTIFUL CATEGORY & INPUTS
  return (
    <Card className="max-w-2xl mx-auto mt-10 rounded-[48px] shadow-2xl border-none ring-1 ring-slate-100 dark:ring-zinc-900 bg-white dark:bg-zinc-950 overflow-hidden">
      <CardHeader className="pt-12 pb-8 text-center">
        <div className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200 dark:shadow-none">
          <Sparkles size={32} />
        </div>
        <CardTitle className="text-4xl font-black tracking-tighter uppercase dark:text-white">
          {profile ? "Enhance Identity" : "Launch Profile"}
        </CardTitle>
        <CardDescription className="font-bold text-blue-600/60 uppercase text-[10px] tracking-[3px]">Tutor Professional Suite</CardDescription>
      </CardHeader>

      <CardContent className="px-10 pb-14">
        <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }} className="space-y-8">

          {/* Category Selection Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 ml-1">
              <Layers size={14} className="text-blue-600" />
              <FieldLabel className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select Teaching Field</FieldLabel>
            </div>
            <form.Field name="categoryId">
              {(field) => (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => field.handleChange(cat.id ?? "")}
                      className={`p-4 rounded-2xl text-xs font-bold transition-all border text-left flex justify-between items-center ${field.state.value === cat.id
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                        : "bg-slate-50 dark:bg-zinc-900 border-slate-100 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-blue-300"
                        }`}
                    >
                      {cat.name}
                      {field.state.value === cat.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </form.Field>
          </div>

          <div className="space-y-6">
            <form.Field name="bio">
              {(field) => (
                <div className="space-y-2">
                  <FieldLabel className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Professional Bio</FieldLabel>
                  <Textarea
                    placeholder="Tell students about your expertise..."
                    className="rounded-3xl min-h-[140px] bg-slate-50 dark:bg-zinc-900 border-none ring-1 ring-slate-200 dark:ring-zinc-800 focus:ring-2 focus:ring-blue-500 transition-all p-5 font-medium"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <div className="grid grid-cols-2 gap-6">
              <form.Field name="experience">
                {(field) => (
                  <div className="space-y-2">
                    <FieldLabel className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Experience</FieldLabel>
                    <Input
                      placeholder="e.g. 4 Years"
                      className="rounded-2xl h-14 bg-slate-50 dark:bg-zinc-900 border-none ring-1 ring-slate-200 dark:ring-zinc-800 focus:ring-2 focus:ring-blue-500 transition-all px-5 font-bold"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="price">
                {(field) => (
                  <div className="space-y-2">
                    <FieldLabel className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Hourly Price ($)</FieldLabel>
                    <Input
                      type="number"
                      className="rounded-2xl h-14 bg-slate-50 dark:bg-zinc-900 border-none ring-1 ring-slate-200 dark:ring-zinc-800 focus:ring-2 focus:ring-blue-500 transition-all px-5 font-black text-blue-600"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            {profile && (
              <Button
                type="button"
                variant="outline"
                className="rounded-2xl h-14 font-black uppercase text-[10px] tracking-widest flex-1 border-slate-200 dark:border-zinc-800"
                onClick={() => setIsEditing(false)}
              >
                Discard
              </Button>
            )}
            <Button className="flex-[2] h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] tracking-[3px] shadow-xl shadow-blue-200 dark:shadow-none active:scale-95 transition-all">
              {profile ? "Update Identity" : "Confirm Profile"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}