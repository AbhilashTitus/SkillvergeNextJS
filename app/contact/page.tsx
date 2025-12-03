import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20">
                {/* Header */}
                <section className="bg-secondary text-white py-20 text-center">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </section>

                {/* Contact Content */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Info */}
                            <div className="lg:w-1/3 space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4 text-secondary">Get in Touch</h2>
                                    <p className="text-gray-600">
                                        Whether you have a question about courses, pricing, or anything else, our team is ready to answer all your questions.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <Mail />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary">Email</h4>
                                            <p className="text-gray-600">support@skillverge.com</p>
                                            <p className="text-gray-600">info@skillverge.com</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <Phone />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary">Phone</h4>
                                            <p className="text-gray-600">+91-9876543210</p>
                                            <p className="text-gray-600">Mon-Fri: 9AM - 6PM IST</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <MapPin />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-secondary">Office</h4>
                                            <p className="text-gray-600">123 Tech Park, Bangalore</p>
                                            <p className="text-gray-600">Karnataka, India - 560001</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-secondary mb-4">Connect With Us</h4>
                                    <div className="flex gap-4 text-gray-400">
                                        <a href="#" className="hover:text-primary transition-colors"><Facebook /></a>
                                        <a href="#" className="hover:text-primary transition-colors"><Twitter /></a>
                                        <a href="#" className="hover:text-primary transition-colors"><Instagram /></a>
                                        <a href="#" className="hover:text-primary transition-colors"><Linkedin /></a>
                                        <a href="#" className="hover:text-primary transition-colors"><Youtube /></a>
                                    </div>
                                </div>
                            </div>

                            {/* Form */}
                            <div className="lg:w-2/3">
                                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                                    <h3 className="text-2xl font-bold mb-6 text-secondary">Send us a Message</h3>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                                                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                                            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                                            <textarea rows={6} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" required></textarea>
                                        </div>
                                        <Button size="lg" className="w-full">Send Message</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
