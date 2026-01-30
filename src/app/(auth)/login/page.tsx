"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 🚀 useRouter import
import { useForm } from "@tanstack/react-form";
import {
  Eye,
  EyeOff,
  ChevronRight,
  Mail,
  Lock,
  Home,
  LogIn,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in");

      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Logged in Successfully", { id: toastId });

        // ✅ redirect to home page
        router.push("/");
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50 dark:bg-[#020617]">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">

        {/* Home Button */}
        <Link
          href="/"
          className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition"
        >
          <Home size={18} />
          Home
        </Link>

        {/* Header */}
        <div className="mb-8 text-center mt-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-600 flex items-center justify-center">
            <LogIn className="text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Sign in to continue
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Email */}
          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full py-4 pl-14 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="••••••••"
                    className="w-full py-4 pl-14 pr-14 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
            )}
          </form.Field>

          {/* Submit */}
          <button
            type="submit"
            disabled={form.state.isSubmitting}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2"
          >
            {form.state.isSubmitting ? "Signing in..." : "Sign In"}
            <ChevronRight />
          </button>

          {/* Register Link */}
          <div className="text-center">
            <Link href="/register" className="text-blue-600 font-semibold">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
