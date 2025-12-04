"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/AuthContext";
import { courses } from "@/lib/data";
import { PlayCircle, Award, Clock } from "lucide-react";

export default function MyLearningPage() {
    const router = useRouter();
    const { user, purchasedCourses, isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Small delay to allow auth state to hydrate
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                router.push("/login");
            }
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [isAuthenticated, router]);

    if (isLoading) {
        return null; // Or a loading spinner
    }

    const myCourses = courses.filter(course => purchasedCourses.includes(course.id));

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
            <Navbar />
            <main className="flex-grow py-12 px-4 md:px-6">
                <div className="max-w-[1280px] mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-[#1A1F36]">My Learning</h1>
                        <div className="text-sm text-gray-600">
                            Welcome back, <span className="font-semibold text-[#2D6DF6]">{user?.name}</span>
                        </div>
                    </div>

                    {myCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myCourses.map((course) => (
                                <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="aspect-video bg-gray-100 flex items-center justify-center relative group">
                                        <div className="text-5xl transition-transform duration-300 group-hover:scale-110" style={{ color: course.color }}>
                                            {course.icon}
                                        </div>
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button className="bg-white text-[#1A1F36] px-6 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                <PlayCircle className="w-5 h-5" />
                                                Continue
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-[#1A1F36] mb-2 line-clamp-1">{course.title}</h3>
                                        <p className="text-sm text-gray-600 mb-4">By {course.instructor}</p>

                                        <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                                            <div className="bg-[#00B894] h-2 rounded-full" style={{ width: '0%' }}></div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>0% Complete</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Award className="w-3 h-3" />
                                                <span>Certificate</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-xl border border-gray-200">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <PlayCircle className="w-10 h-10 text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#1A1F36] mb-2">Start your learning journey</h2>
                            <p className="text-gray-600 mb-8">You haven't enrolled in any courses yet.</p>
                            <button
                                onClick={() => router.push("/courses")}
                                className="px-8 py-3 bg-[#2D6DF6] text-white rounded-lg font-semibold hover:bg-[#1a4fd6] transition-colors"
                            >
                                Browse Courses
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
