"use client";
import React, { useState } from "react";
import { z } from "zod";
import {
    Eye,
    EyeOff,
    User,
    Phone,
    Mail,
    GraduationCap,
    Lock,
    ArrowRight,
    Home,
} from "lucide-react";
import Link from "next/link";

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

export type FormData = z.infer<typeof registerSchema>;

interface SignUpFormProps {
    onSubmit: (data: FormData & { role: "STUDENT" | "TUTOR" }) => void;
    loading: boolean;
}

export default function SignUpForm({ onSubmit, loading }: SignUpFormProps) {
    const [role, setRole] = useState<"STUDENT" | "TUTOR">("STUDENT");
    const [form, setForm] = useState<FormData>({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);

    const handleChange = (k: string, v: string) => {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit({ ...form, role });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-[#02061a]">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* LEFT - hero */}
                <div className="relative p-8 md:p-10 bg-[linear-gradient(180deg,#0ea5e9,transparent)] dark:bg-[linear-gradient(180deg,#0ea5ff11,transparent)]">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white">
                            <Home size={18} /> Home
                        </Link>
                    </div>
                    <div className="mt-8">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 dark:bg-white/10 flex items-center justify-center shadow-lg -rotate-6">
                            <User className="text-white" size={28} />
                        </div>
                        <h3 className="mt-6 text-2xl font-extrabold text-slate-900 dark:text-white">SkillBridge</h3>
                        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                            Connect with expert tutors. Create your profile and start teaching or learning.
                        </p>

                        {/* Role Selector */}
                        <div className="mt-6 space-y-2">
                            <div className="text-xs text-slate-600 dark:text-slate-400">Roles</div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setRole("STUDENT")}
                                    className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${role === "STUDENT" ? "bg-white dark:bg-slate-800 text-blue-600 shadow-md" : "bg-white/60 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300"}`}
                                >
                                    <div className="flex items-center justify-center gap-2"><User size={14} /> Student</div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole("TUTOR")}
                                    className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${role === "TUTOR" ? "bg-white dark:bg-slate-800 text-blue-600 shadow-md" : "bg-white/60 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300"}`}
                                >
                                    <div className="flex items-center justify-center gap-2"><GraduationCap size={14} /> Tutor</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT - form */}
                <div className="p-8 md:p-10">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Create account</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">It takes a few seconds — be ready to teach or learn.</p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {["name", "phone", "email", "password", "confirmPassword"].map((f) => {
                            const isPass = f === "password";
                            const isConfirm = f === "confirmPassword";
                            const show = isPass ? showPass : isConfirm ? showRePass : false;
                            const toggle = isPass ? () => setShowPass((s) => !s) : isConfirm ? () => setShowRePass((s) => !s) : undefined;
                            const placeholder = isConfirm ? "Confirm password" : f.charAt(0).toUpperCase() + f.slice(1);
                            const icon = f === "name" ? <User size={16} /> : f === "phone" ? <Phone size={16} /> : <Mail size={16} />;
                            return (
                                <div key={f}>
                                    <div className="relative">
                                        {React.cloneElement(icon, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" })}
                                        <input
                                            name={f}
                                            type={isPass || isConfirm ? (show ? "text" : "password") : "text"}
                                            value={form[f as keyof typeof form]}
                                            onChange={(e) => handleChange(f, e.target.value)}
                                            placeholder={placeholder}
                                            className={`w-full rounded-xl py-3 pl-11 pr-10 text-sm border ${errors[f] ? "border-red-400" : "border-slate-200 dark:border-slate-800"} bg-transparent outline-none focus:ring-2 focus:ring-blue-300`}
                                        />
                                        {(isPass || isConfirm) && toggle && (
                                            <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                                                {show ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        )}
                                    </div>
                                    {errors[f] && <div className="text-xs text-red-500 mt-1">{errors[f]}</div>}
                                </div>
                            );
                        })}

                        <div className="pt-2">
                            <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-md">
                                {loading ? "Processing..." : "Get Started"} <ArrowRight size={16} />
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
