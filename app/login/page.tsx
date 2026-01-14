"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/AuthContext";

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    // Seed default user for Quick Access
    useEffect(() => {
        const accounts = JSON.parse(localStorage.getItem("skillverge-accounts") || "[]");
        if (!accounts.find((u: any) => u.email === "student@skillverge.com")) {
            accounts.push({ name: "Student", email: "student@skillverge.com", password: "password123" });
            localStorage.setItem("skillverge-accounts", JSON.stringify(accounts));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // 1. Get accounts
        const accounts = JSON.parse(localStorage.getItem("skillverge-accounts") || "[]");

        // 2. Find user
        const user = accounts.find((u: any) => u.email === formData.email);

        // 3. Validate
        if (user && user.password === formData.password) {
            login(user.name, user.email);
            const redirect = searchParams.get('redirect') || '/';
            router.push(redirect);
        } else {
            setError("Invalid email or password. Please try again.");
        }
    };

    const handleQuickAccess = () => {
        setFormData({
            email: "student@skillverge.com",
            password: "password123"
        });
        setError("");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <div className="min-h-screen flex items-stretch">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
                        {/* Left Side - Form */}
                        <div className="flex items-center justify-center p-12 bg-white">
                            <div className="w-full max-w-[480px] p-12">
                                <div className="text-center mb-12">
                                    <h1 className="text-3xl text-[#1A1F36] mb-4">Welcome Back</h1>
                                    <p className="text-base text-gray-600">Login to access your account</p>
                                    <button
                                        type="button"
                                        onClick={handleQuickAccess}
                                        className="mt-3 text-xs text-gray-400 hover:text-[#2D6DF6] transition-colors cursor-pointer bg-none border-none underline"
                                    >
                                        Quick Access
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="mb-8">
                                    {error && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {error}
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => {
                                                setFormData({ ...formData, email: e.target.value });
                                                setError("");
                                            }}
                                            className={`w-full py-3 px-4 border ${error ? 'border-red-300 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#2D6DF6]'} rounded-lg focus:outline-none`}
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Password</label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => {
                                                setFormData({ ...formData, password: e.target.value });
                                                setError("");
                                            }}
                                            className={`w-full py-3 px-4 border ${error ? 'border-red-300 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#2D6DF6]'} rounded-lg focus:outline-none`}
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-end items-center mb-8">
                                        <Link href="/auth/forgot-password" className="text-sm text-[#2D6DF6] no-underline hover:underline">
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 px-8 text-lg font-medium text-center rounded-lg transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-[#2D6DF6] text-white hover:bg-[#1a4fd6] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(45,109,246,0.2)]"
                                    >
                                        Login
                                    </button>
                                </form>

                                <div className="text-center pt-8 border-t border-[#E5E7EB]">
                                    <p className="text-base text-gray-600">
                                        Don't have an account?{" "}
                                        <Link href="/signup" className="text-[#2D6DF6] font-medium no-underline hover:underline">
                                            Create Account
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Gradient */}
                        <div className="relative bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] flex items-center justify-center p-12 overflow-hidden">
                            <div className="relative z-[1] text-center text-white max-w-[500px]">
                                <i className="bi bi-person-check text-[5rem] mb-8 opacity-90"></i>
                                <h2 className="text-3xl font-bold text-white mb-6 [text-shadow:0_2px_8px_rgba(0,0,0,0.2)]">
                                    Welcome to Skillverge
                                </h2>
                                <p className="text-lg text-white/90 leading-[1.6]">
                                    Access thousands of courses and continue your learning journey
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function Login() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
}
