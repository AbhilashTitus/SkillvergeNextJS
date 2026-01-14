"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ShoppingCart, Heart, Eye, Check, PlayCircle } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useRazorpay } from "@/lib/useRazorpay";

export interface CourseProps {
    id: string;
    title: string;
    instructor: string;
    rating: number;
    price: number;
    category: string;
    level: string;
    icon: React.ReactNode;
    color: string;
    videoEmbed?: string;
}

// Helper to determine if course is bestseller (rating >= 4.7)
const isBestseller = (rating: number) => rating >= 4.7;

// Helper to determine if course is new (you can customize this logic)
const isNew = (id: string) => parseInt(id) > 20;

export function CourseCard({ course }: { course: CourseProps }) {
    const { addToCart, addToWishlist, removeFromWishlist, isInCart, isInWishlist } = useCart();
    const { isAuthenticated, hasPurchased, user } = useAuth();
    const router = useRouter();
    const { createOrder, openCheckout, isLoaded } = useRazorpay();
    const [showAddedFeedback, setShowAddedFeedback] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const inCart = isInCart(course.id);
    const inWishlist = isInWishlist(course.id);
    const isPurchased = hasPurchased(course.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!inCart && !isPurchased) {
            addToCart(course);
            setShowAddedFeedback(true);
            setTimeout(() => setShowAddedFeedback(false), 2000);
        }
    };

    const handleBuyNow = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

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
                    router.push(`/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&course_id=${course.id}`);
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

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(course.id);
        } else {
            addToWishlist(course);
        }
    };

    return (
        <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 flex flex-col h-full hover:shadow-[0_8px_24px_rgba(45,109,246,0.15)] hover:border-[#2D6DF6]/30 hover:-translate-y-1">
            {/* Course Thumbnail */}
            <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex gap-2">
                    {isBestseller(course.rating) && (
                        <span className="px-2.5 py-1 bg-[#FFA500] text-white text-xs font-semibold rounded-md shadow-sm">
                            Bestseller
                        </span>
                    )}
                    {isNew(course.id) && (
                        <span className="px-2.5 py-1 bg-[#00B894] text-white text-xs font-semibold rounded-md shadow-sm">
                            New
                        </span>
                    )}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm transition-all duration-200 hover:bg-white hover:scale-110 active:scale-95"
                    aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart
                        className={`w-4 h-4 transition-colors ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                </button>

                {/* Course Icon/Thumbnail */}
                <div className="h-full flex items-center justify-center p-8">
                    <div
                        className="text-5xl transition-transform duration-500 group-hover:scale-110"
                        style={{ color: course.color }}
                    >
                        {course.icon}
                    </div>
                </div>

                {/* Quick View Overlay (appears on hover) */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                        href={`/courses/${course.id}`}
                        className="px-4 py-2 bg-white text-[#2D6DF6] rounded-lg font-medium text-sm flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gray-50"
                    >
                        <Eye className="w-4 h-4" />
                        View Details
                    </Link>
                </div>
            </div>

            {/* Course Content */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Category & Level */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-[#F8F9FB] text-[#2D6DF6] text-xs font-medium rounded capitalize">
                        {course.category.replace('-', ' ')}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded capitalize">
                        {course.level}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-[#1A1F36] mb-5 leading-snug line-clamp-2 min-h-[2.5rem]">
                    {course.title}
                </h3>

                {/* Rating & Students */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-[#1A1F36]">{course.rating}</span>
                        <Star className="w-4 h-4 text-[#FFA500] fill-[#FFA500]" />
                    </div>
                    <span className="text-xs text-gray-500">
                        ({Math.floor(course.rating * 1000)}+ students)
                    </span>
                </div>

                {/* Price & CTA */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-2xl font-bold text-[#2D6DF6]">
                            ₹{course.price.toLocaleString()}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        {isPurchased ? (
                            <button
                                onClick={() => router.push("/my-learning")}
                                className="w-full py-2.5 px-4 bg-[#00B894] text-white rounded-lg text-sm font-semibold hover:bg-[#00a180] transition-colors flex items-center justify-center gap-2"
                            >
                                <PlayCircle className="w-4 h-4" />
                                Learn
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={inCart}
                                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${inCart
                                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                        : showAddedFeedback
                                            ? 'bg-[#00B894] text-white'
                                            : 'bg-gray-100 text-[#1A1F36] hover:bg-[#2D6DF6] hover:text-white'
                                        }`}
                                >
                                    {inCart ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            In Cart
                                        </>
                                    ) : showAddedFeedback ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Added!
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-4 h-4" />
                                            Add
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={isProcessing}
                                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${isProcessing
                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                        : 'bg-[#2D6DF6] text-white hover:bg-[#1a4fd6]'
                                        }`}
                                >
                                    {isProcessing ? 'Processing...' : 'Buy Now'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
