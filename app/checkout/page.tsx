"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { courses } from "@/lib/data";
import { Lock, CreditCard, CheckCircle, Tag, Shield, Zap, Wallet, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

function CheckoutContent() {
    const router = useRouter();
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user, buyCourses, isAuthenticated, redeemCoins } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Calculate coin usage
    const userCoins = user?.coins || 0;
    const canAfford = userCoins >= cartTotal;

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login?redirect=/checkout");
        }
        if (cartItems.length === 0 && !isSuccess) {
            router.push("/cart");
        }
    }, [isAuthenticated, cartItems, router, isSuccess]);

    const handleCoinPayment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!canAfford) {
            router.push("/membership?redirect=/checkout");
            return;
        }

        setIsProcessing(true);

        try {
            // Deduct coins
            redeemCoins(cartTotal);

            // Redirect to success page
            const params = new URLSearchParams();
            params.append('payment_id', 'coin_payment_' + Date.now());
            params.append('order_id', 'coin_order_' + Date.now());

            // Pass cart IDs explicitly
            const cartIds = cartItems.map(item => item.id).join(',');
            if (cartIds) params.append('cart_ids', cartIds);

            router.push(`/success?${params.toString()}`);

        } catch (error) {
            console.error('Payment error:', error);
            alert('Something went wrong. Please try again.');
            setIsProcessing(false);
        }
    };

    if (!isAuthenticated || (cartItems.length === 0 && !isProcessing)) {
        if (!isProcessing && cartItems.length === 0) {
            return null;
        }
    }

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
                        Complete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Purchase</span>
                    </h1>
                    <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                        You're just one step away from unlocking new skills. Review your order and confirm payment below.
                    </p>
                </div>
            </div>

            <main className="flex-grow -mt-20 px-4 md:px-6 relative z-20 pb-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
                        {/* Payment Section */}
                        <div className="space-y-6">
                            {/* User Info Card */}
                            <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-white/50 backdrop-blur-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#2D6DF6]">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-[#1A1F36]">Account Details</h2>
                                        <p className="text-xs text-gray-500">Confirming your identity for this transaction</p>
                                    </div>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</label>
                                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-[#1A1F36] font-medium flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                                {user?.name?.charAt(0) || 'U'}
                                            </div>
                                            {user?.name}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-[#1A1F36] font-medium truncate">
                                            {user?.email}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Wallet/Payment Card */}
                            <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-white/50 p-6 md:p-8 relative overflow-hidden">
                                {/* Decorator */}
                                <div className={`absolute top-0 left-0 w-1.5 h-full ${canAfford ? 'bg-[#00B894]' : 'bg-red-500'}`} />

                                <div className="flex items-center gap-3 mb-8">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${canAfford ? 'bg-emerald-50 text-[#00B894]' : 'bg-red-50 text-red-500'}`}>
                                        <Wallet className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-[#1A1F36]">Coin Wallet Payment</h2>
                                        <p className="text-sm text-gray-500">Secure payment using your Skillverge coins</p>
                                    </div>
                                </div>

                                <form onSubmit={handleCoinPayment}>
                                    <div className={`rounded-2xl border p-6 mb-8 transition-colors ${canAfford ? 'bg-emerald-50/30 border-emerald-100' : 'bg-red-50/30 border-red-100'}`}>
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-2xl border border-gray-100">
                                                    🪙
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Current Balance</p>
                                                    <p className="text-3xl font-extrabold text-[#1A1F36]">{userCoins.toLocaleString()}</p>
                                                </div>
                                            </div>

                                            <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>

                                            <div className="text-center sm:text-right">
                                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Cost</p>
                                                <p className="text-3xl font-extrabold text-[#2D6DF6]">{cartTotal.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        {!canAfford && (
                                            <div className="mt-6 pt-6 border-t border-red-200/50 flex items-start gap-3">
                                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-bold text-red-600">Insufficient Balance</p>
                                                    <p className="text-sm text-red-600/80 mt-1">
                                                        You need <span className="font-bold">{cartTotal - userCoins}</span> more coins to complete this purchase.
                                                        Please top up your wallet to proceed.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className={`group w-full py-4 px-6 rounded-xl font-bold text-lg text-white transition-all shadow-lg flex items-center justify-center gap-2 relative overflow-hidden ${isProcessing
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : canAfford
                                                    ? "bg-gradient-to-r from-[#2D6DF6] to-[#1a4fd6] hover:shadow-blue-500/30 hover:-translate-y-1"
                                                    : "bg-[#FF4757] hover:bg-[#ff3344] hover:shadow-red-500/30 hover:-translate-y-1"
                                            }`}
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {isProcessing ? (
                                                <>Processing Payment...</>
                                            ) : canAfford ? (
                                                <>Pay {cartTotal} Coins <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                                            ) : (
                                                <>Get More Coins</>
                                            )}
                                        </span>
                                    </button>

                                    {!canAfford && (
                                        <p className="text-center text-sm text-gray-500 mt-4">
                                            You will be redirected to the membership page to purchase coins.
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-white/50 overflow-hidden sticky top-24">
                                <div className="p-6 bg-[#1A1F36] text-white">
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-yellow-400" />
                                        Order Summary
                                    </h3>
                                    <p className="text-sm text-gray-400 mt-1">{cartItems.length} {cartItems.length === 1 ? 'Course' : 'Courses'} in Cart</p>
                                </div>

                                <div className="p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                                    <div className="space-y-4">
                                        {cartItems.map((item) => {
                                            const originalCourse = courses.find(c => c.id === item.id);
                                            const iconToRender = originalCourse ? originalCourse.icon : item.icon;

                                            return (
                                                <div key={item.id} className="flex gap-4 group">
                                                    <div className="w-20 h-14 bg-gray-100 rounded-lg shrink-0 overflow-hidden relative shadow-sm group-hover:shadow-md transition-all">
                                                        {item.image ? (
                                                            <img
                                                                src={item.image}
                                                                alt={item.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : item.videoEmbed ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img
                                                                src={`https://img.youtube.com/vi/${item.videoEmbed.split('/').pop()}/0.jpg`}
                                                                alt={item.title}
                                                                className="w-full h-full object-cover opacity-80"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-2xl">
                                                                <span role="img" aria-label="course icon" style={{ color: item.color }}>{iconToRender}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-grow min-w-0 flex flex-col justify-center">
                                                        <p className="text-sm font-bold text-[#1A1F36] line-clamp-2 leading-tight group-hover:text-[#2D6DF6] transition-colors">{item.title}</p>
                                                        <p className="text-xs text-gray-500 font-medium mt-1">{item.price.toLocaleString()} Coins</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-50 border-t border-gray-100">
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium">{cartTotal.toLocaleString()} Coins</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Transaction Fee</span>
                                            <span className="text-green-600 font-medium">Free</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end pt-4 border-t border-dashed border-gray-300">
                                        <div>
                                            <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider">Total Amount</span>
                                            <span className="block text-xs text-gray-400 mt-1">(Inclusive of taxes)</span>
                                        </div>
                                        <span className="text-2xl font-black text-[#1A1F36]">{cartTotal.toLocaleString()} <span className="text-sm text-gray-500 font-normal">Coins</span></span>
                                    </div>
                                </div>
                                <div className="px-6 py-4 bg-gray-100 border-t border-gray-200">
                                    <div className="flex items-center justify-center gap-6 text-gray-400 grayscale opacity-70">
                                        <div className="flex items-center gap-1.5" title="Secure Payment">
                                            <Lock className="w-3.5 h-3.5" />
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
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] text-[#1A1F36]">Loading Checkout...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
