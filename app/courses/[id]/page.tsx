"use client";

import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { courses } from "@/lib/data";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { useRazorpay } from "@/lib/useRazorpay";
import { Star, ShoppingCart, Check, Clock, BookOpen, BarChart, PlayCircle } from "lucide-react";
import { useState } from "react";

export default function CourseDetailsPage() {
    const params = useParams();
    const { addToCart, isInCart } = useCart();
    const { isAuthenticated, hasPurchased, user } = useAuth();
    const router = useRouter();
    const { createOrder, openCheckout, isLoaded } = useRazorpay();
    const [showAddedFeedback, setShowAddedFeedback] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Find the course based on the ID from the URL
    const course = courses.find(c => c.id === params.id);
    const inCart = course ? isInCart(course.id) : false;
    const isPurchased = course ? hasPurchased(course.id) : false;

    if (!course) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-[#1A1F36] mb-4">Course Not Found</h1>
                        <p className="text-gray-600">The course you are looking for does not exist.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!inCart && !isPurchased) {
            addToCart(course);
            setShowAddedFeedback(true);
            setTimeout(() => setShowAddedFeedback(false), 2000);
        }
    };

    const handleBuyNow = async () => {
        if (!course) return;
        
        if (isPurchased) {
            router.push("/my-learning");
            return;
        }

        if (!isAuthenticated) {
            router.push("/login?redirect=/courses");
            return;
        }

        if (!isLoaded) {
            alert("Payment system is loading. Please try again in a moment.");
            return;
        }

        setIsProcessing(true);

        try {
            const order = await createOrder(course.price, `course_${course.id}_${Date.now()}`);
            
            openCheckout({
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                amount: order.amount,
                currency: 'INR',
                name: 'Skillverge',
                description: course.title,
                order_id: order.orderId,
                handler: (response: any) => {
                    // Payment successful
                    router.push(`/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`);
                },
                prefill: {
                    name: user?.name || '',
                    email: user?.email || '',
                },
                theme: {
                    color: '#2D6DF6',
                },
                modal: {
                    ondismiss: () => {
                        setIsProcessing(false);
                    },
                },
            });
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
            <Navbar />
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-[#1A1F36] text-white py-12 md:py-16">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#2D6DF6]/20 text-[#2D6DF6] text-sm font-medium rounded-full capitalize border border-[#2D6DF6]/30">
                                        {course.category.replace('-', ' ')}
                                    </span>
                                    <span className="px-3 py-1 bg-white/10 text-white/80 text-sm font-medium rounded-full capitalize">
                                        {course.level}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                                    {course.title}
                                </h1>
                                <p className="text-lg text-gray-300 mb-6 max-w-2xl">
                                    Master {course.title} with this comprehensive course. Learn from industry experts and take your skills to the next level.
                                </p>
                                <div className="flex items-center gap-6 text-sm md:text-base">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-[#FFA500]">{course.rating}</span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-[#FFA500] fill-[#FFA500]' : 'text-gray-600'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-gray-300">
                                        Last updated <span className="text-white">December 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
                        {/* Main Content */}
                        <div className="space-y-12">
                            {/* What you'll learn */}
                            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                                <h2 className="text-2xl font-bold text-[#1A1F36] mb-6">What you'll learn</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[1, 2, 3, 4, 5, 6].map((item) => (
                                        <div key={item} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-[#00B894] mt-0.5 shrink-0" />
                                            <span className="text-gray-600">Comprehensive understanding of core concepts and practical applications</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Course Content */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#1A1F36] mb-6">Course Content</h2>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
                                    {[1, 2, 3, 4, 5].map((section) => (
                                        <div key={section} className="p-4 md:p-6">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-semibold text-[#1A1F36]">Section {section}: Advanced Topics</h3>
                                                <span className="text-sm text-gray-500">4 lectures • 45m</span>
                                            </div>
                                            <p className="text-sm text-gray-600">Detailed breakdown of advanced topics and real-world examples.</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:relative">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:sticky lg:top-24 -mt-32 lg:mt-0 z-10">
                                <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                                    {course.videoEmbed ? (
                                        <iframe
                                            src={course.videoEmbed}
                                            title={course.title}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <div className="text-5xl" style={{ color: course.color }}>
                                            {course.icon}
                                        </div>
                                    )}
                                </div>
                                <div className="text-3xl font-bold text-[#1A1F36] mb-6">
                                    ₹{course.price.toLocaleString()}
                                </div>

                                {isPurchased ? (
                                    <button
                                        onClick={() => router.push("/my-learning")}
                                        className="w-full py-3.5 bg-[#00B894] text-white rounded-lg font-bold text-lg mb-4 hover:bg-[#00a180] transition-colors flex items-center justify-center gap-2"
                                    >
                                        <PlayCircle className="w-5 h-5" />
                                        Start Learning
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={inCart}
                                            className={`w-full py-3.5 rounded-lg font-bold text-lg mb-4 flex items-center justify-center gap-2 transition-all ${inCart
                                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                                : showAddedFeedback
                                                    ? 'bg-[#00B894] text-white'
                                                    : 'bg-[#2D6DF6] text-white hover:bg-[#1a4fd6] shadow-lg shadow-blue-500/20'
                                                }`}
                                        >
                                            {inCart ? (
                                                <>In Cart</>
                                            ) : showAddedFeedback ? (
                                                <>Added!</>
                                            ) : (
                                                <>Add to Cart</>
                                            )}
                                        </button>
                                        <button
                                            onClick={handleBuyNow}
                                            disabled={isProcessing}
                                            className={`w-full py-3.5 rounded-lg font-bold text-lg transition-all ${
                                                isProcessing
                                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                                    : "border-2 border-[#1A1F36] text-[#1A1F36] hover:bg-gray-50"
                                            }`}
                                        >
                                            {isProcessing ? "Processing..." : "Buy Now"}
                                        </button>
                                    </>
                                )}

                                <div className="mt-8 space-y-4">
                                    <h4 className="font-semibold text-[#1A1F36]">This course includes:</h4>
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-4 h-4" />
                                            <span>14 hours on-demand video</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="w-4 h-4" />
                                            <span>5 articles</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <BarChart className="w-4 h-4" />
                                            <span>Full lifetime access</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
