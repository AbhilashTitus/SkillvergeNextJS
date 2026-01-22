"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function DeliveryPolicy() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Page Header */}
                <div className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white py-16 text-center">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h1 className="text-4xl text-white mb-4">Delivery Policy</h1>

                    </div>
                </div>

                {/* Content Section */}
                <section className="py-16 bg-[#F8F9FB]">
                    <div className="max-w-[1024px] mx-auto px-4 md:px-6 bg-white rounded-2xl p-8 md:p-12 shadow-[0_8px_16px_rgba(0,0,0,0.05)]">
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <h3 className="text-[#1A1F36] font-bold">1. Digital Delivery</h3>
                            <p>
                                For the vast majority of purchases on Skillverge (Courses, Memberships, E-books):
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Instant Access:</strong> Upon successful payment, you will receive immediate access to your purchased content via your "My Learning" dashboard.</li>
                                <li><strong>Confirmation:</strong> An email confirmation containing your order details and access instructions will be sent to your registered email address securely.</li>
                            </ul>

                            <h3 className="text-[#1A1F36] font-bold mt-8">2. Delivery Timelines</h3>
                            <p>
                                <strong>Digital Services:</strong> Instant (0-15 minutes). If you do not receive access within 15 minutes, please contact support.
                            </p>
                            <p>
                                <strong>Physical Deliveries (Merchandise/Certificates):</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Metro Cities:</strong> 3-5 business days.</li>
                                <li><strong>Non-Metro Cities:</strong> 5-7 business days.</li>
                                <li><strong>Remote Areas:</strong> 7-14 business days.</li>
                            </ul>

                            <h3 className="text-[#1A1F36] font-bold mt-8">3. Delivery Issues</h3>
                            <p>
                                If you experience any issues with accessing your digital content or receiving your physical shipment, please contact us at <strong>skillverge@alenovatech.com</strong> or call <strong>+91 9916190863</strong>.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
