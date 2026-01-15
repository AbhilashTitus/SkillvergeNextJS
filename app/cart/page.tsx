"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { Trash2, ArrowRight, ShoppingBag, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
    const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [redeemApplied, setRedeemApplied] = useState(false);

    const handleCheckout = () => {
        if (!isAuthenticated) {
            router.push("/login?redirect=/checkout");
            return;
        }

        if (cartItems.length === 0) {
            return;
        }

        setIsProcessing(true);
        router.push(`/checkout?redeem=${redeemApplied}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
            <Navbar />
            <main className="flex-grow py-12 px-4 md:px-6">
                <div className="max-w-[1280px] mx-auto">
                    <h1 className="text-3xl font-bold text-[#1A1F36] mb-8">Shopping Cart</h1>

                    {cartItems.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                            {/* Cart Items List */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h2 className="text-lg font-semibold text-[#1A1F36] m-0">
                                        {cartItems.length} Course{cartItems.length !== 1 ? 's' : ''} in Cart
                                    </h2>
                                    <button
                                        onClick={clearCart}
                                        className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
                                    >
                                        Clear Cart
                                    </button>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50 transition-colors">
                                            {/* Thumbnail */}
                                            <div className="w-full sm:w-32 aspect-square bg-gray-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden relative group">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
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
                                                    <div className="text-3xl" style={{ color: item.color }}>
                                                        {item.icon}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-[#1A1F36] mb-1 line-clamp-2">
                                                            {item.title}
                                                        </h3>
                                                    </div>
                                                    <div className="text-lg font-bold text-[#2D6DF6]">
                                                        ₹{item.price.toLocaleString()}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 mb-4">
                                                    <span className="px-2 py-0.5 bg-[#F8F9FB] text-[#2D6DF6] text-xs font-medium rounded capitalize">
                                                        {item.category}
                                                    </span>
                                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded capitalize">
                                                        {item.level}
                                                    </span>
                                                </div>

                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
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
                            <div className="lg:sticky lg:top-24 h-fit">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-xl font-bold text-[#1A1F36] mb-6">Summary</h2>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span>₹{cartTotal.toLocaleString()}</span>
                                        </div>

                                        {/* Coin Redemption Option */}
                                        <div className="py-2 border-y border-gray-100 my-4">
                                            <label className={`flex items-center justify-between group ${user?.coins && user.coins > 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${redeemApplied ? 'bg-[#2D6DF6] border-[#2D6DF6]' : 'border-gray-300'}`}>
                                                        {redeemApplied && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        className="hidden"
                                                        checked={redeemApplied}
                                                        onChange={() => {
                                                            if (user?.coins && user.coins > 0) setRedeemApplied(!redeemApplied);
                                                        }}
                                                        disabled={!user?.coins || user.coins === 0}
                                                    />
                                                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                                        Redeem Coins
                                                        <span className={`ml-1 font-bold ${user?.coins && user.coins > 0 ? 'text-[#2D6DF6]' : 'text-gray-400'}`}>
                                                            ({user?.coins && user.coins > 0 ? Math.min(user.coins, cartTotal) : 0})
                                                        </span>
                                                    </span>
                                                </div>
                                                <span className="text-sm font-medium text-green-600">
                                                    - ₹{redeemApplied ? Math.min(user?.coins || 0, cartTotal).toLocaleString() : 0}
                                                </span>
                                            </label>
                                            <p className="text-xs text-gray-500 mt-1 pl-7">
                                                Balance: <span className="font-semibold text-gray-700">{user?.coins || 0} Coins</span>
                                            </p>
                                        </div>

                                        <div className="flex justify-between text-gray-600">
                                            <span>Discount</span>
                                            <span className="text-[#00B894]">-₹{redeemApplied ? Math.min(user?.coins || 0, cartTotal).toLocaleString() : 0}</span>
                                        </div>
                                        <div className="border-t border-gray-100 pt-4 flex justify-between text-lg font-bold text-[#1A1F36]">
                                            <span>Total</span>
                                            <span>₹{(cartTotal - (redeemApplied ? Math.min(user?.coins || 0, cartTotal) : 0)).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        className="w-full py-3.5 rounded-lg font-semibold text-base transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg bg-[#2D6DF6] text-white hover:bg-[#1a4fd6] shadow-blue-500/20"
                                    >
                                        Checkout
                                        <ArrowRight className="w-5 h-5" />
                                    </button>

                                    <p className="text-xs text-center text-gray-500 mt-4">
                                        30-Day Money-Back Guarantee
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center max-w-2xl mx-auto">
                            <div className="w-20 h-20 bg-[#F8F9FB] rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="w-10 h-10 text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#1A1F36] mb-3">Your cart is empty</h2>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                Looks like you haven't added any courses yet. Explore our catalog to find your next learning adventure!
                            </p>
                            <Link
                                href="/courses"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-[#2D6DF6] text-white rounded-lg font-semibold hover:bg-[#1a4fd6] transition-colors"
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
