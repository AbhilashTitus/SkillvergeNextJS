import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function About() {
    const values = [
        {
            icon: "bi-heart-fill",
            title: "Accessibility",
            description: "We make quality education affordable and accessible to learners from all backgrounds."
        },
        {
            icon: "bi-star-fill",
            title: "Quality",
            description: "We maintain high standards for course content and instructor expertise."
        },
        {
            icon: "bi-people-fill",
            title: "Community",
            description: "We foster a supportive learning community where everyone can grow together."
        },
        {
            icon: "bi-lightning-fill",
            title: "Innovation",
            description: "We continuously improve our platform with the latest technology and teaching methods."
        },
        {
            icon: "bi-shield-check",
            title: "Trust",
            description: "We build trust through transparency, security, and excellent customer support."
        },
        {
            icon: "bi-graph-up",
            title: "Growth",
            description: "We're committed to the continuous growth of both learners and instructors."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Page Header */}
                <div className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white py-16 text-center">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h1 className="text-4xl text-white mb-4">About Skillverge</h1>
                        <p className="text-lg text-white/90 m-0">Empowering learners and creators through affordable, quality education</p>
                    </div>
                </div>

                {/* Mission Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl mb-6 text-[#1A1F36]">Our Mission</h2>
                                <p className="text-lg text-gray-600 leading-[1.8] mb-6">
                                    At Skillverge, we believe that quality education should be accessible to everyone, regardless of their background or financial situation. Our mission is to democratize learning by providing affordable online courses that help people upgrade their skills and achieve their career goals.
                                </p>
                                <p className="text-lg text-gray-600 leading-[1.8]">
                                    We're building India's most inclusive EdTech marketplace where passionate instructors can share their knowledge and eager learners can access world-class education starting from just ₹100.
                                </p>
                            </div>
                            <div className="flex items-center justify-center min-h-[350px]">
                                <img
                                    src="/assets/education_for_all.png"
                                    alt="Education for All"
                                    className="w-full h-auto object-cover rounded-[20px] shadow-xl hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 bg-[#F8F9FB]">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold text-center mb-8 text-[#1A1F36]">Our Core Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {values.map((value, index) => (
                                <div key={index} className="text-center p-12 bg-white rounded-2xl transition-all duration-[300ms] hover:-translate-y-2 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)]">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] rounded-full flex items-center justify-center">
                                        <i className={`bi ${value.icon} text-[2rem] text-white`}></i>
                                    </div>
                                    <h3 className="text-xl mb-4 text-[#1A1F36]">{value.title}</h3>
                                    <p className="text-base text-gray-600">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                            {[
                                { number: "50,000+", label: "Active Learners" },
                                { number: "2,000+", label: "Expert Instructors" },
                                { number: "500+", label: "Quality Courses" },
                                { number: "4.8/5", label: "Average Rating" }
                            ].map((stat, index) => (
                                <div key={index} className="text-center p-12 bg-white/10 rounded-2xl backdrop-blur-[10px]">
                                    <div className="text-4xl font-extrabold text-white mb-4">{stat.number}</div>
                                    <div className="text-lg text-white/90">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-br from-[#1A1F36] to-[#0f1420] text-white text-center">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h2 className="text-3xl text-white mb-6 font-bold">Join Our Growing Community</h2>
                        <p className="text-lg text-white/90 mb-12 max-w-[700px] mx-auto">
                            Whether you want to learn new skills or share your expertise, Skillverge is the perfect platform for you.
                        </p>
                        <div className="flex gap-6 justify-center flex-wrap">
                            <a href="/courses" className="inline-block py-4 px-8 text-lg font-medium text-center rounded-lg transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-[#2D6DF6] text-white hover:bg-[#1a4fd6] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(45,109,246,0.2)]">
                                Browse Courses
                            </a>
                            <a href="/seller/register" className="inline-block py-4 px-8 text-lg font-medium text-center rounded-lg transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#1A1F36] hover:-translate-y-0.5">
                                Become an Instructor
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
