"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/lib/data";

export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState(5000);

    const filteredCourses = courses.filter(course => {
        if (selectedCategory && course.category !== selectedCategory) return false;
        if (course.price > priceRange) return false;
        return true;
    });

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Page Header */}
                <div className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white py-16 text-center">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h1 className="text-4xl text-white mb-4">All Courses</h1>
                        <p className="text-lg text-white/90 m-0">Explore our complete collection of courses and start learning today</p>
                    </div>
                </div>

                {/* Courses Section */}
                <section className="py-16">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                            {/* Filter Sidebar */}
                            <aside className="bg-white rounded-xl p-8 shadow-[0_2px_4px_rgba(0,0,0,0.1)] h-fit sticky top-20">
                                <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#E5E7EB]">
                                    <h3 className="text-xl font-semibold text-[#1A1F36] m-0">Filters</h3>
                                    <button
                                        onClick={() => { setSelectedCategory(null); setPriceRange(5000); }}
                                        className="text-sm text-[#2D6DF6] bg-none border-none cursor-pointer py-1 px-2 rounded-lg transition-all duration-[200ms] hover:bg-[#F8F9FB]"
                                    >
                                        Clear All
                                    </button>
                                </div>

                                {/* Category Filter */}
                                <div className="mb-8">
                                    <h4 className="text-base font-semibold text-[#1A1F36] mb-4">Category</h4>
                                    <div className="flex flex-col gap-2">
                                        {['development', 'business', 'design', 'marketing', 'data-science', 'ai', 'productivity'].map(cat => (
                                            <label key={cat} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-colors duration-[200ms] hover:bg-[#F8F9FB]">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategory === cat}
                                                    onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                                    className="cursor-pointer w-[18px] h-[18px]"
                                                />
                                                <span className="text-sm text-[#1A1F36] capitalize">{cat.replace('-', ' ')}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <h4 className="text-base font-semibold text-[#1A1F36] mb-4">Price Range</h4>
                                    <div className="py-4">
                                        <input
                                            type="range"
                                            min="100"
                                            max="5000"
                                            value={priceRange}
                                            onChange={(e) => setPriceRange(Number(e.target.value))}
                                            className="w-full h-1.5 rounded-full bg-[#E5E7EB] outline-none cursor-pointer mb-4 accent-[#2D6DF6]"
                                        />
                                        <div className="text-center text-sm font-medium text-[#2D6DF6]">
                                            ₹100 - ₹{priceRange}
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            {/* Courses Content */}
                            <div className="min-h-[600px]">
                                {/* Courses Header */}
                                <div className="flex justify-between items-center mb-8 p-6 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                                    <div className="text-base text-[#1A1F36]">
                                        <span className="font-semibold text-[#2D6DF6]">{filteredCourses.length}</span> courses found
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <label htmlFor="sort" className="text-sm text-[#1A1F36]">Sort by:</label>
                                        <select
                                            id="sort"
                                            className="py-2 px-4 border border-[#E5E7EB] rounded-lg text-sm text-[#1A1F36] bg-white cursor-pointer transition-colors duration-[200ms] hover:border-[#2D6DF6] focus:outline-none focus:border-[#2D6DF6]"
                                        >
                                            <option>Newest</option>
                                            <option>Price: Low to High</option>
                                            <option>Price: High to Low</option>
                                            <option>Highest Rated</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Courses Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredCourses.map(course => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
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
