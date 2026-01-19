"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FiMail, FiLock } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const form = e.currentTarget;
      const email = (form.elements.namedItem("email") as HTMLInputElement).value;
      const password = (form.elements.namedItem("password") as HTMLInputElement).value;

      // Proxy fetch to avoid CORS
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response:", data); // Debug

      if (!res.ok || !data.user) throw new Error(data.message || "Login failed");

      // Safe role reading
      const role = data.user.role || "customer";

      alert(`Login successful! Role: ${role}`); // Optional alert

      router.push(role === "admin" ? "/admin" : "/user");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center
      bg-white text-black
      dark:bg-black dark:text-white transition-colors">

      <div className="w-full max-w-sm px-8 py-10
        border border-black dark:border-white
        rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold text-center">RentRide</h1>
        <p className="text-sm text-center opacity-70 mt-1">Login to your account</p>

        <form onSubmit={handleLogin} className="space-y-6 mt-8">

          {/* Email */}
          <div className="flex items-center gap-3 border border-black dark:border-white
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

          {/* Password */}
          <div className="flex items-center gap-3 border border-black dark:border-white
            rounded-xl px-4 py-3">
            <FiLock className="text-lg opacity-70" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full bg-transparent focus:outline-none"
              required
            />
          </div>

          {error && (
            <div className="text-sm px-3 py-2 border border-black dark:border-white rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl border border-black dark:border-white
              bg-black text-white dark:bg-white dark:text-black
              font-semibold transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 opacity-70">
          Don’t have an account?{" "}
          <a href="/register" className="underline font-medium">Register</a>
        </p>
      </div>
    </main>
  );
}
