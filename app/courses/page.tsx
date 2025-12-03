"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/lib/data";
import { Button } from "@/components/Button";
import { Filter } from "lucide-react";

export default function CoursesPage() {
    const [showFilters, setShowFilters] = useState(false);
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
            <main className="flex-grow pt-20">
                <div className="bg-secondary text-white py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold mb-4">All Courses</h1>
                        <p className="text-gray-300">Explore our complete collection of courses and start learning today</p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Mobile Filter Toggle */}
                        <div className="lg:hidden mb-4">
                            <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="w-full flex items-center gap-2">
                                <Filter size={20} /> Filters
                            </Button>
                        </div>

                        {/* Sidebar */}
                        <aside className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
                            <div className="bg-white p-6 rounded-xl border border-gray-100 sticky top-24">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold">Filters</h3>
                                    <button
                                        onClick={() => { setSelectedCategory(null); setPriceRange(5000); }}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Clear All
                                    </button>
                                </div>

                                {/* Categories */}
                                <div className="mb-8">
                                    <h4 className="font-semibold mb-4">Category</h4>
                                    <div className="space-y-2">
                                        {['development', 'business', 'design', 'marketing', 'data-science', 'ai', 'productivity'].map(cat => (
                                            <label key={cat} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategory === cat}
                                                    onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                                    className="rounded text-primary focus:ring-primary"
                                                />
                                                <span className="capitalize">{cat.replace('-', ' ')}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price */}
                                <div>
                                    <h4 className="font-semibold mb-4">Price Range</h4>
                                    <input
                                        type="range"
                                        min="100"
                                        max="5000"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full accent-primary"
                                    />
                                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                                        <span>₹100</span>
                                        <span>₹{priceRange}</span>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Grid */}
                        <div className="lg:w-3/4">
                            <div className="mb-6 flex justify-between items-center">
                                <p className="text-gray-600">{filteredCourses.length} courses found</p>
                                <select className="border rounded-lg px-3 py-2 bg-white">
                                    <option>Newest</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses.map(course => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
