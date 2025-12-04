"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { Lock, CreditCard, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
    const router = useRouter();
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user, buyCourse, isAuthenticated } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login?redirect=/checkout");
        }
        if (cartItems.length === 0 && !isSuccess) {
            router.push("/cart");
        }
    }, [isAuthenticated, cartItems, router, isSuccess]);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Process purchase
        cartItems.forEach(item => {
            buyCourse(item.id);
        });

        clearCart();
        setIsProcessing(false);
        setIsSuccess(true);

        // Redirect to My Learning after success
        setTimeout(() => {
            router.push("/my-learning");
        }, 3000);
    };

    if (!isAuthenticated || (cartItems.length === 0 && !isSuccess)) {
        return null;
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
                <Navbar />
                <main className="flex-grow flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
                        <div className="w-20 h-20 bg-[#00B894]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-[#00B894]" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#1A1F36] mb-4">Payment Successful!</h1>
                        <p className="text-gray-600 mb-8">
                            Thank you for your purchase. You can now access your courses in the My Learning section.
                        </p>
                        <button
                            onClick={() => router.push("/my-learning")}
                            className="w-full py-3 bg-[#2D6DF6] text-white rounded-lg font-semibold hover:bg-[#1a4fd6] transition-colors"
                        >
                            Go to My Learning
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
            <Navbar />
            <main className="flex-grow py-12 px-4 md:px-6">
                <div className="max-w-[1000px] mx-auto">
                    <h1 className="text-3xl font-bold text-[#1A1F36] mb-8">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                        {/* Payment Form */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-6 text-[#1A1F36]">
                                <Lock className="w-5 h-5 text-[#00B894]" />
                                <h2 className="text-xl font-bold">Secure Payment</h2>
                            </div>

                            <form onSubmit={handlePayment}>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Card Information</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Card number"
                                                className="w-full py-3 pl-12 pr-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                                required
                                            />
                                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <input
                                                type="text"
                                                placeholder="MM / YY"
                                                className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVC"
                                                className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Name on Card</label>
                                        <input
                                            type="text"
                                            defaultValue={user?.name}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className={`w-full py-4 rounded-lg font-bold text-lg text-white transition-all ${isProcessing
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-[#2D6DF6] hover:bg-[#1a4fd6] shadow-lg shadow-blue-500/20"
                                            }`}
                                    >
                                        {isProcessing ? "Processing..." : `Pay ₹${cartTotal.toLocaleString()}`}
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                        <Lock className="w-3 h-3" />
                                        <span>Payments are secure and encrypted</span>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="h-fit space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-[#1A1F36] mb-4">Order Summary</h3>
                                <div className="space-y-4 mb-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                            <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center shrink-0">
                                                <div className="text-lg" style={{ color: item.color }}>
                                                    {item.icon}
                                                </div>
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="text-sm font-medium text-[#1A1F36] truncate">{item.title}</p>
                                                <p className="text-sm text-gray-500">₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between text-lg font-bold text-[#1A1F36]">
                                    <span>Total</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
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
