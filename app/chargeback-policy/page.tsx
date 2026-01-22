"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ChargebackPolicy() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Page Header */}
                <div className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white py-16 text-center">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h1 className="text-4xl text-white mb-4">Chargeback Policy</h1>

                    </div>
                </div>

                {/* Content Section */}
                <section className="py-16 bg-[#F8F9FB]">
                    <div className="max-w-[1024px] mx-auto px-4 md:px-6 bg-white rounded-2xl p-8 md:p-12 shadow-[0_8px_16px_rgba(0,0,0,0.05)]">
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <h3 className="text-[#1A1F36] font-bold">1. Understanding Chargebacks</h3>
                            <p>
                                A chargeback occurs when a customer disputes a charge with their bank or credit card issuer. At Skillverge (Alenova Technologies Pvt Ltd), we take chargebacks seriously and aim to resolve disputes amicably before they escalate.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">2. Unauthorized Chargebacks</h3>
                            <p>
                                If you do not recognize a charge from Skillverge, we strongly encourage you to contact our support team immediately at <strong>skillverge@alenovatech.com</strong> before filing a chargeback. We are here to help clarify any billing concerns.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">3. Consequences of False Chargebacks</h3>
                            <p>
                                Filing a chargeback without merit or for the purpose of retaining products/services without payment is considered fraud. In the event of a fraudulent or unsubstantiated chargeback:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Your account may be immediately suspended or permanently terminated.</li>
                                <li>We reserve the right to dispute the chargeback with evidence of your purchase and usage.</li>
                                <li>You may be barred from using Skillverge services in the future.</li>
                            </ul>

                            <h3 className="text-[#1A1F36] font-bold mt-8">4. Resolution Process</h3>
                            <p>
                                We are committed to fair resolution. If you believe a charge was made in error, please allow us 48 hours to investigate and respond to your inquiry.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
