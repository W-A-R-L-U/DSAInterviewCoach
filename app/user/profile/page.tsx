'use client';

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

type UserProfile = {
    _id?: string;
    username?: string;
    email?: string;
    isVerified?: boolean;
    isAdmin?: boolean;
};

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getUserDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post("/api/user/profile");
            setProfile(response.data.data);
        } catch (err: any) {
            const message = err?.response?.data?.error || err?.message || "Unable to load profile";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void getUserDetails();
    }, []);

    const initials = useMemo(() => {
        const name = profile?.username?.trim() || profile?.email?.trim() || "U";
        return name
            .split(/\s+/)
            .map((part) => part[0])
            .filter(Boolean)
            .slice(0, 2)
            .join("")
            .toUpperCase();
    }, [profile]);

    const handleLogout = async () => {
        try {
            setActionLoading(true);
            await axios.post("/api/user/logout");
            toast.success("Logged out successfully");
            router.push("/user/login");
        } catch (err: any) {
            const message = err?.response?.data?.error || err?.message || "Unable to log out";
            toast.error(message);
        } finally {
            setActionLoading(false);
        }
    };

    const statusItems = [
        {
            label: "Email status",
            value: profile?.isVerified ? "Verified" : "Pending verification",
            tone: profile?.isVerified ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
        },
        {
            label: "Account role",
            value: profile?.isAdmin ? "Administrator" : "Learner",
            tone: profile?.isAdmin ? "bg-sky-50 text-sky-700 border-sky-200" : "bg-slate-50 text-slate-700 border-slate-200"
        }
    ];

    return (
        <main className="min-h-screen px-6 py-10 sm:py-14">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.22em] text-indigo-600">Account</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-[-0.06em] text-slate-900 sm:text-4xl">
                            Your profile
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            Review your account details, check verification status, and manage your session.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                        >
                            Back to coach
                        </Link>
                        <button
                            type="button"
                            onClick={() => void getUserDetails()}
                            disabled={loading || actionLoading}
                            className="inline-flex h-11 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 px-5 text-sm font-medium text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                <section className="grid gap-6">
                    <div className="rounded-[32px] border border-[var(--shell-border)] bg-[var(--shell-bg)] p-6 shadow-[0_28px_80px_rgba(99,102,241,0.14)] backdrop-blur-xl sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-gradient-to-br from-indigo-500 to-sky-400 text-2xl font-bold text-white shadow-[0_18px_40px_rgba(79,70,229,0.25)]">
                                    {initials}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Signed in as</p>
                                    <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-slate-900">
                                        {profile?.username || "Loading profile"}
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-600">{profile?.email || "Fetching account details..."}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {statusItems.map((item) => (
                                    <div
                                        key={item.label}
                                        className={["rounded-full border px-4 py-2 text-sm font-medium", item.tone].join(" ")}
                                    >
                                        {item.value}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Username</p>
                                <p className="mt-2 text-lg font-semibold text-slate-900">{profile?.username || "—"}</p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Email</p>
                                <p className="mt-2 break-all text-lg font-semibold text-slate-900">{profile?.email || "—"}</p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Verification</p>
                                <p className="mt-2 text-lg font-semibold text-slate-900">
                                    {profile?.isVerified ? "Verified" : "Pending"}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Role</p>
                                <p className="mt-2 text-lg font-semibold text-slate-900">
                                    {profile?.isAdmin ? "Administrator" : "Learner"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/"
                                className="inline-flex h-11 items-center justify-center rounded-full bg-indigo-600 px-5 text-sm font-medium text-white transition hover:bg-indigo-700"
                            >
                                Start practicing
                            </Link>
                            <button
                                type="button"
                                onClick={() => void handleLogout()}
                                disabled={actionLoading}
                                className="inline-flex h-11 items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-5 text-sm font-medium text-rose-700 transition hover:border-rose-300 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {actionLoading ? "Signing out..." : "Sign out"}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}