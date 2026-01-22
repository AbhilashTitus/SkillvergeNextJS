"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ShippingPolicy() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Page Header */}
                <div className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white py-16 text-center">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h1 className="text-4xl text-white mb-4">Shipping Policy</h1>

                    </div>
                </div>

                {/* Content Section */}
                <section className="py-16 bg-[#F8F9FB]">
                    <div className="max-w-[1024px] mx-auto px-4 md:px-6 bg-white rounded-2xl p-8 md:p-12 shadow-[0_8px_16px_rgba(0,0,0,0.05)]">
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <h3 className="text-[#1A1F36] font-bold">1. Digital Products</h3>
                            <p>
                                Skillverge (Alenova Technologies Pvt Ltd) primarily operates as an online learning platform.
                            </p>
                            <p>
                                <strong>For all digital courses, subscriptions, and virtual goods:</strong> Shipping is not applicable. Access is granted instantly or as per the scheduled course start date upon successful confirmation of payment.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">2. Physical Goods (If Applicable)</h3>
                            <p>
                                In the event that we offer physical merchandise (e.g., study kits, books, or certificates):
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Processing Time:</strong> Orders are typically processed within 1-2 business days.</li>
                                <li><strong>Shipping Partners:</strong> We use reputable courier partners for deliveries across India.</li>
                                <li><strong>Shipping Charges:</strong> Standard shipping charges may apply and will be calculated at checkout.</li>
                            </ul>

                            <h3 className="text-[#1A1F36] font-bold mt-8">3. International Shipping</h3>
                            <p>
                                Currently, we do not ship physical goods outside of India. Digital products are accessible globally.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">4. Tracking</h3>
                            <p>
                                If physical goods are shipped, you will receive a tracking number via email to monitor the status of your shipment.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
