"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/lib/data";
import { SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function CoursesPage() {
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category'));
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState(5000);
    const [sortBy, setSortBy] = useState("newest");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Sync URL with state (optional but good for professional feel)
    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat !== selectedCategory) {
            setSelectedCategory(cat);
        }
    }, [searchParams]);

    const filteredCourses = courses.filter(course => {
        if (selectedCategory && course.category !== selectedCategory) return false;
        if (selectedLevel && course.level !== selectedLevel) return false;
        if (course.price > priceRange) return false;
        return true;
    });

    // Sort courses
    const sortedCourses = [...filteredCourses].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "rating":
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    const clearAllFilters = () => {
        setSelectedCategory(null);
        setSelectedLevel(null);
        setPriceRange(5000);
    };

    const activeFiltersCount = [selectedCategory, selectedLevel, priceRange < 5000].filter(Boolean).length;

    const FilterContent = () => (
        <>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#1A1F36] m-0">Filters</h3>
                {activeFiltersCount > 0 && (
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-[#2D6DF6] bg-none border-none cursor-pointer py-1.5 px-3 rounded-lg transition-all duration-200 hover:bg-[#F8F9FB] font-medium"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#1A1F36] mb-3">Category</h4>
                <div className="flex flex-col gap-2">
                    {['development', 'business', 'design', 'marketing', 'data-science', 'ai', 'productivity'].map(cat => (
                        <label key={cat} className="flex items-center gap-2.5 cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-gray-50">
                            <input
                                type="checkbox"
                                checked={selectedCategory === cat}
                                onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                className="cursor-pointer w-4 h-4 accent-[#2D6DF6]"
                            />
                            <span className="text-sm text-gray-700 capitalize">{cat.replace('-', ' ')}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Level Filter */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#1A1F36] mb-3">Level</h4>
                <div className="flex flex-col gap-2">
                    {['beginner', 'intermediate', 'advanced'].map(level => (
                        <label key={level} className="flex items-center gap-2.5 cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-gray-50">
                            <input
                                type="radio"
                                name="level"
                                checked={selectedLevel === level}
                                onChange={() => setSelectedLevel(selectedLevel === level ? null : level)}
                                className="cursor-pointer w-4 h-4 accent-[#2D6DF6]"
                            />
                            <span className="text-sm text-gray-700 capitalize">{level}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h4 className="text-sm font-semibold text-[#1A1F36] mb-3">Price Range</h4>
                <div className="py-2">
                    <input
                        type="range"
                        min="100"
                        max="5000"
                        step="100"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-2 rounded-full bg-gray-200 outline-none cursor-pointer accent-[#2D6DF6]"
                    />
                    <div className="mt-3 text-center">
                        <span className="inline-block px-3 py-1.5 bg-[#F8F9FB] text-[#2D6DF6] text-sm font-semibold rounded-lg">
                            ₹100 - ₹{priceRange.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Page Header */}
                <div className="bg-gradient-to-br from-[#2D6DF6] to-[#1a4fd6] text-white py-12 md:py-16">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">All Courses</h1>
                        <p className="text-base md:text-lg text-white/90 m-0">Explore our complete collection of courses and start learning today</p>
                    </div>
                </div>

                {/* Courses Section */}
                <section className="py-8 md:py-12">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                        {/* Mobile Filter Button & Active Filters */}
                        <div className="lg:hidden mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <button
                                    onClick={() => setIsFilterOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Filters
                                    {activeFiltersCount > 0 && (
                                        <span className="ml-1 px-2 py-0.5 bg-[#2D6DF6] text-white text-xs font-semibold rounded-full">
                                            {activeFiltersCount}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Active Filter Chips */}
                            {activeFiltersCount > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {selectedCategory && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F8F9FB] text-[#2D6DF6] text-sm font-medium rounded-lg">
                                            {selectedCategory.replace('-', ' ')}
                                            <button onClick={() => setSelectedCategory(null)} className="hover:bg-[#2D6DF6]/10 rounded-full p-0.5">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </span>
                                    )}
                                    {selectedLevel && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F8F9FB] text-[#2D6DF6] text-sm font-medium rounded-lg capitalize">
                                            {selectedLevel}
                                            <button onClick={() => setSelectedLevel(null)} className="hover:bg-[#2D6DF6]/10 rounded-full p-0.5">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </span>
                                    )}
                                    {priceRange < 5000 && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F8F9FB] text-[#2D6DF6] text-sm font-medium rounded-lg">
                                            Up to ₹{priceRange}
                                            <button onClick={() => setPriceRange(5000)} className="hover:bg-[#2D6DF6]/10 rounded-full p-0.5">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                            {/* Desktop Filter Sidebar */}
                            <aside className="hidden lg:block">
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-24 max-h-[80vh] overflow-y-auto">
                                    <FilterContent />
                                </div>
                            </aside>

                            {/* Mobile Filter Drawer */}
                            {isFilterOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                                        onClick={() => setIsFilterOpen(false)}
                                    />
                                    <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto shadow-2xl">
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-6">
                                                <h2 className="text-xl font-bold text-[#1A1F36]">Filters</h2>
                                                <button
                                                    onClick={() => setIsFilterOpen(false)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <FilterContent />
                                            <div className="mt-6 pt-6 border-t border-gray-200">
                                                <button
                                                    onClick={() => setIsFilterOpen(false)}
                                                    className="w-full py-3 bg-[#2D6DF6] text-white rounded-lg font-semibold hover:bg-[#1a4fd6] transition-colors"
                                                >
                                                    Show {sortedCourses.length} Courses
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Courses Content */}
                            <div className="min-h-[600px]">
                                {/* Courses Header */}
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 p-4 sm:p-5 bg-white rounded-xl shadow-sm border border-gray-200">
                                    <div className="text-sm sm:text-base text-gray-700">
                                        <span className="font-semibold text-[#2D6DF6]">{sortedCourses.length}</span> courses found
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label htmlFor="sort" className="text-sm text-gray-700 font-medium">Sort by:</label>
                                        <select
                                            id="sort"
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="py-2 px-3 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white cursor-pointer transition-colors duration-200 hover:border-[#2D6DF6] focus:outline-none focus:ring-2 focus:ring-[#2D6DF6]/20 focus:border-[#2D6DF6]"
                                        >
                                            <option value="newest">Newest</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="rating">Highest Rated</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Courses Grid */}
                                {sortedCourses.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {sortedCourses.map(course => (
                                            <CourseCard key={course.id} course={course} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <div className="text-6xl mb-4">📚</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                                        <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                                        <button
                                            onClick={clearAllFilters}
                                            className="px-6 py-2.5 bg-[#2D6DF6] text-white rounded-lg font-medium hover:bg-[#1a4fd6] transition-colors"
                                        >
                                            Clear All Filters
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
