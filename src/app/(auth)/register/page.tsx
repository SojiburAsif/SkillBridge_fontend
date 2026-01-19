"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const form = e.currentTarget;
      const name = (form.elements.namedItem("name") as HTMLInputElement).value;
      const email = (form.elements.namedItem("email") as HTMLInputElement).value;
      const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
      const password = (form.elements.namedItem("password") as HTMLInputElement).value;

      // Proxy fetch → avoids CORS
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, role: "customer" }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      // ✅ Registration successful alert
      alert("Registration successful! You can now login.");

      // Optionally redirect to login page
      // router.push("/login");

    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen flex items-center justify-center
      bg-white text-black
      dark:bg-gray-900 dark:text-white transition-colors">

      <div className="w-full max-w-sm px-8 py-10
        border border-gray-300 dark:border-gray-700
        rounded-3xl shadow-lg">

        <h1 className="text-2xl font-bold text-center">Register</h1>
        <p className="text-sm text-center opacity-70 mt-1">Create your account</p>

        <form onSubmit={handleRegister} className="space-y-5 mt-8">

          {/* Name */}
          <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700
            rounded-xl px-4 py-3">
            <FiUser className="text-lg opacity-70" />
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full bg-transparent focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700
            rounded-xl px-4 py-3">
            <FiMail className="text-lg opacity-70" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full bg-transparent focus:outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700
            rounded-xl px-4 py-3">
            <FiPhone className="text-lg opacity-70" />
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              className="w-full bg-transparent focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700
            rounded-xl px-4 py-3">
            <FiLock className="text-lg opacity-70" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="opacity-70 font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && (
            <div className="text-sm px-3 py-2 border border-red-400 dark:border-red-600 text-red-600 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl
              border border-gray-300 dark:border-gray-700
              bg-black text-white dark:bg-white dark:text-black
              font-semibold transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 opacity-70">
          Already have an account?{" "}
          <a href="/login" className="underline font-medium">Login</a>
        </p>
      </div>
    </main>
  );
}
