"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsConditions() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Page Header */}
                <div className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white py-16 text-center">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h1 className="text-4xl text-white mb-4">Terms & Conditions</h1>

                    </div>
                </div>

                {/* Content Section */}
                <section className="py-16 bg-[#F8F9FB]">
                    <div className="max-w-[1024px] mx-auto px-4 md:px-6 bg-white rounded-2xl p-8 md:p-12 shadow-[0_8px_16px_rgba(0,0,0,0.05)]">
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <h3 className="text-[#1A1F36] font-bold">1. Introduction</h3>
                            <p>
                                Welcome to Skillverge ("we," "our," or "us"). These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, you must not use our services.
                            </p>
                            <p>
                                Skillverge is owned and operated by <strong>Alenova Technologies Pvt Ltd</strong>, a company incorporated under the laws of India, with its registered office at No-70/5, 2nd Floor, Shamanna Reddy Building, Bommanahalli, Bangalore - 560068.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">2. Use of the Platform</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>You must be at least 18 years old or have parental consent to use this platform.</li>
                                <li>You agree to provide accurate and complete information during registration.</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                                <li>You agree not to use the platform for any unlawful or unauthorized purpose.</li>
                            </ul>

                            <h3 className="text-[#1A1F36] font-bold mt-8">3. Course Content and Intellectual Property</h3>
                            <p>
                                All course materials, videos, text, and other content provided on Skillverge are the intellectual property of Skillverge or its instructors. You are granted a limited, non-exclusive, non-transferable license to access and view the content for personal, non-commercial use only.
                            </p>
                            <p>
                                You may not copy, reproduce, distribute, or create derivative works from our content without explicit permission.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">4. Payments and Refund Policy</h3>
                            <p>
                                We offer a range of pricing plans and course fees. All payments are processed securely. Please refer to our separate <a href="/refund-policy" className="text-[#2D6DF6] hover:underline">Refund Policy</a> for details on cancellations and refunds.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">5. User Conduct</h3>
                            <p>
                                You agree to behave respectfully towards instructors and other students. Harassment, hate speech, or inappropriate behavior will result in immediate account termination.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">6. Limitation of Liability</h3>
                            <p>
                                Skillverge and Alenova Technologies Pvt Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">7. Governing Law</h3>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">8. Contact Us</h3>
                            <p>
                                If you have any questions about these Terms, please contact us at:
                                <br />
                                <strong>Email:</strong> skillverge@alenovatech.com
                                <br />
                                <strong>Phone:</strong> +91 9916190863
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
