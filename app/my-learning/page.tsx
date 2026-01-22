"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/AuthContext";
import { courses } from "@/lib/data";
import {
    PlayCircle,
    Award,
    Clock,
    BookOpen,
    Trophy,
    Flame,
    User,
    Mail,
    Calendar,
    ArrowRight
} from "lucide-react";

export default function MyLearningPage() {
    const router = useRouter();
    const { user, purchasedCourses, isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                router.push("/login?redirect=/my-learning");
            }
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [isAuthenticated, router]);



    const [localPurchases, setLocalPurchases] = useState<string[]>([]);

    // Fail-safe: Load from localStorage directly in case Context sync misses
    useEffect(() => {
        const saved = localStorage.getItem("skillverge-purchases");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setLocalPurchases(parsed);
                }
            } catch (e) {
                console.error("Error reading local purchases", e);
            }
        }
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D6DF6]"></div>
            </div>
        );
    }

    if (!isAuthenticated || !user) return null;

    // Merge context source and local source
    const allPurchasedIds = Array.from(new Set([...purchasedCourses, ...localPurchases]));

    // Use robust comparison to handle legacy number/string IDs
    const myCourses = courses.filter(course =>
        allPurchasedIds.some(id => String(id) === String(course.id))
    );
    const completedCourses = 0; // Mock
    const inProgressCourses = myCourses.length;
    const certificatesEarned = 0; // Mock
    const totalLearningHours = 0; // Mock

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
            <Navbar />

            <main className="flex-grow">
                {/* Dashboard Hero */}
                <section className="bg-gradient-to-br from-[#1A1F36] to-[#0f1420] text-white pt-12 pb-32 px-4 md:px-8 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D6DF6] rounded-full filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00B894] rounded-full filter blur-[80px] opacity-10 translate-y-1/2 -translate-x-1/4"></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Profile Avatar */}
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-white/10 backdrop-blur-sm border border-white/20">
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#2D6DF6] to-[#00B894] flex items-center justify-center text-3xl md:text-5xl font-bold text-white uppercase shadow-inner">
                                        {user.name[0]}
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-grow pt-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10 text-blue-200 uppercase tracking-wider">
                                        Student Dashboard
                                    </span>
                                    {myCourses.length > 0 && (
                                        <span className="px-3 py-1 bg-[#00B894]/20 rounded-full text-xs font-medium backdrop-blur-sm border border-[#00B894]/30 text-[#00B894] flex items-center gap-1">
                                            <Flame className="w-3 h-3" /> Active Learner
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                    Hi, {user.name}
                                </h1>
                                <p className="text-gray-400 mb-6 max-w-xl">
                                    You're making great progress! Continue your learning journey or explore new skills to upgrade your career.
                                </p>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                                        <Mail className="w-4 h-4 text-[#2D6DF6]" />
                                        {user.email}
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                                        <Calendar className="w-4 h-4 text-[#00B894]" />
                                        Joined Recently
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats & Content */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 md:-mt-24 pb-20 relative z-20">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        <StatCard
                            label="Enrolled Courses"
                            value={myCourses.length}
                            icon={BookOpen}
                            color="text-blue-500"
                            bg="bg-blue-50"
                        />
                        <StatCard
                            label="In Progress"
                            value={inProgressCourses}
                            icon={PlayCircle}
                            color="text-orange-500"
                            bg="bg-orange-50"
                        />
                        <StatCard
                            label="Certificates"
                            value={certificatesEarned}
                            icon={Award}
                            color="text-purple-500"
                            bg="bg-purple-50"
                        />
                        <StatCard
                            label="Learning Hours"
                            value={`${totalLearningHours}h`}
                            icon={Clock}
                            color="text-green-500"
                            bg="bg-green-50"
                        />
                    </div>

                    {/* Courses Section */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-[#1A1F36]">My Courses</h2>
                            {myCourses.length > 0 && (
                                <button onClick={() => router.push('/courses')} className="text-[#2D6DF6] font-medium hover:underline text-sm">
                                    Browse More
                                </button>
                            )}
                        </div>

                        {myCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {myCourses.map((course) => (
                                    <div key={course.id} className="group bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden hover:-translate-y-1 transition-all duration-300">
                                        {/* Card Image */}
                                        <div className="aspect-square bg-gray-100 relative overflow-hidden group">
                                            {course.image ? (
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
                                                    <div className="text-6xl transform group-hover:scale-110 transition-transform duration-500" style={{ color: course.color }}>
                                                        {course.icon}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Overlay Play Button */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                <button className="bg-white text-[#1A1F36] px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                                                    <PlayCircle className="w-5 h-5 fill-current" />
                                                    Resume
                                                </button>
                                            </div>

                                            {/* Progress Bar Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                                                <div className="h-full bg-[#00B894]" style={{ width: '0%' }}></div>
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wide">
                                                    {course.level}
                                                </span>
                                                <div className="text-xs text-gray-400 font-medium flex items-center gap-1">
                                                    <Trophy className="w-3 h-3" />
                                                    Certification
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-[#1A1F36] mb-2 line-clamp-1 group-hover:text-[#2D6DF6] transition-colors">{course.title}</h3>


                                            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        0% COMPLETED
                                                    </div>
                                                    <button className="text-[#2D6DF6] p-2 hover:bg-blue-50 rounded-full transition-colors">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Download/View Options */}
                                                {course.pdfUrl && (
                                                    <div className="flex gap-2 mt-2">
                                                        <a
                                                            href={course.pdfUrl}
                                                            download
                                                            className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors uppercase tracking-wide"
                                                        >
                                                            <BookOpen className="w-3 h-3" />
                                                            Download PDF
                                                        </a>
                                                        <a
                                                            href={course.pdfUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-1 px-3 py-2 bg-[#2D6DF6]/10 hover:bg-[#2D6DF6]/20 text-[#2D6DF6] text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors uppercase tracking-wide"
                                                        >
                                                            <ArrowRight className="w-3 h-3" />
                                                            View Online
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[2rem] border border-gray-200 p-12 text-center shadow-lg">
                                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <BookOpen className="w-10 h-10 text-[#2D6DF6]" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A1F36] mb-3">No Courses Yet</h3>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                    You haven't enrolled in any courses yet. Explore our marketplace to find courses that boost your skills.
                                </p>
                                <button
                                    onClick={() => router.push("/courses")}
                                    className="px-8 py-3.5 bg-[#2D6DF6] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
                                >
                                    Browse Courses
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function StatCard({ label, value, icon: Icon, color, bg }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-bold text-[#1A1F36] mt-0.5">{value}</p>
            </div>
        </div>
    );
}
