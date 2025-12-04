import Link from "next/link";
import { Star } from "lucide-react";

export interface CourseProps {
    id: string;
    title: string;
    instructor: string;
    rating: number;
    price: number;
    category: string;
    level: string;
    icon: React.ReactNode;
    color: string;
}

export function CourseCard({ course }: { course: CourseProps }) {
    return (
        <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-[300ms] flex flex-col h-full hover:shadow-[0_12px_28px_rgba(45,109,246,0.2)] hover:-translate-y-1.5">
            {/* Course Thumbnail */}
            <div className="relative w-full h-[200px] overflow-hidden bg-[#F8F9FB]">
                <div className="h-full flex items-center justify-center">
                    <div className="text-4xl transition-transform duration-[400ms] group-hover:scale-105" style={{ color: course.color }}>
                        {course.icon}
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-[#1A1F36] mb-2 leading-[1.3] line-clamp-2">
                    {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">By {course.instructor}</p>

                {/* Course Meta */}
                <div className="flex justify-between items-center mb-6 mt-auto">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#FFA500] fill-[#FFA500]" />
                        <span className="text-xs text-gray-600">({course.rating})</span>
                    </div>
                    <div className="text-xl font-bold text-[#2D6DF6]">
                        ₹{course.price.toLocaleString()}
                    </div>
                </div>

                {/* Enroll Button */}
                <button className="w-full py-3 bg-[#2D6DF6] text-white border-none rounded-lg text-base font-medium cursor-pointer transition-all duration-[300ms] hover:bg-[#1a4fd6] hover:-translate-y-0.5 active:translate-y-0">
                    Enroll Now
                </button>
            </div>
        </div>
    );
}
