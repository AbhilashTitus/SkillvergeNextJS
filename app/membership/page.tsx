"use client";

import React, { Suspense } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, Star, Zap, Shield, Crown, HelpCircle, Coins, Info, CreditCard } from 'lucide-react';

import Link from 'next/link';
import Script from 'next/script';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';


declare global {
    interface Window {
        Razorpay: any;
    }
}
interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface RazorpayErrorResponse {
    error: {
        description: string;
        code: string;
        metadata: {
            order_id: string;
            payment_id: string;
        };
    };
}

// ... inside component ...


function MembershipContent() {
    const { user, isAuthenticated, upgradeMembership, addCoins } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [coinAmount, setCoinAmount] = React.useState<number | ''>(100);

    const handleSubscribe = async (tier: 'Silver' | 'Gold', price: number) => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        try {
            // 1. Create Order
            const response = await fetch('/api/razorpay/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: price }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert('Failed to create order. Please try again.');
                console.error(data.error);
                return;
            }

            // 2. Open Razorpay Checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "Skillverge Membership",
                description: `${tier} Membership Subscription`,
                order_id: data.id,
                handler: async function (response: RazorpaySuccessResponse) {
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
                            upgradeMembership(tier);
                            alert(`Success! You have upgraded to ${tier} membership.`);
                            router.push('/');
                        } else {
                            alert('Payment verification failed. Please contact support.');
                        }
                    } catch (err) {
                        console.error('Verification error:', err);
                        alert('An error occurred during verification.');
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                },
                theme: {
                    color: tier === 'Gold' ? '#F59E0B' : '#2D6DF6',
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response: RazorpayErrorResponse) {
                alert(`Payment failed: ${response.error.description}`);
            });
            rzp1.open();

        } catch (error) {
            console.error('Subscription error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    const handleBuyCoins = async () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        const amount = typeof coinAmount === 'string' ? parseInt(coinAmount) || 0 : coinAmount;

        if (amount < 10) {
            alert('Minimum coin purchase is 10 coins.');
            return;
        }

        const price = amount; // 1 Coin = 1 Rupee

        try {
            // 1. Create Order
            const response = await fetch('/api/razorpay/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: price }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert('Failed to create order. Please try again.');
                console.error(data.error);
                return;
            }

            // 2. Open Razorpay Checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "Skillverge Coins",
                description: `Purchase ${amount} Coins`,
                order_id: data.id,
                handler: async function (response: RazorpaySuccessResponse) {
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
                            addCoins(amount);
                            alert(`Success! Added ${amount} coins to your wallet.`);
                            const redirect = searchParams.get('redirect');
                            if (redirect) {
                                router.push(redirect);
                            } else {
                                // Stay on page or optional redirect
                            }
                        } else {
                            alert('Payment verification failed. Please contact support.');
                        }
                    } catch (err) {
                        console.error('Verification error:', err);
                        alert('An error occurred during verification.');
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                },
                theme: {
                    color: '#2D6DF6',
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response: RazorpayErrorResponse) {
                alert(`Payment failed: ${response.error.description}`);
            });
            rzp1.open();

        } catch (error) {
            console.error('Coin purchase error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FB] font-sans selection:bg-[#2D6DF6] selection:text-white">
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
            />
            <Navbar />

            {/* Premium Hero Section */}
            <div className="relative bg-[#1A1F36] pt-24 pb-48 sm:pt-32 sm:pb-56 overflow-hidden">
                {/* Abstract Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#2D6DF6] opacity-20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#00B894] opacity-10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-blue-200 text-sm font-medium mb-8 backdrop-blur-md border border-white/10 shadow-xl">
                        <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="tracking-wide">PREMIUM MEMBERSHIP</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                        Invest in Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient">Professional Future</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                        Unlock unlimited potential with exclusive courses, monthly coin bonuses, and priority support. Choose the plan that accelerates your career.
                    </p>
                </div>
            </div>

            {/* Pricing Section - Overlapping Hero */}
            <div className="relative z-20 -mt-24 pb-24 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                <div className="grid max-w-lg grid-cols-1 gap-8 mx-auto lg:max-w-none lg:grid-cols-3">

                    {/* Free Tier */}
                    <div className="flex flex-col justify-between bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform duration-300">
                                    <Star className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Free</h3>
                            </div>
                            <p className="text-sm text-gray-500 mb-6">Perfect for exploring the platform and learning the basics.</p>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold text-gray-900">₹0</span>
                                <span className="text-gray-500 font-medium">/month</span>
                            </div>
                            <div className="border-t border-gray-100 pt-6 space-y-4">
                                <ul className="space-y-4 text-sm text-gray-600">
                                    <li className="flex gap-3 items-start"><Check className="h-5 w-5 text-green-500 shrink-0" /> Access to free courses</li>
                                    <li className="flex gap-3 items-start"><Check className="h-5 w-5 text-green-500 shrink-0" /> Community support</li>
                                    <li className="flex gap-3 items-start"><Check className="h-5 w-5 text-green-500 shrink-0" /> Basic quizzes</li>
                                </ul>
                            </div>
                        </div>
                        <button className="mt-8 w-full py-3.5 rounded-xl bg-gray-50 text-gray-900 font-semibold border border-gray-200 hover:bg-gray-100 transition-colors pointer-events-none opacity-60">
                            Current Plan
                        </button>
                    </div>

                    {/* Silver Tier (Popular) */}
                    <div className="relative flex flex-col justify-between bg-white rounded-3xl p-8 shadow-2xl border-2 border-[#2D6DF6] z-10 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(45,109,246,0.3)]">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2D6DF6] to-[#4F46E5] text-white text-sm font-bold px-6 py-2 rounded-full uppercase tracking-wider shadow-lg shadow-blue-500/30">
                            Most Popular
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-6 mt-2">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2D6DF6]">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-[#2D6DF6]">Silver</h3>
                            </div>
                            <p className="text-sm text-gray-500 mb-6">For serious learners ready to level up their skills.</p>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-5xl font-bold text-gray-900">₹100</span>
                                <span className="text-gray-500 font-medium">/month</span>
                            </div>
                            <div className="border-t border-gray-100 pt-6">
                                <ul className="space-y-4 text-sm text-gray-600">
                                    <li className="flex gap-3 items-start"><Check className="h-5 w-5 text-[#2D6DF6] shrink-0" /> All Free features</li>
                                    <li className="flex gap-3 items-start bg-blue-50 p-2 -mx-2 rounded-lg"><Check className="h-5 w-5 text-[#2D6DF6] shrink-0" /> <span className="font-semibold text-[#2D6DF6]">+100 Coins</span> <span className="text-gray-500">monthly bonus</span></li>
                                    <li className="flex gap-3 items-start"><Check className="h-5 w-5 text-[#2D6DF6] shrink-0" /> Silver Profile Badge</li>
                                    <li className="flex gap-3 items-start"><Check className="h-5 w-5 text-[#2D6DF6] shrink-0" /> Certificate of Completion</li>
                                </ul>
                            </div>
                        </div>
                        <button
                            onClick={() => handleSubscribe('Silver', 100)}
                            className="mt-8 w-full py-4 rounded-xl bg-[#2D6DF6] text-white font-bold text-lg shadow-lg shadow-blue-500/25 hover:bg-[#1a4fd6] hover:shadow-blue-500/40 hover:-translate-y-1 transition-all active:scale-95"
                        >
                            Upgrade to Silver
                        </button>
                    </div>

                    {/* Gold Tier */}
                    <div className="flex flex-col justify-between bg-[#111827] rounded-3xl p-8 shadow-2xl border border-yellow-500/30 text-white relative overflow-hidden group hover:shadow-yellow-500/10 hover:-translate-y-2 transition-all duration-300">
                        {/* Gold Glow Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 opacity-10 blur-[80px] rounded-full group-hover:opacity-15 transition-opacity pointer-events-none" />

                        <div>
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 border border-yellow-500/20">
                                    <Crown className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-yellow-500">Gold</h3>
                            </div>
                            <p className="text-sm text-gray-400 mb-6 relative z-10">Maximum power for professionals who want it all.</p>
                            <div className="flex items-baseline gap-1 mb-6 relative z-10">
                                <span className="text-4xl font-bold text-white">₹200</span>
                                <span className="text-gray-400 font-medium">/month</span>
                            </div>
                            <div className="border-t border-gray-700 pt-6 relative z-10">
                                <ul className="space-y-4 text-sm text-gray-300">
                                    <li className="flex gap-3 items-start"><Check className="h-5 w-5 text-yellow-500 shrink-0" /> All Silver features</li>
                                    <li className="flex gap-3 items-start bg-yellow-500/10 p-2 -mx-2 rounded-lg border border-yellow-500/10"><Check className="h-5 w-5 text-yellow-500 shrink-0" /> <span className="font-semibold text-yellow-400">+200 Coins</span> <span className="text-gray-300">monthly bonus</span></li>
                                    <li className="flex gap-3 items-start"><Check className="h-5 w-5 text-yellow-500 shrink-0" /> Gold Profile Badge</li>
                                    <li className="flex gap-3 items-start"><Check className="h-5 w-5 text-yellow-500 shrink-0" /> Priority 24/7 Support</li>
                                    <li className="flex gap-3 items-start"><Check className="h-5 w-5 text-yellow-500 shrink-0" /> Exclusive Webinars</li>
                                </ul>
                            </div>
                        </div>
                        <button
                            onClick={() => handleSubscribe('Gold', 200)}
                            className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg shadow-lg shadow-orange-500/20 hover:from-yellow-500 hover:to-orange-600 hover:shadow-orange-500/30 transition-all relative z-10 active:scale-95"
                        >
                            Upgrade to Gold
                        </button>
                    </div>

                </div>

                {/* Coin Top-up Section */}
                <div className="mt-24">
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#2D6DF6] to-[#0A264F] shadow-2xl">
                        {/* Background Patterns */}
                        <div className="absolute inset-0 bg-[#2D6DF6] opacity-90 mix-blend-multiply"></div>
                        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-400 opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                        <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="text-center lg:text-left text-white max-w-xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-6 backdrop-blur-sm">
                                    <Coins className="w-3 h-3" />
                                    <span>INSTANT CREDIT</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Need a Boost? Top Up Your Wallet</h2>
                                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                    Running low on coins? Top up instantly to purchase individual courses without a subscription.
                                    <br className="hidden sm:block" />
                                    <span className="font-semibold text-white mt-2 inline-block">1 Coin = ₹1 (Indian Rupee)</span>
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6 text-sm text-blue-100 opacity-90 justify-center lg:justify-start">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-white/20 p-1.5 rounded-full"><Shield className="w-4 h-4" /></div>
                                        <span>Secure Payment</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-white/20 p-1.5 rounded-full"><Zap className="w-4 h-4" /></div>
                                        <span>Instant Activation</span>
                                    </div>
                                </div>
                            </div>

                            {/* Interactive Card */}
                            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-white/20 backdrop-blur-sm">
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <label htmlFor="coins" className="block text-sm font-semibold text-gray-700 mb-2">Enter Amount</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-2xl">🪙</span>
                                            </div>
                                            <input
                                                type="number"
                                                name="coins"
                                                id="coins"
                                                className="block w-full py-4 pl-12 pr-16 bg-gray-50 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#2D6DF6] focus:border-transparent text-lg font-bold transition-all"
                                                placeholder="100"
                                                min="10"
                                                value={coinAmount}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (val === '') {
                                                        setCoinAmount('');
                                                    } else {
                                                        setCoinAmount(Math.max(0, parseInt(val) || 0));
                                                    }
                                                }}
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                                <span className="text-gray-500 font-medium">Coins</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleBuyCoins}
                                        className="w-full py-4 rounded-xl bg-[#2D6DF6] text-white font-bold text-lg shadow-lg shadow-blue-500/25 hover:bg-[#1a4fd6] hover:scale-[1.02] transition-all active:scale-95"
                                    >
                                        Buy for ₹{typeof coinAmount === 'number' ? coinAmount : 0}
                                    </button>
                                    <p className="text-xs text-center text-gray-400">
                                        Minimum purchase: 10 Coins. Non-refundable.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust/Why Section */}
                <div className="mt-24 text-center">
                    <p className="text-sm font-semibold text-[#2D6DF6] tracking-wider uppercase mb-3">Why Choose Premium?</p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Everything you need to succeed</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-[#2D6DF6] mx-auto mb-4">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">100% Secure</h3>
                            <p className="text-gray-500 text-sm">We use bank-level encryption via Razorpay for all transactions.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mx-auto mb-4">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Instant Access</h3>
                            <p className="text-gray-500 text-sm">Start learning immediately. No waiting times or pending approvals.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mx-auto mb-4">
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Priority Support</h3>
                            <p className="text-gray-500 text-sm">Premium members get faster response times from our support team.</p>
                        </div>
                    </div>
                </div>

                {/* Coin System Transparency Section */}
                <div className="mt-24 border-t border-gray-200 pt-16">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Coin System Transparency</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            We believe in honest and simple pricing. Here is everything you need to know about how our coin system works.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Info className="w-5 h-5 text-[#2D6DF6]" />
                                Key Rules
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "1 INR = 1 Coin. The exchange rate is fixed and transparent.",
                                    "Courses are purchased exclusively using coins from your wallet.",
                                    "Minimum course price is 100 coins.",
                                    "Coins are non-transferable and linked to your account.",
                                    "Your wallet balance can never be negative.",
                                    "Purchased courses remain accessible permanently."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-gray-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2D6DF6] mt-2 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-[#2D6DF6]" />
                                Purchase Process
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-1">1. Buying Coins</h4>
                                    <p className="text-sm text-gray-500">
                                        Select an amount in INR. Once your payment is successful, the exact equivalent in coins is instantly credited to your wallet.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-1">2. Unlocking Courses</h4>
                                    <p className="text-sm text-gray-500">
                                        Browsable courses show their coin price. Click to buy, and if you have sufficient balance, coins are deducted once and access is granted immediately.
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-xl">
                                    <p className="text-xs text-[#2D6DF6] font-medium">
                                        Note: You must be logged in to make any purchases. If your balance is low during a purchase, we'll prompt you to top up.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div >
    );
}

export default function MembershipPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D6DF6]"></div>
            </div>
        }>
            <MembershipContent />
        </Suspense>
    );
}
