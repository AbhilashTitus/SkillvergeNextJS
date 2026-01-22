"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CancellationPolicy() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Page Header */}
                <div className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white py-16 text-center">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h1 className="text-4xl text-white mb-4">Cancellation Policy</h1>

                    </div>
                </div>

                {/* Content Section */}
                <section className="py-16 bg-[#F8F9FB]">
                    <div className="max-w-[1024px] mx-auto px-4 md:px-6 bg-white rounded-2xl p-8 md:p-12 shadow-[0_8px_16px_rgba(0,0,0,0.05)]">
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <h3 className="text-[#1A1F36] font-bold">1. Order Cancellation</h3>
                            <p>
                                <strong>Digital Products:</strong> Once a course has been purchased and accessed, it cannot be cancelled in the traditional sense. However, it may be eligible for a refund under our <a href="/refund-policy" className="text-[#2D6DF6] hover:underline">Refund Policy</a>.
                            </p>
                            <p>
                                <strong>Physical Products:</strong> Orders for physical goods can be cancelled before they are shipped. Once shipped, the order cannot be cancelled but may be returned depending on the item's return eligibility.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">2. Subscription Cancellation</h3>
                            <p>
                                If you have subscribed to a recurring membership plan (Gold/Silver):
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>You may cancel your subscription renewal at any time through your account settings.</li>
                                <li>Cancellation will be effective at the end of the current billing cycle.</li>
                                <li>No pro-rata refunds are provided for the remaining period of the current cycle.</li>
                            </ul>

                            <h3 className="text-[#1A1F36] font-bold mt-8">3. Instructor Cancellations</h3>
                            <p>
                                In rare cases, Skillverge or an instructor may cancel a course or live session. In such events, a full refund or rescheduling option will be provided to enrolled students.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">4. How to Cancel</h3>
                            <p>
                                To cancel an order or subscription, please visit your account dashboard or contact customer support at <strong>skillverge@alenovatech.com</strong>.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
