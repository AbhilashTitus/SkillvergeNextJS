"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle, Loader2, ArrowLeft, ArrowRight, Lock, Mail, ChevronRight } from "lucide-react";

export default function ForgotPassword() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Step 1: Find Account
    const handleFindAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock Validation: simple regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        // Mock Database Check: 
        // In a real app, strict check. Here we allow any valid email for demo.
        // But let's check localStorage purely for debug logging
        const savedUser = localStorage.getItem("skillverge-user");
        if (savedUser) {
            const userObj = JSON.parse(savedUser);
            if (userObj.email === email) {
                // Found local user
            }
        }

        setStep(2);
        setLoading(false);
    };

    // Step 2: Reset Password
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock Database Update
        try {
            const accounts = JSON.parse(localStorage.getItem("skillverge-accounts") || "[]");
            const userIndex = accounts.findIndex((u: any) => u.email === email);

            if (userIndex >= 0) {
                // Update existing user
                accounts[userIndex].password = newPassword;
            } else {
                // Determine name from localStorage-user or default
                let name = "User";
                const savedSession = localStorage.getItem("skillverge-user");
                if (savedSession) {
                    const sess = JSON.parse(savedSession);
                    if (sess.email === email) name = sess.name;
                }

                // Create new mock user if not found (for robustness in this demo)
                accounts.push({ name, email, password: newPassword });
            }

            localStorage.setItem("skillverge-accounts", JSON.stringify(accounts));
        } catch (err) {
            console.error("Failed to update mock DB", err);
        }

        setStep(3);
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
            <Navbar />

            <main className="flex-grow flex items-center justify-center relative p-4 overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full filter blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100 rounded-full filter blur-[80px] opacity-40 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="w-full max-w-md relative z-10">
                    <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-10 border border-gray-100">

                        {/* Header Area */}
                        {step !== 3 && (
                            <div className="text-center mb-8">
                                <h1 className="text-2xl md:text-3xl font-bold text-[#1A1F36] mb-2">
                                    {step === 1 ? "Forgot Password?" : "Reset Password"}
                                </h1>
                                <p className="text-gray-500 text-sm md:text-base">
                                    {step === 1
                                        ? "Enter your email to find your account."
                                        : "Create a new strong password for your account."}
                                </p>
                            </div>
                        )}

                        {/* Step 1: Find Account */}
                        {step === 1 && (
                            <form onSubmit={handleFindAccount} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (error) setError("");
                                            }}
                                            className={`w-full py-3.5 pl-11 pr-4 border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all`}
                                            placeholder="name@example.com"
                                            autoFocus
                                        />
                                    </div>
                                    {error && <p className="text-sm text-red-500 mt-2 flex items-center gap-1"><span className="w-1 h-1 bg-red-500 rounded-full inline-block"></span>{error}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-[#2D6DF6] to-[#1a4fd6] text-white rounded-xl font-bold uppercase tracking-wide shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Find Account"}
                                    {!loading && <ArrowRight className="w-5 h-5" />}
                                </button>

                                <div className="text-center pt-2">
                                    <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-[#2D6DF6] transition-colors inline-flex items-center gap-1">
                                        <ArrowLeft className="w-4 h-4" /> Back to Login
                                    </Link>
                                </div>
                            </form>
                        )}

                        {/* Step 2: Reset Password */}
                        {step === 2 && (
                            <form onSubmit={handleResetPassword} className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1F36] mb-2">New Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                if (error) setError("");
                                            }}
                                            className="w-full py-3.5 pl-11 pr-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all"
                                            placeholder="••••••••"
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                if (error) setError("");
                                            }}
                                            className="w-full py-3.5 pl-11 pr-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent outline-none transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-[#2D6DF6] to-[#1a4fd6] text-white rounded-xl font-bold uppercase tracking-wide shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full py-3 text-sm font-semibold text-gray-500 hover:text-[#1A1F36] transition-colors"
                                >
                                    Cancel
                                </button>
                            </form>
                        )}

                        {/* Step 3: Success */}
                        {step === 3 && (
                            <div className="text-center py-8 animate-[fadeInUp_0.5s_ease-out]">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-[bounce_1s_infinite]">
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md">
                                        <CheckCircle className="w-6 h-6" strokeWidth={3} />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-[#1A1F36] mb-3">Success!</h2>
                                <p className="text-gray-600 mb-8 max-w-xs mx-auto text-sm leading-relaxed">
                                    Your password has been successfully updated. You can now login with your new credentials.
                                </p>

                                <Link
                                    href="/login"
                                    className="w-full py-4 inline-flex items-center justify-center gap-2 bg-[#2D6DF6] text-white rounded-xl font-bold uppercase tracking-wide shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
                                >
                                    Back to Sign In
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            </div>
                        )}

                    </div>

                    {/* Security Badge */}
                    <div className="text-center mt-8 opacity-60">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                            <Lock className="w-3 h-3" /> Secure Connection
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
