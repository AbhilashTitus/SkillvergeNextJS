"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/Button";
import { categories, features, courses } from "@/lib/data";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSellerClick = () => {
    if (isAuthenticated) {
      router.push("/seller");
    } else {
      router.push("/login?redirect=/seller");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main>
        {/* Hero Section with Video Background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video */}
          <video
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 z-0 object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/assets/loop.mp4" type="video/mp4" />
          </video>

          {/* Hero Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[rgba(26,31,54,0.85)] to-[rgba(45,109,246,0.75)] z-[1]" />

          {/* Hero Content */}
          <div className="relative z-[2] w-full py-24">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="text-center animate-[fadeInUp_0.8s_ease-out]">
                <h1 className="text-5xl font-bold text-white mb-6 leading-[1.1] [text-shadow:0_4px_12px_rgba(0,0,0,0.3)]">
                  Upgrade Your Skills With Skillverge
                </h1>
                <p className="text-xl text-white/95 mb-12 font-normal [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]">
                  Affordable online learning starting from ₹100.
                </p>
                <div className="flex gap-6 flex-wrap justify-center">
                  <Button size="lg" href="/courses">
                    Browse Courses
                  </Button>
                  <button
                    onClick={handleSellerClick}
                    className="inline-block py-4 px-8 text-lg font-medium text-center rounded-none transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-white/20 text-white border-2 border-white backdrop-blur-[10px] hover:bg-white hover:text-[#2D6DF6]"
                  >
                    Become a Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#1A1F36]">
              Why Choose Skillverge?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-8 border border-[#E5E7EB] rounded-xl transition-all duration-[300ms] hover:border-[#2D6DF6] hover:-translate-y-2"
                >
                  <div className="text-[3rem] text-[#2D6DF6] mb-6 flex justify-center [&>svg]:w-12 [&>svg]:h-12">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-4 text-[#1A1F36]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-[#F8F9FB]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#1A1F36]">
              Popular Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {categories.map((cat, index) => (
                <CategoryCard key={index} title={cat.title} icon={cat.icon} />
              ))}
            </div>
          </div>
        </section>

        {/* Top Courses Section */}
        <section className="py-16 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#1A1F36]">
              Top Courses
            </h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-[600px] mx-auto">
              Explore our most popular courses and start learning today
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {courses.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] py-24">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/10 p-12 rounded-[20px] backdrop-blur-[10px]">
              <div className="text-center text-white">
                <i className="bi bi-camera-video text-[4rem] text-white mb-6"></i>
                <h2 className="text-3xl text-white mb-4 font-bold">
                  Become a Course Creator
                </h2>
                <p className="text-lg text-white/90 mb-8">
                  Sell your knowledge to thousands of learners and earn instantly.
                </p>
                <button
                  onClick={handleSellerClick}
                  className="inline-block py-4 px-8 text-lg font-medium text-center rounded-none transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-white text-[#2D6DF6] hover:bg-[#00B894] hover:text-white"
                >
                  Start Selling
                </button>
              </div>
              <div className="bg-white/20 rounded-lg p-12 flex items-center justify-center min-h-[300px] overflow-hidden">
                <img 
                  src="/assets/teacer.webp" 
                  alt="Illustration of a teacher recording a course"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
