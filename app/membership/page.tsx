"use client";

import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { Check, Star, Zap, Shield, Crown, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function MembershipPage() {
    const { user, isAuthenticated, upgradeMembership } = useAuth();
    const router = useRouter();

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
            rzp1.on('payment.failed', function (response: any) {
                alert(`Payment failed: ${response.error.description}`);
            });
            rzp1.open();

        } catch (error) {
            console.error('Subscription error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="bg-white">
            <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-[#1A1F36] py-20 sm:py-24">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute left-[50%] top-0 h-[40rem] w-[80rem] -translate-x-1/2 stroke-white/10 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]" aria-hidden="true">
                        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                            <defs>
                                <pattern id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                                    <path d="M.5 200V.5H200" fill="none" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" strokeWidth="0" fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
                        </svg>
                    </div>
                </div>
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-lg font-semibold leading-8 text-[#2D6DF6]">Premium Access</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Upgrade Your Learning Journey</p>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                        Get exclusive access to premium courses, bonus coins, and priority support. Choose the plan that fits your goals.
                    </p>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="py-16 sm:py-24 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid max-w-md grid-cols-1 gap-8 mx-auto xl:max-w-none xl:grid-cols-3">

                        {/* Free Tier */}
                        <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 shadow-sm hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between gap-x-4">
                                    <h3 id="tier-free" className="text-lg font-semibold leading-8 text-gray-900">Free</h3>
                                </div>
                                <p className="mt-4 text-sm leading-6 text-gray-600">Perfect for getting started with basics.</p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-gray-900">₹0</span>
                                    <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                                </p>
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                    <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-[#2D6DF6]" /> Access to free courses</li>
                                    <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-[#2D6DF6]" /> Community support</li>
                                    <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-[#2D6DF6]" /> Basic quizzes</li>
                                </ul>
                            </div>
                            <button
                                className="mt-8 block rounded-md bg-gray-100 px-3 py-2 text-center text-sm font-semibold leading-6 text-gray-600 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 pointer-events-none"
                            >
                                Current Plan
                            </button>
                        </div>

                        {/* Silver Tier */}
                        <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-[#2D6DF6] xl:p-10 shadow-lg relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#2D6DF6] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                Popular
                            </div>
                            <div>
                                <div className="flex items-center justify-between gap-x-4">
                                    <h3 id="tier-silver" className="text-lg font-semibold leading-8 text-[#2D6DF6]">Silver</h3>
                                    <Zap className="h-6 w-6 text-[#2D6DF6]" />
                                </div>
                                <p className="mt-4 text-sm leading-6 text-gray-600">A step up for serious learners.</p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-gray-900">₹100</span>
                                    <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                                </p>
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                    <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-[#2D6DF6]" /> All Free features</li>
                                    <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-[#2D6DF6]" /> <strong>+50 Coins</strong> monthly bonus</li>
                                    <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-[#2D6DF6]" /> Silver Profile Badge</li>
                                    <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-[#2D6DF6]" /> Certificate of Completion</li>
                                </ul>
                            </div>
                            <button
                                onClick={() => handleSubscribe('Silver', 100)}
                                className="mt-8 block rounded-md bg-[#2D6DF6] px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1a4fd6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D6DF6] transition-transform active:scale-95"
                            >
                                Upgrade to Silver
                            </button>
                        </div>

                        {/* Gold Tier */}
                        <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-yellow-400 xl:p-10 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full opacity-20 blur-xl"></div>
                            <div>
                                <div className="flex items-center justify-between gap-x-4">
                                    <h3 id="tier-gold" className="text-lg font-semibold leading-8 text-yellow-600">Gold</h3>
                                    <Crown className="h-6 w-6 text-yellow-500" />
                                </div>
                                <p className="mt-4 text-sm leading-6 text-gray-600">Maximum power for professionals.</p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-gray-900">₹200</span>
                                    <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                                </p>
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                    <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-yellow-500" /> All Silver features</li>
                                    <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-yellow-500" /> <strong>+100 Coins</strong> monthly bonus</li>
                                    <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-yellow-500" /> Gold Profile Badge</li>
                                    <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-yellow-500" /> Priority 24/7 Support</li>
                                    <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-yellow-500" /> Exclusive Webinars</li>
                                </ul>
                            </div>
                            <button
                                onClick={() => handleSubscribe('Gold', 200)}
                                className="mt-8 block rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:from-yellow-500 hover:to-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 transition-transform active:scale-95"
                            >
                                Upgrade to Gold
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Features / Trust Section */}
            <div className="bg-white py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <p className="mt-2 text-3xl font-bold tracking-tight text-[#1A1F36] sm:text-4xl">
                            Why Upgrade?
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Unlock the full potential of your learning experience with our premium features designed to accelerate your growth.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D6DF6]">
                                        <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    Secure Payments
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    We use Razorpay for 100% secure and encrypted transactions. cancel anytime.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D6DF6]">
                                        <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    Instant Activation
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Your coins and badges are added to your account immediately after payment verification.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
