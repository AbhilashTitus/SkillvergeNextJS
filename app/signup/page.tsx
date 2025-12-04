"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SignUp() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        userType: "",
        agreeToTerms: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sign up:", formData);
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
                                    <h1 className="text-3xl text-[#1A1F36] mb-4">Create Account</h1>
                                    <p className="text-base text-gray-600">Join Skillverge and start learning today</p>
                                </div>

                                <form onSubmit={handleSubmit} className="mb-8">
                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>

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
                                            placeholder="Create a strong password"
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">I want to</label>
                                        <select
                                            value={formData.userType}
                                            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                            required
                                        >
                                            <option value="">Select an option</option>
                                            <option value="learn">Learn</option>
                                            <option value="teach">Teach</option>
                                            <option value="both">Both</option>
                                        </select>
                                    </div>

                                    <div className="mb-8">
                                        <label className="flex items-start gap-2 text-sm text-[#1A1F36] cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.agreeToTerms}
                                                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                                                className="cursor-pointer mt-0.5"
                                                required
                                            />
                                            <span>
                                                I agree to the{" "}
                                                <Link href="/terms" className="text-[#2D6DF6] underline">
                                                    Terms of Service
                                                </Link>{" "}
                                                and{" "}
                                                <Link href="/privacy" className="text-[#2D6DF6] underline">
                                                    Privacy Policy
                                                </Link>
                                            </span>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 px-8 text-lg font-medium text-center rounded-lg transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-[#2D6DF6] text-white hover:bg-[#1a4fd6] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(45,109,246,0.2)]"
                                    >
                                        Create Account
                                    </button>
                                </form>

                                <div className="text-center pt-8 border-t border-[#E5E7EB]">
                                    <p className="text-base text-gray-600">
                                        Already have an account?{" "}
                                        <Link href="/login" className="text-[#2D6DF6] font-medium no-underline hover:underline">
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Gradient */}
                        <div className="relative bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] flex items-center justify-center p-12 overflow-hidden">
                            <div className="relative z-[1] text-center text-white max-w-[500px]">
                                <i className="bi bi-person-plus text-[5rem] mb-8 opacity-90"></i>
                                <h2 className="text-3xl font-bold text-white mb-6 [text-shadow:0_2px_8px_rgba(0,0,0,0.2)]">
                                    Join Skillverge Today
                                </h2>
                                <p className="text-lg text-white/90 leading-[1.6]">
                                    Start learning from expert instructors and upgrade your skills
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
