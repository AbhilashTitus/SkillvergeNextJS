import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { Heart, Star, Users, Zap, ShieldCheck, TrendingUp, Lightbulb } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20">
                {/* Header */}
                <section className="bg-secondary text-white py-20 text-center">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Skillverge</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Empowering learners and creators through affordable, quality education
                        </p>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-6 text-secondary">Our Mission</h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                At Skillverge, we believe that quality education should be accessible to everyone, regardless of their background or financial situation. Our mission is to democratize learning by providing affordable online courses that help people upgrade their skills and achieve their career goals.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                We're building India's most inclusive EdTech marketplace where passionate instructors can share their knowledge and eager learners can access world-class education starting from just ₹100.
                            </p>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <div className="bg-primary/10 p-12 rounded-full animate-pulse">
                                <Lightbulb size={120} className="text-primary" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Our Core Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: <Heart />, title: "Accessibility", desc: "We make quality education affordable and accessible to learners from all backgrounds." },
                                { icon: <Star />, title: "Quality", desc: "We maintain high standards for course content and instructor expertise." },
                                { icon: <Users />, title: "Community", desc: "We foster a supportive learning community where everyone can grow together." },
                                { icon: <Zap />, title: "Innovation", desc: "We continuously improve our platform with the latest technology and teaching methods." },
                                { icon: <ShieldCheck />, title: "Trust", desc: "We build trust through transparency, security, and excellent customer support." },
                                { icon: <TrendingUp />, title: "Growth", desc: "We're committed to the continuous growth of both learners and instructors." }
                            ].map((val, i) => (
                                <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all text-center group">
                                    <div className="text-primary mb-4 flex justify-center [&>svg]:w-10 [&>svg]:h-10 group-hover:scale-110 transition-transform">{val.icon}</div>
                                    <h3 className="text-xl font-bold mb-2 text-secondary">{val.title}</h3>
                                    <p className="text-gray-600">{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-16 bg-primary text-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {[
                                { num: "50,000+", label: "Active Learners" },
                                { num: "2,000+", label: "Expert Instructors" },
                                { num: "500+", label: "Quality Courses" },
                                { num: "4.8/5", label: "Average Rating" }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.num}</div>
                                    <div className="text-primary-light text-sm md:text-base">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-white text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-6 text-secondary">Join Our Growing Community</h2>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                            Whether you want to learn new skills or share your expertise, Skillverge is the perfect platform for you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" href="/courses">Browse Courses</Button>
                            <Button size="lg" variant="secondary" href="/sell-with-us">Become an Instructor</Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
