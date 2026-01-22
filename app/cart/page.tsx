"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { Trash2, ArrowRight, ShoppingBag, Shield, Zap, Sparkles, BookOpen } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
    const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = () => {
        if (!isAuthenticated) {
            router.push("/login?redirect=/checkout");
            return;
        }

        if (cartItems.length === 0) {
            return;
        }

        setIsProcessing(true);
        // Removed coin redemption logic from cart, passing directly to checkout
        router.push(`/checkout`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FB] font-sans">
            <Navbar />

            {/* Premium Hero Section */}
            <div className="relative bg-[#1A1F36] pt-24 pb-32 sm:pt-32 sm:pb-40 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2D6DF6] opacity-10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00B894] opacity-10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Learning Cart</span>
                    </h1>
                    <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                        Review your selected courses and get ready to start your journey.
                    </p>
                </div>
            </div>

            <main className="flex-grow -mt-20 px-4 md:px-6 relative z-20 pb-20">
                <div className="max-w-[1280px] mx-auto">
                    {cartItems.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                            {/* Cart Items List */}
                            <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-white/50 overflow-hidden backdrop-blur-sm">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-[#2D6DF6]" />
                                        <h2 className="text-lg font-bold text-[#1A1F36]">
                                            {cartItems.length} Course{cartItems.length !== 1 ? 's' : ''} in Cart
                                        </h2>
                                    </div>
                                    <button
                                        onClick={clearCart}
                                        className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
                                    >
                                        Clear Cart
                                    </button>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50/80 transition-options group">
                                            {/* Thumbnail */}
                                            <div className="w-full sm:w-32 aspect-square bg-gray-100 rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative shadow-sm group-hover:shadow-md transition-all">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : item.videoEmbed ? (
                                                    <iframe
                                                        src={item.videoEmbed}
                                                        title={item.title}
                                                        className="w-full h-full"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                        allowFullScreen
                                                    />
                                                ) : (
                                                    <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300" style={{ color: item.color }}>
                                                        {item.icon}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-grow flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start gap-4 mb-2">
                                                        <h3 className="text-lg font-bold text-[#1A1F36] line-clamp-2 leading-tight group-hover:text-[#2D6DF6] transition-colors">
                                                            {item.title}
                                                        </h3>
                                                        <div className="text-lg font-extrabold text-[#2D6DF6] whitespace-nowrap">
                                                            ₹{item.price.toLocaleString()}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md border border-blue-100 capitalize">
                                                            {item.category}
                                                        </span>
                                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md capitalize">
                                                            {item.level}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end pt-2">
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors font-medium px-2 py-1 rounded-lg hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:sticky lg:top-24 h-fit space-y-6">
                                <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-white/50 overflow-hidden">
                                    <div className="p-6 bg-[#1A1F36] text-white">
                                        <h3 className="text-lg font-bold flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-yellow-400" />
                                            Cart Summary
                                        </h3>
                                    </div>

                                    <div className="p-6">
                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between text-gray-600 font-medium">
                                                <span>Subtotal</span>
                                                <span className="text-[#1A1F36]">₹{cartTotal.toLocaleString()}</span>
                                            </div>

                                            <div className="flex justify-between text-gray-600 font-medium">
                                                <span>Discount</span>
                                                <span className="text-green-500 group-hover:scale-105 transition-transform">
                                                    ₹0
                                                </span>
                                            </div>

                                            <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-end">
                                                <span className="text-lg font-bold text-[#1A1F36]">Total</span>
                                                <span className="text-2xl font-black text-[#2D6DF6]">₹{cartTotal.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleCheckout}
                                            disabled={isProcessing}
                                            className="w-full py-4 rounded-xl font-bold text-base text-white transition-all shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r from-[#2D6DF6] to-[#1a4fd6] hover:shadow-blue-500/30 hover:-translate-y-1 active:scale-95"
                                        >
                                            {isProcessing ? "Processing..." : (
                                                <>
                                                    Checkout Now
                                                    <ArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
                                            By checking out, you agree to our Terms of Service and Refund Policy.
                                        </p>
                                    </div>
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                        <div className="flex items-center justify-center gap-6 text-gray-400 grayscale opacity-70">
                                            <div className="flex items-center gap-1.5" title="Secure Payment">
                                                <Shield className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-bold uppercase tracking-wide">Secure</span>
                                            </div>
                                            <div className="flex items-center gap-1.5" title="Instant Access">
                                                <Zap className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-bold uppercase tracking-wide">Instant</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-white/50 p-12 text-center max-w-2xl mx-auto backdrop-blur-sm">
                            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <ShoppingBag className="w-10 h-10 text-[#2D6DF6]" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#1A1F36] mb-3">Your cart is empty</h2>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                                Looks like you haven't added any courses yet. Explore our catalog to find your next learning adventure!
                            </p>
                            <Link
                                href="/courses"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2D6DF6] text-white rounded-xl font-bold hover:bg-[#1a4fd6] transition-all hover:shadow-lg shadow-blue-500/20 hover:-translate-y-1"
                            >
                                Browse Courses
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
