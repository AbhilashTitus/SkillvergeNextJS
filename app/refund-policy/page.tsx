"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RefundPolicy() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Page Header */}
                <div className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white py-16 text-center">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h1 className="text-4xl text-white mb-4">Refund Policy</h1>

                    </div>
                </div>

                {/* Content Section */}
                <section className="py-16 bg-[#F8F9FB]">
                    <div className="max-w-[1024px] mx-auto px-4 md:px-6 bg-white rounded-2xl p-8 md:p-12 shadow-[0_8px_16px_rgba(0,0,0,0.05)]">
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <h3 className="text-[#1A1F36] font-bold">1. 7-Day Money-Back Guarantee</h3>
                            <p>
                                At Skillverge (Alenova Technologies Pvt Ltd), we want you to be satisfied with your purchase. If you are not completely happy with a course, you may request a refund within <strong>7 days</strong> of the purchase date.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">2. Eligibility for Refund</h3>
                            <p>To be eligible for a refund, the following conditions must be met:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>The refund request is made within 7 days of purchase.</li>
                                <li>You have not completed more than 30% of the course content.</li>
                                <li>You have not downloaded any significant portion of the offline content (if applicable).</li>
                            </ul>

                            <h3 className="text-[#1A1F36] font-bold mt-8">3. Non-Refundable Items</h3>
                            <p>
                                Certain items are non-refundable:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Membership fees or subscription renewals (unless cancelled prior to renewal).</li>
                                <li>Physical goods (if any) that have been opened or used.</li>
                                <li>Downloadable software or digital assets that have been accessed.</li>
                            </ul>

                            <h3 className="text-[#1A1F36] font-bold mt-8">4. Processing Time</h3>
                            <p>
                                Once your refund is approved, it will be processed within 5-7 business days. The amount will be credited back to your original payment method. Please note that your bank may take additional time to reflect the transaction.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">5. How to Request a Refund</h3>
                            <p>
                                To request a refund, please write to us at <strong>skillverge@alenovatech.com</strong> with your order details and the reason for the request.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
