"use client";

import { Suspense } from "react";
import { useState } from "react";
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
        password: "",
        remember: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login - in a real app this would validate credentials
        // For now we just use the email part as the name
        const name = formData.email.split('@')[0];
        login(name, formData.email);

        // Redirect to previous page or home
        const redirect = searchParams.get('redirect') || '/';
        router.push(redirect);
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
                                </div>

                                <form onSubmit={handleSubmit} className="mb-8">
                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Password</label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-between items-center mb-8">
                                        <label className="flex items-center gap-2 text-sm text-[#1A1F36] cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.remember}
                                                onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                                                className="cursor-pointer"
                                            />
                                            Remember me
                                        </label>
                                        <Link href="/forgot-password" className="text-sm text-[#2D6DF6] no-underline hover:underline">
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
