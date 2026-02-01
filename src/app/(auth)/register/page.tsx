/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff, User, Phone, Mail, GraduationCap, Home, Lock, ArrowRight, Loader2 } from "lucide-react";
import type { UserRole, RegisterForm } from "@/types/user";

// Zod schema
const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const [role, setRole] = useState<UserRole>("STUDENT");
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (k: keyof RegisterForm, v: string) => {
    setForm((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = (): boolean => {
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const e: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (key) e[key] = issue.message;
      });
      setErrors(e);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        callbackURL: "/",
        // @ts-expect-error: role and phone are custom fields in our database schema
        role: role,
        phone: form.phone,
      });

      if (error) {
        toast.error(`Signup failed: ${error.message}`);
      } else {
        toast.success("Account created successfully!");
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Check your network!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-[#02061a] p-6 transition-colors font-sans">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT - Hero (AGER UI STYLE) */}
        <div className="relative p-8 md:p-10 bg-[linear-gradient(180deg,#0ea5e9,transparent)] dark:bg-[linear-gradient(180deg,#0ea5ff11,transparent)]">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white hover:text-blue-600 transition-colors">
            <Home size={18} /> Home
          </Link>
          <div className="mt-8">
            <div className="w-16 h-16 rounded-2xl bg-white/20 dark:bg-white/10 flex items-center justify-center shadow-lg -rotate-6 backdrop-blur-md border border-white/20">
              <User className="text-white" size={28} />
            </div>
            <h3 className="mt-6 text-2xl font-extrabold text-slate-900 dark:text-white">SkillBridge</h3>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              Connect with expert tutors. Create your profile and start teaching or learning.
            </p>

            {/* Role selection (AGER UI STYLE) */}
            <div className="mt-6 space-y-2">
              <div className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest">Roles</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole("STUDENT")}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${role === "STUDENT" ? "bg-white dark:bg-slate-800 text-blue-600 shadow-md scale-105" : "bg-white/60 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300"}`}
                >
                  <div className="flex items-center justify-center gap-2"><User size={14} /> Student</div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("TUTOR")}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${role === "TUTOR" ? "bg-white dark:bg-slate-800 text-blue-600 shadow-md scale-105" : "bg-white/60 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300"}`}
                >
                  <div className="flex items-center justify-center gap-2"><GraduationCap size={14} /> Tutor</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT - Form (AGER UI STYLE) */}
        <div className="p-8 md:p-10 bg-white dark:bg-slate-900">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">Create account</h4>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {[
              { id: "name", icon: <User size={16} /> },
              { id: "phone", icon: <Phone size={16} /> },
              { id: "email", icon: <Mail size={16} /> },
              { id: "password", icon: <Lock size={16} /> },
              { id: "confirmPassword", icon: <Lock size={16} /> },
            ].map((f) => {
              const fieldId = f.id as keyof RegisterForm;
              const isPass = fieldId === "password";
              const isConfirm = fieldId === "confirmPassword";
              const show = isPass ? showPass : isConfirm ? showRePass : false;
              const toggle = isPass ? () => setShowPass(!showPass) : isConfirm ? () => setShowRePass(!showRePass) : undefined;
              const placeholder = fieldId === "confirmPassword" ? "Confirm password" : fieldId.charAt(0).toUpperCase() + fieldId.slice(1);
              
              return (
                <div key={fieldId}>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      {f.icon}
                    </div>
                    <input
                      name={fieldId}
                      type={(isPass || isConfirm) && !show ? "password" : "text"}
                      value={(form as any)[fieldId]}
                      onChange={(e) => handleChange(fieldId, e.target.value)}
                      placeholder={placeholder}
                      className={`w-full rounded-xl py-3 pl-11 pr-10 text-sm border transition-all ${errors[fieldId] ? "border-red-400 bg-red-50/10" : "border-slate-200 dark:border-slate-800 bg-transparent"} outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500`}
                    />
                    {(isPass || isConfirm) && (
                      <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600 transition-colors">
                        {show ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    )}
                  </div>
                  {errors[fieldId] && <div className="text-[10px] text-red-500 mt-1 ml-1 font-medium">{errors[fieldId]}</div>}
                </div>
              );
            })}

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>Get Started <ArrowRight size={16} /></>
              )}
            </button>

            <div className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
              By creating an account you agree to our <span className="font-semibold text-slate-700 dark:text-slate-200 cursor-pointer hover:underline">terms</span>.
            </div>
            
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2">
              Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}