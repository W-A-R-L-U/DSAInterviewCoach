"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserInput = {
  email: string;
  password: string;
  username: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState<UserInput>({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onSignup = async () => {
    if (!validateEmail(user.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", user);
      console.log("Signup success", response.data);
      toast.success("Account created — please verify your email.");
      router.push("/user/verifyemail");
    } catch (err: any) {
      console.error("signup failed", err?.response || err);
      const message = err?.response?.data?.error || err?.message || "Signup failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const enabled =
      user.username.trim().length > 0 &&
      user.email.trim().length > 0 &&
      user.password.length > 0;
    setButtonDisabled(!enabled);
  }, [user]);

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center overflow-hidden px-6 py-16 relative">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-[140%] -translate-y-[58%] rounded-full bg-indigo-200/35 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] translate-x-[85%] -translate-y-[12%] rounded-full bg-sky-200/45 blur-3xl" />

        <div className="relative w-full max-w-md rounded-[32px] border border-[var(--shell-border)] bg-[var(--shell-bg)] px-8 py-12 shadow-[0_28px_80px_rgba(99,102,241,0.14)] backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="text-4xl leading-none mb-4">🧠</div>
            <h1 className="text-3xl font-bold tracking-[-0.06em] text-slate-900">Create Account</h1>
            <p className="mt-2 text-sm text-slate-500">Join the DSA Interview Coach community</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!buttonDisabled) onSignup();
            }}
            className="space-y-5"
          >
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text"
                placeholder="Choose a username"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                placeholder="At least 6 characters"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all duration-200 mt-7"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/user/login" className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
