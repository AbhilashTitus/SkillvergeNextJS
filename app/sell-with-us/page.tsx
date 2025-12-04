"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SellWithUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        category: "",
        experience: "",
        bio: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Seller application:", formData);
    };

    const benefits = [
        {
            icon: "bi-lightning-charge",
            title: "Fast Approval",
            description: "Get approved within 48 hours and start selling your courses immediately."
        },
        {
            icon: "bi-currency-dollar",
            title: "Weekly Payments",
            description: "Receive your earnings every week directly to your bank account."
        },
        {
            icon: "bi-graph-up-arrow",
            title: "Marketplace Reach",
            description: "Access thousands of learners actively searching for courses like yours."
        }
    ];

    const faqs = [
        {
            question: "How much can I earn?",
            answer: "You keep 70% of the course price. With our growing marketplace, successful instructors earn ₹50,000+ per month."
        },
        {
            question: "What equipment do I need?",
            answer: "A computer, microphone, and screen recording software are all you need to create quality courses."
        },
        {
            question: "How long does approval take?",
            answer: "Most applications are reviewed within 48 hours. You'll receive an email with the decision."
        },
        {
            question: "Can I teach multiple subjects?",
            answer: "Yes! You can create and sell courses in multiple categories once approved."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Seller Hero */}
                <section className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white py-24">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-4xl text-white mb-6">Sell Your Courses on Skillverge</h1>
                                <p className="text-lg text-white/90 mb-12">
                                    Join India's growing EdTech marketplace and earn instantly. Share your knowledge with thousands of eager learners.
                                </p>
                                <a href="#registration" className="inline-block py-4 px-8 text-lg font-medium text-center rounded-lg transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-white text-[#2D6DF6] hover:bg-[#00B894] hover:text-white">
                                    Start Onboarding
                                </a>
                            </div>
                            <div className="bg-white/10 rounded-[20px] p-12 flex items-center justify-center min-h-[300px]">
                                <div className="text-center text-white/70">
                                    <i className="bi bi-image text-[4rem] mb-4"></i>
                                    <p className="text-sm">Upload visual placeholder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-16 bg-white">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold text-center mb-8 text-[#1A1F36]">Why Sell on Skillverge?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="text-center p-12 bg-[#F8F9FB] rounded-2xl transition-all duration-[300ms] hover:-translate-y-2 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)]">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] rounded-full flex items-center justify-center">
                                        <i className={`bi ${benefit.icon} text-[2.5rem] text-white`}></i>
                                    </div>
                                    <h3 className="text-xl mb-4 text-[#1A1F36]">{benefit.title}</h3>
                                    <p className="text-base text-gray-600">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Metrics */}
                <section className="py-16 bg-gradient-to-br from-[#1A1F36] to-[#0f1420] text-white">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { number: "10,000+", label: "Monthly Learners" },
                                { number: "2,000+", label: "Active Sellers" },
                                { number: "500+", label: "Quality Courses" }
                            ].map((metric, index) => (
                                <div key={index} className="text-center p-12 bg-white/10 rounded-2xl backdrop-blur-[10px]">
                                    <div className="text-5xl font-bold text-[#00B894] mb-4">{metric.number}</div>
                                    <div className="text-lg text-white/90">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Registration */}
                <section id="registration" className="py-16 bg-[#F8F9FB]">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16">
                            <div>
                                <h2 className="text-3xl mb-6 text-[#1A1F36]">Ready to Start Teaching?</h2>
                                <p className="text-lg text-gray-600 mb-12">
                                    Fill out the form below to begin your journey as a course creator on Skillverge.
                                </p>

                                <div className="mb-12">
                                    {[
                                        { num: "1", title: "Submit Application", desc: "Fill out the registration form with your details" },
                                        { num: "2", title: "Get Approved", desc: "Our team reviews your application within 48 hours" },
                                        { num: "3", title: "Start Selling", desc: "Upload your courses and start earning" }
                                    ].map((step) => (
                                        <div key={step.num} className="flex gap-6 mb-8">
                                            <div className="w-[50px] h-[50px] bg-[#2D6DF6] text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                                                {step.num}
                                            </div>
                                            <div>
                                                <h4 className="text-lg mb-2 text-[#1A1F36]">{step.title}</h4>
                                                <p className="text-sm text-gray-600">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-12 shadow-[0_8px_16px_rgba(0,0,0,0.15)]">
                                <form onSubmit={handleSubmit}>
                                    <h3 className="text-2xl mb-8 text-center text-[#1A1F36]">Seller Registration Form</h3>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
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
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                            placeholder="+91-XXXXXXXXXX"
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Course Category *</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            <option value="development">Development</option>
                                            <option value="business">Business</option>
                                            <option value="design">Design</option>
                                            <option value="marketing">Marketing</option>
                                            <option value="data-science">Data Science</option>
                                            <option value="ai">AI & Prompt Engineering</option>
                                            <option value="productivity">Productivity</option>
                                        </select>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Teaching Experience *</label>
                                        <select
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6]"
                                            required
                                        >
                                            <option value="">Select experience level</option>
                                            <option value="beginner">Beginner (0-2 years)</option>
                                            <option value="intermediate">Intermediate (2-5 years)</option>
                                            <option value="advanced">Advanced (5+ years)</option>
                                        </select>
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-sm font-semibold text-[#1A1F36] mb-2">Tell us about yourself</label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            rows={4}
                                            className="w-full py-3 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2D6DF6] resize-none"
                                            placeholder="Share your teaching experience and expertise..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 px-8 text-lg font-medium text-center rounded-lg transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-[#2D6DF6] text-white hover:bg-[#1a4fd6] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(45,109,246,0.2)]"
                                    >
                                        Submit Application
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16 bg-white">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold text-center mb-8 text-[#1A1F36]">Frequently Asked Questions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            {faqs.map((faq, index) => (
                                <div key={index} className="p-8 bg-[#F8F9FB] rounded-xl border-l-4 border-[#2D6DF6]">
                                    <h4 className="text-lg mb-4 text-[#1A1F36]">{faq.question}</h4>
                                    <p className="text-base text-gray-600 leading-[1.6]">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
