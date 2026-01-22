"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Page Header */}
                <div className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white py-16 text-center">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h1 className="text-4xl text-white mb-4">Privacy Policy</h1>

                    </div>
                </div>

                {/* Content Section */}
                <section className="py-16 bg-[#F8F9FB]">
                    <div className="max-w-[1024px] mx-auto px-4 md:px-6 bg-white rounded-2xl p-8 md:p-12 shadow-[0_8px_16px_rgba(0,0,0,0.05)]">
                        <div className="prose prose-lg max-w-none text-gray-600">
                            <h3 className="text-[#1A1F36] font-bold">1. Introduction</h3>
                            <p>
                                At Skillverge (operated by <strong>Alenova Technologies Pvt Ltd</strong>), we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">2. Information We Collect</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Personal Information:</strong> Name, email address, phone number, and billing details collected during registration or purchase.</li>
                                <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, and pages visited.</li>
                                <li><strong>Course Data:</strong> Progress, quiz scores, and assignments submitted within courses.</li>
                            </ul>

                            <h3 className="text-[#1A1F36] font-bold mt-8">3. How We Use Your Information</h3>
                            <p>
                                We use your information to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Provide and maintain our services.</li>
                                <li>Process transactions and send purchase confirmations.</li>
                                <li>Communicate with you regarding updates, offers, and support.</li>
                                <li>Improve our platform and user experience.</li>
                            </ul>

                            <h3 className="text-[#1A1F36] font-bold mt-8">4. Data Sharing and Disclosure</h3>
                            <p>
                                We do not sell your personal information. We may share your data with:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our platform (e.g., payment gateways, hosting services).</li>
                                <li><strong>Legal Requirements:</strong> If required by law or in response to valid requests by public authorities.</li>
                            </ul>

                            <h3 className="text-[#1A1F36] font-bold mt-8">5. Data Security</h3>
                            <p>
                                We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">6. Cookies</h3>
                            <p>
                                We use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, but this may limit your ability to use certain features of our website.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">7. Your Rights</h3>
                            <p>
                                You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">8. Changes to This Policy</h3>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
                            </p>

                            <h3 className="text-[#1A1F36] font-bold mt-8">9. Contact Us</h3>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at:
                                <br />
                                <strong>Email:</strong> skillverge@alenovatech.com
                                <br />
                                <strong>Address:</strong> No-70/5, 2nd Floor, Shamanna Reddy Building, Bommanahalli, Bangalore - 560068
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
