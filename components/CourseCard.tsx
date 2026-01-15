"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ShoppingCart, Eye, Check, PlayCircle } from "lucide-react";
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
    pdfUrl?: string;
    image?: string;
}

// Helper to determine if course is bestseller (rating >= 4.7)
const isBestseller = (rating: number) => rating >= 4.7;

// Helper to determine if course is new (you can customize this logic)
const isNew = (id: string) => parseInt(id) > 20;

export function CourseCard({ course }: { course: CourseProps }) {
    const { addToCart, isInCart } = useCart();
    const { isAuthenticated, hasPurchased, user } = useAuth();
    const router = useRouter();
    const { createOrder, openCheckout, isLoaded } = useRazorpay();
    const [showAddedFeedback, setShowAddedFeedback] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const inCart = isInCart(course.id);

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

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isPurchased) {
            router.push("/my-learning");
            return;
        }

        if (!isAuthenticated) {
            // Add to cart anyway so they can checkout after login
            if (!inCart) addToCart(course);
            router.push("/login?redirect=/checkout");
            return;
        }

        if (!inCart) {
            addToCart(course);
        }
        router.push("/checkout");
    };



    return (
        <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 flex flex-col h-full hover:shadow-[0_8px_24px_rgba(45,109,246,0.15)] hover:border-[#2D6DF6]/30 hover:-translate-y-1">
            {/* Course Thumbnail */}
            <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group">
                {/* Badges */}


                {/* Image or Icon */}
                {course.image ? (
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="h-full flex items-center justify-center p-8">
                        <div
                            className="text-5xl transition-transform duration-500 group-hover:scale-110"
                            style={{ color: course.color }}
                        >
                            {course.icon}
                        </div>
                    </div>
                )}

                {/* Quick View Overlay (appears on hover) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <Link
                        href={`/courses/${course.id}`}
                        className="px-4 py-2 bg-white text-[#2D6DF6] rounded-lg font-medium text-sm flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gray-50 shadow-lg"
                    >
                        <Eye className="w-4 h-4" />
                        View Details
                    </Link>
                </div>
            </div>

            {/* Course Content */}
            <div className="p-5 flex flex-col flex-grow">

                {/* Badges (Moved from Image) */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {isBestseller(course.rating) && (
                        <span className="px-2 py-0.5 bg-[#FFA500] text-white text-[10px] font-bold rounded uppercase tracking-wide">
                            Bestseller
                        </span>
                    )}
                    {isNew(course.id) && (
                        <span className="px-2 py-0.5 bg-[#00B894] text-white text-[10px] font-bold rounded uppercase tracking-wide">
                            New
                        </span>
                    )}
                </div>

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
