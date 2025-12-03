import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/Button";
import { categories, features, courses } from "@/lib/data";
import { Video, Camera } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-secondary">
          <div className="absolute inset-0 z-0">
            <video
              className="w-full h-full object-cover opacity-60"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/assets/loop.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
          </div>

          <div className="container relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up drop-shadow-lg">
              Upgrade Your Skills With Skillverge
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto animate-fade-in-up delay-100 drop-shadow-md">
              Affordable online learning starting from ₹100.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
              <Button size="lg" href="/courses" className="shadow-lg shadow-primary/30">Browse Courses</Button>
              <Button size="lg" variant="secondary" href="/sell-with-us" className="shadow-lg">Become a Seller</Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Why Choose Skillverge?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 rounded-xl bg-gray-50 text-center hover:shadow-lg transition-all duration-300 group">
                  <div className="text-primary mb-4 flex justify-center [&>svg]:w-10 [&>svg]:h-10 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-secondary">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((cat, index) => (
                <CategoryCard key={index} title={cat.title} icon={cat.icon} />
              ))}
            </div>
          </div>
        </section>

        {/* Top Courses */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-secondary">Top Courses</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Explore our most popular courses and start learning today
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" href="/courses">View All Courses</Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-secondary rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <div className="p-12 md:w-1/2 flex flex-col justify-center text-white">
                <div className="mb-6 text-accent">
                  <Video size={48} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Become a Course Creator</h2>
                <p className="text-lg text-gray-300 mb-8">
                  Sell your knowledge to thousands of learners and earn instantly.
                </p>
                <div>
                  <Button size="lg" href="/sell-with-us">Start Selling</Button>
                </div>
              </div>
              <div className="md:w-1/2 bg-gray-800 flex items-center justify-center min-h-[300px] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-gray-900/50" />
                <div className="text-center text-gray-500 relative z-10">
                  <Camera size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="opacity-50">Illustration of a teacher recording a course</p>
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
