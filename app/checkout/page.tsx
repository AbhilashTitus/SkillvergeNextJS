"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { courses } from "@/lib/data";
import { Lock, CreditCard, CheckCircle, Tag } from "lucide-react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user, buyCourses, isAuthenticated, redeemCoins } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Initialize from URL param
    const [redeemApplied, setRedeemApplied] = useState(false);

    useEffect(() => {
        if (searchParams.get('redeem') === 'true') {
            setRedeemApplied(true);
        }
    }, [searchParams]);

    // Calculate coin usage
    const userCoins = user?.coins || 0;
    // Cap redemption at cartTotal so we don't go negative, or potentially cap it at a percentage if desired.
    // For now, full redemption up to cart value allowed (1 Coin = ₹1).
    const maxRedeemable = Math.min(userCoins, cartTotal);
    const discount = redeemApplied ? maxRedeemable : 0;
    const finalTotal = cartTotal - discount;

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

        try {
            // 1. Create Order
            if (finalTotal > 0) {
                const response = await fetch('/api/razorpay/create-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: finalTotal }),
                });

                const data = await response.json();

                if (!response.ok) {
                    alert('Failed to create order. Please try again.');
                    setIsProcessing(false);
                    return;
                }

                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: data.amount,
                    currency: data.currency,
                    name: "Skillverge",
                    description: "Course Purchase",
                    order_id: data.id,
                    handler: async function (response: any) {
                        try {
                            const verifyRes = await fetch('/api/razorpay/verify-payment', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                }),
                            });

                            const verifyData = await verifyRes.json();

                            if (verifyData.success) {
                                completePurchase(response.razorpay_payment_id, response.razorpay_order_id);
                            } else {
                                alert('Payment verification failed. Please contact support.');
                                setIsProcessing(false);
                            }
                        } catch (err) {
                            console.error('Verification error:', err);
                            alert('An error occurred during verification.');
                            setIsProcessing(false);
                        }
                    },
                    prefill: {
                        name: user?.name,
                        email: user?.email,
                    },
                    theme: {
                        color: "#2D6DF6",
                    },
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response: any) {
                    alert(`Payment failed: ${response.error.description}`);
                    setIsProcessing(false);
                });
                rzp1.open();
            } else {
                // Free purchase (100% coin redemption)
                completePurchase("coin_redemption", "free_order");
            }

        } catch (error) {
            console.error('Payment error:', error);
            alert('Something went wrong. Please try again.');
            setIsProcessing(false);
        }
    };

    const completePurchase = (paymentId?: string, orderId?: string) => {
        // Deduct coins if applied
        if (redeemApplied && discount > 0) {
            redeemCoins(discount);
        }

        // Redirect to success page
        // We pass the payment details. The SuccessPage will handle:
        // 1. Reading cartItems from context
        // 2. Calling buyCourses()
        // 3. Clearing the cart
        const params = new URLSearchParams();
        if (paymentId) params.append('payment_id', paymentId);
        if (orderId) params.append('order_id', orderId);

        // Pass cart IDs explicitly to be robust against context clearing race conditions
        const cartIds = cartItems.map(item => item.id).join(',');
        if (cartIds) params.append('cart_ids', cartIds);

        router.push(`/success?${params.toString()}`);
    };

    if (!isAuthenticated || (cartItems.length === 0 && !isProcessing)) {
        // Added !isProcessing to prevent redirect while payment/redirect is happening
        // (Checkout might clear cart before redirect finishes if we relied solely on context, 
        // but here we redirect first. Still, good safety)
        if (!isProcessing && cartItems.length === 0) {
            // Use useEffect for redirect, return null here for safety
            return null;
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
            <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
            <Navbar />
            <main className="flex-grow py-12 px-4 md:px-6">
                <div className="max-w-[1000px] mx-auto">
                    <h1 className="text-2xl font-bold text-[#1A1F36] mb-8">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                        {/* Payment Form */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-6 text-[#1A1F36]">
                                <Lock className="w-5 h-5 text-[#00B894]" />
                                <h2 className="text-xl font-bold">Billing Details</h2>
                            </div>

                            <form onSubmit={handlePayment}>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Name</label>
                                        <input
                                            type="text"
                                            defaultValue={user?.name}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6] bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Email</label>
                                        <input
                                            type="email"
                                            defaultValue={user?.email}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6] bg-gray-50"
                                            readOnly
                                        />
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                                        <Lock className="w-5 h-5 text-[#2D6DF6] flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-[#1A1F36]">
                                            Your payment is secured with Razorpay. You will be redirected to complete the payment safely.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className={`w-full py-4 rounded-lg font-bold text-lg text-white transition-all ${isProcessing
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-[#2D6DF6] hover:bg-[#1a4fd6] shadow-lg shadow-blue-500/20"
                                            }`}
                                    >
                                        {isProcessing ? "Processing..." : `Pay ₹${finalTotal.toLocaleString()}`}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="h-fit space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-[#1A1F36] mb-4">Order Summary</h3>
                                <div className="space-y-4 mb-6">
                                    {cartItems.map((item) => {
                                        // Find original course data to ensure valid React Element for icon (fixes serialization issues)
                                        const originalCourse = courses.find(c => c.id === item.id);
                                        const iconToRender = originalCourse ? originalCourse.icon : item.icon;

                                        return (
                                            <div key={item.id} className="flex gap-3">
                                                <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center shrink-0 overflow-hidden relative">
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
                                                        <div className="text-lg" style={{ color: item.color }}>
                                                            {iconToRender}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-grow min-w-0">
                                                    <p className="text-sm font-medium text-[#1A1F36] truncate">{item.title}</p>
                                                    <p className="text-sm text-gray-500">₹{item.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="border-t border-gray-100 pt-4 space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal.toLocaleString()}</span>
                                    </div>

                                    {/* Coin Redemption UI */}
                                    <div className="py-2">
                                        <label className={`flex items-center justify-between group ${userCoins > 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${redeemApplied ? 'bg-[#2D6DF6] border-[#2D6DF6]' : 'border-gray-300'}`}>
                                                    {redeemApplied && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={redeemApplied}
                                                    onChange={() => {
                                                        if (userCoins > 0) setRedeemApplied(!redeemApplied);
                                                    }}
                                                    disabled={userCoins === 0}
                                                />
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                                    Redeem Coins
                                                    <span className={`ml-1 font-bold ${userCoins > 0 ? 'text-[#2D6DF6]' : 'text-gray-400'}`}>
                                                        ({userCoins > 0 ? Math.min(userCoins, cartTotal) : 0})
                                                    </span>
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium text-green-600">
                                                - ₹{userCoins > 0 ? maxRedeemable.toLocaleString() : 0}
                                            </span>
                                        </label>
                                        <p className="text-xs text-gray-500 mt-1 pl-7">
                                            Balance: <span className="font-semibold text-gray-700">{userCoins} Coins</span> (1 Coin = ₹1)
                                            {userCoins === 0 && <span className="block text-orange-500 mt-1">Upgrade membership or complete courses to earn coins!</span>}
                                        </p>
                                    </div>

                                    <div className="flex justify-between text-lg font-bold text-[#1A1F36] pt-2 border-t border-gray-100 mt-2">
                                        <span>Total</span>
                                        <span>₹{finalTotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                                <Lock className="w-3 h-3" />
                                <span>Secured by Razorpay</span>
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
