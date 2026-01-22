"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };



    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Page Header */}
                <div className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white py-16 text-center">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h1 className="text-4xl text-white mb-4">Contact Us</h1>
                        <p className="text-lg text-white/90 m-0">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    </div>
                </div>

                {/* Contact Section */}
                <section className="py-16 bg-[#F8F9FB]">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Contact Info */}
                            <div>
                                <h2 className="text-3xl mb-6 font-bold text-[#1A1F36]">Get in Touch</h2>
                                <p className="text-lg text-gray-600 mb-12 leading-[1.6]">
                                    Whether you have a question about courses, pricing, or anything else, our team is ready to answer all your questions.
                                </p>

                                <div className="space-y-6 mb-12">
                                    {/* Email */}
                                    <div className="flex gap-6 p-8 bg-white rounded-xl transition-all duration-[300ms] hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)] hover:translate-x-1">
                                        <div className="w-[60px] h-[60px] bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] rounded-xl flex items-center justify-center flex-shrink-0">
                                            <i className="bi bi-envelope-fill text-[1.75rem] text-white"></i>
                                        </div>
                                        <div>
                                            <h4 className="text-lg mb-2 text-[#1A1F36] font-semibold">Email</h4>
                                            <p className="text-sm text-gray-600 mb-1">skillverge@alenovatech.com</p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex gap-6 p-8 bg-white rounded-xl transition-all duration-[300ms] hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)] hover:translate-x-1">
                                        <div className="w-[60px] h-[60px] bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] rounded-xl flex items-center justify-center flex-shrink-0">
                                            <i className="bi bi-telephone-fill text-[1.75rem] text-white"></i>
                                        </div>
                                        <div>
                                            <h4 className="text-lg mb-2 text-[#1A1F36] font-semibold">Phone</h4>
                                            <p className="text-sm text-gray-600 mb-1">+91 9916190863</p>
                                            <p className="text-sm text-gray-600">Mon-Fri: 9AM - 6PM IST</p>
                                        </div>
                                    </div>

                                    {/* Office */}
                                    <div className="flex gap-6 p-8 bg-white rounded-xl transition-all duration-[300ms] hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)] hover:translate-x-1">
                                        <div className="w-[60px] h-[60px] bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] rounded-xl flex items-center justify-center flex-shrink-0">
                                            <i className="bi bi-geo-alt-fill text-[1.75rem] text-white"></i>
                                        </div>
                                        <div>
                                            <h4 className="text-lg mb-2 text-[#1A1F36] font-semibold">Office</h4>
                                            <p className="text-sm text-gray-600 mb-1">No-70/5, 2nd Floor, Shamanna Reddy Building</p>
                                            <p className="text-sm text-gray-600">Bommanahalli, Bangalore - 560068</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-white rounded-2xl p-12 shadow-[0_8px_16px_rgba(0,0,0,0.15)]">
                                <form onSubmit={handleSubmit}>
                                    <h3 className="text-2xl mb-8 text-center font-bold text-[#1A1F36]">Send us a Message</h3>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Your Name *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Subject *</label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                            placeholder="What is this about?"
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Message *</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={6}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6] resize-none"
                                            placeholder="Tell us more about your inquiry..."
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 px-8 text-lg font-medium text-center rounded-lg transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-[#2D6DF6] text-white hover:bg-[#1a4fd6] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(45,109,246,0.2)]"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>


            </main>
            <Footer />
        </div>
    );
}
