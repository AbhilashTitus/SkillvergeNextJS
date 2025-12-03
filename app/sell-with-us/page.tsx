import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { Zap, Coins, TrendingUp, Video } from "lucide-react";

export default function SellWithUsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20">
                {/* Hero */}
                <section className="bg-secondary text-white py-20">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sell Your Courses on Skillverge</h1>
                            <p className="text-xl text-gray-300 mb-8">
                                Join India's growing EdTech marketplace and earn instantly. Share your knowledge with thousands of eager learners.
                            </p>
                            <Button size="lg" href="#onboarding-form">Start Onboarding</Button>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <div className="bg-white/10 p-12 rounded-full animate-pulse">
                                <Video size={120} className="text-primary" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Why Sell on Skillverge?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-xl bg-gray-50 text-center hover:shadow-lg transition-all duration-300 group">
                                <div className="text-accent mb-4 flex justify-center group-hover:scale-110 transition-transform"><Zap size={48} /></div>
                                <h3 className="text-xl font-bold mb-2 text-secondary">Fast Approval</h3>
                                <p className="text-gray-600">Get approved within 48 hours and start selling your courses immediately.</p>
                            </div>
                            <div className="p-8 rounded-xl bg-gray-50 text-center hover:shadow-lg transition-all duration-300 group">
                                <div className="text-accent mb-4 flex justify-center group-hover:scale-110 transition-transform"><Coins size={48} /></div>
                                <h3 className="text-xl font-bold mb-2 text-secondary">Weekly Payments</h3>
                                <p className="text-gray-600">Receive your earnings every week directly to your bank account.</p>
                            </div>
                            <div className="p-8 rounded-xl bg-gray-50 text-center hover:shadow-lg transition-all duration-300 group">
                                <div className="text-accent mb-4 flex justify-center group-hover:scale-110 transition-transform"><TrendingUp size={48} /></div>
                                <h3 className="text-xl font-bold mb-2 text-secondary">Marketplace Reach</h3>
                                <p className="text-gray-600">Access thousands of learners actively searching for courses like yours.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Metrics */}
                <section className="py-16 bg-primary text-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold mb-2">10,000+</div>
                                <div className="text-primary-light">Monthly Learners</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">2,000+</div>
                                <div className="text-primary-light">Active Sellers</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">50,000+</div>
                                <div className="text-primary-light">Monthly Course Views</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Registration Form */}
                <section id="onboarding-form" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-12">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold mb-6 text-secondary">Ready to Start Teaching?</h2>
                                <p className="text-gray-600 mb-8">Fill out the form below to begin your journey as a course creator on Skillverge.</p>

                                <div className="space-y-8">
                                    {[
                                        { num: 1, title: "Submit Application", desc: "Fill out the registration form with your details" },
                                        { num: 2, title: "Get Approved", desc: "Our team reviews your application within 48 hours" },
                                        { num: 3, title: "Start Selling", desc: "Upload your courses and start earning" }
                                    ].map(step => (
                                        <div key={step.num} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0 shadow-lg">
                                                {step.num}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-secondary">{step.title}</h4>
                                                <p className="text-gray-600">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:w-1/2">
                                <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
                                    <h3 className="text-2xl font-bold mb-6 text-secondary">Seller Registration Form</h3>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                            <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Course Category *</label>
                                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                                                <option>Select a category</option>
                                                <option>Development</option>
                                                <option>Business</option>
                                                <option>Design</option>
                                                <option>Marketing</option>
                                                <option>Data Science</option>
                                            </select>
                                        </div>
                                        <Button className="w-full mt-4" size="lg">Submit Application</Button>
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
