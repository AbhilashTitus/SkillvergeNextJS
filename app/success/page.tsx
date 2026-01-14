"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/AuthContext";
import { useCart } from "@/lib/CartContext";
import { CheckCircle, ArrowRight, BookOpen, Trophy, Star } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { buyCourse, buyCourses } = useAuth();
    const { cartItems, clearCart } = useCart();
    const [paymentId, setPaymentId] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [coursesProcessed, setCoursesProcessed] = useState(false);

    useEffect(() => {
        setPaymentId(searchParams.get('payment_id'));
        setOrderId(searchParams.get('order_id'));

        // Process course purchases on successful payment
        if (!coursesProcessed) {
            const courseId = searchParams.get('course_id');
            const cartIdsParam = searchParams.get('cart_ids');

            if (courseId) {
                // Direct Buy Now
                buyCourse(courseId);
                setCoursesProcessed(true);
            } else if (cartIdsParam) {
                // Cart Checkout - Robust URL-based processing
                const ids = cartIdsParam.split(',');

                // Batch update via Context
                buyCourses(ids);

                // Redundant direct storage backup
                const existing = JSON.parse(localStorage.getItem("skillverge-purchases") || "[]");
                const merged = Array.from(new Set([...existing, ...ids]));
                localStorage.setItem("skillverge-purchases", JSON.stringify(merged));

                // Ensure cart is cleared (UI cleanup)
                if (cartItems.length > 0) clearCart();
                setCoursesProcessed(true);
            } else if (cartItems.length > 0) {
                // Fallback for legacy flow (if URL params missing)
                const ids = cartItems.map(item => item.id);
                buyCourses(ids);

                const existing = JSON.parse(localStorage.getItem("skillverge-purchases") || "[]");
                const merged = Array.from(new Set([...existing, ...ids]));
                localStorage.setItem("skillverge-purchases", JSON.stringify(merged));

                clearCart();
                setCoursesProcessed(true);
            }
        }
    }, [searchParams, cartItems, buyCourse, buyCourses, clearCart, coursesProcessed]);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F8F9FB] to-white">
            <Navbar />
            <main className="flex-grow flex items-center justify-center p-4 py-16">
                <div className="max-w-2xl w-full">
                    {/* Success Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00B894] via-[#2D6DF6] to-[#00B894]"></div>

                        {/* Success Icon */}
                        <div className="relative mb-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-[#00B894] to-[#00a180] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <CheckCircle className="w-12 h-12 text-white" />
                            </div>
                            {/* Floating elements */}
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#2D6DF6]/20 rounded-full animate-pulse"></div>
                            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#00B894]/20 rounded-full animate-pulse delay-300"></div>
                        </div>

                        {/* Success Message */}
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1F36] mb-4">
                            🎉 Payment Successful!
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Congratulations! Your course purchase was successful. You now have lifetime access to your new learning journey.
                        </p>

                        {/* Payment Details */}
                        {(paymentId || orderId) && (
                            <div className="bg-[#F8F9FB] rounded-xl p-6 mb-8 text-left">
                                <h3 className="text-sm font-semibold text-[#1A1F36] mb-3 uppercase tracking-wide">Payment Details</h3>
                                <div className="space-y-2 text-sm">
                                    {paymentId && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Payment ID:</span>
                                            <span className="font-mono text-[#2D6DF6]">{paymentId}</span>
                                        </div>
                                    )}
                                    {orderId && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Order ID:</span>
                                            <span className="font-mono text-[#2D6DF6]">{orderId}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center p-4">
                                <div className="w-12 h-12 bg-[#2D6DF6]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <BookOpen className="w-6 h-6 text-[#2D6DF6]" />
                                </div>
                                <h4 className="font-semibold text-[#1A1F36] mb-1">Lifetime Access</h4>
                                <p className="text-sm text-gray-600">Learn at your own pace</p>
                            </div>
                            <div className="text-center p-4">
                                <div className="w-12 h-12 bg-[#00B894]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <Trophy className="w-6 h-6 text-[#00B894]" />
                                </div>
                                <h4 className="font-semibold text-[#1A1F36] mb-1">Certificate</h4>
                                <p className="text-sm text-gray-600">Upon completion</p>
                            </div>
                            <div className="text-center p-4">
                                <div className="w-12 h-12 bg-[#FFA500]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <Star className="w-6 h-6 text-[#FFA500]" />
                                </div>
                                <h4 className="font-semibold text-[#1A1F36] mb-1">Expert Support</h4>
                                <p className="text-sm text-gray-600">24/7 assistance</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => router.push("/my-learning")}
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#2D6DF6] text-white rounded-lg font-semibold hover:bg-[#1a4fd6] transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
                            >
                                Start Learning
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => router.push("/courses")}
                                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#2D6DF6] text-[#2D6DF6] rounded-lg font-semibold hover:bg-[#2D6DF6] hover:text-white transition-all"
                            >
                                Browse More Courses
                            </button>
                        </div>

                        {/* Thank You Message */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-sm text-gray-500">
                                Thank you for choosing Skillverge. Happy learning! 🚀
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}