import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "./Button";

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
        <div className="bg-white rounded-xl shadow-sm hover:shadow-hover transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
            <div className="h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                <div className="transform group-hover:scale-110 transition-transform duration-500 text-4xl" style={{ color: course.color }}>
                    {course.icon}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-secondary mb-1 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-3">By {course.instructor}</p>

                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium text-secondary">{course.rating}</span>
                        </div>
                        <div className="text-lg font-bold text-primary">₹{course.price.toLocaleString()}</div>
                    </div>
                    <Button className="w-full">Enroll Now</Button>
                </div>
            </div>
        </div>
    );
}
